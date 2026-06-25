# Test coverage summary

Last updated: 2026-06-25
Status: DRAFT

---

## Cross-link

- TEST_COVERAGE_DASHBOARD - when published portfolio-wide, cross-link
  here. Tracker entry in docs/PULL_FORWARD_TRACKER.md notes a target.

## Aggregate today (per MEMORY)

- Total tests across portfolio: approximately 2,000+ passing.
- Per-repo highlights (representative):
  - ttracx/thoxos-kernel - 37/37 thox-util + 14/14 thox-agent-hub +
    9/9 thox-scheduler tests at v1.1.25.
  - ttracx/thox-experience-fabric - engine 25/25 + workspace 14/14 at
    v0.3.0.
  - ttracx/thoxllm-factory and friends - eval suites per repo.
  - ttracx/thox-quickstart - 62-file footprint with provisioning
    coverage.

## Per-repo test command map

Standardized via thox-meta. Each repo exposes:

- `make test` or `cargo test` or `pytest -q` depending on language.
- CI workflow at .github/workflows/ci.yml.

## Gaps

- Portfolio-wide test coverage dashboard not yet published.
- Cross-repo integration tests (e.g. thoxllm-factory output consumed by
  thox-litert-lm) are tracked in the respective README task lists.

## Disclaimer

Test pass counts above are snapshots. Investors who want current numbers
should ask for the latest CI run links from each repo.
