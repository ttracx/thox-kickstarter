# Component Contracts

All TXF components are defined as Rust contracts in `packages/txf-components`. SDK wrappers (React, SwiftUI, Compose, Web Components) implement them. The set is small on purpose.

## Anchor Components

| Component | Purpose | Variants / States |
|-----------|---------|-------------------|
| ThoxCard | Universal surface container | default, elevated, glass, danger |
| ThoxButton | Action | primary, secondary, danger, ghost, agent |
| ThoxStatusPill | Live state indicator | online, offline, busy, thinking, warning, error, updating |
| ThoxAgentCard | Agent identity and current task | THOXY-foreground, background (hidden unless Advanced Mode) |
| ThoxDevicePanel | Device status panel | online, offline, pairing, updating |
| ThoxNotification | Cross-surface alert | info, success, warning, danger, critical |
| ThoxWorkflowCard | Workflow state and progress | idle, running, waiting, failed, completed |

## Composition Rules

1. Every screen MUST anchor on at most one ThoxAgentCard in the foreground.
2. ThoxCard MUST be the base surface for any non-list content.
3. ThoxButton variants MUST map to the same intent everywhere: primary = commit, danger = destroy, ghost = navigate, agent = THOXY-driven action.
4. ThoxStatusPill MUST reflect live state; never static labels.

## Slot Discipline

Each component exposes named slots only. There is no "children" slot for arbitrary content. Slot names are part of the contract; surfaces MUST NOT add or rename slots.

## Theming

Every component reads from CSS variables (web), Color enums (Swift), or `MaterialTheme.colors` (Compose), all generated from TOKENS.json. Hardcoded colors fail the branding validator.
