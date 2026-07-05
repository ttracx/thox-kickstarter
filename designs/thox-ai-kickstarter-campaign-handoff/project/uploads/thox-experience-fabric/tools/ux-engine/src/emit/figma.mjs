/** Emit a Tokens Studio for Figma file (sets per theme) for design <-> code parity. */
function nest(tokens) {
  const root = {};
  for (const [path, tok] of tokens) {
    const parts = path.split('.');
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) node = node[parts[i] ??= {}] ??= {};
    node[parts.at(-1)] = { value: String(tok.value), type: tok.type };
  }
  return root;
}

export function emitFigma(themes) {
  const file = { $metadata: { tokenSetOrder: themes.map((t) => t.name) }, $themes: [] };
  for (const theme of themes) {
    file[theme.name] = nest(theme.tokens);
    file.$themes.push({
      id: theme.name,
      name: theme.name,
      selectedTokenSets: { [theme.name]: 'enabled' },
    });
  }
  return JSON.stringify(file, null, 2) + '\n';
}
