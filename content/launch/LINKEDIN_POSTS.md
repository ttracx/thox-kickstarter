# LINKEDIN_POSTS.md

Eight LinkedIn posts spread across the six-week run-up to Aug 12, 2026. Posts alternate between Tommy Xaypanya (4 posts) and Craig Ross (4 posts), with a joint launch-day post co-signed.

Voice: founder, technical, honest, no marketing fluff. No em-dashes. No emojis. Lowercase hashtags per LinkedIn convention. First line is the hook (LinkedIn truncates the rest behind a "see more" on most feeds, so the hook does the work).

Posting times: 07:30 PT on weekdays unless otherwise noted; this hits US east-coast morning and EU late morning without being late for west-coast morning scroll.

Attached media: every post has a suggested media asset. PNG renders live in the THOX render pipeline (see `content/launch/PRESS_KIT.md` for asset locations). Code-snippet images can be generated via carbon.now.sh from the snippet text.

Owner: Tommy schedules posts via Buffer or the LinkedIn-native scheduler. Craig reviews + approves his own four posts before queue. Tommy reviews + approves his own four. Both review the joint launch-day post.

---

## Post 1: Tommy, T-42 (Wed Jul 1, 2026, 07:30 PT)

Hook (line 1): We've been heads-down for 6 months building THOX. Here is the thing we couldn't stop thinking about.

Body:

> Personal AI keeps getting better and personal AI is also, almost without exception, somebody else's computer.
>
> You type into a box. The box sends your words to a server you do not own, owned by a company that may change the rules tomorrow, in a jurisdiction that may not be yours. The answer comes back. So does a row in a log file you cannot read or delete.
>
> THOX is what we built instead. A family of small devices that run the model in your hands. The full inference loop happens on hardware you bought, in your home, on your desk, in your pocket. No request leaves the device unless you explicitly route it to leave.
>
> Privacy is not a marketing line. It is a property of where the computation runs.
>
> We launch on Kickstarter on August 12. Between now and then I will post the engineering deep-dives, the device walkthrough, the manufacturing story, and the unboxing thinking. If that is interesting, follow along.

CTA: Countdown and email list at https://thox.ai/launch

Hashtags: #onedeviceai #edgeai #privacy #hardware #kickstarter

Suggested media: ThoxNova hero render PNG (1200x627; LinkedIn link-preview ratio).

---

## Post 2: Craig, T-35 (Wed Jul 8, 2026, 07:30 PT)

Hook (line 1): How I think about hardware design for THOX.

Body:

> I have been building small-batch hardware long enough to know that every design decision is a series of trade-offs between three things: what the customer holds, what the line can make, and what the part costs at volume.
>
> For THOX every device starts at the held experience. ThoxClip lives on a shirt or a strap. ThoxMini sits on a desk near a keyboard. ThoxAir stacks in fours on a counter. ThoxNova lives where a small tower would live. The shape of the object dictates the rest of the build.
>
> Three things I always pull forward into the first sketch:
>
> 1. Single-tool assembly. If a customer needs more than one screwdriver bit to take it apart, the design has lost. ThoxMini Air v4 is a four-screw enclosure, all the same head.
>
> 2. Repair-friendly fasteners over snaps where it matters. Snaps fail at the field-repair step. Screws cost a few cents more and outlast the device.
>
> 3. The bed is the constraint. The QIDI Q2 Combo at 270 by 270 by 256 mm is the print envelope for the kits we ship to backers. Every part fits inside that envelope or it does not ship.
>
> The v4 ThoxMini Air enclosure ships as a multi-material 3MF kit: matte-black PETG shell, satin light-gray halo ring, green accent button. The print is honest about what it is.
>
> Software is one half of THOX. The hardware is the half that decides whether anyone keeps it on the desk after week three.

CTA: See the v4 enclosure and the MagStack dock at https://thox.ai/launch

Hashtags: #hardwaredesign #industrialdesign #manufacturing #3dprinting #makers

Suggested media: ThoxMini Air v4 multi-material assembly photo OR a frame from the QIDI Q2 print bed.

---

## Post 3: Tommy, T-28 (Wed Jul 15, 2026, 07:30 PT)

Hook (line 1): The thing about edge AI nobody talks about is the model loadout.

Body:

> Everyone talks about quantization. Almost no one talks about which models actually fit on which device, and what the routing layer looks like when you have to host more than one.
>
> Here is what shipping THOX taught us.
>
> The thox-core router is a Rust runtime with seven shipped backends: LiteRT, OpenAI-compatible HTTP, Ollama, llama.cpp, vLLM, TensorRT, and MLX. 145 of 145 tests green at the v0.2.0 foundation freeze. Real, not aspirational.
>
> On ThoxMini that means a small instruction-tuned model on llama.cpp and a 30+ skill catalog routed locally. On ThoxNova it means an OpenAI-compatible HTTP front-end for clients, vLLM or llama.cpp under the hood, MLX for the macOS workstation case, and a router that decides which backend gets each request based on the model size, the latency budget, and the workload type.
>
> The single hardest decision in the runtime is who decides where a request goes. We landed on: the router decides, the user can override, and every decision is logged locally so the user can audit what their own machine chose to run on which silicon.
>
> Multi-agent workflows are the next default mode for AI usage. The cluster routing we built for ThoxAir's MagStack dock is what makes a 4-node multi-agent workload run across compute you own, on your desk, without ever calling out.
>
> 28 days to launch.

