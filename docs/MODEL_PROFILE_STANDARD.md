# THOX.ai Model Profile Standard

**Owner:** Model Review agent team (`agent_tasks/model-review-team.md`)
**Canonical registry:** [`models/catalog.json`](../models/catalog.json)
**Validator:** [`scripts/review_thox_models.py`](../scripts/review_thox_models.py)
**Last updated:** 2026-07-07

Every THOX.ai model that appears anywhere in this repository — the download
center (`kickstarter/sources/models.html`), the README, the release matrix —
must have a profile in the canonical registry that meets this standard. This
is what "properly implemented" means when the review team validates a new
model.

## 1. Required fields

Each entry in `models/catalog.json → models[]` MUST provide:

| Field | Type | Rule |
|---|---|---|
| `id` | string | Lowercase, kebab-case, unique. Mirrors the Ollama tag stem where one exists. |
| `name` | string | The published display name, matching the Hugging Face repo name exactly (e.g. `ThoxNova-12B-Core`). |
| `family` | enum | One of the keys in `families` (`core`, `webby`, `nellie`, `pro`, `cluster`). |
| `params` | string | Human-readable size (`3B`, `12B`, `2B (E2B)`, `agent`). |
| `base` | string | Upstream base model in `org/name` form, or a short label for agent runtimes. |
| `license` | string | The license id as published on Hugging Face (`gemma`, `apache-2.0`, `llama3.2`, `other`, …). |
| `visibility` | enum | `public` (openly downloadable), `gated` (public listing, access request), or `private` (not listed publicly). |
| `status` | enum | `live` (pullable now), `coming-soon` (announced/gated preview), or `roadmap` (planned). |
| `capabilities` | string[] | Subset of `tools`, `think`, `vision`, `code`, `browser`. May be empty. |
| `devices` | string[] | THOX devices/tiers the model targets (`ThoxKey`, `ThoxMini Air`, `ThoxMini`, `ThoxNova`). |
| `sources` | object | `huggingface` and `ollama` keys; each a repo/tag string or `null`. At least one must be non-null. |
| `blurb` | string | One–two sentence description, ≤ 240 chars, no marketing superlatives that overstate hardware ("runs a 70B on a keychain"). |

Optional: `context` (e.g. `256K`, `1M`), `disk` (e.g. `7.4 GB`), `links.space`
(a Hugging Face Space demo URL).

## 2. Source & namespace consistency

- Hugging Face repos MUST live under the **`Thox-ai`** org:
  `sources.huggingface` = `Thox-ai/<RepoName>` → resolves to
  `https://huggingface.co/Thox-ai/<RepoName>`.
- Ollama tags MUST live under the **`Thox-ai`** namespace:
  `sources.ollama` = `Thox-ai/<tag>` → resolves to
  `https://ollama.com/Thox-ai/<tag>`.
- The legacy namespaces `thox-ai/`, `THOX-ai/`, and `ttracx/` are **not**
  canonical and must not be used in new profiles. The validator flags them.
- A `live` model MUST be reachable on at least one source. A `gated` model
  keeps its real source link but is presented as access-on-request. A
  `private` model must not be linked as if it were publicly pullable.

## 3. Consistency with other profiles

- **Naming:** the same model is referred to by one canonical `name`
  everywhere. Ollama tag casing may differ (Ollama lowercases), but the
  display name does not vary between pages.
- **Base model:** stated identically across the registry, README, and any
  gallery. If two profiles share a base, they state it the same way.
- **Capabilities/devices:** drawn only from the allowed vocabularies above so
  filters and device-fit logic stay coherent across surfaces.
- **Blurb voice:** matches the neighbouring profiles — one crisp sentence of
  what it is + who it's for. See the honesty rule in the README
  ("Device/model honesty rule"): never imply a small device runs a model it
  cannot realistically run.

## 4. Adding or updating a model — checklist

1. Confirm the model on the live source(s): `https://huggingface.co/Thox-ai`
   and/or `https://ollama.com/Thox-ai`.
2. Add/update its entry in `models/catalog.json` per §1–§3.
3. Surface it in `kickstarter/sources/models.html` (the download center) and
   rebuild the site bundle (`python3 kickstarter/build_site.py`).
4. Update the README model row and `CHANGELOG.md` if the public model set
   changed.
5. Run `python3 scripts/review_thox_models.py` — it must exit `0`.
6. Log the review in `docs/MODEL_REVIEW_<date>.md`.

## 5. Validation gate

`scripts/review_thox_models.py` enforces §1–§3 automatically and cross-checks
the registry against the live-catalog HTML. A profile that fails any required
rule blocks the model from being marked `live`. Warnings (missing optional
fields, gated/private presentation notes) are surfaced but do not fail the
gate.
