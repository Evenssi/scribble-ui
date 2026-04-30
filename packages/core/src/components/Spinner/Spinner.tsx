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

/* === Variants ==============================================
 *
 * Hand-drawn aesthetic strategy: the *path data itself* is what makes
 * each shape look hand-made. We do NOT add any runtime jitter / wobble
 * keyframes — those felt unnatural. The paths are intentionally:
 *
 *   • slightly irregular (control points off the mathematical ideal),
 *   • not perfectly closed (the ring's end overshoots the start),
 *   • asymmetric in size and position (the three dots vary).
 *
 * The result reads as scribbled even when frozen. The primary motion
 * (rotate / pulse / draw-erase) plays on top of that static shape.
 */

function RingSpinner({ px, stroke }: { px: number; stroke: number }): JSX.Element {
  // A loop drawn the way a person would: start at the top, sweep
  // clockwise with four cubic segments whose control points are
  // pushed off the canonical Bezier-circle constant (≈4.97 for r=9)
  // by ±1px in different directions. The path deliberately does NOT
  // close — the pen "overshoots" past the start point and lifts at
  // (10.5, 3.6) instead of returning to (12, 3). That tiny visible
  // gap is the signature of a hand-drawn loop.
  return (
    <svg
      className="su-spinner__ring"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="su-spinner__ring-path"
        d="M12 3
           C 17.4 3.2, 20.8 6.6, 21 12
           C 21.3 17.2, 17 20.6, 12 21
           C 6.7 21.3, 3.4 16.6, 3 12
           C 2.7 7, 6.8 3.7, 10.5 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsSpinner({ px, stroke: _stroke }: { px: number; stroke: number }): JSX.Element {
  // Three "ink blobs" rather than perfect filled circles. Each blob is
  // a closed cubic-Bezier loop with slightly different radius, slightly
  // off-grid centers, and slightly squashed proportions — so they read
  // as "three dabs of a pen" instead of "three identical CSS circles".
  //
  // Sizes / positions chosen by hand:
  //   dot 1: center ≈ (4.0, 4.1), radius ≈ 2.4, slightly oval (wider).
  //   dot 2: center ≈ (11.7, 3.9), radius ≈ 2.7, taller than wide.
  //   dot 3: center ≈ (20.3, 4.2), radius ≈ 2.5, the most circular.
  return (
    <svg
      className="su-spinner__dots"
      width={px}
      height={px / 3}
      viewBox="0 0 24 8"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="su-spinner__dot su-spinner__dot--1"
        d="M4 1.7 C 6.3 1.6, 6.6 4.5, 6.4 5.0 C 6.2 6.6, 4.0 6.7, 3.7 6.4 C 1.8 6.0, 1.6 4.0, 2.0 3.2 C 2.4 2.2, 3.2 1.8, 4 1.7 Z"
        fill="currentColor"
      />
      <path
        className="su-spinner__dot su-spinner__dot--2"
        d="M11.7 1.2 C 14.2 1.4, 14.6 4.4, 14.3 5.0 C 13.9 6.6, 11.4 6.8, 11.0 6.5 C 9.0 6.0, 8.9 3.6, 9.4 2.8 C 9.9 1.7, 10.9 1.2, 11.7 1.2 Z"
        fill="currentColor"
      />
      <path
        className="su-spinner__dot su-spinner__dot--3"
        d="M20.3 1.7 C 22.6 1.6, 22.9 4.6, 22.6 5.2 C 22.3 6.6, 20.2 6.7, 19.9 6.4 C 18.0 5.9, 18.1 3.9, 18.5 3.1 C 18.9 2.1, 19.6 1.8, 20.3 1.7 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PencilSpinner({ px, stroke }: { px: number; stroke: number }): JSX.Element {
  // A real signature-style scribble:
  //   • starts at (3, 14) — note the slanted entry, not horizontal.
  //   • two waves with intentionally UNEQUAL peak heights (first peak
  //     reaches y=4, second only y=7) and DIFFERENT valley depths
  //     (first valley y=18, second y=16) — i.e. the signature of a
  //     hand that didn't keep amplitude constant.
  //   • ends with a small upward "flick" at (33, 8) — the kind of
  //     decorative tail a human draws at the end of a quick squiggle.
  //
  // Total path length ≈ 40 (we keep `pathLength="40"` so the dash math
  // for draw-in / erase-out stays decoupled from rendered px size).
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
        className="su-spinner__pencil-path"
        d="M3 14
           C 6 4, 10 3, 14 6
           C 17 9, 18 18, 22 17
           C 26 16, 28 7, 30 11
           C 31 13, 32 16, 33 8"
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
 * - `ring` rotates a hand-traced, intentionally non-closed loop clockwise.
 * - `dots` pulses three pen-drawn ink blobs in sequence.
 * - `pencil` redraws an asymmetric scribble in/out.
 *
 * Hand-drawn aesthetic: the SVG path data of every variant is itself
 * deliberately irregular (off-true control points, mismatched radii,
 * uneven wave heights, an end-flick on the pencil). No runtime jitter
 * or wobble keyframes — the shapes look scribbled even when paused,
 * and the primary motion plays cleanly on top of that static character.
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
      visual = <DotsSpinner px={px} stroke={stroke} />;
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
