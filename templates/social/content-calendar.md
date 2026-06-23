# Social Content Calendar

The dated post plan for the THOX.ai campaign. Each row is a brief you can hand straight to the
[AI content pipeline](../../docs/AI_CONTENT_PIPELINE.md): pillar + surface + subject + the one
claim. Copy comes from [post-copy-library.md](post-copy-library.md); assets from the
[OpenAI](openai-image-prompts.md) and [Grok](grok-video-prompts.md) prompt libraries.

Anchors (from CAMPAIGN_INFO.md): **Launch Aug 12, 2026 (T-0)** · **Close Sep 11, 2026 (T+30)**.
`P` = Phamy, `C` = Craig, `B` = both. Channels: LI = LinkedIn, X = X/Bluesky/Mastodon (write
once, fan out), IG = Instagram, TT = TikTok, YT = YouTube.

---

## Phase 1 — Pre-launch awareness (T-60 → T-15 · Jun 13 → Jul 28)

3 posts/week. Objective: grow the Notify list. CTA = **Notify me** (`{prelaunch_url}`).

| Wk | Day | Pillar | Subject | Surface | Channels | Asset (OpenAI→Grok) | Owner |
|---|---|---|---|---|---|---|---|
| 1 | Mon | Thesis | "Personal AI on silicon you own" launch teaser | 1:1 + 16:9 vid | LI, X, IG | img §5 → vid §6 | P |
| 1 | Wed | Product | ThoxClip reveal | 4:5 + 9:16 vid | IG, TT, X | img §1 → vid §1 | P |
| 1 | Fri | People | Who is building THOX (Craig + Phamy) | 4:5 | LI, IG | img §6 | B |
| 2 | Mon | Product | ThoxMini reveal | 4:5 + 9:16 vid | X, IG, TT | img §1 → vid §1 | P |
| 2 | Wed | Proof | ThoxMini 3-second boot | 9:16 vid | TT, IG, X | img §3 → vid §3 | P |
| 2 | Fri | Thesis | Founder POV: rented vs. owned AI | text + 1:1 | LI, X | img §5 | P |
| 3 | Mon | Product | ThoxAir reveal + cluster concept | 4:5 + 9:16 vid | X, IG | img §1/§4 → vid §4 | P |
| 3 | Wed | Proof | Cluster cascade (4 nodes = 1 endpoint) | 9:16 vid | X, TT | img §4 → vid §4 | P |
| 3 | Fri | People | Workbench / EVT behind-the-scenes | 4:5 | IG, LI | img §6 | C |
| 4 | Mon | Product | ThoxNova reveal (the LLM host) | 16:9 + vid | LI, X, YT | img §1 → vid §1 | P |
| 4 | Wed | Proof | Local LLM, no cloud, passive cooling | 9:16 vid | TT, IG, X | img §1 → vid §1 | P |
| 4 | Fri | Thesis | "Your AI. Your Data. Your Rules." brand film | 16:9 vid | all | family §2 → vid §5 | B |
| 5 | Mon | Product | The family on the shelf (all four) | 16:9 | all | img §2 → vid §5 | P |
| 5 | Wed | People | Why we won't overclaim (Craig's rule) | 1:1 | LI, X | img §6 | C |
| 5 | Fri | Campaign | "Aug 12. Mark it." + Notify CTA | 1:1 + 9:16 | all | img §7 → vid §7 | P |

Weeks 6–7 (T-30 → T-15): repeat the strongest performers, intensify the **Notify me** CTA,
publish the hero video teaser on YT. Hit the LAUNCH_CHECKLIST T-30 social-bio update.

---

## Phase 2 — Ramp + countdown (T-14 → T-1 · Jul 29 → Aug 11)

5 posts/week, then daily countdown from T-7. Objective: peak the Notify list (1,500+).

