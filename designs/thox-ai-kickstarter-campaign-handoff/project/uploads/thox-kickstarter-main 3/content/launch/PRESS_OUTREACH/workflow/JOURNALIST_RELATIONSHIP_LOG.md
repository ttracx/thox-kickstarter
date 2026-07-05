# JOURNALIST_RELATIONSHIP_LOG.md

CRM-lite for tracking outreach. The operator fills this in by hand or via their PR tool. This template lives in the repo as the canonical schema; the live data should be kept out of the repo (use a private spreadsheet, Notion table, or the operator's CRM, with the same column shape).

## Why not in the repo

Journalist contact data is not committed to the repo. Reporters change beats and addresses; stale data in the repo would be wrong by the time anyone reads it, and committing reporter PII to a private (but recoverable) git history is a bad pattern. The repo holds the template; the live log lives where the operator keeps it.

## Schema

One row per journalist contacted. Columns:

| Field | Description | Example |
|---|---|---|
| Name | Reporter's published byline name | `Jane Doe` |
| Publication | Outlet name from media_list_master.md | `The Verge` |
| Beat | Reporter's beat in the operator's words | `Consumer AI hardware` |
| Tier | 1-8 per the tier mapping | `1` |
| First contact | Date of first email | `2026-07-15` |
| Last contact | Date of most recent send or reply | `2026-07-22` |
| Status | cold / warm / hot / published / declined / ghosted | `warm` |
| Sender | Tommy or Craig | `Tommy` |
| Templates sent | Comma-separated list | `initial_outreach, follow_up_3_day` |
| Demo unit shipped | Y / N + date | `Y 2026-07-25` |
| Demo unit returned | Y / N + date | `N` |
| Embargo agreed | Y / N + lift datetime | `Y 2026-08-05 09:00 ET` |
| Coverage URL | If published | `https://www.theverge.com/...` |
| Sentiment | positive / neutral / negative (if published) | `positive` |
| Notes | Free text; angle used, reporter preferences, anything for the next campaign | `Prefers email, no Signal. Wanted MagStack assembly video.` |

## Status definitions

- **cold**: pitched, no response yet, no bumps sent
- **warm**: responded with interest or maybe; in active conversation
- **hot**: confirmed embargo or demo shipped; coverage expected
- **published**: piece is live; capture URL in Coverage URL field
- **declined**: passed on the pitch; do not re-pitch in this campaign
- **ghosted**: no response to initial + one follow_up_3_day; do not bump further

## Example row (illustrative, not real reporter data)

```
Name: [Reporter Name]
Publication: The Verge
Beat: Consumer AI hardware
Tier: 1
First contact: 2026-07-15
Last contact: 2026-07-18
Status: warm
Sender: Tommy
Templates sent: initial_outreach
Demo unit shipped: N
Demo unit returned: N
Embargo agreed: N (in discussion)
Coverage URL: (pending)
Sentiment: (pending)
Notes: Replied within 4h asking for embargo terms. Sent embargo_offer.md on 2026-07-18; awaiting confirmation. Reporter prefers email, no Signal needed.
```

## Operating the log

1. **Add a row at first send.** Status starts at `cold`.
2. **Update Status + Last contact on every reply.** A reply from the reporter to the operator counts; the operator's outbound send counts. Track both.
3. **Move to `ghosted` only after the cadence is exhausted.** That means: initial sent, follow_up_3_day sent, 5 business days elapsed with no reply.
4. **Move to `declined` only on an explicit pass.** Do not infer a decline from silence.
5. **At T+3, archive the log.** Drop a snapshot into the operator's records (with reporter PII protected). The snapshot is the basis for the next campaign's contact list.

## What to do with the log after the campaign

The post-campaign retrospective uses this log plus `KPI_TRACKING.md` to answer:

- Which tiers converted best on the cold-pitch ratio?
- Which angles got the most pickups?
- Which reporters are now warm contacts for the next campaign?
- Which publications are cold for the next campaign and should be approached differently next time?

Carry forward the `warm` and `hot` (regardless of whether they published) into the next campaign's contact list. Mark them as `prior contact: 2026-08 launch` so the next campaign's first send acknowledges the existing relationship.
