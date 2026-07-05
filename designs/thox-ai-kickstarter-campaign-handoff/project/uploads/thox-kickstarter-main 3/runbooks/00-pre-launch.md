# Runbook 00: Pre-launch (T-90 to T-1)

The 12-week pre-launch window. Goal: 10K email signups + 5K
pre-launch followers per primary platform (X, IG, TikTok). Foundation:
asset stocking, infrastructure setup, list building.

## T-90 (Mon May 13 2026): kickoff week

Day 1 (Mon):
- [ ] Confirm Aug 12 2026 launch date with the Kickstarter sales rep
      (Kickstarter Pro accounts get launch-date support; activate this).
- [ ] Assign all roles from [README.md](README.md) "Roles" table.
      Document in `../docs/BACKER_COMMS.md`.
- [ ] Activate `kickstarter.com/projects/thox-ai/thox-unified-2026`
      as a pre-launch page (Kickstarter supports pre-launch pages with
      email capture).
- [ ] Activate `thox.ai/launch` as the email-capture landing page.
      Wire to Klaviyo / Mailchimp / SES (whatever the team uses).
- [ ] Activate the brand handles on all 7 platforms if not already
      live. Profile pic, bio, banner from the asset library.
- [ ] Cross-link bios: every platform's bio links to thox.ai/launch.

Day 2 (Tue):
- [ ] Stand up the Slack `#ks-ops` channel. Invite all roles.
- [ ] Stand up the Notion editorial calendar from the template at
      [../social/CALENDAR.md](../social/CALENDAR.md).
- [ ] Create the UTM tracking dashboard (Looker Studio or Plausible).
      Confirm the UTM convention from
      [../social/PLATFORMS.md](../social/PLATFORMS.md) is applied.

Day 3 (Wed):
- [ ] Asset stocking begins. Generate the first 12 pre-launch hero
      stills via the OpenAI pipeline (one per device per week, 3
      weeks ahead).
- [ ] Loop generation: 12 corresponding 4-second video loops via the
      Grok pipeline.
- [ ] Filed in `../assets/social/<platform>/<post-id>/` per the
      pipeline naming convention.

Day 4 (Thu) and Day 5 (Fri):
- [ ] Draft the next 4 weeks of post briefs in
      `../social/posts/00-pre-launch/` using the brief template.
- [ ] Schedule the first 2 weeks of posts in Buffer / TweetDeck /
      TikTok Studio.
- [ ] First go-live: schedule the kickoff "Why we built this" post
      for Mon T-86 (May 19) at 9am PT per the worked example at
      `../social/posts/00-pre-launch/2026-05-13-mon-why-localfirst-thread.md`.

## T-89 to T-30 (weekly cadence)

Each week, repeat the weekly drumbeat from
[../social/CALENDAR.md](../social/CALENDAR.md) "Phase 0":

- Mon morning: produce next week's assets (full day)
- Tue: schedule next week's posts (half day) + reply window
- Wed-Fri: post + 30-min daily reply window
- Sat-Sun: light coverage

Asset production is the biggest weekly cost. Batch it: generate all
21 stills + 21 loops for next week in one Monday session, rather
than ad-hoc daily.

## T-29 to T-15: press + influencer outreach

- [ ] Press kit final: `../docs/PRESS_KIT.md` updated with the launch
      date, hero shots, and embargo terms.
- [ ] Embargoed press hits: contact 20 target outlets with the
      embargoed press kit. Embargo lifts at 9am PT on launch day.
      Outlets: TechCrunch, The Verge, Engadget, Wired, IEEE Spectrum,
      Hackaday, Tom's Hardware, ArsTechnica, MacRumors (for the
      iPhone-adjacent ThoxClip story), 9to5Mac, etc.
- [ ] Influencer outreach: 30 target creators across YouTube + TikTok
      + X. Offer: free pre-launch ThoxClip review unit (will ship
      pre-launch; risk this against the cost of unreviewed launches).
      Track: who agreed, what aspect ratio they prefer, what date
      they'll post.

## T-14 to T-7: rehearsal + spike testing

- [ ] Full launch-day rehearsal. Walk through the launch-day choreography
      from [01-launch-week.md](01-launch-week.md) with the team. Time
      the 5-minute window between the 9am tweet and the IG Stories
      sticker; if it slips past 5 minutes, the choreography needs
      tightening.
- [ ] Asset spike test: pre-render 5x the daily asset volume to ensure
      the team can sustain the launch-day cadence.
- [ ] Reply spike test: in a private staging chat, simulate 100 incoming
      comments and time the team's reply throughput. Target: 15 min
      backlog max during launch week.
- [ ] Kickstarter dashboard rehearsal: the campaign owner spends 30
      min in the Kickstarter creator dashboard sandbox. Confirm the
      "live pledge counter" position; this is what drives the
      stretch-unlock trigger logic in
      [03-stretch-unlock.md](03-stretch-unlock.md).

## T-6 to T-1: lockdown + warm-up

- [ ] **No content changes after T-6** without crisis-lead approval.
      The campaign owner has the final word on any last-minute pivot.
- [ ] T-3: send the "We launch in 3 days" email to the launch list
      (template: `../templates/pre-launch-email.md`).
- [ ] T-2: post the final-call pre-launch teaser on all 7 platforms.
- [ ] T-1: post the "Tomorrow at 9am PT" teaser on all 7 platforms.
      Pin the X version. Pin the IG Reel. YouTube premieres the hero
      video at 9am PT tomorrow (schedule today).
- [ ] T-1 evening: full team standup. Confirm everyone's on at 8:30am
      PT for the launch standup. Coffee. Sleep.

## Pre-launch acceptance gate (T-1)

If any of these are not green at T-1, escalate to crisis-lead:

- [ ] 10K+ email signups on `thox.ai/launch`
- [ ] 5K+ followers each on X, IG, TikTok
- [ ] 2K+ followers each on LinkedIn, YouTube
- [ ] Kickstarter pre-launch page active with 1000+ "Notify me on
      launch" signups
- [ ] All launch-day posts scheduled in Buffer / TweetDeck (10
      scheduled across 7 platforms for T+0)
- [ ] All launch-week posts (T+1 to T+7) drafted in briefs and
      assets generated
- [ ] Asset library has 21 days of next-day backup content in case
      production falls behind
- [ ] 5+ confirmed influencer launch-day posts in the calendar
- [ ] 3+ confirmed embargoed press hits going live at 9am PT
- [ ] Crisis-lead reachable for the full 30-day campaign window

## What can go wrong here

| Failure mode | Recovery |
|---|---|
| Email list under 5K at T-30 | Increase paid ad spend on platforms; shift more pre-launch posts to TikTok (highest organic reach) |
| Asset production slipping | Cut Reddit posts (lowest ROI for asset-cost); cut founder talking-head posts (they require real photo + edit time) |
| Influencer no-shows | Backfill with bigger paid placement at launch |
| Kickstarter page not approved | This is a hard blocker. Escalate to Kickstarter rep immediately. If the page is rejected for policy reasons, the campaign cannot launch on time |
| Brand voice drift across team | Re-circulate `../prompts/openai/SYSTEM_PROMPT.md` "Never produce" list; pin the brand voice doc in the Notion editorial calendar |

## Handoff to launch week

At T-1 23:59 PT, transition control to [01-launch-week.md](01-launch-week.md).
The campaign owner takes the launch-day baton; the content producer
takes asset-regeneration; the community manager takes the reply
queue.
