#!/usr/bin/env python3
"""Render per-device THOX user manuals from Markdown to PDF.

Uses markdown-pdf (pure-Python, PyMuPDF backend) so no LaTeX, no GTK,
no wkhtmltopdf required. Apache-2.0; commercial-tool free.

Run from repo root:
    python content/manuals/render_pdfs.py

Outputs one PDF per device into content/manuals/<device>/MANUAL.pdf.
"""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path

try:
    from markdown_pdf import MarkdownPdf, Section
except ImportError:
    print("ERROR: markdown-pdf is not installed. Run: pip install markdown-pdf")
    sys.exit(1)


HERE = Path(__file__).resolve().parent

DEVICES = [
    "thoxclip",
    "thoxmini",
    "thoxmini-air",
    "thoxnova",
    "magstack-cluster-dock",
    "thoxkey",
]

# THOX brand palette. Used in the inline CSS for headings and code blocks.
THOX_CSS = """
body { font-family: 'IBM Plex Sans', 'Segoe UI', Arial, sans-serif;
       color: #0B1220; line-height: 1.45; font-size: 11pt; }
h1   { color: #0B1220; border-bottom: 2px solid #27E5FF;
       padding-bottom: 4px; margin-top: 18pt; font-size: 22pt; }
h2   { color: #0B1220; border-bottom: 1px solid #27E5FF;
       padding-bottom: 3px; margin-top: 16pt; font-size: 16pt; }
h3   { color: #27418F; margin-top: 14pt; font-size: 13pt; }
h4   { color: #27418F; margin-top: 12pt; font-size: 11pt; }
code, pre { font-family: 'JetBrains Mono', 'Consolas', monospace;
            font-size: 9.5pt; background: #F2F4F8;
            border: 1px solid #D0D6DD; padding: 2px 4px; border-radius: 3px; }
pre  { padding: 8px; overflow-x: auto; }
table { border-collapse: collapse; margin: 8pt 0; width: 100%; font-size: 10pt; }
th, td { border: 1px solid #D0D6DD; padding: 4px 8px; text-align: left; }
th   { background: #0B1220; color: #F2F4F8; }
blockquote { border-left: 3px solid #27E5FF; padding-left: 8px;
             color: #2A3340; margin-left: 0; }
hr   { border: none; border-top: 1px solid #D0D6DD; margin: 12pt 0; }
a    { color: #006E94; text-decoration: none; }
"""


def strip_frontmatter(text: str) -> str:
    """Drop a leading YAML frontmatter block if present."""
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            return text[end + 5 :]
    return text


def strip_latex_pagebreaks(text: str) -> str:
    """Convert \\newpage markers to a plain rule. markdown-pdf paginates
    automatically by Section; we use \\newpage as a hint and break into
    Sections at those points."""
    return text  # handled at section-split time


def split_into_sections(text: str) -> list[str]:
    """Split the manual into sections at every \\newpage marker so each
    chapter starts on its own page."""
    parts = []
    current = []
    for line in text.splitlines():
        if line.strip() == "\\newpage":
            if current:
                parts.append("\n".join(current).strip())
                current = []
        else:
            current.append(line)
    if current:
        tail = "\n".join(current).strip()
        if tail:
            parts.append(tail)
    return parts


def render_device(device: str) -> dict:
    """Render a single device manual. Returns metadata about the result."""
    src = HERE / device / "MANUAL.md"
    out = HERE / device / "MANUAL.pdf"

    if not src.exists():
        return {"device": device, "ok": False, "reason": "source missing"}

    raw = src.read_text(encoding="utf-8")
    body = strip_frontmatter(raw)

    pdf = MarkdownPdf(toc_level=2, optimize=True)
    pdf.meta["title"] = f"{device} User Manual"
    pdf.meta["author"] = "THOX.ai"
    pdf.meta["subject"] = "User Manual"
    pdf.meta["creator"] = "THOX.ai user-manual renderer"

    sections = split_into_sections(body)
    if not sections:
        sections = [body]

    for s in sections:
        pdf.add_section(Section(s, paper_size="Letter"), user_css=THOX_CSS)

    pdf.save(str(out))

    sha = hashlib.sha256(out.read_bytes()).hexdigest()[:16]
    size = out.stat().st_size

    md_words = len(body.split())

    return {
        "device": device,
        "ok": True,
        "md_words": md_words,
        "sections": len(sections),
        "pdf_bytes": size,
        "pdf_sha256_16": sha,
        "pdf_path": str(out),
    }


def main() -> int:
    results = []
    for d in DEVICES:
        r = render_device(d)
        results.append(r)
        if r["ok"]:
            print(
                f"[OK] {d:>24}  md_words={r['md_words']:5d}  "
                f"sections={r['sections']:2d}  "
                f"pdf={r['pdf_bytes']:>8} B  sha={r['pdf_sha256_16']}"
            )
        else:
            print(f"[FAIL] {d:>24}  reason={r['reason']}")

    print()
    print("SHAS (for README + tracker):")
    for r in results:
        if r["ok"]:
            print(f"  {r['device']:>24}: sha256[:16]={r['pdf_sha256_16']}")

    failed = [r for r in results if not r["ok"]]
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
