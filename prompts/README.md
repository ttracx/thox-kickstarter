# THOX.ai Kickstarter Prompt Library

This prompt library supports the quick-launch Kickstarter campaign for:

- ThoxKey
- ThoxMini Air
- ThoxMini
- ThoxClip

The canonical prompt chain is in `../docs/VIDEO_SCENE_PROMPTS.md`.

## Prompt workflow

```text
campaign scene -> graphic prompt -> approved still -> image-to-video prompt -> edited clip
```

## Prompt rules

- Keep all visuals local-first and privacy-first.
- Use dark navy, soft black, emerald accents, and premium hardware composition.
- Do not imply cloud dependency unless the copy explicitly says optional connector.
- Do not present generated device imagery as final production photography.
- Do not create medical, emergency, surveillance, law-enforcement, or regulated-use visuals.
- Preserve exact prices and product names.
- Preserve founder titles: Craig Ross, CEO and Tommy Xaypanya, CTO.

## Canonical files

| Need | File |
|---|---|
| Kickstarter hero scenes | `../docs/VIDEO_SCENE_PROMPTS.md` |
| Hero video script | `../docs/VIDEO_SCRIPT.md` |
| Founder walkthrough | `../docs/VIDEO_WALKTHROUGH_SCRIPT.md` |
| Campaign source of truth | `../docs/CAMPAIGN_INFO.md` |
| Rewards and prices | `../docs/REWARDS_MATRIX.md` |

## Asset naming

Use this naming pattern:

```text
assets/generated/<scene-id>/<scene-id>__<asset-type>__<aspect-ratio>__v<version>.<ext>
```

Examples:

```text
assets/generated/scene-01/scene-01__graphic__16x9__v01.png
assets/generated/scene-01/scene-01__video__16x9__v01.mp4
assets/generated/scene-08/scene-08__pricing-card__9x16__v02.png
```

## Approval checklist

Before an asset leaves staging:

- [ ] Product names are correct.
- [ ] Prices are correct.
- [ ] Generated product visuals are labeled as concept when needed.
- [ ] Text is readable on mobile.
- [ ] No forbidden claims appear.
- [ ] Craig and Tommy titles are correct.
