# Kickstarter Setup Guide

Step-by-step setup for the THOX.ai quick-launch Kickstarter campaign.

## Before opening Kickstarter

| Status | Item | Source |
|---|---|---|
| [ ] | Product lineup locked | `docs/CAMPAIGN_INFO.md` |
| [ ] | Rewards locked | `docs/REWARDS_MATRIX.md` |
| [ ] | Story page copy locked | `docs/KICKSTARTER_PAGE_COPY.md` |
| [ ] | Hero video script locked | `docs/VIDEO_SCRIPT.md` |
| [ ] | Founder walkthrough script locked | `docs/VIDEO_WALKTHROUGH_SCRIPT.md` |
| [ ] | Graphic and motion prompts ready | `docs/VIDEO_SCENE_PROMPTS.md` |
| [ ] | Campaign validator passing | `python3 scripts/validate_campaign.py` |
| [ ] | Business bank, tax, and identity documents ready | internal ops |
| [ ] | Final approved product imagery ready | `assets/` |

## Account and security setup

1. Use a THOX.ai-controlled email address, not a personal inbox.
2. Store credentials in the company password manager.
3. Enable two-factor authentication.
4. Keep recovery codes in the company vault.
5. Limit collaborator access to the minimum permissions needed.
6. Remove collaborators after launch if they no longer need access.

## Project basics

Use these values unless leadership changes them in `docs/CAMPAIGN_INFO.md`.

| Kickstarter field | Value |
|---|---|
| Project name | THOX.ai Private AI Hardware |
| Short blurb | Private AI hardware you own: ThoxKey, ThoxMini Air, ThoxMini, and ThoxClip. Local-first. Portable. Built for real workflows. |
| Category | Technology > Hardware |
| Funding goal | $150,000 recommended |
| Duration | 30 days |
| Currency | USD |
| Launch target | August 12, 2026, 9:00 AM PT |
| End target | September 11, 2026, 10:00 PM PT |

## Story page setup

Paste sections from `docs/KICKSTARTER_PAGE_COPY.md` in this order:

1. Hero
2. Why we are building this
3. Meet the devices
4. How the THOX flow works
5. Kickstarter specials
6. Why Kickstarter
7. Prototype and production status
8. Delivery plan
9. Risks and challenges
10. Founder bios
11. Backer promise
12. Closing CTA

Use final approved real prototype photos for reward tiles when available. If a generated graphic is used for concept storytelling, label it clearly as an illustration or concept visual.

## Rewards setup

Create rewards from `docs/REWARDS_MATRIX.md`.

Rules for data entry:

- Use exact tier names.
- Use exact pledge amounts.
- Use exact quantity caps.
- Use exact estimated delivery months.
- Do not create unapproved hidden tiers.
- Do not change reward prices mid-launch without a leadership decision and a public note.
- Add-ons should be configured only after main reward tiers are correct.

## Shipping setup

Use post-campaign pledge manager collection for final shipping. Put estimated ranges on the page so backers are not surprised. Do not promise free international shipping unless finance approves it.

## Risks section

Paste the risks from `docs/KICKSTARTER_PAGE_COPY.md` and expand with any confirmed manufacturing, compliance, or fulfillment issue. Be specific. Hardware backers trust teams that explain risks clearly.

## FAQ starter set

Add these questions:

### Is ThoxKey a standalone AI computer?

No. ThoxKey is a USB private AI identity, launcher, recovery, and configuration device. Heavier AI workloads route to capable local THOX nodes or user-owned computers.

### Will my data leave my device?

THOX.ai is designed local-first. Cloud connectors, if enabled, should be optional user choices. The campaign should never imply that every workflow is always offline in every configuration.

### Which device should I back first?

Start with ThoxKey for the lowest-cost entry point. Choose ThoxMini Air for wireless companion workflows. Choose ThoxMini for local services and lightweight agents. Choose ThoxClip for premium capture and command workflows.

### Is ThoxClip a medical or emergency device?

No. ThoxClip is a private AI capture and workflow control device. It is not a medical, emergency response, regulated safety, or surveillance device.

### When will rewards ship?

Estimated delivery starts with ThoxKey in January 2027, then ThoxMini Air in February 2027, ThoxMini in March 2027, ThoxClip in April 2027, and Complete Founder Kits in May 2027.

### Can I add another device later?

Yes. Add-ons are planned after campaign close through the pledge manager, subject to inventory and production limits.

### Are generated images final production photos?

No. Generated visuals are used only for concept art, motion graphics, or explainers. Final reward tiles should use approved prototype or production photography.

### What happens if manufacturing slips?

We will update backers with what slipped, why it slipped, what we are doing next, and when the next update will arrive.

## Pre-launch page

Turn on the pre-launch page after the story, hero image, blurb, and rewards are ready for internal review. The notify list is the main pre-launch KPI.

Targets:

| Date window | Notify-list target |
|---|---:|
| T-30 | 500 |
| T-21 | 1,000 |
| T-14 | 1,500 |
| T-7 | 2,500 |
| T-1 | 3,500 |

## Final go/no-go checklist

Do not click Launch unless every row is true.

| Status | Requirement |
|---|---|
| [ ] | Campaign validator passes |
| [ ] | Product names match: ThoxKey, ThoxMini Air, ThoxMini, ThoxClip |
| [ ] | Retail prices match: $39.99, $99, $199, $399 |
| [ ] | Kickstarter prices match approved matrix |
| [ ] | Founder roles match: Craig Ross CEO, Tommy Xaypanya CTO |
| [ ] | Hero video uploaded and encoded |
| [ ] | Rewards preview tested on mobile |
| [ ] | Risks section is specific and honest |
| [ ] | No old product names remain in canonical docs |
| [ ] | Payment setup verified |
