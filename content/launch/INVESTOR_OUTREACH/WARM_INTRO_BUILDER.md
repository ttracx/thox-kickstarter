# WARM_INTRO_BUILDER.md

How to build a warm-intro path to a screened-in investor candidate for
the THOX.ai LLC pre-seed/seed round. This document is internal preparation
only.

Brand: #0B1220 / #F2F4F8 / #27E5FF / #FF3DA8. IBM Plex Sans + JetBrains
Mono.

Voice: technical, honest, no marketing fluff. No fabricated contact info.
No cold-DM templates for investor partners.

Companion docs: `INVESTOR_TARGET_LIST.md`, `INVESTOR_SCREENING_FRAMEWORK.md`,
`PITCH_MEETING_PLAYBOOK.md`, `README.md`.

Last refreshed against `../INVESTOR_DECK.md` on 2026-06-25.

---

## Core rule

DO NOT cold-DM investor partners on LinkedIn, X, email, or any other
channel. Cold DMs to investor partners have near-zero conversion at
pre-seed and seed stage for hardware deals, and they burn the channel
for the next 90 days minimum.

The only acceptable first-touch is a warm intro from a third party who
has worked with the partner before (founder they backed, founder they
co-invested with, advisor / LP / operator / engineer / designer they
know directly).

This document is the playbook for finding that third party.

---

## Step 1: identify the right partner at the firm

Before building an intro path, identify the SPECIFIC partner at the firm
who should hear the THOX pitch. Different partners at the same firm
specialize in different sectors; a partner who invests in fintech is
unlikely to be the right path for a deep-tech edge-AI hardware pitch.

How to identify:

- The firm's Team page lists all partners and (usually) their sector
  focus
- Each partner's individual LinkedIn or X bio usually lists their
  portfolio companies; look for hardware-plus-software, edge AI, or
  privacy-tech in their portfolio
- Each partner's recent published writing (Medium / Substack / firm
  blog) signals current thesis interests
- A partner who has invested in a Kickstarter-origin hardware company is
  a strong target regardless of stated thesis

Score the partner separately from the firm. A firm can be a 28/30 on
the screening framework but the available partners might all be wrong
fit; in that case, defer engagement until a thesis-matched partner joins.

---

## Step 2: build a warm-intro path

Four warm-intro sources are reliable for pre-seed / seed hardware
fundraises. Try them in order of expected conversion.

### 2.1 Founder network (highest conversion)

Definition: a founder of a company in the target partner's portfolio,
or a founder the target partner has met but not invested in.

How to find:

- Look at the partner's portfolio page
- Pick 2 to 3 portfolio companies whose products are in adjacent
  categories (hardware, AI, edge inference, open source)
- Find each founder on LinkedIn or via the company's About page
- Check the founder's degree of separation from Tommy or Craig via
  LinkedIn 2nd-degree search (described in step 3 below)

The ideal founder warm-intro source:

- Has known the target partner for 2+ years
- Has a positive ongoing relationship with the partner (NOT a
  dispute, departure, or pass story)
- Has shipped a hardware product themselves so understands THOX's
  category
- Knows Tommy or Craig directly OR is 1 hop away through a verifiable
  connection

Ask script (sent to the warm-intro source):

> Hi {name}, hope the {recent thing in their public timeline} is going
> well. Quick ask: I'm fundraising a pre-seed for THOX.ai, a family of
> small on-device AI hardware devices launching on Kickstarter Aug 12.
> Your portfolio overlap with {partner name} at {fund} looks strong for
> our thesis. Would you be open to a forwardable intro if it makes sense
> after a 15-minute call?
>
> One-pager attached (`INVESTOR_DECK_ONE_PAGER.pdf`). No pressure either
> way.
>
> Tommy

Notes:

- Always offer a 15-minute call FIRST before asking for the intro. This
  gives the source a chance to vet THOX before staking their reputation
  on the forward.
- Always provide the one-pager up front. The source needs material to
  send if they say yes.
- Always make it a forwardable intro, not a "double opt-in" intro,
  unless the source prefers double opt-in. Some sources have a policy.
  Respect it.

### 2.2 Operator / advisor network (medium-high conversion)

Definition: an operator (engineer, designer, PM, product lead) who has
worked closely with the target partner without being a portfolio
founder. Advisors who work with the fund's portfolio companies fall in
this bucket too.

How to find:

