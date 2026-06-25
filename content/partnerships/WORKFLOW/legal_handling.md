# Legal handling: partnership NDAs and agreements

Internal-only operational doc. Companion to `docs/PRE_LAUNCH_COMPLIANCE.md` and `docs/CONTRACT_TEMPLATES/`. This doc covers what to do when a partnership counterpart sends THOX an NDA, MSA, partnership letter, or any other legal instrument.

## Default posture

THOX defaults to using the THOX standard mutual NDA at `docs/CONTRACT_TEMPLATES/NDA_MUTUAL.md` whenever the counterpart does not strongly insist on theirs. If the counterpart insists on theirs, THOX reviews their NDA against the standard checklist below before signing.

## Turnaround target

5 business days from receipt to signed or to formal redline reply. If THOX cannot hit 5 business days, THOX sends an acknowledgment within 24 hours with a revised target.

## Standard intake flow

1. Partnership counterpart sends NDA or other agreement.
2. Operator timestamps receipt in the partnership tracker (private CRM tooling, not committed to repo).
3. Operator forwards the document to Tommy + Craig within 24 hours with a flag for required review type:
   - Light (mutual NDA matching THOX standard) -> Tommy + Craig sign-off only, 2-3 day turnaround
   - Medium (mutual NDA with non-standard terms, MSA, partnership letter) -> attorney review required, 5-7 day turnaround
   - Heavy (any agreement with IP-assignment language, exclusivity, non-compete, or monetary obligation >$10K) -> attorney review required + Tommy + Craig joint sign-off, 7-14 day turnaround
4. If attorney review is required, operator engages the THOX startup attorney (per Section 12 of `docs/PRE_LAUNCH_COMPLIANCE.md`) and provides the document plus the THOX standard NDA template for comparison.
5. Attorney returns redlined version or sign-off recommendation.
6. Tommy + Craig review attorney output and either sign, request further redlines, or decline.
7. Operator routes signature via the THOX e-signature path (per `docs/PRE_LAUNCH_COMPLIANCE.md`) and files the executed copy in the partnership tracker.

## Red flags in partner NDAs

If any of the following appear in a counterpart NDA, escalate to attorney review regardless of which review tier the operator initially flagged:

1. Exclusivity clauses. THOXCore's 7-adapter promise depends on multi-vendor support. Any exclusivity language is a hard non-starter and must be redlined out.
2. IP-assignment clauses. THOX does not assign any IP to partners. THOX may grant limited use licenses. Assignment language must be redlined out.
3. Non-compete clauses. THOX does not accept restrictions on what THOX can build or sell.
4. Perpetual confidentiality. NDA terms should sunset at 3-5 years for ordinary commercial information.
5. Unilateral confidentiality (counterpart obligates THOX but does not obligate themselves). Must be made mutual.
6. Choice of law that is hostile to THOX (e.g. law of a jurisdiction with no THOX presence and no obvious tie to the counterpart). Push back to Delaware, Nevada, or the counterpart's principal place of business.
7. Mandatory arbitration in a forum unfavorable to THOX. Push back to a neutral forum (AAA or JAMS) or to litigation in a mutually acceptable forum.
8. Broad definition of confidential information that captures publicly available material. Standard carve-outs (already known, independently developed, public domain, required by law) must be present.
9. Reverse-engineering prohibitions that conflict with THOX's open-weight + open-source posture. Carve out THOX's right to continue developing its existing product line.
10. Most-favored-nation pricing or partnership terms. THOX does not extend MFN to anyone pre-launch.
11. Press-release pre-approval that allows the counterpart to block THOX from naming the partnership publicly forever. Push back to reasonable pre-approval (e.g. 5 business day review window with deemed approval after that).
12. Non-solicit clauses for employees. Acceptable if mutual and time-limited (12-24 months max).
13. Data-sharing obligations that conflict with THOX's privacy posture. Hard non-starter for any telemetry-back arrangement.

## When to escalate to outside counsel

