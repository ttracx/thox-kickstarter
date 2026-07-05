# Scaling plan

Last updated: 2026-06-25
Status: DRAFT

---

## Scope

How the THOX platform scales from the Kickstarter cohort (target FILL:
units across all SKUs) to 100K customer devices in the field within
24 months.

## Hardware scaling

- Component supply contracts to be sized per Tier-1, Tier-2, Tier-3
  funding outcomes (see 05_team/hiring_plan.md).
- Assembly: in-house pilot batch -> contract manufacturer for volume.
  Decision gate: 5K cumulative units shipped triggers CM evaluation.
- Test fixtures: standardized per SKU. Designs in thox-quickstart
  assembly walkthroughs.

## Software scaling

- thox-agent-memory backed by Postgres + pgvector + Redis + blob; sized
  per-customer with content_hash dedupe.
- nellie-sync v2 daemon (event log + cursors + heartbeats) supports
  long-tail device counts; per-device sync state is independent.
- THOX agent fleet scales horizontally per skill.

## Operational scaling

- Customer support: skill-based deflection first (see
  customer-support skill), human handoff for non-trivial.
- Fulfillment: 3PL evaluation at FILL: unit threshold (default 1K).
- Returns and warranty: per-SKU defect rate tracked from pilot batch
  forward.

## Risk surface at scale

- Supply chain: single-source LattePanda N100 for Nova; multi-source
  Luckfox Pico Mini B for Clip/Mini/Air.
- Software: model weights distribution at 100K-device scale will
  require CDN strategy (cross-link HF + thox-docs).
- Support: skill quality must clear deflection threshold before
  scaling marketing further.

## Disclaimer

Plan is conditional on funding outcomes and supply commitments. Targets
above are directional, not binding.
