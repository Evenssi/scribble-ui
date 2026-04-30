import * as React from 'react';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';   // bundles all component CSS

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'ring' | 'dots' | 'pencil';

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Size preset. Maps to a fixed pixel box (sm 16 / md 24 / lg 36). */
  size?: SpinnerSize;
  /** Visual variant. Defaults to `'ring'`. */
  variant?: SpinnerVariant;
  /**
   * Color override. When omitted, the spinner inherits its color via
   * `currentColor` so it blends into surrounding text — handy for
   * dropping it inside a Button or a colored block.
   */
  color?: string;
  /** Screen-reader text announcing the loading state. */
  label?: string;
  /** When true, render `label` next to the spinner as visible text. */
  showLabel?: boolean;
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** Pixel size and stroke width per `size` token. */
const SIZE_MAP: Record<SpinnerSize, { px: number; stroke: number }> = {
  sm: { px: 16, stroke: 2 },
  md: { px: 24, stroke: 2.5 },
  lg: { px: 36, stroke: 3 },
};

/* === Variants ============================================== */

function RingSpinner({ px, stroke }: { px: number; stroke: number }): JSX.Element {
  // 24×24 viewBox; the visible arc must be CLEARLY ASYMMETRIC, otherwise
  // a rotation around the center looks identical to the original frame
  // and the spin is invisible to the eye.
  //
  // Circle circumference = 2π·9 ≈ 56.55. We render a single ~3/4 arc
  // (`dasharray="42 60"` ⇒ 42 painted, 60 blank, no second painted
  // segment because 42 + 60 > 56.55) — the classic "open ring" loader.
  return (
    <svg
      className="su-spinner__ring"
      width={px}
      height={px}
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
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray="42 60"
      />
    </svg>
  );
}

function DotsSpinner({ px }: { px: number }): JSX.Element {
  // Three dots inside a 24×8 viewBox, scaled to the requested width
  // while keeping a flat aspect ratio (height ≈ 1/3 width).
  return (
    <svg
      className="su-spinner__dots"
      width={px}
      height={px / 3}
      viewBox="0 0 24 8"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="su-spinner__dot su-spinner__dot--1" cx="4" cy="4" r="3" fill="currentColor" />
      <circle className="su-spinner__dot su-spinner__dot--2" cx="12" cy="4" r="3" fill="currentColor" />
      <circle className="su-spinner__dot su-spinner__dot--3" cx="20" cy="4" r="3" fill="currentColor" />
    </svg>
  );
}

function PencilSpinner({ px, stroke }: { px: number; stroke: number }): JSX.Element {
  // A short scribbled wave — drawn in then erased, then drawn again.
  // Length is precomputed (≈40) to make the dasharray cycle look right.
  return (
    <svg
      className="su-spinner__pencil"
      width={px}
      height={px}
      viewBox="0 0 36 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 12 Q 10 4, 18 12 T 34 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={40}
        strokeDasharray="40"
      />
    </svg>
  );
}

/**
 * Spinner — a small loading indicator in three hand-drawn flavors.
 *
 * - `ring` rotates a 1/3 arc clockwise.
 * - `dots` pulses three circles in sequence.
 * - `pencil` redraws a short scribble in/out.
 *
 * Always renders an SR-only label (`label`, defaulting to "Loading") so
 * assistive tech announces the busy state. Use `showLabel` to also
 * render the same text visibly next to the spinner.
 *
 * Color follows `currentColor`, making it safe to drop inside Button,
 * Tag, or any colored container without extra wiring.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    {
      size = 'md',
      variant = 'ring',
      color,
      label = 'Loading',
      showLabel = false,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const { px, stroke } = SIZE_MAP[size];

    const classes = cx(
      'su-spinner',
      `su-spinner--${variant}`,
      `su-spinner--${size}`,
      showLabel && 'su-spinner--with-label',
      className
    );

    // Color override: `style.color` cascades into `currentColor` for the
    // SVG strokes/fills, so callers can theme without touching CSS.
    const mergedStyle: React.CSSProperties | undefined = color
      ? { color, ...style }
      : style;

    let visual: React.ReactNode;
    if (variant === 'dots') {
      visual = <DotsSpinner px={px} />;
    } else if (variant === 'pencil') {
      visual = <PencilSpinner px={px} stroke={stroke} />;
    } else {
      visual = <RingSpinner px={px} stroke={stroke} />;
    }

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        aria-live="polite"
        className={classes}
        style={mergedStyle}
        {...rest}
      >
        <span className="su-spinner__visual">{visual}</span>
        {showLabel && label ? (
          <span className="su-spinner__label" aria-hidden="true">
            {label}
          </span>
        ) : (
          <span className="su-spinner__sr-only">{label}</span>
        )}
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
