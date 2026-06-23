# Pre-launch W4 Wed - ThoxNova device deep-dive

## Identity

- **Post ID**: `2026-06-05-wed-thoxnova-deepdive`
- **Phase**: pre-launch (T-68)
- **Platforms**: x, instagram (carousel + Reel), tiktok, linkedin
- **Date / time (PT)**: 2026-06-05 10:00
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Email signup + the flagship spotlight. ThoxNova ($499) is the
highest-tier device; it's the post that converts the engineering
audience who want serious local inference at home.

## Hero device

ThoxNova (LattePanda N100 footprint, 132 x 86 x 38 mm, vented lid,
M.2 access door).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | hero shot + 6-tweet thread |
| instagram | 4:5 carousel (6 slides) | hero + LP N100 specs + vented lid + M.2 detail + 12B inference benchmark + CTA |
| instagram | 9:16 Reel | orbit-around motion 25 deg on the desktop puck |
| tiktok | 9:16 | same Reel |
| linkedin | 4:5 + technical post | hero + 12B benchmark + tier breakdown |

## Filled OpenAI prompt (1:1 hero)

```
Use IMAGE_TEMPLATES.md section #1. Slots:
{device_name} = ThoxNova
{hero_face} = three-quarter front showing the vented lid + LED
{device_physical_specs} = desktop puck on the LattePanda N100
  footprint, 132 mm x 86 mm x 38 mm, matte black ASA, vented lid
  (no top-mounted fan; on-die heatsink target), M.2 access door on
  the side
{brand_accent_detail} = emerald LED dot on the lower-right of the
  lid; subtle warm highlight catching the vented top
```

## Filled Grok prompt (9:16 orbit 4 s)

```
Use VIDEO_TEMPLATES.md section #1 (orbit-around). Slots:
{orbit_degrees} = 25
{orbit_direction} = counter-clockwise
{duration_seconds} = 4
{aspect_ratio} = 9:16
```

## Caption: X (6-tweet thread)

```
1/ The ThoxNova is the flagship.

132 x 86 x 38 mm. LattePanda N100 footprint, Intel x86_64 (no CUDA
required). 12B local inference. $499 at the early-bird. /1

2/ N100 quad-core 0.8 GHz base / 3.4 GHz boost. 16 GB LPDDR5 unified
memory. Intel UHD Graphics for the GPU path. M.2 NVMe socket for
weight cold-storage. /2

3/ ThoxLLM 12B runs locally at ~8 tokens/sec on the GPU path. The
7-tier memory hierarchy keeps the model weights paged across DRAM
(Tier 2) and NVMe (Tier 4) without thrashing. /3

4/ The vented lid is passive cooling - no fan, no acoustic noise. The
N100's TDP envelope (6-10 W typical) fits inside a still-air heat
budget at room temperature. /4

5/ M.2 door on the side lets you swap NVMe weights without unscrewing
the lid. Backup your fine-tunes, swap a checkpoint, keep going. /5

6/ Spec at github.com/ttracx/thox-3dprint-kit and
github.com/ttracx/thoxos-kernel.

Kickstarter Aug 12 2026.
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram

```
The ThoxNova v0.1 deep-dive.

The flagship tier. 132 x 86 x 38 mm. LattePanda N100 (Intel x86_64,
no CUDA), 16 GB LPDDR5, Intel UHD Graphics, M.2 NVMe socket. ~8
tokens/sec on a local 12B ThoxLLM via the 7-tier memory hierarchy.

$499 early-bird. The "I want 12B on my desk without a $3K GPU" tier.

Vented lid is passive (no fan). M.2 door on the side for hot-swap
weight management.

🔗 thox.ai/launch
.
.
#thoxai #thoxnova #lattepanda #intel #localai #12b #localfirst
#kickstarter #engineering #yourAI #desktopai
```

## Caption: TikTok

```
ThoxNova = 12B local LLM on your desk. LattePanda N100, 16 GB RAM,
passive cooling, $499. No GPU required. 🟢

#thoxai #localfirst #ai #intel
```

## Caption: LinkedIn

```
ThoxNova engineering breakdown.

132 mm x 86 mm x 38 mm. LattePanda N100 SoC: Intel N100 quad-core
(0.8 GHz base, 3.4 GHz boost, 6 W TDP), 16 GB LPDDR5 unified memory,
Intel UHD Graphics (24 EU). M.2 NVMe socket for weight storage.

Benchmark on ThoxLLM 12B (4-bit quantized): ~8 tokens/sec sustained
with the 7-tier memory hierarchy paging weights across DRAM (Tier
2) and NVMe (Tier 4). No thrashing.

Why x86 over Jetson Orin NX? The SoC swap landed 2026-06-01 (see
ADR-0007). The N100 trades CUDA for SYCL + Vulkan compute paths +
the larger Intel software ecosystem + 1/4 the BOM cost of an Orin
NX. Tradeoff was worth it for a $499 retail target.

$499 single early-bird. $1,399 4-pack early-bird (mesh-clustered for
~30 tokens/sec aggregate).

Kickstarter Aug 12 2026.
thox.ai/launch

#THOXai #localAI #engineering #intel #lattepanda
```

## Alt text

```
A ThoxNova desktop puck on a dark navy studio backdrop, 132 x 86 x
38 mm, matte black with a vented lid. A small emerald LED glows on
the lower right of the lid. An M.2 access door is visible on the
side.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-05-wed-thoxnova-deepdive`

## Acceptance

- [ ] N100 specs verified against current LattePanda N100 product page
- [ ] 8 tokens/sec benchmark verified against latest THOX bench
- [ ] No em-dashes
