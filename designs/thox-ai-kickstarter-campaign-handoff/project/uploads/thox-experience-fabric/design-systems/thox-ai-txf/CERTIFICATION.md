# Certification

Every TXF release receives a **THOX Experience Score** from 0 to 100.

## Gates

| Score | Outcome |
|-------|---------|
| 90 - 100 | Ship |
| 80 - 89 | Review required |
| < 80 | Blocked |

## Validators

| Validator | Weight | Checks |
|-----------|--------|--------|
| Branding | 20% | designSystem == THOX, txfVersion valid |
| Navigation | 20% | navigationStandard true; 5-section model present |
| Accessibility | 20% | accessibilityCertified true |
| Agents | 15% | agentFabricEnabled true; THOXY single-visible enforced |
| Devices | 15% | deviceFabricEnabled true |
| Memory | 10% | memoryEnabled true |

## CLI

```bash
cargo run -p release-gates --bin thox-cert -- --bundle ./my-app
```

Output is JSON with per-dimension scores, the overall Experience Score, and the gate (Ship / Review / Blocked).

Exit codes:

| Code | Gate |
|------|------|
| 0 | Ship |
| 10 | Review |
| 20 | Blocked |
| 2 | Invalid usage |
| 1 | Validator crashed |

## CI integration

Wire `thox-cert` into the release pipeline of every TXF-certified app. Block deploys on exit code != 0. Surface the JSON in the PR.