The THOX startup attorney handles most partnership NDAs and the standard partnership letters. Escalate to outside counsel (or to the attorney's broader firm) when:

1. The counterpart's counsel signals that this is a strategic deal for them. Match their seriousness.
2. The agreement total value (cash + in-kind + opportunity) exceeds $100K.
3. The agreement obligates THOX to a multi-year commitment.
4. The agreement involves cross-border IP licensing (any agreement with a non-US counterpart).
5. The agreement involves a regulated industry (healthcare, defense, government, financial services).
6. The agreement modifies any of the THOX standard templates in `docs/CONTRACT_TEMPLATES/` in substantive ways.
7. The counterpart sends a draft that does not look like a standard partnership letter (e.g. it looks like an acquisition term sheet, a licensing agreement, or a joint-venture proposal).

## NDA expiration tracking

Every executed NDA is logged in the partnership tracker with:

- Counterpart name
- Date signed
- Term (commonly 3-5 years from signature)
- Survival of confidentiality obligations (commonly 2-3 years after term)
- Operator action: calendar reminder 60 days before expiration if the relationship is still active

## When NOT to sign an NDA

Do not sign an NDA if any of the following are true:

1. The counterpart has not provided a clear meeting agenda or partnership ask. Premature NDAs are a smell.
2. The counterpart's NDA contains any of the red flags above and they refuse to redline.
3. The counterpart's NDA is mismatched to the conversation scope (e.g. they send a 20-page master NDA for a 30-minute introductory call). Push back with the THOX standard short-form mutual NDA instead.
4. Signing the NDA would obligate THOX to disclose information THOX is not willing to share. Better to walk away from the conversation than to commit to information sharing under a forced NDA.
5. The counterpart cannot articulate a clear definition of confidential information.

## Default declination language

If THOX needs to decline an NDA, use this language (or equivalent, with attorney review):

> "Thank you for sending the NDA. Before signing, we would like to better understand the scope of the conversation and the specific information that would be exchanged. Could we hold a short introductory call without an NDA to scope the discussion? If after that call we identify specific confidential information to share, we will then propose using our standard mutual NDA, which we have attached for your reference."

## Standard mutual NDA reference

THOX maintains a standard mutual NDA template at `docs/CONTRACT_TEMPLATES/NDA_MUTUAL.md` (per the pre-launch compliance pack). This template has been drafted but NOT yet reviewed by attorney. Operator must have attorney sign-off on the template before sending to any counterpart.

## Vendor agreement reference

For partnerships that move beyond the NDA stage into a formal commercial relationship, the THOX standard vendor agreement at `docs/CONTRACT_TEMPLATES/VENDOR_AGREEMENT.md` is the starting point. Same caveat applies: template exists, requires attorney review before first use.

## Hard rules

1. NEVER sign an NDA on behalf of THOX without Tommy + Craig sign-off.
2. NEVER sign any agreement >$10K on behalf of THOX without attorney review.
3. NEVER counter-sign a counterpart's modified version of the THOX standard NDA without re-reviewing the modifications.
4. NEVER use a third-party online NDA template that has not been reviewed by the THOX attorney.
5. NEVER discuss specific THOX confidential information (revenue, supplier names, fine-tune training datasets, customer lists, IP filing status) in an unNDA'd partnership conversation. Stay at the level of public information.
6. NEVER agree to oral confidentiality. Get everything in writing.
7. NEVER let an NDA sit in the operator's inbox for more than 5 business days without acknowledgment. If review will take longer, send a 24-hour acknowledgment and revised target.

## Cross-references

- THOX standard mutual NDA: `docs/CONTRACT_TEMPLATES/NDA_MUTUAL.md`
- THOX standard vendor agreement: `docs/CONTRACT_TEMPLATES/VENDOR_AGREEMENT.md`
- THOX standard EDU pricing letter: `docs/CONTRACT_TEMPLATES/EDU_PRICING_LETTER.md`
- THOX standard waiver letter: `docs/CONTRACT_TEMPLATES/WAIVER_LETTER.md`
- Pre-launch compliance checklist: `docs/PRE_LAUNCH_COMPLIANCE.md`
- Per-item compliance runbook: `docs/COMPLIANCE_RUNBOOK.md`

## Disclaimers

- This doc is general operational guidance, not legal advice.
- The THOX startup attorney is the canonical authority on any legal question that arises from this doc.
- The templates referenced above are drafts and require attorney review before use.
- Tommy + Craig are the only individuals authorized to bind THOX to any partnership agreement.
