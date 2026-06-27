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
| 4 | Hero video script and scene prompts | 9 | 8 | 8 | 10 | 8.6 | Producer |
| 5 | Founder walkthrough script | 8 | 9 | 9 | 9 | 8.6 | Tommy + Craig |
| 6 | Hero graphics and motion clips | 9 | 8 | 7 | 9 | 8.3 | Producer |
| 7 | Kickstarter draft setup | 10 | 7 | 7 | 9 | 8.1 | Launch operator |
| 8 | Launch-day email and social copy | 8 | 9 | 8 | 8 | 8.3 | Launch operator |
| 9 | Backer FAQ and reply snippets | 8 | 9 | 8 | 8 | 8.3 | Craig |
| 10 | Pledge manager field map | 7 | 7 | 6 | 8 | 6.9 | Ops |

## Current sprint

| Status | Task | Acceptance criteria |
|---|---|---|
| [x] | Replace old campaign lineup with ThoxKey, ThoxMini Air, ThoxMini, ThoxClip | README and canonical docs use updated lineup |
| [x] | Generate Kickstarter special pricing | Rewards matrix includes retail, Kickstarter, and early-bird pricing |
| [x] | Add video scene prompts | Graphic prompt and image-to-video prompt exist for every hero scene |
| [x] | Add founder walkthrough script | Craig CEO and Tommy CTO script ready |
| [x] | Add validation test path | Script and pytest file included |
| [ ] | Produce actual final images | Use `docs/VIDEO_SCENE_PROMPTS.md` |
| [ ] | Record founder walkthrough | Use `docs/VIDEO_WALKTHROUGH_SCRIPT.md` |
| [ ] | Paste campaign into Kickstarter | Use `docs/SETUP_GUIDE.md` |
