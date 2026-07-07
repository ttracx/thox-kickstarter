# THOX Model Review — 2026-07-07

**Team:** [`agent_tasks/model-review-team.md`](../agent_tasks/model-review-team.md)
**Standard:** [`docs/MODEL_PROFILE_STANDARD.md`](MODEL_PROFILE_STANDARD.md)
**Gate:** `python3 scripts/review_thox_models.py` → **PASS (0 warnings)**

## Scope

Reviewed the live model sets on:
- Hugging Face — https://huggingface.co/Thox-ai (org activity, newest first)
- Ollama — https://ollama.com/Thox-ai?sort=newest

…and diffed them against the repository's model surfaces.

## Discovery — live inventory

**Hugging Face `Thox-ai` (22 repos):**

| Model | Base | Visibility | Notes |
|---|---|---|---|
| ThoxWebby-Gemma-4-E2B | gemma-4-E2B-it-qat-mobile-transformers | gated (public listing) | **NEW** · browser/WebGPU · transformers.js · demo Space |
| ThoxMythos-9B | Qwen3.5-9B | gated · private | **NEW** · uncensored reasoning · function-calling · 1M context |
| ThoxMini-3B / ThoxForge-7B / ThoxGlobal-7B / ThoxWave-8B | Llama-3.2-3B / Mistral-7B / Qwen2.5-7B / dolphin-2.9-llama3-8b | public | already in catalog |
| ThoxNova-12B-Core / ThoxNova-12B-Agent | gemma-4-12B / gemma-4-12B-it-assistant | public | already in catalog |
| thox-cloud-* (llama70b, nemotron70b, qwen3-32b), thox-nova-llama31-8b | 70B/32B/8B upstreams | private | ThoxCloud LoRAs — out of campaign scope |
| thoxgemma4-12b-lora, ThoxLLM-327M(-v2), thox-gem-e4b, thox-*-unleashed, lowercase `thox-*` | various | private | internal/older training repos |

**Ollama `Thox-ai` (19 tags):**
- Newest (≤ yesterday): `thoxgemma4` (`:12b-q4_k_m`, 256K ctx, 7.4 GB), `thoxnova-core`, `thoxnova-agent`, `thoxnova-12b-core`, `thoxnova-12b-agent`, `thoxwave-8b`, `thoxforge-7b`, `thoxglobal-7b`, `thoxmini-3b`, plus short aliases `thoxmini`/`thoxglobal`/`thoxforge`/`thoxwave`.
- 4 months old: `nellie-core`, `nellie-coder`, `nellie-coder-next`, `nellie-orchestrator`, `nellie-research`, `nellie-vision`.

## Diff vs. repository (before this review)

**New (added this run):**
- `ThoxWebby-Gemma-4-E2B` — was absent everywhere. Added to `models/catalog.json` (family `webby`) and to the download center with the browser/WebGPU story + demo Space link.
- `ThoxMythos-9B` — was absent. Added as a `gated` / `coming-soon` profile (access-on-request; not presented as openly pullable).
- `ThoxGemma4` Ollama tag corrected to the live `Thox-ai/thoxgemma4:12b-q4_k_m` (256K ctx).

**Fixed for consistency (Standard §2/§3):**
- Ollama namespace standardized to canonical **`Thox-ai/`** in `kickstarter/sources/models.html` + the rebuilt `kickstarter/site/models.html` (was `thox-ai/` ×19 and `THOX-ai/` ×6) and in the README (`ollama.com/thox-ai` → `ollama.com/Thox-ai`).
- `ThoxNova-12B-Agent` base aligned to `Gemma-4-12B-it-assistant` (matched the registry / assistant-draft pairing note).

## Validation — standards gate

All 15 canonical profiles pass the profile standard: required fields present, canonical `Thox-ai/` namespaces, allowed capability/device vocabularies, blurb length + honesty rule. `live` models resolve on at least one source; the two gated models keep real source + Space links but are labelled **gated** and carry no copy-paste pull command.

```
THOX Model Review — 15 profiles in models/catalog.json
  live: 14  |  gated/coming-soon: 1  |  families: ['core', 'nellie', 'webby']
GATE: PASS (0 warning(s))
```

## Files touched

- `models/catalog.json` (new registry)
- `docs/MODEL_PROFILE_STANDARD.md` (new)
- `agent_tasks/model-review-team.md` (new)
- `scripts/review_thox_models.py` (new)
- `kickstarter/sources/models.html` + `kickstarter/site/models.html` (new models + namespace fixes)
- `README.md`, `CHANGELOG.md`
- `docs/MODEL_REVIEW_2026-07-07.md` (this report)

## Known divergences / follow-ups (out of scope this run)

The download center is now canonical, but other internal surfaces still carry legacy or roadmap references. Tracked for a future review run rather than silently changed:

1. **`kickstarter/site/model-gallery.html`** is a separate design-prototype "factory" view (training status: ready/blocked/downloading) built from the design handoff. It uses `ttracx/` pull commands and names that diverge from canonical (`ThoxWave-8B-Unleashed`, `ThoxTitan-26B-Agent`, `ThoxGem-E4B`, `ThoxNova-12B-Unleashed`). Reconcile or clearly label as an internal training view.
2. **Ops docs** (`docs/PORTFOLIO_RELEASE_MATRIX.md`, `docs/agent-dispatch/team-d-models.md`, `docs/KICKSTARTER_SHIPPING_PLAN.md`) and the **device manuals** reference `ttracx/…` tags and `ThoxGem-E4B` / `ThoxLLM-327M-v2` — the historical training/publish namespace. These are internal and were left as-is.
3. **THOX Edge Pro** and **MagStack cluster** entries in the download center remain roadmap; they are not yet published on the live `Thox-ai` Ollama namespace. The `pro`/`cluster` families in `models/catalog.json` are declared but intentionally empty until those models ship.
4. Several public catalog cards link `huggingface.co/Thox-ai/<repo>` for models whose HF repos are gated/private; access-request behavior should be verified per model.
