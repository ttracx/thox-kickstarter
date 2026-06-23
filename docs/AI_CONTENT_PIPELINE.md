# AI Content Pipeline: OpenAI Graphics → Grok Video

The end-to-end production runbook for turning a one-line brief into a finished, brand-correct
social asset. **Static graphics are generated with OpenAI (`gpt-image-1`). Motion and video
are produced with Grok (Grok Imagine, xAI).** This doc is the "how to make the pixels"
companion to [SOCIAL_MEDIA_CAMPAIGN.md](SOCIAL_MEDIA_CAMPAIGN.md) (the "what to post and when").

> Prompt libraries live in `templates/social/openai-image-prompts.md` and
> `templates/social/grok-video-prompts.md`. This doc explains the workflow, the tools, the
> brand-locking rules, naming, QC, and the API recipes. Copy the prompts from there.

---

## 0. The pipeline at a glance

```
┌──────────┐   ┌──────────────────┐   ┌───────────────┐   ┌──────────────────┐   ┌──────────┐
│  BRIEF   │ → │  OpenAI gpt-image │ → │   BRAND QC     │ → │  Grok Imagine     │ → │ ASSEMBLE │
│ 1 line   │   │  static graphic   │   │ tokens + claim │   │ image → video     │   │ caption  │
│ + spec   │   │  (key art/tile)   │   │ check          │   │ (animate the art) │   │ + export │
└──────────┘   └──────────────────┘   └───────────────┘   └──────────────────┘   └──────────┘
      │                                                                                  │
      └────────────────────────── single source of truth: CAMPAIGN_INFO.md ─────────────┘
```

**Why this split:** OpenAI's `gpt-image-1` is strong at clean composition, legible text
rendering, and following brand/color instructions precisely — ideal for tiles, key art, and
illustration. Grok Imagine takes a still and animates it (image-to-video), which keeps the
brand-locked frame from the OpenAI step intact while adding motion. Generating video from a
controlled still beats text-to-video from scratch: the device geometry and palette stay
consistent instead of drifting frame to frame.

---

## 1. Prerequisites

| Item | Detail |
|---|---|
| OpenAI API key | `OPENAI_API_KEY` env var. Image model: `gpt-image-1`. |
| Grok / xAI access | Grok Imagine via the Grok app (web/iOS) and/or xAI API key `XAI_API_KEY`. |
| Brand tokens | From `assets/README.md`. Pasted into every prompt; see §4. |
| Device reference stills | `assets/device/` EVT photos. Used as image references so generated devices match real hardware. |
| Fonts | Inter (sans), JetBrains Mono (mono). Generators approximate type; final type is overlaid in post for legal-grade prices/dates. |
| Post tooling | ffmpeg (assembly, captions, encode), any layout tool for final type overlay. |

> **Honesty guardrail:** AI-generated *device* imagery is for stylized/social key art only.
> The Kickstarter Story page and reward tiles must use **real EVT photography** (see
> LAUNCH_CHECKLIST T-30). Never present a generated render as a real product photo. When a
> generated image depicts a device, it is a stylized illustration, and the caption treats it
> as such.

---

## 2. Step-by-step

### Step 1 — Brief
Pull the row from `templates/social/content-calendar.md`. A brief is: pillar + surface
(aspect/size) + device/subject + the one claim it makes. Example:
`Proof / 9:16 Reel / ThoxMini / "boots ThoxOS Mini in under 3 seconds."`

### Step 2 — Generate the static graphic (OpenAI)
1. Open `templates/social/openai-image-prompts.md`, copy the matching prompt block.
2. Fill the `{slots}` (device, claim, aspect).
3. Generate at the target aspect (1024×1024, 1536×1024 landscape, or 1024×1536 portrait;
   upscale/crop to the exact surface size in post).
4. Generate 3–4 variants. Pick the one that needs the least correction.
5. For device accuracy, pass an `assets/device/` photo as an input/reference image so geometry
   and the emerald accent match the real unit.

### Step 3 — Brand QC (gate before any motion)
Run the **Brand QC checklist** in §5. If it fails on a color, the wordmark, or a claim, fix the
prompt and regenerate. **Do not animate a graphic that fails QC** — you will only multiply the
error across 150 frames.

### Step 4 — Animate to video (Grok)
1. Open `templates/social/grok-video-prompts.md`, copy the matching motion prompt.
2. In Grok Imagine, upload the QC-passed still as the **first frame / image input** and apply
   the motion prompt (image-to-video). Keep motion subtle and physical — a slow push-in, an
   LED pulse, a magnetic snap — never warping the device.
