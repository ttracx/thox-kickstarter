#!/usr/bin/env python3
from pathlib import Path

required = [
    'crates/magair-core/src/ai.rs',
    'crates/magair-core/src/store.rs',
    'crates/magair-node/src/main.rs',
    'crates/magair-ctl/src/main.rs',
]
for path in required:
    text = Path(path).read_text()
    if text.count('{') != text.count('}'):
        raise SystemExit(f'brace count mismatch: {path}')
    if 'TODO' in text:
        raise SystemExit(f'TODO left in source: {path}')
print('rust sentinel scan ok')