CTA: Countdown at https://thox.ai/launch

Hashtags: #edgeai #llm #rust #inference #ondeviceai

Suggested media: A carbon.now.sh code-snippet image showing the seven-backend adapter list from `thoxcore` source, OR a screenshot of the THOXCore router decision-log dashboard.

---

## Post 4: Craig, T-21 (Wed Jul 22, 2026, 07:30 PT)

Hook (line 1): Why I co-engineered a magnetic stack.

Body:

> The MagStack Cluster Dock for ThoxAir is the part of the THOX launch I am most proud of.
>
> Multi-agent workflows are a multi-node workload. The standard answer for multi-node compute on a desk is a 1U rack, a tower with PCIe slots, or a Pi-cluster shelf. None of those belong on the same desk as the keyboard you actually use.
>
> So we built a dock. Four ThoxAir nodes stack on a printed base. Eight magnets per dock paired to the base of each node. Power and data run through pogo pads. Magnets force the right alignment whether you are stacking two nodes or four. No rack, no rack ears, no rack rails. Set it down, it stays put.
>
> Engineering details that took the longest to land:
>
> 1. Magnet geometry. The first three magnet layouts misaligned at the four-node case because the field from the outer pair dominated the inner pair. We re-spaced the array so the inner and outer pairs balance.
>
> 2. Pogo travel. The pogo pads need enough travel to swallow print tolerance variation but not so much that you can feel them sag under the weight of a four-node stack. We settled on 1.2 mm travel with a 0.4 mm preload.
>
> 3. The dock is a print kit on purpose. STL plus 3MF plates ship in ttracx/thox-3dprint-kit PR #3. Five parts. About 6.5 hours and 85g of PETG. Eight magnets and four USB-C cables from your usual supplier.
>
> The cluster is yours, end to end. That is the whole shape of THOX condensed into one object.
>
> 21 days to launch.

CTA: See the MagStack dock at https://thox.ai/launch

Hashtags: #hardware #engineering #clustercomputing #magstack #onedeviceai

