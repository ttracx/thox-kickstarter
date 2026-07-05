# VIDEO_SCRIPT.md

90-second hero video for the THOX.ai Kickstarter, launching August 12, 2026.

This is the campaign's social-cut companion to the 2:30 master in `docs/VIDEO_PRODUCTION.md` and `deliverables/THOX_Video_Script.docx`. The 90-second cut is the version we push on YouTube Shorts, TikTok, Instagram Reels, and as the autoplay loop on the Kickstarter Story page.

Total runtime: 1:30. Five beats. Master encode 1080p H.264 + AAC, master loudness -14 LUFS.

---

## Beat 1 - Opening (0:00 to 0:10)

Ten seconds. Hands. Hardware. Hook.

| Element | Spec |
|---|---|
| Subject | Right hand holds a ThoxClip between thumb and index finger; left hand brings up a jacket lapel; clip snaps closed with a real magnetic catch. Cut to a wide overhead of the MagStack Cluster Dock on a walnut desk, four ThoxAir units already seated. |
| Camera | Shot A: 85mm macro, f/2.8, 1/120 shutter, focus on the clip body, jacket fabric soft. Shot B: top-down 35mm at 90 degrees, dolly-out 10cm over 2 seconds. |
| Lighting | Shot A: single key from camera-left, soft 60cm octobox, 4200K. Shot B: ambient daylight through a north window plus a low-power 6500K bar for fill on the dock. |
| Sound design | Cloth rustle (mic close to lapel), magnetic snap (real Foley), one shallow breath, a low ambient pad fading in at 0:06. |
| Voiceover | "AI that runs on you. Not on someone else's servers." |
| Graphics overlay | None. The hardware speaks. |
| B-roll required | Six 5-second takes of the clip-on motion; three takes of the dock from different angles. |
| Render time estimate | Practical, no AI. Edit pass 30 minutes. |

---

## Beat 2 - Problem (0:10 to 0:25)

Fifteen seconds. The cloud-AI privacy story. No competitor names. No brand logos.

| Element | Spec |
|---|---|
| Subject | Rapid-cut montage. Frame 1: a generic chat input field on a laptop, cursor blinking, then a "Sending to cloud" status indicator. Frame 2: an over-the-shoulder shot of a person hesitating before typing a sensitive question. Frame 3: a server room interior, racks glowing, lensed wide. Frame 4: same chat input, the user closes the laptop. |
| Camera | Mixed. Frame 1: locked-off macro on the screen. Frame 2: 50mm at shoulder height, shallow DOF. Frame 3: 24mm wide, slow dolly-in. Frame 4: same as frame 1, push-in. Total: four cuts over 15 seconds, average 3.75 seconds per shot. |
| Lighting | Cool 5600K throughout, low-key. Server room is the only practical light; everything else is one soft key plus negative fill. |
| Sound design | A single sustained low drone under the whole beat. The keystrokes are mic-close and dry. A soft click as the laptop closes. |
| Voiceover | "What if your private moments stayed private? What if your AI never left your hands?" |
| Graphics overlay | At 0:22, fade in lower-third in IBM Plex Sans: "Your data. Your hardware." |
| B-roll required | Frame 3 (server room) is the only AI-generated shot in this beat. Use the OpenAI image template `prompts/openai/IMAGE_TEMPLATES.md` row "server room ambient" then upres in Topaz. Frames 1, 2, 4 are practical. |
| Render time estimate | Practical edits 1 hour. Frame 3 generation 15 minutes, upres 10 minutes, comp 20 minutes. |

---

## Beat 3 - Solution (0:25 to 0:50)

Twenty-five seconds. Four devices, roughly four seconds each, with breathing room.

### 3a - ThoxClip (0:25 to 0:31)

