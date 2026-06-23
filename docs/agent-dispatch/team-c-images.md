# Team C — Image build + signing

## Mission

Ship signed Pi Zero 2 W / RV1103 OS image for ThoxMini Air (also
reused for ThoxMini RV1106) by T-21 (Jul 22 2026).

## Repos you own

- `C:\Users\tommy\dev\thoxos-air-image` (primary)
- `C:\Users\tommy\dev\thoxair-pico-sdk`
- `C:\Users\tommy\dev\thox-luckfox-pico-mini-b`

## Context to load first

1. `..\KICKSTARTER_SHIPPING_PLAN.md`
2. `thoxos-air-image/README.md` + `customize.sh`
3. `thoxair-pico-sdk/README.md` + `sign-firmware.sh`
4. `thox-luckfox-pico-mini-b/README.md` + the v0.2 branch

## Current state

- thoxos-air-image: v0.1.0 pipeline written; no signed artifact yet
- thoxair-pico-sdk: v0.1.0 alpha; sign-firmware.sh not verified
- thox-luckfox-pico-mini-b: v0.2 branch not merged

## Deliverables

1. Linux build host (shared with Team B if possible)
2. Run `thoxos-air-image/customize.sh` end-to-end
3. cosign signature on the resulting image
4. Verify boot on real Pi Zero 2 W hardware
5. Wire thox-mesh-ctl + thox-assistant systemd units to actually
   start on boot
6. Merge thoxair-pico-sdk v0.2 + thox-luckfox-pico-mini-b v0.2
   branches; tag v0.2.0 on both
7. Resolve thoxos-mini-build scratch dir (delete or promote to
   real repo)
8. Decide: does ThoxMini (RV1106) get its own image, or reuse Air?

## Acceptance gate

- [ ] Signed image artifact at github.com/ttracx/thoxos-air-image/releases
- [ ] Pi Zero 2 W boots to ThoxMini Air branded login + LED strip
      lit emerald
- [ ] `systemctl status thox-mesh-ctl thox-assistant` shows both
      active on first boot
- [ ] `cosign verify` passes against the image

## Daily standup, weekly milestone same shape as Team B.
