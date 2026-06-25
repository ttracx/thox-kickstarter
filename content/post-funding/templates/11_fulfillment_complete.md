# Template 11: Fulfillment Complete (your reward shipped)

**Subject**: Your full THOX pledge has shipped. We are done with the hard part.
**Alt subject (A/B)**: Pledge complete: every reward you backed is on its way.
**Preview text**: Recap of everything that shipped to you and what comes next.

**Trigger**: per-backer, fires when the final reward in the backer's pledge has handed off to the carrier. For single-reward pledges, this is the same event as Template 05; for multi-reward pledges, this fires after the last shipment.

**Send window**: within 24 hours of the final carrier handoff for the backer.

**Transactional**: Yes. Ignore unsubscribe flag.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ pledge.reward_list }}` -> markdown table of every reward in the pledge with ship date and tracking
- `{{ pledge.first_ship_date }}` -> absolute date of first shipment to this backer
- `{{ pledge.last_ship_date }}` -> absolute date of last shipment
- `{{ backer.id }}`

---

**Body**:

> Hi {{ backer.first_name }},
>
> Every reward you backed is now on its way to you. Here is the recap.
>
> **What shipped to you**
>
> {{ pledge.reward_list }}
>
> Your first shipment left on {{ pledge.first_ship_date }} and your last left on {{ pledge.last_ship_date }}.
>
> **What comes next**
>
> 1. **Tracking and delivery**: each shipment has its own tracking number, sent via Template 05. Once delivered, you receive a Template 06 setup followup per shipment.
> 2. **Manufacturing updates**: now that your pledge is shipped, the monthly Template 03 manufacturing updates are no longer relevant to you specifically. You can stay subscribed (they will continue while other backers are still in queue) or unsubscribe at any time via the link in the footer.
> 3. **Quality issues, returns, replacements**: the 14-day no-questions-asked replacement window starts at each unit's delivery date. If anything is wrong, reply to the Template 05 or Template 06 for that shipment.
> 4. **Anniversary thank-you**: on the one-year anniversary of campaign funding close, you will receive Template 12. After that, the email cadence drops to occasional product news only, opt-in.
>
> A short note from Craig and me, off-template.
>
> We started this campaign with a pledge to build a hardware family that respects your time and your data. You backed us. We owe you the device, the support, and the second-and-third updates that keep the device working. The shipment confirmation is not the end of the obligation. It is the start of the ownership phase.
>
> If you find a bug, find a way to make THOX devices do something we did not anticipate, or just want to tell us what you think, reply to this email. Both of our inboxes are on this thread.
>
> Tommy and Craig

**Footer**: standard transactional footer.

---

## Reward list format

`{{ pledge.reward_list }}` is the canonical markdown shape:

```
| Reward | Shipped | Tracking |
|---|---|---|
| ThoxClip | 2027-02-14 | FedEx 1234... |
| ThoxMini | 2027-05-08 | UPS 5678... |
| MagStack Cluster Dock | 2027-05-08 | UPS 5678... (same shipment as ThoxMini) |
```

If the backer has add-ons that shipped in the box of a parent reward, list them as sub-rows with "(same shipment as X)" in the tracking column.

---

## Notes

**When to use**: per-backer, once their final reward in the pledge has shipped. The fulfillment service tracks "pledge complete" state based on the per-reward pipeline steps in `app/kickstarter/rewards.py`. The trigger fires when the final reward's `ship` step completes.

**When NOT to use**: do not fire Template 11 if any reward in the pledge is still in the pipeline. Do not fire Template 11 to backers who have requested refunds for any portion of the pledge until that refund is resolved.

**Escalation criteria**: none in the routine case. If the backer replies with a problem, route through Template 06 reply triage.

**Suppression cascade**: once Template 11 fires, the backer is removed from the Template 03 monthly manufacturing update list by default (they may opt back in via their dashboard). They remain on the list for Template 04 (stretch unlock, if any post-campaign), Template 08 (quality issues), and Template 12 (anniversary).

**Tone calibration**: this is the warmest template in the pack. After 6 to 18 months of manufacturing updates, the backer has invested patience as well as money. Acknowledge that. The "off-template" note from Tommy and Craig is the place where the otherwise-strict no-marketing voice loosens slightly, to land the emotional beat of "you backed us and we delivered."

**Coordination with Template 12**: Template 11 mentions Template 12 will arrive at the one-year anniversary. Do not break that promise; Template 12 must fire for every Template 11 recipient.

**Multi-pledge handling**: if a backer pledged twice (rare; e.g. once for personal and once for a gift), each pledge fires its own Template 11 when its rewards complete shipping. Do not consolidate.

**No survey ask**: do not include a post-fulfillment survey link in Template 11. The Template 06 Day +7 followup already collects unboxing feedback per shipment. Template 11 is a closing, not another data-collection point.
