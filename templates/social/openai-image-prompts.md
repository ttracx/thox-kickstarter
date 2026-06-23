# OpenAI Image Prompt Library (graphics)

Paste-ready prompts for generating THOX social graphics with OpenAI `gpt-image-1`. Fill the
`{slots}`, generate 3–4 variants, then run the **Brand QC checklist** in
[docs/AI_CONTENT_PIPELINE.md](../../docs/AI_CONTENT_PIPELINE.md) before animating with Grok.

> **How to use:** copy a block, replace every `{slot}`, paste into the API/app. The shared
> **Brand Style Block** (below) is prepended to *every* prompt — it is what keeps output on the
> THOX palette and away from overclaiming. For device accuracy, attach the matching
> `assets/device/` EVT photo as a reference/edit image.

---

## Brand Style Block (prepend to every prompt)

```
STYLE: Premium hardware product art for THOX.ai, a local-first personal AI company.
Aesthetic: dark, precise, engineering-grade, calm. Studio lighting on a near-black slate
background (#0a0e14). Primary accent emerald #10b981 and #34d399; a single neon-emerald
status pip #00ff88 used sparingly; MagStack purple #a855f7 ONLY on a cluster-leader node or a
THOX badge; amber #f59e0b ONLY if a warning state is shown. White text #fafafa, muted slate
#94a3b8 for secondary. Typography feel: Inter (clean geometric sans) and JetBrains Mono for
labels/numbers. Generous negative space. No clutter, no lens flares, no fake UI a device can't
have, no stock-photo gloss. Honest, understated, high-end. Composition leaves the center 80%
clear for later text overlay. Subtle film grain at most.
NEGATIVE: gaudy colors, rainbow gradients, neon overload, exclamation energy, busy backgrounds,
extra ports/screens/buttons that don't exist, cartoonish, low-detail, watermark, distorted text.
```

---

## Device reference (so generated hardware matches reality)

| Device | What it is, visually | Never show |
|---|---|---|
| **ThoxClip** | Small anodized-aluminum wearable clip, magnetic back, one emerald LED accent, dual mic ports, USB-C. No screen. | A screen, a chat UI, anything implying it runs an LLM |
| **ThoxMini** | Tiny pocketable RISC-V board/enclosure, USB-C, header pins, emerald trace accents. | A large heatsink, a display |
| **ThoxAir** | Small square Pi-class node, magnetic stack pins on edges, stackable; the leader node carries a purple accent. | More than 6 stack pins |
| **ThoxNova** | Compact passive-cooled desktop mini-PC, matte ink finish, emerald THOX badge, dock slot for one ThoxClip. | Loud RGB, a built-in monitor |

---

## 1. Single-device hero tile (Product pillar)

```
{Brand Style Block}
SUBJECT: A single {device} shown as the hero, three-quarter view, floating slightly above a
dark slate surface with a soft emerald rim light. Sharp macro detail on the {key feature:
magnetic clip / RISC-V board / magnetic stack pins / passive vents and THOX badge}. One emerald
accent glowing softly. Empty space {top|left} for a headline overlay.
ASPECT: {1:1 | 4:5 | 16:9}. Illustration, not a real product photo.
```

## 2. The family on the shelf (Product / brand anchor)

```
{Brand Style Block}
SUBJECT: All four THOX devices arranged left-to-right on a clean matte shelf in scale order:
ThoxClip (smallest wearable), ThoxMini (small board), a ThoxAir node (with one ThoxAir showing
a purple cluster-leader accent), and ThoxNova (the largest, a compact desktop hub with an
emerald THOX badge). Even studio light, shallow depth of field, emerald rim light tying them
together. The composition reads as "one family, four sizes."
ASPECT: 16:9. Stylized illustration.
```

## 3. Proof tile — the 3-second boot (Proof pillar)

```
{Brand Style Block}
SUBJECT: Macro of a ThoxMini board mid-boot, a single emerald status LED lit, a faint
JetBrains-Mono-style terminal glow reflecting off the slate surface suggesting a fast boot.
Mono numerals feel present but leave the lower third clear for an overlaid "0:03" timer added
in post. Quiet, technical, credible.
ASPECT: 9:16. Stylized illustration.
```

