# Crisis comms framework

For high-stakes events where the routine templates in `templates/` and the routine decision tree in `COMMS_PLAYBOOK.md` are not enough.

This doc is deliberately short on templates and long on process. In a crisis, the temptation is to send the wrong message fast. The correct response is usually to wait 24 to 48 hours, get the facts straight, get Tommy + Craig (and where applicable, attorney) in the same room or call, and then send a message that holds up under scrutiny.

## Crisis-tier scenarios

The following scenarios trigger this framework. If you are unsure whether something qualifies, default to invoking it; over-applying the framework is cheaper than under-applying it.

### Scenario A: Major manufacturing failure (>30% of units affected)

A defect, recall, or quality issue affects more than 30% of units in a batch or across multiple batches. Includes both confirmed defects and "we are stopping shipments until we know more" pre-emptive holds.

**Examples**: a battery cell from a single lot failing UN 38.3 retest after units already shipped; a firmware bug causing devices to brick on first OTA; an enclosure tooling failure producing units that overheat in normal use.

### Scenario B: Supply-chain disruption (campaign-defining)

A supplier failure, geopolitical event, or logistics breakdown that pushes one or more reward ship windows by more than 180 days, or that puts the campaign at risk of non-delivery on a SKU.

**Examples**: a contract manufacturer goes bankrupt mid-production; a critical component goes EOL with no drop-in replacement; export controls on a chip we depend on are imposed by a government.

### Scenario C: Safety issue

Any defect that could cause physical harm to a backer or property damage. Includes battery, thermal, electrical, sharp-edge, choking-hazard, or radio-frequency emission issues. The unit count does not matter for this scenario; a single confirmed safety issue triggers crisis-tier handling.

**Examples**: a unit catches fire during normal charging; a button mechanism creates a sharp edge that cuts a backer; an RF emission exceeds FCC Part 15 limits in field conditions.

### Scenario D: Regulatory event

A government regulator (FCC, FDA, CPSC equivalent, EU customs authority, state attorney general) initiates inquiry, action, or hold on THOX products.

**Examples**: FCC opens enforcement action on RF emissions; CPSC orders a recall; EU customs holds a shipment lot for incorrect HS coding; a state AG sends a Civil Investigative Demand.

### Scenario E: Investor or business event affecting backer trust

An event in the broader business (acquisition discussion, leadership change, funding event, lawsuit) that backers may interpret as putting their reward at risk.

**Examples**: an acquisition offer goes public before signing; a co-founder departure becomes public; a lawsuit filed against THOX.ai LLC becomes public; a major investor backs out.

### Scenario F: Public crisis

A negative press story, viral social post, or sustained reputational event that has reached or is likely to reach the backer base regardless of whether we email them.

**Examples**: a backer publishes a viral post claiming defect after we declined replacement; a reporter publishes an investigation alleging misrepresentation; a coordinated complaint thread on a major subreddit gains traction.

## Crisis comms protocol

When a Scenario A through F event is identified, the following protocol activates. Steps must be done in order, not in parallel, except where noted.

### Step 1: Stand up the crisis call (within 4 hours of identification)

- **Mandatory attendees**: Tommy + Craig.
- **Conditional attendees**: attorney (Scenarios C, D, E if any legal exposure), ops lead (always), engineering lead (Scenarios A, B, C, D), PR advisor (Scenarios E, F if media attention probable).
- **Output**: shared written situation report (1 to 2 pages) covering facts known, facts unknown, immediate risks, decisions needed in next 24 hours.

### Step 2: Pause all routine comms (within 1 hour of crisis call)

- **Pause**: Templates 02, 03, 04, 06 Day +7 followup, 11, 12. These are non-urgent and can wait.
- **Continue**: Templates 05 (shipping notification), 06 (delivery confirmation initial send), 09 (refund acknowledgment for already-processed refunds). These are transactional and pausing them would create worse outcomes.
- **Hold**: Templates 07, 08, 10. Any pending sends are held pending crisis comms framing.

