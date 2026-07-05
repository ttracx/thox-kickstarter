/**
 * resolve.mjs - THOX UX token resolver.
 *
 * Single source of truth loader. Reads DTCG-style token JSON from tokens/core
 * (theme-agnostic primitives) and tokens/semantic (theme overlays), deep-merges
 * a requested theme over `base`, flattens to dot-path leaves, and resolves all
 * `{alias.path}` references. This is the only module allowed to know the on-disk
 * token layout; every emitter and linter consumes its output.
 *
 * Public API:
 *   listThemes(): string[]
 *   resolveTheme(name): { name, tokens: Map<path, {type,value,ext}> }
 *   flatValue(tokens, path): string|number   (throws if missing)
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORE_DIR = join(ROOT, 'tokens', 'core');
const SEM_DIR = join(ROOT, 'tokens', 'semantic');

const REF = /^\{([^}]+)\}$/;
const MAX_DEPTH = 32;

/** Read and parse every *.json in a directory, returning [name, parsedObject][]. */
function readJsonDir(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8');
      try {
        return [f, JSON.parse(raw)];
      } catch (err) {
        throw new Error(`Invalid JSON in ${join(dir, f)}: ${err.message}`);
      }
    });
}

/** Recursively merge `src` onto `dst` in place. Leaf objects ($value present) replace wholesale. */
function deepMerge(dst, src) {
  for (const [k, v] of Object.entries(src)) {
    if (k.startsWith('$')) continue; // skip overlay metadata ($theme, $extends)
    if (v && typeof v === 'object' && !Array.isArray(v) && !('$value' in v)) {
      dst[k] = deepMerge(dst[k] && typeof dst[k] === 'object' ? dst[k] : {}, v);
    } else {
      dst[k] = v;
    }
  }
  return dst;
}

/** Flatten a nested token tree to a Map of dot-path -> { type, value, ext }. */
function flatten(tree, prefix = '', out = new Map()) {
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && '$value' in v) {
      out.set(path, { type: v.$type ?? 'unknown', value: v.$value, ext: v.$extensions ?? null });
    } else if (v && typeof v === 'object') {
      flatten(v, path, out);
    }
  }
  return out;
}

/** Resolve all `{ref}` values against the flattened map, with cycle detection. */
function resolveRefs(map) {
  const resolve = (path, depth, seen) => {
    if (depth > MAX_DEPTH) throw new Error(`Token reference too deep at "${path}"`);
    const tok = map.get(path);
    if (!tok) throw new Error(`Unknown token reference: {${path}}`);
    if (typeof tok.value !== 'string') return tok.value;
    const m = tok.value.match(REF);
    if (!m) return tok.value;
    const target = m[1];
    if (seen.has(target)) throw new Error(`Circular token reference: ${[...seen, target].join(' -> ')}`);
    return resolve(target, depth + 1, new Set([...seen, target]));
  };
  for (const [path, tok] of map) {
    tok.value = resolve(path, 0, new Set([path]));
  }
  return map;
}

/** Discover available theme names from tokens/semantic (base is implicit). */
export function listThemes() {
  const names = new Set(['base']);
  for (const [, obj] of readJsonDir(SEM_DIR)) {
    if (obj.$theme && obj.$theme !== 'base') names.add(obj.$theme);
  }
  return [...names];
}

/** Resolve a single theme into a fully-flattened, ref-resolved token Map. */
export function resolveTheme(name) {
  const tree = {};
  for (const [, obj] of readJsonDir(CORE_DIR)) deepMerge(tree, obj);

  const semantic = readJsonDir(SEM_DIR);
  const base = semantic.find(([, o]) => (o.$theme ?? 'base') === 'base');
  if (!base) throw new Error('Missing semantic base theme (tokens/semantic/base.json)');
  deepMerge(tree, base[1]);

  // role labels and any shared semantic files without a theme tag merge into every theme
  for (const [, obj] of semantic) {
    if (!('$theme' in obj)) deepMerge(tree, obj);
  }

  if (name !== 'base') {
    const overlay = semantic.find(([, o]) => o.$theme === name);
    if (!overlay) throw new Error(`Unknown theme "${name}". Known: ${listThemes().join(', ')}`);
    deepMerge(tree, overlay[1]);
  }

  const map = resolveRefs(flatten(tree));
  return { name, tokens: map };
}

/** Convenience accessor; throws on missing path so callers fail loud. */
export function flatValue(tokens, path) {
  const tok = tokens.get(path);
  if (!tok) throw new Error(`Token not found: ${path}`);
  return tok.value;
}