3. Target 6 seconds per clip (extend/loop in post). Generate 2–3 takes; pick the one with the
   least geometry drift.
4. For longer pieces, generate several 6s clips and cut them together in post.

### Step 5 — Assemble, caption, export
1. Concatenate clips, add the music bed (per VIDEO_PRODUCTION sound rules — no stock stings).
2. Overlay final type for any price/date/spec using **real Inter/JetBrains Mono** (generator
   text is never trusted for legal-grade numbers).
3. Burn in captions (60%+ watch muted).
4. Encode per §6 and export to `assets/social/` with the naming in §7.

### Step 6 — Approve + ship
Founder gate per SOCIAL_MEDIA_CAMPAIGN §8 for any claim/price/date. Then schedule.

---

## 3. OpenAI image generation — API recipes

Set `OPENAI_API_KEY` first. Model: `gpt-image-1`. Sizes: `1024x1024`, `1536x1024` (landscape),
`1024x1536` (portrait). Use `quality: "high"` for hero art.

### Python
```python
from openai import OpenAI
import base64

client = OpenAI()  # reads OPENAI_API_KEY

prompt = open("prompt.txt").read()  # paste from openai-image-prompts.md, slots filled

resp = client.images.generate(
    model="gpt-image-1",
    prompt=prompt,
    size="1024x1536",     # 4:5 / 9:16-ish portrait; crop to exact surface in post
    quality="high",
    n=4,                  # 4 variants, pick the best
)

for i, img in enumerate(resp.data):
    with open(f"out_{i}.png", "wb") as f:
        f.write(base64.b64decode(img.b64_json))
```

### With a device reference image (image edit / variation)
Pass an `assets/device/` EVT photo so the generated device matches real hardware:
```python
resp = client.images.edit(
    model="gpt-image-1",
    image=open("assets/device/thoxclip-hero-2400x1350.jpg", "rb"),
    prompt=open("prompt.txt").read(),
    size="1024x1024",
)
```

### curl
```bash
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "PASTE_PROMPT_HERE",
    "size": "1536x1024",
    "quality": "high",
    "n": 4
  }'
```

> Endpoints/params can change. Verify against the current OpenAI Images API docs before a big
> batch run; treat the above as the shape, not the contract.

---

## 4. Grok video generation — workflow + API

Grok Imagine (xAI) does **text-to-image, image-to-video, and text-to-video**. For this
pipeline we use **image-to-video**: the OpenAI still is the controlled first frame.

### App workflow (primary, most reliable today)
1. Grok app → Imagine → upload the QC-passed still.
2. Choose **image → video**.
3. Paste the motion prompt from `grok-video-prompts.md`.
4. Generate; download the MP4. Repeat for each clip in a multi-shot piece.

### API workflow (when available in your account)
If you have xAI API access to Grok Imagine video, the shape is image + motion-prompt → video
job → poll → download. Pseudocode:
```bash
# 1) submit an image-to-video job (verify the current xAI endpoint + field names)
curl https://api.x.ai/v1/video/generations \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-imagine",
    "mode": "image-to-video",
    "image_url": "https://.../out_best.png",
    "prompt": "PASTE_MOTION_PROMPT",
    "duration_seconds": 6,
    "aspect_ratio": "9:16"
  }'
# 2) poll the returned job id until status=completed, then download the asset URL
```

> xAI's video API surface is evolving. If the API path above 404s, fall back to the app
> workflow — the creative result is identical, only the automation differs. Confirm current
> endpoints in the xAI docs before scripting a batch.

### Motion direction rules (keep video on-brand)
- **Subtle, physical motion only.** Push-ins, parallax, LED pulse, magnetic snap, slow rack
  focus. No melting, no morphing, no impossible camera moves.
- **Devices keep their geometry.** If Grok warps an enclosure, reject the take. The OpenAI
  still is the truth; motion must respect it.
- **Loops over hard cuts** for ambient tiles; hard cuts only in multi-shot edits.
- **Color stays locked.** Emerald accents must not drift to teal/cyan. If hue drifts, lower
  motion strength or re-anchor to the still.
- **No on-screen text from the video model.** All type is overlaid in post (§2 step 5).

---

## 5. Brand QC checklist (gate before animating, gate before shipping)

Run this against every generated still and every finished video.

