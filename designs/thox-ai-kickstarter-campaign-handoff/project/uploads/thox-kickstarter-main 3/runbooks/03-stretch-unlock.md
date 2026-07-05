# Runbook 03: Stretch goal unlock

Triggered by any stretch goal threshold crossing. Per
`../docs/STRETCH_GOALS.md`, thresholds are at $250K, $500K, $1M, $2M,
$3M. Each unlock is a coordinated multi-platform celebration that
must publish within 5 minutes of the threshold crossing.

## Pre-staging (do this T-7 days before the expected crossing)

For each anticipated stretch threshold:

1. Generate the typographic unlock graphic per
   `../prompts/openai/IMAGE_TEMPLATES.md` section #8. Save at
   `../assets/social/_stretch/$Xk_unlock_1x1.png`,
   `_4x5.png`, `_9x16.png`.
2. Generate the corresponding looping video per
   `../prompts/grok/VIDEO_TEMPLATES.md` section #6 (surface-activity
   loop on the typographic graphic, numerals pulse 0.5 Hz).
3. Pre-write the captions per
   `../social/posts/04-stretch/2026-09-04-stretch-1m-unlock.md`
   structure for each threshold. Adjust the unlock name + description
   per the stretch sheet.
4. Stage in Buffer / TweetDeck as drafts (not scheduled). The
   trigger is manual.

## Trigger detection

Operations monitors the Kickstarter live pledge counter via the
creator dashboard. The Looker / Plausible UTM dashboard supplements
with conversion-rate views.

Set a soft trigger 1% before the threshold and a hard trigger AT the
threshold:

| Threshold | Soft trigger | Hard trigger |
|---|---|---|
| $250K | $247,500 | $250,000 |
| $500K | $495,000 | $500,000 |
| $1M | $990,000 | $1,000,000 |
| $2M | $1,980,000 | $2,000,000 |
| $3M | $2,970,000 | $3,000,000 |

At the **soft trigger**:
- Slack `#ks-ops`: "Approaching $1M unlock. All schedulers stand by."
- Confirm the pre-staged assets are still current (no last-minute
  unlock-name changes).
- Confirm the brief at `../social/posts/04-stretch/` for this
  threshold is current.
- Community manager opens all 7 platforms for live posting.
- Campaign owner refreshes the Kickstarter creator dashboard at 1-min
  intervals.

At the **hard trigger** (the moment the counter crosses):

## T+0 unlock (T+0 = unlock moment, not campaign launch)

### Within 0-5 minutes

- [ ] Campaign owner posts in `#ks-ops`: "UNLOCK HIT. $1M crossed at
      14:23 PT. Schedulers go."
- [ ] Content producer publishes on all 7 platforms simultaneously
      via the multi-tab Buffer / TweetDeck workflow. Use the briefs
      and captions from
      `../social/posts/04-stretch/<unlock-id>.md`.
- [ ] Community manager mutes reply notifications for 60 seconds to
      avoid the alert spike, then re-enables.

### Within 5-30 minutes

- [ ] Reply to every reply / comment / repost on the launch tweet.
      SLA: 5 minutes.
- [ ] Update the Kickstarter project page itself: edit the "STRETCH
      GOALS" section to add a green checkmark and "UNLOCKED!" marker
      next to the threshold.
- [ ] Email blast: send the "Stretch unlocked!" email to the backer
      list (template:
      `../templates/stretch-unlock-update.md`).
- [ ] Press: send a 2-sentence email to the press list confirming
      the unlock. Most outlets will not write about it, but the 1-2
      that do drive the next-tier velocity.

### Within 1-4 hours

- [ ] Live-update the "thermometer" graphic with the post-unlock
      number. Post on X and IG Stories.
- [ ] If the unlock is a major one ($1M+), record a 60-second founder
      thank-you video on a phone (not via the AI pipeline; this is
      the "raw and grateful" moment that backers reward). Post on IG
      Reel + TikTok + YouTube Short within 4 hours.
- [ ] Begin pre-staging the NEXT unlock at the soft trigger threshold.

## Reverse case: a stretch is not pacing

If by T+25 the campaign is pacing under the next stretch threshold
and momentum is flat:

- [ ] Crisis-lead reviews the gap. Is it 5%? Recoverable. Is it 25%?
      Tier was overambitious; consider revising the stretch goals (with
      Kickstarter rep approval).
- [ ] If recoverable: increase posting cadence to 2x/day for 3 days.
      Lean on the "X to go until $Yk unlock" framing across X + IG
      Stories. Push paid ads on the underperforming platform.
- [ ] If not recoverable: own the gap publicly. Backers respect
      honesty. Post an honest update: "$2M is in reach if we close
      strong, but $3M is unlikely. Here's what we'll still deliver."
      This is better than silently missing.

## Per-threshold gotchas

| Threshold | What to watch |
|---|---|
| $250K | First unlock. Triggers within week 1. Make the celebration big; this is the social-proof signal that the campaign is going to happen. |
| $500K | Mid-week-2. Easy to undercelebrate. Don't. |
| $1M | High-emotion moment. Lean into it. The "$1M club" framing converts fence-sitters. |
| $2M | Late campaign. Backers are mostly committed by now; the unlock matters for retention and BackerKit add-on conversion more than for new backers. |
| $3M | Stretch ceiling. If you cross it, post the "We did it" content from a pre-staged celebration. Then add a soft "we'll keep stretching but only if it makes sense for fulfillment" framing. Do NOT add stretch tiers beyond $3M mid-campaign; you committed to a fulfillment timeline at this ceiling. |

## Handoff

After the unlock celebration runs its 4-hour cycle, return to the
phase you were in (mid-campaign or stretch or final-48h). Re-arm the
next pre-staged unlock if applicable.
