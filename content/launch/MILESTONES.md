# MILESTONES.md

T-minus countdown calendar for the August 12, 2026 Kickstarter launch.

Today is 2026-06-25. Launch day is T-0 (2026-08-12). The campaign window runs T+0 to T+30 (closes 2026-09-11 at 9:00 AM PT).

Owners:
- **T** = Tommy Xaypanya (software, runtime, campaign ops)
- **C** = Craig Ross (hardware, mechanical, supply)
- **ops** = autonomous-admin agent fleet (THOX agents A8 through A14) acting on behalf of T or C

Blocker risk legend:
- low = controllable in-house
- med = depends on external vendor or partner with known relationship
- high = depends on something outside our control (Kickstarter platform, shipping carrier, certification lab)

---

## Phase 1: Content pack lock (T-48 to T-30, 2026-06-25 to 2026-07-13)

| Date window | Deliverable | Owner | Dependency | Blocker risk |
|---|---|---|---|---|
| T-48 (2026-06-25) | This file plus VIDEO_SCRIPT, STORYBOARD, REWARDS_FAQ, STRETCH_GOALS, PRESS_KIT shipped to `content/launch/` | ops | none | low |
| T-47 to T-44 | Founders review all content/launch/* files; revise founder bios, quotable lines, on-camera bite | T + C | content pack delivered | low |
| T-44 to T-40 | Hero asset renders: ThoxClip turntable, ThoxMini desk, ThoxAir stack, ThoxNova hero | ops | founder review locked | med (render time + iteration) |
| T-44 to T-40 | MagStack Cluster Dock printed and photographed; v4 ThoxMini Air printed and photographed | C | print kit shipped (already done), filament on hand | med (print fail rate) |
| T-40 to T-35 | Alpha demo recording: real device boot + first-token capture on ThoxMini and ThoxNova | T | both devices provisioned | med (device readiness) |
| T-38 to T-32 | Founder portrait shoot; founders + photographer + 2-hour session in Reno | T + C | wardrobe + location locked | low |
| T-35 to T-30 | Video pre-production lockdown: script + storyboard + prop list + crew booked | ops + T | hero renders + portraits done | low |

Phase 1 exit criteria: every file in `content/launch/` is reviewed and signed off by both founders. Hero renders exist. MagStack dock is printed and on camera-ready desk. Crew booked.

---

## Phase 2: Friends + family preview (T-30 to T-21, 2026-07-13 to 2026-07-22)

| Date window | Deliverable | Owner | Dependency | Blocker risk |
|---|---|---|---|---|
| T-30 to T-28 | Practical shoot: 3-day shoot in Reno, all Beat-1, Beat-3, Beat-5 practical frames | ops + DP | crew booked, devices on hand | med (weather, talent availability) |
| T-28 to T-24 | AI generation pass for Beat-2 server room + any compositing | ops | shoot wrapped | low |
| T-26 to T-23 | Friends + family preview email goes out to ~75 contacts; free unit pledge offered to closest 25 | T | content pack signed off | low |
| T-26 to T-21 | Edit pass 1: rough cut of 90-second and 2:30 versions | ops + editor | shoot footage + AI gen ready | med (editor schedule) |
| T-25 to T-21 | Founder-list email blast staged in BackerKit; copy frozen | ops + T | content pack reviewed | low |
| T-22 to T-21 | First soft community drops: post in three private builder/maker channels (no public Kickstarter URL yet) | T | preview email out | low |

Phase 2 exit criteria: 25+ founder-list responders confirming launch-day pledge intent. Rough cut watchable. Email blast queued.

---

## Phase 3: PR push and embargoed previews (T-21 to T-14, 2026-07-22 to 2026-07-29)

| Date window | Deliverable | Owner | Dependency | Blocker risk |
|---|---|---|---|---|
| T-21 (2026-07-22) | Press kit goes out under T-21 embargo (lifts launch day 10:00 AM PT) | T | press kit assets ready | low |
| T-21 to T-18 | Media kit hosted at thox.ai/press; password-protected for journalists | T + ops | website team ready (NOT merged via this repo; PR-only on Thox.ai) | med (Thox.ai PR review window) |
| T-21 to T-14 | Outreach to 30+ tier-1 outlets and 60+ tier-2 newsletters and podcasts | T | embargoed kit delivered | high (response rate is external) |
| T-19 to T-15 | Color + sound on the 90-second cut; first locked version delivered | ops + editor | edit pass 1 done | med (editor schedule) |
| T-17 to T-14 | Embargoed loaner units to 5 vetted reviewers if EVT photo pass clears (otherwise skip) | C + T | EVT units ready | high |
| T-15 to T-14 | Kickstarter project page populated in draft: rewards, story, FAQ, video upload, stretch goals | T + ops | locked 90-sec cut ready | low |

Phase 3 exit criteria: Kickstarter draft page reviewed and ready to submit. Press kit confirmed received by 20+ outlets. At least 3 outlets confirm intent to cover.

---

## Phase 4: Final polish (T-14 to T-7, 2026-07-29 to 2026-08-05)

| Date window | Deliverable | Owner | Dependency | Blocker risk |
|---|---|---|---|---|
| T-14 (2026-07-29) | Submit Kickstarter project for review (Kickstarter takes up to 7 business days) | T | draft page ready | high (Kickstarter review SLA) |
| T-14 to T-12 | Final master video render: 2:30 master, 90-sec cut, 30-sec teaser | ops + editor | locked cut done | low |
| T-12 to T-9 | Kickstarter page polish: copy review, asset positioning, mobile pass | T | video uploaded | low |
| T-12 to T-8 | Payment integration smoke test: Stripe + BackerKit + Kickstarter flow | ops + T | Stripe products renamed (per `docs/PULL_FORWARD_TRACKER.md`) | med |
| T-11 to T-8 | Ops VPS deploy of Kickstarter integration (FastAPI ingestion + fulfillment risk detector) | ops | Stripe ready | low |
| T-10 to T-7 | Backer-comms templates loaded into mail tool; first-update through update-5 drafted | ops + T | rewards matrix locked | low |
| T-8 to T-7 | Founder-list email warm-up: send the "we are 7 days out" preview email | T | template ready | low |

Phase 4 exit criteria: Kickstarter review passed. Video and page approved. Payment flow tested with a real $1 pledge by both founders. Backer-comms queue staged.

---

## Phase 5: Pre-launch burst (T-7 to T-1, 2026-08-05 to 2026-08-11)

| Date window | Deliverable | Owner | Dependency | Blocker risk |
|---|---|---|---|---|
| T-7 (2026-08-05) | Pre-launch email burst day 1: 5 emails staggered over 6 days to the founder list | T | warm-up email sent | low |
| T-7 to T-5 | Social media prep: 30 posts queued across X, IG, TikTok, LinkedIn, YouTube, Reddit, Threads per `social/CALENDAR.md` | ops | content pack final, embargo holds | low |
| T-7 to T-3 | Soft launch in select communities: 10 invite-only previews in maker, RISC-V, and on-device-AI Discord and Slack channels | T | community contacts confirmed | low |
| T-5 to T-2 | Daily founder-list email cadence; press follow-ups; podcast pre-records | T | embargo holds | med |
| T-3 to T-1 | Final ops VPS check: Kickstarter integration receiving test payloads; Stripe webhooks healthy | ops | deploy done | low |
| T-3 to T-1 | War-room comms set up: dedicated Slack channel + on-call rotation for launch day | T + C + ops | none | low |
| T-1 (2026-08-11 evening) | All systems green check; founders sign off on launch | T + C | everything above | low |

Phase 5 exit criteria: 5,000+ on the launch-day mailing list. Press embargo holding. 5+ podcast pre-records in the can. Ops VPS green.

---

## Phase 6: Launch day (T-0, 2026-08-12)

Times in Pacific (campaign timezone).

| Time | Deliverable | Owner | Notes |
|---|---|---|---|
| 06:00 PT | Final ops health check; war-room online | ops + T + C | |
| 07:00 PT | Founder breakfast; final video sanity check | T + C | |
| 08:30 PT | Founder-list final email: "live in 30 minutes" | T | |
| 09:00 PT | LAUNCH | T | hit publish on Kickstarter |
| 09:01 PT | First social post burst across all 7 platforms | ops | |
| 09:05 PT | Press embargo updates: confirm-of-launch to top 10 outlets | T | |
| 10:00 PT | Press embargo officially lifts; press coverage goes live | n/a | external |
| 10:30 PT | Founders post a 60-second video to social: "we did it, here's why it matters" | T + C | shot live the night before |
| Hourly | Backer count + pledge total snapshot to war-room | ops | automated |
| Every 4 hours | Public update on Kickstarter project page: thank-yous, current count, what's coming | T or C | rotate |
| 20:00 PT | Day-1 retro: did we hit $50K? What media landed? What broke? | T + C + ops | |

Launch day exit criteria: campaign is live, no platform errors, day-1 pledge total exceeds $50K (20% of baseline goal as a healthy first-day signal).

---

## Phase 7: Campaign window (T+0 to T+30, 2026-08-12 to 2026-09-11)

### Update cadence

| Cadence | Update type | Owner |
|---|---|---|
| Daily, first 3 days | Pledge count + named milestones | T |
| Every 2 days, days 4-14 | Mix of pledge update + behind-the-scenes content | ops |
| Twice weekly, days 15-25 | Stretch goal announcements as they unlock | T + C |
| Daily, last 5 days | Urgency push, final ship-windows, last-call pricing | T |

### Stretch goal trigger plan

Stretch unlocks per `content/launch/STRETCH_GOALS.md`:

| Unlock | Trigger amount | Announcement plan |
|---|---|---|
| Baseline | $250K | Same-day announcement: "we made it. Here is what we are building." |
| $500K | $500K | Announcement: THOXKey EDU bulk pricing tiers + university partnerships kit |
| $1M | $1M | Announcement: MagStack Cluster Dock add-on at-cost for backers + 4-node demo video series |
| $1.5M | $1.5M | Announcement: ThoxArm concept-art unveil (deferred shipping; concept only) |
| $2M | $2M | Announcement: ThoxNova xcframework + iOS feature parity |
| $2.5M | $2.5M | Announcement: ThoxVault concept-art unveil (deferred) |
| $3M | $3M | Announcement: ThoxCargo concept + full device family unveiled |

Each announcement: blog post on thox.ai (PR-only on the Thox.ai repo), Kickstarter project update, founder-list email, social burst, two-paragraph press follow-up.

### Fulfillment communication plan

| Window | Communication |
|---|---|
| T+30 (campaign close) | Thank-you update; what happens next; BackerKit invitation timeline |
| T+45 | BackerKit invitations go out; pledge confirmations begin |
| T+60 | Surveys close; production planning posted |
| T+75 to T+150 | Bi-weekly updates: BOM, certification, manufacturing partner |
| T+150 to first ship | Monthly updates plus per-tier countdown emails |

---

## Phase 8: After launch (T+30 onward)

Falls into the long fulfillment arc covered in `docs/TIMELINE.md` and `docs/BACKER_COMMS.md`. This file's responsibility ends at T+30.

---

## Risk register tied to this calendar

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MagStack Cluster Dock fails fit test after print | med | high (Beat-3 shots) | Print 3 copies; iterate before T-44 |
| Kickstarter review takes the full 7 days | high | low (we have buffer) | Submit at T-14 to absorb |
| Press embargo breaks early | low | med (loses surprise) | Embargo terms in writing; we will remember in private (per existing PRESS_KIT) |
| Day-1 pledge below $50K | med | med | Founder-list size is the leading indicator; over-invest in pre-launch list |
| ThoxNova EVT not photo-ready by T-44 | med | med | Substitute Beat-3d with a renders-only cut |
| Founder-list email blast goes to spam | med | high (60% of day-1 traffic) | Warm IP, SPF/DKIM/DMARC checked at T-21 |
| Kickstarter changes pricing tier rules at the wrong moment | low | high | Read changelog weekly; nothing to do but adjust |

---

## Where this lives

- Long-form launch checklist with day-of details: `docs/LAUNCH_CHECKLIST.md`
- Campaign timeline through fulfillment: `docs/TIMELINE.md`
- Risk register: `docs/RISKS.md`
- Daily action playbook: `docs/TOMMY_ACTION_PLAYBOOK.md`
- Pull-forward tracker: `docs/PULL_FORWARD_TRACKER.md`

Owner: Tommy. Updated weekly during the campaign sprint; daily during launch week.
