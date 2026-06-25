#!/usr/bin/env python3
"""
Render INVESTOR_DECK.md and INVESTOR_DECK_ONE_PAGER.md to brand-aligned PDFs
using ReportLab. No internet, no LaTeX, no Pandoc required.

THOX brand:
  background #0B1220, foreground #F2F4F8, cyan #27E5FF, magenta #FF3DA8
  IBM Plex Sans body, JetBrains Mono mono (fallback Helvetica + Courier if
  TrueType fonts are not installed on the rig).

Usage:
  python tools/render/render_investor_deck.py
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
LAUNCH_DIR = REPO_ROOT / "content" / "launch"

BG = HexColor("#0B1220")
FG = HexColor("#F2F4F8")
MUTED = HexColor("#9AA4B2")
CYAN = HexColor("#27E5FF")
MAGENTA = HexColor("#FF3DA8")
RULE = HexColor("#1F2A3B")


# ---------------------------------------------------------------------------
# Fonts: try IBM Plex Sans + JetBrains Mono, fall back gracefully.
# ---------------------------------------------------------------------------
def _register_fonts() -> Tuple[str, str, str, str]:
    body_regular = "Helvetica"
    body_bold = "Helvetica-Bold"
    body_italic = "Helvetica-Oblique"
    mono = "Courier"

    candidates = [
        # Windows user fonts (where Plex usually lands when installed)
        Path(os.environ.get("LOCALAPPDATA", "")) / "Microsoft" / "Windows" / "Fonts",
        Path("C:/Windows/Fonts"),
        Path("/usr/share/fonts"),
        Path("/usr/local/share/fonts"),
    ]

    def find(name_fragments: List[str]) -> Path | None:
        for base in candidates:
            if not base.exists():
                continue
            for p in base.rglob("*.ttf"):
                lower = p.name.lower()
                if all(frag in lower for frag in name_fragments):
                    return p
            for p in base.rglob("*.otf"):
                lower = p.name.lower()
                if all(frag in lower for frag in name_fragments):
                    return p
        return None

    plex_regular = find(["ibmplexsans", "regular"]) or find(["plexsans", "regular"])
    plex_bold = find(["ibmplexsans", "bold"]) or find(["plexsans", "bold"])
    plex_italic = find(["ibmplexsans", "italic"]) or find(["plexsans", "italic"])
    jb_regular = find(["jetbrainsmono", "regular"]) or find(["jetbrains", "regular"])

    try:
        if plex_regular:
            pdfmetrics.registerFont(TTFont("IBMPlexSans", str(plex_regular)))
            body_regular = "IBMPlexSans"
        if plex_bold:
            pdfmetrics.registerFont(TTFont("IBMPlexSans-Bold", str(plex_bold)))
            body_bold = "IBMPlexSans-Bold"
        if plex_italic:
            pdfmetrics.registerFont(TTFont("IBMPlexSans-Italic", str(plex_italic)))
            body_italic = "IBMPlexSans-Italic"
        if jb_regular:
            pdfmetrics.registerFont(TTFont("JetBrainsMono", str(jb_regular)))
            mono = "JetBrainsMono"
    except Exception:
        # Fall back silently to PDF core fonts.
        pass

    return body_regular, body_bold, body_italic, mono


BODY, BODY_BOLD, BODY_ITALIC, MONO = _register_fonts()


# ---------------------------------------------------------------------------
# Markdown -> Platypus, just enough for our two source docs.
# ---------------------------------------------------------------------------
def _md_inline(text: str) -> str:
    """Tiny inline-markdown to ReportLab mini-HTML."""
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", rf'<font name="{MONO}">\1</font>', text)
    return text


def _styles():
    base = dict(textColor=FG, fontName=BODY, leading=14, fontSize=10.5)
    return {
        "h1": ParagraphStyle(
            "h1",
            **{**base, "fontName": BODY_BOLD, "fontSize": 26, "leading": 30,
               "textColor": CYAN, "spaceAfter": 6, "spaceBefore": 12},
        ),
        "h2": ParagraphStyle(
            "h2",
            **{**base, "fontName": BODY_BOLD, "fontSize": 18, "leading": 22,
               "textColor": CYAN, "spaceAfter": 6, "spaceBefore": 18},
        ),
        "h3": ParagraphStyle(
            "h3",
            **{**base, "fontName": BODY_BOLD, "fontSize": 13, "leading": 17,
               "textColor": MAGENTA, "spaceAfter": 4, "spaceBefore": 12},
        ),
        "p": ParagraphStyle("p", **{**base, "spaceAfter": 6}),
        "li": ParagraphStyle(
            "li",
            **{**base, "leftIndent": 14, "bulletIndent": 0, "spaceAfter": 3},
        ),
        "notes_label": ParagraphStyle(
            "notes_label",
            **{**base, "fontName": BODY_BOLD, "textColor": MAGENTA,
               "fontSize": 9, "spaceBefore": 6, "spaceAfter": 2},
        ),
        "notes": ParagraphStyle(
            "notes",
            **{**base, "textColor": MUTED, "fontSize": 9, "leading": 12,
               "leftIndent": 6, "rightIndent": 6, "spaceAfter": 4,
               "fontName": BODY_ITALIC},
        ),
        "take_label": ParagraphStyle(
            "take_label",
            **{**base, "fontName": BODY_BOLD, "textColor": CYAN,
               "fontSize": 10, "spaceBefore": 8, "spaceAfter": 0},
        ),
        "take_body": ParagraphStyle(
            "take_body",
            **{**base, "fontName": BODY_BOLD, "textColor": FG,
               "fontSize": 10.5, "spaceAfter": 4},
        ),
        "rule_caption": ParagraphStyle(
            "rule_caption",
            **{**base, "textColor": MUTED, "fontSize": 8, "leading": 10,
               "alignment": 1},
        ),
    }


def _table_from_md(lines: List[str]) -> Table | None:
    """Convert a contiguous block of markdown-table lines to a styled Table."""
    rows = [l for l in lines if "|" in l]
    if len(rows) < 2:
        return None
    cells = []
    for r in rows:
        if re.fullmatch(r"\s*\|?[-:\s\|]+\|?\s*", r):
            continue
        parts = [c.strip() for c in r.strip().strip("|").split("|")]
        cells.append(parts)
    if not cells:
        return None
    styles = _styles()
    table_data = []
    for ri, row in enumerate(cells):
        row_paras = []
        for c in row:
            style = ParagraphStyle(
                "cell",
                fontName=BODY_BOLD if ri == 0 else BODY,
                fontSize=9.5,
                leading=12,
                textColor=CYAN if ri == 0 else FG,
            )
            row_paras.append(Paragraph(_md_inline(c), style))
        table_data.append(row_paras)
    n_cols = max(len(r) for r in table_data)
    for r in table_data:
        while len(r) < n_cols:
            r.append(Paragraph("", styles["p"]))
    col_w = (LETTER[0] - 1.5 * inch) / n_cols
    t = Table(table_data, colWidths=[col_w] * n_cols, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#101A2C")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [BG, HexColor("#0E1828")]),
        ("LINEBELOW", (0, 0), (-1, 0), 0.75, CYAN),
        ("BOX", (0, 0), (-1, -1), 0.25, RULE),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def parse_markdown(md_text: str, is_one_pager: bool = False) -> List:
    styles = _styles()
    flow: List = []
    lines = md_text.splitlines()
    i = 0
    n = len(lines)
    seen_first_h2 = False

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Skip the markdown-source preamble before the first horizontal rule.
        # The deck and one-pager both have an explanatory preamble we do not
        # want on the PDF.
        if not seen_first_h2 and stripped == "---" and i < 20:
            i += 1
            continue

        # Table block.
        if "|" in stripped and i + 1 < n and re.fullmatch(
            r"\s*\|?[-:\s\|]+\|?\s*", lines[i + 1].strip()
        ):
            block = []
            while i < n and "|" in lines[i]:
                block.append(lines[i])
                i += 1
            tbl = _table_from_md(block)
            if tbl is not None:
                flow.append(Spacer(1, 4))
                flow.append(tbl)
                flow.append(Spacer(1, 6))
            continue

        # Heading.
        if stripped.startswith("## "):
            text = stripped[3:].strip()
            # Slide separator: page-break per slide except the very first.
            if not is_one_pager:
                if seen_first_h2:
                    flow.append(PageBreak())
                seen_first_h2 = True
            else:
                seen_first_h2 = True
            flow.append(Paragraph(_md_inline(text), styles["h2"]))
            i += 1
            continue

        if stripped.startswith("### "):
            text = stripped[4:].strip()
            flow.append(Paragraph(_md_inline(text), styles["h3"]))
            i += 1
            continue

        if stripped.startswith("# "):
            text = stripped[2:].strip()
            flow.append(Paragraph(_md_inline(text), styles["h1"]))
            i += 1
            continue

        # Speaker-notes block: lines starting with "> "
        if stripped.startswith("> Speaker notes"):
            note_lines = []
            i += 1
            while i < n and lines[i].lstrip().startswith(">"):
                raw = lines[i].lstrip()
                if raw.startswith(">"):
                    raw = raw[1:]
                raw = raw.strip()
                if raw:
                    note_lines.append(raw)
                i += 1
            if note_lines:
                flow.append(Paragraph("Speaker notes", styles["notes_label"]))
                flow.append(Paragraph(_md_inline(" ".join(note_lines)),
                                      styles["notes"]))
            continue

        # Key takeaway marker.
        if stripped.startswith("**Key takeaway:**"):
            body = stripped[len("**Key takeaway:**"):].strip()
            flow.append(Paragraph("Key takeaway", styles["take_label"]))
            flow.append(Paragraph(_md_inline(body), styles["take_body"]))
            i += 1
            continue

        # Horizontal rule.
        if stripped == "---":
            if seen_first_h2 and is_one_pager:
                flow.append(Spacer(1, 6))
            i += 1
            continue

        # Bulleted list.
        if stripped.startswith("- ") or stripped.startswith("* "):
            while i < n and (lines[i].strip().startswith("- ")
                              or lines[i].strip().startswith("* ")):
                body = lines[i].strip()[2:].strip()
                flow.append(Paragraph(_md_inline(body), styles["li"],
                                      bulletText="•"))
                i += 1
            flow.append(Spacer(1, 2))
            continue

        # Numbered list.
        if re.match(r"^\d+\.\s+", stripped):
            num = 1
            while i < n and re.match(r"^\d+\.\s+", lines[i].strip()):
                body = re.sub(r"^\d+\.\s+", "", lines[i].strip())
                flow.append(Paragraph(_md_inline(body), styles["li"],
                                      bulletText=f"{num}."))
                num += 1
                i += 1
            flow.append(Spacer(1, 2))
            continue

        # Blank line.
        if not stripped:
            flow.append(Spacer(1, 4))
            i += 1
            continue

        # Plain paragraph.
        flow.append(Paragraph(_md_inline(stripped), styles["p"]))
        i += 1

    return flow


# ---------------------------------------------------------------------------
# Page chrome.
# ---------------------------------------------------------------------------
def _draw_chrome(canvas, doc, title: str, footer_extra: str = ""):
    w, h = LETTER
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    # top accent
    canvas.setFillColor(CYAN)
    canvas.rect(0, h - 0.18 * inch, w, 0.06 * inch, fill=1, stroke=0)
    canvas.setFillColor(MAGENTA)
    canvas.rect(0, h - 0.24 * inch, w * 0.18, 0.04 * inch, fill=1, stroke=0)
    # header text
    canvas.setFillColor(FG)
    canvas.setFont(BODY_BOLD, 9)
    canvas.drawString(0.75 * inch, h - 0.46 * inch, title)
    canvas.setFillColor(MUTED)
    canvas.setFont(BODY, 8)
    canvas.drawRightString(w - 0.75 * inch, h - 0.46 * inch,
                           "THOX.ai LLC  -  Confidential  -  DRAFT")
    # footer
    canvas.setFillColor(MUTED)
    canvas.setFont(BODY, 8)
    page_num = canvas.getPageNumber()
    canvas.drawRightString(w - 0.75 * inch, 0.4 * inch, f"Page {page_num}")
    canvas.drawString(0.75 * inch, 0.4 * inch,
                      "github.com/ttracx  -  Aug 12, 2026 Kickstarter launch  " +
                      footer_extra)
    canvas.restoreState()


def render(md_path: Path, pdf_path: Path, title: str, is_one_pager: bool):
    text = md_path.read_text(encoding="utf-8")
    flow = parse_markdown(text, is_one_pager=is_one_pager)

    doc = BaseDocTemplate(
        str(pdf_path),
        pagesize=LETTER,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.85 * inch,
        bottomMargin=0.7 * inch,
        title=title,
        author="Tommy Xaypanya + Craig Ross",
        subject="THOX.ai Investor Materials",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="body",
        showBoundary=0,
    )

    def on_page(canvas, d):
        _draw_chrome(canvas, d, title)

    doc.addPageTemplates([
        PageTemplate(id="default", frames=[frame], onPage=on_page),
    ])
    doc.build(flow)
    print(f"wrote {pdf_path}  ({pdf_path.stat().st_size:,} bytes)")


def main() -> int:
    deck_md = LAUNCH_DIR / "INVESTOR_DECK.md"
    op_md = LAUNCH_DIR / "INVESTOR_DECK_ONE_PAGER.md"
    if not deck_md.exists():
        print(f"missing {deck_md}", file=sys.stderr)
        return 1
    if not op_md.exists():
        print(f"missing {op_md}", file=sys.stderr)
        return 1

    render(deck_md, LAUNCH_DIR / "INVESTOR_DECK.pdf",
           "THOX.ai Investor Deck", is_one_pager=False)
    render(op_md, LAUNCH_DIR / "INVESTOR_DECK_ONE_PAGER.pdf",
           "THOX.ai Investor One-Pager", is_one_pager=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