Suggested media: 4-node MagStack assembly hero shot (use the photographed v4 ThoxMini Air dock from `ttracx/thox-3dprint-kit` PR #3 once printed).

---

## Post 5: Tommy, T-14 (Wed Jul 29, 2026, 07:30 PT)

Hook (line 1): We're 14 days out. Here is what we learned.

Body:

> Manufacturing and supply chain reality, for anyone thinking about taking a hardware product from sketch to backers.
>
> 1. The bed dictates the BOM. We had a different ThoxMini Air enclosure design through three revisions before we matched it to the QIDI Q2 Combo bed at 270 by 270 by 256 mm. Designing first and matching the bed second cost us six weeks across rev1, rev2, and the v4 multi-material kit we landed on last week.
>
> 2. Single-source parts will hurt you. Every part on the launch BOM has at least one alternate vendor identified. The magnets for the MagStack dock are a commodity from three suppliers. The pogo pads are dual-sourced. The Luckfox Pico Mini B for ThoxMini is the one part we are single-source on, and that is the part keeping me up at night.
>
> 3. Multi-material print kits are a customer-experience play, not a manufacturing one. Backers print the kit themselves. The kit ships as 3MF plates with the filament assignments baked in. We do not save manufacturing cost; we give the customer something to actually do during fulfillment that connects them to the device.
>
> 4. Certification is a long pole, not a short one. Plan for the lab to take 6 to 12 weeks from a clean EVT unit. We started early.
>
> 5. The campaign promises only what the prototype already does. The 7-adapter THOXCore router (LiteRT, OpenAI HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX) is shipped at v0.2.0, 145 of 145 tests green. The MagStack dock is shipped as a print kit. The v4 ThoxMini Air is shipped as a 3MF kit. We do not promise anything we have not already shipped to a repo.
>
> The campaign launches Aug 12 at 09:00 PT. Early-bird tiers are first-come during the first 24 hours.

CTA: Calendar reminder at https://thox.ai/launch

Hashtags: #hardware #manufacturing #kickstarter #buildinpublic #ondeviceai

Suggested media: A photo of the BOM whiteboard or the v4 ThoxMini Air QIDI Q2 print plate as captured from the QIDI Studio preview.

---

## Post 6: Craig, T-7 (Wed Aug 5, 2026, 07:30 PT)

Hook (line 1): A week from launch. The unboxing experience matters.

Body:

> I have unboxed enough hardware in my life to know the moment between cutting the tape and seeing the device decides whether you trust the company. Most companies treat this as marketing. It is engineering.
>
> Three things I worked through for THOX.
>
> 1. The first thing in the box is the device, not paperwork. Quick-start prints live under the device, not on top. The brain spends the first 2 seconds on what it came for.
>
> 2. The quick-start card is one card, one side. Plug-in, wake-word, power-on, dashboard URL. Anything that needs more than four lines goes on the website. The card is what you read with one hand while the other holds the device.
>
> 3. Packaging is recyclable single-material molded pulp with a soft paper insert. No bag-of-bags. No PE foam. No twist-ties. We pay a little more per unit for it and we charge nothing extra to backers.
>
> The v4 ThoxMini Air is a multi-material print kit when it ships to print-it-yourself backers, and a printed-and-assembled finished unit for the assembled tiers. The unboxing for both paths is the same: device first, card under it, no extra packaging waste.
>
> 7 days to launch. The early-bird tiers cap during the first 24 hours.

CTA: Save Aug 12 09:00 PT at https://thox.ai/launch

Hashtags: #productdesign #unboxing #packaging #userexperience #hardware

Suggested media: A flat-lay of the printed device + quick-start card + molded-pulp tray.

---

## Post 7: Tommy, T-3 (Sun Aug 9, 2026, 09:00 PT)

Hook (line 1): I'm nervous. And excited. And here is why.

Body:

> Three days from the THOX launch.
>
> Nervous because every Kickstarter is a first-48-hour story. If we do not hit a healthy day-1 number, the surface area we get on the platform shrinks, the press cycle skips us, and the campaign math gets harder every day after.
>
> Excited because we have already done the thing nobody can take back. The 7-adapter THOXCore router is shipped at v0.2.0, 145 of 145 tests green. The MagStack dock and the v4 ThoxMini Air print kits are shipped to repos. The provisioner for ThoxNova on LattePanda N100 is staged and verifiable. The runtime, the agent fleet, and the device-provisioning tooling are public on github.com/ttracx. None of this evaporates if the campaign goes a different direction than we hope. The work is real and out there.
>
> The thing I want to say honestly is that this is not a single-launch decision. We are building THOX whether or not Aug 12 hits the ceiling. The campaign is the funding mechanism for the manufacturing run that we cannot self-fund, and the public moment that lets the people who have been waiting actually back the thing. Both matter.
>
> If you are on the list, thank you. If you have been quietly watching, this is the post where it would help if you said something out loud. A repost, a comment, a question, a tag of one person who would also want one of these devices. The first 48 hours after launch decide a lot.
>
> Aug 12 at 09:00 PT.

CTA: Save the calendar at https://thox.ai/launch

Hashtags: #buildinpublic #founder #kickstarter #hardware #ondeviceai

Suggested media: A simple frame: the four devices on a desk with the calendar date overlaid in THOX accent cyan (#27E5FF).

---

## Post 8: Tommy and Craig joint, T-0 (Wed Aug 12, 2026, 09:01 PT)

Hook (line 1): We're live.

Body:

> THOX is on Kickstarter, right now.
>
> Four devices. ThoxClip from $39. ThoxMini at $69. ThoxAir at $79. ThoxNova at $499. The MagStack Cluster Dock add-on for ThoxAir backers via BackerKit at T+45.
>
> Goal: $250K baseline. Ceiling: $3M.
>
> Early-bird tiers are open and capped at 24 hours.
>
> All software is Apache-2.0. Full repo graph at github.com/ttracx. The 7-adapter ThoxCore router is shipped (v0.2.0, 145/145 tests). The MagStack dock and v4 ThoxMini Air ship as print kits. The provisioner for ThoxNova is verifiable. Everything we promised is already in a repo.
>
> Three things that help, in order of how much:
>
> 1. Back the tier you want.
> 2. Share the link with one person.
> 3. Tell us what you would back if it existed and is missing.
>
> Thank you to everyone who waited. The next 30 days are the campaign. After that, we make the thing.
>
> Link: (Kickstarter URL set at 09:00 PT on launch day)
>
> Tommy and Craig
> Co-founders, THOX.ai

CTA: Back THOX on Kickstarter (live URL)

Hashtags: #kickstarterlaunch #launchday #thoxai #edgeai #ondeviceai

Suggested media: The full-family hero render: ThoxClip, ThoxMini, ThoxAir, ThoxNova on a desk with the MagStack 4-node dock as the centerpiece. If the photo is ready, prefer the real photo over the render.

---

## Posting checklist (internal)

For every post:

- [ ] Founder approves their own post copy 24 hours before queue.
- [ ] Media asset attached and previewed in the LinkedIn composer (not just uploaded).
- [ ] Link unfurls correctly with the right OG image.
- [ ] First-line hook fits within 140 characters so it survives feed truncation.
- [ ] No em-dashes, no emojis, no all-caps shouting, lowercase hashtags.
- [ ] If the post crosses an embargo (post 4 onward), confirm with Tommy before publishing.
- [ ] First comment under each post: drop the countdown link as a comment, since LinkedIn deprioritizes the post when the link is in the body.

Cross-post: each LinkedIn post gets a cut-down X (Twitter) version of the hook plus the link, and a Mastodon version of the same. Cross-posts are owned by ops; founders only review the LinkedIn long-form copy.

Owner: Tommy schedules. Both founders approve their respective posts.
