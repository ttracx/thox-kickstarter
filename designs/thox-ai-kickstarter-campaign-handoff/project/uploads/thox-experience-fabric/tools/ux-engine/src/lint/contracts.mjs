/**
 * contracts.mjs - validate component contracts and report cross-platform coverage.
 *
 * Each contract declares one component's anatomy, states, a11y, token bindings,
 * and per-platform implementation. This gate guarantees: required states exist
 * for interactive components, accessibility fields are set, every token binding
 * resolves in the live token set, and all five platforms are mapped. It then
 * prints a readiness matrix (L0-L5) so coverage gaps are visible.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveTheme } from '../resolve.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR = join(ROOT, 'contracts');
const PLATFORMS = ['web', 'ios', 'android', 'macos', 'windows'];
// Governance: every interactive component must define these states.
const REQUIRED_INTERACTIVE_STATES = ['default', 'pressed', 'disabled', 'loading'];
const NAME_RE = /^MS \/ [A-Za-z]+ \/ [A-Za-z]+( \/ [A-Za-z]+)?$/;

export function validateContracts() {
  const { tokens } = resolveTheme('base');
  const files = readdirSync(DIR).filter((f) => f.endsWith('.contract.json'));
  const errors = [];
  const rows = [];

  for (const file of files) {
    const path = join(DIR, file);
    let c;
    try { c = JSON.parse(readFileSync(path, 'utf8')); }
    catch (e) { errors.push(`${file}: invalid JSON (${e.message})`); continue; }

    const fail = (m) => errors.push(`${file}: ${m}`);

    for (const k of ['id', 'name', 'category', 'interactive', 'variants', 'states', 'a11y', 'tokens', 'platforms', 'readiness']) {
      if (!(k in c)) fail(`missing required field "${k}"`);
    }
    if (c.name && !NAME_RE.test(c.name)) fail(`name "${c.name}" must match "MS / Category / Component[ / Variant]"`);

    if (c.interactive) {
      for (const s of REQUIRED_INTERACTIVE_STATES) {
        if (!c.states?.includes(s)) fail(`interactive component must declare state "${s}"`);
      }
      if (!(c.states?.includes('focus') || c.states?.includes('hover'))) {
        fail('interactive component must declare a focus or hover state');
      }
      if (c.a11y && c.a11y.focusVisible !== true) fail('interactive component must set a11y.focusVisible = true');
    }

    if (c.a11y) {
      if (c.a11y.minTarget && !tokens.has(c.a11y.minTarget)) fail(`a11y.minTarget references unknown token "${c.a11y.minTarget}"`);
    }

    for (const [role, tk] of Object.entries(c.tokens ?? {})) {
      if (!tokens.has(tk)) fail(`token binding "${role}" -> "${tk}" does not resolve`);
    }

    const missingPlatforms = PLATFORMS.filter((p) => !c.platforms?.[p]);
    if (missingPlatforms.length) fail(`missing platform mapping(s): ${missingPlatforms.join(', ')}`);

    const platformCount = PLATFORMS.filter((p) => c.platforms?.[p]).length;
    rows.push({ id: c.id ?? file, name: c.name ?? '?', readiness: c.readiness ?? 'L0', interactive: !!c.interactive, platforms: platformCount });
  }

  return { errors, rows, count: files.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { errors, rows, count } = validateContracts();
  console.log('Contract coverage:');
  console.log('  id'.padEnd(22) + 'readiness  platforms  interactive');
  for (const r of rows.sort((a, b) => a.id.localeCompare(b.id))) {
    console.log('  ' + r.id.padEnd(20) + r.readiness.padEnd(11) + String(r.platforms + '/5').padEnd(11) + (r.interactive ? 'yes' : 'no'));
  }
  if (errors.length) {
    console.log('\nERRORS:');
    for (const e of errors) console.log('  - ' + e);
  }
  console.log(`\ncontracts: ${count} validated, ${errors.length} error(s)`);
  process.exit(errors.length > 0 ? 1 : 0);
}
