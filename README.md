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
│   └── LAUNCH_CHECKLIST.md        T-30 to T+7, hour by hour
├── assets/
│   ├── README.md                  brand palette + asset list
│   └── (logos, badges, device photos staged here pre-launch)
├── templates/
│   ├── pre-launch-email.md
│   ├── launch-day-email.md
│   ├── weekly-update.md
│   ├── stretch-unlock-update.md
│   └── reply-snippets.md          canned replies for the seven most common questions
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
| About to launch (T-30 days or less) | [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) |
| Pitching to a partner or angel | [deliverables/THOX_Kickstarter_Deck.pptx](deliverables/THOX_Kickstarter_Deck.pptx) + [docs/CAMPAIGN_INFO.md](docs/CAMPAIGN_INFO.md) |
| Recording the hero video | [deliverables/THOX_Video_Script.docx](deliverables/THOX_Video_Script.docx) + [docs/VIDEO_PRODUCTION.md](docs/VIDEO_PRODUCTION.md) |
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

## Single source of truth

Anything that needs to be consistent across the campaign (prices, dates, stretch amounts, device specs, inventor names, IP numbers) lives in this repo. The Kickstarter page, BackerKit setup, press releases, social posts, and email blasts all pull from here.

If a number changes, change it in this repo first, then update downstream.

## Maintainers

- Craig Ross (inventor, hardware)
- Phamy Xaypanya (inventor, software + campaign)
- cross80127 (write access, see [LICENSE](LICENSE))

## License

MIT for the docs and templates. The deliverables in `deliverables/` carry their own headers; the Word/PowerPoint files are all MIT-compatible.

---

THOX.ai - Your AI. Your Data. Your Rules.
