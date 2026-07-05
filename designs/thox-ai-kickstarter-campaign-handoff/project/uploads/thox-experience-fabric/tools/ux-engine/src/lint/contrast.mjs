/**
 * contrast.mjs - WCAG 2.1 contrast gate over semantic color pairs.
 *
 * Verifies that the resolved tokens for each theme keep the foreground/background
 * pairs that actually ship in product above their required ratio. Fails loud so a
 * token edit that breaks accessibility cannot merge.
 */
import { resolveTheme } from '../resolve.mjs';
import { parseHex } from '../emit/util.mjs';

function relLum(hex) {
  const { r, g, b } = parseHex(hex);
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

export function ratio(fg, bg) {
  const a = relLum(fg) + 0.05;
  const b = relLum(bg) + 0.05;
  return (Math.max(a, b) / Math.min(a, b));
}

// Interactive UI themes (apps + device): full set of shipping pairs.
const INTERACTIVE_PAIRS = [
  ['color.text.primary', 'color.bg.canvas', 4.5, 'body on page'],
  ['color.text.primary', 'color.bg.surface', 4.5, 'body on card'],
  ['color.text.secondary', 'color.bg.surface', 4.5, 'secondary on card'],
  ['color.text.muted', 'color.bg.canvas', 3.0, 'muted (large/secondary)'],
  ['color.text.onAccent', 'color.brand.primary', 4.5, 'label on primary button'],
  ['color.brand.primary', 'color.bg.canvas', 3.0, 'accent text/icon (AA large)'],
  ['color.text.code', 'color.bg.canvas', 4.5, 'code text'],
  ['color.state.danger', 'color.bg.canvas', 3.0, 'danger indicator'],
];

// Document theme (light): static; emerald is large accent only, body is dark.
const DOCUMENT_PAIRS = [
  ['color.text.primary', 'color.bg.canvas', 4.5, 'body on page'],
  ['color.text.primary', 'color.bg.surface', 4.5, 'body on table fill'],
  ['color.text.secondary', 'color.bg.surface', 4.5, 'secondary on table fill'],
  ['color.text.muted', 'color.bg.canvas', 3.0, 'muted (large/secondary)'],
  ['color.text.accent', 'color.bg.canvas', 4.5, 'accent heading'],
  ['color.state.danger', 'color.bg.canvas', 3.0, 'danger indicator'],
];

const pairsFor = (themeName) => (themeName === 'doc' ? DOCUMENT_PAIRS : INTERACTIVE_PAIRS);

export function checkContrast(themeName) {
  const { tokens } = resolveTheme(themeName);
  const rows = [];
  for (const [fgP, bgP, min, note] of pairsFor(themeName)) {
    const fg = tokens.get(fgP)?.value;
    const bg = tokens.get(bgP)?.value;
    if (!fg || !bg) { rows.push({ fgP, bgP, ratio: 0, min, pass: false, note: `missing token` }); continue; }
    const r = ratio(fg, bg);
    rows.push({ fgP, bgP, fg, bg, ratio: Math.round(r * 100) / 100, min, pass: r >= min, note });
  }
  return { theme: themeName, rows, failures: rows.filter((r) => !r.pass) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const themes = process.argv.slice(2);
  const list = themes.length ? themes : ['base', 'meshstack', 'doc'];
  let failed = 0;
  for (const t of list) {
    const res = checkContrast(t);
    console.log(`\n[theme: ${t}]`);
    for (const r of res.rows) {
      console.log(`  ${r.pass ? 'PASS' : 'FAIL'} ${r.ratio}:1 (min ${r.min}) ${r.fgP} on ${r.bgP} - ${r.note}`);
    }
    failed += res.failures.length;
  }
  console.log(`\ncontrast: ${failed} failure(s)`);
  process.exit(failed > 0 ? 1 : 0);
}
