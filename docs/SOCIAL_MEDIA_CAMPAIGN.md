# Social Media Campaign Runbook

The operating playbook for every social post that supports the THOX.ai unified Kickstarter
campaign. This doc owns **strategy, channels, cadence, ownership, and KPIs**. The paste-ready
copy lives in `templates/social/`, and the asset-production pipeline (graphics with OpenAI,
video with Grok) lives in [docs/AI_CONTENT_PIPELINE.md](AI_CONTENT_PIPELINE.md).

> Single source of truth rule applies. Every price, date, device spec, and stretch number in
> any post is downstream of [docs/CAMPAIGN_INFO.md](CAMPAIGN_INFO.md). If a number changes,
> change it there first, regenerate the affected posts, then publish.

---

## 1. Objectives

| Phase | Window | Primary objective | Primary KPI |
|---|---|---|---|
| Pre-launch (awareness) | T-60 → T-1 (Jun 13 → Aug 11, 2026) | Grow the Kickstarter "Notify me" list | Notify-list signups (goal: 1,500+ by T-1) |
| Launch (conversion) | T-0 → T+3 (Aug 12 → Aug 15) | Convert followers + press into Day-1 backers | Day-1 pledge count, % of goal at 24h |
| Sustain (momentum) | T+4 → T+27 (Aug 16 → Sep 8) | Hold daily pledge velocity, unlock stretch goals | Pledges/day, stretch-thermometer progress |
| Close (urgency) | T+28 → T+30 (Sep 9 → Sep 11) | Drive the final-48-hours surge | Final-48h pledge count |
| Fulfillment (trust) | T+31 → May 2027 | Keep backers warm, recruit late BackerKit add-ons | Update open rate, BackerKit add-on revenue |

The North Star metric is **funded percentage**. Every post either grows the notify list
(pre-launch) or moves the thermometer (launch onward). If a post does neither, it does not ship.

---

## 2. Channels

| Channel | Handle (set at T-30) | Primary format | Audience | Owner |
|---|---|---|---|---|
| LinkedIn | /company/thox-ai | Carousel + founder POV text | Builders, investors, B2B | P |
| X / Twitter | @thox_ai | Thread + clip + poll | Tech early adopters, press | P |
| Bluesky | @thox.ai | Same as X, reposted | Open-source / fediverse-adjacent | P |
| Mastodon | @thox@fosstodon.org | Same as X, dev-leaning angle | FOSS, RISC-V, self-host crowd | P |
| Instagram | @thox.ai | Reels + carousel + Stories | Visual, lifestyle, gadget fans | P |
| TikTok | @thox.ai | 9:16 short video | Discovery, demo, "boot in 3s" | P |
| YouTube | @thox-ai | Hero video + Shorts | Long-form proof, SEO | P + C |
| Reddit | u/thox_ai | Comment-first, AMA at T+1 | r/selfhosted, r/LocalLLaMA, r/RISCV | C |

**Channel voice deltas** (the brand voice is one voice, but the angle shifts):
- **Mastodon / Reddit / r/LocalLLaMA**: lead with silicon, runtime, and "honest about what
  64 MB can and cannot do." No marketing gloss. Engineers smell it.
- **Instagram / TikTok**: lead with the magnetic snap, the LED pulse, the sub-3-second boot.
  Physical, tactile, satisfying.
- **LinkedIn**: lead with the thesis — personal AI on silicon you own — and the founders.
- **X / Bluesky**: lead with the one-liner hook, then the clip, then the link.

---

## 3. Brand voice rules (apply to every post)

These are the THOX rules, distilled for social. They are non-negotiable.

1. **Never overclaim what the silicon can do.** ThoxClip never "runs an LLM." It listens,
   taps, forwards. Say what is true.
2. **Tagline is fixed:** `Your AI. Your Data. Your Rules.` Never reworded.
3. **Lead with the concrete.** "Boots in under 3 seconds" beats "blazing fast."
4. **No hype punctuation.** No "!!!", no 🔥 spam, no "GAME CHANGER." One emoji max, and only
   when it earns its place.
5. **Honest claims is the brand.** When a competitor would round up, we round down.
6. **Devices are always named exactly:** ThoxClip, ThoxMini, ThoxAir, ThoxNova. No "the clip."
7. **Prices and dates always match CAMPAIGN_INFO.md.** A wrong price in a viral post is a
   refund liability.
8. **One CTA per post.** Pre-launch: "Notify me." Launch: "Back us." Never both.

---

## 4. Content pillars

Every post maps to exactly one pillar. The mix target is shown per phase.

| Pillar | What it is | Example | Pre-launch mix | Launch+ mix |
|---|---|---|---|---|
| **Product** | A device, a spec, a feature, shot beautifully | ThoxClip magnetic snap macro | 30% | 25% |
| **Proof** | Real silicon, real boot, real chat stream | ThoxMini 3-second boot timer | 25% | 20% |
| **Thesis** | "Personal AI on silicon you own," the why | Founder POV on local-first AI | 20% | 15% |
| **People** | Craig + Phamy, the build, behind the scenes | Workbench, EVT units, soldering | 15% | 10% |
| **Campaign** | Tiers, stretch goals, thermometer, urgency | "$349 Cluster Pack" tile | 10% | 30% |

The **Campaign** pillar is deliberately small pre-launch (nothing to back yet) and the largest
once live (the thermometer is the story).

---

## 5. Cadence

