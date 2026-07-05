/**
 * build.mjs - compile the token source of truth to every platform target.
 *
 * Resolves all themes once, runs each emitter, writes dist/, and records a
 * manifest (package version + per-file sha256). The manifest is what the drift
 * detector compares against, so a stale committed dist fails CI.
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { resolveTheme, listThemes } from './resolve.mjs';
import { emitCss } from './emit/css.mjs';
import { emitTailwind } from './emit/tailwind.mjs';
import { emitSwift } from './emit/swift.mjs';
import { emitKotlin } from './emit/kotlin.mjs';
import { emitRust } from './emit/rust.mjs';
import { emitFigma } from './emit/figma.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/** Resolve every known theme into the shape emitters expect. */
export function resolveAll() {
  return listThemes().map((name) => resolveTheme(name));
}

/** Produce { relativePath: contents } for all platform outputs, in memory. */
export function buildArtifacts() {
  const themes = resolveAll();
  const resolvedJson = Object.fromEntries(
    themes.map((t) => [t.name, Object.fromEntries([...t.tokens].map(([p, v]) => [p, { type: v.type, value: v.value }]))]),
  );
  return {
    'web/thox-tokens.css': emitCss(themes),
    'web/tailwind-preset.cjs': emitTailwind(),
    'swift/ThoxTokens.swift': emitSwift(themes),
    'kotlin/ThoxTokens.kt': emitKotlin(themes),
    'rust/thox_tokens.rs': emitRust(themes),
    'figma/thox.tokens.json': emitFigma(themes),
    'tokens.resolved.json': JSON.stringify(resolvedJson, null, 2) + '\n',
  };
}

const sha = (s) => createHash('sha256').update(s).digest('hex');

function pkgVersion() {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

/** Write artifacts to dist/ and a manifest. Returns the manifest object. */
export function build({ clean = true } = {}) {
  const artifacts = buildArtifacts();
  if (clean) rmSync(DIST, { recursive: true, force: true });
  const manifest = { version: pkgVersion(), generated: new Date().toISOString(), files: {} };
  for (const [rel, contents] of Object.entries(artifacts)) {
    const abs = join(DIST, rel);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, contents);
    manifest.files[rel] = sha(contents);
  }
  writeFileSync(join(DIST, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const manifest = build();
  const count = Object.keys(manifest.files).length;
  console.log(`Built ${count} artifacts for themes [${listThemes().join(', ')}] -> dist/`);
  for (const f of Object.keys(manifest.files)) console.log(`  dist/${f}`);
}
