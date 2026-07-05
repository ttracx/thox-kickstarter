# INVESTOR_SCREENING_FRAMEWORK.md

Pre-meeting screening checklist for any investor THOX.ai LLC is considering
engaging. Score each candidate before the operator commits time to a warm-
intro path. Threshold gate at the end determines whether the candidate
moves to `WARM_INTRO_BUILDER.md`.

Brand: #0B1220 / #F2F4F8 / #27E5FF / #FF3DA8. IBM Plex Sans + JetBrains
Mono.

Voice: technical, honest. No marketing fluff. No fabricated metrics.

Companion docs: `INVESTOR_TARGET_LIST.md`, `WARM_INTRO_BUILDER.md`,
`PITCH_MEETING_PLAYBOOK.md`, `README.md`.

Last refreshed against `../INVESTOR_DECK.md` on 2026-06-25.

---

## How to score

For each question below:

- Score 5: strong yes, publicly verifiable from the fund's own materials
- Score 4: yes, with one missing piece of evidence
- Score 3: ambiguous; thesis page hints at a match but no portfolio
  evidence
- Score 2: ambiguous; thesis page is silent and portfolio is sparse
- Score 1: no, or contradictory evidence (e.g., public statements against
  open source for a "is the fund community-aligned" question)

A score of 0 is reserved for hard-disqualify answers, defined per
question below. Any 0 score on a hard-disqualify question fails the
candidate outright regardless of total.

Maximum score: 6 questions x 5 points = 30.

Threshold gate (combined score):

- 25 or above: green-light. Move to `WARM_INTRO_BUILDER.md`.
- 18 to 24: yellow. Re-read the thesis page and the most recent 2 portfolio
  announcements before deciding. If still yellow, defer engagement to a
  later cycle.
- Below 18: red. Do not engage. Log reason in private CRM-lite and move on.
- Any 0 on a hard-disqualify question: red regardless of total.

Score the candidate ONCE per cycle. Re-score only if material new evidence
arrives (new fund announcement, new published thesis, new portfolio
addition, partner change, fund vintage change).

---

## Question 1: Have they backed hardware on Kickstarter or Indiegogo before?

Why it matters: hardware-on-crowdfunding fundraises differently from
software SaaS. A fund that has lived through a Kickstarter-funded
portfolio company understands the manufacturing-capital story, the
fulfillment risk story, and the Kickstarter-window dynamics that bracket
THOX's Aug 12 launch. A fund that has not is likely to misprice the round
or impose terms that disadvantage a hardware operator.

How to verify:

- Fund portfolio page or AngelList portfolio: any company name that has a
  Kickstarter or Indiegogo origin story
- Public reporting on the portfolio company's funding history
- The portfolio company's About / Press page mentioning a Kickstarter
  campaign

Scoring:

- 5: 3+ Kickstarter or Indiegogo-funded portfolio companies, at least 1
  hardware
- 4: 1 to 2 such portfolio companies
- 3: thesis page mentions crowdfunding interest but no portfolio match
- 2: silence on crowdfunding
- 1: explicit public position against crowdfunded hardware (rare)
- 0 (hard-disqualify): explicit policy against investing in crowdfunded
  companies, stated publicly

---

## Question 2: Have they backed an AI company in the last 24 months?

Why it matters: AI is moving fast enough that a fund's 5-years-ago AI
deal is no longer a strong signal. A recent AI deal (last 24 months)
indicates an active partner who is current on the category, and reduces
the risk of a meeting where the operator has to spend the first 20 minutes
educating the partner on the category before pitching THOX specifically.

How to verify:

- Fund portfolio page: look for any portfolio company whose About page
  describes an AI product (model training, inference, ML infrastructure,
  ML application, agent framework, on-device inference)
- Fund's blog / podcast / newsletter for the last 12 months: any
  AI-thesis pieces
- Public announcement of an AI portfolio addition in 2024, 2025, 2026

