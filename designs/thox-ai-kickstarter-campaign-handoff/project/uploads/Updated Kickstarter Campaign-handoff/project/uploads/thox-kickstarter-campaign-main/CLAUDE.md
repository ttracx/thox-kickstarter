# CLAUDE.md

Read this first. It captures the conventions, the hard constraints, and the
locked decisions for this repository. Future sessions should treat the compliance
gate as non-negotiable.

## What this repo is

The campaign operations layer for Thox.ai. It does two things:

1. Generates the campaign documents as Word files (Node + the `docx` library).
2. Runs an agent team that drafts, compliance-checks, schedules, and reports on
   the campaign (Python). Every content-producing step passes a deterministic
   compliance gate before its output is accepted.

This is standalone tooling. It is not device firmware and not the website. It
only references the products as subjects of campaign copy.

## Locked decisions and assumptions

1. **Two phases in one repo, sequenced.** Phase one is the Founder Reservation
   (live now, ThoxNova-only, refundable deposit, estimated shipping Q4 2026).
   Phase two is the Kickstarter (all five SKUs). `config/campaign.yaml` models
   both phases.
2. **All five SKUs.** ThoxNova, ThoxClip, ThoxMini, ThoxAir, ThoxOnStick. The one
   naming collision is resolved as: **ThoxMini** is the USB-C private Linux
   compute stick that matches the live site; **ThoxOnStick** is a distinct
   bootable-ThoxOS environment appliance (auto-launches a full ThoxOS desktop on
   a host), not a headless stick. **ThoxAir** is a net-new thin pocket node. This
   ThoxMini vs ThoxOnStick boundary is the single open product decision.
3. **Conservative claims.** The compliance gate forbids regulatory and hardware
   claims even though the public website currently uses some of them. Hold the line.
4. **Founders are Craig Ross (CEO) and Tommy Xaypanya (CTO) only.** Sadie is an
   openly synthetic digital-human interface in ThoxOS. She is never a founder,
   equity holder, or spokesperson of record, and never appears in founder bios,
   cap tables, or investor/legal content.
5. **Pricing.** ThoxNova pricing is locked (629 USD super early bird, 899 USD
   MSRP). The four other SKU prices are working figures pending sign-off
   (`locked: false` in `campaign.yaml`); that status must never surface in public copy.
6. **Wordmark.** Default to `Thox.ai` (mixed case). The live site uses `THOX.ai`;
   that casing is an open branding decision (see README open items).
7. **Manufacturer.** Public copy always says "manufactured by Thox.ai LLC". The
   contract manufacturer's name is kept in the internal supplier record, not in
   any generated document (so even the internal runbook clears the same bar).

## HARD CONSTRAINTS (brand and compliance guardrails)

Encoded in `config/brand_guardrails.yaml`, enforced by `thox_campaign/guardrails.py`.

Forbidden in public copy (severity error, blocks publication):
- Processor and module part names: Intel, Intel N305, NVIDIA, Jetson, Orin,
  Renesas, P9418, Raspberry Pi, CM5.
- Performance figures expressed as TOPS (digits followed by TOPS).
- Internal algorithm names: PolarQuant, RHT, FWHT.
- Regulatory compliance claims: HIPAA, GDPR, ITAR (any "compliant" framing).
- Banned marketing or architecture claims: Patent Pending, military grade,
  unhackable, no central server, we cannot decrypt, general purpose VPN.
- Certification claims: Made for MagSafe, MFi Certified, Qi2 Certified, and the
  bare term Qi2 in consumer copy.
- Old colorway names: Midnight Black, Silver, Titanium Gray.
- Supplier name in public copy: Arrow Electronics (public copy says "manufactured
  by Thox.ai LLC"; the supplier may appear only in the internal supplier record).
- Inactive partner: Seeed, Seeed Studio.
- City or state in any output (no Cedar Park, no Texas).
- Out-of-scope SKUs and accessories: Cluster Dock, MagStack Pad, Pro or Lite variants.
- Typography: em dash (U+2014) anywhere; emoji anywhere.

Flagged in public copy (severity warning, reported but not blocking):
- Hard latency figures (for example, sub-50ms claims).
- Hard context-window figures (for example, 256K to 384K).
- Language-count claims (for example, 32+ languages).
- Named third-party model lists.
- Double hyphen used as an em dash.

Required style:
- Wordmark "Thox.ai" mixed case. ThoxOS always mixed case.
- Approved privacy phrasing only: "data stays on your devices", "works offline on
  LAN after pairing", "uses the WireGuard protocol", "coordinator never sees plaintext".
- Colorways limited to Matte Black, Space Gray, Arctic White.
- Public SKUs only: ThoxNova, ThoxClip, ThoxMini, ThoxAir, ThoxOnStick.
- No marketing language in technical docs. No emojis. No em dashes.

## Conventions

- Python 3.10+, dependency-light. PyYAML for config. The Anthropic SDK is
  imported lazily and is only needed for `--live` runs; tests and the mock
  pipeline never require it.
- Config lives in `config/` and loads into frozen dataclasses in
  `thox_campaign/config.py`. Bad config raises `ConfigError` early.
- The guardrail engine is deterministic and is the trust boundary for public
  copy. It runs on every gated agent output and should be run on generated docs.
- Node renderer: `scripts/docx_lib.js` (renderer) + `scripts/content.js`
  (content) + `scripts/generate_docs.js` (driver). US Letter, Calibri body,
  emerald headings (#10B981 / #0B6E4F), dark ink (#111827). Every document opens
  with an emerald hero band. Design blocks: h1/h2/h3, kicker, p, lead, bullets,
  numbers, table (emerald-dark headers, zebra rows), callout, quote, banner,
  stats, cards, rule, spacer, pagebreak. All visual richness is built from color,
  shading, and borders, never from emoji or em dash, so output clears the gate.
- `scripts/preview_html.js` renders the same content specs to self-contained HTML
  in `docs/preview/` for browser review. It is a preview tool; the `.docx` files
  are the shipped artifacts.

## Build and test commands

```bash
# Python
pip install -e ".[dev]"
pytest

# Compliance scans
python -m thox_campaign.cli scan --text "Data stays on your devices."
python -m thox_campaign.cli scan --file path/to/copy.txt

# Run the agent DAG (mock by default; --live needs ANTHROPIC_API_KEY)
python -m thox_campaign.cli run "Launch day brief" --show-output

# Documents
npm install
node scripts/generate_docs.js          # or: python -m thox_campaign.cli generate-docs
python scripts/verify_docs.py           # re-scan generated docs through the gate
```
