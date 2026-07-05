# Pre-launch W4 Fri - BTS: ThoxOS Kernel codebase tour

## Identity

- **Post ID**: `2026-06-07-fri-bts-kernel-codebase`
- **Phase**: pre-launch (T-66)
- **Platforms**: x, instagram (Feed + Stories), tiktok, youtube
- **Date / time (PT)**: 2026-06-07 11:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup + reach the engineering audience. Show that the
software is real, public, tested. Drive traffic to
github.com/ttracx/thoxos-kernel.

## Hero

Code editor screenshot of `kernel/src/shell.rs` or
`crates/thox-agent-hub/src/lib.rs` with a clean THOX-themed VS Code
dark mode + the multi-color scrollbar showing all 24 absorbs.

For TikTok / YouTube Short: 60-second screen recording walking
through the workspace tree.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | code screenshot + 4-tweet thread |
| instagram | 4:5 Feed | code screenshot brand-graded |
| instagram | 9:16 Stories | 5-sticker codebase walkthrough |
| tiktok | 9:16 | 60-second screen recording |
| youtube | 9:16 Short | same recording with chapter markers |

## Prompt notes

Code screenshots are REAL screen captures, not AI-generated. Apply
the IBM Plex Sans / JetBrains Mono theme to VS Code before capturing
(theme settings in `prompts/openai/SYSTEM_PROMPT.md` typography
section).

For the Grok video: this is a text-to-video for the closing tweet
where the camera holds on a single THOX logomark over a navy
background with "github.com/ttracx/thoxos-kernel" typing in JetBrains
Mono at the bottom. Use VIDEO_TEMPLATES.md section #7
(text-to-video).

## Caption: X (4-tweet thread)

```
1/ Friday BTS: a tour of the ThoxOS kernel codebase. 🟢

github.com/ttracx/thoxos-kernel
Apache-2.0, Rust no_std, v1.1.24 tagged today. /1

2/ The workspace:
- kernel/ - the boot binary (x86_64 + aarch64)
- crates/thox-agent-hub - the agent security ops layer (12 host tests)
- crates/thox-util - shell command parser (36 host tests)
- crates/thox-scheduler - the wait/wake/preempt layer (9 host tests) /2

3/ Latest absorb: MVP-31. Adds the promotion evidence review
dashboard + signed release-candidate handoff + a DISABLED device
rollout manifest. The hub cannot auto-update devices; that requires
external release signature + release-manager signoff. /3

4/ 24 absorbs in the chain, 0 default-kernel-tree mutations against
the v1.2.0 carve-out. Every drop is additive-only.

📍 thox.ai/launch
```

## Caption: Instagram

```
Friday BTS: ThoxOS kernel codebase tour. 🟢

github.com/ttracx/thoxos-kernel - Apache-2.0, Rust no_std,
v1.1.24 tagged today.

24 absorbs from MVP-7 through MVP-31. 0 default-kernel-tree
mutations against the parked v1.2.0 scheduler / trap / page-fault /
preemption carve-out. Every drop additive-only. 57+ host tests
green.

The codebase is the substrate the devices run on. When you back the
Kickstarter, you back the open-source kernel that the devices ship
with.

🔗 thox.ai/launch
.
.
#thoxai #rust #kernel #opensource #thoxos #engineering #localai
#localfirst #behindthescenes
```

## Caption: TikTok

```
60-second tour: the ThoxOS kernel codebase. Rust, no_std, 24
absorbs, all open source. Apache-2.0. 🟢

#thoxai #rust #kernel #opensource
```

## Caption: YouTube Shorts

Title: `60 sec: a tour of the ThoxOS kernel (Rust, no_std, open source) 🟢`

Description:
```
A 60-second walkthrough of the ThoxOS kernel workspace at
github.com/ttracx/thoxos-kernel. Rust no_std, Apache-2.0,
v1.1.24.

00:00 The workspace overview
00:15 kernel/ + crates/
00:30 thox-agent-hub (12 host tests)
00:45 What lands in v1.2.0

Launch list: thox.ai/launch

#shorts #thoxai #rust #kernel #opensource
```

## Alt text

```
A screenshot of VS Code in dark mode showing the ThoxOS kernel
codebase. The thox-agent-hub Rust source is open with a list of 12
host tests visible in the sidebar.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-07-fri-bts-kernel-codebase`

## Acceptance

- [ ] Code screenshot is REAL (not AI)
- [ ] VS Code theme matches IBM Plex Sans + JetBrains Mono
- [ ] Version + test counts current at publish time
- [ ] No em-dashes
