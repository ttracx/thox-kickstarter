# THOX Experience Fabric (TXF)

**The official cross-platform experience layer for all THOX.ai products.**

Version: 0.1.0 (Phase 0 scaffold) | Spec Version: 2.0 | Owner: THOX.ai | Status: Core Platform Specification

---

## Vision

THOX Experience Fabric (TXF) is the layer that makes every device feel like THOX, every application feel like THOX, every agent behave like THOX, and every interaction follow the same standards.

Whether the user is on ThoxNova, ThoxMini, ThoxAir, ThoxClip, ThoxWatch, ThoxVault, ThoxOS, THOX Dispatch, THOX Studio, THOX Forge, or any future surface, the experience is the same. The screen size changes. The hardware changes. The experience never changes.

## Architecture

TXF sits above the THOX design system and below every product. It is composed of three planes:

```
        Products (Nova, Mini, Air, Watch, Vault, Dispatch, Studio, Forge, OS, Mobile, ...)
                                |
        +------------------- SDKs -------------------+
        |  react  react-native  flutter  swift       |
        |  kotlin  tauri  rust  web-components       |
        +--------------------------------------------+
                                |
        +-------------- TXF Runtime (Rust) -----------+
        | txf-core         identity + manifest        |
        | txf-design-tokens compiled design system    |
        | txf-components    component contracts       |
        | txf-agent-framework THOXY + agent mesh      |
        | txf-memory        HOT / WARM / COLD / VAULT |
        | txf-navigation    Home/Agents/Projects/...  |
        | txf-device-fabric discovery + telemetry     |
        | txf-projects      universal project model   |
        | txf-notifications cross-surface signals     |
        | txf-voice         wake + state machine      |
        | txf-compliance    HIPAA / GDPR / SOC2 gates |
        +---------------------------------------------+
                                |
        +-------- Standards & Certification ----------+
        | ux-spec  interaction-spec  a11y-spec        |
        | digital-human-spec  agent-behavior-spec     |
        | ux-validator  branding-validator            |
        | accessibility-validator  release-gates      |
        +---------------------------------------------+
```

## Repository Layout

```
thox-experience-fabric/
|
+-- packages/                    # Rust crates - the TXF runtime
|   +-- txf-core/                # Identity, user model, TXF manifest schema
|   +-- txf-design-tokens/       # Compiled design tokens (Rust + JSON output)
|   +-- txf-components/          # Universal component contracts
|   +-- txf-agent-framework/     # THOXY protocol, agent mesh, capability routing
|   +-- txf-memory/              # 4-tier memory: HOT/WARM/COLD/VAULT
|   +-- txf-navigation/          # Universal navigation model (5 sections)
|   +-- txf-device-fabric/       # Device discovery, telemetry, presence
|   +-- txf-projects/            # Universal project model
|   +-- txf-notifications/       # Cross-surface notification standard
|   +-- txf-voice/               # Voice state machine + wake phrase
|   +-- txf-compliance/          # HIPAA / GDPR / SOC2 guardrails
|
+-- sdk/                         # Platform SDKs (wrappers over the runtime)
|   +-- react/                   # React + Next.js (web, Vercel)
|   +-- react-native/            # React Native (mobile)
|   +-- flutter/                 # Flutter (mobile + embedded)
|   +-- swift/                   # SwiftUI (iOS, macOS, watchOS, visionOS)
|   +-- kotlin/                  # Kotlin (Android, ThoxWatch)
|   +-- tauri/                   # Tauri (desktop)
|   +-- rust/                    # Embedded / ThoxOS native
|   +-- web-components/          # Framework-free Web Components
|
+-- standards/                   # Plain-language specifications
|   +-- ux-specification.md
|   +-- interaction-specification.md
|   +-- accessibility-specification.md
|   +-- digital-human-specification.md
|   +-- agent-behavior-specification.md
|
+-- certification/               # CLI validators + release gates
|   +-- ux-validator/
|   +-- branding-validator/
|   +-- accessibility-validator/
|   +-- release-gates/           # Computes the THOX Experience Score (0-100)
|
+-- design-systems/
|   +-- thox-ai-txf/             # Design system docs aligned to TXF
|       +-- DESIGN.md            # System overview
|       +-- TOKENS.json          # Generated token bundle (source: tools/ux-engine)
|       +-- COMPONENTS.md
|       +-- NAVIGATION.md
|       +-- AGENTS.md
|       +-- MEMORY.md
|       +-- DEVICES.md
|       +-- DIGITAL-HUMANS.md
|       +-- ACCESSIBILITY.md
|       +-- CERTIFICATION.md
|       +-- MANIFEST.schema.json
|
+-- tools/
|   +-- ux-engine/               # @thox/txf-ux-engine: token source of truth + gates
|       +-- tokens/              # Authored once: core + base/meshstack/doc themes
|       +-- src/                 # Resolver, emitters, four gates, TXF sync
|       +-- contracts/           # Component contracts (a11y + token bindings)
|       +-- packages/react/      # Canonical ThoxButton primitive
|       +-- dist/                # Generated per-platform artifacts
|       +-- STANDARDIZATION.md   # The enforcement mechanism, in full
|
+-- docs/
|   +-- adr/                     # Architecture decision records (0001-0005)
|   +-- strategy/                # Executive strategy document (.docx)
|
+-- assets/                      # Logos, favicon, brand glyphs
+-- .github/workflows/           # CI: fmt, clippy, test, release gate, ux-engine
```

