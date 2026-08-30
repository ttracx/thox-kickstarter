# Development Queue

Priority formula:

```text
Priority = (Market Value × 0.4) + (Technical Feasibility × 0.3) + (Time-to-Market × 0.2) + (Strategic Importance × 0.1)
```

Scores use a 1 to 10 scale.

| Rank | Work item | Market value | Feasibility | Time-to-market | Strategic importance | Priority | Owner |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | Lock rewards and Kickstarter pricing | 10 | 10 | 10 | 9 | 9.9 | Craig |
| 2 | Paste-ready Kickstarter Story page | 10 | 9 | 10 | 10 | 9.7 | Craig |
| 3 | Campaign validation script and tests | 8 | 10 | 10 | 8 | 9.0 | Tommy |
| 4 | Finalize device demos and acceptance gates | 9 | 9 | 9 | 10 | 9.1 | Tommy + Craig |
| 5 | Hero video script and scene prompts | 9 | 8 | 8 | 10 | 8.6 | Producer |
| 6 | Founder walkthrough script | 8 | 9 | 9 | 9 | 8.6 | Tommy + Craig |
| 7 | Hero graphics and motion clips | 9 | 8 | 7 | 9 | 8.3 | Producer |
| 8 | Kickstarter draft setup | 10 | 7 | 7 | 9 | 8.1 | Launch operator |
| 9 | Launch-day email and social copy | 8 | 9 | 8 | 8 | 8.3 | Launch operator |
| 10 | Backer FAQ and reply snippets | 8 | 9 | 8 | 8 | 8.3 | Craig |
| 11 | Pledge manager field map | 7 | 7 | 6 | 8 | 6.9 | Ops |

## Current sprint

| Status | Task | Acceptance criteria |
|---|---|---|
| [x] | Replace old campaign lineup with ThoxKey, ThoxAir, ThoxMini, ThoxClip | README and canonical docs use updated lineup |
| [x] | Generate Kickstarter special pricing | Rewards matrix includes retail, Kickstarter, and early-bird pricing |
| [x] | Add video scene prompts | Graphic prompt and image-to-video prompt exist for every hero scene |
| [x] | Add founder walkthrough script | Craig CEO and Tommy CTO script ready |
| [x] | Add validation test path | Script and pytest file included |
| [x] | Separate source validation from launch approval | Readiness manifest audits evidence and strict mode fails while operator gates remain blocked |
| [x] | Finalize device demos | Per-device scripts, shot flow, fallback plans, and acceptance gates exist in `demo/` |
| [ ] | Produce actual final images | Use `docs/VIDEO_SCENE_PROMPTS.md` |
| [ ] | Record founder walkthrough and product demos | Use `demo/RECORDING_RUNBOOK.md` and `docs/VIDEO_WALKTHROUGH_SCRIPT.md` |
| [ ] | Paste campaign into Kickstarter | Use `docs/SETUP_GUIDE.md` |
| [ ] | Verify exact Kickstarter preview and public URL | Complete desktop/mobile review; verify the URL without a preview token |
| [ ] | Verify private payment, identity, 2FA, and recovery controls | Record evidence in the approved private operator system, never in Git |
| [ ] | Record founder go/no-go approval | Complete T-1/T-0 checklist, then run `python3 scripts/audit_launch_readiness.py --require-ready` |

## Live operating status (2026-08-30)

Do not merge this branch and do not publish Pages until Tommy picks one public campaign window.

Date lock is split three ways:

- Live `https://www.thox.ai/`: Sep 8 to Oct 8, 2026
- Repo `main` `5f2c6bc`: Sep 1 to Oct 1, 2026
- GitHub Pages `https://ttracx.github.io/thox-kickstarter/`: kicker still July 9, 2026 because `pages.yml` deploys only when `kickstarter/site/**` changes on `main`

This branch removes the July 9 kicker from `kickstarter/site/index.html` and replaces it with `Kickstarter campaign preview`. It does not choose Sep 1 or Sep 8.

`validate.yml` on `5f2c6bc` (run 33278375159) did not start: GitHub annotation is `The job was not started because your account is locked due to a billing issue.` That is why validate-docs is red. Content tests were not executed. Unlock billing before expecting green CI or a Pages redeploy, even after a future merge.
