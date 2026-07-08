# THOX Model Review — 2026-07-08

**Team:** [`agent_tasks/model-review-team.md`](../agent_tasks/model-review-team.md)
**Standard:** [`docs/MODEL_PROFILE_STANDARD.md`](MODEL_PROFILE_STANDARD.md)
**Gate:** `python3 scripts/review_thox_models.py` → **PASS (0 warnings)**

Follow-up re-review one day after the 2026-07-07 run, to confirm the campaign
is current with the latest THOX.ai models and code changes.

## Discovery — what changed since 2026-07-07

**Hugging Face `Thox-ai`:** 24 repos (was 22). The two new repos are both
**private / internal**, not campaign-facing models:

| Repo | Created | Status | Assessment |
|---|---|---|---|
| `Thox-ai/thoxnova-agent-tommy-persona-lora` | 8 Jul | 🔐 private | Persona LoRA for the ThoxNova agent — internal tuning artifact, not a user-downloadable model. **Excluded.** |
| `Thox-ai/sadie-contingency` | 7 Jul | 🔐 private | Failover / always-on contingency component (`sadie-weaving`, `contingency`, `failover`) — infrastructure, not an LLM the campaign surfaces. **Excluded.** |

Every public / gated model is unchanged from the 07-07 review: ThoxMini-3B,
ThoxForge-7B, ThoxGlobal-7B, ThoxWave-8B, ThoxNova-12B-Core, ThoxNova-12B-Agent
(public), ThoxWebby-Gemma-4-E2B (gated), ThoxMythos-9B (gated). All already in
the registry.

**Ollama `Thox-ai`:** 19 tags, identical set to 07-07 (core + nellie). No new
public tags.

**Result:** no new campaign-facing models → **no additions to
`models/catalog.json` required.** The download center is current.

## Coding changes

`origin/main` HEAD is the merged 07-07 review (PR #16); no code landed after
it. Swept the entire deployed campaign bundle (`kickstarter/site/`) for
non-canonical model namespaces:

```
grep -rIoE "ttracx/…|thox-ai/…|THOX-ai/…|ollama.com/(thox-ai|ttracx)" kickstarter/site/
→ (no matches)
```

## Fix applied — model-gallery.html namespace

The `model-gallery.html` "ThoxLLM Factory" view (linked from the campaign hub
`index.html`) still built its copy-paste commands as `ollama run/pull
ttracx/<tag>` — a legacy namespace, not the live `Thox-ai/`. A backer copying
those commands would hit the wrong namespace.

Fixed at the source of truth
(`designs/…/project/Model Gallery.dc.html`) and in the deployed
`kickstarter/site/model-gallery.html`: `ttracx/` → `Thox-ai/`. The gallery's
embedded JS still parses; the change is confined to a string literal.

After this fix the deployed campaign is 100% on the canonical `Thox-ai/`
namespace across both galleries.

## Validation

```
THOX Model Review — 15 profiles in models/catalog.json
  live: 14  |  gated/coming-soon: 1  |  families: ['core', 'nellie', 'webby']
GATE: PASS (0 warning(s))
```

Registry `last_reviewed` bumped to 2026-07-08.

## Still open (tracked, not campaign-blocking)

Carried from the 07-07 report — internal, non-backer-facing surfaces:

1. `model-gallery.html` still shows internal training statuses
   (`ready`/`blocked`/`downloading`) and pipeline-only variant names
   (`ThoxWave-8B-Unleashed`, `ThoxTitan-26B-Agent`, `ThoxGem-E4B`,
   `ThoxNova-12B-Unleashed`). These are a "factory" pipeline view; reconciling
   the names to the canonical registry is a larger design change and is left
   for a dedicated pass. Namespace is now correct.
2. `ttracx/…` tags remain in internal ops docs/manuals
   (`docs/PORTFOLIO_RELEASE_MATRIX.md`, `docs/agent-dispatch/team-d-models.md`,
   `docs/KICKSTARTER_SHIPPING_PLAN.md`, device manuals). Internal; not part of
   the deployed campaign site.
