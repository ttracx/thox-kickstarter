---
title: ThoxMini User Manual
device: thoxmini
version: 1.0
date: 2026-08
---

# ThoxMini User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for backing ThoxMini. ThoxMini is the single-node edge compute
member of the THOX device fleet. Inside the brushed-finish enclosure is a
Luckfox Pico Mini B board running an on-device 0.5 TOPS neural processor
and the THOX runtime, ready to host private skills the moment you plug it in.

### What is in the box

- 1 x ThoxMini in THOX enclosure
- 1 x USB-A to USB-C cable, 1 m
- 1 x quick-start card
- 1 x THOX brand sticker
- 1 x spec card with the device serial number

The microSD or eMMC is pre-flashed at the factory; you do not need to
flash anything yourself.

### Safety highlights

- Operating range is 0 C to 50 C ambient. Above 50 C the NPU throttles.
- ThoxMini draws under 1 A at 5 V from any USB-C port. Use the supplied
  cable or any data-bearing USB-C cable.
- The enclosure is rated for skin contact but may run warm (45 C) under
  sustained load.
- Do not pry the enclosure open. The Luckfox board is press-fitted and
  the snap fingers are not designed for repeated cycles.

### What ThoxMini is for

- Bench-top private AI agent that runs without internet
- 14 pre-installed skills (summarize, translate, transcribe, classify,
  extract, redact, plan, route, draft, edit, lint, format, archive, sync)
- Member of a MagStack Cluster Dock when you add a few more nodes
- Headless: no display, no keyboard, accessed over USB-Ethernet, SSH,
  or Tailscale

\newpage

## Quick start

1. **Plug the USB-C cable** into ThoxMini's USB-C port and into your
   computer or a 5 V / 1 A USB power source.
2. **Wait 20 to 40 seconds** for the boot LED to settle into a slow pulse.
3. **Open a browser** to `http://172.32.0.70:18790` (the THOX agent gateway)
   or `http://thoxmini.local:18790` if mDNS resolves on your network.
4. **Send your first prompt.** The default model is the local thoxmini
   skill router. Responses begin under one second.

ThoxMini is also reachable over ADB from a Windows or macOS host that has
`adb` installed:

```
adb devices -l
adb shell
```

You get a root shell.

\newpage

## Full setup

### 1. Confirm the device identity

After first boot:

```
ssh root@172.32.0.70
cat /opt/thox/etc/device.json
```

You will see your device serial, product class (`ThoxMini`), and the
factory-set hostname (`thoxmini-luckfox`). Telemetry is `off` by default.

### 2. Set a custom hostname (optional)

```
hostnamectl set-hostname my-thoxmini-01
systemctl restart thoxymicro
```

### 3. Install your SSH public key

From your operator workstation:

```
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@172.32.0.70
```

Or with ADB if SSH is fussy:

```
type "$env:USERPROFILE\.ssh\id_ed25519.pub" | adb shell "cat >> /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys"
```

### 4. Join your Tailscale tailnet (optional)

ThoxMini ships with the Tailscale binary at `/usr/local/bin/tailscale`.
Bring up the daemon and join interactively:

```
systemctl enable --now tailscaled
tailscale up --hostname=$(hostname) --advertise-tags=tag:thoxmini --accept-routes
```

Note: the Luckfox kernel may not include `CONFIG_TUN`; the recovery is
to either install a TUN-enabled kernel from `ttracx/thox-luckfox-pico-mini-b`
or to operate over USB-Ethernet only. The runbook on the device at
`/root/THOXMINI_TAILSCALE_JOIN.md` walks through both.

### 5. Wire an offload key (optional)

The gateway boots with no input channels. To enable an Anthropic offload
channel:

```
nano /etc/thoxmini/thoxmini.env
# Add:  ANTHROPIC_API_KEY=sk-ant-...
systemctl restart thoxymicro
```

To enable a self-hosted offload (a ThoxNova on the same tailnet):

```
echo 'THOXMINI_OFFLOAD_URL=http://thoxnova-n100-01:11434' | tee -a /etc/thoxmini/thoxmini.env
systemctl restart thoxymicro
```

### 6. Exercise the skill set

ThoxMini ships with 14 skills. List them:

```
curl -s http://127.0.0.1:18790/skills | jq '.[] | .name'
```

Run the summarizer over a file:

```
curl -s -X POST http://127.0.0.1:18790/skill/summarize \
  -H 'content-type: application/json' \
  -d '{"text": "your text here"}'
```

