# Architectural diagrams index

Last updated: 2026-06-25
Status: DRAFT

---

## In-repo diagrams

- content/launch/STORYBOARD.md - launch video storyboard.
- docs/ecosystem_map.md - portfolio-wide ecosystem map.

## Cross-portfolio diagrams

- ttracx/thoxcore - PROFILES.md and ROADMAP_PHASE_F diagrams.
- ttracx/thox-litert-lm - 14-crate workspace diagram in README.
- ttracx/thox-digitalhumans - HumanFabric demo architecture in README.
- ttracx/thox-experience-fabric - contract -> codegen pipeline diagram.
- ttracx/thox-terminal - ecosystem_map.md and dependency_graph.md.
- ttracx/thox-quickstart - assembly walkthroughs per SKU.

## What investors typically want

- One-page system diagram showing where the device sits, where the
  optional cloud-services boundary is, and where customer data lives.
- One-page data-flow diagram showing what data crosses the device
  boundary.
- One-page deployment topology showing single-device, mesh-of-devices
  (MagStack), and device-plus-companion (ThoxNova plus ThoxMini cluster).

These three are not yet drawn in this repo. Recommendation: produce
them post-launch using thox-experience-fabric or the figma skill, and
attach to the DD packet as PNG or SVG.

## Disclaimer

Diagrams are illustrative. Authoritative architecture lives in the
respective repo READMEs and ADRs.
