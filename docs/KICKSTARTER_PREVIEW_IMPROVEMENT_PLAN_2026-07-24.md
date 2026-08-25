# THOX.ai Kickstarter Preview Improvement Plan

Date: 2026-07-24
Status: Draft for founder, campaign, product, compliance, and operations review
Scope: Shared Kickstarter preview plus the current canonical campaign sources in `docs/CAMPAIGN_INFO.md`, `docs/KICKSTARTER_PAGE_COPY.md`, `docs/REWARDS_MATRIX.md`, `docs/FAQ.md`, and `docs/RISKS.md`.

## Evidence limit

The tokenized Kickstarter preview could not be rendered by the automated review environment. Kickstarter returned a blocked preview response. This plan therefore reviews the current canonical copy and the supplied campaign setup/runbook materials. It does not claim to have visually verified the exact current hero, video, reward order, Story layout, Risks tab, Creator tab, or Plan tab.

A final visual pass requires a full-page desktop capture plus mobile captures of the Overview, Story, Rewards, Risks, FAQ, Creator, and Plan surfaces.

## Source-of-truth warning

Two campaign timelines remain in circulation:

- Canonical Kickstarter repository: September 1, 2026 launch; October 1, 2026 close; $150,000 goal.
- Website handoff assumption: July 9, 2026 launch; August 8, 2026 close.

The Kickstarter editor values must win. Reconcile the repository, website state machine, emails, social posts, reward availability, and close runbook before public promotion.

The June campaign setup guide is still useful for design, trust, prototype, AI-disclosure, manufacturing, and page-structure guidance, but its Nova-led device lineup is retired for the current launch. The current reward lineup is ThoxKey, ThoxMini Air, ThoxMini, and ThoxClip. ThoxNova may appear only as roadmap context, not as a launch reward.

## Executive verdict

The canonical campaign has a strong differentiator: local-first AI hardware with explicit capability boundaries. Its current copy is much more credible than the retired campaign because it says what each small device can and cannot do.

The highest-impact opportunity is to turn that honest-boundary positioning into visible proof. Backers should understand the product family, choose a reward, see working prototype evidence, understand what remains in validation, and trust the delivery plan within the first two minutes.

## Prioritized queue

Priority formula:

`Priority = (Market Value × 0.4) + (Technical Feasibility × 0.3) + (Time-to-Market × 0.2) + (Strategic Importance × 0.1)`

| Rank | Work item | Market | Feasible | Speed | Strategic | Score | Gate |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | Rewrite the first screen for instant product and reward clarity | 10 | 10 | 10 | 9 | 9.9 | P0 |
| 2 | Lock the editor dates, goal, lineup, names, and prices across every surface | 10 | 9 | 10 | 10 | 9.7 | P0 |
| 3 | Replace aggressive delivery promises with operations-approved windows | 10 | 9 | 10 | 10 | 9.7 | P0 |
| 4 | Publish a complete AI-use, model-source, consent, and credit disclosure | 10 | 9 | 9 | 10 | 9.5 | P0 |
| 5 | Add a cloud-first versus THOX local-first comparison | 9 | 10 | 10 | 8 | 9.4 | P1 |
| 6 | Show working prototype proof and current development stage per device | 10 | 8 | 8 | 10 | 9.0 | P0 platform gate |
| 7 | Strengthen founder and creator trust surfaces | 9 | 9 | 9 | 9 | 9.0 | P1 |
| 8 | Simplify the 13-tier reward decision | 9 | 8 | 9 | 8 | 8.6 | P1 |
| 9 | Turn the production plan into evidence-backed milestones | 10 | 7 | 7 | 10 | 8.5 | P1 |

## Recommended Story order

1. Hero: what THOX is, four devices, starting pledge, one real prototype-led image.
2. The problem: sensitive work should not require cloud-first processing.
3. Choose your THOX: four-device comparison with price, role, paired hardware, and honest limit.
4. Working proof: one demonstrated workflow per device.
5. How the family works: identity, routing, local services, capture, and heavier-work handoff.
6. Honest boundaries: what the devices do not claim to do.
7. Rewards and savings: simplified tier guide.
8. What is built and what remains: current state by device.
9. Manufacturing and certification plan: milestone, status, evidence, next gate.
10. Use of funds: current $150,000 allocation visual.
11. Delivery and fulfillment: operations-approved dates, shipping collection, duties/taxes.
12. Use of AI and data-source disclosure.
13. Risks and challenges.
14. Founders and relevant execution ownership.
15. FAQ.
16. Backer commitment and closing CTA.

## Paste-ready first-screen update

### Title

**THOX.ai Private AI Hardware**

### Tagline

**Your AI. Your Data. Your Rules.**

### Lead

