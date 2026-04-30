import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type CardVariant = 'default' | 'note';
export type CardSize = 'sm' | 'md' | 'lg';
export type CardNoteColor =
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'blue'
  | 'mint'
  | 'purple'
  | 'green';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'title'> {
  /**
   * Visual variant. `'default'` uses paper white; `'note'` uses one of
   * the sticky-note tints chosen via `noteColor`.
   */
  variant?: CardVariant;

  /**
   * Sticky-note tint. Only meaningful when `variant === 'note'`.
   * Defaults to `'yellow'`.
   */
  noteColor?: CardNoteColor;

  /**
   * Size preset. Affects padding and minimum dimensions.
   * Defaults to `'md'`.
   */
  size?: CardSize;

  /**
   * Slot rendered above the children, separated by a hand-drawn divider.
   */
  header?: React.ReactNode;

  /**
   * Slot rendered below the children, separated by a hand-drawn divider.
   */
  footer?: React.ReactNode;

  /**
   * When true, the card becomes a button surface: focusable, four-stage
   * filter, dashed focus ring, click + Enter/Space activation.
   */
  interactive?: boolean;

  /**
   * Disables the interactive surface and visually calms the card.
   * Only meaningful with `interactive`.
   */
  disabled?: boolean;

  /**
   * Optional extra className appended after the built-in classes.
   */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Card — a hand-drawn surface for grouping related content.
 *
 * Two visual modes:
 * - `'default'`  — paper white, hard offset shadow, asymmetric corners.
 * - `'note'`     — sticky-note tinted background; pick the tint with `noteColor`.
 *
 * Two interaction modes:
 * - Static (default) — renders a plain `<div>`; no hover/active filter
 *   bumps. Useful as a content container.
 * - `interactive`    — adds `role="button"`, `tabIndex={0}`, four-stage
 *   filter, dashed focus ring and Enter/Space activation. Honors
 *   `disabled` to drop the wobble entirely.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'default',
    noteColor = 'yellow',
    size = 'md',
    header,
    footer,
    interactive = false,
    disabled = false,
    className,
    children,
    onClick,
    onKeyDown,
    ...rest
  },
  ref
) {
  const isInert = interactive && disabled;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && !disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        // Synthesize a click for assistive parity with native buttons.
        (event.currentTarget as HTMLDivElement).click();
      }
      onKeyDown?.(event);
    },
    [interactive, disabled, onKeyDown]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isInert) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [isInert, onClick]
  );

  const classes = cx(
    'su-card',
    `su-card--${variant}`,
    variant === 'note' && `su-card--note-${noteColor}`,
    `su-card--${size}`,
    interactive && 'su-card--interactive',
    isInert && 'su-card--disabled',
    className
  );

  const interactiveProps = interactive
    ? {
        role: 'button' as const,
        tabIndex: disabled ? -1 : 0,
        'aria-disabled': isInert || undefined,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }
    : {};

  return (
    <div ref={ref} className={classes} {...interactiveProps} {...rest}>
      {header !== undefined && header !== null && (
        <div className="su-card__header">{header}</div>
      )}
      <div className="su-card__body">{children}</div>
      {footer !== undefined && footer !== null && (
        <div className="su-card__footer">{footer}</div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
