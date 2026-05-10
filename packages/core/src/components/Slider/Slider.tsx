import * as React from 'react';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderTooltipMode = 'always' | 'hover' | 'drag' | 'never';

export interface SliderMark {
  /** The value at which the mark sits on the track. */
  value: number;
  /** Optional label rendered next to the tick. */
  label?: React.ReactNode;
}

/**
 * Common props shared by both single-value and range Slider variants.
 *
 * `value` / `defaultValue` / `onChange` are intentionally *not* declared
 * here — the type splits them by `range` so the change handler ergonomics
 * are correct in both modes (one number vs. a tuple).
 */
export interface SliderBaseProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'children'
  > {
  /** Inclusive lower bound. Defaults to 0. */
  min?: number;
  /** Inclusive upper bound. Defaults to 100. */
  max?: number;
  /** Step increment for keyboard + drag snapping. Defaults to 1. */
  step?: number;
  /**
   * Optional tick marks rendered on the track. Marks are decorative —
   * they don't constrain the value to those positions, only `step` does.
   */
  marks?: SliderMark[];
  /**
   * Disable all interaction. Drops the wobble entirely and removes the
   * thumbs from the tab order, mirroring Button / Input.
   */
  disabled?: boolean;
  /** Render the slider vertically. Keyboard semantics are unchanged. */
  vertical?: boolean;
  /** Size preset. Defaults to `'md'`. */
  size?: SliderSize;
  /**
   * When (and whether) to render a value tooltip next to the active
   * thumb.
   *
   * - `'always'` — visible at all times.
   * - `'hover'` — only while the user hovers a thumb.
   * - `'drag'` (default) — only while a drag is in progress *or* the
   *   thumb is receiving keyboard input.
   * - `'never'` — never rendered.
   */
  showTooltip?: SliderTooltipMode;
  /**
   * Format the value displayed inside the tooltip. Defaults to the raw
   * number stringified — override for currency, percentages, etc.
   */
  formatTooltip?: (value: number) => React.ReactNode;
  /**
   * Fired *after* the user releases the pointer or lifts the keyboard.
   * Useful for expensive side effects (e.g. firing a network request)
   * that shouldn't run during the drag.
   */
  onChangeCommitted?: (value: number | [number, number]) => void;
  /** Class names appended to the outer wrapper. */
  className?: string;
  /** Accessible label (forwarded to the active thumb). */
  'aria-label'?: string;
  /** Accessible label, by id (forwarded to the active thumb). */
  'aria-labelledby'?: string;
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
}

export type SliderProps = SliderSingleProps | SliderRangeProps;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function snapToStep(
  raw: number,
  min: number,
  max: number,
  step: number
): number {
  if (step <= 0) return clamp(raw, min, max);
  const offset = raw - min;
  const snapped = Math.round(offset / step) * step + min;
  // Guard against accumulated FP error like 0.1 + 0.2 = 0.30000000000004
  // by rounding to the precision implied by `step` (max 6 decimals).
  const stepStr = String(step);
  const dot = stepStr.indexOf('.');
  const decimals = dot === -1 ? 0 : Math.min(6, stepStr.length - dot - 1);
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(snapped * factor) / factor;
  return clamp(rounded, min, max);
}

/**
 * Convert a pair of [number, number] into a normalised
 * [low, high] pair so we don't have to sweat which thumb the user
 * happens to be dragging.
 */
function normaliseRange(pair: [number, number]): [number, number] {
  return pair[0] <= pair[1] ? pair : [pair[1], pair[0]];
}

