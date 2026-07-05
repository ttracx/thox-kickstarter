# Pre-launch W2 Wed - ThoxMini device deep-dive

## Identity

- **Post ID**: `2026-05-22-wed-thoxmini-deepdive`
- **Phase**: pre-launch (T-82)
- **Platforms**: x, instagram (carousel + Reel), tiktok, linkedin (PDF carousel)
- **Date / time (PT)**: 2026-05-22 10:00
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Email signup + technical credibility. Establish the ThoxMini as the
"always-on" tier ($69) for the lurkers who want local AI but don't
need MagStack clustering.

## Hero device

ThoxMini (~65 x 30 x 16 mm slider-carriage USB-C stick).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | hero shot + 6-tweet thread |
| instagram | 4:5 carousel (5 slides) | hero + slider mechanism + USB-C + size comparison + CTA |
| instagram | 9:16 Reel | dolly-in motion on the slider deploying |
| tiktok | 9:16 | same Reel asset |
| linkedin | 4:5 PDF carousel (6 slides) | Pi Zero W spec + slider mechanism + power envelope + USB-C PD detail + bundle pricing + CTA |

## Filled OpenAI prompt (1:1 hero with slider extended)

```
Use IMAGE_TEMPLATES.md section #1. Slots:
{device_name} = ThoxMini
{hero_face} = three-quarter angle with the USB-C slider extended
{device_physical_specs} = small handheld stick approximately 65 x
  30 x 16 mm, matte black ASA, slider-carriage USB-C deployed from
  the front edge, single emerald status LED on the front face center
{brand_accent_detail} = emerald LED dot glowing on the center of
  the front face
```

## Filled Grok prompt (9:16 dolly-in 4 s)

```
Use VIDEO_TEMPLATES.md section #2 (dolly-in). Slots:
{dolly_percent} = 8
{detail_to_reveal} = slider mechanism + USB-C connector
{surface_activity} = LED dot pulses gently at 1 Hz
{duration_seconds} = 4
{aspect_ratio} = 9:16
```

## Caption: X (6-tweet thread)

```
1/ The ThoxMini is the always-on tier.

65 x 30 x 16 mm. Slider-carriage USB-C. Slips into a laptop port
or a USB charger. $69 at the early-bird. /1

2/ Pi Zero W under the hood. 512 MB RAM. Wi-Fi + BT 4.2. Runs
ThoxLLM 327M at ~1.5 tokens/sec standalone. /2

3/ The slider mechanism is the trick. Push to deploy USB-C, push
again to retract. No cap to lose. Designed for the laptop bag, not
the desk drawer. /3

4/ Power envelope: 2.5 W typical, 5 W peak. Runs off a USB-PD
laptop port forever; runs off a 10000 mAh power bank for 40+ hours
of inference. /4

5/ The bundle: 3-pack at $189. Drop one in every workspace, never
think about cloud AI again. /5

6/ Spec + STL set at github.com/ttracx/thox-3dprint-kit.

Launch is Aug 12 2026.

thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram (carousel + Reel)

```
The ThoxMini v0.1 deep-dive.

The always-on tier. 65 x 30 x 16 mm. Slider-carriage USB-C. Pi Zero
W brain. ThoxLLM 327M local inference. $69 early-bird.

Drop one in every workspace. Drop one in the car. Drop one in your
bag. They sync over the local mesh and your AI follows you wherever
your hardware goes.

🔗 Launch list at thox.ai/launch.
.
.
#thoxai #thoxmini #localai #raspberrypi #usbc #localfirst #ai
#kickstarter #engineering #yourAI #portable
```

## Caption: TikTok (150 char hook)

```
ThoxMini is the always-on local AI stick. Pi Zero W brain, slider
USB-C, $69. Drop one in every workspace. 🟢

#thoxai #localfirst #ai
```

## Caption: LinkedIn

```
ThoxMini engineering breakdown.

65 mm x 30 mm x 16 mm. Slider-carriage USB-C. Pi Zero W SoC, 512 MB
RAM. Wi-Fi b/g/n + BT 4.2. ThoxLLM 327M model. Standalone inference
~1.5 tokens/sec; mesh-aggregated across multiple ThoxMinis on the
local network.

Power envelope: 2.5 W typical, 5 W peak. USB-PD source compatible.
40+ hours of inference off a 10000 mAh power bank.

The slider mechanism is a deliberate UX choice. No cap to lose. No
flat USB-C profile that scratches a laptop port over time. The
slider doubles as the on-off switch.

$69 single, $189 3-pack early-bird. Kickstarter Aug 12 2026.

thox.ai/launch

#THOXai #localAI #engineering #raspberrypi #usb #portable
```

## Alt text

```
A black ThoxMini USB stick on a dark navy studio backdrop with its
slider-carriage USB-C connector extended from the front edge. A
small emerald LED glows on the center of the front face.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-22-wed-thoxmini-deepdive`

## Acceptance

- [ ] X thread ≤ 6 tweets
- [ ] IG carousel 5 slides
- [ ] LinkedIn PDF ≤ 2 MB
- [ ] All assets in `../../assets/social/<platform>/2026-05-22-wed-thoxmini-deepdive/`
- [ ] No em-dashes
