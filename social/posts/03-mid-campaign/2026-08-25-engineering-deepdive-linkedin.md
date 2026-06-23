# Mid-campaign worked example: LinkedIn engineering deep-dive carousel

Phase: mid-campaign. Date: 2026-08-25 (T+13). Theme: technical
deep-dive on the THOX 7-tier memory hierarchy. Primary platform:
LinkedIn (PDF carousel). Cross-post: X thread.

## Identity

- **Post ID**: `2026-08-25-engineering-deepdive-linkedin`
- **Phase**: mid-campaign
- **Platform(s)**: linkedin (primary), x (thread cross-post)
- **Date / time (PT)**: 2026-08-25 09:00 (LinkedIn morning peak)
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Click to Kickstarter page. Secondary: backer share with engineering
colleagues. LinkedIn carousel PDF format has the highest reach on
LinkedIn and drives ~3% click-through to off-platform when the
content is technically credible.

## Hero device

ThoxNova (the 7-tier memory diagram has its strongest expression on
the desktop puck where all 7 tiers are populated).

## Asset spec

- 10-slide PDF carousel exported at 1080 x 1350 each.
- Companion 4:5 still hero shot for the X thread head.

## Prompts (the pipeline contract)

- **OpenAI image template used**: section #7 (comparison infographic)
  for the 7-tier diagram slides; section #2 (4:5 hero) for the
  cover slide.
- **Grok illustration prompt used**: motif #4 (mesh node) +
  illustration system prompt for the tier-architecture diagrams on
  slides 2-7.
- Slide-by-slide content lives in the asset directory.

## Slide breakdown (10 slides)

| Slide | Content | Asset prompt template |
|---|---|---|
| 1 | 4:5 hero: ThoxNova on desk, title overlay "The 7-tier memory hierarchy" | IMAGE_TEMPLATES #2 + post-render title overlay |
| 2 | Tier 0 (SRAM 19 TB/s) | ILLUSTRATION skeleton + tier-0 motif |
| 3 | Tier 1 (HBM 19 TB/s) | same |
| 4 | Tier 2 (DRAM 2 TB/s) | same |
| 5 | Tier 3 (LPDDR5 UMA 102.4 GB/s) | same |
| 6 | Tier 4 (NVMe 7 GB/s) | same |
| 7 | Tier 5 (SSD) and Tier 6 (mesh-remote) | same |
| 8 | "How ThoxOS places pages" - example showing inference workload migration across tiers | flat vector diagram via Grok illustration |
| 9 | "Why this matters" - bullet list of consequences (low latency, power efficiency, etc.) | text slide on dark navy |
| 10 | CTA - "Back the THOX Kickstarter" + URL | typographic slide |

## Caption: LinkedIn (3000 chars)

```
The hardest part of local AI is not the model. It is the memory.

A 12B-parameter LLM in fp16 is 24 GB on disk. The activations
during inference are another few GB. The KV cache for a 2K context
is another 1-2 GB. On a desktop with 16 GB of unified memory, that
math does not work.

Our answer: a 7-tier memory hierarchy that the kernel knows about
at the syscall level, and a model runtime that places weights and
activations in the right tier for the right operation.

Slide deck breakdown:

- Tier 0 (SRAM, 19 TB/s on-die scratch): hot activations only.
- Tier 1 (HBM, 19 TB/s): KV cache for the active token window.
- Tier 2 (DRAM, 2 TB/s): the hot weights of the layer currently
  computing.
- Tier 3 (LPDDR5 UMA, 102.4 GB/s): the warm weight bank.
- Tier 4 (NVMe, 7 GB/s): the cold weights, paged in on demand.
- Tier 5 (SSD): long-term context, conversation history, embeddings.
- Tier 6 (mesh-remote): another THOX device on the mesh,
  capacity-limited but available.

The win: a ThoxNova on a LattePanda N100 runs a 12B model with the
weights paged across Tiers 2-4, never thrashing, never hitting the
network. The cloud version of this would round-trip your prompt and
log everything.

This is what local-first actually requires under the hood. The full
ThoxOS spec is at the Kickstarter:

kickstarter.com/projects/thox-ai/thox-unified-2026

Your AI. Your Data. Your Rules.

#THOXai #localAI #engineering #systems #ai #rust
```

## Caption: X thread cross-post (8 tweets)

Tweet 1 (hook):
```
A 12B LLM in fp16 is 24 GB. Your laptop has 16 GB. The math does
not work.

Unless your kernel knows about your memory tiers.

🧵 The THOX 7-tier hierarchy. /1
```

Tweets 2-8: condense the carousel slides into one-tweet summaries,
ending with the Kickstarter link.

## Alt text (carousel slide 1)

```
A ThoxNova desktop puck sits on a clean workspace next to a
notebook. White text overlay reads "The 7-tier memory hierarchy"
with a small THOX logomark.
```

## UTM tracking

LinkedIn: `?utm_source=linkedin&utm_medium=carousel&utm_campaign=ks-launch-2026&utm_content=2026-08-25-engineering-deepdive`

## Acceptance checklist

- [ ] 10 slides exact, each at 1080 x 1350 px
- [ ] PDF exported at <2 MB (LinkedIn upload limit)
- [ ] All diagrams use the THOX brand palette and Grok illustration
      style (verified flat vector, two-tone)
- [ ] LinkedIn caption under 3000 chars
- [ ] X thread total under 8 tweets
- [ ] No em-dashes (verified)
- [ ] Brief committed to repo
- [ ] Asset directory created

## Post-mortem

LinkedIn deep-dive posts have a 7-14 day reach window. Fill at T+15.
