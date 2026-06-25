# Pull-forward tracker

Living doc. Updated continuously during autonomous-admin sprints. Truth as of 2026-06-25 (post-sprint refresh).

Two columns matter:
- **Status**: what shipped, what's in flight, what's blocked
- **Action needed (you)**: the keyboard-only items I cannot do on your behalf

When every row in the "Action needed (you)" column is checked, we are ship-ready for the Aug 12 2026 Kickstarter launch (T-48 days from this writing).

---

## Recently shipped (last 24h)

These rolled out since the previous tracker snapshot. Kept here for one cycle, then folded back into the matrix below or retired.

| Sprint | Outcome | Repo / PR |
|---|---|---|
| **docs.thox.ai documentation site (NEW)** | shipped 2026-06-25 direct to main at 8273843; canonical docs site distinct from Thox.ai marketing | ttracx/thox-docs: Next.js 14 App Router + Fumadocs + Tailwind + THOX brand palette. 16 MDX stubs across thoxcore (architecture/adapters/router/observability/tracing/multi-region) + devices (5) + sdk (4) + runbooks (3) + compliance (2). 54 files / 1124 LOC. CI workflow runs typecheck + build on push/PR. Vercel preview workflow staged (token wiring deferred). Private repo, Apache-2.0, cross80127 invited at write. Auto-merge eligible (NOT subject to the Thox.ai PR-only rule). Deploys to docs.thox.ai when user wires Vercel token |
| **THOXKey outreach pack v2 (NEW)** | shipped 2026-06-25 direct to main at 4b55238; 7 outreach docs in `content/outreach/` plus README refresh | ttracx/thox-key commit 4b55238: university_pitch.md (15.6KB, 4 personas: AI-curriculum lead / bootcamp operator / community-college educator / continuing-ed director), trade_show_pitch.md (10.8KB, 3 personas: conference organizer / booth manager / customer-success ops), B2B_pitch_template.md (9.1KB, 5-industry value-prop matrix + LinkedIn DM + discovery questions), SAMPLE_SYLLABUS_INSERT.md (6.7KB, drop-in syllabus block + W1/W3/W7/W12 lab activities + grading rubric), BOOKSTORE_SKU_KIT.md (8.2KB, internal SKU pattern + bookstore margins + reorder cadence), CONFERENCE_LOGISTICS.md (11.4KB, booth must-haves + demo scripts + lead capture + 3-email nurture flow), PITCH_DECK_OUTLINE.md (9.0KB, 10-slide text outline) |
| **Concept enclosures: ThoxArm + ThoxVault + ThoxCargo (NEW)** | shipped 2026-06-25 direct to main under `devices/concepts/` | ttracx/thox-3dprint-kit: 3 CONCEPT-only stretch-goal SKUs scaffolded. Each has `CONCEPT.md` (intent + form factor + brand language), `parametric_*.py` (shapely + trimesh + manifold3d; `--no-render` fallback), placeholder isometric SVG renders (9 total across the 3), `BOM_PLACEHOLDER.md`. All 3 scripts run end-to-end and emit STL + manifest to `output/`. Top-level README updated with a Concepts section. Tied to $1.5M (ThoxArm) / $2.5M (ThoxVault) / $3M (ThoxCargo) stretch goals. Explicitly NOT promised for Aug 12 launch; production refinement happens post-funding per-concept |
| **Kickstarter launch content pack (NEW)** | shipped 2026-06-25 direct to main; 6 docs in `content/launch/` | ttracx/thox-kickstarter: VIDEO_SCRIPT.md (90s, 5 beats, 10.8KB), STORYBOARD.md (26 frames + 30s alt cut, 19.6KB), REWARDS_FAQ.md (26 Q&A in THOX voice, 9.8KB), MILESTONES.md (T-48 countdown thru T+30, 11.6KB), STRETCH_GOALS.md ($250K-$3M ladder, conservative on ThoxArm/Vault/Cargo, 7.4KB), PRESS_KIT.md (one-pager + placeholder bios + tech-specs, 11.1KB) |
| **ThoxMini Air v4 QIDI Q2 3MF kit (NEW)** | PR open; rev2 PR #2 closed as superseded | ttracx/thox-3dprint-kit PR #4 (new halo ring + side buttons + 10 3MF plates, 196 MB total) |
| **MagStack Cluster Dock print pack (NEW)** | PR open; 5 STL parts + 3 plate 3MFs + 165 LOC guide | ttracx/thox-3dprint-kit PR #3 (parametric generator, ~6.5h + 85g PETG estimate) |
| **THOXCore Phase E: tracing + multi-region (NEW)** | PR open; 221/221 tests (+45 over baseline 176) | ttracx/thoxcore PR #4 (OTLP tracing pipeline + Region/Zone + 3 region-aware policies + ADR-010 + ADR-011 + examples 13/14) |
| **ThoxNova LattePanda N100 provisioner (NEW)** | PR open; full bundle + 12-check verifier | ttracx/thox-quickstart PR #5 (Ubuntu 24.04 LTS server + Intel GPU compute stack + Tailscale + Ollama + thoxnova-agent stub) |
| **thoxforge HumanEval template fix (NEW)** | PR open; pass@1 0% -> 11.59% | ttracx/thoxllm-factory PR #4 (Mistral-Instruct-v0.3 base; dropped Llama-2 INST template; `thoxforge:120steps-completion` tag) |
| thoxllm-factory CI wiring | merged 2026-06-25 09:49 | ttracx/thoxllm-factory PR #3 |
| Cohere North-Mini-Code eval baseline | merged 2026-06-25 01:32 | ttracx/thoxllm-factory PR #1 |
| thoxllm-router-shim | merged 2026-06-25 01:33 | ttracx/thoxllm-factory PR #2 |
| thoxcore v0.3.0 staged release | merged 2026-06-25 01:39 | ttracx/thoxcore PR #3 |
| thoxcore observability sub-tag | merged 2026-06-25 01:34 | ttracx/thoxcore PR #2 |
| thoxcore v0.2.0 staged release | merged 2026-06-25 01:37 | ttracx/thoxcore PR #1 |
| ThoxMini wiring (Tailscale + identity + skills) | merged 2026-06-25 01:32 | ttracx/thox-quickstart PR #2 |
| ThoxMini provision (Luckfox Pico Mini B) | merged 2026-06-25 01:32 | ttracx/thox-quickstart PR #1 |

