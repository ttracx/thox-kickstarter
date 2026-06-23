# Shared Linux Build Host — THOX Kickstarter Shiproom

## Purpose

One reproducible Linux host for kernel, image, flasher, Rust, QEMU,
signing, and model packaging proof. This host is the critical
dependency for **Teams B (kernel), C (images), E (flasher), F
(MagStack Rust), and D (model packaging when GPU box is separate)**.
Provision it on Day 0 — not "this week."

## Required users

- Team B: kernel / QEMU / signing
- Team C: Pi Zero 2 W / RV1103 image build
- Team E: flasher / MaskROM / provisioner
- Team F: MagStack Rust compile
- Team D: model packaging if the 4060 Ti GPU rig is separate

## Minimum host

- Ubuntu 24.04 LTS
- 16 vCPU minimum, 32 preferred (image builds parallelize)
- 64 GB RAM minimum, 128 GB preferred if multiple image builds run in
  parallel
- 500 GB NVMe minimum
- Docker
- QEMU / KVM
- Rust stable + nightly
- cosign
- Secure artifact directory (`~/thox-shiproom/secrets/`, mode 0700)
- Tailscale or WireGuard access for the team
- No production secrets stored unencrypted

### Recommended providers

| Provider | Tier | Cost / mo | Notes |
|---|---|---|---|
| Hetzner | CCX23 (16 vCPU / 64 GB / 360 GB) | ~$95 | best price-per-core for Linux |
| AWS EC2 | c6a.4xlarge | ~$250 | familiar tooling; pay-per-hour ok |
| Linode | g6-dedicated-16 | ~$120 | predictable Linux experience |

For the Kickstarter shiproom: Hetzner CCX23 + Tailscale. Total
spin-up: ~30 minutes from sign-up to first `cargo build`.

## Bootstrap script

Run as `tommy` (or whatever the operator's username is) on a fresh
Ubuntu 24.04 box:

```bash
#!/usr/bin/env bash
set -euo pipefail

# === System packages =================================================
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  git \
  curl \
  jq \
  make \
  pkg-config \
  libssl-dev \
  clang \
  lld \
  llvm \
  nasm \
  xorriso \
  grub-pc-bin \
  grub-efi-amd64-bin \
  qemu-system-x86 \
  qemu-system-arm \
  qemu-user-static \
  binfmt-support \
  ovmf \
  mkosi \
  systemd-container \
  zstd \
  unzip \
  rsync \
  python3 \
  python3-pip \
  python3-venv \
  docker.io \
  docker-compose-plugin \
  sbsigntool \
  tpm2-tools \
  efitools

sudo usermod -aG docker "$USER"

# === Rust ============================================================
if ! command -v rustup >/dev/null 2>&1; then
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
fi
. "$HOME/.cargo/env"

rustup toolchain install stable
rustup toolchain install nightly
rustup component add rustfmt clippy
rustup component add rust-src --toolchain nightly
rustup target add x86_64-unknown-linux-gnu
rustup target add aarch64-unknown-linux-gnu

# === cosign (release signing) ========================================
if ! command -v cosign >/dev/null 2>&1; then
  COSIGN_VERSION="v2.4.1"
  curl -L "https://github.com/sigstore/cosign/releases/download/${COSIGN_VERSION}/cosign-linux-amd64" -o /tmp/cosign
  sudo install -m 0755 /tmp/cosign /usr/local/bin/cosign
fi

# === Shiproom workspace ==============================================
mkdir -p "$HOME/thox-shiproom"/{repos,artifacts,logs,secrets}
chmod 700 "$HOME/thox-shiproom/secrets"

# === Environment proof ==============================================
cat > "$HOME/thox-shiproom/ENVIRONMENT.txt" <<EOF
date=$(date -u +%Y-%m-%dT%H:%M:%SZ)
host=$(hostname)
kernel=$(uname -a)
rustc=$(rustc --version)
cargo=$(cargo --version)
qemu_x86=$(qemu-system-x86_64 --version | head -n 1)
cosign=$(cosign version 2>/dev/null | head -n 1 || true)
EOF
cat "$HOME/thox-shiproom/ENVIRONMENT.txt"
```

This script is also at
`thoxos-kernel/scripts/provision-linux-build-host.sh` (committed in
Team B prep commit `55eddd0`); the two are kept in sync. If you bump
versions in one, bump them in the other.

## Evidence rule

No artifact produced on this host counts unless it carries:

```
repo
branch
commit SHA
build command
test command
artifact path
SHA256
operator
timestamp
result
```

This 10-field record is the shared format across Teams B/C/D/E/F. It
gates the `release-decision.json` files each team produces and the
fulfillment audit trail at ship time.

## Access policy

- SSH key auth only; no password login.
- All operators added via authorized_keys, not local accounts.
- Sudo logged.
- `~/thox-shiproom/secrets/` mode 0700; cosign offline keypair lives
  there, NEVER pushed to any repo.
- Tailscale ACL restricts access to the THOX team's tailnet.
- Spot-check the access log (`last -F`) weekly.

## When to tear down

Keep this host alive through T+30 (Sep 11 2026) at minimum, ideally
through T+90 (Nov 10 2026) for fulfillment-phase batch flashing +
QA-trail verification. After T+90, snapshot the artifacts directory
to a long-term backup and decommission.

## Reference

- Team B kernel work: `thoxos-kernel/doc/V120_RELEASE_READINESS_AUDIT_2026-06-22.md`
- Team C images: `thoxos-air-image/doc/V01_RELEASE_READINESS_AUDIT_2026-06-22.md`
- Team E flasher procedures:
  `thox-provisioner/doc/MASKROM_SMOKE_TEST_PROCEDURE.md`
- Master plan: `thox-kickstarter/docs/KICKSTARTER_SHIPPING_PLAN.md`
