# Runbook 01: Launch week (T+0 to T+7)

The 8-day window from go-live to end-of-week-1. Goal: cross $100K and
unlock the first stretch ($250K = "All backers get a free THOX logo
coin"). The first 4 hours typically deliver 25% of total campaign
funding; treat them like a moonshot launch.

## T+0 Launch day (Tue Jul 7 2026)

### 8:00am PT - team assembles

- [ ] All-hands video call. Confirm everyone is online and reachable.
- [ ] Campaign owner opens the Kickstarter creator dashboard. Confirms
      the "Launch" button is armed (the dashboard shows a green
      "Ready to launch at 9:00am PT" indicator for Kickstarter Pro
      accounts).
- [ ] Content producer opens Buffer + TweetDeck + TikTok Studio +
      YouTube Studio. Confirms all 8 launch-day posts scheduled per
      [../social/CALENDAR.md](../social/CALENDAR.md) "Phase 1".
- [ ] Community manager opens reply windows on all 7 platforms.
      Mute notifications during the launch tweet posting (will
      re-enable at 9:05am).
- [ ] Press liaison confirms 3+ embargoed press hits are pre-published
      with an embargo timer for 9am PT.
- [ ] Analytics owner opens the Looker / Plausible dashboard.

### 8:30am PT - standup

- [ ] Walk through the choreography one last time.
- [ ] Confirm any last-minute pivots from
      [../runbooks/00-pre-launch.md](00-pre-launch.md) "T-1" gate.
- [ ] Confirm the rotating reply schedule for the day (9-12, 12-3,
      3-6, 6-9 windows).

### 8:55am PT - 5-minute pre-launch

- [ ] Campaign owner: hovers over the "Launch" button.
- [ ] Content producer: opens all 7 platforms with the 9am post draft
      visible.
- [ ] Slack `#ks-ops`: "T-5. Schedulers stand by."

### 9:00:00am PT - GO

- [ ] Campaign owner clicks "Launch" on the Kickstarter creator
      dashboard.
- [ ] Within 30 seconds: content producer publishes the 9am tweet
      per `../social/posts/01-launch-day/2026-08-12-09am-launch-x.md`.
- [ ] Within 90 seconds: IG Stories sticker, Threads cross-post, FB
      post all live.
- [ ] Within 5 minutes: the launch-day choreography from
      [../social/CALENDAR.md](../social/CALENDAR.md) "Phase 1" is
      running on autopilot via scheduled posts.

### 9:00am - 1:00pm PT - the launch surge

- [ ] Community manager triages every reply / comment / DM. Reply
      SLA: 5 minutes. Use the canned snippets at
      `../templates/reply-snippets.md` for FAQ-style replies; custom
      reply to anything that's not FAQ.
- [ ] Campaign owner monitors the Kickstarter creator dashboard.
      Calls out milestones to `#ks-ops` as they happen:
      - First backer: "First backer at 9:02am, $39 ThoxClip early-bird,
        from Texas. Posting thank-you tweet."
      - First $1K: same.
      - First $10K: trigger a celebration post.
      - First $50K: trigger a celebration post + the YouTube hero
        video reaches premiere.
- [ ] Press liaison fields any inbound press inquiries with priority.
      Use the press kit at `../docs/PRESS_KIT.md`. Acknowledge in <30
      min.

### 1:00pm - 6:00pm PT - the rolling drumbeat

- [ ] LinkedIn long-form goes live at 11am (per CALENDAR.md).
- [ ] TikTok + Reels launch video at 12pm.
- [ ] YouTube hero video premieres at 1pm. Pin to channel.
- [ ] Reddit posts go live staggered 3-5pm (one per subreddit, spaced
      30 min apart).
- [ ] Hourly thermometer graphic regenerates with the current funded
      amount (auto-trigger via Looker dashboard alert).

### 6:00pm PT - milestone post

- [ ] Pull the first-day funded amount + backer count.
- [ ] Generate a "Day 1 milestone" graphic via the OpenAI image
      pipeline (typographic, similar to stretch unlock).
- [ ] Post on all 7 platforms.
- [ ] Thank-you tweet to the top 5 highest-engagement repliers (use
      their @ handles).

### 9:00pm PT - end of launch day

- [ ] Final reply window.
- [ ] Pull the 12-hour numbers. Post them to `#ks-ops`.
- [ ] Standup at 9:30pm PT: what worked, what failed, what to adjust
      tomorrow.
- [ ] Schedule tomorrow's posts (the daily template from CALENDAR.md
      "Phase 2").
