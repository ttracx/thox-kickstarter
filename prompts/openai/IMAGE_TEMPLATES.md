# OpenAI image templates - per asset type

Each template below assumes [SYSTEM_PROMPT.md](SYSTEM_PROMPT.md) is
loaded as the system instruction. Copy the user-prompt template, fill
the `{slots}`, and submit. Generate.

## 1. Hero product shot (square 1:1, feed-ready)

**Use for**: launch-day announcement post, pre-launch teaser, profile
header, press kit hero.

**OpenAI parameters**: `size=1024x1024`, `quality=high`,
`background=opaque`.

**User prompt template**:

```
Studio product hero of the {device_name} centered in frame, photoreal,
three-quarter front view with the {hero_face} facing the camera.

Background: deep navy #0a0e14 seamless studio sweep with subtle
gradient darkening toward the edges, no horizon line.

Lighting: cool-white key light (5500K) from upper-left, warm-amber fill
from lower-right, emerald #10b981 rim light tracing the device
silhouette from behind. Mirror-finish floor with a 30 percent opacity
reflection of the device fading to black.

Device detail: {device_physical_specs}. Surface finish matte black
ASA with visible micro-texture. {brand_accent_detail}.

Composition: device occupies 50 percent of frame, sits 5 percent below
vertical center, frame is square 1:1, negative space top and bottom for
caption overlay if needed.

No on-image text. No people. No competing brand marks. No emojis.
Photoreal, magazine-cover quality, sharp focus across the device.
```

**Slot guide**:

- `{device_name}`: ThoxClip v7 | ThoxMini | ThoxAir | ThoxNova
- `{hero_face}`: front face (default) | back face (shows MagStack ring) | three-quarter angle
- `{device_physical_specs}`: copy verbatim from `SYSTEM_PROMPT.md` "Device descriptions"
- `{brand_accent_detail}`: "subtle emerald LED dot glowing on the lower right" |
  "MagStack ring catching the rim light" |
  "USB-C port on the bottom edge visible"

## 2. Hero product shot (4:5 portrait, Instagram feed)

Same as #1 but:

- `size=1024x1536`, frame 4:5 portrait.
- Add to prompt: "Device occupies 60 percent of frame vertically, anchored
  in the lower-middle third, with negative space above for caption
  overlay 18 percent of frame height."

## 3. Hero product shot (9:16 portrait, Stories / TikTok / Reels)

Same as #1 but:

- `size=1024x1536`, frame 9:16 portrait, center-crop the 4:5 output.
- Add to prompt: "Device occupies 45 percent of frame height, anchored
  in the upper-middle third, leaving the bottom 30 percent clear for
  swipe-up sticker / CTA overlay."

## 4. Hero product shot (16:9 landscape, YouTube thumbnail / press)

Same as #1 but:

- `size=1536x1024`, frame 16:9 landscape.
- Add to prompt: "Device occupies 35 percent of frame, anchored on the
  right third (rule of thirds), left two-thirds carries a subtle
  emerald light streak across the navy background. Negative space on the
  left for headline overlay 30 percent of frame width."

## 5. Lifestyle shot (4:5 portrait, Instagram feed)

**Use for**: showing the device in real-world context. Pre-launch
"this is your morning" teasers, post-launch user-story posts.

**OpenAI parameters**: `size=1024x1536`, `quality=high`,
`background=opaque`.

**User prompt template**:

```
Lifestyle photograph of a {device_name} {context_action}.

Environment: {environment}. Time of day: {time_of_day}, lighting is
{light_mood} with golden-hour or blue-hour color cast.

Composition: device occupies 35 percent of frame, off-center per rule
of thirds, leading line directs eye to the emerald LED accent on the
device. Background is shallow depth-of-field, recognizable as
{environment} but not distracting.

Device detail: {device_physical_specs}. Subtle emerald #10b981 LED
accent visible on the device, no other glowing UI.

Color treatment: warm shadows, cool highlights, dark navy and emerald
remain the dominant brand colors even in a real-world scene. No
oversaturation, no Instagram filter look.

No on-image text. No named-brand objects in background (no recognizable
phone makes, laptop brands, coffee chain cups, etc.). No people facing
the camera with identifiable features; hands and partial bodies are
acceptable. No emojis, no em-dashes.
```

