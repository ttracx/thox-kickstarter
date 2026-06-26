# Pull-forward tracker

Living doc. Updated continuously during autonomous-admin sprints.
Truth as of 2026-06-25 (FINAL EOD FREEZE v2 - canonical for next-day resume).

When every row in "Actions waiting on you" is checked, we are ship-ready for Aug 12 2026 (T-48 days).

---

## 0. Headline metrics (today 2026-06-25 FINAL v2)

- Total sprints completed: ~60+
- Total tests across portfolio: ~2,500+ passing (thox-loop-engine alone: 217 test fns across 33 files green; benchmarks 46/46; ratchet + foundation + registry + structure + vertical-slice waves all green)
- New repos created today: 8 (thox-build-infra, thox-docs, thox-q2-print-farm, thox-brand-vault, thox-ip-disclosures, thox-meta, thox-kickstarter-integration, thox-loop-engine)
- New release tags cut: 12+ across portfolio
- Lines of code and docs added: tens of thousands
- Open PRs on Thox.ai (PR-only, no-merge): 4 (#215, #216, #217, #218)
- Total commits across portfolio today: ~220+
- Spend today: $0
- Memory consolidation: 82 topic files (20 added across session); MEMORY.md 14.76 KB / 118 lines (well under 24.4 KB / 200-line caps); cross-links resolve
- Ship-readiness aggregate: ~90%; 13 keyboard items in section 1 close the gap

---

## 1. Actions waiting on you (the only bottleneck)

| # | Action | Time | Unblocks |
|---:|---|---:|---|
| 1 | `cd C:\Users\tommy\dev\thox-key\portal` then `export STRIPE_SECRET_KEY=...` then `pnpm stripe:setup:dry` | 5 min | 4 reconciliation renames + 4 new SKUs + 18-21 prices + referral payouts |
| 2 | `pwsh C:\Users\tommy\dev\setup-thox-build-01.ps1` | 10 min | 6 consumer CI workflows |
| 3 | Create cross-repo PAT `THOXCORE_REPO_PAT` (Contents:Read on ttracx/thoxcore) as secret in ttracx/thox-terminal | 3 min | iOS / macOS SDK builds |
| 4 | `adb shell tailscale up --hostname=thoxmini-luckfox --tun=userspace-networking --advertise-tags=tag:thoxmini --accept-routes` with auth key | 2 min | ThoxMini tailnet |
| 5 | Insert SD card in USB card reader OR connect Pi to USB-OTG port | 1 min | ThoxClip flash |
| 6 | Vercel project for docs.thox.ai + 3 secrets + DNS CNAME | 10 min | docs.thox.ai live |
| 7 | Print + assemble ThoxMini Air v4 in QIDI Studio | 90 min | Kickstarter hero photo |
| 8 | Print + assemble Cluster Dock | 6.5h | Kickstarter hero photo |
| 9 | Flash ThoxNova LattePanda N100 with Ubuntu 24.04 + run install.sh | 30 min | ThoxNova provisioned |
| 10 | Review + go on Thox.ai PRs #215 / #216 / #217 / #218 | 30 min | website goes live |
| 11 | Run `verify_v0.2.0.{ps1,sh}` on Mac + CUDA box | 15 min | v0.2.0 tag cut |
| 12 | Edit founder bios + dates in `content/launch/PRESS_KIT.md` + `VIDEO_SCRIPT.md` | 60 min | press kit ready |
| 13 | Confirm IP-008..IP-012 inventor authorship in `thox-ip-disclosures/inventors.md` | 30 min | attorney handoff |

---

## 2. What shipped today (canonical list)

Consolidated from all "Recently shipped" entries through 2026-06-25, grouped by domain.

### Loop engine (TEL absorption + adapters + planner; NEW today)

- thox-loop-engine v0.1.0 init (4fcaff8) + 5-agent OODA scaffold + ratchet benchmark subsystem (26d13cb, 46 tests)
- TEL wave 1 foundation (559e9eb): constitution + OPA policies + evidence bundles + risk tiers
- TEL wave 2 registry (f623d72): TEL models.yaml + loop.yaml + command-registry + Sovereign/Hybrid/Burst operating modes + gateway
- TEL wave 3 structure (6a825fb): TEL repository structure (5 services + 8 workers + 5 tool dirs + 5 infra dirs) + 3 living docs (ecosystem_map / mvp_catalog / development_queue) + AGENTS+CLAUDE generators with `--check` drift guard wired in CI
- TEL wave 4 vertical-slice (a9fdeb0): TEL section 17 end-to-end + 10 acceptance criteria proven (constitution load, policy eval, evidence bundle emission, command-registry routing, sovereign-mode fallback, ratchet-only mutation, sledgehammer trip, DAG planner topo, structured eval rubric, generator-drift guard)
- Real adapter wiring (loop_engine/gateway/adapters/) + planner-worker implementation: in flight under sibling agent ownership; do not collide on those paths
- v0.2 tag deferred until wave 5 (real-adapter env-wire + first real-model loop test) lands

### Software (18+ items)

- THOXCore Phase E (PR #4, OTLP tracing + multi-region primitives, 1c1ea73)
- THOXCore Phase F roadmap (c1ef5b5: 5 tracking docs + auth crate + adapter marketplace manifest schema)
- THOXCore v0.4.0 release artifacts staged (57913a9)
- THOXCore python-sdk (a9ea74f: PyO3 bindings + async API + 16 tests)
- THOXCore benchmark tracker SHA wired in (8fca555)
- THOXCore multi-host v0.2.0 verify automation + JSON collator + decision board (8fe3f65); Windows rig green 200/56/4 at e4d2f95
- thoxllm-factory router-shim + Cohere eval + thoxforge HumanEval fix
- thoxllm-factory v0.7: training plan + per-model configs + dataset seed (1dc976c) + one-command batch trainer for 6 shipping models (1be5acf)
- thoxllm-factory HF Hub upload automation + per-model READMEs + registry HF-metadata (2e71f27)
- thox-kickstarter-integration: fulfillment, early access, email 4-backend + 17 HTML templates, surveys, referrals (5 tiers + Stripe Connect + anti-abuse), support (3 models + 14 endpoints + 10 templates), alerts (Discord/Slack/PagerDuty/Twilio, 17 event types), 50-code referral seed
- thox-experience-fabric v0.4 router-aware
- thox-edge-skills v1.0 catalog
- thox-portable v0.3.0 + thox-agent-memory v0.2.0
- thoxos-kernel v1.2.0 consolidation (MVP-7..32) + v1.3-foundation staged (23c6861: roadmap + KMS abstraction + ring-rollout schema)
- THOXCore Swift SDK + Terminal app v0.2.0-thoxcore-sdk
- thox-litert-lm Phase 0 scaffold + 14-crate workspace
- thox-digitalhumans v0.1.0 (replaces thoxmesh; archived)
- ThoxLLM-327M v2 published to HF (private)
- thoxllm-factory run3 v0.1.3 (max_steps=240, avg -40% loss)
- thox-key USB image builder (9f97f14: build_image.py + 5 tier loadouts + per-OS launchers + duplicator batch + welcome page) + canonical Stripe setup script + smoke test (f5e3500) + vitest/pytest 39 tests (cc3dca7)

### Hardware (8 items)

- ThoxMini Air v4 QIDI Q2 3MF kit (582fa8b, merged PR #4)
- ThoxMini Air v4 OpenSCAD source-of-truth per ADR-003 (1e050f2; thox-3dprint-kit)
- MagStack Cluster Dock print pack (726236d, merged PR #3)
- ThoxArm + ThoxVault + ThoxCargo concept enclosures + scaffolds (028ab11)
- Render automation pipeline + 131 actual renders + hero shots + press kit batch (e18a388 + f1cf56c, Blender 5.1.1)
- ThoxNova LattePanda N100 provisioner (PR #5)
- ThoxStick POC firmware (ESP32-S3 + Pi Zero W)
- Hardware QA acceptance matrix
- ThoxMini Luckfox provisioned + 14 skills exercised

### Content (15+ items)

- UNBOXING_SCRIPTS/ directory: 6 per-device social-cut scripts + 00_master_voice_guide + POST_LAUNCH_CADENCE (T-28 to T+30) + README with pre/post checklists and founder quality gate
- Due-diligence packet (content/dd/): 11-section investor DD scaffold + README + COVER_LETTER_TEMPLATE + CHECKLIST + PACKET_ZIPPER.py
- Video script + storyboard + REWARDS_FAQ + milestones + stretch goals + press kit
- 5 pre-launch emails + 8 LinkedIn posts + investor deck PDF + one-pager PDF + investor outreach pack + social kit
- 12 post-funding email templates + comms playbook + shipping process + crisis comms
- 8 partnership briefs + 3 workflow docs
- 6 device user manuals + PDFs (ThoxClip / Mini / Mini Air / Nova / Cluster Dock / THOXKey)
- THOXKey outreach pack v2 (7 docs)
- Conference calendar + 8 deep-dives + CFP submit list
- Pre-launch compliance + runbook + 4 contract templates (NDA / Vendor / EDU Pricing / Waiver)
- Press outreach 8-tier media list + 5 pitch templates + 4 workflow docs

### Infrastructure (10+ items)

- thox-build-infra runner bootstrap (fixed for User namespace)
- thox-docs Fumadocs scaffold + Vercel deploy wired + 26 MDX pages populated
- thox-q2-print-farm orchestrator
- Render automation pipeline + 131 actual renders
- thox-brand-vault v1.0 + lint workflow
- thox-ip-disclosures repo (22 IPs documented)
- thox-meta canonical governance + sweep to 43 repos
- ADR consolidation INDEX (73 ADRs across 19 repos)
- Doc link audit (515 -> 497 manual queue)
- Test coverage audit

---

## 3. Ship-readiness scorecard

| Track | % ready | Notes |
|---|---:|---|
| Software | 98% | v0.2 / 0.3 / 0.4 final tags pending 3-host verify; verify-collator (8fe3f65) green on Windows; Mac+CUDA pending user run |
| Hardware | 78% | enclosures ready to print + OpenSCAD source-of-truth in place; ThoxClip blocked on SD reader |
| Content | 95% | founder bios + dates pending |
| Infrastructure | 88% | runner + Stripe + xcframework PAT + Vercel + DNS staged; thox-kickstarter-integration end-to-end smoke surface assembled (dry-run by default) |
| Brand + governance + IP + compliance | 95% | attorney + CPA + bookstore handoffs pending |
| Loop engine (NEW) | 80% | TEL 4 waves landed + 217 tests green; v0.2 tag deferred until adapters + first real-model loop test land in wave 5 |

Aggregate: ~90% ready. The 13 keyboard items in section 1 close the gap.

---

## 4. Tomorrow's plan (when you say "keep going")

**Wave 1** (immediately on resume; agent-triggerable the moment user sets the relevant env):
- thox-loop-engine v0.2 wave 5a: real-adapter env-wire + 1 real-model loop test (cheapest path is Ollama local; coordinate with sibling agent that owns loop_engine/gateway/adapters/)
- HF Hub upload via thoxllm-factory HF upload automation (2e71f27); waits on user setting HF_TOKEN
- ThoxLLM v0.7 batch_train via one-command batch trainer (1be5acf); waits on user picking the first model
- thoxcore v0.2.0 multi-host verify run via verify-collator (8fe3f65); waits on user running verify_v0.2.0.{ps1,sh} on Mac + CUDA box (Windows already green)
- Render gap-fill for any newly-printed enclosure (waits on physical print completion)
- Stripe Connect onboarding for top 5 referral codes (pre-seed before launch)

**Wave 2** (after user completes keyboard items overnight):
- thox-loop-engine v0.2 wave 5b: 2nd worker implementation (architect Gemma 4 26B or coder Qwen 3.6 35B, whichever proves model-routing path first)
- Stripe products renamed -> referral payouts activate
- Runner online -> CI starts running (6 consumer workflows in thox-build-infra)
- xcframework PAT in place -> Mac + iOS builds shipping
- Thox.ai PRs merged -> website live
- v0.2.0 verified -> final tag cut + v0.4.0 release artifacts (57913a9) promoted

**Wave 3** (post-Kickstarter Phase F kickoff; scaffolds already in c1ef5b5):
- thox-loop-engine v0.2 wave 5c: Temporal integration on a real cluster (currently compose-only); promote planner from in-process to worker-backed
- thoxcore adapter marketplace (manifest schema staged)
- SDKs (Swift in v0.2 / Kotlin / Python python-sdk already at a9ea74f / TS)
- Downstream auth (thoxcore-auth skeleton already staged)
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

Until then, keep pulling forward + updating this tracker.

---

## 6. ChatGPT TEL absorption summary (NEW 2026-06-25 PM)

ChatGPT TEL blueprint absorbed verbatim across 4 sequential waves on
`ttracx/thox-loop-engine` (PRIVATE, Apache-2.0; main `a9fdeb0` at EOD).
Waves: foundation (559e9eb) -> registry (f623d72) -> structure (6a825fb) ->
vertical-slice (a9fdeb0). All four waves preserve v0.1.0 ratchet posture
(no force-push, no main-branch rewrite, every mutation through the
schemas/agent_mutation.schema.json gate).

**Why this is substantially more production-grade than the Gemini baseline:**

- **Written constitution + OPA policies** bind every agent decision to a
  reviewable rule, vs the Gemini baseline's ad-hoc prompt-side gates.
- **Evidence bundles** are signed, append-only, schema-pinned per OODA cycle;
  every decision has a reconstructible audit trail.
- **Operating modes** (Sovereign / Hybrid / Burst) make the cost-frontier
  explicit and let the gateway fall back deterministically when a tier
  fails, vs the baseline's silent fallback.
- **Command registry** decouples worker intent from concrete tool
  invocations so a worker says "run-tests" not "execute pytest -x".
- **Generator-drift guard** (`tools/genagents.py --check`) is enforced in CI
  so AGENTS.md (Codex) and CLAUDE.md (Claude Code) cannot drift from
  `.thox/constitution.md` + `.thox/loop.yaml` + `.thox/models.yaml`.
- **TEL repo structure** (5 services + 8 workers + 5 tool dirs + 5 infra
  dirs) per TEL section 9; ready for incremental sibling fill-in, not a
  big-bang rewrite.
- **10 acceptance criteria** per TEL section 17 all proven in wave 4 with
  stubbed model backends. Wave 5 promotes to real backends.

At EOD: 217 test functions across 33 test files green; ruff + mypy clean;
3 living docs (ecosystem_map + mvp_catalog with 6 TEL-MVP-NNN priorities
scored + development_queue with 56 TEL-NNN items split P0/P1/P2/P3) +
2 ADRs + 2 runbooks + 1 STRIDE threat model + compose stack
(Postgres + Temporal + OPA + MinIO + 5 services + 8 workers).

---

## 7. EOD freeze marker (2026-06-25 v2)

This document + `docs/EOD_2026-06-25_SNAPSHOT.md` together are the single
canonical view for tomorrow's resume. Every artifact shipped today has a
memory entry in `agent/memory/`. 82 topic files total; 20 added across
session. MEMORY.md 14.76 KB / 118 lines. Cross-links resolve. No broken
references. No outstanding tracker reconciliation. Resume cleanly from
section 4 Wave 1.
