/**
 * Tests for the TXF v2.0 token projection (src/emit/txf.mjs).
 * Asserts the flat schema arity and that brand colors derive from the engine
 * core palette (the single-source-of-truth guarantee).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTxfTokens, assertTxfShape, emitTxfTokensJson } from '../src/emit/txf.mjs';
import { resolveTheme, flatValue } from '../src/resolve.mjs';

test('TXF bundle satisfies the flat v2.0 shape', () => {
  const t = buildTxfTokens();
  assert.equal(assertTxfShape(t), true);
  assert.equal(t.version, '2.0');
  assert.equal(Object.keys(t.colors).length, 11);
  assert.equal(t.spacing.scale_px.length, 12);
  assert.equal(t.radius.scale_px.length, 6);
  assert.equal(t.typography.weights.length, 5);
  assert.equal(t.typography.scale_rem.length, 8);
  assert.equal(t.motion.duration_ms.length, 5);
});

test('brand colors derive from the engine core palette', () => {
  const base = resolveTheme('base');
  const t = buildTxfTokens();
  assert.equal(t.colors.emerald.toLowerCase(), flatValue(base.tokens, 'color.core.emerald.500'));
  assert.equal(t.colors.emerald_bright.toLowerCase(), flatValue(base.tokens, 'color.core.emerald.400'));
  assert.equal(t.colors.magstack_purple.toLowerCase(), flatValue(base.tokens, 'color.core.purple.500'));
  assert.equal(t.colors.danger.toLowerCase(), flatValue(base.tokens, 'color.core.red'));
  assert.equal(t.colors.black.toLowerCase(), flatValue(base.tokens, 'color.core.zinc.950'));
});

test('min touch target comes from the engine target token', () => {
  const t = buildTxfTokens();
  assert.equal(t.layout.min_touch_target_px, 44);
});

test('serialized form is stable and newline-terminated', () => {
  const a = emitTxfTokensJson();
  const b = emitTxfTokensJson();
  assert.equal(a, b);
  assert.ok(a.endsWith('\n'));
  assert.doesNotThrow(() => JSON.parse(a));
});
