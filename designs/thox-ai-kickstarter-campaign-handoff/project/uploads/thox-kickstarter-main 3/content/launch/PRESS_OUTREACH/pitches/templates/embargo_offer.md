# embargo_offer.md

Embargoed preview offer. Used after a reporter has responded with interest, or as the initial outreach when the reporter is known to honor embargoes and the operator wants to formalize terms early.

## Variables

- `{{ publication }}`
- `{{ reporter }}`
- `{{ embargo_date }}` - date and time the embargo lifts; default Aug 5, 2026 at 09:00 ET
- `{{ kickstarter_url }}`
- `{{ press_kit_url }}` - URL to the press kit; default `thox.ai/press`
- `{{ founder_signoff }}`

## Subject line (A)

```
THOX embargoed preview for {{ publication }} - terms inside
```

## Subject line (B)

```
Confirming embargo for {{ publication }}: lifts {{ embargo_date }}
```

## Preview text (~60 chars)

```
Embargo terms + demo unit shipping + 30-min founder call.
```

## Body (~300 words)

```
Hi {{ reporter }},

Thank you for the interest. Below are the embargo terms for the THOX.ai preview. Reply to confirm acceptance and I will release the press kit, ship the demo unit, and set up the founder briefing this week.

Embargo terms

- Embargo lifts: {{ embargo_date }} at 09:00 ET.
- {{ publication }} may publish at the lift moment or any time after. Not before.
- The press kit at {{ press_kit_url }} is under the same embargo until lift.
- The demo unit is under the same embargo. Photos and unboxing media may be staged and held; not published before lift.
- One reporter at {{ publication }} per embargo. If a colleague at {{ publication }} also wants the preview, please coordinate internally and reply with one named contact.
- Embargo applies to coverage in {{ publication }}. Republication or syndication after lift is fine.
- If the embargo is broken before lift, intentionally or accidentally, future previews from THOX.ai to {{ publication }} are at our discretion. We will not threaten access; we will quietly stop offering it.

What you get

- Press kit with hero renders, founder bios, boilerplate copy, tech-spec one-pagers per launch SKU, and a 30-second teaser MP4. Located at {{ press_kit_url }} (released on embargo acceptance).
- Demo unit: one ThoxAir + one ThoxMini Air shipped to a US address. International addresses: we can ship; transit time may push past the embargo lift, in which case we will discuss timing.
- Founder briefing: 30 minutes with me and my co-founder Craig Ross. Schedule via the link in my reply.

Reply to confirm and we will move.

Thank you,

{{ founder_signoff }}

Tommy Xaypanya
Co-founder, THOX.ai
Cedar Park, TX
Kickstarter pre-launch: {{ kickstarter_url }}
```

## Per-tier customization notes

- **Tier 1 + 3:** keep as written. These outlets expect explicit terms.
- **Tier 2:** Hacker News and Lobsters do not honor embargoes; do not send this template to them. For InfoQ, dev.to, IEEE Spectrum: keep as written.
- **Tier 4:** add a line offering assembly experience as part of the demo. "If you would like to assemble the device on camera, we can ship STL + 3MF plates plus the assembled unit."
- **Tier 5:** for newsletters/podcasts, adjust the embargo line to align with their weekly publish cadence. Confirm cadence in the reply.
- **Tier 6 + 7:** standard terms; keep as written.
- **Tier 8:** add the syllabus insert as an embargoed asset.

## Send checklist

- Reporter has responded with interest, OR the operator has a documented history of embargo-honoring practice with this reporter
- `{{ embargo_date }}` is the canonical Aug 5, 2026 09:00 ET (unless the operator has documented a different date in writing for this reporter)
- `{{ press_kit_url }}` is live and the kit is staged behind the embargo (not public)
- Demo unit inventory checked; one ThoxAir + one ThoxMini Air available for this reporter
- Schedule link for the founder briefing is live
- Logged in `workflow/JOURNALIST_RELATIONSHIP_LOG.md` with `warm` -> `hot` status upgrade
