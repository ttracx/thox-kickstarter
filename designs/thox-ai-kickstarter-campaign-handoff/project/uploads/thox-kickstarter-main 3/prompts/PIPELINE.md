# Image -> video pipeline (OpenAI -> Grok)

End-to-end workflow for producing a brand-consistent still + animated
asset pair for any THOX Kickstarter social post.

## Why a pipeline

Generating a still and a video independently produces visually
inconsistent assets (different device proportions, different rim-light
position, different background gradient). The OpenAI image is the
**ground truth still**; the Grok video animates that exact still
without re-synthesizing the device.

This keeps every social post visually anchored to a known-good frame.
The still ships as the carousel cover, the video ships as the
auto-play preview, and the two read as the same scene.

## File naming convention

Every post's artifacts live under
`../assets/social/<platform>/<post-id>/`. Naming inside the directory:

```
<post-id>__01_brief.md             one-line post intent + caption + alt text
<post-id>__02_openai_prompt.txt    full filled-in OpenAI image template
<post-id>__03_still_4x5.png        OpenAI image output (1024 x 1536)
<post-id>__03_still_1x1.png        square crop / regenerated variant
<post-id>__03_still_9x16.png       portrait crop / regenerated variant
<post-id>__04_grok_prompt.txt      full filled-in Grok video template
<post-id>__05_loop_4x5.mp4         Grok image-to-video output (4 s, 30 fps)
<post-id>__05_loop_9x16.mp4        9:16 variant for Stories / Reels / TikTok
<post-id>__06_caption.txt          final platform-specific caption with emoji
<post-id>__07_alt_text.txt         accessibility alt text for the image
```

Post IDs are date-prefixed: `2026-07-15-clip-magstack-reveal`.

## Pipeline steps

### Step 1: Define the brief (`_01_brief.md`)

The brief is the contract for both image and video generation. Write
it before opening either tool. The brief carries:

- **Intent**: what backer action this post drives ("learn about MagStack",
  "back the ThoxMini tier", "share with a friend").
- **Hero device**: ThoxClip v7 | ThoxMini | ThoxAir | ThoxNova |
  MagStack cluster | fleet shot.
- **Phase**: pre-launch | launch-day | week-1 | mid-campaign | stretch |
  final-48h | post-funding.
- **Platform**: x | instagram | tiktok | linkedin | youtube |
  reddit | threads.
- **Caption**: the actual text that will accompany the post (with
  approved emoji where the platform allows).
- **Alt text**: 1-2 sentence accessibility description.

A brief template lives at
`../social/posts/_TEMPLATE_brief.md`.

### Step 2: Generate the still (`_02_openai_prompt.txt` -> `_03_still_*.png`)

1. Open the OpenAI image tool. Load
   `openai/SYSTEM_PROMPT.md` into the system field.
2. Open the appropriate template in `openai/IMAGE_TEMPLATES.md`. Fill
   the `{slots}` per the brief. Save the filled-in prompt as
   `_02_openai_prompt.txt`.
3. Generate at the primary aspect ratio for the post's platform:
   - 4:5 portrait for Instagram feed -> `_03_still_4x5.png`
   - 1:1 square for X, LinkedIn, Facebook -> `_03_still_1x1.png`
   - 9:16 portrait for TikTok / Reels / Stories -> `_03_still_9x16.png`
   - 16:9 landscape for YouTube / press -> `_03_still_16x9.png`
4. If the post will hit multiple aspect ratios, regenerate at each
   ratio rather than cropping (cropping shifts the device position
   away from rule-of-thirds and breaks the composition).
5. Acceptance gate: does the still pass the OpenAI system prompt's
   "never produce" list? If not, regenerate with adjusted slot values.

### Step 3: Generate the video (`_04_grok_prompt.txt` -> `_05_loop_*.mp4`)

1. Open the Grok video tool. Load `grok/VIDEO_SYSTEM_PROMPT.md` into
   the system field.
2. Open the appropriate template in `grok/VIDEO_TEMPLATES.md`. Fill
   the `{slots}` per the brief. Save the filled-in prompt as
   `_04_grok_prompt.txt`.
3. Attach `_03_still_<aspect>.png` as the source image.
4. Generate at 4 seconds, 30 fps, the platform's primary aspect ratio.
5. Loop check: open the resulting MP4 in any player and confirm the
   loop is seamless (no pixel jump at the loop point). If the loop is
   visibly broken, regenerate with adjusted motion parameters (smaller
   orbit degrees, slower dolly percent).
6. Acceptance gate: does the video carry every pixel of the source
   still forward as much as physically possible? If Grok regenerated
   the device or background, the result is rejected.

### Step 4: Caption + alt text (`_06_caption.txt`, `_07_alt_text.txt`)

1. Write the caption per the platform's character limit (X: 280; IG:
   2200; LinkedIn: 3000; TikTok: 4000; Reddit: title 300 + body
   40000). Approved emoji per
   `../social/PLATFORMS.md`.
2. Write the alt text in 1-2 sentences for screen readers. Format:
   `"A {device_name} {action} on a {environment}. {brand_detail}."`
   Example: `"A ThoxClip v7 sits on a wooden desk next to an open
   notebook. The emerald LED dot glows softly on the bottom right."`

### Step 5: Post

Per the platform's runbook
(`../runbooks/06-daily-content.md`).

## Consistency tips across a multi-post series

When a single campaign phase needs 5 posts that visually belong
together (e.g., the launch-day rollout for ThoxClip across X +
Instagram + LinkedIn + TikTok + YouTube):

1. Generate the **anchor still** first at the highest quality, 16:9
   landscape. This is the "master" frame.
2. For each subsequent aspect ratio, use the OpenAI image tool's
   `--reference-image` flag (or equivalent) to carry the master
   frame's visual treatment forward. The device pose, the rim-light
   color temperature, the background gradient should match.
3. For the videos: generate the 16:9 video first from the 16:9 still.
   For each subsequent aspect ratio, use the matching still + the
   same motion vocabulary (same `{motion_type}` slot value). The
   videos will feel like cuts from the same hero shoot.

## Iteration budget

- Stills: budget 3 generations per asset. If the third generation
  does not pass acceptance, revise the brief.
- Videos: budget 2 generations per asset. If the second loop is broken
  or off-brand, switch to a different motion vocabulary (e.g., from
  orbit-around to surface-activity loop).
- Total cost per post (still + video at one aspect ratio): ~5
  generations max. For a 4-aspect-ratio post: ~12 generations.

## Failure modes

- **Misspelled THOX wordmark in image**: regenerate with the wordmark
  omitted; let the caption carry the brand.
- **Competitor brand surfaces in lifestyle background**: regenerate
  with explicit "no recognizable phone makes / coffee chain cups /
  laptop brands" in the slot fill.
- **Em-dash baked into on-image text**: this is a system-prompt
  regression. Re-paste the OpenAI / Grok system prompt to reset.
- **Synthetic face of a real person**: refuse; reserve those slots
  for real photographs only.
- **Loop point visible in video**: shorten the orbit / dolly amount
  by 30 percent and regenerate.

## When to break the pipeline

For high-budget hero assets (launch trailer, founder testimonial,
campaign close video), the pipeline is a starting point but is not
sufficient. Hand those off to a human director with the OpenAI still
and Grok loop as reference frames for the live-shoot storyboard.
