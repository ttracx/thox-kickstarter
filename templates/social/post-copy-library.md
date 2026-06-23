# Post Copy Library

Paste-ready social copy, organized by content pillar, with per-channel variants. All numbers
are from [docs/CAMPAIGN_INFO.md](../../docs/CAMPAIGN_INFO.md) — if one changes, fix it there and
regenerate here. Voice rules: see [SOCIAL_MEDIA_CAMPAIGN.md](../../docs/SOCIAL_MEDIA_CAMPAIGN.md) §3.

> `{prelaunch_url}` / `{kickstarter_url}` / `{first_name}` are slots. CTA is phase-locked:
> pre-launch = "Notify me," launch onward = "Back us." One CTA per post.

---

## PRODUCT pillar

### ThoxClip
- **X / Bluesky / Mastodon:**
  `ThoxClip: an anodized aluminum wearable that listens, taps, and forwards. Dual mics, 6-axis IMU, BLE 5.3, 12-hour battery. No screen, no LLM on board — it routes to whichever THOX node you pair it with. Honest about what it is. #THOX #PersonalAI`
- **LinkedIn:**
  `Meet ThoxClip — the wearable that opens the THOX family.\n\nDual MEMS mics. 6-axis IMU. BLE 5.3. 12 hours on a charge. Magnetic clip, anodized aluminum, one emerald accent.\n\nWhat it does NOT do: run an LLM. ThoxClip listens, classifies a tap, detects a fall, and forwards everything else to a THOX node. We will never tell you a clip runs a model it can't.\n\nYour AI. Your Data. Your Rules.`
- **Instagram / TikTok caption:**
  `The magnetic snap is real. 🟢 ThoxClip — listens, taps, forwards. 12h battery. Pairs with any THOX node. #THOX #PersonalAI #wearabletech #gadgets`

### ThoxMini
- **X / Bluesky / Mastodon:**
  `ThoxMini: a pocketable RISC-V edge node. Milk-V Duo, sub-1W, boots ThoxOS Mini in under 3 seconds. Honest about what 64 MB can and cannot do. The cheapest way into the THOX family. #THOX #RISCV #EdgeAI`
- **LinkedIn:**
  `ThoxMini is the cheapest THOX node — and the most honest.\n\nMilk-V Duo dual RISC-V at 1 GHz. Under 1 watt sustained. ThoxOS Mini boots in under 3 seconds. 64 MB of SRAM, and we'll tell you exactly what that can and can't do.\n\nReal silicon. No rounding up.`
- **Instagram / TikTok:**
  `Boots in under 3 seconds. ⚡ RISC-V in your pocket, under 1 watt. ThoxMini. #THOX #RISCV #edgecomputing #linux`

### ThoxAir
- **X / Bluesky / Mastodon:**
  `ThoxAir: a Pi-class wireless node that joins a cluster the moment it sees one. Magnetic stack interconnect, MagStack Air firmware preinstalled. $79 each, $349 for a 4-pack that runs a sub-1B model across all four boards. #THOX #EdgeAI`
- **LinkedIn:**
  `ThoxAir snaps together.\n\nFour ThoxAir nodes, a magnetic stack base, six pogo pins each (5V, GND, UART, I2C), and MagStack Air firmware — and they appear to clients as ONE inference endpoint. The cluster runs a sub-1B model split across all four boards via llama.cpp RPC layer pipelining.\n\nEdge AI that you can hold in one hand.`
- **Instagram / TikTok:**
  `Snap. Snap. Snap. Snap. A 4-node AI cluster you stack with magnets. 🟣 ThoxAir Cluster Pack. #THOX #EdgeAI #homelab #selfhosted`

### ThoxNova
- **X / Bluesky / Mastodon:**
  `ThoxNova: the desktop hub that hosts the LLM locally. Intel N100, 16 GB DDR5, 256 GB NVMe, passive cooling, llama-server-sycl on the iGPU. Runs Qwen3-7B, Gemma 3 12B, Llama 3.2 11B out of the box. #THOX #LocalLLM #SelfHosted`
- **LinkedIn:**
  `ThoxNova is where the model actually lives.\n\nIntel N100. 16 GB DDR5. 256 GB NVMe. Passive cooling — no fan. It hosts the LLM locally with llama-server-sycl on the Intel iGPU, and ships running Qwen3-7B, Gemma 3 12B, and Llama 3.2 11B by default. There's a dock for one ThoxClip on top.\n\nYour model, your desk, your data. Nothing leaves the house.`
- **Instagram / TikTok:**
  `A local LLM box that runs silent. 🟢 No fan. No cloud. ThoxNova. #THOX #LocalLLM #selfhosted #homelab`

---

## PROOF pillar

- **X / Bluesky / Mastodon:**
  `"Boots in under 3 seconds" isn't marketing. It's a timer. Watch ThoxMini come up cold. 👇 #THOX #RISCV`
  `[attach: prelaunch_proof_thoxmini_9x16 video]`
- **LinkedIn:**
  `We don't claim "fast." We show a clock.\n\nHere's ThoxMini booting ThoxOS Mini cold, in under 3 seconds, on a sub-1W RISC-V chip. The runtime stack behind it is already in alpha across Apple Silicon, NVIDIA, Intel, browsers via WebGPU, and small ARM/RISC-V boards.\n\nProof beats adjectives.`
