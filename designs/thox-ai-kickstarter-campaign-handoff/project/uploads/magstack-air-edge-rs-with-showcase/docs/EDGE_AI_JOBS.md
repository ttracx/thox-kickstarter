# Edge AI Jobs

## `ai.intent.v1`

Input:

```json
{"text":"check cluster temperature and summarize battery health"}
```

Output:

```json
{
  "kind": "ai.intent.v1",
  "model": "thox_air_intent_tiny",
  "version": "1.0.0",
  "label": "ops",
  "confidence": 0.72,
  "scores": {"ops": 0.72, "health": 0.18},
  "preview": "intent=ops confidence=0.720"
}
```

Purpose: classify compact prompts locally and route them to operations, health, code, research, or general handlers.

## `ai.sensor_anomaly.v1`

Input:

```json
{"features":[54.2, 0.71, 0.12]}
```

Feature order:

```text
cpu_temp_c, load_1m, battery_drop_rate
```

Output:

```json
{
  "kind": "ai.sensor_anomaly.v1",
  "score": 1.84,
  "threshold": 2.25,
  "anomaly": false,
  "preview": "anomaly=false score=1.840"
}
```

Purpose: run simple, explainable local anomaly detection on thermal, power, or sensor telemetry.

## `ai.embed_hash.v1`

Input:

```json
{"text":"local model routing", "dims":64}
```

Purpose: produce a deterministic normalized vector for routing, dedupe, cache keys, and approximate matching without cloud embedding calls.

## `plugin.process.v1`

Reserved for optional external runners.

Recommended future use:

```text
- tflite_runtime wrapper on Air+NPU
- onnxruntime wrapper on ThoxMini/Nova
- llama.cpp wrapper only on bigger nodes
```

Default: disabled unless a node explicitly advertises `plugin.process.v1` and has an allowlist configured.
