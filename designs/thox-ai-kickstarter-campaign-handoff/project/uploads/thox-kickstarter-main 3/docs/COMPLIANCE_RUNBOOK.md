# Compliance runbook - per-item where to file, cost, time, consult

> **DISCLAIMER**: General guidance, not legal or tax advice. THOX.ai LLC should consult a Texas or Nevada CPA and a startup attorney before filing anything. Costs and timelines below are typical ranges as of 2026; the operator should verify current rates and rules with the actual filing authority before sending a payment.

Companion to `docs/PRE_LAUNCH_COMPLIANCE.md`. Each section below maps to a checklist item and answers four questions:

1. **Where to file** (URL or office)
2. **Typical cost** (range; the operator verifies current rate)
3. **Typical time** (filing to confirmation)
4. **Who to consult** (CPA, attorney, in-house, none needed)

The operator does NOT proceed on cost guesses below; every dollar figure here is for sizing the budget, not for actual payment.

---

## Section 1: Entity + EIN

### Annual franchise tax / annual list

**Where to file**
- Texas: https://comptroller.texas.gov/taxes/franchise/
- Nevada: https://esos.nv.gov/EntitySearch/

**Typical cost**
- Texas: $0 below the no-tax-due threshold (verify current threshold; was ~$2.47M); EZ Computation or Long Form filing still required
- Nevada: Annual List ~$150 + State Business License ~$200 = ~$350/year total

**Typical time**
- Texas: 4-6 weeks if filed by mail; same-day if filed online via Webfile
- Nevada: 1-3 business days for online filing

**Consult**: CPA

### Foreign qualification

**Where to file**: Secretary of State of any state where THOX has nexus (employees, inventory, physical office, registered sales activity)

**Typical cost**: $100-300 per state, plus a registered agent in each state (~$100-300/year per state)

**Typical time**: 1-4 weeks per state

**Consult**: Attorney (nexus determination), CPA (tax registration)

### EIN (Form SS-4)

**Where to file**: IRS https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online

**Typical cost**: Free

**Typical time**: Online application returns EIN immediately; mail/fax 4-6 weeks

**Consult**: None needed; CPA can file on THOX's behalf if requested

---

## Section 2: Sales tax nexus

### Home state sales tax permit

**Where to file**
- Texas: Texas Comptroller webfile https://comptroller.texas.gov/taxes/sales/
- Nevada: Nevada Department of Taxation https://tax.nv.gov/

**Typical cost**: Free to register; remittance varies by collected amount

**Typical time**: Texas online registration takes 2-3 business days; Nevada similar

**Consult**: CPA

### Multi-state tax automation

**Where to subscribe**
- Stripe Tax: https://stripe.com/tax (integrated with existing Stripe account)
- TaxJar: https://www.taxjar.com/
- Avalara: https://www.avalara.com/

**Typical cost**
- Stripe Tax: 0.4-0.5% of transaction value with cap; no monthly minimum
- TaxJar: tiered subscription, ~$19-99/month for SMB volume
- Avalara: per-transaction or annual subscription; typical SMB plan $50-200/month

**Typical time**: Same-day setup for Stripe Tax; 1-2 weeks for TaxJar/Avalara end-to-end configuration

**Consult**: CPA on nexus determination; in-house on integration

### Economic nexus thresholds

**Where to verify**: https://www.salestaxinstitute.com/resources/economic-nexus-state-guide (third-party tracker; CPA confirms current thresholds)

**Typical cost**: Free to evaluate

**Typical time**: 2-4 hours for a first pass; ongoing monitoring needed

**Consult**: CPA

---

## Section 3: EDU + B2B channel

### Bookstore SKU (ISBN not required)

**Where to file**: Internal SKU registry; campus bookstore's own onboarding form

**Typical cost**: Free (internal SKU); ISBN ~$125 single, ~$295 for 10 from Bowker if required

**Typical time**: Internal: same day. Bookstore onboarding: 1-4 weeks

**Consult**: In-house

### W-9 collection from B2B customers

**Where to file**: Internal records; share IRS Form W-9 PDF with each B2B customer

**Typical cost**: Free

**Typical time**: Same day per customer

**Consult**: CPA (1099 obligations)

---

## Section 4: International shipping

### Harmonized System (HS) codes

**Where to verify**: US International Trade Commission https://hts.usitc.gov/

**Typical cost**: Free to look up; customs broker ~$50-150/SKU if professional classification needed

