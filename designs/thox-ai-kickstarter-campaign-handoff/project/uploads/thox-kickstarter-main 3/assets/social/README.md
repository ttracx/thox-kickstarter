# Social Assets

Staging area for every social asset produced by the [AI content pipeline](../../docs/AI_CONTENT_PIPELINE.md)
(graphics with OpenAI `gpt-image-1`, motion with Grok Imagine). Drop finished, brand-QC'd files
here before scheduling. This README is the spec; the binaries themselves are gitignore'd until
publish (see root `.gitignore`).

## Folder layout

```
assets/social/
├── README.md           this file
├── prelaunch/          Phase 1 awareness assets
├── ramp/               Phase 2 ramp assets
├── countdown/          T-7 → T-0 series (one template, 8 numbers)
├── launch/             T-0 launch-day assets
├── sustain/            T+1 → T+27 stretch/proof/people
├── close/              final-48 urgency assets
├── fulfillment/        ship-milestone assets
├── profile/            avatars, banners, OG cards (one-time brand set)
└── _sidecars/          .txt reproducibility files (prompt + seed + tool)
```

Create the phase folders as you produce assets; don't pre-create empties.

## Naming grammar (from AI_CONTENT_PIPELINE §7)

```
{phase}_{pillar}_{device|topic}_{surface}_{v#}.{ext}

prelaunch_proof_thoxmini_9x16_v2.mp4
launch_campaign_clusterpack_1x1_v1.png
countdown_product_thoxclip_9x16_t-5_v1.mp4
close_campaign_final48_16x9_v3.mp4
profile_brand_wordmark_avatar_v1.png
```

- `phase` ∈ prelaunch · ramp · countdown · launch · sustain · close · fulfillment · profile
- `pillar` ∈ product · proof · thesis · people · campaign · brand
- `surface` ∈ 1x1 · 4x5 · 9x16 · 16x9 · og · avatar · banner
- `v#` increments per revision; keep the last approved version, archive older ones.

## Sidecar rule (reproducibility)

Every asset gets a sibling `_sidecars/{same-name}.txt` containing:

```
tool:    gpt-image-1 (still) + grok-imagine image-to-video (motion)
size:    1024x1536 -> cropped 1080x1920
seed:    <openai seed if used>
still_prompt: <full filled prompt from openai-image-prompts.md>
motion_prompt: <full filled prompt from grok-video-prompts.md>
source_still: prelaunch_proof_thoxmini_9x16_v2_still.png
qc: passed YYYY-MM-DD by <initials>
notes: <anything a re-run needs>
```

If an asset has no sidecar, it is not shippable — a number can change mid-campaign and we must
be able to regenerate (AI_CONTENT_PIPELINE §9).

## Brand tokens (canonical — same as ../README.md)

| Token | Hex | Use |
|---|---|---|
| Emerald | `#10b981` | Primary accent |
| Emerald light | `#34d399` | Hover / secondary highlight |
| Neon emerald | `#00ff88` | Status pip, sparing |
| MagStack purple | `#a855f7` | Cluster leader / Nova badge only |
| Amber | `#f59e0b` | Warning state only |
| Ink | `#0a0e14` | Background / dark surface |
| White | `#fafafa` | Text on dark |
| Slate light | `#94a3b8` | Secondary text |

Typography: **Inter** (sans), **JetBrains Mono** (numbers/labels). All final price/date/spec
type is overlaid in real fonts in post — never trusted to the generator.

## Surface dimensions (quick ref — full table in SOCIAL_MEDIA_CAMPAIGN §6)

| Surface | Dimensions |
|---|---|
| 1x1 (carousel/tile) | 1080×1080 |
| 4x5 (IG portrait) | 1080×1350 |
| 9x16 (Stories/Reels/TT/Shorts) | 1080×1920 |
| 16x9 (in-feed video) | 1920×1080 |
| og (link card) | 1200×630 |
| avatar | 1024×1024 |
| banner | 1500×500 (X) / 1584×396 (LI) |

Keep all text and the wordmark inside the center 80% safe area.
