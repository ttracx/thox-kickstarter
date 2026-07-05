# Memory

The TXF memory model is four tiers exposed to the user. Internally it maps onto the seven-tier cognitive model defined in `thox-digitalhumans`.

## TXF tiers

| Tier | Span | Persistence | Encryption |
|------|------|-------------|------------|
| HOT | Current conversation | Volatile | Device-only |
| WARM | Current project | Project lifetime | Mesh-distributed |
| COLD | Historical knowledge | Indefinite, redactable | Mesh-distributed |
| VAULT | Archived / sealed | Append-only | Sealed, audit-trailed |

## Cognitive mapping

| TXF tier | thox-digitalhumans cognitive tier |
|----------|----------------------------------|
| HOT | Sensory + Working |
| WARM | Episodic |
| COLD | Semantic |
| VAULT | Identity + Procedural + Mesh (sealed) |

## Universal API

`MemoryEntry { id, tier, kind, source, project_id, timestamp, importance, tags, content }`. Surfaces consume this verbatim. Recall hits include a score so the UI can rank.

## Promotion and sealing

Promotion follows the importance-and-recency policy from thox-digitalhumans. Sealing is one-way and MUST require user confirmation (destructive action).

## Vault visibility

Vault contents are the only memory that MUST always be visible to the user (audit trail). HOT memory MAY remain implicit; WARM and COLD MUST be inspectable through the Vault section's "Browse memory" affordance.