### Step 3: Determine the disclosure perimeter (within 24 hours)

Decide who needs to know, in what order, and via what channel.

- **Affected backers first**, always. They are the highest-priority audience.
- **All backers second**, if the issue affects the perceived integrity of the broader campaign.
- **Public Kickstarter update third**, after affected backers have been notified.
- **Press fourth**, in response to inquiries or proactively if the issue will reach press regardless.
- **Social media last**, mirroring the Kickstarter update.

The disclosure order is important: backers must not learn of an issue from a tweet or a press story.

### Step 4: Draft the crisis comm (within 48 hours of identification)

The crisis comm is not a template. It is written fresh per event. The structure below is the minimum frame; deviation is allowed where the situation demands it.

**Subject**: Direct statement of the issue. No softening. Example: "Important: ThoxClip battery hold. What you need to do."

**Lead paragraph**: One paragraph, 3 to 5 sentences. What happened, who is affected, what we are doing right now, what backers should do right now.

**Facts section**: Bullet list of what we know to be true, dated. Distinguish from what is suspected but not confirmed.

**Action required**: Numbered list of what the backer needs to do, in order of priority. Each item is concrete and actionable.

**What we are doing**: Bullet list of internal actions, with owners and dates where possible.

**Where to get more information**: A single canonical channel (typically a dedicated Kickstarter update or a page on thox.ai/status). Do NOT promise updates on social.

**Signature**: Both Tommy and Craig sign every crisis comm.

### Step 5: Legal and PR review (parallel with Step 4)

If attorney is engaged, the crisis comm goes through legal review before send. The bar for legal review is "does this expose the company to liability we did not anticipate," not "does this water down the message." We do not soften honest statements to manage litigation risk; we instead make sure honest statements are factually defensible.

If PR advisor is engaged, the crisis comm goes through PR review with the same bar: "does this clearly communicate what backers need to know," not "does this make us look better." PR review is for clarity, not spin.

### Step 6: Send (within 72 hours of identification, sooner if safety-critical)

- Send to affected backers first via the standard email pipeline.
- Within 4 hours of email send, post the Kickstarter update.
- Within 8 hours of Kickstarter update, post a brief summary to social linking back to the canonical channel.

### Step 7: Recovery cadence

The crisis is not over when the first comm sends. Recovery cadence:

- **Day +1 from first comm**: short status update via Kickstarter update, even if "no new information."
- **Every 48 hours for the first 2 weeks**: status update via the same channel.
- **Weekly thereafter** until the issue is resolved.
- **Resolution comm**: when the issue is closed, a final comm via email (to affected backers) and Kickstarter update (public) describing what happened, what we did, what we learned, and what changed.

Silence during recovery is the single biggest failure mode. Backers will fill silence with the worst possible interpretation. A "no new information, here is when we will know more" update beats a 5-day gap every time.

## What to say

Crisis comm writing rules, layered on top of the standard voice rules in `BACKER_COMMS_PACK.md`.

- **State the headline first**. The first sentence is the headline. No buildup.
- **Use specific numbers where you have them**. "Affecting approximately 340 ThoxClip units shipped between Oct 12 and Oct 27" is better than "affecting a subset of units."
- **Use ranges where you do not have specific numbers**. "Between 200 and 500 units, we will narrow this in the Day +1 update" is better than "an unknown number."
- **Name the action you are taking**. "We are issuing a replacement to every affected backer" is better than "we are working on a path forward."
- **Acknowledge the cost to backers**. If they have to do something (charge a battery to 50% and ship back, install a firmware update, accept a 90-day delay), the email must explicitly acknowledge the inconvenience.
- **Sign with both names**. Tommy and Craig together on every crisis comm.

## What NOT to say

