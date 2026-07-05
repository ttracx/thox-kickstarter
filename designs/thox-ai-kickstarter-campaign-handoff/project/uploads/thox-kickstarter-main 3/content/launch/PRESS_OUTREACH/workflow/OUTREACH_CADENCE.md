# OUTREACH_CADENCE.md

When to send what. T-N = days before launch. T-0 = Aug 12, 2026.

For the absolute calendar dates, see `content/launch/MILESTONES.md`.

## Cadence table

| T-N | Date | Action | Tier | Template | Volume |
|---|---|---|---|---|---:|
| T-28 | Jul 15 | Tier-1 initial outreach | 1 | initial_outreach | 5 outlets |
| T-21 | Jul 22 | Tier-1 follow-up + Tier-2 initial | 1, 2 | follow_up_3_day + initial_outreach | 5 + 5 = 10 outlets |
| T-14 | Jul 29 | Tier-3 + Tier-4 initial | 3, 4 | initial_outreach | 4 + 4 = 8 outlets |
| T-10 | Aug 2 | Tier-3 + Tier-4 follow-up; press kit goes live | 3, 4 | follow_up_3_day | 8 outlets |
| T-7 | Aug 5 | Tier-5 + Tier-6 initial; offer embargo lift Aug 5 (now); HN post drafted | 5, 6 | initial_outreach + embargo_offer where appropriate | 6 + 3 = 9 outlets |
| T-5 | Aug 7 | Tier-5 + Tier-6 follow-up | 5, 6 | follow_up_3_day | 9 outlets |
| T-3 | Aug 9 | Local + EDU press (Tier 7 + 8) | 7, 8 | initial_outreach | 4 + 3 = 7 outlets |
| T-1 | Aug 11 | Final reminder to all warm reporters; HN post final draft sanity-check | All | brief reply on the thread | warm only |
| T-0 | Aug 12 | Day-of pitch to all non-responders + Hacker News post + Lobsters submission | All | initial_outreach (day-of variant) + HN post + Lobsters | non-responders + community sites |
| T+1 | Aug 13 | Thank-you notes to reporters who published; check-in to warm-but-unpublished | All | brief reply, no template | published + warm |
| T+3 | Aug 15 | Drop ghosted reporters; archive cold list | All | none, log update only | drops only |

## Volume math (planning, not commitment)

Total cold sends across the campaign: roughly 60-80 emails. Across 34 outlets and 1 community post target, with 1 initial + 1 follow-up per outlet, plus day-of pitches to non-responders.

If the operator engages a PR firm, the firm typically multiplies the outreach surface by their own contact database. Coordinate so the PR firm's outreach uses these templates verbatim (with the firm-supplied reporter names filled in), not parallel pitches that would step on each other.

## Rules

1. **Never send to two reporters at the same outlet in the same week.** Internal triage routes both copies to the same desk anyway, and the duplicate read is bad. If the operator is unsure who covers the beat at a publication, pick one reporter, send, wait 5 business days, then try the other if no reply.
2. **Never bcc reporters.** Each send is one-to-one. Mail merge is fine; bcc on a press blast is not.
3. **Never threaten exclusivity unless the operator is willing to follow through.** "Exclusive to {{ publication }}" is a promise; if the operator pitches another outlet during the exclusive window, the operator burns the relationship.
4. **Never bump more than once.** The bump cadence is one polite 3-day follow-up. After that the reporter is in `ghosted` and outreach stops for this campaign.
5. **Day-of pitches go to non-responders only.** Reporters who already passed do not get re-pitched on launch day. That is badgering.
6. **Hacker News post goes once.** No re-posts, no deletion-and-resubmit, no asking friends to upvote. HN auto-detects manipulation.
7. **Embargo terms are honored.** If a reporter accepts the embargo, the operator does not leak the press kit to anyone outside that agreement.
8. **Founder sign-off matches the conversation.** If Tommy starts the thread, Tommy continues. Do not switch senders mid-thread.

## Cadence overrides

The cadence above is the default. The operator may compress or extend per-outlet based on the reporter's expressed preference. If a reporter says "I am on vacation until Aug 8, ping me then," the operator pings them then; that overrides the cadence above.

## What gets sent on launch day (T-0)

- Day-of pitch (a 4-sentence reply on existing threads to all non-responders): "Launching today at 9am ET. Kickstarter live at {{ kickstarter_url }}. Demo unit and founder availability still on offer. Thank you for the consideration regardless."
- Hacker News post: Show HN per `pitches/tier_2_developer_outlets.md` HN section. Posted at 9am Pacific by Tommy.
- Lobsters submission: same artifact, submitted within 1-2 hours of the HN post by Tommy (if account in good standing) or by an invited Lobsters member.
- Social pre-staged content per `content/launch/SOCIAL_KIT.md` and `social/posts/01-launch-day/` runs on its own schedule.

## Cadence for Tier 5 caveats

Tier 5 outlets (newsletters and podcasts) have a weekly publish cadence that may not align with the T-N table. For each Tier 5 outlet, override the cadence to match the outlet's publish day. Examples:

- Import AI publishes Mondays. Pitch by Wednesday of the prior week for inclusion in the next Monday's edition.
- Last Week in AI publishes Saturdays. Pitch by Wednesday for the next Saturday's edition.
- Latent Space records on a calendar; pitch as an interview offer 21-30 days out.

Update the calendar entry in `JOURNALIST_RELATIONSHIP_LOG.md` with the per-outlet adjusted send dates.
