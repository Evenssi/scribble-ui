import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'checked' | 'defaultChecked' | 'onChange'
  > {
  /** Size preset. Defaults to `'md'`. */
  size?: SwitchSize;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /**
   * Change handler. Receives the next boolean checked state plus the
   * raw native event for callers that need it.
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /** Native disabled. Disabled also drops the wobble entirely. */
  disabled?: boolean;
  /**
   * Optional label rendered next to the switch. The whole `<label>`
   * element is the click target so tapping the text toggles the switch.
   */
  label?: React.ReactNode;
  /**
   * Helper text rendered under the switch. Picks the danger color when
   * `error` is true.
   */
  helperText?: React.ReactNode;
  /** Render the switch in an error state (red border + danger helper). */
  error?: boolean;
  /**
   * Visual position of the label. Defaults to `'right'` (label after
   * the switch). `'left'` puts the label before via flex-direction.
   */
  labelPosition?: 'left' | 'right';
  /**
   * Extra class names applied to the outer `<label>` wrapper (the
   * element that draws the track + holds the label slot).
   */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Switch — a hand-drawn toggle switch.
 *
 * Renders a native `<input type="checkbox" role="switch">` so screen
 * readers announce the on/off semantics correctly. The native input is
 * visually hidden but kept focusable; the entire `<label>` wrapper is
 * the click target.
 *
 * Supports both controlled (`checked` + `onChange`) and uncontrolled
 * (`defaultChecked`) usage via the same bridge pattern as Checkbox /
 * Input.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      size = 'md',
      checked,
      defaultChecked,
      onChange,
      disabled,
      label,
      helperText,
      error = false,
      labelPosition = 'right',
      className,
      id,
      ...rest
    },
    ref
  ) {
    // --- Controlled / uncontrolled bridge ---------------------------------
    const isControlled = checked !== undefined;
    const [innerChecked, setInnerChecked] = React.useState<boolean>(
      defaultChecked ?? false
    );
    const currentChecked = isControlled ? !!checked : innerChecked;

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked;
        if (!isControlled) {
          setInnerChecked(next);
        }
        onChange?.(next, event);
      },
      [isControlled, onChange]
    );

    return (
      <>
        <label
          className={cx(
            'su-switch',
            `su-switch--${size}`,
            currentChecked && 'su-switch--checked',
            disabled && 'su-switch--disabled',
            error && 'su-switch--error',
            labelPosition === 'left' && 'su-switch--label-left',
            className
          )}
        >
          <input
            {...rest}
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            className="su-switch__input"
            checked={currentChecked}
            disabled={disabled}
            aria-disabled={disabled || undefined}
            aria-invalid={error || undefined}
            onChange={handleChange}
          />
          <span className="su-switch__track" aria-hidden="true">
            <span className="su-switch__thumb" />
          </span>
          {label !== undefined && label !== null && (
            <span className="su-switch__label">{label}</span>
          )}
        </label>
        {helperText !== undefined && helperText !== null ? (
          <span
            className={cx(
              'su-switch__helper',
              error && 'su-switch__helper--error'
            )}
          >
            {helperText}
          </span>
        ) : null}
      </>
    );
  }
);

Switch.displayName = 'Switch';