## Design tokens are generated, never hand-edited

`design-systems/thox-ai-txf/TOKENS.json` is compiled from the UX engine. To
change a token, edit `tools/ux-engine/tokens/` and regenerate:

```bash
cd tools/ux-engine
node src/build.mjs            # compile all platform artifacts
node src/verify.mjs           # brand + WCAG AA + contracts + drift gates
node src/sync-txf.mjs         # regenerate design-systems/thox-ai-txf/TOKENS.json
node src/sync-txf.mjs --check # CI drift gate (exit 1 if out of sync)
```

CI runs all of the above on every PR (job `ux-engine`). See ADR-0005 and
`tools/ux-engine/STANDARDIZATION.md`.


## Core Concepts

### One Identity

Every THOX product exposes the same `ThoxUser` (profile, preferences, memory profile, projects, devices, agents). The user never re-onboards when moving between surfaces.

### One Memory

Four tiers. Same shape everywhere.

| Tier | Span | Location |
|------|------|----------|
| HOT | Current conversation | Device working memory |
| WARM | Current project | Mesh (cross-device, project-scoped) |
| COLD | Historical knowledge | Mesh (cross-device, retrievable) |
| VAULT | Archived / sealed | ThoxVault (encrypted, immutable) |

Maps to the 7-tier cognitive model in `thox-digitalhumans` (Sensory/Working = HOT, Episodic = WARM, Semantic = COLD, Identity/Procedural/Mesh = VAULT-backed). See `design-systems/thox-ai-txf/MEMORY.md`.

### One Navigation

Every TXF-certified app exposes exactly five sections in this order:

```
Home  |  Agents  |  Projects  |  Devices  |  Vault
```

No exceptions. Order is locked. Iconography is locked. Labels are locked.

### THOXY Protocol

Only one agent is user-visible by default: **THOXY**. All other agents (Hermes, Sadie, Forge, Architect, Research, Manufacturing, Security, Infrastructure, Ava, Mira, Kai, Sera, Nova) are background workers routed through THOXY unless the user enables Advanced Mode.

### Universal Command Palette

Every TXF app exposes the same command surface via:

```
Cmd+K   Ctrl+K   Voice wake ("THOXY")   Long-press   Quick-action button
```

The action set is shared across surfaces.

## TXF Manifest

Every TXF-certified application must ship a `txf.json` at the root of its bundle:

```json
{
  "txfVersion": "2.0",
  "designSystem": "THOX",
  "identityEnabled": true,
  "memoryEnabled": true,
  "projectsEnabled": true,
  "navigationStandard": true,
  "deviceFabricEnabled": true,
  "agentFabricEnabled": true,
  "voiceEnabled": true,
  "accessibilityCertified": true,
  "experienceScoreFloor": 90
}
```

Schema: `design-systems/thox-ai-txf/MANIFEST.schema.json`.

## THOX Experience Score

Every release is scored 0-100 by the certification CLI:

| Score | Gate |
|-------|------|
| 90-100 | Ship |
| 80-89 | Review required |
| < 80 | Blocked |

The score combines branding, navigation, agent behavior, memory, device, and accessibility validators. See `standards/` and `certification/`.

## Quickstart

```bash
# build the workspace
cargo build --workspace

# run the validator suite against an app bundle
cargo run -p release-gates -- --bundle ./my-app

# compile design tokens to CSS / JSON / Swift / Kotlin
cargo run -p txf-design-tokens -- emit --target css   > tokens.css
cargo run -p txf-design-tokens -- emit --target json  > tokens.json
cargo run -p txf-design-tokens -- emit --target swift > Tokens.swift
cargo run -p txf-design-tokens -- emit --target kotlin > Tokens.kt
```

## Status

- v0.1.0 (2026-06-06): Phase 0 scaffold. Crates compile. Design tokens, standards, manifest schema, validators all wired.
- Next: Phase 1 (component contracts), Phase 2 (THOXY agent mesh), Phase 3 (release gate v1 against thox-terminal + Forge + Studio).

## Related Repositories

| Repo | Role |
|------|------|
| `ttracx/thox-digitalhumans` | Provides the 7-tier cognitive memory and HumanFabric agents that TXF agent-framework calls into |
| `ttracx/thox-litert-lm` | On-device LLM runtime invoked by THOXY |
| `ttracx/thox-terminal` | First TXF-certified application (SwiftUI iOS+macOS control plane) |
| `ttracx/thox-portable` | Carried-device runtime that hosts TXF on the move |
| `ttracx/thox-forge` | Operator dashboard for the Qidi Q2 Combo |

## License

Apache-2.0. See [LICENSE](./LICENSE).

## IP

THOX Experience Fabric is invention IP-024 in the THOX.ai patent portfolio. Inventors of record: Craig Ross and Phamy Xaypanya.
