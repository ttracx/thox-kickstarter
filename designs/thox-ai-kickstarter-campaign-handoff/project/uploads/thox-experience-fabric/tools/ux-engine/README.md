# @thox/txf-ux-engine

Single source of truth for THOX.ai design tokens and the mechanism that keeps
the user experience identical across web, iOS, macOS, Android, Windows, the
ThoxOS device UI, Figma, and documents.

One token tree compiles to every platform. Four CI gates make divergence
impossible to merge. See `STANDARDIZATION.md` for the full mechanism and
`ecosystem_map.md` for where this fits.

## Quickstart

```bash
pnpm install
pnpm build      # compile tokens to dist/ for every platform
pnpm verify     # brand + WCAG AA + contracts + drift, one exit code
pnpm test       # unit tests for resolver, contrast, forbidden, contracts
```

`pnpm gate` runs build, verify, and test together. That is what CI runs.

## What is authored vs generated

- Authored by hand: `tokens/core/*.json` and `tokens/semantic/*.json`.
- Generated, never edited: everything in `dist/`.

Edit a value once in `tokens/`, run `pnpm build`, commit. The drift gate fails
if `dist/` does not match the token source.

## Layout

```
tokens/core/         color, dimension, type, motion primitives
tokens/semantic/     base + theme.doc + theme.meshstack + role overlays
src/resolve.mjs      merge theme over base, resolve {refs}
src/build.mjs        emit per-platform artifacts + sha256 manifest
src/emit/*           css, tailwind, swift, kotlin, rust, figma emitters
src/lint/*           forbidden, contrast, contracts, drift gates
src/verify.mjs       runs all four gates
contracts/*          platform-agnostic component definitions
packages/react/      canonical React primitives (ThoxButton)
test/                node:test suites
samples/             clean and violation fixtures
```

## Web usage

```ts
// app root
import "@thox/txf-ux-engine/tokens.css";
import "@thox/txf-ux-engine/packages/react/thox-react.css";
```

```js
// tailwind.config.js
module.exports = { presets: [require("@thox/txf-ux-engine/tailwind")] };
```

```tsx
import { ThoxButton } from "@thox/txf-ux-engine/react";

<div data-theme="meshstack">
  <ThoxButton onClick={reserve}>Reserve now</ThoxButton>
</div>
```

Switch themes by setting `data-theme="base|meshstack|doc"` on any ancestor.

## Adding a gate rule

Add the rule in `src/lint/`, a fixture in `samples/`, and a test in `test/`.
Keep the surface scoping model: public Founders content is held to the
strictest set.
