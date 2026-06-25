# initial_outreach.md

First-touch cold email. Use at T-28 for Tier 1, T-21 for Tier 2, T-14 for Tier 3 + 4, T-7 for Tier 5 + 6, T-3 for Tier 7 + 8.

## Variables

- `{{ publication }}` - the publication name
- `{{ reporter }}` - the reporter's first name, or "the editorial team" if no specific reporter
- `{{ pitch_angle }}` - the one-sentence pitch angle from `beat_mapping.md` for this tier
- `{{ embargo_date }}` - the embargo lift date (default: Aug 5, 2026 = T-7)
- `{{ kickstarter_url }}` - the Kickstarter pre-launch URL (operator fills in once Kickstarter pre-launch page is live)
- `{{ founder_signoff }}` - "Tommy" or "Craig" depending on tier (see Founder sign-off below)

## Subject line (A)

```
THOX - private AI on hardware you own. Kickstarter Aug 12.
```

## Subject line (B, A/B alternate)

```
On-device AI in a USB-sized device. Pre-launch preview for {{ publication }}?
```

## Preview text (~60 chars)

```
Founder note + demo offer. 7-day embargo through Aug 5.
```

## Body (~280 words)

```
Hi {{ reporter }},

I am Tommy Xaypanya, co-founder of THOX.ai. We are 21 days from launching a Kickstarter campaign for THOX, a family of four devices that runs private AI on hardware you own, not on someone else's servers.

The short version: {{ pitch_angle }}.

The launch lineup:

- ThoxClip ($39) clip-on wake-word + voice gateway
- ThoxMini ($69) desktop edge compute on a Luckfox Pico Mini B
- ThoxAir ($79) single-node compute that clusters via the MagStack pogo dock
- ThoxNova ($499) workstation hosting the full THOX runtime and our 7-backend ThoxCore router

Software is Apache-2.0 across the runtime. The full repo graph is at github.com/ttracx. We are a two-person company in Cedar Park, Texas, operating through a Nevada LLC. No VC. The Kickstarter funding model is the funding.

I would like to offer {{ publication }} a pre-launch preview. We can send a demo unit and give you 30 minutes with me and my co-founder Craig Ross. The embargo lifts {{ embargo_date }}, which gives you a week to publish before launch.

If you are the right person on the {{ publication }} team for this beat, reply and we will line up the preview. If not, please forward to the colleague who covers consumer AI hardware or open-source platforms; I will follow up directly with them.

Kickstarter pre-launch page: {{ kickstarter_url }}
Press kit: thox.ai/press (live by {{ embargo_date }})
GitHub: github.com/ttracx

Thank you for the read.

{{ founder_signoff }}

Tommy Xaypanya
Co-founder, THOX.ai
Cedar Park, TX
press@thox.ai (verify before use)
```

## Founder sign-off mapping

Default sender for the body and signature: Tommy.

Use Craig as the sender for tiers where the hardware-craft angle leads. That is Tier 4 (hardware specialty) and Tier 7 (local TX, hardware-build story). For Tier 4, replace the signature block accordingly. The "co-founder Craig Ross" reference flips to "co-founder Tommy Xaypanya" in the body.

## Per-tier customization notes

- **Tier 1 (tech outlets):** keep the body as written. Lead with private/on-device AI.
- **Tier 2 (developer outlets):** swap paragraph 2 to lead with the GitHub link. Add a line on the cargo workspace layout (`14 crates`, `Apache-2.0`, `cargo workspace`).
- **Tier 3 (consumer tech):** drop the 7-backend router reference; add a sentence on what an end buyer does with the device.
- **Tier 4 (hardware specialty):** swap to Craig as sender. Replace paragraph 2 with the print-kit angle: "MagStack Cluster Dock prints in 6.5h and 85g of PETG on a single Q2 Combo bed; STL + 3MF plates published in the open."
- **Tier 5 (AI focused):** lead with the thesis sentence; drop the lineup list. Two paragraphs only.
- **Tier 6 (business press):** lead with the founder + funding-model paragraph. Reorder so the company facts come first.
- **Tier 7 (local TX press):** swap to Craig as sender if the hardware-craft angle leads, else keep Tommy. Add "in person interview available in Cedar Park or Austin."
- **Tier 8 (education press):** swap paragraph 3 to lead with the THOXKey EDU SKU and the syllabus insert. Reference `ttracx/thox-key/content/outreach/SAMPLE_SYLLABUS_INSERT.md`.

## Send checklist (before each send)

- `{{ reporter }}` filled or replaced with "the editorial team"
- `{{ publication }}` filled
- `{{ pitch_angle }}` filled from `beat_mapping.md`
- `{{ embargo_date }}` filled (default Aug 5, 2026)
- `{{ kickstarter_url }}` filled (operator fills once pre-launch page is live)
- `{{ founder_signoff }}` matches per-tier note above
- No em-dashes, no emojis
- Press email address (`press@thox.ai`) verified live before claiming it in signature
- Logged in `workflow/JOURNALIST_RELATIONSHIP_LOG.md` as `cold` status
