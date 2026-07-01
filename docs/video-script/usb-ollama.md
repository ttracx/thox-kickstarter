# Video beat script: ThoxMini USB stick, Ollama running locally

**Beat**: "A ThoxMini USB stick plugged into a generic laptop running `ollama run thoxgem:e4b` and getting a response in <10 sec."
**Position**: hero video, beat 3b of the 2:30 master (~0:31 to 0:37).
**Runtime target**: 6 seconds on camera + 2 seconds voiceover tail.
**Blocked on** (Ollama tag): Team D (Phamy) — Phase C 12B training fire + `ttracx/thoxgemma4-12b:phase-c` publish to Ollama Hub. Alternate tag path: `thoxgem:e4b` via `thoxllm-factory` v0.1.5 registry + HF upload automation `2e71f27`.
**Not blocked** on hardware: ThoxMini v2 STL is ready and prints on the Q2 Combo per `thox-3dprint-kit/devices/thoxmini/v2/` and the Luckfox Pico Mini B stack in project memory.

This script is production-ready prep — the moment the Phase C training fire completes and the Ollama tag is pushed, principal photography starts.

---

## Cross-reference: source repos + canonical facts

| Fact | Source of truth | Note |
|---|---|---|
| ThoxMini SoC | project memory `thoxmini_soc` — Luckfox Pico Mini (RV1103) | `docs/CAMPAIGN_INFO.md` still lists Milk-V Duo (CV1800B) — refer to memory as authoritative; script says "RISC-V edge node" to avoid disambiguation on camera |
| ThoxMini form factor | USB-C stick, USB gadget mode via `thoxymicro` Go agent at `/usr/local/bin` per project memory | Powers itself off the host laptop's USB-C |
| Ollama tag pathway | `thoxllm-factory` v0.1.5 (eb1a134) registry -> apply LoRA -> GGUF Q4_K_M -> Ollama tag `ttracx/thoxgemma4-12b:phase-c` | Preferred canonical tag; `thoxgem:e4b` remains valid alternate per REWARDS_MATRIX |
| Launch price | `docs/CAMPAIGN_INFO.md` — $69 backer | REWARDS_MATRIX.md tier 2 |
| THOXCore adapter | `thoxcore` v0.2.0-ollama (19 tests) — real HTTP client against Ollama native NDJSON API | Composes with all thoxllm-factory shipping tags |
| Latency claim | <10 sec first token on a generic laptop over USB-C gadget | Verify by measuring the actual first-token latency in the take |

---

## Shot list

### Shot 1 — Laptop on desk, hand approaches with ThoxMini (0:00 to 0:02)

| Element | Spec |
|---|---|
| Subject | Generic modern laptop, closed lid on walnut desk. Right hand enters with a ThoxMini stick between thumb and index finger. THOX emerald wordmark on the stick catches the key light. |
| Camera | 50mm at desk height, f/2.8, shallow DOF on the stick. |
| Lighting | 4200K soft key from camera-left; cyan #27E5FF pin-light on the stick end for accent. |
| Sound design | Room tone. |

### Shot 2 — Plug into USB-C port, LED handshake (0:02 to 0:03)

| Element | Spec |
|---|---|
| Subject | ThoxMini slides into the laptop's USB-C port. Stick's emerald LED holds for 1 second, then pulses once as USB-gadget mode enumerates. |
| Camera | 100mm macro at port level, f/4. Locked. |
| Lighting | Add a 6500K rim from behind the laptop to define the port edge. |
| Sound design | Positive click as the connector seats. Faint LED-pulse tone. |

### Shot 3 — Lid opens, terminal on screen (0:03 to 0:04)

| Element | Spec |
|---|---|
| Subject | Left hand opens the laptop lid; screen already has an open terminal ready (pre-positioned to avoid a wake-lag on camera). |
| Camera | 35mm three-quarter view, focus racks from stick to screen over 1 second. |
| Lighting | Screen carries; kill the fill. |

### Shot 4 — Type `ollama run thoxgem:e4b` (0:04 to 0:07)

| Element | Spec |
|---|---|
| Subject | Screen-recording: user types `ollama run thoxgem:e4b`. Model pulls (if not cached) then streams a first-token response. |
| Camera | Screen recording, not a camera shot. Composite into the beat at monitor position. |
| Screen recording | 1080p60 capture of the full terminal session at the ThoxMini pipe: `ollama run thoxgem:e4b "In one sentence, why do you run locally?"`. Preserve first-token timing overlay bottom-right in the terminal. |
| Sound design | Single keyboard tap. Silence as the token appears. |

### Shot 5 — First-token timer + tagline (0:07 to 0:08)

| Element | Spec |
|---|---|
| Subject | Timer overlay renders `first token: 3.4s` (actual measured latency substituted). Cut back to the physical stick as VO tag lands. |
| Camera | Match-cut from Shot 4 back to Shot 3's rack. |

---

## Voiceover

- 0:00 -> 0:04 — "ThoxMini. Sixty-nine dollars. RISC-V edge compute on a USB stick."
- 0:04 -> 0:08 — "Plug it in. `ollama run`. First token in under ten seconds. No cloud, no account."

Voice: Tommy leads (matches the developer-story cadence).

---

## On-screen graphics

- Lower-third at 0:00: `ThoxMini   $69` in IBM Plex Sans Medium, THOX emerald accent bar #00A67E.
- Terminal has native first-token timing; no overlay needed.
- At 0:07, small brand-cyan checkmark next to the timer.

---

## Required assets

1. 1 x ThoxMini v2 physical unit with `thoxymicro` Go agent installed, USB-gadget mode functional.
2. Published Ollama tag on `ollama.com/ttracx/thoxgem:e4b` (or `ttracx/thoxgemma4-12b:phase-c`) — Team D. **BLOCKING.**
3. Generic modern laptop with `ollama` installed, USB-C port unobstructed.
4. Screen-recorder configured for 1080p60, LUT applied.
5. Pre-positioned terminal window at exact pixel location for the lid-open cut.

## Shoot time estimate

- 1 h laptop + terminal + screen-recorder setup
- 60 min principal (5 takes of the enumerate-and-run cycle; 3 takes of the physical insertion; 8 first-token captures for the tightest timing)
- 30 min pickup

Total: ~2.5 h on the day. Edit pass: 45 min.

## Voiceover script for teleprompter

> ThoxMini. Sixty-nine dollars. RISC-V edge compute on a USB stick.
> Plug it in. `ollama run`. First token in under ten seconds.
> No cloud, no account.

## Fallback plan

If Phase C 12B tag is not yet on Ollama Hub by shoot day:
- Substitute `ttracx/thoxgemma4-e4b-sft` (Phase B done 2026-06-05, LoRA on disk) staged locally.
- Keep the `ollama run` UX identical; only the model tag string changes.
- Update the VO to say "the Gemma-class SFT model" instead of the specific tag, so the video does not overclaim about the not-yet-published tag.
