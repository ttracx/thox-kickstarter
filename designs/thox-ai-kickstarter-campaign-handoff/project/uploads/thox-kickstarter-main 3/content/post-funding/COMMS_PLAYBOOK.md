# Backer comms playbook

A decision tree for the operator. When something happens, this doc says which template fires and what the cadence rules are. Templates referenced are in `templates/`.

This doc is the runbook companion to `BACKER_COMMS_PACK.md`. The pack defines voice and templates; this doc defines when to send.

## Routine cadence

Time-driven, no decision required. These fire automatically per the schedule below.

| When | Template | Who triggers |
|---|---|---|
| Day +1 | 01 Day-1 Thank-You | Ops, automated send |
| Day +14, +30, +45, +59 to non-responders | 02 Address Survey Reminder | Ops, automated send |
| Day +30 then every 30 days | 03 Monthly Manufacturing Update | Ops drafts, Tommy approves |
| Per shipment ship event | 05 Shipping Notification | Fulfillment service, automated |
| Per shipment delivery + 24h | 06 Delivery Followup | Fulfillment service, automated |
| Day +7 from delivery (opt) | 06 variant (post-delivery survey) | Ops, automated, respects unsubscribe |
| Per backer final reward shipped | 11 Fulfillment Complete | Fulfillment service, automated |
| Day +365 | 12 One-Year Anniversary | Ops drafts year-specific body, Tommy + Craig approve |

## Event-driven decision tree

For everything that is not routine.

### Stretch goal events

- **Threshold crossed during campaign or within 30 days of close**:
  - Verify the crossing is real (subtract refunds and pending chargebacks).
  - Send Template 04 within 24 hours.
  - Concept-unveil unlocks require Tommy + Craig joint sign-off.
- **Concept-unveil threshold NOT crossed by Day +60**:
  - Wait until funding numbers settle (refunds-vs-chargebacks net).
  - Send Template 10 in the Day +30 to Day +60 window after close.
  - Once per concept. No follow-up.
- **Ship-upgrade or free-add-on stretch NOT crossed**:
  - Mention in next Template 03 monthly update only.
  - Do NOT send Template 10. Backers were not promised these.

### Manufacturing slips

- **Slip <= 30 days**:
  - Do not fire Template 07.
  - Mention in next Template 03 monthly update under the per-reward status table.
- **Slip 31 to 90 days**:
  - Fire Template 07 within 7 days of internal confirmation.
  - Tommy + Craig sign-off required.
  - Reference in next Template 03 status table with "Template 07 sent <date>" annotation.
- **Slip > 90 days**:
  - Fire Template 07 within 7 days, with refund-eligible flag set true.
  - Tommy + Craig sign-off + 24-hour cooling-off period before send.
  - Reference in next Template 03 with full transparency.
- **Slip > 180 days**:
  - Escalate to `CRISIS_COMMS.md`.

### Quality issues

- **Single unit, in response to backer reply**:
  - Template 08 Variant A.
  - Ops can send with Tommy + Craig CC'd.
- **<5% of a batch confirmed defective**:
  - Template 08 Variant B.
  - Tommy + Craig sign-off, 24-hour drafting period.
  - Mention in next Template 03 under per-reward status.
- **5% to 30% of a batch confirmed defective**:
  - Template 08 Variant C.
  - Tommy + Craig sign-off, 48-hour drafting period.
  - Public Kickstarter update within 24 hours of email.
- **>30% of a batch OR any safety issue**:
  - Escalate to `CRISIS_COMMS.md` immediately. Do not send any email until that framework is engaged.

### Refunds

- **Backer-initiated, < $500**:
  - Ops processes refund per standing policy.
  - Template 09 fires within 24 hours of refund completion.
- **Backer-initiated, >= $500**:
  - Tommy + Craig sign off on the refund itself.
  - Template 09 fires within 24 hours of refund completion.
- **Refund driven by Template 07 (delay > 90 days)**:
  - Same flow as backer-initiated; the backer replies with "refund."
- **Refund driven by Template 08 (quality issue, > 60 day remediation)**:
  - Same flow; the backer opts for refund over remediation.

### Shipping events

- **Per shipment**:
  - Template 05 within 4 hours of carrier handoff.
  - Template 06 24 hours after delivery confirmation.
  - Template 11 fires once per backer when their final shipment hands off.
- **Bad tracking number (carrier lookup fails)**:
  - Pause sends for affected batch.
  - Escalate to ops lead.
  - Send Template 07 with reason "shipping label issue" within 24 hours.
- **Address validation failed at pack step**:
  - Do NOT fire Template 05.
  - Ops sends reply-to-this-email exchange to confirm address.
  - Hold unit at pack step until resolved.
