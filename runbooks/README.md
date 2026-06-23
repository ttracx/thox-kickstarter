# THOX Kickstarter runbooks

Phase-by-phase operator runbooks for the Aug 2026 unified Kickstarter
launch. Each runbook is a self-contained operating procedure: when to
do what, who owns it, what triggers escalation, how to recover.

The runbooks complement the planning artifacts in
[../social/CALENDAR.md](../social/CALENDAR.md) and the asset pipeline
in [../prompts/PIPELINE.md](../prompts/PIPELINE.md). The calendar
plans WHAT to post; the runbooks define HOW to run the operation.

## Files

| Runbook | When to use |
|---|---|
| [00-pre-launch.md](00-pre-launch.md) | T-90 to T-1: list building, asset stocking, infrastructure |
| [01-launch-week.md](01-launch-week.md) | T+0 to T+7: launch day choreography + week-1 momentum |
| [02-mid-campaign.md](02-mid-campaign.md) | T+8 to T+21: sustain the daily drumbeat |
| [03-stretch-unlock.md](03-stretch-unlock.md) | Any stretch goal threshold crossing |
| [04-final-48h.md](04-final-48h.md) | T+28 to T+30: closeout urgency push |
| [05-post-funding.md](05-post-funding.md) | T+31 onward: fulfillment trust + BackerKit pivot |
| [06-daily-content.md](06-daily-content.md) | Daily / weekly: how to produce + schedule content |
| [07-crisis-response.md](07-crisis-response.md) | When something goes wrong publicly |

## Roles (assign before T-90)

| Role | Owner | Backup | Responsibility |
|---|---|---|---|
| Campaign owner | Phamy | Craig | Final word on creative, copy, money decisions |
| Hardware spokesperson | Craig | Phamy | Engineering posts, build logs, technical Q+A |
| Content producer | TBD | (rotating) | Daily asset generation, scheduling, posting |
| Community manager | TBD | TBD | Reply triage, DM triage, moderation across platforms |
| Press liaison | Phamy | TBD | Press kit fulfillment, embargo coordination |
| Crisis lead | Phamy | Craig | Single point of contact when shit hits the fan |
| Analytics owner | Craig | TBD | UTM tracking, conversion reporting, daily numbers |

Assign every role at T-90. Document the assignment in
`../docs/BACKER_COMMS.md` "Roster" section.

## Tooling

| Tool | Use | Owner |
|---|---|---|
| Buffer (or Later) | IG + LinkedIn + Threads scheduling | Content producer |
| TweetDeck | X scheduling + monitoring | Content producer + Community manager |
| TikTok Studio | TikTok scheduling + analytics | Content producer |
| YouTube Studio | YT upload + analytics | Content producer |
| Slack `#ks-ops` | Internal real-time coordination | All |
| Slack `#ks-press` | Press / partner coordination | Press liaison |
| Notion | Live editorial calendar | Content producer |
| Looker Studio (or Plausible) | UTM-tracked conversion dashboard | Analytics owner |
| Kickstarter creator dashboard | Live pledge + backer count | Campaign owner |
| BackerKit | Address confirmation + add-on sales (post-funding) | Campaign owner |

## SLAs

| Action | Target | Hard limit |
|---|---|---|
| Reply to a public comment on launch day | <5 min | <15 min |
| Reply to a public comment in week 1 | <15 min | <1 hour |
| Reply to a public comment in mid-campaign | <1 hour | <4 hours |
| Reply to a public comment in final 48h | <5 min | <15 min |
| Reply to a public DM during the campaign | <1 hour | <4 hours |
| Acknowledge a press inquiry | <30 min during business hours | <12 hours always |
| Respond to a backer complaint | <2 hours | <6 hours |
| Escalate to crisis-lead | immediately on detection | (no hard limit; this is a panic button) |
| Crisis-lead public response | <30 min from escalation | <2 hours |

## Daily / weekly cadence at a glance

Pre-launch (T-90 to T-1):

- **Mon**: produce next week's assets (full day)
- **Tue**: schedule next week's posts (half day) + reply window
- **Wed-Fri**: daily 30-min reply window
- **Sat-Sun**: light coverage (1 reply window/day)

Launch week (T+0 to T+7):

- **Daily**: morning standup 8:30am PT, evening standup 6pm PT
- **Reply windows**: 9am, 12pm, 3pm, 6pm, 9pm (every 3 hours)
- **Asset regeneration**: hourly on launch day, then 4x/day

Mid-campaign (T+8 to T+21):

- **Mon**: produce + schedule the week
- **Daily**: 30-min morning reply window + 30-min evening reply window

Stretch (T+22 to T+28):

- **Daily**: 2x reply windows + hourly monitoring of pledge counter for
  stretch threshold crossings
- **At stretch threshold**: pre-staged unlock brief activates (see
  [03-stretch-unlock.md](03-stretch-unlock.md))

Final 48h (T+28 to T+30):

- **Hourly** posting for the last 6 hours; rotating operator coverage
  to keep replies under 15-min SLA

Post-funding (T+31 onward):

- **Bi-weekly** build-log posts
- **Weekly** backer email update
- **Daily** BackerKit / customer-support reply window
