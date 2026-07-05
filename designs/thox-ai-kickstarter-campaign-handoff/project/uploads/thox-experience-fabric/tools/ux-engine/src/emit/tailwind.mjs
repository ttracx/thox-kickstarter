/** Emit a Tailwind preset (CJS) that binds utilities to the CSS variables. */
import { kebab } from './util.mjs';

const v = (path) => `var(--thox-${kebab(path)})`;

export function emitTailwind() {
  // Reference CSS vars so a single class set works across base/meshstack/doc themes.
  const config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          thox: {
            emerald: v('color.brand.primary'),
            'emerald-light': v('color.brand.hover'),
            'emerald-deep': v('color.brand.active'),
            neon: v('color.brand.neon'),
            purple: v('color.accent.magstack'),
            'purple-light': v('color.accent.magstackHover'),
            amber: v('color.state.warning'),
            red: v('color.state.danger'),
            blue: v('color.state.info'),
          },
          surface: {
            base: v('color.bg.canvas'),
            card: v('color.bg.surface'),
            elevated: v('color.bg.elevated'),
          },
          ink: {
            primary: v('color.text.primary'),
            secondary: v('color.text.secondary'),
            muted: v('color.text.muted'),
            'on-accent': v('color.text.onAccent'),
            code: v('color.text.code'),
          },
          line: {
            DEFAULT: v('color.border.default'),
            subtle: v('color.border.subtle'),
            focus: v('color.border.focus'),
          },
        },
        fontFamily: {
          sans: [v('type.family.sans')],
          mono: [v('type.family.mono')],
        },
        borderRadius: {
          DEFAULT: v('radius.md'),
          sm: v('radius.sm'),
          md: v('radius.md'),
          lg: v('radius.lg'),
        },
        boxShadow: {
          'thox-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
          'thox-glow-lg': '0 0 40px rgba(16, 185, 129, 0.2)',
        },
        ringColor: { DEFAULT: v('color.focus.ring') },
        transitionDuration: { fast: '200ms', base: '300ms', slow: '500ms' },
      },
    },
  };
  return `// THOX UX Tailwind preset - generated. Do not edit by hand.\n// Usage: module.exports = { presets: [require('@thox/ux/dist/web/tailwind-preset.cjs')] }\nmodule.exports = ${JSON.stringify(config, null, 2)};\n`;
}
