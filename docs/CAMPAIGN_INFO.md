# Campaign Info (source of truth)

Anything that needs to be quoted on the Kickstarter page, in press, on the website, in BackerKit, or in social copy lives here.

## Identity

| Field | Value |
|---|---|
| Project name | THOX.ai - Your AI, on silicon you own. |
| Short name | THOX.ai Family Campaign |
| Category | Technology > Hardware > Gadgets |
| Country | United States |
| Currency | USD |
| Duration | 30 days |
| Funding goal | $250,000 |
| Funding model | All-or-Nothing |
| Launch date (target) | August 12, 2026 (Tuesday, 9:00 AM PT) |
| End date (target) | September 11, 2026 (Thursday, 10:00 PM PT) |
| Project ID slug | thox-ai-your-ai-on-silicon-you-own |
| Public URL (post-launch) | kickstarter.com/projects/thox-ai/thox-ai-your-ai-on-silicon-you-own |

## Tagline + blurbs

### Tagline (always use this)
`Your AI, on silicon you own.`

### blurb_135 (Kickstarter page blurb, 135 chars max, currently 132)
`Four devices, one agent. ThoxClip listens. ThoxMini thinks small. ThoxAir clusters. ThoxNova hosts the LLM. All local.`

### prelaunch_blurb_200 (Coming-soon page, 200 chars max)
`The THOX family brings personal AI onto silicon you own: a wearable, a pocketable RISC-V node, a Wi-Fi cluster, and a desktop hub. Honest claims, real silicon. Coming to Kickstarter in August 2026.`

### Press one-liner
`THOX.ai launches a unified Kickstarter for ThoxClip, ThoxMini, ThoxAir, and ThoxNova - the first hardware family designed end-to-end for local personal AI, with the runtime stack already shipping in alpha.`

## Devices (canonical specs - update here, propagate everywhere else)

### ThoxClip
- Role: wearable BLE clip, voice + sensor ingress
- SoC: Nordic nRF52840
- Sensors: 2 × MEMS mics, 6-axis IMU
- Radio: BLE 5.3
- Battery: 12 hours active, USB-C charging
- Body: anodized aluminum, magnetic clip, emerald accent
- Backer price: $39 early-bird, $49 list
- IP filing: THOX IP-008

### ThoxMini
- Role: pocketable RISC-V edge node
- SoC: Milk-V Duo (CV1800B), dual RISC-V @ 1 GHz
- Memory: 64 MB SRAM
- Storage: microSD
- Power: under 1 W sustained
- I/O: USB-C, 3 × UART, 2 × I2C, 4 × GPIO
- Software floor: ThoxOS Mini boots in under 3 seconds
- Backer price: $69
- IP filing: THOX IP-009

### ThoxAir
- Role: Wi-Fi cluster node, magnetic stackable
- SoC: BCM2835 (Pi Zero W class)
- Memory: 512 MB
- Radio: 2.4 GHz 802.11n + BT 4.1
- Stack: magnetic 6-pin pogo (5V, GND, UART_TX, UART_RX, I2C_SDA, I2C_SCL)
- Cluster firmware: MagStack Air (already running in ttracx/magstack-air-edge-rs P0.3)
- Backer price: $79, $349 for 4-pack Cluster Pack
- IP filing: THOX IP-010

### ThoxNova
- Role: desktop inference hub
- SoC: Intel N100 (4 cores, 4 threads, 6W TDP base)
- Memory: 16 GB DDR5
- Storage: 256 GB NVMe
- Network: Gigabit Ethernet, WiFi 6, BT 5.3
- I/O: USB-C, USB-A × 3, HDMI 2.0, audio jack
- Power: 12 V DC, passive cooling
- Software floor: hosts llama-server-sycl with Qwen3-7B, Gemma 3 12B, Llama 3.2 11B by default
- Backer price: $499
- IP filing: THOX IP-011

## Funding milestones

| Tier | Amount | What unlocks |
|---|---|---|
| Baseline | $250,000 | Production run begins, all rewards ship |
| Stretch 1 | $500,000 | ThoxOS Mini preflashed with agent fleet |
| Stretch 2 | $1,000,000 | MagStack Air firmware bundled on every ThoxAir |
| Stretch 3 | $1,500,000 | ThoxClip bone-conduction audio |
| Stretch 4 | $2,000,000 | ThoxNova discrete NPU module slot |
| Stretch 5 | $3,000,000 | Open hardware files (KiCad + STEP + Buildroot) under CERN-OHL-S |

## Where the money goes (chart data for the deck slide)

| Category | % | Notes |
|---|---|---|
| Manufacturing (PCBA, mechanical, packaging) | 38% | Largest line item, includes per-unit BOM |
| Certification (FCC, CE, UKCA, BLE SIG) | 22% | Required for shipping across US + EU + UK |
| Shipping + fulfillment | 18% | Hub in Reno + EU partner |
| Firmware integration + QA | 12% | Already largely paid; this is the tail end |
| Kickstarter + payment fees | 6% | Platform 5% + payments ~3% on US/EU |
| Reserves for supply-chain swaps | 4% | Hedges Milk-V/Pi vendor risk |

## Team bios (200 words each, ready to paste)

### Craig Ross (Inventor, Hardware)

Craig is the hardware lead for the THOX family. He has led mechanical + PCB design for the four device enclosures, the MagStack Air magnetic stack interconnect, and the THOX 5-tier memory hierarchy that informs every device's runtime budget. Prior to THOX, Craig spent a decade in consumer electronics, shipping field-rugged hardware across three continents. His name is on THOX IP-008 through IP-015. Craig insists that no THOX device ever overclaim what its silicon can do, which is why ThoxClip will never tell you it runs an LLM.

### Phamy Xaypanya (Inventor, Software + Campaign)

Phamy leads the THOX agent runtime, the cross-platform inference stack (vMLX on Apple Silicon, llama-server variants on NVIDIA + Intel, RKNPU2 on RV1103), and the MagStack Air cluster fabric. The four ThoxAir Pi-class boards in the Cluster Pack appear to clients as a single inference endpoint because of code Phamy wrote. She is on every THOX IP filing alongside Craig. Phamy runs the campaign, ships the firmware updates, and replies to every backer email within five business days.

## Boilerplate

### Short company description
`THOX.ai LLC is a Reno, NV company building a local-first personal AI runtime and the hardware family it runs on. Founded 2025. Software in alpha, hardware in EVT.`

### Long company description (paragraph)
`THOX.ai is the first end-to-end personal AI stack designed to live on silicon the user owns. The THOX agent runtime ships across every consumer compute platform: Apple Silicon, NVIDIA CUDA, Intel x86, browsers via WebGPU, and small ARM and RISC-V edge boards. The runtime is paired with a hardware family that brings the agent onto wearable, pocketable, wireless-cluster, and desktop form factors. Every device is honest about what its silicon can do. The smaller devices route to the larger ones. The whole family speaks the same agent contract.`

### One-paragraph campaign description (for press kits + LinkedIn)
`Kickstarter launches August 12, 2026 with a $250K baseline and four shipping devices: ThoxClip ($39 early-bird wearable), ThoxMini ($69 RISC-V pocket node), ThoxAir ($79 wireless cluster node, $349 for a 4-pack), and ThoxNova ($499 desktop hub). The campaign funds the first production run; the agent runtime is already in alpha across all five major compute platforms. THOX.ai is founded by Craig Ross and Phamy Xaypanya, both inventors on every THOX IP filing.`
