# PR_PLAYBOOK.md

Decision tree for the operator after the first send. Plus crisis comms for the rare case where coverage goes sideways.

## Decision tree: what to do when a reporter responds

```
Reporter responds yes
  -> Confirm embargo terms in writing (use embargo_offer.md if not already sent)
  -> Schedule founder briefing (use interview_offer.md scheduling link)
  -> Ship demo unit (use demo_offer.md flow)
  -> Send press kit at agreed time (default: on embargo acceptance)
  -> Log status: hot
  -> Track to coverage via KPI_TRACKING.md

Reporter responds maybe / interested but not now
  -> Acknowledge in 1 line, no pressure
  -> Add to follow-up list with a new angle for next week
  -> Send one follow-up in 7 days with the new angle
  -> If still maybe, hold for post-launch; do not pile on
  -> Log status: warm

Reporter responds no
  -> Reply with thanks, no pressure
  -> Do not argue, do not re-pitch with different angle
  -> Save the contact for the next launch (12+ months out)
  -> Log status: cold (with reason: declined)

Reporter ghosts (no response within 5 business days of initial)
  -> Send one follow_up_3_day at T+3
  -> If still no response 5 business days after the bump, mark ghosted
  -> Do not bump again
  -> Save the contact for the next launch
  -> Log status: ghosted

Reporter publishes
  -> Share the coverage on THOX channels (X, LinkedIn, dev.to comment, etc.)
  -> Send thank-you note within 24 hours (brief, no follow-up ask)
  -> Archive the coverage URL in KPI_TRACKING.md
  -> Log status: published
```

## Decision tree: what to do when a publication declines

```
Publication-level decline (the tipline or editor passes)
  -> Acknowledge with thanks
  -> Mark the publication cold for this campaign
  -> Do NOT send to other reporters at the same publication in the same campaign cycle
  -> Save the publication for the next launch
```

A publication-level pass is a publication-level pass. Going around the editorial decision by pitching a different reporter at the same outlet burns the relationship.

## Decision tree: what to do when the embargo is broken

```
Pre-lift publish from a reporter who accepted the embargo
  -> Document the break (screenshot, URL, timestamp)
  -> Reply to the reporter, professionally, asking what happened
  -> Do NOT issue a public statement, do NOT contact the publication's leadership over the reporter's head
  -> If genuinely accidental, accept the apology and move on
  -> If intentional, do not offer this reporter previews in the next campaign
  -> Update internal note in JOURNALIST_RELATIONSHIP_LOG.md
  -> Continue with the remaining embargoed outlets as if nothing happened; the rest of the embargo stands
```

A broken embargo is annoying but not a crisis. Do not over-react. The cost of a public dispute with a publication is much higher than the cost of one premature article.

## Decision tree: what to do when a reporter publishes a critical piece

```
Critical coverage published
  -> Read the piece in full before reacting (do not skim the headline and react)
  -> Identify factual errors versus opinion
  -> If factual errors: reply privately to the reporter with a polite correction request, sources attached
  -> If opinion: do nothing publicly. Reporters are entitled to opinions. Acknowledge privately if appropriate
  -> Do NOT issue a rebuttal-via-press-release
  -> Do NOT mobilize backers or community to dogpile the reporter; this always backfires
  -> Do NOT tweet about it
  -> Internally: extract any valid criticism and route to the right team (product, marketing, support)
  -> Log status: published (negative); note any internal action items
```

## Crisis comms: critical coverage rules

The temptation to fight a critical piece publicly is the wrong temptation. The right response is private, professional, and short.

1. **No panic.** A bad review of a Kickstarter campaign is recoverable; a bad founder reaction to a bad review is not.
2. **No rebuttal-via-press-release.** Press releases written in response to criticism read defensive and prove the reporter's framing.
3. **No mobilization.** The THOX backer community is a community, not a brigading tool. Do not point them at a reporter.
4. **No threats.** No "we will pull our advertising" (THOX does not run ads, but the principle holds), no "we will not work with you again" (that is your private call to make, not a public threat).
5. **Yes private correction.** If the reporter got facts wrong, ask for a private correction with sources. Most reporters will correct factual errors.
6. **Yes internal action.** If the criticism is valid, route it to the team that owns the issue. Fix the underlying thing.

## Decision tree: what to do when a reporter ghosts after demo unit is shipped

```
Demo unit shipped but no coverage produced
  -> Wait 30 days from ship date
  -> Send one short check-in: "Hope the unit was useful. Let us know if you have questions. We are happy to extend the loan."
  -> If still no response, send return shipping label after 60 days
  -> If reporter wants to keep the unit and convert to purchase, offer backer pricing
  -> Log status: warm (no coverage); save for next campaign
```

## Special cases

- **A reporter wants to publish before the embargo lift in exchange for an exclusive.** Decline. Exclusives carry obligations the THOX team is not staffed to manage; a broken embargo by request is still a broken embargo from the perspective of other outlets.
- **A reporter wants paid placement / sponsored coverage.** Decline. THOX does not pay for editorial coverage. If the publication has a sponsored-content tier and the operator wants to budget for it, that is a separate marketing decision and goes through `content/launch/SOCIAL_KIT.md` distribution review, not through press outreach.
- **A reporter wants exclusive access to founder for the duration of the campaign.** Decline. The founders are available to the press as a class, not to one reporter.
- **A Forbes contributor asks for a fee to write a piece.** Decline. This is a known abuse pattern; do not engage.

## Escalation

If the operator hits a situation not covered above, escalate to the founders (Tommy + Craig) before responding. The 24 hours of silence while the founders weigh in is much cheaper than a wrong reply sent in a hurry.
