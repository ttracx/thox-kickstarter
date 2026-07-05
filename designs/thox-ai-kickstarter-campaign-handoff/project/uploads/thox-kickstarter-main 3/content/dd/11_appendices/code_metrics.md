# Code metrics

Last updated: 2026-06-25
Status: DRAFT

---

## Aggregate (per PULL_FORWARD_TRACKER snapshot 2026-06-25)

- Repos in THOX portfolio: approximately 45.
- Sprints completed: approximately 35+.
- Tests across portfolio: approximately 2,000+ passing.
- New repos created on 2026-06-25: 7 (thox-build-infra, thox-docs,
  thox-q2-print-farm, thox-brand-vault, thox-ip-disclosures, thox-meta,
  thox-kickstarter-integration).
- Release tags cut recently: 12+.
- Commits today (2026-06-25): approximately 150+.
- Open PRs on ttracx/Thox.ai (PR-only no-merge): 4 (#215, #216, #217, #218).
- Spend today: $0.

## Per-repo metrics (regenerable)

To regenerate per-repo line counts, file counts, and contributor counts,
run something like:

```
gh repo list ttracx --limit 200 --json name --jq '.[].name' | while read r; do
  echo "=== $r ===";
  gh api repos/ttracx/$r --jq '{stargazers: .stargazers_count, forks: .forks_count, size_kb: .size, default_branch: .default_branch}';
done
```

For local clones:

```
git ls-files | wc -l                   # files
git log --oneline | wc -l              # commits
git shortlog -sn | wc -l               # unique authors
cloc .                                 # LOC by language (if cloc installed)
```

## Contributor base

- Primary: ttracx (Tommy).
- Write-collaborator across THOX portfolio: cross80127 (Craig).
- Inventor-of-record only (not direct contributor): Phamy Xaypanya on
  IP-008..IP-012.

## Disclaimer

Metrics above are point-in-time. Investors who want current numbers
should regenerate via the commands above; the numbers shift daily.
