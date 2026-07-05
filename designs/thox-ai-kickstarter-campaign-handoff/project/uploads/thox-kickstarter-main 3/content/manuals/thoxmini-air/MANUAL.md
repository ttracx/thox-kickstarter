---
title: ThoxMini Air User Manual
device: thoxmini-air
version: 1.0
date: 2026-08
---

# ThoxMini Air User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for backing ThoxMini Air. ThoxMini Air takes the compute core
of ThoxMini, drops in a small LiPo cell for tetherless operation, and
adds a magnetic ring on top so each unit clicks neatly onto the next.
That last detail is the headline: a stack of Airs becomes a
self-cooled compute cluster you can carry in one hand.

### What is in the box

- 1 x ThoxMini Air node in v4 enclosure (matte black back, light gray halo ring)
- 1 x USB-A to USB-C cable, 1 m
- 1 x quick-start card
- 1 x THOX brand sticker
- 1 x spec card with the device serial number
- 1 x Liter 602530 500 mAh LiPo cell (pre-installed and pre-charged)

### Safety highlights

- The LiPo cell is pre-installed and connected. Do not pry the enclosure
  open. The cell is small (500 mAh) but a punctured LiPo can vent flame.
- Do not charge in an enclosed bag overnight. ThoxMini Air has overcharge
  protection but treat any LiPo with respect.
- Operating range is 0 C to 45 C ambient.
- The magnetic halo ring is strong (N52). Keep it 100 mm from credit
  cards, hard drives, mechanical watches, and medical implants.
- The enclosure is not weather-sealed. Keep it dry.

### What ThoxMini Air is for

- Tetherless private AI agent that runs for roughly 90 minutes off the
  internal cell on a typical workload
- All 14 ThoxMini skills plus the cluster-aware skill stub
- Cluster member: stack 4 to 8 Airs onto a MagStack Cluster Dock and the
  units self-discover and load-balance
- Same compute, same gateway, same web UI as ThoxMini

\newpage

## Quick start

1. **Unbox.** The cell is pre-installed and pre-charged.
2. **Single-tap the side button** to power on. The halo ring breathes
   white during boot. About 25 seconds.
3. **Plug the USB-C cable** into your computer (data + charge) or into
   any 5 V / 1 A USB power source for charge only.
4. **Open a browser** to `http://172.32.0.70:18790` (USB-connected) or
   `http://thoxmini-air.local:18790` (mDNS on your LAN).
5. **Send your first prompt.** Same agent and skills as ThoxMini.

To stack with other Airs: hold a second Air above this one until the
two halo rings click. Repeat. The bottom-most Air handles power if
sitting on a Cluster Dock; otherwise each Air uses its own cell.

\newpage

## Full setup

### 1. Compute side: follow the ThoxMini runbook

The Air variant shares its compute, OS, and agent layer with ThoxMini.
For per-unit OS detail, identity, SSH key install, Tailscale, and the
skill catalog, follow the **ThoxMini User Manual** section "Full setup"
in full. Everything from "Confirm the device identity" through "Health
check" applies one for one.

### 2. Confirm the cell is wired

```
ssh root@172.32.0.70
cat /sys/class/power_supply/battery/uevent
```

You should see `POWER_SUPPLY_STATUS`, `POWER_SUPPLY_CAPACITY`, and
`POWER_SUPPLY_VOLTAGE_NOW`. If the file is missing, the JST-PH-2.0
cell pigtail came loose in shipping; contact `dev@thox.ai`.

### 3. Enable cluster discovery (only if you have more than one Air)

```
echo 'THOXMINI_CLUSTER=on' | tee -a /etc/thoxmini/thoxmini.env
systemctl restart thoxymicro
```

Each Air will broadcast on the USB-Ethernet link and on the tailnet
(if joined). Within 10 seconds of cluster boot, the gateway on each
Air exposes a `/cluster/peers` endpoint listing every reachable Air.

### 4. Stack onto a MagStack Cluster Dock

If you also have a MagStack Cluster Dock:

1. Place the Dock on a flat surface; the front spec plate faces you.
2. Set the first Air face-down so its halo ring drops into the well.
   Plug the USB-C cable from the manifold into the Air.
3. Stack the next Air on top; the halo rings snap together. Plug its
   USB-C cable. Repeat for 4 to 8 Airs.
4. The cluster powers from the USB-C hub the manifold cables run to.
5. Drop the cap over the topmost halo ring.

### 5. Halo ring behavior

| Pattern | Meaning |
|---|---|
| Slow breathe white | Booting |
| Solid soft white | Idle, healthy |
| Solid cyan | Active inference |
| Slow pulse magenta | Talking to a peer in a cluster |
| Fast blink red | Fault; check `journalctl -u thoxymicro` |
| Off | Powered down or cell empty |

