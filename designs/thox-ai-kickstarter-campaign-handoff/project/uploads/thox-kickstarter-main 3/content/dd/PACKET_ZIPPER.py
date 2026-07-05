#!/usr/bin/env python3
"""
THOX DD packet zipper.

Usage:
    python PACKET_ZIPPER.py --investor <slug> [--out <dir>] [--strict]

Behavior:
    1. Verifies every doc under this directory tree carries a recent
       "Last updated:" date line and surfaces obvious unfilled markers
       (FILL: ...).
    2. Builds a zip of the entire content/dd/ tree (minus this script
       and any prior zips).
    3. Emits a manifest with file count, total bytes, and SHA256 per
       file alongside the zip.
    4. Names the output THOX_DD_PACKET_<investor>_<UTC-timestamp>.zip.

Exit codes:
    0 - zip produced; warnings printed if any.
    1 - missing "Last updated" lines (always fails the run, --strict or not).
    2 - --strict was requested and FILL markers remain.
    3 - bad invocation.

The script is intentionally stdlib-only (no third-party deps) so it
runs in any clean Python 3.8+ environment.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys
import zipfile
from pathlib import Path

THIS_FILE = Path(__file__).resolve()
DD_ROOT = THIS_FILE.parent
LAST_UPDATED_RE = re.compile(r"^Last updated:\s*(\d{4}-\d{2}-\d{2})", re.MULTILINE)
FILL_MARKER_RE = re.compile(r"FILL:")
TEXT_SUFFIXES = {".md", ".csv", ".txt", ".py"}
EXCLUDE_NAMES = {"__pycache__"}


def is_text_doc(path: Path) -> bool:
    return path.suffix.lower() in TEXT_SUFFIXES


def iter_packet_files():
    for root, dirs, files in os.walk(DD_ROOT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_NAMES]
        for fn in files:
            p = Path(root) / fn
            if p.resolve() == THIS_FILE:
                continue
            if p.suffix.lower() == ".zip":
                continue
            if p.name.startswith("THOX_DD_PACKET_") and p.suffix.lower() == ".json":
                continue
            yield p


def verify_doc_freshness(files):
    missing_date = []
    stale_threshold = dt.date.today() - dt.timedelta(days=60)
    stale = []
    for p in files:
        if not is_text_doc(p):
            continue
        # Only enforce "Last updated:" on markdown docs.  CSV templates
        # and the zipper script itself carry no header.
        if p.suffix.lower() != ".md":
            continue
        try:
            content = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        m = LAST_UPDATED_RE.search(content)
        if not m:
            missing_date.append(p)
            continue
        try:
            doc_date = dt.date.fromisoformat(m.group(1))
        except ValueError:
            missing_date.append(p)
            continue
        if doc_date < stale_threshold:
            stale.append((p, doc_date))
    return missing_date, stale


def count_fill_markers(files):
    counts = {}
    total = 0
    for p in files:
        if not is_text_doc(p):
            continue
        if p.suffix.lower() == ".py":
            continue
        try:
            content = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        n = len(FILL_MARKER_RE.findall(content))
        if n:
            counts[str(p.relative_to(DD_ROOT))] = n
            total += n
    return counts, total


def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def build_manifest(files):
    entries = []
    total_bytes = 0
    for p in sorted(files, key=lambda x: str(x).lower()):
        size = p.stat().st_size
        total_bytes += size
        entries.append({
            "path": str(p.relative_to(DD_ROOT)).replace("\\", "/"),
            "size_bytes": size,
            "sha256": sha256_file(p),
        })
    return {
        "packet_name": "THOX DD packet",
        "generated_utc": dt.datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "file_count": len(entries),
        "total_bytes": total_bytes,
        "files": entries,
    }


def slugify(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s or "investor"


def main(argv=None):
    p = argparse.ArgumentParser(description="Zip the THOX DD packet for an investor.")
    p.add_argument("--investor", required=True, help="Investor slug, e.g. 'acme-ventures'.")
    p.add_argument("--out", default=str(DD_ROOT.parent.parent / "deliverables"),
                   help="Output directory. Default: <repo>/deliverables/.")
    p.add_argument("--strict", action="store_true",
                   help="Fail the run if any FILL markers remain anywhere in the packet.")
    args = p.parse_args(argv)

    files = list(iter_packet_files())
    if not files:
        print("No packet files found under", DD_ROOT, file=sys.stderr)
        return 3

    print(f"Scanning {len(files)} files under {DD_ROOT}...")
    missing_date, stale = verify_doc_freshness(files)
    fill_counts, fill_total = count_fill_markers(files)

    if missing_date:
        print("\nMISSING 'Last updated:' header in:", file=sys.stderr)
        for m in missing_date:
            print(f"  - {m.relative_to(DD_ROOT)}", file=sys.stderr)
        print("\nFix the headers before zipping.", file=sys.stderr)
        return 1

    if stale:
        print("\nWARN: docs older than 60 days:")
        for sp, sd in stale:
            print(f"  - {sp.relative_to(DD_ROOT)}  ({sd.isoformat()})")

    if fill_total:
        print(f"\nWARN: {fill_total} unfilled FILL marker(s) across "
              f"{len(fill_counts)} file(s):")
        for path, n in sorted(fill_counts.items(), key=lambda kv: (-kv[1], kv[0])):
            print(f"  - {path}: {n}")
        if args.strict:
            print("\n--strict requested; aborting.", file=sys.stderr)
            return 2
        print("(continuing because --strict not set; review before share)")

    investor = slugify(args.investor)
    ts = dt.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    out_dir = Path(args.out).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    zip_path = out_dir / f"THOX_DD_PACKET_{investor}_{ts}.zip"
    manifest_path = out_dir / f"THOX_DD_PACKET_{investor}_{ts}.manifest.json"

    manifest = build_manifest(files)
    manifest["investor_slug"] = investor

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for p in files:
            arcname = str(p.relative_to(DD_ROOT)).replace("\\", "/")
            zf.write(p, arcname=f"THOX_DD_PACKET/{arcname}")
        zf.writestr(
            "THOX_DD_PACKET/MANIFEST.json",
            json.dumps(manifest, indent=2),
        )

    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print()
    print(f"OK  packet: {zip_path}")
    print(f"OK  manifest: {manifest_path}")
    print(f"     files: {manifest['file_count']}")
    print(f"     bytes: {manifest['total_bytes']}")
    print(f"     investor: {investor}")
    print(f"     generated_utc: {manifest['generated_utc']}")
    print()
    print("Next steps:")
    print("  - Attorney review of the contents before any external share.")
    print("  - Share via secure channel (Box / DocSend / Dropbox link).")
    print("  - Log the investor + timestamp + cover-letter ordering "
          "in your private outreach tracker.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