### 7. Health check

The `thoxmini-health` helper reports gateway, NPU, and disk status:

```
/opt/thox/bin/thoxmini-health
```

A green run prints `[OK] gateway` on the last line and exits with code 0.

\newpage

## Troubleshooting

### Device does not enumerate

1. Try a different USB-C cable; charge-only cables will not enumerate.
2. The Luckfox composite device shows up as **three** USB interfaces in
   Windows: RNDIS, ADB, and a composite parent. If you see none, the
   board did not boot; reseat the SD or eMMC.
3. Windows reserves TCP 2222 for Hyper-V. If you `adb forward tcp:2222`
   it will silently fail. Use a higher port like 42222.

### Gateway returns "no channels enabled"

This is by design. `thoxymicro` starts cleanly with no API keys. Add
a key per step 5 above and restart.

### NPU not detected

```
ls /dev/rknpu
lsmod | grep rknpu
```

If `/dev/rknpu` is missing, reboot once. If it stays missing after a
reboot, the kernel module did not load; reflash from
`ttracx/thox-luckfox-pico-mini-b`.

### Cannot SSH but ADB works

The Windows RNDIS interface often stays on APIPA. Two fixes:

- Static IP on the host: `netsh interface ipv4 set address name="Ethernet 2" static 172.32.0.1 255.255.0.0`
- ADB port forward: `adb forward tcp:42222 tcp:22` then `ssh -p 42222 root@127.0.0.1`

### Out of memory

ThoxMini has 64 MB of RAM (about 56 MB usable). The agent is configured
with `GOMEMLIMIT=28MiB` so it cannot starve the kernel. If a heavier
workload OOMs, switch to a smaller model or offload to a larger node.

### Factory restore

```
ssh root@172.32.0.70
/opt/thox/bin/thoxmini-firstboot --reset
reboot
```

This wipes user state, regenerates identity, and reboots into the
factory image.

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants ThoxMini against defects in materials and workmanship
for one (1) year from the date of shipment. The warranty does not cover
damage from drops, immersion, overvoltage, unauthorized modification,
or use outside the documented operating conditions.

Make a claim by emailing `dev@thox.ai` with your order number, a photo
of the issue, and the device serial from the spec card or
`/opt/thox/etc/device.json`.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/thoxmini`
- Community: `https://github.com/ttracx/thoxymicro/discussions`

### Telemetry opt-out

Telemetry ships **off**. To verify:

```
grep telemetry /opt/thox/etc/device.json
# expected: "telemetry": "off"
```

The gateway will refuse to send any prompt or response to the THOX
mothership at any time. The only outbound traffic from a default
ThoxMini is the Tailscale control channel (if joined) and your
explicitly configured offload endpoint.

### License summary

- Ubuntu 22.04 base image: a mix of GPL-2.0, LGPL-2.1, BSD, and MIT
- Rockchip MPI/ISP/NPU userland: Rockchip OEM license, redistributable
- thoxymicro Go agent: Apache-2.0
- THOX models: Apache-2.0 (subject to upstream base-model terms)

The full per-package license set is on the device at
`/usr/share/doc/thoxmini/LICENSES.md`.

\newpage

## Open source notice

| Component | License | Source |
|---|---|---|
| Ubuntu 22.04 (armv7l) | Various (GPL, LGPL, BSD, MIT) | ubuntu.com |
| Linux kernel 5.10 + Rockchip patches | GPL-2.0 | kernel.org + rockchip-linux |
| systemd | LGPL-2.1 | systemd.io |
| OpenSSH | BSD-2-Clause | openssh.com |
| Android Debug Bridge (adbd) | Apache-2.0 | android.googlesource.com |
| Tailscale | BSD-3-Clause | tailscale.com |
| thoxymicro (THOX) | Apache-2.0 | github.com/ttracx/thoxymicro |
| llama.cpp | MIT | github.com/ggerganov/llama.cpp |
| ThoxMicro-125M | Apache-2.0 | github.com/ttracx/thox-micro-125m |
| ThoxLLM-327M-v2 | Apache-2.0 | huggingface.co/Thox-ai (private) |
| ThoxGem-E4B | Apache-2.0 (Gemma terms) | thox-gemma4 Phase B output |
| RKNN runtime | Rockchip OEM license | rockchip-linux/rknpu |

This product complies with FCC Part 15 Class B (declaration on file)
and CE marking (declaration on file).

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
