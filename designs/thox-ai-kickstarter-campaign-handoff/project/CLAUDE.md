# THOX.ai Kickstarter campaign handoff — project standards

All resources and assets in this project MUST conform to the **THOX Experience Fabric (TXF)**,
the official cross-platform experience layer for all THOX.ai products
(github.com/ttracx/thox-experience-fabric, spec v2.0, TXF v0.4.1).

## Canonical design tokens (TOKENS.json v2.0 — source of truth, do not invent values)

Colors:
- black `#09090B` · surface `#111113` · card `#1A1A1C` · border `#27272A`
- emerald `#10B981` · emerald_bright `#34D399`
- magstack_purple `#A855F7` (RESERVED — MagStack surfaces only, never decorative)
- success `#10B981` · warning `#F59E0B` · danger `#EF4444` · info `#3B82F6`

Typography: primary **Inter** (400/500/600/700/800); mono **JetBrains Mono** (400/600).
Display headings use **Xolonium** (project brand font, assets/fonts/) — kept from campaign assets.
Type scale (rem): 0.75 0.875 1 1.125 1.25 1.5 2 3.

Spacing (px): 0 4 8 12 16 20 24 32 40 48 64 96. Baseline grid: 8px on every surface.
Radius (px): 0 4 8 12 16 24.
Motion (ms): 100 200 300 500 800. Default 200ms. easing_default `cubic-bezier(0.4,0,0.2,1)`,
easing_emphasized `cubic-bezier(0.2,0,0,1)`. `prefers-reduced-motion` → transforms 0ms.
Elevation: sm `0 1px 2px rgba(0,0,0,.6)` · md `0 4px 12px rgba(0,0,0,.65)` · lg `0 12px 32px rgba(0,0,0,.72)` · glass blur 20px.
Layout: desktop 12col/24px · tablet 8col/20px · mobile 4col/16px. Min touch target 44px.

## Locked navigation (most non-negotiable TXF rule)

Every certified app surface with top-level nav exposes EXACTLY these five, in order,
never added/removed/renamed/reordered:
`Home | Agents | Projects | Devices | Vault`
Icons (locked): home · users · folder · cpu · shield.
Desktop = left sidebar; mobile = bottom bar.

## Universal command palette (Cmd+K / Ctrl+K, voice wake "THOXY", long-press, quick-action)

MUST register these 8 verbatim (surfaces MAY add more):
1 Create Project · 2 Open Vault · 3 Find Device · 4 Launch Agent ·
5 Deploy Workflow · 6 Generate Code · 7 Print Asset · 8 Search Memory
Keyboard: palette Cmd+K; nav Cmd+\; project Cmd+P; device Cmd+Shift+D; vault Cmd+Shift+V; THOXY Cmd+J.
Focus rings: emerald 2px outline, 2px offset.

## Agents — THOXY only

Only **THOXY** is user-visible by default. All other agents (Hermes, Sadie, Forge, Architect,
Research, Manufacturing, Security, Infrastructure, Ava, Mira, Kai, Sera, Nova) are background
workers routed through THOXY unless the user enables **Advanced Mode**.
Voice state ladder: idle → listening → thinking → responding|executing → completed|error → idle.

## Memory — four tiers (same shape everywhere)

HOT (current conversation, device) · WARM (current project, mesh) ·
COLD (historical, mesh, retrievable) · VAULT (archived/sealed, ThoxVault, encrypted immutable).

## State visibility

Any action changing device/server state surfaces a status pill on the canonical ladder:
online · offline · busy · thinking · warning · error · updating.
Every list/panel MUST handle empty, loading, AND error explicitly — no implicit blank state.

## TXF manifest

Certified bundles ship `txf.json` at root: txfVersion "2.0", designSystem "THOX",
identity/memory/projects/navigation/deviceFabric/agentFabric/voice/accessibility enabled,
experienceScoreFloor 90. Release scored 0–100 (≥90 ship, 80–89 review, <80 blocked).

## Voice / tone

Local-first, spec-first, plain. "Your AI. Your data. Your rules." "No cloud. No telemetry."
No em dashes in product copy. Generic model sizes in anything public-facing.
Footer: "THOX.AI LLC · CONFIDENTIAL".

## IP / legal

TXF is invention IP-024. Tommy Xaypanya = CTO, Craig Ross = CEO. © 2026 THOX.ai LLC.

## Assets on hand
- assets/fonts/ (Xolonium), assets/logos/ (thox-icon-green, thox-logo-horiz-whiteout),
  assets/team/ (founder photos), assets/thoxos/thox-bg-2026.png, assets/product/, assets/video/, assets/marketing/.

## Deliverables to keep TXF-aligned
Kickstarter Story · Campaign Runbook · Video Storyboard · Campaign Animatic ·
Software Demo · Model Gallery · ThoxOS Mini Demo (+ exports/).
