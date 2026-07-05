#!/usr/bin/env python3
"""Verify generated documents against the compliance gate.

Each .docx in docs/ is checked to be a well-formed Word file (a zip containing
word/document.xml) and its visible text is scanned with the same
GuardrailEngine that gates agent output. Exits nonzero if any document is
malformed or contains an error-severity violation.

Usage: python scripts/verify_docs.py
"""

from __future__ import annotations

import glob
import os
import re
import sys
import zipfile

# Make the package importable when run directly.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from thox_campaign.guardrails import GuardrailEngine  # noqa: E402

DOCS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")


def extract_text(path: str) -> str:
    """Return the visible text of a .docx, or raise if it is malformed."""
    with zipfile.ZipFile(path) as archive:
        broken = archive.testzip()
        if broken is not None:
            raise ValueError(f"corrupt archive entry: {broken}")
        xml = archive.read("word/document.xml").decode("utf-8")
    text = re.sub(r"<[^>]+>", " ", xml)
    return re.sub(r"\s+", " ", text)


def main() -> int:
    paths = sorted(glob.glob(os.path.join(DOCS_DIR, "*.docx")))
    if not paths:
        print(f"error: no .docx files found in {DOCS_DIR}; run the renderer first.", file=sys.stderr)
        return 2

    engine = GuardrailEngine()
    ok = True
    for path in paths:
        name = os.path.basename(path)
        try:
            text = extract_text(path)
        except Exception as exc:  # noqa: BLE001
            print(f"INVALID  {name}: {exc}")
            ok = False
            continue
        report = engine.scan(text)
        status = "PASS" if report.passed else "BLOCKED"
        print(f"{status:8} {name}  (errors={len(report.errors)}, warnings={len(report.warnings)})")
        if not report.passed:
            ok = False
            for v in report.errors:
                print(f"    ERROR: {v}")
        for v in report.warnings:
            print(f"    warn:  {v}")

    print("---")
    print("ALL CLEAN" if ok else "FAILURES PRESENT")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
