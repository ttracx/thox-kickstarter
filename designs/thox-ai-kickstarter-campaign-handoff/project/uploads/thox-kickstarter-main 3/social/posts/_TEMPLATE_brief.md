# Post brief template

Copy this file to the appropriate phase directory with a date-prefixed
ID: `posts/01-launch-day/2026-08-12-09am-launch-x.md`. Fill every
field. Empty fields fail the QA gate.

## Identity

- **Post ID**: `YYYY-MM-DD-<slug>` (e.g. `2026-08-12-09am-launch-x`)
- **Phase**: pre-launch | launch-day | week-1 | mid-campaign | stretch | final-48h | post-funding
- **Platform(s)**: x | instagram | tiktok | linkedin | youtube | reddit | threads (list all that apply)
- **Date / time (PT)**: `YYYY-MM-DD HH:MM`
- **Authored by**: Craig | Phamy | shared
- **Status**: draft | ready-to-schedule | scheduled | live | archived

## Intent

What backer action does this post drive? Pick ONE primary:

- Discovery / awareness (top of funnel)
- Email signup (pre-launch capture)
- Click to Kickstarter page
- Back a specific tier (which?)
- Share with a friend (viral coefficient)
- Community engagement / reply / comment

## Hero device

ThoxClip v7 | ThoxMini | ThoxAir | ThoxNova | MagStack cluster | Fleet shot | Founder | UI / app screen | None (text-only post)

## Asset spec

For each platform this post hits, fill the row:

| Platform | Aspect | Still file | Video file | Carousel? |
|---|---|---|---|---|
| <platform> | <aspect ratio> | `_03_still_<aspect>.png` | `_05_loop_<aspect>.mp4` | N or N slides |

## Prompts (the pipeline contract)

- **OpenAI image template used**: `IMAGE_TEMPLATES.md` section #__
- **Grok video template used**: `VIDEO_TEMPLATES.md` section #__
- **Grok illustration prompt** (if applicable): `ILLUSTRATION_SYSTEM_PROMPT.md` skeleton
- **Filled OpenAI prompt** lives at: `../../assets/social/<platform>/<post-id>/<post-id>__02_openai_prompt.txt`
- **Filled Grok prompt** lives at: `../../assets/social/<platform>/<post-id>/<post-id>__04_grok_prompt.txt`

## Caption(s) per platform

Each platform may need a variant. Use these as the source of truth;
schedulers pull from here.

### X (280 chars)

```
<caption text here, max 280 chars including link and hashtags>
```

### Instagram (2200 chars)

```
<caption, hook in first 125 chars, then expand>

<line break>

🔗 Link in bio
.
.
#thoxai #localai #yourAI #kickstarter #ai #tech #privacy #localfirst
```

### TikTok (4000 chars, 150-200 in practice)

```
<hook + value claim in first 150 chars>

#thoxai #localfirst #ai
```

### LinkedIn (3000 chars)

```
<technical lead, B2B framing>

<2-3 paragraphs>

Back the launch: kickstarter.com/projects/thox-ai/thox-unified-2026

#THOXai #localAI #engineering
```

### YouTube (Shorts caption / video description as applicable)

```
<title up to 100 chars>

Description (5000 chars):
<3-5 sentence summary>
<bullet list of timestamps if long-form>
<links>
```

### Reddit (per subreddit)

```
Subreddit: r/<name>
Title: <60-100 chars, no clickbait>
Body:
<native text post; no Kickstarter link in body>
```

### Threads (500 chars)

```
<caption, single hashtag>
```

## Alt text (accessibility)

```
<1-2 sentences describing the image for screen readers>
```

## UTM tracking

Append to the Kickstarter URL when posting:

```
?utm_source=<platform>&utm_medium=social&utm_campaign=ks-launch-2026&utm_content=<post-id>
```

## Acceptance checklist

- [ ] Caption under platform character limit
- [ ] Hashtags platform-appropriate
- [ ] Emoji usage matches platform audience (allowed in IG/TikTok; light on LinkedIn; none on press kit)
- [ ] Alt text present and descriptive
- [ ] UTM tracking appended to Kickstarter URL
- [ ] Asset files match naming convention in `../../prompts/PIPELINE.md`
- [ ] No em-dashes in caption
- [ ] Brief committed to repo before assets are generated
- [ ] Asset directory at `../../assets/social/<platform>/<post-id>/` created

## Post-mortem (fill after the post has been live for 48h)

- Impressions (24h):
- Click-through rate:
- Backer attribution (UTM-tracked):
- Notes for next time:
