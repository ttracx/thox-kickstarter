# Pre-launch W1 Wed - ThoxClip device deep-dive

## Identity

- **Post ID**: `2026-05-15-wed-thoxclip-deepdive`
- **Phase**: pre-launch (T-89)
- **Platforms**: x, instagram (carousel + Reel), tiktok, linkedin (PDF carousel)
- **Date / time (PT)**: 2026-05-15 10:00
- **Authored by**: Craig (hardware spokesperson for deep-dive day)
- **Status**: ready-to-schedule

## Intent

Email signup + technical credibility. The deep-dive establishes that
the device under the marketing is real engineering. Drive 150+ launch
list signups from this post.

## Hero device

ThoxClip v7 (86 x 100 x 11.8 mm MagStack puck).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | hero shot + 6-tweet thread |
| instagram | 4:5 carousel (6 slides) | hero + 4 detail callouts + CTA |
| instagram | 9:16 Reel | orbit-around motion on the back of the ThoxClip showing the MagStack ring |
| tiktok | 9:16 | same Reel asset |
| linkedin | 4:5 PDF carousel (8 slides) | engineering breakdown |

## Filled OpenAI prompt (1:1 hero, back face showing MagStack ring)

```
Use IMAGE_TEMPLATES.md section #1 (1:1 hero). Slots:
{device_name} = ThoxClip v7
{hero_face} = back face (shows MagStack ring)
{device_physical_specs} = 86 mm x 100 mm x 11.8 mm rounded slab,
  matte black ASA surface, circular MagStack ring 62 mm OD / 60.5 mm
  ID inscribed in the upper portion, 13.5 mm bottom strip carrying
  the THOX wordmark in emerald, status LED dot lower right, USB-C on
  bottom edge
{brand_accent_detail} = MagStack ring catching the rim light;
  faint emerald glow tracing the inside edge of the ring
```

## Filled Grok prompt (9:16 orbit, 4 s)

```
Use VIDEO_TEMPLATES.md section #1 (orbit-around). Slots:
{orbit_degrees} = 25 (default)
{orbit_direction} = counter-clockwise
{duration_seconds} = 4
{aspect_ratio} = 9:16
Source still: the 1:1 hero regenerated at 9:16 portrait
```

## Caption: X (6-tweet thread)

```
1/ The ThoxClip is the easy on-ramp to local AI.

86 x 100 x 11.8 mm. Slips between your phone and a MagSafe case.
$39 at the early-bird tier. /1

2/ The MagStack ring on the back is the key. 62 mm OD, 60.5 mm ID.

Magnetically dockable. Stack 4 to 8 ThoxClips together and they
become a parallel inference cluster. /2

3/ Standalone, each ThoxClip is a Qi2 wireless charger AND a local
inference accelerator running ThoxLLM 327M.

In a stack, they parallelize across the Pi Zero W cores. /3

4/ Why Pi Zero W? Power envelope. Each clip runs on a 1-cell LiPo
for 4-6 hours of inference. Cluster-of-eight runs from any USB-PD
charger via the bottom-edge USB-C. /4

5/ The bottom strip carries the THOX wordmark + the status LED. Black
shell + green LED + white MagStack ring outline. Multi-color FDM
print on a Qidi Q2 Combo (yes, every shell prints in-house at the
moment). /5

6/ The full engineering spec is in the design pack. Launch is Aug 12
2026.

Join the launch list to back at the $39 early-bird:
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram (carousel + Reel)

```
The ThoxClip v7 deep-dive.

Slide 1: the hero - 86 x 100 x 11.8 mm MagStack puck.
Slide 2: the MagStack ring (62 / 60.5 mm), the magnetic-docking key.
Slide 3: 8 ThoxClips stacking into an edge-AI cluster.
Slide 4: the bottom strip - wordmark, LED, USB-C PD.
Slide 5: the silhouette comparison vs a generic wireless charger.
Slide 6: how to back at the $39 early-bird.

🔗 Link in bio. Launch list at thox.ai/launch.

📍 Aug 12 2026.
.
.
#thoxai #thoxclip #magstack #localai #localfirst #ai #wirelessAI
#kickstarter #raspberrypi #engineering #yourAI
```

## Caption: TikTok (150 char hook)

```
8 ThoxClips stack into a local-AI cluster. $39 each at launch. The
MagStack ring on the back is the trick. 🟢

#thoxai #localfirst #ai
```

## Caption: LinkedIn (PDF carousel + post body)

```
ThoxClip v7 engineering breakdown.

86 mm x 100 mm x 11.8 mm. Matte black ASA. Pi Zero W SoC. Qi2
wireless charging coil. MagStack ring (62 / 60.5 mm) for magnetic
clustering. 1-cell LiPo with 4-6 hours of standalone runtime.

The clustering math: 8 Pi Zero W cores, parallel inference on a
ThoxLLM 327M model, ~12 tokens/sec aggregate. Standalone: ~1.5
tokens/sec per clip. The cluster's power envelope fits a single
USB-PD source.

Full STL set + design pack at ttracx/thox-3dprint-kit. v7 spec
locked 2026-06-22.

Back the Kickstarter early-bird:
thox.ai/launch

#THOXai #localAI #engineering #raspberrypi #pcb #hardware
```

## Alt text

```
A back view of a ThoxClip v7 wireless puck on a dark studio
backdrop. The circular MagStack ring (62 mm diameter) is inscribed
in the upper portion with a faint emerald glow along the inside
edge.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-15-wed-thoxclip-deepdive`

## Acceptance

- [ ] X thread total ≤ 6 tweets
- [ ] IG carousel 6 slides
- [ ] LinkedIn PDF ≤ 2 MB
- [ ] All assets in `../../assets/social/<platform>/2026-05-15-wed-thoxclip-deepdive/`
- [ ] No em-dashes
