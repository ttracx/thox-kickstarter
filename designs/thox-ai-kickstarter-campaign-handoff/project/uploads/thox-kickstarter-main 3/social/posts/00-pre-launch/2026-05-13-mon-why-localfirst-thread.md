# Pre-launch worked example: Monday "Why we built this" X thread

Phase: pre-launch. Date: 2026-05-13 (T-91, Monday). Theme: founder
thesis on local-first AI. Primary platform: X. Cross-post: LinkedIn
(reformatted).

## Identity

- **Post ID**: `2026-05-13-mon-why-localfirst-thread`
- **Phase**: pre-launch
- **Platform(s)**: x (primary), linkedin (reformatted)
- **Date / time (PT)**: 2026-05-13 09:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup. The CTA is "join the launch list at thox.ai/launch".
Downstream goal: 200 new email signups from this thread.

## Hero device

Founder + ThoxNova (the founder is the storyteller; the ThoxNova is
the visual anchor on the closing tweet).

## Asset spec

| Platform | Aspect | Still file | Video file | Carousel? |
|---|---|---|---|---|
| x | 16:9 | `_03_still_16x9.png` (header for the first tweet quote-card) | - | N |
| x | 1:1 | `_03_still_1x1.png` (closing tweet, ThoxNova hero) | `_05_loop_1x1.mp4` (LED pulse loop) | N |
| linkedin | 4:5 | reuse `_03_still_1x1.png` re-rendered at 4:5 | - | N |

## Prompts (the pipeline contract)

- **OpenAI image template used**: `IMAGE_TEMPLATES.md` section #1 (hero
  product shot 1:1) for the closing tweet, section #4 (16:9 landscape)
  for the header.
- **Grok video template used**: `VIDEO_TEMPLATES.md` section #6
  (surface-activity loop, camera locked) for the closing-tweet loop.
- **Filled OpenAI prompt** lives at:
  `../../assets/social/x/2026-05-13-mon-why-localfirst-thread/2026-05-13-mon-why-localfirst-thread__02_openai_prompt.txt`
- **Filled Grok prompt** lives at:
  `../../assets/social/x/2026-05-13-mon-why-localfirst-thread/2026-05-13-mon-why-localfirst-thread__04_grok_prompt.txt`

## Filled OpenAI prompt (16:9 header)

```
Studio product hero of the ThoxNova centered in frame, photoreal,
three-quarter front view with the front face facing the camera.

Background: deep navy #0a0e14 seamless studio sweep with subtle
gradient darkening toward the edges, no horizon line.

Lighting: cool-white key light (5500K) from upper-left, warm-amber fill
from lower-right, emerald #10b981 rim light tracing the device
silhouette from behind. Mirror-finish floor with a 30 percent opacity
reflection of the device fading to black.

Device detail: desktop puck on the LattePanda N100 footprint, 132 mm
x 86 mm x 38 mm, matte black, vented lid, M.2 access door. Surface
finish matte black ASA with visible micro-texture. Subtle emerald LED
dot glowing on the lower right of the lid.

Composition: device occupies 35 percent of frame, anchored on the
right third (rule of thirds), left two-thirds carries a subtle
emerald light streak across the navy background. Negative space on the
left for headline overlay 30 percent of frame width.

No on-image text. No people. No competing brand marks. No emojis.
Photoreal, magazine-cover quality, sharp focus across the device.
```

## Filled Grok prompt (1:1 loop on closing tweet)

```
Image-to-video. Animate the attached source still with NO camera
movement. The camera is locked. All motion is surface-detail
animation on the device itself.

Surface activity (apply ALL of the following simultaneously):

1. LED dot pulse: emerald #10b981 LED on the lower right corner of
   the lid brightens to peak then dims, sinusoidal curve at 1 Hz.
   Peak brightness +30 percent over source still baseline.

2. Subtle reflection drift: the rim light's reflection on the
   device's matte surface shifts horizontally by 1 percent of device
   width over the loop duration, as if a distant light source is
   moving slowly.

Duration: 4 seconds. Frame rate: 30 fps. Aspect ratio: 1:1. Silent.

Loop: first frame exactly equals last frame (the sinusoidal cycles
return to their starting phase).

No camera movement. No text overlays.
```

## Caption: X thread (8 tweets)

