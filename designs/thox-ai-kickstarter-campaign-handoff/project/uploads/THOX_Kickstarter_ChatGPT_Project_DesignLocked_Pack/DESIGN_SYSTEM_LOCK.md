# THOX.ai Design System Lock

Use this file whenever generating Kickstarter campaign resources or assets.

## Source files

| Source file | Purpose |
|---|---|
| `Updated Kickstarter Campaign-handoff/updated-kickstarter-campaign/project/assets/colors_and_type.css` | Primary colors, typography, type scale, spacing, radii, glow, aliases, focus styles |
| `Introducing THOX.ai/assets/thox-tokens.css` | Matching THOX.ai design system v1.0 token source |
| `Updated Kickstarter Campaign-handoff/updated-kickstarter-campaign/project/keyvisual.jsx` | Campaign hero composition, font usage, emerald-on-dark treatment |
| `MeshStack, THOXs, and ThoxMigrate 2(1)/uploads/meshstack-figma-plugin-scaffold/src/tokens.ts` | MeshStack app token map for Figma and UI surfaces |
| `ThoxMini/thox/tokens.css` | Legacy Mini prototype reference only |

Do not export or share font binaries. Use font family names and existing local project assets only.

## Fonts

| Role | Font | Fallback |
|---|---|---|
| Hero, headings, product display names, major numerals | Xolonium | Inter, sans-serif |
| Body, UI, email, press, social, tables | Inter | system-ui, -apple-system, sans-serif |
| Code, SKUs, telemetry, spec labels, captions, terminal | JetBrains Mono | Consolas, SF Mono, monospace |
| DOCX runtime fallback only | Calibri | Only if source fonts unavailable |

Space Grotesk appears in older Mini prototype screens. Do not use it as a campaign font unless recreating that exact prototype for reference.

## Core palette

| Token | Hex | Usage |
|---|---|---|
| Background base | `#09090B` | Main campaign background |
| Canvas black | `#000000` | Full-bleed hero / app canvas |
| Surface | `#18181B` | Cards and panels |
| Elevated | `#27272A` | Raised surfaces |
| Border | `#3F3F46` | Default line |
| Border subtle | `#27272A` | Hairline |
| Text primary | `#FAFAFA` | Headings on dark |
| Text secondary | `#A1A1AA` | Body on dark |
| Text muted | `#71717A` | Captions |
| Emerald 400 | `#34D399` | Links, hover, icon accent |
| Emerald 500 | `#10B981` | CTA, active, rule line |
| Emerald 600 | `#059669` | Pressed and dark gradient |
| Neon | `#00FF88` | Sparse device and terminal glow |
| Warning | `#FBBF24` | Warning state |
| Destructive | `#EF4444` | Error state |
| Info | `#3B82F6` | Information state |
| MagStack purple | `#A855F7` | MagStack only |
| MagStack purple light | `#C084FC` | MagStack only |

## MeshStack sub-palette

Use only inside MeshStack app surfaces:

- Canvas: `#000000`
- Surface: `#050A0B`
- Card: `#091113`
- Elevated: `#0D1718`
- Border: `#1F3430`
- Secondary text: `#C7D0CC`
- Muted text: `#87928E`
- Accent: THOX emeralds above

MeshStack is not purple. Purple is only for MagStack cluster/coupling content.

## Required design checks

Every visual, slide, HTML page, CSS file, social template, reward tile, PDF, and DOCX must pass:

- Fonts match role: Xolonium display, Inter body, JetBrains Mono labels.
- Background and surfaces use approved tokens.
- CTA uses emerald `#10B981`; hover or accent uses `#34D399`.
- Purple is absent unless the element is explicitly MagStack.
- MeshStack UI uses emerald and MeshStack dark palette.
- No legacy green `#2ee68f` in new campaign shells.
- No generic or off-brand fonts in final formatted assets.
- Markdown deliverables include rendering notes when they will become HTML, PDF, DOCX, or slides.
