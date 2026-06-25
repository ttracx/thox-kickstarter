# Packet checklist

Last updated: 2026-06-25
Status: DRAFT - attorney review required

---

## What is in the packet

### 01_company
- Incorporation summary (state, date, cert number) - FILL
- Operating agreement status - FILL
- Cap table template (blank) - FILL
- Bank account status summary - FILL

### 02_financials
- Three-year pro forma (assumptions exposed, numbers FILL)
- Burn rate template (blank) - FILL
- Runway calculator (formula given, inputs FILL)
- Pricing model (cross-link to thox-key + STRETCH_GOALS)
- Unit economics per SKU (assumptions given, COGS FILL)

### 03_intellectual_property
- IP disclosure summary (one-page index of IP-008..IP-033)
- Trademark search status (placeholder - attorney conducted)
- Open-source posture (Apache-2.0 baseline, edge cases enumerated)
- License inventory (every THOX repo, license per repo)

### 04_product_roadmap
- Aug 12 launch milestones (cross-link to MILESTONES + STRETCH_GOALS)
- Post-funding 90-day plan (fulfillment + manufacturing + community)
- Phase F post-Kickstarter (cross-link to thoxcore ROADMAP_PHASE_F)
- Long-term 18-month outlook (assumptions, not promises)

### 05_team
- Founder bios (cross-link to PRESS_KIT - FILL bio body)
- Advisors (template slots - FILL)
- Hiring plan (per funding tier)
- Org chart (current + target)

### 06_market
- TAM / SAM / SOM (sourced, conservative)
- Competitive landscape (cross-link to partnership briefs)
- Customer personas (cross-link to THOXKey outreach personas)

### 07_technical
- Architecture overview (cross-link to thoxcore PROFILES + ROADMAP_PHASE_F)
- Security + compliance (cross-link to kickstarter-integration security model)
- Scaling plan (1K to 100K customers)
- Open-source community strategy (cross-link to thox-meta)

### 08_legal_compliance
- Compliance checklist summary (cross-link to PRE_LAUNCH_COMPLIANCE)
- Contract templates list (NDA, vendor, EDU pricing, waiver - all in repo)
- Privacy posture (GDPR + CCPA + state laws, attorney refinement FILL)
- Data handling (what we collect, where it lives, retention)

### 09_kickstarter_results
- Campaign summary template (post-launch - FILL)
- Backer demographics template (post-launch - FILL)
- Fulfillment status template (post-launch - FILL)
- Press coverage summary template (post-launch - FILL)

### 10_partnerships
- Index of the eight partnership briefs (status per brief - FILL)

### 11_appendices
- Glossary
- Full repo inventory (every THOX repo, one-line description)
- Architectural diagrams index
- Test coverage summary (cross-link to TEST_COVERAGE_DASHBOARD when published)
- Code metrics summary (LOC, commit count, contributor count)

---

## What is intentionally NOT in the packet

These items require an executed NDA and a secure data-room link. Do not
attach them to the packet under any circumstances.

- Bank statements, balances, account numbers.
- Customer PII or backer-level Kickstarter data.
- Personnel files, performance reviews, individual compensation.
- Private signing keys (release-oracle HMAC, agent-hub identity keys).
- HuggingFace tokens, gh tokens, npm tokens, Vercel tokens.
- Slack or email exports.
- Internal Notion or wiki dumps.
- Unredacted vendor agreements with executed counterparties.
- Customer contracts (if and when they exist).
- Source-of-truth model weights from private HuggingFace repos.

---

## Pre-share checklist (run before zipping)

- [ ] Every doc has a "Last updated" date within the last 30 days.
- [ ] Every FILL marker either replaced or explicitly marked "TBD - in
      progress with counsel" in the cover letter.
- [ ] Cedar Park TX vs Nevada state-of-formation discrepancy resolved.
- [ ] Cap table reflects today's reality (founders, any safes, any notes).
- [ ] Pro-forma numbers match the deck shown to the same investor.
- [ ] Attorney has signed off on the version going out.
- [ ] Investor-specific cover letter customized (greeting, ordering, dates).
- [ ] Zip generated via PACKET_ZIPPER.py with investor slug + timestamp.
- [ ] Secure-channel link prepared (DocSend / Box / Dropbox).
- [ ] Recipient list inside the firm confirmed (one primary, optional ccs).
- [ ] Tracking entry added to a private outreach log (which investor, what
      version, what date, what cover-letter ordering).
