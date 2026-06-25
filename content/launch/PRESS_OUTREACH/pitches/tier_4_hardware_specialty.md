# tier_4_hardware_specialty.md

DIY, maker, and hardware-deep-dive outlets. These are the highest signal-to-noise audiences for the THOX story; they will read the STL files, build the cluster dock, and tell their readers what they think.

**Lead angle for this tier**: USB-form-factor + DIY-print enclosures + MagStack clustering.
**Recommended template sequence**: initial_outreach -> demo_offer (with assembly experience) -> follow_up_3_day.

## Embargo policy

Variable. Hackaday and Make accept embargoes when terms are clear. Tom's Hardware and AnandTech treat embargoes seriously. Pitch goes at T-14.

## Outlets

---

### Hackaday

- **URL**: https://hackaday.com
- **Beat**: hardware hacking, DIY electronics, 3D printing, embedded, weird projects. Editorial bias toward "show the build, not the marketing." Strong on parametric design and printable enclosures.
- **Pitch angle**: lead with the print kit. MagStack Cluster Dock prints in 6.5 hours and 85g of PETG on a single Q2 Combo bed. STL + 3MF plates published in the open. The runtime is open-source. The whole stack is hackable.
- **Contact channel**: `tips@hackaday.com` (canonical tipline). Hackaday writes from tips frequently; a short well-targeted email gets responses.
- **Submission guidelines**: https://hackaday.com/submit-a-tip/ (verify current form)
- **Lead time**: 5-10 days; faster if the tip lands at the right editor.
- **Embargo policy**: respects embargoes if terms are documented; otherwise will write on tip timing.
- **Coverage history**: every Kickstarter hardware launch with open hardware angles. Pine64, Pimoroni, every clever 3D-printable mod.

---

### Make Magazine

- **URL**: https://makezine.com
- **Beat**: maker culture, education, DIY projects, 3D printing, robotics. Strong overlap with the THOX print kit + assembly story.
- **Pitch angle**: assembly experience + parametric STL pipeline. Maker audience loves the build process; offer demo unit + assembly walkthrough video.
- **Contact channel**: `editor@makezine.com` (verify current). Reporter-specific: pull byline from recent 3D-print or hardware-kit coverage.
- **Submission guidelines**: https://makezine.com/contact/ (verify)
- **Lead time**: 10-14 days. Make moves slower than blogs.
- **Embargo policy**: accepts embargoes for hardware features.
- **Coverage history**: Adafruit, SparkFun, Pimoroni kits; AI-on-edge projects.

---

### Tom's Hardware

- **URL**: https://www.tomshardware.com
- **Beat**: PC hardware, components, SBCs, peripherals. Strong on Raspberry Pi and SBC coverage.
- **Pitch angle**: the SBC + AI angle. ThoxMini and ThoxMini Air on Luckfox Pico Mini B. ThoxNova on LattePanda N100 with Intel Xe + Vulkan + SYCL runtime. Frame as "the SBC family for on-device AI."
- **Contact channel**: `tipline@tomshardware.com` (verify). Reporter-specific: pull byline from recent SBC / Pi / AI-hardware coverage. They have a dedicated SBC + maker writer; check the masthead.
- **Submission guidelines**: https://www.tomshardware.com/about-us/contact (verify)
- **Lead time**: 5-7 days.
- **Embargo policy**: respects embargoes.
- **Coverage history**: heavy Raspberry Pi coverage, every notable SBC launch (Luckfox, Radxa, LattePanda, Rock Pi).

---

### AnandTech

- **URL**: https://www.anandtech.com
- **Beat**: deep technical hardware reviews. Status check: AnandTech's editorial cadence has been reduced; the site has been in transition. If the site is dormant at pitch time, reroute the Tier 4 deep-tech slot to Tom's Hardware or to an SBC-focused individual reviewer.
- **Pitch angle**: silicon and runtime architecture. Multi-backend router. The case for SYCL on Intel Xe at the low end and MLX on Apple Silicon at the high end.
- **Contact channel**: `tips@anandtech.com` (verify if site is active). Reporter-specific: this is mainly a backstop tipline; AnandTech's reporter staffing is in flux.
- **Submission guidelines**: https://www.anandtech.com/about (verify)
- **Lead time**: variable; treat as a long shot.
- **Embargo policy**: historically respected embargoes; current state TBD.
- **Coverage history**: deep silicon reviews, SBC reviews, AI accelerator hardware.

---

## Common dos and don'ts for Tier 4

- **Do**: offer assembly experience as part of the demo. Tier 4 reporters want to build, not just unbox.
- **Do**: provide the STL files, the 3MF plates, and the BOM up front. They will check the slicer time estimate against their own printer.
- **Do**: mention the Q2 Combo print farm orchestrator (thox-q2-print-farm) as evidence the THOX team is shipping the print pipeline internally.
- **Don't**: gloss over the BOM. Tier 4 audiences will reverse-engineer it anyway.
- **Don't**: claim a print is faster or lighter than it really is. They will check.
