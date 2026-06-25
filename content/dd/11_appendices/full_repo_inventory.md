# Full repo inventory

Last updated: 2026-06-25
Status: DRAFT - representative; regenerate via `gh repo list ttracx`

---

## Conventions

- Namespace: github.com/ttracx (all THOX.ai repos push here, not Thox-ai).
- Default privacy: private (per default-private-repos policy in MEMORY).
- Default license: Apache-2.0 (see 03 IP license_inventory.md for edge
  cases).
- Default collaborator: cross80127 at maintain (per
  default-collaborators policy).

## Representative inventory

| Repo | Purpose | License |
|---|---|---|
| ttracx/thox-kickstarter | This repo. Kickstarter playbook + DD packet. | Apache-2.0 |
| ttracx/thox-meta | Contribution + governance templates portfolio-wide. | Apache-2.0 |
| ttracx/thox-brand-vault | Brand asset vault + brand-lint workflow. | Apache-2.0 |
| ttracx/thox-docs | Docs site (docs.thox.ai). Next.js 14 + Fumadocs. | Apache-2.0 |
| ttracx/thox-ip-disclosures | IP-008..IP-033 disclosure register. | private |
| ttracx/thox-key | Reward redemption + ThoxKey flows. | Apache-2.0 |
| ttracx/thox-quickstart | Device provisioning + assembly. | Apache-2.0 |
| ttracx/thox-agent-memory | MCP memory server + nellie-sync v2. | Apache-2.0 |
| ttracx/thox-system-prompts | Canonical THOX.ai system prompts. | Apache-2.0 |
| ttracx/thox-playbooks | THOX AI playbooks catalog. | Apache-2.0 |
| ttracx/thox-portable-agent | Branded openclaude portable workbench. | MIT |
| ttracx/thox-workbench | Comprehensive portable workbench (supersedes). | Apache-2.0 |
| ttracx/thox-portable | Carried-device runtime (thoxd + PWA + USB). | Apache-2.0 |
| ttracx/thox-terminal | SwiftUI unified mobile + desktop control plane. | Apache-2.0 |
| ttracx/thox-experience-fabric | Cross-platform UX layer + codegen. | Apache-2.0 |
| ttracx/thox-digitalhumans | Rust digital human orchestration. | Apache-2.0 |
| ttracx/thox-litert-lm | Pure-Rust LiteRT-LM rewrite. | Apache-2.0 |
| ttracx/thoxllm-factory | Ten-model fine-tune/GGUF/Ollama/eval pipeline. | Apache-2.0 |
| ttracx/thoxllm-327m | First THOX-owned decoder-only foundation model. | Apache-2.0 |
| ttracx/thox-micro-125m | First published THOX base LM. | Apache-2.0 |
| ttracx/thox-gemma4-e4b-sft | Phase B SFT ship kit. | Apache-2.0 |
| ttracx/thoxos-kernel | ThoxOS kernel. | Apache-2.0 |
| ttracx/thox-sandbox | Branded fork of alibaba OpenSandbox. | Apache-2.0 |
| ttracx/magstack-air | IP-013 MagStack Air base. | Apache-2.0 |
| ttracx/magstack-air-llm | IP-013-llm MagStack Air LLM. | Apache-2.0 |
| ttracx/magstack-air-edge-rs | IP-014 Rust edge AI. | Apache-2.0 |
| ttracx/thoxymicro | IP-015 Go agent for Luckfox Pico Mini B. | MIT |
| ttracx/thox-kickstarter-integration | IP-033 ops ingestion. | Apache-2.0 |
| ttracx/thox-build-infra | Build infra portfolio-wide. | Apache-2.0 |
| ttracx/thox-q2-print-farm | Qidi Q2 Combo print farm. | Apache-2.0 |
| ttracx/Thox.ai | Marketing site. PR-only no-merge policy. | (TBD) |

## Regeneration

```
gh repo list ttracx --limit 200 --json name,visibility,description,licenseInfo \
  --jq '.[] | [.name, .visibility, (.licenseInfo.name // "NONE"), .description] | @tsv'
```

## Disclaimer

The list above is representative. Regenerate against the live `gh repo
list` output before sharing externally to ensure no repo is missed.