Scoring:

- 5: 3+ AI portfolio additions in the last 24 months, ideally edge AI or
  open-source AI infra
- 4: 1 to 2 AI portfolio additions in the last 24 months
- 3: AI thesis published but no recent portfolio addition
- 2: silence on AI in the last 24 months
- 1: explicit public position that AI is overhyped or out of scope
- 0 (hard-disqualify): explicit fund mandate against investing in AI
  companies (extremely rare in 2026 but possible)

---

## Question 3: Public stance on privacy, on-device AI, or open source?

Why it matters: THOX's first-principles thesis is that privacy is a
property of where the computation runs, that on-device inference is the
hardware-as-category play, and that Apache-2.0 software is the moat-
through-community model. A fund whose public stance contradicts any of
the three will either misprice the round or push for product changes
that contradict the thesis.

How to verify:

- General-partner blog posts and podcast appearances in the last 12 months
- Fund's published thesis page
- Fund's About / Values page
- Partner Twitter/X bios and recent posts

Scoring:

- 5: at least one of three (privacy, on-device, open source) is an
  explicit thesis or values position
- 4: at least one is a partner's stated personal interest in last 6 months
- 3: neutral; no public stance either way
- 2: silence in published materials
- 1: at least one public position against (e.g., partner argued open
  source is unmonetizable, or argued cloud AI scale always wins over
  on-device)
- 0 (hard-disqualify): public position against ALL three thesis pillars

---

## Question 4: Reputation for founder-friendly terms?

Why it matters: term-sheet pattern signals how the next 5 to 7 years of
the relationship will go. A fund known for full ratchets, super-pro-rata,
founder-vesting-acceleration carve-outs that disadvantage co-founders, or
heavy information rights at seed stage is a long-term problem regardless
of how friendly the partner seems in the pitch meeting.

How to verify:

- Founder-network references: ask 2 to 3 founders who have taken money
  from the fund what their term sheet looked like (without disclosing
  THOX's specific round)
- Public reporting on the fund's term-sheet patterns (TechCrunch, The
  Information, Pitchbook commentary, public Twitter discussions)
- The fund's standard NVCA-template variations (if discoverable from
  attorney networks)

Scoring:

- 5: 3+ founder references describe the fund's terms as standard NVCA
  with minor founder-friendly modifications
- 4: 1 to 2 references describe standard NVCA
- 3: no references available; thesis page and About page do not signal
  either direction
- 2: 1 reference describes one non-standard term that disadvantages
  founders
- 1: 2+ references describe non-standard terms that disadvantage founders
- 0 (hard-disqualify): documented pattern of full ratchets, founder-
  vesting acceleration carve-outs, mandatory super-pro-rata, or other
  term-sheet patterns that materially disadvantage a 2-founder team

---

## Question 5: Reputation for fast decision-making?

Why it matters: THOX's round timing brackets the Aug 12 Kickstarter
campaign and the Sep 11 campaign close. Funds with 90+ day decision
cycles are a stage mismatch for this round; engage them only after the
lead is committed. Funds with 14 to 45 day decision cycles are the
target.

How to verify:

- Founder references: ask 2 to 3 founders how long the fund took from
  first meeting to term sheet
- Fund's published decision-process page (rare but increasing in 2026)
- Partner's public commentary on decision speed (Twitter, podcast,
  conference talks)

Scoring:

- 5: 3+ founder references describe a 14 to 30 day cycle from first
  meeting to term sheet
- 4: 1 to 2 references describe a 30 to 45 day cycle
- 3: no references; partner's public commentary suggests measured pace
  without specifics
- 2: 1 reference describes a 60+ day cycle
- 1: 2+ references describe a 90+ day cycle
- 0 (hard-disqualify): documented pattern of 120+ day cycles AND demand
  for exclusivity during the cycle

