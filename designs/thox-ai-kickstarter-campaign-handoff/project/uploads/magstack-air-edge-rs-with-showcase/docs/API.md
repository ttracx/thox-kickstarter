# API

All `/api/*` and `/internal/*` endpoints require:

```text
Authorization: Bearer <MAGSTACK_AIR_TOKEN>
```

If `MAGSTACK_AIR_INTERNAL_SECRET` is configured, internal calls additionally require:

```text
x-magstack-timestamp: <unix ms>
x-magstack-signature: hmac_sha256_hex(timestamp + "." + body)
```

## Public health

```http
GET /health
```

## Status

```http
GET /api/status
```

## Nodes

```http
GET /api/nodes
```

## Tasks

```http
GET /api/tasks
POST /api/tasks
```

`POST /api/tasks` body:

```json
{
  "kind": "ai.intent.v1",
  "payload": {"text":"cluster status"},
  "required_capability": "ai.intent.v1",
  "labels": {},
  "timeout_ms": 120000,
  "max_output_bytes": 1048576
}
```

## Inference convenience endpoint

```http
POST /api/infer
```

Body:

```json
{
  "kind": "ai.intent.v1",
  "text": "cluster status",
  "sync": true,
  "wait_ms": 30000
}
```

## Internal worker protocol

```http
POST /internal/register
POST /internal/beat
POST /internal/result
```

Workers pull tasks from the leader during `beat`. This avoids inbound connectivity requirements to every worker node.
