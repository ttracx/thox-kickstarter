# Security Policy

## Campaign security scope

This repository contains campaign documentation, scripts, prompts, and pricing source-of-truth files. It must not contain production secrets, Kickstarter credentials, customer PII, supplier bank details, private keys, or unreleased security-sensitive firmware.

## Supported branch

| Branch | Status |
|---|---|
| `main` | Stable campaign docs after merge |
| `quick-launch-thoxkey-campaign` | Active quick-launch branch |

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

Use `.env.example` for placeholders only.

## Reporting

Report security concerns internally to the THOX.ai launch owner and CTO.

Minimum triage fields:

```md
# Security Report

## Summary

## Affected file or workflow

## Risk level

## Steps to reproduce

## Recommended fix

## Reporter contact
```

## Campaign claim security

Security and privacy claims must stay scoped:

- Say "local-first" when cloud connectors are optional.
- Do not say "never leaves the device" unless the exact workflow is fully local.
- Do not promise encryption details unless implementation is finalized.
- Do not publish cryptographic architecture that exposes secrets or unreviewed designs.
- Do not use generated screenshots to imply implemented security features.

## Backer data

Backer data belongs in Kickstarter, the pledge manager, and approved operational systems. Do not export backer data into this repository.
