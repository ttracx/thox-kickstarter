---
title: ThoxNova User Manual
device: thoxnova
version: 1.0
date: 2026-08
---

# ThoxNova User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for backing ThoxNova. ThoxNova is the workstation-class compute
node in the THOX device fleet. Inside the chassis is a LattePanda Sigma
or Mu N100 single-board computer running Ubuntu 24.04 LTS, an Intel UHD
iGPU with the full SYCL + OpenVINO + Vulkan compute stack, and the THOX
runtime. It is designed to sit on a desk, on a server shelf, or on the
edge of a small lab as the local offload target for one or more ThoxMini
or ThoxClip clients.

### What is in the box

- 1 x ThoxNova in THOX chassis
- 1 x NVMe M.2 SSD (>= 64 GB, pre-installed and pre-flashed)
- 1 x 12 V / 5 A barrel-jack power supply with regional plug
- 1 x USB-A to USB-C cable for console rescue (1 m)
- 1 x quick-start card
- 1 x THOX brand sticker
- 1 x spec card with the device serial number

### Safety highlights

- ThoxNova uses a 12 V / 5 A barrel-jack PSU. Use only the supplied PSU
  or a known-good replacement at the same voltage and ampacity.
- The chassis vents through the rear and the underside; do not block
  these openings or operate on carpet, foam, or any soft surface.
- Operating range is 0 C to 40 C ambient.
- The chassis is not weather-sealed.
- There are no user-serviceable parts inside. Opening the chassis voids
  the warranty.

### What ThoxNova is for

- Desk-class local AI offload target for a fleet of smaller THOX devices
- Hosted runtime for 3B to 13B parameter models on the Intel iGPU stack
  (SYCL / OpenVINO / Vulkan; no CUDA needed)
- Always-on Tailscale node so your other THOX devices can reach it from
  anywhere
- Ollama server pre-installed for quick model swap and smoke-testing

\newpage

## Quick start

1. **Plug** the 12 V PSU into the rear barrel jack and into wall power.
   ThoxNova powers on automatically when energized; no front button.
2. **Connect Ethernet** to your switch or router. ThoxNova uses DHCP
   on the `eno1` port by default.
3. **Wait 45 to 60 seconds** for first boot to settle. The front LED
   transitions from amber (boot) to steady green (ready).
4. **Find the IP.** From your laptop:

   ```
   ping thoxnova-n100-01.local
   ```

   Or check your router's DHCP lease table for a device named
   `thoxnova-n100-01`.

5. **SSH in.**

   ```
   ssh thox@thoxnova-n100-01.local
   ```

   The default password is `thox-nova-init` and you will be prompted
   to change it on first login.

ThoxNova is now serving the THOX gateway on port 8088, an Ollama
endpoint on `127.0.0.1:11434`, and SSH on port 22.

\newpage

## Full setup

### 1. Change the default password

```
ssh thox@thoxnova-n100-01.local
passwd
```

### 2. Install your SSH public key

From your operator workstation:

```
ssh-copy-id -i ~/.ssh/id_ed25519.pub thox@thoxnova-n100-01.local
```

Then disable password SSH:

```
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

### 3. Set a custom hostname (optional)

```
sudo hostnamectl set-hostname my-thoxnova-01
sudo nano /etc/thox/identity.toml   # update the hostname field
sudo systemctl restart thoxnova-agent
```

### 4. Join your Tailscale tailnet

Tailscale is installed but not joined. From the ThoxNova:

```
sudo tailscale up \
  --hostname=$(hostname) \
  --advertise-tags=tag:thoxnova \
  --accept-routes
