# CLAUDE DISPATCH — TEAM A

## Marketing Site Rewrite + Command-Center Lockdown

You are Team A for the THOX.ai Kickstarter shiproom.

## Mission

Reconcile every public-facing THOX.ai campaign, marketing, preorder,
pricing, delivery, and prototype-readiness claim so the Kickstarter
video, website, press kit, and internal runbook cannot contradict each
other.

You also own `thox-command-center` lockdown. It must remain
private/internal-only and must not leak into public surfaces.

## Primary DRI

Phamy

## Repositories / surfaces

- Thox.ai public site (`C:\Users\tommy\dev\Thox.ai`)
- `thox-command-center` (private)
- Kickstarter runbook / campaign docs (`C:\Users\tommy\dev\thox-kickstarter\docs/`)
- Press kit (`thox-kickstarter/docs/PRESS_KIT.md`)
- Demo video script (`thox-kickstarter/deliverables/THOX_Video_Script.docx`)
- Any public docs, footer links, product pages, metadata, OG tags, and
  pricing references

## Current known risks

1. Public THOX.ai site currently says (verified 2026-06-23):
   - Founders Campaign open now
   - $99.99 refundable Nova deposit
   - Founder pricing from $629
   - ThoxMini $89.99
   - Nova cost comparison line at $899 one-time
   - delivery target December 2026
2. Internal Kickstarter playbook says:
   - Aug 12 2026 launch
   - $39–$499 ladder
   - 4 SKU campaign structure
3. Earlier Team A pass (commit `bda5b54`) updated hero + countdown + 4-SKU
   block + Stripe deposit, but the **deep pages** (`/kickstarter`,
   `/founders`, `/pricing`, `/product`, `/investors`) still carry the
   contradictory Founders-era numbers.
4. `thox-command-center` was made private in commit `1bf101d`. Verify
   lockdown holds.

## Required output files

Create or update:

- `Thox.ai/docs/campaign/CANONICAL_CAMPAIGN_COPY.md`
- `Thox.ai/docs/campaign/PRICE_AND_REWARD_MATRIX.md`
- `Thox.ai/docs/campaign/CLAIM_REGISTER.md`
- `Thox.ai/docs/campaign/PUBLIC_SURFACE_AUDIT.md`
- `Thox.ai/docs/campaign/VIDEO_SCRIPT_FACT_CHECK.md`
- `thox-kickstarter/docs/internal/COMMAND_CENTER_LOCKDOWN.md`
- Daily report: `thox-kickstarter/docs/agent-dispatch/team-a-daily-report.md`

## Tasks

### 1. Public surface audit

Inventory every public surface of `Thox.ai`. For each route + page,
record this structured row:

```
Surface:
URL/path:
Claim:
Price:
Date:
Delivery language:
Prototype-readiness language:
Risk:
Fix:
Owner:
Status:
```

Grep aggressively for: `629`, `549`, `499`, `99.99`, `899`, `89.99`,
`April`, `December`, `Founders`, `Founder`, `Edge AI`, `Nova`, deposit
amounts, and any delivery date strings. Save to
`Thox.ai/docs/campaign/PUBLIC_SURFACE_AUDIT.md`.

### 2. Canonical campaign source of truth

Produce a single canonical version of every claim used on any public
surface. Lock these values in
`Thox.ai/docs/campaign/CANONICAL_CAMPAIGN_COPY.md`:

```
Campaign title:
Launch date:
Primary hero line:
Product family:
SKU count:
Reward ladder:
Deposit/preorder wording:
Delivery window:
Prototype status wording:
AI disclosure:
Risks wording:
Privacy/security wording:
Refund/deposit wording:
```

After this file lands, NO public page may use non-canonical language.
Drive every contradiction from PUBLIC_SURFACE_AUDIT.md to resolved.

### 3. Deep-page reconciliation (the hard part)

For each of `/kickstarter`, `/founders`, `/pricing`, `/product`,
`/investors`, `/reserve`, and any other route still using
Nova-only or Founder-era language:
- Update copy to match `CANONICAL_CAMPAIGN_COPY.md`
- Remove `$629` / `$549` / `$99.99` deposit / `$899` cost comparison /
  `December 2026 delivery` references
- Add the 4-SKU framing where missing
- Update JSON-LD / OG / metadata per route

Commit each route fix separately so reviewers can audit per-page.

### 4. Command-center lockdown verification

Verify:
- repo is private (`gh repo view ttracx/thox-command-center --json visibility`)
- README says INTERNAL ONLY
- no public deploy points
- no public screenshots
- no marketing links to it
- no product footer links
- no indexed docs reference it
- no secret-bearing env examples committed
- no command-center screenshots in press kit
- no external docs point to it

Create a lockdown checklist with pass/fail evidence in
`thox-kickstarter/docs/internal/COMMAND_CENTER_LOCKDOWN.md`.

### 5. Video fact-check gate

Review `thox-kickstarter/deliverables/THOX_Video_Script.docx` (or the
equivalent script doc) and label EVERY scene:

- `WORKING_PROTOTYPE` — real hardware booting on camera
- `SOFTWARE_DEMO` — software running on a screen, not necessarily the
  final device
- `ENGINEERING_VALIDATION` — bench shot, not a "the device works" claim
- `PRODUCTION_INTENT_DESIGN` — CAD render or 3D-printed prototype
- `PLANNED_FEATURE` — narrated as roadmap, never shown working

Anything shown as `WORKING_PROTOTYPE` must have matching evidence from
Teams B / C / E / F / G. Save the labels to
`Thox.ai/docs/campaign/VIDEO_SCRIPT_FACT_CHECK.md`. Flag every scene
where the label cannot be supported by evidence.

## Friday milestone

By Friday 5pm PT, Team A must produce:

1. Final canonical campaign copy (`CANONICAL_CAMPAIGN_COPY.md`).
2. Fixed public-site copy committed to Thox.ai main + deployed.
3. Command-center lockdown proof.
4. Claim register with zero unresolved price/date/delivery contradictions.
5. Video fact-check sheet, DRI-signed.

## Daily report format

Append to `docs/agent-dispatch/team-a-daily-report.md` daily; the
scheduled `ks-daily-standup` task pulls from it:

```
# Team A Daily Report — YYYY-MM-DD

## Summary
## Completed today
## Blockers
## Public contradictions found
## Copy decisions needed
## Command-center lockdown status
## Evidence links / files
## Tomorrow plan
## Friday milestone confidence
GREEN / YELLOW / RED
```

## Evidence rule

Every claim made about THOX.ai in any public copy must reference:

```
source repo:
source file:
source SHA:
canonical value:
review by:
review date:
```

If a value cannot be sourced to a repo file, escalate before publishing.

## Constraints

- The `Thox.ai` repo is public; commit messages plain technical voice, no
  em-dashes, no emojis.
- The `thox-command-center` repo stays private; never push public.
- Drive every contradiction to zero before T-30 (Jul 13 2026).