**Typical time**: 30-90 min per SKU for self-classification; 1-2 business days via broker

**Consult**: Customs broker (for first-time exporter classification accuracy)

### EU IOSS registration

**Where to file**: Through an EU intermediary (THOX is non-EU; needs an IOSS intermediary registered in an EU member state). Examples: Avalara, Taxually, Eurora

**Typical cost**: Intermediary fees $50-200/month + per-transaction; one-time setup $200-500

**Typical time**: 2-4 weeks

**Consult**: International tax specialist or EU VAT specialist firm

### UK VAT registration

**Where to file**: HMRC https://www.gov.uk/register-for-vat

**Typical cost**: Free to register; quarterly VAT returns thereafter

**Typical time**: 4-6 weeks for UK VAT number issuance

**Consult**: UK VAT specialist (Avalara, VAT IT, or similar)

### Restricted-country block list

**Where to verify**
- US BIS Entity List: https://www.bis.doc.gov/index.php/policy-guidance/lists-of-parties-of-concern/entity-list
- OFAC Sanctions Lists: https://sanctionssearch.ofac.treas.gov/

**Typical cost**: Free

**Typical time**: 1-2 hours for initial scan; quarterly re-check

**Consult**: Export-controls attorney if any export to a gray-area country is contemplated

### UN 38.3 (lithium battery air shipping)

**Where to file**: Battery cell vendor provides UN 38.3 test report; THOX retains copy on file

**Typical cost**: Free if vendor provides; $5K-15K per cell type if THOX has to commission its own test

**Typical time**: Vendor-provided: same day. Independent test: 4-8 weeks

**Consult**: Battery cert lab (UL, Intertek, SGS)

---

## Section 5: Stripe

### Stripe Tax enablement

**Where to enable**: Stripe Dashboard > Tax

**Typical cost**: 0.4-0.5% of transaction value where Stripe Tax calculates

**Typical time**: Same day

**Consult**: CPA (nexus inputs)

### 3D Secure (SCA)

**Where to enable**: Stripe Dashboard > Settings > Payment methods; or per-PaymentIntent in code

**Typical cost**: No incremental fee from Stripe; reduces fraud chargeback exposure

**Typical time**: Same day

**Consult**: In-house

### PCI DSS SAQ-A scope

**Where to attest**: Stripe provides the SAQ-A documentation; THOX self-attests annually

**Typical cost**: Free if THOX uses Stripe Elements / Checkout exclusively (no card data touches THOX systems)

**Typical time**: 30-60 min annual self-attestation

**Consult**: In-house

---

## Section 6: Kickstarter

### Kickstarter creator account verification

**Where to register**: https://www.kickstarter.com/

**Typical cost**: Free to register; Kickstarter takes 5% of funds raised + payment processing fees (~3-5%)

**Typical time**: Account verification: 1-3 business days. Project review: 3-7 business days per round

**Consult**: In-house; reach out to a previous successful hardware-creator for informal review before submitting

### Stripe Connect linkage for KS payouts

**Where to configure**: Kickstarter project dashboard > Payment

**Typical cost**: Free (KS uses Stripe under the hood; THOX needs Stripe Connect onboarding)

**Typical time**: Same day after creator account verified

**Consult**: In-house

---

## Section 7: Terms of service + Privacy

### Terms of Service drafting

**Where to publish**: thox.ai/terms (link from site footer + Kickstarter page footer)

**Typical cost**: Attorney drafting $1,500-5,000 for an SMB TOS + Privacy Policy combo. Template services (TermsFeed, Termly, iubenda) $50-300/year for a self-service equivalent

**Typical time**: Attorney: 2-3 weeks. Self-service: same day

**Consult**: Startup attorney for the first version; the legal-tech tools above are acceptable for ongoing maintenance

### Privacy Policy (multi-jurisdiction)

**Where to publish**: thox.ai/privacy

**Typical cost**: Bundled with TOS drafting; standalone $500-2,500

**Typical time**: Bundled

**Consult**: Privacy specialist if EU/UK traffic is expected at meaningful volume

### Cookie consent banner

**Where to wire**: thox.ai (every page)

**Typical cost**: Cookiebot ~$8-50/month depending on traffic; OneTrust enterprise (overkill at SMB scale)

**Typical time**: 1-2 hours to integrate

**Consult**: In-house

### CAN-SPAM compliance

**Where to verify**: FTC https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

**Typical cost**: Free

