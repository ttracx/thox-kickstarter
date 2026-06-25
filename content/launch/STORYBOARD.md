# STORYBOARD.md

Frame-by-frame storyboard for the 90-second hero video in `content/launch/VIDEO_SCRIPT.md`. Thirty-two frames. ASCII representations only; the videographer redraws or shoots from these.

Each frame block carries: composition, focal point, color palette, motion, voiceover ticks underneath the frame.

Conventions:
- `[ ]` = frame edge
- `()` = subject
- `~~~` = soft-focus background
- `***` = practical light source
- Color palette uses the THOX brand: bg #0B1220, fg #F2F4F8, cyan accent #27E5FF, magenta accent #FF3DA8.

## CAD render reference frames (shipped 2026-06-25)

For frames that lean on assembled-device visuals (Frame 03, the cluster reveal, and any stretch-goal cutaways), the videographer should pull the CAD-derived renders from `thox-3dprint-kit/renders/` as composition reference until the practical photo shoot lands.

| Frame intent | Render reference path (in thox-3dprint-kit) |
|---|---|
| Frame 03 - 4-node cluster overhead | `renders/hero/hero_4-node-magstack.png` |
| Device family lineup beat | `renders/hero/hero_device-family.png` |
| Pocket-scale establishing | `renders/hero/hero_pocket-context.png` |
| Stretch-goal teaser tail | `renders/hero/hero_stretch-goals.png` |
| ThoxMini Air macro insert | `devices/thoxmini-air/renders/iso_lit.png` |
| Cluster dock detail B-roll | `devices/magstack-cluster-dock/renders/side_callout.png` |
| Exploded mechanical beat | `devices/<device>/renders/exploded.png` |

Full catalog: `thox-3dprint-kit/renders/INDEX.md`. Renders are 4K PNG, THOX brand palette baked in. If a frame contradicts the render, the script is adjusted, not the hardware.

---

## Frame 01 - Cold open, clip in hand (0:00 to 0:03)

```
[                                                  ]
[              ~~~ jacket fabric ~~~               ]
[                                                  ]
[          ( ThoxClip body, side view )            ]
[          \   <- right thumb on top               ]
[           \  <- index finger underneath          ]
[                                                  ]
[~~~ shallow DOF, jacket lapel out of focus ~~~    ]
[                                                  ]
```

Composition: rule-of-thirds, clip on right vertical line, hand entering from bottom-right.
Focal point: ThoxClip body, with the THOX wordmark legible.
Color palette: warm jacket fabric (charcoal), clip body (matte black), wordmark cyan.
Motion: static. Focus pulls from clip body to wordmark over 3 seconds.
VO tick: none yet (silence into beat).

---

## Frame 02 - Magnetic snap (0:03 to 0:05)

```
[                                                  ]
[       ( ThoxClip, jaw closing )                  ]
[              ||  ||                              ]
[          === SNAP === <- visualize the catch     ]
[       (    jacket lapel    )                     ]
[                                                  ]
[                                                  ]
```

Composition: tight macro, clip jaw is upper-center.
Focal point: the meeting line of the magnetic catch.
Color palette: matte black against deep charcoal jacket fabric.
Motion: 0.5 second close, real Foley snap sync.
VO tick: "AI that runs on you."

---

## Frame 03 - Cut to dock, overhead (0:05 to 0:10)

```
[                                                  ]
[   ___    ___    ___    ___                       ]
[  |   |  |   |  |   |  |   |  <- 4 ThoxAir        ]
[  |___|  |___|  |___|  |___|                      ]
[       MagStack Cluster Dock                      ]
[                                                  ]
[       (   walnut desk grain   )                  ]
[                                                  ]
```

Composition: top-down, dock centered, four ThoxAir units in a row.
Focal point: the dock base; LEDs visible.
Color palette: walnut warm brown, matte black devices, cyan LED bars.
Motion: 10 cm dolly-out over 3 seconds, revealing the desk margin.
VO tick: "Not on someone else's servers."

---

## Frame 04 - Chat input, sensitive question (0:10 to 0:14)

```
[                                                  ]
[   +----------------------------------+           ]
[   |  Ask anything...           [send]|           ]
[   +----------------------------------+           ]
[       cursor blink                               ]
[                                                  ]
[   (status: sending to cloud)                     ]
[                                                  ]
```

Composition: laptop screen fills 80% of frame.
Focal point: cursor in input field.
Color palette: cool blue UI, white background, gray status text.
Motion: cursor blinks once; status text appears.
VO tick: "What if your private moments stayed private?"

---

## Frame 05 - Over-shoulder, hesitation (0:14 to 0:17)

