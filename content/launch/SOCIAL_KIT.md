# SOCIAL_KIT.md

Shareable asset list for the Aug 12, 2026 THOX.ai Kickstarter launch across LinkedIn, X (Twitter), Mastodon, and Reddit.

This file is the manifest. The actual asset files live in the THOX render pipeline drop at T-30 and the print-kit photography drop at T-40 to T-35. Where an asset is not yet rendered, the row is marked PLACEHOLDER with a render owner and an expected drop date.

Brand:
- Background: #0B1220
- Foreground: #F2F4F8
- Accent cyan: #27E5FF
- Accent magenta: #FF3DA8
- Typography: IBM Plex Sans for any overlay text, JetBrains Mono for any code-snippet overlays.

Asset count: 21 assets across 5 platforms.

---

## Platform-sized device shots

### LinkedIn (1200 by 627 pixels)

| Asset ID | Subject | Source | Status | Notes |
|---|---|---|---|---|
| LI-01 | ThoxClip hero on dark | thox-render pipeline | PLACEHOLDER (drop T-30) | Centered device, accent cyan rim light |
| LI-02 | ThoxMini on desk with keyboard fragment | thox-render pipeline | PLACEHOLDER (drop T-30) | Lifestyle frame; muted ambient |
| LI-03 | ThoxAir 4-node MagStack stack | thox-3dprint-kit PR #3 photo | PLACEHOLDER (drop T-40 to T-35; needs print) | Real-photo preferred over render |
| LI-04 | ThoxNova workstation hero | thox-render pipeline | PLACEHOLDER (drop T-30) | Centered hero, accent magenta underline on the THOX wordmark |

Aspect ratio: 1.91:1 (LinkedIn link-preview safe).

### X / Twitter (1200 by 675 pixels)

| Asset ID | Subject | Source | Status | Notes |
|---|---|---|---|---|
| TW-01 | ThoxClip hero on dark | thox-render pipeline | PLACEHOLDER (drop T-30) | Recrop of LI-01 to 16:9 |
| TW-02 | ThoxMini on desk with keyboard fragment | thox-render pipeline | PLACEHOLDER (drop T-30) | Recrop of LI-02 to 16:9 |
| TW-03 | ThoxAir 4-node MagStack stack | thox-3dprint-kit PR #3 photo | PLACEHOLDER (drop T-40 to T-35) | Recrop of LI-03 to 16:9 |
| TW-04 | ThoxNova workstation hero | thox-render pipeline | PLACEHOLDER (drop T-30) | Recrop of LI-04 to 16:9 |

Aspect ratio: 16:9 (X card / Mastodon preview safe).

---

## Animated MagStack assembly GIF

| Asset ID | Subject | Source | Status | Notes |
|---|---|---|---|---|
| GIF-01 | 4-node MagStack Cluster Dock assembly loop | thox-render pipeline + STORYBOARD 30s alt cut | PLACEHOLDER (drop T-14 to T-12) | Loop length 4 to 6 seconds, 800 by 800 pixels, optimized under 4 MB |

Source frames: pulled from the STORYBOARD Beat 3 sequence (the multi-material print plus the magnetic auto-align reveal). Reference the 30-second alt cut in `content/launch/STORYBOARD.md`.

Render owner: ops (renderer-agent in the THOX agent fleet). Backup: hand-shot on a phone of the actual printed dock if the render slips past T-12.

---

## Brand sticker set

| Asset ID | Subject | Source | Status | Notes |
|---|---|---|---|---|
| ST-01 | THOX wordmark sticker, 3 by 1 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Sticker mule die-cut spec |
| ST-02 | ThoxClip product sticker, 2 by 2 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Round die-cut |
| ST-03 | ThoxMini product sticker, 2 by 2 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Round die-cut |
| ST-04 | ThoxAir product sticker, 2 by 2 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Round die-cut |
| ST-05 | ThoxNova product sticker, 2 by 2 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Round die-cut |
| ST-06 | MagStack wordmark sticker, 3 by 0.75 inch | thox-render pipeline | PLACEHOLDER (drop T-30) | Sticker mule die-cut spec |

Manufacturing target: 500-unit run via a sticker print vendor at T-21. Distribution: 250 in conference giveaway packs, 100 with the assembled-tier ThoxAir backers, 150 reserved for founder use.

