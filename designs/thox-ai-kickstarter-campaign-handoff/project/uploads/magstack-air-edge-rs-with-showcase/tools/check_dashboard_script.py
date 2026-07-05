#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess
import tempfile

html = Path('dashboard/static/index.html').read_text()
match = re.search(r'<script>(.*?)</script>', html, re.S)
if not match:
    raise SystemExit('dashboard script not found')
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f:
    f.write(match.group(1))
    path = f.name
subprocess.run(['node', '--check', path], check=True)
print('dashboard script syntax ok')
