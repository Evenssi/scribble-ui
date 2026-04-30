import * as React from 'react';
import { CheckboxContext } from './CheckboxContext';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'checked' | 'defaultChecked' | 'value' | 'onChange'
  > {
  /** Size preset. Defaults to `'md'`. */
  size?: CheckboxSize;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /**
   * Renders the box in a "mixed" visual state. Not part of the
   * controlled contract; we write it directly onto the native input
   * via a ref so the DOM stays the source of truth.
   */
  indeterminate?: boolean;
  /** Native disabled. Disabled also drops the wobble entirely. */
  disabled?: boolean;
  /**
   * String value used by {@link CheckboxGroup} for selection tracking
   * and forwarded onto the native input's `value` attribute.
   */
  value?: string;
  /**
   * Change handler. Receives the next boolean checked state plus the
   * raw native event for cases that need it.
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /** Label content, rendered inline next to the box. */
  children?: React.ReactNode;
  /** Optional class on the native `<input>` element. */
  className?: string;
  /** Optional class on the outer `<label>` wrapper. */
  wrapperClassName?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Checkbox — a hand-drawn checkbox.
 *
 * Supports both controlled (`checked`) and uncontrolled (`defaultChecked`)
 * usage. `indeterminate` is written straight to the DOM via a ref
 * because it isn't part of React's controlled property set.
 *
 * When rendered inside a {@link CheckboxGroup}, the component reads its
 * own checked state from the surrounding context and dispatches changes
 * back to the group before invoking the user-supplied `onChange`.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = 'md',
      checked,
      defaultChecked,
      indeterminate,
      disabled,
      value,
      onChange,
      children,
      className,
      wrapperClassName,
      id,
      name,
      ...rest
    },
    ref
  ) {
    // --- Group integration ------------------------------------------------
    const ctx = React.useContext(CheckboxContext);
    const inGroup = ctx !== null;

    if (
      process.env.NODE_ENV !== 'production' &&
      inGroup &&
      value === undefined
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        '[scribble-ui] <Checkbox> rendered inside <CheckboxGroup> without a `value` prop; ' +
          'the item cannot participate in selection tracking.'
      );
    }

    // --- Controlled / uncontrolled bridge (only when standalone) ----------
    const isControlled = checked !== undefined;
    const [innerChecked, setInnerChecked] = React.useState<boolean>(
      defaultChecked ?? false
    );

    const resolvedChecked = inGroup
      ? value !== undefined && ctx!.value.includes(value)
      : isControlled
        ? !!checked
        : innerChecked;

    const resolvedDisabled = !!disabled || (inGroup ? !!ctx!.disabled : false);
    const resolvedName = inGroup ? ctx!.name ?? name : name;

    // --- Ref forwarding (so we can poke `indeterminate`) ------------------
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    // indeterminate is a DOM-only property — keep the input in sync.
    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate, resolvedChecked]);

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked;
        if (inGroup) {
          if (value !== undefined) {
            ctx!.toggle(value, next);
          }
        } else if (!isControlled) {
          setInnerChecked(next);
        }
        onChange?.(next, event);
      },
      [inGroup, ctx, value, isControlled, onChange]
    );

    return (
      <label
        className={cx(
          'su-checkbox',
          `su-checkbox--${size}`,
          resolvedChecked && 'su-checkbox--checked',
          indeterminate && 'su-checkbox--indeterminate',
          resolvedDisabled && 'su-checkbox--disabled',
          wrapperClassName
        )}
      >
        <span className="su-checkbox__box">
          <input
            {...rest}
            ref={innerRef}
            id={id}
            type="checkbox"
            name={resolvedName}
            value={value}
            className={cx('su-checkbox__input', className)}
            checked={resolvedChecked}
            disabled={resolvedDisabled}
            aria-disabled={resolvedDisabled || undefined}
            onChange={handleChange}
          />
          <span className="su-checkbox__mark" aria-hidden="true">
            {/* Two glyphs stacked; CSS shows whichever is relevant. */}
            <svg
              className="su-checkbox__mark-check"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M3 8.5 L7 12 L13 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="su-checkbox__mark-mixed"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M3.5 8 L12.5 8"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
        {children !== undefined && children !== null && (
          <span className="su-checkbox__label">{children}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
