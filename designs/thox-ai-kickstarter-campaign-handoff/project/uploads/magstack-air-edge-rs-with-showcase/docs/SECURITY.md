# Security

## P0 controls

```text
- Bearer token on all API and internal endpoints except /health.
- Optional HMAC signatures for internal worker calls.
- Capability-routed tasks.
- No shell execution in default built-in AI tasks.
- External plugin bridge disabled unless node advertises it explicitly.
- systemd hardening in service unit.
```

## Design constraints

```text
- Watch/PWA dispatch surfaces are not trusted shell endpoints.
- Model traffic stays on LAN or attached devices.
- Large-model or external tool bridges must be opt-in and capability scoped.
- Do not put SSH keys on ESP32-class watch surfaces.
```

## Next hardening steps

```text
1. Signed node enrollment tokens.
2. Per-node key rotation.
3. HMAC required by default.
4. cgroups v2 memory and CPU limits.
5. seccomp profile for plugin processes.
6. Signed model manifests.
7. Append-only audit log with hash chaining.
```
