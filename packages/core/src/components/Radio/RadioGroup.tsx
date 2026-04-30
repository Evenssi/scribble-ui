import * as React from 'react';
import { RadioContext, type RadioContextValue } from './RadioContext';

export interface RadioGroupProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /** Required shared `name` forwarded onto every nested radio. */
  name: string;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial selected value. */
  defaultValue?: string;
  /** Fired with the new value whenever a child becomes selected. */
  onChange?: (value: string) => void;
  /** Shared disabled flag forwarded to every nested radio. */
  disabled?: boolean;
  /** Layout direction. Defaults to `'vertical'`. */
  direction?: 'horizontal' | 'vertical';
  /** `<Radio>` children. */
  children: React.ReactNode;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * RadioGroup — coordinates a set of {@link Radio} children via React
 * context. The group is the source of truth: children render `checked`
 * from the group's `value` and dispatch updates through `select`.
 *
 * `name` is required so the underlying native radios share the same
 * radio group at the DOM level too — this is what gives keyboard arrow
 * navigation (← → ↑ ↓) for free.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      name,
      value,
      defaultValue,
      onChange,
      disabled,
      direction = 'vertical',
      className,
      children,
      ...rest
    },
    ref
  ) {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState<string | undefined>(
      defaultValue
    );
    const resolved = isControlled ? value : innerValue;

    const select = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setInnerValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const ctx = React.useMemo<RadioContextValue>(
      () => ({
        value: resolved,
        name,
        disabled,
        select,
      }),
      [resolved, name, disabled, select]
    );

    return (
      <RadioContext.Provider value={ctx}>
        <div
          ref={ref}
          role="radiogroup"
          className={cx(
            'su-radio-group',
            `su-radio-group--${direction}`,
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </RadioContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
