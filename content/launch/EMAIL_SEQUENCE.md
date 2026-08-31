# EMAIL_SEQUENCE.md

Pre-launch email sequence for the September 8, 2026 THOX.ai Kickstarter. Five emails sent over six weeks (T-42, T-28, T-14, T-7, T-0) to the founder list.

Voice: Tommy, first person, technical, no marketing fluff. Honest about what ships and what does not. No em-dashes. No emojis. Plain language.

From: tommy@thox.ai
Reply-To: tommy@thox.ai
Sender name: Tommy at THOX

All countdown links route to https://thox.ai/launch until T-0; switch to the Kickstarter project URL the moment the campaign goes live (T-0 09:00 PT).

Footer (every email):

```
THOX.ai LLC, Reno, NV.
You are receiving this because you signed up at thox.ai or asked us to keep you posted.
Unsubscribe: https://thox.ai/unsubscribe?t={{unsubscribe_token}}
```

CAN-SPAM: physical mailing address goes in the footer block above (TBD: replace `Reno, NV` with the registered LLC address once Craig confirms which mailing address to use for public-facing CAN-SPAM compliance; the Reno line is a placeholder).

Token style: `{{unsubscribe_token}}` is a BackerKit-issued per-recipient token. `{{first_name}}` is also available. Both default to a graceful fallback ("there" and the email local-part respectively) if the field is missing.

---

## Email 1: T-42 (Tue Jul 21, 2026)

Subject: Why we're building THOX
Alt subject (A/B): The thing we couldn't stop thinking about
Preview text: On-device AI you actually own, not rent

Body:

> Hi {{first_name}},
>
> Six months ago Craig and I sat down and tried to write the smallest possible problem statement for THOX. Here is what we ended up with.
>
> Personal AI keeps getting better. Personal AI is also, almost without exception, somebody else's computer. You type into a box. The box sends your words to a server you do not own, owned by a company that may change the rules tomorrow, in a jurisdiction that may not be yours. You get back a useful answer. You also get back a usage row in a log file you cannot read or delete.
>
> We do not think that is the right shape for the technology.
>
> THOX is what we built instead. It is a family of small devices that run the model in your hands. The full inference loop happens on hardware you bought, in your home, on your desk, in your pocket. No request leaves the device unless you explicitly route it to leave. The dashboard shows every outbound byte so you can deny what you do not want to send.
>
> That is the whole thesis. Privacy is not a marketing line; it is a property of where the computation runs.
>
> We launch on Kickstarter on September 8, 2026. Between now and then I will send you four more emails. The next one walks through the five devices on the live family page. Pledge prices stay in the campaign source of truth. I will not invent a Case price here. The one after that shows the engineering work on the multi-node cluster dock. The fourth walks through the early-bird tiers and stretch ladder. The fifth says "we are live."
>
> If you want to skip ahead, the campaign details are at the link below. There is nothing to pledge yet. The countdown page just collects an email and shows the current day count to launch.
>
> Thanks for being on the list. The reason this works at all is because people like you have been willing to wait for the slower, harder version of the thing.
>
> Tommy
> Co-founder, THOX.ai

CTA: Countdown page at https://thox.ai/launch

Link label: "See the countdown and the five devices"

---

## Email 2: T-28 (Tue Aug 4, 2026)

Subject: Meet the five devices
Alt subject (A/B): The THOX family on the live page
Preview text: Five devices. Nova is not in this campaign.

Body:

> Hi {{first_name}},
>
> Two weeks ago I sent you the why. Here is the what.
>
> Five devices are on the live family page. Every device is useful standalone except ThoxClip, which needs a paired THOX node for agent features. ThoxNova is not part of this campaign. It follows after Kickstarter fulfilment.
>
> 1. ThoxKey. USB private AI identity.
> 2. ThoxAir. Wireless local companion.
> 3. ThoxMini. Compact local compute.
> 4. ThoxClip. MagStack clip with local AI. Needs a paired THOX node for agent features.
> 5. ThoxCase. Companion case for the phone you already carry.
>
> No pledge amounts in this email. Prices live in the campaign source of truth. I will not invent a Case price. Hero renders are at the link below. Ship windows are intent, not contracts. If we hit a real blocker we will publish it as a backer update before slipping a date.
>
> All software is Apache-2.0. The full repo graph is on github.com/ttracx. The runtime, the agent fleet, and the device-provisioning tooling are all already shipped before launch day. None of this requires you to take our word for it.
>
> Next email: the MagStack Cluster Dock. The thing that took the longest and is the most fun to talk about.
>
> Tommy
> Co-founder, THOX.ai

