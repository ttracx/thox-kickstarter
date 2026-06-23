# Team A Daily Report - 2026-06-23

## Summary

Team A v2 pass. Earlier commit `bda5b54` aligned the THOX.ai home hero,
countdown, 4-SKU framing, and Stripe deposit amount with the Aug 12
2026 Kickstarter playbook. This pass reconciled every deep page that
still carried the deprecated Founders-era copy. Eight commits landed
on `Thox.ai` main, build verified TypeScript-clean, repo pushed.

## Completed today

1. Built canonical campaign source-of-truth docs at
   `Thox.ai/docs/campaign/`:
   - `CANONICAL_CAMPAIGN_COPY.md`
   - `PRICE_AND_REWARD_MATRIX.md`
   - `CLAIM_REGISTER.md`
   - `PUBLIC_SURFACE_AUDIT.md` (per-route structured rows)
   - `VIDEO_SCRIPT_FACT_CHECK.md` (11-scene labels)
   - `COMMAND_CENTER_LOCKDOWN.md`
2. Rewrote `/kickstarter` to the Aug 12 2026 four-device family
   framing, replaced the Nova-only reward ladder with
   `KICKSTARTER_FAMILY` plus 5 bundles, updated FAQ and layout
   metadata + JSON-LD Event schema.
3. Rewrote `/founders` as an Aug 12 family-campaign explainer (no
   more $99.99 deposit / $629 floor / Q4 2026 shipping). Page still
   resolves so internal links don't 404.
4. Rewrote `/pricing` hero, replaced the single-Nova ladder + the
   MagStack bundle row, labeled ThoxMini Air / ThoxMini consumer
   stick / Nova MagStack Bundles as direct-channel surfaces
   separate from the Aug 12 campaign.
5. Updated `/product` to remove three "Founder Reserve - Open Now"
   banners; pricing band now reads "ThoxNova $499 Kickstarter backer
   price."
6. Updated `/investors` narrative, KPI tiles, productStatus, and
   four FAQ entries to the unified Kickstarter posture.
7. Rewrote `/reserve` to drive the four-device family + five-bundle
   selector. Extended `/api/checkout/reserve/route.ts` to accept the
   new family slugs while keeping legacy slugs working. Updated
   `/reserve/success` deposit display and timeline.
8. Updated shared `constants.ts` (SHIPPING_DATE, Edge Series FAQ,
   CAMPAIGN_TIMELINE), `/pre-order` layout metadata, `/use-cases`
   CTA, and global `Header.tsx` + `Footer.tsx` to swap "Founders
   Campaign" labels for "Kickstarter."

## Blockers

None. The build error reported in this environment is the
pre-existing `STRIPE_SECRET_KEY` collection error on the
`/api/webhooks/stripe` route; this resolves on Vercel where the env
var is present. TypeScript compiles cleanly.

## Public contradictions found

36 in PUBLIC_SURFACE_AUDIT.md. 36 resolved.

| Route             | Open at audit | Open after this pass |
|-------------------|---------------|----------------------|
| /kickstarter      | 8             | 0                    |
| /founders         | 6             | 0                    |
| /pricing          | 6             | 0                    |
| /product          | 6             | 0                    |
| /investors        | 5             | 0                    |
| /reserve          | 2             | 0                    |
| /reserve/success  | 2             | 0                    |
| /use-cases        | 1             | 0                    |

Additional non-route surfaces touched: `src/lib/constants.ts`,
`src/app/pre-order/layout.tsx`, `src/components/Header.tsx`,
`src/components/Footer.tsx`, `src/app/api/checkout/reserve/route.ts`.

## Copy decisions needed

None for the deep-page set. Two adjacent surfaces are still open and
tracked for a follow-up pass:

- `src/lib/email/templates/{kickstarterLaunch,kickstarterWelcome,novaReservationConfirmation}.ts` still reference Founders Campaign + $99.99 + December 2026 in
  email bodies. Sent surface, not page surface, so flagged separately.
- `src/lib/claude/guardrails.ts` references the $99.99 / $899 numbers in
  the AI safety guardrails. Internal-only, not public-facing.
- `src/components/reserve/FoundersHero.tsx` and
  `src/components/reserve/RefundExplainer.tsx` still hardcode $99.99
  / 14-day non-refundable language. These components are no longer
  referenced by the new `/reserve/page.tsx`, but the files exist
  pending a sweep + delete pass to keep this commit minimal.

## Command-center lockdown status

`thox-command-center` returns HTTP 404 from the GitHub public REST
API (`https://api.github.com/repos/ttracx/thox-command-center`), which
is the expected behavior for a private repo. Cross-repo grep for
`command-center` / `commandcenter` in `Thox.ai` and `thox-kickstarter`
public docs returns zero hits. Full checklist with pass/fail evidence
is in `Thox.ai/docs/campaign/COMMAND_CENTER_LOCKDOWN.md`. Two checks
(in-repo README banner + .env.example) are tagged RE-VERIFY and
require local `gh repo view` access by the DRI.

## Evidence links / files

Commits on `Thox.ai` main (most recent first):

- e04031f Header + Footer: swap Founders Campaign label and link for Kickstarter
- 62358a8 constants + /pre-order + /use-cases: align shared copy with Aug 12 2026 Kickstarter
- ae7fab2 /reserve and /reserve/success: drop Nova-only ladder, accept family slugs
- c145499 /investors: reconcile narrative to Aug 12 2026 unified Kickstarter
- c41440d /product: strip Founder Reserve banners, point to Aug 12 2026 lineup
- b0fe6bc /pricing: replace Founder Reserve tiers with Aug 12 2026 family lineup
- ec532b6 /founders: rewrite as Aug 12 2026 family campaign explainer
- 82c8f09 /kickstarter: drop Founders Campaign framing, render 4-SKU family + bundles
- e07a64c team-a v2: canonical campaign docs + per-route audit

Pushed: `bda5b54..e04031f main -> main` on github.com/ttracx/Thox.ai.

## Tomorrow plan

1. Sweep three email templates (`kickstarterLaunch`,
   `kickstarterWelcome`, `novaReservationConfirmation`) so backer
   email bodies match the canonical campaign copy. Eight commits land
   per-template.
2. Delete the unreferenced `FoundersHero` + `RefundExplainer`
   components or repoint them at the family campaign so the legacy
   $99.99 / 14-day deposit copy stops existing in the tree.
3. Update `src/lib/claude/guardrails.ts` so AI safety guardrails
   reflect the new deposit + reward ladder.
4. Drive the video script fact-check sheet to DRI sign-off. Confirm
   Scene 5 boot time + Scene 6 cluster recording + Scene 7 dashboard
   build with Teams B / C / E / F / G.
5. Re-verify lockdown checks #2 and #8 with `gh repo view
   ttracx/thox-command-center` + `gh api` on the workstation.

## Friday milestone confidence

GREEN. The deep-page reconciliation is complete and pushed. Friday
milestone now turns on (a) the email-template sweep, (b) the video
fact-check DRI sign-off, and (c) the two RE-VERIFY lockdown checks.
None of those are blocked.
