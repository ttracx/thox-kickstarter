/**
 * forbidden.mjs - THOX brand & compliance guardrail linter.
 *
 * Scans consumer source (app screens, pages, components, copy) for the brand,
 * privacy, and public-disclosure violations that the design-note enumerates.
 * This is the "guardrail brain" of the standardization mechanism: it converts
 * prose rules into machine-enforced gates so drift can't merge.
 *
 * Surface model (a file declares scope via path or a `thox:surface=...` directive):
 *   - magstack : purple is permitted here only
 *   - public   : founders/marketing copy; SoC/TOPS/algorithm/SKU/partner terms blocked
 *   - internal : default; engineering docs may name internal hardware
 *
 * CLI:  node src/lint/forbidden.mjs <path...>   (exit 1 on any error finding)
 */
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const TEXT_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.swift', '.kt', '.kts', '.rs', '.css', '.scss', '.html', '.md', '.json', '.txt', '.vue', '.svelte']);

function detectSurface(path, body) {
  const p = path.toLowerCase();
  const m = body.match(/thox:surface=(\w+)/);
  if (m) return m[1];
  if (/(magstack)/.test(p)) return 'magstack';
  if (/(public|founders|marketing|kickstarter)\//.test(p)) return 'public';
  return 'internal';
}

// Each rule: id, severity, surfaces (null = all), test(line) -> boolean, message.
const RULES = [
  { id: 'raw-hex-class', severity: 'error', surfaces: null,
    re: /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration)-\[#[0-9a-fA-F]{3,8}\]/,
    message: 'Raw hex in a utility class. Use a token (e.g. bg-surface-card, text-ink-primary).' },
  { id: 'gray-scale', severity: 'error', surfaces: null,
    re: /\b(?:bg|text|border|ring|from|to|via|fill|stroke)-gray-\d{2,3}\b/,
    message: 'Tailwind gray-* scale drifts from zinc-*. Use the zinc scale / semantic tokens.' },
  { id: 'cyan-prohibited', severity: 'error', surfaces: null,
    re: /\bcyan-\d{2,3}\b|#06b6d4\b|#22d3ee\b/i,
    message: 'Cyan is prohibited in the THOX palette.' },
  { id: 'purple-misuse', severity: 'error', surfaces: ['internal', 'public'],
    re: /\bpurple-\d{2,3}\b|#a855f7\b|#c084fc\b|\b168,\s*85,\s*247\b/i,
    message: 'Purple is reserved for MagStack content only. Mark the file thox:surface=magstack or use amber/blue.' },
  { id: 'banned-claim', severity: 'error', surfaces: null,
    re: /\bunhackable\b|\bmilitary[- ]grade\b|no central server|we cannot decrypt|can'?t be hacked/i,
    message: 'Banned privacy/marketing claim. Use approved MeshStack language (e.g. "coordinator never sees plaintext").' },
  { id: 'patent-pending', severity: 'error', surfaces: null,
    re: /patent[- ]pending/i,
    message: 'No "Patent Pending" language anywhere. IP status is NOT FILED.' },
  { id: 'public-soc', severity: 'error', surfaces: ['public'],
    re: /\b(intel\s*n305|n305|rv1106|rk3588|cm5|jetson|orin)\b/i,
    message: 'SoC / silicon identity must not appear in public surfaces.' },
  { id: 'public-tops', severity: 'error', surfaces: ['public'],
    re: /\b\d+(?:\.\d+)?\s*tops\b|\btops\b/i,
    message: 'TOPS figures must not appear in public surfaces.' },
  { id: 'public-algorithm', severity: 'error', surfaces: ['public'],
    re: /\b(polarquant|fwht|\brht\b)\b/i,
    message: 'Internal algorithm names must not appear in public surfaces.' },
  { id: 'public-partner', severity: 'error', surfaces: ['public'],
    re: /\b(seeed|arrow electronics)\b/i,
    message: 'Manufacturing partner identity must not appear in public surfaces.' },
  { id: 'public-restricted-sku', severity: 'error', surfaces: ['public'],
    re: /\b(cluster dock|magstack pad|nova pro|nova lite)\b/i,
    message: 'Only THOX Nova is a public Founders SKU. Remove restricted SKU references.' },
  { id: 'tok-s-unmeasured', severity: 'warn', surfaces: null,
    re: /\b\d+(?:\.\d+)?\s*tok\/s/i,
    message: 'Numeric tok/s must be measured and dated. Use "— tok/s" until a benchmark value exists.' },
  { id: 'em-dash', severity: 'warn', surfaces: null,
    re: /\u2014/,
    message: 'No em dashes in THOX content.' },
  { id: 'emoji', severity: 'warn', surfaces: null,
    re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u,
    message: 'No emojis in THOX content.' },
];

// Directories skipped during a directory sweep. These hold data, fixtures,
// generated output, or the linter's own rule definitions, none of which are
// THOX product content. An explicit file path always lints regardless (so the
// violation fixture and any single file can still be targeted directly).
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist',
  'tokens',     // token data: the source palette defines purple primitives by design
  'contracts',  // component data, not copy
  'test',       // test corpora that name rule ids
  'samples',    // clean and violation fixtures, asserted by their own tests
  'src',        // the engine itself, including these regex literals
]);

function walk(path, acc = []) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const e of readdirSync(path)) {
      if (SKIP_DIRS.has(e)) continue;
      walk(join(path, e), acc);
    }
  } else if (TEXT_EXT.has(extname(path))) {
    acc.push(path);
  }
  return acc;
}

/** Lint a set of paths. Returns { findings, errors, warnings }. */
export function lintPaths(paths, { ignore = [] } = {}) {
  const files = paths.flatMap((p) => walk(p)).filter((f) => !ignore.some((ig) => f.includes(ig)));
  const findings = [];
  for (const file of files) {
    const body = readFileSync(file, 'utf8');
    if (body.includes('thox-lint:disable-file')) continue;
    const surface = detectSurface(file, body);
    body.split('\n').forEach((line, i) => {
      if (line.includes('thox-lint:allow')) return;
      for (const rule of RULES) {
        if (rule.surfaces && !rule.surfaces.includes(surface)) continue;
        const m = line.match(rule.re);
        if (m) {
          findings.push({
            file, line: i + 1, col: (m.index ?? 0) + 1, surface,
            ruleId: rule.id, severity: rule.severity, message: rule.message,
            excerpt: line.trim().slice(0, 120),
          });
        }
      }
    });
  }
  return {
    findings,
    errors: findings.filter((f) => f.severity === 'error').length,
    warnings: findings.filter((f) => f.severity === 'warn').length,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const targets = process.argv.slice(2);
  if (!targets.length) { console.error('usage: forbidden.mjs <path...>'); process.exit(2); }
  const { findings, errors, warnings } = lintPaths(targets);
  for (const f of findings) {
    console.log(`${f.severity.toUpperCase()} ${f.file}:${f.line}:${f.col} [${f.ruleId}] (${f.surface}) ${f.message}\n    > ${f.excerpt}`);
  }
  console.log(`\nforbidden-patterns: ${errors} error(s), ${warnings} warning(s) across ${targets.join(' ')}`);
  process.exit(errors > 0 ? 1 : 0);
}