- **No specific dollar figures** about company finances, refund totals, recall costs, or fundraising context. Backers do not care about our P&L; they care about their reward. Dollar figures invite speculation about whether we are solvent enough to fulfill.
- **No speculation about cause** before root cause is confirmed. "We are investigating" is acceptable; "we believe the issue may be caused by X" is not.
- **No blame on suppliers by name** unless they have signed off in writing or are a publicly known party in a regulatory action.
- **No legal hedging language**. "Without admitting liability" or "in the spirit of customer service" reads as evasive even when it is not. Just describe what we are doing.
- **No marketing language**. "We are committed to excellence," "your trust means everything to us," "we strive to" are all banned in crisis comms. They sound like a press release; backers can smell it.
- **No predictions about resolution timeline** before the engineering work is scoped. "We expect this to be resolved within 30 days" is a commitment, not a guess. Make commitments only when they are defensible.
- **No comparison to competitors or industry norms**. "This is a common issue in the industry" is true and useless; it sounds like deflection.
- **No "we appreciate your patience"**. Backers know they are being patient. Saying it back to them is patronizing. Say what we are doing instead.

## Escalation roster

In a crisis, the following people are the only ones who can authorize public statements on behalf of THOX.ai. No one else, including ops team members, posts publicly without explicit authorization.

- **Tommy**: founder, primary spokesperson, signs every crisis comm.
- **Craig**: co-founder, joint signer on every crisis comm.
- **Attorney**: engaged for Scenarios C, D, E with legal exposure. Reviews crisis comm before send.
- **PR advisor**: engaged for Scenarios E, F with high media attention. Reviews crisis comm before send.

Ops team members handle backer replies during a crisis but do not author public statements or initial crisis comms. Their role is to triage, route, and escalate.

## Channels of last resort

If standard channels (email, Kickstarter update) are not sufficient for a Scenario C safety issue, the following channels are available:

- **Direct phone outreach** to backers whose units present immediate safety risk, sourced from BackerKit survey phone fields where backers provided them.
- **Postal mail** to backer addresses on file, used as a parallel channel for safety recalls per CPSC guidance.
- **CPSC recall portal** for any safety recall affecting US-shipped units.
- **Equivalent regulators** in EU (RAPEX), UK (OPSS), AU (ACCC), CA (Health Canada) for affected international units.

Channel-of-last-resort use requires Tommy + Craig + attorney sign-off.

## Post-crisis review

Within 30 days of a crisis being declared resolved, conduct a post-mortem:

- What happened (timeline).
- What we caught early.
- What we caught late.
- What the crisis cost (money, reputation, ship delay, backer churn).
- What we changed (process, supplier, design, comms) to prevent recurrence.
- One concrete update to this doc, if the crisis revealed a gap in the framework.

Post-mortem is shared with backers in summarized form via the next monthly update (Template 03), and the full doc is archived in `docs/post-mortems/` for internal reference.

## Action needed (operator)

Pre-launch:

1. Tommy + Craig agree on attorney to retain on standby for Scenarios C, D, E. Get a one-page engagement letter signed.
2. Tommy + Craig agree on PR advisor to retain on standby for Scenarios E, F. Optional but recommended for >$1M campaigns.
3. Set up a `thox.ai/status` page as the canonical recovery-update channel. Default state: empty. Used only when a crisis comm has been sent.
4. Confirm BackerKit phone field is enabled in the backer survey for backers who want to opt into safety-critical phone contact.
5. Register with CPSC (US) for recall reporting if any THOX SKU falls under their jurisdiction. Confirm with attorney.

In a crisis:

1. Within 4 hours: stand up crisis call.
2. Within 1 hour of call: pause routine comms.
3. Within 24 hours: disclosure perimeter decided.
4. Within 48 hours: crisis comm drafted, legal + PR review complete.
5. Within 72 hours: first comm sent.
6. Daily through Day +14, then weekly: recovery updates.
7. Within 30 days of resolution: post-mortem.
