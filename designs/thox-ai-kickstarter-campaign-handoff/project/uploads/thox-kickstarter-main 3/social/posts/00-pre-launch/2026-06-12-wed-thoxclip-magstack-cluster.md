# Pre-launch W5 Wed - ThoxClip / MagStack cluster (cycle restart)

## Identity

- **Post ID**: `2026-06-12-wed-thoxclip-magstack-cluster`
- **Phase**: pre-launch (T-61)
- **Platforms**: x, instagram (Reel + Feed), tiktok, youtube (Short)
- **Date / time (PT)**: 2026-06-12 10:00
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Email signup + the "wow" moment. Week 5 deep-dive returns to
ThoxClip but pivots to the cluster (MagStack Air) story instead of
the standalone shell. This is the highest share-coefficient post in
the pre-launch phase.

## Hero

8-ThoxClip MagStack column. MagStack purple rim accent (this is a
MagStack-themed post; purple unlocked per brand rules).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | 8-stack hero + 5-tweet thread |
| instagram | 4:5 Feed | brand-graded 8-stack |
| instagram | 9:16 Reel | 6-second pan-up reveal of all 8 devices |
| tiktok | 9:16 | same Reel + trending audio |
| youtube | 9:16 Short | same Reel + chapter markers |

## Filled OpenAI prompt (1:1 MagStack hero, 8 devices)

```
Use IMAGE_TEMPLATES.md section #6 (MagStack cluster shot). Slots:
{n} = 8

Studio product shot of 8 ThoxClip v7 devices stacked vertically in
a MagStack column, each device magnetically docked to the one above
and below via the 62 mm MagStack ring. The stack is photographed at
a 15 degree side-tilt so all 8 devices are clearly visible top to
bottom.

Background: deep navy #0a0e14 seamless studio sweep.

Lighting: cool-white key (5500K) from upper-front, warm-amber fill
from lower-front, MagStack purple #a855f7 rim light tracing the
cluster silhouette. Subtle emerald #10b981 LED dot on each device's
bottom strip.

Composition: stack centered, occupies 65 percent of frame
vertically. Frame is square 1:1, 1080 x 1080 px.

Detail: each MagStack ring is visible at the join, with a thin
purple-to-emerald glow gradient at the magnetic interface to suggest
the data-and-power handshake.
```

## Filled Grok prompt (9:16 pan-up reveal 6 s)

```
Use VIDEO_TEMPLATES.md section #4 (pan-across). Slots:
{pan_direction} = up (vertical pan; the template defaults to
  horizontal, override to vertical for the cluster reveal)
{device_set} = MagStack cluster of 8 ThoxClips
{magstack_glow_instruction} = MagStack purple #a855f7 glow runs
  along each magnetic interface at 0.5 Hz
{aspect_ratio} = 9:16

Duration: 6 seconds. Camera pans vertically upward, starting framed
on the bottom 3 devices and ending framed on the top 3 devices.
Each device's LED pulses phase-offset 90 degrees creating a wave
running through the stack.
```

## Caption: X (5-tweet thread)

```
1/ 8 ThoxClips. 1 MagStack column.

A local-AI cluster you can hold in one hand. 🟢 /1

2/ Each ThoxClip is a Qi2 wireless charger AND a local inference
node. Standalone: ~1.5 tokens/sec on ThoxLLM 327M.

Stack 8: ~12 tokens/sec aggregate. /2

3/ The cluster is hot-swappable. Pull a clip off the top, hand it to
someone, dock another in its place. The cluster keeps inferring. /3

4/ Bottom clip carries the USB-C PD input for the entire stack.
Single power source. Total cluster envelope: ~12 W under load. /4

5/ The MagStack Air tier (8-pack ThoxClips + base + USB-C cable) is
on the Kickstarter at $349 early-bird. $39 x 8 = $312 + the cable +
the base, so it's basically the standalone-clip cost plus the
clustering hardware.

🔗 thox.ai/launch
```

## Caption: Instagram (Reel + Feed)

```
8 ThoxClips. 1 MagStack column. 🟢

This is the cluster reveal. Each clip is a Qi2 charger standalone.
Dock 8 of them magnetically and they parallelize across the Pi Zero
W cores into ~12 tokens/sec aggregate on a local ThoxLLM.

Hot-swappable. Single USB-C PD input. ~12 W under load. Backed at
$349 in the MagStack Air tier on the Kickstarter.

🔗 thox.ai/launch
.
.
#thoxai #magstack #thoxclip #cluster #localai #kickstarter
#raspberrypi #localfirst #edgeai #yourAI #engineering #parallel
```

## Caption: TikTok

```
8 ThoxClips magnetically stack into a local-AI cluster. 12 tokens/sec
aggregate. Hot-swappable. $349 for the 8-pack at Kickstarter. 🟢

#thoxai #magstack #cluster #localai
```

## Caption: YouTube Shorts

Title: `8 ThoxClips → 1 local-AI cluster. The MagStack reveal. 🟢`

Description:
```
The MagStack Air cluster reveal: 8 ThoxClip v7 devices stacking
magnetically into a parallel inference cluster running ThoxLLM
locally on Pi Zero W cores.

00:00 The reveal
00:02 The wave (8 LEDs phase-offset)
00:04 The cluster
00:06 CTA

Back the Kickstarter at the MagStack Air tier ($349):
thox.ai/launch

#shorts #thoxai #magstack #cluster #localai
```

## Alt text

```
A vertical stack of 8 black ThoxClip wireless puck devices on a
dark navy studio backdrop. Each puck has an emerald LED dot. A faint
purple glow traces the magnetic interfaces between pucks where they
dock together.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-12-wed-thoxclip-magstack-cluster`

## Acceptance

- [ ] 6-second pan-up loop seamless
- [ ] Purple rim light verified (MagStack-themed post unlocks purple)
- [ ] Token-per-sec aggregate verified against latest mesh bench
- [ ] No em-dashes
