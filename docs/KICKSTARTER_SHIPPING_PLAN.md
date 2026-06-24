# THOX.ai Kickstarter shipping plan

**Launch date**: Tue Aug 12 2026, 9:00am PT
**Days remaining**: 49 (T-49 as of 2026-06-24)
**Filming window**: T-35 to T-14 (Jul 7 to Jul 28 2026)
**Goal**: ship 4 fully functional prototype devices on camera for the
launch video, with the entire software / firmware / provisioning
stack live by film day.

This plan is the **single source of truth** for Kickstarter prep
across the THOX.ai portfolio. It is the output of a parallel audit
of 40+ repos and lists every gap between today and a working launch
video, organized into 8 parallel agent workstreams.

## Build host decision (2026-06-23): local workstation, NOT cloud VM

The standing #1 blocker (shared Linux build host) is **RESOLVED** by using the local KnightHub workstation as `THOX-BUILD-01`. WSL Ubuntu 26.04, i7-14700F 28t, 127.7 GB RAM, RTX 4060 Ti 16 GB, 320+ GB free NVMe. More compute than any reasonable cloud VM and $0 recurring cost.

Decision doc: [`docs/internal/BUILD_HOST_DECISION.md`](internal/BUILD_HOST_DECISION.md).
Bootstrap script: [`scripts/provision-thox-build-01.sh`](../scripts/provision-thox-build-01.sh).

Status as of this update:
- Workspace `~/thox-shiproom/` created with `builds/ artifacts/ secrets/ runners/ logs/`
- Rust nightly + 4 of 5 bare-metal targets installed (script picks up the 5th)
- qemu-system-x86_64 + qemu-system-arm + grub-mkrescue + clang + cmake + ninja + git + python3 + docker already on the box
- Bootstrap script idempotently installs lld + qemu-user-static + debootstrap + cosign + tailscale + GitHub Actions runner template, generates the cosign keypair, writes ENVIRONMENT.txt

Teams B, C, D, E, F are unblocked the moment the bootstrap script finishes its first run + 5 self-hosted runners get registered (5 tokens, ~10 min total). The $95-180/mo cloud-VM line item is reallocated to Pi Zero inventory + Kickstarter video production + packaging samples per the decision doc.

## Operating policy: pull-forward when ahead

When an agent team finishes a queued item ahead of its scheduled slot,
the next queued item is pulled forward immediately. No waiting for the
scheduled handoff. After completion, this plan is updated to reflect:
the shipped item, the new in-progress item, and any downstream date
that can slide left. See memory `feedback_pull_forward_when_ahead`.

The standing #1 blocker today is the shared Linux build host (gates
B/C/E/F). When work is blocked there, pull from unblocked lanes
(A/D/G/H) instead.

## SHIPPED 2026-06-23 (ahead-of-schedule wave)

The following items shipped today, ahead of any deadline in this
plan. None were in this plan's task table; all were pulled forward
under the policy above and pushed.

