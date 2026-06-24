# Launch Checklist

Hour-by-hour playbook for the 30 days before launch and the first week after.

Owners: P = Phamy (campaign), C = Craig (hardware), B = Both.

## T-30 days

| Status | Task | Owner |
|---|---|---|
| [ ] | Pre-launch page is live on Kickstarter (Phase 7 of SETUP_GUIDE) | P |
| [ ] | thox.ai homepage banner links to the pre-launch page | P |
| [ ] | ttracx/thoxymicro-install README footer carries the pre-launch link | P |
| [ ] | All five social bios updated with the pre-launch link | P |
| [ ] | Mailerlite (or chosen ESP) configured with double opt-in | P |
| [ ] | Press list: 12 reporters pre-briefed and on the embargo list | P |
| [ ] | Hero video master locked picture, locked audio | B |
| [ ] | EVT photo shoot of all four devices on a clean shelf | C |
| [ ] | Family Bundle group shot exported at 1024x576 and 2400x1350 | C |
| [ ] | Per-device hero shots exported (one per device) | C |
| [ ] | Color reference card matched to THOX brand tokens | C |

## T-21 days

| Status | Task | Owner |
|---|---|---|
| [ ] | Embargoed press kit sent to the 12 reporters | P |
| [ ] | Press kit hosted at thox.ai/press (gated by token until launch) | P |
| [ ] | Pre-launch notify list at 500+ followers | P |
| [ ] | Stripe Connect identity verification is in Verified state | P |
| [ ] | Bank account linked to Stripe; first $1 test payout cleared | P |
| [ ] | Cluster Pack mechanical fit verified (4 ThoxAir + base + hub) | C |
| [ ] | ThoxClip 12-hour battery test passes on three units | C |

## T-14 days

| Status | Task | Owner |
|---|---|---|
| [ ] | Story page final copy pasted into Kickstarter draft (Phase 3) | P |
| [ ] | All 10 reward tiers configured (Phase 4) | P |
| [ ] | All 5 add-ons configured (Phase 4) | P |
| [ ] | Shipping zones configured for all 7 regions | P |
| [ ] | Risks and challenges section pasted (Phase 5) | P |
| [ ] | Bio section live | P |
| [ ] | Kickstarter project FAQ pasted (Phase 6) | P |
| [ ] | Hero video uploaded; encoding confirmed; preview on desktop + mobile | P |
| [ ] | All 4 GIFs uploaded to the Story page | P |
| [ ] | Internal preview link sent to advisors for one-final-pass review | B |

## T-7 days

| Status | Task | Owner |
|---|---|---|
| [ ] | Pre-launch notify list at 1,500+ | P |
| [ ] | Final EVT photo pass on all four devices | C |
| [ ] | Founders Pack mockup with engraved serial visible in promo shots | C |
| [ ] | BackerKit account configured and connected to Kickstarter (do not enable backer surveys until T+25) | P |
| [ ] | Discord / Matrix community for backers stood up; URLs in the Kickstarter Updates section ready to go | P |
| [ ] | Launch-day social copy locked in templates/launch-day-social.md | P |
| [ ] | Launch-day email template tested with a 10-person test list | P |
| [ ] | "We are live" Update drafted in Kickstarter Updates (scheduled, not yet published) | P |

## T-3 days

| Status | Task | Owner |
|---|---|---|
| [ ] | Stripe Connect verified: payouts enabled, daily payout cadence | P |
| [ ] | Final preview on desktop, iPad, iPhone, Android | B |
| [ ] | Mobile-first test: tap every reward tier on iOS Safari | P |
| [ ] | All 8 FAQ entries spot-checked for outdated dates or prices | P |
| [ ] | Notify Kickstarter Account Manager (if assigned) of the launch time | P |
| [ ] | Backup laptop with power adapter staged at the launch desk | B |

## Ops integration gates (T-3 to T-0)

These six gates are owned by Tommy and gate the click-launch moment.
Source of truth: `docs/KS_OPS_INTEGRATION.md`. Repo: `ttracx/thox-kickstarter-integration`.

| Status | Task | Owner |
|---|---|---|
| [ ] | Integration deployed on the ops VPS; Tailscale-only reachable; FastAPI healthcheck passes | T |
| [ ] | dev@thox.ai added as Kickstarter collaborator (Analytics + Coordinate fulfillment + Manage community) | T |
| [ ] | First backer-report import smoke-tested; row counts match the Kickstarter dashboard totals | T |
| [ ] | Fulfillment-risk endpoint returns valid output on a test campaign profile | T |
| [ ] | PII masking verified on at least one backer-list endpoint (default-mask + X-Operator-Token reveal both confirmed) | T |
| [ ] | Update-drafter produces sane markdown for a synthetic risk profile (no hallucinated names, no leaked emails) | T |