## 4. Cluster cascade (Proof / EdgeAI)

```
{Brand Style Block}
SUBJECT: Four ThoxAir nodes magnetically stacked into a vertical tower on a dark surface, pogo
pins aligned, the top "leader" node carrying a subtle MagStack purple #a855f7 accent while the
others stay emerald. Thin emerald light traces suggest data flowing up the stack as one unit.
Engineering-elegant, not sci-fi.
ASPECT: 4:5. Stylized illustration.
```

## 5. Thesis card — "silicon you own" (Thesis pillar)

```
{Brand Style Block}
SUBJECT: A conceptual, minimal composition: a single bare silicon chip die on dark slate, a
soft emerald glow rising from it, the four THOX devices implied as small silhouettes orbiting
it at a distance. Negative-space-heavy, room for the headline "Your AI. Your Data. Your Rules."
to be overlaid in post. Calm, premium, almost editorial.
ASPECT: 1:1 (carousel cover) or 16:9.
```

## 6. People / behind-the-build (People pillar)

```
{Brand Style Block}
SUBJECT: A warm, dim engineering-workbench scene: EVT THOX device units, a soldering station,
a logic analyzer, hand tools, an emerald-lit monitor in soft focus in the background. No faces
(or one anonymous hand placing a ThoxClip on the bench). Conveys "real hardware, real people,
real work." Documentary feel, not glossy.
ASPECT: 4:5 or 16:9.
```

## 7. Campaign / reward-tier tile (Campaign pillar)

```
{Brand Style Block}
SUBJECT: A clean promotional tile for the "{tier name}" reward. The {device or bundle} centered
on dark slate with an emerald accent frame. Large clear zone in the {lower third|right side}
for an overlaid price "{price}" and tier name in Inter/JetBrains Mono added in post. Minimal,
confident, retail-grade but not loud.
ASPECT: 1:1. Stylized illustration. (Price text is added later in post, not generated.)
```

## 8. Countdown tile base (Ramp / countdown series)

```
{Brand Style Block}
SUBJECT: A countdown template tile featuring {device of the day} on dark slate with a strong
emerald accent, and a large empty circular/badge area in the {top-right} reserved for an
overlaid day number ("T-{n}") added in post. Same composition across the series so only the
device and number change. Bold, simple, thumb-stopping at small size.
ASPECT: 9:16. Stylized illustration.
```

## 9. Stretch-goal thermometer (Campaign / sustain)

```
{Brand Style Block}
SUBJECT: An abstract, elegant progress visualization: a vertical emerald energy bar / fill
gauge on dark slate, glowing brighter toward a marked threshold, with faint tick marks. Leave
clear space for overlaid labels ("$500K — ThoxOS Mini preflashed") in post. No literal cartoon
thermometer; keep it engineering-elegant.
ASPECT: 9:16 or 1:1.
```

## 10. Profile + OG set (one-time brand assets)

```
{Brand Style Block}
SUBJECT: A minimal brand mark composition for a profile avatar — the THOX wordmark or a single
emerald THOX glyph centered on dark slate #0a0e14 with one neon-emerald pip. Crisp, balanced,
legible at 64px. Also usable as the base for an OG link-preview card with room for a tagline.
ASPECT: 1:1 (avatar) / 1.91:1 (OG card). Flat, vector-clean look.
```

---

## Slot cheat-sheet

| Slot | Allowed values (from CAMPAIGN_INFO.md) |
|---|---|
| `{device}` | ThoxClip, ThoxMini, ThoxAir, ThoxNova |
| `{tier name}` / `{price}` | Early-bird ThoxClip $39, ThoxClip $49, ThoxMini $69, ThoxAir $79, Cluster Pack $349, ThoxNova $499, Family Bundle $599, Founders Pack $1,299 |
| `{aspect}` | 1:1, 4:5, 16:9, 9:16 |
| `{key feature}` | magnetic clip, dual mics, RISC-V board, magnetic stack pins, passive cooling, THOX badge |

Reproducibility: save the filled prompt + seed in the asset's `.txt` sidecar (see
AI_CONTENT_PIPELINE §7).
