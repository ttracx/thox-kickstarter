# UNBOXING_SCRIPTS

Per-device unboxing and intro scripts (30 to 60 seconds each) for the THOX.ai
Kickstarter launch on August 12, 2026. These are the social-cut companions to
the 90-second hero in `content/launch/VIDEO_SCRIPT.md` and the 30-second alt
cut covered by `content/launch/STORYBOARD.md`.

Six SKUs, one script per file. Each script is a self-contained shooting
document the videographer can take into production without back-and-forth.

## Files in this directory

| File | SKU | Target length | Channel mix |
|---|---|---|---|
| `00_master_voice_guide.md` | All | Reference | n/a |
| `01_thoxclip.md` | ThoxClip | 30 s | IG Reels, TikTok, X |
| `02_thoxmini.md` | ThoxMini | 45 s | IG Reels, TikTok, LinkedIn, X |
| `03_thoxmini_air.md` | ThoxMini Air | 45 s | IG Reels, TikTok, LinkedIn, X |
| `04_thoxnova.md` | ThoxNova | 60 s | IG Reels, TikTok, LinkedIn, YouTube Shorts |
| `05_magstack_cluster_dock.md` | MagStack Cluster Dock | 45 s | IG Reels, TikTok, LinkedIn, X |
| `06_thoxkey.md` | THOXKey | 30 s | IG Reels, TikTok, X |
| `POST_LAUNCH_CADENCE.md` | All | Reference | Calendar T-28 to T+30 |

## How to use these scripts

1. Read `00_master_voice_guide.md` first. It pins tone, pacing, founder split,
   dos and don'ts, and the outro convention. Every script in this directory
   assumes the videographer has internalized that guide.
2. Pick the script for the device you are shooting today.
3. Follow the "Pre-production checklist" below before the camera is set up.
4. Shoot every beat in the order written, then every shot in the shot list.
   The shot list is a superset of the beats so you have B-roll for the cut.
5. Run the "Post-production checklist" before any cut goes to founder review.
6. Send the cut to Craig Ross (hardware narratives) and Tommy Xaypanya
   (software and AI narratives) for sign-off before the post goes live.
7. Follow `POST_LAUNCH_CADENCE.md` for the posting date and channel mix.

## Pre-production checklist

- [ ] Confirm the render dependencies listed in the script are present at the
      paths called out (most live under `ttracx/thox-3dprint-kit/renders/`).
- [ ] Confirm the B-roll listed is either already in the library or can be
      shot the same day. If B-roll has to be staged from a different location
      (Q2 print farm, brand wall, etc.), schedule that ahead of the shoot.
- [ ] Confirm the music bed (driving electronic, 90 to 120 BPM, no vocals)
      is licensed for the channels the cut will post on. Use the THOX music
      library, not stock platforms that block on commercial use.
- [ ] Confirm the device on camera is the latest assembled unit, not a
      previous-revision prototype. Verify the THOX deboss orientation, the
      USB-C port location, and the LED color on first boot.
- [ ] Confirm wardrobe: dark walnut desk, brand-cyan accent light, plain
      background. Founders in plain dark tops, no patterns, no competitor
      logos.

## Post-production checklist

- [ ] Color grade to the THOX brand palette: bg `#0B1220`, fg `#F2F4F8`,
      cyan accent `#27E5FF`, magenta accent `#FF3DA8`. Cyan rim light is the
      only saturated color in the frame unless the script calls for magenta.
- [ ] Generate a subtitle `.srt` file matching the voiceover word-for-word.
      Burn-in optional; the file is required for accessibility.
- [ ] Write alt-text for the still thumbnail (one sentence, factual, no
      marketing language) and include it in the social post draft.
- [ ] Loudness master: -14 LUFS, true-peak -1 dBTP. Mono-fold check for
      phone-speaker playback.
- [ ] Encode 1080p H.264 + AAC for IG / TikTok / X; 1080p H.264 + AAC at a
      higher bitrate for LinkedIn and YouTube Shorts.
- [ ] Filename convention: `thox_unboxing_<sku>_<length>s_<YYYYMMDD>.mp4`.

## Quality gate

No cut goes live without founder review. The review path is:

1. Videographer drops the cut + subtitle file in the THOX shared drive under
   `launch/unboxing/<sku>/<YYYYMMDD>/`.
2. Slack `#launch-video` with the link, the script file it was cut from, and
   any deviations from the script.
3. Craig signs off on hardware framing and physical accuracy. Tommy signs off
   on software claims, AI claims, and any on-screen UI.
4. Both founders confirm the outro CTA matches `00_master_voice_guide.md`
   ("Back us" or "back us on Kickstarter"; never "support us").
5. After both sign-offs, the social manager schedules the post per
   `POST_LAUNCH_CADENCE.md`.

## Compliance reminders

- No medical, financial, or safety claims.
- No competitor names visible in frame or in voiceover.
- Every dated or numeric claim ("August twelve", "$79", "eight seconds to
  boot") must be verifiable against the published Kickstarter page or
  shipping firmware. If a claim is not yet verifiable, cut it.
- No emojis, no exclamation marks, no em-dashes in subtitles or captions.

## Apache-2.0

All scripts in this directory are Apache-2.0 licensed under the
`ttracx/thox-kickstarter` repository LICENSE. Videographers may adapt the
scripts for any post-launch derivative cuts without further permission.
