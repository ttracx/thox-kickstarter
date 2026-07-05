# THOX Design System 2.0

Powered by THOX Experience Fabric (TXF).

## Status

The THOX Design System is no longer a component library. It is the visual implementation layer of TXF. TXF is the official cross-platform experience layer; this directory describes how the design system aligns to TXF's standards.

The previous remix-source design system at `C:/Users/tommy/dev/THOX.ai Design System (Remix).zip` was the v1 reference (decks, letterheads, Nova hero imagery). v2 absorbs those assets and elevates the system into an Experience Operating System with these layers:

- **Identity** (txf-core)
- **Memory** (txf-memory)
- **Projects** (txf-projects)
- **Device Fabric** (txf-device-fabric)
- **Agent Fabric** (txf-agent-framework)
- **Voice** (txf-voice)
- **Notifications** (txf-notifications)
- **Compliance** (txf-compliance)
- **Tokens** (txf-design-tokens)
- **Navigation** (txf-navigation)

Each layer ships its own canonical doc in this directory. The TOKENS.json file is the machine-readable source of truth for color, typography, spacing, motion, radius, elevation, and layout. The CSS / Swift / Kotlin / Tailwind / Figma emits are generated from it via `cargo run -p txf-design-tokens -- emit --target <target>`.

## Design Philosophy

**One Ecosystem.** Users do not interact with products. Users interact with THOX. Devices are portals into the same intelligence fabric.

**Four Principles.** One Identity. One Memory. One Navigation Model. One Visual Language.

## Color

Emerald-first dark surface. Reserved purple (MagStack only). Four semantic colors. Full palette lives in TOKENS.json. See `TOKENS.json` for ground truth.

| Role | Hex |
|------|-----|
| Black | `#09090B` |
| Surface | `#111113` |
| Card | `#1A1A1C` |
| Border | `#27272A` |
| Emerald | `#10B981` |
| Emerald Bright | `#34D399` |
| MagStack Purple (reserved) | `#A855F7` |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Info | `#3B82F6` |

## Typography

- Primary: **Inter**, weights 400 / 500 / 600 / 700 / 800
- Code: **JetBrains Mono**, weights 400 / 600

## Layout

- Desktop: 12 columns, 24 px gutter
- Tablet: 8 columns, 20 px gutter
- Mobile: 4 columns, 16 px gutter
- Baseline: 8 px on every surface

## Motion

100 / 200 / 300 / 500 / 800 ms. Default 200 ms. `prefers-reduced-motion` reduces transforms to 0 ms.

## Component Anchor Set

See `COMPONENTS.md` for the contract list. All components are defined by `txf-components`; surfaces render them.

## Navigation

See `NAVIGATION.md`. Locked five sections.

## Agents

See `AGENTS.md`. THOXY only, by default.

## Memory

See `MEMORY.md`. Four tiers, universal API.

## Devices

See `DEVICES.md`. Universal panel.

## Digital Humans

See `DIGITAL-HUMANS.md`. Backed by ttracx/thox-digitalhumans.

## Accessibility

See `ACCESSIBILITY.md`. WCAG 2.2 AA floor.

## Certification

See `CERTIFICATION.md`. The THOX Experience Score gates release.
