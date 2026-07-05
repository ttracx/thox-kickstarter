/** Emit a SwiftUI token source (iOS 17+/macOS 14+) for the Apple companion apps. */
import { camel, pascal, isHex, parseHex, diffFromBase } from './util.mjs';

function colorLiteral(hex) {
  const { r, g, b, a } = parseHex(hex);
  const f = (n) => (n / 255).toFixed(4);
  return `Color(.sRGB, red: ${f(r)}, green: ${f(g)}, blue: ${f(b)}, opacity: ${f(a)})`;
}

function members(tokens, only) {
  const lines = [];
  for (const [path, tok] of tokens) {
    if (only && !only.has(path)) continue;
    const id = camel(path);
    if (tok.type === 'color' && isHex(tok.value)) {
      lines.push(`    public static let ${id} = ${colorLiteral(tok.value)}`);
    } else if (tok.type === 'dimension' && /^[\d.]+px$/.test(String(tok.value))) {
      lines.push(`    public static let ${id}: CGFloat = ${parseFloat(tok.value)}`);
    } else if (tok.type === 'number') {
      lines.push(`    public static let ${id}: Double = ${tok.value}`);
    } else {
      lines.push(`    public static let ${id}: String = ${JSON.stringify(String(tok.value))}`);
    }
  }
  return lines.join('\n');
}

export function emitSwift(themes) {
  const base = themes.find((t) => t.name === 'base');
  let out =
    `// THOX UX tokens - generated. Do not edit by hand.\n` +
    `import SwiftUI\n\n` +
    `public enum ThoxTokens {\n${members(base.tokens)}\n`;

  for (const theme of themes) {
    if (theme.name === 'base') continue;
    const changed = new Set(diffFromBase(base.tokens, theme.tokens).map(([p]) => p));
    out += `\n    public enum ${pascal(theme.name)} {\n${members(theme.tokens, changed)}\n    }\n`;
  }
  out += `}\n`;
  return out;
}
