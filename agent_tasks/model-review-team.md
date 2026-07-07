# Model Review Team — auto-review new THOX.ai models

## Mission

Whenever THOX.ai publishes a new model on **Hugging Face
([`Thox-ai`](https://huggingface.co/Thox-ai))** or **Ollama
([`Thox-ai`](https://ollama.com/Thox-ai))**, this team reviews it, validates
that it is properly implemented against the
[Model Profile Standard](../docs/MODEL_PROFILE_STANDARD.md), makes it
consistent with the existing profiles, and lands it in this repository —
registry, download center, README, and changelog — with correct links.

This charter is the dispatch spec. It can be run by a human, by Claude Code,
or on a schedule (see §Automation). It is deliberately deterministic so each
run produces the same repo state for the same live inputs.

## Roles

The team is four cooperating agents. One lead sequences them; the middle two
can run in parallel.

### 1. Discovery agent — "what's live?"
- **Inputs:** `https://huggingface.co/Thox-ai` (org activity, newest first),
  `https://ollama.com/Thox-ai?sort=newest`.
- Enumerate every model + tag currently published, with visibility
  (public / gated / private), base model, license, params, context, and any
  demo Space.
- Diff the live set against `models/catalog.json`. Emit: **new**, **changed**,
  **removed** lists.
- Tooling: Hugging Face MCP (`hub_repo_search author=Thox-ai`,
  `hub_repo_details`) for HF; `WebFetch` for the Ollama namespace pages.

### 2. Validation agent — "is it up to standard?"
- For each new/changed model, check every rule in the Model Profile Standard
  §1–§3: required fields, canonical `Thox-ai/` namespaces, allowed
  capability/device vocabularies, blurb length + honesty rule.
- Confirm each `live` model is actually reachable on the claimed source and
  that gated/private models are not presented as openly pullable.
- Output a pass/fail per model with the exact failing rule(s).

### 3. Integration agent — "land it consistently"
- Add/update the profile in `models/catalog.json` (canonical source of truth).
- Surface public + notable gated models in
  `kickstarter/sources/models.html`, matching the existing card shape and
  family grouping; rebuild with `python3 kickstarter/build_site.py`.
- Keep base-model wording, capability tags, and device-fit identical to the
  registry so all surfaces agree.

### 4. Docs agent — "tell the story"
- Update the README model row + any model links.
- Add a `CHANGELOG.md` entry describing the model delta.
- Write `docs/MODEL_REVIEW_<date>.md` — the run report (new/changed/removed,
  validation results, files touched).

## Standards gate (must pass to mark a model `live`)

- [ ] Profile has all required fields (Standard §1).
- [ ] Hugging Face repo under `Thox-ai/…`; Ollama tag under `Thox-ai/…`
      (Standard §2) — no `thox-ai`, `THOX-ai`, or `ttracx` namespaces.
- [ ] `live` model resolves on at least one live source; gated/private
      presented honestly.
- [ ] Naming, base model, capabilities, and devices consistent with peers
      (Standard §3).
- [ ] `python3 scripts/review_thox_models.py` exits 0.

## Run procedure

```
# 1. Discovery + Validation (read-only)
python3 scripts/review_thox_models.py --check-live   # diff registry vs HTML + live hints
# 2. Integration — edit models/catalog.json + kickstarter/sources/models.html
python3 kickstarter/build_site.py                    # rebuild deployable bundle
# 3. Gate
python3 scripts/review_thox_models.py                # must exit 0
# 4. Docs — README + CHANGELOG + docs/MODEL_REVIEW_<date>.md
```

## Automation

Run on demand, or wire a scheduled trigger (Claude Code on the web / cron) that
executes the Run procedure and opens a draft PR when the live set diverges from
`models/catalog.json`. The review report (`docs/MODEL_REVIEW_<date>.md`) is the
artifact to attach to that PR.

## Latest run

- **2026-07-07** — see [`docs/MODEL_REVIEW_2026-07-07.md`](../docs/MODEL_REVIEW_2026-07-07.md).
  Added ThoxWebby-Gemma-4-E2B (browser/WebGPU) and ThoxMythos-9B (gated,
  1M-context) profiles; standardized every profile onto the `Thox-ai/`
  namespaces.
