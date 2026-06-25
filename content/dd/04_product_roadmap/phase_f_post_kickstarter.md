# Phase F - post-Kickstarter platform plan

Last updated: 2026-06-25
Status: DRAFT

---

## Canonical source

- thoxcore Phase F roadmap: ttracx/thoxcore ROADMAP_PHASE_F (see also
  Phase D wave 2 status: 4 open PRs across thoxllm-factory, thox-forge,
  thox-terminal, thoxcore as of 2026-06-24).

## Phase F themes

1. Production-grade SLOs across the THOX agent fleet.
2. Observability dashboards (Grafana wired through thoxcore PR #2).
3. End-to-end real-device verification for the 7-adapter LiteRT runtime
   (LiteRT, OpenAI, Ollama, llama.cpp, vLLM, TensorRT, MLX).
4. ThoxLLM-327M v2 generally available with GGUF + Ollama compatibility.
5. ThoxOS Kernel v1.2.0 release per the MVP-7..32 plan.

## Integration phase recap (Phase E)

- thoxcore-router v0.3.0-router shipped, 31 tests.
- thoxcore-ffi v0.3.0-ffi shipped (staticlib + cbindgen).
- thox-terminal v0.2.0-thoxcore-sdk shipped (Swift actor + SwiftUI).
- thoxcore PR #1 release/v0.2.0-staging.
- thoxllm-factory PR #1 eval/northminicode.

## Phase F gating

- Final ship of v0.2.0 on real-device verification (Mini, Air, Nova).
- Phase F kickoff after v0.2.0 ships.
- Investor-visible artifact: live dashboards, real-device demo, SLO board.

## Disclaimer

Phase F scope is a moving target and will be re-baselined post-launch
based on Kickstarter outcomes and supply commitments.
