# mvp_catalog.md - MagStack Air Edge RS

Priority formula:

```text
Priority = (Market Value × 0.4) + (Technical Feasibility × 0.3) + (Time-to-Market × 0.2) + (Strategic Importance × 0.1)
```

Scores are 1-10.

| MVP | Market Value | Technical Feasibility | Time-to-Market | Strategic Importance | Priority | Status |
|---|---:|---:|---:|---:|---:|---|
| Rust leader/worker heartbeat fabric | 8 | 8 | 8 | 9 | 8.2 | Implemented |
| Real tiny edge-AI inference jobs | 9 | 9 | 9 | 10 | 9.1 | Implemented |
| SQLite durable queue | 7 | 9 | 8 | 8 | 7.9 | Implemented |
| Capability-routed scheduling | 8 | 8 | 8 | 9 | 8.2 | Implemented |
| Static local dashboard | 7 | 9 | 9 | 6 | 8.0 | Implemented |
| Python SDK for demos | 7 | 9 | 9 | 6 | 8.0 | Implemented |
| mDNS discovery | 6 | 5 | 5 | 6 | 5.5 | Deferred; explicit leader first |
| Leader failure election | 8 | 5 | 4 | 8 | 6.0 | Next |
| NPU-capable plugin runner | 9 | 5 | 4 | 9 | 6.4 | Next |
| ThoxOS Air image integration | 8 | 4 | 3 | 10 | 5.9 | Planned |

## Vertical slices

### Slice A: Rust cluster heartbeat

```text
AI: none
Backend: magair-node leader/worker register + beat
Frontend: health/status CLI
Acceptance: worker appears in /api/nodes within 10 seconds
```

### Slice B: Edge AI inference

```text
AI: ai.intent.v1 + ai.sensor_anomaly.v1 + ai.embed_hash.v1
Backend: task queue + worker executor
Frontend: CLI infer + dashboard submit panel
Acceptance: /api/infer returns structured model result locally
```

### Slice C: ThoxWatch/PWA gateway compatibility

```text
AI: compact prompts and compact results
Backend: /api/infer compatibility envelope
Frontend: PWA or watch bridge uses local endpoint
Acceptance: result includes preview string and JSON payload under 1 MiB
```

### Slice D: Production hardening

```text
AI: capability-gated plugin bridge
Backend: cgroups/seccomp/systemd sandboxing
Frontend: audit log viewer
Acceptance: no plugin runs without explicit capability and allowlist
```
