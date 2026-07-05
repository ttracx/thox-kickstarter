/**
 * txf.mjs - emits the TXF runtime token bundle (design-systems/thox-ai-txf/TOKENS.json).
 *
 * This is the compatibility bridge between the engine (the single source of
 * truth) and the TXF Rust crate `txf-design-tokens`, which deserializes the
 * flat v2.0 schema. Brand COLORS are derived from the engine core palette so a
 * change to emerald in tokens/core/color.json propagates into the TXF runtime
 * automatically. TXF-specific structural scales come from
 * tokens/targets/txf-v2.overrides.json (the single authoring point for those).
 *
 * Output schema is the exact flat shape the Rust structs require:
 *   { version, colors, typography, spacing, radius, motion, elevation, layout }
 * serde ignores key order, so a value-preserving regeneration deserializes
 * cleanly into the existing structs.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveTheme, flatValue } from '../resolve.mjs';

const ENGINE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Load the TXF structural overrides (non-color scales unique to the TXF runtime). */
function loadOverrides() {
  const p = join(ENGINE_ROOT, 'tokens', 'targets', 'txf-v2.overrides.json');
  return JSON.parse(readFileSync(p, 'utf8'));
}

/** Pull a core color hex from the resolved base theme by dot path. */
function coreColor(base, path) {
  const v = flatValue(base.tokens, path);
  if (typeof v !== 'string' || v[0] !== '#') {
    throw new Error(`Expected hex at ${path}, got ${String(v)}`);
  }
  return v.toUpperCase();
}

/**
 * Build the flat TXF v2.0 token bundle.
 * @returns {object} the TOKENS.json contents
 */
export function buildTxfTokens() {
  const base = resolveTheme('base');
  const o = loadOverrides();

  // Brand colors derived from the engine core palette (single source of truth).
  const colors = {
    black: coreColor(base, 'color.core.zinc.950'),
    surface: o.surfaces.surface,
    card: o.surfaces.card,
    border: coreColor(base, 'color.core.zinc.800'),
    emerald: coreColor(base, 'color.core.emerald.500'),
    emerald_bright: coreColor(base, 'color.core.emerald.400'),
    magstack_purple: coreColor(base, 'color.core.purple.500'),
    success: coreColor(base, 'color.core.emerald.500'),
    warning: coreColor(base, 'color.core.amber'),
    danger: coreColor(base, 'color.core.red'),
    info: coreColor(base, 'color.core.blue'),
  };

  const typography = {
    primary_family: o.typography.primary_family,
    mono_family: o.typography.mono_family,
    weights: o.typography.weights,
    scale_rem: o.typography.scale_rem,
  };

  return {
    version: o.version,
    colors,
    typography,
    spacing: { scale_px: o.spacing.scale_px },
    radius: { scale_px: o.radius.scale_px },
    motion: {
      duration_ms: o.motion.duration_ms,
      easing_default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      easing_emphasized: 'cubic-bezier(0.2, 0.0, 0.0, 1)',
      reduced_motion_default_ms: o.motion.reduced_motion_default_ms,
    },
    elevation: o.elevation,
    layout: {
      ...o.layout,
      min_touch_target_px: pxNumber(flatValue(base.tokens, 'target.touch') ?? '44px'),
    },
  };
}

/** "44px" -> 44 */
function pxNumber(v) {
  const n = parseInt(String(v).replace(/px$/, ''), 10);
  if (Number.isNaN(n)) throw new Error(`Bad px value: ${v}`);
  return n;
}

/** Validate arity/shape so a malformed override fails loudly, not silently. */
export function assertTxfShape(t) {
  const errs = [];
  const need = (cond, msg) => { if (!cond) errs.push(msg); };
  need(t.version === '2.0', 'version must be "2.0"');
  need(Object.keys(t.colors).length === 11, 'colors must have 11 entries');
  need(t.typography.weights.length === 5, 'typography.weights must have 5 entries');
  need(t.typography.scale_rem.length === 8, 'typography.scale_rem must have 8 entries');
  need(t.spacing.scale_px.length === 12, 'spacing.scale_px must have 12 entries');
  need(t.radius.scale_px.length === 6, 'radius.scale_px must have 6 entries');
  need(t.motion.duration_ms.length === 5, 'motion.duration_ms must have 5 entries');
  need(typeof t.layout.min_touch_target_px === 'number', 'layout.min_touch_target_px must be a number');
  if (errs.length) throw new Error(`TXF token shape invalid:\n  - ${errs.join('\n  - ')}`);
  return true;
}

/** Serialized form written to disk (2-space, trailing newline). */
export function emitTxfTokensJson() {
  const t = buildTxfTokens();
  assertTxfShape(t);
  return `${JSON.stringify(t, null, 2)}\n`;
}
