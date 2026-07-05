/**
 * ThoxButton - reference web implementation of contract `primary-button`
 * (MS / Action / PrimaryButton, readiness L3).
 *
 * This is the single canonical web button for every THOX surface. It binds
 * only to generated CSS custom properties from `@thox/ux` (dist/web/thox-tokens.css),
 * so a token change propagates here automatically and the drift gate stays green.
 *
 * Contract bindings (contracts/primary-button.contract.json):
 *   fill         -> --thox-color-brand-primary
 *   fillHover    -> --thox-color-brand-hover
 *   fillActive   -> --thox-color-brand-active
 *   label        -> --thox-color-text-on-accent
 *   focusRing    -> --thox-color-focus-ring
 *   radius       -> --thox-radius-sm
 *   disabledFill -> --thox-color-state-disabled
 *
 * a11y: role=button (native), focus-visible ring required, label required,
 * min target 44px (target.touch). Disabled and loading are non-interactive.
 *
 * No `any`. All props typed. Theme is inherited from the nearest
 * [data-theme] ancestor; this component never hardcodes a palette.
 */

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Visual treatments declared by the contract. */
export type ThoxButtonVariant = "solid" | "ghost" | "outline";

/** Size scale. Touch keeps the 44px minimum target from `target.touch`. */
export type ThoxButtonSize = "touch" | "compact";

export interface ThoxButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  /** Visible button text or node. Required for an accessible name unless `aria-label` is set. */
  children?: ReactNode;
  /** Contract variant. Defaults to `solid`. */
  variant?: ThoxButtonVariant;
  /** Size. Defaults to `touch` (>=44px). */
  size?: ThoxButtonSize;
  /** Shows a spinner and blocks interaction without changing layout width. */
  loading?: boolean;
  /** Optional leading icon node. Hidden from AT (decorative). */
  iconStart?: ReactNode;
  /** Escape hatch for layout-only classes (margins, grid placement). Never colors. */
  layoutClassName?: string;
}

/** Token-bound style object. Values are CSS vars, never literals. */
const BASE_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--thox-space-2, 8px)",
  minHeight: "var(--thox-target-touch, 44px)",
  minWidth: "var(--thox-target-touch, 44px)",
  padding: "0 var(--thox-space-5, 20px)",
  borderRadius: "var(--thox-radius-sm, 8px)",
  fontFamily: "var(--thox-type-family-sans)",
  fontSize: "var(--thox-type-size-body, 16px)",
  fontWeight: 600,
  lineHeight: 1,
  cursor: "pointer",
  border: "1px solid transparent",
  transitionProperty: "background-color, border-color, color, box-shadow",
  transitionDuration: "var(--thox-motion-duration-fast, 0.2s)",
  transitionTimingFunction: "var(--thox-motion-easing-standard, cubic-bezier(0.2,0,0,1))",
};

/**
 * Per-variant token bindings. Hover and active are applied via inline
 * event handlers so the component needs no external stylesheet beyond the
 * generated token vars. A consuming app may instead attach the equivalent
 * `:hover`/`:active`/`:focus-visible` rules in CSS; both paths bind the same vars.
 */
function variantStyle(variant: ThoxButtonVariant): CSSProperties {
  switch (variant) {
    case "ghost":
      return {
        background: "transparent",
        color: "var(--thox-color-brand-primary)",
      };
    case "outline":
      return {
        background: "transparent",
        color: "var(--thox-color-brand-primary)",
        borderColor: "var(--thox-color-border-default)",
      };
    case "solid":
    default:
      return {
        background: "var(--thox-color-brand-primary)",
        color: "var(--thox-color-text-on-accent)",
      };
  }
}

function hoverFill(variant: ThoxButtonVariant): string {
  return variant === "solid"
    ? "var(--thox-color-brand-hover)"
    : "var(--thox-color-brand-soft, transparent)";
}

function activeFill(variant: ThoxButtonVariant): string {
  return variant === "solid"
    ? "var(--thox-color-brand-active)"
    : "var(--thox-color-brand-soft, transparent)";
}

/** Inline spinner sized to the current font. Decorative; hidden from AT. */
function Spinner(): ReactNode {
  return (
    <span
      aria-hidden="true"
      style={{
        width: "1em",
        height: "1em",
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        borderRadius: "var(--thox-radius-full, 9999px)",
        display: "inline-block",
        animation: "thox-spin 0.6s linear infinite",
      }}
    />
  );
}

/**
 * Canonical THOX web button. Render with explicit children or an `aria-label`.
 *
 * @example
 * <ThoxButton onClick={save}>Reserve now</ThoxButton>
 * <ThoxButton variant="outline" loading>Pairing</ThoxButton>
 */
export const ThoxButton = forwardRef<HTMLButtonElement, ThoxButtonProps>(
  function ThoxButton(
    {
      children,
      variant = "solid",
      size = "touch",
      loading = false,
      iconStart,
      layoutClassName,
      disabled,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      style,
      type = "button",
      ...rest
    },
    ref,
  ) {
    const isInert = Boolean(disabled) || loading;

    const composed: CSSProperties = {
      ...BASE_STYLE,
      ...variantStyle(variant),
      ...(size === "compact"
        ? { minHeight: "var(--thox-target-pointer, 32px)", padding: "0 var(--thox-space-4, 16px)" }
        : null),
      ...(isInert
        ? {
            background:
              variant === "solid" ? "var(--thox-color-state-disabled)" : "transparent",
            color: "var(--thox-color-text-muted)",
            borderColor:
              variant === "outline" ? "var(--thox-color-border-subtle)" : "transparent",
            cursor: loading ? "progress" : "not-allowed",
          }
        : null),
      ...style,
    };

    /** focus-visible ring is mandated by the contract (a11y.focusVisible). */
    const applyFocusRing = (el: HTMLButtonElement): void => {
      el.style.outline = "2px solid var(--thox-color-focus-ring)";
      el.style.outlineOffset = "2px";
    };
    const clearFocusRing = (el: HTMLButtonElement): void => {
      el.style.outline = "none";
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isInert}
        aria-busy={loading || undefined}
        data-variant={variant}
        data-loading={loading || undefined}
        className={layoutClassName}
        style={composed}
        onMouseEnter={(e) => {
          if (!isInert) e.currentTarget.style.background = hoverFill(variant);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!isInert) e.currentTarget.style.background = variantStyle(variant).background as string;
          onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          if (!isInert) e.currentTarget.style.background = activeFill(variant);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          if (!isInert) e.currentTarget.style.background = hoverFill(variant);
          onMouseUp?.(e);
        }}
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) applyFocusRing(e.currentTarget);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          clearFocusRing(e.currentTarget);
          onBlur?.(e);
        }}
        {...rest}
      >
        {loading ? <Spinner /> : iconStart ? <span aria-hidden="true">{iconStart}</span> : null}
        {children}
      </button>
    );
  },
);

export default ThoxButton;
