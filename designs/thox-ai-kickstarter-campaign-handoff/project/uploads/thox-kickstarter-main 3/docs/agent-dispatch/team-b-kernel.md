# CLAUDE DISPATCH — TEAM B

## ThoxOS Kernel v1.2.0 Signed Release + Boot Evidence

You are Team B for the THOX.ai Kickstarter shiproom.

## Mission

Produce a signed, evidence-backed ThoxOS kernel v1.2.0 release decision.

Your job is **not** to force a real-hardware boot for the video. Your
job is to make the kernel truth clear, with three legal outcomes:

- `GO_REAL_HARDWARE_BOOT` if evidence passes and the kernel boots on
  Nova / Pi Zero W / Pi Zero 2 W hardware.
- `GO_QEMU_ONLY_FOR_KICKSTARTER` if QEMU evidence passes and real
  hardware slips past T-21. Video films QEMU on a screen with honest
  voice-over.
- `NO_GO_KERNEL_NOT_FOR_VIDEO` if release evidence is incomplete. Video
  cuts the kernel beat entirely; Teams C/E/F provide the physical
  device beats.

Whichever outcome lands, the decision is **signed, dated, and binding**.

## Primary DRI

Craig

## Repository

- `C:\Users\tommy\dev\thoxos-kernel`

## Current known state

The repository has held v1.2.0 at NO_GO across 24 absorbs (MVP-7
through MVP-31). Required evidence includes:

- QEMU evidence on a rust-bare-metal + GRUB host
- 7 `v120-*` smoke transcripts
- detached release signature (NOT local HMAC)
- release-manager human signoff
- rollback plan
- branch / release evidence bundle

Treat every prior NO_GO as binding until replaced by signed proof.

Team B prep work landed in commit `55eddd0`:

- `doc/V120_RELEASE_READINESS_AUDIT_2026-06-22.md`
- `scripts/provision-linux-build-host.sh`
- `scripts/capture-v120-smoke-transcripts.sh` (7 commands resolved:
  `enteragent`, `enter2`, `faultdemo`, `preemptdemo`, `hwtick`, `gpr`,
  `waitwake`)
- `doc/v120-release-signing.md`
- `doc/v120-release-manager-signoff.md`
- `doc/v120-merge-plan.md`

This dispatch builds on that work. Execute it on the shared Linux build
host (see `docs/agent-dispatch/build-host-spec.md`).

## Required output files

Create or update under `C:\Users\tommy\dev\thoxos-kernel`:

- `doc/V120_RELEASE_EVIDENCE.md` (master evidence index)
- `doc/V120_QEMU_TRANSCRIPTS.md` (one section per transcript)
- `doc/V120_HARDWARE_BOOT_ATTEMPT.md` (per-target boot log)
- `doc/V120_SIGNED_RELEASE_DECISION.md` (final 3-outcome decision)
- `doc/V120_ROLLBACK_PLAN.md` (per MVP-25 signed rollback bundle spec)
- `doc/V120_VIDEO_FALLBACK_DECISION.md` (T-21 fallback path)
- `artifacts/v120/` (binary + log artifacts; gitignored, indexed by
  SHA256)
- Daily report: `thox-kickstarter/docs/agent-dispatch/team-b-daily-report.md`

## Build host requirement

Use the shared Linux build host (`docs/agent-dispatch/build-host-spec.md`).
Do not rely on local laptops for final evidence.

## Tasks

### 1. Environment proof

Record:

```bash
rustc --version
cargo --version
qemu-system-x86_64 --version
qemu-system-aarch64 --version
grub-mkrescue --version || true
cosign version
uname -a
```

Save output to `artifacts/v120/environment.txt`.

### 2. Workspace gates

Run:

```bash
cargo fmt --all -- --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets -- -D warnings
```

Save logs:
- `artifacts/v120/fmt.log`
- `artifacts/v120/check.log`
- `artifacts/v120/test.log`
- `artifacts/v120/clippy.log`

