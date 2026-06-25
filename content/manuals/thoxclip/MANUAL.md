---
title: ThoxClip User Manual
device: thoxclip
version: 1.0
date: 2026-08
---

# ThoxClip User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for backing ThoxClip. This pocket-class compute node is the smallest
member of the THOX device fleet and the easiest way to put a private,
local-first AI assistant on your bench, your bag, or the lapel of a lab coat.

### What is in the box

- 1 x ThoxClip (Raspberry Pi Zero 2 W inside a THOX brand enclosure)
- 1 x microSD card, pre-flashed with the ThoxClip image
- 1 x USB-A to USB micro-B cable (data and power)
- 1 x quick-start card (this manual replaces it for digital backers)
- 1 x THOX brand sticker

### Safety highlights

- ThoxClip runs at up to 70 C under sustained load. The enclosure is rated
  for skin contact, but avoid leaving it against bare skin during long
  inference sessions.
- Use only the supplied cable, or a known-good USB micro-B data cable
  rated for at least 1.5 A. Charge-only cables will not work.
- ThoxClip is not weather-sealed. Keep it dry.
- Do not open the enclosure with the device powered. There are no
  user-serviceable parts inside.

### What ThoxClip is for

ThoxClip is a Raspberry Pi Zero 2 W with the THOX runtime preinstalled.
It boots as a USB-Ethernet device, gives you a private LAN with the clip
on the other end, and runs the thoxymicro agent. Pair it with your
laptop, your phone over USB-OTG, or a desktop and you get an offline
chat agent + skill runner that never leaves your physical possession.

\newpage

## Quick start

Five steps, under two minutes:

1. **Insert the microSD card** into the slot on the underside of the
   ThoxClip. It is pre-flashed; do not reformat it.
2. **Plug the supplied USB cable** into the port labeled `USB` on the
   right side of the device, then into your computer. Use the right-side
   port only; the left port (`PWR IN`) is power-only and will not boot
   the clip.
3. **Wait 30 to 60 seconds.** The green ACT LED will blink while the
   board boots. Your computer will discover a new USB Ethernet device.
4. **Open a browser** to `http://thoxclip.local` (macOS, Linux, recent
   Windows) or to `http://192.168.7.1` if the hostname does not resolve.
5. **Start chatting.** The default model is the ThoxMicro-125M router;
   pick a larger loadout from the model menu when you want depth over
   speed.

You can now disconnect at any time. ThoxClip writes to the SD card
synchronously, so a yanked cable will not corrupt state.

\newpage

## Full setup

### 1. First-boot identity

The first time you boot a brand-new ThoxClip the agent generates a
device identity at `/etc/thox/identity.toml` and a fresh SSH host key.
This takes about 15 seconds and only happens once.

If you ever need to factory-reset, hold the small button on the
underside for 10 seconds while powered. The next boot will regenerate
identity from scratch.

### 2. Set a hostname

The default hostname is `thoxclip-XXXX` where `XXXX` is the last four
characters of the MAC. To customize:

```
ssh thox@thoxclip.local
sudo hostnamectl set-hostname my-clip-01
sudo systemctl restart thoxymicro
```

### 3. Join your Tailscale tailnet (optional)

ThoxClip ships with the Tailscale binary installed but not joined.
On the device:

```
sudo tailscale up --hostname=$(hostname) --advertise-tags=tag:thoxclip
```

Visit the URL Tailscale prints in your browser to approve the join.
The clip is now reachable from anywhere you have a tailnet device.

### 4. Install the THOX shell banner

The banner is installed at the factory, but if you reflash you can
restore it:

```
echo 'echo "  THOX Clip - Pi Zero 2 W"' | sudo tee /etc/profile.d/thoxclip.sh
sudo chmod 644 /etc/profile.d/thoxclip.sh
```

### 5. Pick a model loadout

ThoxClip ships with three quantized models on the SD card. Switch
between them in the web UI under Settings > Model, or via SSH:

```
thoxctl model use thoxmicro-125m       # fastest, default
thoxctl model use thoxllm-327m-v2      # better quality
thoxctl model use thoxgem-e4b-q4_k_m   # best quality, slower
```

The 4B model runs at roughly 2 to 4 tokens per second on the Pi Zero 2 W.
Use it for short, careful queries.

### 6. Run your first skill

A skill is a small bundle of prompt, tools, and policy that the agent
loads on demand. List installed skills:

```
thoxctl skills list
```

Try the built-in summarizer:

```
echo "ThoxClip is the pocket compute node in the THOX fleet." | thoxctl skill run summarize
```

### 7. Wire up an LLM API key (optional)

