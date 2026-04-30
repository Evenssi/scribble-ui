import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * Auto-resize configuration. Pass `true` to grow indefinitely with the
 * content, or an object to clamp the rendered height between a minimum
 * and a maximum number of text rows.
 */
export type TextareaAutoResize =
  | boolean
  | { minRows?: number; maxRows?: number };

/**
 * Public props for {@link Textarea}.
 *
 * Inherits every native `<textarea>` attribute (with the exception of
 * `size`, which we hijack for visual sizing — same convention as `Input`).
 */
export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'prefix'
  > {
  /** Visual size — does not map to any native attribute. */
  size?: TextareaSize;
  /** Render with the danger color and an optional helper line below. */
  error?: boolean;
  /** Helper text rendered under the textarea. Picks the danger color when `error` is true. */
  helperText?: ReactNode;
  /**
   * Auto-grow the textarea with its content.
   *
   * - `true` — unbounded growth, scrollbar never shows.
   * - `{ minRows, maxRows }` — clamp the height between the two.
   *
   * When set, the user cannot drag-resize the textarea (we set
   * `resize: none`); leave unset to keep the native vertical resize
   * handle.
   */
  autoResize?: TextareaAutoResize;
  /**
   * Show a character counter in the bottom-right corner.
   *
   * If `maxLength` is also set, the counter renders as `current / max`
   * and shifts color to warning past 80% and danger past 100%.
   */
  showCount?: boolean;
  /** Optional class on the outer wrapper (the element that draws the border). */
  wrapperClassName?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Hand-drawn multi-line text input.
 *
 * The visual border lives on the wrapper element so the optional
 * character counter can sit *inside* the same hand-drawn outline as
 * the text. Supports controlled (`value` + `onChange`) and uncontrolled
 * (`defaultValue`) usage, and can grow with its content via `autoResize`.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size = 'md',
      error = false,
      helperText,
      autoResize,
      showCount = false,
      wrapperClassName,
      className,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      maxLength,
      id,
      ...rest
    },
    ref
  ) {
    // --- Controlled / uncontrolled bridge --------------------------------
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ''
    );
    const currentValue = isControlled ? String(value ?? '') : innerValue;

    // --- ref forwarding (so autoResize can read scrollHeight) ------------
    const innerRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(
      ref,
      () => innerRef.current as HTMLTextAreaElement,
      []
    );

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setInnerValue(event.target.value);
        }
        onChange?.(event);
      },
      [isControlled, onChange]
    );

    // --- autoResize ------------------------------------------------------
    useLayoutEffect(() => {
      if (!autoResize) return;
      const node = innerRef.current;
      if (!node) return;

      // Reset first so we can read a fresh scrollHeight.
      node.style.height = 'auto';

      const cs = getComputedStyle(node);
      const lineHeight = parseFloat(cs.lineHeight) || 20;
      const paddingY =
        (parseFloat(cs.paddingTop) || 0) +
        (parseFloat(cs.paddingBottom) || 0);

      const minRows =
        autoResize === true ? 0 : autoResize.minRows ?? 0;
      const maxRows =
        autoResize === true ? undefined : autoResize.maxRows;

      const minH = minRows * lineHeight + paddingY;
      const maxH =
        maxRows !== undefined ? maxRows * lineHeight + paddingY : Infinity;

      const next = Math.max(
        minH,
        Math.min(node.scrollHeight, maxH)
      );
      node.style.height = `${next}px`;
      node.style.overflowY =
        node.scrollHeight > maxH ? 'auto' : 'hidden';
    }, [currentValue, autoResize]);

    // --- counter ---------------------------------------------------------
    const length = currentValue.length;
    const overLimit =
      typeof maxLength === 'number' && length > maxLength;
    const nearLimit =
      typeof maxLength === 'number' &&
      !overLimit &&
      length >= Math.floor(maxLength * 0.8);

    return (
      <span className={cx('su-textarea', wrapperClassName)}>
        <span
          className={cx(
            'su-textarea__wrapper',
            `su-textarea__wrapper--${size}`,
            error && 'su-textarea__wrapper--error',
            disabled && 'su-textarea__wrapper--disabled',
            readOnly && 'su-textarea__wrapper--readonly',
            showCount && 'su-textarea__wrapper--with-count',
            autoResize && 'su-textarea__wrapper--auto'
          )}
        >
          <textarea
            {...rest}
            ref={innerRef}
            id={id}
            className={cx('su-textarea__control', className)}
            value={isControlled ? currentValue : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            aria-invalid={error || undefined}
            onChange={handleChange}
          />

          {showCount ? (
            <span
              className={cx(
                'su-textarea__count',
                nearLimit && 'su-textarea__count--warning',
                overLimit && 'su-textarea__count--danger'
              )}
              aria-live="polite"
            >
              {typeof maxLength === 'number'
                ? `${length} / ${maxLength}`
                : `${length}`}
            </span>
          ) : null}
        </span>

        {helperText ? (
          <span
            className={cx(
              'su-textarea__helper',
              error && 'su-textarea__helper--error'
            )}
          >
            {helperText}
          </span>
        ) : null}
      </span>
    );
  }
);

Textarea.displayName = 'Textarea';
