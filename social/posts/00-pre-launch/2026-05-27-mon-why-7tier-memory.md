# Pre-launch W3 Mon - "The 7-tier memory hierarchy that makes this possible"

## Identity

- **Post ID**: `2026-05-27-mon-why-7tier-memory`
- **Phase**: pre-launch (T-77)
- **Platforms**: x (thread), linkedin (carousel)
- **Date / time (PT)**: 2026-05-27 09:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup + engineering credibility. The 7-tier memory hierarchy is
the THOX "moat" against "why can't I just run a 12B on my Mac". Reach
the systems-engineer audience on LinkedIn.

## Hero

ThoxNova on a desk; the 7-tier diagram as a Grok flat illustration
for the LinkedIn carousel.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | ThoxNova hero + 7-tweet thread |
| linkedin | 4:5 PDF carousel (9 slides) | hero + 7 tier slides + CTA |

## Filled OpenAI prompt (1:1 hero)

```
Use IMAGE_TEMPLATES.md section #1. Slots:
{device_name} = ThoxNova
{hero_face} = three-quarter angle showing the vented lid + the M.2
  door
{device_physical_specs} = desktop puck on the LattePanda N100
  footprint, 132 mm x 86 mm x 38 mm, matte black ASA, vented lid,
  M.2 access door
{brand_accent_detail} = subtle emerald LED dot on the lower-right
  of the lid
```

## Filled Grok illustration prompt (each of 7 tier slides)

```
Use ILLUSTRATION_SYSTEM_PROMPT.md skeleton. Per tier slide:

Flat vector illustration of {tier_name} memory layer.
Background: deep navy #0a0e14 solid fill.
Stroke: 2 px emerald #10b981.
Fill: white #f8fafc for the layer label.
Motif: a stack of {n_blocks} small horizontal rectangles representing
  the layer's relative size, with the active block highlighted in
  emerald.
Composition: tier name in IBM Plex Sans Bold 80 px top-center;
  bandwidth in JetBrains Mono Bold 56 px center; physical example in
  slate IBM Plex Sans 32 px below.
12 percent margin from all edges.
Two-tone emerald + white on navy. Sharp vector edges.
```

## Caption: X (7-tweet thread)

```
1/ A 12B-parameter LLM in fp16 is 24 GB on disk. Your MacBook has 16
GB of unified memory.

This is why "just run it locally" doesn't work in 2025. /1

2/ THOX's answer: the 7-tier memory hierarchy. The kernel knows
about every tier. The runtime places weights and activations where
they should be for the operation. /2

3/ Tier 0: SRAM, 19 TB/s on-die. Hot activations only.
Tier 1: HBM, 19 TB/s. KV cache for active token window. /3

4/ Tier 2: DRAM, 2 TB/s. Hot weights of the layer currently
computing.
Tier 3: LPDDR5 UMA, 102.4 GB/s. Warm weight bank. /4

5/ Tier 4: NVMe, 7 GB/s. Cold weights, paged in on demand.
Tier 5: SSD. Long-term context, history, embeddings.
Tier 6: mesh-remote. Another THOX on the local network. /5

6/ The win: a ThoxNova on a LattePanda N100 runs 12B with the
weights paged across Tiers 2-4. Never thrashes. Never hits the
network. /6

7/ This is what local-first actually requires under the hood.

Kickstarter Aug 12 2026.
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: LinkedIn

```
The hardest part of local AI is not the model. It is the memory.

A 12B-parameter LLM in fp16 is 24 GB on disk. The activations
during inference add another few GB. The KV cache for a 2K context
adds another 1-2 GB. On a desktop with 16 GB of unified memory,
this math does not work.

THOX's answer: a 7-tier memory hierarchy the kernel knows about at
the syscall level, and a runtime that places weights and activations
in the right tier for the right operation.

Carousel slides 2-8 walk through each tier with bandwidth + physical
example + role. The win: a ThoxNova on a LattePanda N100 runs a
12B model with weights paged across Tiers 2-4, never thrashing,
never hitting the network.

This is the architecture that makes "local AI on consumer hardware"
real in 2026.

Kickstarter Aug 12 2026.
thox.ai/launch

#THOXai #localAI #engineering #systems #memory
```

## Alt text

```
A ThoxNova desktop puck on a clean dark surface. The 132 x 86 mm
matte black device shows a vented lid and an M.2 access door. A small
emerald LED glows on the lower-right of the lid.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-27-mon-why-7tier-memory`

## Acceptance

- [ ] X thread ≤ 7 tweets
- [ ] LinkedIn PDF 9 slides, ≤ 2 MB
- [ ] Bandwidth figures match the canonical THOX 5-tier memory spec
      (note: docs mention both 5-tier and 7-tier; verify against
      the latest project memory before publish)
- [ ] No em-dashes
