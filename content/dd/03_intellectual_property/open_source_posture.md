# Open-source posture

Last updated: 2026-06-25
Status: DRAFT

---

## Default license

Apache-2.0 across the THOX portfolio. Canonical contribution and
governance templates live in ttracx/thox-meta (Contributor Covenant 2.1,
DCO 1.1, Conventional Commits, multi-language coding standards, 90-day
security disclosure to security@thox.ai, ADR process).

## What is protectable vs. what is contributed

Protectable (kept private or under proprietary license):
- Brand assets and guidelines (ttracx/thox-brand-vault).
- Training data, fine-tuning recipes, and model weights for
  thoxllm-factory models (private HuggingFace org Thox-ai).
- ThoxMicro-125M and ThoxLLM-327M weights (private repos).
- Phase B / Phase C Gemma fine-tunes.
- Manufacturing process documentation (assembly walkthroughs).
- Signed-agent identity keys and HMAC material.
- Customer and backer data.
- Internal compliance and finance docs.

Contributed (Apache-2.0, publishable):
- Public-facing crates (thox-litert-lm, thox-digitalhumans,
  thox-experience-fabric, thoxos-kernel, thox-agent-memory,
  thox-system-prompts catalog).
- Documentation site (thox-docs) under MDX.
- Marketing site (Thox.ai, separate repo, PR-only no-merge policy).
- Tooling, CI workflows, lint scripts.

Hybrid (Apache-2.0 source, private bundles):
- thox-quickstart (provisioning code public; per-device manifests private).
- thoxllm-factory (training scripts public; weights private).

## Inbound license posture

- All third-party dependencies tracked via standard cargo / npm / pip
  manifests.
- thox-meta enforces standardized SPDX headers on new files.
- License inventory aggregated in license_inventory.md (sibling doc).

## Disclaimer

This is a posture summary, not a freedom-to-operate analysis. Counsel
should review individual third-party dependencies before any commercial
distribution.
