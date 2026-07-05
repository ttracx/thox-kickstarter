/**
 * @thox/txf-ux-engine React consumption layer.
 *
 * Import the canonical primitives here. Each primitive binds only to the
 * generated CSS variables from `@thox/txf-ux-engine/dist/web/thox-tokens.css`, which the
 * host app must load once (global import) before rendering.
 *
 * Also import `thox-react.css` once for component-local keyframes:
 *   import "@thox/txf-ux-engine/packages/react/thox-react.css";
 */

export { ThoxButton, default as ThoxButtonDefault } from "./ThoxButton.js";
export type {
  ThoxButtonProps,
  ThoxButtonVariant,
  ThoxButtonSize,
} from "./ThoxButton.js";
