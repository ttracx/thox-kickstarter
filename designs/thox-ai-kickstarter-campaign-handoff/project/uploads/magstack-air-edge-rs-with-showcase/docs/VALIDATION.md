# Validation

## Completed in generation sandbox

```text
- Python SDK syntax and tests.
- JSON model validation.
- shell script bash -n validation.
- dashboard JavaScript syntax validation.
- Rust source sentinel checks.
```

## Not completed in generation sandbox

```text
- cargo fmt
- cargo clippy
- cargo test
- aarch64 cross build
- hardware Wi-Fi cluster test
```

Reason: the generation sandbox did not have `rustc` or `cargo` installed.

## Local validation commands

```bash
cargo fmt --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
scripts/build_pi.sh
PYTHONPATH=sdk/python python3 -m pytest sdk/python/tests -q
scripts/validate_static.sh
```
