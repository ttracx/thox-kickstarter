# Template 10: Concept Stretch Not Shipping

**Subject**: {{ stretch.name }}: an honest update on what is and is not happening
**Alt subject (A/B)**: We owe you a direct word on {{ stretch.name }}
**Preview text**: We did not unlock the threshold. Here is what that means and what does not change.

**Trigger**: a concept-unveil stretch goal (ThoxArm, ThoxVault, ThoxCargo, or future equivalents) was discussed publicly during the campaign but did not unlock. Fires once, in the Day +30 to Day +60 window after campaign close, after the final funding number is settled and refunds-versus-chargebacks have netted out.

**Send window**: 09:00 PT on the scheduled send date. One send only.

**Transactional**: No. Respects unsubscribe flag.

**Approval gate**: Tommy AND Craig per-send sign-off. Required.

**Parametric**: one variant per concept that did not unlock. If multiple concepts did not unlock (e.g. ThoxArm at $1.5M and ThoxCargo at $3M both missed), consolidate into a single email covering both. Order from lowest threshold (most-discussed publicly) to highest.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ stretch.name }}` -> e.g. "ThoxArm", "ThoxVault", "ThoxCargo"
- `{{ stretch.threshold_usd }}` -> the dollar threshold that was not reached
- `{{ stretch.actual_funding_usd }}` -> the actual final funding number (used in summary, not as a comparison to threshold)
- `{{ stretch.miss_margin_usd }}` -> dollar gap between actual and threshold (only included if margin > $50K)
- `{{ stretch.future_path }}` -> short paragraph on what happens to the concept (paused / repositioned / killed)

---

**Body (single concept)**:

> Hi {{ backer.first_name }},
>
> We owe you a direct word on {{ stretch.name }}.
>
> {{ stretch.name }} was a concept-unveil stretch goal in our Kickstarter campaign with a threshold of ${{ stretch.threshold_usd }}. We did not cross that threshold. Final funding settled at ${{ stretch.actual_funding_usd }}.
>
> **What this means**
>
> {{ stretch.name }} does not enter the design and engineering pipeline as a funded SKU. The concept-unveil structure (described in Template 04 and on the campaign page) meant the threshold gated the public engineering process, not your existing reward. So:
>
> 1. Your existing reward (whatever you backed) is unaffected. Ship windows, configuration, and pricing are unchanged.
> 2. {{ stretch.name }} as discussed during the campaign does not move forward on the Kickstarter timeline.
> 3. {{ stretch.future_path }}
>
> **Why we are sending this**
>
> Backers who got excited about {{ stretch.name }} deserve to hear directly from us that it is not happening on the timeline implied by the campaign. Not a vague non-answer in a monthly update. Not silence. A direct email.
>
> We hate sending this email. We also hate the alternative more, which is letting backers wait six months to figure out the concept is dead.
>
> **What does NOT change**
>
> Your existing reward. Manufacturing updates. Shipping timeline. Your relationship with us.
>
> If {{ stretch.name }} ever does enter the pipeline as a separate SKU (post-Kickstarter, with its own funding or development path), every backer of the original campaign will get first-look access at backer pricing. That is the standing commitment.
>
> Tommy and Craig

**Body (multiple concepts)**:

Same shell, but the "What this means" section is repeated per concept with the same numbered structure. The "Why we are sending this" and "What does NOT change" sections appear once at the end and cover both.

**Footer**: standard transactional footer.

---

## Notes

**When to use**: exactly once per concept that was publicly discussed as a stretch goal but did not unlock. Better to send this email than to let backers infer the answer from silence.

**When NOT to use**: do not send Template 10 for stretch goals that are not concept-unveils (e.g. ship-upgrade or free-add-on stretches that did not unlock). Those get a single mention in the next monthly update only, because they were never promised to backers in the first place.

**When NOT to use, part 2**: do not send Template 10 during the campaign or in the first 30 days after close. Funding numbers fluctuate as Kickstarter clears payments and processes refunds-versus-chargebacks. Wait for the dust to settle.

**Escalation criteria**: this template is the single highest-trust-risk template in the pack. Tommy + Craig must read it together before any send. A 48-hour cooling-off period applies between drafting and sending.

**Future-path discipline**: `{{ stretch.future_path }}` must be one of three honest statements:
- **Paused**: "We are pausing {{ stretch.name }} development. We are not committing to a future date. If we restart, you will hear it from this email channel first."
- **Repositioned**: "We are taking {{ stretch.name }} off the Kickstarter timeline and exploring it as a post-launch SKU on its own schedule. No commitments on timing."
- **Killed**: "We are not pursuing {{ stretch.name }} further. The concept is closed. If the underlying technology changes the equation later, we will revisit, but as of now this is final."

Do not invent a fourth, softer option. "Paused indefinitely" is "killed" with extra steps and backers will read it that way.

**No fundraising mention**: do not include the threshold-miss margin if it would invite "if only we had X more dollars" speculation. The miss happened. The number is what it is.

**Suppression**: this template fires once. Do not follow up. Do not send a "checking in on the {{ stretch.name }} update" follow-up. If a backer replies, the ops team handles each reply individually.

**Coordination with social and press**: do not post about the concept-stretch miss on social media until Template 10 has been sent to all eligible backers. Press inquiries about the miss prior to the send are answered "we are communicating directly with backers first; we will have a public statement shortly."