/**
 * Slider — hand-drawn looking range input.
 *
 * Implements both single-value and dual-thumb (range) modes from one
 * component. Internally uses `<div role="slider">` thumbs (not native
 * `<input type="range">`) so we get full visual control while keeping
 * the WAI-ARIA Slider pattern semantics intact.
 *
 * Keyboard:
 * - `←` / `↓` decrement, `→` / `↑` increment by `step`
 * - `Shift` + arrow → step × 10
 * - `PageUp` / `PageDown` → 10% of `(max - min)`
 * - `Home` / `End` → snap to `min` / `max`
 *
 * Pointer:
 * - Pointerdown on the track jumps the closest thumb to that position
 *   (range mode picks whichever thumb is closer in value space).
 * - Pointerdown on a thumb starts a drag with `setPointerCapture`.
 *
 * `onChange` fires continuously during interaction; `onChangeCommitted`
 * fires once the user releases the pointer or lifts the last key.
 *
 * Make sure to mount `<HandDrawnFilters />` once at your app root.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const {
      min = DEFAULT_MIN,
      max = DEFAULT_MAX,
      step = DEFAULT_STEP,
      marks,
      disabled = false,
      vertical = false,
      size = 'md',
      showTooltip = 'drag',
      formatTooltip,
      onChangeCommitted,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    } = props;
    // The union shape (`SliderSingleProps | SliderRangeProps`) keeps
    // `value` / `defaultValue` / `onChange` / `range` in `rest` because
    // TS only narrows union members as a whole. Strip them by hand
    // before spreading onto the wrapper <div>, otherwise DTS rejects
    // them as non-DOM props.
    const {
      value: _v,
      defaultValue: _dv,
      onChange: _oc,
      range: _r,
      ...domRest
    } = rest as typeof rest & {
      value?: unknown;
      defaultValue?: unknown;
      onChange?: unknown;
      range?: unknown;
    };
    void _v;
    void _dv;
    void _oc;
    void _r;

    // `range` discriminator — we read it off `props` directly so the
    // narrowing remains visible to TS even after we destructure the
    // shared base props above.
    const isRange = props.range === true;

    // --- Controlled / uncontrolled bridge ---------------------------------
    // We always store [low, high] internally. Single mode just keeps the
    // second slot at `min` and ignores it.
    const isControlled = isRange
      ? (props as SliderRangeProps).value !== undefined
      : (props as SliderSingleProps).value !== undefined;

    const initialValues: [number, number] = React.useMemo(() => {
      if (isRange) {
        const rp = props as SliderRangeProps;
        const seed = rp.value ?? rp.defaultValue ?? [min, max];
        const [lo, hi] = normaliseRange([
          snapToStep(seed[0], min, max, step),
          snapToStep(seed[1], min, max, step),
        ]);
        return [lo, hi];
      }
      const sp = props as SliderSingleProps;
      const seed = sp.value ?? sp.defaultValue ?? min;
      const v = snapToStep(seed, min, max, step);
      return [v, v];
      // We deliberately seed once — the controlled branch syncs via the
      // `currentValues` derivation below.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [innerValues, setInnerValues] =
      React.useState<[number, number]>(initialValues);

    const currentValues: [number, number] = React.useMemo(() => {
      if (!isControlled) return innerValues;
      if (isRange) {
        const rp = props as SliderRangeProps;
        const v = rp.value ?? [min, max];
        return normaliseRange([
          snapToStep(v[0], min, max, step),
          snapToStep(v[1], min, max, step),
        ]);
      }
      const sp = props as SliderSingleProps;
      const v = snapToStep(sp.value ?? min, min, max, step);
      return [v, v];
    }, [isControlled, isRange, innerValues, props, min, max, step]);

    // --- Stable refs to consumer callbacks --------------------------------
    // We capture the latest `onChange` / `onChangeCommitted` in refs so
    // the pointer/keyboard handlers we wire up inside callbacks don't have
    // to re-create on every render.
    const onChangeRef =
      React.useRef<SliderProps['onChange']>(undefined);
    const onCommittedRef =
      React.useRef<SliderBaseProps['onChangeCommitted']>(undefined);
    React.useEffect(() => {
      onChangeRef.current = props.onChange as SliderProps['onChange'];
      onCommittedRef.current = onChangeCommitted;
    }, [props.onChange, onChangeCommitted]);

    // --- Active thumb tracking --------------------------------------------
    // `activeThumb` decides which thumb keyboard focus / pointer drags
    // are routed to. In single mode it's always 0; in range mode it
    // tracks the most-recently-touched thumb (roving tabindex flavor).
    const [activeThumb, setActiveThumb] = React.useState<0 | 1>(0);
    const [hoverThumb, setHoverThumb] = React.useState<0 | 1 | null>(null);
    const [draggingThumb, setDraggingThumb] = React.useState<0 | 1 | null>(
      null
    );
    // `keyDownThumb` is set on keydown and cleared on a debounced keyup so
    // we can fire `onChangeCommitted` exactly once after a burst of arrow
    // keys instead of on every individual keystroke.
    const [keyboardThumb, setKeyboardThumb] = React.useState<0 | 1 | null>(
      null
    );

    // --- DOM refs ---------------------------------------------------------
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRefs = React.useRef<Array<HTMLDivElement | null>>([null, null]);

    // Keyboard commit debounce timer.
    const keyCommitTimerRef = React.useRef<number | null>(null);
    React.useEffect(
      () => () => {
        if (keyCommitTimerRef.current !== null) {
          window.clearTimeout(keyCommitTimerRef.current);
        }
      },
      []
    );

    // --- Helpers ----------------------------------------------------------

    const fireChange = React.useCallback(
      (next: [number, number]) => {
        if (!isControlled) setInnerValues(next);
        if (isRange) {
          (onChangeRef.current as SliderRangeProps['onChange'])?.(next);
        } else {
          (onChangeRef.current as SliderSingleProps['onChange'])?.(next[0]);
        }
      },
      [isControlled, isRange]
    );

    const fireCommitted = React.useCallback(
      (next: [number, number]) => {
        if (isRange) {
          onCommittedRef.current?.(next);
        } else {
          onCommittedRef.current?.(next[0]);
        }
      },
      [isRange]
    );

    /**
     * Update one thumb's value, clamping it against the *other* thumb so
     * thumbs can't cross. Returns the resulting normalised pair.
     */
    const updateThumb = React.useCallback(
      (thumb: 0 | 1, rawValue: number, prev: [number, number]) => {
        const snapped = snapToStep(rawValue, min, max, step);
        if (!isRange) {
          const next: [number, number] = [snapped, snapped];
          return next;
        }
        if (thumb === 0) {
          const next: [number, number] = [
            clamp(snapped, min, prev[1]),
            prev[1],
          ];
          return next;
        }
        const next: [number, number] = [prev[0], clamp(snapped, prev[0], max)];
        return next;
      },
      [min, max, step, isRange]
    );

    /**
     * Convert a clientX/clientY to a value in [min, max] using the track's
     * bounding box. `vertical` flips the axis so up = larger.
     */
    const pointToValue = React.useCallback(
      (clientX: number, clientY: number): number => {
        const node = trackRef.current;
        if (!node) return min;
        const rect = node.getBoundingClientRect();
        let ratio: number;
        if (vertical) {
          const length = rect.height;
          if (length === 0) return min;
          // Top of the track = max value, bottom = min value.
          ratio = (rect.bottom - clientY) / length;
        } else {
          const length = rect.width;
          if (length === 0) return min;
          ratio = (clientX - rect.left) / length;
        }
        ratio = clamp(ratio, 0, 1);
        return min + ratio * (max - min);
      },
      [vertical, min, max]
    );

    // --- Pointer drag -----------------------------------------------------

    const dragInfoRef = React.useRef<{
      thumb: 0 | 1;
      pointerId: number;
      target: HTMLElement;
    } | null>(null);

    const handleThumbPointerDown = React.useCallback(
      (thumb: 0 | 1, event: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        // Only react to primary buttons (mouse left, or touch / pen tap).
        if (event.button !== 0 && event.pointerType === 'mouse') return;

        const target = event.currentTarget;
        try {
          target.setPointerCapture(event.pointerId);
        } catch {
          // Some environments (e.g. headless test runners) reject capture
          // on detached nodes — fall through, the move/up listeners on the
          // same element will still work.
        }
        dragInfoRef.current = { thumb, pointerId: event.pointerId, target };
        setActiveThumb(thumb);
        setDraggingThumb(thumb);
        // Focus the thumb so subsequent keyboard input still routes to it.
        thumbRefs.current[thumb]?.focus();
        // Prevent the parent `<div>` from also stealing this pointer down
        // and re-routing the value to the closest thumb (which would race
        // with this drag).
        event.stopPropagation();
      },
      [disabled]
    );

    const handleThumbPointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const info = dragInfoRef.current;
        if (!info || info.pointerId !== event.pointerId) return;
        const raw = pointToValue(event.clientX, event.clientY);
        // Use the functional updater on the inner state but read from the
        // *latest* values via a ref-style getter so controlled callers
        // also see consistent crossing behaviour.
        const prev = currentValues;
        const next = updateThumb(info.thumb, raw, prev);
        if (next[0] !== prev[0] || next[1] !== prev[1]) {
          fireChange(next);
        }
      },
      [currentValues, pointToValue, updateThumb, fireChange]
    );

    const handleThumbPointerEnd = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const info = dragInfoRef.current;
        if (!info || info.pointerId !== event.pointerId) return;
        try {
          info.target.releasePointerCapture(event.pointerId);
        } catch {
          // ignore — capture might have been lost already
        }
        dragInfoRef.current = null;
        setDraggingThumb(null);
        fireCommitted(currentValues);
      },
      [currentValues, fireCommitted]
    );

    // --- Pointer down on the track (jump-to) ------------------------------

    const handleTrackPointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (event.button !== 0 && event.pointerType === 'mouse') return;
        const raw = pointToValue(event.clientX, event.clientY);
        // Pick whichever thumb is closer in value space.
        let thumb: 0 | 1 = 0;
        if (isRange) {
          const dLow = Math.abs(raw - currentValues[0]);
          const dHigh = Math.abs(raw - currentValues[1]);
          // Tie-break: prefer the upper thumb when raw is on the high side
          // of the midpoint, so dragging right-of-center near the middle
          // grabs the right thumb instead of the left.
          if (dLow === dHigh) {
            const mid = (currentValues[0] + currentValues[1]) / 2;
            thumb = raw >= mid ? 1 : 0;
          } else {
            thumb = dHigh < dLow ? 1 : 0;
          }
        }
        const next = updateThumb(thumb, raw, currentValues);
        setActiveThumb(thumb);
        if (next[0] !== currentValues[0] || next[1] !== currentValues[1]) {
          fireChange(next);
        }
        // Move focus to the targeted thumb and start a drag from there
        // so the user can keep dragging without lifting the pointer.
        const node = thumbRefs.current[thumb];
        if (node) {
          node.focus();
          try {
            node.setPointerCapture(event.pointerId);
            dragInfoRef.current = {
              thumb,
              pointerId: event.pointerId,
              target: node,
            };
            setDraggingThumb(thumb);
          } catch {
            // No capture available — at minimum the jump-to landed.
          }
        }
      },
      [
        disabled,
        pointToValue,
        isRange,
        currentValues,
        updateThumb,
        fireChange,
      ]
    );

    // --- Keyboard ---------------------------------------------------------

    const scheduleKeyCommit = React.useCallback(
      (next: [number, number]) => {
        if (keyCommitTimerRef.current !== null) {
          window.clearTimeout(keyCommitTimerRef.current);
        }
        // 120ms after the *last* arrow press we treat the burst as
        // committed. This gives users time to rapid-fire arrow keys
        // without spamming `onChangeCommitted`.
        keyCommitTimerRef.current = window.setTimeout(() => {
          keyCommitTimerRef.current = null;
          setKeyboardThumb(null);
          fireCommitted(next);
        }, 120);
      },
      [fireCommitted]
    );

    const handleThumbKeyDown = React.useCallback(
      (thumb: 0 | 1, event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        const k = event.key;
        const big = event.shiftKey ? 10 : 1;
        const pageDelta = Math.max(step, (max - min) / 10);

        let raw: number | null = null;
        const prev = currentValues;
        const cur = prev[thumb];

        if (k === 'ArrowRight' || k === 'ArrowUp') {
          raw = cur + step * big;
        } else if (k === 'ArrowLeft' || k === 'ArrowDown') {
          raw = cur - step * big;
        } else if (k === 'PageUp') {
          raw = cur + pageDelta;
        } else if (k === 'PageDown') {
          raw = cur - pageDelta;
        } else if (k === 'Home') {
          raw = min;
        } else if (k === 'End') {
          raw = max;
        }

        if (raw === null) return;
        event.preventDefault();
        setActiveThumb(thumb);
        setKeyboardThumb(thumb);
        const next = updateThumb(thumb, raw, prev);
        if (next[0] !== prev[0] || next[1] !== prev[1]) {
          fireChange(next);
        }
        scheduleKeyCommit(next);
      },
      [
        disabled,
        step,
        max,
        min,
        currentValues,
        updateThumb,
        fireChange,
        scheduleKeyCommit,
      ]
    );

    const handleThumbBlur = React.useCallback(
      (_thumb: 0 | 1) => {
        // If the user tabs away mid-burst we still want to commit the
        // pending value so consumers don't end up with a dangling
        // "in flight" value that never finalises.
        if (keyCommitTimerRef.current !== null) {
          window.clearTimeout(keyCommitTimerRef.current);
          keyCommitTimerRef.current = null;
          setKeyboardThumb(null);
          fireCommitted(currentValues);
        }
      },
      [currentValues, fireCommitted]
    );

    // --- Layout helpers ---------------------------------------------------

    const range = max - min;
    const safeRange = range === 0 ? 1 : range;
    const lowPct = ((currentValues[0] - min) / safeRange) * 100;
    const highPct = ((currentValues[1] - min) / safeRange) * 100;

    /** Position style for a thumb (single mode uses `lowPct`). */
    const thumbStyle = (thumb: 0 | 1): React.CSSProperties => {
      const pct = thumb === 0 ? lowPct : highPct;
      return vertical
        ? { bottom: `${pct}%` }
        : { left: `${pct}%` };
    };

    /** Position + size style for the filled portion of the track. */
    const fillStyle: React.CSSProperties = (() => {
      if (isRange) {
        const lo = Math.min(lowPct, highPct);
        const hi = Math.max(lowPct, highPct);
        const span = hi - lo;
        return vertical
          ? { bottom: `${lo}%`, height: `${span}%` }
          : { left: `${lo}%`, width: `${span}%` };
      }
      // Single mode: fill from the start of the track up to the thumb.
      return vertical
        ? { bottom: 0, height: `${lowPct}%` }
        : { left: 0, width: `${lowPct}%` };
    })();

    /** Position style for a mark on the track. */
    const markStyle = (markValue: number): React.CSSProperties => {
      const pct = ((markValue - min) / safeRange) * 100;
      return vertical ? { bottom: `${pct}%` } : { left: `${pct}%` };
    };

    // --- Tooltip rendering decision ---------------------------------------

    const formatValue = React.useCallback(
      (v: number): React.ReactNode =>
        formatTooltip ? formatTooltip(v) : String(v),
      [formatTooltip]
    );

    const isThumbTooltipVisible = React.useCallback(
      (thumb: 0 | 1): boolean => {
        if (showTooltip === 'never' || disabled) return false;
        if (showTooltip === 'always') return true;
        if (showTooltip === 'hover') return hoverThumb === thumb;
        // 'drag' (default): visible while dragging *or* keyboard-driving.
        return draggingThumb === thumb || keyboardThumb === thumb;
      },
      [showTooltip, disabled, hoverThumb, draggingThumb, keyboardThumb]
    );

    // --- Tabindex (roving in range mode) ----------------------------------

    const tabIndexFor = (thumb: 0 | 1): number => {
      if (disabled) return -1;
      if (!isRange) return 0;
      // Roving: only the active thumb is in the tab order; the other
      // thumb can be reached via arrow keys / pointer.
      return thumb === activeThumb ? 0 : -1;
    };

    // --- Render -----------------------------------------------------------

    const classes = cx(
      'su-slider',
      `su-slider--${size}`,
      vertical && 'su-slider--vertical',
      isRange && 'su-slider--range',
      disabled && 'su-slider--disabled',
      draggingThumb !== null && 'su-slider--dragging',
      className
    );

    const renderThumb = (thumb: 0 | 1): JSX.Element => {
      const value = currentValues[thumb];
      const isActive = activeThumb === thumb;
      const tooltipVisible = isThumbTooltipVisible(thumb);

      // Per-thumb aria-label: range mode auto-labels minimum / maximum so
      // consumers don't have to supply two labels by hand. Single mode
      // forwards the user's label as-is.
      const computedLabel: string | undefined = isRange
        ? thumb === 0
          ? ariaLabel
            ? `${ariaLabel} — minimum`
            : 'Minimum'
          : ariaLabel
            ? `${ariaLabel} — maximum`
            : 'Maximum'
        : ariaLabel;

      return (
        <div
          key={thumb}
          ref={(node) => {
            thumbRefs.current[thumb] = node;
          }}
          role="slider"
          tabIndex={tabIndexFor(thumb)}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          aria-disabled={disabled || undefined}
          aria-label={computedLabel}
          aria-labelledby={!computedLabel ? ariaLabelledBy : undefined}
          className={cx(
            'su-slider__thumb',
            // In range mode the "active" thumb gets a stronger outline so
            // users can see which one their next keypress will move. In
            // single mode there's only ever one thumb so the modifier is
            // skipped to keep the visual quiet.
            isRange && isActive && 'su-slider__thumb--active',
            draggingThumb === thumb && 'su-slider__thumb--dragging'
          )}
          style={thumbStyle(thumb)}
          onPointerDown={(e) => handleThumbPointerDown(thumb, e)}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={handleThumbPointerEnd}
          onPointerCancel={handleThumbPointerEnd}
          onKeyDown={(e) => handleThumbKeyDown(thumb, e)}
          onBlur={() => handleThumbBlur(thumb)}
          onFocus={() => setActiveThumb(thumb)}
          onMouseEnter={() => setHoverThumb(thumb)}
          onMouseLeave={() =>
            setHoverThumb((cur) => (cur === thumb ? null : cur))
          }
        >
          {tooltipVisible ? (
            <span
              className="su-slider__tooltip"
              role="presentation"
              aria-hidden="true"
            >
              <span className="su-slider__tooltip-inner">
                {formatValue(value)}
              </span>
            </span>
          ) : null}
        </div>
      );
    };

    return (
      <div ref={ref} className={classes} {...domRest}>
        <div
          ref={trackRef}
          className="su-slider__track"
          onPointerDown={handleTrackPointerDown}
        >
          <div className="su-slider__rail" aria-hidden="true" />
          <div
            className="su-slider__fill"
            aria-hidden="true"
            style={fillStyle}
          />

          {marks && marks.length > 0 ? (
            <div className="su-slider__marks" aria-hidden="true">
              {marks.map((mark) => (
                <div
                  key={mark.value}
                  className="su-slider__mark"
                  style={markStyle(mark.value)}
                >
                  <span className="su-slider__mark-tick" />
                  {mark.label !== undefined && mark.label !== null ? (
                    <span className="su-slider__mark-label">
                      {mark.label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {renderThumb(0)}
          {isRange ? renderThumb(1) : null}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
