# REWARDS_FAQ.md

Twenty-six Q&A pairs for the Kickstarter campaign. Answers are written in the THOX brand voice: technical, honest, no marketing fluff.

This complements the canonical eight-question FAQ in `docs/FAQ.md` (which is the version that goes verbatim into the Kickstarter FAQ section). This file is the longer reference Q&A surface for backers, press, and the backer-comms team.

Reward tier numbers and ship windows are sourced from `docs/REWARDS_MATRIX.md` and `docs/TIMELINE.md`; if those change, this file is downstream of them.

---

## Shipping and fulfillment

### 1. What ships when?

| Reward | First ship window | Notes |
|---|---|---|
| ThoxClip | Q1 2027 | First device out the door. Smallest BOM, simplest cert. |
| ThoxMini | Q2 2027 | After ThoxClip; shares some sub-assemblies. |
| ThoxAir | Q2 2027 | Ships alongside ThoxMini once enclosure rev3 locks. |
| ThoxNova | Q2 2027 | Flagship; longer DVT cycle on the chassis. |
| MagStack Cluster Dock add-on | Q2 2027 | Ships with ThoxAir reward tiers. |

Ship windows are firm intent, not contracts. If we hit a real blocker we will publish it as a backer update before slipping a date.

### 2. Will I get tracking?

Yes. Every backer receives a per-unit tracking number when their shipment hands off to the carrier. Tracking goes to the email on file with BackerKit.

### 3. Can I change my shipping address after the campaign?

Yes, up to 30 days before your ship window opens. We will email you the cutoff date 60 days ahead.

### 4. International shipping?

Yes. We ship worldwide, with per-region surcharges to cover carrier and duty. Surcharges are listed at checkout in BackerKit, not at pledge time. We do not absorb duty for any destination.

### 5. What if my country has import restrictions?

We do not ship to countries under active US export sanctions. If your country is on that list when your reward is ready, we will refund the pledge in full, no questions.

### 6. Refunds before shipping?

Yes. Kickstarter's standard. Email us before the fulfillment cutoff for your tier and we refund the pledge minus payment-processor fees.

### 7. Refunds after shipping?

Within 30 days of delivery, for any reason, you can return the device and we refund the pledge minus shipping. After 30 days, the limited warranty applies (see Q19).

---

## Privacy and how it stays private

### 8. How does THOX stay private?

Three things together:

1. On-device inference. The model runs on hardware in your hands. No request leaves the device unless you ask it to.
2. No telemetry by default. There is no analytics SDK, no crash-reporter phoning home, no usage counter. If we ever add an opt-in telemetry channel, it will be opt-in and surfaced in the dashboard.
3. The dashboard shows every outbound request. If something tries to leave, you see it and can deny it.

### 9. Do you collect anything during the campaign?

Kickstarter and BackerKit collect what they need to fulfill your pledge: name, shipping address, email, and pledge amount. We do not run additional tracking pixels on the campaign page. We do not sell email addresses to anyone, ever.

### 10. Does the device need an account?

No. The device works out of the box without any account. If you want sync across multiple THOX devices, you create a local-only identity on one of them; the others pair to it over your LAN. No cloud account required.

---

## Bring your own model

### 11. Can I use my own model?

Yes. The THOXCore router accepts any of seven backends: LiteRT, OpenAI-compatible HTTP, Ollama, llama.cpp, vLLM, TensorRT, and MLX. If your model runs on any of those, it runs on THOX.

### 12. What runs on what?

| Device | Default loadout |
|---|---|
| ThoxClip | Wake-word + local short-utterance model; defers larger tasks to a paired ThoxMini, ThoxAir, or ThoxNova. |
| ThoxMini | Small instruction-tuned model in the 1B to 3B parameter range; runs on the Luckfox Pico Mini B NPU. |
| ThoxAir | Same as ThoxMini at the single-node level; clusters via MagStack for multi-agent workflows. |
| ThoxNova | Hosts the full THOX runtime: large models (7B and up), 7-adapter router, multi-agent orchestration. |

Default model sets ship in the firmware; you can swap GGUF files on ThoxNova at will. ThoxClip and ThoxMini have stricter slots due to memory budgets.

### 13. Can I run a 70B model on ThoxNova?

Not at usable throughput on the launch ThoxNova spec. You can load it quantized but expect single-digit tokens per second. We tune ThoxNova for the 7B-to-13B sweet spot.

### 14. What's the max context window?

Depends on the model. ThoxNova's reference models ship with 8K to 32K context. Bring-your-own models extend as far as the model allows and the hardware can hold.

---

## Software and updates

### 15. Will there be software updates after shipping?

Yes. The THOX runtime ships with a check-for-updates flow in the dashboard. Updates are opt-in. We commit to security updates for three years from your delivery date.

### 16. What if THOX as a company goes away?

