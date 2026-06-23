# Runbook 07: Crisis response

When something goes wrong publicly. Activate immediately on
detection; the cost of false-positive activation is low, the cost of
false-negative is the campaign.

## What counts as a crisis

| Severity | Examples | Response window |
|---|---|---|
| **P0 - existential** | Campaign suspended by Kickstarter; founder safety issue; IP/legal threat published | <30 min response |
| **P1 - reputational** | Negative press hit; viral negative thread; data-handling allegation; manufacturing partner exposed | <2 hours response |
| **P2 - operational** | Platform suspension (X / TikTok shadowban); BackerKit data error; stretch goal misses by >5%; influencer publicly backs out | <6 hours response |
| **P3 - localized** | Single backer complaint going public; small thread of negative replies; pricing question that needs a unified answer | <12 hours response |

## Detection

Monitor continuously during the active campaign window (T+0 to T+30):

- Slack `#ks-ops`: any operator can ping `@crisis-lead` directly
- TweetDeck columns: @mentions, brand-hashtag mentions, replies to
  the founder accounts
- IG / TikTok native notifications: enabled for the campaign owner
  account
- Kickstarter creator messages inbox: checked hourly
- BackerKit support inbox: checked hourly post-funding
- Google Alerts for "THOX.ai" "Thox.ai" "ThoxClip" "ThoxMini"
  "ThoxAir" "ThoxNova" - daily digest

## P0 response

A P0 crisis means the campaign cannot proceed without immediate
action.

1. **Pause all scheduled queues.** Buffer / TweetDeck / TikTok Studio
   / YouTube Studio: pause everything within 5 minutes.
2. **Crisis-lead takes the helm.** Single point of contact externally;
   single decision-maker internally. Everyone else routes to
   crisis-lead.
3. **Internal communication only via Slack `#ks-ops` for 1 hour.** No
   public statement until the internal team has aligned.
4. **Legal / Kickstarter contact within 15 min.** If the crisis
   involves Kickstarter policy, contact the assigned KS rep. If
   legal, contact the IP / legal counsel from
   `../docs/LEGAL.md`.
5. **Public statement within 30 min.** Single statement from a single
   account (the brand account, not the founders). Acknowledge the
   issue, state what we know, state what we're doing, state the next
   update time.
6. **Continue scheduled queue ONLY when crisis-lead authorizes.** This
   may be 4 hours, 24 hours, or "we're done with this campaign". The
   campaign owner makes the call.

### P0 statement template

```
We're aware of [the issue]. Here is what we know so far:

[2-3 factual sentences. No speculation.]

Here is what we're doing about it:

[2-3 sentences describing concrete actions, with owners and
timeframes.]

We will post our next update by [specific time, no later than +6
hours from this statement].

Thank you for your patience.

- The THOX team
```

## P1 response

A P1 crisis is reputational but not existential.

1. **Pause scheduled posts that conflict with the crisis topic.**
   E.g., if the crisis is a privacy allegation, pause the next 24 hours
   of privacy-themed posts. Other posts can continue.
2. **Crisis-lead reviews the public thread / press article within 30
   min.** Determines: is the criticism factually valid? If yes, plan to
   address. If no, plan to clarify with evidence.
3. **Single public response within 2 hours.** Reply directly to the
   criticism (in the thread / under the article) with a measured,
   factual rebuttal or acknowledgment.
4. **Internal post-mortem within 24 hours.** What was the failure?
   Was it preventable? What changes for the next 7 days of campaign
   operations?

### P1 statement template

For a public reply / quote-tweet:

```
Thanks for raising this. [Acknowledge the specific concern in 1
sentence.]

Here's the actual picture: [2-3 sentences with facts, ideally with a
link to documentation in the repo.]

If you have specific questions, my DMs are open / our support email is
hello@thox.ai. We will update the [docs/X.md or FAQ entry] today to
make this clearer.
```

## P2 response

A P2 crisis is operational - it doesn't threaten the campaign but does
need a fix.

1. **Identify the operational failure mode.** Examples below.
2. **Apply the recovery action.**
3. **Internal-only updates.** Public posts only if the failure is
   visible to backers (e.g., a stretch goal miss).

### P2 examples and recoveries

| Failure | Recovery |
|---|---|
| X impressions drop >50% overnight | Shadowban suspected. Reduce posting cadence on X for 48 hours; switch to organic-only (no links in posts for 24 hours); check X support for any policy notices. |
| TikTok video flagged | Appeal via TikTok support. Reduce posting cadence by 50% until appeal resolves. |
| BackerKit data error | Pause add-on store. Email BackerKit support. Notify affected backers via email within 6 hours. |
| Stretch goal misses by >5% | Pre-staged underperform messaging: "We are close on $1M; here's what backers can still do this week to push us over." Avoid panic; backers can tell. |
| Influencer publicly backs out | Quietly thank them for considering. Do not engage publicly. Backfill with paid placement on the same platform if budget allows. |

## P3 response

A P3 crisis is localized - usually a single backer or a small thread.
Handle in the normal reply window with extra care.

1. Reply to the original backer / thread within the SLA (15 min
   during launch week, 1 hour during mid-campaign).
2. Take it to DM if it requires personal information (refunds,
   shipping addresses).
3. If the same complaint surfaces from 3+ different backers in 24
   hours, escalate to P2.

## Post-crisis cleanup

After any P0 or P1 crisis:

- [ ] Update `../docs/RISKS.md` with the new risk + mitigation if it
      was unanticipated.
- [ ] Update `../docs/FAQ.md` with the public-facing answer if the
      crisis surfaces a question that backers ask repeatedly.
- [ ] Update the relevant runbook with the recovery procedure for
      future reference.
- [ ] Schedule an internal blameless retrospective within 7 days.
      Document the failure mode + the operational fix in the team
      Notion.

## What NOT to do during a crisis

- Do NOT delete public posts about the crisis. Deletion is permanent
  evidence; the screenshot was taken before you deleted.
- Do NOT lie or speculate publicly. Acknowledge uncertainty.
- Do NOT respond emotionally. The crisis-lead is the single voice
  during the crisis specifically because the founders shouldn't be the
  ones replying when adrenaline is high.
- Do NOT let multiple operators respond to the same thread
  unilaterally. Coordinate in `#ks-ops` first, then assign ONE
  responder.
- Do NOT promise refunds, partnerships, or contract changes publicly
  without legal review.

## Crisis-lead handoff

If the crisis-lead becomes unavailable (illness, sleep, etc.), the
backup (per [README.md](README.md) "Roles") takes over. Document the
handoff in Slack `#ks-ops`: "Crisis-lead handing off to [name].
Active situation: [summary]. Open actions: [list]."
