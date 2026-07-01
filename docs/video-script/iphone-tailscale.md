# Video beat script: iPhone controlling ThoxNova over Tailscale

**Beat**: "An iPhone (running thoxos-companion or thox-terminal) controlling the ThoxNova over Tailscale."
**Position**: hero video, beat 5 of the 2:30 master (~1:00 to 1:10). Landing beat before stretch-goal tease.
**Runtime target**: 10 seconds on camera + 3 seconds voiceover tail.
**Blocked on** (physical): user action #9 in `PULL_FORWARD_TRACKER.md` — ThoxNova LattePanda N100 provisioning (30 min).
**Blocked on** (app): Team G — TestFlight build submitted for `thoxos-companion` OR GH release tag on `thox-terminal` v0.3.0. Local build v0.3.0-rc8 exists (commit `fa7e4df`).
**Blocked on** (tailnet): ThoxNova joined to Tailscale + Nova-side ThoxOS `thoxos status --json` responsive (rc3 module in thox-terminal).

This script is production-ready prep — the moment the Nova is provisioned + one of the iOS apps is on the phone, principal photography starts.

---

## Cross-reference: source repos + canonical facts

| Fact | Source of truth | Note |
|---|---|---|
| iPhone app | `thox-terminal` v0.3.0-rc8 (commit `fa7e4df` 2026-06-24) — SwiftUI, iOS17+/macOS14+, unified control plane | GH tag not yet pushed; local build works. `thoxos-companion` also targets iPhone; either app can carry this beat. |
| Tailscale integration | `thox-terminal` v0.3.0-rc2 — real URLSession against `http://localhost:41112/localapi/v0/status` with `Host: local-tailscaled.sock` anti-DNS-rebinding header, 2s timeout | Import maps Tailscale peers -> ThoxDiscoveredDevice |
| ThoxOS status | `thox-terminal` v0.3.0-rc3 module — `ThoxOSStatusFetcher` runs `thoxos status --json` over `ThoxSSHTransport`, strips shell preamble | Live strip shown on DeviceCard when a fetcher attaches |
| SSH transport | `thox-terminal` v0.2 (SHIPPED 2026-06-22, commit `f4ba35b`) — Citadel 0.12.1 SSH + Keychain-backed key store | Full ThoxSSHClient + ThoxSSHTransport + ThoxSSHCommandBuilder |
| Nova provisioning | thoxos-kernel v1.2.0 signed release + LattePanda N100 install.sh | Ships thoxos status JSON parser |
| Design spec | `docs/superpowers/specs/2026-06-23-mdns-discovery-design.md` + `2026-06-23-tailscale-import-design.md` in thox-terminal | Canonical UX reference |
| App branding | `ai.thox.terminal` bundle id per shipping plan Team G item 1 | Keychain entitlement enabled |

---

## Shot list

### Shot 1 — iPhone on desk, thox-terminal open (0:00 to 0:02)

| Element | Spec |
|---|---|
| Subject | iPhone 15 Pro on walnut desk, screen on. thox-terminal app opens to the DeviceCard grid. ThoxNova visible as a card with the emerald status pill "online". |
| Camera | 85mm at 30deg down-angle over the phone, f/2.8, focused on the screen. |
| Lighting | Screen carries; kill the fill. Faint 4200K rim on the phone edge for definition. |
| Sound design | Single tap tone as the app opens. |
| Screen recording | 1080p60 capture of the iPhone screen via QuickTime + Lightning cable. Preserve the actual DeviceCard state including the ThoxNova live pill. |

### Shot 2 — Tap the Nova card, Tailscale peer view (0:02 to 0:04)

| Element | Spec |
|---|---|
| Subject | Thumb taps the ThoxNova card. Dashboard slides in: `ThoxTHOXYBadge` emerald, tailnet hostname visible, `thoxos status --json` live strip refreshing. |
| Camera | Same 85mm; slight tilt to include the thumb in-frame. |
| Sound design | Soft haptic tick. |
| Screen recording | Same capture pipe; ensure the tap animation transitions cleanly. Do not fake the animation with a cutaway. |

### Shot 3 — Physical Nova on desk, in the same frame (0:04 to 0:07)

