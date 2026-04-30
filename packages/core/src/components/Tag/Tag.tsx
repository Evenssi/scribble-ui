import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type TagColor =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'blue'
  | 'mint'
  | 'purple'
  | 'green';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'onClick'> {
  /**
   * Visual color. Status colors (`brand` / `success` / `warning` /
   * `danger` / `info`) use the brand or status palette; sticky-note
   * colors use the `--su-note-*` palette. Defaults to `'default'`.
   */
  color?: TagColor;

  /**
   * Size preset. Defaults to `'md'`.
   */
  size?: TagSize;

  /**
   * When true, renders a ✕ button after the label and calls `onClose`
   * when the user clicks or activates it via keyboard. The close
   * button has its own focus ring and `aria-label`.
   */
  closable?: boolean;

  /**
   * Fired when the close button is activated. The original event is
   * forwarded so callers can `stopPropagation` if needed.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional inline icon rendered before the label.
   */
  icon?: React.ReactNode;

  /**
   * Disabled tags are visually calm and ignore the close affordance.
   */
  disabled?: boolean;

  /**
   * Optional click handler — fires on the tag body (not on the close
   * button). When provided alongside a non-`disabled` state the tag
   * lifts on hover for affordance.
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;

  /**
   * Optional extra className appended after the built-in classes.
   */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Built-in ✕ glyph — keeps the package icon-free for consumers.
 */
function CloseGlyph(): JSX.Element {
  return (
    <svg
      viewBox="0 0 12 12"
      width="0.75em"
      height="0.75em"
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

/**
 * Tag — a small hand-drawn label.
 *
 * Tags are mostly static visuals; they keep the `#su-hand-c` wobble at
 * rest. When `closable` is true a small ✕ button is appended after
 * the label and fires `onClose`. When `disabled`, the wobble is
 * dropped entirely (matching Button / Input's calm inert state).
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    color = 'default',
    size = 'md',
    closable = false,
    onClose,
    icon,
    disabled = false,
    className,
    children,
    onClick,
    ...rest
  },
  ref
) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [disabled, onClick]
  );

  const handleClose = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      event.stopPropagation();
      onClose?.(event);
    },
    [disabled, onClose]
  );

  const classes = cx(
    'su-tag',
    `su-tag--${color}`,
    `su-tag--${size}`,
    closable && 'su-tag--closable',
    disabled && 'su-tag--disabled',
    className
  );

  return (
    <span
      ref={ref}
      className={classes}
      aria-disabled={disabled || undefined}
      onClick={onClick ? handleClick : undefined}
      {...rest}
    >
      {icon !== undefined && icon !== null && (
        <span className="su-tag__icon">{icon}</span>
      )}
      {children !== undefined && children !== null && (
        <span className="su-tag__label">{children}</span>
      )}
      {closable && (
        <button
          type="button"
          className="su-tag__close"
          aria-label="Remove tag"
          disabled={disabled}
          onClick={handleClose}
        >
          <CloseGlyph />
        </button>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';
