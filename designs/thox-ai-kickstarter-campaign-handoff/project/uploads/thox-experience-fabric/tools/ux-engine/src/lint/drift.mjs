/**
 * drift.mjs - fail if committed dist/ does not match a fresh build of the tokens.
 *
 * The whole point of the mechanism: nobody hand-edits a platform output. This
 * rebuilds every artifact in memory, hashes it, and compares to dist/manifest.json.
 * Any mismatch, missing file, or stale manifest is drift and blocks the merge.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { buildArtifacts } from '../build.mjs';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const sha = (s) => createHash('sha256').update(s).digest('hex');

export function detectDrift() {
  const manifestPath = join(DIST, 'manifest.json');
  if (!existsSync(manifestPath)) {
    return { ok: false, reason: 'dist/manifest.json missing - run `npm run build`', drifted: [] };
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const fresh = buildArtifacts();
  const drifted = [];

  for (const [rel, contents] of Object.entries(fresh)) {
    const expected = manifest.files[rel];
    if (!expected) { drifted.push({ rel, kind: 'not-in-manifest' }); continue; }
    if (expected !== sha(contents)) drifted.push({ rel, kind: 'content-changed' });
  }
  for (const rel of Object.keys(manifest.files)) {
    if (!(rel in fresh)) drifted.push({ rel, kind: 'orphan-in-manifest' });
    else if (!existsSync(join(DIST, rel))) drifted.push({ rel, kind: 'missing-on-disk' });
  }
  return { ok: drifted.length === 0, drifted, version: manifest.version };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const res = detectDrift();
  if (res.reason) console.log(res.reason);
  for (const d of res.drifted) console.log(`DRIFT [${d.kind}] dist/${d.rel}`);
  console.log(`drift: ${res.ok ? 'clean' : res.drifted.length + ' drifted artifact(s) - run `npm run build` and commit dist/'}`);
  process.exit(res.ok ? 0 : 1);
}
