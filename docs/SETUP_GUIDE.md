# Kickstarter Setup Guide

Step-by-step playbook for taking the THOX.ai unified campaign from "no Kickstarter account" to "Live and accepting pledges." Every step lists the source-of-truth doc in this repo to copy from.

Total elapsed time if you do this in one focused day: about 6 hours active work, plus 24-72 hours of Kickstarter and Stripe Connect verification waits.

---

## Phase 0. Prep (do these before touching kickstarter.com)

| Step | What | Source in this repo |
|---|---|---|
| 0.1 | Confirm hero video is locked picture and locked audio | [deliverables/THOX_Video_Script.docx](../deliverables/THOX_Video_Script.docx) + [docs/VIDEO_PRODUCTION.md](VIDEO_PRODUCTION.md) |
| 0.2 | Confirm hero image (1024 × 576 minimum, .jpg, < 50 MB) is exported | [assets/README.md](../assets/README.md) |
| 0.3 | Confirm campaign blurb (1 sentence, max 135 chars) is locked | [docs/CAMPAIGN_INFO.md](CAMPAIGN_INFO.md) |
| 0.4 | Confirm long-form Story text is final | [deliverables/THOX_Kickstarter_Campaign.md](../deliverables/THOX_Kickstarter_Campaign.md) |
| 0.5 | Confirm all 10 reward tier blurbs are final | [docs/REWARDS_MATRIX.md](REWARDS_MATRIX.md) |
| 0.6 | Confirm 6 stretch goal blurbs are final | [docs/STRETCH_GOALS.md](STRETCH_GOALS.md) |
| 0.7 | Confirm Risks section text is final | [docs/RISKS.md](RISKS.md) |
| 0.8 | Confirm the eight FAQ entries are final | [docs/FAQ.md](FAQ.md) |
| 0.9 | Have ready: founder photo, bio (200 words), Stripe Connect docs (ID + business EIN) | n/a |
| 0.10 | Have ready: bank account in the project country (US dollar bank for thox.ai LLC) | n/a |

Do not start Phase 1 until every row in Phase 0 is checked.

---

## Phase 1. Account + identity verification (Day 1)

