# Template 09: Refund Acknowledgment

**Subject**: Refund processed: ${{ refund.amount_usd }} to your original payment method
**Alt subject (A/B)**: Your refund is on the way.
**Preview text**: Timing, amount, and what happens next.

**Trigger**: a backer-initiated refund request has been processed via Stripe or Kickstarter. Fires after the refund transaction completes, not when the request arrives.

**Send window**: within 24 hours of refund completion.

**Transactional**: Yes. Ignore unsubscribe flag.

**Approval gate**: Tommy AND Craig per-send sign-off on the refund itself; the email is a confirmation and does not require additional sign-off once the refund is approved.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.name }}`
- `{{ refund.amount_usd }}` -> dollar amount (number, formatted to 2 decimals)
- `{{ refund.reason }}` -> short reason string, sourced from the backer's request
- `{{ refund.processor }}` -> "Stripe" or "Kickstarter"
- `{{ refund.processed_date }}` -> absolute date string of refund execution
- `{{ refund.expected_arrival }}` -> "5 to 10 business days" typically

---

**Body**:

> Hi {{ backer.first_name }},
>
> Your refund of ${{ refund.amount_usd }} for the {{ reward.name }} has been processed and is on its way to the original payment method.
>
> **Reason on file**: {{ refund.reason }}
> **Processed via**: {{ refund.processor }}
> **Processed on**: {{ refund.processed_date }}
> **Expected to land in your account**: {{ refund.expected_arrival }}
>
> A few honest words on what this means.
>
> 1. Your reward tier is now cancelled. You will not receive the {{ reward.name }} or any associated add-ons.
> 2. Your backer dashboard is closed. Survey access is revoked.
> 3. You will stop receiving manufacturing updates and shipping notifications. You will continue to receive transactional email related to this refund only.
> 4. If you change your mind, we cannot reinstate the pledge. The Kickstarter campaign has closed and we cannot accept new pledges at backer pricing. We can, however, point you to the post-launch direct-from-thox.ai pricing once devices are generally available.
>
> If the refund does not land in your account by {{ refund.expected_arrival }}, reply directly to this email with your last-4 card digits and we will trace it with {{ refund.processor }}.
>
> No hard feelings. Thank you for backing in the first place.
>
> Tommy

**Footer**: standard transactional footer.

---

## Notes

**When to use**: every completed refund. Once the refund transaction completes in Stripe or Kickstarter, fire this template within 24 hours.

**When NOT to use**: do not send Template 09 before the refund is actually processed. A backer reading "your refund is on the way" and then seeing no money for 10 days because we have not actually pushed the refund yet is a trust failure. Process first, email second.

**Escalation criteria**: refund requests greater than $500 (any single backer with multiple reward tiers exceeding this) require Tommy + Craig per-send sign-off on the refund itself before processing. Below $500, ops team can process directly within the standing refund policy.

**Refund reason discipline**: `{{ refund.reason }}` is sourced verbatim from the backer's request, condensed to one short sentence. Examples:
- "Changed mind, no longer needs the device."
- "Concerned about ship window slip."
- "Personal financial circumstances changed."
- "Quality issue, declined remediation, requested refund instead."

Do not editorialize or quote the backer back to themselves unflatteringly.

**Processor selection**: refunds within 60 days of the campaign close go through Kickstarter directly when possible (it shows up on the backer's card statement as a Kickstarter refund matching the original charge). Refunds after the Kickstarter refund window closes go through Stripe directly. The processor field surfaces this so the backer knows where the credit will appear.

**Chargeback prevention**: every refund email gets a clear "expected to land by" date. If the date passes and the backer has not seen the money, they will file a chargeback rather than reply. Make the date generous (10 business days is the safe default for international cards).

**No upsell**: do not include "you can still buy direct from thox.ai later" as a CTA. The fourth numbered item mentions it once, factually. That is the limit. A refund email is not a re-engagement opportunity.

**Suppression cascade**: once Template 09 fires for a backer, suppress them from all future Template 02, 03, 04, 05, 06, 11, 12 sends for that reward. If they have other un-refunded rewards in the same pledge, they remain on the list for those rewards only.

**Record retention**: a copy of every Template 09 send (with all populated variables) is archived in the fulfillment service audit log for seven years per Kickstarter and applicable tax record-keeping requirements.