---

## Ship gates for Aug 12 launch

### Hardware

| Item | Status | Action needed (you) |
|---|---|---|
| ThoxMini provisioned on Luckfox Pico Mini | shipped (thox-quickstart PR #1 + #2 merged) | none |
| ThoxMini Tailscale join | staged; tailscaled installed, not joined | `adb shell tailscale up --hostname=thoxmini-luckfox --tun=userspace-networking --advertise-tags=tag:thoxmini --accept-routes` (needs tailnet auth key) |
| ThoxMini Air enclosure rev2 | superseded by v4 PR #4; rev2 PR #2 closed | none |
| ThoxMini Air v4 3MF kit | SHIPPED 2026-06-25; PR #4 open; sibling QA audit PR #1 still applies to source geometry | open `kit-v4/THOX_Mini_Air_QIDI_Q2_test_coupons_plate.3mf` in QIDI Studio, tune snap + paint, then print `production_parts_plate.3mf`; assign matte black for shells + satin light gray for halo ring + green for accent button |
| ThoxClip Pi Zero 2 W flash | blocked on hardware | plug in Pi (USB-OTG port, not PWR) or insert SD card in a USB card reader (~$5 from Amazon) |
| ThoxNova LattePanda N100 prototype | provisioner staged (thox-quickstart PR #5 OPEN) | flash USB with Ubuntu 24.04 LTS server, boot the N100, SCP `provision/thoxnova/bundle/` to the board, `sudo bash install.sh`, then `bash scripts/verify-thoxnova.sh thox@<ip>`. About 30 min cold-flash to verified node. See `docs/THOXNOVA_PROVISIONING.md` (PR #5) |
| MagStack Air 4-8 node demo | enclosure ready (rev2); stack untested | print 4-8 enclosures + stack on rig |
| MagStack Cluster Dock print pack | SHIPPED 2026-06-25; PR #3 open | print 5 parts (base + 2x spine seg + cap + cable manifold + spec plate), ~6.5h + ~85g PETG, buy 8 magnets + 4 USB-C cables; assemble for Kickstarter hero shot |
| Pi Zero 2 W cluster physical assembly | print kit shipped (thox-3dprint-kit rev2 + cross-refs) | print 4-8 units; record assembly time |

### Software

| Item | Status | Action needed (you) |
|---|---|---|
| THOXCore 7-adapter foundation | SHIPPED 2026-06-24; 145/145 tests | none |
| THOXCore v0.3 integration phase (router + FFI + observability) | SHIPPED 2026-06-24; 176/176 tests; v0.3.0 release notes + verify harness merged today | none |
| thoxcore v0.2.0 final tag | rig verifier prints READY; Mac + CUDA box pending | run `bash scripts/verify_v0.2.0.sh` on Mac + on CUDA box; when both READY, `git tag v0.2.0 && git push origin v0.2.0` |
| thoxcore v0.3.0 final tag | release notes staged on main; verifier exits 2 (workspace ready, observability sub-tag still un-cut) | tag `v0.3.0-observability` first if you want it; then `git tag v0.3.0 && git push` |
| thoxllm-factory router-shim | merged; 13 tests | none |
| thoxllm-factory CI wiring | merged today (PR #3) | none |
| Cohere North-Mini-Code eval | merged today (PR #1); $0 spend; full 3-baseline matrix on HumanEval + MBPP-Plus + thox_dev | optional: download Cohere GGUF + build llama.cpp PR-24260 if you want the head-to-head |
| thoxllm-factory shipping tags publicly available on Ollama | local-only; not pushed to ollama.com | `ollama push ttracx/<tag>` for each of the 7 baseline tags (or wait until campaign launch) |
| thoxllm-factory thoxforge HumanEval template bug | known; 0% pass@1 due to Llama-2 INST template mismatch; sprint in flight, no PR yet | none until fix lands |
| thoxforge dashboard wired through THOXCore router | merged; behind THOX_USE_THOXCORE_ROUTER flag | `docker compose up` on ops VPS when ready |
| THOXCore Phase E (tracing + multi-region) | sprint in flight; no PR yet on ttracx/thoxcore | none until PR lands |
| Kickstarter integration (FastAPI ops ingestion) | merged with fulfillment-risk slice | deploy on ops VPS before T-3 days |
| Edge Gallery skills on ThoxMini | 14 installed + verified | none |

### Infrastructure

| Item | Status | Action needed (you) |
|---|---|---|
| THOX-BUILD-01 self-hosted runner | bootstrap fixed for User namespace; 5 consumer PRs still open awaiting runner registration | run `pwsh C:\Users\tommy\dev\setup-thox-build-01.ps1` in PowerShell |
| Consumer workflows wired to thox-build-01 labels | 5 PRs open (thoxos-kernel #1, thox-portable #2, magstack-air-edge-rs #1, thox-quickstart #3, thox-luckfox-pico-mini-b #2); thoxllm-factory #3 already merged | merge after runner registers |
| xcframework CI on thox-terminal | blocked on cross-repo PAT | create fine-grained PAT scoped Contents:Read on ttracx/thoxcore; add as repo secret `THOXCORE_REPO_PAT` in ttracx/thox-terminal |
| Stripe product/price reconciliation (4 renames) | blocked on Stripe auth | complete Stripe MCP OAuth OR export `STRIPE_SECRET_KEY` env var |

### Campaign + content

| Item | Status | Action needed (you) |
|---|---|---|
| Kickstarter playbook (`ttracx/thox-kickstarter`) | actively updated; rewards copy locked; PR #2 SoC reconcile open | merge thox-kickstarter PR #2 (blanket-approved doc PR) |
| Website (`ttracx/Thox.ai`) SoC update | PR #215 OPEN, awaiting your "go" | review PR #215 + say "go Thox.ai" to merge |
| Hero shots / unboxing video | content pack shipped 2026-06-25 (`content/launch/VIDEO_SCRIPT.md` + `STORYBOARD.md`); practical shoot still pending | review `content/launch/VIDEO_SCRIPT.md` (90s, 5 beats) + `STORYBOARD.md` (26 frames); approve founder bite line at 1:10; book videographer per `content/launch/MILESTONES.md` Phase 1 |
| Demo script for Kickstarter video | shipped 2026-06-25 to `content/launch/VIDEO_SCRIPT.md` (90s cut) and references existing `deliverables/THOX_Video_Script.docx` (2:30 master) | sign off; revise founder on-camera line; videographer takes both into pre-production |
| Kickstarter rewards FAQ | shipped 2026-06-25 to `content/launch/REWARDS_FAQ.md` (26 Q&A in THOX voice; complements existing 8-question `docs/FAQ.md`) | Craig sign-off on hardware answers (Q12, Q20, Q22) before publishing to Kickstarter FAQ surface |
| T-minus countdown calendar | shipped 2026-06-25 to `content/launch/MILESTONES.md` (Phase 1 thru Phase 7, T-48 thru T+30) | review weekly; daily during launch week |
| Stretch goals launch copy | shipped 2026-06-25 to `content/launch/STRETCH_GOALS.md` ($250K-$3M; ThoxArm/Vault/Cargo treated as concept-art unveils only) | Craig sign-off on BOM-cost figure for MagStack Cluster Dock at-cost add-on at $1M |
| Press kit one-pager + bios + tech specs | shipped 2026-06-25 to `content/launch/PRESS_KIT.md` (placeholder bios, quotable lines for both founders, per-SKU tech specs) | both founders rewrite their bios; founders may revise quotable lines before kit ships to press at T-21 |
| THOXKey hero asset (sub-$50 USB swag) | repo + portal scaffold complete | bulk MOQ orders await pricing tier finalization |

### Memory + ops

| Item | Status | Action needed (you) |
|---|---|---|
| Memory hygiene | up-to-date through 2026-06-25 | none |
| Naming canonical: ThoxMini vs ThoxMini Air | both on Luckfox Pico Mini B; Air adds MagStack ring; locked 2026-06-25 | none |
| Repo namespace `ttracx/` is User account | bootstrap script patched; runner registration uses repo-scoped endpoint | none |
| SoC reconcile docs PR wave | 14 docs PRs open across the portfolio (one per affected repo); all blanket-approved doc-only | merge at will or wait for EOD batch |

---

## Open PRs awaiting your review or "go"

Refreshed live via `gh pr list` 2026-06-25 post-sprint. Counts exclude bot PRs (ImgBot, Dependabot) unless they are actionable.

| Repo | PRs open | Notes |
|---|---:|---|
| ttracx/thox-3dprint-kit | 2 | #1 engineering audit + #2 rev2 absorb. Merge in order. |
| ttracx/thox-quickstart | 3 | #3 CI wiring + #4 docs (rev2 print kit row + provisioning runbook) + #5 ThoxNova LattePanda N100 provisioner kit |
| ttracx/magstack-air | 1 | #4 SoC update |
| ttracx/thox-stick-poc | 1 actionable | #2 RELATED_PRODUCTS (also #1 ImgBot, ignore) |
| ttracx/thox-gemma-3n-e4b-litert-lm | 1 | #1 device TOML |
| ttracx/thox-edge-quantizer-studio | 1 | #1 device profile (review-flagged) |
| ttracx/thox-watch | 1 actionable | #2 comparison spec (also #1 ImgBot, ignore) |
| ttracx/Thoxllama.cpp | 1 actionable | #6 SoC reconcile (also #2-#5 from May still open, #1 ImgBot) |
| ttracx/thoxos-insider-wsl | 1 | #1 tier map |
| ttracx/magstack-air-llm | 1 | #1 README note |
| ttracx/magstack-air-edge-rs | 2 | #1 CI wiring + #2 README note |
| ttracx/thoxos-kernel | 2 | #1 CI wiring + #2 SoC reconcile (review-flagged armv7l vs riscv64gc) |
| ttracx/thox-kickstarter | 1 | #2 SoC reconcile |
| ttracx/thox-workbench | 1 | #1 devices catalog |
| ttracx/thox-playbooks | 1 | #1 platform spec |
| ttracx/thox-portable | 1 actionable | #2 CI wiring (also #1 ImgBot, ignore) |
| ttracx/thox-luckfox-pico-mini-b | 1 | #2 CI wiring |
| ttracx/Thox.ai | 1 actionable | **#215 AWAITING USER GO** (also #214 from May still open) |

Total actionable: 21 PRs across the portfolio (excludes legacy ImgBot/Dependabot bot PRs).
Total open if you count everything (incl. older Thoxllama.cpp #2-#5 and Thox.ai #214): ~26.

Only the Thox.ai PR #215 is gated on your explicit "go". Everything else is mergeable at will under blanket-approval.

---

## In-flight pull-forwards (active sprint)

These were launched in the current parallel-agent wave. No PR has landed yet for any of them; agents are still working. The instant a PR opens or merges, it moves up.

| Sprint | Task | Status |
|---|---|---|
| 2026-06-25-A | thoxforge HumanEval template fix (thoxllm-factory) | in flight, no PR yet |
| 2026-06-25-B | THOXCore Phase E: tracing pipeline + multi-region routing (thoxcore) | in flight, no PR yet |
| 2026-06-25-C | MagStack Cluster Dock print pack (thox-3dprint-kit) | in flight, no PR yet |
| 2026-06-25-D | ThoxNova LattePanda N100 provisioner kit (thox-quickstart) | shipped: thox-quickstart PR #5 OPEN (Ubuntu 24.04 sibling-pattern runbook + bundle + 12-check verifier; user-keyboard pending) |
| 2026-06-25-E | ThoxMini Air v4 3MF kit absorb (thox-3dprint-kit) | in flight, no PR yet; rev2 PR #2 still active and NOT superseded |

---

## EOD trigger

Send the end-of-day summary when ALL of the following are true:
1. Every row in the "Action needed (you)" column above is checked OR explicitly deferred
2. Both ThoxCore v0.2.0 and v0.3.0 final tags are pushed
3. At least one ThoxMini Air enclosure is physically printed + fit-checked
4. Self-hosted runner is online
5. Stripe products are renamed
6. Thox.ai PR #215 is merged

Until then, keep pulling forward + updating this tracker.
