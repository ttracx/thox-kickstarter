# Template 08: Quality Issue Communication (proactive recall or replacement)

**Subject**: Action needed: {{ reward.name }} quality issue ({{ quality.issue }})
**Alt subject (A/B)**: We found a problem with your {{ reward.name }}. Here is the fix.
**Preview text**: What is wrong, who is affected, what we are doing about it.

**Trigger**: a defect or quality issue has been confirmed in shipped units. Fires for either an isolated defect (one unit, one backer) or a batch-level recall (a percentage of units across a batch or batches).

**Send window**: within 48 hours of internal confirmation. Do not wait for a polished press response; the email to affected backers goes first.

**Transactional**: Yes. Ignore unsubscribe flag.

**Approval gate**: Tommy AND Craig per-send sign-off. Required.

**Parametric**: per-issue. Variant selection driven by `{{ quality.affected_pct }}`:
- Single-unit (one backer): Variant A
- <5% of a batch: Variant B
- 5% to 30% of units: Variant C (escalates to a public update reference)
- >30%: Variant D, AND escalation to `CRISIS_COMMS.md`

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.name }}`
- `{{ quality.issue }}` -> short description, e.g. "USB-C port may fail under repeated insertion"
- `{{ quality.affected_pct }}` -> e.g. "3.4%" or "single unit"
- `{{ quality.detection }}` -> how we detected it
- `{{ quality.remediation }}` -> "replacement", "field fix", "in-place firmware update"
- `{{ quality.action_required }}` -> what the backer needs to do
- `{{ quality.timeline }}` -> when remediation reaches the backer

---

**Body (Variant A: single-unit defect, in response to a backer reply)**:

> Hi {{ backer.first_name }},
>
> Thanks for the reply on your {{ reward.name }}. Based on what you described, this is {{ quality.issue }}, and your unit qualifies for the no-questions-asked replacement path.
>
> **What happens next**
>
> 1. We ship a replacement unit to your address on file within 5 business days.
> 2. The replacement includes a pre-paid return label for the defective unit. Use any sturdy box.
> 3. Return ships within 30 days of receiving the replacement. The replacement is yours either way; the return is so we can root-cause the failure.
>
> **Tracking and confirmation**
>
> You will receive a Template 05 shipping notification for the replacement once it hands off to the carrier.
>
> Tommy

**Body (Variant B: <5% batch-level)**:

> Hi {{ backer.first_name }},
>
> Direct version up front. Your {{ reward.name }} is potentially affected by a defect we recently confirmed. {{ quality.issue }}.
>
> The reason you are hearing about this proactively is that we monitor a defect rate threshold across every batch, and this issue crossed the threshold that triggers a backer-facing notification. Approximately {{ quality.affected_pct }} of the batch is affected, and we cannot tell from the serial number alone whether your specific unit is one of them.
>
> **How we detected it**
>
> {{ quality.detection }}
>
> **What we are doing**
>
> {{ quality.remediation }}
>
> **What you need to do**
>
> {{ quality.action_required }}
>
> **Timeline**
>
> {{ quality.timeline }}
>
> If your unit is functioning normally and you do not want to opt into the remediation, you can ignore this email. Your warranty terms are unaffected. If your unit later exhibits the symptom described, reply to this email for the same remediation path.
>
> Tommy and Craig

**Body (Variant C: 5% to 30% batch-level)**:

> Hi {{ backer.first_name }},
>
> Direct version up front. We have confirmed a defect affecting approximately {{ quality.affected_pct }} of {{ reward.name }} units in a recent batch. Your unit is in that batch. We are not certain whether your specific unit is affected, and we are treating every unit in the batch as if it is.
>
> **The issue**
>
> {{ quality.issue }}
>
> **How we detected it**
>
> {{ quality.detection }}
>
> **What we are doing**
>
> {{ quality.remediation }}
>
> **What you need to do**
>
> {{ quality.action_required }}
>
> **Timeline**
>
> {{ quality.timeline }}
>
> **Public update**
>
> We are publishing a public Kickstarter update within 24 hours of this email so that press and the broader backer community see the same information you do. Your email arrived first because you are directly affected.
>
> Tommy and Craig

**Variant D**: do not send via this template. Escalate to `CRISIS_COMMS.md`.

**Footer**: standard transactional footer.

---

## Notes

**When to use**: any quality issue that meets the threshold (>1 confirmed defect of the same root cause, or any safety issue regardless of count). Better to over-communicate quality than under-communicate.

**When NOT to use**: do not use Template 08 for cosmetic defects that do not affect function. Those route to the ops team for individual handling via Template 06 reply triage.

**Safety threshold**: any defect that could cause physical harm (battery, thermal, electrical) fires Variant D regardless of count and goes through `CRISIS_COMMS.md`. This includes lithium issues per UN 38.3, RF over-emission, and any case where the failure mode involves heat, smoke, or shock.

**Escalation criteria**:
- Variant A: ops team can send, with Tommy + Craig CC'd.
- Variant B: Tommy + Craig must sign off; 24-hour drafting period.
- Variant C: Tommy + Craig must sign off; 48-hour drafting period; public update drafted in parallel.
- Variant D: escalate to `CRISIS_COMMS.md` immediately. Do not send any email until the crisis comms framework is engaged.

**Sequencing with social and press**:
- Variant A: no public mention.
- Variant B: mention in next monthly update only.
- Variant C: public Kickstarter update within 24 hours of email.
- Variant D: per `CRISIS_COMMS.md`.

**Remediation paths**:
- "replacement": new unit ships, defective unit returned via pre-paid label.
- "field fix": small kit ships with instructions for an in-place repair (e.g. a thermal pad reseating). Used only when the repair is genuinely safe and simple for a backer to do.
- "in-place firmware update": pushed via the standard OTA channel. The email is informational; backer takes no action.

**Refund option**: if remediation will take longer than 60 days from the date of this email, a refund option must be offered as an alternative to remediation. Add this as a fourth numbered item in the body when applicable.

**No legal hedging**: do not include "this is not an admission of liability" boilerplate. We made a thing that broke. We are fixing it. That is the message.
