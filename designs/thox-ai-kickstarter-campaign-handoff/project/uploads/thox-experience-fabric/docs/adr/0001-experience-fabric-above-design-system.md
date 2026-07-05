# ADR 0001 - Experience Fabric is the layer ABOVE the design system

Date: 2026-06-06  |  Status: Accepted

## Context

The THOX.ai portfolio has been growing fast: thox-terminal, thox-portable, thox-forge, thox-digitalhumans, thox-litert-lm, thox-litert-lm bindings, thoxllm-* models, MagStack, ThoxNova, ThoxMini, ThoxAir, ThoxClip, ThoxVault, ThoxWatch. Each product has been carrying its own thin slice of "what the brand looks like" plus its own ad-hoc approach to navigation, memory, agents, devices, voice, and notifications.

The old THOX.ai Design System (Remix) was a visual design system: tokens, components, decks, letterheads, hero imagery. It defined HOW THOX looks. It did not define HOW THOX behaves.

## Decision

Promote the design system from "visual library" to "visual implementation layer" of a higher-level construct: the **THOX Experience Fabric (TXF)**.

TXF is the official cross-platform experience layer. It owns:

- Identity (Universal User Model)
- Memory (4 tiers; mapped to thox-digitalhumans 7-tier cognitive memory)
- Projects (Universal project model)
- Device Fabric (Universal device panel)
- Agent Fabric (THOXY single-visible identity, mesh routing)
- Navigation (locked 5-section model)
- Notifications (universal alert shape)
- Voice (wake = THOXY, locked state machine)
- Compliance (HIPAA / GDPR / SOC2 / PCI / ISO27001 pre-flight)

The design system remains the source of truth for color, typography, spacing, motion, radius, elevation, and layout. It is now consumed by TXF rather than directly by products.

## Consequences

- Every THOX product is now a viewport into the same fabric. The screen size changes; the experience never changes.
- New products do not start from scratch; they implement the TXF SDK for their platform.
- Drift between products becomes a CI failure rather than a fix-it-later problem (release-gates validator).
- The design system gets a single owner role (visual implementation) and is no longer asked to also be the navigation spec, the agent contract, or the memory protocol.
