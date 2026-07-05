import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ratio, checkContrast } from '../src/lint/contrast.mjs';
import { listThemes } from '../src/resolve.mjs';

test('ratio of black on white is ~21:1', () => {
  assert.ok(Math.abs(ratio('#000000', '#ffffff') - 21) < 0.1);
});

test('every theme passes its required contrast pairs', () => {
  for (const t of listThemes()) {
    const res = checkContrast(t);
    assert.equal(res.failures.length, 0, `theme ${t} has failures: ${JSON.stringify(res.failures)}`);
  }
});
