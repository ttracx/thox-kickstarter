# ecosystem_map.md

Where `@thox/txf-ux-engine` sits and what it connects to.

```mermaid
flowchart TD
  subgraph UP["Upstream (authors)"]
    DESIGN["Figma / design-system owner"]
    BRAND["thox-brand skill<br/>(becomes a pointer)"]
  end

  UX["@thox/txf-ux-engine<br/>token source of truth + gates"]

  DESIGN -->|token edits| UX
  BRAND -->|brand rules folded in| UX

  subgraph DOWN["Downstream (consumers)"]
    WEB["thox.ai web (Next.js 14)"]
    DASH["dashboard / sandbox.thox.ai"]
    DOCS["docs site"]
    DEVICE["ThoxOS device UI (Rust)"]
    IOS["MeshStack iOS"]
    AND["MeshStack Android"]
    MAC["MeshStack macOS"]
    WIN["MeshStack Windows"]
    PIPE["DOCX / PPTX brand pipeline"]
    FIG["Figma (Tokens Studio round-trip)"]
  end

  UX -->|dist/web css + tailwind| WEB
  UX -->|dist/web css + tailwind| DASH
  UX -->|doc theme| DOCS
  UX -->|dist/rust| DEVICE
  UX -->|dist/swift| IOS
  UX -->|dist/swift| MAC
  UX -->|dist/kotlin| AND
  UX -->|emitted constants| WIN
  UX -->|doc theme tokens| PIPE
  UX -->|dist/figma| FIG

  subgraph CI["Boundary enforcement"]
    GATE["ux-gate workflow<br/>build + verify + test + lint"]
  end
  WEB -.PR.-> GATE
  IOS -.PR.-> GATE
  DEVICE -.PR.-> GATE
  GATE --> UX
```

## Parent product

THOX.ai platform. `@thox/txf-ux-engine` is shared infrastructure, not a product surface.
It defines the visual and behavioral contract every product surface honors.

## Upstream dependencies

- Figma and the design-system owner author token values.
- The `thox-brand` skill supplies brand rules and forbidden lists; those are
  folded into `tokens/` and `src/lint/forbidden.mjs`, after which the skill
  becomes a pointer to this package.
- No runtime code dependencies. Pure Node ESM, zero npm dependencies, so it
  builds and self-verifies anywhere.

## Downstream consumers

- thox.ai web, dashboard, sandbox, docs (CSS vars plus Tailwind preset).
- React primitives in `packages/react` (canonical `ThoxButton`).
- MeshStack iOS, macOS (Swift), Android (Kotlin), Windows (emitted constants).
- ThoxOS device UI (Rust constants).
- DOCX and PPTX brand pipeline (doc theme tokens).
- Figma round-trip (Tokens Studio set per theme).

## Data boundaries

- Inbound: token JSON only. Authored in `tokens/`, nowhere else.
- Outbound: generated artifacts in `dist/`, never hand-edited.
- Enforcement: the drift gate rebuilds and sha256-compares to
  `dist/manifest.json`; the forbidden, contrast, and contract gates block bad
  content at the PR boundary.
- The toolkit holds no secrets, no user data, no network calls.

## Connects to existing THOX assets

- `cross_platform_app_blueprint.md`, `user_journeys_by_platform.md` (J-001..J-010):
  contracts reference these journeys.
- `component_inventory.md`: readiness levels L0..L5 map to the `readiness` field
  on each contract.
- `design_tokens.meshstack.json`: superseded by
  `tokens/semantic/theme.meshstack.json` here.
