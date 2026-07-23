# THOX.ai Kickstarter Review — 2026-07-23

A repository + campaign consistency review of the THOX.ai quick-launch Kickstarter, with fixes
applied, a legacy-footprint audit, a reconciliation plan, and suggestions for the live campaign.

> Scope note: the live Kickstarter page (`kickstarter.com/projects/thoxai/1935989296`) blocks
> automated fetches (HTTP 403), so this review is based on the repository's canonical copy — which is
> the campaign's source of truth — plus the deployed GitHub Pages preview structure. No file was
> attached to this session.

---

## Executive summary

The repository contains **two parallel campaigns**:

1. **Canonical (current):** the four-device quick launch — **ThoxKey, ThoxMini Air, ThoxMini,
   ThoxClip** — at $150K, launching **July 7, 2026** (30-day run, closing Aug 6), with honest
   capability boundaries. This is what README, `docs/CAMPAIGN_INFO.md`, `docs/KICKSTARTER_PAGE_COPY.md`,
   `docs/REWARDS_MATRIX.md`, the whole `kickstarter/site/` bundle, and the `demo/` package describe.
2. **Legacy (retired):** an earlier four-device family — **ThoxClip, ThoxMini, ThoxAir, ThoxNova** —
   at a $250K goal with $500K–$3M stretch goals, launching **August 12, 2026**, built on named
   silicon (Milk-V Duo, BCM2835, LattePanda N100, nRF52) and a cluster/LLM-host architecture, signed
   by "Phamy." `kickstarter/sources/thox-video-storyboards.md` explicitly lists these as **"Retired
   names: ThoxAir, ThoxOnStick, ThoxStick, ThoxNova as a reward."**

Within the canonical set, several files also disagreed with each other on **dates, early-bird caps,
retail prices, and delivery windows**, and the campaign **validator/tests were failing on `main`**
due to a case-sensitivity bug. Those are now fixed (Section A). The larger legacy footprint (152
files carrying legacy markers, concentrated in the unreferenced `content/` and `social/` trees) is
cataloged for systematic reconciliation (Sections B–D).

---

## A. Fixes applied in this pass

