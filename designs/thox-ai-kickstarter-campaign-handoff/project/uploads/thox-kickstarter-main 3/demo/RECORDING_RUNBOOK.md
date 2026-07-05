# Device Demo Recording Runbook

This runbook turns the finalized device demos into a repeatable recording session.

## Recording goal

Capture one clean integrated demo plus four standalone product demo clips that can be used in the Kickstarter hero video, founder walkthrough, Kickstarter Updates, social posts, and press follow-ups.

## Required outputs

| Output | Target length | Use |
|---|---:|---|
| Integrated ecosystem demo | 60 to 90 seconds | Hero video middle section and walkthrough |
| ThoxKey standalone demo | 20 to 30 seconds | Product section, social, Update |
| ThoxMini Air standalone demo | 20 to 30 seconds | Product section, social, Update |
| ThoxMini standalone demo | 25 to 40 seconds | Technical walkthrough and Update |
| ThoxClip standalone demo | 20 to 30 seconds | Product section, social, Update |
| Pricing insert | 8 to 12 seconds | Hero video and social cutdown |
| Founder trust close | 20 to 30 seconds | Hero video close |

## Preflight checklist

| Status | Item | Owner |
|---|---|---|
| [ ] | Device props cleaned and staged | Producer |
| [ ] | Screens set to demo mode with no real credentials | Tommy |
| [ ] | Demo dashboard loaded locally | Tommy |
| [ ] | Pricing card checked against `docs/REWARDS_MATRIX.md` | Craig |
| [ ] | Lower thirds checked: Craig Ross CEO, Tommy Xaypanya CTO | Producer |
| [ ] | Lighting set: dark desk, emerald accent, no glare | Producer |
| [ ] | Audio levels checked | Producer |
| [ ] | Claim guardrails printed or visible off-camera | Producer |
| [ ] | File naming folder created | Producer |

## Desk layout

```text
Camera A wide shot

[ laptop / monitor ]     [ ThoxMini ]
         |                [ ThoxMini Air ]
[ ThoxKey near laptop ]   [ ThoxClip near notebook/lapel ]

Camera B macro / close-up moves between devices.
```

## Camera plan

| Camera | Use | Notes |
|---|---|---|
| Camera A | Wide founder/device desk shot | Locked tripod, no handheld shake |
| Camera B | Macro product close-ups | Slow pushes, USB insert, clip capture |
| Screen capture | Local dashboard | 1080p or higher, no credentials |

## Audio plan

- Record Craig and Tommy with separate mics when possible.
- Record room tone for 30 seconds before takes.
- Keep music out of the raw capture.
- Use clean narration first; add music only in edit.

## Take order

1. Record room tone.
2. Record integrated demo wide shot.
3. Record ThoxKey macro and screen capture.
4. Record ThoxMini Air desk and topology shots.
5. Record ThoxMini dashboard screen capture.
6. Record ThoxClip lifestyle and capture shots.
7. Record Craig pricing section.
8. Record Tommy architecture section.
9. Record Craig + Tommy closing ask.
10. Capture pickup shots for any unclear visual.

## Live recording script cards

### Card 1: Integrated flow

**Tommy:** ThoxKey unlocks the private workspace. ThoxMini Air connects nearby local devices. ThoxMini runs the local services. ThoxClip captures a note and routes it into the workspace. Heavier work routes to capable local hardware the user owns.

### Card 2: Pricing

**Craig:** Kickstarter backers get special pricing. ThoxKey starts at $24 for early backers. ThoxMini Air starts at $69. ThoxMini starts at $149. ThoxClip starts at $299. Standard Kickstarter specials are still below retail.

### Card 3: Trust close

**Craig:** We are building this with honest claims and clear backer communication.

**Tommy:** We will show what runs where, what is ready, and what is still being validated.

**Craig:** Back THOX.ai and help launch private AI hardware people can actually own.

## Screen demo safety

Before recording, verify every screen:

- [ ] No API keys.
- [ ] No email addresses.
- [ ] No real customer names.
- [ ] No supplier names unless approved.
- [ ] No private repository URLs.
- [ ] No live tokens.
- [ ] No personal notifications.
- [ ] Browser bookmarks hidden.
- [ ] Menu bar notifications disabled.

## File naming

```text
YYYYMMDD__device-demo__<segment>__<camera>__take-<nn>.<ext>
```

Examples:

```text
20260801__device-demo__integrated__camera-a__take-01.mov
20260801__device-demo__thoxkey__screen__take-02.mp4
20260801__device-demo__thoxclip__camera-b__take-03.mov
```

## Best-take log

```md
# Best Take Log

## Integrated ecosystem demo
Best take:
Notes:

## ThoxKey
Best take:
Notes:

## ThoxMini Air
Best take:
Notes:

## ThoxMini
Best take:
Notes:

## ThoxClip
Best take:
Notes:

## Pricing
Best take:
Notes:

## Closing
Best take:
Notes:
```

## Edit checklist

- [ ] Cut every segment to one clear idea.
- [ ] Add captions.
- [ ] Add lower thirds once per speaker.
- [ ] Add product name cards.
- [ ] Add price card once in hero video and once in walkthrough.
- [ ] Do not hide claim boundaries in tiny text.
- [ ] Export 16:9 master.
- [ ] Export 9:16 social clips.
- [ ] Export 1:1 square clips.

## Final review

Craig reviews:

- pricing
- business claims
- manufacturing claims
- backer commitment

Tommy reviews:

- technical claims
- security claims
- architecture diagram
- demo accuracy

Producer reviews:

- audio
- captions
- readability
- visual continuity
- file naming