```

Visit the URL Tailscale prints in your browser to approve the join.

### 5. Verify the Intel GPU compute stack

```
clinfo | grep -i "device name"
```

You should see one line listing the Intel UHD device. If `clinfo`
reports no Intel device, add your user to the `render` group:

```
sudo usermod -aG render thox
newgrp render
```

### 6. Pull a model into Ollama

ThoxNova ships with Ollama listening on `127.0.0.1:11434`. Pull a
known-good first model:

```
ollama pull llama3.2:3b
ollama list
```

For THOX-trained models, point Ollama at the THOX model registry per
the `thoxllm-factory` README, then:

```
ollama pull ttracx/thoxgem-e4b-q4_k_m
```

### 7. Wire ThoxMini and ThoxClip offload to ThoxNova

On each downstream THOX device:

```
echo 'THOXMINI_OFFLOAD_URL=http://thoxnova-n100-01:11434' | sudo tee -a /etc/thoxmini/thoxmini.env
sudo systemctl restart thoxymicro
```

Now the smaller devices can call into ThoxNova for any prompt the
local 0.5 TOPS NPU cannot handle.

### 8. Health check

```
/usr/local/bin/thox-id
```

Prints identity, tailscale status, role.env contents, GPU status,
and the running agent version. A green run exits 0.

\newpage

## Troubleshooting

### Front LED stays amber

Boot did not complete in 60 seconds. Connect a USB keyboard + HDMI
monitor and watch the console. Common causes:

1. NVMe not seated. Power down, reseat the M.2 SSD with the board
   unpowered, retry.
2. Bad PSU. Confirm 12 V on the barrel jack with a multimeter.
3. BIOS lost its boot order. Tap **F7** at the LattePanda logo to enter
   the boot menu and pick the NVMe; then re-save boot order in BIOS.

### `clinfo` returns no Intel device

```
sudo usermod -aG render thox
newgrp render
clinfo | grep -i "device name"
```

If still empty, reinstall the Intel compute stack:

```
sudo apt update
sudo apt install --reinstall intel-opencl-icd intel-level-zero-gpu level-zero
```

### Tailscale up fails with "permission denied"

Run with `sudo`. The `up` subcommand needs to write to
`/var/lib/tailscale`.

### Ollama refuses to start

```
sudo systemctl status ollama
sudo journalctl -u ollama -n 100
```

The most common cause is a port collision. Confirm nothing else is
on 11434:

```
sudo ss -ltnp | grep 11434
```

### Cannot find the device on the LAN

```
nmap -p 22 192.168.1.0/24    # adjust subnet
```

Or connect HDMI + keyboard and run `ip -4 addr show dev eno1`. Then
update your DNS / hosts file with the actual address.

### Factory restore

1. Power down. Boot from a fresh Ubuntu 24.04 USB stick.
2. Re-run `provision/thoxnova/bundle/install.sh` from the ThoxNova
   quickstart repo.

This is identical to the factory provisioning run.

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants ThoxNova against defects in materials and workmanship
for one (1) year from the date of shipment. The warranty covers the
chassis, the SBC, the NVMe SSD, and the supplied PSU. It does **not**
cover damage from drops, immersion, overvoltage, unauthorized
modification, BIOS reflash beyond stock, or use outside the documented
operating conditions.

Make a claim by emailing `dev@thox.ai` with your order number, a photo
of the issue, and the serial number from the spec card or
`/etc/thox/identity.toml`.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/thoxnova`
- Community: `https://github.com/ttracx/thox-quickstart/discussions`

### Telemetry opt-out

Telemetry ships **off**. To verify:

```
grep telemetry /etc/thox/identity.toml
# expected: telemetry = "off"
```

The agent will not send prompts or responses to the THOX mothership
at any time. The only outbound traffic from a default ThoxNova is the
Tailscale control channel (if joined) and apt updates you trigger.

### License summary

- Ubuntu 24.04 base image: a mix of GPL-2.0, LGPL-2.1, BSD, and MIT
- Intel GPU compute stack: a mix of Apache-2.0 and MIT
- Tailscale: BSD-3-Clause
- Ollama: MIT
- thoxnova-agent (THOX): Apache-2.0
- THOX models: Apache-2.0 (subject to upstream base-model terms)

Full per-package license set on the device at
`/usr/share/doc/thoxnova/LICENSES.md`.

\newpage

## Open source notice

| Component | License | Source |
|---|---|---|
| Ubuntu 24.04 LTS (x86_64) | Various | ubuntu.com |
| Linux kernel 6.8 | GPL-2.0 | kernel.org |
| systemd | LGPL-2.1 | systemd.io |
| OpenSSH | BSD-2-Clause | openssh.com |
| Tailscale | BSD-3-Clause | tailscale.com |
| intel-opencl-icd | Apache-2.0 + MIT | github.com/intel/compute-runtime |
| intel-level-zero-gpu | MIT | github.com/oneapi-src/level-zero |
| Ollama | MIT | github.com/ollama/ollama |
| thoxnova-agent (THOX) | Apache-2.0 | github.com/ttracx/thox-quickstart |
| llama.cpp | MIT | github.com/ggerganov/llama.cpp |
| ThoxLLM-327M-v2 | Apache-2.0 | huggingface.co/Thox-ai (private) |
| ThoxGem-E4B | Apache-2.0 (Gemma terms) | thox-gemma4 Phase B |
| Forge-7B, Wave-8B, Nova-12B | Apache-2.0 (base terms apply) | thoxllm-factory v0.1.3 |

This product complies with FCC Part 15 Class B (declaration on file)
and CE marking (declaration on file).

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
