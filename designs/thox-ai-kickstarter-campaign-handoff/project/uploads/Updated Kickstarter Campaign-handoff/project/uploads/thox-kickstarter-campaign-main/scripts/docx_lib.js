"use strict";

/**
 * Brand-compliant, design-forward Word renderer for the Thox.ai campaign.
 *
 * Exports:
 *   renderDocument(spec) -> docx.Document
 *   writeDocument(spec, outPath) -> Promise<number>  (resolves to byte size)
 *
 * A spec is: { title, subtitle, eyebrow, kind, blocks }
 *   kind: "public" (default) or "internal"
 *   blocks: array of block objects. Supported block types:
 *     h1, h2, h3, kicker, p, lead, bullets, numbers, table, rule, callout,
 *     quote, banner, stats, cards, spacer, pagebreak
 *
 * Page: US Letter, 1 inch margins, Calibri body, emerald accents, dark ink.
 * Every document opens with an emerald hero band (title reversed out in white).
 * The horizontal Thox.ai logo is embedded above the band if present in assets/.
 *
 * No emoji and no em dash are ever emitted; the visual language is built from
 * color, shading, and borders so generated copy always clears the guardrails.
 */

const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  VerticalAlign,
  PageNumber,
  Footer,
  TabStopType,
  TabStopPosition,
  LevelFormat,
  ImageRun,
  convertInchesToTwip,
} = require("docx");

// Brand palette.
const COLOR_EMERALD = "10B981";
const COLOR_EMERALD_DARK = "0B6E4F";
const COLOR_EMERALD_LIGHT = "6EE7B7"; // light mint, for text on dark bands
const COLOR_INK = "111827";
const COLOR_SLATE = "4B5563"; // muted ink for labels and captions
const COLOR_WHITE = "FFFFFF";
const COLOR_CALLOUT_BG = "E6F7EF"; // light emerald wash
const COLOR_CARD_BG = "F0FAF5"; // softer emerald wash for cards and stats
const COLOR_ZEBRA = "F5FBF8"; // near-white emerald tint for alternating rows
const COLOR_HAIRLINE = "D5E8DE"; // subtle emerald-gray rule

const BODY_FONT = "Calibri";

// US Letter in twips (1/1440 inch). 8.5in x 11in.
const PAGE_WIDTH = convertInchesToTwip(8.5);
const PAGE_HEIGHT = convertInchesToTwip(11);
const MARGIN = convertInchesToTwip(1);
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 9360 twips

const KNOWN_BLOCKS = new Set([
  "h1",
  "h2",
  "h3",
  "kicker",
  "p",
  "lead",
  "bullets",
  "numbers",
  "table",
  "rule",
  "callout",
  "quote",
  "banner",
  "stats",
  "cards",
  "spacer",
  "pagebreak",
]);

const LOGO_PATH = path.join(__dirname, "..", "assets", "THOX_ai_Logo_Horiz.png");

// A borderless border-set so tables read as floating color tiles.
function gapBorders(color = COLOR_WHITE, size = 18) {
  const edge = { style: BorderStyle.SINGLE, size, color };
  return {
    top: edge,
    bottom: edge,
    left: edge,
    right: edge,
    insideHorizontal: edge,
    insideVertical: edge,
  };
}

const NO_BORDERS = (() => {
  const none = { style: BorderStyle.NONE, size: 0, color: COLOR_WHITE };
  return {
    top: none,
    bottom: none,
    left: none,
    right: none,
    insideHorizontal: none,
    insideVertical: none,
  };
})();

