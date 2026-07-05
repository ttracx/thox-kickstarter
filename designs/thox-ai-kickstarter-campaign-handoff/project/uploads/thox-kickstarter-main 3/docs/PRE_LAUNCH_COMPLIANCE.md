# Pre-launch compliance checklist - T-48 to T-0

> **DISCLAIMER**: This document is general guidance, not legal or tax advice. THOX.ai LLC should consult a qualified CPA and a startup attorney before relying on any specific item. This checklist enumerates the categories and typical actions; the operator fills in their actual answers and confirms each item with a licensed professional in the relevant jurisdiction.

Target launch: **2026-08-12** (Kickstarter, $250K baseline / $3M ceiling).
Author cadence: refreshed by the autonomous-admin agent fleet on every sprint; status column is the operator's responsibility.

> **NOTE ON ENTITY DOMICILE**: `docs/LEGAL.md` records THOX.ai LLC as a Nevada single-member LLC (registered agent in Reno, NV). Some upstream task briefs reference Cedar Park, Texas. Where the two disagree, the operator should verify the actual filing on record and treat that as authoritative. The checklist below is written for whichever state turns out to be the home state; line items applicable only to Texas or only to Nevada are tagged `[TX-only]` or `[NV-only]`.

Every line item below is **OPERATOR ACTION REQUIRED**. The autonomous-admin agent fleet cannot file paperwork, spend money, or commit to dollar amounts on the operator's behalf.

---

## 1. Entity + EIN

- [ ] **THOX.ai LLC** registered in home state (status verified at the relevant Secretary of State business portal)
  - [TX-only] https://mycpa.cpa.state.tx.us/coa/ (Texas Comptroller Taxable Entity Search)
  - [NV-only] https://esos.nv.gov/EntitySearch/OnlineEntitySearch (Nevada SOS Business Entity Search)
- [ ] **EIN** issued by the IRS and on file (Form SS-4)
- [ ] **Registered agent** current and dues paid for the launch year
- [ ] **Operating agreement** signed by all members (Tommy Xaypanya, Craig Ross)
- [ ] **Cap table** documented (member units, vesting if any, side agreements catalogued)
- [ ] **Bank account** opened in THOX.ai LLC name (per LEGAL.md: Mercury, Reno branch)
- [ ] **Annual franchise tax / annual list** filed for the home state
  - [TX-only] Texas Franchise Tax (no-tax-due threshold currently ~$2.47M; filing still required)
  - [NV-only] Nevada Annual List of Members + State Business License (~$350/year combined)
- [ ] **Foreign qualification** filed in any state where THOX maintains employees, inventory, or a physical presence (typical: home state of any non-managing member)
- [ ] **Members' tax IDs** (SSN or ITIN) on file for K-1 distribution if elected as partnership

## 2. Sales tax nexus

Kickstarter handles US sales tax remittance on the campaign pledges as a **marketplace facilitator** in most states. THOX still owes sales tax on **post-campaign DTC orders** placed through Thox.ai or any other non-marketplace channel.

- [ ] **Home state** sales tax permit + remittance setup
  - [TX-only] Texas Comptroller webfile https://comptroller.texas.gov/taxes/sales/
  - [NV-only] Nevada Department of Taxation https://tax.nv.gov/
- [ ] **Confirm Kickstarter marketplace facilitator coverage** for every state THOX expects backers in (Kickstarter publishes this in their creator handbook; verify in writing for the launch quarter)
- [ ] **Economic nexus thresholds** evaluated for every state THOX expects DTC volume in (common: >$100K sales OR >200 transactions in a calendar year; thresholds vary)
- [ ] **Multi-state tax automation** evaluated (TaxJar, Avalara, or Stripe Tax). Stripe Tax integrates directly with the existing Stripe Connect setup
- [ ] **Resale certificates** collected from any B2B reseller customer (EDU bookstore, channel partner) so THOX is not on the hook for their downstream sales tax
- [ ] **Use tax** posture documented for any out-of-state purchases THOX makes (printers, filament, components)

