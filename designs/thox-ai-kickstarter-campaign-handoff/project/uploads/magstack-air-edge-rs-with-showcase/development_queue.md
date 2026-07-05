# development_queue.md - MagStack Air Edge RS

## P0 - Current package

- [x] Generate Rust-first workspace.
- [x] Add leader/worker/standalone node modes.
- [x] Add SQLite queue.
- [x] Add real edge-AI Rust tasks.
- [x] Add Python SDK.
- [x] Add dashboard.
- [x] Add configs, scripts, systemd.
- [x] Add docs and Claude review.

## P1 - Hardware validation

1. Build on Linux with Rust toolchain.
2. Cross-compile to `aarch64-unknown-linux-gnu`.
3. Deploy to one leader and two worker Pi Zero 2 W nodes.
4. Validate registration over Wi-Fi.
5. Validate task scheduling under weak signal.
6. Run 30-minute thermal and power logging.
7. Capture first real prototype demo video.

## P2 - Realistic AI expansion

1. Add model manifest and signed model hash validation.
2. Add TFLite/ONNX plugin adapter for bigger Thox nodes.
3. Add node capability auto-detection for optional accelerators.
4. Add image/audio payload metadata with local file staging.
5. Add result artifact retention and pruning.

## P3 - Reliability

1. Add explicit leader failover with leases, not mDNS-only assumptions.
2. Add job checkpointing.
3. Add worker-side local retry policy.
4. Add network partition handling.
5. Add signed peer enrollment.

## P4 - ThoxOS Air integration

1. Convert this runtime into a ThoxOS Air package.
2. Add Buildroot recipe.
3. Add read-only rootfs profile.
4. Add state partition migration.
5. Add update bundle and rollback health check.