/** Validate a spec eagerly; throw on anything malformed. */
function validateSpec(spec) {
  if (!spec || typeof spec !== "object") {
    throw new Error("Spec must be an object.");
  }
  if (typeof spec.title !== "string" || spec.title.length === 0) {
    throw new Error("Spec.title must be a non-empty string.");
  }
  if (!Array.isArray(spec.blocks)) {
    throw new Error("Spec.blocks must be an array.");
  }
  spec.blocks.forEach((block, i) => {
    if (!block || typeof block !== "object" || typeof block.type !== "string") {
      throw new Error(`Block ${i} must be an object with a string 'type'.`);
    }
    if (!KNOWN_BLOCKS.has(block.type)) {
      throw new Error(`Block ${i} has unknown type '${block.type}'.`);
    }
    if (block.type === "table") {
      if (!Array.isArray(block.header) || block.header.length === 0) {
        throw new Error(`Table block ${i} requires a non-empty 'header' array.`);
      }
      if (!Array.isArray(block.rows)) {
        throw new Error(`Table block ${i} requires a 'rows' array.`);
      }
      const cols = block.header.length;
      block.rows.forEach((row, r) => {
        if (!Array.isArray(row) || row.length !== cols) {
          throw new Error(
            `Table block ${i} row ${r} must have ${cols} cells to match the header.`
          );
        }
      });
      if (block.widths && block.widths.length !== cols) {
        throw new Error(`Table block ${i} 'widths' must have ${cols} entries.`);
      }
    }
    if (block.type === "stats") {
      if (!Array.isArray(block.items) || block.items.length === 0) {
        throw new Error(`Stats block ${i} requires a non-empty 'items' array.`);
      }
      block.items.forEach((it, s) => {
        if (!it || typeof it.value !== "string" || typeof it.label !== "string") {
          throw new Error(`Stats block ${i} item ${s} needs string 'value' and 'label'.`);
        }
      });
    }
    if (block.type === "cards") {
      if (!Array.isArray(block.items) || block.items.length === 0) {
        throw new Error(`Cards block ${i} requires a non-empty 'items' array.`);
      }
      block.items.forEach((it, c) => {
        if (!it || typeof it.title !== "string" || typeof it.body !== "string") {
          throw new Error(`Cards block ${i} item ${c} needs string 'title' and 'body'.`);
        }
      });
    }
    if (block.type === "quote") {
      if (typeof block.text !== "string" || block.text.length === 0) {
        throw new Error(`Quote block ${i} requires a non-empty 'text'.`);
      }
    }
  });
}

function runs(text) {
  return new TextRun({ text: String(text), font: BODY_FONT, color: COLOR_INK });
}

// A small filled square that leads section headings, built from shading on a
// run of spaces so it never relies on a glyph that could trip the emoji gate.
function accentChip(fill = COLOR_EMERALD) {
  return new TextRun({
    text: "  ",
    font: BODY_FONT,
    color: fill,
    shading: { type: ShadingType.CLEAR, fill, color: "auto" },
  });
}

function headingParagraph(text, level) {
  const sizes = { h1: 36, h2: 27, h3: 23 }; // half-points
  const colors = { h1: COLOR_EMERALD_DARK, h2: COLOR_EMERALD_DARK, h3: COLOR_INK };
  const heading = { h1: HeadingLevel.HEADING_1, h2: HeadingLevel.HEADING_2, h3: HeadingLevel.HEADING_3 };
  const children = [];
  if (level === "h2") {
    children.push(accentChip(COLOR_EMERALD), new TextRun({ text: "  ", font: BODY_FONT }));
  } else if (level === "h3") {
    children.push(accentChip(COLOR_EMERALD_LIGHT), new TextRun({ text: "  ", font: BODY_FONT }));
  }
  children.push(
    new TextRun({
      text: String(text),
      font: BODY_FONT,
      bold: true,
      size: sizes[level],
      color: colors[level],
    })
  );
  return new Paragraph({
    heading: heading[level],
    spacing: { before: level === "h1" ? 280 : 220, after: level === "h3" ? 80 : 120 },
    children,
  });
}

function kickerParagraph(text) {
  return new Paragraph({
    spacing: { before: 160, after: 40 },
    children: [
      new TextRun({
        text: String(text).toUpperCase(),
        font: BODY_FONT,
        bold: true,
        size: 16,
        color: COLOR_EMERALD_DARK,
        characterSpacing: 30,
      }),
    ],
  });
}

function paragraph(text) {
  return new Paragraph({
    spacing: { after: 140, line: 288 },
    children: [runs(text)],
  });
}

// A lead paragraph: larger, slate-toned intro text.
function leadParagraph(text) {
  return new Paragraph({
    spacing: { after: 180, line: 300 },
    children: [new TextRun({ text: String(text), font: BODY_FONT, size: 26, color: COLOR_SLATE })],
  });
}

function bulletList(items) {
  return items.map(
    (item) =>
      new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 70, line: 288 },
        children: [runs(item)],
      })
  );
}

function numberList(items, reference) {
  return items.map(
    (item) =>
      new Paragraph({
        numbering: { reference, level: 0 },
        spacing: { after: 70, line: 288 },
        children: [runs(item)],
      })
  );
}

function ruleParagraph() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      bottom: { color: COLOR_HAIRLINE, space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [new TextRun({ text: "", font: BODY_FONT })],
  });
}