Color spec: matte black background, foreground in THOX cyan (#27E5FF) for wordmarks, foreground in foreground gray (#F2F4F8) for device silhouettes. No magenta on stickers (magenta is reserved for digital surfaces).

---

## 30-second vertical video cut

| Asset ID | Subject | Source | Status | Notes |
|---|---|---|---|---|
| VID-01 | 30-second vertical cut of the hero video | STORYBOARD alt 30s cut | PLACEHOLDER (drop T-12 to T-7) | 1080 by 1920, MP4 H.264 + AAC, under 50 MB |

Source: the 30-second alternative cut described in `content/launch/STORYBOARD.md`. Vertical reframe is owned by the edit team. Captions baked in for TikTok, Instagram Reels, YouTube Shorts; SRT sidecar for LinkedIn and X.

Audio: same hero-cut music bed, no voiceover. Captions display the founder-list bullet points pulled from the EMAIL_SEQUENCE T-7 email.

---

## Cross-platform copy snippets (ready-to-paste)

### LinkedIn hooks (used in the LINKEDIN_POSTS.md sequence; here for cross-poster reference)

- "We have been heads-down for 6 months building THOX. Here is the thing we could not stop thinking about."
- "How I think about hardware design for THOX."
- "The thing about edge AI nobody talks about is the model loadout."
- "Why I co-engineered a magnetic stack."

### X (Twitter) snippets

Limit 280 chars; first-tweet-of-thread style.

- "THOX is private AI you can hold. 4 devices from $39 to $499. Kickstarter Aug 12. https://thox.ai/launch"
- "Edge AI is finally fast enough. THOX ships 4 devices on Aug 12. Apache-2.0 software, owned hardware, no cloud dependency. https://thox.ai/launch"
- "We shipped a 7-backend Rust router (LiteRT + OpenAI HTTP + Ollama + llama.cpp + vLLM + TensorRT + MLX). 145/145 tests green. It is the runtime for the THOX device family. Aug 12 launch."

### Reddit-style longform (subreddit-friendly)

Drop targets: r/LocalLLaMA, r/selfhosted, r/raspberry_pi, r/3Dprinting, r/edge_computing, r/MachineLearning (research-tagged, not promo).

Format: title plus 100-300 word body, no link in the title, link in the first comment to respect subreddit promo rules. Founder posts only (Tommy and Craig accounts; no astroturf).

Suggested titles:

- "We built a 7-adapter on-device LLM router in Rust (Apache-2.0). All 145 tests green. Shipping inside a 4-device hardware family in Aug."
- "Multi-material 3D-print kit for a magnetic 4-node cluster dock. Files are on GitHub. AMA."
- "How we matched a hardware enclosure to the QIDI Q2 Combo print bed (270 by 270 by 256 mm)."

### Mastodon

500-character limit. Same hooks as X but with longer body. Lead with thox.ai/launch and finish with #onedeviceai #edgeai.

---

## Distribution schedule (high level)

| Window | Platforms | Asset focus |
|---|---|---|
| T-42 to T-28 | LinkedIn (founder posts), Mastodon, X | LI-01, LI-04, TW-01, TW-04; LinkedIn long-form |
| T-28 to T-14 | LinkedIn, X, Mastodon | LI-02, LI-03, TW-02, TW-03; engineering deep-dive |
| T-14 to T-7 | LinkedIn, X, Mastodon, Reddit | GIF-01, VID-01; cluster + manufacturing story |
| T-7 to T-0 | All platforms | Full set; daily cadence |
| T-0 (launch day) | All platforms | Full set; coordinated 09:01 PT drop |
| T+1 to T+30 | LinkedIn, X, Mastodon | Stretch goal unlocks, behind-the-scenes, daily updates |

The full social calendar with per-post timing lives at `social/CALENDAR.md` (TBD if not yet created).

---

## Asset hygiene checklist

For every shipped asset:

- [ ] Filename follows `thox_<asset_id>_<platform>_<dimension>.<ext>` (e.g., `thox_LI-01_linkedin_1200x627.png`).
- [ ] Color profile: sRGB.
- [ ] No em-dashes in any overlay text.
- [ ] No emojis in any overlay text.
- [ ] Alt text written for every image, stored alongside the asset in a `.alt.txt` sidecar.
- [ ] License: Apache-2.0 for files placed in public repos; the renders themselves are owned by THOX.ai LLC.
- [ ] No fabricated quotes from anyone outside the founder team appear in any asset.

---

## Where this lives

- Manifest: this file at `content/launch/SOCIAL_KIT.md`
- Asset binaries: TBD render pipeline drop directory at T-30 (renders) and T-12 (video)
- Distribution calendar: `social/CALENDAR.md` (TBD)
- Brand reference: `content/launch/PRESS_KIT.md` and the THOX system-prompts repo for component CSS / tokens
- Storyboard source: `content/launch/STORYBOARD.md`

Owner: Tommy schedules. Craig signs off on every device-photo asset (LI-03, TW-03, GIF-01, and the assembled-tier sticker set). ops owns the render and the platform-resize pipeline.
