---
title: MagStack Cluster Dock User Manual
device: magstack-cluster-dock
version: 1.0
date: 2026-08
---

# MagStack Cluster Dock User Manual

Version 1.0
August 2026

THOX.ai

---

## Welcome

Thank you for backing the MagStack Cluster Dock. The Cluster Dock is the
base station + magnetic spine that holds a column of 4 to 8 ThoxMini Air
nodes. With the Dock you turn a handful of Airs into a self-cooled,
self-aligning compute cluster you can carry between desks.

### What is in the box

- 1 x magstack_dock_base (matte black, 150 mm diameter, 28 mm tall)
- 2 x magstack_dock_spine_seg (dark gray, 100 mm each)
- 1 x magstack_dock_cap (light gray, 30 mm)
- 1 x magstack_dock_cable_manifold (dark gray)
- 1 x magstack_dock_spec_plate (matte black, P-touch labeled with serial)
- 4 x USB-C right-angle cables, 0.5 m
- 1 x USB-C 4-port power hub
- 3 x 14 mm self-adhesive rubber feet (one extra is in the bag for spare)
- 1 x quick-start card
- 1 x THOX brand sticker

8-node configurations ship with one additional spine segment and four
additional cables.

### Safety highlights

- The dock includes N52 ring magnets in the well. Keep the dock 100 mm
  from credit cards, hard drives, mechanical watches, and medical
  implants.
- The USB-C 4-port power hub draws up to 20 W. Plug into a known-good
  wall adapter; do not daisy-chain through laptop USB ports for a full
  cluster of 4 to 8 Airs.
- The spine segments are PETG and rigid; they do not flex. Do not lever
  them or use them as a handle.
- Surface-mount the rubber feet on a smooth, non-porous surface.
  Adhesive will not stick to fabric or unfinished wood.
- The dock is not weather-sealed.

### What the Cluster Dock is for

- Aggregate 4 to 8 ThoxMini Air nodes into one self-discovering compute
  cluster
- Centralize power to a single wall adapter via the USB-C hub
- Hold the spec plate facing forward for in-rack identification

\newpage

## Quick start

Five steps, under three minutes:

1. **Apply the rubber feet** to the three foot recesses on the
   underside of the base. Set the base on your work surface.
2. **Thread the USB-C cables** through the cable manifold from the
   bottom; leave 30 mm of tail above each manifold hole.
3. **Drop the manifold into the base.** Slip-fit, no glue. The cable
   tails should poke up through the central well.
4. **Stack the Airs.** Set the first Air face-down so its halo ring
   drops into the 30 mm well. Plug a USB-C tail into the Air. Add the
   next Air on top; the halo magnets snap. Plug a USB-C tail. Repeat.
5. **Cap and label.** Drop the cap onto the topmost halo ring. Slot
   the spec plate into the front slot. Plug the bottom of the cable
   bundle into the supplied 4-port USB-C hub, and the hub into wall
   power.

The cluster boots and self-discovers within 30 seconds.

\newpage

## Full setup

### 1. Optional: install the spine

Recommended for 5+ node stacks for rotational alignment.

1. Drop the first spine segment plug into the central bore of the base
   well. The plug should seat below the manifold and not interfere
   with cables.
2. Stack the second spine segment by mating its plug into the first
   segment's top tenon.
3. For an 8-node stack, add the third spine segment from the spare
   kit.
4. If the topmost spine extends above the top Air, trim it flush with
   a hacksaw or pull the topmost segment off.

### 2. Stack each ThoxMini Air

Each subsequent Air mates onto the one below via the 30 mm halo magnet
faces. The spine (if installed) passes through the inner 19 mm of each
halo, providing rotational alignment. Plug a USB-C cable into each Air
as you stack.

### 3. Cluster firmware coordination

Each Air must be set into cluster mode before stacking:

```
ssh root@<air-ip>
echo 'THOXMINI_CLUSTER=on' | tee -a /etc/thoxmini/thoxmini.env
systemctl restart thoxymicro
```

Within 10 seconds of cluster boot, the gateway on every Air exposes a
`/cluster/peers` endpoint listing every reachable peer.

Verify from any Air:

```
curl http://127.0.0.1:18790/cluster/peers
```

Expected output: a JSON array with one entry per peer Air, each entry
listing peer hostname, IP, model loadout, and current load.

### 4. Cable management

Each Air's USB-C tail runs straight down through the manifold to the
USB-C hub. To replace a single Air without disturbing the stack:

1. Power down that Air: hold its side button 6 seconds.
2. Lift it straight up; the halo magnets release with about 1.2 kg of
   pull.
3. Unplug its USB-C cable.
4. Replacement Air: plug USB-C, set in place, halo magnets reseat.
5. Power the replacement.

### 5. Apply the spec plate label

Use a Brother P-touch with 36 x 8 mm tape (or any label compatible
with the debossed serial field on the spec plate). Recommended
contents:

```
THOX MagStack Cluster Dock
Serial: <fleet-id>
4-node config | 4x ThoxMini Air
Deployed: <YYYY-MM-DD>
```

Slot the labeled spec plate tongue into the slot on the front face
of the base.

### 6. Hero shot setup (optional)

If you want the hero photo from the Kickstarter campaign:

- 4-node stack on a matte THOX-brand graphite background (#0B1220)
- Side light camera-right at 30 degrees to catch the halo chamfers
- Cyan (#27E5FF) rim light camera-left raked across the stack
- Spec plate facing camera, label legible
- 4:5 portrait at 50 mm equivalent

\newpage

## Troubleshooting

### Stack does not self-discover after boot

1. Confirm `THOXMINI_CLUSTER=on` on every Air.
2. From any Air: `curl http://127.0.0.1:18790/cluster/peers`. If only
   self appears, the USB-Ethernet link between Airs is not bridging.
3. Confirm every USB-C cable is fully seated; the manifold loosens
   them if you bumped the dock during stacking.
4. Power-cycle the USB-C hub (unplug from wall for 5 seconds).

### An Air will not seat on the stack

1. The halo magnets are polarized. The factory orientation guarantees
   every Air snaps to the next. If you flipped one upside down or
   swapped a halo ring, it will reject the mate.
2. The 30 mm well has a chamfer; if you forced the first Air into the
   well off-axis you may have caught the halo on the chamfer edge.
   Lift the Air, realign over the bore, drop straight down.

### Cable falls out of the manifold

The manifold is slip-fit by design. If a cable slips:

1. Pull the affected cable up through the manifold.
2. Apply a dab of pressure-sensitive adhesive (PSA) to the cable
   sheath at the manifold contact patch.
3. Reinsert; the PSA holds the cable without sealing it permanently.

### Hub overheats

The supplied USB-C hub is rated for 20 W total. An 8-node cluster
under sustained inference can spike to 24 W. Two recoveries:

1. Use a 30 W or higher USB-C hub. The pinout is identical.
2. Reduce the per-Air model loadout (smaller model = less inference
   power).

### Spine wobbles

The spine is press-fit at every joint. A wobble usually means a joint
is not fully seated. Pull the offending segment up 20 mm and press it
back down with even force on both sides.

### Stack tips over

The 4-node stack with spine is 250 mm tall; 8-node with spine is 450 mm.
For 6+ node configurations, anchor the base with an extra rubber pad
on the front edge to defeat the slight forward bias from the spec
plate weight, or rest the spine against a vertical surface.

\newpage

## Warranty and support

### Limited 1-year warranty

THOX.ai warrants the MagStack Cluster Dock (printed parts, magnets,
cables, and supplied USB-C hub) against defects in materials and
workmanship for one (1) year from the date of shipment. The warranty
does not cover damage from drops, immersion, magnet abuse,
unauthorized modification, or use outside the documented operating
conditions.

The PETG parts are 3D-printed; minor cosmetic variation (faint layer
lines, color batch shift between matte black and dark gray) is
expected and is not a warranty event.

Make a claim by emailing `dev@thox.ai` with your order number and a
photo of the issue.

### Support

- Email: `dev@thox.ai`
- Docs: `https://docs.thox.ai/magstack-cluster-dock`
- Community: `https://github.com/ttracx/magstack-air/discussions`

### Telemetry opt-out

The Cluster Dock is a passive enclosure plus a USB-C hub. It does not
itself run software, so there is no telemetry. The Airs that sit in
it ship with telemetry off by default; see the ThoxMini Air manual
to verify.

### License summary

- Printed-part STL + source (`magstack_cluster_dock.py`): Apache-2.0
- USB-C cables: vendor commercial (no license)
- USB-C hub: vendor commercial (no license)

The hardware design itself is filed under IP-013 (MagStack
architecture). The reference STL set is permissively licensed so
backers can reprint replacement parts.

\newpage

## Open source notice

The Cluster Dock is a passive accessory. The only open-source
component is the parametric STL generator at
`ttracx/thox-3dprint-kit/devices/magstack-cluster-dock/source/magstack_cluster_dock.py`,
released under Apache-2.0.

The dock pairs with software components on the Airs:

| Component | License | Source |
|---|---|---|
| thoxymicro cluster mode | Apache-2.0 | github.com/ttracx/thoxymicro |
| magstack-air cluster crate | Apache-2.0 | github.com/ttracx/magstack-air |
| magstack-air-edge-rs | Apache-2.0 | github.com/ttracx/magstack-air-edge-rs |

This product (and the printed parts) is RoHS-compliant; the magnets
are nickel-coated and do not contain hexavalent chromium. Recycle
exhausted USB-C cables and the USB-C hub through your local
e-waste channel.

THOX.ai
Tulsa, Oklahoma
dev@thox.ai

\newpage