CTA: See the five devices at https://thox.ai/launch#devices

Link label: "See all five devices, renders, and ship windows"

---

## Email 3: T-14 (Tue Aug 18, 2026)

Subject: The MagStack hero shot
Alt subject (A/B): What four ThoxAirs look like stacked
Preview text: Magnetic clustering, multi-material print, real engineering

Body:

> Hi {{first_name}},
>
> Two weeks to launch. Here is the engineering piece I have been most excited about.
>
> The MagStack Cluster Dock is the part that turns one ThoxAir into a tiny on-desk cluster. Four ThoxAir nodes stack onto a printed dock. Power and data run through pogo pads. Magnets hold the stack square. There is no rack, no rack ears, no rack rails. You set it on a desk, it stays put, and llama.cpp rpc routes across the four nodes for multi-agent workloads.
>
> Three engineering details that took the longest to land:
>
> 1. Multi-material print. The v4 ThoxMini Air enclosure and the dock both ship as QIDI Q2 Combo 3MF kits across matte-black PETG shell, satin light-gray halo ring, and the green accent button. We had to settle the bed (270 by 270 by 256 mm), the layer regime, and the support strategy on a real machine before we could ship the kit. v4 PR #4 landed last week.
>
> 2. Magnetic clustering. Eight magnets per dock, paired to the base of each ThoxAir. The geometry forces the right alignment whether you are stacking two nodes or four. The first time we got the auto-align right was the meeting where Craig and I knew the campaign was real.
>
> 3. The dock is a print kit, not a finished product, by design. STL plus 3MF plates ship in `ttracx/thox-3dprint-kit` PR #3. About 6.5 hours and 85g of PETG to print the five parts. Buy eight magnets and four USB-C cables from your usual supplier. The point is that the cluster is yours, end to end.
>
> The reason this matters: multi-agent workflows are about to be the default way you use AI, and routing them across local compute you own is currently the only setup nobody else can read. The cluster dock is what makes "I own the inference" possible at the four-agent level on a normal desk.
>
> If we hit the $1M stretch, the dock ships at-cost as an add-on to every ThoxAir backer plus a 4-part demo video series. The dock has shipped as a print kit either way; the stretch is what makes the assembled add-on possible.
>
> Next week is launch-day logistics: early-bird tiers, stretch ladder, ship windows. Then we are live.
>
> Tommy
> Co-founder, THOX.ai

CTA: See the MagStack dock and the v4 ThoxMini Air

Link label: "See the multi-material print kits and the stack"
Link URL: https://thox.ai/launch#magstack

---

## Email 4: T-7 (Tue Aug 25, 2026)

Subject: What you'll see on launch day
Alt subject (A/B): Early-bird tiers and the stretch ladder
Preview text: $250K baseline, $3M ceiling, 30-day campaign window

Body:

> Hi {{first_name}},
>
> One week out. Here is the launch-day map, end to end, no fluff.
>
> Campaign window:
>
> - Launch: Sep 8, 2026 at 09:00 PT
> - Press embargo lifts: 10:00 PT same day
> - Campaign closes: October 8, 2026 at 10:00 PM PT
> - Kickstarter All-or-Nothing pledge model: if we do not hit $250K, nobody is charged.
>
> Early-bird tiers (first 24 hours after launch):
>
> - Early-bird amounts match docs/CAMPAIGN_INFO.md. No amounts invented in this email.
> - MagStack Cluster Dock add-on: BackerKit add-on, surfaced at T+45 to ThoxAir backers
>
> Stretch ladder (unlocks during the 30-day window):
>
> - $250K baseline: every listed reward ships
> - $500K: THOXKey EDU bulk pricing + a free 4-node teaching kit spec
> - $1M: MagStack Cluster Dock at-cost for ThoxAir backers + 4-part demo video series
> - $1.5M: ThoxArm concept-art unveil (concept only, not a shipping commitment)
> - $2M: ThoxNova xcframework + iOS feature parity with desktop
> - $2.5M: ThoxVault concept-art unveil (concept only)
> - $3M: ThoxCargo concept + the complete THOX family render unveil (concept only)
>
> Concept unveils are not products on order. ThoxArm, ThoxVault, and ThoxCargo at the $1.5M, $2.5M, and $3M tiers are concept-art and short concept-video unveils. They have no SKU on the campaign, no ship window, and no commitment to manufacture under this Kickstarter. We are not going to ask you to pledge for vapor.
>
> Ship windows (firm intent):
>
> - ThoxClip: Q1 2027
> - ThoxMini: Q2 2027
> - ThoxAir + MagStack add-on: Q2 2027
>
> International shipping is available. Per-region surcharges are listed at BackerKit checkout, not pledge time. We do not absorb duty for any destination. We do not ship to countries under active US export sanctions; if your country becomes restricted before your reward ships, we refund in full.
>
> What to do in the next seven days:
>
> 1. Save 09:00 PT on Sep 8 to your calendar. Early-bird tiers are capped, and the first hour is the only hour they are guaranteed to be open.
> 2. Forward this email to one person who would also want one. The campaign lives or dies on the first 48 hours.
> 3. Reply with any questions. I read every one.
>
> The last email in this sequence goes out at 08:30 PT on launch day with a single link to the live Kickstarter.
>
> Tommy
> Co-founder, THOX.ai

CTA: Save launch day to your calendar

Link label: "Add Sep 8 09:00 PT to your calendar"
Link URL: https://thox.ai/launch#calendar (serves an .ics file)

---

## Email 5: T-0 (Tue Sep 8, 2026, 08:30 PT)

Subject: We're live
Alt subject (A/B): THOX.ai is live on Kickstarter
Preview text: Early-bird tiers are open. The next 24 hours matter most.

Body:

> Hi {{first_name}},
>
> The campaign is live.
>
> Link: https://www.kickstarter.com/projects/thoxai/thox-private-ai-you-can-hold (replace at send time with the canonical Kickstarter project URL)
>
> Early-bird tiers are open and capped. Amounts are on the live Kickstarter page. First 24 hours.
>
> Two things to do, in order of how much they matter:
>
> 1. Back the tier you want. The campaign is All-or-Nothing; if we do not hit $250K, nobody is charged.
> 2. Share the link with one person who would also want one. Email, text, post, whichever. First-48-hour velocity is what tells Kickstarter to surface the project.
>
> The whole team is in the war-room today. Replies to this email go straight to me. If anything on the page is unclear or something breaks, tell me and we will fix it.
>
> Thank you for being on this list since before there was anything to back.
>
> Tommy
> Co-founder, THOX.ai

CTA: Back THOX on Kickstarter

Link label: "Back THOX now"
Link URL: live Kickstarter project URL (set at 09:00 PT on send day)

---

## Send-list hygiene notes (internal, not in email body)

- All five emails are queued in BackerKit. Templates are loaded; copy is frozen per `docs/PULL_FORWARD_TRACKER.md` Phase 4 deliverable "Backer-comms templates loaded into mail tool."
- A/B test the alt subject lines on each email at a 10 percent split, then send the winner to the remaining 90 percent two hours later.
- Send window: emails 1 through 4 go out at 09:00 PT on a Tuesday. Email 5 goes out at 08:30 PT on Tue Sep 8 (the launch).
- Suppression list: anyone who unsubscribes during the sequence is removed from all subsequent sends in the sequence and from the launch-day blast.
- Bounce handling: hard-bounces are removed after the first failure. Soft-bounces retry once at the next scheduled send.

Owner: Tommy. Craig signs off on email 3 (engineering content) and email 4 (pricing tiers). Both founders sign off on email 5 before the launch-day send.
