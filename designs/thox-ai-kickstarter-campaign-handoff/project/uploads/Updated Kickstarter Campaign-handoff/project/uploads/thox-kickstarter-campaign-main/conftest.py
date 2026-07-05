"""Pytest configuration.

Ensures the repository root is importable so `import thox_campaign` works
regardless of where pytest is invoked. This mirrors the `pythonpath = ["."]`
setting in pyproject.toml for environments that do not read it.
"""

import os
import sys

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)
