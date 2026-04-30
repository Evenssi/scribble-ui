import * as React from 'react';

// Note: this component does NOT import its CSS file directly; consumers
// pull the bundled `scribble-ui/styles/components.css` once at the app
// root (see the package README).

export type SkeletonVariant = 'text' | 'rect' | 'circle';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Public props for {@link Skeleton}.
 *
 * `children` is intentionally stripped — a skeleton is a placeholder, it
 * never renders user-supplied content. Width/height accept either a raw
 * pixel number or any CSS length string (`'60%'`, `'2rem'`, …).
 */
export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Shape preset. Defaults to `'text'`. */
  variant?: SkeletonVariant;
  /** Width. Numbers are treated as pixels; strings are passed through. */
  width?: number | string;
  /** Height. Numbers are treated as pixels; strings are passed through. */
  height?: number | string;
  /**
   * Number of stacked lines (only meaningful when `variant === 'text'`).
   * Values greater than 1 render multiple lines; the last one is auto
   * narrowed to 60% width unless the caller explicitly passed `width`.
   */
  lines?: number;
  /**
   * Border radius override. Numbers are treated as pixels. `circle`
   * always wins (forced to `50%`).
   */
  radius?: number | string;
  /** Animation style. Defaults to `'pulse'`. */
  animation?: SkeletonAnimation;
  /** Extra class names appended after the built-in classes. */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** Convert a number → `${n}px`, leave strings untouched, drop undefined. */
function toCssLength(v: number | string | undefined): string | undefined {
  if (v === undefined || v === null) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

/**
 * Skeleton — a calm placeholder block while real content loads.
 *
 * Unlike most scribble-ui surfaces this one **does not** apply the
 * hand-drawn wobble filter: a list of skeletons should feel patient,
 * not jittery. Animations stay subtle (pulse / wave) and respect
 * `prefers-reduced-motion: reduce` by collapsing to the static state.
 *
 * Accessibility: the root carries `role="status"`, `aria-busy="true"`
 * and `aria-live="polite"` so screen readers can announce loading
 * regions without spamming.
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(
    {
      variant = 'text',
      width,
      height,
      lines,
      radius,
      animation = 'pulse',
      className,
      style,
      ...rest
    },
    ref
  ) {
    const animationClass = `su-skeleton--anim-${animation}`;
    const variantClass = `su-skeleton--${variant}`;

    // Multi-line text mode: render a flex column of <line> elements. The
    // last line shrinks to 60% so it reads as a real paragraph end —
    // unless the caller pinned an explicit width.
    if (variant === 'text' && lines !== undefined && lines > 1) {
      const lineCount = Math.floor(lines);
      const userWidth = toCssLength(width);
      const userRadius = toCssLength(radius);

      return (
        <span
          {...rest}
          ref={ref}
          role="status"
          aria-busy="true"
          aria-live="polite"
          className={cx('su-skeleton-group', className)}
          style={style}
        >
          {Array.from({ length: lineCount }).map((_, idx) => {
            const isLast = idx === lineCount - 1;
            const lineWidth = userWidth ?? (isLast ? '60%' : '100%');
            const lineStyle: React.CSSProperties = {
              width: lineWidth,
              height: toCssLength(height) ?? '1em',
              borderRadius: userRadius ?? 'var(--su-radius-tag)',
            };
            return (
              <span
                key={idx}
                aria-hidden="true"
                className={cx(
                  'su-skeleton',
                  variantClass,
                  animationClass,
                  'su-skeleton--line'
                )}
                style={lineStyle}
              >
                {/* Non-breaking space keeps the box at line-height even
                    when no explicit height is provided. */}
                &nbsp;
              </span>
            );
          })}
        </span>
      );
    }

    // Single-element path (text single-line, rect, circle).
    let resolvedWidth: string | undefined = toCssLength(width);
    let resolvedHeight: string | undefined = toCssLength(height);
    let resolvedRadius: string | undefined = toCssLength(radius);

    if (variant === 'circle') {
      // A circle defaults to 40×40 and forces a perfect round corner.
      resolvedWidth = resolvedWidth ?? '40px';
      resolvedHeight = resolvedHeight ?? resolvedWidth;
      resolvedRadius = '50%';
    } else if (variant === 'rect') {
      resolvedWidth = resolvedWidth ?? '100%';
      resolvedHeight = resolvedHeight ?? '80px';
      resolvedRadius = resolvedRadius ?? 'var(--su-radius-tag)';
    } else {
      // text · single line
      resolvedHeight = resolvedHeight ?? '1em';
      resolvedRadius = resolvedRadius ?? 'var(--su-radius-tag)';
    }

    const inlineStyle: React.CSSProperties = {
      width: resolvedWidth,
      height: resolvedHeight,
      borderRadius: resolvedRadius,
      ...style,
    };

    return (
      <span
        {...rest}
        ref={ref}
        role="status"
        aria-busy="true"
        aria-live="polite"
        className={cx('su-skeleton', variantClass, animationClass, className)}
        style={inlineStyle}
      >
        {variant === 'text' ? '\u00A0' : null}
      </span>
    );
  }
);

Skeleton.displayName = 'Skeleton';