**Typical time**: 1-2 hour audit; the early-access endpoint already implements HMAC unsubscribe per the codebase

**Consult**: In-house

### DMCA designated agent

**Where to file**: US Copyright Office https://dmca.copyright.gov/

**Typical cost**: $6 every 3 years

**Typical time**: Same-day online filing

**Consult**: In-house

### DSAR (Data Subject Access Request) intake

**Where to publish**: thox.ai/privacy/requests or similar

**Typical cost**: Free to build; ongoing handling cost ~30-60 min per request

**Typical time**: 1-2 days to wire form + email template; GDPR/CCPA require response within 30 / 45 days

**Consult**: Privacy specialist

---

## Section 8: IP

### Trademark search (USPTO TESS, WIPO, EU IPO)

**Where to search**
- USPTO TESS: https://tmsearch.uspto.gov/
- WIPO Global Brand Database: https://branddb.wipo.int/
- EU IPO eSearch: https://www.tmdn.org/tmview/

**Typical cost**: Free for self-search; attorney clearance search $500-2,000 per mark

**Typical time**: 1-3 hours per mark self-search; 1-2 weeks for attorney clearance opinion

**Consult**: Trademark attorney (essential before filing)

### Trademark application (USPTO TEAS Standard)

**Where to file**: https://teas.uspto.gov/ccr/lf-tas

**Typical cost**: $350/class TEAS Standard; $250/class TEAS Plus (with restrictions); attorney fees $500-2,000 per mark on top

**Typical time**: First office action 4-8 months; full registration 9-15 months

**Consult**: Trademark attorney

### Madrid Protocol (international trademark)

**Where to file**: WIPO via USPTO https://www.uspto.gov/trademarks/laws/madrid-protocol

**Typical cost**: $653 basic WIPO fee + per-country designation fees ($100-500 each); attorney $1,500-5,000

**Typical time**: 12-18 months for designations to be granted

**Consult**: International IP attorney

### Provisional patent application

**Where to file**: USPTO https://www.uspto.gov/patents/basics/types-patent-applications/provisional-application-patent

**Typical cost**: $325 micro entity / $650 small entity / $1,600 large entity USPTO fee; attorney drafting $3,000-8,000 per provisional

**Typical time**: Same-day filing; full priority date locked

**Consult**: Patent attorney (essential; pro se provisional drafting is high-risk)

### Non-provisional or PCT (within 12 months of provisional)

**Where to file**
- US non-provisional: USPTO
- PCT (international): WIPO or USPTO as receiving office

**Typical cost**: $400-1,820 USPTO fee depending on entity size; PCT $1,330+ international filing fee; attorney $8,000-20,000 per non-provisional

**Typical time**: PCT international phase 30 months; national-phase prosecution 2-5 years per country

**Consult**: Patent attorney

---

## Section 9: Manufacturing + supplier

### FCC Part 15 cert (radio devices)

**Where to file**: FCC OET TCB (Telecommunications Certification Body) of choice; not direct with FCC for most devices

**Typical cost**: Pre-compliance $2K-8K; full cert $5K-20K per device

**Typical time**: 4-12 weeks per device

**Consult**: RF compliance lab (Element, Bureau Veritas, UL, SGS)

### CE (EU) + UKCA (UK) cert

**Where to file**: Notified Body for the relevant directive (EMC, RED, LVD); CE self-declaration for some product classes

**Typical cost**: $3K-15K per device for full notified-body assessment; self-declaration cheaper if eligible

**Typical time**: 4-16 weeks

**Consult**: EU/UK compliance lab

### RoHS + REACH declarations

**Where to file**: Internal Declaration of Conformity (DoC); REACH requires SVHC concentration declaration

**Typical cost**: Free to self-declare if supply chain documents support; $500-3K per product for third-party verification

**Typical time**: 2-4 weeks per product

**Consult**: Compliance specialist; component vendors typically provide RoHS/REACH docs

### WEEE registration (EU/UK)

**Where to file**: Per-member-state WEEE registry (e.g., UK: Environment Agency; Germany: Stiftung ear)

**Typical cost**: 200-2,000 EUR per country per year depending on volume

**Typical time**: 4-8 weeks per country

**Consult**: WEEE compliance specialist (Take-e-way, Lorax EPI)

---

## Section 10: Insurance

### General liability + product liability

**Where to quote**: Hiscox, The Hartford, Chubb, NEXT Insurance (online brokers also work: Embroker, Vouch)

