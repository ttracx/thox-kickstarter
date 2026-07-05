# THOX Kickstarter social campaign

The complete social-media playbook for the Aug 2026 unified Kickstarter
launch. Phase-by-phase post sets, per-platform formatting specs, the
90-day master calendar, and the link-out to the prompt library that
generates the assets.

## Structure

```
social/
├── README.md                    this file (master index)
├── CALENDAR.md                  90-day cross-platform posting calendar
├── PLATFORMS.md                 per-platform spec (dimensions, character limits, asset list)
└── posts/                       per-post specs grouped by phase
    ├── _TEMPLATE_brief.md       brief template (copy this for new posts)
    ├── 00-pre-launch/           T-90 to T-1 days, building the email list
    ├── 01-launch-day/           T+0 (Aug 12 2026, 9am PT go-live)
    ├── 02-week-1/               T+1 to T+7 (momentum + first stretch unlock)
    ├── 03-mid-campaign/         T+8 to T+21 (sustained drumbeat)
    ├── 04-stretch/              T+22 to T+28 (stretch goal pushes)
    ├── 05-final-48h/            T+28 to T+30 (closeout urgency)
    └── 06-post-funding/         T+31 onward (fulfillment trust, BackerKit pivot)
```

## The phases at a glance

| Phase | Window | Goal | Post cadence | Tone |
|---|---|---|---|---|
| Pre-launch | T-90 to T-1 | 10K email signups, 5K pre-launch followers | 3/week per platform | Curious, technical-leaning |
| Launch day | T+0 (Aug 12 2026) | First $50K in 24h | 8 posts across all platforms in 24h | Bold, time-stamped, transparent |
| Week 1 | T+1 to T+7 | Cross $100K, unlock first stretch | 1-2/day per platform | Momentum, social proof |
| Mid-campaign | T+8 to T+21 | Sustain $5K/day baseline | 1/day per platform | Drumbeat, deep-dives |
| Stretch | T+22 to T+28 | Unlock $1M to $2M tier | 2/day per platform | Push, exclusivity |
| Final 48h | T+28 to T+30 | Last-72h surge to ceiling | 4/day per platform | Urgency, last-call |
| Post-funding | T+31 onward | BackerKit pivot, retention | 3/week per platform | Trust, transparency, build logs |

## Per-platform priorities

Detailed specs in [PLATFORMS.md](PLATFORMS.md). Quick lookup:

| Platform | Primary phase | Asset emphasis | Why |
|---|---|---|---|
| X (Twitter) | Launch day + Final 48h | 1:1 video + concise text | Real-time discovery + countdown |
| Instagram Reels | Mid-campaign + Stretch | 9:16 video + carousels | Lifestyle visualization, share-ability |
| TikTok | Pre-launch + Stretch | 9:16 raw / lo-fi video | Discovery via algorithm, gen-Z reach |
| LinkedIn | Pre-launch + Post-funding | 4:5 carousel + landscape video | B2B / dev / engineering audience |
| YouTube | Launch day + Stretch unlocks | 16:9 long-form + Shorts | SEO + deep-dive viewers |
| Reddit | Pre-launch + Mid-campaign | Native text post + 1 hero image | Subreddit-specific authentic engagement |
| Threads | Mid-campaign + Final 48h | 4:5 image + short text | Cross-post from IG, low effort |

## How to instantiate a new post

1. Copy `posts/_TEMPLATE_brief.md` to the appropriate phase
   directory with a date-prefixed ID:
   `posts/01-launch-day/2026-08-12-09am-launch-tweet.md`.
2. Fill the brief (intent, hero device, platform, caption, alt text).
3. Generate the assets via the prompts pipeline at
   [../prompts/PIPELINE.md](../prompts/PIPELINE.md). Assets land in
   `../assets/social/<platform>/<post-id>/`.
4. Cross-link the brief to the asset directory.
5. Schedule via the cadence in [CALENDAR.md](CALENDAR.md).

## Posting tools

Recommended tooling (not required; the workflow works with raw
platform schedulers too):

- **Buffer** or **Later** for IG + LinkedIn + Threads scheduling.
- **TweetDeck** (X's native) for X scheduling and real-time
  monitoring.
- **TikTok Studio** for TikTok scheduling and analytics.
- **YouTube Studio** for YT video uploads.
- **Reddit**: post manually at the optimal time per subreddit
  (RedditList shows the local-time peak). Do not schedule via API to
  avoid spam flags.

## Acceptance gate per post

Before any post goes live, verify:

- [ ] Caption is under the platform's character limit.
- [ ] Hashtags are platform-appropriate (X: 2 max; IG: up to 30 but
      aim for 8-12 in caption + 12 in first comment; LinkedIn: 3-5;
      TikTok: 3-5).
- [ ] Emoji usage matches the platform's audience (heavy on TikTok /
      IG, light on LinkedIn, none on press kit).
- [ ] Alt text is present and descriptive.
- [ ] UTM link tracking is appended: `?utm_source=<platform>&utm_medium=social&utm_campaign=ks-launch-2026&utm_content=<post-id>`.
- [ ] The Kickstarter URL is the canonical short link
      `kickstarter.com/projects/thox-ai/thox-unified-2026` (do NOT
      use bit.ly or any redirector; backers don't trust them).
- [ ] Asset directory contains all required files per the naming
      convention in [../prompts/PIPELINE.md](../prompts/PIPELINE.md).
- [ ] Caption uses no em-dashes.

## Crisis posting

If something goes wrong publicly (a stretch goal misses by 5 percent,
a manufacturing delay leaks, a press hit turns negative), pause the
scheduled queue immediately and follow
[../runbooks/07-crisis-response.md](../runbooks/07-crisis-response.md).

## Audit trail

Every post that goes live updates a row in `social/POSTING_LOG.csv`
(create at first use; do not version control until post-funding -
contains URLs and analytics handles). Columns: `post_id, platform,
scheduled_at, live_at, impressions_24h, clicks_24h, backer_attribution`.
