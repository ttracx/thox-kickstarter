# thox-kickstarter

<!-- thox-badges -->
[![License](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)](LICENSE)
[![THOX.ai](https://img.shields.io/badge/THOX.ai-portfolio-10B981?style=flat-square)](https://thox.ai)
[![Status](https://img.shields.io/badge/status-active-success?style=flat-square)](#)
![Latest Release](https://img.shields.io/github/v/release/ttracx/thox-kickstarter?style=flat-square&include_prereleases)
![Last Commit](https://img.shields.io/github/last-commit/ttracx/thox-kickstarter?style=flat-square)
![Open Issues](https://img.shields.io/github/issues/ttracx/thox-kickstarter?style=flat-square)
<!-- /thox-badges -->


[![THOX.ai](https://img.shields.io/badge/THOX.ai-Kickstarter%20Launchkit-1f6feb?style=flat-square)](https://thox.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Status: Pre-launch](https://img.shields.io/badge/Status-Pre--launch%20%28Aug%202026%29-d29922?style=flat-square)](#)
[![Devices: 4](https://img.shields.io/badge/Devices-ThoxClip%20%2B%20ThoxMini%20%2B%20ThoxAir%20%2B%20ThoxNova-c084fc?style=flat-square)](#)
[![Funding goal: $250K](https://img.shields.io/badge/Funding%20goal-%24250K-10b981?style=flat-square)](#)
[![Stretch ceiling: $3M](https://img.shields.io/badge/Stretch%20ceiling-%243M-a855f7?style=flat-square)](#)
[![Inventors: Craig Ross + Phamy Xaypanya](https://img.shields.io/badge/Inventors-C.%20Ross%20%2B%20P.%20Xaypanya-555?style=flat-square)](NOTICE)

> **The complete operating playbook for the THOX.ai unified Kickstarter campaign.** Pitch text, pitch deck, talking points, video script, step-by-step Kickstarter setup, rewards matrix, stretch goals, timeline, risk register, backer comms templates, press kit, legal posture, and the day-of-launch checklist.

This repo is the canonical source for everything we ship to Kickstarter, BackerKit, press, and backers. If a date, a price, or a stretch goal lives anywhere else, that copy is downstream of this repo.

## What is in the box

```
thox-kickstarter/
├── docs/
│   ├── CAMPAIGN_INFO.md           full campaign narrative (the Story page)
│   ├── SETUP_GUIDE.md             step-by-step Kickstarter project setup
│   ├── REWARDS_MATRIX.md          every backer tier, locked in one table
│   ├── STRETCH_GOALS.md           $250K to $3M unlocks
│   ├── TIMELINE.md                Aug 2026 launch → May 2027 fulfillment
│   ├── RISKS.md                   risk register + mitigations
│   ├── FAQ.md                     the eight FAQs that close the deal
│   ├── PRESS_KIT.md               press contacts, boilerplate, asset list
│   ├── LEGAL.md                   IP filings, tax, accessibility, regional law
│   ├── BACKER_COMMS.md            cadence, SLAs, escalation playbook
│   ├── VIDEO_PRODUCTION.md        how to shoot the 2:30 hero video
│   ├── SOCIAL_MEDIA_CAMPAIGN.md   social strategy, channels, cadence, KPIs
│   ├── AI_CONTENT_PIPELINE.md     OpenAI graphics → Grok video, end to end
│   └── LAUNCH_CHECKLIST.md        T-30 to T+7, hour by hour
├── prompts/                       AI generation prompt library (OpenAI image + Grok video / illustration)
│   ├── README.md                  prompt library overview + tool routing
│   ├── PIPELINE.md                end-to-end OpenAI image -> Grok video workflow
│   ├── openai/
│   │   ├── SYSTEM_PROMPT.md       brand-locked system prompt for gpt-image-1
│   │   └── IMAGE_TEMPLATES.md     10 asset-type templates (hero, lifestyle, MagStack, infographic, unlock, dashboard, ...)
│   └── grok/
│       ├── VIDEO_SYSTEM_PROMPT.md          brand-locked system prompt for Grok video
│       ├── VIDEO_TEMPLATES.md              7 motion-type templates (orbit, dolly-in/out, pan, parallax, surface-loop, text-to-video)
│       └── ILLUSTRATION_SYSTEM_PROMPT.md   brand-locked system prompt for Grok flat illustrations
├── social/                        cross-platform social campaign assets and per-post briefs
│   ├── README.md                  social campaign overview + phase map
│   ├── CALENDAR.md                90-day cross-platform posting calendar
│   ├── PLATFORMS.md               per-platform spec sheet (X, IG, TikTok, LinkedIn, YouTube, Reddit, Threads)
│   └── posts/                     per-post briefs (worked examples for each phase)
│       ├── _TEMPLATE_brief.md     brief template (copy for new posts)
│       ├── 00-pre-launch/         T-90 to T-1 (list building)
│       ├── 01-launch-day/         T+0 (8 posts in 24h)
│       ├── 02-week-1/             T+1 to T+7
│       ├── 03-mid-campaign/       T+8 to T+21
│       ├── 04-stretch/            T+22 to T+28 (pre-staged unlock briefs)
│       ├── 05-final-48h/          T+28 to T+30 (hourly countdown)
│       └── 06-post-funding/       T+31 onward (build logs + BackerKit pivot)
├── runbooks/                      phase-by-phase operator runbooks (how to run the op)
│   ├── README.md                  roles + tools + SLAs
│   ├── 00-pre-launch.md           T-90 to T-1: list building, asset stocking, infra setup
│   ├── 01-launch-week.md          T+0 to T+7: launch choreography + week-1 momentum
│   ├── 02-mid-campaign.md         T+8 to T+21: sustained drumbeat
│   ├── 03-stretch-unlock.md       any stretch threshold crossing
│   ├── 04-final-48h.md            T+28 to T+30: closeout urgency push
│   ├── 05-post-funding.md         T+31 onward: fulfillment trust + BackerKit
│   ├── 06-daily-content.md        daily / weekly content production rhythm
│   └── 07-crisis-response.md      P0-P3 crisis playbook
├── assets/
│   ├── README.md                  brand palette + asset list
│   ├── social/                    AI-generated social assets staged pre-publish
│   │   ├── README.md              staging spec + naming grammar + sidecar rule
│   │   └── <platform>/<post-id>/  per-post asset directory (still + video + prompts)
│   └── (logos, badges, device photos staged here pre-launch)
├── templates/
│   ├── pre-launch-email.md
│   ├── launch-day-email.md
│   ├── launch-day-social.md       launch-day posts, all channels
│   ├── weekly-update.md
│   ├── stretch-unlock-update.md
│   ├── reply-snippets.md          canned replies for the seven most common questions
│   └── social/
│       ├── content-calendar.md    dated post plan, pre-launch → close
│       ├── post-copy-library.md   paste-ready copy per channel, per pillar
│       ├── openai-image-prompts.md  graphic-generation prompt library
│       └── grok-video-prompts.md    video-generation prompt library
├── deliverables/
│   ├── THOX_Kickstarter_Campaign.md         the story page text
│   ├── THOX_Kickstarter_Deck.pptx           14-slide pitch deck
│   ├── THOX_Talking_Points.docx             elevator + 2-min + 5-min + per-device
│   └── THOX_Video_Script.docx               2:30 video with AI gen prompts
├── README.md                                this file
├── LICENSE                                  MIT
└── NOTICE                                   inventor attribution
```

## Quick navigation by audience

| If you are... | Start here |
|---|---|
| Setting up the Kickstarter project for the first time | [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md) |
| About to launch (T-30 days or less) | [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) + [runbooks/00-pre-launch.md](runbooks/00-pre-launch.md) |
| Running launch day / launch week | [runbooks/01-launch-week.md](runbooks/01-launch-week.md) + [social/CALENDAR.md](social/CALENDAR.md) "Phase 1" |
| Producing daily social content | [runbooks/06-daily-content.md](runbooks/06-daily-content.md) + [prompts/PIPELINE.md](prompts/PIPELINE.md) |
| Generating a new image asset | [prompts/openai/SYSTEM_PROMPT.md](prompts/openai/SYSTEM_PROMPT.md) + [prompts/openai/IMAGE_TEMPLATES.md](prompts/openai/IMAGE_TEMPLATES.md) |
| Generating a new video asset | [prompts/grok/VIDEO_SYSTEM_PROMPT.md](prompts/grok/VIDEO_SYSTEM_PROMPT.md) + [prompts/grok/VIDEO_TEMPLATES.md](prompts/grok/VIDEO_TEMPLATES.md) |
| Generating a new illustration / icon / cluster diagram | [prompts/grok/ILLUSTRATION_SYSTEM_PROMPT.md](prompts/grok/ILLUSTRATION_SYSTEM_PROMPT.md) |
| Drafting a new social post | [social/posts/_TEMPLATE_brief.md](social/posts/_TEMPLATE_brief.md) + the worked example for the relevant phase under `social/posts/` |
| Hitting a stretch goal threshold | [runbooks/03-stretch-unlock.md](runbooks/03-stretch-unlock.md) + the unlock brief at [social/posts/04-stretch/](social/posts/04-stretch/) |
| Running the final 48h closeout | [runbooks/04-final-48h.md](runbooks/04-final-48h.md) + [social/posts/05-final-48h/](social/posts/05-final-48h/) |
| Post-funding fulfillment cadence | [runbooks/05-post-funding.md](runbooks/05-post-funding.md) + [social/posts/06-post-funding/](social/posts/06-post-funding/) |
| Crisis response (P0-P3) | [runbooks/07-crisis-response.md](runbooks/07-crisis-response.md) |
| Pitching to a partner or angel | [deliverables/THOX_Kickstarter_Deck.pptx](deliverables/THOX_Kickstarter_Deck.pptx) + [docs/CAMPAIGN_INFO.md](docs/CAMPAIGN_INFO.md) |
| Recording the hero video | [deliverables/THOX_Video_Script.docx](deliverables/THOX_Video_Script.docx) + [docs/VIDEO_PRODUCTION.md](docs/VIDEO_PRODUCTION.md) |
| Running the social media campaign | [docs/SOCIAL_MEDIA_CAMPAIGN.md](docs/SOCIAL_MEDIA_CAMPAIGN.md) + [templates/social/content-calendar.md](templates/social/content-calendar.md) |
| Generating social graphics + video with AI | [docs/AI_CONTENT_PIPELINE.md](docs/AI_CONTENT_PIPELINE.md) + [templates/social/](templates/social/) |
| Pricing a new tier or add-on | [docs/REWARDS_MATRIX.md](docs/REWARDS_MATRIX.md) |
| Replying to a backer | [templates/reply-snippets.md](templates/reply-snippets.md) + [docs/FAQ.md](docs/FAQ.md) |
| Coordinating with press | [docs/PRESS_KIT.md](docs/PRESS_KIT.md) |
| Filing an IP question | [docs/LEGAL.md](docs/LEGAL.md) |

## Brand and design system

All copy, slides, and assets in this repo use the THOX.ai design tokens:

| Token | Hex | Use |
|---|---|---|
| Emerald | `#10b981` | Primary accent, status, CTA |
| Emerald light | `#34d399` | Hover, secondary highlight |
| Neon emerald | `#00ff88` | Alive pip, used sparingly |
| MagStack purple | `#a855f7` | Cluster leader, secondary brand |
| Amber | `#f59e0b` | Warning, telemetry alert |
| Ink | `#0a0e14` | Body, dark surface |
| Slate | `#475569` | Muted body text |

Typography: **Inter** for sans, **JetBrains Mono** for code and labels. See [assets/README.md](assets/README.md) for the full asset list and where each appears.

## Social media campaign + AI asset pipeline

The campaign's social presence runs on a self-contained system: strategy, a dated calendar,
paste-ready copy, and an AI pipeline that produces every graphic and clip on-brand.

- **Strategy + cadence** — [docs/SOCIAL_MEDIA_CAMPAIGN.md](docs/SOCIAL_MEDIA_CAMPAIGN.md):
  objectives by phase, eight channels, five content pillars, posting cadence, KPIs, crisis
  posture.
- **AI content pipeline** — [docs/AI_CONTENT_PIPELINE.md](docs/AI_CONTENT_PIPELINE.md): the
  end-to-end flow where **static graphics are generated with OpenAI `gpt-image-1`** and then
  **animated into video with Grok Imagine (xAI)**. Includes API recipes, a brand-QC gate,
  ffmpeg export specs, naming, and reproducibility rules.
- **Run-the-show templates** — [templates/social/](templates/social/): a
  [dated calendar](templates/social/content-calendar.md) (pre-launch → close), a
  [copy library](templates/social/post-copy-library.md) per channel and pillar, and the
  [OpenAI](templates/social/openai-image-prompts.md) and
  [Grok](templates/social/grok-video-prompts.md) prompt libraries.
- **Asset staging** — [assets/social/](assets/social/README.md): where produced media lands,
  with a naming grammar and a sidecar rule so any asset is reproducible.

The pipeline in one line:

```
brief → OpenAI gpt-image-1 (graphic) → brand QC → Grok Imagine (image→video) → caption + export → publish
```

Honesty guardrail: AI-generated *device* imagery is stylized social art only. The Kickstarter
Story page and reward tiles use **real EVT photography** — never a render presented as a photo.

## Kickstarter shipping plan (T-49 to launch)

**For Tommy (operator)**: open [docs/TOMMY_ACTION_PLAYBOOK.md](docs/TOMMY_ACTION_PLAYBOOK.md) first. 5 human-gated tasks, ~3 hours of focused work today + ~4 hours of routing this week. Provision the Linux build host today (Action 1) — it unblocks 5 of 8 teams simultaneously.

**Read [docs/KICKSTARTER_SHIPPING_PLAN.md](docs/KICKSTARTER_SHIPPING_PLAN.md)** for the master plan covering every THOX repo that must ship before the Aug 12 2026 launch. The plan was synthesized from a parallel audit of 40+ portfolio repos and identifies:

- 12 critical-path repos that must ship for the video demo
- 8 parallel agent teams (A through H) with explicit charters
- Weekly milestones from T-49 (today) to T+0 (Aug 12)
- 8 named risks with mitigations
- Per-device demo acceptance criteria

Each team has a self-contained dispatch prompt at [docs/agent-dispatch/](docs/agent-dispatch/) that can be handed off to a fresh Claude Code session. Launch each team in parallel; coordinate only at the daily 8:30am PT standup and the Friday 5pm milestone review.

| Team | Mission | Owner | Risk | Repos |
|---|---|---|---|---|
| A | Marketing site full reconciliation + command-center lockdown | Phamy | **medium-high** | Thox.ai, thox-command-center |
| B | Kernel v1.2.0 3-outcome signed release decision (T-21 fallback) | Craig | **HIGH** | thoxos-kernel |
| C | Signed RV1103 (Luckfox Pico Mini B) image artifact (physical fallback lane; updated 2026-06-25, Pi Zero 2 W path now legacy prototype only) | Craig | medium | thoxos-air-image, thoxair-pico-sdk, thox-luckfox-pico-mini-b |
| D | Phase C 12B + Ollama tags + E2B/NPU path (transformers pin, not wait) | Phamy | medium-high | thox-gemma4, thoxllm-factory, thox-gemma4-e4b-sft, thox-micro-125m |
| E | ThoxAir MaskROM + cross-platform flashing (pairs with C) | Tommy | medium | thox-provisioner, thoxos-mini-flasher, thoxos-mini-utm-build, thox-quickstart, thoxos-mini-ai-usb-factory |
| F | 8-clip MagStack hero shot (compile + bench before filming) | Craig | medium | magstack-air, magstack-air-edge-rs, thox-q2-print-farm |
| G | Terminal/Companion TestFlight (demo only completed surfaces) | Phamy | medium | thox-terminal, thoxos-companion, thoxos-companion-multiplatform, thox-portable, thox-workbench |
| H | Silicon GDS + ThoxWatch wrist B-roll (drop first if compressed) | Craig | low / optional | thoxinchip, thox-watch |

**Highest-risk items**: Team B (kernel v1.2.0 NO_GO for 24 absorbs; 3-outcome decision with T-21 binding fallback to QEMU-only or NO_GO-for-video) and Team A (multiple price/date/delivery contradictions across all deep pages, not just hero).

**Day 0 launch order**:
1. Teams A + B start immediately
2. Linux build host provisioned **today** (`docs/agent-dispatch/build-host-spec.md`), not "this week"
3. Teams C + E shadow-start today (physical fallback lane)
4. Teams D + F + G start after build host is online (within 48h)
5. Team H optional / drop-first if compressed

Order rationale: Team A protects trust. Team B protects technical credibility. Teams C/E protect the physical-device fallback. That combination ships a real Kickstarter video without over-claiming.

## Single source of truth

Anything that needs to be consistent across the campaign (prices, dates, stretch amounts, device specs, inventor names, IP numbers) lives in this repo. The Kickstarter page, BackerKit setup, press releases, social posts, and email blasts all pull from here.

If a number changes, change it in this repo first, then update downstream.

## Social asset generation pipeline (added 2026-06-22)

Every social post in this campaign uses the same end-to-end pipeline:

1. **Brief**: copy `social/posts/_TEMPLATE_brief.md` to the appropriate phase directory and fill in the slots.
2. **Image**: use [prompts/openai/SYSTEM_PROMPT.md](prompts/openai/SYSTEM_PROMPT.md) + the appropriate template from [prompts/openai/IMAGE_TEMPLATES.md](prompts/openai/IMAGE_TEMPLATES.md) to generate the still in OpenAI gpt-image-1.
3. **Video**: feed the still into Grok image-to-video using [prompts/grok/VIDEO_SYSTEM_PROMPT.md](prompts/grok/VIDEO_SYSTEM_PROMPT.md) + the appropriate motion template from [prompts/grok/VIDEO_TEMPLATES.md](prompts/grok/VIDEO_TEMPLATES.md).
4. **Illustration** (for icons / cluster diagrams / vector graphics): use [prompts/grok/ILLUSTRATION_SYSTEM_PROMPT.md](prompts/grok/ILLUSTRATION_SYSTEM_PROMPT.md).
5. **Post**: schedule via Buffer / TweetDeck / TikTok Studio per the [social/CALENDAR.md](social/CALENDAR.md) cadence and the runbook for the current phase ([runbooks/](runbooks/)).

Full end-to-end pipeline at [prompts/PIPELINE.md](prompts/PIPELINE.md). Worked examples in [social/posts/](social/posts/) cover all 7 campaign phases.

The pipeline is fully brand-locked (THOX dark navy + emerald + IBM Plex Sans / JetBrains Mono, MagStack purple only on MagStack content, no em-dashes anywhere, emojis allowed in captions but not baked into images / videos).

## Repository neighbors

This repo is the **pre-launch playbook**. The other halves of the Kickstarter operating loop live in sibling repos:

| Repo | Phase | Owns |
|---|---|---|
| [ttracx/thox-kickstarter](https://github.com/ttracx/thox-kickstarter) | Pre-launch | This repo. Pitch, pricing, dates, video, copy, GTM. |
| [ttracx/thox-kickstarter-integration](https://github.com/ttracx/thox-kickstarter-integration) | Live + fulfillment | Compliant ops integration: backer reports, fulfillment risk, locked partner API. Deploys after Aug 12 launch. See [docs/KS_OPS_INTEGRATION.md](docs/KS_OPS_INTEGRATION.md) for deploy plan and launch-day gates. IP-033. |
| [ttracx/thox-ks-monitor](https://github.com/ttracx/thox-ks-monitor) | Live + post-pledge | Monitoring dashboard + backer CSV import + AI ops digest. KS-ToS-respecting; no credential storage. IP-034. |
| [ttracx/thox-quickstart](https://github.com/ttracx/thox-quickstart) | Fulfillment | Per-device flash + Tailscale enrollment + assembly QA packets. IP-026. |
| [ttracx/thox-configurator](https://github.com/ttracx/thox-configurator) | Customer-facing | Build-and-order wizard for ThoxKey + ThoxStick. Server-authoritative pricing; AI Assist re-validated by deterministic engine; Stripe checkout for Key path, reservation for Stick path. IP-037. |

If a date, a price, or a stretch goal changes in this repo, the monitor's reward-tier names must move with it.

## Maintainers

- Craig Ross (inventor, hardware)
- Phamy Xaypanya (inventor, software + campaign)
- cross80127 (write access, see [LICENSE](LICENSE))

## License

MIT for the docs and templates. The deliverables in `deliverables/` carry their own headers; the Word/PowerPoint files are all MIT-compatible.

---

THOX.ai - Your AI. Your Data. Your Rules.


## Repository neighbors

[ttracx/thoxcore](https://github.com/ttracx/thoxcore) is the flagship
runtime layer for the THOX device fleet. The August 2026 Kickstarter
devices (ThoxClip, ThoxMini, ThoxAir, ThoxNova) ship with THOXCore as the
on-device AI runtime layer.