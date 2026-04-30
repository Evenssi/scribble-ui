import * as React from 'react';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';   // bundles all component CSS

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /**
   * Visual variant. Defaults to `'default'` (paper-white background).
   * - `'primary'` uses the brand low-saturation green.
   * - `'success' | 'warning' | 'danger' | 'info'` map to the matching
   *   status palette so call-to-actions can match their semantic role
   *   (e.g. a destructive "Delete" reads as `'danger'`).
   */
  variant?: ButtonVariant;

  /**
   * Size preset. Defaults to `'md'`.
   * - `'sm'` ~ 32px tall, body-small font
   * - `'md'` ~ 44px tall, h3 font
   * - `'lg'` ~ 56px tall, h2 font
   */
  size?: ButtonSize;

  /**
   * When true, renders a spinner in place of the icon and blocks all
   * pointer + keyboard activation. The button stays focusable so screen
   * readers can announce the busy state via `aria-busy`.
   */
  loading?: boolean;

  /**
   * Optional decorative or functional icon node rendered inline with
   * the label. While `loading` is true the spinner replaces the icon.
   */
  icon?: React.ReactNode;

  /**
   * Position of `icon` relative to the children. Defaults to `'left'`.
   */
  iconPosition?: ButtonIconPosition;

  /**
   * When true, the button stretches to fill the full width of its
   * parent. Useful inside narrow forms or sticky bottom bars.
   */
  block?: boolean;

  /**
   * Optional extra className appended after the built-in classes,
   * letting consumers add layout utilities or override styles.
   */
  className?: string;
}

/**
 * Built-in spinner — a minimal SVG that spins via CSS animation.
 * Inherits color from the surrounding text via `currentColor`.
 */
function Spinner(): JSX.Element {
  return (
    <svg
      className="su-btn__spinner"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="42 14"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Button — a hand-drawn looking button.
 *
 * Renders a native `<button>` styled with scribble-ui tokens and the
 * shared SVG-filter wobble. Supports `variant` / `size`, plus loading,
 * icon and full-width modes. Accessibility:
 *
 * - When `loading` is true, sets `aria-busy="true"` and intercepts
 *   `onClick` to prevent activation.
 * - When `disabled` is true, the native disabled attribute applies and
 *   `aria-disabled` is also set for AT compatibility.
 * - The default `type` is `'button'` to avoid accidental form submits.
 *
 * Make sure to import the base styles and mount `<HandDrawnFilters />`
 * at your app root, see the package README for setup.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'default',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      block = false,
      className,
      type,
      disabled,
      onClick,
      children,
      ...rest
    },
    ref
  ) {
    const isInert = disabled || loading;

    const classes = [
      'su-btn',
      `su-btn--${variant}`,
      `su-btn--${size}`,
      block ? 'su-btn--block' : null,
      loading ? 'su-btn--loading' : null,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading) {
          // While busy we still receive the event from the DOM, but we
          // refuse to fire the consumer handler so accidental
          // double-submits during slow async work cannot happen.
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      },
      [loading, onClick]
    );

    // Loading replaces the icon slot; otherwise show the user-provided icon.
    const renderedIcon = loading ? <Spinner /> : icon;

    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={classes}
        disabled={disabled}
        aria-disabled={isInert || undefined}
        aria-busy={loading || undefined}
        onClick={handleClick}
        {...rest}
      >
        {renderedIcon && iconPosition === 'left' && (
          <span className="su-btn__icon">{renderedIcon}</span>
        )}
        {children !== undefined && children !== null && (
          <span className="su-btn__label">{children}</span>
        )}
        {renderedIcon && iconPosition === 'right' && (
          <span className="su-btn__icon">{renderedIcon}</span>
        )}
      </button>
    );
  }
);