| Day | Pillar | Subject | Surface | Channels |
|---|---|---|---|---|
| T-14 | Campaign | "Two weeks out" + tier preview teaser | 1:1 | all |
| T-12 | Proof | Best proof clip re-cut for ramp | 9:16 | TT, IG, X |
| T-10 | Thesis | Long-form thesis post / hero video drop | 16:9 | LI, YT, X |
| T-8 | People | "Meet the founders" before launch | 4:5 | LI, IG |
| **T-7** | Campaign | Countdown: ThoxClip — "7 days" | 9:16 vid | all |
| **T-6** | Campaign | Countdown: ThoxMini — "6 days" | 9:16 vid | all |
| **T-5** | Campaign | Countdown: ThoxAir — "5 days" | 9:16 vid | all |
| **T-4** | Campaign | Countdown: ThoxNova — "4 days" | 9:16 vid | all |
| **T-3** | Campaign | Countdown: the family — "3 days" | 9:16 vid | all |
| **T-2** | Campaign | Countdown: "$39 early-bird, only 500" — "2 days" | 9:16 vid | all |
| **T-1** | Campaign | Launch-eve teaser (per LAUNCH_CHECKLIST T-1) | 9:16 vid | all |

> Generate the eight countdown tiles (T-7→T-0) as **one batch** from the same template
> (openai §8 → grok §7); only the device and number change. See AI_CONTENT_PIPELINE §8.

---

## Phase 3 — Launch day (T-0 · Aug 12)

Posted **live**, not scheduled (copy reacts to real numbers). Full hour-by-hour in
[templates/launch-day-social.md](../launch-day-social.md) and LAUNCH_CHECKLIST T-0. Minimum beats:

| PT | Pillar | Post |
|---|---|---|
| 09:00 | Campaign | "We're LIVE" hero post — all channels |
| 09:10 | Campaign | Early-bird urgency: "$39, only 500" |
| 11:00 | Campaign | "25% funded" milestone (if hit) |
| 14:00 | Proof | A proof clip to convert the midday scrollers |
| 17:00 | People | Founder thank-you to first backers |
| 21:00 | Campaign | Day-1 funded-% screenshot |

---

## Phase 4 — Sustain (T+1 → T+27 · Aug 13 → Sep 8)

5 posts/week. Objective: hold pledge velocity, unlock stretch goals. CTA = **Back us**.

| Recurring beat | When | Pillar | Asset |
|---|---|---|---|
| Weekly Update echo | Every Fri (mirrors weekly-update.md) | Campaign | thermometer img §9 → vid §8 |
| Stretch-goal progress | 2×/wk while a stretch is in reach | Campaign | img §9 → vid §8 |
| Backer / community spotlight | 1×/wk | People | img §6 |
| Proof / demo re-cut | 1×/wk | Proof | reuse best clips |
| Reddit AMA | T+1 (r/LocalLLaMA, r/selfhosted) | Proof/Thesis | text |
| Stretch-unlock celebration | On each unlock (mirrors stretch-unlock-update.md) | Campaign | img §9 → vid §8 |

Mid-campaign lull (≈ T+10 → T+18) is normal — lean on Proof and People to keep the feed alive
without burning urgency you'll need for the close.

---

## Phase 5 — Close (T+28 → T+30 · Sep 9 → Sep 11)

7+ posts. Objective: final-48 surge. CTA = **Back us before it closes**.

| When | Post |
|---|---|
| T+28 (48h) | "Final 48 hours" — family hero, urgency cut (grok §9) |
| T+29 (24h) | "24 hours. Early-bird + Founders Pack disappear at close." |
| T+30 −12h | "12 hours left" |
| T+30 −6h | "6 hours" |
| T+30 −1h | "Last call" |
| T+30 close | "WE MADE IT" celebratory post within 60 min of close |

---

## Phase 6 — Fulfillment (T+31 → May 2027)

Cadence drops to 2/week. Objective: keep backers warm, drive BackerKit add-ons. Beats follow
TIMELINE.md milestones: BackerKit survey, DVT freeze photos, PVT run, and each
**ship** date (ThoxClip Jan, Mini+Air Feb, Cluster Mar, Nova Apr, bundles May 2027). Each ship
milestone = one Proof post (real unit, real packaging) + one People post (the line running).

---

## Production lead time

Produce assets **one phase ahead**. Pre-launch assets done by T-45; ramp/countdown batch done
by T-14; launch-day live posts pre-drafted (copy locked T-1, per LAUNCH_CHECKLIST). Sustain and
close assets batched by T-0 so launch week is pure execution, not production.

This calendar lives in this repo. Shift a date here first, then reschedule downstream.
