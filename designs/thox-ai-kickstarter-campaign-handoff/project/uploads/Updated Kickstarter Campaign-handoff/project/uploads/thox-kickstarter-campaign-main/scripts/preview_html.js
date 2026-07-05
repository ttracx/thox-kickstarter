"use strict";

/**
 * HTML preview generator for the Thox.ai campaign documents.
 *
 * The Word renderer (scripts/docx_lib.js) is the source of truth for the
 * shipped collateral. This script renders the very same content specs
 * (scripts/content.js) into self-contained HTML files so the visual design
 * can be reviewed in any browser without Word. The palette, hero band, stat
 * tiles, feature cards, pull quotes, and section banners mirror the docx
 * output one to one.
 *
 * Usage: node scripts/preview_html.js   ->   writes docs/preview/*.html
 */

const fs = require("fs");
const path = require("path");
const documents = require("./content");

const OUT_DIR = path.join(__dirname, "..", "docs", "preview");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderTable(block) {
  const head = block.header.map((h) => `<th>${esc(h)}</th>`).join("");
  const body = block.rows
    .map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderStats(block) {
  const tiles = block.items
    .map(
      (it) =>
        `<div class="stat"><div class="stat-value">${esc(it.value)}</div><div class="stat-label">${esc(
          it.label
        )}</div></div>`
    )
    .join("");
  return `<div class="stats">${tiles}</div>`;
}

function renderCards(block) {
  const cols = Math.min(block.columns || 2, block.items.length);
  const tiles = block.items
    .map(
      (it) =>
        `<div class="card">${
          it.tag ? `<div class="card-tag">${esc(it.tag)}</div>` : ""
        }<div class="card-title">${esc(it.title)}</div><div class="card-body">${esc(it.body)}</div></div>`
    )
    .join("");
  return `<div class="cards" style="grid-template-columns:repeat(${cols},1fr)">${tiles}</div>`;
}

function renderBlock(block) {
  switch (block.type) {
    case "h1":
      return `<h1>${esc(block.text)}</h1>`;
    case "h2":
      return `<h2>${esc(block.text)}</h2>`;
    case "h3":
      return `<h3>${esc(block.text)}</h3>`;
    case "kicker":
      return `<div class="kicker">${esc(block.text)}</div>`;
    case "p":
      return `<p>${esc(block.text)}</p>`;
    case "lead":
      return `<p class="lead">${esc(block.text)}</p>`;
    case "bullets":
      return `<ul>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "numbers":
      return `<ol>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
    case "table":
      return renderTable(block);
    case "rule":
      return `<hr>`;
    case "callout":
      return `<div class="callout">${esc(block.text)}</div>`;
    case "quote":
      return `<blockquote><span class="q">&ldquo;</span>${esc(block.text)}<span class="q">&rdquo;</span>${
        block.attribution ? `<cite>${esc(block.attribution)}</cite>` : ""
      }</blockquote>`;
    case "banner":
      return `<div class="banner">${esc(block.text)}</div>`;
    case "stats":
      return renderStats(block);
    case "cards":
      return renderCards(block);
    case "spacer":
      return `<div class="spacer"></div>`;
    case "pagebreak":
      return `<div class="pagebreak"></div>`;
    default:
      throw new Error(`Unknown block type '${block.type}' in preview.`);
  }
}

const CSS = `
:root{
  --emerald:#10B981; --emerald-dark:#0B6E4F; --emerald-light:#6EE7B7;
  --ink:#111827; --slate:#4B5563; --card:#F0FAF5; --zebra:#F5FBF8;
  --callout:#E6F7EF; --hair:#D5E8DE;
}
*{box-sizing:border-box}
body{margin:0;background:#E5E7EB;font-family:Calibri,'Segoe UI',system-ui,sans-serif;color:var(--ink);padding:32px 16px}
.page{max-width:8.5in;margin:0 auto 28px;background:#fff;padding:1in;box-shadow:0 8px 30px rgba(0,0,0,.18);border-radius:2px}
.hero{background:var(--emerald-dark);color:#fff;padding:40px 36px;border-radius:4px}
.hero .eyebrow{color:var(--emerald-light);font-weight:700;font-size:13px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:12px}
.hero h1{margin:0;font-size:42px;line-height:1.1;color:#fff}
.hero .subtitle{margin-top:14px;font-size:19px;color:#E6FFF4}
.accent-rule{height:3px;background:var(--emerald);margin:0 0 22px}
h1{font-size:27px;color:var(--emerald-dark)}
h2{font-size:21px;color:var(--emerald-dark);margin:26px 0 12px;display:flex;align-items:center}
h2::before{content:"";display:inline-block;width:14px;height:14px;background:var(--emerald);margin-right:10px;border-radius:2px}
h3{font-size:18px;color:var(--ink);margin:20px 0 6px;display:flex;align-items:center}
h3::before{content:"";display:inline-block;width:11px;height:11px;background:var(--emerald-light);margin-right:9px;border-radius:2px}
.kicker{color:var(--emerald-dark);font-weight:700;font-size:12px;letter-spacing:.18em;text-transform:uppercase;margin:16px 0 4px}
p{line-height:1.55;margin:0 0 12px}
p.lead{font-size:20px;color:var(--slate);line-height:1.5;margin-bottom:18px}
ul,ol{line-height:1.55;margin:0 0 14px;padding-left:22px}
li{margin-bottom:6px}
hr{border:none;border-top:1px solid var(--hair);margin:14px 0}
.callout{background:var(--callout);border-left:5px solid var(--emerald);color:var(--emerald-dark);font-weight:700;padding:14px 16px;border-radius:3px;margin:16px 0}
blockquote{background:var(--card);border-left:7px solid var(--emerald);margin:16px 0;padding:20px 26px;border-radius:3px}
blockquote .q{color:var(--emerald);font-weight:700;font-size:26px;line-height:0}
blockquote{font-size:20px;line-height:1.5}
blockquote cite{display:block;margin-top:12px;color:var(--emerald-dark);font-weight:700;font-style:normal;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.banner{background:var(--emerald-dark);color:#fff;font-weight:700;font-size:19px;padding:14px 20px;border-radius:4px;margin:22px 0 14px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:10px;margin:18px 0}
.stat{background:var(--card);border-radius:4px;padding:20px 12px;text-align:center}
.stat-value{font-size:30px;font-weight:700;color:var(--emerald-dark);line-height:1.1}
.stat-label{margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate)}
.cards{display:grid;gap:12px;margin:16px 0}
.card{background:var(--card);border-radius:4px;padding:18px 18px}
.card-tag{color:var(--emerald);font-weight:700;font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.card-title{color:var(--emerald-dark);font-weight:700;font-size:19px;margin-bottom:6px}
.card-body{color:var(--ink);font-size:15px;line-height:1.5}
table{width:100%;border-collapse:separate;border-spacing:3px;margin:16px 0}
th{background:var(--emerald-dark);color:#fff;text-align:left;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:9px 12px;border-radius:2px}
td{padding:9px 12px;font-size:14px;line-height:1.45;vertical-align:top;background:#fff;border-radius:2px}
tbody tr:nth-child(even) td{background:var(--zebra)}
.spacer{height:14px}
.pagebreak{height:2px;background:repeating-linear-gradient(90deg,var(--hair) 0 8px,transparent 8px 16px);margin:26px 0}
.footer{margin-top:30px;padding-top:10px;border-top:1px solid var(--hair);display:flex;justify-content:space-between;font-size:12px;color:var(--slate)}
.footer .pg{color:var(--emerald-dark);font-weight:700}
`;

function renderPage(spec) {
  const eyebrow = spec.eyebrow || (spec.kind === "internal" ? "Internal Playbook" : "Thox.ai Campaign");
  const label = spec.kind === "internal" ? "Thox.ai LLC  |  Internal Use" : "Thox.ai LLC";
  const body = spec.blocks.map(renderBlock).join("\n");
  return `<section class="page">
  <div class="hero">
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(spec.title)}</h1>
    ${spec.subtitle ? `<div class="subtitle">${esc(spec.subtitle)}</div>` : ""}
  </div>
  <div class="accent-rule"></div>
  ${body}
  <div class="footer"><span>${esc(label)}</span><span class="pg">Page 1</span></div>
</section>`;
}

function htmlDocument(title, inner) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>${CSS}</style>
</head><body>
${inner}
</body></html>`;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const links = [];
  for (const doc of documents) {
    const outName = doc.file.replace(/\.docx$/, ".html");
    const html = htmlDocument(doc.spec.title, renderPage(doc.spec));
    fs.writeFileSync(path.join(OUT_DIR, outName), html);
    links.push({ name: doc.spec.title, file: outName });
    console.log(`  ok  ${outName}`);
  }
  // A combined gallery that stacks every document.
  const all = documents.map((d) => renderPage(d.spec)).join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "all.html"), htmlDocument("Thox.ai Campaign Collateral", all));
  console.log("  ok  all.html");
  // A small index for convenience.
  const index = `<h2 style="font-family:Calibri,sans-serif">Thox.ai campaign previews</h2><ul style="font-family:Calibri,sans-serif;line-height:1.8">${links
    .map((l) => `<li><a href="${l.file}">${esc(l.name)}</a></li>`)
    .join("")}<li><a href="all.html">All documents (gallery)</a></li></ul>`;
  fs.writeFileSync(path.join(OUT_DIR, "index.html"), htmlDocument("Previews", index));
  console.log("  ok  index.html");
  console.log(`Previews written to ${OUT_DIR}`);
}

main();
