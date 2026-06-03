# THOX.ai - Your AI, on silicon you own.

A unified Kickstarter campaign for the THOX device family.

Devices: **ThoxClip**, **ThoxMini**, **ThoxAir**, **ThoxNova**.

---

## The pitch in one paragraph

Your personal AI lives in someone else's datacenter. It is rented, throttled, and one policy change away from being a different product. THOX.ai is a tier of four devices that brings the agent onto silicon you own: a wearable that listens, a pocketable node that thinks small, a wireless node that clusters, and a desktop unit that runs the heavy stuff. They are honest about what each one can do. They snap together. They are yours.

## The four devices

| Device | What it is | Hardware floor | Role |
|---|---|---|---|
| **ThoxClip** | Wearable sensor + voice ingress | nRF52 MCU, mics, IMU, BLE | Ears, eyes, taps. The agent's front door. |
| **ThoxMini** | Pocketable RISC-V node | Milk-V Duo (CV1800B dual @ 1 GHz, 64 MB SRAM, sub-1W) | Cheap THOX edge node. Goes anywhere. |
| **ThoxAir** | Wireless cluster node | Pi Zero W (BCM2835 1 GHz, 512 MB, WiFi + BT) | Clusters over MagStack Air WiFi fabric. |
| **ThoxNova** | Desktop inference workstation | LattePanda N100 (Intel x86, 16 GB) | Hosts the heavy LLM. The hub everything else offloads to. |

Buy one. Buy two. Buy the family. They all speak the same THOX agent protocol.

## Why now

We have spent two years quietly building the THOX agent stack: a personal AI runtime that ships on Apple Silicon (thox-vmlx), NVIDIA (llama-server-cuda), Intel x86 (llama-server-sycl), browsers (MediaPipe WebGPU), and small ARM / RISC-V edge silicon (thoxymicro family). The runtime is real. The MagStack Air WiFi cluster fabric is real. What is missing is hardware you can hold.

This campaign funds the first production run of all four units and the THOX.ai assembly line that lets us ship them with their personalities preloaded.

## What backers get

### Tiers

| Tier | Price | What ships |
|---|---|---|
| Early-bird ThoxClip | $39 | 1x ThoxClip, magnetic charger, lanyard |
| ThoxClip | $49 | Same, after early-bird sells out |
| ThoxMini | $69 | 1x ThoxMini, USB-C cable, microSD card preflashed with ThoxOS Mini |
| ThoxAir | $79 | 1x ThoxAir, USB-C cable, microSD, MagStack Air firmware |
| Maker Kit | $109 | 1x ThoxMini + 1x ThoxClip + dev docs access |
| Air Kit | $119 | 1x ThoxAir + 1x ThoxClip + dev docs access |
| ThoxNova | $499 | 1x ThoxNova desktop unit, power brick, dock for one ThoxAir |
| Cluster Pack | $349 | 4x ThoxAir + magnetic stack base + USB-C 5V/4A hub |
| Family Bundle | $599 | 1x ThoxNova + 1x ThoxMini + 1x ThoxAir + 1x ThoxClip + docs |
| Founders Pack (limited 100) | $1,299 | Family Bundle + serial-numbered enclosure + name in firmware + lifetime updates |

### Stretch goals

| Funding | Unlock |
|---|---|
| $250K (baseline) | Production run begins. All tiers ship as listed. |
| $500K | ThoxOS Mini ships preflashed on every microSD with the THOX agent fleet preloaded. |
| $1M | MagStack Air cluster firmware bundled on every ThoxAir at no extra cost. |
| $1.5M | ThoxClip gets bone-conduction audio output. |
| $2M | ThoxNova gets a discrete NPU module slot (Hailo / RKNPU2 / Coral). |
| $3M | Open hardware: KiCad + STEP + Buildroot configs published under CERN-OHL-S. |

### Timeline

