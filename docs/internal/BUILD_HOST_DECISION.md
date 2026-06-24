# Build host decision: THOX-BUILD-01 on local workstation

**Decided**: 2026-06-23
**Decision owner**: Tommy
**Outcome**: USE THE LOCAL WORKSTATION (`KnightHub`) AS THE SHARED BUILD HOST. Do NOT spin up Hetzner / AWS for the Kickstarter sprint.

## Resource comparison

| Resource | KnightHub (chosen) | Hetzner CCX23 (rejected) | AWS c7a.4xlarge (rejected) |
|---|---|---|---|
| CPU cores / threads | 20c / **28t** (i7-14700F) | 16 vCPU | 16 vCPU |
| RAM | **127.7 GB** | 64 GB | 32 GB |
| GPU | **RTX 4060 Ti 16 GB** (CUDA) | none | none |
| Storage | 320 GB free of 1.87 TB NVMe | 360 GB NVMe | 500 GB EBS |
| Recurring cost | **$0** (already paid for) | $95/mo | ~$140-180/mo |
| Local LLM inference | yes | no | no |

The local workstation has more compute, more RAM, more storage, a GPU, AND no recurring cost. Any cloud spend on a build VM in this configuration is wasted budget.

## What the cloud option was actually buying

The Hetzner / AWS recommendations were not driven by hardware shortfall. They optimize for:

1. Centralized SSH access (one machine everyone can reach)
2. CI/CD that runs while the workstation is off
3. Build artifacts on a server-class network
4. Public-internet-reachable independent infrastructure for disaster recovery

Solutions for each of those without spending $95+ per month:

1. **Centralized SSH** -> Tailscale on the workstation. `100.x.x.x` becomes the canonical "shiproom" address. Craig + Phamy SSH in via tailnet hostname. Zero config beyond `tailscale up`.
2. **24/7 CI/CD** -> keep workstation on; configure Windows to never sleep when on AC; restart WSL on boot. Even if the workstation reboots, GitHub self-hosted runners auto-reconnect.
3. **Server-class network** -> Cedar Park residential internet is fine for the artifact sizes we ship (single-digit MB STLs, sub-100 MB GGUFs, sub-50 MB kernel ISOs). Tailscale handles the LAN-quality access.
4. **Disaster recovery** -> add a $20/mo Hetzner CX22 as a hot-standby ONLY if and when build cadence shows we need it. Not in the Kickstarter sprint.

## What gets redirected (the $95-180/mo we are not spending)

Per the original playbook's "What I would spend money on instead" section:
- Pi Zero inventory for Team F MagStack
- Additional ThoxClip prototypes
- Kickstarter video production
- Packaging samples + insert cards
- Shipping materials for the first Starter / Standard ThoxKey runs
- Additional NVMe SSDs for build artifact archive

## Architecture

```
KnightHub (Windows 11 Pro Insider build 26300)
|
+-- WSL Ubuntu 26.04 LTS (resolute) -- THOX-BUILD-01
|     |
|     +-- /home/ttracx/thox-shiproom/    (workspace; created 2026-06-23)
|     |     |
|     |     +-- builds/      per-team build trees
|     |     +-- artifacts/   signed release output
|     |     +-- secrets/     cosign keys, runner tokens (gitignored)
|     |     +-- runners/     per-team self-hosted runner installs
|     |     +-- logs/        per-build log archive
|     |
|     +-- Toolchain
|     |     - build-essential, clang, cmake, ninja, pkg-config (installed)
|     |     - lld, qemu-user-static, debootstrap (install via bootstrap script)
|     |     - qemu-system-x86_64, qemu-system-arm, grub-mkrescue (installed)
|     |     - Rust nightly + targets: x86_64-unknown-none, aarch64-unknown-none,
|     |       armv7-unknown-linux-gnueabihf, x86_64-unknown-linux-gnu (installed)
|     |     - Python 3, pip, venv (installed via host)
|     |     - cosign (install via bootstrap script)
|     |     - tailscale (install via bootstrap script)
|     |
|     +-- Docker Engine (docker-desktop WSL distro already running)
|
+-- Windows-side
      - Tailscale Windows client (install via bootstrap script)
      - GitHub self-hosted runner (one per team: kernel/air/models/flasher/magstack)
```

## Per-team build mapping

| Team | Build command | Runs on | Status |
|---|---|---|---|
| B Kernel (thoxos-kernel) | `cargo build --release`, `cargo test`, `qemu-system-x86_64 -kernel ...` | THOX-BUILD-01 | unblocked when bootstrap done |
| C Images (thoxos-air-image) | `debootstrap` + `qemu-user-static` + image assembly | THOX-BUILD-01 | needs lld + qemu-user-static + debootstrap |
| D Models (thoxllm-factory, thox-gemma4) | `cargo`, `ollama create`, GGUF quantization | THOX-BUILD-01 (faster than cloud thanks to 4060 Ti CUDA) | already runs here today |
| E Provisioning (thox-provisioner) | `cargo build`, optional `tauri build` or `electron build` | THOX-BUILD-01 | unblocked when bootstrap done |
| F MagStack (magstack-air, edge-rs) | `cargo`, `cross`, ARM targets | THOX-BUILD-01 | unblocked when bootstrap done |

Teams A (marketing), G (Apps SwiftUI iOS/macOS), H (Silicon docs + KiCad) do not run on the Linux build host. Team G keeps using macOS for Xcode + TestFlight (Phamy's box).

## Bootstrap script

A one-shot script lives at `scripts/provision-thox-build-01.sh`. Run it once from a fresh shell in WSL:

```
cd ~/thox-shiproom
curl -fsSL https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/scripts/provision-thox-build-01.sh -o bootstrap.sh
chmod +x bootstrap.sh
./bootstrap.sh
```

The script is idempotent. Re-runs are safe. See the script header for the per-step what-it-does.

## Plan-update audit trail

This decision supersedes Action 1 in `docs/TOMMY_ACTION_PLAYBOOK.md` (which previously said "Provision the shared Linux build host" with Hetzner CCX23 steps). The playbook is updated to point at this decision doc and the bootstrap script instead.

## Sign-off

- [x] Decision recorded: 2026-06-23 by Tommy
- [x] Workspace scaffold created: `~/thox-shiproom/`
- [x] Rust nightly + 4 of 5 bare-metal targets installed (missing `thumbv7em-none-eabihf` + `aarch64-unknown-linux-gnu` - bootstrap script picks these up)
- [x] qemu-system-x86_64, grub, clang, cmake, ninja already present
- [ ] Bootstrap script committed (this PR)
- [ ] Tailscale up + tailnet hostname recorded
- [ ] cosign keypair generated + public key committed to thoxos-kernel + thoxos-air-image
- [ ] 5 GitHub self-hosted runners registered (one per team)
- [ ] Posted in #ks-ops: "THOX-BUILD-01 live at `knighthub.<tailnet>.ts.net`. Teams B/C/D/E/F unblocked."

Remaining items above are pending the bootstrap script run.
