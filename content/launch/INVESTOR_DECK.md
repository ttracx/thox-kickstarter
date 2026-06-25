# INVESTOR_DECK.md

10-slide investor pitch deck for THOX.ai LLC. Markdown source intended to be rendered to PDF or slides via the THOX deck-stage component (`thox_deck_stage.js` from `ttracx/thox-system-prompts`).

Brand:
- Background: #0B1220
- Foreground: #F2F4F8
- Accent cyan: #27E5FF
- Accent magenta: #FF3DA8
- Typography: IBM Plex Sans body, JetBrains Mono for code

Voice: technical, honest, no marketing fluff, no fabricated quotes, no fabricated metrics. Where a number is TBD, the slide says TBD. Where a number depends on the user, the slide says "user-set."

Each slide is one h2 heading. Speaker notes live in the `> Speaker notes` block (100 to 200 words). Each slide ends with a `**Key takeaway:**` line.

Companion: `INVESTOR_DECK_ONE_PAGER.md` collapses the same content to a single printable page.

---

## Slide 1: THOX - Private AI you can hold

THOX.ai is a family of small, owned hardware devices that run AI inference on hardware in your hands.

Four launch SKUs:

- ThoxClip from $39
- ThoxMini at $69
- ThoxAir at $79 (clusters via MagStack)
- ThoxNova at $499

Software: Apache-2.0, public on github.com/ttracx.

Kickstarter launch: August 12, 2026. Goal $250K. Ceiling $3M.

> Speaker notes:
>
> Open with the one-line frame. THOX is private AI you can hold. The product family is built on a single thesis: privacy is not a marketing line, it is a property of where the computation runs. Hardware in your hands runs the model in your hands. Software is Apache-2.0 and the entire repo graph is public; nothing about the runtime requires the investor to take our word for it. The four launch SKUs span a $39 wake-word gateway up to a $499 workstation, with the MagStack Cluster Dock turning ThoxAir into a multi-node cluster on a desk. Lead with the product reality, not the vision. We have shipped a 7-backend Rust runtime, multiple device provisioners, and printable hardware kits. The campaign on Aug 12 is the funding mechanism for the manufacturing run, not the moment we start being a real company.

**Key takeaway:** THOX runs personal AI on hardware you own, not on someone else's server. Aug 12 Kickstarter is the funded manufacturing moment.

---

## Slide 2: The Problem

Cloud AI carries three structural costs the consumer cannot price in at sign-up time.

1. Privacy exposure. Every prompt becomes a row in a log file the user cannot read or delete. Jurisdiction risk follows the data, not the user.

2. Recurring cost. Per-token billing scales with use. Power users see four-figure annual spend. Casual users pay for capacity they do not consume.

3. Vendor lock-in. The provider can change the model, the rate limit, the policy, or the price at any time. Switching cost is high once tools, prompts, and integrations cement.

> Speaker notes:
>
> Frame the problem as structural rather than ethical or political. The three costs (privacy exposure, recurring spend, vendor lock-in) apply regardless of which cloud AI vendor a customer chooses. Each is a property of the centralized inference model, not a bug to be fixed by a better provider. The privacy frame is the wedge for early-adopter consumers and education buyers. The cost frame is the wedge for SMB and enterprise self-hosting. The lock-in frame is the wedge for developers and platform builders. Do not argue cloud AI is bad; argue cloud AI is the wrong shape for an entire class of use cases. We do not need to win every workload to win this category. We need to win the workloads where one of the three costs is unacceptable.

**Key takeaway:** Cloud AI carries three structural costs (privacy, recurring spend, lock-in) that are unfixable inside the centralized model.

---

## Slide 3: The Vision

A family of small, owned AI hardware spanning $39 to $499.

The Aug 12 launch covers four SKUs. The stretch ladder unveils three concept devices (ThoxArm, ThoxVault, ThoxCargo). The full ecosystem covers wake-word, desktop edge, multi-node cluster, workstation, articulated mount, secure identity, and field carrier.

Common runtime across the family. Same Apache-2.0 software stack. Same dashboard. Same observable outbound-byte ledger. Same upgrade path.

The category we are creating: personal AI compute as a hardware category, not a SaaS line item.

