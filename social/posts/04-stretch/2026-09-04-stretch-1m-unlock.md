# Stretch goal worked example: $1M unlock announcement (all platforms)

Phase: stretch. Date: 2026-09-04 (T+23, depends on actual pacing).
Theme: announcing the $1M stretch unlock. Highest-velocity moment of
the mid-to-late campaign. ALL platforms post within 5 minutes of each
other at the unlock minute.

## Identity

- **Post ID**: `2026-09-04-stretch-1m-unlock`
- **Phase**: stretch
- **Platform(s)**: all (x, instagram, tiktok, linkedin, youtube, threads). Reddit gets a separate, less salesy version.
- **Date / time (PT)**: dynamic; posts at the minute the campaign
  crosses $1,000,000 funded. Brief is pre-staged; the schedule trigger
  is manual on detection.
- **Authored by**: shared
- **Status**: ready-to-publish (paused, awaiting trigger)

## Intent

Celebration + momentum push. The unlock is social proof at maximum
volume. Secondary: bring fence-sitters off the fence ("they hit $1M;
this is happening").

## Hero device

The stretch unlock graphic (typographic; not a device shot). The
unlock at $1M is "All backers get a free MagStack pogo cable" per
`docs/STRETCH_GOALS.md`. Verify against the live stretch sheet at
publish time.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | `_03_unlock_1x1.png` (typographic unlock graphic) + a 4-tweet thread |
| instagram | 1:1 | `_03_unlock_1x1.png` Reel cover + 9:16 video version |
| instagram | Stories | 9:16 unlock sticker + countdown to next tier |
| tiktok | 9:16 | 9:16 unlock video |
| linkedin | 4:5 | 4:5 unlock graphic + text post |
| youtube | 9:16 | 9:16 unlock video as a Short |
| threads | 1:1 | reuse IG 1:1 |

## Prompts

- **OpenAI image template**: section #8 (stretch-goal unlock graphic),
  with slots filled:
  - `{unlock_amount}`: "$1,000,000"
  - `{unlock_name}`: "MagStack Pogo Cable"
  - `{unlock_description}`: "Free with every pledge above $39"
- **Grok video template**: section #6 (surface-activity loop), camera
  locked on the unlock graphic, with the dollar amount text glowing
  emerald sinusoidally at 0.5 Hz.

## Filled OpenAI prompt (typographic unlock 1:1)

```
Flat vector unlock celebration graphic.

Background: deep navy #0a0e14 with a subtle radial vignette emerald
#10b981 (5 percent opacity) emanating from center.

Center element: the unlock amount "$1,000,000" in emerald #10b981,
IBM Plex Sans Bold 180 px, centered both axes.

Above the amount: "UNLOCKED" in white IBM Plex Sans Bold 48 px,
letter-spacing 0.2 em, centered.

Below the amount: "MagStack Pogo Cable" in white IBM Plex Sans
Medium 56 px, centered, plus a one-line description "Free with every
pledge above $39" in slate #475569 IBM Plex Sans Regular 32 px on
the next line.

Top-right corner: small THOX logomark, 80 x 80 px, 5 percent margin.

Decorative element: thin emerald line border 4 px, inset 24 px from
all edges.

No emojis. No confetti graphics. No gradients on text. Sharp
typography throughout. Vector style, flat. 1080 x 1080 px.
```

## Caption: X (280 chars)

```
🟢 $1,000,000 UNLOCKED.

Every THOX backer above $39 now gets a free MagStack pogo cable.

This is the chain link that turns 8 ThoxClips into one cluster.

Stretch live: kickstarter.com/projects/thox-ai/thox-unified-2026

Next milestone → $1.5M. Let's keep stacking.
```

## Caption: Instagram (Reel + Feed + Stories)

```
🟢 $1,000,000 unlocked.

Every backer above $39 now gets a free MagStack pogo cable in the
box. This is the chain link that turns 8 ThoxClips into one cluster
- standalone, magnetic, no soldering, no software setup.

Thank you. Genuinely. The campaign hit $1M in 23 days because
people told their people about it.

What unlocks next:
🟣 $1.5M → MagStack Air 8-pack tier
🟣 $2M → Thox Cowork desktop app (private beta access)
🟣 $3M → 12B ThoxLLM v2 (trained on the close)

Keep stacking. 🔗 Link in bio.

📍 thox.ai/launch
.
.
#thoxai #magstack #kickstarter #stretchgoal #localai #ai #unlocked
```

## Caption: TikTok

```
THOX just hit $1M on Kickstarter. 🟢 Free MagStack cable for every
backer. The cluster gets cheaper for everyone, every dollar from
here. 🟣

#thoxai #kickstarter #stretchgoal
```

## Caption: LinkedIn

```
The THOX.ai unified Kickstarter just crossed $1,000,000 in pledges.

Every backer above $39 now receives a free MagStack pogo cable - the
hardware that turns standalone ThoxClips into a magnetic compute
cluster. We added the unlock at the planning stage knowing it would
need community velocity to reach; the community delivered.

Thank you to the 9,000+ backers who have joined this so far.

Next stretch tiers:
- $1.5M unlocks the MagStack Air 8-pack at a single-purchase price
- $2M unlocks private beta access to Thox Cowork (the desktop app)
- $3M trains and ships ThoxLLM 12B v2 with checkpoints during the
  fulfillment window

Back the next milestone:
kickstarter.com/projects/thox-ai/thox-unified-2026

Your AI. Your Data. Your Rules.

#THOXai #engineering #localAI #milestone
```

## Caption: YouTube Shorts

Title: `$1M Unlocked → free MagStack cable for all backers 🟢`

Description: 3-paragraph summary + the next unlock tiers + Kickstarter
link with UTM.

## Alt text

```
A typographic celebration graphic on a dark navy background.
Centered text reads "UNLOCKED" above "$1,000,000" in emerald, then
"MagStack Pogo Cable" with subtitle "Free with every pledge above
$39".
```

## UTM tracking

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-launch-2026&utm_content=2026-09-04-stretch-1m-unlock`

## Trigger logic

This brief is **pre-staged but not auto-scheduled**. The trigger:

1. Operations monitors the Kickstarter live pledge counter.
2. When the funded amount crosses $999,000, post on internal Slack
   `#ks-ops`: "Approaching $1M unlock. All schedulers stand by."
3. At the moment the counter crosses $1,000,000, manually publish
   ALL platforms within 5 minutes. Use a multi-tab Buffer / TweetDeck
   session.
4. Reply to every reply / comment in the first 30 minutes.
5. Generate a fresh "live thermometer" graphic at $1.05M and
   re-post within 24 hours to maintain momentum.

## Acceptance checklist

- [ ] Unlock amount and unlock name match `docs/STRETCH_GOALS.md` AT
      publish time (verify; the doc may have been updated)
- [ ] Typographic graphic is sharp at thumbnail size (legibility check
      at 200 x 200 px)
- [ ] Each platform's caption present and within character limits
- [ ] Emojis: green pip 🟢 for the unlock; magenta dot 🟣 for the next
      stretch tiers (the magenta represents MagStack purple in emoji
      form)
- [ ] No em-dashes
- [ ] Brief committed to repo (the brief was pre-staged days in
      advance; live data verified at publish minute)
- [ ] Asset directory created

## Post-mortem

Fill at T+24h after unlock. Track: 24-hour velocity boost (compared to
the 7-day rolling average), top-replying platform, share count.
