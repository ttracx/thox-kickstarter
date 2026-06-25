# KPI_TRACKING.md

Coverage tracker template. Captures every published piece, plus the KPIs that matter for the post-campaign retrospective.

## Why a tracker

Press coverage is hard to measure precisely. Impressions are estimates. Attribution of backers to specific articles is impossible without a per-article UTM. But directionally, tracking coverage is the only way to learn which tier + angle + template combinations produced results, so the next campaign can be smarter.

## Schema

One row per published piece. Columns:

| Field | Description | Example |
|---|---|---|
| Publication | Outlet name | `The Verge` |
| Tier | 1-8 | `1` |
| URL | Direct link to the piece | `https://www.theverge.com/...` |
| Published | Date and time | `2026-08-05 09:15 ET` |
| Headline | The piece headline (verbatim) | `THOX wants to put private AI on a USB stick` |
| Reporter | Byline | `[Reporter Name]` |
| Word count | Approx body length | `850` |
| Angle covered | Which THOX angle the piece led with | `private / on-device AI` |
| Sentiment | positive / neutral / negative / mixed | `positive` |
| Backer-impact note | Anecdotal note on traffic or pledge spike around the publish moment | `KS dashboard: +47 pledges in the 4h window after publish` |
| Estimated impressions | Outlet's typical reach for this section | `~250K monthly` |
| UTM-attributed backers | If the URL had a UTM tag and Kickstarter exposes the data | `(not available)` |
| Social pickup | Did the piece get reshared on X / LinkedIn / HN / Reddit? | `HN front page 4h; 2 reposts on LinkedIn` |
| Notes | Anything worth carrying into the next campaign | `Reporter quoted Tommy directly; got the runtime architecture right.` |

## Aggregated KPIs

At T+30, compute the following from the tracker:

### Coverage volume

- Total pieces published: `N`
- Distribution by tier: `T1: n / T2: n / T3: n / ...`
- Distribution by sentiment: `positive: n / neutral: n / negative: n / mixed: n`

### Coverage quality

- Pieces that mentioned the GitHub repo: `n / N`
- Pieces that got the runtime architecture right (no factual errors on backends or licensing): `n / N`
- Pieces with founder quotes: `n / N`
- Pieces with hands-on review (demo unit used): `n / N`

### Audience reach (estimated)

- Sum of estimated impressions: `~X total`
- Top 3 pieces by estimated reach: `[list]`

### Outreach efficiency

- Cold emails sent: `total`
- Replies received: `n (n%)`
- Coverage produced: `n (n% of sends, n% of replies)`
- Demo units shipped: `n`
- Demo-to-coverage conversion: `n / n shipped (n%)`

### Per-tier conversion

| Tier | Outlets pitched | Replies | Coverage | Reply rate | Coverage rate |
|---|---:|---:|---:|---:|---:|
| 1 | 5 | n | n | n% | n% |
| 2 | 5 | n | n | n% | n% |
| 3 | 4 | n | n | n% | n% |
| 4 | 4 | n | n | n% | n% |
| 5 | 6 | n | n | n% | n% |
| 6 | 3 | n | n | n% | n% |
| 7 | 4 | n | n | n% | n% |
| 8 | 3 | n | n | n% | n% |

## What gets tracked beyond the table

- **Hacker News post performance**: front-page ranking, points, comments, time on front page. Capture the HN URL.
- **Lobsters post performance**: net upvotes, comments. Capture the Lobsters URL.
- **Social pickup of coverage**: did The Verge piece get tweeted by influential people? Did the Ars Technica piece get cross-posted to relevant subreddits? Capture the reshare URLs.
- **Inbound press from coverage**: did a Tier-3 piece bring a Tier-1 reporter to inbound? Capture as a separate note.

## Retrospective questions (post-campaign)

The retrospective uses the data above to answer:

1. **Which tier had the best coverage rate?** Lean into that tier next campaign.
2. **Which angle resonated?** If Tier 1 went private-AI but the published pieces all led with the form-factor angle, that is signal.
3. **Which template combination converted?** Initial-only? Initial + bump? Initial + embargo + demo?
4. **Which reporters are now warm contacts for the next campaign?** Carry them forward.
5. **Did the HN post drive measurable backers, or did Tier-1 press do most of the lift?**
6. **Was the press kit complete enough?** If multiple reporters asked for assets the kit did not have, fix the kit before the next campaign.
7. **Were there reporters or outlets that asked for things we could not deliver?** That is the gap list for the next campaign's prep.

## Tracker mechanics

Keep this tracker in a private spreadsheet or Notion table (do not commit reporter-identifying data to the repo). The template above is the canonical schema; mirror it exactly so the post-campaign analysis is consistent across campaigns.

Update the tracker daily during launch week. Update weekly through T+30.