> Speaker notes:
>
> The vision slide is the slide where most decks overpromise. We do not. The four launch SKUs are the actual shipping commitments. Three additional devices (ThoxArm, ThoxVault, ThoxCargo) are concept-art unveils tied to the stretch ladder; they are not on the manufacturing roadmap until a separate funded round. The thing that makes the vision investable is the common runtime: the THOXCore router, the THOX Experience Fabric, the device-provisioning tooling, and the agent fleet are shared across every device in the family. A backer who buys a ThoxClip is one upgrade away from being a ThoxNova customer. The category framing matters: this is hardware-as-a-category, not a SaaS line item. The unit economics, customer LTV, and competitive defensibility all derive from owning the hardware layer rather than renting compute.

**Key takeaway:** Owned AI hardware spanning $39 to $499 on a common Apache-2.0 runtime, building a personal-compute category rather than a SaaS account.

---

## Slide 4: The Product Line

Aug 12 launch:

| SKU | Price | Form factor | Use case |
|---|---|---|---|
| ThoxClip | from $39 | Clip-on wake-word + voice gateway | Pocket entry point |
| ThoxMini | $69 | Desktop edge compute (Luckfox Pico Mini B) | Local small-model inference |
| ThoxAir | $79 | Single-node compute, MagStack-clusterable | Multi-agent workflows |
| ThoxNova | $499 | Workstation, 7-backend ThoxCore router | Flagship local inference |

Stretch concepts (no SKU, no ship window, concept unveils only):

- ThoxArm ($1.5M stretch): articulated desktop mount
- ThoxVault ($2.5M stretch): home secure identity device
- ThoxCargo ($3M stretch): field carrier

MagStack Cluster Dock add-on: BackerKit add-on at T+45, ships with ThoxAir tier.

> Speaker notes:
>
> Walk the table left-to-right. ThoxClip is the price-anchor entry that gets the brand in pockets. ThoxMini is the desktop bridge that proves the on-device thesis to a buyer who has only ever used cloud AI. ThoxAir is the engineering hero, where the magnetic clustering and multi-node software actually demonstrate the category. ThoxNova is the upmarket workstation that anchors the LTV and the technical credibility. The three concept devices are explicitly not shipping commitments under this Kickstarter; they are roadmap visibility. Be honest with the investor: the $1.5M, $2.5M, and $3M stretches are concept-art unveils, not product launches. Investors who push for an immediate ThoxArm or ThoxVault commitment are the wrong investors for this round. The campaign exists to fund the four launch SKUs.

**Key takeaway:** Four shipping SKUs from $39 to $499 launch Aug 12; three concept devices are roadmap unveils, not promised products.

---

## Slide 5: Why Now

Three converging market conditions make this the right launch moment.

1. Edge silicon is finally fast enough. Sub-$100 SoCs can run useful small instruction-tuned models at usable latency. The Luckfox Pico Mini B at $69 BOM headroom is the leading edge of that curve.

2. Cloud AI privacy backlash is visible in the consumer market. The recurring news cycle on AI prompt logs, training data scrapes, and surveillance-as-a-service is converting privacy from a niche concern to a default purchase consideration.

3. Bulk-channel TOS-friendliness. Universities, makerspaces, and bookstores can carry an on-device device without the procurement friction a cloud AI subscription requires. The THOXKey EDU bulk tier targets this channel.

> Speaker notes:
>
> The why-now slide answers "why has nobody done this yet." The honest answer is two-fold: the silicon got cheap enough about 18 months ago, and the consumer attention to AI privacy crossed a threshold about 6 months ago. Before both conditions, the product would have been too expensive for the value proposition or pitched into a market that did not yet recognize the cost. The bulk-channel point is underweighted in most investor conversations: education and makerspace buyers cannot procure a personal cloud AI subscription, but they can procure a hardware device that they own. That is a structural channel advantage we get for free by being on the hardware side of the line.

**Key takeaway:** Edge silicon is cheap enough, consumer awareness is high enough, and the bulk channel is procurement-friendly to hardware in a way it is not to subscriptions.

---

## Slide 6: Traction

What has shipped before the launch:

