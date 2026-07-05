# Conflict Resolution Matrix

| Conflict | Resolution |
|---|---|
| Portfolio standard is Rust, but earlier generated prototype was Python/FastAPI. | This package makes Rust the node/controller/CLI runtime. Python remains SDK/demo only. |
| Claude used mDNS deterministic leader. Reliable hardware P0 needs predictable behavior. | Explicit leader URL is default. mDNS can be added as convenience, not correctness. |
| Pi Zero 2 W has constrained memory but edge AI is required. | Use tiny Rust-native models and capability-routed workloads. Avoid large-LLM claims. |
| Dashboard desired, but Next.js adds build/dependency weight. | Use a static dashboard served by the Rust node for the P0 demo. Next.js can be a separate cloud/dev surface later. |
| Supabase sync deferred and no DB in Claude summary. | Use local SQLite on leader; optional Supabase sync can tail completed jobs later. |
| Same API on every node vs secure leader authority. | P0 exposes leader APIs on leader/standalone. Worker proxy can be added after leader/failover is stable. |
