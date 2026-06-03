# Video Production

Companion to `deliverables/THOX_Video_Script.docx`. The script is the canonical scene list; this doc covers production logistics.

## Deliverables out of production

- 2:30 hero master, 1080p H.264 + AAC, < 200 MB, for Kickstarter upload.
- 1:00 hero cut for the Kickstarter Story page (above-the-fold autoplay; same encode).
- 0:15 social teaser, 1:1 square, no voiceover, music-bed only.
- 3:30 long-form explainer, 1080p, with the extra 30-second real-chat segment.
- B-roll bin: 18 unedited clips, 5 seconds each, exported as separate files.
- Stills bin: 12 still frames extracted from the master, for press use.

## Schedule

| Date | Phase | Days | Owner |
|---|---|---|---|
| 2026-05-15 | Pre-production lockdown (script, storyboard, prop list) | 7 | P |
| 2026-05-22 | Practical shoot (real devices, real desk, real hands) | 3 | C + DP |
| 2026-05-25 | AI video generation pass (scenes 1, 2, 3, 6, 8, 9, 11) | 4 | P |
| 2026-05-29 | Edit pass 1 | 5 | DP + Editor |
| 2026-06-03 | Color + sound | 3 | Editor |
| 2026-06-06 | Final master + 3 cuts | 2 | Editor |
| 2026-06-08 | QC and approval | 1 | B |
| 2026-06-15 | Press cut goes out under embargo (T-58 days) | - | P |

## Practical-shoot scenes (real footage preferred)

| Scene | Why practical | Notes |
|---|---|---|
| 4 (ThoxClip macro) | Hands + magnetic snap + LED pulse needs real physics | 85mm macro; one human hand in frame, no face |
| 5 (ThoxMini boot timer) | Real boot, real LED, real terminal overlay | Stop-motion the LED if needed; aim for sub-3 second boot in shot |
| 7 (ThoxNova dashboard) | Real chat streaming on a real monitor reads better than gen-AI | Record the dashboard from the actual ThoxNova EVT unit; tie playback to a deterministic chat replay so we can re-shoot if needed |
| 10 (price overlay shot) | Real shelf with the four real devices is the campaign's credibility anchor | Use the same shelf and angle as the hero family shot to keep continuity |

## AI-generation scenes

| Scene | Tool (suggested) | Prompt source |
|---|---|---|
| 1 (cold open living room) | Veo 3 or Runway Gen-3 | Script row 1, "Gen prompt" cell |
| 2 (paywall glitch) | Sora 2 | Script row 2 |
| 3 (four devices on shelf) | Either; practical preferred if budget permits | Script row 3 |
| 6 (cluster cascade) | Pika 2 or Runway | Script row 6 |
| 8 (topology montage) | Compose in After Effects from practical B-roll | n/a |
| 9 (Honest claims text card) | After Effects kinetic type | Script row 9 |
| 11 (brand close card) | After Effects | Script row 11 |

## Cast and crew

- DP / camera op: TBD, hire from Reno production network.
- Editor: TBD, must be familiar with kinetic typography + 24fps cinema masters.
- Voiceover: warm female voice, mid-30s, dry tone. Casting via Voices.com; budget $1,500 for 2:30 master + 3 cuts.

## Sound design

- Music: original ambient analog synth bed, commissioned from local musician. Budget $2,500. No stock music.
- Foley: practical only. Magnetic snap, USB-C click, button press, fan hum at very low level.
- No alarm sounds, no notification dings, no whoosh-transitions.

## Color

- All studio scenes on a dark slate (#0a0e14) background.
- Emerald (#10b981, #34d399) for primary accent.
- MagStack purple (#a855f7) only on the ThoxAir leader and the THOX badge on ThoxNova.
- Amber (#f59e0b) reserved for one warning state if shown; absent from the hero master.

## Approval gates

| Gate | Approver | Threshold |
|---|---|---|
| Storyboard | B | All 11 scenes drawn + sketched |
| Practical-shoot dailies | C | Every device shot at least three angles |
| Picture-locked rough cut | P | VO timing fits, lower-third type readable on mobile |
| Color pass | C | Devices look like the EVT units, not glossier |
| Sound mix | P | VO LUFS-16, music ducked under VO -8 dB |
| Final master | B | Both founders sign off; no edits after this |

