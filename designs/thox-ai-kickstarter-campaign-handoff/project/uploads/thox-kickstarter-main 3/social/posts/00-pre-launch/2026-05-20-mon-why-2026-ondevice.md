# Pre-launch W2 Mon - "Why on-device matters more in 2026"

## Identity

- **Post ID**: `2026-05-20-mon-why-2026-ondevice`
- **Phase**: pre-launch (T-84)
- **Platforms**: x (thread), linkedin (post)
- **Date / time (PT)**: 2026-05-20 09:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup. The 2026 angle: cloud AI billing is now visibly broken
for power users. Local-first is the relief valve. Drive 150+ signups.

## Hero

ThoxMini in lifestyle context (on a nightstand at sunrise).

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 16:9 | hero shot for the closing tweet quote-card |
| x | 1:1 | LED-pulse loop on the hero |
| linkedin | 4:5 | reuse hero re-rendered at 4:5 |

## Filled OpenAI prompt (lifestyle 4:5 hero)

```
Use IMAGE_TEMPLATES.md section #5 (lifestyle 4:5). Slots:
{device_name} = ThoxMini
{context_action} = sitting on a wooden nightstand next to an open
  paperback book
{environment} = modern bedroom side-table at sunrise
{time_of_day} = golden hour
{light_mood} = warm and intimate
```

## Filled Grok prompt (1:1 surface-activity loop)

```
Use VIDEO_TEMPLATES.md section #6 (surface-activity loop). Slots:
{led_position} = center of the front face
{ring_or_surface} = Surface reflection drift only
{ring_or_surface_detail} = (omitted)
{aspect_ratio} = 1:1
```

## Caption: X (5-tweet thread)

```
1/ 2025 was the year the cloud AI bill stopped being a rounding
error.

The Pro tier is $200/month. The Max tier is $300. The "Max 20x" tier
quietly hit $400.

Three years ago this was free. /1

2/ Meanwhile the model that fits in your pocket got 100x better.

A 327M model can write code, summarize a doc, draft an email. It
runs on a Pi Zero W. It runs on the phone in your pocket. /2

3/ Cloud AI is brilliant for the long-tail edge cases. Most of what
you actually use AI for is not the long-tail.

It is the 80% case. And the 80% case fits locally. /3

4/ THOX is the four-device fleet that runs the 80% case on your
hardware.

ThoxClip: $39. ThoxMini: $69. ThoxAir: $79. ThoxNova: $499.

No monthly bill. Ever. /4

5/ The Kickstarter is Aug 12 2026. Early-bird tiers fill fast.

Join the launch list: thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: LinkedIn

```
The economics of cloud AI flipped in 2025.

The Pro tier sits at $200/month. The Max tier at $300. The "Max
20x" tier quietly hit $400. Annual cost per power user: $2,400 to
$4,800.

For the same annual spend, a developer or knowledge worker can own
the entire THOX device fleet outright: ThoxClip ($39), ThoxMini
($69), ThoxAir ($79), ThoxNova ($499). $686 total at early-bird.
Plus an Apache-2.0 model family they own forever.

The pitch is not "we are better than cloud AI". The pitch is "the
cloud is overcharging you for what your hardware can do locally."

Kickstarter launches Aug 12 2026. Launch list at thox.ai/launch.

#THOXai #localAI #engineering #economics
```

## Alt text

```
A small black ThoxMini stick sits on a wooden nightstand next to an
open paperback book at sunrise. Warm golden light spills across the
scene; a soft emerald LED dot glows on the device.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-20-mon-why-2026-ondevice`

## Acceptance

- [ ] Cost figures verified against current cloud AI pricing AT
      publish time
- [ ] X thread ≤ 5 tweets
- [ ] LinkedIn ≤ 3000 chars
- [ ] No em-dashes
