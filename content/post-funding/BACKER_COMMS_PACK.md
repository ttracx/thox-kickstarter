# Post-funding backer comms pack

These are the comms templates for after Kickstarter funding closes. The pre-launch `EMAIL_SEQUENCE.md` is documented separately. All templates follow the THOX brand voice: technical, honest, no marketing fluff, no em-dashes, no emojis.

Day numbering throughout this pack is relative to Day 0, defined as the day Kickstarter funding closes (currently Sep 11, 2026 if the campaign launches Aug 12, 2026 and runs 30 days; the absolute date moves with the actual launch date and is owned by `docs/TIMELINE.md`).

From, Reply-To, and Sender name are inherited from the pre-launch sequence:

```
From: tommy@thox.ai
Reply-To: tommy@thox.ai
Sender name: Tommy at THOX
```

Footer block on every template is the same CAN-SPAM block the pre-launch sequence uses, with `Reno, NV` left as the same placeholder until Craig confirms the registered LLC mailing address. Do not deviate per template.

```
THOX.ai LLC, Reno, NV.
You are receiving this because you backed the THOX Kickstarter campaign.
Manage your reward, address, and survey responses at https://thox.ai/backer
Unsubscribe from non-transactional email: https://thox.ai/unsubscribe?t={{unsubscribe_token}}
```

Transactional vs marketing distinction matters. Shipping notifications, delivery confirmations, refund acknowledgments, and quality-issue recall notices are transactional and ignore the unsubscribe flag. Everything else (monthly updates, stretch goal announcements, anniversary thank-yous) respects the unsubscribe flag.

## Cadence

- Funding closes Day 0
- Day +1: thank-you plus survey link blast (Template 01)
- Day +14: address survey reminder for backers who have not completed the survey (Template 02)
- Day +30 and then every 30 days: monthly manufacturing update (Template 03)
- Day +60: address change window closes; final survey reminders go to the last non-responders
- Stretch goal unlock (event-driven, may fire during or shortly after the campaign): Template 04
- Day +90 through Day +180 and beyond: per-batch shipping notifications (Template 05) followed by per-shipment delivery confirmation follow-ups (Template 06)
- Per-incident as needed: delay (Template 07), quality issue (Template 08), refund (Template 09)
- Concept-only stretch goals that did not unlock get a one-time honest acknowledgment (Template 10)
- Per-backer fulfillment-complete confirmation when their final reward ships (Template 11)
- Day +365: one-year anniversary thank-you (Template 12)

## Templates included

1. **Day-1 Thank-You** plus survey link -- `templates/01_day_one_thank_you.md`
2. **Address Survey Reminder** -- `templates/02_address_survey_reminder.md`
3. **Monthly Manufacturing Update** -- `templates/03_monthly_manufacturing_update.md`
4. **Stretch Goal Unlock Announcement** -- `templates/04_stretch_goal_unlock.md`
5. **Shipping Notification** (batch-level) -- `templates/05_shipping_notification.md`
6. **Delivery Confirmation Follow-up** -- `templates/06_delivery_followup.md`
7. **Delay Communication** (proactive) -- `templates/07_delay_communication.md`
8. **Quality Issue Communication** (proactive recall / replacement) -- `templates/08_quality_issue_recall.md`
9. **Refund Acknowledgment** -- `templates/09_refund_acknowledgment.md`
10. **Sorry-not-shipping** (concept stretch goals) -- `templates/10_concept_stretch_not_shipping.md`
11. **Fulfillment Complete** (your reward shipped) -- `templates/11_fulfillment_complete.md`
12. **One-Year Anniversary Thank-You** -- `templates/12_one_year_anniversary.md`

## Cross-references

- Decision tree for which template to send and when: `COMMS_PLAYBOOK.md`
- Carton-to-doorstep fulfillment process: `SHIPPING_PROCESS.md`
- High-stakes crisis comms (>30% units affected, supply-chain disruption, regulatory or investor events): `CRISIS_COMMS.md`
- Reward catalog source of truth: `docs/REWARDS_MATRIX.md`
- Stretch goal ladder: `content/launch/STRETCH_GOALS.md`
- Per-reward fulfillment pipeline schema: `ttracx/thox-kickstarter-integration` `app/kickstarter/rewards.py`

## Voice rules (applied to every template)

- First person from Tommy. Craig is co-signed on shipping notifications, quality issues, and the anniversary note.
- Honest about what slipped, what was wrong, and what changed. No softening language.
- Plain language. If a backer needs a glossary to read the email, the email is wrong.
- No em-dashes. Use commas, periods, or parentheses. Hyphens for compound modifiers are fine.
- No emojis.
- No marketing words: "thrilled," "delighted," "amazing," "groundbreaking," "revolutionary," "world-class."
- Avoid passive voice when explaining a failure. If we made a mistake, say "we did X" not "X happened."
- Dollar figures appear only when transactional (refund amounts). Do not put fundraising totals or stretch-goal dollar figures in routine updates.
- Dates are absolute (e.g., "Sep 15, 2026") not relative ("next month") when communicating a commitment.
- No fabricated certainty about future ship dates. Always frame ship windows as intent, not contract.

## Token reference (Jinja-friendly)

These tokens are populated by BackerKit on send. Defaults are graceful fallbacks if the field is missing.

- `{{ backer.first_name }}` -> first name, defaults to "there"
- `{{ backer.id }}` -> internal backer ID, used in survey and dashboard links
- `{{ backer.email_local }}` -> email local-part, fallback for first_name
- `{{ reward.name }}` -> human reward name, e.g. "ThoxMini"
- `{{ reward.sku }}` -> internal SKU, e.g. "thoxmini"
- `{{ reward.tier_label }}` -> backer-facing tier label, e.g. "Backer ThoxMini"
- `{{ reward.shipping_window }}` -> e.g. "Q2 2027"
- `{{ shipment.batch_number }}` -> e.g. "B-007"
- `{{ shipment.carrier }}` -> e.g. "FedEx"
- `{{ shipment.tracking_number }}` -> carrier tracking number
- `{{ shipment.tracking_url }}` -> per-carrier tracking deep link
- `{{ shipment.expected_delivery_date }}` -> absolute date string
- `{{ delay.reason }}` -> short, honest reason string
- `{{ delay.previous_eta }}` -> absolute date string of prior ETA
- `{{ delay.new_eta }}` -> absolute date string of new ETA
- `{{ quality.issue }}` -> short description of the defect
- `{{ quality.affected_pct }}` -> e.g. "3.4%"
- `{{ quality.remediation }}` -> "replacement," "field fix," "in-place firmware update," etc.
- `{{ refund.amount_usd }}` -> dollar amount (number, not string)
- `{{ refund.reason }}` -> short reason string
- `{{ refund.processor }}` -> "Stripe" or "Kickstarter"
- `{{ stretch.name }}` -> e.g. "ThoxArm"
- `{{ unsubscribe_token }}` -> BackerKit per-recipient unsubscribe token

## Approval gate

Templates 01, 02, 03, 04, 05, 06, 11, 12 can be sent by the ops team without per-send approval, once the template body has been reviewed and signed off by Tommy and Craig.

Templates 07, 08, 09, 10 require per-send sign-off from Tommy AND Craig before going to the list. These are templates that carry trust-eroding content: delays, recalls, refunds, and reduced-promise acknowledgments. They get a human read every time.

Crisis-tier comms (anything in `CRISIS_COMMS.md`) require Tommy AND Craig, AND escalation per that doc.