Most AI tools ask you to send your work, notes, files, and ideas somewhere else. THOX.ai is building a local-first hardware family for people who want private AI they can own, carry, and control.

Start with a $24 ThoxKey, add wireless routing with ThoxMini Air, run lightweight local services on ThoxMini, or capture private context with ThoxClip. Each device does what it can honestly do. Heavier work routes to capable local hardware you own.

### First-screen support line

**Four devices. One local-first workflow. Kickstarter rewards from $24.**

### Story CTA

**Choose your THOX reward**

### Required hero-media label

Use one of the following labels directly below the hero media:

- `Working engineering prototypes shown. Final production finishes may change.`
- `Production-intent prototype and clearly labeled concept visualization.`

Never use an unlabeled generated render as apparent production photography.

## Choose your THOX block

| Device | Starts at | Best for | Honest boundary |
|---|---:|---|---|
| ThoxKey | $24 early bird | Portable identity, encrypted launcher, recovery, and configuration | Not a standalone LLM computer |
| ThoxMini Air | $69 early bird | Lightweight wireless routing and device coordination | Not a workstation or large-model inference box |
| ThoxMini | $149 early bird | Local services, lightweight agents, encrypted storage, and automations | Large-model work routes to capable local hardware |
| ThoxClip | $299 early bird | Voice capture, workflow triggers, field notes, and secure handoff | Not a medical, emergency, surveillance, or regulated safety device |

Add a simple recommendation below the table:

- Start with **ThoxKey** for the lowest-cost entry.
- Choose **ThoxMini Air** for a sub-$100 wireless companion.
- Choose **ThoxMini** for the practical local compute node.
- Choose **ThoxClip** for premium capture and command away from the desk.
- Choose the **Complete Founder Kit** for one of every launch device.

## Cloud-first versus THOX local-first

| Question | Cloud-first workflow | THOX local-first workflow |
|---|---|---|
| Where does work go? | Work is sent to a third-party service by default | Work stays in the user-owned local workflow by default |
| What controls access? | Provider account, policy, pricing, and availability | Hardware, connectors, models, and network choices controlled by the user |
| Where does heavy compute run? | Provider infrastructure | Capable local THOX nodes or user-owned computers |
| What do small devices do? | Usually act as clients to the remote service | Carry identity, route, capture, trigger, and run bounded local services |
| Are external connectors required? | Commonly required | Optional and user-enabled where supported |

Use a footnote: `Capabilities depend on the selected device and paired local hardware. THOX does not claim that every model runs on every device.`

## Prototype-proof section

Create one evidence card per device. Each card must contain:

1. A real physical prototype photo or short clip.
2. A visible stage label: `Engineering prototype`, `EVT`, `DVT`, `PVT`, or `Production`.
3. One demonstrated canonical workflow.
4. A short list titled `What works in this demo`.
5. A short list titled `What remains in validation`.
6. A date and build identifier.

Recommended proof sequence:

- ThoxKey: plug in, unlock or launch the local workspace, show recovery/configuration flow.
- ThoxMini Air: power on, join the local THOX environment, route a lightweight command.
- ThoxMini: boot, show one local service or lightweight agent, show encrypted local storage or automation status.
- ThoxClip: capture a note or trigger, then show secure handoff into the paired local environment.

Do not list a capability unless the video visibly demonstrates it or the current build log supports it.

## What is built versus what remains

Use this template and fill only from dated engineering evidence:

| Device | Demonstrated now | Current stage | Remaining before production | Evidence |
|---|---|---|---|---|
| ThoxKey | `[verified demonstration]` | `[stage]` | `[remaining work]` | `[dated photo/video/build link]` |
| ThoxMini Air | `[verified demonstration]` | `[stage]` | `[remaining work]` | `[dated photo/video/build link]` |
| ThoxMini | `[verified demonstration]` | `[stage]` | `[remaining work]` | `[dated photo/video/build link]` |
| ThoxClip | `[verified demonstration]` | `[stage]` | `[remaining work]` | `[dated photo/video/build link]` |

## Reward simplification

The canonical matrix has 13 reward tiers. Before launch, reduce decision overload to ten main tiers:

1. Supporter.
2. Early-bird ThoxKey.
3. ThoxKey Kickstarter Special.
4. Early-bird ThoxMini Air.
5. ThoxMini Air Kickstarter Special.
6. Early-bird ThoxMini.
7. ThoxMini Kickstarter Special.
8. Early-bird ThoxClip.
9. ThoxClip Kickstarter Special.
10. Complete Founder Kit.

Move Starter, Developer, and Wearable Pro combinations into add-on guidance or the pledge manager. This keeps one complete bundle while allowing backers to build their own pair.

Recommended featured reward while inventory remains: **Early-bird ThoxMini Air at $69**. It is below $100, demonstrates the ecosystem more clearly than a digital tier, and provides a stronger physical entry point than a configuration key alone. When it sells out, feature the standard ThoxMini Air reward.

