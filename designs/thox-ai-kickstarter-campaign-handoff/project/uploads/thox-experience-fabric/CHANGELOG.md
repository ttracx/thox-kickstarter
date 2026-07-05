# Changelog

All notable changes to TXF are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [0.2.0] - 2026-06-06

### Added
- `tools/ux-engine/` (package `@thox/txf-ux-engine`) - the THOX UX engine, now the single source of truth for design tokens. Pure Node ESM, zero runtime dependencies. Authors tokens once (core primitives plus base / meshstack / doc semantic themes) and compiles them to web CSS, a Tailwind preset, SwiftUI, Compose, Rust, Figma (Tokens Studio), and the TXF v2.0 runtime bundle.
- Four enforcement gates aggregated by `verify.mjs`: forbidden-pattern brand and compliance scan (surface-scoped: public / internal / magstack), WCAG 2.1 AA contrast across every theme, component-contract coverage, and `dist` drift.
- Canonical React primitive `tools/ux-engine/packages/react/ThoxButton.tsx` bound only to generated CSS variables.
- `tools/ux-engine/src/sync-txf.mjs` - projects the engine tokens into the consumed `design-systems/thox-ai-txf/TOKENS.json` and provides a `--check` drift gate.
- CI job `ux-engine`: build, verify (four gates), unit tests, and the TXF token drift gate, on every PR.
- ADR-0005 - the UX engine is the single source of truth for design tokens.

### Changed
- `design-systems/thox-ai-txf/TOKENS.json` is now a generated artifact of the UX engine (value-preserving; the flat v2.0 schema is unchanged, so `txf-design-tokens` deserializes it unmodified). It must not be hand-edited; CI enforces this.
- `branding-validator` and `accessibility-validator` doc comments updated: the token-bundle diff and contrast checks they previously deferred are now performed by the UX engine in CI. The crates remain the in-bundle scorers; the engine is the authoritative enforcer.

## [0.1.1] - 2026-06-06

### Added
- `docs/strategy/TXF-Enterprise-Standardization-Program.docx` - internal v1.0 executive strategy document. 576 paragraphs across 14 sections covering vision, current challenges, the 7-layer framework, standards, certification program, 4-phase engineering plan, repository structure, governance, success metrics, long-term vision, and 2 appendices.
- `docs/strategy/README.md` - index for the strategy directory.

## [0.1.0] - 2026-06-06

### Added
- Initial Phase 0 scaffold.
- 11 Rust crates under `packages/`: txf-core, txf-design-tokens, txf-components, txf-agent-framework, txf-memory, txf-navigation, txf-device-fabric, txf-projects, txf-notifications, txf-voice, txf-compliance.
- Rust SDK aggregator at `sdk/rust/` (crate name: `txf`).
- Certification CLIs: `release-gates` (`thox-cert`), `ux-validator`, `branding-validator`, `accessibility-validator`.
- Token emitter CLI `txf-tokens` supporting css / json / swift / kotlin / tailwind / figma targets.
- Standards: ux-specification, interaction-specification, accessibility-specification, digital-human-specification, agent-behavior-specification.
- Design system 2.0 alignment under `design-systems/thox-ai-txf/`: DESIGN.md, TOKENS.json, COMPONENTS.md, NAVIGATION.md, AGENTS.md, MEMORY.md, DEVICES.md, DIGITAL-HUMANS.md, ACCESSIBILITY.md, CERTIFICATION.md, MANIFEST.schema.json.
- ADRs 0001-0004: Experience Fabric above the design system; THOXY single visible identity; locked 5-section navigation; release gate on Experience Score.
- CI workflow: rustfmt, clippy -D warnings, cargo test --workspace on ubuntu + macos.
- Ecosystem map.
- Brand assets carried forward from the THOX.ai Design System (Remix) source zip.
- Apache-2.0 license.

### Notes
- IP-024 in the THOX.ai portfolio. Inventors of record: Craig Ross and Phamy Xaypanya.
- Spec version 2.0 implemented. Schema pinned via `MANIFEST.schema.json`.
- Workspace `cargo check` clean. `cargo test --workspace` passes (8 lib tests).
