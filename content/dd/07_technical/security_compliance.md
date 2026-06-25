# Security and compliance posture

Last updated: 2026-06-25
Status: DRAFT

---

## Cross-links

- thox-kickstarter-integration security model.
- docs/PRE_LAUNCH_COMPLIANCE.md - launch-side compliance.
- docs/LEGAL.md - state-of-formation discrepancy under reconciliation.
- thox-meta - 90-day responsible disclosure to security@thox.ai.
- thoxos-kernel ops/agent-hub/ identity_policy.toml +
  promotion_policy.toml + release_handoff_policy.toml +
  rollout_simulator_policy.toml (signed agent ops, fail-closed).

## Posture summary

- On-device by default. Data does not leave the device unless the user
  opts in.
- All cryptographic operations on signed agent ops are local-only HMAC
  by default; external release signatures gated by explicit env
  (THOX_RELEASE_SIGNING_KEY).
- Rollout to devices is DISABLED by default at the kernel
  release-handoff layer; only enabled by signed release decision.
- Vulnerability disclosure window: 90 days.
- Brand-asset access governed by the brand-lint workflow (no
  unauthorized color or font drift in shipping artifacts).

## Customer data handling

- Kickstarter platform holds backer data per Kickstarter ToS; THOX does
  not export PII to internal systems beyond what is required for
  fulfillment.
- Address data used for outbound shipping only.
- Email used for backer comms only (cross-link docs/BACKER_COMMS.md).
- No marketing data sale or third-party sharing.

## Regulatory posture

See 08_legal_compliance/privacy_posture.md for GDPR, CCPA, and state
law posture (attorney-led refinement required).

## Disclaimer

Posture statement, not a SOC 2 / ISO 27001 / HIPAA certification. THOX
has not yet pursued any compliance certification. Investors with
specific certification requirements should call them out before any
data-handling commitments are made.
