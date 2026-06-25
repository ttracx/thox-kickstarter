# Shipping process: carton to backer doorstep

The actual fulfillment process from finished-goods carton to backer's hand. This doc is operational; it tells the ops team what to do per-shipment. It complements the per-reward pipeline schema in `ttracx/thox-kickstarter-integration` `app/kickstarter/rewards.py` (manufacture / qa / pack / ship) by extending into post-ship events the schema does not natively cover.

## Pipeline overview

```
finished-goods carton
  |
  v
carton intake at fulfillment center
  |
  v
per-unit address validation
  |
  v
pack (sleeve, manual, sticker, USB cable)
  |
  v
label print (per-region carrier selection)
  |
  v
customs documentation (international only)
  |
  v
carrier handoff -> Template 05 fires
  |
  v
in-transit (tracking events recorded)
  |
  v
delivery confirmation -> Template 06 fires (24h after)
  |
  v
14-day no-questions-asked window
  |
  v
warranty period begins
```

## Carrier selection per region

The default carrier per region balances cost, tracking reliability, and average transit time. Operator overrides are allowed per backer (e.g. backer explicitly requests USPS over UPS due to building access).

| Region | Default carrier | Backup carrier | Notes |
|---|---|---|---|
| US domestic, lower 48 | USPS Priority Mail (units < $100) / FedEx Ground (units >= $100) | UPS Ground | Signature required for units >= $200 |
| US Alaska / Hawaii / territories | USPS Priority Mail | FedEx Express Saver | USPS has best coverage to AK/HI/PR/USVI/GU |
| Canada | FedEx International Ground | UPS Worldwide Expedited | Prepaid duties via FedEx broker |
| EU (IOSS eligible) | DHL Express Worldwide | FedEx International Priority | IOSS prepayment for goods <= EUR 150 |
| EU (non-IOSS) | DHL Express Worldwide | FedEx International Priority | Carrier collects duties on delivery |
| UK | DHL Express Worldwide | Royal Mail International Tracked | UK VAT prepaid via DHL broker |
| Australia | DHL Express Worldwide | Australia Post International | GST prepaid (LVIG) for goods < AUD 1000 |
| New Zealand | DHL Express Worldwide | NZ Post International | GST prepaid for goods < NZD 1000 |
| Singapore / Hong Kong / Japan | DHL Express Worldwide | FedEx International Priority | Prepayment supported per country |
| Mexico / Latin America | FedEx International Economy | DHL Express Worldwide | Carrier collects duties on delivery (default) |
| Rest of world | DHL Express Worldwide | FedEx International Priority | Case-by-case routing |

Carrier selection happens at the label-print step and is logged per-shipment for audit.

## Tracking number capture

Every per-unit shipment gets a tracking number captured at the label-print step. The number is recorded against the backer's pledge in the fulfillment service before Template 05 fires.

The capture flow:

1. Label print produces a label with carrier-assigned tracking number.
2. Tracking number scanned (barcode reader) and written to the fulfillment service.
3. Service validates the tracking number resolves against the carrier API (USPS, FedEx, UPS, DHL all expose this).
4. If validation passes, the shipment is marked `ship_ready` and Template 05 is queued.
5. If validation fails, the shipment is held and ops is notified. Common failure: tracking number not yet ingested by carrier (5 to 60 minute lag); the service retries every 10 minutes for up to 4 hours before alerting.

Template 05 includes a per-carrier tracking deep link (the `{{ shipment.tracking_url }}` variable). The per-carrier URL templates live in the fulfillment service config and are reviewed whenever a new carrier is added.

## Address validation

Two stages.

**Pre-ship validation** (at the pack step):
- Address parsed via a third-party validation API (we standardize on the same one BackerKit uses for survey collection).
- Validation result is one of: valid, valid-with-corrections (e.g. ZIP+4 added), needs-confirmation (multiple matches), invalid.
- valid: proceed to label print.
- valid-with-corrections: ops reviews; auto-accept if confidence > 95%, otherwise ops confirms with backer.
- needs-confirmation: ops sends backer a reply-to-this-email exchange.
- invalid: ops sends backer a reply-to-this-email exchange.

**Post-ship reroute** (if backer requests change after pack but before delivery):
- USPS: address change after ship requires carrier-side reroute via USPS Package Intercept (fee paid by backer).
- FedEx, UPS: reroute supported via carrier API; fee paid by backer.
- DHL Express: reroute supported in most countries; fee paid by backer.
- Reroute fees are not included in the original shipping cost; backer is informed of the fee before the reroute is processed.

## Insurance and signature requirements

Per-SKU insurance and signature requirements based on unit value at backer pricing.

| Unit value (USD) | Insurance | Signature on delivery |
|---|---|---|
| < $50 | None (carrier default) | No |
| $50 to $199 | $200 declared value | No |
| $200 to $499 | Declared value | Yes (carrier-default direct signature) |
| >= $500 | Declared value + adult signature | Yes (adult signature, age 21+) |

Bundled shipments (multiple rewards in one box) inherit the highest-value SKU's requirements.

Backers can request signature waiver via reply-to-this-email exchange. Waiver is recorded against the shipment; carrier-side liability for loss after delivery transfers to the backer.

## International customs documentation

For every international shipment, the following documents are produced at the label-print step and attached to the package (commercial invoice in a customs pouch, electronic copy transmitted to carrier).

**Commercial invoice** (always):
- Shipper (THOX.ai LLC + Reno NV address)
- Consignee (backer name + address from BackerKit survey)
- HS code per SKU (see HS code table below)
- Description of goods (per SKU, e.g. "Wireless data processing apparatus, personal use")
- Country of origin (per SKU, typically China or Taiwan based on contract manufacturer)
- Quantity, unit value, total value (in USD)
- Reason for export ("Sale" for Kickstarter fulfillment; never "Gift" even if requested by backer; misdeclaration is illegal)
- Incoterms (DDP for IOSS / UK VAT / AU GST prepaid markets; DAP for everywhere else)
- Signature block (digital signature from THOX.ai LLC authorized representative)

