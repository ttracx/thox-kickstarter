# Video beat script: ThoxMini Air carry-along, LED pulsing emerald

**Beat**: "A ThoxMini Air carry-along clipped to a backpack with the LED strip pulsing emerald."
**Position**: hero video, beat 4 of the 2:30 master (~0:52 to 1:00). Also the outro hero for the 90-second social cut.
**Runtime target**: 8 seconds on camera + 2 seconds voiceover tail.
**Blocked on** (physical): user action #7 in `PULL_FORWARD_TRACKER.md` — print + assemble ThoxMini Air v4 in QIDI Studio (90 min).

This script is production-ready prep — the moment one Air v4 is printed and firmware-flashed, principal photography starts.

---

## Cross-reference: source repos + canonical facts

| Fact | Source of truth | Note |
|---|---|---|
| ThoxMini Air SoC | project memory `thoxmini_air_soc` — Luckfox Pico Mini B (RV1103), 64MB DDR2, 128MB flash, 0.5 TOPS NPU | REVISED 2026-06-25; same SoC as ThoxMini, distinguished by MagStack ring + form factor. Pi Zero W retired. |
| ThoxMini Air enclosure | `thox-3dprint-kit/devices/thoxmini-air/kit-v4/` + `1e050f2` OpenSCAD source-of-truth per ADR-003 | v4 = 4 button cutouts + carabiner ring + halo LED strip cutout per 2026-06-25 `e00dced` |
| LED strip | Halo ring around the top face; emerald #00A67E when idle, cyan #27E5FF during active inference | Controlled by `thoxymicro` per project memory |
| Firmware | `thoxymicro` Go agent on RV1103 + `magstack-air-edge-rs` P0.3 | MIT (nanobot fork); IP-015 |
| Launch price | `docs/CAMPAIGN_INFO.md` — $79 backer | REWARDS_MATRIX.md tier 3 |
| Carabiner ring | Print-integrated on the kit-v4 body; rated for backpack-strap use | Kickstarter beat is "carry-along" — do not overclaim as a mission-critical carabiner |

---

## Shot list

### Shot 1 — Backpack against a plain wall (0:00 to 0:02)

| Element | Spec |
|---|---|
| Subject | Charcoal grey daypack hangs on a hook against a warm off-white wall. Right shoulder strap is loose, dangling into frame. No THOX branding visible yet. |
| Camera | 35mm at chest height, f/4, locked. Slight 3deg cant to give the strap organic motion. |
| Lighting | Motivated warm window light from camera-left; low 6500K fill from camera-right. |
| Sound design | Outdoor room tone with distant traffic. Faint bird. |

### Shot 2 — Hand clips Air to strap, LED cascade (0:02 to 0:04)

| Element | Spec |
|---|---|
| Subject | Right hand enters with an assembled ThoxMini Air v4. Kit-v4 carabiner catches the strap; hand rotates the unit 90 degrees to lock. The halo LED ring on the top face lights, holds emerald. |
| Camera | 85mm macro at strap level; slight focus rack from strap to halo LED as it lights. |
| Lighting | Add a 4200K rim from behind for the halo separation. |
| Sound design | Cloth-on-plastic scuff. Positive click at the lock. Faint LED-pulse tone. |

### Shot 3 — Backpack on shoulder, walking (0:04 to 0:07)

| Element | Spec |
|---|---|
| Subject | Same backpack now on a person's shoulder in a hallway. They walk away from camera. The Air's halo pulses emerald once per second — steady, calm, breathing pattern. |
| Camera | 24mm handheld, slow dolly-follow at 1.5x walking speed. |
| Lighting | Practical hallway; keep the halo readable by underexposing the fill by 1/2 stop. |
| Sound design | Footsteps. Fabric shuffle. The halo pulse tone matches the LED breath (1 Hz). |

### Shot 4 — Close on halo, mesh sync visible (0:07 to 0:10)

| Element | Spec |
|---|---|
| Subject | Cut to a 100mm macro on the halo. The pulse briefly shifts from emerald to cyan for 400ms — a mesh sync event. Immediately returns to emerald. |
| Camera | 100mm macro at the halo, f/2.8, focus locked. |
| Sound design | Single soft ping at the color shift. |
| Screen recording | None. Optional overlay: on the bottom-third, a small mesh-status pill from thox-terminal v0.3.0-rc8's DeviceCard showing this Air as a peer. Composite in post; do not shoot the phone screen. |

---

## Voiceover

- 0:00 -> 0:04 — "ThoxMini Air. Seventy-nine dollars. Carry it."
- 0:04 -> 0:10 — "Halo ring. Mesh-sync with the rest of your THOX gear. Battery lasts the day."

Voice: Phamy leads. This beat carries the "everyday personal AI" story.

---

## On-screen graphics

- Lower-third at 0:00: `ThoxMini Air   $79` in IBM Plex Sans Medium, emerald accent bar #00A67E.
- Optional bottom-third pill at 0:07: `mesh: 2 peers online` from thox-terminal v0.3.0-rc8 DeviceCard styling.

---

## Required assets

1. 1 x printed ThoxMini Air v4 with `thoxymicro` firmware — user action #7. **BLOCKING.**
2. Charcoal daypack + hook + hallway location.
3. THOX emerald + cyan LED programs pre-flashed on the halo strip driver.
4. Optional 2nd node (any ThoxMini or another Air) somewhere in the environment for the mesh-sync moment to be real, not faked. If unavailable, the color shift can be scripted deterministically for the shot but the VO should not claim a live peer count.

## Shoot time estimate

- 45 min location + lighting setup
- 75 min principal (Shot 2 takes 8+ tries to nail the click-and-lock; Shot 3 needs 5 walking takes for the pulse cadence to land clean; Shot 4 needs 6 takes at different mesh-sync timing offsets)
- 30 min pickup + safety recording

Total: ~2.5 h on the day. Edit pass: 60 min.

## Voiceover script for teleprompter

> ThoxMini Air. Seventy-nine dollars. Carry it.
> Halo ring. Mesh-sync with the rest of your THOX gear.
> Battery lasts the day.

## Fallback plan

If firmware halo strip is not ready by shoot day:
- Substitute a passive-LED-on-driver mockup for the halo. Shoot the beat identically.
- Skip Shot 4's color shift; hold the emerald steady for the last 3 seconds.
- Do not overclaim mesh-sync in VO in that case — cut the line "Mesh-sync with the rest of your THOX gear."
