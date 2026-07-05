# THOX UX Specification

Version: 2.0  |  Status: Normative  |  Owner: TXF

## 1. Universal Navigation

Every TXF-certified application MUST expose exactly five top-level sections in this order: Home, Agents, Projects, Devices, Vault. Sections MUST NOT be added, removed, renamed, or reordered.

| Section | Purpose | Default route |
|---------|---------|---------------|
| Home | Overview, dashboards, what changed | `/` |
| Agents | THOXY chat surface and agent roster (Advanced Mode reveals mesh) | `/agents` |
| Projects | Project list, project detail, workflows, files | `/projects` |
| Devices | Discovered devices, telemetry, pairing | `/devices` |
| Vault | Archived memory, sealed projects, audit trail | `/vault` |

## 2. Universal Layout

| Surface | Columns | Gutter | Notes |
|---------|---------|--------|-------|
| Desktop | 12 | 24 px | Sidebar + content split |
| Tablet | 8 | 20 px | Collapsible sidebar |
| Mobile | 4 | 16 px | Bottom navigation bar |
| Watch | 1 | n/a | Card stack, voice-first |

Baseline grid: 8 px on all surfaces. All vertical rhythm MUST snap to it.

## 3. Universal Command Palette

Every TXF app MUST register the eight universal commands (see `txf-navigation::universal_commands`). Triggers MUST include Cmd+K and Ctrl+K. Voice trigger MUST be the wake phrase `THOXY`. Long-press MUST be supported on touch surfaces.

## 4. State Visibility

Every action that changes server or device state MUST surface a `ThoxStatusPill` reflecting the destination's live state. Pills use the canonical state ladder (online, offline, busy, thinking, warning, error, updating).

## 5. Density and Sizing

| Class | Min touch | Min text | Min line height |
|-------|-----------|----------|-----------------|
| Phone | 44 x 44 px | 14 px | 1.4 |
| Tablet | 44 x 44 px | 14 px | 1.4 |
| Watch | 40 x 40 px | 16 px | 1.3 |
| Desktop | n/a | 14 px | 1.5 |

## 6. Motion

Default durations: 200 ms. Snappy: 100 ms. Reflective: 300 ms. Emphasized: 500 ms. Anything over 800 ms requires UX review. `prefers-reduced-motion` MUST disable transform animations and shorten remaining transitions to 0 ms.

## 7. Empty, Loading, Error

Every list, panel, or surface MUST handle the empty, loading, and error states explicitly. There MUST be no implicit "nothing rendered" state.
