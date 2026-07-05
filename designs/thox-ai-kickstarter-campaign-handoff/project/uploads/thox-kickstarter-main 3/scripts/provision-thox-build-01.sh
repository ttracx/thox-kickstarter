#!/usr/bin/env bash
# provision-thox-build-01.sh
#
# Bootstrap the THOX-BUILD-01 shiproom on a Windows 11 + WSL Ubuntu host.
# Idempotent: safe to re-run. Each section is gated on a presence check.
#
# Decision context: docs/internal/BUILD_HOST_DECISION.md
# Workspace target: ~/thox-shiproom/
#
# Owner: Tommy <Tommy@thox.ai>
# License: Apache-2.0
set -euo pipefail

SHIPROOM="${HOME}/thox-shiproom"
LOG_DIR="${SHIPROOM}/logs"
SECRETS_DIR="${SHIPROOM}/secrets"
RUNNERS_DIR="${SHIPROOM}/runners"

mkdir -p "${SHIPROOM}" "${LOG_DIR}" "${SECRETS_DIR}" "${RUNNERS_DIR}" \
         "${SHIPROOM}/builds" "${SHIPROOM}/artifacts"

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" | tee -a "${LOG_DIR}/bootstrap.log"
}

require_sudo() {
  if ! sudo -n true 2>/dev/null; then
    log "sudo password required - re-run after granting passwordless sudo or run with cached sudo"
    sudo -v
  fi
}

