# Security Policy

## Campaign security scope

This repository contains campaign documentation, scripts, prompts, pricing source-of-truth files, demo plans, product definitions, and launch operations material. It must not contain production secrets, Kickstarter credentials, customer PII, supplier bank details, private keys, unreleased security-sensitive firmware, or live signing material.

## Supported branches

| Branch | Status |
|---|---|
| `main` | Stable campaign docs after merge |
| `quick-launch-thoxkey-campaign` | Active quick-launch PR branch |

## Reporting

Report suspected vulnerabilities through the owner-approved private THOX.ai LLC security channel or GitHub private vulnerability reporting when enabled for this repository.

Do not disclose suspected vulnerabilities publicly until THOX.ai LLC has triaged and remediated them.

For campaign-source concerns, report security questions internally to the THOX.ai launch owner and Tommy Xaypanya, CTO.

Minimum internal triage format:

```md
# Security Report

## Summary

## Affected file or workflow

## Risk level

## Steps to reproduce

## Recommended fix

## Reporter contact
```

## Scope

This policy covers THOX-specific code, configuration, documentation, scripts, product definitions, release artifacts, campaign assets, and Kickstarter/demo source-of-truth files in this repository. Third-party and upstream components remain subject to their original maintainers' vulnerability handling processes.

## Secret handling

Never commit:

- Kickstarter credentials
- payment processor credentials
- pledge manager API keys
- email service provider API keys
- supplier banking information
- customer or backer PII
- signing keys
- firmware private keys
- production `.env` files
- private demo footage containing credentials
- raw screen recordings with personal notifications

Use `.env.example` for placeholders only.

## Campaign claim security

Security and privacy claims must stay scoped:

- Say "local-first" when cloud connectors are optional.
- Do not say "never leaves the device" unless the exact workflow is fully local.
- Do not promise encryption details unless implementation is finalized.
- Do not publish cryptographic architecture that exposes secrets or unreviewed designs.
- Do not use generated screenshots to imply implemented security features.
- Do not show real credentials, customer data, supplier data, or personal notifications in demo footage.

## Backer data

Backer data belongs in Kickstarter, the pledge manager, and approved operational systems. Do not export backer data into this repository.

## Ownership

THOX.ai LLC maintains this repository. Tommy Xaypanya is CTO. Craig Ross is CEO.

Copyright (c) 2026 THOX.ai LLC. All rights reserved unless a repository-specific license states otherwise.
