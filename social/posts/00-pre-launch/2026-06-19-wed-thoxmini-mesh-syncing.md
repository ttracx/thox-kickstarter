# Pre-launch W6 Wed - ThoxMini / mesh syncing deep-dive (cycle restart)

## Identity

- **Post ID**: `2026-06-19-wed-thoxmini-mesh-syncing`
- **Phase**: pre-launch (T-54)
- **Platforms**: x, instagram, tiktok, linkedin
- **Date / time (PT)**: 2026-06-19 10:00
- **Authored by**: Phamy
- **Status**: ready-to-schedule

## Intent

Email signup + show the mesh story. Multiple ThoxMinis sync over
the local network so your AI follows you between devices. This is
the "I want 3 of these" hook.

## Hero

3 ThoxMinis arranged in a triangle on a desk, each with a faint
emerald pulse synchronized via mesh.

## Asset spec

| Platform | Aspect | Asset |
|---|---|---|
| x | 1:1 | hero shot + 5-tweet thread |
| instagram | 4:5 carousel (5 slides) | hero + mesh diagram + sync flow + 3-pack bundle + CTA |
| instagram | 9:16 Reel | surface-activity loop with synchronized LED pulses across 3 devices |
| tiktok | 9:16 | same Reel |
| linkedin | 4:5 + technical post | hero + mesh protocol breakdown |

## Filled OpenAI prompt (1:1 mesh triangle hero)

```
Studio product shot of 3 ThoxMini USB sticks arranged in an
equilateral triangle on a dark navy seamless surface, each device
flat (lying on its long edge) with the LED-bearing front face
visible. The triangle is photographed from a 60-degree elevated
angle so all 3 devices are clearly visible.

Background: deep navy #0a0e14 seamless studio sweep.

Lighting: cool-white key from upper-front, warm-amber fill, emerald
#10b981 rim light tracing each device's silhouette. Mirror-finish
surface with 30 percent opacity reflections fading to black.

Detail: each ThoxMini has its emerald LED dot glowing on the center
of the front face. A faint emerald light trail traces the triangle
edges between devices, suggesting the mesh sync handshake.

Composition: triangle centered, occupies 60 percent of frame.
Square 1:1, 1080 x 1080 px.

No text overlays. No people. No competing brand marks.
```

## Filled Grok prompt (9:16 surface-activity 4 s)

```
Use VIDEO_TEMPLATES.md section #6 (surface-activity loop). Slots:
{led_position} = center of the front face (all 3 devices)
{ring_or_surface} = mesh sync trace
{ring_or_surface_detail} = a thin emerald light trace runs along
  the triangle edges between the 3 ThoxMinis at 0.5 Hz, suggesting
  data sync handshake
{aspect_ratio} = 9:16

The 3 LEDs pulse in synchronized phase (NOT phase-offset like
MagStack); the mesh sync trace pulses 0.5 Hz between the devices.
```

## Caption: X (5-tweet thread)

```
1/ A single ThoxMini is useful. Three ThoxMinis on the local mesh
are magic. 🟢

Here's why. /1

2/ Each ThoxMini broadcasts its presence over the local network via
the THOX mesh protocol. Other ThoxMinis on the same Wi-Fi see it,
authenticate via the persona binding, and join a shared inference
pool. /2

3/ Drop one in your kitchen. Drop one in your office. Drop one in
your bedroom. Same conversation, same memory, follows you between
rooms. /3

4/ The mesh is local-only. Your AI does not need the internet to
sync between ThoxMinis. WiFi or Ethernet on the local subnet, full
stop. /4

5/ The 3-pack at $189 is the early-bird price. $63/device. Drop one
in every workspace, your AI follows you wherever your hardware goes.

📍 thox.ai/launch
🟢
```

## Caption: Instagram

```
A single ThoxMini is useful. Three on the local mesh are magic. 🟢

The THOX mesh protocol broadcasts each device's presence over the
local network. Other THOX devices on the same Wi-Fi see it,
authenticate via the persona binding, and join a shared inference
pool.

Drop one in every room. Same conversation, same memory, follows you
wherever your hardware goes. Local-only sync; no internet required.

3-pack at $189 early-bird. $63 per ThoxMini.

🔗 thox.ai/launch
.
.
#thoxai #thoxmini #mesh #localai #localfirst #raspberrypi
#kickstarter #engineering #yourAI #sync
```

## Caption: TikTok

```
3 ThoxMinis on local Wi-Fi = one shared AI that follows you between
rooms. No cloud. $189 for the 3-pack. 🟢

#thoxai #localfirst #mesh
```

## Caption: LinkedIn

```
ThoxMini mesh-syncing engineering breakdown.

Each ThoxMini runs the THOX mesh protocol over the local network
(IPv4 / IPv6 on the subnet, no broadcast outside the LAN). Mesh
discovery uses mDNS for zero-config peer detection; authentication
uses the persona binding from thox-persona (an Apache-2.0 no_std
crate; see ttracx/thoxos-kernel).

Three-device mesh: shared conversation context, shared embedding
cache, shared model weights. The device the user is physically
nearest serves the inference; the other devices contribute KV
cache + weight slices.

Local-only by design. No NAT traversal, no STUN server, no internet
dependency for sync. The mesh fails closed if the local network is
unavailable.

$189 3-pack early-bird at Kickstarter Aug 12 2026.

thox.ai/launch

#THOXai #localAI #mesh #engineering #raspberrypi
```

## Alt text

```
Three black ThoxMini USB sticks arranged in a triangle on a dark
navy studio surface. Each device has a small emerald LED glowing on
the center of its front face. A faint emerald light trail traces
the triangle edges between the devices.
```

## UTM

`?utm_source=<platform>&utm_medium=<format>&utm_campaign=ks-prelaunch-2026&utm_content=2026-06-19-wed-thoxmini-mesh-syncing`

## Acceptance

- [ ] 3 LEDs sync in phase (NOT phase-offset)
- [ ] Mesh protocol claim verified against thox-mesh crate
- [ ] No em-dashes