```
1/ Three years ago I asked a "cloud AI" assistant for help with a
diagnosis question. It told my doctor friend, my insurance company,
and an unknown number of training datasets.

That was the moment.

🧵 Why we built THOX. /1

2/ Cloud AI is brilliant. It is also a leak.

Every prompt is logged. Every reply is logged. Every embedding,
every summary, every "could you keep this private" - logged.

You cannot use these systems and expect privacy. /2

3/ The fix is not "trust the cloud less". The fix is to not send the
prompt to the cloud at all.

Local-first inference. Your device. Your weights. Your data.

/3

4/ The hard part: real local inference on real hardware needs three
things at once:

- a small, capable model
- a runtime that respects your power envelope
- a UX that does not feel like a downgrade

We spent two years building all three. /4

5/ ThoxLLM (the model family) runs from 125M parameters up to 13B.
The 327M variant fits on a Pi Zero W. The 12B runs on a desktop
LattePanda.

Every model under Apache-2.0. Your weights, your rules. /5

6/ ThoxOS (the runtime) is a Rust microkernel where agents are
first-class kernel objects and inference is a scheduled syscall.

Power-aware. Predictable. Auditable.

/6

7/ ThoxClip, ThoxMini, ThoxAir, ThoxNova - the devices. From a
pocket charger that doubles as your assistant, to a desktop puck
that runs the 12B locally.

All in your pocket. All in your home. None in the cloud. /7

8/ The Kickstarter is Aug 12 2026. We have spent the last 90 days
building the production line so we can ship the day we close.

Join the launch list to back at the early-bird tier:
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: LinkedIn (3000 chars)

```
Three years ago I asked a cloud AI assistant for help with a
diagnosis question. It told my doctor friend, my insurance company,
and an unknown number of training datasets.

That was the moment I started building THOX.

Cloud AI is brilliant. It is also a leak. Every prompt is logged,
every reply is logged, every embedding and summary is in someone
else's database. You cannot use these systems and expect privacy.

The fix is not "trust the cloud less". The fix is local-first
inference on your device, with your weights, your data, your
runtime.

The hard part: real local inference needs three things at once.

1. A small, capable model. ThoxLLM is a family running from 125M
   parameters up to 13B. The 327M variant fits on a Pi Zero W. The
   12B runs on a LattePanda N100. Apache-2.0, every weight.

2. A runtime that respects your power envelope. ThoxOS is a Rust
   microkernel where agents are first-class kernel objects and
   inference is a scheduled syscall. Power-aware. Predictable.
   Auditable.

3. A UX that does not feel like a downgrade. Four devices launching
   at Kickstarter on Aug 12 2026: ThoxClip (the pocket assistant),
   ThoxMini (the always-on stick), ThoxAir (the local-AI accessory),
   ThoxNova (the desktop puck).

We have spent the last 90 days building the production line so we
can ship the day we close.

Join the launch list at thox.ai/launch to back at the early-bird
tier.

Your AI. Your Data. Your Rules.

#THOXai #localAI #engineering #privacy #localfirst
```

## Alt text

```
A ThoxNova desktop puck sits on a dark navy studio backdrop with a
subtle emerald light streak behind it. The matte black 132 mm x 86
mm device has a vented lid and a small emerald LED on the lower
right.
```

## UTM tracking

X: append to thox.ai/launch (the launch list, not Kickstarter, since
this is pre-launch):

```
?utm_source=x&utm_medium=social&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-13-mon-why-localfirst-thread
```

LinkedIn: same with `utm_source=linkedin`.

## Acceptance checklist

- [ ] X thread total under 8 tweets (280 chars each, with first
      tweet hook)
- [ ] LinkedIn caption under 3000 chars
- [ ] Hashtags appropriate per platform (X: none in body, brand tag in
      closing tweet only; LinkedIn: 4 in the closer)
- [ ] Emoji: 🧵 (thread marker) in tweet 1, 🟢 (alive pip) in tweet 8,
      none on LinkedIn (LinkedIn brand voice is no emoji even though
      this is consumer marketing)
- [ ] Alt text written
- [ ] UTMs appended
- [ ] No em-dashes (verified)
- [ ] Brief committed to repo
- [ ] Asset directory created at
      `../../assets/social/x/2026-05-13-mon-why-localfirst-thread/`

## Post-mortem

To be filled after T+2 days live.
