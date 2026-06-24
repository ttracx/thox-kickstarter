# Morning briefing - 2026-06-24 (T-49)

Tommy, you slept; the shiproom kept moving. Here's the recap.

## What shipped overnight

| Lane | Deliverable | Tag | Commit |
|---|---|---|---|
| G Apps | thox-terminal v0.3.0-rc6: tmux quick-actions (24 actions across 6 device kinds) + Connect-handoff focus pulse + v0.3.0 release notes draft | `v0.3.0-rc6` | `95e1d98` |
| B2B portal | thox-key portal-v0.4.0: RLS policies + 5 email templates + 4 new API routes (Phase 1 backlog COMPLETE) | `portal-v0.4.0` | `6f314f5` |
| Brand product line | thox-portable-agent ThoxKey USB auto-detect (plain-Node, zero new deps) | `v0.2.0` | `c8647f1` |

Note on the third dispatch: the first attempt correctly stopped because the original task spec assumed Electron + TypeScript + Zod, but the actual repo is plain-Node + zero deps. Re-dispatched honoring the existing architecture and shipped clean. Pure stdlib mount detection across Windows / macOS / Linux, 5s polling, in-banner UX with THOX palette, 14/14 tests via `node --test`. Zero new runtime deps after the change.

## thox-terminal v0.3 rc-train is COMPLETE

Six release candidates shipped in 48 hours on the Apps lane alone:

- rc1 mDNS discovery (`077daf0`)
- rc2 Tailscale local-API host import (`3ed8a8f`)
- rc3 Keychain private-key storage + ThoxOS status parser (`640707f`)
- rc4 ThoxMini first-run onboarding + local THOXY endpoint config (`97d17b4`)
- rc5 Secure Enclave keygen + audit log + Settings export (`46598c6`)
- rc6 tmux quick-actions + Connect-handoff pulse + v0.3.0 release notes (`95e1d98`)

Promotion criteria documented in `thox-terminal/docs/release-notes/v0.3.0.md`. The ONE thing standing between rc6 and v0.3.0 final: real-device verification on the THOX-BUILD-01 tailnet + a Pi Zero MagStack. Run that and we cut v0.3.0.

## thox-key portal Phase 1 backlog COMPLETE

Three releases in two days:
- portal-v0.1.0 (`caad6ff`): Vercel + CI scaffold
- portal-v0.2.0 (`13a22f9`): pricing + account + admin (dashboard / batches / customers) + login + magic-link auth
- portal-v0.3.0 (`1674564`): order detail + assets uploader + preview + Stripe checkout + admin batch/customer detail + auth round-trip
- portal-v0.4.0 (`6f314f5`): RLS policies + 5 transactional email templates + remaining API routes

The portal is launch-ready code-wise. What's left is purely operational:
1. `cd thox-key/portal && vercel link`
2. `gh secret set VERCEL_TOKEN/VERCEL_ORG_ID/VERCEL_PROJECT_ID --repo ttracx/thox-key`
3. Populate Vercel prod env (Supabase + Stripe live keys + `RESEND_API_KEY` + `EMAIL_FROM` + `CRON_SECRET` + `ADMIN_EMAILS`)
4. Add `order.thoxkey.io` custom domain + CNAME
5. `gh workflow run portal-deploy.yml --repo ttracx/thox-key --field environment=production`

Total: ~15 minutes at the keyboard.

## Three things waiting for your keyboard time

1. **WSL bootstrap** (5 teams unblocked): one curl + chmod + run command in WSL. Script at `thox-kickstarter/scripts/provision-thox-build-01.sh`.
2. **Portal go-live**: 5 steps above. ~15 min.
3. **Cohere North-Mini-Code eval**: at the rig, `bash eval/cohere-north-mini-code/scripts/download_model.sh && ... && summarize_results.py && fill in DECISION.md`. ~30 min download + 20 min build + 2 hr benchmark, then 5 min decision.

## Cumulative 48h commit waveform across the THOX portfolio

| Repo | Commits |
|---|---:|
| thox-kickstarter | 25 |
| thox-3dprint-kit | 18 |
| thox-terminal | 18 |
| thoxos-kernel | 15 |
| thox-key | 9 |
| thoxmini-q2-prototype | 5 |
| thoxllm-factory, thox-quickstart | 4 each |
| thox-stick-poc, thox-portable-agent, thox-workbench, thox-system-prompts | 3 each |
| **Total** | **~110** |

## Day-0 launch-order status (T-49)

| Priority | Repo | State | Blocker |
|---|---|---|---|
| P0 | thox.ai (marketing site) | claim-reconciliation pass in progress (11 commits today) | none |
| P0 | thoxos-kernel | v1.1.25 (MVP-32 absorbed); no QEMU evidence yet | needs THOX-BUILD-01 online |
| P0 | thoxos-air-image | B6 blocker (real binaries) awaiting Craig signoff | needs Craig + build host |
| P0 | thox-gemma4 / thoxllm-factory | factory v0.1.3 + Cohere eval scaffolded; Phase C 12B blocked | needs build host for Phase C |
| P1 | thox-provisioner | preflight + build-host requirements doc shipped | needs build host |
| P1 | magstack-air + edge-rs | 8-clip assembly plan doc shipped; Rust compile unverified on real Pi Zeros | needs hardware on hand + build host |
| P1 | thox-terminal | **v0.3.0-rc6 shipped overnight**; promotion to v0.3.0 needs hardware verification | needs Pi Zero MagStack |
| P1 | thoxos-companion | P0 PEM trust anchor resolved at `94b0773`; awaits TestFlight from Phamy | needs Phamy session |
| P2 | thoxinchip | GDS render procedure doc shipped | none (non-blocking B-roll) |
| P2 | thox-watch | not in critical path | none |

## Single most important action today

**Stand up THOX-BUILD-01.** Five teams (B/C/D/E/F) move forward the moment that script finishes. Without it, the kernel/image/provisioning/MagStack lanes stay in doc-only mode and start drifting RED on the Friday milestone.

15 min at the WSL prompt. Script + decision doc are committed. After it's up, the cosign keypair generates + Tailscale auth happens + 5 GitHub self-hosted runners register (~10 more min). Then everything except the marketing-site claim work + the Apps lane real-device verification unblocks simultaneously.

## Standing notes

- Pull-forward-when-ahead policy is now standing operating procedure (memory: `feedback_pull_forward_when_ahead`)
- Build-host decision is locked: local KnightHub workstation, NOT cloud VM (memory: per the decision doc)
- All overnight commits are in private repos under `ttracx/*`; cross80127 invited at write on each
- 8:30am PT scheduled standup will fire and produce the formal daily report; this briefing is the head-start

Coffee then keyboard. Talk in 4 hours.
