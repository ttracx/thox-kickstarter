# Navigation

The locked five-section model is the most non-negotiable part of TXF.

## Sections

| Order | Label | Icon | Default route |
|-------|-------|------|---------------|
| 1 | Home | home | `/` |
| 2 | Agents | users | `/agents` |
| 3 | Projects | folder | `/projects` |
| 4 | Devices | cpu | `/devices` |
| 5 | Vault | shield | `/vault` |

## Rendering

| Surface | Pattern |
|---------|---------|
| Desktop | Left sidebar with vertical labels |
| Tablet | Collapsible left sidebar |
| Mobile | Bottom navigation bar |
| Watch | Card stack accessed via crown/swipe |
| Voice-first device | Spoken section list |

## Universal Commands

The Command Palette MUST register the eight universal commands defined in `txf-navigation::universal_commands`:

1. Create Project
2. Open Vault
3. Find Device
4. Launch Agent
5. Deploy Workflow
6. Generate Code
7. Print Asset
8. Search Memory

Surfaces MAY register additional commands but MUST register these eight verbatim.

## Triggers

| Trigger | Required |
|---------|----------|
| Cmd+K / Ctrl+K | Yes |
| Voice wake "THOXY" | Yes (where voice is supported) |
| Long-press | Yes (touch surfaces) |
| Quick-action button | Yes |
