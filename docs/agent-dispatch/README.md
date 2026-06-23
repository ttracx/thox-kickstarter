# Agent dispatch — Kickstarter shipping teams

8 parallel Claude Code agent teams, each with a self-contained
dispatch prompt the DRI can hand off to a fresh Claude session.

The teams and their dispatch files:

| Team | DRI | Dispatch | Repos |
|---|---|---|---|
| A | Phamy | [team-a-marketing.md](team-a-marketing.md) | `Thox.ai`, `thox-command-center` |
| B | Craig | [team-b-kernel.md](team-b-kernel.md) | `thoxos-kernel` |
| C | Craig | [team-c-images.md](team-c-images.md) | `thoxos-air-image`, `thoxair-pico-sdk`, `thox-luckfox-pico-mini-b` |
| D | Phamy | [team-d-models.md](team-d-models.md) | `thox-gemma4`, `thoxllm-factory`, `thox-gemma4-e4b-sft`, `thox-micro-125m` |
| E | Tommy | [team-e-provisioning.md](team-e-provisioning.md) | `thox-provisioner`, `thoxos-mini-flasher`, `thoxos-mini-utm-build`, `thox-quickstart`, `thoxos-mini-ai-usb-factory` |
| F | Craig | [team-f-magstack.md](team-f-magstack.md) | `magstack-air`, `magstack-air-edge-rs`, `thox-q2-print-farm` |
| G | Phamy | [team-g-apps.md](team-g-apps.md) | `thox-terminal`, `thoxos-companion`, `thoxos-companion-multiplatform`, `thox-portable`, `thox-workbench` |
| H | Craig | [team-h-silicon.md](team-h-silicon.md) | `thoxinchip`, `thox-watch` |

## How to launch a team

1. Open a fresh Claude Code session on the team's primary repo.
2. Paste the contents of the team's dispatch markdown file as the
   first message.
3. The agent will read the master shipping plan
   (`../KICKSTARTER_SHIPPING_PLAN.md`), the team's specific repos,
   and produce a Week 1 plan + daily reports.
4. DRI reviews each daily report; signs off Friday milestones.

## Shared context every team must read

Every team's first action is to load:

- `../KICKSTARTER_SHIPPING_PLAN.md` — this plan
- The team's primary repo README + CHANGELOG
- The team's TODO.md / docs/development_queue.md if present

## Coordination

Each team's agent posts a daily 200-word progress update to
`#ks-ops` Slack. Cross-team blockers escalate to Tommy. Friday is
the milestone review — all 8 DRIs + agents on a single video call.