| Area | File(s) | Change |
|---|---|---|
| Validator bug | `scripts/validate_campaign.py`, `tests/test_campaign_docs.py` | Demo-guardrail check was case-sensitive (`"heavier work routes…"` vs doc's `"Heavier work routes…"`) and failed on `main`. Now case-insensitive. `python3 scripts/validate_campaign.py` exits 0. |
| Launch/close dates | `docs/CAMPAIGN_INFO.md` | Aug 12 / Sept 11 → **July 7 / Aug 6, 2026** (30-day run matches stated duration; campaign is live as of this review). |
| Early-bird caps | `docs/REWARDS_MATRIX.md` | Reconciled the internally-contradictory caps (1000 / 100 / 500) to **500 / 350 / 300 / 200** (ThoxKey / Air / Mini / Clip), matching README + `CAMPAIGN_INFO`. |
| Retail prices | `docs/KICKSTARTER_PAGE_COPY.md` | `$99.99 / $199.99 / $399.99` → round **$99 / $199 / $399** (validator canon); corrected bundle "retail value" sums ($238.99 / $438.99 / $736.99). |
| Delivery windows | `docs/CAMPAIGN_INFO.md` | Jan–May 2027 → **Q3/Q4 2026 → Q1 2027**, aligning the outlier to the live page + rewards matrix. (But see Suggestion 1 — the aggressive window may be worth revisiting.) |
| Consolidated deliverable | `deliverables/THOX_Kickstarter_Campaign.md` | Full rewrite off the retired ThoxAir/ThoxNova/Milk-V/LattePanda family onto the canonical four devices, pricing, timeline, and honest boundaries. Removed fabricated stretch-goal dollar figures. |
| Kickstarter FAQ | `docs/FAQ.md` | Rewrote off ThoxNova-hosts-LLM / cluster / Milk-V onto the four devices and honest boundaries (spec-free, no fabricated silicon). |
| Kickstarter risks | `docs/RISKS.md` | Genericized supply-chain/manufacturing/overclaim copy; replaced silicon-specific EOL rows with a component-EOL row; owner `P`→`T`; dates aligned. |
| Backer emails | `templates/pre-launch-email.md`, `templates/launch-day-email.md` | Rewrote to the four devices, correct pricing/caps, July 7 launch, $150K goal; fixed founder name "Phamy" → "Tommy." |
| Social calendar | `templates/social/content-calendar.md` | Recomputed every T-offset date from the July 7 launch; swapped ThoxAir/ThoxNova reveals + cluster/LLM-host proofs for the four canonical devices; owner column + founder name fixed. |
| Launch runbook | `runbooks/01-launch-week.md` | T+0 launch-day anchor Aug 12 → **Tue Jul 7 2026**. |
| Changelog | `CHANGELOG.md` | Documented the consistency pass. |

Both `scripts/validate_campaign.py` and `scripts/review_thox_models.py` exit 0 after these changes.

---

## B. Legacy-footprint audit

**~152 `.md` files** carry one or more legacy markers (excluding the vendored `designs/` handoff, the
`docs/MODEL_REVIEW_*` reports, and the storyboard note that intentionally documents the retired names).

Distribution by tree:

| Tree | Files w/ legacy markers | Referenced by README? | Notes |
|---|---:|---|---|
| `content/` | 78 | No | Orphaned parallel campaign: due-diligence pack, investor deck, manuals (incl. `thoxnova/MANUAL.md`), unboxing scripts (`04_thoxnova.md`), partnerships, post-funding templates. |
| `social/` | 26 | No | Dated pre-launch/launch posts (`2026-08-12-…`, `thoxair-deepdive`, `thoxnova-deepdive`, `why-craig-phamy`). |
| `docs/` | 27 | Partial | Includes `TIMELINE.md`, `STRETCH_GOALS.md`, `PRESS_KIT.md`, `SOCIAL_MEDIA_CAMPAIGN.md`, `KICKSTARTER_SHIPPING_PLAN.md`, agent-dispatch briefs. |
| `prompts/` | 6 | Yes (via README) | Asset-generation prompt libraries describing the retired device *physical forms*. |
| `runbooks/` | 6 | Yes | Stretch-goal figures and a few device references still legacy. |
| `templates/` | 7 | Yes | Remaining: `openai-image-prompts.md`, `grok-video-prompts.md`, `post-copy-library.md`, `weekly-update.md`, `stretch-unlock-update.md`, `reply-snippets.md`, `launch-day-social.md`. |

### Reliable vs. unreliable markers

- **Reliable legacy markers** (safe to treat as "must fix"): `ThoxAir`, `Milk-V`, `LattePanda`,
  `BCM2835`, `nRF52`, `Phamy`, `August 12` / `Aug 12`, `Sept 11` / `September 11`, `$250K`, `$499`,
  `Cluster Pack`, `Founders Pack`, `ThoxStick`, `ThoxOnStick`.
- **NOT a reliable marker:** bare `ThoxNova` / `THOX Nova`. Nova is a **legitimate roadmap device** in
  the canonical campaign (`kickstarter/site/thox-nova.html`, README roadmap). Nova is legacy only when
  used as a **launch reward** (e.g., "ThoxNova ships to all backers", "$499 ThoxNova"). Do **not**
  blanket-scrub Nova. Likewise `ThoxNova-12B-*` are real published **model names** — leave them.

### High-signal legacy files still to reconcile (paste/backer-facing first)

- `docs/TIMELINE.md` — Aug 12 launch → May 2027 fulfillment; ThoxAir/Cluster Pack/ThoxNova ship rows; owner `P`.
- `docs/STRETCH_GOALS.md` and `content/launch/STRETCH_GOALS.md` — old $-figure ladder.
- `templates/launch-day-social.md`, `templates/weekly-update.md`, `templates/stretch-unlock-update.md`, `templates/reply-snippets.md`, `templates/social/post-copy-library.md`.
- `docs/PRESS_KIT.md`, `content/launch/PRESS_KIT.md`, `docs/SOCIAL_MEDIA_CAMPAIGN.md`, `docs/KICKSTARTER_SHIPPING_PLAN.md`.
- `runbooks/00-pre-launch.md`, `03-stretch-unlock.md`, `04-final-48h.md`, `07-crisis-response.md` (stretch figures + a few device refs).
- Asset-gen prompt libraries (`prompts/openai/*`, `prompts/grok/*`, `templates/social/*-prompts.md`) — these describe the retired device **industrial design**; a faithful rewrite needs the current device renders as reference (see `kickstarter/site/` and `assets/device/`).

---

## C. Canonical translation table (old → new)

Use this as the find-and-replace contract for any reconciliation pass.

| Retired | Canonical | Notes |
|---|---|---|
| ThoxAir | ThoxMini Air | Renamed. |
| ThoxNova (as a **reward**) | (remove from rewards) | Nova is roadmap, not a launch reward. Keep Nova only in roadmap/vision context. |
| ThoxStick / ThoxOnStick / ThingOnStick | (removed) | Retired concepts. |
| "Phamy" | Tommy Xaypanya (CTO) | Founder name. Owner code `P` → `T`. |
| Launch Aug 12, 2026 | Launch **Jul 7, 2026** | Close Sep 11 → **Aug 6, 2026**. |
| Goal $250K; stretch $500K/$1M/$1.5M/$2M/$3M | Goal **$150,000**; stretch = TBD (announced live, founder-confirmed) | No fabricated stretch figures. |
| ThoxClip $39 / $49 | ThoxClip **$299 early-bird / $329 special** ($399 retail) | |
| ThoxMini $69 | ThoxMini **$149 early-bird / $169 special** ($199 retail) | |
| ThoxAir $79; Cluster Pack $349 | ThoxMini Air **$69 early-bird / $79 special** ($99 retail); no Cluster Pack | |
| ThoxNova $499 | (removed from rewards) | |
| Family Bundle $599 | THOX **Complete Founder Kit $549** (100 cap) | |
| Founders Pack $1,299 | (folded into Complete Founder Kit / Founders Club) | See `kickstarter/site/founders.html`. |
| Ship: ThoxClip Jan 2027 → Nova Apr / bundles May 2027 | ThoxKey/Air/Mini **Q3/Q4 2026**; ThoxClip + Founder Kit **Q1 2027** | |
| Named silicon (Milk-V Duo, BCM2835, LattePanda N100, nRF52) | (spec-free honest boundaries) | Canonical copy deliberately avoids naming SoCs; small devices carry/route/capture, heavier work routes to capable local hardware the user owns. |

---

## D. Recommended reconciliation plan

1. **Decide the fate of `content/` and `social/` (104 files).** They are unreferenced by the README
   and are a superseded parallel campaign. Recommendation: **archive** them (move to `archive/` or a
   tagged branch) rather than maintain two campaigns. If any are still in active use (e.g., the
   investor deck, due-diligence pack), reconcile those specific files against Section C first. This is
   a team decision and was not done in this pass (destructive, 100+ files, no explicit mandate).
2. **Reconcile the referenced legacy docs** next, in priority order: `docs/TIMELINE.md`,
   `docs/STRETCH_GOALS.md`, the remaining `templates/*`, the `runbooks/*` stretch figures, then the
   asset-gen prompt libraries (last — they need current device renders as reference).
3. **Extend the validator's scope.** `scripts/validate_campaign.py` only scans `CANONICAL_DOCS`, which
   is why the legacy campaign never tripped it. Add `ThoxAir`, `Milk-V`, `LattePanda`, `nRF52`,
   `Phamy`, `August 12`, `$250K` to `LEGACY_PATTERNS`, and widen the scan to `templates/`, `runbooks/`,
   `deliverables/`, and any tree you keep — so drift can't silently return.
4. **Update the GitHub repo description.** It still reads "ThoxClip, ThoxMini, ThoxAir, ThoxNova" —
   press and backers check the repo; it should list ThoxKey, ThoxMini Air, ThoxMini, ThoxClip.

---

## E. Suggestions for the live campaign

1. **Delivery-date credibility (highest priority).** Shipping ThoxKey/Air/Mini in "Q3/Q4 2026" —
   roughly 1–2 months after an Aug 6 close — is aggressive for hardware and invites backer skepticism
   and Kickstarter scrutiny. The retired campaign's own instinct (Jan–May 2027) was more defensible,
   and the canonical copy already promises "conservative delivery windows." Consider pushing the
   published estimates later (e.g., ThoxKey Q4 2026; Air/Mini Q1 2027; ThoxClip/Founder Q2 2027).
   Under-promise, over-deliver — early is a delight, late is a refund request.
2. **Resolve the two-campaign split before it leaks into comms.** A backer or journalist who finds the
   repo will see ThoxAir/ThoxNova/$499/Aug-12 material contradicting the live page. Archive or
   reconcile (Section D) quickly.
3. **Lead the reward stack with scarcity you can defend.** Early-bird caps (500/350/300/200) and the
   100-unit Complete Founder Kit are the launch-day urgency levers — surface the live remaining counts
   in updates ("142 of 200 ThoxClip early-birds left"). Consider whether ThoxKey at $24 or the Founder
   Kit is the better hero for the first-hour push.
4. **Add a "cloud AI vs. THOX" comparison block.** The differentiator is ownership/privacy; a simple
   two-column "your data leaves / your data stays" visual converts privacy-motivated backers. The copy
   and tokens already exist in `kickstarter/site/`.
5. **Keep prototype honesty explicit.** The page copy already commits to labeling AI-generated concept
   visuals and not presenting renders as production units — keep that label visible on every device
   tile, and use the `demo/` and `production-tracker.html` real-capture pipeline for hero shots.
6. **Tighten the risks section around the honest-boundary story.** The strongest trust signal here is
   "we tell you what the small devices *can't* do." Make that a headline, not a footnote — it
   pre-empts the #1 objection to edge-AI hardware.
7. **Founder video lower-thirds.** Ensure they read exactly "Craig Ross, CEO" and "Tommy Xaypanya,
   CTO" (never "Phamy") — the retired name still appears in unreconciled assets.

---

_Generated by [Claude Code](https://claude.ai/code)_
