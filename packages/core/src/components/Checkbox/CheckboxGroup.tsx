import * as React from 'react';
import {
  CheckboxContext,
  type CheckboxContextValue,
} from './CheckboxContext';

export interface CheckboxGroupProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /** Controlled selected values. */
  value?: string[];
  /** Uncontrolled initial selected values. */
  defaultValue?: string[];
  /** Fired with the next selection whenever an item is toggled. */
  onChange?: (values: string[]) => void;
  /** Shared `name` forwarded to every nested `<Checkbox>`. */
  name?: string;
  /** Shared disabled flag forwarded to every nested `<Checkbox>`. */
  disabled?: boolean;
  /** Layout direction. Defaults to `'vertical'`. */
  direction?: 'horizontal' | 'vertical';
  /** `<Checkbox>` children. */
  children: React.ReactNode;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * CheckboxGroup — coordinates a list of {@link Checkbox} children via
 * React context. Each child reads its own checked state from the
 * group's `value` array and dispatches updates through `toggle`. Works
 * in both controlled (`value`) and uncontrolled (`defaultValue`) modes.
 */
export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup(
    {
      value,
      defaultValue,
      onChange,
      name,
      disabled,
      direction = 'vertical',
      className,
      children,
      ...rest
    },
    ref
  ) {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState<string[]>(
      defaultValue ?? []
    );
    const resolved = isControlled ? value! : innerValue;

    const toggle = React.useCallback(
      (item: string, next: boolean) => {
        const without = resolved.filter((v) => v !== item);
        const nextValue = next ? [...without, item] : without;
        if (!isControlled) {
          setInnerValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [resolved, isControlled, onChange]
    );

    const ctx = React.useMemo<CheckboxContextValue>(
      () => ({
        value: resolved,
        name,
        disabled,
        toggle,
      }),
      [resolved, name, disabled, toggle]
    );

    return (
      <CheckboxContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          className={cx(
            'su-checkbox-group',
            `su-checkbox-group--${direction}`,
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';
