/**
 * verify.mjs - single CI/local gate. Runs every read-only check and aggregates.
 *
 * Gates: forbidden-patterns (consumer source), contrast (all themes),
 * contract validation + coverage, dist drift. Exits nonzero if any gate fails.
 * CI runs `build` first so drift confirms the committed dist is deterministic.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lintPaths } from './lint/forbidden.mjs';
import { checkContrast } from './lint/contrast.mjs';
import { validateContracts } from './lint/contracts.mjs';
import { detectDrift } from './lint/drift.mjs';
import { listThemes } from './resolve.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Consumer source to lint. Point this at app dirs in real repos.
const LINT_TARGETS = (process.argv.slice(2).length ? process.argv.slice(2) : [
  join(ROOT, 'contracts'),
  join(ROOT, 'packages', 'react'),
  join(ROOT, 'samples', 'good.tsx'),
]);

function run() {
  const results = [];

  const lint = lintPaths(LINT_TARGETS);
  results.push({ gate: 'forbidden-patterns', ok: lint.errors === 0, detail: `${lint.errors} error(s), ${lint.warnings} warning(s)` });
  for (const f of lint.findings.filter((x) => x.severity === 'error')) {
    console.log(`  forbidden ${f.file}:${f.line} [${f.ruleId}] ${f.message}`);
  }

  let contrastFail = 0;
  for (const t of listThemes()) contrastFail += checkContrast(t).failures.length;
  results.push({ gate: 'contrast (AA)', ok: contrastFail === 0, detail: `${contrastFail} failing pair(s) across ${listThemes().length} theme(s)` });

  const contracts = validateContracts();
  results.push({ gate: 'component-contracts', ok: contracts.errors.length === 0, detail: `${contracts.count} contract(s), ${contracts.errors.length} error(s)` });
  for (const e of contracts.errors) console.log(`  contract ${e}`);

  const drift = detectDrift();
  results.push({ gate: 'dist-drift', ok: drift.ok, detail: drift.ok ? 'clean' : `${drift.drifted.length} drifted` });
  for (const d of drift.drifted ?? []) console.log(`  drift [${d.kind}] dist/${d.rel}`);

  console.log('\nTHOX UX verification');
  for (const r of results) console.log(`  [${r.ok ? 'PASS' : 'FAIL'}] ${r.gate.padEnd(22)} ${r.detail}`);
  const failed = results.filter((r) => !r.ok);
  console.log(failed.length ? `\n${failed.length} gate(s) failed.` : '\nAll gates passed.');
  return failed.length === 0;
}

process.exit(run() ? 0 : 1);