### 6. Charging

Plug any 5 V / 1 A USB-C source. The halo ring stays soft white while
charging and the gateway is still reachable. Full charge from empty
takes about 90 minutes.

### 7. Hard power down

Hold the side button for 6 seconds. The halo ring fades to off. Use
this before storing for more than a week.

\newpage

## Troubleshooting

### Halo ring stays off after pressing the button

1. The cell may be flat. Plug a USB-C cable; the ring should breathe
   white within 5 seconds.
2. Hold the side button for 10 seconds to force a deep reset.
3. If still nothing, contact `dev@thox.ai`. Do not pry the case open.

### Halo ring blinks red

```
ssh root@172.32.0.70
journalctl -u thoxymicro -n 200
```

Common causes: NPU not enumerated (reboot), OOM (switch model),
disk full (`df -h /`).

### Stack does not self-discover

1. Confirm `THOXMINI_CLUSTER=on` is set on every Air.
2. On each Air check `curl http://127.0.0.1:18790/cluster/peers`.
3. If peers are missing, the USB-Ethernet link between Airs may be
   broken; confirm the Cluster Dock USB-C manifold cables are seated
   in each Air.

### Charging stalls partway

The cell stops at ~80% if the case is hotter than 40 C; this is the
charge-management IC protecting the cell. Move to a cooler surface,
or detach the bottom Air from a hot stack, and the charge resumes.

### Two Airs will not snap together

The halo magnets are polarized: each ring has a "north" and "south"
face. The factory orientation snaps every Air to the next. If you
disassembled a stack and reseated a single ring backwards, flip it.

### Factory restore

Same as ThoxMini:

```
ssh root@172.32.0.70
/opt/thox/bin/thoxmini-firstboot --reset
reboot
```

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants ThoxMini Air against defects in materials and
workmanship for one (1) year from the date of shipment. The warranty
covers the enclosure, the magnet ring, the JST cell pigtail, and the
compute board. It does **not** cover the LiPo cell beyond 6 months
(consumable), drops, immersion, overvoltage, unauthorized modification,
or use outside the documented operating conditions.

Make a claim by emailing `dev@thox.ai` with your order number, a
photo of the issue, and the serial number from the spec card or
`/opt/thox/etc/device.json`.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/thoxmini-air`
- Community: `https://github.com/ttracx/magstack-air/discussions`

### Telemetry opt-out

Telemetry ships **off**. See ThoxMini manual for the same verification
steps.

### License summary

Identical to ThoxMini: GPL-2.0 (kernel + Ubuntu userland), BSD-3-Clause
(Tailscale), Apache-2.0 (thoxymicro + agents + THOX models), MIT
(llama.cpp + UI assets), Rockchip OEM (RKNN runtime). Full text on
device at `/usr/share/doc/thoxmini-air/LICENSES.md`.

\newpage

## Open source notice

| Component | License | Source |
|---|---|---|
| Ubuntu 22.04 (armv7l) | Various | ubuntu.com |
| Linux kernel 5.10 + Rockchip patches | GPL-2.0 | rockchip-linux |
| systemd | LGPL-2.1 | systemd.io |
| OpenSSH | BSD-2-Clause | openssh.com |
| adbd | Apache-2.0 | android.googlesource.com |
| Tailscale | BSD-3-Clause | tailscale.com |
| thoxymicro (THOX) | Apache-2.0 | github.com/ttracx/thoxymicro |
| magstack-air cluster crate (THOX) | Apache-2.0 | github.com/ttracx/magstack-air |
| llama.cpp | MIT | github.com/ggerganov/llama.cpp |
| ThoxMicro-125M | Apache-2.0 | github.com/ttracx/thox-micro-125m |
| ThoxLLM-327M-v2 | Apache-2.0 | huggingface.co/Thox-ai (private) |
| ThoxGem-E4B | Apache-2.0 (Gemma terms) | thox-gemma4 Phase B |
| RKNN runtime | Rockchip OEM | rockchip-linux/rknpu |

The v4 enclosure design is published under Apache-2.0 at
`ttracx/thox-3dprint-kit/devices/thoxmini-air`. The MagStack ring
geometry is filed under IP-013; the printed reference design is
permissively licensed.

This product complies with FCC Part 15 Class B (declaration on file)
and CE marking (declaration on file). The LiPo cell ships in the
50%-charged state per IATA PI 967 Section II air-shipment rules.
Recycle exhausted cells at any cell-recycling drop-off (Call2Recycle
in the US; municipal hazmat in the EU). Do not throw in household
trash.

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