- THOXCore router v0.2.0: 7 backend adapters (LiteRT, OpenAI HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX). 145 of 145 tests green. Apache-2.0.
- THOXCore v0.4.0 release notes staged. 221 of 221 tests green at the integration phase.
- 30+ public repositories under github.com/ttracx, all in the THOX ecosystem.
- ThoxMini provisioner shipped for the Luckfox Pico Mini B.
- ThoxNova provisioner staged for the LattePanda N100.
- MagStack Cluster Dock print kit shipped at ttracx/thox-3dprint-kit PR #3.
- ThoxMini Air v4 multi-material 3MF kit shipped at PR #4.
- Kickstarter launch content pack shipped: VIDEO_SCRIPT, STORYBOARD, REWARDS_FAQ, MILESTONES, STRETCH_GOALS, PRESS_KIT.
- Backer reward fulfillment workflow shipped at ttracx/thox-kickstarter-integration (55 of 55 tests green).

What is in flight for the campaign:

- Aug 12 launch on Kickstarter. Goal $250K. Ceiling $3M. 30-day window.
- Friends + family preview list TBD on size; target 5,000 on the launch-day mailing list.

> Speaker notes:
>
> This is the slide that closes most rounds. Walk the investor through how much of the work is already shipped to public repos. The 7-adapter router, the device provisioners, the print kits, and the campaign content pack are all real and reviewable. There is no "we will build this if you fund the round" gap. The Kickstarter funds the manufacturing run, not the technology development. If the investor wants to inspect anything, point them at github.com/ttracx. The 30+ public repos are the technical due-diligence package. The Kickstarter goal at $250K is conservative; the team can self-fund the technology side regardless of the campaign result. The campaign is the manufacturing capital event.

**Key takeaway:** The runtime, the devices, and the campaign material are all shipped to public repos. The Kickstarter funds manufacturing, not invention.

---

## Slide 7: Business Model

Four revenue lines.

1. Hardware margin. Per-unit margin on each device, increasing with volume. Launch tier margin is thin by design (early-bird capture); standard tier margin is the long-run plan.

2. EDU recurring (THOXKey EDU). Bulk MOQ pricing for universities, makerspaces, and high school CS programs. Annual refresh of teaching kits. First 25 university partners on the wait list at the $500K stretch.

3. Enterprise white-label. Custom-branded THOX device family for enterprise buyers who need on-prem AI hardware. TBD on volume and timing.

4. Bulk MOQ swag. Branded teaching kits, conference-floor demo units, internal employee distribution kits. Lower-margin, higher-volume, channel-builder.

Specific dollar figures are user-set and not in this deck.

> Speaker notes:
>
> The four revenue lines are listed in expected order of contribution for the first 18 months: hardware first, EDU second, enterprise white-label third, bulk swag fourth. Be honest with the investor that hardware-margin businesses are unit-economics businesses, not subscription businesses; the LTV story is upgrade-and-refresh, not monthly-recurring. The THOXKey EDU line is the closest thing we have to recurring revenue and it is annual, not monthly. Enterprise white-label is a high-ASP, low-volume line that takes 12 to 18 months to land its first signed deal. We do not project specific dollar figures in this deck because the launch result on Aug 12 is the single largest input to the 18-month revenue model, and we will not have that number until Sep 11. After the campaign closes we update this slide with real numbers.

**Key takeaway:** Hardware-margin core, EDU bulk pricing, enterprise white-label, bulk swag. Hardware first, EDU second, enterprise and bulk longer-tail. Real numbers post-campaign.

---

## Slide 8: Competition

Cloud LLM APIs and cloud AI services are the primary competitive frame.

| Vendor type | Strength | Where THOX wins |
|---|---|---|
| Cloud LLM APIs | Largest models, best fine-tuning | Privacy, predictable cost, no lock-in |
| Cloud AI assistants | Mass-market UX | On-device inference, owned hardware |
| Other edge AI devices | Specialized verticals | Full device family, common runtime, sub-$50 USB tier |
| DIY local AI (Ollama on a PC) | Free software | Turn-key hardware, no setup, no PC required |

Defensibility:

- First-mover at the sub-$50 USB tier (ThoxClip at $39).
- Common runtime across the family is a moat that competitors who ship a single device cannot match.
- Apache-2.0 software keeps the developer community on our side without giving away the hardware margin.

