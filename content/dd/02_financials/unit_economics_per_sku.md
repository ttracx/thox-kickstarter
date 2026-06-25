# Unit economics per SKU

Last updated: 2026-06-25
Status: DRAFT - assumptions only; user fills real numbers

---

For each SKU below, the user fills the bill-of-materials and assembly
line items. Sources for BOMs:

- ttracx/thox-quickstart boms/ - 7 SKUs in shipping kits.
- content/manuals/ in this repo - reward manuals.
- Per-product memory entries in MEMORY.md for SoC choices (Luckfox Pico
  Mini B for ThoxClip / ThoxMini / ThoxMini Air; LattePanda N100 for
  ThoxNova).

## Structure per SKU

```
SKU: <name>
ASP (Kickstarter early bird): FILL
ASP (D2C post-Kickstarter):   FILL

BOM
  SoC / compute board:         FILL: $
  RAM / storage:               FILL: $
  Enclosure (3D print or molded): FILL: $
  Power / battery:             FILL: $
  Connectors / cables:         FILL: $
  Display (if any):            FILL: $
  Antennas (if any):           FILL: $
  Misc (screws, foam, labels): FILL: $
  Subtotal BOM:                FILL: $

Assembly
  Labor minutes:               FILL
  Labor rate per minute:       FILL: $
  Labor cost:                  FILL: $

Packaging and outbound
  Packaging:                   FILL: $
  Manual / quickstart card:    FILL: $
  Outbound shipping (avg):     FILL: $
  Subtotal pack and ship:      FILL: $

Reserves
  Defect and warranty (% units): FILL
  Reserve $ per unit:          FILL: $

Total landed cost per unit:    FILL: $
Gross margin per unit ($):     FILL: $
Gross margin per unit (%):     FILL
```

## SKUs to populate

- ThoxClip baseline (Luckfox Pico Mini B)
- ThoxMini (Luckfox Pico Mini B)
- ThoxAir (Luckfox Pico Mini B + MagStack ring)
- ThoxNova (LattePanda N100)
- Optional: ThoxVault, ThoxCargo, ThoxArm (cross-link thox-playbooks)

## Disclaimer

Bill-of-materials line items are commercially sensitive. The packet
includes the structure; investors who want the populated numbers should
expect to sign an NDA covering supply-chain detail.
