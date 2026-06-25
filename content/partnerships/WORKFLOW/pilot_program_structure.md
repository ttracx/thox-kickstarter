# Pilot program structure

Internal-only operational doc. Defines the shape of a THOX-with-partner pilot program. Several of the 8 partnership briefs propose a pilot as one of the asks; this doc is the canonical reference for what a pilot looks like.

## Why pilots matter

A pilot is the lowest-risk way to convert a partnership conversation into a formal relationship. The pilot proves both sides can actually work together at the technical and operational level before either side commits to a larger arrangement. Most partnerships die in the discovery-call tier because the conversation never finds a concrete first step. A pilot is the concrete first step.

## Standard pilot shape

| Element | Default value | Variability |
|---|---|---|
| SKU mix | Mixed (1 of each ThoxClip + ThoxMini + ThoxNova, plus 1 MagStack Cluster Dock) | Adjustable based on partner interest; can be single-SKU |
| Unit count | 10-25 units | 5-50 acceptable; >50 escalates to a formal commercial agreement |
| Duration | 90 days | 60-120 days acceptable; <60 is too short to learn anything |
| Cost to partner | Zero (THOX-funded) | Can flip to partner-funded if partner insists; not preferred |
| Cost to THOX | Hardware BOM + shipping (~$2K-$5K all-in) | Sized to fit within the post-funding marketing budget |
| Success metrics | Tokens-per-second, user satisfaction, support tickets | Adjustable per partner interest |
| Reporting cadence | Weekly status email; mid-pilot 45-day review; end-pilot 90-day review | Lightweight; no formal SLAs |
| Upgrade path | Pilot result feeds into a formal partnership agreement scope conversation | Required outcome regardless of pilot success |

## Per-brief pilot proposals

| Brief | Proposed pilot shape | Why |
|---|---|---|
| 01 Anthropic | 10-25 THOX devices preloaded with Claude adapter, shipped to designated Anthropic team for internal use | Anthropic needs an on-device deployment surface; THOX is the cleanest one available |
| 02 OpenAI | 25-50 THOX devices preloaded with OpenAI adapter, shipped to OpenAI developer relations and community advocates | Higher unit count because OpenAI's audience is broader; lower per-unit engagement expectation |
| 03 Cohere | 25 THOX devices (mixed ThoxNova + ThoxMini Air) preloaded with Cohere adapter, shipped to Cohere developer-relations and 5-10 enterprise design partners | Cohere has a real enterprise pilot motion; THOX hardware fits that motion cleanly |
| 04 Google Gemma | 25 ThoxNova units with latest Gemma fine-tune, shipped to Gemma community advocates and Google developer-relations | Gemma is already on-device; pilot validates the deployment surface story |
| 05 Hugging Face | 10-15 THOX devices shipped to Hugging Face developer-experience team for Hub-integration testing | Smaller pilot; testbed-shaped, not deployment-shaped |
| 06 NVIDIA Jetson | Post-launch only; pilot only after a Jetson-bearing SKU exists in the THOX roadmap | Premature otherwise |
| 07 Qualcomm Snapdragon | Post-launch only; pilot only after a Snapdragon-bearing SKU exists in the THOX roadmap | Premature otherwise |
| 08 Apple Developer | Post-launch only; pilot is shaped around thox-terminal app store data, not hardware shipment | Apple does not engage with hardware partnerships in the THOX shape |

## Pilot agreement template

A pilot is a real legal commitment. The pilot agreement is a short letter (target 3-5 pages) covering:

1. **Parties**. THOX and the partner.
2. **Scope**. Number of units, SKU mix, duration, locations.
3. **Title and risk of loss**. Units remain THOX property; partner has loaner status. Partner is responsible for return shipping at end of pilot OR can keep the units if both parties agree.
4. **Intellectual property**. No IP transfers. THOX retains all hardware and software IP. Partner retains all model and API IP. Pilot results (telemetry, performance data) are jointly owned with usage rights to both sides.
5. **Data handling**. THOX privacy posture controls: no telemetry from on-device sessions leaves the device without explicit partner-side configuration; partner is responsible for any data they collect from their own use of the units.
6. **Confidentiality**. Bound by the underlying mutual NDA.
7. **Success metrics**. Tokens-per-second, user satisfaction (qualitative), support ticket count and resolution time. Both sides agree on metrics at pilot kickoff.
8. **Reporting cadence**. Weekly status from THOX to partner; mid-pilot 45-day review (joint call); end-pilot 90-day review (joint call with written summary).
9. **Failure modes**. Either party can terminate the pilot with 14 days written notice. Termination does not create any further obligation beyond unit return.
10. **Upgrade path**. Pilot end triggers a 30-day partnership-shape conversation. Successful pilot result is required for formal partnership agreement but not sufficient (formal agreement requires Tommy + Craig + attorney sign-off and partner-side equivalent sign-off).
11. **No press releases without joint sign-off**. Standard pre-approval clause.
12. **Choice of law**. Governing law per the partner's preference within Delaware, Nevada, or California. Mandatory mediation before litigation.

