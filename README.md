# thox-kickstarter-quick-launch

<!-- thox-badges -->
[![Build](https://img.shields.io/badge/build-docs%20validated-10B981?style=flat-square)](.github/workflows/validate.yml)
[![Tests](https://img.shields.io/badge/tests-campaign%20checks-10B981?style=flat-square)](tests/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![THOX.ai](https://img.shields.io/badge/THOX.ai-Kickstarter%20Launchkit-1f6feb?style=flat-square)](https://thox.ai)
[![Local-first](https://img.shields.io/badge/local--first-yes-10B981?style=flat-square)](#privacy-positioning)
[![Privacy-first](https://img.shields.io/badge/privacy--first-yes-10B981?style=flat-square)](#privacy-positioning)
[![Status](https://img.shields.io/badge/status-quick--launch%20ready-d29922?style=flat-square)](#launch-readiness)
<!-- /thox-badges -->

## Design Assets

This repository includes the THOX.ai Kickstarter campaign design assets from Claude Design.
See the `designs/thox-ai-kickstarter-campaign-handoff/` directory for the HTML/CSS/JS prototypes.
Key design files include:
- [ThoxOS Mini Demo.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/ThoxOS%20Mini%20Demo.dc.html)
- [Kickstarter Story.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Kickstarter%20Story.dc.html)
- [Campaign Runbook.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Campaign%20Runbook.dc.html)
- [Model Gallery.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Model%20Gallery.dc.html)
- [Software Demo.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Software%20Demo.dc.html)
- [THOX Experience Fabric.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/THOX%20Experience%20Fabric.dc.html)
- [Campaign Animatic -export-.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Campaign%20Animatic%20-%20export-.dc.html)
- [Campaign Animatic.dc.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Campaign%20Animatic.dc.html)
- [THOX Video Storyboard (standalone).html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/THOX%20Video%20Storyboard%20(standalone).html)
- [Video Storyboard.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/Video%20Storyboard.html)
- [THOX Kickstarter Story.html](https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/designs/thox-ai-kickstarter-campaign-handoff/project/THOX%20Kickstarter%20Story.html)

The primary design file is `designs/thox-ai-kickstarter-campaign-handoff/project/THOX Kickstarter Story.html`.

## Campaign digital content & production (`kickstarter/`)

Deployable, brand-consistent campaign content generated from the design handoff and kept on the THOX Experience Fabric tokens. Everything is browsable and interactive — start at the hub and open any page in a browser.

**Campaign focus:** this Kickstarter launches four devices — **ThoxKey, ThoxMini Air, ThoxMini, ThoxClip** — and the **MeshStack app**. THOX Nova, the Pro / Pro Max / Pro Ultra line, and ThoxMigrate are shown as **roadmap and vision**, not campaign rewards. Device copy (full page copy + short graphic copy) lives in [`kickstarter/copy.md`](kickstarter/copy.md).

| What | Where | Notes |
|---|---|---|
| **Campaign site hub** | [`kickstarter/site/index.html`](kickstarter/site/index.html) | One deployable static bundle linking **every** page below. Vendored React/Babel, no CDN needed. Serve with `python3 -m http.server --directory kickstarter/site`. |
| **ThoxOS Demo** (flagship) | [`kickstarter/site/thoxos-demo.html`](kickstarter/site/thoxos-demo.html) | The full realistic ThoxOS desktop: lock screen, menu bar, ⌘K palette, app dock, live on-device inference. |
| **MeshStack app** (5 platforms) | `kickstarter/site/meshstack-{ios,ipad,macos,windows,android}.html` | Fully-functional standalone MeshStack demos: identity, pairing, connect, monitor. |
| **Flagship devices** (4) | `kickstarter/site/thox-{nova,pro,pro-max,pro-ultra}.html` | Interactive product pages for the upcoming THOX Nova + Pro series edge-AI line. |
| **ThoxMigrate** | [`kickstarter/site/thoxmigrate.html`](kickstarter/site/thoxmigrate.html) | Cloud-to-edge AI migration tool (scan, map, migrate). |
| **Campaign animatic** | `kickstarter/site/animatic.html` | Working-concept animatic video of the storyboard (`assets/video/`). Device close-ups in `assets/device/video/`. |
| **Copy system** | [`kickstarter/copy.md`](kickstarter/copy.md) | Full + graphic-ready device copy; single source of truth. |
| **Production Tracker** | [`kickstarter/site/production-tracker.html`](kickstarter/site/production-tracker.html) | Interactive film shot tracker — device capture inventory + 117 storyboard shots, To shoot → Captured → Approved, notes, JSON/CSV export, saved in-browser. |
| **Visual storyboard** | [`kickstarter/site/storyboard.html`](kickstarter/site/storyboard.html) | QA-approved previz, 13 modules, 9:40 master. |
| **Kickstarter Story** | [`kickstarter/story.html`](kickstarter/story.html) · [`story.md`](kickstarter/story.md) | Self-contained Story page + paste-ready copy. |
| **Production inventory & checklist** | [`kickstarter/PRODUCTION.md`](kickstarter/PRODUCTION.md) | Printable device + scene checklist and capture workflow. |
| **Full guide** | [`kickstarter/README.md`](kickstarter/README.md) | Deliverable map, provenance, and build/regenerate instructions. |

Also included under `kickstarter/site/`: Campaign Runbook, Model Gallery, Software Demo, ThoxOS Mini Demo, and the Campaign Animatic — the interactive design prototypes, rendered by the vendored runtime.

**Ready-to-use Kickstarter campaign source of truth for the THOX.ai hardware launch.**

This repository is the campaign operating system for **ThoxKey**, **ThoxMini**, **ThoxMini Air**, and **ThoxClip**. It contains the Kickstarter page copy, reward tiers, launch runbook, founder video scripts, graphic-generation prompts, image-to-video prompts, finalized device demo runbooks, and repository-standard planning docs.

> Campaign promise: private AI hardware for your desk, pocket, and workflow. Your AI. Your Data. Your Rules.

---

## Canonical launch device lineup

Only these four devices are in scope for the Kickstarter campaign and demos:

1. **ThoxKey**
2. **ThoxMini**
3. **ThoxMini Air**
4. **ThoxClip**

All campaign copy, demo scripts, video walkthroughs, reward tiers, and validation checks must stay aligned to this four-device lineup.

---

## Quick launch pricing

| Device | Retail price | Kickstarter special | Early-bird price | Early-bird cap | Savings vs retail |
|---|---|---|---|---|---|
| ThoxKey | $39.99 | $34 | $24 | 500 | up to 40% |
| ThoxMini | $199 | $169 | $149 | 300 | up to 25% |
| ThoxMini Air | $99 | $79 | $69 | 350 | up to 30% |
| ThoxClip | $399 | $329 | $299 | 200 | up to 25% |

Retail pricing is the post-campaign MSRP. Kickstarter pricing is the pledge price used in the live rewards matrix. Early-bird tiers are capped to protect margin and create launch-day urgency.

---

## What is in this repo

```text
thox-kickstarter-quick-launch/
├── README.md
├── ecosystem_map.md
├── mvp_catalog.md
├── development_queue.md
├── SECURITY.md
├── CHANGELOG.md
├── .env.example
├── designs/
│   └── thox-ai-kickstarter-campaign-handoff/
│       ├── README.md
│       ├── project/
│       │   ├── ThoxOS Mini Demo.dc.html
│       │   ├── Kickstarter Story.dc.html
│       │   ├── Campaign Runbook.dc.html
│       │   ├── Model Gallery.dc.html
│       │   ├── Software Demo.dc.html
│       │   ├── THOX Experience Fabric.dc.html
│       │   ├── Campaign Animatic -export-.dc.html
│       │   ├── Campaign Animatic.dc.html
│       │   ├── THOX Video Storyboard (standalone).html
│       │   ├── Video Storyboard.html
│       │   ├── THOX Kickstarter Story.html
│       │   └── [other project files]
│       └── [assets, exports, etc.]
├── docs/
│   ├── CAMPAIGN_INFO.md
│   ├── KICKSTARTER_PAGE_COPY.md
│   ├── REWARDS_MATRIX.md
│   ├── QUICK_LAUNCH_RUNBOOK.md
│   ├── SETUP_GUIDE.md
│   ├── LAUNCH_CHECKLIST.md
│   ├── VIDEO_PRODUCTION.md
│   ├── VIDEO_SCRIPT.md
│   ├── VIDEO_SCENE_PROMPTS.md
│   ├── VIDEO_WALKTHROUGH_SCRIPT.md
│   └── NEW_REPOSITORY_SETUP.md
├── prompts/
│   └── README.md
├── templates/
├── scripts/
│   └── validate_campaign.py
├── tests/
│   └── test_campaign_docs.py
├── examples/
│   ├── reward-tier-import.csv
│   └── demo-shot-list.csv
├── agent_tasks/
│   └── launch-operator.md
└── demo/
    ├── README.md
    ├── DEVICE_DEMOS.md
    ├── RECORDING_RUNBOOK.md
    └── DEMO_ACCEPTANCE_CHECKLIST.md
```

---

## Start here

| Goal | File |
|---|---|
| Answer "what model + firmware ships on each SKU?" | [docs/PORTFOLIO_RELEASE_MATRIX.md](docs/PORTFOLIO_RELEASE_MATRIX.md) — canonical single-page truth for SKU x model x device firmware x factory registry x release (refreshed 2026-07-02) |
| Copy the Kickstarter Story page | [docs/KICKSTARTER_PAGE_COPY.md](docs/KICKSTARTER_PAGE_COPY.md) |
| Configure Kickstarter rewards | [docs/REWARDS_MATRIX.md](docs/REWARDS_MATRIX.md) |
| Run the campaign day by day | [docs/QUICK_LAUNCH_RUNBOOK.md](docs/QUICK_LAUNCH_RUNBOOK.md) |
| Finalize and record device demos | [demo/DEVICE_DEMOS.md](demo/DEVICE_DEMOS.md) + [demo/RECORDING_RUNBOOK.md](demo/RECORDING_RUNBOOK.md) |
| Approve Kickstarter-ready demo clips | [demo/DEMO_ACCEPTANCE_CHECKLIST.md](demo/DEMO_ACCEPTANCE_CHECKLIST.md) |
| Produce the hero video | [docs/VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md) + [docs/VIDEO_PRODUCTION.md](docs/VIDEO_PRODUCTION.md) |
| Generate graphics and image-to-video clips | [docs/VIDEO_SCENE_PROMPTS.md](docs/VIDEO_SCENE_PROMPTS.md) |
| Record Tommy + Craig walkthrough | [docs/VIDEO_WALKTHROUGH_SCRIPT.md](docs/VIDEO_WALKTHROUGH_SCRIPT.md) |
| Understand the product ecosystem | [ecosystem_map.md](ecosystem_map.md) |
| Prioritize launch work | [development_queue.md](development_queue.md) |
| Materialize as a separate repository | [docs/NEW_REPOSITORY_SETUP.md](docs/NEW_REPOSITORY_SETUP.md) |

---

## Launch readiness

Run the campaign validator before copying anything into Kickstarter:

```bash
python3 scripts/validate_campaign.py
```

The validator checks for:

- required product names
- required retail and Kickstarter prices
- outdated device names from older campaign drafts
- required founder roles: Tommy Xaypanya, CTO and Craig Ross, CEO
- required documentation files
- required device demo guardrails and acceptance criteria

For CI usage:

```bash
pytest -q
```

---

## Demo rule of record

The demos show one integrated four-device flow:

1. **ThoxKey** unlocks the private workspace and carries user-owned identity/configuration.
2. **ThoxMini** runs compact local services, lightweight agents, encrypted storage, and private automations.
3. **ThoxMini Air** coordinates nearby local devices as a wireless local-first companion.
4. **ThoxClip** captures context and triggers workflows into the private THOX workspace.
5. Heavier work routes to capable local hardware the user owns.

No demo clip goes into Kickstarter until Craig Ross, CEO and Tommy Xaypanya, CTO both approve the final exported segment.

---

## Privacy positioning

THOX.ai should never imply that small devices run models they cannot realistically run. The campaign copy uses this rule:

1. **ThoxKey** stores and carries the user-owned private AI identity, configuration, encrypted vault, and portable THOX launcher.
2. **ThoxMini** is the local mini compute node for desk and field use.
3. **ThoxMini Air** is the low-cost wireless edge companion and routing node.
4. **ThoxClip** is the premium wearable / clip-on private AI capture and control device.
5. Larger model workloads are routed to capable local THOX nodes or user-owned computers.

This keeps the campaign credible, fundable, and aligned with the THOX.ai principle: local-first does not mean overclaiming.

---

## Founder roles for campaign materials

- **Craig Ross, CEO, THOX.ai**: mission, business, manufacturing plan, trust, backer commitment.
- **Tommy Xaypanya, CTO, THOX.ai**: technical architecture, local-first AI runtime, security posture, demo walkthrough.

Use these exact roles in Kickstarter, press, video, social, and BackerKit copy.

---

## Repository standards included

This repo follows the THOX.ai quick-launch repository standard:

- source-of-truth README
- `ecosystem_map.md`
- `mvp_catalog.md`
- `development_queue.md`
- security posture
- changelog
- environment example
- scripts, tests, examples, agent tasks, and demo notes
- CI-style validation for campaign copy, device demo, and acceptance criteria consistency

---

## Maintainers

- Craig Ross, CEO, THOX.ai
- Tommy Xaypanya, CTO, THOX.ai

---

THOX.ai — Your AI. Your Data. Your Rules.