```
[                                                  ]
[   ~~~ shoulder ~~~                               ]
[                                                  ]
[       +--------------------+                     ]
[       |                    |                     ]
[       |   (laptop screen)  |                     ]
[       |                    |                     ]
[       +--------------------+                     ]
[                                                  ]
[          ( hands hovering, not typing )          ]
```

Composition: over-the-shoulder, laptop in lower-right third.
Focal point: hands hovering above keyboard.
Color palette: low-key, cool 5600K.
Motion: hands move toward keyboard then pull back.
VO tick: continues...

---

## Frame 06 - Server room ambient (0:17 to 0:21)

```
[                                                  ]
[ ||||  ||||  ||||  ||||  ||||  ||||  ||||  ||||   ]
[ ||||  ||||  ||||  ||||  ||||  ||||  ||||  ||||   ]
[ ||||  ||||  ||||  ||||  ||||  ||||  ||||  ||||   ]
[      glow      glow      glow                    ]
[ ___________________________________              ]
[      (rack floor, vanishing point)               ]
[                                                  ]
```

Composition: one-point perspective down a server aisle.
Focal point: vanishing point.
Color palette: cool 4000K rack lights, deep shadows.
Motion: slow dolly-in over 4 seconds.
VO tick: "What if your AI never left your hands?"

Note: this is the only AI-generated frame in Beat 2.

---

## Frame 07 - Laptop close, decision (0:21 to 0:25)

```
[                                                  ]
[       +--------------------+                     ]
[       |  closing...        |                     ]
[       |                    |                     ]
[       +-------||-----------+                     ]
[                                                  ]
[ lower-third text:                                ]
[   Your data. Your hardware.                      ]
[                                                  ]
```

Composition: same frame as 04, the laptop now half-closed.
Focal point: the closing hinge.
Color palette: cool, fading to neutral.
Motion: laptop closes over 2 seconds; lower-third text fades in at 0:22.
VO tick: end of Beat 2.

---

## Frame 08 - ThoxClip turntable (0:25 to 0:31)

```
[                                                  ]
[                                                  ]
[           (   ThoxClip   )                       ]
[              | LED pulse |                       ]
[           ___________________                    ]
[          (   turntable rim   )                   ]
[                                                  ]
[      [black velvet background]                   ]
[                                                  ]
```

Composition: subject centered; turntable rim visible at bottom.
Focal point: LED pulse on clip body.
Color palette: matte black + cyan LED accent.
Motion: 6-second slow rotation; clip jaw opens once at 0:28; LED pulses three times.
VO tick: "ThoxClip. From thirty-nine dollars. Clip on. Private AI for your day."

---

## Frame 09 - ThoxClip lower-third (0:30 overlay only)

```
[                                                  ]
[                                                  ]
[           (   ThoxClip   )                       ]
[                                                  ]
[   +-------------------------------+              ]
[   |  ThoxClip          from $39   |              ]
[   |  ===                          | <- cyan bar  ]
[   +-------------------------------+              ]
[                                                  ]
```

Composition: lower-third in the lower 25% of frame.
Focal point: price.
Color palette: text #F2F4F8, accent bar #27E5FF.
Motion: text fades in over 0.3 seconds; cyan bar wipes left-to-right.
VO tick: same line continues.

---

## Frame 10 - ThoxMini at desk (0:31 to 0:37)

```
[                                                  ]
[  +---------------+      +---------------+        ]
[  |               |      |               |        ]
[  | (laptop lid)  |      |  (monitor)    |        ]
[  |               |      |   loading...  |        ]
[  +---------------+      +---------------+        ]
[                                                  ]
[           ( ThoxMini between )                   ]
[                                                  ]
```

Composition: laptop left, monitor right, ThoxMini centered between them.
Focal point: ThoxMini; monitor slightly soft.
Color palette: warm desk wood + cool monitor glow.
Motion: locked-off; monitor transitions from "loading" to first token visible.
VO tick: "ThoxMini. Sixty-nine dollars. Desktop edge AI compute."

---

## Frame 11 - ThoxMini lower-third (0:35 overlay)

```
[                                                  ]
[           ( ThoxMini in place )                  ]
[                                                  ]
[   +-------------------------------+              ]
[   |  ThoxMini             $69     |              ]
[   |  ===                          |              ]
[   +-------------------------------+              ]
[                                                  ]
```

Composition: lower-third only.
Focal point: price.
Color palette: same as Frame 09.
Motion: same wipe.
VO tick: same line.

---

## Frame 12 - ThoxAir stacking (0:37 to 0:43)

```
[                                                  ]
[       ___                                        ]
[      |   |   <- 4th unit entering from above     ]
[      |___|                                       ]
[       ___                                        ]
[      |___|   <- 3 stacked                        ]
[      |___|                                       ]
[      |___|                                       ]
[   ============= MagStack dock base               ]
```

Composition: vertical stack centered; the 4th unit drops in from upper-right.
Focal point: the meeting line where the 4th unit clicks.
Color palette: matte black devices, cyan LED cascade, low cyan accent bar in the background.
Motion: 4-second click motion; LED cascade follows over 1.5 seconds.
VO tick: "ThoxAir. Seventy-nine dollars. MagStack cluster for multi-agent workflows."

---

## Frame 13 - ThoxAir lower-third (0:41 overlay)

```
[                                                  ]
[      [stacked cluster, lit cyan]                 ]
[                                                  ]
[   +-------------------------------+              ]
[   |  ThoxAir              $79     |              ]
[   |  ===                          |              ]
[   +-------------------------------+              ]
```

Composition: lower-third only.
Focal point: price.
Color palette: same.
Motion: same wipe.
VO tick: same line.

---

## Frame 14 - ThoxNova reveal (0:43 to 0:50)

```
[                                                  ]
[        +----------------------------+            ]
[        |    (monitor dashboard)     |            ]
[        |    chat streaming...       |            ]
[        +----------------------------+            ]
[                                                  ]
[             ( ThoxNova on desk )                 ]
[       ============ keyboard tray ============    ]
[                                                  ]
```

Composition: monitor upper-third, ThoxNova lower-third, keyboard tray pulling out frame.
Focal point: ThoxNova device.
Color palette: warm wood, matte aluminum case, cool monitor.
Motion: 7-second truck-right; tray pulls out at 0:45.
VO tick: "ThoxNova. Four hundred ninety-nine dollars. Flagship workstation private AI."

---

## Frame 15 - ThoxNova lower-third (0:48 overlay)

```
[                                                  ]
[      [ThoxNova + dashboard]                      ]
[                                                  ]
[   +-------------------------------+              ]
[   |  ThoxNova            $499     |              ]
[   |  ===                          |              ]
[   +-------------------------------+              ]
```

Composition: lower-third.
Focal point: price.
Color palette: same.
Motion: same wipe.
VO tick: same line.

---

## Frame 16 - Vision split, top-left Mac CLI (0:50 to 0:54)

```
[                                                  ]
[ +-------------------+  +-------------------+     ]
[ | $ thoxcore router |  |  (iPhone screen)  |     ]
[ |  [ok] adapter=mlx |  |  [thox-terminal]  |     ]
[ +-------------------+  +-------------------+     ]
[ +-------------------+  +-------------------+     ]
[ | [dock w/ stack]   |  | (hand to pocket)  |     ]
[ +-------------------+  +-------------------+     ]
[                                                  ]
```

Composition: 2x2 grid covering the frame.
Focal point: top-left (Mac CLI showing thoxcore router output).
Color palette: each pane in its own native palette; the 4 panes share a 4px black gutter.
Motion: each pane plays a 4-second loop in sync.
VO tick: "One platform."

---

## Frame 17 - Vision split, top-right iPhone (0:54 to 0:58)

```
Same as Frame 16; cut focus to the top-right pane.
The iPhone shows the thox-terminal SwiftUI dashboard
with three agents listed and one streaming.
```

VO tick: "Seven backends."

---

## Frame 18 - Vision split, bottom-left dock (0:58 to 1:02)

```
Same grid; focus to bottom-left.
The MagStack Cluster Dock plays a fresh angle of
the click sequence from Frame 12.
```

VO tick: "Your data."

---

## Frame 19 - Vision split, bottom-right pocket (1:02 to 1:05)

```
Same grid; focus to bottom-right.
The hand places a ThoxClip into a jacket pocket;
the clip LED gives one last cyan pulse before going dark.
```

VO tick: "Your hardware."

---

## Frame 20 - Converge to hero (1:05 to 1:10)

```
[                                                  ]
[   ( ThoxClip ) ( ThoxMini ) ( ThoxAir ) ( Nova ) ]
[                                                  ]
[       ===== walnut desk =====                    ]
[                                                  ]
[      lower-third text:                           ]
[      "THOXCore router. 7 backends.               ]
[       Yours."                                    ]
[                                                  ]
```

Composition: the four panes converge into one wide hero composition; four devices in a row on a single desk.
Focal point: the gap between ThoxAir and ThoxNova (the eye lands there naturally).
Color palette: warm wood + matte devices; brand cyan accents in the lower-third only.
Motion: 5-second AE converge.
VO tick: "Your rules."

---

## Frame 21 - Seven-adapter caption (1:06 overlay, holds 3s)

