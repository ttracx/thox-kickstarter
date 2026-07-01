# Campaign page review checklist (Thox.ai PRs #215-#219)

**Purpose**: 5-minute review checkpoint so the user can say "go" on the
open Thox.ai PRs with confidence that copy + layout + facts match the
Kickstarter playbook. Per `feedback_no_automerge_thoxai_website`,
Thox.ai is PR-only and the user must sign off before any merge.

**Applies to**: PRs #215 / #216 / #217 / #218 (open per T-43 audit) +
PR #219 opened 2026-07-01 (`marketing/campaign-page-refresh-T-43`,
cherry-picks stranded SoC-correction `7fa43c4` + countdown-hero `b40ba89`).

**Owner**: Tommy (user action #10 in `PULL_FORWARD_TRACKER.md`).

**Not in scope**: this checklist reviews **content correctness** only.
Deploy pipeline, DNS, Vercel config, and SEO indexing verification are
downstream and separate.

---

## How to use this checklist

For each PR in the list, walk the checklist top-to-bottom. If every
box passes, comment "go" on the PR. If any box fails, comment the
specific box number that failed so the fix is unambiguous.

Estimated time per PR: 5 minutes. Total for all 5: ~25 minutes.

---

## PR-agnostic checks (run once for each PR)

### 1. Copy proof against Source of Truth

Source of Truth: `docs/CAMPAIGN_INFO.md` in this repo. Values in
project memory take precedence when they diverge from CAMPAIGN_INFO
(specifically for SoC facts — see section 3 below).

- [ ] Launch date: page says **August 12, 2026** (never "April", never "December")
- [ ] Launch time: **9:00 AM PT** if displayed
- [ ] Funding goal: **$250,000**
- [ ] Duration: **30 days** (Aug 12 - Sep 11, 2026)
- [ ] Tagline verbatim: **"Your AI. Your Data. Your Rules."**
- [ ] Blurb 135 chars: matches CAMPAIGN_INFO.md line 28
- [ ] No mention of "Super Early Bird" or "Founders Campaign" language (removed in 2026-06-24 claim-reconciliation pass, commit `bad5424`)
- [ ] No `$549` / `$629` / `$89.99` / `$899` legacy prices anywhere
- [ ] No "December 2026 delivery" language anywhere

### 2. Countdown widget

- [ ] Countdown badge visible in hero
- [ ] Counter targets **2026-08-12T09:00:00-07:00** (UTC-7 during PDT)
- [ ] Days-remaining number is within +/-1 of `(2026-08-12 minus today)`
- [ ] No flicker / layout shift when the counter ticks

### 3. SoC facts (project memory is authoritative)

Per project memory topic files, the canonical SoC facts are:

| Device | Canonical SoC | Common wrong value to catch |
|---|---|---|
| ThoxClip | Nordic nRF52840 | any other MCU |
| ThoxMini | **Luckfox Pico Mini (RV1103)** | Milk-V Duo / CV1800B (old CAMPAIGN_INFO value) |
| ThoxMini Air | **Luckfox Pico Mini B (RV1103)** | BCM2835 / Pi Zero W (retired 2026-06-25) |
| ThoxNova | **LattePanda N100** (Intel x86) | Jetson Orin NX (retired 2026-06-01) |

- [ ] ThoxMini SoC copy matches Luckfox Pico Mini (RV1103)
- [ ] ThoxMini Air SoC copy matches Luckfox Pico Mini B (RV1103)
- [ ] ThoxNova SoC copy matches LattePanda N100
- [ ] No "Pi Zero W" or "BCM2835" references anywhere on the page
- [ ] No "Jetson" references anywhere on the page

### 4. Pricing (must match REWARDS_MATRIX.md)

- [ ] ThoxClip: **$39** early-bird / $49 list
- [ ] ThoxMini: **$69**
- [ ] ThoxMini Air: **$79** single, **$349** 4-pack Cluster Pack
- [ ] ThoxNova: **$499**
- [ ] Add-ons match REWARDS_MATRIX.md (verify against `docs/REWARDS_MATRIX.md`)

### 5. Devices section: "Meet the Devices"

- [ ] Section is renamed to **"Meet the Devices"** (per PR #219)
- [ ] 4 devices shown in this order: **ThoxClip / ThoxMini / ThoxMini Air / ThoxNova**
- [ ] Each device has: name, price, SoC, one-line role description, image
- [ ] No 5th device shown (ThoxKey and ThoxStick are parallel lanes, NOT launch SKUs)

### 6. Mobile layout (test on iPhone-width viewport)

Open Chrome DevTools -> device emulation -> iPhone 14 Pro (390 x 844).

- [ ] Hero section renders without horizontal scroll
- [ ] Countdown badge readable at mobile width
- [ ] Devices grid stacks vertically (4 rows) on mobile
- [ ] All prices visible without truncation
- [ ] Any images render (no broken image icons)
- [ ] CTA button ("Notify me" / "Coming August 12" / etc.) reachable in the first 2 screenful

### 7. Image alt text (a11y + SEO)

For every `<img>` on the page:

- [ ] Alt text present (not empty, unless decorative)
- [ ] Alt text describes the device, not the file name
  - Good: `alt="ThoxNova v2 matte black flagship compute hub"`
  - Bad: `alt="thoxnova-v2-hero.png"`
- [ ] Alt text does not say "image of" or "picture of" (redundant)

### 8. External links

- [ ] Kickstarter pre-launch page link opens the correct project URL:
      `kickstarter.com/projects/thox-ai/thox-ai-your-ai-on-silicon-you-own`
- [ ] No links to `thox-command-center` anywhere (private, must not leak per R8 in risk register)
- [ ] Social links match the campaign social kit

### 9. Legal + compliance

- [ ] No forward-looking guarantees about delivery dates that are
      not in `docs/PRE_LAUNCH_COMPLIANCE.md`
- [ ] No mention of specific competitor brand names
- [ ] Privacy statement links or references match `docs/LEGAL.md`

### 10. Regression check (specific to PR #219)

PR #219 cherry-picks `7fa43c4` (SoC correction) + `b40ba89` (countdown
hero). Confirm neither was reverted or partially applied.

- [ ] `7fa43c4` changes present: no Pi Zero W / BCM2835 / Milk-V references
- [ ] `b40ba89` changes present: countdown badge in hero
- [ ] Both stranded commits from 2026-06-25 are now merged in the branch

---

## Per-PR quick assessment table

Fill in after review. When a row is all green, comment "go" on the PR.

| PR | Section 1 copy | Section 2 countdown | Section 3 SoC | Section 4 pricing | Section 5 devices | Section 6 mobile | Section 7 alt | Section 8 links | Section 9 legal | Section 10 cherry-picks | Verdict |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| #215 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | n/a | |
| #216 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | n/a | |
| #217 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | n/a | |
| #218 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | n/a | |
| #219 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |

---

## If any check fails

Comment on the PR like:

> Section 3, ThoxMini Air SoC still says BCM2835. Please update to
> Luckfox Pico Mini B (RV1103) per project memory. Re-request review.

Do NOT merge until all rows are green.

---

## After all PRs green

1. Comment "go" on each PR in order (#215 -> #216 -> #217 -> #218 -> #219)
2. Author (Phamy or automation) merges each PR in sequence, resolving any conflicts
3. Verify staging deploy at `staging.thox.ai` (or preview URL) matches expectations
4. Approve production promotion via Vercel
5. Update `PULL_FORWARD_TRACKER.md` marketing-site gate to **CLOSED**
6. Update `KICKSTARTER_SHIPPING_PLAN.md` marketing-site acceptance gate to `- [x]`
