---
title: THOXKey User Manual
device: thoxkey
version: 1.0
date: 2026-08
---

# THOXKey User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for receiving a THOXKey. THOXKey is a USB drive preloaded with
a portable private AI assistant. Plug it in, double-click the launcher,
and you have a local large-language-model chat session running entirely
on the computer you sat down at. Nothing is uploaded. Nothing leaves
the USB.

### What is in the box

- 1 x THOXKey USB drive
- 1 x quick-start card (this manual replaces it for digital backers)
- 1 x THOX brand sticker (Halo tier only)
- Co-brand sleeve (Education and Enterprise tiers only)

### Safety highlights

- THOXKey is a USB 3.2 Gen 2 drive. Treat it as a normal flash drive:
  do not bend, do not immerse, do not heat above 60 C.
- The drive enumerates as FAT32 storage for maximum cross-OS
  compatibility. Standard antivirus software will scan it as it would
  any other USB drive.
- The launcher runs an LLM in user-mode on the host computer. It does
  not need administrator or root privileges and does not install any
  system service.
- No model files are signed at the kernel level; do not run THOXKey on
  a managed corporate device without your IT team's awareness.

### What THOXKey is for

- Drop-in private AI assistant on any Windows, macOS, or Linux machine
- Conference swag, customer-success gift, classroom material, founder
  giveaway
- A working demo of THOX.ai's local-first stance: the same models you
  see on the ThoxMini and ThoxNova, packaged for a 64 GB stick

### What tier did I get?

The drive printing and sleeve tell you. The matrix:

| Tier | Sleeve | Models | Co-brand |
|---|---|---|---|
| Starter | THOX clamshell | default loadout | adhesive label |
| Standard | THOX clamshell | default loadout | full-color UV-printed label |
| Pro | THOX clamshell | default loadout | full-color + co-branded landing URL |
| Enterprise | Custom-mold case | default + customer LoRA + custom prompt pack | dedicated landing page |
| Education | THOX clamshell | default + course prompt pack | course-specific sleeve |
| Halo (D2C) | THOX clamshell | default loadout | none, standard THOX brand |

The **default** model loadout is ThoxLLM-327M-v2 + ThoxMicro-125M +
ThoxGem-E4B Q4_K_M. Total disk footprint ~3.0 GB out of 64 GB.

\newpage

## Quick start

### Windows

1. **Plug** the THOXKey into any USB-A or USB-C port (with adapter).
2. **Open File Explorer** to the new drive (it appears as `THOXKEY`).
3. **Double-click** `START.bat`. A command window opens; the launcher
   spawns `llama-server.exe` from the drive.
4. **Open** the browser tab that auto-opens at `http://127.0.0.1:8080`.
   If your browser does not auto-launch, navigate there manually.
5. **Start chatting.** The model loads in 5 to 15 seconds depending
   on your CPU; first token comes shortly after.

### macOS

1. **Plug** the THOXKey into a USB-A port (with USB-C adapter if needed).
2. **Open Finder** to the new `THOXKEY` volume.
3. **Double-click** `start.command`. macOS may prompt you to allow
   the launcher; approve in System Settings > Privacy & Security.
4. **Open** the browser tab that auto-opens at `http://127.0.0.1:8080`.
5. **Start chatting.**

### Linux

1. **Plug** the THOXKey into any USB-A or USB-C port.
2. **Mount** the drive (most distributions auto-mount). The mount
   point is usually `/media/$USER/THOXKEY`.
3. **Open a terminal** and run `bash /media/$USER/THOXKEY/start.sh`.
4. **Open** your browser at `http://127.0.0.1:8080`.
5. **Start chatting.**

Eject the drive cleanly when finished. Pulling it during inference
can corrupt the in-flight model context (it does not corrupt the
drive itself; the FAT32 image is read-only during inference).

\newpage

## Full setup

### 1. Pick a different model

The launcher loads `thoxllm-327m-v2.gguf` by default. To switch:

```
# Windows PowerShell, with the drive at E:
E:
.\START.bat --model thoxkey\models\thoxgem-e4b-q4_k_m.gguf
```

Or in the web UI, click Settings > Model and pick from the dropdown.
The model swap is hot; no restart needed.

### 2. Use your own system prompt

Edit `THOXKEY/thoxkey/prompts/system.md` in any text editor. The
launcher rereads it on every new conversation.

### 3. Add your own model (Pro and Enterprise tiers)

1. Copy a GGUF file to `THOXKEY/thoxkey/models/`. The file must end in
   `.gguf` and be smaller than 4 GB (FAT32 limit) or split into
   multi-part GGUFs.
2. The launcher will list it in the model dropdown on next start.

Pro tier may add prompt packs and custom system prompts. Enterprise
tier may add LoRA adapters and full custom models per the contract.

### 4. Run on a different port

```
.\START.bat --port 9000
```

Useful if `8080` is taken on your host.

### 5. Run offline-only mode (default)

The default launcher passes `--no-internet` to the runtime, which
blocks any outbound request. If you ever want to permit the
optional "update from internet" feature, run:

```
.\START.bat --allow-internet
```

This is opt-in and will never run silently.

### 6. Drive as bootable image (advanced)

THOXKey is data-only by design; it does not boot a host. If you want
a bootable USB with the same models pre-loaded, see the
`thox-portable` project, which is a separate product.

### 7. Multi-machine workflow

A THOXKey contains zero per-host state. You can move it between a
Windows laptop, a macOS desktop, and a Linux workstation in the same
afternoon; each host gets a clean session. No chat history is written
to the drive unless you opt into Settings > Save chat log.

