# Claude Review and Improvement Plan

## What Claude got right

Claude's described package made the correct platform pivot:

```text
- Rust node runtime
- Python SDK as a client layer, not core runtime
- Dashboard for quick demos
- Wi-Fi fabric for Pi Zero 2 W
- Pull-based worker loop
- Capacity/heartbeat-aware scheduling
- Guardrails sized around a 512 MB class device
```

That is directionally aligned with the Thox portfolio's Rust-first rule.

## Gaps that prevented it from being a realistic edge-AI prototype

```text
1. It sounded like a generic compute fabric, not an AI appliance.
2. In-memory state is fragile for real demos.
3. mDNS-only deterministic leader election is risky in weak Wi-Fi conditions.
4. There was no concrete built-in AI inference path.
5. "2 concurrent tasks" is aggressive for Pi Zero 2 W if the work is actual inference.
6. Supabase sync was deferred, but no local persistence replaced it.
7. There was no clear ThoxOS Air capability/security alignment.
```

## Improvements in this package

```text
1. Added Rust-native tiny model inference:
   - ai.intent.v1
   - ai.sensor_anomaly.v1
   - ai.embed_hash.v1

2. Added SQLite leader queue:
   - tasks survive restart
   - nodes are visible to dashboard
   - stale running tasks can be requeued

3. Chose explicit leader for P0:
   - still Wi-Fi native
   - more reliable than mDNS-first during hardware demos
   - leaves mDNS as discovery convenience, not correctness mechanism

4. Added capability routing:
   - nodes advertise AI capabilities
   - leader matches required capability

5. Added ThoxOS Air shaped API:
   - /health
   - /api/status
   - /api/network equivalent through metrics/status
   - /api/thermal through metrics.cpu_temp_c
   - /api/runtime/run via /api/tasks
   - /api/infer for local AI

6. Reduced default worker capacity to 1:
   - realistic for Pi Zero 2 W
   - can be raised on bigger Thox nodes
```

## Decision

Claude's package should be treated as the first Rust fabric draft. This package should replace it as the working prototype track because it performs actual local AI work and persists state.
