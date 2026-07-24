# Changelog

All notable campaign-source changes are tracked here.

The format follows Keep a Changelog 1.1, and this project tracks campaign-source changes for the THOX.ai Kickstarter launch.

## [Unreleased]

### Fixed

- **Campaign consistency pass (2026-07-23).** Reconciled conflicting "sources of truth" across the
  canonical, paste-into-Kickstarter surface:
  - Fixed the campaign validator/test (`scripts/validate_campaign.py`, `tests/test_campaign_docs.py`):
    the demo-guardrail check was case-sensitive and failed on `main`. Now case-insensitive; validation
    exits 0.
  - Standardized launch/close dates to **July 7 → August 6, 2026** (30-day run); corrected the stale
    August 12 / September 11 dates in `docs/CAMPAIGN_INFO.md`.
  - Standardized early-bird caps to **ThoxKey 500 / ThoxMini Air 350 / ThoxMini 300 / ThoxClip 200**
    across `docs/REWARDS_MATRIX.md` (was internally contradictory: 1000/100/500).
  - Standardized retail prices to round `$99 / $199 / $399` and corrected bundle-sum math in
    `docs/KICKSTARTER_PAGE_COPY.md` (were `.99` and mis-summed).
  - Aligned reward delivery windows to the live page (Q3/Q4 2026 → Q1 2027) in `docs/CAMPAIGN_INFO.md`.
  - Rewrote `deliverables/THOX_Kickstarter_Campaign.md`, `docs/FAQ.md`, `docs/RISKS.md`,
    `templates/pre-launch-email.md`, `templates/launch-day-email.md`, and
    `templates/social/content-calendar.md` off the **retired** device family (ThoxAir, ThoxNova, Milk-V,
    LattePanda, "Phamy") onto the canonical four devices, July 7 timeline, and honest-boundary claims.
  - Full audit + reconciliation plan for the remaining legacy footprint (the `content/` and
    `social/posts/` trees, `docs/TIMELINE.md`, `docs/STRETCH_GOALS.md`, prompt libraries) in
    `docs/KICKSTARTER_REVIEW_2026-07-23.md`.

### Added

- **Model Review agent team** (`agent_tasks/model-review-team.md`) that auto-reviews new THOX.ai models published on Hugging Face (`Thox-ai`) and Ollama (`Thox-ai`), validates them, and lands them consistently.
- **Canonical model registry** (`models/catalog.json`) as the single source of truth for every campaign-surfaced model.
- **Model profile standard** (`docs/MODEL_PROFILE_STANDARD.md`) and validation gate (`scripts/review_thox_models.py`).
- **ThoxWebby-Gemma-4-E2B** - browser-tier WebGPU model (QAT Gemma-4 E2B via transformers.js) for ThoxKey - added to the model gallery, with its live demo Space linked.
- **ThoxMythos-9B** - gated 1M-context reasoning model on Qwen3.5-9B with function-calling - added as a gated preview profile.
- 2026-07-07 model review report (`docs/MODEL_REVIEW_2026-07-07.md`).
- Quick-launch campaign source of truth for ThoxKey, ThoxMini, ThoxMini Air, and ThoxClip.
- Kickstarter special and early-bird pricing for the four-device launch lineup.
- Paste-ready Kickstarter Story page.
- End-to-end quick-launch runbook.
- Hero video script.
- Graphic-generation and image-to-video prompts.
- Craig Ross CEO and Tommy Xaypanya CTO walkthrough script.
- Finalized device demo package: per-device demo flows, recording runbook, acceptance checklist, and demo shot-list CSV.
- Repository-standard planning docs: `ecosystem_map.md`, `mvp_catalog.md`, `development_queue.md`.
- Campaign validation script and pytest wrapper.
- Reward tier CSV example.
- Security posture and environment template.

### Changed

- Replaced older campaign positioning with the canonical four-device quick-launch product lineup.
- Reframed device claims around local-first, privacy-first, and honest capability boundaries.
- Wired the founder walkthrough script to the finalized device demos.
- Extended validation to check demo guardrails and demo acceptance files.
- Resolved merge conflicts in README, changelog, and security policy by keeping the four launch devices as the only Kickstarter/demo scope.
- Standardized every model reference in the download center (`kickstarter/sources/models.html` + site build) onto the canonical `Thox-ai/` Hugging Face and Ollama namespaces (was a mix of `thox-ai/` and `THOX-ai/`); fixed the ThoxNova-12B-Agent base model and ThoxGemma4 Ollama tag to match the registry; fixed the README Ollama link to `ollama.com/Thox-ai`.
- 2026-07-08 model re-review (`docs/MODEL_REVIEW_2026-07-08.md`): confirmed no new campaign-facing models on Hugging Face/Ollama (the two newest repos are private/internal); standardized the `model-gallery.html` factory view's copy-paste commands off the legacy `ttracx/` namespace onto `Thox-ai/` (source handoff + deployed site), leaving the deployed campaign fully on the canonical namespace.

### Security

- Added campaign-specific secret handling, backer-data boundaries, demo screen-safety rules, and scoped privacy-claim guidance.

## [0.1.0] - 2026-06-25

### Added

- Initial release.
