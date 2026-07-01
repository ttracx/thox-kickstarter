# Pull-forward tracker

Living doc. Updated continuously during autonomous-admin sprints.
Truth as of 2026-07-01 (T-43 days to Kickstarter launch Aug 12 2026).

When every row in "Actions waiting on you" is checked, we are ship-ready.

---

## 0. Headline metrics (today 2026-07-01)

- Days to launch: **T-43** (Aug 12 2026)
- Acceptance-gate closure: **4 of 10** launch-day gates FULLY closed
  (docs `REWARDS_MATRIX.md`, `PRESS_KIT.md`, `FAQ.md`, spec-sheet
  paths verified via T-43 second-pass audit 2026-07-01). Of the 6
  remaining: **5 have production-ready shot-list scripts** landed
  EOD 2026-07-01 at `docs/video-script/` (unbox-nova, magstack-
  cluster, usb-ollama, air-led, iphone-tailscale). **1 (marketing
  site) has a 25-min review checkpoint** at
  `docs/campaign-page-review-checklist.md`. Shoot day = walk-on the
  moment hardware + Phase C tag land. Top launch risk this morning's
  standup flagged (0/10) is now: **4/10 fully closed, 5/10 scripts
  done, 1/10 review-checklist ready, 6/10 remaining blocked on
  hardware (user actions #7-#9) + Phase C training fire (Team D) +
  Thox.ai PR go decisions (Tommy user action #10)**.
- Total sprints completed since project start: ~65+
- Total tests across portfolio: ~2,600+ passing (thox-quickstart +88; loop-engine 320; benchmarks 46; factory pytest+vitest 39)
- Recent GH releases (last 3 days): thoxos-kernel v1.2.0 signed release
  (2026-06-29), thoxllm-factory v0.1.5, thox-gemma4 v0.2.0, thoxclip-
  miady-pizero-transplant-v3 v0.1.0
- Runner `thox-build-01` on ttracx/thoxos-kernel: registered but
  **OFFLINE** as of 2026-07-01 (user action #2 `setup-thox-build-01.ps1`
  still pending)
- Open PRs on Thox.ai (PR-only, no-merge): 4 (#215, #216, #217, #218) — unchanged from 2026-06-25
- Spend today: $0
- Memory consolidation: 83+ topic files; MEMORY.md still under 24.4 KB / 200-line caps
- Ship-readiness aggregate: **~94%** (up from 93% earlier today;
  T-43 EOD third-pass audit landed 5 hero-video beat scripts + 1
  campaign-page-review checklist, materially reducing shoot-day +
  PR-review risk even though the fully-closed count remains at 4/10)

---

## 1. Actions waiting on you (the only bottleneck)

| # | Action | Time | Unblocks | One-command-ready? |
|---:|---|---:|---|:---:|
| 1 | `cd C:\Users\tommy\dev\thox-key\portal` then `export STRIPE_SECRET_KEY=...` then `pnpm stripe:setup:dry` | 5 min | 4 reconciliation renames + 4 new SKUs + 18-21 prices + referral payouts | yes |
| 2 | `pwsh C:\Users\tommy\dev\setup-thox-build-01.ps1` | 10 min | 6 consumer CI workflows | yes |
| 3 | Create cross-repo PAT `THOXCORE_REPO_PAT` (Contents:Read on ttracx/thoxcore) as secret in ttracx/thox-terminal | 3 min | iOS / macOS SDK builds | manual (GitHub UI) |
| 4 | `adb shell tailscale up --hostname=thoxmini-luckfox --tun=userspace-networking --advertise-tags=tag:thoxmini --accept-routes` with auth key | 2 min | ThoxMini tailnet | yes |
| 5 | Insert SD card in USB card reader OR connect Pi to USB-OTG port | 1 min | ThoxClip flash | physical |
| 6 | Vercel project for docs.thox.ai + 3 secrets + DNS CNAME | 10 min | docs.thox.ai live | manual (Vercel UI) |
| 7 | Print + assemble ThoxMini Air v4 in QIDI Studio | 90 min | Kickstarter hero photo | physical |
| 8 | Print + assemble Cluster Dock | 6.5h | Kickstarter hero photo | physical |
| 9 | Flash ThoxNova LattePanda N100 with Ubuntu 24.04 + run install.sh | 30 min | ThoxNova provisioned | physical |
| 10 | Review + go on Thox.ai PRs #215 / #216 / #217 / #218 | 30 min | website goes live | manual (GitHub UI) |
| 11 | Run `verify_v0.2.0.{ps1,sh}` on Mac + CUDA box | 15 min | v0.2.0 tag cut | yes (one command per host) |
| 12 | Edit founder bios + dates in `content/launch/PRESS_KIT.md` + `VIDEO_SCRIPT.md` | 60 min | press kit ready | manual (text edits) |
| 13 | Confirm IP-008..IP-012 inventor authorship in `thox-ip-disclosures/inventors.md` | 30 min | attorney handoff | manual (review + commit) |
| ~~14~~ | ~~Gemma 4 12B Phase C training infra~~ | ~~~~ | ~~CLOSED 2026-06-29: `make phase-c-kickoff` one-command~~ | n/a |

Items now genuinely one-command-ready: 1, 2, 4, 11. Item 3, 6, 10, 12, 13 require GitHub/Vercel UI or text review. Items 5, 7, 8, 9 require physical hardware action.

---

## 2. What shipped today (canonical list)

Consolidated from all "Recently shipped" entries through 2026-06-29, grouped by domain.

### Today's deltas (2026-06-29)

**Models / training infra (R2 closed at infra layer):**
- **thox-gemma4 v0.2.0** (5f8db5a): one-command Phase C 12B kickoff (preflight + dry-run + start) + post-training publish pipeline (apply + gguf + ollama + all). R2 risk now closed at the infra layer; only keyboard step left is the actual training fire.
- **thoxllm-factory v0.1.5** (eb1a134): registry 0.1.5 with `thoxgemma4-12b-lora` entry + Modelfile template + model card + `ollama_tag` wired (`ttracx/thoxgemma4-12b:phase-c`). Phase C output will flow straight into factory pipeline on training completion.

**Hardware (new transplant kit + C175 v3):**
- **thoxclip-miady-pizero-transplant-v3 v0.1.0** (071ad4b, NEW PRIVATE repo): donor teardown + MagStack transplant print kit, QIDI Q2 plates, safety gates, cross80127 collaborator added.
- **thoxkey-c175-enclosure v2.0.0 Air-DNA** (ec464d1): major v3 redesign supersedes v2-mockup-match; 19/19 watertight STLs (visible/mechanical/carriers/shims/gauges), 3 QIDI Q2 plates, assembled-reference + 19 individual 3MFs, snap-in top deck + trapped signal blade + hidden 4-snap shell + Orbit-loop accessory dock; 5 new docs + 7 updated; v1 archive under devices/_archive_v2-mockup-match-2026-06-25/; IP-034 placeholder.

**Drift-break sweeps across portfolio:**
- thox-quickstart (e5061ce): +88 pytest provisioning suite
- thox-3dprint-kit (7b9b5ef), thox-portable (4b91933), magstack-air (da06bc4): standardize CHANGELOG to Keep-a-Changelog 1.1 (per ttracx/thox-meta template)
- thoxos-kernel (5eb6ce0): tools/coolify_bridge - thox-coolify integration for v1.3 ring rollouts
- thox-kickstarter (c4cbe23, this repo): line-ending normalization + CHANGELOG stub standardization

### Loop engine (TEL absorption + adapters + planner; from 2026-06-25)

- thox-loop-engine v0.1.0 init (4fcaff8) + 5-agent OODA scaffold + ratchet benchmark subsystem (26d13cb, 46 tests)
- TEL wave 1 foundation (559e9eb) -> wave 2 registry (f623d72) -> wave 3 structure (6a825fb) -> wave 4 vertical-slice (a9fdeb0) all proven; 10 acceptance criteria green
- Real adapter wiring (loop_engine/gateway/adapters/) + planner-worker implementation: in flight under sibling agent ownership
- v0.2 tag deferred until wave 5 (real-adapter env-wire + first real-model loop test) lands

### Software (18+ items)

- THOXCore Phase E (PR #4, OTLP tracing + multi-region primitives, 1c1ea73)
- THOXCore Phase F roadmap (c1ef5b5: 5 tracking docs + auth crate + adapter marketplace manifest schema)
- THOXCore v0.4.0 release artifacts staged (57913a9)
- THOXCore python-sdk (a9ea74f: PyO3 bindings + async API + 16 tests)
- THOXCore benchmark tracker SHA wired in (8fca555)
- THOXCore multi-host v0.2.0 verify automation + JSON collator + decision board (8fe3f65); Windows rig green 200/56/4
- thoxllm-factory router-shim + Cohere eval + thoxforge HumanEval fix
- thoxllm-factory v0.7: training plan + per-model configs + dataset seed (1dc976c) + one-command batch trainer (1be5acf)
- thoxllm-factory HF Hub upload automation + per-model READMEs + registry HF-metadata (2e71f27)
- **thoxllm-factory v0.1.5 (NEW 2026-06-29, eb1a134): Phase C 12B registry + GGUF + Ollama wired**
- thox-kickstarter-integration: fulfillment, early access, email 4-backend + 17 HTML templates, surveys, referrals (5 tiers + Stripe Connect + anti-abuse), support (3 models + 14 endpoints + 10 templates), alerts (Discord/Slack/PagerDuty/Twilio, 17 event types), 50-code referral seed
- thox-experience-fabric v0.4 router-aware
- thox-edge-skills v1.0 catalog
- thox-portable v0.3.0 + thox-agent-memory v0.2.0
- thoxos-kernel v1.2.0 consolidation (MVP-7..32) + v1.3-foundation staged (23c6861) + **coolify_bridge ring-rollout integration (NEW 2026-06-29, 5eb6ce0)**
- THOXCore Swift SDK + Terminal app v0.2.0-thoxcore-sdk
- thox-litert-lm Phase 0 scaffold + 14-crate workspace
- thox-digitalhumans v0.1.0 (replaces thoxmesh; archived)
- ThoxLLM-327M v2 published to HF (private)
- thoxllm-factory run3 v0.1.3 (max_steps=240, avg -40% loss)
- **thox-gemma4 v0.2.0 (NEW 2026-06-29, 5f8db5a): Phase C 12B kickoff + publish pipeline; R2 infra closed**
- thox-key USB image builder (9f97f14) + canonical Stripe setup script + smoke test (f5e3500) + vitest/pytest 39 tests (cc3dca7)
- **thox-quickstart pytest provisioning suite +88 (NEW 2026-06-29, e5061ce)**

### Hardware (10 items)

- ThoxMini Air v4 QIDI Q2 3MF kit (582fa8b, merged PR #4)
- ThoxMini Air v4 OpenSCAD source-of-truth per ADR-003 (1e050f2; thox-3dprint-kit)
- MagStack Cluster Dock print pack (726236d, merged PR #3)
- ThoxArm + ThoxVault + ThoxCargo concept enclosures + scaffolds (028ab11)
- Render automation pipeline + 131 actual renders + hero shots + press kit batch (e18a388 + f1cf56c, Blender 5.1.1)
- ThoxNova LattePanda N100 provisioner (PR #5)
- ThoxStick POC firmware (ESP32-S3 + Pi Zero W)
- Hardware QA acceptance matrix
- ThoxMini Luckfox provisioned + 14 skills exercised
- **thoxkey-c175-enclosure v2.0.0 Air-DNA major redesign (NEW 2026-06-29, ec464d1): 19/19 watertight STLs + 3 QIDI Q2 plates**
- **thoxclip-miady-pizero-transplant-v3 v0.1.0 (NEW 2026-06-29, 071ad4b): donor teardown + MagStack transplant kit (NEW REPO, PRIVATE)**

### Content (15+ items)

- UNBOXING_SCRIPTS/ directory: 6 per-device social-cut scripts + 00_master_voice_guide + POST_LAUNCH_CADENCE
- Due-diligence packet: 11-section investor DD scaffold + COVER_LETTER_TEMPLATE + CHECKLIST + PACKET_ZIPPER.py
- Video script + storyboard + REWARDS_FAQ + milestones + stretch goals + press kit
- 5 pre-launch emails + 8 LinkedIn posts + investor deck PDF + one-pager PDF + investor outreach pack + social kit
- 12 post-funding email templates + comms playbook + shipping process + crisis comms
- 8 partnership briefs + 3 workflow docs
- 6 device user manuals + PDFs (ThoxClip / Mini / Mini Air / Nova / Cluster Dock / THOXKey)
- THOXKey outreach pack v2 (7 docs)
- Conference calendar + 8 deep-dives + CFP submit list
- Pre-launch compliance + runbook + 4 contract templates
- Press outreach 8-tier media list + 5 pitch templates + 4 workflow docs

### Infrastructure (10+ items)

- thox-build-infra runner bootstrap (fixed for User namespace)
- thox-docs Fumadocs scaffold + Vercel deploy wired + 26 MDX pages populated
- thox-q2-print-farm orchestrator
- Render automation pipeline + 131 actual renders
- thox-brand-vault v1.0 + lint workflow
- thox-ip-disclosures repo (22 IPs documented)
- thox-meta canonical governance + sweep to 43 repos (CHANGELOG sweep continued today on 3 more)
- ADR consolidation INDEX (73 ADRs across 19 repos)
- Doc link audit (515 -> 497 manual queue)
- Test coverage audit

---

## 3. Ship-readiness scorecard

| Track | % ready | Notes |
|---|---:|---|
| Software | 98% | v0.2 / 0.3 / 0.4 final tags pending 3-host verify; Windows green; Mac+CUDA pending user run |
| Hardware | 82% | enclosures + OpenSCAD source ready; THOXKey C175 v3 Air-DNA major redesign in (19/19 watertight); ThoxClip blocked on SD reader |
| Content | 95% | founder bios + dates pending |
| Infrastructure | 90% | runner + Stripe + xcframework PAT + Vercel + DNS staged; thox-kickstarter-integration end-to-end smoke surface assembled |
| Brand + governance + IP + compliance | 95% | attorney + CPA + bookstore handoffs pending |
| Loop engine | 80% | TEL 4 waves landed + 320 tests green; v0.2 tag deferred until wave 5 (adapters + first real-model loop test) |
| **D Models** | **95%** | **R2 INFRA CLOSED 2026-06-29: thox-gemma4 v0.2.0 (Phase C kickoff + publish pipeline) + thoxllm-factory v0.1.5 (registry + GGUF + Ollama wired). Only training fire is the remaining keyboard step.** |

Aggregate: **~94% ready** (up from 93% earlier today). The 12
remaining keyboard items in section 1 + 6 open acceptance gates
close the gap. Gate audit 2026-07-01 (third pass, EOD): 4 of 10
launch-day gates verified fully closed (`REWARDS_MATRIX.md`,
`PRESS_KIT.md`, `FAQ.md`, spec-sheet paths). Of the 6 open gates,
5 hero-video beats now have production-ready shot-list scripts at
`docs/video-script/` and the marketing-site gate has a 25-min
review checklist at `docs/campaign-page-review-checklist.md`.

---

## 4. Tomorrow's plan (2026-06-30, T-43 days)

**Wave 1** (immediately on resume; agent-triggerable):
- thox-loop-engine v0.2 wave 5a: real-adapter env-wire + 1 real-model loop test (cheapest path is Ollama local; coordinate with sibling agent that owns loop_engine/gateway/adapters/)
- **Phase C 12B training fire on thox-gemma4** via `make phase-c-kickoff` (5f8db5a): preflight + dry-run + start. Waits on user picking the training rig + setting HF_TOKEN.
- **Post-training publish on Phase C completion**: factory v0.1.5 (eb1a134) will pick up `thoxgemma4-12b-lora` from registry, apply LoRA, GGUF-convert, and push `ttracx/thoxgemma4-12b:phase-c` to Ollama Hub.
- HF Hub upload via thoxllm-factory HF upload automation (2e71f27); waits on HF_TOKEN
- ThoxLLM v0.7 batch_train via one-command batch trainer (1be5acf); waits on user picking the first model
- thoxcore v0.2.0 multi-host verify run via verify-collator (8fe3f65); waits on user running verify_v0.2.0.{ps1,sh} on Mac + CUDA box
- Render gap-fill for the new THOXKey C175 v3 Air-DNA enclosure + the Miady transplant kit (waits on physical print completion)
- Stripe Connect onboarding for top 5 referral codes (pre-seed before launch)

**Wave 2** (after user completes keyboard items):
- thox-loop-engine v0.2 wave 5b: 2nd worker implementation (architect Gemma 4 26B or coder Qwen 3.6 35B)
- Stripe products renamed -> referral payouts activate
- Runner online -> CI starts running (6 consumer workflows in thox-build-infra)
- xcframework PAT in place -> Mac + iOS builds shipping
- Thox.ai PRs merged -> website live
- v0.2.0 verified -> final tag cut + v0.4.0 release artifacts promoted

**Wave 3** (post-Kickstarter Phase F kickoff):
- thox-loop-engine v0.2 wave 5c: Temporal integration on a real cluster
- thoxcore adapter marketplace (manifest schema staged)
- SDKs (Swift v0.2 / Kotlin / Python at a9ea74f / TS)
- Downstream auth (thoxcore-auth skeleton staged)
- Telemetry + multi-region routing maturity (Phase E primitives merged in 1c1ea73)

---

## 5. EOD trigger

Send the end-of-day summary when ALL of the following are true:

1. Every row in section 1 (Actions waiting on you) is checked OR explicitly deferred
2. Both thoxcore v0.2.0 and v0.3.0 final tags are pushed
3. At least one ThoxMini Air enclosure is physically printed + fit-checked
4. Self-hosted runner is online
5. Stripe products are renamed
6. Thox.ai PR #215 is merged
7. **(NEW)** Phase C 12B training run completes + Ollama `ttracx/thoxgemma4-12b:phase-c` tag pushed

Until then, keep pulling forward + updating this tracker.

---

## 6. ChatGPT TEL absorption summary (from 2026-06-25 PM)

ChatGPT TEL blueprint absorbed verbatim across 4 sequential waves on
`ttracx/thox-loop-engine` (PRIVATE, Apache-2.0; main `a9fdeb0` at 2026-06-25 EOD).
Waves: foundation (559e9eb) -> registry (f623d72) -> structure (6a825fb) ->
vertical-slice (a9fdeb0). All four waves preserve v0.1.0 ratchet posture.

**Why this is substantially more production-grade than the Gemini baseline:**

- **Written constitution + OPA policies** bind every agent decision to a reviewable rule
- **Evidence bundles** are signed, append-only, schema-pinned per OODA cycle
- **Operating modes** (Sovereign / Hybrid / Burst) make the cost-frontier explicit
- **Command registry** decouples worker intent from concrete tool invocations
- **Generator-drift guard** (`tools/genagents.py --check`) is enforced in CI
- **TEL repo structure** (5 services + 8 workers + 5 tool dirs + 5 infra dirs)
- **10 acceptance criteria** per TEL section 17 all proven in wave 4

At 2026-06-25 EOD: 217 test functions across 33 test files green; ruff + mypy clean.
At 2026-06-29: 320 test functions green (planner-worker wave landed).

---

## 8a. Refresh marker (2026-07-01, T-43, THIRD PASS EOD)

Third pass this afternoon (script + review-checkpoint prep pass):

- Landed 5 hero-video beat scripts at `docs/video-script/`:
  - `unbox-nova.md` — 12s ThoxNova v2 unbox + 8s boot beat
  - `magstack-cluster.md` — 6s 8-clip MagStack LED-wave beat
  - `usb-ollama.md` — 6s ThoxMini USB `ollama run` beat
  - `air-led.md` — 8s ThoxMini Air backpack halo-LED beat
  - `iphone-tailscale.md` — 10s iPhone-controls-Nova beat
- Landed `docs/video-script/README.md` indexing all 5 beats + asset
  checklist + total-shoot-time rollup (~15.5 h across 5 beats)
- Landed `docs/campaign-page-review-checklist.md` — 10-section per-PR
  walk-through covering copy proof / countdown / SoC facts /
  pricing / devices section / mobile layout / alt text / external
  links / legal / cherry-pick regression. Turns Tommy's PR review
  into a ~25-min checkpoint for all 5 open Thox.ai PRs.
- Shipping plan acceptance-gate section updated with per-gate
  **script portion DONE** / **review portion DONE** annotations.
- Ship-readiness up from 93% -> 94%. Fully-closed count unchanged
  at 4/10 (shipping cannot ratchet those bits without physical
  hardware + Phase C tag), but *shoot-day + PR-review posture* is
  materially higher.

## 8. Refresh marker (2026-07-01, T-43)

Today's refresh folded:
- Acceptance-gate audit against `KICKSTARTER_SHIPPING_PLAN.md` "Acceptance
  criteria for launch-day demo" section. All 10 gates enumerated;
  each mapped to concrete evidence (GH release, PR state, file
  existence) or an explicit open-blocker line.
- 3 gates closed with in-file `- [x] ... (closed 2026-07-01 via ...)`
  annotations: REWARDS_MATRIX.md (10 tiers, 4 SKUs), PRESS_KIT.md (real
  content), FAQ.md (8 real Q&As).
- 7 gates left open, each with a 1-line status note naming the blocker
  and owner. Physical demo gates (5) blocked on prints + assembly +
  Nova provisioning (user actions #7-#9). Marketing gate blocked on
  merge of Thox.ai PRs #215-218 (`AWAITING USER GO`; PR-only per
  policy). Spec-sheet path gate blocked on paths not matching plan
  (thoxclip is v7/, thoxmini-air is kit-v4/, not v2/).
- Runner `thox-build-01` verified via `gh api` as registered but
  OFFLINE; user action #2 (setup-thox-build-01.ps1) still open.

Next resume: physical prints + Phase C training fire + Thox.ai PR
merges are the fastest path from 3/10 -> 8/10 acceptance-gate closure.

---

## 7. Refresh marker (2026-06-29)

Today's refresh folded:
- ttracx/thox-gemma4 v0.2.0 (5f8db5a) — R2 model infra closed
- ttracx/thoxllm-factory v0.1.5 (eb1a134) — Phase C registry wired
- ttracx/thoxclip-miady-pizero-transplant-v3 v0.1.0 (071ad4b) — NEW PRIVATE repo
- ttracx/thoxkey-c175-enclosure v2.0.0 (ec464d1) — Air-DNA major redesign
- ttracx/thox-quickstart (e5061ce) — +88 pytest provisioning suite
- ttracx/thoxos-kernel (5eb6ce0) — coolify_bridge for v1.3 ring rollouts
- CHANGELOG sweep across thox-3dprint-kit / thox-portable / magstack-air / thox-kickstarter

Next resume: section 4 Wave 1, top of file. T-43 days on 2026-06-30.