- **Carrier loses package in transit**:
  - Ops works with carrier on lost-package claim.
  - Replacement ships within 5 business days if carrier confirms loss.
  - Send Template 05 with note "this is a replacement for a lost in-transit package."
- **Backer reports unit arrived broken**:
  - Template 06 reply triage routes to Template 08 Variant A.

### Address change requests

- **Before address-lock date (Day +60)**:
  - Backer self-serves via survey link.
  - No template required.
- **After address-lock, before pack step**:
  - Backer replies to any received email.
  - Ops updates manually in fulfillment service.
  - Confirmation reply from ops; no template required.
- **After pack step but before ship**:
  - Ops removes from current batch, re-packs for next batch.
  - May push shipment by one batch cycle.
  - Confirmation reply from ops.
- **After ship**:
  - Carrier reroute if supported (USPS, FedEx, UPS support; DHL Express case-by-case).
  - Reroute fees passed to backer.
  - Confirmation reply from ops.

### Death of a backer

- **Notified by family**:
  - Pause all comms to the backer email.
  - Reply offers either full refund or transfer of reward to next of kin.
  - No template; this is handled by Tommy or Craig personally.

## Cadence rules

These are hard limits on send frequency. The goal is to never feel like spam.

- **Minimum 14 days between any two non-transactional emails to the same backer**, except in true urgency. Routine Template 03 plus a Template 04 in the same week is OK if the stretch unlock is genuinely time-sensitive; routine Template 03 plus a non-urgent Template 04 in the same week is not.
- **After Template 07 (delay)**: no non-transactional email to that backer for 14 days. They need space.
- **After Template 08 (quality issue)**: no non-transactional email to that backer for 7 days, except the immediate replacement Template 05.
- **After Template 09 (refund)**: no further email to that backer except transactional follow-ups on the refund itself.
- **Maximum 4 reminders** for Template 02 (address survey). Stop after Day +59.
- **Maximum 1 send** for Template 10 (concept not shipping). No follow-up.

## Escalation criteria summary

Use this table when in doubt about whether to escalate beyond ops to Tommy + Craig.

| Situation | Escalation |
|---|---|
| Single backer complaint, routine | Ops handles |
| Pattern of 3+ backer complaints same issue | Ops lead reviews, may escalate |
| Pattern of >5% backers same issue | Tommy + Craig, Template 08 evaluation |
| Slip > 30 days | Tommy + Craig sign-off Template 07 |
| Slip > 90 days | Tommy + Craig + cooling-off period |
| Slip > 180 days | `CRISIS_COMMS.md` |
| Quality issue affecting >30% units | `CRISIS_COMMS.md` |
| Any safety issue | `CRISIS_COMMS.md` |
| Refund >= $500 | Tommy + Craig sign-off on refund |
| Refund volume spike (>2x baseline in 7 days) | Tommy + Craig review |
| Press inquiry about delay or quality | Tommy + Craig before any reply |
| Regulator inquiry | Tommy + Craig + attorney |
| Investor inquiry impacting backer trust | `CRISIS_COMMS.md` |
| Supply-chain event affecting >1 SKU | `CRISIS_COMMS.md` |
| Backer threatens chargeback | Ops escalates to lead, then Tommy + Craig if not resolved in 48h |
| Backer threatens legal | Tommy + Craig + attorney before any reply |
| Backer requests media interview | Tommy + Craig review before any reply |

## Anti-patterns

Things that look helpful and are not. Do not do these.

- **Drip-feeding bad news across multiple updates**: if the news is bad, say it once in full. A backer who feels they are getting the bad news in small pieces will lose trust faster than one who gets it all at once.
- **Apologizing in subject lines**: "We're sorry to share..." or "Important update..." are read as bad-news signals. State the actual headline. Backers prefer "Delay: X moves to Y" over "Important update on X."
- **Burying refund options**: if Template 07 unlocks refund rights, the refund option goes in the body in clear language, not in a footer. Hiding it invites chargebacks.
- **Marketing in transactional emails**: shipping notifications, delivery confirmations, and refund acknowledgments are not opportunities to cross-sell. They are operational records.
- **Vague timelines**: "soon," "in the coming weeks," "as soon as possible" are non-answers. Always give an absolute date or an honest "we cannot give you a date yet, here is when we will know."
- **Speculating in writing**: if we are not sure, say "we are not sure." Do not fill the uncertainty with optimistic guesses that will become commitments backers hold us to.
- **Letting silence speak**: backers will assume the worst in the absence of information. Send the monthly update even when there is nothing dramatic to say.
