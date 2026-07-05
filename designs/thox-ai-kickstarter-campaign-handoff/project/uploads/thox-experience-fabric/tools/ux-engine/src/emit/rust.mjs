/** Emit a Rust token module for the ThoxOS on-device UI (no_std friendly: &str + u32 RGBA). */
import { isHex, parseHex, diffFromBase } from './util.mjs';

const SCREAM = (path) =>
  path.replace(/\./g, '_').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

function members(tokens, only, indent = '') {
  const lines = [];
  for (const [path, tok] of tokens) {
    if (only && !only.has(path)) continue;
    const id = SCREAM(path);
    if (tok.type === 'color' && isHex(tok.value)) {
      const { r, g, b, a } = parseHex(tok.value);
      const rgba = ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
      lines.push(`${indent}/// ${tok.value}`);
      lines.push(`${indent}pub const ${id}_HEX: &str = ${JSON.stringify(tok.value)};`);
      lines.push(`${indent}pub const ${id}_RGBA: u32 = 0x${rgba.toString(16).padStart(8, '0').toUpperCase()};`);
    } else if (tok.type === 'dimension' && /^[\d.]+px$/.test(String(tok.value))) {
      const n = parseFloat(tok.value);
      const lit = Number.isInteger(n) ? `${n}.0` : `${n}`;
      lines.push(`${indent}pub const ${id}_PX: f32 = ${lit};`);
    } else if (tok.type === 'number') {
      lines.push(`${indent}pub const ${id}: u32 = ${tok.value};`);
    } else {
      lines.push(`${indent}pub const ${id}: &str = ${JSON.stringify(String(tok.value))};`);
    }
  }
  return lines.join('\n');
}

export function emitRust(themes) {
  const base = themes.find((t) => t.name === 'base');
  let out =
    `// THOX UX tokens - generated. Do not edit by hand.\n` +
    `//! On-device design tokens for the ThoxOS UI layer.\n` +
    `#![allow(dead_code)]\n\npub mod thox_tokens {\n${members(base.tokens, null, '    ')}\n`;

  for (const theme of themes) {
    if (theme.name === 'base') continue;
    const changed = new Set(diffFromBase(base.tokens, theme.tokens).map(([p]) => p));
    out += `\n    pub mod ${theme.name.replace(/[^a-z0-9]/g, '_')} {\n${members(theme.tokens, changed, '        ')}\n    }\n`;
  }
  out += `}\n`;
  return out;
}
