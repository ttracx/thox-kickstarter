# TXF Ecosystem Map

Where THOX Experience Fabric fits, what it connects to, and what depends on it.

## Upstream (TXF consumes)

| Upstream | Role |
|----------|------|
| ttracx/thox-digitalhumans | 7-tier cognitive memory + HumanFabric agents drive THOXY's mesh routing |
| ttracx/thox-litert-lm | On-device LLM runtime invoked by THOXY |
| ttracx/thoxllm-factory | Trained adapter set (Forge / Mini / Global / Wave / Nova / Gem) consumed by THOXY |
| ttracx/thoxllm-327m | First THOX-owned foundation LM; future THOXY backend |

## Downstream (consumes TXF)

| Downstream | Role |
|------------|------|
| ttracx/thox-terminal | SwiftUI iOS+macOS control plane, first TXF-certified application |
| ttracx/thox-portable | Carried-device runtime; TXF is the experience layer for the on-the-move surface |
| ttracx/thox-forge | Operator dashboard for the Qidi Q2 Combo |
| ttracx/thox-sandbox | THOX-branded multi-language sandbox; TXF shells the operator UI |
| Future: thox-studio, thox-dispatch | Browser surfaces for design and incident handling |
| Future: thoxos | OS-level shell for ThoxNova / ThoxMini / ThoxAir / ThoxClip / ThoxVault / ThoxWatch |

## Lateral

| Lateral | Role |
|---------|------|
| ttracx/THOX.ai Design System (Remix) | Visual asset library (decks, letterheads, Nova hero imagery); v2 of the design system lives in this repo at `design-systems/thox-ai-txf/` |
| ttracx/magstack-air* | MagStack hardware family using the reserved `--thox-magstack-purple` accent |

## Internal source of truth

| Component | Role |
|-----------|------|
| tools/ux-engine (`@thox/txf-ux-engine`) | The single source of truth for design tokens. Authors tokens once and compiles them to web / SwiftUI / Compose / Rust / Figma and the TXF v2.0 runtime bundle (`design-systems/thox-ai-txf/TOKENS.json`). Runs the brand, WCAG AA, contract, and drift gates in CI. The `txf-design-tokens` crate and every SDK consume its output; none redefine token values. See ADR-0005. |

## Boundaries

- TXF owns identity, memory, projects, devices, agents, navigation, notifications, voice, compliance, and the design system.
- TXF does NOT own: model training (thoxllm-factory), LLM runtime (thox-litert-lm), agent reasoning (thox-digitalhumans), device firmware (per-device repos).
- TXF defines contracts only. Surfaces implement them. The boundary is the SDK.

## Versioning

TXF is semver-versioned. The manifest pins to `txfVersion`. Breaking changes bump the major; minor and patch are backward-compatible.
