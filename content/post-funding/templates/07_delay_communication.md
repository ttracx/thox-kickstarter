# Template 07: Delay Communication (proactive)

**Subject**: Delay: {{ reward.name }} ship window moves to {{ delay.new_eta }}
**Alt subject (A/B)**: We slipped. Here is what happened and what changes.
**Preview text**: New ship window, the reason, and what you can do.

**Trigger**: a reward's ship window is delayed by more than 30 days from the previously communicated window. Fires before the slip is mentioned anywhere else (next monthly update, social, press).

**Send window**: within 7 days of the delay being confirmed internally. Do not sit on a confirmed slip.

**Transactional**: Yes. Ignore unsubscribe flag. A backer who unsubscribed from marketing still gets to know their reward is delayed.

**Approval gate**: Tommy AND Craig per-send sign-off. Required.

**Parametric**: per-reward. If multiple rewards slip in the same week, consolidate into a single email with multiple sections; if they slip in separate weeks, separate emails.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.name }}`
- `{{ delay.reason }}` -> short, honest reason string (see "Reason discipline" below)
- `{{ delay.previous_eta }}` -> absolute date string of prior ETA, typically a quarter like "Q2 2027"
- `{{ delay.new_eta }}` -> absolute date string of new ETA, same format as previous
- `{{ delay.what_changed }}` -> bullet list of internal changes that produced the slip
- `{{ delay.what_we_are_doing }}` -> bullet list of corrective actions
- `{{ delay.confidence }}` -> "high", "medium", "we will tell you if this slips again"
- `{{ delay.refund_eligible }}` -> boolean (always true for delays > 90 days; false otherwise per Kickstarter ToS)

---

**Body**:

> Hi {{ backer.first_name }},
>
> Direct version up front. Your {{ reward.name }} is delayed. The ship window moves from {{ delay.previous_eta }} to {{ delay.new_eta }}.
>
> Then the reason, what changed, what we are doing about it, and your options.
>
> **Reason**
>
> {{ delay.reason }}
>
> **What changed internally**
>
> {{ delay.what_changed }}
>
> **What we are doing about it**
>
> {{ delay.what_we_are_doing }}
>
> **Confidence in the new window**
>
> {{ delay.confidence }}
>
> If the new window slips again, you will hear it from this same email channel, the same way, before any other public mention. We do not surprise backers with slips and we do not bury them in monthly updates.
>
> **Your options**
>
> 1. Wait for the new window. No action required. Your reward configuration and shipping address stay locked in.
> 2. {{ delay.refund_eligible }} only: request a full refund. Reply to this email with the word "refund" and your order ID. We process within 14 days via the original payment method. See Template 09 for what to expect.
> 3. Change your reward configuration before the next address-lock date if the delay opens up a new option you would prefer.
>
> Tommy and Craig

**Footer**: standard transactional footer.

---

## Reason discipline

The `{{ delay.reason }}` string is the most important part of this template. It must:

- Be one short paragraph (50 to 120 words).
- Name the actual cause. Not "supply chain challenges" or "manufacturing complexity." Examples of acceptable specificity:
  - "Our contract manufacturer for the ThoxClip enclosure missed two consecutive ship dates on the rev3 mold tooling. We have moved tooling to a second supplier and revalidated the cavity layout, which adds six weeks."
  - "The Wi-Fi module we selected for ThoxAir failed certification in EU markets at the last submission. We have selected a replacement module that passes, and are respinning the PCB to fit it. Six to eight weeks added."
- Not blame a vendor by name unless we have explicit written go-ahead from them. "Our contract manufacturer" is acceptable. "Foxconn" is not, unless they signed off.
- Not blame external factors that we should have caught earlier (e.g. "we did not budget enough for cert" is on us, not on the cert body).
- Not editorialize about how hard the work is. Backers know. They just want the date.

If the reason cannot be stated in plain language without revealing confidential information (a vendor dispute, a regulatory action, a pending acquisition), escalate to `CRISIS_COMMS.md` instead.

## Notes

**When to use**: ship window slips by more than 30 days. For slips of 1 to 30 days, mention in the next monthly update only; do not fire Template 07. For slips greater than 90 days, fire Template 07 and unlock the refund path per Kickstarter ToS.

**When NOT to use**: do not use Template 07 for quality issues that affect already-shipped units. Use Template 08. Do not use Template 07 for stretch goal status. Use Template 04.

**Escalation criteria**: any slip greater than 90 days requires Tommy + Craig + a 24-hour cooling-off period before sending. Read the draft, sleep on it, read again before sending. The temptation to soften a big slip is real, and the right response is to be more direct, not less.

**Sequencing**: Template 07 always fires BEFORE the next Template 03 (monthly update). The monthly update then references the Template 07 in the per-reward status table cell, e.g. `Q1 2027 -> Q2 2027 (Template 07 sent 2026-11-15)`.

**Refund window**: per Kickstarter ToS, delays > 90 days unlock backer refund rights. Template 07 must surface this explicitly when applicable. Do not bury the refund option as an afterthought.

**Frequency limit**: do not send Template 07 to the same backer more than once per 90 days for the same reward. If a reward slips twice in the same quarter, the second slip is handled by extending the first Template 07 into a follow-up that explicitly says "second slip" in the subject. Backers should never feel they are being drip-fed delays.

**Cooling-off rule**: after sending Template 07, do not send any non-transactional email to that backer for 14 days. They need space.
