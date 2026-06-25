# demo_offer.md

Demo unit + assembly experience offer. Use for reporters who want hands-on access to the hardware before they write.

## Variables

- `{{ publication }}`
- `{{ reporter }}`
- `{{ ship_address_request }}` - opening line asking for the reporter's shipping address; default is the canonical line below
- `{{ demo_skus }}` - list of demo SKUs being offered; default is ThoxAir + ThoxMini Air + MagStack Cluster Dock kit
- `{{ assembly_option }}` - whether assembly walkthrough video is offered; yes for Tier 4
- `{{ founder_signoff }}`

## Subject line (A)

```
Demo unit for {{ publication }}? Ship-ready this week.
```

## Subject line (B)

```
Hands-on with THOX: demo unit + assembly walkthrough offer
```

## Preview text (~60 chars)

```
ThoxAir + ThoxMini Air demo. Ships this week. Loan unit.
```

## Body (~290 words)

```
Hi {{ reporter }},

Following up on the THOX coverage. I would like to offer {{ publication }} a hands-on demo unit before launch. Here is what we can ship:

Demo SKUs

{{ demo_skus }}

Default: one ThoxAir node, one ThoxMini Air node, and the MagStack Cluster Dock kit (4-node printable dock + magnets + pogo pins). This is enough to demonstrate single-node compute, multi-node compute via clustering, and the on-device router routing between local nodes.

The demo is a loan unit. We ask that you return it in working condition within 30 days of receipt, or write to us about extending the loan if your editorial calendar pushes longer. We cover return shipping. If you would prefer to purchase the unit at backer pricing after the loan period, we can convert it instead.

Assembly walkthrough

{{ assembly_option }}

Default for Tier 4 outlets: we will include the printable STL + 3MF plates plus a 20-minute walkthrough video showing the cluster dock assembly start to finish. If you want to film your own assembly footage, we will send pre-cut PETG plates and a printed assembly card. For other tiers: assembled units only, no STL by default; let me know if you want the print kit too.

Setup

The units are pre-flashed and pre-paired. Plug in, point a browser at the local IP, and the THOX dashboard is live. We will include a 1-page setup card. If you want a 15-minute screen-share for first-run support, reply and we will schedule it.

Reply with a shipping address and timing window and we will move.

{{ ship_address_request }}

Thank you,

{{ founder_signoff }}

Tommy Xaypanya
Co-founder, THOX.ai
Cedar Park, TX
```

## Default for `{{ ship_address_request }}`

```
Best shipping address (we use a discreet plain-box drop, no THOX branding on the outside if you prefer):
```

## Per-tier customization notes

- **Tier 1:** default SKUs. Default address request. Default loan terms.
- **Tier 2:** add a line offering the print kit and the GitHub repo for self-assembly.
- **Tier 3:** drop the MagStack Cluster Dock unless the reporter has expressed interest; consumer-tech reviewers may not have a Q2 printer handy.
- **Tier 4:** lead with the assembly walkthrough. Make the print kit the headline.
- **Tier 5:** less likely to want a physical demo; offer screen-share + remote API access instead. Adapt the template body to "remote demo session" rather than "ship a unit."
- **Tier 6:** standard demo unit; emphasize the founder briefing pairs with the demo.
- **Tier 7:** offer to drop the unit off in person if the reporter is in Austin metro.
- **Tier 8:** offer a single demo unit (ThoxKey or ThoxMini) plus the syllabus insert; education reporters may not have a hardware test bench.

## Send checklist

- Reporter has confirmed interest in coverage
- Demo unit inventory checked; SKUs available for ship
- Return shipping label format confirmed
- Embargo terms (if applicable) already agreed in writing via `embargo_offer.md`
- Setup card up to date with current first-run flow
- Logged in `workflow/JOURNALIST_RELATIONSHIP_LOG.md` with notes on ship date, expected return date, demo SKUs sent
