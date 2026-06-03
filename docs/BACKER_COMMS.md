# Backer Communications

How we talk to backers during the campaign and after.

## Cadence

| Phase | Channel | Frequency | Who replies |
|---|---|---|---|
| Pre-launch | Mailerlite (notify list) | Weekly tease + one launch-day email | Phamy |
| Live campaign (T+0 to T+30) | Kickstarter Updates | Every Friday 10:00 PT + stretch unlocks | Phamy |
| Live campaign | Kickstarter comments | Reply within 18 hours M-F, 48 hours weekends | Both |
| Live campaign | Discord / Matrix | Daily by 12:00 PT | Craig (eng) + Phamy (comms) |
| Live campaign | Twitter / Bluesky / LinkedIn | 2 posts per day | Phamy |
| Post-funding (T+30 to ship) | BackerKit updates | Monthly + on-milestone | Phamy |
| Shipping (T+180 to T+330) | BackerKit + Kickstarter | Per-cohort shipment notice + one Update | Phamy |

## SLAs

- Kickstarter comment: 18 hours M-F, 48 hours weekend.
- Press email: 24 hours M-F, 48 hours weekend.
- BackerKit support ticket: 24 hours.
- Refund request: 48 hours to acknowledge, 7 days to process.
- A complaint from a single backer that mentions any of "fraud", "lawyer", "BBB", "FTC": escalate to Phamy within 1 hour, regardless of clock.

## Tone

- Direct, technical, never breathless.
- No emojis in official replies. THOX brand is dry.
- No em dashes.
- First-person plural ("we") when describing the company. First-person singular when the founder is replying personally (Phamy or Craig signs their full name).
- Always link to the source-of-truth doc in this repo for any number or date a backer asks about.

## Update calendar (working draft for T+0 to T+30)

| Week | Topic |
|---|---|
| Week 0 | "We are live" (T+0, 12:00 PT) |
| Week 1 | Behind the build: ThoxClip mechanical |
| Week 2 | Behind the build: ThoxAir cluster firmware |
| Week 3 | Stretch milestone (whichever has just been hit) |
| Week 4 | Final 7 days: what's left to do, who hasn't pledged yet |
| Close (T+30) | "We made it" + thank-you |

## Tone examples

**Reply to a happy backer:**

> Thanks for backing the Cluster Pack. The four-board ThoxAir stack is the most fun part of this whole campaign for me to demo, so I hope you enjoy yours. If you want a preview, the magstack-air-edge-rs repo (private, but you can email me for access) already has the firmware running on three boards on my desk right now. - Phamy

**Reply to a worried backer:**

> Fair question. The Milk-V Duo is single-source, and I want to be upfront about that. The ThoxyMicro repos under ttracx are our alternate-silicon prototype, which already runs the same agent on the Luckfox Pico Mini B (Rockchip RV1103). If Milk-V exits the market, ThoxMini ships on Luckfox silicon with a 60-day delay. You will not lose your reward; you might wait a little longer. - Phamy

**Reply to a hostile commenter:**

> Disagreement is welcome here. Personal attacks are not. The specific claim you raised about ThoxNova hosting "real" inference is one I can answer: we run Qwen3-7B at roughly 18 tokens/second on the N100 iGPU via llama-server-sycl in our current EVT unit. The benchmark report is at thox.ai/bench. If your numbers differ, please share them; we will update the page. - Craig