- The fund's About page sometimes lists named advisors
- LinkedIn search for "{fund name} advisor" or "{fund name} operator-
  in-residence"
- The fund's published podcast or YouTube channel often features
  advisors and operators

The intro mechanism is similar to the founder path but the warm-intro
source carries slightly less weight than a portfolio founder. Conversion
is medium-high (probably 30 to 60 percent of the founder rate).

### 2.3 Community channels (medium conversion)

Definition: an open community where founders, operators, and investors
mix. Targeting community-channel intros is slower than direct founder
intros but compounds well over months.

Reliable communities for THOX's category:

- Y Combinator alumni network (Bookface / Founder Connect): if either
  founder is YC alum or has YC alum in their network. NOT applicable
  to THOX directly unless we apply.
- Indie Hackers community: hardware operators with crowdfunded history
  are over-represented; some have warm relationships with hardware-
  thesis investors.
- Specific Slack and Discord communities: edge AI, on-device inference,
  rust embedded, open hardware, makerspace operator networks. These
  are private and require a member to vouch; do NOT name them in this
  document for privacy of the communities.
- Conference speaker networks: speakers at AI Engineer Summit, KubeCon,
  CES, SXSW, NeurIPS often have direct fund partner relationships
  through their speaking circuit.

Use community channels for SOFT engagement (helpful posts, technical
contributions, conference attendance) rather than direct asks. The
warm-intro source emerges from prolonged contribution to the community,
not from a single ask.

### 2.4 "Ask a friend who's raised before" (medium conversion)

Definition: any founder Tommy or Craig knows personally who has raised
a round in the last 36 months. Even if their fund overlap with the
target partner is incomplete, they can usually offer:

- A read on which firms are currently writing checks at THOX's stage
- A read on which partners are best to target at each firm
- A direct intro to 1 to 3 partners they have a relationship with

Ask script (sent to a friend who has raised):

> Hi {name}, congrats on the {their recent round}. Quick ask: I'm
> fundraising a pre-seed for THOX.ai (private AI hardware family,
> Kickstarter Aug 12). Looking for warm intros to {partner name} at
> {fund}, {partner name} at {fund}, and {partner name} at {fund}. Any
> of those a path from your side? No pressure either way.
>
> One-pager attached.
>
> Tommy

Notes:

- Name 3 partners. Asking for "intros to anyone" is harder to action
  than asking for specific intros.
- Limit to 3 per ask. Asking for 10 makes the source feel like a list
  rather than a relationship.
- Re-engage with the same source no more than once per quarter.

---

## Step 3: LinkedIn 2nd-degree heuristic

LinkedIn 2nd-degree search is the highest-yield mechanism for finding
warm-intro candidates without paid LinkedIn tools.

How to run:

1. On LinkedIn, search the target partner's name and open their profile.
2. Confirm the partner's name and fund match.
3. Click "See connections" on the partner's profile (this requires the
   partner to have set connections to visible; many partners do not).
4. If visible, filter to 2nd-degree connections.
5. Scan for connections who match the founder-network profile in step
   2.1 above.
6. Cross-check the candidate's public posts to verify they have an
   active positive relationship with the partner (recent comments,
   tagged photos at events, shared content).

If the partner's connections are hidden:

1. Search the FUND name on LinkedIn.
2. Look at the fund's "People" tab (this lists current employees and
   recent connections).
3. Cross-reference the people listed against your 2nd-degree network.
4. Same cross-check on the public posts.

Limits:

- LinkedIn shows 1st and 2nd degree only. 3rd degree requires Sales
  Navigator (which THOX does not need at pre-seed scale).
- Free LinkedIn limits the number of profile views per day before
  rate-limiting kicks in. Stay under 50 profile views per day if you
  do not have LinkedIn Premium.
- LinkedIn does NOT verify warm-intro strength. A "2nd-degree
  connection" can be a one-time conference handshake; vet the
  relationship before requesting an intro.

---

## Step 4: X / Twitter bio scrape (signal, not channel)

X / Twitter bios often signal a partner's interests more honestly than
their fund's website does. Use bio scrape as SIGNAL on what to pitch,
NOT as a cold-DM channel.

How to run:

1. Search for the partner on X.
2. Read their bio carefully. Common patterns:
   - "Investor at {fund}, ex-{ company}, into {sector}" -- tells you
     what they actively look for
   - "{sector} thesis at {fund}, formerly {operator role}" -- tells
     you their operator-credibility frame
