import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the bundled stylesheet once at the app root:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

/**
 * Progress — a determinate / indeterminate progress indicator.
 *
 * Complements {@link Spinner} (which only conveys "something is
 * happening") by visualising *how much* of a task is done. Two visual
 * shapes:
 *
 *   • `line`   — a horizontal bar with a colored fill.
 *   • `circle` — a ring whose stroke is a fraction of the full circle.
 *
 * API contract
 * ------------
 *  - `value` is clamped to [0, 100]. NaN / undefined fall back to 0.
 *  - `indeterminate` overrides `value`: the bar slides / the ring spins,
 *    `aria-valuenow` is intentionally omitted, and labels are hidden.
 *  - `status` maps to one of the existing semantic tokens
 *    (`--su-color-success | --su-color-warning | --su-color-danger`),
 *    falling back to `--su-ink-primary` for `normal`.
 *  - The current percentage is exposed to CSS via the inline custom
 *    property `--su-progress-value` (e.g. `42%`), letting CSS drive the
 *    fill width / ring offset without React re-styling per pixel.
 *  - Accessibility: the root carries `role="progressbar"` with
 *    `aria-valuemin=0` / `aria-valuemax=100`, plus `aria-valuenow` when
 *    determinate. An `aria-label` is strongly encouraged; if absent the
 *    component falls back to `'Loading'`.
 */

export type ProgressVariant = 'line' | 'circle';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressStatus = 'normal' | 'success' | 'warning' | 'danger';

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress percentage, 0–100. Ignored when `indeterminate` is true. Default `0`. */
  value?: number;
  /** Indeterminate state (sliding bar / spinning arc). Default `false`. */
  indeterminate?: boolean;
  /** Visual shape. Default `'line'`. */
  variant?: ProgressVariant;
  /** Size preset. Line height: 6 / 10 / 14. Circle diameter: 56 / 80 / 112. Default `'md'`. */
  size?: ProgressSize;
  /** Semantic status color. Default `'normal'`. */
  status?: ProgressStatus;
  /**
   * Show the percentage text. For `line` it sits to the right of the
   * track; for `circle` it sits centered. Forced off when
   * `indeterminate`. Default `false`.
   */
  showLabel?: boolean;
  /**
   * Custom label renderer. Receives the clamped value (0–100) and may
   * return any node. Takes precedence over the default `n%` rendering.
   */
  formatLabel?: (value: number) => React.ReactNode;
  /** Accessible label for the progressbar. Strongly recommended. */
  'aria-label'?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** Clamp `value` into [0, 100]. NaN / undefined → 0. */
function clampPercent(value: number | undefined): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

/** SVG circle geometry per `size`, in viewBox-36 units.
 *
 *  We render the SVG at a fixed `viewBox="0 0 36 36"` regardless of size
 *  — the outer width/height in CSS scales it. `pathLength={100}`
 *  normalises the perimeter so `stroke-dashoffset = 100 - value` always
 *  maps cleanly to "value percent of the circumference filled". */
const CIRCLE_STROKE_BY_SIZE: Record<ProgressSize, number> = {
  sm: 4,
  md: 5,
  lg: 6,
};

/* Indeterminate ring uses a *short* dash that the spinning SVG carries
 * around the circle. ~25 of the 100-unit perimeter looks like a quarter
 * arc, which reads clearly as "spinning" without overlapping itself. */
const INDETERMINATE_DASH = 25;

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value,
      indeterminate = false,
      variant = 'line',
      size = 'md',
      status = 'normal',
      showLabel = false,
      formatLabel,
      className,
      style,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    const clamped = clampPercent(value);
    // Indeterminate forcibly hides any label, per the spec.
    const labelVisible = showLabel && !indeterminate;

    const labelNode: React.ReactNode = labelVisible
      ? formatLabel
        ? formatLabel(clamped)
        : `${Math.round(clamped)}%`
      : null;

    const classes = cx(
      'su-progress',
      `su-progress--${variant}`,
      `su-progress--${size}`,
      `su-progress--status-${status}`,
      indeterminate && 'su-progress--indeterminate',
      labelVisible && 'su-progress--with-label',
      className
    );

    // Pass the clamped percentage to CSS as a length so the width /
    // dashoffset rules can compute against it without inline width.
    const mergedStyle: React.CSSProperties = {
      ...style,
      ['--su-progress-value' as string]: `${clamped}%`,
    };

    // ARIA: omit aria-valuenow when indeterminate (per WAI-ARIA spec —
    // the value is unknown). Always advertise min/max so AT can render
    // the bounds.
    const ariaProps: React.AriaAttributes = {
      'aria-label': ariaLabel ?? 'Loading',
      'aria-valuemin': 0,
      'aria-valuemax': 100,
    };
    if (!indeterminate) {
      ariaProps['aria-valuenow'] = clamped;
    }

    if (variant === 'circle') {
      const strokeWidth = CIRCLE_STROKE_BY_SIZE[size];
      // dashoffset for the determinate fill: 100 - value (since
      // pathLength is normalised to 100). Indeterminate uses a fixed
      // short arc; CSS spins the whole svg.
      const dashArray = indeterminate
        ? `${INDETERMINATE_DASH} ${100 - INDETERMINATE_DASH}`
        : '100 100';
      const dashOffset = indeterminate ? 0 : 100 - clamped;

      return (
        <div
          {...rest}
          ref={ref}
          role="progressbar"
          {...ariaProps}
          className={classes}
          style={mergedStyle}
        >
          <svg
            className="su-progress__svg"
            viewBox="0 0 36 36"
            aria-hidden="true"
            focusable="false"
          >
            {/* The whole drawing is rotated -90° so the stroke starts at
                12 o'clock and grows clockwise. Both circles share the
                same transform so the track and fill stay aligned. */}
            <g transform="rotate(-90 18 18)">
              <circle
                className="su-progress__circle-track"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                pathLength={100}
              />
              <circle
                className="su-progress__circle-fill"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            </g>
          </svg>
          {labelVisible && (
            <span className="su-progress__label" aria-hidden="true">
              {labelNode}
            </span>
          )}
        </div>
      );
    }

    // === line ===========================================================
    return (
      <div
        {...rest}
        ref={ref}
        role="progressbar"
        {...ariaProps}
        className={classes}
        style={mergedStyle}
      >
        <div className="su-progress__track" aria-hidden="true">
          <div className="su-progress__fill" />
        </div>
        {labelVisible && (
          <span className="su-progress__label" aria-hidden="true">
            {labelNode}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
