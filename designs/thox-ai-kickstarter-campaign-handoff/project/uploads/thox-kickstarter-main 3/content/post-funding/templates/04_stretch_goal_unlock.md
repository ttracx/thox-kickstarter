# Template 04: Stretch Goal Unlock Announcement

**Subject**: We hit {{ stretch.name }}. Here is what changes for you.
**Alt subject (A/B)**: {{ stretch.name }} unlocked.
**Preview text**: What this means for your reward and your ship window.

**Trigger**: a stretch goal threshold from `content/launch/STRETCH_GOALS.md` is crossed. Fires once per stretch goal. Can fire during the campaign or shortly after funding close if late pledges push the total over a threshold.

**Send window**: within 24 hours of the threshold being crossed and verified.

**Transactional**: No. Respects unsubscribe flag.

**Parametric**: send one variant per stretch goal unlocked. If multiple stretches unlock in the same 24-hour window, consolidate into a single email with multiple sections.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ stretch.name }}` -> e.g. "ThoxArm" or "MagStack 8-node"
- `{{ stretch.kind }}` -> "concept_unveil" or "ship_upgrade" or "free_add_on"
- `{{ stretch.what_unlocks }}` -> short clause, what the unlock actually delivers
- `{{ stretch.ship_impact }}` -> short clause, what this does to ship windows
- `{{ stretch.eligible_backers }}` -> who gets the benefit
- `{{ stretch.next_threshold }}` -> name of the next stretch goal in the ladder (or "we are at the top of the ladder")

---

**Body (ship_upgrade or free_add_on variant)**:

> Hi {{ backer.first_name }},
>
> We crossed the {{ stretch.name }} threshold. Here is what it actually means and what changes for you.
>
> **What unlocks**
>
> {{ stretch.what_unlocks }}
>
> **Who gets it**
>
> {{ stretch.eligible_backers }}
>
> **Ship impact**
>
> {{ stretch.ship_impact }}
>
> If the unlock affects your reward configuration, your backer survey will be updated within 7 days with the new option. If you have already completed your survey, you can revisit it at https://thox.ai/backer/survey?b={{ backer.id }} until the address-lock date.
>
> **What is next on the stretch ladder**
>
> {{ stretch.next_threshold }}
>
> If we keep climbing, the next monthly update will say so. If not, that is fine. The campaign as funded already delivers the four-device family and the MagStack ring, and that is the baseline commitment.
>
> Tommy

**Body (concept_unveil variant, e.g. ThoxArm at $1.5M, ThoxVault at $2.5M, ThoxCargo at $3M)**:

> Hi {{ backer.first_name }},
>
> We crossed the {{ stretch.name }} threshold. {{ stretch.name }} is a concept unveil, which is a specific commitment shape that needs to be stated honestly up front.
>
> **What "concept unveil" means**
>
> Crossing this threshold unlocks the public design and engineering process for {{ stretch.name }}. It does not, by itself, commit a ship window to your existing reward. {{ stretch.name }} will be developed as a separate SKU on a separate timeline after the Aug 2026 family ships.
>
> **What you get as a current backer**
>
> {{ stretch.eligible_backers }}
>
> Typically: first access to pre-order {{ stretch.name }} at backer pricing once the SKU is production-ready, plus public visibility into the design milestones along the way.
>
> **Ship impact on your current reward**
>
> {{ stretch.ship_impact }}
>
> Typically: none. The Aug 2026 family stays on its existing ship windows. {{ stretch.name }} is additional, not a replacement.
>
> Tommy

**Footer**: standard transactional footer.

---

## Notes

**When to use**: exactly once per stretch goal threshold crossed. Verify the threshold is real (Kickstarter pledge total minus refunds and chargebacks) before sending.

**When NOT to use**: do not send this template speculatively, e.g. "we are close to unlocking X." Stretch goal speculation belongs in social posts and the monthly update, not in a dedicated email. Do not send this template after the address-lock date if the unlock would require a survey revisit; instead, handle as a one-off via Template 03 with a note.

**Escalation criteria**: concept_unveil unlocks (ThoxArm, ThoxVault, ThoxCargo) require Tommy + Craig joint sign-off because the "concept" framing has to be unambiguous. Backers who later expect the concept to ship on the Aug 2026 timeline are a trust problem we want to prevent at the moment of announcement.

**Truth budget**: if the threshold was crossed by a small margin (within $25K of the line), say so explicitly. If it was crossed by a large margin, do not editorialize. Either way, the unlock is the unlock.

**Coordination with COMMS_PLAYBOOK**: see `COMMS_PLAYBOOK.md` section "Stretch goal events" for the full decision tree.