**Typical cost**: $500-3,000/year general liability; $1K-5K/year product liability rider for hardware startup

**Typical time**: Quote: same day to 1 week. Binder: same day after quote accepted

**Consult**: Insurance broker

### Cyber liability

**Where to quote**: Same brokers as general liability; Coalition, At-Bay specialize in cyber

**Typical cost**: $1K-5K/year for an SMB cyber policy with $1M limit

**Typical time**: 1-2 weeks (underwriter may require security questionnaire)

**Consult**: Insurance broker

### D&O

**Where to quote**: Brokers above; Vouch and Embroker specialize in startup D&O

**Typical cost**: $2K-10K/year for seed-stage D&O

**Typical time**: 2-4 weeks

**Consult**: Insurance broker, attorney

---

## Section 11: Banking + accounting

### Business bank account

**Where to open**: Mercury per LEGAL.md (already in place). Alternatives: Brex, Relay, traditional bank

**Typical cost**: Free at Mercury for the starter tier; no minimum balance

**Typical time**: Same day to 1 week for verification

**Consult**: In-house

### Accounting platform

**Where to subscribe**: QuickBooks Online, Xero, Wave (free tier)

**Typical cost**: QBO $35-200/month; Xero $15-78/month; Wave free + per-transaction processing fees

**Typical time**: Same-day signup; 4-8 hours to import historical transactions and build chart of accounts

**Consult**: CPA (chart of accounts design)

### S-Corp election (Form 2553)

**Where to file**: IRS

**Typical cost**: Free to file; CPA may charge $250-1,000 to prepare

**Typical time**: Form must be filed within 75 days of the start of the tax year you want it effective; IRS acknowledgment 60-120 days

**Consult**: CPA (essential; S-Corp adds payroll + reasonable-compensation obligations)

---

## Glossary of consult roles

- **CPA**: Certified Public Accountant. Required for any tax, sales tax, S-Corp, or franchise tax filing. Cost: $150-500/hr or $1,500-10,000 flat annual engagement.
- **Startup attorney**: Generalist business attorney with startup experience. Required for entity formation, founder agreements, vendor contracts, TOS/Privacy review. Cost: $300-700/hr.
- **Trademark attorney**: IP attorney specializing in trademarks. Required for clearance search and application drafting. Cost: $300-700/hr.
- **Patent attorney**: Registered patent attorney (passed USPTO bar). Required for any patent filing. Cost: $400-900/hr.
- **Privacy specialist**: Attorney or consultant with GDPR/CCPA/CPRA expertise. Required for multi-jurisdiction privacy posture. Cost: $300-600/hr.
- **Customs broker**: Licensed customs broker. Required for HS classification accuracy and first-time exporter setup. Cost: $50-200 per consultation.
- **Compliance lab**: FCC/CE/UKCA test lab. Required for any radio or electronics cert. Cost: per-device fee structure (above).
- **Insurance broker**: Independent insurance broker, ideally with startup or electronics experience. Free to engage (broker is paid by the carrier).
- **Export-controls attorney**: Specialty attorney. Only needed if export to a sanctioned or restricted country is contemplated. Cost: $400-800/hr.

---

## Cost envelope (rough total - sizing only)

| Bucket | Pre-launch outlay |
|---|---|
| Entity + annual fees | $300-1,000 |
| Sales tax registration + tax automation | $0-2,500 (Stripe Tax is variable; no upfront) |
| International tax + IOSS + UK VAT | $1,000-5,000 (only if EU/UK volume expected) |
| Trademark (US + 3-5 marks) | $3,000-15,000 |
| Provisional patents (3-5 inventions) | $10,000-40,000 |
| TOS + Privacy + Cookie + DMCA | $1,500-5,000 |
| FCC + CE + UKCA + RoHS + WEEE | $15,000-60,000 (depends on # of certifiable SKUs) |
| Insurance bundle (GL + PL + Cyber + D&O) | $5,000-20,000/year |
| CPA + attorney retainer | $5,000-20,000/year |

**Total pre-launch sizing range**: $40K - $170K, heavily dependent on how many SKUs need radio cert at launch vs deferred. The operator decides scope after consulting CPA + attorney.

This is sizing, not a budget commitment.

---

For the per-T-N timeline, see `docs/PRE_LAUNCH_COMPLIANCE.md` Section 12.

For contract templates the attorney can adapt, see `docs/CONTRACT_TEMPLATES/`.
