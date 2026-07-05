import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContracts } from '../src/lint/contracts.mjs';

test('all shipped contracts are valid', () => {
  const { errors, count } = validateContracts();
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.ok(count >= 4);
});

test('every contract maps all five platforms', () => {
  const { rows } = validateContracts();
  for (const r of rows) assert.equal(r.platforms, 5, `${r.id} maps ${r.platforms}/5 platforms`);
});