**Slot guide**:

- `{device_name}`: as above
- `{context_action}`: "clipped to the back of a generic phone on a wooden
  desk" | "in a hand reaching for a backpack" | "sitting on a nightstand
  next to an open book" | "magnetically docked to a laptop lid"
- `{environment}`: "minimalist workspace with a single succulent" |
  "morning kitchen counter" | "outdoor cafe table" | "modern bedroom
  side-table"
- `{time_of_day}`: "golden hour" | "blue hour" | "soft overcast" |
  "early morning natural light"
- `{light_mood}`: "warm and intimate" | "cool and crisp" | "ambient and
  contemplative"

## 6. MagStack cluster shot (1:1 or 4:5)

**Use for**: showcasing the MagStack Air clustering capability. ONLY
when MagStack is the explicit subject.

**OpenAI parameters**: `size=1024x1024` or `1024x1536`,
`quality=high`, `background=opaque`.

**User prompt template**:

```
Studio product shot of {n} ThoxClip v7 devices stacked vertically in a
MagStack column, each device magnetically docked to the one above and
below via the 62 mm MagStack ring. The stack is photographed at a 15
degree side-tilt so all {n} devices are clearly visible.

Background: deep navy #0a0e14 seamless studio sweep.

Lighting: cool-white key, warm fill, MagStack purple #a855f7 rim light
tracing the cluster silhouette (purple is the cluster brand color, only
used when MagStack is the subject). Subtle emerald #10b981 LED dot on
each device's bottom strip.

Composition: stack centered, occupies 65 percent of frame vertically,
camera at device-mid-height looking slightly upward to emphasize the
column.

Detail: each MagStack ring is visible at the join, with a thin
purple-to-emerald glow gradient at the magnetic interface to suggest
the data-and-power handshake.

No on-image text. No competing brand marks. Photoreal, magazine quality.
```

**Slot guide**:

- `{n}`: 4 | 6 | 8 (MagStack Air supports 4 to 8 nodes per cluster)

## 7. Comparison infographic (1:1 or 4:5)

**Use for**: ThoxNova vs cloud-only assistants, ThoxMini vs USB
dongles, etc. Vector style, not photoreal.

**OpenAI parameters**: `size=1024x1024` or `1024x1536`,
`quality=medium` (vector style does not need photo-quality budget),
`background=opaque`.

**User prompt template**:

```
Flat vector infographic comparing {axis_label_left} versus
{axis_label_right}.

Background: deep navy #0a0e14 solid fill, edge-to-edge.

Layout: split-screen vertical divide down the center. Left side
labeled "{axis_label_left}" in white IBM Plex Sans Bold 56 px at the
top. Right side labeled "{axis_label_right}" in emerald #10b981 IBM
Plex Sans Bold 56 px at the top.

Center divider: thin 2 px emerald line top to bottom.

Body: {n_rows} comparison rows, each row is a single attribute (e.g.,
"runs offline", "your data stays local", "monthly fee"). Each row has
the attribute label in slate #475569 IBM Plex Sans 32 px centered on
the divider, with a left-side icon (vector style, white outline) and a
right-side icon (emerald outline).

Icons: simple line-art, no gradients, no shadows, 64 x 64 px.

Bottom footer: "thox.ai" in JetBrains Mono Bold 28 px in emerald,
right-aligned, 5 percent margin.

No photos. No skeuomorphism. No gradients. No emojis. Sharp vector
edges throughout.
```

**Slot guide**:

- `{axis_label_left}`: "Cloud-only AI" | "USB dongles" | "Generic
  wireless chargers"