step_apt_packages() {
  local pkgs=(
    build-essential clang lld llvm cmake ninja-build pkg-config
    qemu-system-x86 qemu-system-arm qemu-utils qemu-user-static binfmt-support
    grub-pc-bin grub2-common xorriso mtools
    debootstrap
    libssl-dev libudev-dev
    git curl wget unzip jq rsync
    python3 python3-pip python3-venv
  )
  local missing=()
  for p in "${pkgs[@]}"; do
    if ! dpkg -s "$p" >/dev/null 2>&1; then
      missing+=("$p")
    fi
  done
  if (( ${#missing[@]} == 0 )); then
    log "apt: all required packages already installed"
    return 0
  fi
  log "apt: installing ${#missing[@]} missing package(s): ${missing[*]}"
  require_sudo
  sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq "${missing[@]}"
}

step_rust() {
  local cargo="${HOME}/.cargo/bin/cargo"
  if ! command -v rustup >/dev/null 2>&1 && [ ! -x "${HOME}/.cargo/bin/rustup" ]; then
    log "rust: installing rustup + nightly toolchain"
    curl --proto '=https' --tlsv1.2 -fsSL https://sh.rustup.rs | \
      sh -s -- -y --default-toolchain nightly --profile minimal --quiet
  fi
  export PATH="${HOME}/.cargo/bin:${PATH}"
  rustup toolchain install nightly --profile minimal -q
  rustup default nightly >/dev/null
  rustup component add rust-src llvm-tools-preview clippy rustfmt 2>&1 | tail -1
  for t in x86_64-unknown-none aarch64-unknown-none armv7-unknown-linux-gnueabihf \
           aarch64-unknown-linux-gnu thumbv7em-none-eabihf x86_64-unknown-linux-gnu; do
    rustup target add "$t" 2>&1 | tail -1
  done
  log "rust: $(rustc --version) | targets: $(rustup target list --installed | tr '\n' ' ')"
}

step_cosign() {
  if command -v cosign >/dev/null 2>&1; then
    log "cosign: $(cosign version 2>&1 | head -1) already installed"
    return 0
  fi
  log "cosign: downloading latest release"
  curl -fsSL -o /tmp/cosign \
    https://github.com/sigstore/cosign/releases/latest/download/cosign-linux-amd64
  require_sudo
  sudo install -m 755 /tmp/cosign /usr/local/bin/cosign
  rm /tmp/cosign
  log "cosign: $(cosign version 2>&1 | head -1)"
}

step_tailscale() {
  if command -v tailscale >/dev/null 2>&1; then
    log "tailscale: $(tailscale version | head -1) already installed"
    return 0
  fi
  log "tailscale: running official installer"
  curl -fsSL https://tailscale.com/install.sh | sh
  log "tailscale: installed; run 'sudo tailscale up' to join the tailnet (browser auth)"
}

step_cosign_keypair() {
  local key="${SECRETS_DIR}/cosign.key"
  local pub="${SECRETS_DIR}/cosign.pub"
  if [ -f "${pub}" ]; then
    log "cosign keypair: ${pub} exists"
    return 0
  fi
  log "cosign keypair: generating into ${SECRETS_DIR}/ (you will be prompted for a password)"
  (cd "${SECRETS_DIR}" && cosign generate-key-pair)
  chmod 400 "${SECRETS_DIR}/cosign.key" 2>/dev/null || true
  log "cosign keypair: pub at ${pub}; commit pub to thoxos-kernel + thoxos-air-image; save password in 1Password"
}

step_runner_binary() {
  local dst="${RUNNERS_DIR}/_template"
  local version="2.317.0"
  if [ -x "${dst}/run.sh" ]; then
    log "runner: template at ${dst} already present"
    return 0
  fi
  log "runner: downloading actions/runner ${version} template"
  mkdir -p "${dst}"
  curl -fsSL -o /tmp/runner.tar.gz \
    "https://github.com/actions/runner/releases/download/v${version}/actions-runner-linux-x64-${version}.tar.gz"
  tar -xzf /tmp/runner.tar.gz -C "${dst}"
  rm /tmp/runner.tar.gz
  log "runner: template installed at ${dst}; clone per-team via copy-runner-template <team>"
}

write_copy_runner_template() {
  cat > "${SHIPROOM}/bin/copy-runner-template" <<'EOF'
#!/usr/bin/env bash
# Clone the actions runner template into a new per-team install dir.
# Usage: copy-runner-template <team> <repo> <registration-token>
#   team:  one of kernel, air, models, flasher, magstack
#   repo:  e.g. ttracx/thoxos-kernel
#   token: from gh api /repos/<repo>/actions/runners/registration-token --jq .token
set -euo pipefail
team="${1:?team name required}"
repo="${2:?repo required, e.g. ttracx/thoxos-kernel}"
token="${3:?registration token required}"
runners="${HOME}/thox-shiproom/runners"
dst="${runners}/${team}"
if [ -d "${dst}" ]; then
  echo "[copy-runner-template] runner for team ${team} already exists at ${dst}; remove it first" >&2
  exit 1
fi
cp -r "${runners}/_template" "${dst}"
cd "${dst}"
./config.sh --unattended --url "https://github.com/${repo}" --token "${token}" --labels "thox-build-01,${team}" --name "thox-build-01-${team}" --work _work
echo "[copy-runner-template] configured. Start with: cd ${dst} && ./run.sh   (or install as a service)"
EOF
  chmod +x "${SHIPROOM}/bin/copy-runner-template"
}

step_runner_helper() {
  mkdir -p "${SHIPROOM}/bin"
  if [ ! -x "${SHIPROOM}/bin/copy-runner-template" ]; then
    write_copy_runner_template
    log "runner helper: ${SHIPROOM}/bin/copy-runner-template ready"
  fi
}

step_environment_txt() {
  cat > "${SHIPROOM}/ENVIRONMENT.txt" <<EOF
THOX-BUILD-01 environment captured $(date -u +%Y-%m-%dT%H:%M:%SZ)
host:        $(hostname)
kernel:      $(uname -r)
distro:      $(lsb_release -ds 2>/dev/null || echo "unknown")
cpu cores:   $(nproc)
ram total:   $(awk '/^MemTotal:/ {print int($2/1024/1024) " GB"}' /proc/meminfo)
disk free:   $(df -h "${HOME}" | awk 'NR==2 {print $4 " free of " $2}')

rustc:       $(rustc --version 2>/dev/null || echo "missing")
cargo:       $(cargo --version 2>/dev/null || echo "missing")
qemu x86:    $(qemu-system-x86_64 --version 2>/dev/null | head -1 || echo "missing")
qemu arm:    $(qemu-arm-static --version 2>/dev/null | head -1 || echo "missing")
clang:       $(clang --version 2>/dev/null | head -1 || echo "missing")
lld:         $(ld.lld --version 2>/dev/null | head -1 || echo "missing")
cmake:       $(cmake --version 2>/dev/null | head -1 || echo "missing")
ninja:       $(ninja --version 2>/dev/null || echo "missing")
debootstrap: $(debootstrap --version 2>/dev/null | head -1 || echo "missing")
cosign:      $(cosign version 2>&1 | head -1 || echo "missing")
docker:      $(docker --version 2>/dev/null || echo "missing")
tailscale:   $(tailscale version 2>/dev/null | head -1 || echo "missing")
python3:     $(python3 --version 2>/dev/null || echo "missing")

rust targets installed:
$(rustup target list --installed 2>/dev/null | sed 's/^/  /' || echo "  (rustup missing)")
EOF
  log "environment.txt written to ${SHIPROOM}/ENVIRONMENT.txt"
}

main() {
  log "=========================="
  log "THOX-BUILD-01 bootstrap start"
  log "=========================="
  step_apt_packages
  step_rust
  step_cosign
  step_tailscale
  step_cosign_keypair
  step_runner_binary
  step_runner_helper
  step_environment_txt
  log "=========================="
  log "Bootstrap complete."
  log "=========================="
  cat "${SHIPROOM}/ENVIRONMENT.txt"
  cat <<EOF

NEXT STEPS (you, not me):
  1. sudo tailscale up         # browser auth; pin the resulting host name
  2. Generate per-repo runner tokens, then for each team run:
       gh api /repos/ttracx/thoxos-kernel/actions/runners/registration-token --jq .token > /tmp/tok
       ~/thox-shiproom/bin/copy-runner-template kernel ttracx/thoxos-kernel "\$(cat /tmp/tok)"
       cd ~/thox-shiproom/runners/kernel && sudo ./svc.sh install ttracx && sudo ./svc.sh start
     Repeat for: air -> thoxos-air-image, models -> thoxllm-factory,
                 flasher -> thox-provisioner, magstack -> magstack-air
  3. Commit ~/thox-shiproom/secrets/cosign.pub to thoxos-kernel + thoxos-air-image
     release pages (NEVER commit cosign.key).
  4. Update docs/internal/BUILD_HOST_DECISION.md sign-off checklist.
EOF
}

main "$@"
