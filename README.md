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
|---|---:|---:|---:|---:|---:|
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
