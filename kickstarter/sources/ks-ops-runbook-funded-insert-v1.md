# Runbook Insert v1: Funded Milestone

Doc: ks-ops-runbook-funded-insert-v1 | 2026-07-03
Merge target: launch-day choreography, insert immediately after the T+0 launch block.
Trigger: pledge total crosses $10,000. Poll the Kickstarter dashboard every 5 minutes for the first two hours after 9:00 AM PT on July 9, then every 15 minutes.

## Sequence

| Step | Owner | Window | Action | Asset |
|---|---|---|---|---|
| F1 | Tommy | At crossing | Screenshot the dashboard. Record [ELAPSED] and [BACKERS]. Log to the evidence record. | Evidence log |
| F2 | Tommy | +5 min | Fill merge fields across the funded pack. Run compliance scanner on filled copy. | ks-social-email-funded-milestone-v1 |
| F3 | Tommy | +15 min | Post X, then LinkedIn, then Instagram with the funded graphic. | Funded pack, funded graphic |
| F4 | Craig | +30 min | Optional 30-second thank-you clip to camera, phone capture is fine. Post as a reply in the X thread. No claims beyond pack copy. | Talent note |
| F5 | Tommy | +60 min | Send the funded email to the full list. | Funded pack email |
| F6 | Tommy | +60 min | Update the campaign page banner: Funded. Next unlock at $250K, Enhanced ThoxOS Mini. | Site change spec delta |
| F7 | Both | +90 min | Pin a thank-you comment on the campaign. Monitor comments for 30 minutes using reply snippets. | Reply snippets |
| F8 | Tommy | Same day | Post the community update in Discord. If the crossing lands before 12:00 PM PT, open the founder AMA with the funded thank-you. | Funded pack community post |
| F9 | Tommy | Same day | Close the loop in the evidence record: filenames, scan result, timestamps, dashboard screenshot hash. | Evidence log |

## Contingency

If the goal has not been crossed by end of Day 1: no public comment on pace, continue the standard choreography, and escalate at T+72 hours per the crisis addendum thresholds.

## Compliance notes

- Nothing posts with visible merge brackets. F2 gates F3 and F5.
- Banner and posts carry no new claims; stretch wording matches ks-page-stretch-goals-v2 exactly.
