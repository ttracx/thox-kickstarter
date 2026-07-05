# PRESS_OUTREACH

Operator-facing press outreach pack for the THOX.ai Kickstarter campaign launching August 12, 2026.

This directory is what the founders (or a contracted PR firm) work from when reaching out to journalists, editors, and tipline addresses. Nothing in this directory commits THOX.ai to any specific reporter, publication, embargo deal, or financial transaction. Every cost decision and every send happens out of band, by a human, after a human has reviewed the relevant file here.

## Files

```
content/launch/PRESS_OUTREACH/
  README.md                          this file
  media_list_master.md               consolidated index across all 8 tiers
  beat_mapping.md                    THOX angle -> outlet tier crosswalk
  pitches/
    tier_1_tech_outlets.md           prosumer + tech (The Verge, Ars, TechCrunch, Information, 9to5Mac)
    tier_2_developer_outlets.md      Hacker News post, Lobsters, dev.to, InfoQ, IEEE Spectrum
    tier_3_consumer_tech.md          Engadget, Wired, Gizmodo, The Next Web
    tier_4_hardware_specialty.md     Hackaday, Make, Tom's Hardware, AnandTech
    tier_5_ai_focused.md             Last Week in AI, Latent Space, Stratechery, Import AI, The Batch, AI Snake Oil
    tier_6_business_press.md         WSJ tech, Bloomberg tech, Forbes Under 30 / tech
    tier_7_local_tx_press.md         Austin American-Statesman, ABJ, Texas Monthly, KUT
    tier_8_education_press.md        EdSurge, Inside Higher Ed, EdTech Magazine
  pitches/templates/
    initial_outreach.md              first-touch cold email
    follow_up_3_day.md               polite 3-day bump
    embargo_offer.md                 embargoed preview offer
    interview_offer.md               founder interview offer
    demo_offer.md                    demo unit + assembly experience
  workflow/
    OUTREACH_CADENCE.md              when to send what (T-28 -> T-0)
    PR_PLAYBOOK.md                   decision tree + crisis comms
    JOURNALIST_RELATIONSHIP_LOG.md   CRM-lite tracker template
    KPI_TRACKING.md                  coverage tracker template
```

## How this pack is used

1. **Founders or PR firm read the master list first.** `media_list_master.md` is the single index. From there pick a tier and open the per-tier file for the actual pitch angle.
2. **Pick a template for the stage of the relationship.** The 5 templates at `pitches/templates/` cover the full first-touch -> demo lifecycle. Variables in `{{ double_braces }}` get filled in by the operator before send.
3. **Work the cadence.** `workflow/OUTREACH_CADENCE.md` lays out the T-28 -> T-0 schedule. Do not skip cadence steps.
4. **Log every contact.** `workflow/JOURNALIST_RELATIONSHIP_LOG.md` is the CRM-lite. Every send, every response, every no-response gets a row. This becomes the basis for the next campaign's outreach list.
5. **Track coverage as it lands.** `workflow/KPI_TRACKING.md` captures publication + URL + sentiment + impressions for the post-campaign retrospective.

## Brand voice constraints

THOX house style applies to every pitch. No em-dashes. No emojis. No marketing fluff. Plain founder voice. The pitch templates are written this way already; preserve the voice when filling in variables.

## What this pack is NOT

- It is not a list of specific journalist names and emails. THOX.ai does not maintain that list in this repo. Every address shown here is a publication-level tipline pattern (for example `tips@<publication>.com`) that the operator may use as a fallback when no specific reporter is identified through the operator's PR tooling or relationships.
- It is not pre-approval to send. The founders or the engaged PR firm decide which outlets get pitched, in which order, by whom.
- It is not a commitment to embargo terms. The embargo language in the templates is a typical 7-day offer. The actual embargo policy is whatever the founders and the reporter agree to in writing.
- It is not a budget. No paid placement, no sponsored coverage, no wire-service distribution is implied.

## Why no fabricated reporter contact data

Press contacts change quickly. Reporters move beats, change publications, and update their contact preferences. A reporter contact list that ships in this repo would be stale on day one and could embarrass THOX.ai by sending to the wrong person. The operator pairs this pack with a live contact source (the operator's PR tooling, a journalist's published contact page, the publication's tipline, or a direct introduction). Every pitch in the templates folder is voice-locked and variable-templated so it can be dropped into a PR tool with the right `{{ reporter }}` and `{{ pitch_angle }}` filled in.

## Entity statement (for legal accuracy in pitches)

THOX.ai LLC is a Nevada single-member LLC with registered agent in Reno, NV (per `docs/LEGAL.md`). The founders operate from Cedar Park, Texas (per `ttracx/thox-key` README and other repo metadata). When the pitch templates reference "Cedar Park, TX," that is the founder home base; when the press kit references entity domicile, use Nevada. Both are accurate.

## Related files

- `content/launch/PRESS_KIT.md` - press-facing one-pager (founder bios, asset locations, embargo terms, quotable lines)
- `docs/PRESS_KIT.md` - operations-facing press kit (embargo policy, asset list, internal contacts)
- `content/launch/MILESTONES.md` - T-48 -> T+30 campaign calendar
- `content/launch/EMAIL_SEQUENCE.md` - email sequence to the THOX list (distinct from press)