> Speaker notes:
>
> The competition slide deliberately does not name specific company competitors. Three reasons: the cloud LLM API category will consolidate before our shipping window, so naming today's leader is anchoring on a name that may not exist; competitive framing by category is honest about the structural fight we are picking; and named competitor comparisons invite a level of head-to-head feature compare that distracts from the category-creation pitch. The defensibility argument is the part that matters: a single-device edge AI competitor cannot match the family-runtime moat without re-architecting their software stack. A cloud AI vendor cannot match our privacy story without abandoning their data-collection business model. The structural advantage is durable.

**Key takeaway:** Compete on category, not on named competitors. First-mover at sub-$50 USB tier; common runtime is the durable moat.

---

## Slide 9: Team

Co-founders:

- Tommy Xaypanya. Software, AI runtime, campaign operations. Inventor of record on the THOX IP portfolio (IP-008 onward).
- Craig Ross. Hardware, mechanical design, supply. Inventor of record on the THOX IP portfolio alongside Tommy.

Advisors and additional team: TBD. Slide updated as commitments land.

Cross-cutting: cross80127 contributes at maintain permission across the THOX ecosystem repos.

> Speaker notes:
>
> The team slide is the slide where most early-stage decks overstate. We do not. Two co-founders, both inventors of record on the IP portfolio, both shipping work into public repos every week. The advisor placeholder is a real placeholder; specific names go on this slide only after a commitment is in writing. The cross-cutting contributor mention (cross80127) is a real ongoing contribution at the repo level. For investors who push on team-depth, the honest answer is that this round is partly to extend the founding team into the manufacturing and supply functions, and that hire plan is in the appendix of the data room rather than on this slide.

**Key takeaway:** Two co-founders, both inventors of record, both shipping. Hiring plan in data-room appendix; named advisors land on this slide only when committed.

---

## Slide 10: The Ask

Round: user-set
Amount raising: $X (user-set)
For: Y percent equity (user-set)
Pre-money valuation: $Z (user-set)
Use of funds: manufacturing capital, certification, fulfillment ops, founding-team extension.

Timing: closes alongside or shortly after the Kickstarter campaign window (Aug 12 to Sep 11, 2026).

What the round buys:

1. Manufacturing capital to underwrite the Kickstarter production run regardless of where the campaign lands inside the $250K to $3M envelope.
2. Certification budget for the four launch SKUs.
3. Fulfillment operations capacity for Q1 to Q3 2027.
4. Three to five hires to extend the founding team into supply, fulfillment, and developer-relations functions.

Next steps:

- Investor materials in the data room (link shared on request).
- Founder-led deep-dive call (60 minutes).
- Tour of the public repo graph (github.com/ttracx).

> Speaker notes:
>
> This slide is user-set on the dollar figures. Tommy and Craig finalize the amount, the equity split, the pre-money, and the use-of-funds bucket weighting before any version of this deck is sent to an investor. The use-of-funds framing argues that the campaign and the round are complements, not substitutes: the campaign funds the manufacturing run inside a specific dollar envelope, and the round funds the operational capacity to deliver that run plus the next two. Investors who want to invest only if the campaign hits a specific number are mispricing the risk; the technology and the supply work are already de-risked, and the round backs the team's ability to execute fulfillment at the chosen scale. The next-steps block is intentionally concrete: data room, deep-dive call, public repo tour.

**Key takeaway:** Amount, equity, and pre-money are user-set. Round funds manufacturing capital, certification, fulfillment ops, and team extension. Campaign and round are complementary.

---

## Deck delivery notes (internal, not on slides)

- Format: this markdown source renders to PDF or slides via the THOX deck-stage component. PDF target uses the Apache-2.0 `thox_deck_stage.js` from `ttracx/thox-system-prompts`.
- Title-slide brand: #0B1220 background with cyan #27E5FF accent on "THOX." Magenta #FF3DA8 for the underline on the "Private AI you can hold" subhead.
- Body slides: foreground text in #F2F4F8 on #0B1220. Bullets in IBM Plex Sans. Numerals and code-style elements in JetBrains Mono.
- Speaker notes are not on the visible slide; they live in the presenter view and the printable handout.
- Slide 9 (Team) updates as advisor commitments land. Slide 10 (The Ask) waits on Tommy + Craig to finalize the dollar figures before any send.

Owner: Tommy. Craig signs off on slides 4, 5, and 7 (product, why-now, business model). Tommy + Craig jointly sign off on slide 10 (the ask) before any external send.