function calloutParagraph(text) {
  return new Paragraph({
    spacing: { before: 140, after: 140, line: 288 },
    shading: { type: ShadingType.CLEAR, fill: COLOR_CALLOUT_BG, color: "auto" },
    border: {
      left: { color: COLOR_EMERALD, space: 10, style: BorderStyle.SINGLE, size: 24 },
      top: { color: COLOR_CALLOUT_BG, space: 6, style: BorderStyle.SINGLE, size: 6 },
      bottom: { color: COLOR_CALLOUT_BG, space: 6, style: BorderStyle.SINGLE, size: 6 },
      right: { color: COLOR_CALLOUT_BG, space: 6, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [
      new TextRun({ text: String(text), font: BODY_FONT, color: COLOR_EMERALD_DARK, bold: true }),
    ],
  });
}

// A pull quote rendered as a single shaded cell with a heavy emerald spine.
function quoteBlock(block) {
  const lines = [
    new Paragraph({
      spacing: { after: block.attribution ? 100 : 0, line: 300 },
      children: [
        new TextRun({ text: "“", font: BODY_FONT, bold: true, size: 40, color: COLOR_EMERALD }),
        new TextRun({ text: String(block.text), font: BODY_FONT, size: 26, color: COLOR_INK }),
        new TextRun({ text: "”", font: BODY_FONT, bold: true, size: 40, color: COLOR_EMERALD }),
      ],
    }),
  ];
  if (block.attribution) {
    lines.push(
      new Paragraph({
        children: [
          new TextRun({
            text: String(block.attribution).toUpperCase(),
            font: BODY_FONT,
            bold: true,
            size: 17,
            color: COLOR_EMERALD_DARK,
            characterSpacing: 20,
          }),
        ],
      })
    );
  }
  const cell = new TableCell({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    margins: { top: 220, bottom: 220, left: 280, right: 280 },
    shading: { type: ShadingType.CLEAR, fill: COLOR_CARD_BG, color: "auto" },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: COLOR_WHITE },
      bottom: { style: BorderStyle.NONE, size: 0, color: COLOR_WHITE },
      right: { style: BorderStyle.NONE, size: 0, color: COLOR_WHITE },
      left: { style: BorderStyle.SINGLE, size: 36, color: COLOR_EMERALD },
    },
    children: lines,
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    borders: NO_BORDERS,
    rows: [new TableRow({ children: [cell] })],
  });
}

// A full-width emerald section divider with reversed white text.
function bannerBlock(block) {
  const fill = block.tone === "light" ? COLOR_EMERALD : COLOR_EMERALD_DARK;
  const cell = new TableCell({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    margins: { top: 160, bottom: 160, left: 240, right: 240 },
    shading: { type: ShadingType.CLEAR, fill, color: "auto" },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: String(block.text),
            font: BODY_FONT,
            bold: true,
            size: 26,
            color: COLOR_WHITE,
          }),
        ],
      }),
    ],
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    borders: NO_BORDERS,
    rows: [new TableRow({ children: [cell] })],
  });
}

// A row of stat tiles: big emerald figure over a muted label.
function statsBlock(block) {
  const items = block.items;
  const n = items.length;
  const base = Math.floor(CONTENT_WIDTH / n);
  const widths = new Array(n).fill(base);
  widths[n - 1] = CONTENT_WIDTH - base * (n - 1);
  const cells = items.map((it, i) => {
    const children = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [
          new TextRun({ text: String(it.value), font: BODY_FONT, bold: true, size: 44, color: COLOR_EMERALD_DARK }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: String(it.label).toUpperCase(),
            font: BODY_FONT,
            bold: true,
            size: 15,
            color: COLOR_SLATE,
            characterSpacing: 20,
          }),
        ],
      }),
    ];
    return new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 200, bottom: 200, left: 120, right: 120 },
      shading: { type: ShadingType.CLEAR, fill: COLOR_CARD_BG, color: "auto" },
      verticalAlign: VerticalAlign.CENTER,
      children,
    });
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    borders: gapBorders(COLOR_WHITE, 30),
    rows: [new TableRow({ children: cells })],
  });
}

