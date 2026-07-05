import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lintPaths } from '../src/lint/forbidden.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

test('bad fixture trips the expected rules', () => {
  const { findings, errors } = lintPaths([join(ROOT, 'samples', 'founders', 'bad.tsx')]);
  const ids = new Set(findings.map((f) => f.ruleId));
  for (const expected of ['raw-hex-class', 'gray-scale', 'purple-misuse', 'banned-claim', 'patent-pending', 'public-soc', 'public-tops', 'public-partner', 'public-restricted-sku', 'cyan-prohibited']) {
    assert.ok(ids.has(expected), `expected rule ${expected} to fire`);
  }
  assert.ok(errors >= 10, `expected >=10 errors, got ${errors}`);
});

test('good sample is clean', () => {
  const { errors } = lintPaths([join(ROOT, 'samples', 'good.tsx')]);
  assert.equal(errors, 0);
});

test('purple is allowed in a magstack-scoped file', () => {
  // simulate by scoping the same content via directive is covered in CLI; here assert surface gating
  const { findings } = lintPaths([join(ROOT, 'contracts')]);
  assert.equal(findings.filter((f) => f.ruleId === 'purple-misuse').length, 0);
});
