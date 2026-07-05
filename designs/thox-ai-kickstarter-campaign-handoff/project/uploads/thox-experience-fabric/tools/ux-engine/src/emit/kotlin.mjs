/** Emit a Jetpack Compose token source for the Android (Kotlin Multiplatform) app. */
import { camel, pascal, isHex, parseHex, diffFromBase } from './util.mjs';

function colorLiteral(hex) {
  const { r, g, b, a } = parseHex(hex);
  const hx = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  return `Color(0x${hx(a)}${hx(r)}${hx(g)}${hx(b)})`;
}

function members(tokens, only, indent = '    ') {
  const lines = [];
  for (const [path, tok] of tokens) {
    if (only && !only.has(path)) continue;
    const id = camel(path);
    if (tok.type === 'color' && isHex(tok.value)) {
      lines.push(`${indent}val ${id}: Color = ${colorLiteral(tok.value)}`);
    } else if (tok.type === 'dimension' && /^[\d.]+px$/.test(String(tok.value))) {
      lines.push(`${indent}val ${id}: Dp = ${parseFloat(tok.value)}.dp`);
    } else if (tok.type === 'number') {
      lines.push(`${indent}const val ${id}: Int = ${tok.value}`);
    } else {
      lines.push(`${indent}const val ${id}: String = ${JSON.stringify(String(tok.value))}`);
    }
  }
  return lines.join('\n');
}

export function emitKotlin(themes) {
  const base = themes.find((t) => t.name === 'base');
  let out =
    `// THOX UX tokens - generated. Do not edit by hand.\n` +
    `package ai.thox.ux\n\n` +
    `import androidx.compose.ui.graphics.Color\n` +
    `import androidx.compose.ui.unit.Dp\n` +
    `import androidx.compose.ui.unit.dp\n\n` +
    `object ThoxTokens {\n${members(base.tokens)}\n`;

  for (const theme of themes) {
    if (theme.name === 'base') continue;
    const changed = new Set(diffFromBase(base.tokens, theme.tokens).map(([p]) => p));
    out += `\n    object ${pascal(theme.name)} {\n${members(theme.tokens, changed, '        ')}\n    }\n`;
  }
  out += `}\n`;
  return out;
}
