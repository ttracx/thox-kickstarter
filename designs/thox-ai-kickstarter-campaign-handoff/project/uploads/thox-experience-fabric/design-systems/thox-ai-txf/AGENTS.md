# Agents

THOXY is the single visible identity. Every other agent in the THOX mesh is a background worker that THOXY orchestrates.

## Visible by default

- **THOXY** - synthesis, presentation, voice surface

## Background mesh (hidden unless Advanced Mode)

| Agent | Role | Source |
|-------|------|--------|
| Ava | Synthesis lead, coordinates routing and handoffs | thox-digitalhumans default team |
| Mira | Memory steward, tier maintenance | thox-digitalhumans default team |
| Kai | Device operator, ThoxOS deployment | thox-digitalhumans default team |
| Sera | Compliance sentinel | thox-digitalhumans default team |
| Nova | Build engineer | thox-digitalhumans default team |
| Hermes | Messaging and notifications | TXF |
| Sadie | Customer-facing voice | TXF |
| Forge | 3D print orchestration | thox-forge |
| Architect | System design | TXF |
| Research | Literature and prior-art mining | TXF |
| Manufacturing | Production planning | TXF |
| Security | Threat modelling and audits | TXF |
| Infrastructure | Cloud and edge ops | TXF |

## Card

Every agent rendered as a `ThoxAgentCard` MUST include: name, role, current task, confidence, memory scope, status, actions.

## Advanced Mode

Advanced Mode is opt-in (`preferences.advanced_mode = true`). When on, the mesh becomes visible inside the Agents section. When off, mesh handoffs are invisible to the user; the synthesis still cites contributors in expanded form.

## Routing

Routing follows `RoutingPolicy { required, optional, advanced_mode }`. Capability matching uses `txf-agent-framework::Capability`. Surfaces MUST NOT bypass the router.
