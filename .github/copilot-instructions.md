# Copilot Instructions — thox-kickstarter

## Project Summary

THOX Kickstarter is the campaign management and content production repository for the THOX.ai Kickstarter launch. It contains campaign copy, video scripts, social media plans, compliance runbooks, contract templates, agent dispatch plans, and a build tracker tool. This is primarily a documentation and content repo with supporting Python scripts.

## Tech Stack

- **Languages**: Python (scripts/tools), HTML (design preview, build tracker)
- **Frameworks**: None (content/docs repo)
- **Build/Tooling**: Python 3.10+, GitHub Pages
- **Runtime**: Python 3.10+

## Build Instructions

No standard build system. This is a content/documentation repository.

```bash
# Build tracker tool (standalone Python script)
python kickstarter/build_tracker.py
```

## Test Instructions

No test framework configured. Tests are in `tests/` directory.

```bash
# Run any tests if available
pytest tests/  # if pytest is installed
```

## Lint & Format

No linting tools configured. See `CONTRIBUTING.md` for content style guidelines.

## CI/CD Pipeline

- `pages.yml`: triggers on push (GitHub Pages deployment)

## Repository Layout

- `kickstarter/` — Build tracker tool and campaign assets
- `content/` — Campaign content and copy
- `deliverables/` — Campaign deliverables
- `docs/` — Extensive documentation: campaign info, compliance, contracts, FAQs, video scripts, social media plans
- `templates/` — Reusable templates
- `scripts/` — Utility scripts
- `tools/` — Supporting tools
- `prompts/` — AI prompts for content generation
- `runbooks/` — Operational runbooks
- `examples/` — Example materials
- `social/` — Social media campaign assets
- `design-preview.html` — Campaign design preview

## Architecture Notes

This is a content and campaign management repository. Key documentation areas:
- `docs/CAMPAIGN_INFO.md` — Campaign overview and goals
- `docs/REWARDS_MATRIX.md` — Kickstarter reward tiers
- `docs/VIDEO_PRODUCTION.md` — Video production pipeline
- `docs/SOCIAL_MEDIA_CAMPAIGN.md` — Social media strategy
- `docs/COMPLIANCE_RUNBOOK.md` — Legal compliance procedures
- `docs/CONTRACT_TEMPLATES/` — NDA, vendor agreement, pricing, waiver templates
- `docs/agent-dispatch/` — Team-based agent dispatch plans (teams A through H)
- `docs/MODEL_PROFILE_STANDARD.md` — Digital human model profiling standards

The build tracker (`kickstarter/build_tracker.py`) is a standalone HTML/JS tool with Python generation, tracking shot states (todo, shot, approved).

## Common Pitfalls & Workarounds

- The `designs/` directory contains uploaded handoff packages from other repos — do not treat these as part of the kickstarter codebase
- GitHub Pages CI deploys from main branch
- Campaign content is sensitive — follow `docs/COMPLIANCE_RUNBOOK.md` before publishing

## Contributing

See `CONTRIBUTING.md` for contribution guidelines. Bug reports: https://github.com/ttracx/thox-kickstarter/issues

---
*Generated for GitHub Copilot custom instructions. Keep this file updated as the project evolves.*
