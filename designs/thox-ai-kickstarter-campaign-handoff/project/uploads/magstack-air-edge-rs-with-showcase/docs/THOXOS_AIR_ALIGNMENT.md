# ThoxOS Air Alignment

This package follows the ThoxOS Air direction by treating Air-class nodes as hardened Linux appliances with Rust-first service code, explicit capabilities, and local-first inference.

## Alignment points

```text
- Rust runtime for agent/node behavior.
- AI tasks behind capability strings.
- Pull-based worker model for small edge nodes.
- Local inference by default.
- Bridge/plugin work explicitly separated from built-in trusted tasks.
- ThoxOS Air can package magair-node as a sandboxed Linux userspace service.
```

## Not included in this prototype

```text
- dm-verity rootfs
- A/B OTA rollback
- TPM-backed attestation
- seccomp generation from declared capabilities
- production MeshStack encrypted tunnel transport
```

Those are P2/P3 ThoxOS Air image-builder responsibilities.
