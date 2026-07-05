# Team H — Silicon + wearable narrative (B-roll only)

## Mission

Shoot B-roll for the "silicon roadmap" cutaway and the "ThoxWatch
stretch goal" tease by T-14 (Jul 29 2026). NOT critical-path —
drop if other teams need attention.

## Repos you own

- `C:\Users\tommy\dev\thoxinchip` (ThoxCPU + PolarQuant MAC)
- `C:\Users\tommy\dev\thox-watch` (ESP32-C3 OpenWear wearable)

## Current state

- thoxinchip: branch `docs/team-d-devices` unmerged
- thox-watch: hardware bring-up (display + I2C scan) incomplete

## Deliverables

1. **thoxinchip**: merge the `docs/team-d-devices` branch to main;
   run the PolarQuant MAC test bench; render the GDS layout of the
   ThoxCPU + PolarQuant MAC; export to PNG for B-roll
2. **thox-watch**: flash `thoxwatch_c3_supermini` firmware; verify
   240x280 ST7789 display + backlight; verify BMI160 I2C scan;
   shoot a 5-second "wrist display lighting up emerald THOX logo"
   clip

## Acceptance gate

- [ ] 1 silicon-roadmap PNG saved to
      `thox-kickstarter/assets/silicon-roadmap-thoxcpu.png`
- [ ] 1 thoxwatch wrist clip saved to
      `thox-kickstarter/assets/thoxwatch-wrist-display.mp4`

## Scope reduction

If silicon GDS render fails: use the existing ThoxCPU architecture
diagram from `thoxinchip/docs/`. If thox-watch hardware bring-up
stalls: skip the wrist clip entirely (stretch goal tease can be
voice-over only).

## Daily standup + weekly milestone same shape as Team B.