Keep the $24 ThoxKey prominent in the hero as the lowest-cost physical entry. Keep the Complete Founder Kit prominent in the Story as the high-value full-family option.

If any tier already has backers, do not change its price, contents, or delivery date without checking Kickstarter's locked-field rules. Improve selection through Story-page comparisons, reward images, the Featured Reward, add-ons, and updates instead.

## Delivery-date correction gate

The current Q3/Q4 2026 estimates for ThoxKey, ThoxMini Air, and ThoxMini are aggressive relative to a late campaign close and hardware validation work. Do not change them from this document alone. Operations, manufacturing, finance, and certification owners must approve the final windows.

Conservative candidate windows from the repository review:

| Reward | Current canonical estimate | Candidate conservative estimate |
|---|---|---|
| ThoxKey | Q3-Q4 2026 | Q4 2026 |
| ThoxMini Air | Q3-Q4 2026 | Q1 2027 |
| ThoxMini | Q3-Q4 2026 | Q1 2027 |
| ThoxClip | Q1 2027 | Q2 2027 |
| Complete Founder Kit | Q1 2027 | Q2 2027 |

Before publishing a date, attach evidence for supplier lead time, enclosure readiness, firmware scope, certification, pilot quantity, packaging, freight, and fulfillment buffer.

## Manufacturing-plan update

Replace a date-only timeline with a status table:

| Milestone | Status | Evidence shown to backers | Exit criterion | Target |
|---|---|---|---|---|
| Proof of concept | `[status]` | Functional and appearance prototypes | Canonical workflow demonstrated | `[date]` |
| Working prototype | `[status]` | Integrated unit and build video | Product works and resembles production intent | `[date]` |
| DFM / DVT | `[status]` | Finalized specifications, BOM, assembly review | Manufacturer sign-off and known MOQ | `[date]` |
| Pre-production / PVT | `[status]` | Pilot units, fixtures, QA results | Repeatable build and test process | `[date]` |
| Certification | `[status]` | Pre-scan and lab schedule | Required market approvals complete | `[date]` |
| Production | `[status]` | Production-line and inspection evidence | Rewards assembled and accepted | `[date]` |
| Fulfillment | `[status]` | Pack-out and logistics readiness | Addresses locked and inventory released | `[date]` |

## Use-of-funds visual

Use the current approved allocation as a simple 100% chart:

- 42% manufacturing, PCBAs, enclosures, and packaging.
- 18% firmware, QA, and security validation.
- 16% certification and compliance reserve.
- 14% fulfillment and logistics.
- 7% Kickstarter, payment fees, and taxes reserve.
- 3% contingency.

Add one sentence below the chart:

`The $150,000 goal is intended to fund a coordinated first production run and the validation work needed to move four devices from prototype builds into repeatable fulfillment.`

## AI-use disclosure template

This section is intentionally incomplete. Fill every bracket from verified engineering, legal, model-registry, licensing, and content-production records before publishing.

### Use of AI

THOX.ai develops local-first AI hardware and software. Product functionality may use THOX-developed code and user-selected or third-party AI models, subject to the capability limits of each device and the licenses of those models.

This campaign used AI assistance for `[list copy, image, video, code, translation, or workflow uses]`. The tools used were `[tool and model names]`. Final public copy, technical claims, and product decisions were reviewed by `[human names and roles]`.

Any AI-generated or AI-assisted concept image is labeled as a concept visualization and is not presented as final production photography. The product, hardware architecture, software integration, industrial-design decisions, and campaign execution elements that are original THOX work are `[specific list]`.

Models and data sources demonstrated by the campaign are `[model/source list]`. Their licenses are `[license list]`. Consent, attribution, and credit controls for each source are `[verified statement]`.

Backer or user private data is `[verified training-use statement]`. Optional external connectors are `[verified connector statement]`. The local-versus-external data path shown in each demo is `[verified explanation]`.

Do not publish this section with brackets or generic assurances. Kickstarter's disclosure should match the exact models, content tools, data sources, licenses, consent, and credit practices used.

## Founder and creator trust block

Use exact public roles:

- **Craig Ross, CEO and Co-Founder**: mission, product positioning, manufacturing path, operations, and backer commitment.
- **Tommy Xaypanya, CTO and Co-Founder**: technical architecture, local-first runtime, security posture, and product demonstration.

Do not add inferred education, prior employers, years of experience, manufacturing history, or credentials that the founders have not written and approved.

Recommended video structure:

1. Craig: 20 seconds on the problem and why Kickstarter.
2. Tommy: 45-60 seconds demonstrating the four-device workflow and honest boundaries.
3. Craig: 20 seconds on production, communication, and the backer commitment.
4. Both founders on camera for the final pledge request.

Lower thirds must read exactly `Craig Ross — CEO, THOX.ai` and `Tommy Xaypanya — CTO, THOX.ai`.

## FAQ additions

Add or verify these questions:

1. What is physically working today?
2. Which images are real prototypes and which are concept visualizations?
3. What runs directly on each device?
4. What requires a paired local computer or more capable THOX node?
5. Does THOX require an internet connection or subscription?
6. Which external connectors are optional?
7. What AI models and data sources are shown in the campaign?
8. How is AI-assisted campaign content labeled?
9. When will shipping be collected, and how will duties and taxes work?
10. What happens if a component or delivery date changes?
11. What warranty, replacement, and support process will backers receive?
12. How often will backers receive production updates?

## Paste-ready campaign update sequence

### Update 1: What works today, and what we are still validating

Backers deserve a clear line between demonstrated hardware, production-intent design, and roadmap work. This update shows the current build stage of each THOX device, the workflow we can demonstrate today, the work still in validation, and the next engineering gate.

Include the four-device evidence table and dated prototype clips.

### Update 2: Why small devices do not pretend to be workstations

The strongest part of the THOX.ai architecture is the boundary: each device does the work that fits its hardware, and heavier work routes to capable local hardware the user owns. This update explains identity, routing, local services, capture, and compute handoff without pretending a pocket device replaces a workstation.

Include the topology graphic and the cloud-first versus THOX table.

### Update 3: From working prototype to production

Hardware does not move directly from a render to a shipping box. This update shows the path through working prototype, DFM/DVT, pre-production/PVT, certification, production, and fulfillment. For each stage, we are sharing the evidence we have, the exit criterion, and the next risk.

Include the milestone/status table.

### Update 4: How THOX uses AI, models, and data

This update documents the AI tools and models used in the products and campaign, what is original THOX work, which sources and licenses apply, how consent and credit are handled, and what stays local versus what can use an optional connector.

Publish only after the disclosure template is fully completed and approved.

### Update 5: Meet the founders and ask us anything

Craig Ross, CEO, owns the mission, product positioning, manufacturing path, operations, and backer commitment. Tommy Xaypanya, CTO, owns the technical architecture, local-first runtime, security posture, and product demos. This update answers the most common questions directly and links to the current prototype evidence.

### Update 6: Which THOX should you choose?

Use ThoxKey for the lowest-cost entry, ThoxMini Air for a sub-$100 wireless companion, ThoxMini for local services and automations, ThoxClip for premium capture and command, or the Complete Founder Kit for the full launch family.

Include a mobile-readable reward comparison and current early-bird availability.

## Visual production list

P0 assets:

1. One real four-device hero composition or a prototype-led composite with explicit labels.
2. One 15-30 second working clip per device.
3. A four-device scale comparison in hand or beside common objects.
4. A local workflow topology graphic.
5. A cloud-first versus THOX comparison graphic.
6. A current-stage evidence table.
7. A production milestone graphic.
8. A use-of-funds graphic.
9. A reward comparison graphic optimized for mobile.
10. Founder video with correct lower thirds.

Design rules:

- Dark zinc canvas, white primary text, emerald standard accent.
- Purple only for MagStack or explicitly separated roadmap material.
- Keep generated concept visuals labeled.
- Use real prototype evidence before beauty renders.
- Reward images should focus on exactly what ships.
- Avoid tiny text embedded in graphics.
- Provide descriptive alt text and captions.
- Respect reduced motion.

## Final go/no-go checklist

- [ ] Kickstarter editor dates and $150,000 goal match every repository and website surface.
- [ ] Current launch rewards are ThoxKey, ThoxMini Air, ThoxMini, and ThoxClip.
- [ ] ThoxNova is roadmap-only and does not appear as a launch reward.
- [ ] Every device has real prototype evidence or an explicit prototype-status disclosure.
- [ ] Every concept image is labeled.
- [ ] AI disclosure contains exact tools, models, sources, licenses, consent, and credit details.
- [ ] Delivery dates are supported by operations evidence and include buffer.
- [ ] Reward contents, caps, shipping regions, and estimated dates match the editor.
- [ ] The creator profile and lower thirds use Craig Ross, CEO, and Tommy Xaypanya, CTO.
- [ ] Founder biographies contain no inferred credentials.
- [ ] Risks explain supply chain, manufacturing, certification, firmware, fulfillment, and overclaim controls.
- [ ] Plan-tab milestones reflect real evidence.
- [ ] FAQ covers device choice, capability limits, prototype status, AI/data, shipping/tax, warranty, and updates.
- [ ] Mobile Story and reward flow are tested.
- [ ] All external links and the eventual public campaign URL resolve without a preview token.
- [ ] Shared preview access is disabled or rotated after the review period.
