# Team E — Device provisioning + flashing

## Mission

Every THOX device can be flashed in <5 min on Windows + macOS by
T-14 (Jul 29 2026). Live on-camera demo of "plug in fresh hardware,
flash, boot into branded ThoxOS" must work end-to-end.

## Repos you own

- `C:\Users\tommy\dev\thox-provisioner` (primary; Tauri desktop app)
- `C:\Users\tommy\dev\thoxos-mini-flasher`
- `C:\Users\tommy\dev\thoxos-mini-utm-build`
- `C:\Users\tommy\dev\ThoxOS-Mini-Provision`
- `C:\Users\tommy\dev\thoxos-mini-ai-usb-factory`
- `C:\Users\tommy\dev\thox-quickstart`

## Current state

- thox-provisioner: ThoxAir MaskROM path untested cross-platform
- thoxos-mini-flasher: Windows verified, macOS smoke pending
- thoxos-mini-utm-build: ready, gated on iOS Companion TestFlight (Team G)
- thoxos-mini-ai-usb-factory: dormant; no built ISO yet
- thox-quickstart: ready; needs audit-trail JSON for fulfillment QA

## Deliverables (priority order)

1. **thox-provisioner ThoxAir MaskROM**: live cross-platform smoke
   test on Windows + macOS. Verify rkdeveloptool path on both.
2. **thoxos-mini-flasher macOS smoke**: full end-to-end on a Mac
3. **thoxos-mini-ai-usb-factory Phase 2 ISO**: build the
   x86_64 UEFI ISO with NemoMix-12B GGUF; SHA256 verify; boot test
4. **thox-quickstart audit trail**: ship per-unit acceptance QA
   result JSON (fulfillment gate for Nov 2026 ship window)

## Acceptance gate (filming demo)

- [ ] Tommy plugs in a fresh ThoxAir USB stick on a Mac
- [ ] Runs `thox-provisioner` GUI
- [ ] Flasher detects device, signs manifest, flashes
- [ ] Device boots into THOX branded login in <5 minutes
- [ ] Camera captures the entire flow in one continuous take

## Daily standup + weekly milestone same shape as Team B.