```
[                                                  ]
[      [hero shot continues underneath]            ]
[                                                  ]
[   THOXCore router                                ]
[   LiteRT + OpenAI + Ollama + llama.cpp +         ]
[   vLLM + TensorRT + MLX                          ]
[                                                  ]
```

Composition: bottom-third caption, two lines.
Focal point: the adapter list.
Color palette: text #F2F4F8 on darkened lower-third gradient.
Motion: fade in 0.5 seconds; hold 3 seconds.
VO tick: continues to end of Beat 4.

---

## Frame 22 - Founder bite, two-shot wide (1:10 to 1:15)

```
[                                                  ]
[                                                  ]
[     (   Tommy   )    (   Craig   )               ]
[      shoulder-width apart                        ]
[                                                  ]
[      ==== matte black THOX wall ====             ]
[      (wordmark in cyan, large, behind)           ]
[                                                  ]
```

Composition: 50mm at eye height; founders centered with shoulder-width gap; wordmark behind, large.
Focal point: faces at thirds.
Color palette: matte black wall, cyan wordmark, founders in dark crewneck.
Motion: locked off; one of the two delivers the line, the other holds the beat.
VO tick: "We built this..."

---

## Frame 23 - Founder bite, identical shot (1:15 to 1:22)

```
Same as Frame 22; continues the same take.
At 1:18 the lower-third fades in:

   Tommy Xaypanya and Craig Ross
   Founders   THOX.ai
```

Composition: same.
Motion: text fades in over 0.4 seconds.
VO tick: "...because we needed it."

---

## Frame 24 - Black frame, mark fade-in (1:22 to 1:25)

```
[                                                  ]
[                                                  ]
[                                                  ]
[                   THOX                           ]
[                                                  ]
[                                                  ]
[                                                  ]
[                                                  ]
```

Composition: wordmark dead center; 60% of frame height.
Focal point: the mark.
Color palette: #F2F4F8 mark on #0B1220 background.
Motion: 2-second fade-in.
VO tick: silence; ambient pad resolves.

---

## Frame 25 - Subline (1:25 to 1:30)

```
[                                                  ]
[                                                  ]
[                   THOX                           ]
[                                                  ]
[       Back the Kickstarter                       ]
[       thox.ai/kickstarter                        ]
[       August 12, 2026                            ]
[                                                  ]
```

Composition: subline centered below the wordmark.
Focal point: the URL.
Color palette: same.
Motion: text appears line by line over 1 second.
VO tick: "Back the August twelfth Kickstarter at thox dot ai slash kickstarter."

---

## Frame 26 - Hold on URL (1:28 to 1:30)

```
[                                                  ]
[                   THOX                           ]
[       Back the Kickstarter                       ]
[       thox.ai/kickstarter                        ]
[       August 12, 2026                            ]
[                                                  ]
```

Composition: same as 25.
Motion: hold; ambient tone fades out over the last second.

---

## Alternate frames (cut-down 30s social)

If we need a 30-second cut for TikTok or Reels, use frames 01, 02, 03, then jump to 08, 12, 14 (each compressed to 3 seconds), then 20, 25.

| 30s frame | Source | Window |
|---|---|---|
| A | 01 | 0:00 to 0:02 |
| B | 03 | 0:02 to 0:05 |
| C | 08 | 0:05 to 0:08 |
| D | 12 | 0:08 to 0:11 |
| E | 14 | 0:11 to 0:14 |
| F | 20 | 0:14 to 0:22 |
| G | 25 | 0:22 to 0:30 |

VO for 30s cut: "AI that runs on you. ThoxClip. ThoxMini. ThoxAir. ThoxNova. One platform. Your hardware. Back the Kickstarter, August twelfth."

---

## Asset and continuity notes

- The MagStack Cluster Dock has shipped (`thox-3dprint-kit` PR #3). All dock shots are practical.
- ThoxMini Air v4 enclosure has shipped today (`thox-3dprint-kit` PR #4). Either ThoxMini Air or ThoxAir may be used for the cluster frames; lock the choice before pre-production.
- The ThoxCore router CLI shown in Frame 16 must use real `thoxcore` v0.3 output; do not mock it (see `project_thoxcore_integration_phase` memory).
- The dashboard in Frame 14 should run a deterministic chat replay so re-shoots are possible.
- Frame 06 is the only AI-generated frame; all others are practical.
- Founder portraits do not exist in the press kit yet - see `content/launch/PRESS_KIT.md` placeholder bios; founders should sit for portraits in the same session as the founder bite.

---

## Handoff

Videographer receives this storyboard plus `VIDEO_SCRIPT.md` and the existing `docs/VIDEO_PRODUCTION.md` production logistics file. Founders review Frames 22 and 23 (the on-camera line) before pre-production lockdown.
