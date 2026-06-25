# THOX user manuals

Per-device printed-or-PDF user manuals shipped in every backer carton on
fulfillment day (Aug 12, 2026 wave). The manuals are short on purpose:
6 to 8 pages each, US Letter, single-column, IBM Plex Sans body + JetBrains
Mono code, THOX cyan (`#27E5FF`) accents on the headings.

## What is here

| Folder | Source | Rendered | Size | SHA-256 prefix |
|---|---|---|---:|---|
| `thoxclip/`             | `MANUAL.md` (1442 words) | `MANUAL.pdf` | ~111 KB | `b66b99a13bcc0fb6` |
| `thoxmini/`             | `MANUAL.md` (1231 words) | `MANUAL.pdf` | ~111 KB | `85330f5f59c253b1` |
| `thoxmini-air/`         | `MANUAL.md` (1370 words) | `MANUAL.pdf` | ~111 KB | `a12dd863157e29e7` |
| `thoxnova/`             | `MANUAL.md` (1326 words) | `MANUAL.pdf` | ~154 KB | `d5172ec8b632b96b` |
| `magstack-cluster-dock/`| `MANUAL.md` (1547 words) | `MANUAL.pdf` | ~110 KB | `9bfd634d22ac28fe` |
| `thoxkey/`              | `MANUAL.md` (1713 words) | `MANUAL.pdf` | ~113 KB | `556388abd66278c0` |
| `COVER_TEMPLATE.md`     | -                        | -            | -      | shared cover layout |
| `BACK_COVER_TEMPLATE.md`| -                        | -            | -      | regulatory + recycling |

Manual structure is identical across devices:

1. Welcome (1 page): warm intro, what's in the box, safety highlights, intent
2. Quick start (1 page): 5-step power-on + first-interaction
3. Full setup (3-5 pages): identity, hostname, SSH, Tailscale, model loadout, skills
4. Troubleshooting (1-2 pages): the most common failure modes and recoveries
5. Warranty + support (1 page): 1-year limited warranty, `dev@thox.ai`, telemetry opt-out, license summary
6. Open source notice (1 page): per-device dependency tree

Total: roughly 7 to 8 PDF pages per manual.

## Regenerating

The PDFs are rendered by `render_pdfs.py` using `markdown-pdf`, a pure-Python
library that wraps PyMuPDF (no LaTeX, no GTK, no wkhtmltopdf needed). Install
once:

```powershell
pip install markdown-pdf
```

Then from the repo root:

```powershell
python content\manuals\render_pdfs.py
```

The script:

1. Reads each device's `MANUAL.md`
2. Strips the YAML frontmatter
3. Splits at each `\newpage` marker into PDF Sections (one section = one
   page break, with the next section starting on a fresh page)
4. Applies the THOX brand CSS (`#0B1220` headings on `#27E5FF` underlines,
   IBM Plex Sans body, JetBrains Mono code, US Letter paper)
5. Writes `<device>/MANUAL.pdf` with embedded metadata (title, author, subject)
6. Prints SHAs for tracking

Re-run after every Markdown edit. The PDFs in git are the canonical render;
update them in the same commit as the Markdown change.

## Print specs

Default render is US Letter (8.5 in x 11 in).

For EU A4 print runs (210 mm x 297 mm), patch `render_pdfs.py` to pass
`paper_size="A4"` to each `Section(...)`. The layout absorbs the
slightly taller page without overflow because the manuals are
naturally short and prose-paced.

Recommended print parameters for the print shop:

| Parameter | Value |
|---|---|
| Paper                  | 100 gsm matte white interior; 250 gsm cover for the wraparound |
| Cover                  | Wraparound from `COVER_TEMPLATE.md`; front + spine + back-cover from `BACK_COVER_TEMPLATE.md` |
| Binding                | Saddle-stitch (2 staples) for 8 to 12 page manuals |
| Color                  | CMYK; THOX cyan `#27E5FF` is in-gamut; magenta `#FF3DA8` rendered as printable approximation |
| Margins                | 1 in (US) / 25 mm (EU) on all sides |
| Bleed                  | 3 mm on the cover only |

## Per-device cross-links

| Device | BOM / kit | Provisioning runbook | Warranty SKU |
|---|---|---|---|
| ThoxClip | (Pi Zero 2 W enclosure tbd) | `ttracx/thox-quickstart/docs/THOXCLIP_PHYSICAL_SETUP.md` | THX-CLIP-100 |
| ThoxMini | `ttracx/thox-3dprint-kit/devices/thoxmini` | `THOXMINI_PROVISIONING.md` + `THOXMINI_FINISH_WIRING.md` | THX-MINI-100 |
| ThoxMini Air | `ttracx/thox-3dprint-kit/devices/thoxmini-air` | `THOXMINI_AIR_PROVISIONING.md` | THX-AIR-100 |
| ThoxNova | (LattePanda N100 chassis tbd) | `THOXNOVA_PROVISIONING.md` | THX-NOVA-100 |
| MagStack Cluster Dock | `ttracx/thox-3dprint-kit/devices/magstack-cluster-dock` | `magstack-cluster-dock/PRINT_GUIDE.md` | THX-DOCK-4N / THX-DOCK-8N |
| THOXKey | `ttracx/thox-key` | `thox-key/docs/MODEL_LOADOUT.md` | THX-KEY-* (tier-specific) |

## Editorial constraints

The Markdown source is held to the THOX brand-voice constraints:

- No em-dashes (use plain hyphens or restructure)
- No emojis
- No Claude / Anthropic / Anthropic-trademark leaks
- US English spelling
- Acronyms expanded on first use per manual
- Code blocks fenced with triple backticks; language tag optional

The lint script at `ttracx/thox-workbench/scripts/lint-prompts.mjs`
will catch the first three constraint violations if you import it.

## Founder voice review

Before fulfillment, the founder should walk every manual once and tweak
copy where the THOX voice differs from the agent-default tone. Common
areas:

- Welcome paragraph: rhythm and warmth
- Safety highlights: relative weight
- Quick-start: the exact word-choice for power-up steps
- Warranty: the precise scope of the 1-year limited

Edit the Markdown source; re-run `render_pdfs.py`; commit both source +
rendered PDF in one commit.

## Why no LaTeX / Pandoc / wkhtmltopdf

These tools are all great, but each adds a system-level install with
a non-trivial Windows footprint (LaTeX is several GB; wkhtmltopdf
requires QtWebKit; Pandoc plus xelatex needs both). The `markdown-pdf`
+ PyMuPDF combo is one `pip install`, pure-Python, runs on the same
Python that ships with the Hermes/Cowork agent harness, and produces
clean, brand-consistent PDFs at ~110 to 160 KB per manual.

If a future revision needs print-shop-grade typography (kerning,
ligatures, real font subsetting), swap the renderer to Pandoc +
xelatex and check in the resulting PDFs. The Markdown source stays
identical.

## License

The manuals are Apache-2.0 like the rest of the `thox-kickstarter`
repository. The trademark THOX.ai and ThoxKey / ThoxMini / ThoxNova
/ MagStack are trademarks of THOX.ai and are not licensed for
unaffiliated commercial use.
