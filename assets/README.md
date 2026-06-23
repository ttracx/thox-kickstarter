# Assets

Pre-launch staging area for every visual asset that goes into the campaign.

## Brand tokens (canonical, do not edit casually)

| Token | Hex | Use |
|---|---|---|
| Emerald | `#10b981` | Primary accent |
| Emerald light | `#34d399` | Hover, secondary highlight |
| Neon emerald | `#00ff88` | Status pip, sparing use |
| MagStack purple | `#a855f7` | Cluster leader, secondary brand |
| Purple light | `#c084fc` | Hover for purple elements |
| Amber | `#f59e0b` | Warning, telemetry alert |
| Ink | `#0a0e14` | Body / dark surface |
| Surface | `#18181b` | Card surface in dark mode |
| Slate | `#475569` | Muted body text |
| Slate light | `#94a3b8` | Captions, secondary text |
| White | `#fafafa` | Body text on dark |

## Typography

- **Sans**: Inter (weights 400, 500, 600, 700, 800)
- **Mono**: JetBrains Mono (weights 400, 500, 600)

## Asset list (drop files here in /assets/<bucket>/)

| Bucket | Filename | Source |
|---|---|---|
| `assets/hero/` | thox-family-on-shelf-1024x576.jpg | Photo shoot, May 2026 |
| `assets/hero/` | thox-family-on-shelf-4096x2304.jpg | Photo shoot |
| `assets/device/` | thoxclip-hero-2400x1350.jpg | Photo shoot |
| `assets/device/` | thoxmini-hero-2400x1350.jpg | Photo shoot |
| `assets/device/` | thoxair-hero-2400x1350.jpg | Photo shoot |
| `assets/device/` | thoxnova-hero-2400x1350.jpg | Photo shoot |
| `assets/founders/` | craig-ross-1024x1024.jpg | Founder portrait |
| `assets/founders/` | phamy-xaypanya-1024x1024.jpg | Founder portrait |
| `assets/logo/` | thox-wordmark-on-light.svg | Brand kit |
| `assets/logo/` | thox-wordmark-on-dark.svg | Brand kit |
| `assets/diagrams/` | topology-emerald-1200x600.png | Exported from deck slide 9 |
| `assets/gifs/` | thoxclip-tap.gif | Edited from B-roll |
| `assets/gifs/` | thoxair-cluster.gif | Edited from B-roll |
| `assets/gifs/` | thoxnova-dashboard.gif | Screen capture |
| `assets/gifs/` | family-on-shelf.gif | Edited from B-roll |

## Bio (paste into Kickstarter Bio section)

The bio.md file lives at `assets/bio.md` and is sourced from `docs/CAMPAIGN_INFO.md` "Team bios" section. Update once in CAMPAIGN_INFO, then regenerate.

## Social media assets (AI-generated)

Social graphics and video are produced through the AI content pipeline and staged in
`assets/social/`. Graphics are generated with OpenAI `gpt-image-1`; motion/video is produced
with Grok Imagine. The heavy media is gitignore'd pre-publish; the spec and the reproducibility
sidecars are tracked.

| Need | Go to |
|---|---|
| What to post, when, and where | [docs/SOCIAL_MEDIA_CAMPAIGN.md](../docs/SOCIAL_MEDIA_CAMPAIGN.md) |
| How to make the graphics + video | [docs/AI_CONTENT_PIPELINE.md](../docs/AI_CONTENT_PIPELINE.md) |
| Staging spec + file naming | [assets/social/README.md](social/README.md) |
| Graphic prompts (OpenAI) | [templates/social/openai-image-prompts.md](../templates/social/openai-image-prompts.md) |
| Motion prompts (Grok) | [templates/social/grok-video-prompts.md](../templates/social/grok-video-prompts.md) |

The same brand tokens and typography above apply to every social asset. AI-generated *device*
imagery is stylized social art only — the Kickstarter Story page and reward tiles use real EVT
photography (see `docs/LAUNCH_CHECKLIST.md`).

