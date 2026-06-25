# Template 06: Delivery Confirmation Follow-up

**Subject**: Your {{ reward.name }} arrived. Two quick things.
**Alt subject (A/B)**: It's at your door. Now what.
**Preview text**: Setup link plus a fast feedback channel.

**Trigger**: per-backer, fires 24 hours after the carrier-confirmed delivery event for that backer's shipment.

**Send window**: 09:00 local time at the destination, 24 hours after delivery confirmation. The 24-hour lag gives the backer time to open the box on their own schedule before we email them about it.

**Transactional**: borderline. Treat as transactional for the first send; respects unsubscribe flag for the (optional) one-week followup.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.name }}`
- `{{ reward.sku }}`
- `{{ shipment.delivered_date }}` -> absolute date string
- `{{ backer.id }}`

---

**Body**:

> Hi {{ backer.first_name }},
>
> Carrier confirms your {{ reward.name }} was delivered on {{ shipment.delivered_date }}. Two quick things.
>
> **First, setup**
>
> The quickstart card in the box has a QR to https://thox.ai/quickstart/{{ reward.sku }}. If the QR is damaged or unreadable, the same page is linked from your backer dashboard at https://thox.ai/backer.
>
> Most setups take under five minutes. If yours doesn't, reply directly to this email. We will troubleshoot with you.
>
> **Second, feedback**
>
> If anything in the box is missing, broken, or wrong, reply within 14 days of delivery. Reply within 14 days unlocks the no-questions-asked replacement path. After 14 days we still help; the path just involves photos and a short triage.
>
> If everything is good, you do not need to reply. Silence means "the unit works and I am using it."
>
> One last thing. A short backer survey on the unboxing and setup experience will arrive about a week from now. Five minutes, optional. It feeds directly into how we improve packaging, quickstart docs, and the next unit you might receive from us.
>
> Tommy

**Footer**: standard transactional footer.

---

## Optional one-week follow-up

If the backer has not replied with a problem and has not unsubscribed, a one-week follow-up survey email is sent at Day +7 from delivery. This is a separate template variant; do not bundle into the initial Template 06 send.

**Subject (variant)**: One week with your {{ reward.name }}. How is it going?

**Body (variant)**:

> Hi {{ backer.first_name }},
>
> Quick check-in. Your {{ reward.name }} has been with you for about a week. If you have five minutes, the link below is a short survey on unboxing, setup, and first-week experience. It feeds directly into the next manufacturing batch and the next product.
>
> https://thox.ai/backer/post-delivery?b={{ backer.id }}
>
> If you would rather not, you do not have to. There is no follow-up reminder after this.
>
> Tommy

---

## Notes

**When to use**: every per-unit delivery event, 24 hours after delivery. The initial Template 06 is transactional and ignores unsubscribe. The Day +7 variant is non-transactional and respects unsubscribe.

**When NOT to use**: do not send Template 06 to backers whose units were returned to sender. Those route to ops for re-shipment via a reply-to-this-email exchange.

**Escalation criteria**: if reply volume to Template 06 indicates a systemic issue (e.g. >5% of recipients reply about the same broken thing), pause the next batch's Template 06 send, escalate to Tommy + Craig, and consider a Template 08 (quality issue) follow-up to the affected batch.

**Reply triage**: the ops team triages Template 06 replies in three buckets:
- **Setup question**: handled by ops within 24 hours using the quickstart docs and known-issue list.
- **Defective unit (single)**: replacement workflow per Template 08 single-unit path.
- **Defective unit (pattern)**: escalate to ops lead, evaluate as potential Template 08 quality issue event.

**Length target**: 150 to 250 words. Backers just received the thing; they want to use it, not read a long email.

**No marketing**: do not include cross-sell links to other THOX products, the newsletter, or social. The backer just paid; let them enjoy the unit.
