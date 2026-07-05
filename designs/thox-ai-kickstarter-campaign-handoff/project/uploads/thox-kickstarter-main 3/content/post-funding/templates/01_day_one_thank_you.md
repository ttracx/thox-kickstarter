# Template 01: Day-1 Thank-You plus Survey Link

**Subject**: You backed THOX. Here is what happens next.
**Alt subject (A/B)**: Thank you. Now we get to work.
**Preview text**: Survey link inside. Five minutes, then you can put it away.

**Trigger**: Day +1 after funding closes. Sent to every successful backer in one blast.

**Send window**: 09:00 PT Day +1. One send only; reminders go via Template 02.

**Transactional**: Yes. Ignore unsubscribe flag for this single message; backers opted in by pledging.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.name }}`
- `{{ reward.tier_label }}`
- `{{ reward.shipping_window }}`
- `{{ backer.id }}`
- `{{ unsubscribe_token }}`

---

**Body**:

> Hi {{ backer.first_name }},
>
> Your card cleared and your pledge for the {{ reward.tier_label }} is locked in. Thank you.
>
> A few honest words on what just happened and what happens next.
>
> What just happened. You bought a thing that does not exist yet. We are now contractually and morally on the hook to make it exist and put it in your hands. That obligation does not lapse, get sold, or transfer. Craig and I are the two people responsible.
>
> What happens next, in order.
>
> 1. **Today**: complete your backer survey at the link below. We need your shipping address, your country, and your reward configuration choices. Five minutes. Closes Day +60.
> 2. **Every 30 days starting Day +30**: a manufacturing update from me, sent to this email. What we built, what we learned, what slipped, what is next. Honest, short, no marketing.
> 3. **About 60 to 90 days before your reward ships**: address-lock email. Last chance to change your shipping address without contacting us directly.
> 4. **When your reward ships**: per-unit tracking number from the carrier, plus a confirmation from me.
>
> Your reward ships in {{ reward.shipping_window }}. That is firm intent, not a contract. If we hit a real blocker that moves the window, you will hear it from me before any public update.
>
> **Complete your survey**: https://thox.ai/backer/survey?b={{ backer.id }}
>
> If you have a question that is not covered by the FAQ on the campaign page, reply directly to this email. It goes to me.
>
> Tommy
>
> THOX.ai LLC

**Footer**: standard transactional footer.

---

## Notes

**When to use**: exactly once, on Day +1 after funding closes. This is the single transactional welcome message every backer receives.

**When NOT to use**: do not resend this email to backers who already received it. Use Template 02 for reminders.

**Escalation criteria**: if reply volume exceeds the ops team's capacity (>100 replies in the first 24 hours), escalate to Tommy + Craig to draft a public FAQ supplement and link it in the auto-reply.

**Localization note**: this template is English-only at launch. International backers receive the same copy. Translation is post-launch scope.

**Pairing**: Template 02 is the reminder. Do not send Template 02 until Day +14 at the earliest.
