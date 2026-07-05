# TXF Strategy

This directory holds the executive and architecture-level narrative documents that govern the THOX Experience Fabric program.

## TXF-Enterprise-Standardization-Program.docx

**Status**: Executive Approval Draft. v1.0. June 6, 2026.

**Classification**: Internal Use Only.

**Purpose**: The blueprint that drives the design system, agent platform, device ecosystem, ThoxOS, Dispatch, Studio, Forge, Nova, Mini, Air, and future robotics initiatives. Explains the seven-layer TXF stack, the standardization specifications, the certification program, and the 4-phase rollout (Foundation, Shared Libraries, Platform Integration, Digital Human Integration).

**Companions**:

- `design-systems/thox-ai-txf/` - machine-readable design system and manifest schema
- `standards/` - five normative specifications
- `certification/` - validators and the `thox-cert` release-gate CLI
- `docs/adr/` - architecture decision records

**Update cadence**: quarterly review by the THOX Product Council; ad-hoc revisions tracked in the document's version row.

## TXF-UX-Engine-Integration-Reference.docx

**Status**: Executive Review Draft. v1.0. June 6, 2026. Companion to TXF v0.2.0.

**Classification**: Internal Use Only.

**Purpose**: The engineering reference for the UX engine integration. Documents the single source of truth for design tokens (`tools/ux-engine`), the token pipeline, the four enforcement gates plus the TXF token drift gate, the certification linkage to the Experience Score, the updated repository structure, platform consumption, governance, and a verification-status record. Read alongside ADR-0005.

**Companions**:

- `tools/ux-engine/` - the token source of truth and gate engine
- `tools/ux-engine/STANDARDIZATION.md` - the full enforcement mechanism
- `docs/adr/0005-ux-engine-token-source-of-truth.md` - the decision record

