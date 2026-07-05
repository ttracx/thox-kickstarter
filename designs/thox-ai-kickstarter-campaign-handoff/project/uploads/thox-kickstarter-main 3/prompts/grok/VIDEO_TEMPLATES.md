# xAI Grok video templates - per motion type

Each template below assumes [VIDEO_SYSTEM_PROMPT.md](VIDEO_SYSTEM_PROMPT.md)
is loaded as the system instruction. Copy the user-prompt template,
fill the `{slots}`, attach the source still (image-to-video mode), and
submit. Generate.

## 1. Orbit-around (default product hero motion)

**Use for**: launch-day post, device close-up reveal, MagStack ring
reveal on the back of a ThoxClip.

**Source image**: hero product shot from
[../openai/IMAGE_TEMPLATES.md](../openai/IMAGE_TEMPLATES.md) section 1.

**User prompt template**:

```
Image-to-video. Animate the attached source still with a smooth
orbit-around camera move.

Camera path: orbit {orbit_degrees} degrees around the device's
vertical center axis, traveling {orbit_direction} (viewed from above).
Constant angular velocity, no acceleration or deceleration.

Device: stays centered in frame throughout. Do not regenerate the
device, the background, or the brand typography from the source still.
Carry every pixel of the source still forward as much as physically
possible during the orbit.

Lighting: the emerald #10b981 rim light follows the device silhouette
as the camera moves; do not let the rim light stay fixed in screen
space. Cool-white key light and warm-amber fill remain in their
original world positions.

Surface activity: the device's emerald LED dot pulses gently at 1 Hz
(sinusoidal curve, not linear), peak brightness during the LED's
brightest moment matches the source still.

Duration: {duration_seconds} seconds. Frame rate: 30 fps. Aspect
ratio: {aspect_ratio}.

Loop: first and last frame match within 5 percent pixel difference.

No text overlays. No audio. No competing brand marks.
```

**Slot guide**:

- `{orbit_degrees}`: 15 (subtle) | 25 (default) | 30 (max for a 4-second
  clip; faster reads as wobbly)
- `{orbit_direction}`: counter-clockwise (default) | clockwise
- `{duration_seconds}`: 3 | 4 (default) | 5 | 6
- `{aspect_ratio}`: 1:1 | 9:16 | 16:9 | 4:5

## 2. Dolly-in (close-look reveal)

**Use for**: "look at this detail" posts, tactile-detail closeups,
press kit b-roll.

**Source image**: any of the IMAGE_TEMPLATES asset types.

**User prompt template**:

```
Image-to-video. Animate the attached source still with a smooth
dolly-in camera move.

Camera path: dolly forward along the optical axis by {dolly_percent}
percent of frame depth over the clip duration. Constant linear
velocity. No rotation.

Device: stays centered. Do not regenerate the device or background.
The slight perspective shift from the dolly should reveal more of the
{detail_to_reveal} as the camera approaches.

Lighting: cool-white key, warm fill, emerald #10b981 rim light all
remain in world position. Slight increase in rim light intensity (5
percent) as the camera approaches the device, simulating closer source
proximity.

Surface activity: {surface_activity}.

Duration: {duration_seconds} seconds. Frame rate: 30 fps. Aspect
ratio: {aspect_ratio}. Silent.

Loop: design first and last frames such that a reverse-loop is also
visually plausible (the dolly-out reverse should look natural).

No text overlays. No competing brand marks.
```

**Slot guide**:

- `{dolly_percent}`: 5 (subtle) | 8 (default) | 10 (close-look maximum)
- `{detail_to_reveal}`: "MagStack ring inscribed in the upper portion" |
  "USB-C port on the bottom edge" | "matte ASA surface micro-texture"
- `{surface_activity}`: "LED dot pulses gently at 1 Hz" | "MagStack ring
  glow at 0.5 Hz" | "none, device is fully static"
- `{duration_seconds}`, `{aspect_ratio}`: as above

## 3. Dolly-out (context reveal)

**Use for**: "see how it fits in your day" posts. Device starts small
and the camera pulls back to reveal a lifestyle environment.

**Source image**: lifestyle shot from IMAGE_TEMPLATES section 5.

**User prompt template**:

```
Image-to-video. Animate the attached source still with a smooth
dolly-out camera move.

Camera path: dolly backward along the optical axis by 15 percent of
frame depth over the clip duration. Constant linear velocity. No
rotation.

Subject: the {device_name} remains in its source-still position
relative to the world. As the camera retreats, more of the
{environment} comes into frame.

Lighting: the lifestyle scene's natural light source is preserved.
Emerald rim light on the device remains crisp regardless of the
camera retreat.

Surface activity: subtle LED pulse on the device at 1 Hz.

Duration: {duration_seconds} seconds. Frame rate: 30 fps. Aspect
ratio: {aspect_ratio}. Silent.

No text overlays.
```

**Slot guide**:

- `{device_name}`, `{environment}`, `{duration_seconds}`,
  `{aspect_ratio}`: as above.

## 4. Pan-across (MagStack cluster reveal)

**Use for**: revealing a MagStack stack of 4 to 8 ThoxClips, or
showing the device fleet (Clip + Mini + Air + Nova) side-by-side.

**Source image**: MagStack cluster shot from IMAGE_TEMPLATES section
6, or a custom multi-device hero.

**User prompt template**:

