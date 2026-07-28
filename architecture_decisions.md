# Architecture Decisions

Lightweight decisions for the THOX.ai Kickstarter campaign repository.

## ADR-001: Self-contained static campaign preview

- **Decision:** Publish `kickstarter/site/` as a static GitHub Pages preview and keep its runtime assets vendored in the repository.
- **Context:** Reviewers need a repeatable visual preview without a backend service. The campaign source must remain usable offline and must not silently transmit campaign or reviewer data.
- **Options considered:** Hosted application backend; CDN-dependent static site; self-contained static bundle.
- **Tradeoffs:** The static bundle is larger and vendored assets require deliberate updates, but deployment and rollback remain simple and the preview has no required runtime API.
- **Security impact:** No secrets or backer data belong in the bundle. GitHub Pages is public, so only public campaign material may be published.
- **Local-first impact:** The same bundle can be served locally with `python3 -m http.server --directory kickstarter/site`.
- **Compliance impact:** The preview does not process regulated or backer data. Public hosting is not evidence of product compliance.
- **Final choice:** Self-contained static bundle with GitHub Actions deployment and a local serving path.
- **Follow-up tasks:** Keep local asset references valid and review public bundle contents before deployment.

## ADR-002: Separate source validation from launch approval

- **Decision:** Track launch gates in `config/launch-readiness.json` and audit them with `scripts/audit_launch_readiness.py`.
- **Context:** Content tests can pass while physical assets, account controls, payment setup, preview review, or founder approval remain incomplete.
- **Options considered:** Treat CI success as launch-ready; keep an unstructured manual checklist; use a machine-readable manifest plus the operator checklist.
- **Tradeoffs:** The manifest requires evidence maintenance, but prevents a green CI run from being mistaken for release approval.
- **Security impact:** Private credentials, payment evidence, identity documents, and recovery codes remain outside Git. The manifest records only gate state and next action.
- **Local-first impact:** The audit runs offline with Python's standard library.
- **Compliance impact:** Gate evidence improves auditability but does not establish legal or regulatory compliance.
- **Final choice:** CI validates manifest integrity; `--require-ready` is the explicit final go/no-go command and fails while any gate is blocked.
- **Follow-up tasks:** Update gate evidence after operator review; never flip a gate to `verified` without durable evidence.

## ADR-003: Markdown remains the campaign source of truth

- **Decision:** Keep product, pricing, delivery, and claim boundaries in version-controlled Markdown, with targeted automated drift checks.
- **Context:** Campaign content is edited across Kickstarter, video, press, email, and social surfaces.
- **Options considered:** Hosted content management system; generated database; repository-native documents.
- **Tradeoffs:** Markdown requires disciplined synchronization, but keeps review history local, diffable, and portable.
- **Security impact:** Sensitive operational or backer data is excluded from source documents.
- **Local-first impact:** Authors can review and validate the full source without network access.
- **Compliance impact:** Version history supports review, but external campaign surfaces still require separate verification.
- **Final choice:** Repository-native source plus automated canonical-term, date, model, and readiness checks.
- **Follow-up tasks:** Reconcile or archive the superseded campaign trees identified in `docs/KICKSTARTER_REVIEW_2026-07-23.md`.