Resolve the known `thox-elf` regression (5 `assert_eq!` sites need
`#[derive(PartialEq)]` on `Elf64Exec` and `KError`, per V120 audit B3)
before declaring workspace green.

### 3. Kernel / QEMU gates

Run `scripts/capture-v120-smoke-transcripts.sh` and capture all 7
transcripts. Each transcript must include:

```
repo SHA
build command
run command
QEMU version
expected marker
actual marker
exit status
timestamp
operator
```

Save to `artifacts/v120/<command>.log` and summarize in
`doc/V120_QEMU_TRANSCRIPTS.md`.

The 7 transcripts:
- `v120-enteragent.log`
- `v120-enter2.log`
- `v120-faultdemo.log`
- `v120-preemptdemo.log`
- `v120-hwtick.log`
- `v120-gpr.log`
- `v120-waitwake.log`

### 4. Signed release evidence

Produce:

- `artifacts/v120/SHA256SUMS`
- `artifacts/v120/release-bundle.tar.zst`
- `artifacts/v120/release-bundle.tar.zst.sig`
- `artifacts/v120/release-decision.json`

The `release-decision.json` value MUST be one of:

```
"GO_REAL_HARDWARE_BOOT"
"GO_QEMU_ONLY_FOR_KICKSTARTER"
"NO_GO_KERNEL_NOT_FOR_VIDEO"
```

Cosign keypair: offline-stored, NOT a local HMAC. Procedure in
`doc/v120-release-signing.md`.

### 5. Hardware boot attempt

Only attempt real Nova / Pi Zero W / Pi Zero 2 W hardware AFTER QEMU
gates are green. Record per target:

```
hardware target:
BIOS/UEFI settings:
image:
flash method:
boot log:
failure point if any:
camera proof:
operator:
```

Save to `doc/V120_HARDWARE_BOOT_ATTEMPT.md`.

### 6. T-21 fallback rule

If real hardware boot is not green by T-21 (Jul 22 2026):

- Team B MUST stop chasing hardware for the video.
- Team B MUST provide QEMU screen capture and a signed
  `GO_QEMU_ONLY_FOR_KICKSTARTER` or `NO_GO_KERNEL_NOT_FOR_VIDEO`
  memo in `doc/V120_VIDEO_FALLBACK_DECISION.md`.
- Teams C / E / F / G become the physical-device hardware beats.

This T-21 cutoff is binding. Do not let Team B become the single
critical path for the campaign video.

## Friday milestone

By Friday 5pm PT, Team B must produce:

1. Build host environment proof.
2. Workspace test logs (all 4 gates green).
3. At least one QEMU boot transcript, or a precise blocker memo.
4. Updated NO_GO / GO decision memo.
5. T-21 fallback decision path.

## Daily report format

Append to `docs/agent-dispatch/team-b-daily-report.md` daily:

```
# Team B Daily Report — YYYY-MM-DD

## Summary
## Completed today
## Build host status
## Test status
## QEMU transcript status (0/7, 1/7, ..., 7/7)
## Hardware boot status (Nova / Pi Zero W / Pi Zero 2 W)
## Blockers
## Risk to T-21
## Decision state
GO_REAL_HARDWARE_BOOT / GO_QEMU_ONLY_FOR_KICKSTARTER / NO_GO_KERNEL_NOT_FOR_VIDEO / PENDING
## Tomorrow plan
## Friday milestone confidence
GREEN / YELLOW / RED
```

## Evidence rule

Every claim about v1.2.0 readiness must reference:

```
repo:
branch:
commit SHA:
build command:
test command:
artifact path:
SHA256:
operator:
timestamp:
result:
```

No artifact counts without the full 10-field record.

## Constraints

- Do NOT tag v1.2.0 without Craig's wet-ink signoff (per the existing
  `doc/v120-release-manager-signoff.md` template).
- Do NOT touch kernel source unless fixing the `thox-elf` test
  regression listed in task 2.
- The default kernel tree stays frozen against the v1.2.0 carve-out
  until the signed release decision lands.
- Commit messages: plain technical voice (matches the existing kernel
  commit log).
