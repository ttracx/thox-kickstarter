# Data handling

Last updated: 2026-06-25
Status: DRAFT

---

## What we collect

| Data class | Source | Purpose | Storage location | Retention |
|---|---|---|---|---|
| Backer email | Kickstarter | Fulfillment + comms | Kickstarter + fulfillment ops | FILL |
| Shipping address | Backer survey | Fulfillment | Fulfillment ops | FILL: delete N days post-ship |
| SKU configuration | Backer survey | Fulfillment | Fulfillment ops | FILL |
| Support tickets | Direct email | Customer support | Support inbox | FILL |
| Telemetry from device | NONE BY DEFAULT | n/a | n/a (opt-in only) | n/a |
| Marketing newsletter sign-up | Thox.ai opt-in | Marketing comms | FILL: ESP TBD | FILL |
| Account preferences (post-purchase) | User opt-in | Personalization | FILL | FILL |

## Where the data lives

- Fulfillment ops: FILL: e.g. Notion / Airtable / spreadsheet.
- Support: FILL: e.g. shared inbox.
- ESP: FILL.

## Access control

- Founders: full access.
- Contractors (post-funding): role-scoped access per least privilege.
- Vendors (3PL, carriers): only the minimum address + SKU required for
  shipping.

## Incident response

- Reportable incidents handled per the security disclosure window
  (90 days, security@thox.ai per thox-meta).
- Notification timelines per applicable regulatory framework.

## Disclaimer

Data handling is governed by the privacy policy (cross-link
privacy_posture.md). Attorney review required before any of the
"FILL" cells are committed to.