1. Sign up at kickstarter.com using `ops@thox.ai`. Use a password manager.
2. Settings → Account → enable two-factor with an authenticator app. Save recovery codes to 1Password.
3. Settings → Privacy → set newsletters to OFF until launch (you do not want Kickstarter's promotional emails arriving while you are mid-setup).
4. Create the project: top-right menu → Start a project → answer the eligibility quiz (the THOX product family qualifies under Design + Tech > Hardware).
5. Pick category: **Technology > Hardware**.
6. Pick subcategory: **Gadgets**.
7. Project location: **United States**. Project country: **United States**.

When Kickstarter asks for identity verification, you will be handed off to Stripe Connect. This is the longest wait in the whole setup.

### Stripe Connect identity verification

8. Use the THOX.ai LLC business entity, not a personal account. Required documents:
   - EIN letter (or a 147c letter from the IRS if EIN letter is lost)
   - Articles of organization
   - Recent utility bill or lease for the business address
   - Founder driver license or passport
   - Bank routing + account number for payouts
9. Submit. Stripe typically replies within 24-48 hours. Plan around that wait.
10. If Stripe asks for additional documents, respond same day. The campaign cannot accept pledges without verified Stripe Connect.

---

## Phase 2. Project basics (Day 2-3 while Stripe verifies)

1. **Project name**: `THOX.ai - Your AI, on silicon you own.`
2. **Project blurb (135 chars max)**: paste from [CAMPAIGN_INFO.md](CAMPAIGN_INFO.md) → "blurb_135" section.
3. **Project image**: upload the hero shot from `assets/hero/thox-family-on-shelf-1024x576.jpg`. Do not let Kickstarter auto-crop; preview on desktop and mobile.
4. **Project video**: upload the final 2:30 master MP4. H.264, 1080p, 24 fps, AAC audio. Upload over wired Ethernet. Wait until the platform shows "Encoding complete" before moving on.
5. **Funding goal**: `$250,000`.
6. **Duration**: 30 days. Do not pick 45 or 60. Backer urgency drops sharply after day 30.
7. **Funding model**: All-or-Nothing (Kickstarter's only option, just confirming).

---

## Phase 3. The Story page (Day 3-4)

Open `deliverables/THOX_Kickstarter_Campaign.md` and paste section by section. Kickstarter's editor accepts markdown via the "Source" view; the rich-text editor will eat your headings.

Suggested in-page ordering (matches the Campaign doc):

1. Hero block: tagline + one-paragraph pitch
2. The four devices (table)
3. Per-device deep dives (ThoxClip, ThoxMini, ThoxAir, ThoxNova) - drop the per-device emerald-accented header image above each section
4. How they work together (the ASCII topology becomes a 1200 × 600 .png; see `assets/README.md` for the export from the pitch deck)
5. Why now
6. Where the money goes (chart - export from `deliverables/THOX_Kickstarter_Deck.pptx` slide 14 if needed)
7. Risks (Kickstarter has a dedicated Risks section in Phase 5; the Story page only needs a 2-paragraph teaser pointing readers there)
8. Backer commitments
9. Brand and design
10. Team bios
11. Closing CTA: "Back the campaign"

Add at least four animated GIFs in the Story page (Kickstarter analytics show GIF-rich pages have 30%+ higher pledge conversion). Pre-export from your B-roll:
- ThoxClip tap + LED pulse
- ThoxAir cluster cascade
- ThoxNova dashboard live update
- Family-on-shelf wide

---

## Phase 4. Rewards (Day 4)

Use the table in [REWARDS_MATRIX.md](REWARDS_MATRIX.md) verbatim. Click "Add a reward" for each row.

For every reward:

1. **Title**: paste from the matrix
2. **Pledge amount (USD)**: paste from the matrix
3. **Description**: paste the description column; do not freelance
4. **Estimated delivery**: paste the date column; match [TIMELINE.md](TIMELINE.md) exactly
5. **Ships to**: Anywhere in the world
6. **Items included**: list each line from the matrix as a separate item
7. **Quantity**: leave unlimited except for Founders Pack (limit 100)

### Add-ons

After the main tiers, configure these add-ons:

- ThoxClip add-on: $39 (only available if you already pledged for a Mini, Air, or Nova tier)
- Magnetic stack base: $24
- Extra USB-C 5V/4A power supply: $19
- Spare microSD pre-flashed with ThoxOS Mini: $14

---

## Phase 5. Risks and challenges

Paste from [RISKS.md](RISKS.md) the full long-form text under the heading "Story-page risks copy." Do not abbreviate. Kickstarter scores higher on campaigns that openly discuss risks.

---

## Phase 6. Bio, FAQ, and credentials

1. **Biography**: paste from `assets/bio.md`. 200 words, founder-first.
2. **Verified identity**: this comes from Stripe Connect (Phase 1).
3. **Kickstarter project FAQ**: paste each entry from [FAQ.md](FAQ.md) using the Q + A fields.

---

## Phase 7. Pre-launch page (T-30 days)

Kickstarter calls this the "coming soon" page. Turn it on as soon as Phase 4 is complete; do not wait for Phase 6.

1. Settings → Promotion → enable Pre-launch page.
2. Pre-launch hero image: 1024 × 576 reusing the main hero shot.
3. Pre-launch blurb: paste from [CAMPAIGN_INFO.md](CAMPAIGN_INFO.md) → "prelaunch_blurb_200".
4. Notify list: this is the most important number in the next 30 days. Drive at least 1,500 followers before launch.
5. Cross-link: paste the pre-launch URL into:
   - thox.ai homepage banner
   - ttracx GitHub org README (use the public `ttracx/thoxymicro-install` repo's README footer)
   - Twitter / Bluesky / Mastodon bios
   - LinkedIn featured section
   - email signature

---

## Phase 8. Pre-launch checklist (T-30 to T-1)

See [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md). Highlights:

| T-minus | Task | Owner |
|---|---|---|
| T-30 | Pre-launch page live | Phamy |
| T-21 | Send press kit to 12 pre-briefed reporters under embargo | Phamy |
| T-14 | All hero video B-roll cuts uploaded for press | Craig |
| T-7  | Final EVT photo pass on all four devices | Craig |
| T-3  | Verify Stripe Connect is in "Verified" state, payouts enabled | Phamy |
| T-2  | Final preview of the live page on desktop, iPad, iPhone, Android phone | Both |
| T-1  | Lock all copy. No more edits. | Both |
| T-0  | Launch at 9:00 AM PT (Kickstarter's strongest discovery window) | Both |

---

## Phase 9. Day-of-launch playbook (T+0)

| Hour | Task |
|---|---|
| 09:00 PT | Click Launch. Verify page is live. |
| 09:05 | Send `templates/launch-day-email.md` to the pre-launch notify list (Mailerlite or whatever ESP you chose) |
| 09:10 | Post to LinkedIn, Twitter, Bluesky, Mastodon. Use the launch-day social copy in `templates/launch-day-social.md` (add this file later) |
| 09:30 | Confirm at least 1 pledge per minute is coming in (if not, your funnel is broken; escalate) |
| 10:00 | First press embargo lifts. Reply to every reporter within 2 hours. |
| 12:00 | First update to backers: "We are live." Use `templates/weekly-update.md` Day-0 variant. |
| 17:00 | First day metrics review. |
| 21:00 | Day-1 close: post to socials with the funded-percentage screenshot. |

---

## Phase 10. Funded and beyond (T+1 to T+30)

- Weekly updates every Friday at 10:00 PT, no exceptions. Template: `templates/weekly-update.md`.
- Stretch goal unlocks: same-day Update + email + social posts. Template: `templates/stretch-unlock-update.md`.
- Reply to comments within 24 hours, M-F. Reply within 48 hours on weekends.
- BackerKit setup: start at T+7. Address collection survey at T+25. Add-on purchases at T+35.
- Final-48 push: T+28. Email + social: "Last 48 hours."
- Campaign close (T+30, 22:00 PT): post the celebratory update within 1 hour of close.

---

## Common mistakes to avoid

- Do not edit the Story page mid-campaign with major changes; Kickstarter analytics show this depresses pledges. Save big rewrites for after funding.
- Do not undercut your own tiers by adding free upgrades; you set expectations for next time.
- Do not promise dates you cannot hit by 30 days. The penalty for slipping a Kickstarter promise is reputational, not legal, and that penalty compounds.
- Do not let a single negative comment go unanswered for more than 24 hours. Silence reads as guilt.
- Do not announce a stretch goal you are not certain you can deliver. The $1.5M ThoxClip bone-conduction unlock is the riskiest on the list; if BOM swings, push it to $2M and unlock something cheaper at $1.5M.

---

## Source-of-truth pointers

- Campaign narrative: [deliverables/THOX_Kickstarter_Campaign.md](../deliverables/THOX_Kickstarter_Campaign.md)
- Pitch deck: [deliverables/THOX_Kickstarter_Deck.pptx](../deliverables/THOX_Kickstarter_Deck.pptx)
- Talking points: [deliverables/THOX_Talking_Points.docx](../deliverables/THOX_Talking_Points.docx)
- Video script: [deliverables/THOX_Video_Script.docx](../deliverables/THOX_Video_Script.docx)

When in doubt, this repo wins.