## Pre-pilot checklist

Before THOX commits to a pilot, the following must all be true:

1. Underlying NDA executed (per `WORKFLOW/legal_handling.md`).
2. Pilot agreement drafted and signed.
3. Partner-side single point of contact identified (named individual, not a shared inbox).
4. THOX-side single point of contact identified (Tommy or Craig OR a designated operator with their sign-off).
5. Success metrics agreed in writing.
6. Hardware allocated from inventory or production schedule (pilot units do NOT come out of backer fulfillment allocation; pilots use a separate marketing-budget allocation).
7. Shipping addresses verified.
8. Pilot kickoff call scheduled.

## During-pilot operations

| Cadence | Action |
|---|---|
| Day -7 | Pre-shipment configuration verification with partner |
| Day 0 | Units shipped |
| Day +5 | Tracking + receipt confirmation; setup support if needed |
| Day +14 | First weekly status email |
| Day +21 | Weekly status email |
| Day +28 | Weekly status email |
| Day +35 | Weekly status email |
| Day +42 | Weekly status email; mid-pilot review prep |
| Day +45 | Mid-pilot review call (joint) |
| Day +52 | Weekly status email |
| Day +59 | Weekly status email |
| Day +66 | Weekly status email |
| Day +73 | Weekly status email |
| Day +80 | Weekly status email; end-pilot review prep |
| Day +87 | End-pilot review prep call (joint, internal-only on each side first) |
| Day +90 | End-pilot review call (joint) + written summary |
| Day +120 | Partnership-shape conversation deadline; either formal agreement signed or pilot officially closed |

## Success criteria definitions

- **Tokens-per-second**: measured as the on-device tier inference rate for the partner's model running through THOXCore's adapter. Reported median + p95 across the pilot population.
- **User satisfaction**: qualitative survey from partner-side users at mid-pilot and end-pilot. Open-ended questions about what worked, what did not, what would be needed for production deployment.
- **Support tickets**: count of partner-initiated support requests during the pilot. Tracked with category (hardware / firmware / runtime / adapter / docs). Time-to-resolution tracked per ticket.
- **Deployment friction**: time from unit unbox to first successful inference, measured by partner self-report. Target <30 minutes.
- **Stability**: number of unplanned reboots or crash events per unit per week. Target <1.

## Pilot-to-partnership upgrade path

A successful pilot does NOT automatically convert to a formal partnership. The conversion requires:

1. End-pilot review delivered a positive verdict from both sides.
2. Partner-side single point of contact has executive sponsorship for a formal partnership conversation.
3. THOX has bandwidth to support the formal partnership ask post-launch.
4. Tommy + Craig agree the partnership scope is consistent with the THOX product roadmap.
5. Attorney review of the proposed partnership agreement is complete.
6. Both sides sign within 30 days of end-pilot.

If any of these is not true, the pilot closes cleanly and the partnership conversation goes back to the discovery-call tier. The pilot units can stay deployed with the partner under a continued-loan arrangement.

## Hard rules

1. NEVER ship pilot units without an executed pilot agreement.
2. NEVER ship pilot units out of backer fulfillment allocation. Pilot is a separate budget line.
3. NEVER pilot more than 50 units to a single partner pre-launch. Volume beyond that requires formal commercial agreement.
4. NEVER pilot in a regulated industry (healthcare, defense, government) without specific industry-vertical attorney review.
5. NEVER commit to data sharing as part of a pilot. The pilot agreement explicitly preserves the THOX privacy posture.
6. NEVER let a pilot run past Day +120 without either closing it or converting it to a formal partnership.
7. NEVER let pilot units that have been deployed for >90 days become forgotten inventory; either return-ship them, convert to a sale, or document as a loan with quarterly check-in cadence.
8. NEVER use pilot framing to disguise what is actually a free hardware giveaway. A pilot has structure, metrics, and outcomes. A giveaway does not.

## Cross-references

- Outreach cadence: `WORKFLOW/outreach_cadence.md`
- Legal handling: `WORKFLOW/legal_handling.md`
- Per-brief proposals: see the "Specific asks we could make" section in each `BRIEFS/0N_*.md`
- Pre-launch compliance: `docs/PRE_LAUNCH_COMPLIANCE.md`
- Stretch goals: `content/launch/STRETCH_GOALS.md`

## Disclaimers

- This doc is operational guidance, not legal advice.
- The pilot agreement template described above must be drafted and reviewed by the THOX attorney before first use.
- Tommy + Craig are the only individuals authorized to commit THOX to a pilot.
