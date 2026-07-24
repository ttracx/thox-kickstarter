# PRESS_KIT.md

Launch press kit for the THOX.ai Kickstarter, August 12, 2026. Companion to `docs/PRESS_KIT.md` (which is the operations-facing version with embargo policy, asset list, and outlet contacts).

This file is the press-facing one-page surface: company summary, founder bios, asset locations, outreach template, embargo terms, quotable lines, and a tech-spec one-pager per launch SKU.

All bios marked as placeholder text require sign-off from the named founder. No fabricated quotes from anyone outside the founder team appear in this file.

---

## One-page company summary

THOX.ai LLC builds on-device personal AI. The runtime ships on a family of small, owned hardware that runs the model in your hands rather than in someone else's data center.

The August 12, 2026 Kickstarter launches four devices:

- **ThoxClip** (from $39) - clip-on wake-word + voice gateway that pairs to a local THOX node over BLE.
- **ThoxMini** ($69) - desktop edge compute on a Luckfox Pico Mini B; runs small instruction-tuned models locally.
- **ThoxAir** ($79) - single-node compute that clusters via the MagStack Cluster Dock; multi-node setup for multi-agent workflows.
- **ThoxNova** ($499) - flagship workstation hosting the full THOX runtime and the 7-backend ThoxCore router (LiteRT, OpenAI-compatible HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX).

Software is Apache-2.0. The full repository graph is public on `github.com/ttracx`. The runtime, the agent fleet, and the device-provisioning tooling are all shipped before launch day.

Funding goal: $250,000. Stretch goal ceiling: $3,000,000. Pledges are All-or-Nothing on Kickstarter.

---

## Founder bios (placeholder text; founders review before press receives)

### Craig Ross, CEO and Co-Founder

> *Short bio, founders to revise before press receives it.*
> Craig Ross is co-founder and CEO of THOX.ai. He leads business strategy and corporate development, fundraising and investor relations, go-to-market execution, commercial and OEM/ODM partnerships, and operations across manufacturing, fulfillment, and logistics. Craig is an inventor of record on the THOX IP portfolio.

### Tommy Xaypanya, CTO and Co-Founder

> *Short bio, founders to revise before press receives it.*
> Tommy Xaypanya is co-founder and CTO of THOX.ai. He leads all technical development, including the THOX.ai 1.0 carrier board, hardware architecture and Rust firmware, ThoxOS, MagStack magnetic clustering, the model pipeline, ThoxSDK, ThoxModels, and ThoxQu, plus IP strategy across 25 inventions in 7 domains. Tommy is an inventor of record on the THOX IP portfolio.

Both bios are intentionally short. Founders should expand them to reflect their preferred public framing before this file moves to the press surface at `thox.ai/press`.

**Corrected 2026-07-24.** The previous revision had the two role descriptions substantially inverted against https://www.thox.ai/team: it credited Craig with hardware and mechanical design and Tommy with campaign operations. The roles above now match the published team page.

The previous revision also asserted pre-THOX career history for both founders ("background spans embedded hardware, mechanical engineering, and small-batch manufacturing" and "on-device AI runtimes, agent orchestration, and edge-class hardware bring-up"). None of that is published anywhere, and it was not sourced. It has been removed rather than shipped to journalists as fact. If the founders want prior-career detail in the press kit, they should write it themselves; it should not be inferred.

---

## Asset locations

Press kit assets are not in this repository (the kickstarter playbook holds the documents; the assets live in the THOX render pipeline and the 3D-print kit repos). Until the launch press kit drops, point press at:

| Asset class | Location | Notes |
|---|---|---|
| MagStack Cluster Dock STL + 3MF plates + assembly photos | `ttracx/thox-3dprint-kit` PR #3 | Photographable today |
| ThoxMini Air v4 enclosure STL + 3MF plates | `ttracx/thox-3dprint-kit` PR #4 | Photographable today |
| Hero render placeholders | `assets/README.md` in this repo | Replace with finals after T-40 |
| THOX wordmark SVG + PNG | TBD - render pipeline drop at T-30 | On-light + on-dark variants |
| Founder portraits | TBD - shoot at T-38 to T-32 | Placeholders until photo session |
| 30-second teaser MP4 | TBD - render at T-14 to T-12 | Music-bed only, no voiceover |
| Boilerplate copy | `docs/CAMPAIGN_INFO.md` and this file's "One-page company summary" | Stable |

