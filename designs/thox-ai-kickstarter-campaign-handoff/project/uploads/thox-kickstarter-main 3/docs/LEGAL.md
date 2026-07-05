# Legal Posture

Internal note. Do not paste any of this directly into Kickstarter.

## Entity

THOX.ai LLC, Nevada single-member LLC, EIN on file, registered agent in Reno, NV.

## Bank + payments

- Operating account: Mercury Bank, Reno branch.
- Stripe Connect: linked to the operating account.
- Daily payouts after T+0.

## IP filings

- THOX IP-008: ThoxClip wearable BLE clip
- THOX IP-009: ThoxMini RISC-V edge node
- THOX IP-010: ThoxAir wireless cluster node + MagStack Air pogo interconnect
- THOX IP-011: ThoxNova desktop hub
- THOX IP-012: THOX agent contract + cross-runtime routing
- THOX IP-013: MagStack Air fabric (Pi Zero W class, three variants)
- THOX IP-014: MagStack Air edge-AI vertical slice (Pi Zero 2 W cluster)
- THOX IP-015: ThoxyMicro on Luckfox Pico Mini B (separate prototype track)

Inventors of record on every filing: Craig Ross and Phamy Xaypanya.

Patent prosecution is handled by an outside firm. Filings are at provisional stage as of campaign launch; PCT non-provisional applications follow within 12 months.

## Trademark posture

- THOX.ai: word mark registered, class 9 (electronics, software) and 42 (SaaS).
- ThoxClip, ThoxMini, ThoxAir, ThoxNova, ThoxyMicro, MagStack Air: word marks pending, class 9.

## Software licensing

- Agent runtime: MIT or Apache-2.0 depending on the module (see each repo's LICENSE file).
- Customer-facing dashboard (thox-forge): Apache-2.0.
- Documentation: MIT.

## Open hardware posture (at $3M stretch goal)

- KiCad schematics: CERN-OHL-S (Strong Reciprocal).
- STEP enclosure files: CERN-OHL-S.
- Buildroot configs: MIT.
- BOM data: published as CSV, public domain.

## Backer terms (linked from the Kickstarter page footer)

- All-or-Nothing funding (Kickstarter standard terms).
- Refund window: 30 days post-campaign close, full refund minus payment-processor fee, no questions asked.
- Refund window after device ships: 14 days after delivery, restocking deducted at 15% of MSRP.
- Lifetime firmware updates: agent runtime updates for the supported model life (minimum 5 years from ship date).
- Right to repair: schematics + Buildroot configs are shipped with every device on a microSD card.

## Data + privacy

- No cloud egress by default. Every outbound request is logged and visible on the ThoxNova dashboard.
- Backer email addresses: stored in Mailerlite and BackerKit. Never sold. Never shared with marketing partners.
- Threat model: published at launch alongside the firmware repo.

## Regional notes

- EU: VAT collected at order-survey time via BackerKit. DDP shipping from a Netherlands fulfillment hub. WEEE compliance handled by the EU partner.
- UK: VAT collected. DDP shipping from the EU hub. UKCA mark on every device.
- US: state sales tax collected at survey time via BackerKit's tax service.
- AU / NZ: GST collected at order-survey time. Standard import duties absorbed.
- Rest of world: customer pays import duties on arrival. Disclosed clearly at checkout.

## Accessibility

- Kickstarter page meets WCAG 2.1 AA on color contrast (THOX brand emerald + ink combination tested 4.7:1).
- Hero video has closed captions and a downloadable transcript.
- All device dashboards target WCAG AA at minimum.

