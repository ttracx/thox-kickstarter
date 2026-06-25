# Runway calculator

Last updated: 2026-06-25
Status: DRAFT - inputs FILL

---

## Inputs

- Cash on hand today: FILL: $
- Confirmed inbound (Kickstarter net payout, after platform + processing fees): FILL: $
- Average monthly net burn over the prior three months: FILL: $
- Anticipated step-up in burn post-funding (new hires, manufacturing deposits): FILL: $

## Formula

runway_months = (cash_on_hand + confirmed_inbound) / avg_monthly_net_burn_post_funding

## Worked example (placeholders)

(FILL: $0 + FILL: $0) / FILL: $0 = FILL: months

## Trigger points

- Runway falls below 9 months: begin bridge-round preparation.
- Runway falls below 6 months: open fundraising conversations.
- Runway falls below 3 months: implement contingency plan (founder salary
  pause, hire freeze, marketing pause, FILL: any other levers).

## Disclaimer

This is a steady-state model. It does not include lumpy one-time outlays
(e.g. tooling deposits, inventory commitments) which the user should
overlay manually on the burn_rate_template.csv.
