# FAQ

Eight questions, paste verbatim into the Kickstarter FAQ section.

## Will THOX work without an internet connection?

Yes. The whole point. ThoxClip pairs to a local THOX node over BLE; the local node routes to ThoxNova on your LAN; ThoxNova hosts the LLM locally. The only thing that needs the internet is firmware updates, and you can defer those.

## Can I bring my own LLM?

Yes. ThoxNova ships with three default GGUF models (Qwen3-7B, Gemma 3 12B, Llama 3.2 11B). The agent runtime supports any GGUF that llama.cpp supports. Swap the model file, restart the service.

## Is this open source?

The agent runtime is MIT or Apache-2.0 depending on the module. The Buildroot configs ship with every device. At the $3M stretch goal, KiCad schematics and STEP enclosure files are published under CERN-OHL-S.

## What if Milk-V or the Pi vendor disappears?

We have alternate silicon for every device. ThoxMini falls back to the Luckfox Pico Mini B (RV1103); ThoxAir falls back to the Pi Zero 2 W. Our firmware already runs on both alternates in alpha today.

## Can I cluster more than four ThoxAir nodes?

Yes. The MagStack Air cluster scales to eight ThoxAir nodes on one shelf with a single 5V/4A USB-C input. Beyond eight, WiFi airtime becomes the bottleneck and you should add a ThoxNova as a hub.

## Why is ThoxNova so much more expensive than the other devices?

ThoxNova is the only device in the family that actually hosts an LLM. The N100 plus 16 GB DDR5 plus a 256 GB NVMe plus a passive aluminum case is the BOM. The other three devices are honest about what they cannot do, which is why they can be cheap.

## Will ThoxClip work without a paired THOX node?

ThoxClip records locally for up to 30 minutes of audio and wakes on the wake-word, but the agent flows require a paired ThoxMini, ThoxAir, or ThoxNova within BLE range.

## What about privacy?

No cloud egress by default. The ThoxNova-hosted dashboard shows every outbound request and lets you allow or deny each destination. We will publish the threat model alongside the firmware repo at campaign launch.

