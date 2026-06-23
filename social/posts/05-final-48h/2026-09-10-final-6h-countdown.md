# Final 48h worked example: T-6h countdown (hourly on all platforms)

Phase: final-48h. Date: 2026-09-10 (T+29, 6h before campaign close).
Theme: hourly countdown urgency. This is the highest-cadence moment in
the entire campaign; every hour from T-6 to T-1 gets a fresh
generated thermometer graphic + a fresh caption.

## Identity

- **Post ID**: `2026-09-10-final-6h-countdown` (the master brief; the
  per-hour briefs derive from this template)
- **Phase**: final-48h
- **Platform(s)**: x, instagram (Stories + Reel), tiktok, threads
- **Date / time (PT)**: 2026-09-10 12:00, 13:00, 14:00, 15:00, 16:00, 17:00 (campaign closes 18:00 PT)
- **Authored by**: shared (rotating coverage)
- **Status**: master brief ready; per-hour briefs derive at runtime

## Intent

Click to Kickstarter (back NOW). The final 6 hours typically deliver
15-25% of total campaign funding via fence-sitters and last-chance
backers. The hourly drumbeat is the conversion engine.

## Hero device

Live thermometer graphic with the actual current funded amount + the
remaining time to close. Auto-generated each hour from a template.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | 1:1 thermometer (live) + concise tweet |
| instagram | Stories | 9:16 thermometer Story sticker (Link sticker, swipe-up to Kickstarter) |
| instagram | Reel | new 9:16 Reel each hour ONLY if the thermometer crosses a round number ($1.5M, $1.7M, etc.) |
| tiktok | 9:16 | same as IG Reel (only on round-number crossings) |
| threads | 1:1 | reuse the X 1:1 thermometer |

## Prompts

- **OpenAI image template**: section #8 (stretch-goal unlock graphic)
  adapted as a "thermometer" graphic. The center element becomes the
  funded amount instead of the unlock amount. Below it: "TIME LEFT:
  Xh Ym".
- **Grok video template** (only for crossings): section #6
  (surface-activity loop) on the thermometer graphic, with the
  numerals pulsing emerald sinusoidally at 1 Hz.

## Filled OpenAI prompt (thermometer 1:1, hourly variant)

```
Flat vector live-thermometer celebration graphic.

Background: deep navy #0a0e14 with a subtle radial vignette emerald
#10b981 (5 percent opacity) emanating from center.

Center element: the funded amount "${funded_amount}" in emerald
#10b981, IBM Plex Sans Bold 180 px, centered both axes.

Above the amount: "FUNDED" in white IBM Plex Sans Bold 48 px,
letter-spacing 0.2 em, centered.

Below the amount: "{time_left} LEFT" in MagStack purple #a855f7 IBM
Plex Sans Bold 64 px, centered. Below that: "Back now →
kickstarter.com/projects/thox-ai/thox-unified-2026" in white IBM
Plex Sans Medium 28 px, centered.

Bottom-third element: a horizontal progress bar 800 px wide x 12 px
tall, emerald fill at {percent_funded} percent of width, slate
#475569 fill for the remainder, centered horizontally, 60 px above
the bottom edge.

Top-right corner: small THOX logomark, 80 x 80 px, 5 percent margin.

Decorative element: thin emerald line border 4 px, inset 24 px from
all edges.

No emojis. No confetti graphics. No gradients on text. Sharp
typography throughout. Vector style, flat. 1080 x 1080 px.
```

**Slots filled at runtime each hour**:
- `{funded_amount}`: "$1,847,000" (whatever the live count is)
- `{time_left}`: "5h 0m" (computed from now to 18:00 PT close)
- `{percent_funded}`: 92 (funded / max stretch goal)

## Captions (rotating per hour)

The captions rotate through a 6-element wheel to avoid feed fatigue:

### Hour 1 of last 6 (T-6h) - X

```
🟢 6 hours left.

THOX is at ${funded_amount} on Kickstarter. Early-bird tiers are
locking in seconds.

This is the last window before market price.

Back: kickstarter.com/projects/thox-ai/thox-unified-2026
```

### Hour 2 (T-5h) - X

```
🟢 5 hours left.

${funded_amount} funded.

If you have been waiting for the right moment - it is now.

kickstarter.com/projects/thox-ai/thox-unified-2026
```

### Hour 3 (T-4h) - X

```
🟢 4 hours left.

${funded_amount} funded. {n_backers} backers.

Your AI. Your Data. Your Rules.

kickstarter.com/projects/thox-ai/thox-unified-2026
```

### Hour 4 (T-3h) - X

```
🟢 3 hours left.

The ThoxClip early-bird at $39 closes when the campaign closes.
That is the last $39 ThoxClip there will ever be.

Back: kickstarter.com/projects/thox-ai/thox-unified-2026
```

### Hour 5 (T-2h) - X

```
🟢 2 hours left.

${funded_amount}. We are this close.

kickstarter.com/projects/thox-ai/thox-unified-2026
```

### Hour 6 (T-1h) - X

```
🟢 1 hour left.

Last call.

${funded_amount} funded. {n_backers} backers stacked.

kickstarter.com/projects/thox-ai/thox-unified-2026
```

### IG Stories text overlays

Same wheel, formatted for the 9:16 Story sticker (max 60 chars per
sticker, larger font). Always include a Link sticker to the
Kickstarter URL.

### TikTok captions

```
{n} hours left on THOX. ${funded_amount} funded. Your AI. Your Data.
Your Rules. 🟢
```

## Alt text

```
A typographic thermometer graphic on a dark navy background. Centered
text reads "FUNDED" above the dollar amount, then "{time_left} LEFT"
in purple. A horizontal emerald progress bar fills {percent_funded}%
of the width at the bottom.
```

## UTM tracking

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-launch-2026&utm_content=2026-09-10-T-{n}h`

## Trigger logic

Operations runs a hot loop:

1. At each hour mark, pull the live funded amount and backer count
   from the Kickstarter creator dashboard.
2. Regenerate the thermometer graphic with current values via the
   OpenAI prompt above.
3. Generate the looping video variant ONLY if the funded amount
   crosses a round number in the next hour.
4. Pick the appropriate caption from the rotating wheel above.
5. Post on all listed platforms within a 90-second window.
6. Reply to any comments within 15 minutes for the full final 6
   hours.

## Acceptance checklist

- [ ] Thermometer graphic regenerated each hour (do not reuse stale
      numbers)
- [ ] Time-left math correct (subtract from 18:00 PT)
- [ ] Percent funded math correct (current funded / stretch ceiling
      $3M; not the original $250K goal)
- [ ] Caption rotation pulled in order (do not repeat the same caption
      within 6 hours)
- [ ] Emojis: green pip 🟢 only
- [ ] No em-dashes
- [ ] UTM appended to URL
- [ ] At least 2 operators on duty for replies (rotate every 30 min)

## Post-mortem

Fill at T+1h after campaign close. Track: final-6h velocity multiple
(vs. the 24-hour rolling average), top-converting hour, highest-
engagement caption variant.