| Element | Spec |
|---|---|
| Subject | ThoxClip rotates slowly on a turntable; the clip side opens once mid-rotation; the indicator LED pulses cyan. |
| Camera | 100mm macro, f/4, on a slider; one continuous take, 6 seconds. |
| Lighting | Two-light: key at 5200K from upper-left, rim at 4200K from upper-right. Black velvet background. |
| Sound design | Subtle whir of the turntable, then silence with a single soft tone on the LED pulse. |
| Voiceover | "ThoxClip. From thirty-nine dollars. Clip on. Private AI for your day." |
| Graphics overlay | Lower-third: `ThoxClip   from $39` set in IBM Plex Sans Medium, accent bar in THOX cyan #27E5FF. |
| B-roll required | Three takes; two angles. |

### 3b - ThoxMini (0:31 to 0:37)

| Element | Spec |
|---|---|
| Subject | ThoxMini sits between a laptop and an external monitor. The screen shows a model loading and then a first token streaming. |
| Camera | 50mm at desk height, shallow DOF on the device, monitor visible but soft. Six seconds, locked off. |
| Lighting | Practical desk light plus a low ambient fill. |
| Sound design | Soft fan, single keyboard tap, then silence as the token appears. |
| Voiceover | "ThoxMini. Sixty-nine dollars. Desktop edge AI compute." |
| Graphics overlay | `ThoxMini   $69` lower-third, cyan accent. |
| B-roll required | Three takes of the model load; capture the actual first-token moment, do not fake it. |

### 3c - ThoxAir (0:37 to 0:43)