- [ ] Sleep. The next 30 days are a marathon.

### Launch day acceptance gate

If at 9pm PT the campaign is on track ($50K+ pace toward 24h), green
light. If under $25K, trigger the "Underperform" branch below.

## T+0 underperform branch (only if 9pm < $25K)

If launch day underperforms by 50%+:

- [ ] Crisis-lead pauses scheduled queue.
- [ ] Team huddle (no later than 9:30pm PT).
- [ ] Identify the failure mode: was it reach (low impressions), was
      it conversion (high impressions, low clicks), or was it tier
      selection (lots of $39 ThoxClip backers but no Nova tier
      backers)?
- [ ] Action per failure mode:
   - Low reach: increase paid promotion (X promoted post, IG boosted
     Reel, TikTok ad spike). Budget: $5K from emergency reserve.
   - Low conversion: edit the Kickstarter project page lede. Common
     cause: video doesn't load fast enough; replace with the still
     fallback.
   - Tier selection skew: post a "spotlight" on the underbacked tier
     (typically ThoxNova) the next morning.
- [ ] Re-arm the queue with adjusted content.
- [ ] Continue per [02-mid-campaign.md](02-mid-campaign.md) but with
      heightened cadence.

## T+1 to T+7 (Week 1 daily template)

Each day follows the daily template from
[../social/CALENDAR.md](../social/CALENDAR.md) "Phase 2":

| Time (PT) | Action | Owner |
|---|---|---|
| 8:30am | Morning standup, review overnight numbers, adjust daily plan | All |
| 9:00am | "Good morning" backer-count + thank-you posts | Content producer |
| 11:00am | Reply window | Community manager |
| 12:00pm | Device-feature Reel + TikTok | Content producer |
| 2:00pm | Reply window | Community manager |
| 3:00pm | LinkedIn deep-dive (1x/week) or rotate to other content | Hardware spokesperson (LinkedIn day) or producer |
| 5:00pm | Reply window | Community manager |
| 6:00pm | "Today in numbers" post on X | Content producer |
| 8:00pm | IG Stories "what's in tomorrow" teaser | Content producer |
| 9:30pm | Evening standup, schedule tomorrow's first 2 posts | All |

## $250K first stretch unlock

Expected to hit between T+3 and T+5 depending on launch velocity.
Trigger [03-stretch-unlock.md](03-stretch-unlock.md) when the live
pledge counter crosses $249,000.

## Week-1 acceptance gate (end of T+7)

- [ ] Funded amount ≥ $100K
- [ ] Backer count ≥ 2,000
- [ ] First stretch ($250K) crossed or within 10% of crossing
- [ ] At least 3 press hits live (preferably with photo galleries)
- [ ] Reply backlog under 1 hour (i.e., no comment is older than 1
      hour without a response)
- [ ] No platform suspensions / shadowbans (verify via UTM dashboard;
      if X impressions dropped >50% overnight without explanation,
      this is the symptom)

If any gate is red, escalate to crisis-lead and pivot per
[07-crisis-response.md](07-crisis-response.md).

## Handoff to mid-campaign

At T+7 23:59 PT, transition to [02-mid-campaign.md](02-mid-campaign.md).
Cadence drops from 8 posts/day at launch to 1-2 posts/day in the
mid-campaign phase. The team needs to rest.