- **Mastodon / Reddit angle:**
  `Sub-3s cold boot on a Milk-V Duo (CV1800B), ThoxOS Mini. 64 MB SRAM, under 1W. AMA on the runtime — vMLX on Apple Silicon, llama-server variants on NVIDIA/Intel, RKNPU2 on RV1103. #RISCV`

---

## THESIS pillar

- **X / Bluesky / Mastodon:**
  `Personal AI shouldn't live on someone else's computer. THOX puts the agent on silicon you own — a wearable, a RISC-V node, a Wi-Fi cluster, a desktop hub. Your AI. Your Data. Your Rules. #THOX #LocalAI`
- **LinkedIn (founder POV):**
  `A thought we keep coming back to:\n\nEvery "personal" AI assistant today runs on infrastructure you don't own, trained on data you can't see, billed by the token. That's not personal. That's rented.\n\nTHOX is the other path: one agent runtime that runs on silicon YOU own — across Apple Silicon, NVIDIA, Intel, browsers, and small ARM/RISC-V boards — paired with a hardware family that brings it onto your body, your pocket, your desk.\n\nYour AI. Your Data. Your Rules. That's the whole thesis.\n\n— Phamy & Craig`
- **Mastodon / Reddit angle:**
  `Local-first personal AI, end to end. Runtime ships across 5 compute platforms; hardware family (ThoxClip/Mini/Air/Nova) brings it onto silicon you own. No tokens, no telemetry you didn't opt into. #LocalLLM #SelfHosted`

---

## PEOPLE pillar

- **X / Bluesky / Mastodon:**
  `Two inventors, four devices, one agent contract. Craig builds the hardware so it never overclaims; Phamy builds the runtime so four Pi-class boards look like one endpoint. Both names on every THOX IP filing. #THOX`
- **LinkedIn:**
  `The rule Craig won't break: no THOX device ever overclaims what its silicon can do. That's why ThoxClip will never tell you it runs an LLM.\n\nThe thing Phamy ships: a runtime where four ThoxAir boards appear to clients as a single inference endpoint, and a backer reply lands within five business days, every time.\n\nThat's the company. Honest hardware, real software, two people who answer their email.`
- **Instagram / TikTok:**
  `Real workbench. Real EVT units. Real solder. 🛠️ Behind the THOX build. #THOX #hardware #buildinpublic #startup`

---

## CAMPAIGN pillar (launch onward)

- **X / Bluesky / Mastodon (live):**
  `We're LIVE on Kickstarter. Four devices, one agent, honest claims.\n\n• $39 early-bird ThoxClip (only 500)\n• $69 ThoxMini\n• $79 ThoxAir / $349 Cluster Pack\n• $499 ThoxNova\n\nBack us 👇 {kickstarter_url} #THOX #Kickstarter`
- **LinkedIn (live):**
  `It's live. The THOX family is on Kickstarter.\n\nFour devices, one agent, $250K goal, 30 days. The first 500 ThoxClips are $39 — after that, $49. The Founders Pack is capped at 100.\n\nIf you want personal AI on silicon you own, this is the moment to back it.\n\n{kickstarter_url}`
- **Instagram / TikTok (live):**
  `WE'RE LIVE. 🟢 Link in bio. First 500 ThoxClips are $39. #THOX #Kickstarter #PersonalAI`

### Stretch-goal progress (sustain)
- **X:**
  `${remaining} to go and ThoxOS Mini ships preflashed with the agent fleet on every node ($500K stretch). The thermometer is moving. {kickstarter_url} #THOX`

### Final hours (close)
- **X:**
  `FINAL 48 HOURS. The THOX family Kickstarter closes {close_time}. After this, the $39 early-bird and the 100-unit Founders Pack are gone. {kickstarter_url} #THOX #Kickstarter`
- **Instagram / TikTok:**
  `48 hours left. ⏳ Then the early-bird is gone for good. Link in bio. #THOX #Kickstarter #lastchance`

---

## Reply / engagement snippets (social, mirrors templates/reply-snippets.md)

- **"512 MB can't run a real model":**
  `Correct — and we don't claim it does. ThoxAir is a cluster node; four of them split a sub-1B model via llama.cpp RPC. The big models live on ThoxNova. Honest about what each tier can do is the whole point. Details: {kickstarter_url}`
- **"Is my data really local?":**
  `Yes. ThoxNova hosts the LLM on your desk with llama-server-sycl — nothing leaves the house unless you send it. Your AI. Your Data. Your Rules. Full FAQ: {kickstarter_url}`
- **"When does it ship?":**
  `ThoxClip Jan 2027, ThoxMini + ThoxAir Feb, Cluster Pack Mar, ThoxNova Apr, bundles May 2027. If we slip >30 days on any tier we email you with a full refund offer. Timeline's on the page.`
- **"Why RISC-V?":**
  `Open ISA, sub-1W, and it boots ThoxOS Mini in under 3 seconds on a Milk-V Duo. ThoxMini is the cheapest honest way into the family. {kickstarter_url}`

---

## Hashtag sets (copy as a unit)

- **Default:** `#THOX #PersonalAI #LocalAI`
- **RISC-V / Mini:** `#THOX #RISCV #EdgeAI`
- **Self-host / Nova:** `#THOX #LocalLLM #SelfHosted`
- **Campaign (live only):** `#THOX #Kickstarter #PersonalAI`
- **Instagram extended:** `#THOX #PersonalAI #LocalAI #homelab #selfhosted #gadgets #buildinpublic #hardware`

Keep to 3 tags on X/Bluesky/LinkedIn; up to 8 on Instagram/TikTok.
