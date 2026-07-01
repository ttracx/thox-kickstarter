# Video beat script: MagStack 8-clip column doing inference

**Beat**: "An 8-clip MagStack column doing inference (visible LED wave sweeping the stack)."
**Position**: hero video, beat 3c of the 2:30 master (~0:37 to 0:43).
**Runtime target**: 6 seconds on camera + 2 seconds voiceover tail.
**Blocked on** (physical): user action #7 (ThoxMini Air v4 print + assemble, 90 min) + user action #8 (Cluster Dock print, 6.5h) in `PULL_FORWARD_TRACKER.md`.
**Blocked on** (firmware): magstack-air v0.2.0 (tag exists 2026-06-03) — deploy to real 4-8 node Luckfox Pico Mini B ring per shipping plan Team F.

This script is production-ready prep — the moment the 8 Air v4 units + Cluster Dock are printed and firmware-flashed, principal photography starts.

---

## Cross-reference: source repos + canonical facts

| Fact | Source of truth | Note |
|---|---|---|
| ThoxMini Air SoC | project memory `thoxmini_air_soc` — Luckfox Pico Mini B (RV1103, 64MB DDR2, 128MB flash, 0.5 TOPS NPU) | REVISED 2026-06-25; Pi Zero W retired. `docs/CAMPAIGN_INFO.md` still lists BCM2835 — refer to memory as authoritative. |
| MagStack ring | project memory `magstack_air` — 6-pin pogo (5V, GND, UART_TX, UART_RX, I2C_SDA, I2C_SCL), Cluster Coordinator agent A14 | Runs on 4-8 nodes; hero shot is the 8-node column |
| ThoxMini Air enclosure | `thox-3dprint-kit/devices/thoxmini-air/kit-v4/` + `1e050f2` OpenSCAD source-of-truth per ADR-003 | v4 kit-v4 4 button cutouts + carabiner ring |
| Cluster Dock | `thox-q2-print-farm` Cluster Dock print pack (`726236d`, merged PR #3) | Split-and-bond dovetail joint print pack |
| Firmware | `magstack-air` v0.2.0 tag + `magstack-air-edge-rs` P0.3 | Sibling repo `magstack-air-llm` also exists for LLM routing |
| LED beat | Emerald pulse out of phase by 90 degrees per node — "wave through the stack" motion | Team F acceptance criteria in KICKSTARTER_SHIPPING_PLAN |
| Launch price | `docs/CAMPAIGN_INFO.md` — $79 single, $349 4-pack Cluster Pack | REWARDS_MATRIX.md |

---

## Shot list

### Shot 1 — Cluster Dock reveals on desk (0:00 to 0:01)

| Element | Spec |
|---|---|
| Subject | Cluster Dock on walnut desk. Empty. Emerald THOX wordmark laser-etched into the base plate. |
| Camera | 35mm at eye level; slight 5deg down-tilt. Locked. |
| Lighting | 4200K key from camera-left; 6500K low bar under the desk edge for cyan spill. |
| Sound design | Ambient room tone. |

### Shot 2 — Hands stack 8 nodes in sequence (0:01 to 0:04)

| Element | Spec |
|---|---|
| Subject | Right hand places ThoxMini Air units onto the dock one at a time; each snap is a 6-pin pogo click. Frame counts up: 1, 2, 3, 4, 5, 6, 7, 8. Left hand steadies the stack as it grows. |
| Camera | 50mm at desk height, f/2.8, focused on the top-of-stack position; the stack grows toward the lens. Alternate: overhead 24mm on a slider for a top-down variant. |
| Lighting | Same as shot 1; add a cyan #27E5FF rim from behind the stack that becomes more visible as each unit clicks in (LED contribution). |
| Sound design | 8 magnetic pogo clicks at uneven ~0.35s intervals. Each click resonates slightly deeper than the last as the column mass grows. |

### Shot 3 — LED wave sweeps the stack (0:04 to 0:06)

| Element | Spec |
|---|---|
| Subject | Full 8-node column. Emerald LEDs on each node pulse out of phase by 90 degrees — a slow visible wave travels bottom-to-top over 2 seconds, then loops. |
| Camera | Cut to 85mm front-on at column midpoint, f/4. Locked-off. Frame the whole stack head-to-toe. |
| Lighting | Fill goes down 2 stops; the LED wave carries the shot. Faint 6500K rim to separate matte black from black bg. |
| Sound design | The magstack-air Cluster Coordinator's leader-election chirp (single soft tone, ~800Hz, 200ms). Then silence. The wave carries. |
| Screen recording | Optional B-roll: side monitor shows `thox-terminal` v0.3.0-rc8 device list with 8 nodes discovered via mDNS `_thox._tcp`, leader elected, work queue distributing. Do not cut to it in the master; keep the LED wave as the hero visual. |

---

## Voiceover

- 0:00 -> 0:04 — "ThoxAir. Seventy-nine dollars each. Three hundred forty-nine for the four-pack."
- 0:04 -> 0:06 — "Stack them. Leader election, work queue, mesh sync. Every added node is more capacity."

Voice: Craig closes (matches the hardware cadence).

---

## On-screen graphics

- Lower-third at 0:00: `ThoxAir   $79   |   4-pack $349` in IBM Plex Sans Medium, emerald accent bar.
- Node counter top-right during shot 2: `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8` matching the physical additions.
- At 0:06 the counter locks to `8 nodes online` and the LED wave loops for the beat handoff.

---

## Required assets

1. 8 x printed ThoxMini Air v4 enclosures — user action #7 x 8. **BLOCKING (90 min each = full print farm shift).**
2. 8 x Luckfox Pico Mini B boards flashed with magstack-air firmware (see thoxymicro at `/usr/local/bin` per project memory).
3. 1 x printed Cluster Dock — user action #8. **BLOCKING (6.5 h Q2 Combo print).**
4. 8 x 6-pin pogo connector assemblies (5V, GND, UART_TX, UART_RX, I2C_SDA, I2C_SCL).
5. USB-PD 65W power source into the dock base.
6. Optional side monitor for the `thox-terminal` mDNS discovery B-roll.

## Shoot time estimate

- 1 h dock + LUT setup
- 90 min principal (Shot 2 needs 10+ takes to nail the 8-click cadence; Shot 3 needs 6 loop takes at different LED phase settings)
- 30 min pickup

Total: ~3 h on the day. Edit pass: 60 min including the LED-wave loop composite.

## Voiceover script for teleprompter

> ThoxAir. Seventy-nine dollars each. Three hundred forty-nine for the four-pack.
> Stack them. Leader election, work queue, mesh sync.
> Every added node is more capacity.

## Safety notes

- Cluster Dock dovetail joint strength verified per Team F workstream item 3 before principal photography.
- Firmware pre-flash sanity: each unit boots to the emerald LED holding pattern in <10s cold, per magstack-air v0.2.0 acceptance.
