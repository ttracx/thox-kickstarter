# Hero video beat scripts

Production-ready shot lists for the 5 hero-video beats that were flagged
OPEN in the 2026-07-01 T-43 acceptance-gate audit. Each script is
self-contained: camera + lighting + sound + voiceover + on-screen graphics
+ required assets + shoot-time estimate + fallback plan.

The videos themselves are still gated on hardware (prints + Nova
provisioning) + Phase C training fire; **these scripts turn each shoot
into a T+0 walk-on when the physical unit is ready**, no additional
prep work needed.

Master edit lives at `content/launch/VIDEO_SCRIPT.md` (90-second social
cut) and `docs/VIDEO_PRODUCTION.md` (2:30 master). This directory holds
the beat-level detail that those files reference at the top.

---

## The 5 beats

| # | Beat | Script | Runtime | Position in 2:30 master |
|---|---|---|---:|---|
| 1 | Unbox ThoxNova v2, display up in 8s | [`unbox-nova.md`](./unbox-nova.md) | 12s | 0:43 - 0:52 |
| 2 | 8-clip MagStack column, LED wave sweeping | [`magstack-cluster.md`](./magstack-cluster.md) | 6s | 0:37 - 0:43 |
| 3 | ThoxMini USB stick, `ollama run` in <10s | [`usb-ollama.md`](./usb-ollama.md) | 6s | 0:31 - 0:37 |
| 4 | ThoxMini Air on backpack, halo pulsing emerald | [`air-led.md`](./air-led.md) | 8s | 0:52 - 1:00 |
| 5 | iPhone controls Nova over Tailscale | [`iphone-tailscale.md`](./iphone-tailscale.md) | 10s | 1:00 - 1:10 |

Total hero-beat runtime: **42 seconds** of the 2:30 master.

---

## Total shoot time (once assets ready)

Rolled up from each beat's estimate:

| Beat | Setup | Principal | Pickup | Total |
|---|---:|---:|---:|---:|
| Unbox Nova | 2h | 90m | 30m | 4.0h |
| MagStack cluster | 1h | 90m | 30m | 3.0h |
| USB Ollama | 1h | 60m | 30m | 2.5h |
| Air LED | 45m | 75m | 30m | 2.5h |
| iPhone Tailscale | 90m | 90m | 30m | 3.5h |

**Aggregate shoot budget: ~15.5 h across 5 beats.** Estimate assumes
back-to-back shooting on one location day. Edit passes add ~5h on top.

Realistic schedule: 2-day shoot at T-18 to T-16 (Jul 25-26), edit T-15
to T-14 (Jul 27-28), locked video ready by T-14 (Jul 29) per weekly
milestones in `KICKSTARTER_SHIPPING_PLAN.md`.

---

## Required assets checklist (across all 5 beats)

Grouped by blocker owner. Check off as each lands.

### Physical hardware (user actions #7-#9 in PULL_FORWARD_TRACKER.md)

- [ ] 8 x ThoxMini Air v4 printed enclosures (`thox-3dprint-kit/devices/thoxmini-air/kit-v4/`)
- [ ] 8 x Luckfox Pico Mini B boards flashed with magstack-air firmware
- [ ] 1 x Cluster Dock printed (`thox-q2-print-farm` Cluster Dock print pack `726236d`)
- [ ] 1 x ThoxMini v2 physical unit with `thoxymicro` Go agent installed
- [ ] 1 x ThoxNova v2 physical unit, LattePanda N100 provisioned with Ubuntu 24.04 + install.sh
- [ ] 1 x ThoxNova v2 outer shipping box + foam tray in `thoxnova/v2/` cutout profile
- [ ] 1 x carabiner-mount ThoxMini Air v4 for the LED beat

### Software / tags (Team D + Team G blockers)

- [ ] Phase C 12B training complete on thox-gemma4 (via `make phase-c-kickoff`)
- [ ] Ollama tag `ttracx/thoxgemma4-12b:phase-c` published to Ollama Hub
- [ ] (Alternate) `thoxgem:e4b` or `thoxgemma4-e4b-sft` tag published as fallback
- [ ] thox-terminal v0.3.0 GH release tag on ttracx/thox-terminal
- [ ] thoxos-companion TestFlight build submitted + accepted
- [ ] Nova joined to `thox-fleet` tailnet

### Locations

- [ ] Walnut desk with 4200K key + cyan #27E5FF accent bar rig
- [ ] Hallway location for the Air backpack walking beat
- [ ] Off-white wall for the Air hook shot

### Post-production

- [ ] THOX emerald + cyan brand LUT (from thox-brand-vault v1.0)
- [ ] IBM Plex Sans Medium + Bold available for lower-thirds
- [ ] Loudness target -14 LUFS (matches VIDEO_SCRIPT.md master spec)

---

## Cross-references

- Master 90-second script: `content/launch/VIDEO_SCRIPT.md`
- Master 2:30 production doc: `docs/VIDEO_PRODUCTION.md`
- Storyboard: `content/launch/STORYBOARD.md`
- 60-second per-device social cuts: `content/launch/UNBOXING_SCRIPTS/`
  (these are separate from the hero video; the 5 files here are the
  hero beats that fold into the master edit)
- Canonical SoC facts: project memory topic files
  - ThoxMini + ThoxMini Air: Luckfox Pico Mini B (RV1103) — memory
    supersedes `docs/CAMPAIGN_INFO.md`
  - ThoxNova: LattePanda N100 (Intel x86)
  - MagStack Cluster Coordinator agent: A14
- Acceptance-gate mapping: `docs/KICKSTARTER_SHIPPING_PLAN.md` -> "Acceptance criteria for launch-day demo"
- Blocker status: `docs/PULL_FORWARD_TRACKER.md` section 1

---

## Change log for this directory

- **2026-07-01 (T-43)**: initial 5 beat scripts drafted per acceptance-gate audit follow-through. All 5 scripts are production-ready prep, awaiting hardware + Phase C training fire before physical shoot.
