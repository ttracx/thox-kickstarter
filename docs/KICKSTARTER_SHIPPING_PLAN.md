# THOX.ai Kickstarter shipping plan

**Launch date**: Tue Aug 12 2026, 9:00am PT
**Days remaining**: 49 (T-49 as of 2026-06-22)
**Filming window**: T-35 to T-14 (Jul 7 to Jul 28 2026)
**Goal**: ship 4 fully functional prototype devices on camera for the
launch video, with the entire software / firmware / provisioning
stack live by film day.

This plan is the **single source of truth** for Kickstarter prep
across the THOX.ai portfolio. It is the output of a parallel audit
of 40+ repos and lists every gap between today and a working launch
video, organized into 8 parallel agent workstreams.

## Demo gap analysis (per device)

What the video must show vs. what currently works:

| Device | Video beat | Current status | Gap |
|---|---|---|---|
| **ThoxNova** (6" tablet) | 6" display running ThoxOS + 12B local inference + MagStack pogo-pin stacking | thoxos-kernel v1.1.24, NO_GO on v1.2.0 (no QEMU evidence, no signed release). thox-gemma4 Phase C 12B not yet trained. STL set ready (v2.1). | **HIGH RISK**: kernel can't boot Nova hardware in video; 12B not on Ollama yet |
| **ThoxClip** (MagStack puck) | Stacking, Qi2 charging, mesh sync with other clips | STL set ready (v7.1 with recessed pocket). magstack-air fabric exists but unverified on real Pi Zero 2 W stack. No clip-specific firmware repo in the audit. | **MEDIUM RISK**: cluster assembly unproven on camera; clip firmware repo missing |
| **ThoxMini** (USB-C stick) | Local inference on a host laptop | STL set ready (v2.1 with USB-C cutout). thoxos-air-image is the Mini Air image but actually RV1103 Mini also uses this. No signed image artifact yet. | **MEDIUM RISK**: no bootable signed image |
| **ThoxMini Air** (carry-along) | Button controls + carabiner + mesh sync | STL set ready (v2.1 with 4 button cutouts + carabiner ring). magstack-air + magstack-air-edge-rs need Rust env build + Pi Zero 2 W deploy. | **MEDIUM RISK**: not verified to compile + run end-to-end |
| **All devices (marketing site)** | thox.ai matches the Kickstarter pricing + date | Site says "April 14 2026 / starting at $549"; Kickstarter playbook says "Aug 12 2026 / $39-$499" | **CRITICAL**: marketing site contradicts the video |

## Critical-path repos (the 12 that must ship)

Sorted by demo-blocking priority. Each is owned by a specific agent
team (see "Agent team structure" below).

| Priority | Repo | Current state | Must-have for launch | Owner team |
|---|---|---|---|---|
| **P0** | `Thox.ai` (marketing site) | April 14 / $549 copy | Aug 12 / 4-SKU lineup | Team A (Marketing) |
| **P0** | `thox-command-center` | Not gitted | Keep PRIVATE; never link from public | Team A (Marketing) |
| **P0** | `thoxos-kernel` | v1.1.24, NO_GO | QEMU evidence + signed v1.2.0 release | Team B (Kernel) |
| **P0** | `thoxos-air-image` | No signed artifact | Signed v0.1 image released to GH | Team C (Images) |
| **P0** | `thox-gemma4` | Phase C 12B blocked on tx5.6 | Phase C 12B trained + GGUF | Team D (Models) |
| **P0** | `thoxllm-factory` | P1.5 pending | 7 Ollama tags live + ThoxGem-E4B GGUF | Team D (Models) |
| **P1** | `thox-provisioner` | ThoxAir MaskROM untested | Cross-platform smoke test | Team E (Provisioning) |
| **P1** | `magstack-air` + `magstack-air-edge-rs` | Compile unverified | Run on real 4-8 Pi Zero 2 W stack | Team F (MagStack) |
| **P1** | `thox-terminal` | v0.1.0 scaffold | v0.2 native SSH for "control from iPhone" beat | Team G (Apps) |
| **P1** | `thoxos-companion` | Not on TestFlight | TestFlight build for iPhone beat | Team G (Apps) |
| **P2** | `thoxinchip` | Branch unmerged | GDS render of ThoxCPU for "silicon roadmap" cutaway | Team H (Silicon) |
| **P2** | `thox-watch` | Hardware bring-up | Display + I2C verified for stretch-goal "ThoxWatch coming" beat | Team H (Silicon) |

## Day 0 launch order (revised 2026-06-23 per shiproom review)

Four corrections to the original plan:

1. **Team A is medium-high risk, not low.** Public Thox.ai site has
   broader contradictions than the hero/countdown: founder pricing
   `$629`, ThoxMini `$89.99`, `$899` cost comparison line, December
   2026 delivery language, Founders Campaign framing. Full claim
   reconciliation pass needed, not just a hero rewrite.

2. **Team B must be a risk-reduction lane, not the video's single
   point of failure.** Three legal release-decision outcomes:
   `GO_REAL_HARDWARE_BOOT` | `GO_QEMU_ONLY_FOR_KICKSTARTER` |
   `NO_GO_KERNEL_NOT_FOR_VIDEO`. T-21 (Jul 22) is the binding
   fallback cutoff; after that, kernel stops chasing real hardware
   and Teams C/E/F own the physical-device beats.

3. **Team D blocker is reframed.** The transformers ecosystem is
   already past 5.6 (5.12.1 publicly available). The real Team D
   gate is: pin a known-good transformers version, run Phase C 12B,
   generate model cards/tags, prove at least one Nova-class local
   inference path. Not "wait for upstream."

4. **Team C/E are more important than they look.** The
   `thoxos-air-image` rootfs overlay currently ships placeholder
   `thox-mesh-ctl` and `thox-assistant` binaries that prevent
   services from failing but do no real work. That makes C/E the
   practical hardware-demo fallback if B slips. Shadow-start them
   on Day 0, not Week 2.

### Day 0 launch order

```
# Start IMMEDIATELY today
1. Team A — Marketing site + command-center lockdown
2. Team B — Kernel v1.2.0 signed evidence lane (3-outcome decision)
3. Shared Linux build host — required by B, C, E, F (provision TODAY,
   not "this week"; see docs/agent-dispatch/build-host-spec.md)

# Shadow-start TODAY if any capacity exists
4. Team C — signed Pi Zero 2 W / RV1103 image artifact (physical
   fallback lane if B slips)
5. Team E — cross-platform flasher + MaskROM path (no image counts
   unless it can be flashed safely)

# Start after build host is online (within 48h)
6. Team D — model training / tagging / runtime proof
7. Team F — MagStack compile + physical hero shot
8. Team G — Terminal / Companion TestFlight proof

# Optional / drop-first if schedule compresses
9. Team H — silicon GDS + ThoxWatch wrist B-roll
```

**Order rationale**: Team A protects trust. Team B protects technical
credibility. Teams C/E protect the physical-device fallback. That
combination ships a real Kickstarter video without over-claiming.

## Agent team structure (revised risk ratings)

8 parallel agent teams. Each runs as a Claude Code agent + a human
DRI from THOX. Teams ship in parallel; coordination only at the
weekly check-in (Fri 5pm PT) + the daily blocker triage in Slack
`#ks-ops`.

### Team A: Marketing site reconciliation (`Thox.ai`)
- **DRI**: Phamy
- **Repos**: `Thox.ai`, `thox-command-center`
- **Goal**: ship the production marketing site that matches the
  Kickstarter playbook (Aug 12 / 4 SKUs / $39-$499) by T-30 (Jul 13).
- **Workstream**:
  1. Rewrite hero copy to match `thox-kickstarter/docs/CAMPAIGN_INFO.md`
  2. Replace single-SKU framing with 4-SKU lineup grid (ThoxClip /
     Mini / Air / Nova)
  3. Update Stripe deposit flow to match new $39+ entry tier
  4. SEO + JSON-LD for the new launch date
  5. Hero device render swap (use `thox-blueprint` exploded-view
     output of ThoxNova v2 + ThoxClip v7.1)
  6. Stand up `thox-command-center` as a private repo with a 1-line
     "internal only" README; verify NO inbound links from
     public THOX surfaces
- **Acceptance**: site live at thox.ai with the new copy by T-30;
  no command-center references from any public repo
- **Risk**: low (mostly content)

### Team B: ThoxOS kernel v1.2.0 release
- **DRI**: Craig
- **Repos**: `thoxos-kernel`
- **Goal**: ship a signed v1.2.0 release that boots on ThoxNova
  LattePanda N100 hardware by T-21 (Jul 22).
- **Workstream**:
  1. Set up a Linux build host with rust-bare-metal toolchain +
     GRUB + QEMU
  2. Run the 7 `v120-*.log` command-specific smoke transcripts
  3. Generate real detached release signature (NOT local HMAC)
  4. Release-manager human sign-off (Craig)
  5. Tag v1.2.0; absorb the parked carve-out into the default
     kernel tree
  6. Boot test on actual LattePanda N100 dev board
  7. Boot test on actual Pi Zero W (ThoxMini) + Pi Zero 2 W
     (ThoxMini Air / MagStack)
- **Acceptance**: `cargo build --release` produces a signed kernel
  binary that boots `thoxos> ` shell on N100 + Pi Zero W
- **Risk**: **HIGH** — kernel work is the longest pole. May require
  scope reduction if v1.2.0 slips (e.g., film with v1.1.24 booting in
  QEMU on screen instead of real silicon)

### Team C: Image build + signing
- **DRI**: Craig
- **Repos**: `thoxos-air-image`, `thoxair-pico-sdk`,
  `thox-luckfox-pico-mini-b`
- **Goal**: ship signed Pi Zero 2 W / RV1103 OS image for ThoxMini
  Air (also reused for ThoxMini RV1106) by T-21 (Jul 22).
- **Workstream**:
  1. Stand up a privileged Linux build host (image build won't
     run on Windows)
  2. Run `customize.sh` end-to-end with cosign signing
  3. Verify boot on real Pi Zero 2 W hardware
  4. Ship thox-mesh-ctl + thox-assistant systemd units actually
     working
  5. Merge the v0.2 branches on `thoxair-pico-sdk` and
     `thox-luckfox-pico-mini-b`; tag both v0.2.0
  6. Decide: does ThoxMini (RV1106) get its own image, or reuse
     the Air image? Resolve `thoxos-mini-build` scratch dir
     (either delete or promote to real repo)
- **Acceptance**: signed image artifact on the GH release page;
  Pi Zero 2 W boots to ThoxMini Air branded login + LED strip lit
- **Risk**: medium — depends on Linux build host availability

### Team D: Model training + publish
- **DRI**: Phamy
- **Repos**: `thox-gemma4`, `thoxllm-factory`,
  `thox-gemma4-e4b-sft`, `thox-micro-125m`
- **Goal**: every device has a working local model on Ollama by
  T-28 (Jul 15) for filming.
- **Workstream**:
  1. **transformers 5.6+ bump** (precondition for Phase C 12B)
  2. **Phase C 12B QLoRA train** on the 4060 Ti rig
  3. **GGUF Q4_K_M export** for the 12B + verify Intel CPU/Vulkan
     inference on a LattePanda N100 (the actual ThoxNova hardware)
  4. **thoxllm-factory P1.5**: publish the 7 ready Ollama tags
     (Forge-7B, Mini-3B, Global-7B, Wave-8B, Nova-12B-Unleashed,
     two ThoxGem-E4B variants)
  5. **ThoxGem-E4B GGUF + Ollama tag**: merge LoRA -> bf16 ->
     GGUF Q4_K_M -> Ollama tag `thoxgem:e4b`
  6. **thox-gemma4 E2B**: train + quantize for ThoxAir NPU
     (Coral or M.2 Hailo-8L); benchmark tokens/sec on real RV1103
  7. **thox-micro-125m SFT**: instruction-tune for ThoxClip /
     ThoxMini routing
- **Acceptance**: `ollama pull ttracx/<tag>` works for at least 5
  THOX models; ThoxNova on N100 hits >=4 tokens/sec on 12B; ThoxAir
  on Pi Zero 2 W + Coral hits >=10 tokens/sec on E2B
- **Risk**: medium-high — model training is fast (~12 hours per
  training run) but RKNN/Vulkan inference paths are unverified on
  real hardware

### Team E: Device provisioning + flashing
- **DRI**: Tommy
- **Repos**: `thox-provisioner`, `thoxos-mini-flasher`,
  `thoxos-mini-utm-build`, `thox-quickstart`,
  `thoxos-mini-ai-usb-factory`
- **Goal**: every device can be flashed in <5 min on Windows + macOS
  by T-14 (Jul 29).
- **Workstream**:
  1. **thox-provisioner ThoxAir MaskROM**: live cross-platform smoke
     test on Windows + macOS
  2. **thoxos-mini-flasher** live smoke on macOS (Windows + web
     Docker already verified)
  3. **thoxos-mini-utm-build .utm signature** validation; pair with
     **ThoxOS-Mini-Provision** end-to-end
  4. **thoxos-mini-ai-usb-factory Phase 2 ISO**: build the 12B+ on
     a Linux host; SHA256 verify; smoke on x86_64 UEFI
  5. **thox-quickstart audit trail**: finish per-unit acceptance
     QA result JSON; this is the fulfillment gate (Nov 2026)
- **Acceptance**: a Kickstarter-day demo where Tommy plugs in a
  fresh ThoxAir USB stick + Pi Zero 2 W board, runs the flasher,
  and the device boots into THOX branding in under 5 minutes,
  end-to-end on camera
- **Risk**: medium — ThoxAir MaskROM is the unknown

### Team F: MagStack cluster physical assembly
- **DRI**: Craig
- **Repos**: `magstack-air`, `magstack-air-edge-rs`,
  `thox-q2-print-farm` (Cluster Dock)
- **Goal**: assemble a working 8-node MagStack column of Pi Zero 2 W
  + magnetic pogo-pin connector by T-21 (Jul 22) for the
  campaign's hero "wow" shot.
- **Workstream**:
  1. Compile `magstack-air-edge-rs` in a real Rust environment
     (currently generated in sandbox without Rust toolchain)
  2. Deploy to a Pi Zero 2 W: run `cargo test --workspace`
  3. Print 8 Cluster Dock split-and-bond pieces on the Q2 Combo;
     validate dovetail joint strength
  4. Source 8 Pi Zero 2 W + 8 ThoxClip v7.1 enclosures + 8
     magnetic pogo connectors + 1 USB-PD power source
  5. Assemble physical stack; verify leader election + work
     queue distribution under load
  6. Verify each device's emerald LED pulses out of phase by 90
     degrees (the "wave through the stack" hero motion)
- **Acceptance**: 8-clip stack boots, leader election succeeds,
  workload distributes; LED wave visible on camera at 30 fps
- **Risk**: medium — physical assembly + the Cluster Dock joint
  strength is the hardware risk

### Team G: Apps + companion experience
- **DRI**: Phamy
- **Repos**: `thox-terminal`, `thoxos-companion`,
  `thoxos-companion-multiplatform`, `thox-portable`, `thox-workbench`
- **Goal**: every "control from your phone" or "developer story"
  beat in the video has a real app behind it by T-28 (Jul 15).
- **Workstream**:
  1. **thox-terminal v0.2**: Xcode app target + SwiftNIO SSH +
     SwiftTerm; bundle id `ai.thox.terminal`; Keychain
     entitlement; manual device-add sheet; iOS TestFlight build
  2. **thoxos-companion TestFlight**: P0 PEM trust anchor task +
     iOS TestFlight build
  3. **thoxos-companion-multiplatform**: pick first shipping
     target (Android APK preferred); ship APK to a sideload
     channel for filming
  4. **thox-portable** v0.2 PWA: deploy `apps/web-assistant` to
     Vercel; record the LAN companion launch flow
  5. **thox-workbench v0.1.0** is already ready; record a USB
     plug-in workflow for the "developer story" beat
- **Acceptance**: TestFlight build of thoxos-companion + thox-terminal
  on Tommy's + Craig's iPhones; APK of multiplatform companion on
  one Android handset; Vercel deploy of thox-portable's PWA live
- **Risk**: medium — SwiftNIO SSH integration is the weakest link

### Team H: Silicon + wearable narrative (B-roll only)
- **DRI**: Craig
- **Repos**: `thoxinchip`, `thox-watch`
- **Goal**: shoot enough B-roll for the "silicon roadmap" cutaway
  and the "ThoxWatch stretch goal" tease by T-14 (Jul 29).
- **Workstream**:
  1. **thoxinchip**: merge `docs/team-d-devices` branch; render a
     GDS layout of the PolarQuant MAC + ThoxCPU; export to PNG
     for B-roll
  2. **thox-watch**: flash `thoxwatch_c3_supermini` firmware to a
     real ESP32-C3 SuperMini; verify display + backlight + BMI160
     I2C scan; shoot a 5-second "wrist display lighting up" clip
- **Acceptance**: 1 silicon-roadmap PNG + 1 wrist clip in the asset
  library
- **Risk**: low — these are NOT critical-path; they are stretch
  visual content. Drop if other workstreams need attention

## Dependency graph

```
Team A (Marketing) ─────────────────────────► T-30 site live
                                                    │
                                                    ▼
Team B (Kernel) ─────────► v1.2.0 ─────────► T-21 kernel boots Nova
                              │
                              ▼
Team C (Images) ─────────► signed image ───► T-21 Air boots branded
                              │
                              ▼
Team D (Models) ─────────► Ollama tags ────► T-28 12B on Nova
                              │
                              ▼
Team F (MagStack) ────────► 8-clip stack ──► T-21 cluster live
                              │
                              ▼
Team E (Provisioning) ───► flasher works ──► T-14 demo flash
                              │
                              ▼
Team G (Apps) ────────────► TestFlight ────► T-14 phone beat
                              │
                              ▼
Team H (Silicon) ─────────► B-roll PNG ────► T-14 stretch tease
                              │
                              ▼
                           FILM DAY (T-7 = Aug 5)
                              │
                              ▼
                           LAUNCH (T+0 = Aug 12 9am PT)
```

## Weekly milestones (T-49 to T+0)

### Week of 2026-06-22 (T-49 to T-42) — kickoff
- All 8 teams assigned DRIs + agent instances spun up
- Each team posts a 1-line week-1 plan in `#ks-ops`
- Marketing site (Team A) drafts new copy

### Week of 2026-06-29 (T-42 to T-35)
- Team B: Linux build host operational; first QEMU smoke
- Team D: transformers 5.6+ bump merged + Phase C 12B training started
- Team A: site copy review + design draft
- Team F: Cluster Dock prints from Q2 Combo
- Team G: thox-terminal Xcode target stood up

### Week of 2026-07-06 (T-35 to T-28) — filming prep
- Team C: signed image artifact released
- Team D: 7 Ollama tags live (P1.5)
- Team G: TestFlight builds in beta review
- Team A: site live at staging URL
- Team F: 8-clip stack assembled

### Week of 2026-07-13 (T-28 to T-21) — film week
- All hero shots filmed
- Team B: v1.2.0 release tagged + signed
- Team A: site GA at thox.ai
- Team D: 12B on Nova hardware verified
- Team E: flasher demo recorded

### Week of 2026-07-20 (T-21 to T-14) — edit + B-roll
- Team H: silicon + watch B-roll filmed
- Hero video edit complete
- Press kit final

### Week of 2026-07-27 (T-14 to T-7) — embargo + final
- Press embargoed copies sent
- Final video lock
- All apps + sites verified

### Week of 2026-08-03 (T-7 to T+0) — launch week
- T-7: full team rehearsal of launch-day choreography
- T-3: "we launch in 3 days" email
- T+0: launch (9am PT Aug 12 2026)

## Risk register

| ID | Risk | P | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | thoxos-kernel v1.2.0 slips past T-21 | H | ThoxNova can't boot on camera | Film with v1.1.24 booting in QEMU on the 6" display; voice-over describes the v1.2.0 work | Team B |
| R2 | Phase C 12B training fails to converge | M | ThoxNova flagship demo uses 7B instead of 12B | Pre-stage Nova-12B-Unleashed as fallback (already trained at 240 steps) | Team D |
| R3 | MagStack cluster doesn't compile on Pi Zero 2 W | M | Drop the 8-stack hero shot | Pre-record the magstack-air dashboard view on a desktop simulator | Team F |
| R4 | TestFlight rejection on thoxos-companion | M | iPhone beat falls back to a sideload via Xcode | Submit to TestFlight by T-35 to allow rejection-correction loop | Team G |
| R5 | Marketing site not live by T-30 | H | Kickstarter video contradicts the site | Lock copy by T-42; ship to staging T-35 | Team A |
| R6 | Linux build host unavailable | H | Kernel + image cannot ship | Provision a cloud Linux instance (Hetzner / AWS) by T-49 | Team B + C |
| R7 | Q2 Combo prints fail on multi-color toolchanges | M | Cluster Dock + device shells unprintable | Run the precision coin calibration first (already documented at thox-3dprint-kit/print-queue/00-PRECISION-COIN-CALIBRATION.md) | Team F |
| R8 | thox-command-center leaks into public surface | H | Confusion or trust loss | Audit every public repo for "command-center" references by T-30; CI check on Thox.ai builds | Team A |

## Acceptance criteria for launch-day demo

The hero video (2:30) MUST show:

- [ ] Tommy or Phamy unboxing a ThoxNova v2 (matte black) and
      powering it on — display lights up with ThoxOS within 8
      seconds
- [ ] An 8-clip MagStack column doing inference (visible LED wave
      sweeping the stack)
- [ ] A ThoxMini USB stick plugged into a generic laptop running
      `ollama run thoxgem:e4b` and getting a response in <10 sec
- [ ] A ThoxMini Air carry-along clipped to a backpack with the
      LED strip pulsing emerald
- [ ] An iPhone (running thoxos-companion or thox-terminal)
      controlling the ThoxNova over Tailscale
- [ ] Marketing site at thox.ai matching the Kickstarter copy

The Kickstarter page MUST link to:

- [ ] 4-device pricing tier in `docs/REWARDS_MATRIX.md`
- [ ] Spec sheet for each device in
      `thox-3dprint-kit/devices/<device>/v2/README.md`
- [ ] Press kit at `docs/PRESS_KIT.md`
- [ ] Backer FAQ at `docs/FAQ.md`

## Dispatch

Each team's agent is launched via:

```
agent: claude-sonnet-4-6
prompt: <see docs/agent-dispatch/<team>.md>
isolation: worktree (per team, on the relevant repo)
working-dir: C:\Users\tommy\dev\<repo>
```

Per-team dispatch prompts live at `docs/agent-dispatch/team-<X>.md`
(generated separately). The DRI reviews the agent's daily report
in `#ks-ops` and signs off on weekly milestones.

## Daily ritual

- 8:30am PT: standup in `#ks-ops` — each team posts blockers in
  1 line
- 12pm PT: agent-dispatched async update from each team
- 5pm PT: blocker triage (DRIs + Tommy)
- Fri 5pm PT: weekly milestone review + plan-next-week
