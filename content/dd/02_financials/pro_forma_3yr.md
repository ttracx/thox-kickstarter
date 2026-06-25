# Three-year pro forma

Last updated: 2026-06-25
Status: DRAFT - assumptions only; user fills real numbers

---

This is a model skeleton. The founders intentionally do not fabricate
revenue or expense figures. Below are the assumption levers an investor
can stress-test once the user populates the inputs.

## Revenue assumptions

Drivers (cross-link: content/launch/STRETCH_GOALS.md, content/launch/MILESTONES.md,
docs/REWARDS_MATRIX.md, ThoxKey pricing in thox-key README):

- Kickstarter unit volume per SKU at campaign close.
- Post-Kickstarter direct-to-consumer (D2C) attach rate per quarter.
- Educational and small-business channel adoption (EDU_PRICING_LETTER).
- Optional services revenue (training, partner integrations).

Year 1 SKUs in plan:
- ThoxClip baseline (FILL: $39 ASP placeholder per thox-kickstarter)
- ThoxMini (FILL: $69 ASP placeholder per thox-kickstarter)
- ThoxAir (FILL: $79 ASP placeholder per thox-kickstarter)
- ThoxNova (FILL: $499 ASP placeholder per thox-kickstarter)

## COGS assumptions

- Per-SKU bill of materials (from content/manuals/ or BOM CSVs in thox-quickstart boms/).
- Assembly labor (per SKU minutes, FILL: cost per minute).
- Inbound freight and duty (FILL: percent of BOM).
- Packaging, accessories, manuals.
- Outbound shipping (cross-link: docs/KICKSTARTER_SHIPPING_PLAN.md).
- Defect and warranty reserve (FILL: percent of units).

## Operating expenses

- Founders' compensation (FILL: target salary year 1, year 2, year 3).
- Hires per funding tier (cross-link: 05_team/hiring_plan.md).
- Software and cloud (HF, Vercel, GitHub, Tailscale, Anthropic API).
- Manufacturing tooling and prototyping (3D printing supplies, PCB fab,
  enclosure tooling).
- Legal, accounting, insurance.
- Marketing and community (events, content, swag).
- R&D contractor budget if any.

## Capex

- Equipment (rigs, test fixtures, lab gear).
- Initial inventory commitment.

## Output the model should produce

Once filled in, the model should output:

- Revenue by quarter, year 1 to year 3.
- Gross margin per SKU and blended.
- EBITDA per quarter.
- Cash balance per month.
- Months of runway under base, downside, and upside scenarios.

## Recommended format

Investor-ready pro forma should ship as an Excel or Google Sheet, not as
Markdown. This doc is a placeholder for the structure. The user should
copy this scaffolding into a spreadsheet, fill the FILL fields with real
numbers, and attach the spreadsheet to the packet.

## Disclaimer

Forward-looking statements only. Assumptions reflect current best estimates
and will change as the campaign closes and supply contracts are signed.