3. Scan their last 30 to 60 tweets for thesis hints, hot takes, and
   recent meetings.
4. Cross-reference what you find against THOX's pitch. If their
   recent tweets are about cloud AI scale and centralized inference
   wins, deprioritize them; if their recent tweets are about edge
   inference, privacy by design, or open source, prioritize them.

Anti-pattern: replying to a partner's tweet with a THOX pitch. This is a
cold DM in public; it is worse than a private cold DM because it makes
the partner uncomfortable in front of their followers. Do NOT do this.

---

## Step 5: introductions THOX can offer back

Warm-intro requests are reciprocal economics. Founders, operators, and
advisors who introduce THOX expect to be paid back over time in:

- Reverse intros (Tommy or Craig introduces them to someone valuable in
  THOX's network)
- Technical help (Tommy or Craig reviews their hardware design, code,
  or pitch deck)
- Public support (Tommy or Craig writes a quote, blurb, or tweet
  endorsing their product)
- Community attendance (Tommy or Craig shows up at their conference
  talk, demo day, or launch)

Keep a private list of reciprocal asks the source has made of THOX, and
fulfill them within 30 days of the original warm intro landing. This
compounds the warm-intro channel over time.

---

## What to send with a warm-intro ask

When the warm-intro source agrees to send the intro, give them a
forwardable email block they can paste. Do not make the source draft
the intro from scratch.

Forwardable block template:

> Subject: Intro -- THOX.ai (private AI hardware, Kickstarter Aug 12)
>
> Hi {partner_first_name},
>
> Wanted to introduce you to Tommy Xaypanya and Craig Ross, co-founders
> of THOX.ai. THOX is a family of small on-device AI hardware devices
> launching on Kickstarter Aug 12 -- four SKUs from $39 to $499 on a
> common Apache-2.0 runtime, all repos public at github.com/ttracx.
>
> One-pager attached. The pitch deck is in the data room (link on
> request). They are raising a pre-seed alongside the campaign.
>
> Reason I think this fits your thesis: {one sentence per
> warm-intro-source, customized per partner}.
>
> Tommy, Craig -- happy to make this a live intro if {partner_first_name}
> is interested.
>
> {source_first_name}

Notes:

- One-pager attached, not the full deck. The full deck is for the
  meeting.
- Data-room link "on request" rather than embedded. This forces a
  reply, which gives the source a signal back on whether the partner
  is interested.
- Thesis-fit reason in one sentence, customized per partner. Generic
  "we think you might be interested" forwards die.

---

## Anti-patterns

- Cold-DMing a partner on LinkedIn, X, or email. Near-zero conversion.
  Burns the channel for 90 days minimum.
- Requesting an intro from a source who does not have an active
  positive relationship with the partner. The intro fails AND damages
  the relationship between the source and the partner.
- Sending the full deck with the first touch. The deck is for the
  meeting; the one-pager is for the intro.
- Following up more than once on a forwarded intro. If the partner
  does not reply within 7 days of the source's forward, the answer is
  no for this cycle. Re-engage in 90+ days only if there is material
  new evidence (Kickstarter result, new partnership, new product
  release).
- Using paid intro brokers. The pre-seed and seed market is small
  enough that paid intros are detectable, and detectable paid intros
  are a negative signal.
- Asking for an intro to a partner whose firm is currently in an
  exclusivity window with another deal. Wait for the window to clear.

---

## Tracker integration

For each warm-intro path the operator builds:

| Field | Value |
|---|---|
| Target firm |  |
| Target partner |  |
| Warm-intro source |  |
| Source's relationship to partner (one line) |  |
| Source's read on partner's current interest (one line) |  |
| 15-min vet call with source: date |  |
| Forwardable intro sent: date |  |
| Partner reply: date |  |
| Outcome: meeting / soft pass / hard pass / no reply |  |

Log in the private CRM-lite, not in this document.

---

DISCLAIMER: This document is internal preparation. Nothing here is a
commitment to or from any investor or warm-intro source. Respect each
warm-intro source's preferences on style, timing, and frequency. The
warm-intro channel compounds over months and years; one bad ask can
burn a multi-year relationship.

Owner: Tommy. Craig participates in warm-intro asks where the source is
a hardware founder or operator (Craig's network maps better there).
