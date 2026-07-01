# Video beat script: Unbox ThoxNova (hero video)

**Beat**: "Tommy or Phamy unboxing a ThoxNova v2 (matte black) and powering it on — display lights up with ThoxOS within 8 seconds."
**Position**: hero video, beat 3d of the 2:30 master (~0:43 to 0:52).
**Runtime target**: 9 seconds on camera + 3 seconds voiceover tail.
**Blocked on** (physical): user action #9 in `PULL_FORWARD_TRACKER.md` — flash ThoxNova LattePanda N100 with Ubuntu 24.04 + run install.sh (30 min).
**Blocked on** (Ollama tag): Team D (Phamy) — Phase C 12B training fire + `ttracx/thoxgemma4-12b:phase-c` publish to Ollama Hub (waits on `HF_TOKEN` + rig pick per section 4 Wave 1 of the tracker).

This script is production-ready prep — camera, lighting, sound, VO, on-screen graphics, and the required screen recording. Shoot can start the moment the flashed Nova unit is on the desk.

---

## Cross-reference: source repos + canonical facts

| Fact | Source of truth | Note |
|---|---|---|
| ThoxNova SoC | project memory `thoxnova_soc` — LattePanda N100 (Intel x86 4c/4t, 6 W TDP base) | Locked 2026-06-01; replaces the earlier Jetson Orin NX prototype |
| ThoxNova v2 enclosure STL | `thox-3dprint-kit/devices/thoxnova/v2/` | v2 spec sheet at `thoxnova/v2/README.md` |
| ThoxOS shell + boot posture | `thoxos-kernel` v1.2.0 signed release (2026-06-29) | Signed release evidence exists per `PULL_FORWARD_TRACKER.md` |
| Launch price | `docs/CAMPAIGN_INFO.md` — $499 backer | REWARDS_MATRIX.md tier 4 |
| Runtime path | thoxos-kernel + THOXCore Ollama adapter (`v0.2.0-ollama`, 19 tests) | Wave 2 THOXCore per KICKSTARTER_SHIPPING_PLAN |
| Local Ollama tag | `ttracx/thoxgemma4-12b:phase-c` — wired via thoxllm-factory v0.1.5 registry entry (eb1a134) | Not yet published; Phase C training fire pending |

---

## Shot list

### Shot 1 — Box on desk, hands enter (0:00 to 0:02)

| Element | Spec |
|---|---|
| Subject | Matte black THOX outer shipping box on walnut desk. Emerald THOX wordmark reflects the key light. Two hands enter frame from bottom. |
| Camera | 35mm at 45deg down-angle, f/4, 1/120 shutter. Locked-off. |
| Lighting | Single 60cm soft octobox key at 4200K from camera-left; cyan #27E5FF accent bar behind the box for rim separation. |
| Sound design | Cardboard scuff as hands touch the box. |

### Shot 2 — Lift lid, foam tray reveal (0:02 to 0:04)

| Element | Spec |
|---|---|
| Subject | Hands lift the box lid. Foam tray with ThoxNova v2 seated in a recessed cutout matching `thoxnova/v2/` STL envelope. THOX emerald deboss on the top face catches the key light. |
| Camera | Same 35mm; slow push-in 3cm over 2 seconds. |
| Lighting | Same. |
| Sound design | Foam-on-cardboard release, one soft breath. |

### Shot 3 — Nova on desk, power connects (0:04 to 0:07)

| Element | Spec |
|---|---|
| Subject | ThoxNova v2 sits on desk left-of-frame. Right hand connects a USB-C PD cable to the rear. Front LED bar lights emerald and holds. |
| Camera | Cut to 85mm macro on the front face, f/2.8, focused on the LED bar. |
| Lighting | Key softens; the LED does the work. |
| Sound design | Cable click, then a soft LED-pulse tone at the emerald moment. |

### Shot 4 — Display comes up in <8s (0:07 to 0:12)

| Element | Spec |
|---|---|
| Subject | Cut to an external 24" 1080p monitor connected via HDMI. Screen shows the ThoxOS boot progress from `thoxos-kernel` v1.2.0 signed release, resolving to the THOX desktop shell + local skill catalog. Timer overlay bottom-right: `0.0s -> 7.6s`. |
| Camera | 50mm at monitor height, locked-off. Screen-record for compositing; do not point a camera at the monitor. |
| Lighting | Monitor is the light source; kill the fill. |
| Sound design | Silent for the boot; the ThoxOS boot chime at first-shell-frame. |
| Screen recording | Capture full 1080p60 of the boot at the Nova. Trim to the exact `power-on -> shell-visible` moment for the timer overlay. |

### Shot 5 — First inference (0:12 to 0:16)

| Element | Spec |
|---|---|
| Subject | Tommy types `ollama run thoxgemma4-12b:phase-c` at the ThoxOS shell. First token streams in under 2 seconds. VO delivers the tagline over the stream. |
| Camera | 50mm framed on the monitor; capture as screen-record. |
| Sound design | Single keyboard tap; silence as the token appears. |
| Screen recording | Full session `ollama run thoxgemma4-12b:phase-c` -> "Explain what running locally means for privacy in one sentence." Capture the ttracx/thoxgemma4-12b:phase-c model tag banner + the first-token timing. |

---

## Voiceover

- 0:04 -> 0:07 — "ThoxNova. Four hundred ninety-nine dollars. The flagship."
- 0:07 -> 0:12 — "LattePanda N100 inside. Eight seconds from cold to shell. Runs the twelve-billion parameter Gemma-class model right here."
- 0:12 -> 0:16 — "Your prompts stay on the box. Nothing leaves unless you tell it to."

Voice: Tommy leads (matches the ThoxNova cadence in `content/launch/UNBOXING_SCRIPTS/04_thoxnova.md`).

---

## On-screen graphics

- Lower-third at 0:04: `ThoxNova   $499` set in IBM Plex Sans Medium, THOX emerald accent bar #00A67E.
- Boot timer at 0:07: `0.0s -> 7.6s` in monospace at bottom-right; count-up matches the actual boot recording.
- Model banner at 0:12: `ttracx/thoxgemma4-12b:phase-c` from the terminal itself; do not overlay.

---

## Required assets

1. Flashed ThoxNova v2 physical unit — user action #9. **BLOCKING.**
2. Phase C 12B model tag `ttracx/thoxgemma4-12b:phase-c` published to Ollama Hub — Team D. **BLOCKING.**
3. ThoxOS boot chime WAV — assets library (existing).
4. THOX emerald accent bar LUT — brand vault v1.0 (existing).
5. 24" monitor + HDMI cable + USB-C PD 65W supply.
6. Matte black outer shipping box + foam tray in `thoxnova/v2/` cutout profile — 3D-print farm or shipping supplier.

## Shoot time estimate

- 2 h setup (LUT + monitor calibration + box dressing)
- 90 min principal (12 takes of shots 1-3, 8 boot-cycle captures for shot 4, 6 inference takes for shot 5)
- 30 min pickup + safety recording

Total: ~4 h on the day. Edit pass: 90 min.

## Voiceover script for teleprompter

> ThoxNova. Four hundred ninety-nine dollars. The flagship.
> LattePanda N100 inside. Eight seconds from cold to shell.
> Runs the twelve-billion parameter Gemma-class model right here.
> Your prompts stay on the box. Nothing leaves unless you tell it to.