- `{axis_label_right}`: "ThoxNova" | "ThoxMini" | "ThoxClip"
- `{n_rows}`: 4 | 5 | 6 rows (six max; readability falls past six)

## 8. Stretch-goal unlock graphic (1:1)

**Use for**: announcing each stretch-goal unlock at $250K / $500K /
$1M / $2M / $3M.

**OpenAI parameters**: `size=1024x1024`, `quality=medium`,
`background=opaque`.

**User prompt template**:

```
Flat vector unlock celebration graphic.

Background: deep navy #0a0e14 with a subtle radial vignette emerald
#10b981 (5 percent opacity) emanating from center.

Center element: the unlock amount "{unlock_amount}" in emerald
#10b981, IBM Plex Sans Bold 180 px, centered both axes.

Above the amount: "UNLOCKED" in white IBM Plex Sans Bold 48 px,
letter-spacing 0.2 em, centered.

Below the amount: the unlock name "{unlock_name}" in white IBM Plex
Sans Medium 56 px, centered, plus a one-line description
"{unlock_description}" in slate #475569 IBM Plex Sans Regular 32 px on
the next line.

Top-right corner: small THOX logomark, 80 x 80 px, 5 percent margin.

Decorative element: thin emerald line border 4 px, inset 24 px from
all edges.

No emojis. No confetti graphics. No gradients on text. Sharp typography
throughout. Vector style, flat.
```

**Slot guide**:

- `{unlock_amount}`: "$250K" | "$500K" | "$1M" | "$2M" | "$3M"
- `{unlock_name}`: per `../../docs/STRETCH_GOALS.md`
- `{unlock_description}`: one-line summary, max 65 characters

## 9. Founder talking-head (4:5 portrait, optional)

**Use for**: testimonial-style posts, "meet the inventors". Lifestyle
treatment, not headshot.

**OpenAI parameters**: `size=1024x1536`, `quality=high`,
`background=opaque`.

**User prompt template**:

```
NOT a generated face. This template is reserved for compositing a real
photograph of {founder_name} (Craig Ross or Phamy Xaypanya). Do not
generate a face for this slot. If you receive this template, return an
error and request a real photograph upload.
```

Reason: synthetic founders break the press kit and any backer who
reverse-searches the image. The Press Kit reserves this slot for real
photographs only.

## 10. Dashboard / UI mockup (16:9 landscape)

**Use for**: showing the Thox Cowork desktop app, the Thox Terminal
mobile control plane, or the device telemetry dashboard.

**OpenAI parameters**: `size=1536x1024`, `quality=high`,
`background=opaque`.

**User prompt template**:

```
Photorealistic UI mockup of the {app_name} application running on a
{device_context}.

App design: dark mode, background #0a0e14, sidebar #1f2a44 (slightly
lighter), accent #10b981 for active states, monospace JetBrains Mono
for code blocks and labels, IBM Plex Sans for UI text.

UI layout: {ui_layout_description}.

Surrounding environment: {environment_context}. Subtle reflections on
the device screen consistent with the {time_of_day} lighting.

No real-person photographs in the UI. No competitor brand marks in the
UI. All app text in IBM Plex Sans or JetBrains Mono. No emojis in the
UI.
```

**Slot guide**:

- `{app_name}`: "Thox Cowork" | "Thox Terminal" | "Thox Forge"
- `{device_context}`: "MacBook Pro 14 (generic silver laptop, no Apple
  logo visible)" | "iPhone-class phone (generic, no Apple logo)" |
  "iPad-class tablet on a stand"
- `{ui_layout_description}`: copy from the relevant product's screenshot
  reference if available, else describe in 3-4 sentences
- `{environment_context}`: "minimalist desk, succulent in background" |
  "kitchen counter at sunrise" | "studio black backdrop"
- `{time_of_day}`: as above

---

End of templates. For motion versions of any of these stills, see
[../grok/VIDEO_TEMPLATES.md](../grok/VIDEO_TEMPLATES.md).
