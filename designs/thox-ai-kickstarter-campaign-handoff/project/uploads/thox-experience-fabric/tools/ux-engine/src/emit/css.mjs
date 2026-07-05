/** Emit framework-agnostic CSS custom properties with theme override scopes. */
import { kebab, diffFromBase } from './util.mjs';

const VAR = (path) => `--thox-${kebab(path)}`;

function blockBody(entries, indent = '  ') {
  return entries.map(([path, value]) => `${indent}${VAR(path)}: ${value};`).join('\n');
}

export function emitCss(themes) {
  const base = themes.find((t) => t.name === 'base');
  if (!base) throw new Error('css emitter requires a base theme');

  const baseEntries = [...base.tokens].map(([p, t]) => [p, t.value]);
  let out = `/* THOX UX tokens - generated. Do not edit by hand. */\n:root {\n${blockBody(baseEntries)}\n}\n`;

  for (const theme of themes) {
    if (theme.name === 'base') continue;
    const diff = diffFromBase(base.tokens, theme.tokens).map(([p, v]) => [p, v]);
    out += `\n[data-theme="${theme.name}"] {\n${blockBody(diff)}\n}\n`;
  }
  return out;
}
