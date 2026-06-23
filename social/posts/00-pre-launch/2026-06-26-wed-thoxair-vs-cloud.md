# Pre-launch W7 Wed - ThoxAir vs cloud comparison (deep-dive cycle)

## Identity

- **Post ID**: `2026-06-26-wed-thoxair-vs-cloud`
- **Phase**: pre-launch (T-47)
- **Platforms**: x, instagram (Feed + Reel), tiktok, linkedin
- **Date / time (PT)**: 2026-06-26 10:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup + the head-to-head conversion. Week 7 Wednesday pivots
from device deep-dives to comparative positioning. ThoxAir as the
"cloud Pro tier alternative" sets the value frame for the launch.

## Hero

Flat-vector comparison infographic via IMAGE_TEMPLATES section #7.
Left side: "Cloud Pro tier" with subscription cost; right side:
"ThoxAir" with one-time purchase.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | comparison infographic + 5-tweet thread |
| instagram | 4:5 carousel (4 slides) | comparison + breakeven math + privacy axis + CTA |
| instagram | 9:16 Reel | text-to-video on the comparison graphic with pulsing right column |
| tiktok | 9:16 | same Reel + trending audio |
| linkedin | 4:5 PDF carousel (5 slides) | full comparison + TCO analysis |

## Filled OpenAI prompt (1:1 comparison infographic)

```
Use IMAGE_TEMPLATES.md section #7. Slots:
{axis_label_left} = Cloud Pro tier
{axis_label_right} = ThoxAir
{n_rows} = 6

Rows (each row is a 1-sentence attribute centered on the divider,
with icon on each side):

1. Cost / year: "$2,400" left in slate; "$0 (one-time $79)" right in
   emerald.
2. Your prompts stay local: X icon left (slate); check icon right
   (emerald).
3. Works offline: X icon left; check icon right.
4. Subscription required: check icon left; X icon right.
5. Token rate limits: check icon left; X icon right.
6. Owns the model weights: X icon left; check icon right (Apache-2.0).

Frame is square 1:1, 1080 x 1080 px.
```

## Filled Grok prompt (9:16 text-to-video)

```
Use VIDEO_TEMPLATES.md section #7 (text-to-video). Slots:
{opening_frame_description} = the comparison infographic with the
  ThoxAir column right side. Background deep navy #0a0e14, white
  IBM Plex Sans headings, emerald right column highlights.
{motion_type} = surface-activity loop
{motion_template_reference} = VIDEO_TEMPLATES.md section #6
{aspect_ratio} = 9:16

Animate the right-column emerald checkmarks: each one brightens
sinusoidally at 1 Hz, phase-offset 200 ms per row, creating a
downward wave through the 6 rows. The left-column slate X marks
stay static. The right-column "ThoxAir" header and "$0" cost
text pulse gently at 0.5 Hz.

Duration: 4 seconds. Loop seamlessly.
```

## Caption: X (5-tweet thread)

```
1/ ThoxAir vs cloud Pro tier, line by line. 🟢

Both are $79... per year? Per month? Forever?

Let's run the math. /1

2/ Cost: cloud Pro is $200/month = $2,400/year. ThoxAir is $79
one-time at early-bird.

Year 1: ThoxAir saves $2,321.
Year 5: ThoxAir saves $11,921. /2

3/ Token throughput: ThoxAir ~15 tokens/sec on ThoxLLM 327M
(Coral). Cloud Pro is faster on raw throughput, but you wait for the
network and a rate limit.

For interactive use: feels comparable. /3

4/ Privacy: ThoxAir's prompts never leave your network. Cloud Pro's
prompts are logged in the provider's training datasets (subject to
their privacy policy, which can change). /4

5/ Where cloud still wins: edge-case long-tail queries. Where
ThoxAir wins: the 80% of your usage that fits a 327M-parameter
local model.

Back at $79 early-bird:
thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram (carousel)

```
ThoxAir vs cloud Pro tier, line by line. 🟢

Slide 1: the infographic - 6-axis comparison
Slide 2: breakeven math - ThoxAir pays for itself in 12 days
Slide 3: the privacy axis - your prompts never leave your network
Slide 4: back at $79 early-bird

Where cloud still wins: edge-case long-tail queries. Where ThoxAir
wins: the 80% of your usage that fits a local 327M.

🔗 thox.ai/launch
.
.
#thoxai #thoxair #cloud #localai #localfirst #comparison
#kickstarter #engineering #privacy #yourAI
```

## Caption: TikTok

```
ThoxAir vs cloud Pro tier. $79 one-time vs $2,400/year. Pays for
itself in 12 days. 🟢

#thoxai #localfirst #cloud #ai
```

## Caption: LinkedIn

```
ThoxAir vs cloud Pro tier: TCO over 5 years.

Cloud Pro tier: $200/month subscription = $12,000 over 5 years +
rate-limit friction + prompts logged to provider training datasets.

ThoxAir (THOX Kickstarter early-bird tier): $79 one-time + ~$5/year
electricity (5 W typical, 8 hours/day usage) = $104 over 5 years +
prompts never leave the local network + Apache-2.0 weights you own.

5-year TCO delta: $11,896 in favor of ThoxAir.

Where cloud wins: edge-case long-tail queries that benefit from a
175B+ parameter model. Where ThoxAir wins: the 80% of typical
knowledge-work usage that fits comfortably in a 327M local model
running on a Coral USB Accelerator.

The pitch is not "ThoxAir is better than cloud on every axis". The
pitch is "ThoxAir is better than cloud on the 80% of usage where
the 80% matters most: cost, privacy, offline capability."

Kickstarter Aug 12 2026.
thox.ai/launch

#THOXai #localAI #tco #engineering #privacy
```

## Alt text

```
A flat-vector comparison infographic on a dark navy background. Left
column "Cloud Pro tier" with slate X icons; right column "ThoxAir"
with emerald check icons. 6 comparison rows across cost, privacy,
offline, subscription, rate limits, weight ownership.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-26-wed-thoxair-vs-cloud`

## Acceptance

- [ ] Cloud Pro tier pricing verified against current providers at
      publish time (this number drifts; do not stale-quote)
- [ ] No specific competitor logos / names in image
- [ ] No em-dashes