- **Aug 2026**: Campaign launch. EVT hardware ready for press demos.
- **Oct 2026**: DVT freeze. Manufacturing partner selected. Stretch goals locked.
- **Nov 2026**: PVT run, 200 units, sent to closed-beta backers.
- **Jan 2027**: ThoxClip ships to all backers.
- **Feb 2027**: ThoxMini and ThoxAir ship.
- **Apr 2027**: ThoxNova ships.
- **May 2027**: Family Bundle and Founders Pack ship with assembled MagStack Air cluster pre-paired.

### Risks and what we are doing about them

- **Supply chain**: We have alternate vendors lined up for every chip. The fallback for the Milk-V Duo on ThoxMini is the Luckfox Pico Mini B (already prototyped under our ThoxyMicro track). The fallback for ThoxAir is the Pi Zero 2 W (already supported by our MagStack Air firmware).
- **Firmware**: All four runtimes are already shipping in private alpha (vMLX on macOS, llama-server-cuda on NVIDIA, llama-server-sycl on Intel, RKNPU2 on RV1103). What is left is hardware integration, not language-model R&D.
- **No LLM overclaim**: We will never tell you a 64 MB device runs a chat-class LLM. ThoxAir and ThoxMini offload to ThoxNova (or to a cloud hub you choose). The campaign is honest about which device does which job.

---

## Per-device deep dives

### ThoxClip - The front door

A wearable that listens, taps, and forwards. It captures voice and motion, runs a tiny intent classifier on its nRF52 MCU, and forwards anything bigger to a paired THOX node over BLE.

**Specs**: nRF52840 SoC, dual MEMS mics, 6-axis IMU, BLE 5.3, USB-C charging, 12-hour battery, magnetic clip. Aluminum body with a printed THOX emerald accent.

**Use it for**: hands-free voice capture, ambient notes, walk-and-talk dictation, gesture triggers for the agent. Pair it with any THOX node.

**On-device AI**: wake-word detector, tap classifier, fall-detect heuristics. That is the upper limit of what 256 KB of RAM can do honestly.

### ThoxMini - The cheapest THOX node

The smallest pocketable computer in the lineup. Dual-core RISC-V at 1 GHz under 1 watt. No fans, no battery, no display. Plug a USB-C cable in and it boots ThoxOS Mini in under three seconds.

**Specs**: Milk-V Duo (CV1800B), 64 MB SRAM, microSD storage, USB-C, three UART, two I2C, four GPIO. Aluminum bar shell with an emerald LED.

**Use it for**: edge sensor processing, ThoxClip relay, MQTT gateway, a tiny THOXY agent on the desk that watches a webcam, an HDMI-CEC bridge that turns your TV into a THOX output.

**On-device AI**: ThoxOS Mini agent loop, tiny RKNN / TFLite models, no LLM. ThoxMini offloads chat to ThoxNova.

### ThoxAir - The wireless node

A Pi Zero W class node that joins a MagStack Air cluster over WiFi the moment it sees one. Magnetic pogo connectors on the top and bottom faces let you stack four to eight ThoxAir units into a single cluster on a single 5V USB-C input.

**Specs**: BCM2835 SoC, 512 MB RAM, 2.4 GHz WiFi + BT, microSD, USB-C OTG, magnetic 6-pin pogo (5V, GND, UART, I2C). Polished emerald shell.

**Use it for**: clustered inference across 4-8 nodes via llama.cpp `--rpc`, distributed sensor fan-out, a small home server that is honest about its size. The cluster appears to the THOX runtime as one node.

**Bundled software**: MagStack Air WiFi fabric, mDNS leader election, SQLite-backed task queue. Already running in our magstack-air-edge-rs P0.3 prototype.

### ThoxNova - The desktop hub

The full-strength THOX workstation. Hosts the heavy LLM locally, runs the THOX dashboard, and answers chat requests from every ThoxAir / ThoxMini / ThoxClip on the local network.