If any gate fails at T-1, the integration is held back and ops runs
manually for the first 48 hours. Launch is NOT blocked by this lane.

## T-1 day

| Status | Task | Owner |
|---|---|---|
| [ ] | Lock all copy. No more edits. | B |
| [ ] | Drop final pre-launch reminder to notify list (Mailerlite scheduled for T-1 at 17:00 PT) | P |
| [ ] | Post launch-eve teaser on socials | P |
| [ ] | Order delivery for launch-day food (you will not have time to leave the desk) | B |
| [ ] | Sleep | B |

## T-0 (launch day)

| Hour PT | Task | Owner |
|---|---|---|
| 08:00 | Final smoke check: preview page, click Edit, log out, log in again | P |
| 08:30 | Coffee, status meeting with team | B |
| 08:55 | Final-final reload of the Edit page; verify nothing has reverted | P |
| 09:00 | Click Launch | P |
| 09:01 | Verify the public URL renders correctly in an incognito window | P |
| 09:05 | Send launch-day email to the notify list via Mailerlite | P |
| 09:10 | Post launch-day social content to LinkedIn, Twitter, Bluesky, Mastodon | P |
| 09:15 | Reply to the first 10 comments personally | B |
| 09:30 | Press embargo lifts; reply to reporter Q&A | P |
| 10:00 | Sanity-check pledge rate (should be 1+ per minute in the first hour) | P |
| 11:00 | First milestone: announce on socials when 25% funded | P |
| 12:00 | First Update to backers: "We are live" | P |
| 14:00 | Reply to backers from morning batch (target < 4 hours) | B |
| 17:00 | Day-1 metrics review with team | B |
| 19:00 | Engineering posts a behind-the-scenes update on the Discord/Matrix | C |
| 21:00 | Day-1 close: post the funded-percentage screenshot to socials | P |
| 22:00 | Sleep, set alarm for 06:00 to handle EU morning |  |

## T+1 to T+7

| Day | Task |
|---|---|
| T+1 | Reply to every backer comment from T+0 within 18 hours |
| T+2 | First "what's behind the build" Update (focus on ThoxClip mechanical) |
| T+3 | First press follow-up: how is the campaign performing, response from reporters who skipped the embargo |
| T+4 | First Stripe payout confirmation (Stripe pays out daily after Verified) |
| T+5 | Stretch Goal 1 ($500K) thermometer: if you are tracking ahead, tease the unlock today |
| T+6 | Second Update: focus on ThoxMini RISC-V boot demo |
| T+7 | First weekly Update on schedule (Friday 10:00 PT, every Friday thereafter) |

## Red-flag conditions (escalate immediately)

| Signal | Threshold | Action |
|---|---|---|
| Pledge rate drops below 1 per 5 minutes | After hour 4 of launch day | Diagnose funnel: is the page rendering? Are payment errors spiking? Has a major outlet pushed embargo? |
| Stripe payout fails | Any time | Stripe support, do not panic-email backers |
| A reward tier has a typo or wrong date | Anytime | Hot-fix in Edit Mode; post an Update apologizing for the change |
| A backer reports a payment double-charge | Anytime | Reply within 1 hour with Stripe trace ID; refund the second charge same day |
| Major news outlet posts a negative review | Anytime | 1-hour response window, reply on the post, link to FAQ, do not engage trolls |
| Two-factor recovery codes lost | Anytime | Use Kickstarter SOS recovery flow; have founder ID ready |

## Post-funding (T+30 close)

| T+ | Task |
|---|---|
| T+30 (close, 22:00 PT) | Post the "we made it" celebratory Update within 60 minutes |
| T+31 | Send launch-success email to the entire backer list, recap the journey |
| T+32 | Start BackerKit setup: import backer list, configure surveys |
| T+45 | Send BackerKit address-collection survey |
| T+60 | Open BackerKit add-on store |
| T+90 | DVT freeze (per TIMELINE.md), share photos with backers |
| T+120 | PVT 200u run, send to closed-beta backers |
| T+180 | First production run begins |
| T+210 | First reward (ThoxClip) ships to all backers |

This checklist lives in this repo. If a step changes, update it here first.