- [ ] **Palette** matches tokens: Emerald `#10b981` / light `#34d399`; neon `#00ff88` used
      sparingly; MagStack purple `#a855f7` only on the ThoxAir cluster leader / Nova badge;
      Amber `#f59e0b` only for a warning state; Ink `#0a0e14` background. No off-brand hues.
- [ ] **No invented hardware.** Devices match the real EVT geometry (ports, magnetic clip,
      stack pins). No extra screens, lights, or buttons that don't exist.
- [ ] **No overclaim.** The visual doesn't imply a capability the silicon lacks (e.g. ThoxClip
      showing a chat UI — it has no screen and runs no LLM).
- [ ] **Wordmark** (if present) is clean THOX, correct weight, on-brand color, in the safe area.
- [ ] **Text legibility** at mobile size; any final price/date/spec is real overlaid type, not
      generated glyphs (generated text is for mood only, never for numbers).
- [ ] **Safe area:** key content inside the center 80%.
- [ ] **Numbers** ($39/$49/$69/$79/$349/$499/$599/$1,299, Aug 12 2026, $250K, $3M) exactly
      match CAMPAIGN_INFO.md.
- [ ] **Caption posture** is honest: generated device art is framed as illustration, not photo.

A still that fails any box goes back to Step 2. A video that fails goes back to Step 4 (or
Step 2 if the underlying still was wrong).

---

## 6. Export specs

| Surface | Dimensions | Container/codec | Notes |
|---|---|---|---|
| Static social image | per SOCIAL_MEDIA §6 | PNG (type/flat), JPG q90 (photographic) | sRGB |
| 9:16 / 16:9 video | 1080×1920 / 1920×1080 | MP4, H.264 High, AAC | yuv420p, 24 fps, ~10 Mbps 1080p |
| Looping ambient clip | 1080×1920 | MP4, H.264 | seamless loop, no audio or low music bed |
| OG / link card | 1200×630 | PNG | under 1 MB |

### ffmpeg snippets
Concatenate Grok clips:
```bash
ffmpeg -f concat -safe 0 -i clips.txt -c copy joined.mp4
```
Add music bed + duck nothing (single bed), normalize to -16 LUFS, web-encode:
```bash
ffmpeg -i joined.mp4 -i bed.wav -map 0:v -map 1:a \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -r 24 -b:v 10M \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -shortest out_master.mp4
```
Burn in captions from an SRT:
```bash
ffmpeg -i out_master.mp4 -vf "subtitles=captions.srt:force_style='FontName=Inter,FontSize=42,PrimaryColour=&H00FAFAFA,Outline=2'" -c:a copy out_captioned.mp4
```

---

## 7. Naming + staging

Produced assets land in `assets/social/` (gitignore'd binaries staged here pre-publish; see
`assets/social/README.md`). Filename grammar:

```
{phase}_{pillar}_{device|topic}_{surface}_{v#}.{ext}

examples:
prelaunch_proof_thoxmini_9x16_v2.mp4
launch_campaign_clusterpack_1x1_v1.png
countdown_product_thoxclip_9x16_t-5_v1.mp4
close_campaign_final48_16x9_v3.mp4
```

- `phase` ∈ prelaunch | ramp | countdown | launch | sustain | close | fulfillment
- `pillar` ∈ product | proof | thesis | people | campaign
- `surface` ∈ 1x1 | 4x5 | 9x16 | 16x9 | og | avatar | banner
- Keep the prompt + seed used in a sidecar `.txt` so any asset is reproducible.

---

## 8. Cost + batching discipline

- **Batch by template.** The countdown series (T-7→T-0) is one still template, eight numbers —
  generate the base once, vary the number/device, animate in one Grok session.
- **Stills are cheap, video is dear.** QC the still hard so you only animate winners.
- **Reuse seeds** for a consistent look across a series; log them in the sidecar `.txt`.
- **Keep a "golden set"** of approved base stills (one per device, on-brand) to re-animate for
  future posts instead of regenerating from scratch.

---

## 9. Reproducibility

Every shipped asset is reproducible from three things, all committed or staged:
1. The brief row (`content-calendar.md`).
2. The exact prompt + slots + seed (`assets/social/<name>.txt` sidecar).
3. The tool + model + size (in the sidecar header).

If we can't reproduce it, we don't ship it — a one-off we can't regenerate is a liability when
a price or date changes mid-campaign.

This pipeline doc lives in this repo. If the toolchain changes (new model, new endpoint),
update it here first.
