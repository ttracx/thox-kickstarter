# THOX Agent Behavior Specification

Version: 2.0  |  Status: Normative  |  Owner: TXF

## 1. Routing

THOXY routes user intent into the mesh using `RoutingPolicy { required, optional, advanced_mode }`. Surfaces MUST NOT bypass the policy router.

## 2. Visibility

`visible_by_default` is FALSE for every agent except THOXY. Surfaces MUST honor this flag. Advanced Mode (`preferences.advanced_mode = true`) makes all agents visible.

## 3. Capability Contracts

Agents MUST declare capabilities up front. Routing failures from a missing capability MUST produce a structured error (`AgentError::NoCapability`) the surface can render gracefully.

## 4. Memory Discipline

Agents MUST write into the correct memory tier:

- HOT: chat-scoped scratchpad. Expires when the conversation ends.
- WARM: project-scoped. Persists for the life of the project.
- COLD: cross-project. Persists indefinitely; subject to redaction policy.
- VAULT: sealed. Append-only, encrypted, audit-trail required.

## 5. Synthesis

THOXY MUST deliver one synthesis to the user per request, regardless of how many background agents contributed. The synthesis MUST cite contributors when Advanced Mode is on.

## 6. Confidence

Outcomes MUST include a confidence score in [0, 1]. Surfaces SHOULD downgrade the presentation (e.g., add "I'm not sure") for confidence < 0.5.

## 7. Tool Use

Agents MUST authenticate to tools via TXF identity, not their own credentials. Tools that hit external networks MUST log to the audit trail visible in the Vault.

## 8. Logging

Every agent run MUST emit a structured trace event (intent, capabilities used, contributors, confidence, latency). Traces feed the release-gate's release-quality score.