If you want the clip to fall back to a hosted model for hard queries,
add a key to `/etc/thoxmini/thoxmini.env`:

```
sudo nano /etc/thoxmini/thoxmini.env
# Add: ANTHROPIC_API_KEY=sk-ant-...
sudo systemctl restart thoxymicro
```

The clip never sends prompts to the remote model unless you explicitly
enable the offload channel in the web UI.

\newpage

## Troubleshooting

### The green ACT LED never blinks

The Pi did not boot. Common causes, in order:

1. **Cable on the wrong port.** The left micro-USB port is power-only.
   Move to the right-side `USB` port.
2. **microSD not seated.** Push it in until you hear a click.
3. **Charge-only cable.** Try a different known-good USB micro-B cable.
4. **PSU undersized.** Pi Zero 2 W needs a sustained 1.2 A at 5 V.
   Switch to a 2 A wall adapter or a laptop USB-A port (not a hub).

### Computer does not see a USB Ethernet device

1. Wait the full 60 seconds; first-boot identity setup runs before the
   USB Ethernet device comes up.
2. On Windows, open Device Manager and look for a second "Remote NDIS
   based Internet Sharing Device". The first one is often the host's
   built-in adapter, not ThoxClip.
3. On macOS, look for `enX` in `ifconfig`. If a new interface appeared,
   you are connected; just point your browser at `http://192.168.7.1`.

### Cannot SSH

```
ssh-keygen -R thoxclip.local
ssh thox@thoxclip.local
```

Default password on a factory image is `thox-clip-init`. Change it on
first login with `passwd`.

### Web UI loads but the chat does not respond

```
ssh thox@thoxclip.local
systemctl status thoxymicro
sudo systemctl restart thoxymicro
```

Watch logs with `journalctl -u thoxymicro -f` to see what failed.

### Factory restore

Power on, then hold the underside button for 10 full seconds. The
ACT LED will blink rapidly to confirm. The next boot wipes any
user-installed skills and resets identity.

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants ThoxClip against defects in materials and workmanship
for one (1) year from the date of shipment. Within that period we will,
at our option, repair or replace any unit found defective. The warranty
does not cover damage from drops, immersion, overvoltage, unauthorized
modification, or use outside the documented operating conditions.

To make a claim, email `dev@thox.ai` with your order number, a photo
of the issue, and the device serial number printed inside the SD slot.
We respond within 3 business days.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/thoxclip`
- Community: `https://github.com/ttracx/thoxymicro/discussions`

### Telemetry opt-out

ThoxClip ships with telemetry **off** by default. The agent records
nothing about your prompts or your environment. The only outbound
network activity is your Tailscale connection (if you joined a
tailnet) and any model API offload you explicitly enabled.

To confirm the telemetry setting:

```
grep telemetry /opt/thox/etc/device.json
# expected: "telemetry": "off"
```

### License summary

- Linux kernel and userland: GPL-2.0
- Tailscale daemon: BSD-3-Clause
- thoxymicro agent: Apache-2.0
- THOX models: Apache-2.0 (subject to upstream base-model terms)
- Web UI assets: MIT

Full text of every license is on the SD card at
`/usr/share/doc/thoxclip/LICENSES.md` and at
`https://docs.thox.ai/thoxclip/licenses`.

\newpage

## Open source notice

ThoxClip is built on a stack of open-source components. The headline
list is below; the SD card carries the full dependency tree and license
text at `/usr/share/doc/thoxclip/LICENSES.md`.

| Component | License | Source |
|---|---|---|
| Linux kernel 6.6 LTS | GPL-2.0 | kernel.org |
| Raspberry Pi OS Lite (64-bit) | Various | raspberrypi.com |
| systemd | LGPL-2.1 | systemd.io |
| OpenSSH | BSD-2-Clause | openssh.com |
| Tailscale | BSD-3-Clause | tailscale.com |
| thoxymicro (THOX) | Apache-2.0 | github.com/ttracx/thoxymicro |
| llama.cpp | MIT | github.com/ggerganov/llama.cpp |
| ThoxMicro-125M | Apache-2.0 | github.com/ttracx/thox-micro-125m |
| ThoxLLM-327M-v2 | Apache-2.0 | huggingface.co/Thox-ai (private) |
| ThoxGem-E4B | Apache-2.0 (Gemma terms) | thox-gemma4 Phase B output |

THOX.ai contributes back to several of these projects. See
`https://github.com/ttracx` for the public repositories.

This product complies with FCC Part 15 Class B (declaration on file)
and CE marking (declaration on file). Do not modify the device in
ways that defeat its EMI shielding; doing so may void compliance.

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
