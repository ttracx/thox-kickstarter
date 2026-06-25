# Architecture overview

Last updated: 2026-06-25
Status: DRAFT

---

## Cross-links

- thoxcore PROFILES and INTEGRATION_PHASE and ROADMAP_PHASE_F (canonical).
- THOX memory hierarchy spec (project_thox_memory_hierarchy in MEMORY.md):
  five tiers T0..T4 (19/19/2 TB/s, 102.4 GB/s LPDDR5 UMA, 7 GB/s NVMe).
- thox-litert-lm 14-crate cargo workspace.
- thox-digitalhumans 8 crates plus HumanFabric demo.
- thox-experience-fabric v0.3.0 cross-platform UX layer with native
  component codegen for SwiftUI / Compose / Rust.
- ThoxOS Kernel v1.1.25 (MVP-7..32 plan toward v1.2.0).

## Layered view

```
+-----------------------------------------------------------------------+
| Experience layer:   thox-experience-fabric (contracts -> SwiftUI /    |
|                     Compose / Rust)                                   |
+-----------------------------------------------------------------------+
| Agent layer:        thox-digitalhumans (persona, handoff, 7-tier      |
|                     cognitive memory) + thox-agent-memory (writable    |
|                     cloud memory)                                      |
+-----------------------------------------------------------------------+
| Runtime layer:      thox-litert-lm (pure-Rust LiteRT-LM) + thoxcore    |
|                     (7-adapter LiteRT/OpenAI/Ollama/llamacpp/vLLM/     |
|                     TensorRT/MLX)                                      |
+-----------------------------------------------------------------------+
| Kernel layer:       thoxos-kernel (Rust no_std)                       |
+-----------------------------------------------------------------------+
| Hardware layer:     Luckfox Pico Mini B (Clip / Mini / Air),          |
|                     LattePanda N100 (Nova)                            |
+-----------------------------------------------------------------------+
```

## Memory hierarchy

Five tiers per the canonical T0..T4 spec:

- T0 hot register file - on-chip.
- T1 cache - on-chip.
- T2 model weights - on-chip / LPDDR5 UMA at 102.4 GB/s.
- T3 working set - LPDDR5 / DDR2 depending on device class.
- T4 cold persistent - NVMe at 7 GB/s.

Drives mesh cognition + training/inference memory placement.

## Mesh

- MagStack ring on ThoxMini Air enables physical clustering up to 8
  Pico Mini B nodes via pogo pins.
- thox-digitalhumans handoff engine arbitrates conversation routing
  across multiple devices.

## Disclaimer

Architecture is the current intent. Real-device verification ongoing
for Phase F gate.