| Element | Spec |
|---|---|
| Subject | Widen: reveal the ThoxNova v2 physical unit sitting behind the iPhone on the same desk, LED bar emerald. The iPhone screen is still visible; the tailnet loop between the two devices is now visible in one frame. |
| Camera | Pull back to 35mm at desk level; both devices in-frame; phone in mid-ground, Nova in background. |
| Lighting | Add back the fill for the wider frame. Keep the LED bar readable. |
| Sound design | Room tone with the faint fan noise from the Nova. |

### Shot 4 — Type a prompt on iPhone, response streams from Nova (0:07 to 0:10)

| Element | Spec |
|---|---|
| Subject | Thumb taps a "Ask" input field on the DeviceCard's action row (thox-actions integration from rc7). User types: "Show me disk usage on this box." The iPhone displays a streaming response from Nova. |
| Camera | Cut to 100mm macro on the iPhone screen. |
| Sound design | Silent for the stream; a soft "arrived" chime when the response completes. |
| Screen recording | The Nova's SSH session is the source; the iPhone renders. Capture the phone screen; the physical Nova need not be in this shot. |
| Alternate action | If the "disk usage" phrasing feels too dev-focused, use the thox-actions example `03_prints_decoded_set_thox_led` variant — flip the Nova's LED to cyan from the phone. Visible on the physical Nova + the phone in one frame. This is the STRONGER visual and is the recommended primary take. |

### Shot 5 — Emerald checkmark + landing text (0:10 to 0:13)

| Element | Spec |
|---|---|
| Subject | Phone screen shows response complete. A brand-cyan checkmark animates in. Cut back to the physical Nova with its LED bar now cyan (matching the earlier LED-flip alternate). |
| Camera | Match-cut back to Shot 3's frame. |
| Sound design | The soft "arrived" chime resolves. |

---

## Voiceover

- 0:00 -> 0:04 — "Your phone talks to your THOX gear over your own tailnet."
- 0:04 -> 0:10 — "No brokers, no accounts, no cloud in the loop."
- 0:10 -> 0:13 — "That's THOX."

Voice: Phamy leads on the first two lines; Tommy delivers the tagline landing.

---

## On-screen graphics

- Lower-third at 0:00: `thox-terminal   iOS + macOS` in IBM Plex Sans Medium, emerald accent bar.
- No pricing overlay on this beat — thox-terminal is free with the ecosystem.
- At 0:13, the campaign lockup fades in: `Kickstarter August 12` in IBM Plex Sans Bold, THOX emerald + cyan gradient.

---

## Required assets

1. iPhone 15 Pro (or 14 Pro / 13 Pro; any iOS17+ device is fine) with either:
   - `thox-terminal` v0.3.0-rc8 sideloaded via Xcode, OR
   - `thoxos-companion` TestFlight build with device claimed to Nova.
2. Provisioned ThoxNova v2 physical unit — user action #9. **BLOCKING.**
3. Tailscale auth key for the Nova; both devices on the same tailnet. Tailnet named `thox-fleet` (project convention).
4. Lightning cable + Mac for QuickTime screen recording of the iPhone.
5. Walnut desk + 4200K key + emerald + cyan accent bars.

## Shoot time estimate

- 90 min setup (Nova provisioning + tailnet join + app install + screen-mirror rig)
- 90 min principal (Shot 2 needs 6+ takes for the tap-to-transition timing; Shot 4/5 needs 10+ takes because the LED-flip variant carries the beat and has to nail exactly)
- 30 min pickup

Total: ~3.5 h on the day. Edit pass: 90 min including the two match-cuts.

## Voiceover script for teleprompter

> Your phone talks to your THOX gear over your own tailnet.
> No brokers, no accounts, no cloud in the loop.
> That's THOX.

## Fallback plan

If `thoxos-companion` TestFlight rejection persists AND thox-terminal is not on TestFlight either:
- Sideload the local rc8 build via Xcode direct-install; ship the beat.
- If neither app is installable at all by shoot day, substitute a macOS shot of thox-terminal (macOS14+ target) driving the same beat. Voiceover changes to "Your Mac talks to your THOX gear over your own tailnet."
