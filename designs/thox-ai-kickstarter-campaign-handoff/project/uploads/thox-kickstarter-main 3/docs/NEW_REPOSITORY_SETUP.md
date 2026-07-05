# New Repository Setup

The GitHub connector used for this update can modify the existing repository and open a pull request, but it does not expose a separate create-repository action. Use this file to materialize the quick-launch campaign as a new repository if a separate repo is required.

## Recommended new repository name

```text
thox-kickstarter-quick-launch
```

## Create from this branch with GitHub CLI

```bash
git clone git@github.com:ttracx/thox-kickstarter.git
cd thox-kickstarter
git checkout quick-launch-thoxkey-campaign
gh repo create ttracx/thox-kickstarter-quick-launch --private --source=. --remote=quick-launch --push
```

## Create from this branch manually

1. Open GitHub.
2. Create a private repository named `thox-kickstarter-quick-launch`.
3. Clone the current branch locally.
4. Add the new repository as a remote.
5. Push `quick-launch-thoxkey-campaign` to the new repository's `main` branch.
6. Confirm that `python3 scripts/validate_campaign.py` passes in the new repository.

## Repository-standard files included

- `README.md`
- `ecosystem_map.md`
- `mvp_catalog.md`
- `development_queue.md`
- `SECURITY.md`
- `CHANGELOG.md`
- `.env.example`
- `scripts/`
- `tests/`
- `examples/`
- `agent_tasks/`
- `demo/`

## Handoff checklist

| Status | Task |
|---|---|
| [ ] | New repository created |
| [ ] | Branch pushed to new repository |
| [ ] | Default branch set to `main` |
| [ ] | GitHub Actions validation enabled |
| [ ] | README badges checked |
| [ ] | Secrets are not present |
| [ ] | Kickstarter docs reviewed after clone |
