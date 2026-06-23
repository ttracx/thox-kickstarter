# Team B — ThoxOS Kernel v1.2.0 release

## Mission

Ship a signed v1.2.0 release that boots on ThoxNova LattePanda N100
hardware + Pi Zero W (ThoxMini) + Pi Zero 2 W (ThoxMini Air) by
T-21 (Jul 22 2026). This is the highest-risk workstream — kernel
work has been NO_GO for 24 absorbs running.

## Repos you own

- `C:\Users\tommy\dev\thoxos-kernel` (primary)

## Context to load first

1. `C:\Users\tommy\dev\thox-kickstarter\docs\KICKSTARTER_SHIPPING_PLAN.md`
2. `C:\Users\tommy\dev\thoxos-kernel\README.md`
3. `C:\Users\tommy\dev\thoxos-kernel\doc\V120_READINESS.md`
4. The latest `doc/v1.1.<N>_mvp<M>_absorb_strategy.md` (currently
   `v1.1.24_mvp31_absorb_strategy.md`)
5. `patches/v1.2.0-carveout/000{1..7}-*.md` — the canonical v1.2.0
   patch queue

## Current state (per audit)

- v1.1.24 / MVP-31 absorbed
- Packaged decision: `NO_GO_RELEASE_HANDOFF_AND_DASHBOARD_STAGING_ONLY`
- v1.2.0 release blocked on:
  - QEMU evidence on an equipped rust-bare-metal + GRUB host
  - 7 `v120-*.log` command-specific smoke transcripts
  - Real detached release signature (current is local HMAC custody)
  - Release-manager human sign-off (Craig)

## Deliverables

1. **Linux build host**: provision a privileged Linux machine with:
   - Rust nightly with bare-metal targets (x86_64-unknown-none,
     aarch64-unknown-none-elf, riscv64gc-unknown-none-elf)
   - grub-mkrescue + grub-pc-bin
   - qemu-system-x86_64 + qemu-system-aarch64
   - cosign for release signing
2. **7 v120-* smoke transcripts**: run each smoke command (per
   `doc/transcript_markers/*.markers`) through QEMU; capture
   ordered transcripts; archive to `doc/v120-evidence/`
3. **Real release signature**: use cosign with an offline-stored
   key (NOT the local HMAC). Document the signature procedure in
   `doc/v120-release-signing.md`
4. **Release-manager sign-off**: Craig physically signs the
   sign-off document; signature scanned + committed
5. **v1.2.0 tag**: merge the parked carve-out into the default
   kernel tree; tag v1.2.0; push tag
6. **Boot test on real hardware**:
   - LattePanda N100 (ThoxNova target): boot `thoxos> ` shell
     reachable over serial (115200 8N1)
   - Pi Zero W (ThoxMini target): same
   - Pi Zero 2 W (ThoxMini Air + MagStack target): same

## Acceptance gate

- [ ] `cargo build --release --target x86_64-unknown-none` produces
      `thoxos-kernel.bin` in target/
- [ ] `cosign verify-blob --key cosign.pub thoxos-kernel.bin` passes
- [ ] LattePanda N100 boots to `thoxos> ` shell within 8 seconds of
      power-on
- [ ] Pi Zero W boots to `thoxos> ` shell within 12 seconds
- [ ] Pi Zero 2 W boots within 10 seconds
- [ ] `mesh_publish`, `mesh_subscribe`, `time_now` syscalls work
      on at least one of those boards (Phase 1 deliverable)
- [ ] All 24-absorb host tests still green
- [ ] `git tag v1.2.0` exists at origin/main

## Scope reduction (if at risk)

If by T-28 the QEMU evidence is not yet captured:
- Film the demo with v1.1.24 booting in QEMU on a screen instead
  of real silicon
- Voice-over describes "v1.2.0 lands the week after launch"
- This is acceptable for the demo but not for the kickstarter promise

## Daily standup template

```
[Team B] Day N:
- Yesterday: <1 line>
- Today: <1 line>
- Blocker: <1 line or none>
- ETA to v1.2.0 tag: <date>
```

## Weekly milestone

- Week 1: Linux build host operational + first QEMU smoke
- Week 2: 4 of 7 smoke transcripts captured
- Week 3: all 7 transcripts + cosign signing procedure
- Week 4: release-manager sign-off + v1.2.0 tag
- Week 5: real-hardware boot tests
