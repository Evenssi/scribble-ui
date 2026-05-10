import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type WheelEvent,
} from 'react';

export type NumberInputSize = 'sm' | 'md' | 'lg';

/**
 * Public props for {@link NumberInput}.
 *
 * NumberInput is a "number-aware" enhancement of {@link Input}: same hand-drawn
 * wrapper, same prefix/suffix slot system, plus typed step controls, keyboard
 * shortcuts and value clamping. It deliberately uses `type="text"` under the
 * hood (with `inputMode="decimal"`) so we don't inherit the inconsistent
 * native spinner UI between browsers.
 *
 * `size` is hijacked for visual sizing — same convention as {@link Input}.
 */
export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'size'
    | 'prefix'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'type'
    | 'min'
    | 'max'
    | 'step'
  > {
  /** Controlled numeric value. `undefined` means empty state. */
  value?: number;
  /** Uncontrolled initial value. */
  defaultValue?: number;
  /** Fires with the parsed numeric value (or `undefined` when emptied). */
  onChange?: (value: number | undefined) => void;
  /** Lower bound (inclusive). Used for clamping + arrow keys + minus button. */
  min?: number;
  /** Upper bound (inclusive). Used for clamping + arrow keys + plus button. */
  max?: number;
  /** Increment for arrow keys / step buttons. Defaults to `1`. */
  step?: number;
  /** Decimal places enforced on blur via `toFixed(precision)`. */
  precision?: number;
  /** Show ± buttons on the right side. Defaults to `true`. */
  controls?: boolean;
  /** Visual size — does not map to the native `size` attribute. */
  size?: NumberInputSize;
  /** Render with the danger color and set `aria-invalid`. */
  error?: boolean;
  /** Helper text rendered under the input. Picks the danger color when `error`. */
  helperText?: ReactNode;
  /** Slot rendered inside the wrapper, before the native input. */
  prefix?: ReactNode;
  /**
   * Slot rendered after the ± controls. Useful for unit labels like "元" / "%".
   * The ± controls always render before this slot when `controls` is on.
   */
  suffix?: ReactNode;
  /**
   * Opt-in mouse-wheel stepping. When `true`, scrolling while the input is
   * focused will ±step the value. Disabled by default to avoid hijacking
   * page scroll on accident.
   */
  wheelStep?: boolean;
  /** Optional class on the outer wrapper. */
  wrapperClassName?: string;
  /** Optional class on the native `<input>` element. */
  className?: string;
  /** Form submission name — renders a hidden mirror so `<form>` can read it. */
  name?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Allow intermediate strings while typing: `''`, `'-'`, `'1.'`, `'-0.'`,
 * scientific tails like `'1e'`, etc. We only commit a numeric value via
 * `onChange` once a fully-parseable string is entered (or on blur).
 */
function isIntermediate(raw: string): boolean {
  if (raw === '' || raw === '-' || raw === '+' || raw === '.' || raw === '-.' || raw === '+.') {
    return true;
  }
  // Trailing dot (e.g. "1.", "-0.") means "still typing".
  if (/^[-+]?\d*\.$/.test(raw)) return true;
  return false;
}

/** Parse a string to a finite number, or `undefined` if it's not parseable. */
function safeParse(raw: string): number | undefined {
  if (raw === '' || raw == null) return undefined;
  // Reject pure intermediates — caller should check `isIntermediate` first
  // if it cares to keep them; here we treat them as "no value".
  const n = Number(raw);
  if (!Number.isFinite(n)) return undefined;
  return n;
}

function clamp(n: number, min: number | undefined, max: number | undefined): number {
  let out = n;
  if (typeof min === 'number' && out < min) out = min;
  if (typeof max === 'number' && out > max) out = max;
  return out;
}

function applyPrecision(n: number, precision: number | undefined): number {
  if (typeof precision !== 'number' || !Number.isFinite(precision) || precision < 0) {
    return n;
  }
  // toFixed returns a string — re-parse to a number so floats compare cleanly.
  return Number(n.toFixed(precision));
}

function formatForDisplay(
  n: number | undefined,
  precision: number | undefined
): string {
  if (n === undefined || !Number.isFinite(n)) return '';
  if (typeof precision === 'number' && precision >= 0) {
    return n.toFixed(precision);
  }
  return String(n);
}

/**
 * Hand-drawn numeric input.
 *
 * - Controlled (`value` + `onChange`) and uncontrolled (`defaultValue`).
 * - Keyboard: ↑/↓ ±step, Shift ↑/↓ ±step×10, Alt ↑/↓ ±step×0.1, Home/End jump
 *   to min/max when defined.
 * - Optional mouse-wheel stepping (`wheelStep`).
 * - Permissive in-flight editing: lets the user type partial numbers
 *   (`-`, `1.`, etc.) and only commits a clean, clamped number on blur.
 * - Renders a hidden `<input type="hidden" name>` mirror so the value
 *   participates in native `<form>` submissions.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision,
      controls = true,
      size = 'md',
      error = false,
      helperText,
      prefix,
      suffix,
      wheelStep = false,
      wrapperClassName,
      className,
      disabled,
      readOnly,
      placeholder,
      id,
      name,
      onKeyDown,
      onBlur,
      onFocus,
      onWheel,
      ...rest
    },
    ref
  ) {
    // --- controlled / uncontrolled bridge ---------------------------------
    const isControlled = value !== undefined;

    // The committed numeric value (last clean number we successfully parsed).
    const [innerValue, setInnerValue] = useState<number | undefined>(
      defaultValue
    );
    const currentValue = isControlled ? value : innerValue;

    // The raw text shown in the <input>. This is intentionally separate from
    // `currentValue` so users can type partials like "-", "1.", "" without
    // them being clobbered by re-renders.
    const [rawText, setRawText] = useState<string>(() =>
      formatForDisplay(defaultValue ?? value, precision)
    );

    // When the controlled value changes from the outside (or precision
    // changes), reflect it into the visible text — but only when the input
    // is not currently focused, so we don't fight the user's typing.
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (!isControlled) return;
      if (document.activeElement === innerRef.current) return;
      setRawText(formatForDisplay(value, precision));
    }, [isControlled, value, precision]);

    // --- helpers ----------------------------------------------------------
    const commit = useCallback(
      (next: number | undefined) => {
        if (!isControlled) {
          setInnerValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    /** Clean a number through clamp + precision in one go. */
    const clean = useCallback(
      (n: number): number => applyPrecision(clamp(n, min, max), precision),
      [min, max, precision]
    );

    const stepBy = useCallback(
      (delta: number) => {
        if (disabled || readOnly) return;
        const base = currentValue ?? clamp(0, min, max);
        const next = clean(base + delta);
        commit(next);
        setRawText(formatForDisplay(next, precision));
      },
      [disabled, readOnly, currentValue, clean, commit, min, max, precision]
    );

    // --- input change -----------------------------------------------------
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        setRawText(raw);

        if (isIntermediate(raw)) {
          // Don't commit while the user is mid-keystroke; hold off until blur.
          // But "" should clear the value so callers see `undefined`.
          if (raw === '') commit(undefined);
          return;
        }

        const parsed = safeParse(raw);
        if (parsed === undefined) {
          // Garbage in — don't commit, let blur reconcile.
          return;
        }

        // Don't apply precision while typing (it would chop "1.2" to "1" if
        // precision === 0); but DO clamp to keep the consumer's value sane.
        const clamped = clamp(parsed, min, max);
        commit(clamped);
      },
      [commit, min, max]
    );

    // --- blur reconciliation ---------------------------------------------
    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        const parsed = safeParse(raw);

        if (parsed === undefined) {
          if (raw === '') {
            commit(undefined);
            setRawText('');
          } else {
            // Garbage — fall back to the last good number, or empty.
            const fallback = currentValue;
            commit(fallback);
            setRawText(formatForDisplay(fallback, precision));
          }
        } else {
          const next = clean(parsed);
          commit(next);
          setRawText(formatForDisplay(next, precision));
        }

        onBlur?.(event);
      },
      [clean, commit, currentValue, precision, onBlur]
    );

    // --- keyboard ---------------------------------------------------------
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (!disabled && !readOnly) {
          const { key, shiftKey, altKey } = event;

          if (key === 'ArrowUp' || key === 'ArrowDown') {
            event.preventDefault();
            const sign = key === 'ArrowUp' ? 1 : -1;
            const multiplier = shiftKey ? 10 : altKey ? 0.1 : 1;
            stepBy(sign * step * multiplier);
          } else if (key === 'Home') {
            if (typeof min === 'number') {
              event.preventDefault();
              const next = clean(min);
              commit(next);
              setRawText(formatForDisplay(next, precision));
            }
          } else if (key === 'End') {
            if (typeof max === 'number') {
              event.preventDefault();
              const next = clean(max);
              commit(next);
              setRawText(formatForDisplay(next, precision));
            }
          }
        }
        onKeyDown?.(event);
      },
      [
        disabled,
        readOnly,
        step,
        stepBy,
        min,
        max,
        clean,
        commit,
        precision,
        onKeyDown,
      ]
    );

    // --- wheel ------------------------------------------------------------
    const handleWheel = useCallback(
      (event: WheelEvent<HTMLInputElement>) => {
        if (
          wheelStep &&
          !disabled &&
          !readOnly &&
          document.activeElement === innerRef.current
        ) {
          // Only intercept when the input is focused, otherwise users can't
          // scroll the page past the input. Block native scroll to keep the
          // page steady while stepping.
          event.preventDefault();
          stepBy(event.deltaY < 0 ? step : -step);
        }
        onWheel?.(event);
      },
      [wheelStep, disabled, readOnly, step, stepBy, onWheel]
    );

    // --- ± button bookkeeping --------------------------------------------
    const atMin =
      typeof min === 'number' &&
      currentValue !== undefined &&
      currentValue <= min;
    const atMax =
      typeof max === 'number' &&
      currentValue !== undefined &&
      currentValue >= max;

    const minusDisabled = !!disabled || !!readOnly || atMin;
    const plusDisabled = !!disabled || !!readOnly || atMax;

    const showControls = controls;
    const hasSuffix = suffix !== undefined && suffix !== null;

    // --- aria for spinbutton role ----------------------------------------
    const ariaValueNow =
      currentValue !== undefined && Number.isFinite(currentValue)
        ? currentValue
        : undefined;

    return (
      <span className={cx('su-number-input', wrapperClassName)}>
        <span
          className={cx(
            'su-number-input__wrapper',
            `su-number-input__wrapper--${size}`,
            error && 'su-number-input__wrapper--error',
            disabled && 'su-number-input__wrapper--disabled',
            readOnly && 'su-number-input__wrapper--readonly'
          )}
        >
          {prefix !== undefined && prefix !== null ? (
            <span className="su-number-input__affix su-number-input__affix--prefix">
              {prefix}
            </span>
          ) : null}

          <input
            {...rest}
            ref={innerRef}
            id={id}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            className={cx('su-number-input__control', className)}
            value={rawText}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            aria-invalid={error || undefined}
            aria-valuemin={typeof min === 'number' ? min : undefined}
            aria-valuemax={typeof max === 'number' ? max : undefined}
            aria-valuenow={ariaValueNow}
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
          />

          {showControls ? (
            <span
              className="su-number-input__controls"
              aria-hidden="true"
            >
              <button
                type="button"
                tabIndex={-1}
                className="su-number-input__step su-number-input__step--up"
                aria-label="Increase value"
                disabled={plusDisabled}
                onClick={() => stepBy(step)}
              >
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M1 5 L5 1 L9 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
              <button
                type="button"
                tabIndex={-1}
                className="su-number-input__step su-number-input__step--down"
                aria-label="Decrease value"
                disabled={minusDisabled}
                onClick={() => stepBy(-step)}
              >
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M1 1 L5 5 L9 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </span>
          ) : null}

          {hasSuffix ? (
            <span className="su-number-input__affix su-number-input__affix--suffix">
              {suffix}
            </span>
          ) : null}
        </span>

        {/* Hidden mirror so the value participates in native form submits. */}
        {name ? (
          <input
            type="hidden"
            name={name}
            value={
              currentValue !== undefined && Number.isFinite(currentValue)
                ? String(currentValue)
                : ''
            }
          />
        ) : null}

        {helperText ? (
          <span
            className={cx(
              'su-number-input__helper',
              error && 'su-number-input__helper--error'
            )}
          >
            {helperText}
          </span>
        ) : null}
      </span>
    );
  }
);

NumberInput.displayName = 'NumberInput';
