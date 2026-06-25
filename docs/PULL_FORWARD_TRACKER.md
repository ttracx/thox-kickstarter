# Pull-forward tracker

Living doc. Updated continuously during autonomous-admin sprints. Truth as of 2026-06-25.

Two columns matter:
- **Status**: what shipped, what's in flight, what's blocked
- **Action needed (you)**: the keyboard-only items I cannot do on your behalf

When every row in the "Action needed (you)" column is checked, we are ship-ready for the Aug 12 2026 Kickstarter launch (T-48 days from this writing).

---

## Ship gates for Aug 12 launch

### Hardware

| Item | Status | Action needed (you) |
|---|---|---|
| ThoxMini provisioned on Luckfox Pico Mini | shipped (thox-quickstart PR #1 + #2 merged) | none |
| ThoxMini Tailscale join | staged; tailscaled installed, not joined | `adb shell tailscale up --hostname=thoxmini-luckfox --tun=userspace-networking --advertise-tags=tag:thoxmini --accept-routes` (needs tailnet auth key) |
| ThoxMini Air enclosure rev2 | READY TO PRINT (audit verdict; PR #2 in thox-3dprint-kit) | print one back + one front in PETG @ 0.16 mm; fit-check the snaps |
| ThoxClip Pi Zero 2 W flash | blocked on hardware | plug in Pi (USB-OTG port, not PWR) or insert SD card in a USB card reader (~$5 from Amazon) |
| ThoxNova LattePanda N100 prototype | not yet provisioned | confirm N100 board is in hand and accessible; I can stage the provisioner once you confirm |
| MagStack Air 4-8 node demo | enclosure ready (rev2); stack untested | print 4-8 enclosures + stack on rig |
| Pi Zero 2 W cluster physical assembly | print kit shipped (thox-3dprint-kit rev2 + cross-refs) | print 4-8 units; record assembly time |

### Software

| Item | Status | Action needed (you) |
|---|---|---|
| THOXCore 7-adapter foundation | SHIPPED 2026-06-24; 145/145 tests | none |
| THOXCore v0.3 integration phase (router + FFI + observability) | SHIPPED 2026-06-24; 176/176 tests | none |
| thoxcore v0.2.0 final tag | rig verifier prints READY; Mac + CUDA box pending | run `bash scripts/verify_v0.2.0.sh` on Mac + on CUDA box; when both READY, `git tag v0.2.0 && git push origin v0.2.0` |
| thoxcore v0.3.0 final tag | release notes staged on main; verifier exits 2 (workspace ready, observability sub-tag still un-cut) | tag `v0.3.0-observability` first if you want it; then `git tag v0.3.0 && git push` |
| thoxllm-factory router-shim | merged; 13 tests | none |
| thoxllm-factory shipping tags publicly available on Ollama | local-only; not pushed to ollama.com | `ollama push ttracx/<tag>` for each of the 7 baseline tags (or wait until campaign launch) |
| thoxllm-factory thoxforge HumanEval template bug | known; 0% pass@1 due to Llama-2 INST template mismatch | being fixed this sprint |
| thoxforge dashboard wired through THOXCore router | merged; behind THOX_USE_THOXCORE_ROUTER flag | `docker compose up` on ops VPS when ready |
| THOXCore Phase E (tracing + multi-region) | starting this sprint | none |
| Kickstarter integration (FastAPI ops ingestion) | merged with fulfillment-risk slice | deploy on ops VPS before T-3 days |
| Edge Gallery skills on ThoxMini | 14 installed + verified | none |

### Infrastructure

| Item | Status | Action needed (you) |
|---|---|---|
| THOX-BUILD-01 self-hosted runner | bootstrap fixed for User namespace; 6 consumer PRs open | run `pwsh C:\Users\tommy\dev\setup-thox-build-01.ps1` in PowerShell |
| Consumer workflows wired to thox-build-01 labels | 6 PRs open (thoxos-kernel/thox-portable/magstack-air-edge-rs/thox-quickstart/thoxllm-factory/thox-luckfox-pico-mini-b) | merge after runner registers |
| xcframework CI on thox-terminal | blocked on cross-repo PAT | create fine-grained PAT scoped Contents:Read on ttracx/thoxcore; add as repo secret `THOXCORE_REPO_PAT` in ttracx/thox-terminal |
| Stripe product/price reconciliation (4 renames) | blocked on Stripe auth | complete Stripe MCP OAuth OR export `STRIPE_SECRET_KEY` env var |

### Campaign + content

| Item | Status | Action needed (you) |
|---|---|---|
| Kickstarter playbook (`ttracx/thox-kickstarter`) | actively updated; rewards copy locked | none |
| Cohere North-Mini-Code eval baseline | ran 2026-06-25; 3 baselines on HumanEval + MBPP-Plus + thox_dev rubric; $0 spent | download Cohere model (~18 GB from `unsloth/North-Mini-Code-1.0-GGUF`) + build llama.cpp PR-24260 if you want the full comparison |
| Website (`ttracx/Thox.ai`) SoC update | PR #215 OPEN, awaiting your "go" | review PR #215 + say "go Thox.ai" to merge |
| Hero shots / unboxing video | not started | provide approval to script + render an AI walkthrough; OR record once enclosures print |
| Demo script for Kickstarter video | not started | I can draft once enclosures print |
| THOXKey hero asset (sub-$50 USB swag) | repo + portal scaffold complete | bulk MOQ orders await pricing tier finalization |

### Memory + ops

| Item | Status | Action needed (you) |
|---|---|---|
| Memory hygiene | up-to-date through 2026-06-25 | none |
| Naming canonical: ThoxMini vs ThoxMini Air | both on Luckfox Pico Mini B; Air adds MagStack ring; locked 2026-06-25 | none |
| Repo namespace `ttracx/` is User account | bootstrap script patched; runner registration uses repo-scoped endpoint | none |

---

## Open PRs awaiting your review or "go"

Updated end-of-day. Numbers approximate; check `gh pr list --search "is:open author:@me"` for the canonical view.

| Repo | PRs open | Notes |
|---|---:|---|
| ttracx/thox-3dprint-kit | 2 | #1 engineering audit + #2 rev2 absorb. Merge in order. |
| ttracx/magstack-air | 1 | #4 SoC update |
| ttracx/thox-stick-poc | 1 | #2 RELATED_PRODUCTS |
| ttracx/thox-quickstart | 1 | #4 INVENTORY + enclosure link |
| ttracx/thox-gemma-3n-e4b-litert-lm | 1 | #1 device TOML |
| ttracx/thox-edge-quantizer-studio | 1 | #1 device profile (review-flagged) |
| ttracx/thox-watch | 1 | #2 comparison spec |
| ttracx/Thoxllama.cpp | 1 | #6 integration plan |
| ttracx/thoxos-insider-wsl | 1 | #1 tier map |
| ttracx/magstack-air-llm | 1 | #1 README note |
| ttracx/magstack-air-edge-rs | 1 | #2 README note |
| ttracx/thoxos-kernel | 2 | #1 ci wiring + #2 SoC reconcile (review-flagged armv7l vs riscv64gc) |
| ttracx/thox-kickstarter | 1 | #2 SoC reconcile |
| ttracx/thox-workbench | 1 | #1 devices catalog |
| ttracx/thox-playbooks | 1 | #1 platform spec |
| ttracx/thox-portable | 1 | #2 ci wiring |
| ttracx/thoxllm-factory | 1 | #3 ci wiring |
| ttracx/thox-luckfox-pico-mini-b | 1 | #2 ci wiring |
| ttracx/Thox.ai | 1 | **#215 AWAITING USER GO** |

Total: ~22 PRs across the portfolio. Only the Thox.ai PR is gated on your explicit "go". Everything else is mergeable at will under blanket-approval.

---

## In-flight pull-forwards (active sprint)

Updated as agents report.

| Sprint | Task | Status |
|---|---|---|
| 2026-06-25-A | thoxforge HumanEval template fix | in flight |
| 2026-06-25-B | THOXCore Phase E: tracing pipeline + multi-region routing | in flight |
| 2026-06-25-C | MagStack Cluster Dock print pack | in flight |
| 2026-06-25-D | ThoxNova LattePanda N100 provisioner kit | in flight |

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