```
Image-to-video. Animate the attached source still with a smooth
horizontal pan-across move.

Camera path: pan horizontally {pan_direction} by 18 percent of frame
width over the clip duration. Constant linear velocity. No rotation,
no vertical drift.

Subjects: the {device_set} stays in its source-still position
relative to the world. The pan reveals devices at the edge of frame
that were partially visible (or just off-frame) in the source still.

Lighting: each device's rim light remains in its world position.
{magstack_glow_instruction}.

Surface activity: each device's LED dot pulses independently at 1 Hz,
phase-offset by 90 degrees per device to create a wave effect across
the cluster.

Duration: 5 seconds (longer than default to let the pan breathe).
Frame rate: 30 fps. Aspect ratio: {aspect_ratio} (prefer 16:9 for
clusters; 1:1 only if you must).

Loop: design the pan so the first frame and last frame are
visually-equivalent crops of the same source - the loop appears as a
continuous slow pan.

No text overlays.
```

**Slot guide**:

- `{pan_direction}`: left-to-right (default) | right-to-left
- `{device_set}`: "MagStack cluster of {n} ThoxClips" | "fleet of
  ThoxClip + ThoxMini + ThoxAir + ThoxNova"
- `{magstack_glow_instruction}`: "MagStack purple #a855f7 glow runs
  along each magnetic interface at 0.5 Hz" (use only when MagStack is
  the explicit subject; omit for general fleet shots)

## 5. Parallax tilt (atmospheric loop)

**Use for**: "Story" stickers, atmospheric Reels, holding shots before
a sponsorship CTA.

**Source image**: any IMAGE_TEMPLATES asset with foreground / background
separation.

**User prompt template**:

```
Image-to-video. Animate the attached source still with a parallax tilt
effect.

Camera move: simulate a 3 degree tilt around the horizontal axis.
The foreground (the {device_name}) shifts vertically by 2 percent of
frame height. The background shifts vertically by 4 percent of frame
height (twice the foreground shift, creating the parallax effect).

Subject: device remains the visual anchor.

Lighting: preserve all source lighting. Add a very subtle warm fog
midground that drifts upward at 0.5 percent of frame height per
second.

Surface activity: LED pulse at 1 Hz.

Duration: 5 seconds. Frame rate: 30 fps. Aspect ratio:
{aspect_ratio}. Silent.

Loop: first frame matches last frame exactly (tilt returns to its
starting position via a smooth sinusoidal curve).

No text overlays.
```

## 6. Surface-activity loop (camera locked)

**Use for**: ultra-tight close-ups where the device fills 80+ percent
of frame; profile-header video loops; "device is alive" hero loops.

**Source image**: hero product shot from IMAGE_TEMPLATES section 1, 2,
3, or 4.

**User prompt template**:

```
Image-to-video. Animate the attached source still with NO camera
movement. The camera is locked. All motion is surface-detail
animation on the device itself.

Surface activity (apply ALL of the following simultaneously):

1. LED dot pulse: emerald #10b981 LED on the {led_position} brightens
   to peak then dims, sinusoidal curve at 1 Hz. Peak brightness +30
   percent over source still baseline.

2. {ring_or_surface}: {ring_or_surface_detail}.

3. Subtle reflection drift: the rim light's reflection on the device's
   matte surface shifts horizontally by 1 percent of device width over
   the loop duration, as if a distant light source is moving slowly.

Duration: 4 seconds. Frame rate: 30 fps. Aspect ratio:
{aspect_ratio}. Silent.

Loop: first frame exactly equals last frame (the sinusoidal cycles
return to their starting phase).

No camera movement. No text overlays.
```

**Slot guide**:

- `{led_position}`: "lower right of the bottom strip" (ThoxClip) |
  "center of the front face" (ThoxMini / ThoxAir) | "lower right corner
  of the lid" (ThoxNova)
- `{ring_or_surface}`: "MagStack ring glow" (back view) | "Vented top
  highlight shift" (ThoxAir top view) | "Surface reflection drift only"
- `{ring_or_surface_detail}`: "thin emerald #10b981 glow runs along the
  inside edge of the MagStack ring at 0.5 Hz, completing one full
  revolution per clip" | "subtle warm highlight drifts across the vented
  top at 0.25 Hz" | (omitted if "Surface reflection drift only")

## 7. Text-to-video (no source still)

**Use for**: ad-hoc clips when an OpenAI still is not available.
Treat the opening frame as a brand-aligned image generation, then
apply motion from #1-#6.

**User prompt template**:

```
Text-to-video. Generate a 4-second clip aligned to the THOX.ai brand
visual identity.

Opening frame composition: {opening_frame_description}. (Treat this as
if it were a still prompt for the OpenAI image system at the same
aspect ratio. Apply all THOX brand rules: deep navy background,
emerald accent, no competitor marks, no em-dashes, no emojis.)

Motion: apply {motion_type} ({motion_template_reference}).

Aspect ratio: {aspect_ratio}. Silent.
```

**Slot guide**:

- `{opening_frame_description}`: 3-4 sentences describing the desired
  opening frame in the same style as the OpenAI image templates.
- `{motion_type}`: orbit-around | dolly-in | dolly-out | pan-across |
  parallax tilt | surface-activity loop
- `{motion_template_reference}`: cite the template above by number
  (e.g., "as specified in VIDEO_TEMPLATES.md section 1")
- `{aspect_ratio}`: as above

---

## Pipeline reminder

For end-to-end OpenAI image -> Grok video workflow, see
[../PIPELINE.md](../PIPELINE.md). The pipeline file shows the
hand-off shape, file naming conventions, and how to maintain visual
consistency across a multi-clip series.
