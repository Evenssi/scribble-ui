'use client';

import * as React from 'react';

// Note: this component does NOT import its CSS file directly — see the
// Button / Input / Tag components for the rationale. Consumers must
// import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Visual variant. Drives the accent color (icon + left border) and
   * the note-style background. Defaults to `'info'`.
   */
  variant?: AlertVariant;

  /**
   * Main heading of the alert — rendered bold on the first line.
   * Optional: an alert can be just a title, just body text, or both.
   */
  title?: React.ReactNode;

  /**
   * Alert body. When a `title` is also provided the two render as
   * a two-line stack (title on top, description below).
   */
  children?: React.ReactNode;

  /**
   * Custom leading icon. Pass `false` to suppress the icon slot
   * entirely. Leave unset to render the variant's built-in glyph.
   */
  icon?: React.ReactNode | false;

  /**
   * Show a ✕ close button in the top-right corner. Defaults to `false`.
   */
  closable?: boolean;

  /**
   * Controlled visibility. When provided the component stops managing
   * its own `closed` state; pass `false` to hide the alert.
   */
  visible?: boolean;

  /**
   * Fired when the user activates the close button. Receives the
   * original click event so callers can `stopPropagation` if needed.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for the close button. Defaults to `'Close alert'`.
   */
  closeAriaLabel?: string;

  /**
   * Banner mode — a wide, flat strip with no rounded corners and no
   * hard offset shadow. Useful for full-bleed page-level alerts.
   * Defaults to `false`.
   */
  banner?: boolean;
}

/* ------------------------------------------------------------------ *
 *  Built-in variant glyphs.
 *  All strokes use `currentColor` so `.su-alert--variant-*` is the
 *  single source of truth for the accent.
 * ------------------------------------------------------------------ */

const ICON_VIEWBOX = '0 0 24 24';

function InfoGlyph(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-alert__glyph"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
      <path
        d="M12 11.5 L12 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessGlyph(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-alert__glyph"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 12.5 L10.5 15.5 L16.5 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningGlyph(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-alert__glyph"
    >
      <path
        d="M12 3 L21.5 20 L2.5 20 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M12 9.5 L12 14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ErrorGlyph(): JSX.Element {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="su-alert__glyph"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 8.5 L15.5 15.5 M15.5 8.5 L8.5 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function resolveDefaultIcon(variant: AlertVariant): React.ReactNode {
  switch (variant) {
    case 'success':
      return <SuccessGlyph />;
    case 'warning':
      return <WarningGlyph />;
    case 'error':
      return <ErrorGlyph />;
    case 'info':
    default:
      return <InfoGlyph />;
  }
}

/**
 * Small ✕ glyph for the close button. Kept inline so the package
 * stays icon-library-free.
 */
function CloseGlyph(): JSX.Element {
  return (
    <svg
      viewBox="0 0 12 12"
      width="0.85em"
      height="0.85em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.4 2.4 L9.6 9.6 M9.6 2.4 L2.4 9.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Alert — a static, inline feedback surface.
 *
 * Use for persistent page-level messages ("your subscription is about
 * to expire", "this form has 2 errors"). For transient, system-driven
 * toasts with auto-dismiss behaviour reach for `<Toast />` instead —
 * Alert is deliberately non-Portal, non-autoDismiss.
 *
 * Accessibility: the root gets `role="alert"` + `aria-live="assertive"`
 * for `warning` / `error` variants (outcomes the user should notice
 * right away), and `role="status"` + `aria-live="polite"` for
 * `info` / `success` (announced without interrupting the user). The
 * decorative glyph is `aria-hidden`.
 *
 * Controlled vs uncontrolled: when `visible` is provided the component
 * is fully controlled and renders `null` on `visible === false`. When
 * `visible` is `undefined` the component maintains a local `closed`
 * flag — clicking ✕ flips it and the alert unmounts itself, while
 * still firing `onClose` so callers can do side-effects.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    {
      variant = 'info',
      title,
      children,
      icon,
      closable = false,
      visible,
      onClose,
      closeAriaLabel = 'Close alert',
      banner = false,
      className,
      ...rest
    },
    ref
  ) {
    // Controlled / uncontrolled bridge (mirrors Input's pattern).
    const isControlled = visible !== undefined;
    const [closed, setClosed] = React.useState(false);

    const handleClose = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isControlled) {
          setClosed(true);
        }
        onClose?.(event);
      },
      [isControlled, onClose]
    );

    // Short-circuit before computing classes — nothing to render.
    if (isControlled ? visible === false : closed) {
      return null;
    }

    const classes = cx(
      'su-alert',
      `su-alert--variant-${variant}`,
      banner && 'su-alert--banner',
      closable && 'su-alert--closable',
      title != null && 'su-alert--has-title',
      className
    );

    const role = variant === 'warning' || variant === 'error' ? 'alert' : 'status';
    const live = role === 'alert' ? 'assertive' : 'polite';

    const showIcon = icon !== false;
    const renderedIcon =
      icon === undefined || icon === false
        ? resolveDefaultIcon(variant)
        : icon;

    return (
      <div
        ref={ref}
        role={role}
        aria-live={live}
        className={classes}
        {...rest}
      >
        {showIcon ? (
          <span className="su-alert__icon">{renderedIcon}</span>
        ) : null}

        <div className="su-alert__body">
          {title != null && title !== false ? (
            <div className="su-alert__title">{title}</div>
          ) : null}
          {children !== undefined && children !== null ? (
            <div className="su-alert__description">{children}</div>
          ) : null}
        </div>

        {closable ? (
          <button
            type="button"
            className="su-alert__close"
            aria-label={closeAriaLabel}
            onClick={handleClose}
          >
            <CloseGlyph />
          </button>
        ) : null}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
