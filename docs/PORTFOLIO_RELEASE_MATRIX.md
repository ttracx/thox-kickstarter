# THOX Portfolio Release Matrix

**Canonical single-page truth for SKU x Base Model x Device Firmware x Factory Registry x Release.**

Last refreshed: **2026-07-02 EOD** (T-41 days to Kickstarter launch Aug 12 2026 / T-35 days to filming window Jul 7 2026). Phase C 12B fully shipped end-to-end this refresh.

This document consolidates release state across 15+ THOX repos so backers,
videographers, fulfillment, and the operator team have one place to answer:
"what model is on this SKU, what firmware ships, and where is the current
release?" If any of the columns below drift from this doc, this doc wins —
downstream READMEs, spec sheets, and campaign copy must match.

---

## 1. Shipping SKUs (Aug 12 launch)

| SKU | Base model (Ollama tag) | Device SoC | Device firmware | Factory registry | Latest release | Aug 12 launch status |
|---|---|---|---|---|---|---|
| **ThoxKey** | `thoxmini-3b` Q3_K_S -> `ttracx/thoxmini:240steps` | Commodity USB (host machine's CPU) | THOX Key USB image builder (`build_image.py` + 5 tier loadouts) | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thox-key` releases](https://github.com/ttracx/thox-key/releases) (latest: `portal-v0.4.0`) + [`ttracx/thoxkey-c175-enclosure` v2.0.0 Air-DNA](https://github.com/ttracx/thoxkey-c175-enclosure/releases/tag/v2.0.0) | GO — factory-model path ready; Stripe SKUs pending user action #1; enclosure v2.0.0 watertight-STL set ready |
| **ThoxMini** | `thoxmini-3b` Q3_K_S -> `ttracx/thoxmini:240steps` | Luckfox Pico Mini B (RV1103, 64 MB DDR2, 128 MB flash, 0.5 TOPS NPU) | `thoxymicro` Go agent (MIT, IP-015) at `/usr/local/bin` | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thoxmini-soc`](https://github.com/ttracx/thoxmini-soc) — no release yet, pre-launch (SoC is Luckfox Pico Mini B, board harness lives in `ttracx/thox-luckfox-pico-mini-b`); [`ttracx/thoxymicro`](https://github.com/ttracx/thoxymicro) — no release yet, pre-launch (main branch is canonical) | GO — SoC + Go agent both on `main`, model path ready; provisioner action #4 (`tailscale up`) pending user |
| **ThoxMini Air** | `thoxmini-3b` Q3_K_S -> `ttracx/thoxmini:240steps` | Luckfox Pico Mini B (RV1103) x 4-8 nodes | MagStack ring firmware (magnetic pogo cluster; A14 MagStack Coordinator agent) | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thoxmini-air-soc`](https://github.com/ttracx/thoxmini-air-soc) — no release yet, pre-launch (SoC identical to ThoxMini per 2026-06-25 memory revision); [`ttracx/magstack-air` v0.2.0](https://github.com/ttracx/magstack-air/releases/tag/v0.2.0) (memory index refers to v0.3.0 target; **current shipping tag is v0.2.0** as of 2026-07-02) | GO — SoC path shared with ThoxMini; MagStack Air v0.2.0 shipping; v4 QIDI Q2 3MF print kit ready; user actions #7 + #8 (physical prints of Air v4 + Cluster Dock) pending |
| **ThoxClip** | `thoxmini-3b` Q3_K_S -> `ttracx/thoxmini:240steps` | Pi Zero 2 W (Miady transplant v3, donor-teardown kit) | `thoxclip-miady` firmware (transplant v3 print kit + safety gates) | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thoxclip-miady-pizero-transplant-v3` v0.1.0](https://github.com/ttracx/thoxclip-miady-pizero-transplant-v3/releases/tag/v0.1.0) | GO on firmware + transplant kit; user action #5 (insert SD card in USB reader OR connect Pi to USB-OTG) pending — this is the flash blocker |
| **ThoxNova** | `thoxgemma4-12b-lora` Q4_K_M -> `ttracx/thoxgemma4-12b:phase-c` (shipping today); `thoxnova-12b-agent` + `thoxnova-12b-core` Q4_K_M staged on same publish path | LattePanda N100 (Intel x86 CPU / SYCL / Vulkan; locked 2026-06-01, replaces Jetson Orin NX) | ThoxOS Nova firmware (device install still pending) | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) — `thoxgemma4-12b-lora` v0.1.5 status=**shipping**, `uploaded_at=2026-07-03T01:12Z`, GGUF 6.87 GiB, Ollama id `8cadf21e8824` | [`ttracx/thox-gemma4` `phase-c-published-2026-07-02`](https://github.com/ttracx/thox-gemma4/releases/tag/phase-c-published-2026-07-02) — three artifacts shipped: HF `Thox-ai/thoxgemma4-12b-lora` commit `77a3325733...` + GGUF Q4_K_M 6.87 GiB + Ollama `ttracx/thoxgemma4-12b:phase-c` | GO on models — Phase C 12B fully shipped end-to-end 2026-07-02 (HF + GGUF + Ollama); model line no longer blocks Kickstarter. Remaining Nova gap is device-only: user action #9 (flash LattePanda N100 + run install.sh) is the launch-critical keyboard step; the ThoxOS Nova firmware still needs a release cut against the SoC repo. Model layer of PULL_FORWARD_TRACKER item 14 = CLOSED. |

---

## 2. Portable + POC row group

| Product | Base model | Runtime path | Host | Factory registry | Latest release | Aug 12 launch status |
|---|---|---|---|---|---|---|
| **ThoxOS Mini Portable v1.1.0** | `thoxmini-3b` default | Ollama sidecar container inside `thoxos-mini/docker-compose.yml` (6 GB RAM limit, internal `thoxos-mini-net` bridge, model pull on first boot into persistent `ollama-models` volume) | Docker on user's machine | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thoxos-mini-portable`](https://github.com/ttracx/thoxos-mini-portable/releases) — latest tag is **v1.0.0**; **v1.1.0 alignment commit `cb521e6` on main**: `feat(llm): align to thoxllm-factory 0.1.6 model allocation (thoxmini-3b default)`. v1.1.0 tag pending release cut. | GO — main branch has 0.1.6 alignment landed; v1.1.0 tag is a keyboard-away formality |
| **Fire Tablet 7" POC (5 SKUs)** | `thoxmini-3b` Q3_K_S -> `ttracx/thoxmini:240steps` | Ollama server on tablet, prompt UI via sideloaded APK | Amazon Fire Tablet 7" (MT8163, 1 GB / 8 GB, Android 5.1 patched via Fire OS 5) | [`thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) | [`ttracx/thoxllm-factory` v0.1.6](https://github.com/ttracx/thoxllm-factory/releases/tag/v0.1.6) + [`apps/fire-tablet-7in-poc/`](https://github.com/ttracx/thoxllm-factory/tree/main/apps/fire-tablet-7in-poc) | GO — POC apps live under factory v0.1.6; MODEL_QUANT_MATRIX + DEMO_SCRIPT complete |

---

## 3. Runtime + support row group (portfolio infrastructure)

| Component | Role | Substrate / target | Latest release | Notes |
|---|---|---|---|---|
| **thoxos-kernel v1.2.0** (signed) | Rust microkernel + kernel runtime | Any THOX device | [v1.2.0 signed release 2026-06-29](https://github.com/ttracx/thoxos-kernel/releases/tag/v1.2.0) — SHA `70598e8` (staging commit `8952fc7`) | Smoke gate **PASSING**; MVP-39 orchestrator tag; v1.3-foundation staged post-v1.2.0 (`23c6861`) with KMS abstraction + 5-ring RolloutPolicy schema |
| **thox-litert-lm v0.1.0** | Pure-Rust GGUF inference (LiteRT-LM substrate) | On-device runtime | [`ttracx/thox-litert-lm` v0.1.0](https://github.com/ttracx/thox-litert-lm/releases/tag/v0.1.0) (Phase 0 scaffold `v0.1.0-phase0` + Phase 0 tag `v0.1.0`) | 14-crate workspace; ADR-001/002; CI green; IP-022 |
| **thoxllm-factory v0.1.6** | Model factory — produces every model artifact + canonical allocation table | 8 shipping models across the portfolio (thoxforge / thoxmini / thoxglobal / thoxwave / thoxnova-unleashed / thoxgemma4-12b / thoxnova-12b-agent / thoxnova-12b-core) | [`ttracx/thoxllm-factory` v0.1.6](https://github.com/ttracx/thoxllm-factory/releases/tag/v0.1.6) | Aug 12 primary training path; `registry/0.1.6.json` is portfolio-wide source of truth for `base_model` -> `ollama_tag` -> `gguf_files` |
| **thox-kernel-agents v0.1.0** | Continuous kernel-vuln + enhancement scanning agents | Operates against `thoxos-kernel` crates | [`ttracx/thox-kernel-agents` v0.1.0](https://github.com/ttracx/thox-kernel-agents/releases/tag/v0.1.0) — 4-role team (Haiku 4.5 / Sonnet 4.6 / Opus 4.8+Codex / Opus 4.8+gpt5.5 dual); 100 files / ~7454 LOC; 14 pytest + 3 vitest | INVARIANTS I1-I5 mandatory pre-scan; feeds `thoxos-kernel` crates/`thox-agent-hub` v0.8.0 (MVP-34 substrate) |
| **thox-loop-engine v0.1.0** | Self-improving OODA orchestrator (ThoxLoop v0.1.0 subpackage) | Operates factory batches; 5-agent OODA scaffold + ratchet benchmark subsystem | [`ttracx/thox-loop-engine` v0.1.0](https://github.com/ttracx/thox-loop-engine/releases/tag/v0.1.0) | 320 pytest green (planner-worker wave); TEL 4-wave absorption complete (foundation -> registry -> structure -> vertical-slice); v0.2 tag deferred to wave 5 (real-adapter env-wire + first real-model loop test) |

---

## 4. Aug 12 Launch Readiness

- **Ship-readiness percent:** **~96%** (up from 94% — Phase C 12B fully shipped end-to-end 2026-07-02 EOD; three-artifact HF + GGUF + Ollama publish on `thoxgemma4-12b-lora` cleared the last model-layer blocker on the ThoxNova line)
- **Acceptance-gate count:** **4/10 fully closed** (`REWARDS_MATRIX.md`, `PRESS_KIT.md`, `FAQ.md`, spec-sheet paths). **2 effectively-ready pending physical capture** per today's 2026-07-02 8:30 AM PT standup (magstack-cluster shot + iphone-tailscale shot each have production-ready scripts at `docs/video-script/` but need the physical hardware moment for real capture). 4 remaining are hardware + Phase C + Thox.ai PR merges.
- **Team status roll-up:** **8/8 on-track** as of the 2026-07-02 8:30 AM PT standup.
- **Filming window:** opens **Jul 7 2026 (T-35)**. What MUST be done before filming:
  1. **MagStack physical assembly** — user actions #7 + #8 in `PULL_FORWARD_TRACKER.md` (ThoxMini Air v4 print 90 min + Cluster Dock print 6.5 h in QIDI Studio). Blocks `magstack-cluster.md` + `air-led.md` shot beats.
  2. **iPhone Xcode Preview render** — needed for the `iphone-tailscale.md` shot beat (10 s iPhone-controls-Nova); Xcode preview render is the fastest path if Nova physical provisioning slips.
  3. **Nova device provisioning** — user action #9 (flash LattePanda N100 with Ubuntu 24.04 + run `install.sh`). Blocks `unbox-nova.md` shot beat (12 s unbox + 8 s boot); Xcode preview is the fallback.
- **User keyboard-only remaining items:** **13** (from `PULL_FORWARD_TRACKER.md` section 1 as of 2026-07-01 EOD; item 14 CLOSED 2026-06-29 via `make phase-c-kickoff`). Of the 13: 4 are one-command ready (#1, #2, #4, #11), 4 are GitHub/Vercel UI (#3, #6, #10, #12), 5 are physical hardware (#5, #7, #8, #9) or manual review (#13).

---

## 5. Cross-references (all confirmed live 2026-07-02)

- [`ttracx/thoxllm-factory` `registry/0.1.6.json`](https://github.com/ttracx/thoxllm-factory/blob/main/registry/0.1.6.json) — canonical model allocation source of truth (schema 1.6; adds `thoxnova-12b-agent` + `thoxnova-12b-core`)
- [`ttracx/thoxllm-factory` `apps/fire-tablet-7in-poc/docs/MODEL_QUANT_MATRIX.md`](https://github.com/ttracx/thoxllm-factory/blob/main/apps/fire-tablet-7in-poc/docs/MODEL_QUANT_MATRIX.md) — Fire Tablet 7" POC quant matrix cross-referencing registry 0.1.6
- [`ttracx/thoxos-mini-portable` `docs/MODEL_ALLOCATION.md`](https://github.com/ttracx/thoxos-mini-portable/blob/main/docs/MODEL_ALLOCATION.md) — ThoxOS Mini Portable model allocation source of truth
- [`ttracx/thoxinchip` `docs/SOC_SELECTION_MATRIX.md`](https://github.com/ttracx/thoxinchip/blob/main/docs/SOC_SELECTION_MATRIX.md) — why LattePanda for Nova, why Luckfox for Mini/Air (public-safe explainer for backers)
- [`ttracx/thox-provisioner` `docs/DEVICE_MATRIX.md`](https://github.com/ttracx/thox-provisioner/blob/main/docs/DEVICE_MATRIX.md) — canonical SKU-to-image mapping for every device the provisioner flashes
- [`ttracx/thox-kickstarter` `docs/KICKSTARTER_SHIPPING_PLAN.md`](https://github.com/ttracx/thox-kickstarter/blob/main/docs/KICKSTARTER_SHIPPING_PLAN.md) — master shipping plan across 40+ portfolio repos
- [`ttracx/thox-kickstarter` `docs/video-script/README.md`](https://github.com/ttracx/thox-kickstarter/blob/main/docs/video-script/README.md) — 5 filming beats (unbox-nova + magstack-cluster + usb-ollama + air-led + iphone-tailscale)

---

## 6. Change log for this matrix

- **2026-07-02** — Initial cut. Consolidates SKU + model + firmware + release across 15+ repos. Populated from `thoxllm-factory/registry/0.1.6.json` + per-repo tag lists (verified via local `.git`) + `PULL_FORWARD_TRACKER.md` 2026-07-01 EOD headline metrics + 2026-07-02 8:30 AM PT standup. Single most important gap at cut: **ThoxNova SoC repo (`ttracx/thoxnova-soc`) has no release yet and the ThoxOS Nova firmware is still TBD**.
- **2026-07-02 EOD** — Phase C 12B fully shipped end-to-end. Three artifacts live: HF adapter `Thox-ai/thoxgemma4-12b-lora` commit `77a3325733...`, GGUF Q4_K_M 6.87 GiB (4.95 BPW) built via llama.cpp `Gemma4UnifiedModel` converter at `conversion/gemma.py:768`, and Ollama tag `ttracx/thoxgemma4-12b:phase-c` (id `8cadf21e8824`, 7.4 GB). Model layer of the ThoxNova line no longer blocks the Kickstarter. New biggest gap is device-only: **ThoxNova SoC (`ttracx/thoxnova-soc`) still has no release + ThoxOS Nova firmware release still needs a cut against that repo + user action #9 (LattePanda N100 flash) remains launch-critical**. Ship-readiness 94% -> 96%. `thox-gemma4` tag: `phase-c-published-2026-07-02`.
