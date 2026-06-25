# Pull-forward tracker

Living doc. Updated continuously during autonomous-admin sprints.
Truth as of 2026-06-25 (end-of-day consolidation).

When every row in "Actions waiting on you" is checked, we are ship-ready for Aug 12 2026 (T-48 days).

---

## 0. Headline metrics (today 2026-06-25)

- Total sprints completed: ~35+
- Total tests across portfolio: ~2,000+ passing
- New repos created today: 7 (thox-build-infra, thox-docs, thox-q2-print-farm, thox-brand-vault, thox-ip-disclosures, thox-meta, thox-kickstarter-integration)
- New release tags cut: 12+ across portfolio
- Lines of code and docs added: tens of thousands
- Open PRs on Thox.ai (PR-only, no-merge): 4 (#215, #216, #217, #218)
- Total commits across portfolio today: ~150+
- Spend today: $0

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

### Software (12+ items)

- THOXCore Phase E + Phase F roadmap + v0.4.0 release line
- thoxllm-factory router-shim + Cohere eval + thoxforge HumanEval fix + v0.7 plan + HF upload script
- thox-kickstarter-integration fulfillment + early access + emails + surveys + referrals + Stripe Connect + HTML email templates
- thox-experience-fabric v0.4 router-aware
- thox-edge-skills v1.0 catalog
- thox-portable v0.3.0 + thox-agent-memory v0.2.0
- thoxos-kernel v1.2.0 consolidation (MVP-7..32)
- THOXCore Swift SDK + Terminal app v0.2.0-thoxcore-sdk
- thox-litert-lm Phase 0 scaffold + 14-crate workspace
- thox-digitalhumans v0.1.0 (replaces thoxmesh; archived)
- ThoxLLM-327M v2 published to HF (private)
- thoxllm-factory run3 v0.1.3 (max_steps=240, avg -40% loss)

### Hardware (6 items)

- ThoxMini Air v4 QIDI Q2 3MF kit
- MagStack Cluster Dock print pack
- ThoxNova LattePanda N100 provisioner (PR #5)
- ThoxStick POC firmware (ESP32-S3 + Pi Zero W)
- Hardware QA acceptance matrix
- ThoxMini Luckfox provisioned + 14 skills exercised

### Content (15+ items)

- UNBOXING_SCRIPTS/ directory: 6 per-device social-cut scripts (ThoxClip 30s, ThoxMini 45s, ThoxMini Air 45s, ThoxNova 60s, MagStack Cluster Dock 45s, THOXKey 30s) + 00_master_voice_guide + POST_LAUNCH_CADENCE (T-28 to T+30) + README with pre/post checklists and founder quality gate (shipped 2026-06-25)
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
| Software | 98% | v0.2 / 0.3 / 0.4 final tags pending 3-host verify |
| Hardware | 75% | enclosures ready to print; ThoxClip blocked on SD reader |
| Content | 95% | founder bios + dates pending |
| Infrastructure | 85% | runner + Stripe + xcframework PAT + Vercel + DNS staged |
| Brand + governance + IP + compliance | 95% | attorney + CPA + bookstore handoffs pending |

Aggregate: ~89% ready. The 13 keyboard items in section 1 close the gap.

---

## 4. Tomorrow's plan (when you say "keep going")

**Wave 1** (immediately on resume):
- HF Hub upload (after user sets HF_TOKEN)
- ThoxLLM v0.7 train kickoff (after user picks the first model)
- Stripe Connect onboarding for top 5 referral codes (pre-seed before launch)
- Render gap-fill for any newly-printed enclosure

**Wave 2** (after user completes keyboard items overnight):
- Stripe products renamed -> referral payouts activate
- Runner online -> CI starts running
- xcframework PAT in place -> Mac + iOS builds shipping
- Thox.ai PRs merged -> website live
- v0.2.0 verified -> final tag cut

**Wave 3** (post-Kickstarter Phase F kickoff):
- thoxcore adapter marketplace
- SDKs (Swift / Kotlin / Python / TS)
- Downstream auth (thoxcore-auth skeleton already staged)
- Telemetry + multi-region routing

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