| Element | Spec |
|---|---|
| Subject | Hands stack three ThoxAir units onto the MagStack Cluster Dock; the fourth comes from off-screen and clicks into place. Indicator lights cascade on across all four. |
| Camera | 35mm front-on, slight low angle. Six seconds. |
| Lighting | Same key as the opening; add a low cyan accent bar behind the stack for separation. |
| Sound design | Four magnetic clicks at uneven intervals, then a soft choral pad as the lights cascade. |
| Voiceover | "ThoxAir. Seventy-nine dollars. MagStack cluster for multi-agent workflows." |
| Graphics overlay | `ThoxAir   $79` lower-third, cyan accent. |
| B-roll required | Four takes of the stack motion; the dock has shipped (`thox-3dprint-kit` PR #3, MagStack Cluster Dock print pack). |

### 3d - ThoxNova (0:43 to 0:50)

| Element | Spec |
|---|---|
| Subject | ThoxNova on a walnut desk next to a 27-inch monitor; the monitor shows a real ThoxCore router dashboard streaming a multi-step agent task. Hands pull back a keyboard tray to reveal the device. |
| Camera | 35mm wide, slow truck-right over 7 seconds. |
| Lighting | Same dock lighting plus a 6500K monitor practical. |
| Sound design | Soft fan; the dashboard's chat bubble click is mic-close. |
| Voiceover | "ThoxNova. Four hundred ninety-nine dollars. Flagship workstation private AI." |
| Graphics overlay | `ThoxNova   $499` lower-third, cyan accent. |
| B-roll required | Two takes; the dashboard playback must be deterministic so we can re-shoot. |

---

## Beat 4 - Vision (0:50 to 1:10)

Twenty seconds. The platform story. One platform, seven backends, the operator's hands moving across devices.

| Element | Spec |
|---|---|
| Subject | A four-up split-screen condenses to a single composition: top-left a Mac running the ThoxCore router CLI; top-right an iPhone showing a thox-terminal SwiftUI dashboard; bottom-left the MagStack Cluster Dock; bottom-right a hand placing a ThoxClip into a jacket pocket. At 1:00 the four panes converge into one wide hero shot of all four devices on a single desk. |
| Camera | Mixed practical. The four panes are individual takes; the converge is an After Effects move. |
| Lighting | Match the dock lighting from Beat 1 so the converge feels seamless. |
| Sound design | The ambient pad from Beat 1 returns. Add a soft cyan-tinted swell as the panes converge. |
| Voiceover | "One platform. Seven backends. Your data. Your hardware. Your rules." |
| Graphics overlay | At 1:06 fade in a single line in IBM Plex Sans Medium: "THOXCore router. LiteRT plus OpenAI plus Ollama plus llama.cpp plus vLLM plus TensorRT plus MLX." Hold 3 seconds. |
| B-roll required | Four panes plus the converge. The seven-adapter line is real (see `project_thoxcore_7_adapter_complete` memory). |
| Render time estimate | Practical capture 1 hour. AE converge 2 hours. |

---

## Beat 5 - Founder bite plus call to action (1:10 to 1:30)

Twenty seconds. Twelve seconds of founder. Eight seconds of CTA.

### 5a - Founder bite (1:10 to 1:22)

| Element | Spec |
|---|---|
| Subject | Tommy Xaypanya and Craig Ross, mid-shot, standing side by side in front of a matte black THOX wordmark wall. Both in dark crewneck. No props in hand. |
| Camera | 50mm at eye height; locked off. One continuous take, 12 seconds. |
| Lighting | Soft 4200K key from camera-left, fill from a bounce board on camera-right, rim from a 6500K hair light. |
| Sound design | Room tone only. No music under the founder line. |
| Voiceover (on camera) | "We built this because we needed it." (One of the two founders delivers the line; the other holds the beat. Cast in pre-production.) |
| Graphics overlay | Lower-third at 1:13 fades in: "Tommy Xaypanya and Craig Ross   Founders   THOX.ai" |
| B-roll required | Three takes. |
| Notes | Founders should review and revise this line before the shoot. |

### 5b - Call to action (1:22 to 1:30)

| Element | Spec |
|---|---|
| Subject | Black frame; the THOX wordmark fades in over 2 seconds; then a single line of text appears below the mark. |
| Camera | n/a - built in After Effects. |
| Lighting | n/a. |
| Sound design | The ambient pad resolves to a single sustained cyan-colored tone. |
| Voiceover | "Back the August twelfth Kickstarter at thox dot ai slash kickstarter." |
| Graphics overlay | Wordmark in #F2F4F8 on #0B1220 background. Subline in IBM Plex Sans Medium: "Back the Kickstarter   thox.ai/kickstarter   August 12, 2026" |
| B-roll required | None. |
| Render time estimate | AE comp 30 minutes. |

---

## Master timing summary

| Beat | Window | Runtime | Voiceover word count |
|---|---|---|---|
| 1 Opening | 0:00 to 0:10 | 10s | 11 |
| 2 Problem | 0:10 to 0:25 | 15s | 17 |
| 3 Solution | 0:25 to 0:50 | 25s | 36 |
| 4 Vision | 0:50 to 1:10 | 20s | 11 |
| 5 Founder plus CTA | 1:10 to 1:30 | 20s | 19 |
| **Total** | **0:00 to 1:30** | **90s** | **94** |

94 words across 90 seconds is roughly 63 words per minute. That is slower than conversational pace by design. Leaves room for breath and for the hardware shots to land.

---

## Asset pointers

- Storyboard frames: `content/launch/STORYBOARD.md`
- 2:30 master script (different cut, longer): `deliverables/THOX_Video_Script.docx`
- Production logistics, schedule, sound design: `docs/VIDEO_PRODUCTION.md`
- AI image and video prompt library: `prompts/openai/` and `prompts/grok/`
- Hero family-shot reference: `assets/README.md` (asset paths once renders complete)
- MagStack Cluster Dock STL plus print plates: `ttracx/thox-3dprint-kit` PR #3
- ThoxMini Air v4 enclosure for B-roll: `ttracx/thox-3dprint-kit` PR #4

---

## Review gates before pre-production

1. Founders sign off on the on-camera line at 1:10.
2. Voiceover script reviewed by both founders.
3. ThoxNova dashboard playback frozen so 0:43 to 0:50 is deterministic.
4. MagStack Cluster Dock printed, assembled, and photographed; if it does not match the renders, the script is adjusted, not the hardware.

Owner: Tommy. Sign-off required from Craig before videographer takes the script into pre-production.
