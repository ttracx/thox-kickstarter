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
| **Pre-launch comms pack (EMAIL + LINKEDIN + INVESTOR DECK + SOCIAL_KIT) (NEW)** | shipped 2026-06-25 direct to main; 5 docs in `content/launch/` | ttracx/thox-kickstarter: EMAIL_SEQUENCE.md (5-email pre-launch sequence T-42 / T-28 / T-14 / T-7 / T-0, founder voice, A/B subjects + preview text + CAN-SPAM footer), LINKEDIN_POSTS.md (8 posts alternating Tommy + Craig voices T-42 through T-0 joint launch, lowercase hashtags, suggested media per post), INVESTOR_DECK.md (10-slide markdown source with brand palette + 100-200 word speaker notes per slide + no fabricated quotes + user-set Ask), INVESTOR_DECK_ONE_PAGER.md (single printable page collapse of the deck), SOCIAL_KIT.md (21 assets manifest: LinkedIn 1200x627 + X 1200x675 + MagStack GIF + 6 stickers + 30s vertical + distribution schedule + hygiene checklist). Voice across the pack: founder, technical, honest, no marketing fluff, no em-dashes, no emojis. Aligned with REWARDS_FAQ + STRETCH_GOALS + MILESTONES |
| **thoxos-kernel v1.2.0 consolidation tag (NEW)** | shipped 2026-06-25 direct to main at 8952fc7; v1.2.0 tag pushed; MVP-7..32 unified release line | ttracx/thoxos-kernel commit 8952fc7: `RELEASE_NOTES_v1.2.0.md` (chain summary MVP-7..32 + headline capabilities + decision artifacts + verification gates), `docs/decision_log.md` (cumulative GO/NO_GO across 17 absorbs + consolidated v1.2.0 packaged decision table covering 12 lanes), `docs/v1.2.0_command_surface.md` (every shell command MVP-15..32 with one-line description per command, approx 65 commands), CHANGELOG.md [1.2.0] entry, README version bumped 1.1.25 -> 1.2.0, `scripts/verify_v1.2.0.{ps1,sh}` (6-gate harness: fmt + clippy + integration-crate tests + transcript markers + sub-tags + posture policies), `VERIFY_v1.2.0_RIG_2026-06-25.log` (verdict READY TO TAG v1.2.0). Integration-phase crates verified on rig: thox-agent-hub 14/14, thox-scheduler 9/9, thox-util 37/37 (60/60 total). Sub-tags v1.1.9..v1.1.25 preserved. Packaged decision remains NO_GO for kernel mainline auto-merge + device rollout (requires QEMU evidence on equipped host, seven v120-*.log smoke transcripts, real detached release signature, release-manager human sign-off). v1.3.x is post-Kickstarter scope |
| **Backer reward fulfillment workflow (NEW)** | shipped 2026-06-25 direct to main at b229964; runs after Aug 12 to actually fulfill backer orders; 25 new tests / 55 total green; ruff + mypy clean | ttracx/thox-kickstarter-integration commit b229964: extends `Reward` model with sku/base_price_usd/early_bird_price_usd/stretch_unlock_at_funding/shipping_window/requires_address_survey/is_concept_only/notes; adds `FulfillmentStep` + `BackerFulfillment` tables; `app/kickstarter/rewards.py` canonical catalog mirrors `content/launch/STRETCH_GOALS.md` (9 SKUs: thoxclip 39 / thoxmini 69 / thoxair 79 / thoxnova 499 + magstack-cluster-4node + thoxkey-edu + 3 concept-only unveils thoxarm/thoxvault/thoxcargo); idempotent `seed_canonical_rewards`; default 4-step pipeline manufacture->qa->pack->ship for shipping SKUs only; 5 new API routes (list/detail/pipeline/progress + operator advance gated on `X-Operator-Token`); `/rewards` dashboard tab with funding-tier badges, per-reward progress bars, pipeline DAG drill-in, operator advance form. **Action needed (you)**: operator runs `python scripts/seed_rewards.py` on the production deploy after first install |
| **thox-edge-skills v1.0.0 catalog (NEW)** | shipped 2026-06-25 direct to main at 9573c94; tag v1.0.0 pushed; ready to publish from docs.thox.ai/skills | ttracx/thox-edge-skills v1.0.0: `schemas/skill.schema.json` (JSON Schema 2020-12 manifest spec at https://docs.thox.ai/schemas/skill.schema.json; required id/name/version/variant/description/intents/license; optional ram_budget_mb, supports_devices, entry, homepage, require_secret, target_models, tags, examples). 33/33 per-skill `skill.json` manifests + 33/33 per-skill `README.md` auto-generated from manifests. `catalog.json` rebuilt as canonical index with schema_version 1.0.0 envelope. 4 bundle tarballs under `bundles/`: text-only (11 skills, 12.3 KB), native-intent (3 skills, 3.6 KB), thoxmini-luckfox (14 skills, 15.1 KB; the live ThoxMini Luckfox reference set), full (33 skills, 59.0 KB). 5-gate CI pipeline: frontmatter validator -> build_catalog -> generate_readmes -> validate_manifests (JSON Schema gate) -> smoke_test (mock thoxymicro gateway routing). CI uploads `thox-edge-skills-dist` workflow artifact (catalog + schema + 4 bundles). ThoxMini units fetch `bundles/thox-edge-skills-thoxmini-luckfox.tar.gz` at provision time |
| **docs.thox.ai Vercel deploy wired (NEW)** | shipped 2026-06-25 direct to main at 8eed357; production + PR-preview workflows ready, inert until 3 secrets land | ttracx/thox-docs: `.github/workflows/deploy.yml` (push-to-main production deploy via Vercel CLI; pnpm install + typecheck + build + vercel pull + vercel build --prod + vercel deploy --prebuilt --prod; 15 min timeout; concurrency-group serialized), `.github/workflows/preview.yml` (PR preview deploy + auto-comments preview URL on PR via actions/github-script), `vercel.json` (framework hint nextjs + build/install commands + .next output), `docs/DEPLOY.md` (1239 bytes; 4-step setup: Vercel project import + 3 repo secrets + CNAME + test). README Deploy section rewritten to link the runbook. Workflows do NOT trigger billable CI minutes until VERCEL_TOKEN + VERCEL_ORG_ID + VERCEL_PROJECT_ID secrets are added. Auto-merge eligible (NOT subject to the Thox.ai PR-only rule) |
| **docs.thox.ai documentation site** | shipped 2026-06-25 direct to main at 8273843; canonical docs site distinct from Thox.ai marketing | ttracx/thox-docs: Next.js 14 App Router + Fumadocs + Tailwind + THOX brand palette. 16 MDX stubs across thoxcore (architecture/adapters/router/observability/tracing/multi-region) + devices (5) + sdk (4) + runbooks (3) + compliance (2). 54 files / 1124 LOC. CI workflow runs typecheck + build on push/PR. Private repo, Apache-2.0, cross80127 invited at write |
| **THOXKey outreach pack v2 (NEW)** | shipped 2026-06-25 direct to main at 4b55238; 7 outreach docs in `content/outreach/` plus README refresh | ttracx/thox-key commit 4b55238: university_pitch.md (15.6KB, 4 personas: AI-curriculum lead / bootcamp operator / community-college educator / continuing-ed director), trade_show_pitch.md (10.8KB, 3 personas: conference organizer / booth manager / customer-success ops), B2B_pitch_template.md (9.1KB, 5-industry value-prop matrix + LinkedIn DM + discovery questions), SAMPLE_SYLLABUS_INSERT.md (6.7KB, drop-in syllabus block + W1/W3/W7/W12 lab activities + grading rubric), BOOKSTORE_SKU_KIT.md (8.2KB, internal SKU pattern + bookstore margins + reorder cadence), CONFERENCE_LOGISTICS.md (11.4KB, booth must-haves + demo scripts + lead capture + 3-email nurture flow), PITCH_DECK_OUTLINE.md (9.0KB, 10-slide text outline) |
| **Concept enclosures: ThoxArm + ThoxVault + ThoxCargo (NEW)** | shipped 2026-06-25 direct to main under `devices/concepts/` | ttracx/thox-3dprint-kit: 3 CONCEPT-only stretch-goal SKUs scaffolded. Each has `CONCEPT.md` (intent + form factor + brand language), `parametric_*.py` (shapely + trimesh + manifold3d; `--no-render` fallback), placeholder isometric SVG renders (9 total across the 3), `BOM_PLACEHOLDER.md`. All 3 scripts run end-to-end and emit STL + manifest to `output/`. Top-level README updated with a Concepts section. Tied to $1.5M (ThoxArm) / $2.5M (ThoxVault) / $3M (ThoxCargo) stretch goals. Explicitly NOT promised for Aug 12 launch; production refinement happens post-funding per-concept |
| **Kickstarter launch content pack (NEW)** | shipped 2026-06-25 direct to main; 6 docs in `content/launch/` | ttracx/thox-kickstarter: VIDEO_SCRIPT.md (90s, 5 beats, 10.8KB), STORYBOARD.md (26 frames + 30s alt cut, 19.6KB), REWARDS_FAQ.md (26 Q&A in THOX voice, 9.8KB), MILESTONES.md (T-48 countdown thru T+30, 11.6KB), STRETCH_GOALS.md ($250K-$3M ladder, conservative on ThoxArm/Vault/Cargo, 7.4KB), PRESS_KIT.md (one-pager + placeholder bios + tech-specs, 11.1KB) |
| **ThoxMini Air v4 QIDI Q2 3MF kit (NEW)** | PR open; rev2 PR #2 closed as superseded | ttracx/thox-3dprint-kit PR #4 (new halo ring + side buttons + 10 3MF plates, 196 MB total) |
| **MagStack Cluster Dock print pack (NEW)** | PR open; 5 STL parts + 3 plate 3MFs + 165 LOC guide | ttracx/thox-3dprint-kit PR #3 (parametric generator, ~6.5h + 85g PETG estimate) |
| **thoxcore v0.4.0 release notes staged (NEW)** | shipped 2026-06-25 direct to main at 57913a9; integration phase complete | ttracx/thoxcore: `RELEASE_NOTES_v0.4.0.md` (consolidates Phase E + the v0.3 line; 4-row component matrix; multi-region + OTLP migration snippets), `CHANGELOG.md` v0.4.0 entry, `docs/RELEASE_LINE.md` (v0.2 -> v0.5 story map + sub-tag inventory + final-tag policy), `README.md` updated (v0.4.0 status badge, tests badge 145 -> 221, release-status table, Quick Start now includes multi-region pattern, examples 13/14), `scripts/verify_v0.4.0.{ps1,sh}` (9-gate workspace harness: tests + fmt + clippy default + clippy no-default-features + v0.3 sub-tags + v0.4 sub-tag + router build + ffi release build + observability build). Sub-tags cut: `v0.3.0-observability` at c8f1f04 + `v0.4.0-tracing-multi-region` at f441a87. Final `v0.4.0` tag user-gated on real-device verification |
| **THOXCore Phase E: tracing + multi-region** | SHIPPED 2026-06-25 via PR #4 merge at f441a87; 221/221 tests (+45 over baseline 176) | ttracx/thoxcore PR #4 (OTLP tracing pipeline + Region/Zone + 3 region-aware policies + ADR-010 + ADR-011 + examples 13/14) |
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
| thoxcore v0.3.0 final tag | release notes staged on main; `v0.3.0-observability` sub-tag now CUT at c8f1f04; verifier should print READY today | run `pwsh scripts/verify_v0.3.0.ps1` on the rig; when READY, `git tag v0.3.0 && git push origin v0.3.0` |
| thoxcore v0.4.0 final tag | release notes + verify scripts staged on main at 57913a9; `v0.4.0-tracing-multi-region` sub-tag CUT at f441a87; workspace gates green (221/221 tests + fmt + clippy default + clippy no-default-features) | tag `v0.4.0` only after: (1) v0.3.0 + v0.2.0 final tags both cut, (2) OTLP trace export verified against a real Jaeger or Tempo collector (not just docker-compose), (3) multi-region failover verified across 2+ real adapter pools (not just the deterministic example), (4) `verify_v0.4.0.{ps1,sh}` prints READY on rig + Mac + CUDA-box. Then `git tag v0.4.0 && git push origin v0.4.0` |
| thoxllm-factory router-shim | merged; 13 tests | none |
| thoxllm-factory CI wiring | merged today (PR #3) | none |
| Cohere North-Mini-Code eval | merged today (PR #1); $0 spend; full 3-baseline matrix on HumanEval + MBPP-Plus + thox_dev | optional: download Cohere GGUF + build llama.cpp PR-24260 if you want the head-to-head |
| thoxllm-factory shipping tags publicly available on Ollama | local-only; not pushed to ollama.com | `ollama push ttracx/<tag>` for each of the 7 baseline tags (or wait until campaign launch) |
| thoxllm-factory thoxforge HumanEval template bug | known; 0% pass@1 due to Llama-2 INST template mismatch; sprint in flight, no PR yet | none until fix lands |
| thoxforge dashboard wired through THOXCore router | merged; behind THOX_USE_THOXCORE_ROUTER flag | `docker compose up` on ops VPS when ready |
| THOXCore Phase E (tracing + multi-region) | SHIPPED 2026-06-25; PR #4 merged at f441a87; 221/221 tests; v0.4.0 release notes + verify harness staged today at 57913a9 | none (v0.4.0 final tag tracked in the row above) |
| Kickstarter integration (FastAPI ops ingestion) | merged with fulfillment-risk slice + reward catalog + per-reward fulfillment workflow (b229964) | deploy on ops VPS before T-3 days, then `python scripts/seed_rewards.py` once to seed the canonical 9-SKU catalog |
| Edge Gallery skills on ThoxMini | 14 installed + verified | none |

### Infrastructure

| Item | Status | Action needed (you) |
|---|---|---|
| THOX-BUILD-01 self-hosted runner | bootstrap fixed for User namespace; 5 consumer PRs still open awaiting runner registration | run `pwsh C:\Users\tommy\dev\setup-thox-build-01.ps1` in PowerShell |
| Consumer workflows wired to thox-build-01 labels | 5 PRs open (thoxos-kernel #1, thox-portable #2, magstack-air-edge-rs #1, thox-quickstart #3, thox-luckfox-pico-mini-b #2); thoxllm-factory #3 already merged | merge after runner registers |
| xcframework CI on thox-terminal | blocked on cross-repo PAT | create fine-grained PAT scoped Contents:Read on ttracx/thoxcore; add as repo secret `THOXCORE_REPO_PAT` in ttracx/thox-terminal |
| Stripe product/price reconciliation (4 renames) | script staged (`ttracx/thox-key` f5e3500); idempotent reconcile of 8 products + 9 prices including the 4 renames; awaiting Stripe key | export `STRIPE_SECRET_KEY` then `cd portal; pnpm stripe:setup:dry` to preview + `pnpm stripe:setup` to apply. Runbook: `ttracx/thox-key` `docs/STRIPE_SETUP.md` |
| docs.thox.ai live deploy on Vercel | workflows wired on main (`ttracx/thox-docs` 8eed357); inert until Vercel project + 3 secrets land | create Vercel project (import `ttracx/thox-docs`, framework Next.js, domain `docs.thox.ai`); add repo secrets `VERCEL_TOKEN` + `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID`; point `docs.thox.ai` CNAME at `cname.vercel-dns.com`. Walkthrough in `ttracx/thox-docs` `docs/DEPLOY.md`. ~5 min |

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
