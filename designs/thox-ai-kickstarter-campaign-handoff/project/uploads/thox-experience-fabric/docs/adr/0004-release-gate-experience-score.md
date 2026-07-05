# ADR 0004 - Releases are gated on the THOX Experience Score

Date: 2026-06-06  |  Status: Accepted

## Context

Without a release gate, every product can self-certify and the spec becomes aspirational. We've seen this exact failure mode in other portfolios: a "design system" that lives in Figma and is selectively ignored by engineering.

## Decision

Every TXF release runs `thox-cert --bundle <path>`, which:

1. Reads `txf.json` from the bundle.
2. Runs the four validators (branding, navigation, accessibility, agent/device/memory UX).
3. Computes a weighted Experience Score (0-100).
4. Emits the gate: Ship (>= 90), Review (80 - 89), Blocked (< 80).
5. Exits 0 (Ship), 10 (Review), 20 (Blocked), 1 (validator error), or 2 (usage error).

CI wires this in as a required check for every TXF-certified product. Blocked builds cannot be deployed.

## Consequences

- The spec is enforced at the pipeline, not by social pressure.
- Validator outputs are reviewable (JSON), making it easy to negotiate exceptions when warranted.
- Future validator versions can tighten gates without changing the integration surface.
- Adding a new dimension to the score is a single change in `release-gates` + a manifest field. Surfaces don't need to redeploy.