Note: Tier-4 (strategic / corporate VC) candidates are exempt from the
hard-disqualify gate on this question. Long cycles are a known property
of corporate VC; the mitigation is to engage them only after a Tier-1 or
Tier-2 lead is committed.

---

## Question 6: Co-investor pattern and partnership compatibility?

Why it matters: at seed, the lead investor often pulls 1 to 3 co-investors
into the round. A lead with a consistent co-investor circle is easier to
fill the round around. A lead whose typical co-investors clash with
THOX's thesis (e.g., co-invests with cloud-AI-only funds that would push
for a centralized pivot) is a longer-term cap-table risk.

How to verify:

- Fund's last 5 to 10 portfolio announcements: who else was on the round?
- Co-investor pattern frequency (does the same name appear in 3+ rounds?)
- Public commentary about the co-investor relationships

Scoring:

- 5: consistent co-investor circle of 3+ funds whose theses align with
  THOX
- 4: consistent co-investor circle, partially aligned with THOX thesis
- 3: variable co-investor pattern (no consistent circle)
- 2: 1 to 2 typical co-investors whose theses clash with THOX
- 1: 3+ typical co-investors whose theses clash with THOX
- 0 (hard-disqualify): typical co-investor is on the OFAC or other
  sanctions watch list, or has had a publicly documented pattern that
  would create a problem for THOX's CAP table (rare)

---

## Score sheet template

Per candidate fund, the operator fills in:

| Question | Score (0-5) | Evidence (one line) |
|---|---|---|
| Q1: hardware on Kickstarter/Indiegogo |  |  |
| Q2: AI in last 24 months |  |  |
| Q3: privacy / on-device / open-source stance |  |  |
| Q4: founder-friendly terms |  |  |
| Q5: decision speed |  |  |
| Q6: co-investor pattern |  |  |
| TOTAL (sum, max 30) |  |  |

Hard-disqualify flag (any Q above scored 0): YES / NO

Decision:

- Combined score 25+ AND no hard-disqualify: GREEN, move to
  `WARM_INTRO_BUILDER.md`
- Combined score 18 to 24 AND no hard-disqualify: YELLOW, defer or
  re-evaluate
- Combined score below 18 OR any hard-disqualify: RED, do not engage

Re-score after 90 days at the earliest, only if material new evidence
arrives.

---

## What this framework does NOT do

- It does not predict whether a fund will say yes. A 30/30 score on
  thesis match still leaves a 2/3+ probability of pass at seed stage for
  hardware deals.
- It does not replace founder references. A 25/30 score with 0 founder
  references is weaker than a 22/30 score with 3 strong founder
  references.
- It does not replace attorney review of term sheets. A high score on
  Q4 reduces the probability of a problem but does not eliminate it; the
  term sheet itself must be reviewed by counsel before any signature.
- It does not score for chemistry. Partner-founder chemistry only
  surfaces in the meeting; it cannot be screened from outside.

---

## Anti-patterns to avoid

- Scoring on optimism rather than evidence. If the operator cannot point
  to a specific URL or specific reference for a score, the default is
  the middle of the range (3), not the top.
- Scoring by reputation rather than current data. A fund's 2022 thesis
  is not a reliable predictor of its 2026 thesis. Re-verify on each
  scoring cycle.
- Skipping the hard-disqualify check. The hard-disqualify gate exists
  because some red flags are so significant that no other score can
  compensate. Skipping the gate to "give the fund a chance" wastes
  founder time and burns warm-intro channels.
- Re-engaging a hard-passed fund within 90 days. A re-engage signal in
  under 90 days suggests the operator is desperate; this damages the
  next 5 rounds of perception, not just this round.

---

DISCLAIMER: This framework is internal preparation. Nothing here is a
commitment to or from any investor. All legal review of term sheets
must come from THOX's startup attorney. All tax review of round
structure must come from THOX's CPA.

Owner: Tommy. Operator runs scoring per candidate; Craig spot-checks
the top 10 candidates per scoring cycle before any warm-intro outreach.
