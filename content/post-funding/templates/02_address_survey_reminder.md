# Template 02: Address Survey Reminder

**Subject**: Five minutes: we still need your shipping address
**Alt subject (A/B)**: Quick reminder: backer survey closes soon
**Preview text**: We cannot ship to you until you complete the survey.

**Trigger**: backer has not completed the survey. Send on Day +14, Day +30, Day +45, Day +59 (final). Stop sending once the survey is complete or after the Day +59 final reminder.

**Send window**: 09:00 PT on the trigger day. One send per trigger.

**Transactional**: Yes. Ignore unsubscribe flag.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ reward.tier_label }}`
- `{{ backer.id }}`
- `{{ reminder_number }}` -> 1, 2, 3, or 4 (used in subject prefix on reminders 3 and 4 only)
- `{{ days_until_close }}` -> integer countdown to Day +60 close

---

**Body (Day +14, first reminder)**:

> Hi {{ backer.first_name }},
>
> Quick one. We have your pledge for the {{ reward.tier_label }} but we do not have your shipping address yet.
>
> The backer survey takes about five minutes and covers:
>
> - Shipping address and country
> - Reward configuration (color, accessories, add-ons where applicable)
> - Email preferences for future updates
>
> The survey window closes Day +60 from funding close. After that, address changes require a direct reply to this email and may delay your shipment by up to one batch.
>
> **Complete your survey**: https://thox.ai/backer/survey?b={{ backer.id }}
>
> If something on the survey is unclear or broken, reply directly. It comes to me.
>
> Tommy

**Body variant (Day +59, final reminder)**:

> Hi {{ backer.first_name }},
>
> Last reminder. The backer survey for your {{ reward.tier_label }} closes in {{ days_until_close }} day. After tomorrow, you will need to reply to this email directly with your shipping address, which may push your shipment to a later batch.
>
> **Complete your survey now**: https://thox.ai/backer/survey?b={{ backer.id }}
>
> Tommy

**Footer**: standard transactional footer.

---

## Notes

**When to use**: only for backers who have not completed the survey. The send list is generated from the BackerKit survey-status field. Suppress backers with survey_status = complete.

**When NOT to use**: do not send to backers who have already completed the survey. Do not send more than four reminders total. Do not send after Day +60.

**Escalation criteria**: backers who have still not responded by Day +60 get handed off to the ops team for individual outreach via a reply-to-this-email exchange. Do not auto-send Template 02 after Day +60.

**Tone calibration**: keep this one short. It is a reminder, not a sales pitch. Backers who delay are usually busy, not hostile. Do not guilt-trip.

**Suppression rule**: backers who explicitly reply "I changed my mind, please refund" get suppressed from Template 02 and routed to Template 09 (refund acknowledgment) by the ops team.
