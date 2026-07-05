/** Shared helpers for token emitters. */

/** dot-path -> kebab css var name fragment: color.bg.canvas -> color-bg-canvas */
export function kebab(path) {
  return path.replace(/\./g, '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** dot-path -> camelCase identifier: color.bg.canvas -> colorBgCanvas */
export function camel(path) {
  return path
    .replace(/\./g, ' ')
    .replace(/(?:^|\s)([a-zA-Z])/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^([A-Z])/, (_, c) => c.toLowerCase());
}

/** dot-path -> PascalCase identifier. */
export function pascal(path) {
  const c = camel(path);
  return c.charAt(0).toUpperCase() + c.slice(1);
}

/** Expand #rgb/#rgba/#rrggbb/#rrggbbaa to {r,g,b,a 0..255}. Throws on non-hex. */
export function parseHex(hex) {
  if (typeof hex !== 'string' || hex[0] !== '#') throw new Error(`Not a hex color: ${hex}`);
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 && h.length !== 8) throw new Error(`Bad hex length: ${hex}`);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) : 255,
  };
}

export const isHex = (v) => typeof v === 'string' && /^#([0-9a-fA-F]{3,8})$/.test(v);

/** Tokens that differ between an overlay theme and base, as [path, value][]. */
export function diffFromBase(baseTokens, themeTokens) {
  const out = [];
  for (const [path, tok] of themeTokens) {
    const b = baseTokens.get(path);
    if (!b || b.value !== tok.value) out.push([path, tok.value, tok]);
  }
  return out;
}
