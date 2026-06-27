# Quick Launch Runbook

This is the operator runbook for taking the THOX.ai Kickstarter from repo-ready to live campaign.

## Command center

| Lane | Owner | Backup | Source files |
|---|---|---|---|
| Business, story, backer trust | Craig Ross, CEO | Tommy Xaypanya | `docs/KICKSTARTER_PAGE_COPY.md`, `docs/CAMPAIGN_INFO.md` |
| Technical demo, security, validation | Tommy Xaypanya, CTO | Craig Ross | `docs/VIDEO_WALKTHROUGH_SCRIPT.md`, `SECURITY.md` |
| Rewards and pledge economics | Craig + Tommy | Finance operator | `docs/REWARDS_MATRIX.md`, `examples/reward-tier-import.csv` |
| Video and graphics | Campaign producer | Tommy | `docs/VIDEO_SCRIPT.md`, `docs/VIDEO_SCENE_PROMPTS.md` |
| Daily operations | Launch operator | Craig | `docs/LAUNCH_CHECKLIST.md`, `agent_tasks/launch-operator.md` |

## Operating principle

The launch should move as a set of vertical slices:

1. Campaign page can accept pledges.
2. Rewards are priced and configured.
3. Founder video explains why, what, and how.
4. Visual system creates consistent product graphics and motion clips.
5. Technical demo proves the local-first architecture without overclaiming.
6. Backer updates keep trust high after launch.

## T-46 to T-30: quick-launch foundation

| Status | Task | Owner | Output |
|---|---|---|---|
| [ ] | Lock product lineup: ThoxKey, ThoxMini Air, ThoxMini, ThoxClip | Craig | `docs/CAMPAIGN_INFO.md` final |
| [ ] | Lock retail and Kickstarter pricing | Craig | `docs/REWARDS_MATRIX.md` final |
| [ ] | Run `python3 scripts/validate_campaign.py` | Tommy | Validator passes |
| [ ] | Generate first hero image from scene prompts | Producer | `assets/hero/thox-family-16x9.png` |
| [ ] | Generate four device card images | Producer | `assets/devices/*.png` |
| [ ] | Record draft walkthrough using `docs/VIDEO_WALKTHROUGH_SCRIPT.md` | Tommy + Craig | Rough-cut review video |
| [ ] | Assemble Kickstarter draft page | Launch operator | Internal preview URL |

## T-29 to T-14: page and video lock

| Status | Task | Owner | Output |
|---|---|---|---|
| [ ] | Upload final hero image | Producer | Kickstarter draft hero |
| [ ] | Paste Story page copy | Launch operator | Kickstarter draft Story |
| [ ] | Configure all reward tiers | Launch operator | Rewards preview approved |
| [ ] | Configure shipping estimate notes | Launch operator | Shipping section approved |
| [ ] | Record founder intro and mission sections | Craig | Video clips 01 and 02 |
| [ ] | Record technical walkthrough | Tommy | Video clip 07 |
| [ ] | Generate image-to-video clips from approved graphics | Producer | Motion clips 01, 03, 05, 06 |
| [ ] | Edit 2:30 hero video | Editor | Rough cut |
| [ ] | Review for claim safety | Craig + Tommy | Claim-safety notes resolved |

## T-13 to T-7: proof and trust

| Status | Task | Owner | Output |
|---|---|---|---|
| [ ] | Mobile preview of Kickstarter page | Launch operator | iOS + Android screenshots |
| [ ] | Verify no old device names appear in canonical docs | Tommy | Validator passes |
| [ ] | Prepare press one-liner and founder bios | Craig | Press snippets ready |
| [ ] | Draft first three Kickstarter Updates | Launch operator | Day 0, T+2, T+7 drafts |
| [ ] | Export final video master | Editor | 1080p MP4 |
| [ ] | Backer support inbox routing | Launch operator | Response SLA live |
| [ ] | Final runbook rehearsal | Craig + Tommy | Go/no-go notes |

## T-6 to T-1: launch lock

| Status | Task | Owner | Output |
|---|---|---|---|
| [ ] | Freeze copy and pricing | Craig | No more uncontrolled edits |
| [ ] | Freeze reward tier names | Launch operator | BackerKit mapping ready |
| [ ] | Validate payment setup in Kickstarter | Craig | Verification complete |
| [ ] | Upload final video | Launch operator | Video encoded |
| [ ] | Publish pre-launch reminder | Craig | Email + social |
| [ ] | Load 24-hour launch schedule | Launch operator | Calendar events |
| [ ] | Sleep and protect founder energy | Everyone | No all-night edits |

## T-0: launch day

| Time PT | Task | Owner |
|---|---|---|
| 08:00 | Final preview on desktop and mobile | Launch operator |
| 08:20 | Run campaign validator from branch | Tommy |
| 08:30 | Founder standup: goal, risks, comments owner, update owner | Craig |
| 08:55 | Final Kickstarter draft reload | Launch operator |
| 09:00 | Click Launch | Craig |
| 09:05 | Verify public page in incognito browser | Launch operator |
| 09:10 | Publish LinkedIn, X, YouTube Community, Discord, email | Launch operator |
| 09:30 | Craig replies to first public comments | Craig |
| 10:00 | Tommy posts technical walkthrough clip | Tommy |
| 12:00 | Post first Kickstarter Update: We are live | Launch operator |
| 17:00 | Metrics review: pledges, conversion, comments, refunds, traffic | Craig + Tommy |
| 21:00 | Day-1 recap post | Craig |

## T+1 to T+7: early trust loop

| Day | Task | Owner |
|---|---|---|
| T+1 | Reply to all launch-day comments | Craig |
| T+2 | Post build update focused on ThoxKey | Tommy |
| T+3 | Post reward-tier reminder and early-bird remaining counts | Launch operator |
| T+4 | Publish short technical demo clip | Tommy |
| T+5 | Review pledge mix and adjust ad spend, not reward prices | Craig |
| T+6 | Post ThoxMini Air / ThoxMini architecture update | Tommy |
| T+7 | Weekly update with what shipped, what changed, what is next | Craig |

## Crisis response

| Severity | Example | Response window | Owner | Action |
|---|---|---:|---|---|
| P0 | Payment disabled, campaign page broken, security issue | 30 minutes | Craig + Tommy | Stop promotion, acknowledge, fix, update |
| P1 | Major pricing typo, wrong reward description, false claim | 1 hour | Craig | Correct page, post transparent note |
| P2 | Shipping confusion, backer misunderstanding | 4 hours | Launch operator | Reply with FAQ and update docs |
| P3 | Repeated non-actionable noise | 24 hours | Launch operator | Reply once or ignore per moderation policy |

## Daily metrics

Track these every day at 5:00 PM PT:

- total pledged
- percent funded
- backer count
- average pledge
- top reward tier
- early-bird remaining counts
- comments open over 24 hours
- refunds or failed payments
- top traffic source
- most common question

## End-of-day update format

```md
# Daily Campaign Log: YYYY-MM-DD

## Numbers
- Pledged:
- Backers:
- Average pledge:
- Percent funded:

## What worked

## What broke

## Backer questions to answer publicly

## Next 24 hours

## Owner assignments
```
