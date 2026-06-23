# Pre-launch W3 Fri - BTS: a calibration print failure (and what we learned)

## Identity

- **Post ID**: `2026-05-31-fri-bts-calibration-failure`
- **Phase**: pre-launch (T-73)
- **Platforms**: x, instagram (Feed + Stories), tiktok, youtube (Short)
- **Date / time (PT)**: 2026-05-31 11:00
- **Authored by**: Craig
- **Status**: ready-to-schedule

## Intent

Trust through vulnerability. Showing the failure (not just the
success) is the strongest credibility signal pre-launch. Drive 150+
launch signups by showing real engineering iteration.

## Hero

REAL photo: a stringy, warped first-attempt ThoxClip shell print next
to the v3 clean print. The "before / after" tells the story.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | side-by-side photo + 5-tweet thread |
| instagram | 4:5 Feed | side-by-side photo |
| instagram | 9:16 Stories | 5-sticker "what went wrong" sequence |
| tiktok | 9:16 | 60-second "from fail to ship" narration |
| youtube | 9:16 Short | same 60-second narration with chapter markers |

## Caption: X (5-tweet thread)

```
1/ Friday BTS, the post-mortem edition.

Here's the first attempt at a ThoxClip v7 shell on the Qidi Q2
Combo. Warped corners, stringing across the wordmark inlay, USB-C
cutout 0.4 mm too small. /1

2/ What went wrong:
- bed temp 100 C, but the chamber was sitting at 35 C (door cracked)
- ASA pulled off the brim mid-print
- the green ASA color separation bled into the black shell on the
  wordmark layer /2

3/ What we changed:
- chamber sealed (65 C native, no door cracking)
- brim bumped from 5 mm to 7 mm for ASA
- toolchange purge volume tuned from 60 mm^3 to 75 mm^3 (the bleed
  was under-purged toolchange) /3

4/ v3 is on the right. Clean corners. Crisp green wordmark. USB-C
cutout dimensionally accurate.

3 iterations, 18 hours of print time, 0 wasted dollars (failed prints
ground back into pellet feedstock). /4

5/ This is the engineering iteration cycle that happens for every
device before backers get one.

Spec + kit at github.com/ttracx/thox-3dprint-kit

📍 thox.ai/launch
🟢
```

## Caption: Instagram

```
Friday BTS, the post-mortem edition. 🟢

Left: the first attempt at a ThoxClip v7 shell on the Qidi Q2 Combo.
Warped corners, stringy wordmark inlay, USB-C cutout under-sized.

Right: v3 after fixing the chamber temp, the brim width, and the
toolchange purge volume.

3 iterations. 18 hours of print time. 0 wasted dollars (failed prints
grind back into pellet feedstock for the next run).

This is the engineering iteration cycle that happens for every
device before a backer gets one.

🔗 thox.ai/launch
.
.
#thoxai #3dprinting #postmortem #engineering #iteration #qidi
#localfirst #behindthescenes #failandlearn
```

## Caption: TikTok

```
60 seconds: a failed ThoxClip print, what went wrong, what we fixed.
3 iterations. 0 wasted dollars. Failed prints become pellet
feedstock. 🟢

#thoxai #3dprinting #engineering #postmortem
```

## Caption: YouTube Shorts

Title: `Postmortem: 3 iterations to a clean ThoxClip print 🟢`

Description:
```
The 60-second postmortem of the first failed ThoxClip v7 shell
print on the Qidi Q2 Combo, plus the 3 changes (chamber seal, brim
width, purge volume) that made v3 clean.

00:00 First attempt - the failure
00:15 Diagnosis
00:30 What we changed
00:45 v3 result + ground-back pellet recycling

Full kit: github.com/ttracx/thox-3dprint-kit
Launch list: thox.ai/launch

#shorts #thoxai #3dprinting #qidi #postmortem #engineering
```

## Alt text

```
Two black ThoxClip v7 enclosure shells side by side on a workbench.
Left: a failed print with warped corners and stringing on the
wordmark area. Right: a clean v3 print with crisp green wordmark and
dimensionally accurate USB-C cutout.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-05-31-fri-bts-calibration-failure`

## Acceptance

- [ ] Both photos REAL (not AI)
- [ ] Brand-graded backdrop composite applied
- [ ] Failure modes documented honestly (no spin)
- [ ] No em-dashes
