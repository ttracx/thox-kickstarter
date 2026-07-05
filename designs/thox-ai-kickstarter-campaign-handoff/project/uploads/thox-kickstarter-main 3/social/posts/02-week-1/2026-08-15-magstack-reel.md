# Week 1 worked example: MagStack reveal Reel (Instagram + TikTok + YouTube Shorts)

Phase: week-1. Date: 2026-08-15 (T+3, Friday). Theme: showcase the
MagStack clustering capability. The reveal that "your ThoxClip stacks
into a compute cluster" is the campaign's "wow" moment.

## Identity

- **Post ID**: `2026-08-15-magstack-reel`
- **Phase**: week-1
- **Platform(s)**: instagram (Reel + Feed), tiktok, youtube (Shorts)
- **Date / time (PT)**: 2026-08-15 12:00:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Discovery / awareness. Drive the share-coefficient (the "did you SEE
this" reaction). Secondary: drive backers to the MagStack Air tier
($199 for a 4-pack ThoxClip).

## Hero device

MagStack cluster: 8 ThoxClip v7 devices in a vertical stack.

## Asset spec

| Platform | Aspect | Still file | Video file | Carousel? |
|---|---|---|---|---|
| instagram | 9:16 Reel | `_03_still_9x16.png` (Reel cover) | `_05_loop_9x16.mp4` (6 s pan-up reveal) | N |
| instagram | 4:5 Feed | `_03_still_4x5.png` (carousel slide 1) | - | 5-slide carousel |
| tiktok | 9:16 | reuse `_03_still_9x16.png` for cover | reuse `_05_loop_9x16.mp4` | N |
| youtube | 9:16 Shorts | reuse the same | reuse the same | N |

## Prompts (the pipeline contract)

- **OpenAI image template used**: `IMAGE_TEMPLATES.md` section #6
  (MagStack cluster shot 1:1 adapted to 9:16 portrait).
- **Grok video template used**: `VIDEO_TEMPLATES.md` section #4
  (pan-across, adapted to vertical pan-up for the cluster reveal).
- **Filled OpenAI prompt** lives at:
  `../../assets/social/instagram/2026-08-15-magstack-reel/2026-08-15-magstack-reel__02_openai_prompt.txt`
- **Filled Grok prompt** lives at:
  `../../assets/social/instagram/2026-08-15-magstack-reel/2026-08-15-magstack-reel__04_grok_prompt.txt`

## Filled OpenAI prompt (9:16 MagStack hero)

```
Studio product shot of 8 ThoxClip v7 devices stacked vertically in a
MagStack column, each device magnetically docked to the one above and
below via the 62 mm MagStack ring. The stack is photographed at a 15
degree side-tilt so all 8 devices are clearly visible top to bottom.

Background: deep navy #0a0e14 seamless studio sweep.

Lighting: cool-white key (5500K) from upper-front, warm-amber fill
from lower-front, MagStack purple #a855f7 rim light tracing the
cluster silhouette. Subtle emerald #10b981 LED dot on each device's
bottom strip.

Composition: stack centered, occupies 75 percent of frame height,
camera at device-mid-stack height looking slightly upward to
emphasize the column. Frame is portrait 9:16, 1080 x 1920 px.
Negative space above the stack 12 percent of frame; negative space
below 13 percent.

Detail: each MagStack ring is visible at the join between devices,
with a thin purple-to-emerald glow gradient at the magnetic interface
to suggest the data-and-power handshake.

No on-image text. No competing brand marks. No emojis. Photoreal,
magazine quality, sharp focus from top device to bottom device.
```

## Filled Grok prompt (9:16 pan-up reveal, 6 s)

```
Image-to-video. Animate the attached source still with a smooth
vertical pan-up camera move.

Camera path: start with the camera framing the BOTTOM 3 devices of
the stack (ThoxClips 6, 7, 8 visible). Over the 6-second clip
duration, pan vertically upward to end with the camera framing the
TOP 3 devices (ThoxClips 1, 2, 3 visible). Constant linear velocity.
No rotation, no horizontal drift.

Subjects: the MagStack cluster stays in its source-still position
relative to the world. The pan reveals devices that were below the
initial frame as the camera moves up.

Lighting: each device's rim light remains in world position. MagStack
purple #a855f7 glow runs along each magnetic interface at 0.5 Hz.

Surface activity: each device's emerald LED dot pulses independently
at 1 Hz, phase-offset by 90 degrees per device. Visual effect: a
wave of emerald pulses running through the stack as the camera pans.

Duration: 6 seconds. Frame rate: 30 fps. Aspect ratio: 9:16. Silent.

Loop: design first frame and last frame to share a partial overlap
(the middle 2 devices appear in both), so the pan-up reads as a
continuous reveal that could loop with a subtle cross-fade.

No text overlays.
```

## Caption: Instagram (Reel + Feed)

```
Eight ThoxClips. One MagStack column. Eight Pi Zero W cores stacking
into a local-AI cluster you carry in a small box. 🟢

This is MagStack Air. Backed at the $199 tier in the THOX Kickstarter.

Each ThoxClip is a Qi2-compatible wireless charger by day. Stack 4 to
8 of them and they become a parallel inference cluster running ThoxLLM
locally. No cloud. No subscription. Your weights, your rules.

🔗 Link in bio. Early-bird tiers capped.

📍 thox.ai/launch
.
.
#thoxai #magstack #localai #kickstarter #raspberrypi #localfirst
#privacy #ai #engineering #yourAI #cluster #edgeAI
```

## Caption: TikTok (150-200 char hook)

```
8 ThoxClips. 1 MagStack column. A local-AI cluster you can hold in
one hand. Run a ThoxLLM right here on your desk. No cloud. 🟢

#thoxai #localfirst #ai
```

## Caption: YouTube Shorts

Title (100 chars):

```
8 ThoxClips → 1 local-AI cluster. The MagStack Air reveal. 🟢
```

Description (5000 chars):

```
This is MagStack Air: 8 ThoxClip v7 devices stacking magnetically
into a parallel inference cluster running ThoxLLM locally on Pi Zero
W cores.

Each ThoxClip is a Qi2 wireless charger when standalone. Dock 4 to 8
of them and they cluster into an edge-AI box.

Apache-2.0 models. Rust microkernel (ThoxOS). No cloud, no
subscription, no log dragnet.

Back the Kickstarter at the MagStack Air tier ($199) before the
early-bird caps fill:
https://kickstarter.com/projects/thox-ai/thox-unified-2026

00:00 The reveal
00:02 8 devices stacked
00:04 LED pulse wave

#shorts #thoxai #magstack #localai #raspberrypi #edgeai
```

## Carousel slides (Instagram feed, 5 slides, 4:5 portrait)

Slide 1: the 4:5 MagStack hero (same composition as 9:16 but cropped
to 4:5; OpenAI regeneration at 1024 x 1280 not crop).
Slide 2: infographic comparing "1 ThoxClip = wireless charger" vs
"8 ThoxClips = edge-AI cluster" (use IMAGE_TEMPLATES section #7).
Slide 3: device close-up of the MagStack ring on the back of a single
ThoxClip (IMAGE_TEMPLATES section #1, back face).
Slide 4: cluster diagram (Grok illustration; use motif #4 "mesh node"
from `prompts/grok/ILLUSTRATION_SYSTEM_PROMPT.md`).
Slide 5: CTA slide with "Back the MagStack Air tier" text overlay
($199, MagStack purple background, white text).

## Alt text (Reel + Feed slide 1)

```
A vertical stack of 8 black ThoxClip wireless puck devices on a dark
navy studio backdrop. Each puck has an emerald LED dot. A faint
purple glow traces the magnetic interfaces between pucks where they
dock together into a column.
```

## UTM tracking

Instagram (via bio link target):
`?utm_source=instagram&utm_medium=reel&utm_campaign=ks-launch-2026&utm_content=2026-08-15-magstack-reel`

TikTok:
`?utm_source=tiktok&utm_medium=video&utm_campaign=ks-launch-2026&utm_content=2026-08-15-magstack-reel`

YouTube Shorts (in description):
`?utm_source=youtube&utm_medium=shorts&utm_campaign=ks-launch-2026&utm_content=2026-08-15-magstack-reel`

## Acceptance checklist

- [ ] 9:16 video is 6 seconds (the cluster needs the extra length to
      reveal all 8 devices; standard 4 s is too fast)
- [ ] Loop point is visually plausible
- [ ] MagStack purple #a855f7 used only where MagStack is the explicit
      subject (verified: this is a MagStack-themed post)
- [ ] LED wave is phase-offset per device (not all flashing in sync)
- [ ] IG caption under 2200 chars
- [ ] TikTok caption hook in first 150 chars
- [ ] YouTube Shorts description includes chapter timestamps
- [ ] Hashtags: 12 in IG caption + 12 in first comment (24 total),
      3 on TikTok, 6 on YouTube Shorts
- [ ] Brief committed to repo
- [ ] Asset directory created at
      `../../assets/social/instagram/2026-08-15-magstack-reel/`

## Post-mortem

To be filled at T+5 days live. Track: Reel saves (the share-coefficient
proxy), MagStack Air tier backer count, comment quality (technical vs
hype).
