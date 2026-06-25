# THOX.ai Due-Diligence Packet

Last updated: 2026-06-25
Status: DRAFT - attorney review required before any external share

---

## What this is

A structured response to investors who say "interested" after the Kickstarter
campaign or pitch and ask for due-diligence material. The packet is organized
into eleven sections, each a directory of short docs that cross-link into the
canonical THOX artifacts already living in this repo and the wider portfolio.

Nothing in this folder is meant to be original source-of-truth. It is a
navigable index that points an investor (and their attorney) at the real
artifacts.

## How to use

1. Walk every section. Read every doc. Each one has a "FILL:" marker where
   the user (Tommy + Craig) must supply real data the AI cannot fabricate
   (cap table rows, dollar amounts, incorporation cert numbers, advisor names).
2. Reconcile the Cedar Park TX (per thox-key README) vs Nevada (per
   docs/LEGAL.md) state-of-formation discrepancy with counsel before the
   packet leaves the building.
3. Have an attorney review the entire packet. This packet is a DRAFT, not
   legal advice, not a private placement memorandum, not an offer to sell
   securities.
4. Run `python content/dd/PACKET_ZIPPER.py --investor <slug>` to emit a
   per-investor zip. The zipper verifies last-updated dates and warns on
   obvious unfilled TBDs.
5. Share via secure channel (Box, Dropbox, DocSend, a deal-room link).
   Never plain email. Never paste into a public chat.

## Per-investor customization

Different investors lead with different questions. Reorder the cover letter
to match.

- Financial-first (typical VC): lead with 02_financials, 06_market, 04_product_roadmap.
- IP-first (corporate strategic, patent buyer): lead with 03_intellectual_property,
  07_technical, 10_partnerships.
- Mission-first (impact, hardware-focused angel): lead with 04_product_roadmap,
  05_team, 09_kickstarter_results.

## Security posture

DO include:
- Public roadmap, product specs, IP disclosure summaries, team bios, market sizing.
- Cross-links to public-or-shareable repos and docs.
- Pro-forma model (placeholder until user fills real numbers).

DO NOT include (under any circumstances):
- Bank credentials or account numbers.
- Customer personally identifiable information.
- Private keys, API tokens, signing keys, HF tokens, gh tokens.
- Internal Slack or email exports.
- Personnel files, comp ranges by individual, performance reviews.
- Backer-level personal data from the Kickstarter platform.

If an investor wants any of the DO-NOT items, route through counsel and
require an NDA executed before disclosure.

## Section index

- 01_company - incorporation, operating agreement, cap table, bank
- 02_financials - pro forma, burn, runway, pricing, unit economics
- 03_intellectual_property - IP-008..IP-033 summary, trademarks, OSS posture
- 04_product_roadmap - Aug 12 launch, 90-day post-funding, Phase F, long-term
- 05_team - founders, advisors, hiring plan, org chart
- 06_market - TAM/SAM/SOM, competitive landscape, personas
- 07_technical - architecture, security, scaling, OSS communities
- 08_legal_compliance - compliance checklist, contract list, privacy posture
- 09_kickstarter_results - campaign summary, demographics, fulfillment, press
- 10_partnerships - cross-link to the eight partnership briefs
- 11_appendices - glossary, full repo inventory, diagrams index, tests, metrics

## Top-level documents

- README.md - this file
- COVER_LETTER_TEMPLATE.md - founder cover letter, copy + customize per investor
- CHECKLIST.md - what is in, what is intentionally out
- PACKET_ZIPPER.py - emits per-investor zip with manifest and SHA256 per file

## Disclaimer

This packet is a DRAFT prepared by THOX.ai LLC for prospective investors. It
does not constitute an offer to sell, or a solicitation of an offer to buy,
any securities. It does not constitute legal, tax, or investment advice. All
forward-looking statements reflect current assumptions and are subject to
change. Attorney review is required before any external distribution.
