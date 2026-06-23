# THOX Kickstarter prompt library

The complete instructional prompt set for generating Kickstarter
campaign assets with OpenAI image models and xAI Grok video / illustration
models. Every prompt here is brand-locked to the THOX.ai design tokens in
[../assets/README.md](../assets/README.md) and to the campaign narrative in
[../docs/CAMPAIGN_INFO.md](../docs/CAMPAIGN_INFO.md).

## Tool routing

| Asset type | Tool | Prompt file |
|---|---|---|
| Static hero shot (square, 4:5, 9:16, 16:9) | OpenAI image (gpt-image-1 or DALL-E 3) | [openai/SYSTEM_PROMPT.md](openai/SYSTEM_PROMPT.md) + [openai/IMAGE_TEMPLATES.md](openai/IMAGE_TEMPLATES.md) |
| Product lifestyle photography | OpenAI image | [openai/IMAGE_TEMPLATES.md](openai/IMAGE_TEMPLATES.md) section "Lifestyle" |
| Comparison chart / infographic | OpenAI image | [openai/IMAGE_TEMPLATES.md](openai/IMAGE_TEMPLATES.md) section "Infographic" |
| Vector illustration / icon set | xAI Grok illustration | [grok/ILLUSTRATION_SYSTEM_PROMPT.md](grok/ILLUSTRATION_SYSTEM_PROMPT.md) |
| Static image -> motion video (3 to 6 s loop) | xAI Grok video (image-to-video) | [grok/VIDEO_SYSTEM_PROMPT.md](grok/VIDEO_SYSTEM_PROMPT.md) + [grok/VIDEO_TEMPLATES.md](grok/VIDEO_TEMPLATES.md) |
| Text -> motion video (no source image) | xAI Grok video (text-to-video) | [grok/VIDEO_SYSTEM_PROMPT.md](grok/VIDEO_SYSTEM_PROMPT.md) section "Text-to-video" |
| End-to-end pipeline (OpenAI image -> Grok video) | both | [PIPELINE.md](PIPELINE.md) |

## How to use these prompts

1. Open the system-prompt file for your tool (`openai/SYSTEM_PROMPT.md`
   or `grok/VIDEO_SYSTEM_PROMPT.md` / `grok/ILLUSTRATION_SYSTEM_PROMPT.md`).
2. Copy the entire system prompt into the tool's system / instruction
   field. These prompts pin the THOX brand voice, the design tokens,
   and the no-emoji-in-tech-docs / yes-emoji-in-consumer-marketing
   convention.
3. Open the template file for the specific asset you are generating
   (e.g. `openai/IMAGE_TEMPLATES.md` -> "Hero product shot").
4. Copy the template, fill the bracketed `{slots}` with the post's
   specifics (which device, which phase, which platform aspect ratio).
5. Paste the filled template as the user message. Generate.
6. If output drifts from the brand, the system prompt is the lever:
   add the offending word/style to the "Never" list.

## Outputs land here

Generated assets land in `../assets/social/<platform>/<post-id>/`. Each
post's spec under `../social/posts/<phase>/<post-id>.md` carries the
exact prompts that produced its image and its video so the asset is
reproducible.

## Tool-specific notes

### OpenAI image (`gpt-image-1`)

- Best for: photoreal product shots, lifestyle photography, dark-mode
  UI mockups, infographic compositions with crisp typography.
- Aspect-ratio control: pass `size` parameter. Supported sizes for
  Kickstarter assets: `1024x1024` (square posts), `1024x1536` (4:5
  Instagram feed / portrait), `1536x1024` (16:9 hero / landscape).
  9:16 stories crop from `1024x1536` with a center anchor.
- Iteration: use `--reference-image` (if your wrapper supports it) to
  carry a previous output's visual treatment into the next post.

### xAI Grok video

- Best for: image-to-video animation of a static hero shot. Typical
  output: 3 to 6 second loop, 1080p, 24-30 fps, MP4 H.264.
- Best motion paradigm: subtle camera move (orbit 15-30 degrees,
  dolly in 5-10 percent, parallax tilt) plus surface activity (subtle
  emerald glow pulse, particle drift, MagStack ring rotation). Avoid
  whole-scene replacements - the brand wants the device to stay
  recognizable.
- Aspect-ratio control: pass `aspect_ratio` parameter. Supported
  ratios: `1:1`, `9:16`, `16:9`, `4:5`.
- Iteration: pass a previous frame as `--reference-image` so each
  short clip in a sequence stays visually consistent.

### xAI Grok illustration

- Best for: vector-style icons, flat illustrations, MagStack cluster
  diagrams, retro-tech badges, stretch-goal unlock graphics.
- Style anchor: `clean vector illustration, dark navy background, two-tone
  emerald and white, no gradients, no skeuomorphism, sharp edges`.
- Output format: PNG with transparent or solid dark navy background.

## Cost discipline

Generate at the smallest size that meets the platform spec, not the
maximum. Most Instagram feed posts are served at 1080 px wide; do not
spend 4K credits on a feed post that will be downsampled before
upload. The per-platform spec lookup is in
[../social/CALENDAR.md](../social/CALENDAR.md) and the per-platform
detail is in [../social/PLATFORMS.md](../social/PLATFORMS.md).

## Brand voice reminder

THOX.ai's brand voice for the Kickstarter is **consumer-facing**, which
is the explicit exception to the no-emoji rule. Emojis are allowed in
caption copy. They are NOT allowed in the generated image text or in
on-screen text in videos. Em-dashes are still avoided everywhere.

The product names render in IBM Plex Sans Bold in graphics, lowercase
`thox` in body copy when conversational, capitalized `THOX.ai` when
formal. The tagline "Your AI. Your Data. Your Rules." is reserved for
hero positions and is never paraphrased.
