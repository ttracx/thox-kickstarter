# Risks

The Story-page risks section copy and the internal risk register. Story copy mirrors the honest
boundaries in [`docs/KICKSTARTER_PAGE_COPY.md`](KICKSTARTER_PAGE_COPY.md).

## Story-page risks copy (paste into Kickstarter)

> Hardware has real risks, and we would rather be direct about them than optimistic. The THOX.ai
> local-first agent runtime is already in private alpha; what this campaign funds is the first
> coordinated production run of four devices — ThoxKey, ThoxMini Air, ThoxMini, and ThoxClip — and the
> firmware, QA, and compliance work behind them. This is not machine-learning R&D; it is hardware
> manufacturing.
>
> The risks we care about most:
>
> **Supply chain.** We keep the first product set focused and validate each device independently, with
> alternate suppliers identified for critical parts. If a primary component becomes unavailable, we
> switch the BOM, ship slightly later, and absorb the cost. No backer loses their reward.
>
> **Manufacturing and certification.** We use conservative delivery windows and reserve budget for two
> certification cycles (FCC / CE / UKCA). If a partner cannot meet capacity, we have a secondary
> partner as a fallback.
>
> **Overclaim.** This is the risk we own personally. We will never tell you a pocket-sized device runs a
> chat-class LLM, and we will never tell you a wearable clip replaces a workstation. The smaller devices
> carry identity, route, and capture; heavier work routes to capable local hardware the user owns. That
> is the whole point of the family, and we will publicly correct any marketing copy that drifts from it.
>
> If a delivery date slips, backers receive a direct update explaining what changed, why, what we are
> doing next, and when the next update will arrive.

## Internal risk register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Stripe / payment verification slips past T-3 | medium | catastrophic | Submit documents at T-21; have ID + EIN ready; daily check-in with payment support | T |
| R2 | Critical component EOL or allocation during campaign/build | medium | high | Alternate suppliers pre-qualified per device; BOM swap with a short slip; absorb per-unit delta | C |
| R3 | Enclosure fit / tooling issue found at EVT→DVT | medium | medium | Independent per-device validation; tooling buffer in the schedule; absorb rework cost | C |
| R4 | Firmware / security hardening slips | medium | high | Runtime already in alpha; freeze scope per device; conservative Q3/Q4 2026–Q1 2027 windows | T |
| R5 | Pledge rate falls below break-even at T+15 | medium | medium | Press push (3 outlets primed), influencer outreach, partner cross-promo | T |
| R6 | Major outlet publishes a negative review | low | medium | Standing 1-hour response policy; FAQ link; reply with specifics, not platitudes | T |
| R7 | Two-factor recovery codes lost | low | catastrophic | Codes saved in shared vault across both founders; backup printed in safe | B |
| R8 | Manufacturing partner cannot hit capacity in the ship window | medium | high | Secondary partner contract signed at DVT freeze; fallback window built into estimates | C |
| R9 | Tariff change between launch and ship date | medium | medium | Reserve contingency budget; absorb a moderate tariff swing without re-pricing | T |
| R10 | FCC / CE / UKCA certification fails first time | medium | medium | Pre-certification scan at PVT; budget covers two cert cycles | C |