| Lane | Shipped | Repo | Status |
|---|---|---|---|
| Brand product line | **ThoxKey v0.2.0** end-to-end (4-SKU restructure + Next.js portal scaffold + Rust launcher + 5 white-label templates + 91-PNG hero gallery + cross-platform renderer) | [ttracx/thox-key](https://github.com/ttracx/thox-key) | tag v0.2.0 pushed |
| Brand product line | **ThoxStick POC v0.2.0** (investor-grade geometry refresh: X logo 24->432 tris, PCB dummy 324->480 tris, 402035 battery dummy + T-7 Kickstarter decision packet + supplier CAD intake doc) | [ttracx/thox-stick-poc](https://github.com/ttracx/thox-stick-poc) | tag v0.2.0 pushed |
| Print fleet | **100% print-readiness across all 126 print STLs** (lay-flat 28 floats + convert 13 ASCII to binary + new `scripts/audit_print_readiness.py` CI-gate) | [ttracx/thox-3dprint-kit](https://github.com/ttracx/thox-3dprint-kit), [ttracx/thoxmini-q2-prototype](https://github.com/ttracx/thoxmini-q2-prototype) | shipped + verified exit 0 |
| Cross-link hygiene | 4 sibling READMEs updated to reference ThoxKey (`thoxllm-factory`, `thox-portable-agent`, `thox-workbench`, `thox-system-prompts`) | per-repo | shipped via 4 parallel agents |
| Kernel | thoxos-kernel v1.1.25 (MVP-32 release-mgr signature adapter absorbed) | [ttracx/thoxos-kernel](https://github.com/ttracx/thoxos-kernel) | shipped |
| Marketing | Thox.ai claim-reconciliation pass (11 commits, Super Early Bird / Founders refs removed) | (private) | in progress |

48 commits across 11 repos in 24 hours. Velocity is real.

## Pulled forward 2026-06-23

| Lane | Pulled forward | Status | Commit / tag |
|---|---|---|---|
| **G Apps** | thox-terminal v0.3 mDNS device discovery scaffold (zero-config "see my Pi Zero stack" video beat) | **SHIPPED 2026-06-23** as v0.3.0-rc1 | commit `077daf0` + tag `v0.3.0-rc1` |
| **G Apps** | thox-terminal v0.3 Tailscale local-API host import (composes with v0.3.0-rc1 mDNS + THOX-BUILD-01 Tailscale install to enable "see Tommy's whole fleet in one tap" video beat) | **SHIPPED 2026-06-23** as v0.3.0-rc2 | commit `3ed8a8f` + tag `v0.3.0-rc2` |
| **G Apps** | thox-terminal v0.3 Keychain private-key storage + ThoxOS `thoxos status` JSON parser bundled | **SHIPPED 2026-06-23** as v0.3.0-rc3 | commit `640707f` + tag `v0.3.0-rc3` |
| **B2B portal** | thox-key portal Vercel deploy config + GitHub Actions CI (lint + typecheck + build CI workflow + manual-trigger deploy workflow + PORTAL_DEPLOY.md runbook + pnpm-lock.yaml + check-env script) | **SHIPPED 2026-06-23** as portal-v0.1.0 | commit `caad6ff` + tag `portal-v0.1.0` |
| **D Models** | thoxllm-factory Cohere North-Mini-Code eval branch (download_model.sh + build_llamacpp_pr24260.sh + run_benchmark.py + summarize_results.py + 22 subset prompts + 7 new agentic-coding prompts + reuses existing eval/run_eval.py harness for the 4 comparison adapters) | **SHIPPED 2026-06-23** as eval-north-mini-code-rc1 | commit `54cfbd7` + tag `eval-north-mini-code-rc1` |
| **B2B portal** | thox-key portal pages: pricing + account dashboard + admin (dashboard / batches / customers) + login + magic-link auth scaffold | **SHIPPED 2026-06-23** as portal-v0.2.0 | commit `13a22f9` + tag `portal-v0.2.0` |
| **G Apps** | thox-terminal v0.3.0-rc4 = ThoxMini first-run onboarding + local THOXY endpoint config per device (two P1 dev-queue items bundled; powers "unbox -> plug in -> already paired" + "tap a device, your local Ollama is wired" video beats) | **SHIPPED 2026-06-23** as v0.3.0-rc4 | commit `97d17b4` + tag `v0.3.0-rc4` |
| **B2B portal** | thox-key portal-v0.3.0 = order detail + asset uploader + preview + checkout + admin batch detail + admin customer detail + auth callback round-trip + Stripe Halo checkout (real `stripe.checkout.sessions.create`) | **SHIPPED 2026-06-23** as portal-v0.3.0 | commit `1674564` + tag `portal-v0.3.0` |
| **G Apps** | thox-terminal v0.3.0-rc5 = Secure Enclave P256 keygen + Ed25519 software fallback + ThoxKeyExporter to OpenSSH PEM + audit log writer with rotation + Settings export with no private-key leakage | **SHIPPED 2026-06-23** as v0.3.0-rc5 | commit `46598c6` + tag `v0.3.0-rc5` |
| **D Models** | thoxllm-factory: ThoxKey portable runtime model mirror prep + sync script (MANIFEST.yaml + 5-model coverage + --verify-loadouts cross-check + 12/12 tests pass) | **SHIPPED 2026-06-23** as mirror-v0.1.0 | commit `eead49c` + tag `mirror-v0.1.0` (plus thox-key cross-link `e8e50be`) |
| **G Apps** | thox-terminal v0.3.0-rc6 = tmux quick-action set per device kind (24 actions across 6 device kinds) + Connect-handoff polish (`ThoxDashboardFocusCoordinator` pulse) + v0.3.0 release notes draft | **SHIPPED 2026-06-24** as v0.3.0-rc6 | commit `95e1d98` + tag `v0.3.0-rc6` |
| **B2B portal** | thox-key portal-v0.4.0 = RLS policies SQL (with `is_admin()` + `customer_users` join table) + 5 transactional email templates (plain TSX, zero new deps) + `/api/orders/[id]/quote` + `/api/orders/[id]/promote` + `/api/admin/batches/[id]/ship` + `/api/cron/activation-rollup` routes (Phase 1 backlog COMPLETE) | **SHIPPED 2026-06-24** as portal-v0.4.0 | commit `6f314f5` + tag `portal-v0.4.0` |
| **Brand product line** | thox-portable-agent ThoxKey integration (plain-Node zero-dep: `dashboard/thoxkey.mjs` module + cross-platform mount detection + 5s polling + `/api/thoxkey` + `/api/thoxkey/apply` endpoints + in-banner UX with THOX palette + 14/14 tests via `node --test`) | **SHIPPED 2026-06-24** as v0.2.0 | commit `c8647f1` + tag `v0.2.0` |
| **Cross-product foundation** | NEW `ttracx/thox-actions` repo: canonical mobile-action schema + FunctionGemma 270M FT mobile inference adapter (litert-community/functiongemma-270m-ft-mobile) + executor registry; ThoxOS + thox-terminal + thoxos-companion + thoxos-air-image + thox-portable-agent all consume this layer for natural-language action routing | dispatched 2026-06-24 (in flight) | tbd |
| **G Apps** | thox-terminal v0.3.0-rc7 = thox-actions integration + Spotlight command palette + 14 per-variant executors (composes with v0.2/rc1/rc2/rc3/rc4/rc5/rc6) | **SHIPPED 2026-06-24** as v0.3.0-rc7 | commit `141a9e4` + tag `v0.3.0-rc7` |
| **Cross-product foundation** | `ttracx/thox-actions` v0.1.0 SHIPPED with 4 Rust crates (1339 LoC), 36/36 tests green, model-card-agnostic prompt template. Patched in commit `4228eef` to correct the actual hub id `litert-community/functiongemma-270m-ft-mobile-actions` + add the real perf specs (289 MB dynamic_int8, 154 tk/s decode on S25 Ultra) | **SHIPPED 2026-06-24** as v0.1.0 + fix `4228eef` | commit `4ab04dc` + `4228eef` |
| **Campaign ops** | `ttracx/thox-ks-monitor` v0.1.0: 58-file Next.js + Supabase + RLS Kickstarter ops dashboard. Lane A sanctioned CSV import + Lane B opt-in public scrape (ScrapingBee default) + Claude digest. `docs/TOS_POSTURE.md` closes the stored-credential lane. CI gates typecheck + lint + build. Cross-linked from thox-kickstarter README. | **SHIPPED 2026-06-24** as v0.1.0 | commit `474113b` + cross-link `2ad89b5` |
| **Edge AI** | `ttracx/thox-edge-skills` v0.1.0: 23 Google AI Edge Gallery skills across 9 device categories + utilities. Text-only + JS + native-intent variants. catalog.json + Python validator + CI workflow. THOX brand palette in every webview. Cross-linked from thox-actions. IP-035. | **SHIPPED 2026-06-24** as v0.1.0 | tag `v0.1.0` |
| **Industrial design** | `ttracx/thox-enclosures` v0.1.0: 12 v0 placeholder STLs (3 lay-flat-corrected) + OpenSCAD sources + dimension JSON + per-device ENVELOPE.md. Rev A spec docs for all 3 devices + shared MATERIALS / HARDWARE_BOM / PRINT_PROFILE. Qidi Q2 print queue assets: CSV (em-dashes scrubbed) + bed layout PNG + queue cards PNG + operator workflow doc. 3 ADRs (lifecycle / format trilogy / OpenSCAD toolchain). CI runs print-readiness audit; fails on FLOATING/OFFBED. **Discrepancy logged**: ThoxClip v0 ships 86 x 100 x 11.8 (rotated 90 deg from user-stated 100 x 86 x 11.8); Rev A spec pins user value as authoritative. | **SHIPPED 2026-06-24** as v0.1.0 | commit `1eec157` + cross-link `65afc3f` |
| **A Marketing** | P0 CRITICAL Thox.ai claim-reconciliation: 13 commits, 0 contradictions remaining on live `src/app/` surface, 317 obsolete files moved under `archive/`, 4 Stripe-side renames enumerated in `STRIPE_RECONCILIATION_NEEDED.md`. `pnpm exec tsc --noEmit` zero new errors in src/. | **SHIPPED 2026-06-24** as 13-commit series | final commit `bad5424` |
| **Industrial design** | `ttracx/thox-enclosures` rev-a-v0.2.0: 12 shared OpenSCAD utility modules + 15 per-device .scad files (Mini 4, Air 5, Clip 6) + `tools/build_stls.py` orchestrator + 12 produced STLs (100% lay-flat clean, all within Q2 Combo bed) + 3 per-device PRINT_PLAN docs. STEP + 3MF derivation paths gracefully skip when FreeCAD / Prusa Slicer not on PATH (this rig has only OpenSCAD). | **SHIPPED 2026-06-24** as rev-a-v0.2.0 | commit `ad0a964` + tag `rev-a-v0.2.0` |
| **Cross-product foundation** | `ttracx/thox-actions` v0.2.0: bundle inspection extracted the ACTUAL FunctionGemma I/O contract from `MobileActions_270M.zip`. **The model emits a custom k:v shape, NOT JSON**: `<start_function_call>call:NAME{key:value}<end_function_call>`. Real Jinja chat template (5,124 bytes) checked in as `FUNCTIONGEMMA_BASE_PROMPT`. New `parser.rs` handles truncation + missing markers + nested JSON values + value coercion (null/bool/int/float/string). 55/55 tests pass (was 36). 10 smoke fixtures covering 10 of 13 ThoxAction variants. | **SHIPPED 2026-06-24** as v0.2.0 | commit `a31e840` + tag `v0.2.0` |
| **G Apps** | thox-terminal v0.3.0-rc8: sync the rc7 `FunctionGemmaHTTPInferencer` + parser to the v0.2 k:v contract (was JSON stub). Add `MockFunctionGemmaServer` test fixture. Wire the new contract end-to-end so command palette -> HTTP -> FunctionGemma -> k:v -> ThoxAction -> executor runs through the real wire format. | dispatched 2026-06-24 (in flight) | tbd |
| **Edge AI** | thox-edge-skills v0.2.0: update the `thox-route-action` JS skill to emit/parse the real k:v shape. Pin `chat_template.jinja` as an asset. Add 8-12 more device-specific skills now that the contract is locked. Regenerate catalog.json + run the Python validator gate. | dispatched 2026-06-24 (in flight) | tbd |

### Portal-v0.3.0 detail (thox-key)

15 new files. Order flow now end-to-end: `/order/[id]` shows status timeline + summary + batches + invoices; `/order/[id]/assets` is a working co-brand uploader (drag-drop logo + color picker + landing URL + live SVG case mockup composing logo + color + QR; `<canvas>`-based 1024px dimension check client-side, server-side recheck on save); `/order/[id]/preview` shows the assembled mockup; `/order/[id]/checkout` creates a REAL Stripe Checkout session (Halo 100% / Starter-Standard-Pro-Edu 50% / Enterprise 30% deposit math; metadata.order_id correlates to the existing webhook). Admin: `/admin/batches/[id]` has status-transition controls + QC log table + shipment form; `/admin/customers/[id]` shows contacts + orders + aggregate activation rate. Magic-link callback functional (`exchangeCodeForSession` + same-origin next-redirect). `npx tsc --noEmit` + `npx next build` + `npx next lint` all clean. 15 routes (was 9).

Handoff: RLS policies in `schema/policies.sql`, transactional email templates (Resend/Postmark), and first-time Vercel link with `order.thoxkey.io` DNS.

### Rc5 detail (thox-terminal)

SE keygen module (5 sources + 4 tests + 1 spec): `ThoxSecureEnclaveAvailability` enum with simulator-vs-device detection, `ThoxSecureEnclaveKeygen` actor (P256 ECDSA via SE, Ed25519 software fallback via CryptoKit), `ThoxStoredKeyKind` enum embedded in rc3 `ThoxPrivateKeyMetadata`, `ThoxKeyExporter` actor producing OpenSSH PEM. Wired into rc4 `ThoxOnboardingCoordinator`: prefer SE P256 when available, fall back to Ed25519 software; `ThoxOnboardingKeygenIntegrationTests` walks the rc4 happy path through SE routing.

Audit log module (4 sources + 1 test): `ThoxAuditEvent` enum (deviceClaimed / keyGenerated / sshConnected / sshFailed / thoxyConfigured / keyDeleted / etc.), `ThoxAuditLogWriter` actor appending JSONL with 5 MB / 30-day rotation, `ThoxAuditLogReader` for the export. Wired into v0.2 SSH lifecycle + rc1 device claim + rc3 key import/delete + rc4 onboarding + rc4 THOXY config.

Settings export module (2 sources + 1 test): `ThoxSettingsExporter` actor + `ThoxSettingsExportView` SwiftUI. Three export flavours (audit / device profiles / everything). Test verifies NO `pem` / `password` / `passphrase` / `private key` / `credentialid` substrings appear in any encoded blob.

Handoff: SE module needs `authorized_keys` registration over the rc4 claim channel so a freshly generated SE public half lands on the device's SSH agent without manual rekeying. Audit log needs an optional THOXY-endpoint remote sink. Settings export needs the matching importer so two THOX Terminal installs can round-trip a fleet via the `schemaVersion: 1` envelope.

### Mirror-v0.1.0 detail (thoxllm-factory + thox-key)

8 files added to thoxllm-factory under `mirror/thoxkey/`: README + MANIFEST.yaml (5 models: thoxllm-327m-v2 + thoxmicro-125m + thoxgem-e4b-sft + thox-forge-7b + thox-wave-8b-unleashed) + sync_to_thoxkey_mirror.py (idempotent; hardlinks from `$THOX_MODELS_DIR` to `$THOXKEY_MODEL_MIRROR`; `--allow-missing` + `--verify-loadouts` flags) + check_mirror.py + 2 test files + scripts/sync_thoxkey_mirror.sh wrapper. `--verify-loadouts` against the live thox-key repo: zero drift. 12 of 12 tests pass. Top-level README updated with "ThoxKey runtime mirror" section.

thox-key side: `loadouts/README.md` added pointing at the factory MANIFEST as authoritative source; `runtime/shared/build_image.py` header amended with cross-repo contract note.

Handoff: one-liner at the rig: `bash scripts/sync_thoxkey_mirror.sh --source-dir /mnt/c/Users/tommy/models --mirror-dir ~/models/thoxkey-mirror && python mirror/thoxkey/check_mirror.py`. Then `python thox-key/runtime/shared/build_image.py --loadout default --tier standard --target /Volumes/THOXKEY-test --batch-id THOXKEY-CI-001 --dry-run` should succeed end-to-end against the populated mirror.

### Portal-v0.2.0 detail (thox-key)

18 new files: `app/pricing/page.tsx`, `app/account/page.tsx`, `app/admin/{page,batches/page,customers/page}.tsx`, `app/login/{page,actions}.{tsx,ts}`, 8 components (`Header`, `AdminHeader`, `Footer`, `Card`, `StatusBadge`, `DataTable`, `KpiCard`, `ActivationChart`), 3 libs (`lib/account.ts`, `lib/admin.ts`, `lib/auth.ts`). Recharts 2.12.7 for the activation chart (SSR-friendly, single linearGradient stays on-palette). Admin gating: `ADMIN_EMAILS` env var allowlist checked in `lib/auth.ts#isAdminEmail` until a `staff` table lands. CI green after a Node 20 -> 22 bump (resolved a pnpm 11 / `node:sqlite` mismatch). Local Windows verification clean.

Handoff: order detail page (`/order/[id]`), admin batch detail (`/admin/batches/[id]`), `app/api/auth/{signout,callback}` to close the magic-link loop, Stripe checkout for Halo + deposit invoices, customer detail page, the 5 email templates set (order received / assets needed / deposit invoice / shipped / 30-day activation report).

### Rc4 detail (thox-terminal)

Onboarding (4 sources + 3 tests + 1 spec): `ThoxOnboardingState` 5-step enum + transition validator, `ThoxOnboardingCoordinator` actor state machine that composes rc1 `ThoxDiscoveryService` + rc2 `ThoxTailscaleImportService` + rc3 `ThoxPrivateKeyStore` + rc4 `ThoxTHOXYEndpointStore` + v0.2 device store / connector via `onDeviceClaimed` Sendable hook. Ed25519 keypair generated via `CryptoKit.Curve25519.Signing.PrivateKey`. Happy path runs end-to-end in `ThoxOnboardingViewModelTests.testFullFlowEndsInDone` (welcome → scan → claim → confirmClaim → installKey → skipTHOXY → done).

THOXY endpoint config (5 sources + 3 tests + 1 spec): `ThoxTHOXYEndpoint` value type + URL validator + suggested-URL helper (default `http://<discovered-host>:11434/api/chat` for Ollama-compatible), `ThoxTHOXYEndpointStore` actor under `ai.thox.terminal.thoxy.*` namespace, `ThoxTHOXYClient` 2s-timeout probe with injectable transport, `ThoxTHOXYConfigViewModel` + `ThoxTHOXYConfigView` sheet + `ThoxTHOXYBadge` (emerald healthy / magstack unhealthy / gray unconfigured) wired into dashboard `DeviceCard`. URLSession wiring functional, not stubbed.

Handoff: Onboarding needs Secure-Enclave Ed25519 generation + canonical OpenSSH PEM wrapping so the generated key is SSH-usable without export. THOXY needs dashboard-side probe cadence so the badge updates automatically + a "Clear" CTA on the config sheet.

### Rc3 detail (thox-terminal)

Keychain module: 5 sources + 3 tests + 1 spec. `ThoxPrivateKeyStore` composes cleanly with the v0.2 `ThoxSecretStore` protocol under a private `ai.thox.terminal.privatekey.*` namespace; cannot collide with existing credential UUID accounts.

ThoxOS status module: 4 sources + 3 tests + 1 spec. `ThoxOSStatusFetcher` is functional (runs `thoxos status --json` over the existing v0.2 `ThoxSSHTransport`, strips shell preamble, classifies failures). Dashboard `DeviceCard` shows the live strip the moment a fetcher attaches.

Handoff: Keychain needs `ThoxConnectionCoordinator` wired so an operator can pick a stored key by identifier. ThoxOS status needs real-device verification against the ThoxNova prototype + the THOX-BUILD-01 MagStack with kernel v1.1.25 + a `ScenePhase` hook to pause polling when the app backgrounds.

### Portal-v0.1.0 detail (thox-key)

CI workflow gates lint + typecheck + build on every push to `portal/**` using placeholder env (no real secrets required). Deploy workflow is manual-trigger only (no auto-deploy). `pnpm-lock.yaml` committed (lockfileVersion 9.0, pnpm 11 generated); CI pinned to pnpm 11 to match. `docs/PORTAL_DEPLOY.md` covers Vercel link + GitHub secrets + custom domain + rollback.

Handoff: `vercel link` from `portal/`, `gh secret set VERCEL_TOKEN/VERCEL_ORG_ID/VERCEL_PROJECT_ID --repo ttracx/thox-key`, populate Vercel prod env vars (Supabase + Stripe), then `gh workflow run portal-deploy.yml --repo ttracx/thox-key --field environment=production`.

### Eval-rc1 detail (thoxllm-factory)

13 new files under `eval/cohere-north-mini-code/`. Existing `eval/run_eval.py` harness REUSED for the comparison adapters (Forge-7B / Wave-8B-Unleashed / Nova-12B-Unleashed / ThoxGem-E4B); the new `run_benchmark.py` is the cohere2moe-specific orchestrator that spawns llama-server from the PR-#24260 build and captures latency + tokens/sec. 22 prompts subset from the existing 58-prompt suite (coding + reasoning) plus 7 new agentic-coding prompts targeting Cohere's tool-call training. Tests 10/10 passing.

Handoff: at the 4060 Ti rig, run `bash eval/cohere-north-mini-code/scripts/download_model.sh && bash eval/cohere-north-mini-code/scripts/build_llamacpp_pr24260.sh && python eval/cohere-north-mini-code/scripts/run_benchmark.py --compare && python eval/cohere-north-mini-code/scripts/summarize_results.py`, then fill in `eval/cohere-north-mini-code/DECISION.md`. Approx 30 min download + 20 min build + 2 hr benchmark.

Delivered: real URLSession against `http://localhost:41112/localapi/v0/status` with the `Host: local-tailscaled.sock` anti-DNS-rebinding header, 2s timeout. `ThoxTailscaleClient` actor + `ThoxTailscalePeer` / `ThoxTailscaleStatus` types + `ThoxTailscaleImportService` mapping Tailscale peers to v0.3.0-rc1 `ThoxDiscoveredDevice`. `ThoxTailscaleImportViewModel` + `ThoxTailscaleImportView` SwiftUI sheet. macOS path functional; iOS path stubbed with `// TODO(ios):` falling through to `.daemonUnreachable` empty state. 3 test files with URLProtocol mock transport. `docs/superpowers/specs/2026-06-23-tailscale-import-design.md`. 10 added + 6 modified.

Next contributor for thox-terminal v0.3.0 (out of rc2): iOS Network Extension exploration to bind the Tailscale-supplied socket, tag-based device-kind heuristics once THOX `tag:*` taxonomy locks, real-device verification on the live THOX-BUILD-01 tailnet with ThoxNova prototype + 4-node Pi Zero MagStack for the Kickstarter video beat.

Delivered: real NWBrowser wiring against `_thox._tcp` service type (default port 22) with `includePeerToPeer: true`, ThoxDiscoveryService actor + ThoxDiscoveryViewModel + ThoxDiscoveryView, both iOS + macOS Info.plist with NSBonjourServices and NSLocalNetworkUsageDescription, Discovery tab wired into ThoxRootView, 3 test files with a fixture seam, `docs/superpowers/specs/2026-06-23-mdns-discovery-design.md`. README + development_queue.md updated. 10 files added + 6 modified.

Next contributor needs: real-device verification on a Pi Zero MagStack advertising `_thox._tcp` (captures the Kickstarter video beat), then polish the "promote and connect" hand-off so the freshly-discovered device gets the dashboard's active-connection highlight, then cut `v0.3.0`.

## Plan correction (2026-06-23 wave)

This plan previously listed thox-terminal v0.2 SSH as in-flight. A
verification pass during pull-forward dispatch found that v0.2
**already shipped on 2026-06-22**:

- Commit `f4ba35b` "docs: TestFlight submission guide for v0.2 (T-49 Kickstarter handoff)"
- Citadel 0.12.1 SSH dependency in `Package.swift`
- Full `ThoxSSHClient` + `ThoxSSHTransport` + `ThoxSSHCommandBuilder`
- Vault stores: `ThoxKeychain`, `ThoxCredentialStore`, `ThoxSnippetStore`, `ThoxKnownHostsStore`, `ThoxConnectionLogStore`
- Live interactive shell view + test suite + design spec at `docs/superpowers/specs/2026-06-22-ssh-connectivity-design.md`
- Keychain Sharing entitlements for iOS + macOS

Mark thox-terminal v0.2 native SSH as **SHIPPED 2026-06-22 (commit f4ba35b)**. Lane G Apps proceeds to v0.3.

## Demo gap analysis (per device)

What the video must show vs. what currently works:

| Device | Video beat | Current status | Gap |
|---|---|---|---|
| **ThoxNova** (6" tablet) | 6" display running ThoxOS + 12B local inference + MagStack pogo-pin stacking | thoxos-kernel v1.1.24, NO_GO on v1.2.0 (no QEMU evidence, no signed release). thox-gemma4 Phase C 12B not yet trained. STL set ready (v2.1). | **HIGH RISK**: kernel can't boot Nova hardware in video; 12B not on Ollama yet |
| **ThoxClip** (MagStack puck) | Stacking, Qi2 charging, mesh sync with other clips | STL set ready (v7.1 with recessed pocket). magstack-air fabric exists but unverified on real Pi Zero 2 W stack. No clip-specific firmware repo in the audit. | **MEDIUM RISK**: cluster assembly unproven on camera; clip firmware repo missing |
| **ThoxMini** (USB-C stick) | Local inference on a host laptop | STL set ready (v2.1 with USB-C cutout). thoxos-air-image is the Mini Air image but actually RV1103 Mini also uses this. No signed image artifact yet. | **MEDIUM RISK**: no bootable signed image |
| **ThoxMini Air** (carry-along) | Button controls + carabiner + mesh sync | STL set ready (v2.1 with 4 button cutouts + carabiner ring). magstack-air + magstack-air-edge-rs need Rust env build + Pi Zero 2 W deploy. | **MEDIUM RISK**: not verified to compile + run end-to-end |
| **All devices (marketing site)** | thox.ai matches the Kickstarter pricing + date | Site says "April 14 2026 / starting at $549"; Kickstarter playbook says "Aug 12 2026 / $39-$499" | **CRITICAL**: marketing site contradicts the video |
| **ThoxStick** (candidate SKU, NOT in launch lineup) | 96 x 28 x 11.8 mm private-AI compute stick, emerald X mark | v0.2.0 ready at [ttracx/thox-stick-poc](https://github.com/ttracx/thox-stick-poc) + mirror at `thox-3dprint-kit/devices/thoxstick/poc/`. 18 STLs lay-flat clean, 91 STL-derived preview PNGs, investor-grade X logo + PCB dummy refresh, cross-platform renderer. T-7 decision packet at `thox-stick-poc/docs/KICKSTARTER_DECISION_T7.md` (3 outcomes). Supplier CAD intake at `thox-stick-poc/docs/SUPPLIER_CAD_INTAKE.md` (6-component priority). | **OPTIONAL stretch SKU**: do NOT add to launch lineup pre-Aug 12. **T-7 decision Aug 5**: OUTCOME_A stretch reward $49 / OUTCOME_B roadmap teaser / OUTCOME_C hold. Default OUTCOME_C if no call by EOD. Mechanical mockup only; no powered electronics. |
| **ThoxKey** (parallel revenue lane, NOT in main launch SKU lineup) | Sub-$50 commodity USB drive preloaded with private local AI; B2B bulk swag + university bookstore + DTC halo | v0.1.0 live at [ttracx/thox-key](https://github.com/ttracx/thox-key). Ships TODAY on commodity USB hardware + THOX portable runtime + factory model loadouts. 6 tiers ($19-$49), 5-25 day lead time, $1M north-star at 9 months. Full ordering portal spec, fulfillment runbook, BOM, supplier list, 3 outreach templates ready. | **PARALLEL LANE, NOT a launch dependency**: can ship before, during, or after Aug 12 without affecting the 4-SKU launch lineup. Education tier could appear as Kickstarter add-on for $25 if we cut a HS / university discount reward. Distinct from ThoxStick. |

## Critical-path repos (the 12 that must ship)

Sorted by demo-blocking priority. Each is owned by a specific agent
team (see "Agent team structure" below).

| Priority | Repo | Current state | Must-have for launch | Owner team |
|---|---|---|---|---|
| **P0** | `Thox.ai` (marketing site) | April 14 / $549 copy | Aug 12 / 4-SKU lineup | Team A (Marketing) |
| **P0** | `thox-command-center` | Not gitted | Keep PRIVATE; never link from public | Team A (Marketing) |
| **P0** | `thoxos-kernel` | v1.1.24, NO_GO | QEMU evidence + signed v1.2.0 release | Team B (Kernel) |
| **P0** | `thoxos-air-image` | No signed artifact | Signed v0.1 image released to GH | Team C (Images) |
| **P0** | `thox-gemma4` | Phase C 12B blocked on tx5.6 | Phase C 12B trained + GGUF | Team D (Models) |
| **P0** | `thoxllm-factory` | P1.5 pending | 7 Ollama tags live + ThoxGem-E4B GGUF | Team D (Models) |
| **P1** | `thox-provisioner` | ThoxAir MaskROM untested | Cross-platform smoke test | Team E (Provisioning) |
| **P1** | `magstack-air` + `magstack-air-edge-rs` | Compile unverified | Run on real 4-8 Pi Zero 2 W stack | Team F (MagStack) |
| **P1** | `thox-terminal` | v0.1.0 scaffold | v0.2 native SSH for "control from iPhone" beat | Team G (Apps) |
| **P1** | `thoxos-companion` | Not on TestFlight | TestFlight build for iPhone beat | Team G (Apps) |
| **P2** | `thoxinchip` | Branch unmerged | GDS render of ThoxCPU for "silicon roadmap" cutaway | Team H (Silicon) |
| **P2** | `thox-watch` | Hardware bring-up | Display + I2C verified for stretch-goal "ThoxWatch coming" beat | Team H (Silicon) |

## Day 0 launch order (revised 2026-06-23 per shiproom review)

Four corrections to the original plan:

1. **Team A is medium-high risk, not low.** Public Thox.ai site has
   broader contradictions than the hero/countdown: founder pricing
   `$629`, ThoxMini `$89.99`, `$899` cost comparison line, December
   2026 delivery language, Founders Campaign framing. Full claim
   reconciliation pass needed, not just a hero rewrite.

2. **Team B must be a risk-reduction lane, not the video's single
   point of failure.** Three legal release-decision outcomes:
   `GO_REAL_HARDWARE_BOOT` | `GO_QEMU_ONLY_FOR_KICKSTARTER` |
   `NO_GO_KERNEL_NOT_FOR_VIDEO`. T-21 (Jul 22) is the binding
   fallback cutoff; after that, kernel stops chasing real hardware
   and Teams C/E/F own the physical-device beats.

3. **Team D blocker is reframed.** The transformers ecosystem is
   already past 5.6 (5.12.1 publicly available). The real Team D
   gate is: pin a known-good transformers version, run Phase C 12B,
   generate model cards/tags, prove at least one Nova-class local
   inference path. Not "wait for upstream."

4. **Team C/E are more important than they look.** The
   `thoxos-air-image` rootfs overlay currently ships placeholder
   `thox-mesh-ctl` and `thox-assistant` binaries that prevent
   services from failing but do no real work. That makes C/E the
   practical hardware-demo fallback if B slips. Shadow-start them
   on Day 0, not Week 2.

### Day 0 launch order

```
# Start IMMEDIATELY today
1. Team A — Marketing site + command-center lockdown
2. Team B — Kernel v1.2.0 signed evidence lane (3-outcome decision)
3. Shared Linux build host — required by B, C, E, F (provision TODAY,
   not "this week"; see docs/agent-dispatch/build-host-spec.md)

# Shadow-start TODAY if any capacity exists
4. Team C — signed Pi Zero 2 W / RV1103 image artifact (physical
   fallback lane if B slips)
5. Team E — cross-platform flasher + MaskROM path (no image counts
   unless it can be flashed safely)

# Start after build host is online (within 48h)
6. Team D — model training / tagging / runtime proof
7. Team F — MagStack compile + physical hero shot
8. Team G — Terminal / Companion TestFlight proof

# Optional / drop-first if schedule compresses
9. Team H — silicon GDS + ThoxWatch wrist B-roll
```

**Order rationale**: Team A protects trust. Team B protects technical
credibility. Teams C/E protect the physical-device fallback. That
combination ships a real Kickstarter video without over-claiming.

## Agent team structure (revised risk ratings)

8 parallel agent teams. Each runs as a Claude Code agent + a human
DRI from THOX. Teams ship in parallel; coordination only at the
weekly check-in (Fri 5pm PT) + the daily blocker triage in Slack
`#ks-ops`.

### Team A: Marketing site reconciliation (`Thox.ai`)
- **DRI**: Phamy
- **Repos**: `Thox.ai`, `thox-command-center`
- **Goal**: ship the production marketing site that matches the
  Kickstarter playbook (Aug 12 / 4 SKUs / $39-$499) by T-30 (Jul 13).
- **Workstream**:
  1. Rewrite hero copy to match `thox-kickstarter/docs/CAMPAIGN_INFO.md`
  2. Replace single-SKU framing with 4-SKU lineup grid (ThoxClip /
     Mini / Air / Nova)
  3. Update Stripe deposit flow to match new $39+ entry tier
  4. SEO + JSON-LD for the new launch date
  5. Hero device render swap (use `thox-blueprint` exploded-view
     output of ThoxNova v2 + ThoxClip v7.1)
  6. Stand up `thox-command-center` as a private repo with a 1-line
     "internal only" README; verify NO inbound links from
     public THOX surfaces
- **Acceptance**: site live at thox.ai with the new copy by T-30;
  no command-center references from any public repo
- **Risk**: low (mostly content)

### Team B: ThoxOS kernel v1.2.0 release
- **DRI**: Craig
- **Repos**: `thoxos-kernel`
- **Goal**: ship a signed v1.2.0 release that boots on ThoxNova
  LattePanda N100 hardware by T-21 (Jul 22).
- **Workstream**:
  1. Set up a Linux build host with rust-bare-metal toolchain +
     GRUB + QEMU
  2. Run the 7 `v120-*.log` command-specific smoke transcripts
  3. Generate real detached release signature (NOT local HMAC)
  4. Release-manager human sign-off (Craig)
  5. Tag v1.2.0; absorb the parked carve-out into the default
     kernel tree
  6. Boot test on actual LattePanda N100 dev board
  7. Boot test on actual Pi Zero W (ThoxMini) + Pi Zero 2 W
     (ThoxMini Air / MagStack)
- **Acceptance**: `cargo build --release` produces a signed kernel
  binary that boots `thoxos> ` shell on N100 + Pi Zero W
- **Risk**: **HIGH** — kernel work is the longest pole. May require
  scope reduction if v1.2.0 slips (e.g., film with v1.1.24 booting in
  QEMU on screen instead of real silicon)

### Team C: Image build + signing
- **DRI**: Craig
- **Repos**: `thoxos-air-image`, `thoxair-pico-sdk`,
  `thox-luckfox-pico-mini-b`
- **Goal**: ship signed Pi Zero 2 W / RV1103 OS image for ThoxMini
  Air (also reused for ThoxMini RV1106) by T-21 (Jul 22).
- **Workstream**:
  1. Stand up a privileged Linux build host (image build won't
     run on Windows)
  2. Run `customize.sh` end-to-end with cosign signing
  3. Verify boot on real Pi Zero 2 W hardware
  4. Ship thox-mesh-ctl + thox-assistant systemd units actually
     working
  5. Merge the v0.2 branches on `thoxair-pico-sdk` and
     `thox-luckfox-pico-mini-b`; tag both v0.2.0
  6. Decide: does ThoxMini (RV1106) get its own image, or reuse
     the Air image? Resolve `thoxos-mini-build` scratch dir
     (either delete or promote to real repo)
- **Acceptance**: signed image artifact on the GH release page;
  Pi Zero 2 W boots to ThoxMini Air branded login + LED strip lit
- **Risk**: medium — depends on Linux build host availability

### Team D: Model training + publish
- **DRI**: Phamy
- **Repos**: `thox-gemma4`, `thoxllm-factory`,
  `thox-gemma4-e4b-sft`, `thox-micro-125m`
- **Goal**: every device has a working local model on Ollama by
  T-28 (Jul 15) for filming.
- **Workstream**:
  1. **transformers 5.6+ bump** (precondition for Phase C 12B)
  2. **Phase C 12B QLoRA train** on the 4060 Ti rig
  3. **GGUF Q4_K_M export** for the 12B + verify Intel CPU/Vulkan
     inference on a LattePanda N100 (the actual ThoxNova hardware)
  4. **thoxllm-factory P1.5**: publish the 7 ready Ollama tags
     (Forge-7B, Mini-3B, Global-7B, Wave-8B, Nova-12B-Unleashed,
     two ThoxGem-E4B variants)
  5. **ThoxGem-E4B GGUF + Ollama tag**: merge LoRA -> bf16 ->
     GGUF Q4_K_M -> Ollama tag `thoxgem:e4b`
  6. **thox-gemma4 E2B**: train + quantize for ThoxAir NPU
     (Coral or M.2 Hailo-8L); benchmark tokens/sec on real RV1103
  7. **thox-micro-125m SFT**: instruction-tune for ThoxClip /
     ThoxMini routing
- **Acceptance**: `ollama pull ttracx/<tag>` works for at least 5
  THOX models; ThoxNova on N100 hits >=4 tokens/sec on 12B; ThoxAir
  on Pi Zero 2 W + Coral hits >=10 tokens/sec on E2B
- **Risk**: medium-high — model training is fast (~12 hours per
  training run) but RKNN/Vulkan inference paths are unverified on
  real hardware

### Team E: Device provisioning + flashing
- **DRI**: Tommy
- **Repos**: `thox-provisioner`, `thoxos-mini-flasher`,
  `thoxos-mini-utm-build`, `thox-quickstart`,
  `thoxos-mini-ai-usb-factory`
- **Goal**: every device can be flashed in <5 min on Windows + macOS
  by T-14 (Jul 29).
- **Workstream**:
  1. **thox-provisioner ThoxAir MaskROM**: live cross-platform smoke
     test on Windows + macOS
  2. **thoxos-mini-flasher** live smoke on macOS (Windows + web
     Docker already verified)
  3. **thoxos-mini-utm-build .utm signature** validation; pair with
     **ThoxOS-Mini-Provision** end-to-end
  4. **thoxos-mini-ai-usb-factory Phase 2 ISO**: build the 12B+ on
     a Linux host; SHA256 verify; smoke on x86_64 UEFI
  5. **thox-quickstart audit trail**: finish per-unit acceptance
     QA result JSON; this is the fulfillment gate (Nov 2026)
- **Acceptance**: a Kickstarter-day demo where Tommy plugs in a
  fresh ThoxAir USB stick + Pi Zero 2 W board, runs the flasher,
  and the device boots into THOX branding in under 5 minutes,
  end-to-end on camera
- **Risk**: medium — ThoxAir MaskROM is the unknown

### Team F: MagStack cluster physical assembly
- **DRI**: Craig
- **Repos**: `magstack-air`, `magstack-air-edge-rs`,
  `thox-q2-print-farm` (Cluster Dock)
- **Goal**: assemble a working 8-node MagStack column of Pi Zero 2 W
  + magnetic pogo-pin connector by T-21 (Jul 22) for the
  campaign's hero "wow" shot.
- **Workstream**:
  1. Compile `magstack-air-edge-rs` in a real Rust environment
     (currently generated in sandbox without Rust toolchain)
  2. Deploy to a Pi Zero 2 W: run `cargo test --workspace`
  3. Print 8 Cluster Dock split-and-bond pieces on the Q2 Combo;
     validate dovetail joint strength
  4. Source 8 Pi Zero 2 W + 8 ThoxClip v7.1 enclosures + 8
     magnetic pogo connectors + 1 USB-PD power source
  5. Assemble physical stack; verify leader election + work
     queue distribution under load
  6. Verify each device's emerald LED pulses out of phase by 90
     degrees (the "wave through the stack" hero motion)
- **Acceptance**: 8-clip stack boots, leader election succeeds,
  workload distributes; LED wave visible on camera at 30 fps
- **Risk**: medium — physical assembly + the Cluster Dock joint
  strength is the hardware risk

### Team G: Apps + companion experience
- **DRI**: Phamy
- **Repos**: `thox-terminal`, `thoxos-companion`,
  `thoxos-companion-multiplatform`, `thox-portable`, `thox-workbench`
- **Goal**: every "control from your phone" or "developer story"
  beat in the video has a real app behind it by T-28 (Jul 15).
- **Workstream**:
  1. **thox-terminal v0.2**: Xcode app target + SwiftNIO SSH +
     SwiftTerm; bundle id `ai.thox.terminal`; Keychain
     entitlement; manual device-add sheet; iOS TestFlight build
  2. **thoxos-companion TestFlight**: P0 PEM trust anchor task +
     iOS TestFlight build
  3. **thoxos-companion-multiplatform**: pick first shipping
     target (Android APK preferred); ship APK to a sideload
     channel for filming
  4. **thox-portable** v0.2 PWA: deploy `apps/web-assistant` to
     Vercel; record the LAN companion launch flow
  5. **thox-workbench v0.1.0** is already ready; record a USB
     plug-in workflow for the "developer story" beat
- **Acceptance**: TestFlight build of thoxos-companion + thox-terminal
  on Tommy's + Craig's iPhones; APK of multiplatform companion on
  one Android handset; Vercel deploy of thox-portable's PWA live
- **Risk**: medium — SwiftNIO SSH integration is the weakest link

### Team H: Silicon + wearable narrative (B-roll only)
- **DRI**: Craig
- **Repos**: `thoxinchip`, `thox-watch`
- **Goal**: shoot enough B-roll for the "silicon roadmap" cutaway
  and the "ThoxWatch stretch goal" tease by T-14 (Jul 29).
- **Workstream**:
  1. **thoxinchip**: merge `docs/team-d-devices` branch; render a
     GDS layout of the PolarQuant MAC + ThoxCPU; export to PNG
     for B-roll
  2. **thox-watch**: flash `thoxwatch_c3_supermini` firmware to a
     real ESP32-C3 SuperMini; verify display + backlight + BMI160
     I2C scan; shoot a 5-second "wrist display lighting up" clip
- **Acceptance**: 1 silicon-roadmap PNG + 1 wrist clip in the asset
  library
- **Risk**: low — these are NOT critical-path; they are stretch
  visual content. Drop if other workstreams need attention

## Dependency graph

```
Team A (Marketing) ─────────────────────────► T-30 site live
                                                    │
                                                    ▼
Team B (Kernel) ─────────► v1.2.0 ─────────► T-21 kernel boots Nova
                              │
                              ▼
Team C (Images) ─────────► signed image ───► T-21 Air boots branded
                              │
                              ▼
Team D (Models) ─────────► Ollama tags ────► T-28 12B on Nova
                              │
                              ▼
Team F (MagStack) ────────► 8-clip stack ──► T-21 cluster live
                              │
                              ▼
Team E (Provisioning) ───► flasher works ──► T-14 demo flash
                              │
                              ▼
Team G (Apps) ────────────► TestFlight ────► T-14 phone beat
                              │
                              ▼
Team H (Silicon) ─────────► B-roll PNG ────► T-14 stretch tease
                              │
                              ▼
                           FILM DAY (T-7 = Aug 5)
                              │
                              ▼
                           LAUNCH (T+0 = Aug 12 9am PT)
```

## Weekly milestones (T-49 to T+0)

### Week of 2026-06-22 (T-49 to T-42) — kickoff
- All 8 teams assigned DRIs + agent instances spun up
- Each team posts a 1-line week-1 plan in `#ks-ops`
- Marketing site (Team A) drafts new copy

### Week of 2026-06-29 (T-42 to T-35)
- Team B: Linux build host operational; first QEMU smoke
- Team D: transformers 5.6+ bump merged + Phase C 12B training started
- Team A: site copy review + design draft
- Team F: Cluster Dock prints from Q2 Combo
- Team G: thox-terminal Xcode target stood up

### Week of 2026-07-06 (T-35 to T-28) — filming prep
- Team C: signed image artifact released
- Team D: 7 Ollama tags live (P1.5)
- Team G: TestFlight builds in beta review
- Team A: site live at staging URL
- Team F: 8-clip stack assembled

### Week of 2026-07-13 (T-28 to T-21) — film week
- All hero shots filmed
- Team B: v1.2.0 release tagged + signed
- Team A: site GA at thox.ai
- Team D: 12B on Nova hardware verified
- Team E: flasher demo recorded

### Week of 2026-07-20 (T-21 to T-14) — edit + B-roll
- Team H: silicon + watch B-roll filmed
- Hero video edit complete
- Press kit final

### Week of 2026-07-27 (T-14 to T-7) — embargo + final
- Press embargoed copies sent
- Final video lock
- All apps + sites verified

### Week of 2026-08-03 (T-7 to T+0) — launch week
- T-7: full team rehearsal of launch-day choreography
- T-3: "we launch in 3 days" email
- T+0: launch (9am PT Aug 12 2026)

## Risk register

| ID | Risk | P | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | thoxos-kernel v1.2.0 slips past T-21 | H | ThoxNova can't boot on camera | Film with v1.1.24 booting in QEMU on the 6" display; voice-over describes the v1.2.0 work | Team B |
| R2 | Phase C 12B training fails to converge | M | ThoxNova flagship demo uses 7B instead of 12B | Pre-stage Nova-12B-Unleashed as fallback (already trained at 240 steps) | Team D |
| R3 | MagStack cluster doesn't compile on Pi Zero 2 W | M | Drop the 8-stack hero shot | Pre-record the magstack-air dashboard view on a desktop simulator | Team F |
| R4 | TestFlight rejection on thoxos-companion | M | iPhone beat falls back to a sideload via Xcode | Submit to TestFlight by T-35 to allow rejection-correction loop | Team G |
| R5 | Marketing site not live by T-30 | H | Kickstarter video contradicts the site | Lock copy by T-42; ship to staging T-35 | Team A |
| R6 | Linux build host unavailable | H | Kernel + image cannot ship | Provision a cloud Linux instance (Hetzner / AWS) by T-49 | Team B + C |
| R7 | Q2 Combo prints fail on multi-color toolchanges | M | Cluster Dock + device shells unprintable | Run the precision coin calibration first (already documented at thox-3dprint-kit/print-queue/00-PRECISION-COIN-CALIBRATION.md) | Team F |
| R8 | thox-command-center leaks into public surface | H | Confusion or trust loss | Audit every public repo for "command-center" references by T-30; CI check on Thox.ai builds | Team A |

## Acceptance criteria for launch-day demo

The hero video (2:30) MUST show:

- [ ] Tommy or Phamy unboxing a ThoxNova v2 (matte black) and
      powering it on — display lights up with ThoxOS within 8
      seconds
- [ ] An 8-clip MagStack column doing inference (visible LED wave
      sweeping the stack)
- [ ] A ThoxMini USB stick plugged into a generic laptop running
      `ollama run thoxgem:e4b` and getting a response in <10 sec
- [ ] A ThoxMini Air carry-along clipped to a backpack with the
      LED strip pulsing emerald
- [ ] An iPhone (running thoxos-companion or thox-terminal)
      controlling the ThoxNova over Tailscale
- [ ] Marketing site at thox.ai matching the Kickstarter copy

The Kickstarter page MUST link to:

- [ ] 4-device pricing tier in `docs/REWARDS_MATRIX.md`
- [ ] Spec sheet for each device in
      `thox-3dprint-kit/devices/<device>/v2/README.md`
- [ ] Press kit at `docs/PRESS_KIT.md`
- [ ] Backer FAQ at `docs/FAQ.md`

## Dispatch

Each team's agent is launched via:

```
agent: claude-sonnet-4-6
prompt: <see docs/agent-dispatch/<team>.md>
isolation: worktree (per team, on the relevant repo)
working-dir: C:\Users\tommy\dev\<repo>
```

Per-team dispatch prompts live at `docs/agent-dispatch/team-<X>.md`
(generated separately). The DRI reviews the agent's daily report
in `#ks-ops` and signs off on weekly milestones.

## Daily ritual

- 8:30am PT: standup in `#ks-ops` — each team posts blockers in
  1 line
- 12pm PT: agent-dispatched async update from each team
- 5pm PT: blocker triage (DRIs + Tommy)
- Fri 5pm PT: weekly milestone review + plan-next-week
