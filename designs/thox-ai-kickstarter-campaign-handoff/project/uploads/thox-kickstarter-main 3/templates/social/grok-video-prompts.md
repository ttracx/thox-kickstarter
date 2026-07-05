# Grok Video Prompt Library (motion)

Paste-ready **image-to-video** motion prompts for Grok Imagine (xAI). Each takes a QC-passed
OpenAI still (from `openai-image-prompts.md`) as the first frame and animates it. See the Grok
workflow in [docs/AI_CONTENT_PIPELINE.md](../../docs/AI_CONTENT_PIPELINE.md) §4.

> **Golden rule:** the still is the truth. Motion is subtle and physical — push-ins, parallax,
> LED pulses, magnetic snaps, rack focus. Never let Grok warp a device, drift the emerald hue,
> or invent on-screen text. Target 6 s per clip; assemble longer pieces in post. Generate 2–3
> takes, keep the one with the least geometry drift.

---

## Shared Motion Style Block (prepend to every motion prompt)

```
MOTION STYLE: Cinematic, calm, premium product motion. Slow deliberate camera moves only.
Preserve the exact geometry, materials, and colors of the source image — emerald accents stay
emerald (#10b981/#34d399), never shifting to teal or cyan. Lighting stays consistent. Subtle
depth-of-field and a faint parallax. 24 fps feel. No morphing, no melting, no warping of the
device, no extra objects appearing, no text generated on screen, no fast whip-pans, no glitch
transitions. Quiet and confident, matching a high-end engineering brand.
```

---

## 1. Hero push-in (single device)

```
{Shared Motion Style Block}
A slow, smooth dolly push-in toward the {device}, ending on a gentle macro of its {key feature}.
The single emerald accent LED pulses once, softly, near the end. Background slate stays dark and
still. 6 seconds, ease-in ease-out. Subtle.
```
Pairs with: openai-image-prompts §1 (single-device hero tile).

## 2. Magnetic snap (ThoxClip / ThoxAir)

```
{Shared Motion Style Block}
A {ThoxClip clips onto a magnetic charger | ThoxAir node snaps onto the top of the stack via its
pogo pins} with a quick, satisfying magnetic pull and a tiny settle bounce, then holds steady.
One emerald accent flickers to life on contact. The motion is physical and believable — real
magnetism, not a cartoon. 6 seconds.
```
Pairs with: §1 or §4 stills.

## 3. The 3-second boot (ThoxMini, Proof)

```
{Shared Motion Style Block}
Open on a dark ThoxMini board. A single emerald status LED blinks, then comes fully on as a
faint terminal glow rises and steadies on the slate surface, reading as a successful sub-3-second
boot. Slow, quiet reveal. Hold on the lit board. Leave the lower third dark for an overlaid
"0:03" timer added in post. 6 seconds.
```
Pairs with: openai-image-prompts §3.

## 4. Cluster cascade (ThoxAir stack, Proof)

```
{Shared Motion Style Block}
Slow vertical tilt up the magnetically stacked tower of four ThoxAir nodes. Thin emerald light
traces flow upward from node to node, suggesting data moving through the stack as a single unit;
the top leader node's purple accent glows steadily. The stack stays perfectly aligned and rigid.
6 seconds, smooth tilt.
```
Pairs with: openai-image-prompts §4.

## 5. Family reveal (brand anchor)

```
{Shared Motion Style Block}
A slow lateral tracking shot across the four THOX devices on the shelf, left to right, from the
small ThoxClip to the larger ThoxNova, each catching an emerald rim light as the camera passes.
Shallow depth of field racks gently from one device to the next. Ends on a wide hold of all four.
6 seconds.
```
Pairs with: openai-image-prompts §2.

## 6. Thesis ambient loop (Thesis)

```
{Shared Motion Style Block}
The silicon die at center emits a slow, breathing emerald glow that rises and falls. The four
device silhouettes orbit almost imperceptibly. Designed to loop seamlessly — the last frame
matches the first. No camera move, pure ambient motion. 6 seconds, perfect loop.
```
Pairs with: openai-image-prompts §5. Export as a seamless loop (AI_CONTENT_PIPELINE §6).

## 7. Countdown tile motion (Ramp / countdown series)

```
{Shared Motion Style Block}
A gentle push-in on {device of the day} while the emerald accent pulses once. The reserved badge
area stays clean and still for an overlaid "T-{n}" number added in post. Same restrained move
across the whole series so only the device and number change. 4–6 seconds.
```
Pairs with: openai-image-prompts §8. Animate all eight in one session for consistency.

## 8. Thermometer fill (Campaign / sustain)

```
{Shared Motion Style Block}
The vertical emerald gauge fills upward smoothly toward the marked threshold, glowing brighter
as it rises, then holds at the line with a soft pulse. Tick marks stay fixed. Leave label space
clear for overlaid "$500K" text in post. 6 seconds, satisfying ease-out at the top.
```
Pairs with: openai-image-prompts §9.

## 9. Final-hours urgency (Close phase)

```
{Shared Motion Style Block}
A tighter, slightly more energetic push-in on the {device or family} with the emerald accent
pulsing at a steady, slightly quicker rhythm — urgent but still controlled and premium, never
frantic. Leave space for an overlaid "FINAL 48 HOURS" / countdown added in post. 6 seconds.
```
Pairs with: any hero still + post overlay.

---

## Take-selection checklist (before sending to post)

- [ ] Device geometry unchanged from the still (no warp, no extra parts).
- [ ] Emerald hue held; purple only on the cluster leader / Nova badge; no color drift.
- [ ] Motion is subtle and physical; no morphing, melting, or impossible moves.
- [ ] No text was generated on screen (all type is overlaid later).
- [ ] Clip loops cleanly if it's an ambient/loop piece.
- [ ] Reserved overlay zones stayed clear and stable.

Reject takes that fail any box and regenerate; if multiple takes fail the same way, fix the
source still first (the motion model can't fix a bad frame).

## Slot cheat-sheet

| Slot | Values |
|---|---|
| `{device}` | ThoxClip, ThoxMini, ThoxAir, ThoxNova |
| `{key feature}` | magnetic clip, dual mics, RISC-V board, magnetic stack pins, THOX badge |
| `{n}` (countdown) | 7,6,5,4,3,2,1,0 |

Save the filled motion prompt + the source still's name + take number in the asset `.txt`
sidecar for reproducibility (AI_CONTENT_PIPELINE §7).
