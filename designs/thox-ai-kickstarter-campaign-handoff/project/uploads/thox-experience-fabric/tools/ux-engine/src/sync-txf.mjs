/**
 * sync-txf.mjs - write (or verify) the TXF runtime token bundle from the engine.
 *
 * The engine is the single source of truth. This script projects the engine
 * tokens into the flat v2.0 bundle consumed by the Rust crate
 * `txf-design-tokens` and writes it to:
 *   design-systems/thox-ai-txf/TOKENS.json
 *
 * Usage (run from anywhere; paths resolve relative to the repo root):
 *   node tools/ux-engine/src/sync-txf.mjs            # write TOKENS.json
 *   node tools/ux-engine/src/sync-txf.mjs --check    # exit 1 if out of sync (CI gate)
 *
 * The --check mode is the drift gate for the TXF runtime tokens: if a developer
 * hand-edits TOKENS.json, CI fails and points them back at the engine source.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { emitTxfTokensJson } from './emit/txf.mjs';

// repo root is three levels up from tools/ux-engine/src
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const TARGET = join(REPO_ROOT, 'design-systems', 'thox-ai-txf', 'TOKENS.json');

function main() {
  const check = process.argv.includes('--check');
  const next = emitTxfTokensJson();

  if (check) {
    if (!existsSync(TARGET)) {
      console.error(`drift: ${TARGET} is missing. Run: node tools/ux-engine/src/sync-txf.mjs`);
      process.exit(1);
    }
    const current = readFileSync(TARGET, 'utf8');
    if (current !== next) {
      console.error('drift: design-systems/thox-ai-txf/TOKENS.json is out of sync with the engine.');
      console.error('Run: node tools/ux-engine/src/sync-txf.mjs');
      process.exit(1);
    }
    console.log('TXF tokens in sync with engine source.');
    return;
  }

  writeFileSync(TARGET, next, 'utf8');
  console.log(`Wrote ${TARGET}`);
}

main();
