# Devices

The Device Fabric is the same panel everywhere, no matter the surface.

## Universal panel

Every device exposes:

- Name
- Class (ThoxNova, ThoxMini, ThoxAir, ThoxClip, ThoxWatch, ThoxVault, Magstack, Custom)
- Presence (Online, Idle, Offline, Pairing, Updating)
- Telemetry (battery, temperature, storage, CPU, RAM, network, uptime)
- Capabilities (declarative list)
- Last sync timestamp

See `ThoxDevicePanel` in `txf-components` and `DevicePanel` in `txf-device-fabric`.

## Discovery

Devices announce themselves to the fabric via `DeviceAnnouncement`. Surfaces consume the announcement stream and render the universal panel.

## Pairing

Pairing flows MUST use the Mesh pairing protocol. Pairing UI MUST surface a four-digit code AND a QR. Confirmation MUST require explicit tap or voice.

## Cross-surface parity

A user pairing a device from ThoxOS, the iOS thox-terminal, or the web Forge MUST see the same panel, same telemetry, same affordances. SDKs MUST NOT add device-specific UI elements without going through TXF spec review.
