import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Public props for {@link Input}.
 *
 * Inherits every native `<input>` attribute (with the exception of `size`,
 * which we hijack for visual sizing — the native HTML `size` attribute is
 * almost never used on real-world UIs and would clash with our token).
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Visual size — does not map to the native `size` attribute. */
  size?: InputSize;
  /** Render with the danger color and an optional helper line below. */
  error?: boolean;
  /** Helper text rendered under the input. Picks the danger color when `error` is true. */
  helperText?: ReactNode;
  /** Slot rendered inside the wrapper, before the native input. */
  prefix?: ReactNode;
  /** Slot rendered inside the wrapper, after the native input. */
  suffix?: ReactNode;
  /**
   * Render a clear (✕) affordance whenever the input has a value.
   *
   * `clearable` and `suffix` are mutually exclusive — if both are passed
   * the suffix wins and a `console.warn` is emitted in development to
   * encourage callers to pick one.
   */
  clearable?: boolean;
  /** Optional class on the outer wrapper (the element that draws the border). */
  wrapperClassName?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Hand-drawn text input.
 *
 * Supports both controlled (`value` + `onChange`) and uncontrolled
 * (`defaultValue`) usage. The visual border lives on the wrapper element
 * so prefix / suffix slots sit inside the same hand-drawn outline as the
 * text itself.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    error = false,
    helperText,
    prefix,
    suffix,
    clearable = false,
    wrapperClassName,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    id,
    ...rest
  },
  ref
) {
  // --- Controlled / uncontrolled bridge -----------------------------------
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ''
  );
  const currentValue = isControlled ? String(value ?? '') : innerValue;

  // --- ref forwarding (so `clearable` can refocus on clear) ---------------
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInnerValue(event.target.value);
      }
      onChange?.(event);
    },
    [isControlled, onChange]
  );

  // --- clearable / suffix conflict resolution -----------------------------
  const wantsClearable = clearable && !disabled && !readOnly;
  const hasSuffix = suffix !== undefined && suffix !== null;
  if (
    process.env.NODE_ENV !== 'production' &&
    clearable &&
    hasSuffix
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      '[scribble-ui] <Input> received both `clearable` and `suffix`; ' +
        'the `suffix` slot wins and the clear affordance is hidden.'
    );
  }
  const showClear =
    wantsClearable && !hasSuffix && currentValue.length > 0;

  const handleClear = useCallback(() => {
    const node = innerRef.current;

    // Use the native value setter so React's synthetic onChange fires with
    // the cleared value — this works the same way for controlled and
    // uncontrolled callers, which is the whole point of the bridge.
    if (node) {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      setter?.call(node, '');
      node.dispatchEvent(new Event('input', { bubbles: true }));
    }

    if (!isControlled) {
      // Mirror in our local state so the next render keeps `currentValue`
      // in sync (React's reconciliation alone won't do that for native-set
      // values dispatched via dispatchEvent).
      setInnerValue('');
    }

    // Return focus so the user can keep typing after clearing.
    innerRef.current?.focus();
  }, [isControlled]);

  return (
    <span className={cx('su-input', wrapperClassName)}>
      <span
        className={cx(
          'su-input__wrapper',
          `su-input__wrapper--${size}`,
          error && 'su-input__wrapper--error',
          disabled && 'su-input__wrapper--disabled',
          readOnly && 'su-input__wrapper--readonly'
        )}
      >
        {prefix !== undefined && prefix !== null ? (
          <span className="su-input__affix su-input__affix--prefix">
            {prefix}
          </span>
        ) : null}

        <input
          {...rest}
          ref={innerRef}
          id={id}
          className={cx('su-input__control', className)}
          value={isControlled ? currentValue : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error || undefined}
          onChange={handleChange}
        />

        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            className="su-input__clear"
            aria-label="Clear input"
            onClick={handleClear}
          >
            {/* Inline ✕ — keeps the package icon-free for now. */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2.2 2.2 L9.8 9.8 M9.8 2.2 L2.2 9.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}

        {hasSuffix ? (
          <span className="su-input__affix su-input__affix--suffix">
            {suffix}
          </span>
        ) : null}
      </span>

      {helperText ? (
        <span
          className={cx(
            'su-input__helper',
            error && 'su-input__helper--error'
          )}
        >
          {helperText}
        </span>
      ) : null}
    </span>
  );
});