// A grid of content cards: title over body, laid out in `columns` per row.
function cardsBlock(block) {
  const items = block.items;
  const cols = Math.min(block.columns || 2, items.length);
  const base = Math.floor(CONTENT_WIDTH / cols);
  const widths = new Array(cols).fill(base);
  widths[cols - 1] = CONTENT_WIDTH - base * (cols - 1);

  function cardCell(item, width) {
    if (!item) {
      return new TableCell({
        width: { size: width, type: WidthType.DXA },
        borders: NO_BORDERS,
        children: [new Paragraph({ children: [new TextRun({ text: "", font: BODY_FONT })] })],
      });
    }
    const children = [
      new Paragraph({
        spacing: { after: 60 },
        children: [
          item.tag
            ? new TextRun({
                text: String(item.tag).toUpperCase() + "   ",
                font: BODY_FONT,
                bold: true,
                size: 14,
                color: COLOR_EMERALD,
                characterSpacing: 20,
              })
            : new TextRun({ text: "", font: BODY_FONT }),
        ],
      }),
      new Paragraph({
        spacing: { after: 70 },
        children: [new TextRun({ text: String(item.title), font: BODY_FONT, bold: true, size: 24, color: COLOR_EMERALD_DARK })],
      }),
      new Paragraph({
        spacing: { line: 276 },
        children: [new TextRun({ text: String(item.body), font: BODY_FONT, size: 20, color: COLOR_INK })],
      }),
    ];
    return new TableCell({
      width: { size: width, type: WidthType.DXA },
      margins: { top: 180, bottom: 180, left: 200, right: 200 },
      shading: { type: ShadingType.CLEAR, fill: COLOR_CARD_BG, color: "auto" },
      verticalAlign: VerticalAlign.TOP,
      children,
    });
  }

  const rows = [];
  for (let r = 0; r < items.length; r += cols) {
    const slice = items.slice(r, r + cols);
    while (slice.length < cols) slice.push(null);
    rows.push(new TableRow({ children: slice.map((it, c) => cardCell(it, widths[c])) }));
  }
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    borders: gapBorders(COLOR_WHITE, 30),
    rows,
  });
}

function spacerParagraph() {
  return new Paragraph({ children: [new TextRun({ text: "", font: BODY_FONT })], spacing: { after: 120 } });
}

function pageBreakParagraph() {
  return new Paragraph({ pageBreakBefore: true, children: [new TextRun({ text: "", font: BODY_FONT })] });
}

const CELL_MARGINS = { top: 90, bottom: 90, left: 140, right: 140 };

function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: CELL_MARGINS,
    shading: { type: ShadingType.CLEAR, fill: COLOR_EMERALD_DARK, color: "auto" },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: String(text).toUpperCase(),
            font: BODY_FONT,
            bold: true,
            size: 18,
            color: COLOR_WHITE,
            characterSpacing: 14,
          }),
        ],
      }),
    ],
  });
}

function bodyCell(text, width, fill) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: CELL_MARGINS,
    shading: { type: ShadingType.CLEAR, fill, color: "auto" },
    children: [new Paragraph({ spacing: { line: 276 }, children: [runs(text)] })],
  });
}

function tableBlock(block) {
  const cols = block.header.length;
  let widths = block.widths;
  if (!widths) {
    const base = Math.floor(CONTENT_WIDTH / cols);
    widths = new Array(cols).fill(base);
    widths[cols - 1] = CONTENT_WIDTH - base * (cols - 1); // absorb rounding
  }
  const zebra = block.zebra !== false; // zebra striping on by default
  const rows = [];
  rows.push(new TableRow({ tableHeader: true, children: block.header.map((h, c) => headerCell(h, widths[c])) }));
  block.rows.forEach((row, r) => {
    const fill = zebra && r % 2 === 1 ? COLOR_ZEBRA : COLOR_WHITE;
    rows.push(new TableRow({ children: row.map((cell, c) => bodyCell(cell, widths[c], fill)) }));
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    borders: gapBorders(COLOR_WHITE, 14),
    rows,
  });
}

// The emerald hero band that opens every document.
function heroBlock(spec) {
  const eyebrow = spec.eyebrow || (spec.kind === "internal" ? "Internal Playbook" : "Thox.ai Campaign");
  const children = [
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: String(eyebrow).toUpperCase(),
          font: BODY_FONT,
          bold: true,
          size: 18,
          color: COLOR_EMERALD_LIGHT,
          characterSpacing: 50,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: spec.subtitle ? 120 : 0, line: 320 },
      children: [
        new TextRun({ text: spec.title, font: BODY_FONT, bold: true, size: 52, color: COLOR_WHITE }),
      ],
    }),
  ];
  if (spec.subtitle) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: spec.subtitle, font: BODY_FONT, size: 26, color: "E6FFF4" })],
      })
    );
  }
  const cell = new TableCell({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    margins: { top: 420, bottom: 420, left: 380, right: 380 },
    shading: { type: ShadingType.CLEAR, fill: COLOR_EMERALD_DARK, color: "auto" },
    children,
  });
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    borders: NO_BORDERS,
    rows: [new TableRow({ children: [cell] })],
  });
}

