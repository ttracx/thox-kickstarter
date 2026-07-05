# ADR 0002 - THOXY is the single visible identity

Date: 2026-06-06  |  Status: Accepted

## Context

The thox-digitalhumans framework defines a default team of five agents (Ava, Mira, Kai, Sera, Nova) plus a growing background mesh (Hermes, Sadie, Forge, Architect, Research, Manufacturing, Security, Infrastructure). Other THOX projects (thoxllm-factory adapters, ThoxLLM-327M, etc.) keep producing more agents. If every agent surfaces directly to the user, the UX collapses.

## Decision

By default, **only THOXY is visible to the user**. Every other agent is a background worker that THOXY routes work to and synthesizes from.

Implementation: the `txf-agent-framework::Thoxy` presenter aggregates contributions and renders one synthesis. Advanced Mode (`preferences.advanced_mode = true`) is opt-in and reveals the mesh.

## Consequences

- Users keep talking to one agent forever. No "wait, which agent am I in?" problem.
- New agents can be added to the mesh without UI redesign.
- THOXY is the brand surface and the protocol surface, not the implementation surface.
- Surfaces that bypass the presenter fail the agent validator.
