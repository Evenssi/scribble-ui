import * as React from 'react';
import { RadioContext } from './RadioContext';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'checked' | 'defaultChecked' | 'value' | 'onChange'
  > {
  /** Size preset. Defaults to `'md'`. */
  size?: RadioSize;
  /** Controlled checked state. Ignored inside a `RadioGroup`. */
  checked?: boolean;
  /** Uncontrolled initial state. Ignored inside a `RadioGroup`. */
  defaultChecked?: boolean;
  /** Native disabled. Disabled drops the wobble entirely. */
  disabled?: boolean;
  /** Required value identifying this option. */
  value: string;
  /**
   * Native `name` attribute. Inside a `RadioGroup` this is overridden
   * by the group's `name`.
   */
  name?: string;
  /**
   * Change handler. Receives the next boolean checked state plus the
   * raw native event for cases that need it.
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /** Label content, rendered inline next to the dot. */
  children?: React.ReactNode;
  /** Optional class on the native `<input>` element. */
  className?: string;
  /** Optional class on the outer `<label>` wrapper. */
  wrapperClassName?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Radio — a hand-drawn radio button.
 *
 * Standalone usage supports the controlled/uncontrolled bridge familiar
 * from `Input`. Inside a {@link RadioGroup}, the group is the single
 * source of truth: `checked` is derived from `ctx.value === value` and
 * the group's `select` is invoked before the user-supplied `onChange`.
 *
 * The native `<input type="radio">` lives in the DOM (visually hidden
 * but focusable) so screen readers, form submission, and keyboard
 * arrow navigation all work without extra wiring.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      size = 'md',
      checked,
      defaultChecked,
      disabled,
      value,
      name,
      onChange,
      children,
      className,
      wrapperClassName,
      id,
      ...rest
    },
    ref
  ) {
    // --- Group integration ------------------------------------------------
    const ctx = React.useContext(RadioContext);
    const inGroup = ctx !== null;

    // --- Controlled / uncontrolled bridge (only when standalone) ----------
    const isControlled = checked !== undefined;
    const [innerChecked, setInnerChecked] = React.useState<boolean>(
      defaultChecked ?? false
    );

    const resolvedChecked = inGroup
      ? ctx!.value === value
      : isControlled
        ? !!checked
        : innerChecked;

    const resolvedDisabled = !!disabled || (inGroup ? !!ctx!.disabled : false);
    const resolvedName = inGroup ? ctx!.name : name;

    // --- Ref forwarding ---------------------------------------------------
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked;
        if (inGroup) {
          if (next) {
            ctx!.select(value);
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
          'su-radio',
          `su-radio--${size}`,
          resolvedChecked && 'su-radio--checked',
          resolvedDisabled && 'su-radio--disabled',
          wrapperClassName
        )}
      >
        <span className="su-radio__box">
          <input
            {...rest}
            ref={innerRef}
            id={id}
            type="radio"
            name={resolvedName}
            value={value}
            className={cx('su-radio__input', className)}
            checked={resolvedChecked}
            disabled={resolvedDisabled}
            aria-disabled={resolvedDisabled || undefined}
            onChange={handleChange}
          />
          <span className="su-radio__dot" aria-hidden="true" />
        </span>
        {children !== undefined && children !== null && (
          <span className="su-radio__label">{children}</span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