function titleBlock(spec) {
  const children = [];
  if (fs.existsSync(LOGO_PATH)) {
    try {
      children.push(
        new Paragraph({
          spacing: { after: 140 },
          children: [
            new ImageRun({
              data: fs.readFileSync(LOGO_PATH),
              transformation: { width: 180, height: 48 },
            }),
          ],
        })
      );
    } catch (err) {
      console.warn(`warning: could not embed logo (${err.message}); continuing without it.`);
    }
  } else {
    console.warn(`warning: logo not found at ${LOGO_PATH}; continuing without it.`);
  }
  children.push(heroBlock(spec));
  // A slim emerald accent rule directly under the band.
  children.push(
    new Paragraph({
      spacing: { before: 0, after: 200 },
      border: { bottom: { color: COLOR_EMERALD, space: 1, style: BorderStyle.SINGLE, size: 18 } },
      children: [new TextRun({ text: "", font: BODY_FONT })],
    })
  );
  return children;
}

/** Build the document children and accumulate numbering configs. */
function buildChildren(spec) {
  const children = [...titleBlock(spec)];
  const numbering = [];
  let numCounter = 0;

  for (const block of spec.blocks) {
    switch (block.type) {
      case "h1":
      case "h2":
      case "h3":
        children.push(headingParagraph(block.text, block.type));
        break;
      case "kicker":
        children.push(kickerParagraph(block.text));
        break;
      case "p":
        children.push(paragraph(block.text));
        break;
      case "lead":
        children.push(leadParagraph(block.text));
        break;
      case "bullets":
        children.push(...bulletList(block.items || []));
        break;
      case "numbers": {
        // Each numbered list gets its own reference so it restarts at 1.
        const reference = `num-${numCounter++}`;
        numbering.push({
          reference,
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: { paragraph: { indent: { left: 480, hanging: 240 } } },
            },
          ],
        });
        children.push(...numberList(block.items || [], reference));
        break;
      }
      case "table":
        children.push(tableBlock(block));
        break;
      case "rule":
        children.push(ruleParagraph());
        break;
      case "callout":
        children.push(calloutParagraph(block.text));
        break;
      case "quote":
        children.push(quoteBlock(block));
        break;
      case "banner":
        children.push(bannerBlock(block));
        break;
      case "stats":
        children.push(statsBlock(block));
        break;
      case "cards":
        children.push(cardsBlock(block));
        break;
      case "spacer":
        children.push(spacerParagraph());
        break;
      case "pagebreak":
        children.push(pageBreakParagraph());
        break;
      default:
        // validateSpec already guards this, but fail loudly just in case.
        throw new Error(`Unhandled block type '${block.type}'.`);
    }
  }
  return { children, numbering };
}

function buildFooter(spec) {
  const label = spec.kind === "internal" ? "Thox.ai LLC  |  Internal Use" : "Thox.ai LLC";
  return new Footer({
    children: [
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        border: { top: { color: COLOR_HAIRLINE, space: 6, style: BorderStyle.SINGLE, size: 4 } },
        children: [
          new TextRun({ text: label, font: BODY_FONT, size: 16, color: COLOR_SLATE }),
          new TextRun({ text: "\t", font: BODY_FONT }),
          new TextRun({ text: "Page ", font: BODY_FONT, size: 16, color: COLOR_SLATE }),
          new TextRun({ children: [PageNumber.CURRENT], font: BODY_FONT, size: 16, bold: true, color: COLOR_EMERALD_DARK }),
        ],
      }),
    ],
  });
}

/** Render a spec into a docx.Document. */
function renderDocument(spec) {
  validateSpec(spec);
  const { children, numbering } = buildChildren(spec);
  return new Document({
    creator: "Thox.ai LLC",
    title: spec.title,
    description: spec.subtitle || spec.title,
    styles: {
      default: {
        document: { run: { font: BODY_FONT, size: 22, color: COLOR_INK } },
      },
    },
    numbering: { config: numbering },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        footers: { default: buildFooter(spec) },
        children,
      },
    ],
  });
}

/** Render and write a spec to disk. Resolves to the file size in bytes. */
async function writeDocument(spec, outPath) {
  const doc = renderDocument(spec);
  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  return buffer.length;
}

module.exports = {
  renderDocument,
  writeDocument,
  validateSpec,
  CONTENT_WIDTH,
};