### 8. Cobrand (Education and Enterprise tiers)

If your THOXKey carries a custom sleeve and a co-brand landing page:

1. The landing-page URL is printed on the sleeve and inside the web UI
   under About.
2. Custom prompt packs (e.g., "ECON 412 Quantitative Methods") load
   automatically and appear in the chat starter list.
3. Tier-specific licensing terms (if any) are in
   `THOXKEY/thoxkey/LICENSES.md`.

\newpage

## Troubleshooting

### Drive does not appear in File Explorer / Finder

1. Try a different USB port; some USB-C ports power down between uses.
2. Confirm the drive's LED (if present) is lit.
3. On Windows, open Device Manager and look under Disk Drives. If the
   drive is listed but no letter is assigned, open Disk Management and
   assign one.

### START.bat opens and closes immediately

The launcher logs to `THOXKEY/thoxkey/runtime/last-run.log`. Open it
in any text editor; the last line tells you what failed.

Most common cause: another process is bound to port 8080. Restart
with `START.bat --port 9000`.

### Model load is extremely slow

The default model loads in 5 to 15 seconds on a modern CPU. If you
see 60+ seconds:

1. Your CPU is older than 2020 (no AVX2). Switch to the smaller
   ThoxMicro-125M model.
2. The drive is on USB 2.0. Move to a USB 3.x port (~10x faster).
3. Antivirus is scanning every model byte on load. Whitelist the
   `THOXKEY/thoxkey/` folder in your AV.

### Web UI loads but no token comes back

Check the launcher log. Common: model file checksum mismatch (the
drive was damaged in transit). Re-flashing instructions are in
`THOXKEY/thoxkey/runtime/RECOVERY.md`.

### macOS refuses to run start.command

System Settings > Privacy & Security > scroll to the blocked-app
notice for `start.command` > Allow Anyway. macOS will prompt once
more on next launch; pick Open.

### Linux: glibc too old

The Linux runtime targets glibc 2.31+. Distributions older than
Ubuntu 20.04 / Debian 11 / Fedora 32 will fail at launch with
"GLIBC_2.31 not found". Recovery: run THOXKey on a host with a
newer glibc, or use the static-musl runtime in
`thoxkey/runtime/linux-static/`.

### Factory restore

THOXKey is read-mostly; the launcher writes only the optional chat
log. To restore to factory:

1. On Windows: right-click drive > Format > FAT32. Then re-flash
   from the recovery image at `https://docs.thox.ai/thoxkey/recovery`
   (you need your serial number).
2. Or contact `dev@thox.ai` for a replacement; we send a fresh drive
   under the warranty in step 1.

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants THOXKey against defects in materials and workmanship
for one (1) year from the date of shipment. The warranty covers the
USB stick hardware and the factory-loaded image. It does **not** cover
damage from drops, immersion, overvoltage, formatting, intentional
deletion of the THOX runtime, or use outside the documented operating
conditions.

Make a claim by emailing `dev@thox.ai` with your order number and the
serial number printed on the drive case or on the spec card.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/thoxkey`
- Co-brand support (Enterprise / Education): your account manager

### Telemetry opt-out

THOXKey ships with telemetry **off** by default. The launcher does
not record prompts, responses, or model selections. The only
outbound network activity is the optional "update from internet"
button, which is off by default.

To confirm:

```
type THOXKEY:\thoxkey\manifest.json
# look for: "telemetry": "off"
```

### License summary

- llama.cpp runtime (Windows / macOS / Linux): MIT
- thoxkey launcher (THOX): Apache-2.0
- THOX models: Apache-2.0 (subject to upstream base-model terms)
- HTML / JS web UI: MIT
- Co-brand assets (if any): per your contract

Full per-package license set is on the drive at
`THOXKEY/thoxkey/LICENSES.md`.

### OS compatibility

- Windows 10 21H2+, Windows 11
- macOS 12 Monterey+
- Linux with glibc 2.31+ (or use the static-musl runtime)

\newpage

## Open source notice

| Component | License | Source |
|---|---|---|
| llama.cpp (with llama-server binary) | MIT | github.com/ggerganov/llama.cpp |
| thoxkey launcher | Apache-2.0 | github.com/ttracx/thox-key |
| thoxkey web UI | MIT | github.com/ttracx/thox-key |
| ThoxLLM-327M-v2 | Apache-2.0 | huggingface.co/Thox-ai (private) |
| ThoxMicro-125M | Apache-2.0 | github.com/ttracx/thox-micro-125m |
| ThoxGem-E4B Q4_K_M | Apache-2.0 (Gemma terms) | thox-gemma4 Phase B |
| Forge-7B Q4 (code loadout) | Apache-2.0 (base terms apply) | thoxllm-factory v0.1.3 |
| Wave-8B-Unleashed Q4 (industry loadout) | Apache-2.0 (base terms apply) | thoxllm-factory v0.1.3 |

This product is RoHS-compliant. The flash chip ships in the
50%-charged state per IATA shipping rules where the controller has a
small flash buffer (the drive itself has no battery). Recycle
exhausted drives through your local e-waste channel.

Co-brand info for Education and Enterprise tiers:

- The co-brand sleeve identifies the customer or course.
- The landing page URL is printed inside the sleeve.
- Custom prompt packs are documented at the landing page.
- Custom LoRA adapters carry their own licensing terms; see
  `THOXKEY/thoxkey/LICENSES.md` for the per-adapter detail.

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
