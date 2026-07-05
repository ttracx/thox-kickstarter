# Pre-launch W7 Mon - "6 weeks out: where we are"

## Identity

- **Post ID**: `2026-06-24-mon-why-6-weeks-out`
- **Phase**: pre-launch (T-49)
- **Platforms**: x (thread), instagram (Feed), linkedin
- **Date / time (PT)**: 2026-06-24 09:00
- **Authored by**: shared (founders cosign)
- **Status**: ready-to-schedule

## Intent

Email signup + momentum signal. 6 weeks out is the launch-list
inflection point: the audience that has been lurking decides to
sign up or stop following.

## Hero

The 4-device fleet, brand-aligned, with a typographic countdown
"49 DAYS" overlay top-right corner. Generated typographic + photoreal
composite.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 16:9 | fleet hero with countdown overlay + 6-tweet thread |
| instagram | 4:5 | fleet hero with countdown |
| linkedin | 4:5 | fleet hero with countdown + status update body |

## Filled OpenAI prompt (16:9 fleet hero with countdown overlay)

```
Use IMAGE_TEMPLATES.md section #4 (16:9 hero) adapted for fleet.

Studio product hero featuring four THOX devices arranged
horizontally (ThoxClip v7, ThoxMini, ThoxAir, ThoxNova). Photoreal.

Background: deep navy #0a0e14 with a subtle emerald light streak.

Top-right corner overlay: "49 DAYS" in emerald #10b981 IBM Plex
Sans Bold 96 px, with "TO LAUNCH" in white IBM Plex Sans Medium 32
px below it. 5 percent margin from the edges.

Lighting: cool-white key, warm fill, emerald rim light on each
device.

Composition: devices in the lower-right two-thirds; countdown
overlay in the upper-right corner; left third clear for headline
overlay (overlay added in post by the publisher).

Frame is landscape 16:9, 1536 x 1024 px.

No baked headline text. No people. No competing brand marks.
```

## Caption: X (6-tweet thread)

```
1/ 49 days out from the THOX.ai Kickstarter. 🟢

Status update on every front. /1

2/ Hardware:
- ThoxClip v7 prototype lot 0: 11/12 boards pass QA
- ThoxMini Variant A + B both printing clean
- ThoxAir locked on Coral Accelerator default
- ThoxNova ran 6-hour 12B inference last weekend, lid 41 C /2

3/ Software:
- ThoxOS Kernel v1.1.24 tagged, 24 absorbs from MVP-7 through MVP-31
- ThoxLLM family at 6 fine-tunes shipped, ThoxLLM-327M v2 on HF
- Thox Cowork desktop app in private alpha
- Thox Terminal SwiftUI scaffold pushed /3

4/ Launch list: 8,200 signups (target: 10K by T-30). On pace.

Press: 14 outlets confirmed embargoed reviews going live at 9am PT
launch day. /4

5/ What's left in the 7 weeks:
- 21 more pre-launch posts (Mon/Wed/Fri rhythm)
- Final hero video shoot July 15
- 7 more embargoed press hits
- Production tooling deposit paid July 28 /5

6/ The Kickstarter goes live Tue Aug 12 2026 at 9:00am PT.

Add to calendar: thox.ai/launch

🟢 Your AI. Your Data. Your Rules.
```

## Caption: Instagram

```
49 days to launch. 🟢

Status update on every front:
- Hardware: ThoxClip prototype QA 11/12 pass; ThoxNova ran 6-hour
  12B inference at 41 C lid temp
- Software: ThoxOS Kernel v1.1.24, ThoxLLM-327M v2 on HF, Thox
  Cowork in private alpha
- Launch list: 8,200 signups (target 10K by T-30)
- Press: 14 outlets with embargoed reviews going live 9am PT launch
  day

What's left: 21 more pre-launch posts, final hero video shoot July
15, production tooling deposit July 28.

Add Tue Aug 12 2026 9am PT to your calendar.

🔗 thox.ai/launch
.
.
#thoxai #countdown #prelaunch #kickstarter #localai #localfirst
#engineering #yourAI
```

## Caption: LinkedIn

```
49 days out from the THOX.ai Kickstarter (Tue Aug 12 2026 9am PT).

Where we are, by the numbers:

Hardware
- ThoxClip v7 prototype lot 0: 11/12 boards pass the 32-point QA
  probe (1 USB-C contact bridge, rework not respin)
- ThoxMini Variants A + B printing clean on the Qidi farm
- ThoxAir locked on the Coral Accelerator default; M.2 Hailo-8L is
  a BackerKit add-on
- ThoxNova ran a 6-hour 12B inference workload last weekend at 41 C
  lid temp (22 C ambient, passive cooling envelope confirmed)

Software
- ThoxOS Kernel v1.1.24 (24-absorb additive chain, MVP-7 through
  MVP-31, default kernel tree frozen against v1.2.0 carve-out)
- ThoxLLM family: 6 fine-tunes shipped, ThoxLLM-327M v2 published
  on HuggingFace
- Thox Cowork desktop app in private alpha
- Thox Terminal SwiftUI scaffold pushed to ttracx/thox-terminal

Audience
- Launch list 8,200 signups (target 10K by T-30; on pace)
- 14 outlets confirmed embargoed reviews going live 9am PT launch

Production
- Tooling deposit paid July 28
- First production run starts the week of Sep 14 (post-funding)

Aug 12 2026.
thox.ai/launch

#THOXai #localAI #engineering #kickstarter #prelaunch
```

## Alt text

```
A landscape composition of four THOX devices in a row on a dark
navy studio surface (ThoxClip, ThoxMini, ThoxAir, ThoxNova). The
upper-right corner carries a typographic countdown "49 DAYS / TO
LAUNCH" in emerald and white.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-24-mon-why-6-weeks-out`

## Acceptance

- [ ] Every status number verified live at publish (signups, press
      count, prototype counts)
- [ ] Days-to-launch countdown is accurate AT publish minute
- [ ] No em-dashes