The runtime is Apache-2.0. The Buildroot configs ship with every device. The seven-adapter router and the agent runtime are public on `github.com/ttracx`. If we disappear, you have everything you need to keep your device running and rebuild firmware yourself.

### 17. Is the hardware open source?

The software is Apache-2.0. Hardware schematics are TBD per device and may be published at later stretch goals; today the launch posture is software-open, hardware-closed. We do not promise hardware open-source at launch.

### 18. Compatible operating systems?

| Companion app | OS |
|---|---|
| thox-terminal (mobile + desktop) | iOS 17+, macOS 14+ |
| thox-portable PWA | Any modern browser |
| thox-workbench desktop | Linux, macOS 14+, Windows 10/11 |
| ThoxCore router CLI | Linux, macOS, Windows |

ThoxClip pairs over BLE; works with any iOS 17+ or Android 12+ phone for the basic pairing flow.

---

## Repair, warranty, durability

### 19. Warranty?

12 months from delivery, manufacturing defects only. We repair or replace; we do not refund cash after the 30-day return window.

### 20. Can I repair it myself?

ThoxMini, ThoxAir, and ThoxNova are designed with standard fasteners and replaceable sub-assemblies. We will publish a service guide before ThoxClip ships. ThoxClip is sealed; repair is replace-only due to the battery and the magnetic catch tolerance.

### 21. DIY mod-friendly?

Yes. The 3D-print kits for ThoxMini Air and the MagStack Cluster Dock are public on `ttracx/thox-3dprint-kit`. The agent runtime accepts custom skills. The router accepts any of seven model backends. Mod away. Modifications void the warranty on the modified part; everything else is still covered.

### 22. Power requirements?

| Device | Power |
|---|---|
| ThoxClip | Internal battery; USB-C charge; 12-hour target on a typical day |
| ThoxMini | 5V/3A USB-C input |
| ThoxAir | 5V/3A USB-C per node; the MagStack Cluster Dock takes one 5V/4A USB-C input for 4 to 8 nodes |
| ThoxNova | 19V DC barrel jack; 65W max under load |

Cables and power supplies are included with every reward unless explicitly listed as "device only" in the reward tier.

---

## Bulk, EDU, and B2B

### 23. Bulk pricing for education or business?

We are working on tiered MOQ pricing for EDU and B2B through the THOXKey EDU program. Specifics are not finalized for the launch; the campaign treats EDU as a soft post-launch commitment. If you are buying 10+ units, email founders@thox.ai and we will hold a conversation off-platform.

### 24. Will there be classroom or lab kits?

Yes, post-launch. The first kit will be a 4-node ThoxAir + MagStack Cluster Dock teaching set; the spec is being drafted in `ttracx/thox-quickstart` (assembly walkthroughs already exist for the underlying devices).

---

## About the team

### 25. Who is behind THOX?

THOX.ai is co-founded by Tommy Xaypanya and Craig Ross. Tommy leads software, AI runtime, and campaign operations. Craig leads hardware, mechanical design, and supply. Both founders are inventors of record on the THOX IP portfolio (IP-008 through IP-012 and onward). The portfolio is being assembled in `ttracx/thox-ip-portfolio`.

### 26. Why launch now?

On-device AI is finally fast enough. The Luckfox Pico Mini B runs a 3B instruction-tuned model at usable throughput on a board the size of a postage stamp. Apple Silicon and the new x86 NPU class run a 7B at conversation pace on battery. The hardware caught up to the privacy story.

We launch now because the alternative is to wait for the cloud-AI default to become permanent. We do not want the default to be cloud-by-default. We built THOX because we needed it; we suspect a lot of other people need it too.

---

## Not promised on this campaign

To avoid misreading, here is what is NOT a commitment of this campaign:

- ThoxArm, ThoxVault, ThoxCargo as shipping products in 2026. These appear as concept-only stretch goal unveils at $1.5M and above; nothing is promised to ship.
- THOXKey EDU bulk MOQ pricing tiers are a soft commitment; pricing finalizes post-launch.
- Hardware open-source files for launch SKUs; software is Apache-2.0 today, hardware schematics are not promised at launch.
- Specific accuracy or speed numbers for bring-your-own models. Performance depends on your model, your quantization, and your workload.

---

## Where this lives

- Canonical eight-question FAQ for the Kickstarter page: `docs/FAQ.md`
- Reward tier specifics: `docs/REWARDS_MATRIX.md`
- Shipping timeline: `docs/TIMELINE.md`
- Stretch goal details: `content/launch/STRETCH_GOALS.md`
- Backer comms cadence and templates: `docs/BACKER_COMMS.md`

Owner: Tommy. Sign-off required from Craig on hardware answers (Q12, Q20, Q22) before this file moves to the Kickstarter FAQ surface.
