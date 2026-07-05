# Ecosystem Map

The thox-kickstarter playbook is one node in a small constellation of repos
that together run the Aug 12 2026 launch and the months that follow. This
file lists the sibling repos and the role each one plays.

## Sibling repos

### thox-kickstarter-integration
- **Role**: Compliant Kickstarter creator-ops ingestion + fulfillment risk + locked partner-API adapter
- **Distinct from this repo**: This repo is the launch PLAYBOOK (rewards, dates, copy). `thox-kickstarter-integration` is the operational data plane after the campaign goes live.
- **Stack**: FastAPI + SQLAlchemy + Pydantic v2; optional Postgres profile
- **Compliance posture**: no scraping, no password storage, partner API behind locked flag
- **When to use**: post-launch (Aug 12+) for backer-report ingestion, fulfillment tracking, referral analytics
- **Identity**: dev@thox.ai collaborator on the Kickstarter campaign
- **Sister deliverable**: fulfillment-risk detector (in flight on PR #1 of that repo as of 2026-06-24)
- **Launch-day gates**: see `docs/KS_OPS_INTEGRATION.md`

### thox-ks-monitor
- **Role**: Live ops dashboard during the funded campaign; backer CSV import + opt-in public scrape + Claude digest
- **Distinct from `thox-kickstarter-integration`**: Monitor is a Next.js + Supabase UI for human campaign managers; integration is the FastAPI ingestion data plane that feeds it. They compose; they do not overlap.
- **Repo**: [ttracx/thox-ks-monitor](https://github.com/ttracx/thox-ks-monitor)

### thox-quickstart
- **Role**: Per-device flash + Tailscale enrollment + assembly QA packets
- **When**: Fulfillment (Nov 2026 onward)
- **Repo**: [ttracx/thox-quickstart](https://github.com/ttracx/thox-quickstart)

### thox-configurator
- **Role**: Customer-facing build-and-order wizard for ThoxKey + ThoxStick
- **When**: Halo / parallel revenue (any time)
- **Repo**: [ttracx/thox-configurator](https://github.com/ttracx/thox-configurator)

## Where this repo sits in the loop

```
Pre-launch (now to Aug 12)
  this repo (thox-kickstarter)
    - rewards, copy, pricing, dates
    - hero video script
    - press kit
    - launch checklist

Launch day (Aug 12 2026, 9am PT)
  this repo + thox-kickstarter-integration smoke-tested
    - deploy integration on ops VPS BEFORE the click-launch moment
    - dev@thox.ai already added as KS collaborator
    - first backer-report import staged to run within minutes of live

Live campaign (Aug 12 to Sep 11)
  thox-kickstarter-integration (data plane)
    - backer-report ingestion
    - referral analytics
    - fulfillment-risk surfacing
    - update drafter
  thox-ks-monitor (UI)
    - human-facing dashboard pulls from integration

Fulfillment (Nov 2026 onward)
  thox-quickstart
    - per-device flash + QA packets

Halo / parallel revenue (any time)
  thox-configurator
    - customer build wizard
```
