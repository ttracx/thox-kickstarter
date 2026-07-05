# THOX.ai Kickstarter Ecosystem Map

This map frames the Kickstarter campaign as an ecosystem, not a one-off landing page.

## North star

Launch the THOX.ai hardware family with a credible, local-first, privacy-first Kickstarter campaign that converts early backers while protecting trust.

## Ecosystem layers

```text
Backers
  -> Kickstarter page
      -> rewards matrix
      -> story page
      -> hero video
      -> FAQ and risks
  -> pledge manager
      -> shipping collection
      -> add-ons
      -> fulfillment updates
  -> THOX.ai device family
      -> ThoxKey
      -> ThoxMini Air
      -> ThoxMini
      -> ThoxClip
  -> THOX.ai runtime ecosystem
      -> local-first identity
      -> configuration and recovery
      -> lightweight agents
      -> local services
      -> optional user-chosen connectors
```

## Product roles

| Device | Ecosystem role | Core promise | Boundary |
|---|---|---|---|
| ThoxKey | Identity and portability | Carry your THOX setup | Not a standalone LLM computer |
| ThoxMini Air | Wireless local companion | Coordinate nearby devices | Not a high-end inference workstation |
| ThoxMini | Compact local compute | Run local services and lightweight agents | Not unlimited large-model hardware |
| ThoxClip | Premium capture and command | Capture context and trigger workflows | Not medical, emergency, safety, or surveillance hardware |

## Campaign modules

| Module | AI slice | Backend slice | Frontend slice |
|---|---|---|---|
| Kickstarter Story | Claim-safe copy, visual prompts | Source-of-truth docs | Kickstarter page |
| Rewards | Pricing checks | CSV import, pledge mapping | Reward cards |
| Video | Scene prompts, script, captions | Asset tracking | Hero video and walkthrough |
| Operations | Daily update drafting | Runbook, metrics log | Updates, email, comments |
| Fulfillment | Risk summaries | Pledge manager mapping | Backer surveys |

## Data flow

```text
CAMPAIGN_INFO.md
  -> REWARDS_MATRIX.md
  -> KICKSTARTER_PAGE_COPY.md
  -> VIDEO_SCRIPT.md
  -> VIDEO_SCENE_PROMPTS.md
  -> SETUP_GUIDE.md
  -> LAUNCH_CHECKLIST.md
  -> QUICK_LAUNCH_RUNBOOK.md
```

## Trust boundaries

- Generated visuals are concept visuals unless replaced with real prototype photos.
- Device capabilities must be described by role, not hype.
- Security claims must be scoped to the implementation shown.
- Delivery estimates must include risk communication.
- Optional cloud connectors must never be presented as mandatory.

## External systems

| System | Use | Notes |
|---|---|---|
| Kickstarter | Campaign page, rewards, comments, updates | Public campaign surface |
| Pledge manager | Surveys, shipping, add-ons | Configure after campaign close |
| Email service provider | Launch emails and updates | Use double opt-in |
| GitHub | Source of truth and validation | This repository |
| Video editor | Hero video and walkthrough exports | Uses prompt docs and scripts |
| Asset generator | Graphics and motion clips | Use prompt chain in `docs/VIDEO_SCENE_PROMPTS.md` |