Full asset spec including dimensions and encodes lives in `docs/PRESS_KIT.md` ("Assets included in the press kit drop" section).

---

## Outreach template

Subject line: **THOX.ai launches a private, on-device AI hardware family on Kickstarter - August 12 (embargoed)**

Body:

> Hi [name],
>
> THOX.ai is launching the THOX device family on Kickstarter on August 12, 2026, at 9:00 AM PT. We are sharing the press kit under embargo (lifts launch day at 10:00 AM PT) because we think the cloud-AI-by-default story is worth questioning, and the four devices in this family run the inference on your hardware instead of someone else's.
>
> What we are launching: ThoxClip (from $39, clip-on voice gateway), ThoxMini ($69, desktop edge compute), ThoxAir ($79, single node + MagStack cluster), and ThoxNova ($499, flagship workstation hosting the THOX runtime).
>
> What is different: the runtime is Apache-2.0; the 7-backend router (LiteRT, OpenAI-compatible HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX) is shipping in production today on `github.com/ttracx/thoxcore`; the hardware is in our hands and on camera before launch.
>
> Funding goal: $250,000. Stretch ceiling: $3,000,000.
>
> The press kit is at [thox.ai/press, password to follow]. Founder interviews on request. Embargoed loaner units available for vetted reviewers after T-17 once EVT photo pass clears.
>
> Reply to this email and I will send you the password and an embargo confirmation.
>
> Thanks,
> Tommy Xaypanya
> Co-founder, THOX.ai
> press@thox.ai

Length cap: under 250 words for the cold-outreach version. Longer follow-up versions live in `docs/BACKER_COMMS.md`.

---

## Embargo terms

The press kit is delivered under a T-21 embargo (delivered 2026-07-22; lifts 2026-08-12 at 10:00 AM PT, one hour after the Kickstarter goes live).

Outlets that break embargo:

- Lose first-look access on future THOX campaigns.
- Forfeit the embargoed loaner unit if one was offered.
- We will not enforce in court. We will remember in private.

Outlets that hold embargo:

- Receive any pre-launch announcements first.
- Are prioritized for founder interviews during campaign week.
- Are first in line for future product loaners.

This is the same posture as `docs/PRESS_KIT.md`.

---

## Quotable lines (founder voice)

These are the lines we have approved for press use. Each is in the THOX brand voice: technical, direct, no fluff.

Attribute to the named founder. No quotes are fabricated for anyone outside the founder team.

### From Tommy Xaypanya

> "We built this because we needed it. The cloud-AI default was becoming permanent, and we wanted a way out that did not require waiting for the cloud companies to volunteer one."

> "Seven backends on one router is the unglamorous part of the work. It is also the part that lets a backer use whatever model they trust, on whatever hardware they have, without us being a gatekeeper."

> "On-device finally became fast enough. A 3B model on a postage-stamp board runs at conversation pace. We are not waiting another two years for the cloud-by-default world to lock in."

### From Craig Ross

> "Hardware honesty matters. ThoxClip cannot run a 7B model; we will not claim that it can. Every device in this family does one thing well and does not pretend to do more."

> "We picked the SoCs we picked because they are buyable in volume and supportable for years. There is no exotic part in the launch family that disappears if one vendor pivots."

