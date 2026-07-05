# Template 12: One-Year Anniversary Thank-You

**Subject**: One year. Thank you for backing THOX.
**Alt subject (A/B)**: A year later: what your pledge helped build.
**Preview text**: A short, honest note from Tommy and Craig on the anniversary of campaign close.

**Trigger**: 365 days after Kickstarter funding close (Day +365). Sent to every backer whose pledge was not refunded, regardless of whether their reward has fully shipped yet.

**Send window**: 09:00 PT on the anniversary date. One send.

**Transactional**: No. Respects unsubscribe flag.

**Approval gate**: Tommy AND Craig per-send sign-off, primarily because the body changes year-to-year based on what we have learned. Required.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ backer.pledge_status }}` -> "shipped" or "in flight"
- `{{ campaign.close_date }}` -> absolute date string of original campaign close
- `{{ year.summary_paragraph }}` -> 100 to 200 words, written fresh each year by Tommy
- `{{ year.what_we_learned }}` -> bullet list of 3 to 5 things, honest

---

**Body**:

> Hi {{ backer.first_name }},
>
> One year ago today, on {{ campaign.close_date }}, our Kickstarter campaign closed. You were one of the backers.
>
> {{ year.summary_paragraph }}
>
> **What we learned**
>
> {{ year.what_we_learned }}
>
> **Where your reward stands**
>
> Your pledge status: {{ backer.pledge_status }}. If "shipped," your THOX devices are in your hands and the warranty clock is running. If "in flight," your next Template 03 manufacturing update covers the current status, and your Template 05 shipping notification will arrive when your batch hands off to the carrier.
>
> **What comes next**
>
> 1. Routine manufacturing updates (Template 03) continue for backers still in queue.
> 2. Quality issue and replacement support continues indefinitely per the standing warranty terms.
> 3. After this anniversary email, the email cadence drops to occasional product news only. You can opt out at any time via the footer.
> 4. No follow-up fundraising. We are not running a "year 2 stretch goal." You backed once; that obligation is what it is.
>
> A short note off-template.
>
> A year of running a hardware campaign teaches you who your backers are. You waited through delays. You replied to surveys. You sent us photos when units arrived. A few of you found bugs and reported them with screenshots and steps to reproduce, which is the highest-quality feedback we have ever received from anywhere. We do not take any of that for granted.
>
> Thank you for backing the campaign.
>
> Tommy and Craig

**Footer**: standard transactional footer.

---

## Notes

**When to use**: exactly once per backer, on the one-year anniversary of campaign close. Backers who pledged but were later refunded are excluded.

**When NOT to use**: do not use Template 12 as a vehicle to announce new products, run a year-2 fundraising round, or solicit reviews. If a new product launch happens around the same time, it gets its own separate communication.

**Escalation criteria**: this is the one template where the body is genuinely written fresh each year. Tommy drafts `{{ year.summary_paragraph }}` and `{{ year.what_we_learned }}` in the two weeks before the anniversary. Craig reviews. Both sign off before send.

**Year-2 and beyond**: this template fires once per pledge. There is no year-2 anniversary template by default. If we choose to send a year-2 note later (e.g. tied to a major product anniversary or a meaningful milestone), it gets a fresh template with explicit opt-in framing.

**Voice calibration**: the warmest template in the pack alongside Template 11. The off-template note at the end is the place where the otherwise-strict no-marketing voice loosens slightly. Acknowledge backers specifically (waited through delays, replied to surveys, sent photos, reported bugs) rather than thanking them generically.

**Suppression cascade**: this template respects unsubscribe. Backers who unsubscribed from non-transactional email during the year do NOT receive Template 12.

**What we learned discipline**: `{{ year.what_we_learned }}` must include at least one thing we got wrong, alongside what we got right. Examples of acceptable specificity:

- "We underestimated the lead time on the ThoxClip enclosure tooling by six weeks. The Q1 2027 window slipped once before we hit it."
- "The first batch of MagStack pogo pins had a higher defect rate than acceptable. We changed suppliers between batch 2 and batch 3 and the rate dropped to specification."
- "Our backer survey collected the wrong field for international VAT registration in one EU country. We caught it before any shipment was delayed, but it required an out-of-band reply-to-this-email reach-out to about 80 backers, which was avoidable."

Honesty in the anniversary note builds more trust than a polished retrospective ever will.

**No comparison to other campaigns**: do not include "compared to industry averages, we shipped X% on time" or similar. Backers do not care about industry averages. They care about whether we delivered what we promised them. The data lives in the per-reward status table, not in this email.
