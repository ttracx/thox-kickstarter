# Pre-launch W3 Wed - ThoxAir device deep-dive

## Identity

- **Post ID**: `2026-05-29-wed-thoxair-deepdive`
- **Phase**: pre-launch (T-75)
- **Platforms**: x, instagram (carousel + Reel), tiktok, linkedin
- **Date / time (PT)**: 2026-05-29 10:00
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Email signup + accelerator credibility. ThoxAir is the "NPU on a
stick" tier ($79) - the upgrade from ThoxMini for users who want
faster inference without a desktop puck.

## Hero device

ThoxAir (~70 x 35 x 18 mm, vented top, NPU daughterboard or M.2
2230 module visible through the lid).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | hero shot + 5-tweet thread |
| instagram | 4:5 carousel (5 slides) | hero + NPU close-up + thermal vent detail + speed comparison + CTA |
| instagram | 9:16 Reel | dolly-in on the vented top showing the NPU |
| tiktok | 9:16 | same Reel |
| linkedin | 4:5 + technical post | hero + NPU spec deep-dive |

## Filled OpenAI prompt (1:1 hero, vented top angle)

```
Use IMAGE_TEMPLATES.md section #1. Slots:
{device_name} = ThoxAir
{hero_face} = three-quarter angle from above to show the vented top
  with the NPU module visible through the vents
{device_physical_specs} = approximately 70 x 35 x 18 mm, matte
  black ASA, vented top with an NPU daughterboard or M.2 2230
  module visible underneath
{brand_accent_detail} = emerald LED dot on the lower right corner
  of the lid; subtle warm highlight on the vented top
```

## Filled Grok prompt (9:16 dolly-in 4 s)

```
Use VIDEO_TEMPLATES.md section #2 (dolly-in). Slots:
{dolly_percent} = 10 (close-look maximum, want to show the NPU
  daughterboard detail)
{detail_to_reveal} = NPU daughterboard visible through the vented
  top
{surface_activity} = LED dot pulses gently at 1 Hz, subtle warm
  highlight drifts across the vented top
{duration_seconds} = 4
{aspect_ratio} = 9:16
```

## Caption: X (5-tweet thread)

```
1/ The ThoxAir is the NPU upgrade tier.

70 x 35 x 18 mm. Vented top. Coral USB Accelerator or M.2 2230 NPU
daughterboard underneath. Pi Zero W host. $79 at the early-bird. /1

2/ ~10x the tokens/sec of a bare ThoxMini for the same model. ~15
tokens/sec on ThoxLLM 327M with the Coral. ~25 tokens/sec with the
Hailo-8L M.2. /2

3/ The vented top is functional, not decorative. The Pi Zero W +
NPU stack runs hotter than a bare Mini; the vents pull heat off the
NPU during inference. /3

4/ Modular: the NPU sits on a 2x10 pin header. Swap in a different
accelerator without resoldering. We ship with the Coral; M.2 2230
is a paid add-on at BackerKit. /4

5/ Spec + STL set at github.com/ttracx/thox-3dprint-kit.

Launch Aug 12 2026.
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram

```
The ThoxAir v0.1 deep-dive.

The NPU upgrade tier. 70 x 35 x 18 mm. Vented top over a Pi Zero W +
Coral USB Accelerator (default) or M.2 2230 NPU. ~15 tokens/sec on
ThoxLLM 327M with the Coral; ~25 tokens/sec with the M.2 Hailo-8L.

$79 early-bird. Same form factor as ThoxMini, ~10x faster
inference. For the user who wants real-time chat throughput on
local hardware.

🔗 thox.ai/launch
.
.
#thoxai #thoxair #npu #coral #localai #raspberrypi #localfirst
#kickstarter #engineering #yourAI #inference
```

## Caption: TikTok

```
ThoxAir = ThoxMini + NPU. 10x the tokens/sec for ~$10 more. $79
early-bird. The vented top is functional. 🟢

#thoxai #localfirst #ai #npu
```

## Caption: LinkedIn

```
ThoxAir engineering breakdown.

70 mm x 35 mm x 18 mm. Pi Zero W host + Coral USB Accelerator NPU
on a 2x10 pin daughterboard (M.2 2230 variant available; the v0.1
Variant A locked the Coral, Variant B locked the M.2 door).

Benchmark vs ThoxMini on ThoxLLM 327M:
- ThoxMini (Pi Zero W only): ~1.5 tokens/sec
- ThoxAir (Coral): ~15 tokens/sec
- ThoxAir (Hailo-8L M.2): ~25 tokens/sec

Power: 4 W typical / 7 W peak with NPU loaded. The vented top is
not cosmetic - sustained inference at 25 tokens/sec needs the
airflow.

$79 single, $219 3-pack early-bird. The 3-pack stacks via the THOX
mesh protocol for aggregated throughput.

Kickstarter Aug 12 2026.
thox.ai/launch

#THOXai #localAI #engineering #npu #edgeai
```

## Alt text

```
A black ThoxAir USB stick on a dark studio backdrop, three-quarter
angle from above. The vented top reveals an NPU daughterboard
underneath. A small emerald LED glows on the lower right of the lid.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-29-wed-thoxair-deepdive`

## Acceptance

- [ ] Token-per-sec benchmarks verified against latest THOX bench data
- [ ] No em-dashes
- [ ] All assets in `../../assets/social/<platform>/2026-05-29-wed-thoxair-deepdive/`
