import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme, listThemes, flatValue } from '../src/resolve.mjs';

test('resolves alias references to primitive hex', () => {
  const { tokens } = resolveTheme('base');
  assert.equal(flatValue(tokens, 'color.bg.canvas'), '#09090b');
  assert.equal(flatValue(tokens, 'color.brand.primary'), '#10b981');
  assert.equal(flatValue(tokens, 'color.text.code'), '#34d399');
});

test('meshstack overlay overrides only what it declares', () => {
  const base = resolveTheme('base').tokens;
  const mesh = resolveTheme('meshstack').tokens;
  assert.equal(flatValue(mesh, 'color.bg.canvas'), '#000000');         // overridden
  assert.equal(flatValue(mesh, 'color.brand.primary'), flatValue(base, 'color.brand.primary')); // inherited
});

test('doc theme flips to light and swaps font family', () => {
  const doc = resolveTheme('doc').tokens;
  assert.equal(flatValue(doc, 'color.text.primary'), '#000000');
  assert.match(flatValue(doc, 'type.family.sans'), /Xolonium/);
});

test('role labels resolve as strings', () => {
  const { tokens } = resolveTheme('base');
  assert.equal(flatValue(tokens, 'role.device.origin'), 'Origin');
  assert.equal(flatValue(tokens, 'role.device.anchor'), 'Anchor');
});

test('listThemes includes all overlays', () => {
  assert.deepEqual(new Set(listThemes()), new Set(['base', 'doc', 'meshstack']));
});

test('flatValue throws on unknown token', () => {
  const { tokens } = resolveTheme('base');
  assert.throws(() => flatValue(tokens, 'color.does.not.exist'), /Token not found/);
});