Founders may revise or replace these lines before the press kit ships. Any line attributed to either founder in press coverage should match one of the approved lines above (or be sourced directly from a journalist's interview with that founder).

---

## Tech-spec one-pager per launch SKU

### ThoxClip (from $39)

| Spec | Value |
|---|---|
| Role | Clip-on wake-word + voice gateway; pairs to a local THOX node over BLE |
| Compute | Low-power MCU class; wake-word + short utterance only |
| Audio | MEMS mic; bone-conduction TTS planned at $1.5M stretch goal (per `docs/STRETCH_GOALS.md`) |
| Connectivity | BLE 5; USB-C for charge |
| Battery | 12-hour target on typical-day duty |
| Enclosure | Sealed; magnetic clip |
| Repairability | Replace-only (battery + magnetic catch tolerance) |
| Software | THOX agent runtime client; firmware-update path via paired node |
| Ship window | Q1 2027 |

### ThoxMini ($69)

| Spec | Value |
|---|---|
| Role | Desktop edge compute; runs small instruction-tuned models locally |
| SoC | Luckfox Pico Mini B (RV1103); 0.5 TOPS NPU |
| Memory | 64 MB DDR2 / 128 MB flash (SoC-level) |
| Audio | Optional MEMS mic; speaker headers exposed |
| Connectivity | USB-RNDIS over USB-C; Tailscale optional |
| Power | 5V / 3A USB-C |
| Enclosure | 3D-printed; STL on `ttracx/thox-3dprint-kit` |
| Repairability | Standard fasteners; replaceable sub-assemblies |
| Software | ThoxOS Mini, ThoxyMicro agent at `/usr/local/bin`, 14 Edge Gallery skills installed |
| Ship window | Q2 2027 |

### ThoxAir ($79)

| Spec | Value |
|---|---|
| Role | Single-node compute; clusters via MagStack Cluster Dock |
| SoC | Luckfox Pico Mini B (same as ThoxMini; ThoxMini Air adds the MagStack ring) |
| Cluster | 4 to 8 nodes per MagStack dock; single 5V/4A USB-C input feeds the stack |
| Cluster software | mDNS leader election; SQLite task queue; llama.cpp `--rpc` integration; MagStack Air firmware ships at $1M stretch goal as default |
| Power per node | 5V / 3A USB-C |
| Enclosure | 3D-printed; v4 enclosure on `ttracx/thox-3dprint-kit` PR #4 |
| Repairability | Standard fasteners; replaceable sub-assemblies |
| Software | ThoxOS Mini; A14 MagStack Coordinator agent |
| Ship window | Q2 2027 |

### ThoxNova ($499)

| Spec | Value |
|---|---|
| Role | Flagship workstation; hosts the THOX runtime + 7-backend ThoxCore router |
| Platform | LattePanda N100 (Intel x86); SYCL + Vulkan runtime paths |
| Memory | 16 GB DDR5 |
| Storage | 256 GB NVMe |
| Enclosure | Passive aluminum case |
| Connectivity | Gigabit ethernet + Wi-Fi 6; multiple USB-C |
| Power | 19V DC barrel; 65W max under load |
| Software | Full ThoxOS workstation; 7-adapter ThoxCore router; multi-agent orchestration; THOX agent fleet (A8-A14); thox-terminal SwiftUI control plane |
| Models supported | Anything llama.cpp / Ollama / vLLM / TensorRT / MLX / LiteRT can run; default loadout ships in firmware |
| Repairability | Standard fasteners; replaceable sub-assemblies; service guide published before ThoxClip ships |
| Ship window | Q2 2027 |

For the MagStack Cluster Dock (a print-kit accessory, not a launch SKU), see `ttracx/thox-3dprint-kit` PR #3.

---

## What this kit does NOT include

To be explicit, since the campaign is conservative on commitments:

- No tech specs for ThoxArm, ThoxVault, or ThoxCargo. Those appear in this campaign only as concept-art unveils at $1.5M, $2.5M, and $3M stretches.
- No claims that ThoxClip runs an LLM. It does not. It pairs to a node that does.
- No comparison to specific competitor products by name in our marketing.
- No promise of a ship date earlier than the windows listed above.
- No promise of hardware open-source for the launch SKUs.

---

## Where this lives

- Operations-facing press kit (assets, embargo policy, outlet list): `docs/PRESS_KIT.md`
- Campaign narrative: `docs/CAMPAIGN_INFO.md`
- Founder action playbook: `docs/TOMMY_ACTION_PLAYBOOK.md`
- Backer-comms cadence: `docs/BACKER_COMMS.md`

Owner: Tommy. Sign-off required from Craig on the tech-spec one-pagers before this file moves to `thox.ai/press`.