Action items:
- [ ] Register with the **home-state sales tax authority** before any DTC order ships
- [ ] Set up a **post-campaign sales tax dashboard** (Stripe Tax recommended) before the first non-Kickstarter order

## 3. EDU + B2B channel

- [ ] **Bookstore SKU** filing (most US university bookstores accept an internal SKU; an ISBN is only required if THOX wraps a printed book in the bundle)
- [ ] **PO terms** standard form (Net 30 default; per-customer terms negotiable). See `docs/CONTRACT_TEMPLATES/VENDOR_AGREEMENT.md`
- [ ] **Bulk Orders Terms** document drafted and linked from the bulk-order intake form
- [ ] **EDU pricing waiver** documented per the THOXKey outreach pack. See `docs/CONTRACT_TEMPLATES/EDU_PRICING_LETTER.md` and `docs/CONTRACT_TEMPLATES/WAIVER_LETTER.md`
- [ ] **W-9** on file for every B2B customer that will pay >$600/year and request a 1099
- [ ] **Tax-exempt certificates** on file for every public-university or government customer (states differ; collect both the federal and state exemption document)

## 4. International shipping

Kickstarter collects VAT/GST on the campaign pledges in covered jurisdictions and remits to KS-administered authorities. THOX is on the hook for post-campaign DTC compliance and for customs documentation on every parcel.

- [ ] Per-country **shipping carrier** selected (USPS for low-value international, DHL Express / FedEx International / UPS Worldwide for high-value)
- [ ] **Harmonized System (HS) codes** assigned per SKU (electronics under HS 8471/8517/8542 typically; verify per device)
- [ ] **Country export-restriction list** reviewed. The `thox-kickstarter-integration` fulfillment-risk detector has a starter list; the operator should cross-check against the current US Bureau of Industry and Security (BIS) Entity List and OFAC sanctions list before any export
- [ ] **VAT / GST** for EU + UK + AU + CA destinations
  - KS handles initial collection during campaign
  - Post-campaign DTC needs threshold-based registration (see thresholds below)
- [ ] **EU IOSS** (Import One Stop Shop) registration if shipping consignments >EUR 150 thresholds, or if THOX wants frictionless EU customs without per-parcel VAT collection
- [ ] **UK VAT** registration if UK-destined turnover exceeds the registration threshold (currently GBP 90K rolling 12 months; verify at launch)
- [ ] **Australia GST** registration if AU-destined turnover exceeds AUD 75K rolling 12 months
- [ ] **Canada GST/HST** registration if CA-destined turnover exceeds CAD 30K rolling 12 months
- [ ] **Commercial invoice template** drafted (per-parcel; includes HS code, country of origin, declared value, harmonized description)
- [ ] **Country of origin** marking on every device (per US 19 CFR Part 134 and equivalent in destination countries)
- [ ] **Restricted-country block list** wired into Kickstarter shipping rules (Crimea, DPRK, Iran, Syria, Cuba and any others on the current OFAC list at launch)

## 5. Stripe (DTC + recurring)