**Specs**: LattePanda N100 (Intel N100, 16 GB DDR5, 256 GB NVMe), passive cooling, 12V DC, USB-C and USB-A, HDMI, Ethernet, WiFi 6, BT 5.3. Aluminum case with the THOX badge in MagStack purple.

**Use it for**: local Llama / Qwen / Gemma inference via llama-server-sycl (Intel iGPU), the THOX dashboard at `http://thoxnova.local`, the MagStack Air leader role for any ThoxAir clusters in the house, the docking station for ThoxClip.

**On-device AI**: full chat-class LLM. This is where the heavy work happens. Every other device routes here.

---

## How they work together

```
ThoxClip   talks to   ThoxMini / ThoxAir over BLE
ThoxMini   talks to   ThoxNova over Ethernet / WiFi
ThoxAir    talks to   ThoxNova over WiFi
                or    to its own MagStack Air cluster
ThoxNova   hosts the LLM and the THOX dashboard.

A magnetic stack of 4x ThoxAir + 1x ThoxNova on the same shelf is a
complete personal THOX cluster for the price of one mid-range laptop.
```

## Why THOX.ai

We make agent software that ships across every runtime you actually use: Apple Silicon (thox-vmlx), NVIDIA (llama-server-cuda), Intel x86 (llama-server-sycl), browsers (MediaPipe WebGPU), and small edge silicon (thoxymicro on RV1103, MagStack Air on Pi Zero W class). The hardware in this campaign is the body for that brain.

We do not pretend our smallest devices run an LLM. We do not pretend our biggest one is a phone. Honest claims, real silicon, ship the work.

## Where the money goes

- 38% manufacturing (PCBA, mechanical, packaging)
- 22% certification (FCC, CE, UKCA, BLE SIG)
- 18% shipping and fulfillment
- 12% firmware integration and QA
- 6% Kickstarter and payment fees
- 4% reserves for supply-chain swaps

We will publish a quarterly burn-down once funded.

---

## Brand and design

THOX.ai uses a small, deliberate palette:

| Token | Hex | Where it shows up |
|---|---|---|
| Emerald | `#10b981` | Primary accent. Status LEDs, dashboard accents, badge color. |
| Emerald light | `#34d399` | Hover, secondary highlights. |
| Neon emerald | `#00ff88` | Status pip for "alive". Used sparingly. |
| MagStack purple | `#a855f7` | Cluster leader, secondary brand. |
| Amber | `#f59e0b` | Warning, telemetry alert. |
| Ink | `#0a0e14` | Body, dark surface. |
| Slate | `#475569` | Muted body text. |

Typography: **Inter** for sans, **JetBrains Mono** for code. Every product enclosure carries a single emerald accent and a quiet THOX wordmark in JetBrains Mono.

## Tagline candidates

- THOX.ai - Your AI, on silicon you own.
- THOX.ai - Honest claims, real silicon.
- THOX.ai - Edge nodes that know what they cannot do, and route the rest.
- THOX.ai - The agent comes home.

The campaign uses **"Your AI, on silicon you own."** as the primary line.

---

## What ships with this campaign vs what is already shipping

Already shipping in alpha (private repos under ttracx/*):
- thox-vmlx (Apple Silicon MLX runtime)
- magstack-air, magstack-air-llm, magstack-air-edge-rs (cluster fabric variants)
- thoxymicro, thoxy-micro, thoxymicro-edge (Luckfox / Pi-class edge agent)
- thoxymicro-install (public installer)
- thox-forge (operator dashboard)

This campaign funds the **hardware**. The software is paid for.

## Backer commitments

Every backer at any tier gets:
- Lifetime firmware updates for the agent runtime on their device.
- Access to the THOX private community (matrix.thox.ai).
- Right to repair: schematics + Buildroot configs for their device, MIT or Apache-2.0.
- Open contact: every email gets a human reply within five business days.

Founders Pack backers additionally get their name in the firmware boot banner.

---

THOX.ai - Your AI, on silicon you own.