| Phase | Posts/week per channel | Mandatory beats |
|---|---|---|
| Pre-launch (T-60 → T-15) | 3 | 1 product, 1 proof/thesis, 1 people |
| Ramp (T-14 → T-1) | 5 | Countdown series daily from T-7; teaser at T-1 |
| Launch day (T-0) | 6+ | Per the hour-by-hour in LAUNCH_CHECKLIST.md |
| Sustain (T+1 → T+27) | 5 | Weekly Update echo (Fri), 1 stretch-progress, 1 backer spotlight |
| Close (T+28 → T+30) | 7+ | 48h / 24h / 12h / 6h / 1h "final hours" series |

The **countdown series** (T-7 to T-0) is a fixed visual set: same template, changing number,
one device featured per day. Generate all eight tiles in one batch (see AI_CONTENT_PIPELINE.md).

---

## 6. Asset specs (what to hand the pipeline)

All dimensions in pixels. Source graphics from OpenAI, motion from Grok. See
[AI_CONTENT_PIPELINE.md](AI_CONTENT_PIPELINE.md) for how to produce each.

| Surface | Aspect | Dimensions | Format | Max length |
|---|---|---|---|---|
| X / Bluesky / Mastodon in-feed image | 16:9 | 1600×900 | PNG/JPG | — |
| LinkedIn single image | 1.91:1 | 1200×627 | PNG/JPG | — |
| LinkedIn / Instagram carousel | 1:1 | 1080×1080 | PNG | 10 slides |
| Instagram feed (portrait) | 4:5 | 1080×1350 | PNG/JPG | — |
| Stories / Reels / TikTok / Shorts | 9:16 | 1080×1920 | MP4 | 6–60 s |
| In-feed video (X, LinkedIn) | 16:9 | 1920×1080 | MP4 | 6–60 s |
| OG / link-preview card | 1.91:1 | 1200×630 | PNG | — |
| Profile avatar (all channels) | 1:1 | 1024×1024 | PNG | — |
| Profile banner (X/LinkedIn) | varies | 1500×500 / 1584×396 | PNG | — |

**Safe area:** keep all text and the wordmark inside the center 80%. The outer 10% on each
edge is cropped differently by every platform.

**Captions:** every video ships with burned-in captions. 60%+ of feed video is watched muted.

---

## 7. Hashtags + handles

Keep it tight. Tags are reach, not decoration.

- **Always:** `#THOX` `#PersonalAI` `#LocalAI`
- **Pillar-specific:** `#RISCV` (ThoxMini/Air), `#SelfHosted` `#LocalLLM` (ThoxNova),
  `#EdgeAI` (cluster), `#Kickstarter` (campaign pillar only)
- **Max 3 hashtags** on X/Bluesky/LinkedIn, up to 8 on Instagram/TikTok.
- **Mention** partners/press only when reposting their coverage, never as cold tags.

---

## 8. Approval + workflow

```
Brief (this doc + calendar)
  → Generate graphic (OpenAI)        [P]
  → Brand QC against tokens          [P]
  → Animate to video (Grok)          [P]
  → Caption + assemble               [P]
  → Copy from post-copy-library.md   [P]
  → Founder approval gate            [B]   ← only Product/Proof claims + any price/date
  → Schedule in Buffer/native        [P]
  → Publish + monitor 1h             [P]
```

**What needs founder sign-off (B):** any post stating a spec, a price, a date, a stretch
number, or a hardware capability. Lifestyle/people/thesis posts do not — but if in doubt, gate.

**Tooling:** schedule via Buffer (or native schedulers). Launch day is posted live, not
scheduled, so copy can react to real numbers.

---

## 9. KPIs + reporting

Logged every Friday in the weekly Update (see `templates/weekly-update.md`).

| Metric | Where | Pre-launch target | Launch target |
|---|---|---|---|
| Notify-list signups | Kickstarter prelaunch dashboard | 1,500 by T-1 | — |
| Follower growth (sum) | Native analytics | +25%/mo | sustain |
| Engagement rate | Native analytics | ≥4% | ≥4% |
| Link CTR to Kickstarter | UTM in bit.ly/native | — | ≥2% |
| Pledges attributed to social | Kickstarter referrer report | — | ≥20% of total |
| Video view-through (3s+) | Native | ≥30% | ≥30% |

**UTM convention:** `?utm_source={channel}&utm_medium=social&utm_campaign=thox_launch_2026`.
Use a single short-link per channel so the Kickstarter referrer report stays clean.

---

## 10. Crisis + comment posture

Mirror the LAUNCH_CHECKLIST red-flag rules on social:

- **Negative technical critique** (e.g. "512 MB can't run a real model"): agree with the true
  part, link the FAQ, never argue. Our whole brand is honesty — lean into it.
- **Spec challenge:** answer with the exact number from CAMPAIGN_INFO.md. If we got it wrong,
  correct it publicly and fast.
- **Troll / bad-faith:** one factual reply max, then disengage. Never delete critical-but-fair
  comments; deleting reads as hiding.
- **Payment/refund complaint:** move to DM, hand to backer comms, reply within 1 hour.
- **Outage / page-down at launch:** post a plain status note, no spin, update when fixed.

---

## 11. File map

```
docs/
├── SOCIAL_MEDIA_CAMPAIGN.md      this file — strategy, channels, cadence, KPIs
└── AI_CONTENT_PIPELINE.md        OpenAI graphics → Grok video, end to end

templates/social/
├── content-calendar.md           dated post plan, pre-launch through close
├── post-copy-library.md          paste-ready copy per channel, per pillar
├── openai-image-prompts.md       graphic-generation prompt library (OpenAI)
└── grok-video-prompts.md         video-generation prompt library (Grok)

templates/
└── launch-day-social.md          launch-day posts (referenced by LAUNCH_CHECKLIST)

assets/social/
└── README.md                     staging spec + naming for produced social assets
```

This runbook lives in this repo. If the strategy changes, change it here first.
