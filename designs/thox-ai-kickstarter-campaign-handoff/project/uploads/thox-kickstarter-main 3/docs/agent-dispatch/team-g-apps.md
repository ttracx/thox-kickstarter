# Team G — Apps + companion experience

## Mission

Every "control from your phone" or "developer story" beat in the
launch video has a real app behind it by T-28 (Jul 15 2026).

## Repos you own

- `C:\Users\tommy\dev\thox-terminal` (primary; SwiftUI iOS/macOS)
- `C:\Users\tommy\dev\thoxos-companion` (iOS thin-client)
- `C:\Users\tommy\dev\thoxos-companion-multiplatform` (KMP+CMP port)
- `C:\Users\tommy\dev\thox-portable` (Rust thoxd + PWA)
- `C:\Users\tommy\dev\thox-workbench` (USB-portable AI workbench)

## Current state

- thox-terminal: v0.1.0 SwiftPM library only, no Xcode app target
- thoxos-companion: P0 PEM trust-anchor task open; no TestFlight
- thoxos-companion-multiplatform: KMP scaffold; no app binary
- thox-portable: v0.2.0 ready
- thox-workbench: v0.1.0 ready

## Deliverables (priority order)

1. **thox-terminal v0.2**: Xcode app target wrapping the SwiftPM lib +
   `ai.thox.terminal` bundle id + Keychain entitlement + actor
   `ThoxSSHTransport` over SwiftNIO SSH + SwiftTerm view + manual
   device-add sheet + iOS TestFlight build
2. **thoxos-companion TestFlight**: complete the P0 PEM trust
   anchor task; build + submit to TestFlight
3. **thoxos-companion-multiplatform**: pick first shipping target
   (Android APK preferred); ship to a sideload channel
4. **thox-portable PWA**: deploy `apps/web-assistant` to Vercel
5. **thox-workbench**: record a USB plug-in workflow video for
   the "developer story" beat (no code changes needed)

## Acceptance gate (filming demo)

- [ ] thoxos-companion installable from TestFlight on Tommy +
      Craig iPhones
- [ ] thox-terminal v0.2 installable from TestFlight; can SSH
      to a ThoxNova running ThoxOS Shell on port 22
- [ ] thox-portable PWA reachable at apps.thox.ai/portable
- [ ] thox-workbench USB plug-in workflow recorded as 30-second
      B-roll clip

## Scope reduction

If TestFlight rejection: fall back to Xcode-side-loaded build for
filming (still works for the camera; just doesn't ship to backers).

## Daily standup + weekly milestone same shape as Team B.
