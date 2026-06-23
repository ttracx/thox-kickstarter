# Runbook 06: Daily / weekly content production

The operating rhythm that turns the prompt library + brief templates
into actual scheduled posts. Run this rhythm continuously from T-90
through T+30 and at reduced cadence through T+200.

## Weekly production sprint (Monday)

This is the heaviest day of the week. Block 6 hours.

### 9:00am - 11:00am: brief drafting

For each platform-day cell in next week's row of
[../social/CALENDAR.md](../social/CALENDAR.md), draft a brief:

1. Copy `../social/posts/_TEMPLATE_brief.md` to
   `../social/posts/<phase>/<post-id>.md`.
2. Fill the brief: intent, hero device, asset spec, caption, alt text,
   UTM.
3. Cross-link to the asset directory at
   `../assets/social/<platform>/<post-id>/`.

For a standard week (1-2 posts/day per platform, 7 platforms): 14-28
briefs.

### 11:00am - 1:00pm: lunch + asset directory setup

Create the asset directories for the week's posts:

```
for post in week_posts:
  mkdir -p ../assets/social/<platform>/<post-id>/
```

(Use a shell script; manual mkdir takes too long for 28 dirs.)

### 1:00pm - 4:00pm: OpenAI image generation

1. Open the OpenAI image tool. Load `../prompts/openai/SYSTEM_PROMPT.md`
   as the system prompt.
2. For each brief, fill the appropriate template from
   `../prompts/openai/IMAGE_TEMPLATES.md` and save to
   `<post-id>__02_openai_prompt.txt`.
3. Generate the image at the brief's primary aspect ratio. Save to
   `<post-id>__03_still_<aspect>.png`.
4. If the post needs multiple aspect ratios, regenerate at each
   ratio. Do NOT crop (cropping breaks the composition).
5. Acceptance gate: each image passes the OpenAI system prompt
   "Never produce" list.

For a standard week of 28 posts at 2 aspect ratios each: ~56
generations. Budget: ~$30-60 in image generation costs depending on
quality settings.

### 4:00pm - 6:00pm: Grok video generation

1. Open the Grok video tool. Load
   `../prompts/grok/VIDEO_SYSTEM_PROMPT.md` as the system prompt.
2. For each brief that needs a video (Reels, TikTok, Shorts), fill
   the appropriate template from
   `../prompts/grok/VIDEO_TEMPLATES.md` and save to
   `<post-id>__04_grok_prompt.txt`.
3. Attach the source still as `--reference-image`.
4. Generate at 4 seconds, 30 fps, primary aspect ratio. Save to
   `<post-id>__05_loop_<aspect>.mp4`.
5. Loop check: open each MP4. Verify seamless loop.
6. Acceptance gate: each video passes the Grok system prompt
   "Never produce" list.

For a standard week: ~10-15 videos. Budget: ~$15-30 in video
generation costs.

## Tuesday: scheduling

Block 3 hours.

### 9:00am - 12:00pm: scheduling

1. Open Buffer / TweetDeck / TikTok Studio / YouTube Studio.
2. For each brief, paste the caption per platform.
3. Upload the still / video.
4. Add alt text.
5. Add the UTM-tagged Kickstarter link in the appropriate field (bio
   link for IG; caption for others).
6. Schedule per the time in
   [../social/CALENDAR.md](../social/CALENDAR.md).
7. Verify scheduled time in the platform-specific scheduler dashboard.

## Wednesday - Sunday: daily operations

Block 30 minutes per day:

- **Morning (9:00am PT)**: reply window. Sweep all 7 platforms for
  comments / DMs from the past 12-18 hours. Reply per the SLA in
  [README.md](README.md) "SLAs".
- **Evening (6:00pm PT)**: reply window. Sweep again.

If a post unexpectedly goes viral (>10x normal engagement), trigger
the surge response from [01-launch-week.md](01-launch-week.md)
"launch surge" section: extra reply windows, top-replier shoutouts,
quote-tweet thread.

## Asset library maintenance

Once a week (Friday), prune the asset library:

- [ ] Archive `<post-id>` directories for posts that went live more
      than 30 days ago to `../assets/social/_archive/`.
- [ ] Confirm the live `../assets/social/<platform>/` directories
      only contain assets for posts in the active or next scheduling
      window.
- [ ] Update `../assets/README.md` if any asset naming conventions
      shifted.

## Cost discipline

Per-week asset generation budget:

| Asset type | Per week | Per month |
|---|---|---|
| OpenAI image (high quality, 1024x1536) | ~$40 | ~$160 |
| Grok video (image-to-video, 4s, 9:16) | ~$25 | ~$100 |
| Grok illustration (motif library) | ~$5 | ~$20 |
| **Total** | **~$70** | **~$280** |

Across the 12-week pre-launch + 4-week launch + post-funding: ~$5K
total in AI generation costs.

If the budget is tight, the levers in order of priority:

1. **Cut Reddit content production**. Reddit doesn't need high-budget
   assets; native text + 1 hero is enough.
2. **Re-use assets across platforms**. The 4:5 IG asset crops to 1:1
   for X, then 9:16 for Stories with negligible quality loss at
   social-feed resolution.
3. **Drop the 9:16 Story coverage for mid-campaign**. Reach drops are
   marginal; Reels and TikTok carry the 9:16 audience.

## When to break the rhythm

Not often, but:

- Launch day, $1M unlock, stretch ceiling, close day: production
  shifts from weekly to hourly.
- Press hit landing: produce 2-3 quote-pull posts within 4 hours of
  the press hit.
- Viral moment on a third-party post about THOX: respond within 2
  hours with a quote-tweet + new asset if warranted.
- Crisis: per [07-crisis-response.md](07-crisis-response.md). All
  scheduled production pauses until the crisis is resolved.

## Tooling shortcuts

- **Asset directory creation**: use a one-liner shell script:
  `for post in $(cat next_week_posts.txt); do mkdir -p assets/social/${post%:*}/${post#*:}; done`
- **Caption character counts**: use the platform's native composer (it
  shows live counts) rather than guessing.
- **UTM appending**: keep a tiny URL-template tool (Python one-liner)
  in the team's shared scripts so UTMs are never forgotten.
- **Loop check**: use VLC or QuickTime in loop mode; if the loop point
  is visible, regenerate with adjusted motion parameters.
