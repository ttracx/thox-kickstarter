# STRETCH_GOALS.md

Campaign stretch goal copy for the August 12, 2026 Kickstarter, tied to the $250K baseline and $3M ceiling per the canonical campaign anchor.

This is the launch-facing stretch goal ladder; the older operations-focused stretch goal list in `docs/STRETCH_GOALS.md` is retained as a historical record but this file is the version we ship on the Kickstarter page.

Posture: conservative on shipping commitments. Stretches that name ThoxArm, ThoxVault, or ThoxCargo are concept-art unveils only, not commitments to ship those devices in 2026.

---

## $250K - Baseline production run (UNLOCKED AT GOAL)

> We make the campaign and ship every listed reward.

Everything in the rewards matrix moves to manufacturing. The four launch devices ship as listed:

- ThoxClip from $39
- ThoxMini at $69
- ThoxAir at $79
- ThoxNova at $499

Manufacturing partner selected. DVT freeze hits later in 2026. First shipments per `content/launch/MILESTONES.md` Phase 8.

What you get: the device you backed. On time. As described.

---

## $500K - THOXKey EDU bulk tier unlock + university partnerships kit

> Universities, makerspaces, and high school CS programs get a pricing tier we cannot offer to one-off backers.

Specifics:

- THOXKey EDU bulk MOQ pricing tiers finalize and open for orders of 10+ units.
- We publish a free 4-node ThoxAir + MagStack Cluster Dock teaching kit specification on `ttracx/thox-quickstart`, with lesson plans for an intro on-device-AI unit.
- The first 25 university partners on the wait list get bulk pricing locked at the launch tier for 12 months post-fulfillment.

Note: THOXKey EDU bulk pricing is a soft commitment; the exact tiers depend on what the BOM lands at after the $500K production volume comes through.

---

## $1.0M - MagStack Cluster Dock at-cost for backers + 4-node demo series

> Every backer of a ThoxAir tier gets the MagStack Cluster Dock as an at-cost add-on. We also commit to a 4-part video series showing a real 4-node ThoxAir cluster running multi-agent workflows.

Specifics:

- MagStack Cluster Dock add-on at BOM cost (currently estimated under $30 for the print kit; for fully-assembled add-on the price covers parts plus shipping only, no margin).
- Add-on appears in BackerKit at T+45 for all ThoxAir tier backers.
- The 4-part video series ships post-fulfillment:
  - Part 1: assembly walkthrough on the printed dock
  - Part 2: 2-node and 4-node leader election demo
  - Part 3: 4-node MagStack Air firmware + llama.cpp rpc cluster demo
  - Part 4: live agent orchestration across the cluster

The dock has already shipped as a print kit on `ttracx/thox-3dprint-kit` PR #3; this stretch covers the at-cost add-on and the video series.

---

## $1.5M - ThoxArm concept unveil

> Concept-only stretch goal. ThoxArm is a desktop articulated mount + carrier for ThoxClip + ThoxMini. We unveil concept art and a short concept video; we do NOT ship ThoxArm under this campaign.

Specifics:

- 6-frame concept art set published as a campaign update.
- 60-second concept motion piece showing the intended use cases.
- A spec sketch with intended dimensions, range of motion, and mount-points.

This is an unveil, not a product launch. ThoxArm has no SKU on the campaign and no ship window. We commit to publishing the concept; we do not commit to producing the device under this Kickstarter.

---

## $2.0M - ThoxNova xcframework + iOS feature parity with desktop

> The thox-terminal mobile companion reaches feature parity with the desktop control plane. Real shipped software, not a concept.

Specifics:

- ThoxCore router xcframework published for iOS + macOS via `ttracx/thox-terminal`.
- ThoxNova-to-iOS multi-agent task orchestration over the LAN.
- Push-to-talk routing from iPhone to a ThoxNova on the same network.

The xcframework CI gate already exists on `ttracx/thox-terminal` (currently blocked on a cross-repo PAT; see `docs/PULL_FORWARD_TRACKER.md`). Unblocking it is on the launch critical path regardless; this stretch goal commits us to feature parity in addition to the build.

---

## $2.5M - ThoxVault concept unveil

> Concept-only stretch goal. ThoxVault is an at-home secure storage and identity device for the THOX ecosystem. We unveil concept art and a short concept video; we do NOT ship ThoxVault under this campaign.

Specifics:

- 6-frame concept art set.
- 90-second concept motion piece.
- A spec sketch covering intended security posture (offline by default, hardware-backed identity, no cloud sync).

Same posture as ThoxArm: concept unveil only, no SKU, no ship window, no campaign commitment to manufacture.

---

## $3.0M - ThoxCargo concept + the complete THOX device family unveiled

> Ceiling stretch goal. ThoxCargo is a backpack-scale field carrier for the THOX ecosystem. We unveil concept art, a short concept video, and a single composite frame showing every THOX device in the announced family.

Specifics:

- 6-frame ThoxCargo concept art set.
- 90-second concept motion piece.
- A full-family hero render featuring ThoxClip, ThoxMini, ThoxMini Air, ThoxAir, ThoxNova, plus the three concept devices ThoxArm, ThoxVault, ThoxCargo.
- A roadmap post explaining how the announced concepts connect to the shipping products.

Same posture as the other concept stretches: this is an unveil. ThoxCargo has no SKU, no ship window, no campaign commitment to manufacture.

---

## Posture summary

| Stretch | Type | Ship commitment in this campaign |
|---|---|---|
| $250K | Baseline | Yes - all four launch devices |
| $500K | Pricing tier + lesson plan | Yes - EDU bulk + lesson plan published |
| $1M | Add-on + video series | Yes - dock at-cost + 4-part series |
| $1.5M | Concept unveil | **No** - concept art only |
| $2M | Software feature parity | Yes - xcframework + iOS parity |
| $2.5M | Concept unveil | **No** - concept art only |
| $3M | Concept unveil | **No** - concept art only |

Every "Yes" stretch goal expands the scope of what backers receive. Every "No" stretch is an artistic and roadmap deliverable, not a shipping product. Backers should expect what they pledge for; concept unveils are gifts to the campaign and the community, not new products on order.

---

## What we will not promise

To keep this campaign honest and the operations team sane:

- We will not promise ThoxArm, ThoxVault, or ThoxCargo as shipping products in 2026. If they ship, they will be their own announcements with their own dedicated launches.
- We will not promise hardware schematics open-source at launch. Software stays Apache-2.0; hardware open-source is not in scope for this campaign.
- We will not promise feature parity for backends or runtime targets we have not already shipped to production. The 7-adapter THOXCore router (LiteRT, OpenAI, Ollama, llama.cpp, vLLM, TensorRT, MLX) is already shipped and tested.
- We will not promise specific accuracy or speed numbers for bring-your-own models. Performance depends on the model, quantization, and workload.

---

## Where this lives

- Older operations-focused stretch goal list (six tiers from $500K to $3M): `docs/STRETCH_GOALS.md`
- Reward tier matrix: `docs/REWARDS_MATRIX.md`
- Campaign narrative + boilerplate: `docs/CAMPAIGN_INFO.md`
- FAQ: `docs/FAQ.md` and `content/launch/REWARDS_FAQ.md`

Owner: Tommy. Sign-off required from Craig on the BOM-cost figure for the MagStack Cluster Dock at-cost add-on at $1M.
