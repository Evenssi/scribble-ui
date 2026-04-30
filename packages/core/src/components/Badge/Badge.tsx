import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type BadgeColor =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgePlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  /**
   * Numeric badge. `0` is hidden by default unless `showZero` is true.
   * Mutually-exclusive priority order: `dot` > `count` > `content`.
   */
  count?: number;

  /**
   * Cap for the displayed count. Values above the cap render as
   * `${max}+`. Defaults to `99`.
   */
  max?: number;

  /**
   * When true, render the badge even if `count === 0`. Defaults to
   * `false` (matches the convention used by most chat / inbox UIs).
   */
  showZero?: boolean;

  /**
   * Render a small filled dot with no text. Wins over `count` and
   * `content` if multiple are passed.
   */
  dot?: boolean;

  /**
   * Custom content shown when `dot` and `count` are both absent.
   * Useful for "NEW" / "BETA" labels or tiny icons.
   */
  content?: React.ReactNode;

  /**
   * Background tint. Defaults to `'danger'` — the most common use case
   * is the red notification pill.
   */
  color?: BadgeColor;

  /**
   * Corner placement when used as a wrapper around `children`. Ignored
   * in standalone mode. Defaults to `'top-right'`.
   */
  placement?: BadgePlacement;

  /**
   * Optional content to wrap. When provided the badge attaches to the
   * specified corner of this element; otherwise the badge renders
   * inline on its own.
   */
  children?: React.ReactNode;

  /**
   * Optional extra className appended after the built-in classes.
   * Applies to the outer element (the wrapper in wrapper mode, or the
   * badge itself in standalone mode).
   */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Resolve which content the badge should render, honoring the
 * documented `dot > count > content` priority. Returns `null` when
 * the badge should not render at all (e.g. `count === 0` without
 * `showZero`).
 */
function resolveBadgeContent(
  dot: boolean,
  count: number | undefined,
  max: number,
  showZero: boolean,
  content: React.ReactNode
): { node: React.ReactNode; ariaLabel: string } | null {
  if (dot) {
    return { node: null, ariaLabel: 'notification' };
  }
  if (count !== undefined) {
    if (count === 0 && !showZero) return null;
    const display = count > max ? `${max}+` : String(count);
    return { node: display, ariaLabel: `${count} notifications` };
  }
  if (content !== undefined && content !== null && content !== false) {
    const ariaLabel =
      typeof content === 'string' || typeof content === 'number'
        ? String(content)
        : 'badge';
    return { node: content, ariaLabel };
  }
  return null;
}

/**
 * Badge — a small hand-drawn count / dot / label that can either
 * stand on its own or attach to the corner of another element.
 *
 * Usage:
 *
 * ```tsx
 * // Standalone
 * <Badge count={5} />
 * <Badge dot color="success" />
 * <Badge content="NEW" color="brand" />
 *
 * // Wrapper — the badge floats on the chosen corner of `children`
 * <Badge count={9}><Avatar src="…" /></Badge>
 * <Badge dot placement="bottom-right"><Button>Inbox</Button></Badge>
 * ```
 *
 * Priority order when multiple content props are passed:
 * `dot > count > content`. When `count === 0` and `showZero` is
 * false, the badge node is omitted entirely (children still render
 * in wrapper mode).
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      count,
      max = 99,
      showZero = false,
      dot = false,
      content,
      color = 'danger',
      placement = 'top-right',
      children,
      className,
      ...rest
    },
    ref
  ) {
    const resolved = resolveBadgeContent(dot, count, max, showZero, content);
    const isWrapper = children !== undefined && children !== null;

    const badgeClasses = cx(
      'su-badge',
      `su-badge--${color}`,
      dot && 'su-badge--dot',
      isWrapper && `su-badge--placement-${placement}`,
      isWrapper && 'su-badge--floating'
    );

    // Wrapper mode: always render children. The badge node is only
    // rendered when there is something to show.
    if (isWrapper) {
      // Outer wrapper carries the consumer's className + spread props
      // so callers can attach data-* / aria-* / refs at the level
      // they actually see in the DOM tree.
      return (
        <span
          ref={ref}
          className={cx('su-badge-wrap', className)}
          {...rest}
        >
          <span className="su-badge-wrap__anchor">{children}</span>
          {resolved !== null && (
            <span
              className={badgeClasses}
              role="status"
              aria-label={resolved.ariaLabel}
            >
              {resolved.node}
            </span>
          )}
        </span>
      );
    }

    // Standalone mode: nothing to anchor to — if the badge has no
    // content (e.g. count=0 without showZero), render nothing at all.
    if (resolved === null) return null;

    return (
      <span
        ref={ref}
        className={cx(badgeClasses, className)}
        role="status"
        aria-label={resolved.ariaLabel}
        {...rest}
      >
        {resolved.node}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