- [ ] **Stripe Atlas** evaluation - **NOT NEEDED** because THOX.ai LLC already exists. Atlas only adds value when starting fresh
- [ ] **Stripe Standard or Connect account** linked to THOX.ai LLC operating bank (Mercury per LEGAL.md)
- [ ] **Stripe products + prices** configured per the staged script at `thox-key/portal/scripts/stripe_setup.ts`
- [ ] **Stripe Tax** enabled per state (recommended over self-managed multi-state remittance for a small ops team)
- [ ] **3D Secure** (SCA) enabled for international transactions (required for EU/UK card acceptance)
- [ ] **Disputes + chargebacks** handling procedure documented (initial response template, evidence-collection checklist, escalation rule)
- [ ] **Tax reporting**:
  - 1099-K issued by Kickstarter for the campaign payout (verify Kickstarter's threshold and timing in the launch year)
  - Stripe-issued 1099-K for DTC volume above the IRS reporting threshold for the launch year
- [ ] **Refund policy** wired into Stripe (mirrors the LEGAL.md backer terms: 30-day pre-ship full refund minus processor fee; 14-day post-delivery minus 15% restocking)
- [ ] **Subscription billing** (MeshStack recurring tiers) configured with prorated start, dunning emails, and cancellation flow
- [ ] **PCI DSS** posture - Stripe Elements / Checkout keeps THOX in SAQ-A scope; document this in writing

## 6. Kickstarter-specific

- [ ] **Kickstarter creator account** verified (Tommy and Craig listed as creators; one chosen as primary contact for KS Trust & Safety)
- [ ] **Project page** drafted and ready to submit; typical KS review cycle is 2-3 rounds and 3-7 business days per round
- [ ] **Stripe Connect** linked for payouts (KS uses Stripe under the hood in most regions)
- [ ] **Backer agreement** drafted (delivery terms + refund policy + risk factors). KS terms apply globally; THOX-specific terms layer on top
- [ ] **Trust + safety pre-screening** for trademark + IP issues (KS will check; THOX should preempt by having trademark search results and IP filings ready to share if asked)
- [ ] **FAQ approved** by Kickstarter (or at minimum reviewed for KS rule compliance)
- [ ] **Project video** compliant with KS guidelines (sub-3 minutes typical; founders on camera; demo of the actual hardware)
- [ ] **Risks and Challenges** section drafted honestly (KS requires this; under-honest sections get flagged in review)
- [ ] **Reward tiers** locked, including shipping line items per country
- [ ] **All-or-Nothing funding model** confirmed (KS standard) - matches LEGAL.md posture
- [ ] **Estimated delivery dates** set conservatively (KS allows changes after campaign but backer trust degrades fast; pad by 60-90 days vs internal target)
- [ ] **Project description** lint-checked (no medical claims, no unsupported performance claims, no fabricated quotes, no em-dashes per THOX brand voice)
- [ ] **Updates schedule** drafted (T+0 launch update, weekly during campaign, monthly post-funding through delivery)

## 7. Terms of service + Privacy

- [ ] **Terms of Service** (DTC website at thox.ai) covering account creation, acceptable use, IP ownership, limitation of liability, governing law (Nevada per LEGAL.md, or Texas if domicile flips), arbitration clause
- [ ] **Privacy Policy** compliant with CCPA + CPRA (California), GDPR (EU), UK-GDPR (UK), VCDPA (Virginia), CPA (Colorado), CTDPA (Connecticut), UCPA (Utah) and any other state law live by launch
- [ ] **Cookie Policy** for the website (essential for any cookie banner; mandatory under GDPR/UK-GDPR for EU/UK traffic)
- [ ] **Cookie consent banner** wired (a tool like Cookiebot, OneTrust, or self-hosted CookieConsent works)
- [ ] **CAN-SPAM** compliance on email comms (the `thox-kickstarter-integration` early-access endpoint already implements one-click unsubscribe via HMAC token; verify the footer of every outbound email also carries a postal mailing address per the CAN-SPAM Act)
- [ ] **DMCA designated agent** registered with the US Copyright Office (~$6 every 3 years) if any thox.ai page accepts user-generated content (forum, comments, support submissions)
- [ ] **Acceptable Use Policy** for THOX devices (mirrors LEGAL.md privacy posture: on-device emphasis, no cloud egress by default)
- [ ] **Children's Privacy** (COPPA) posture documented - THOX devices are not directed at children under 13; the AUP and marketing materials should reflect that
- [ ] **California Shine the Light** disclosure (if any California traffic and any sharing of personal info for direct marketing)
- [ ] **Do Not Track** signal handling documented
- [ ] **Data Subject Access Request (DSAR)** process documented (GDPR, CCPA, CPRA grant rights; THOX needs a working intake form and a 30 / 45-day response SLA)

## 8. IP - patents + trademarks + copyright

- [ ] **Trademark search** for "THOX" + product names in USPTO (TESS) + WIPO Global Brand Database + EU IPO eSearch
- [ ] **Trademark application** filed for THOX, ThoxClip, ThoxMini, ThoxAir, ThoxNova, ThoxyMicro, MagStack, MagStack Air, ThoxKey, ThoxArm, ThoxVault, ThoxCargo (per LEGAL.md plus newer SKUs). USPTO filing fee is ~$350/class TEAS Standard; attorney fees on top
- [ ] **International trademark protection** via Madrid Protocol if EU/UK/AU/CA markets matter for the launch
- [ ] **Provisional patent application** for IP-008..IP-033+ (the inventor-of-record memory enumerates the active inventions). Provisional locks priority date; non-provisional or PCT must follow within 12 months
- [ ] **NDA template** for vendors + partners ready before any sensitive convo. See `docs/CONTRACT_TEMPLATES/NDA_MUTUAL.md`
- [ ] **Copyright notices** present on every shipped repo (Apache-2.0 or MIT already done on the ttracx/* fleet)
- [ ] **Patent disclosure** docs maintained for each IP-NNN (memory tracking already does this internally)
- [ ] **Open hardware license** posture documented per LEGAL.md ($3M stretch goal: CERN-OHL-S for KiCad + STEP; MIT for Buildroot configs; CSV public-domain for BOM)
- [ ] **Trade secret** inventory (anything NOT being patented or open-sourced should be tagged trade-secret, with access controls and a written policy)
- [ ] **Assignment of inventions** signed by every contributor (founders, contractors, future employees) so IP rolls up to THOX.ai LLC
- [ ] **Open source license compliance** audit of every third-party dep shipped on a device (BlueOak / Apache-2.0 / MIT / BSD all compatible; verify no GPL or AGPL leak into proprietary firmware)

## 9. Manufacturing + supplier contracts

- [ ] **NDA** signed with every PCB supplier (ESP32-S3 + Pi Zero W variants per firmware scaffold)
- [ ] **Supplier agreement** signed with QIDI Q2 print farm operator (in-house at the Reno facility - just an internal SOP)
- [ ] **Quality acceptance** standard documented (covered by `qa/ACCEPTANCE_MATRIX.md` in thox-quickstart)
- [ ] **Shipping carrier accounts** opened (USPS Click-N-Ship, UPS WorldShip, DHL eCommerce; FedEx Ship Manager optional)
- [ ] **FCC Part 15** + **CE** + **UKCA** compliance for any radio device (ThoxClip BLE, ThoxAir wireless cluster). Pre-compliance scans before tape-out + full lab cert before commercial ship
- [ ] **RoHS** + **REACH** declarations for EU/UK shipments
- [ ] **Battery shipping (UN 38.3)** if any device ships with lithium battery (ThoxClip likely; verify per device). UN 38.3 test report from cell vendor must be on file; per-parcel air shipping declaration required
- [ ] **WEEE** registration in EU/UK if shipping electronic equipment for disposal collection
- [ ] **Country-of-origin certificate** procedure (commercial invoice typically suffices; USMCA certificate if claiming preferential origin for Canada/Mexico)
- [ ] **Counterfeit-part prevention** SOP (component sourcing from authorized distributors only; lot-trace records retained)
- [ ] **Component obsolescence** monitoring (especially for the Pi Zero W and Luckfox Pico Mini B variants; second-source where feasible)

## 10. Insurance

- [ ] **General liability** for THOX.ai LLC (typical $1M/$2M starting policy; ~$500-2K/year for a small electronics startup)
- [ ] **Product liability** for hardware shipments (added rider or standalone; underwriters care about UL/CE certs)
- [ ] **Cyber liability** for the integration + website (covers breach notification cost, regulatory fines, ransomware)
- [ ] **D&O insurance** if raising outside capital (not strictly needed pre-seed but expected by lead investors)
- [ ] **Workers comp** if hiring any W-2 employee (state-mandated in TX, NV, and almost everywhere else; sole-member LLC with no employees can usually opt out)
- [ ] **Commercial property** for the Reno facility (printers, components, finished inventory)
- [ ] **Inland marine** for inventory in transit and at trade shows
- [ ] **Errors & Omissions (E&O)** if THOX provides any SaaS or professional service component

## 11. Banking + accounting

- [ ] **Business bank account** open + actively used (Mercury per LEGAL.md)
- [ ] **Accounting platform** in production (QuickBooks Online, Wave, Xero, or similar)
- [ ] **Chart of accounts** set up per a standard electronics-startup template
- [ ] **Books reconciled** through the prior month
- [ ] **Receipts** captured (Mercury auto-syncs receipts; verify ALL transactions have a memo + category)
- [ ] **Quarterly estimated taxes** paid if THOX is profitable in 2026 (single-member LLC default = disregarded entity; income flows to member's 1040 + Schedule C)
- [ ] **S-Corp election** evaluation (Form 2553) if expected 2026 net income > ~$60-80K and members want to reduce SE tax exposure - consult CPA
- [ ] **Backup of all financial records** offline (Mercury statements + bookkeeping export, weekly)
- [ ] **Founder loans** documented in writing if Tommy or Craig has fronted cash to the LLC
- [ ] **Member draw vs guaranteed payment** policy documented

## 12. Compliance windows by T-N

| T-N | Date | Item | Status |
|---|---|---|---|
| T-48 | 2026-06-25 | This checklist authored, reviewed by Tommy + Craig | DONE (this commit) |
| T-46 | 2026-06-27 | CPA + startup attorney engagement letter signed | TBD |
| T-45 | 2026-06-28 | Entity domicile confirmed (TX vs NV) + foreign qualification scoped | TBD |
| T-42 | 2026-07-01 | Trademark search complete (USPTO TESS + WIPO + EU IPO) | TBD |
| T-42 | 2026-07-01 | Sales tax registration filed in home state | TBD |
| T-40 | 2026-07-03 | Stripe Tax enabled + multi-state config locked | TBD |
| T-35 | 2026-07-08 | International shipping research done (HS codes per SKU, carrier accounts, restricted countries) | TBD |
| T-35 | 2026-07-08 | NDA template circulated to suppliers; vendor agreements drafted | TBD |
| T-30 | 2026-07-13 | Trademark application filed for THOX + top-priority SKU names | TBD |
| T-28 | 2026-07-15 | Kickstarter page submitted for first review round | TBD |
| T-25 | 2026-07-18 | Insurance quotes received (general liability + product liability + cyber) | TBD |
| T-21 | 2026-07-22 | Terms of Service + Privacy Policy + Cookie Policy live on thox.ai | TBD |
| T-21 | 2026-07-22 | DMCA designated agent registered with US Copyright Office (if needed) | TBD |
| T-18 | 2026-07-25 | Provisional patent applications filed for highest-priority IP-NNN | TBD |
| T-14 | 2026-07-29 | Stripe products + prices + tax configured end-to-end | TBD |
| T-14 | 2026-07-29 | Backer agreement linked from Kickstarter page footer | TBD |
| T-10 | 2026-08-02 | Insurance binders effective on launch day | TBD |
| T-7 | 2026-08-05 | All compliance items signed off by CPA + attorney | TBD |
| T-7 | 2026-08-05 | KS Trust & Safety final clearance received | TBD |
| T-3 | 2026-08-09 | Tax + sales-tax dashboards smoke-tested | TBD |
| T-1 | 2026-08-11 | Final pre-launch compliance attestation logged in `docs/internal/` | TBD |
| T-0 | 2026-08-12 | Launch | - |

---

## Sign-off

This checklist is reviewed and updated by the autonomous-admin agent fleet at every sprint. The operator (Tommy + Craig) is responsible for converting each `TBD` row into either `DONE` (with evidence link), `N/A` (with reason), or `BLOCKED` (with blocker + ETA).

For the per-item runbook (where to file, typical cost, typical time, who to consult) see `docs/COMPLIANCE_RUNBOOK.md`.

For contract templates the attorney can adapt see `docs/CONTRACT_TEMPLATES/`.
