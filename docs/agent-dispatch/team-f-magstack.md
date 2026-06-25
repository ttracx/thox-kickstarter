# Team F — MagStack cluster physical assembly

## Mission

Assemble a working 8-node MagStack column of Pi Zero 2 W + magnetic
pogo-pin connectors + ThoxClip v7.1 enclosures by T-21 (Jul 22 2026)
for the campaign's hero "wow" shot.

## Repos you own

- `C:\Users\tommy\dev\magstack-air` (primary; Rust + Next.js mesh fabric)
- `C:\Users\tommy\dev\magstack-air-edge-rs` (Rust edge runtime)
- `C:\Users\tommy\dev\thox-q2-print-farm` (Cluster Dock STLs)

## Context to load first

1. `..\KICKSTARTER_SHIPPING_PLAN.md`
2. `magstack-air/README.md` + `magstack-air-edge-rs/README.md`
3. `thox-3dprint-kit/devices/thoxclip/v7/README.md` (ThoxClip v7.1)
4. `thox-3dprint-kit/print-queue/00-PRECISION-COIN-CALIBRATION.md`

## Current state

- magstack-air: prototype, no CHANGELOG, no release tag, no hardware field test (Pi Zero 2 W path now legacy; RV1103 port pending after 2026-06-25 ThoxMini Air SoC retarget)
- magstack-air-edge-rs: generated in sandbox without Rust toolchain; compile unverified
- thox-q2-print-farm Cluster Dock: split-and-bond dovetail joint unproven

## Deliverables (priority order)

1. **Compile magstack-air-edge-rs** in a real Rust environment;
   `cargo test --workspace` green
2. **Print Cluster Dock split-and-bond pieces** on the Q2 Combo
   (run the precision coin calibration first per the runbook)
3. **Source 8 x Luckfox Pico Mini B** (updated 2026-06-25; was Pi Zero 2 W)
   + 8 x ThoxClip v7.1 shells + 8 x pogo-pin magnetic connectors
   + 1 x USB-PD source
4. **Assemble physical 8-clip stack**
5. **Deploy magstack-air to the stack**: leader election + work
   queue + per-task memory cap (`ulimit -v`) verified under load
6. **LED phase-offset 90deg wave**: each device's LED pulses
   visibly out of phase by 90 degrees creating a wave through the
   stack (this is the hero motion for the launch video)

## Acceptance gate (filming demo)

- [ ] 8-clip MagStack column physically assembled (mechanically
      stable when held horizontally)
- [ ] All 8 devices boot, mesh discovers each other via mDNS
- [ ] Leader election completes; non-leaders join as workers
- [ ] Submit a sample inference job; result aggregates from
      4-8 workers
- [ ] LED wave visible on camera at 30 fps (sweeping ~2 sec
      top-to-bottom)

## Scope reduction

If physical stack fails by T-21: record the magstack-air dashboard
view on a desktop simulator instead (less impressive but viable).

## Daily standup + weekly milestone same shape as Team B.