**Certificate of origin** (when required by destination):
- Required for goods entering certain markets where preferential trade agreements apply.
- Typically not required for THOX SKUs at expected unit values.

**Battery shipping declaration** (for SKUs with embedded lithium cells):
- UN 38.3 test summary referenced.
- IATA Section II declaration for air shipments.
- Per-SKU battery configuration (cell chemistry, watt-hours, count per package) documented.
- Carrier-specific dangerous goods labeling applied.

**HS code per SKU** (preliminary; final codes confirmed with customs broker):

| SKU | HS code (preliminary) | Notes |
|---|---|---|
| ThoxClip | 8517.62 | Apparatus for transmission/reception of voice/data |
| ThoxMini | 8471.30 | Portable automatic data processing machines |
| ThoxAir | 8471.30 | Portable automatic data processing machines |
| ThoxNova | 8471.50 | Processing units other than 8471.41 / 8471.49 |
| MagStack Cluster Dock | 8473.30 | Parts and accessories for 8471 machines |
| THOXKey | 8523.51 | Solid-state non-volatile storage devices |

HS codes are reviewed before any international shipping begins. A licensed customs broker confirms the codes for each destination country, particularly the EU where TARIC sub-codes may apply.

## Per-region prepaid tax handling

Where the destination country supports prepaid VAT/GST collection, we prepay at the carrier-broker level so the backer does not face a surprise duty bill at the door.

- **EU IOSS** (Import One-Stop Shop): for goods up to EUR 150, VAT prepaid at point of sale. THOX.ai LLC registered for IOSS via intermediary. IOSS number transmitted with each shipment.
- **UK VAT**: for goods up to GBP 135, VAT collected at point of sale and remitted via UK HMRC registration. THOX.ai LLC registered for UK VAT (TBD: pending Craig's confirmation that registration completed by T-7).
- **Australia GST (LVIG)**: for goods up to AUD 1000, GST collected at point of sale and remitted via Australian Taxation Office registration.
- **Canada GST/HST**: for goods to Canada, GST/HST collected at point of sale where required and remitted via Canada Revenue Agency registration.

Where prepayment is not supported (Mexico, most of Latin America, parts of Africa and Asia), the carrier collects duties on delivery and the backer pays at the door. Template 05 surfaces this explicitly via the customs note variant.

## Shipment grouping rules

Backers with multiple rewards may receive multiple shipments at different times based on each reward's ship window.

- Rewards with the same ship window and the same destination are bundled in one box where possible (reduces shipping cost and carbon footprint).
- Rewards with different ship windows ship in separate boxes per window. Each box gets its own Template 05 + Template 06.
- Add-ons (USB cables, stickers, swag) ship in the box of the parent reward, not separately.
- MagStack Cluster Dock add-ons ship with the ThoxAir or ThoxNova in the same box where the ship window aligns; otherwise as a separate shipment with its own tracking.

## Returns and replacement handling

Inbound flow for returns and replacements.

**Replacement shipment** (Template 08 Variant A or B):
- New unit ships from fulfillment center with pre-paid return label included in the box.
- Backer uses any sturdy box to return the defective unit.
- Return label uses the same carrier as the outbound to keep tracking simple.
- Return arrives at fulfillment center, defective unit logged to root-cause queue.

**RMA receipt and processing**:
- Defective unit photographed on arrival.
- Serial number cross-referenced against the original shipment.
- Failure mode logged for engineering review.
- Unit either repaired and added to refurbished inventory or scrapped per the failure mode.

**Customer-paid returns** (rare; e.g. backer changed mind after 14-day window):
- Standing policy: case-by-case, no automatic return acceptance.
- Ops evaluates and routes through Tommy + Craig if the case is unusual.

## Logging and audit

Every shipment writes a record to the fulfillment service audit log with:

- Backer ID
- Reward SKU(s) in shipment
- Carrier + tracking number
- Pack date, ship date, delivery confirmation date
- Cost (carrier fee, customs prep fee, insurance fee, broker fee where applicable)
- Address validation result
- Customs declaration (full text of commercial invoice)
- Any reroute, replacement, or refund tied to this shipment

Records retained per the seven-year financial record-keeping policy in `docs/PRE_LAUNCH_COMPLIANCE.md`.

## Action needed (operator)

Pre-launch:

1. Finalize fulfillment center selection. Get warehouse contract reviewed by attorney.
2. Confirm IOSS registration completed via intermediary. Confirm UK VAT registration. Confirm AU GST registration if AU backer count justifies.
3. Engage licensed customs broker. Get HS code table confirmed per destination country.
4. Confirm carrier accounts opened (FedEx, UPS, USPS commercial, DHL Express). Set up per-carrier API credentials in fulfillment service.
5. Confirm carrier-broker prepayment terms for IOSS / UK VAT / AU GST. Add brokerage fees to per-shipment cost model.
6. Confirm insurance per-unit limits with carriers. Decide whether to top up with third-party shipping insurance for high-value units.

Per shipment (ongoing):

1. Run address validation at pack step.
2. Print label with per-region carrier selection.
3. Attach customs documentation (international only).
4. Scan tracking barcode to fulfillment service.
5. Verify tracking number resolves with carrier (automatic, 4-hour retry window).
6. Confirm Template 05 fires.
7. Monitor in-transit events for exceptions.
8. Confirm Template 06 fires at delivery + 24h.
