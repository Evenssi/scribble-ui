import * as React from 'react';
import { useSelectContext } from './SelectContext';

export interface OptionProps {
  value: string;
  label?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let optionIdCounter = 0;
const nextOptionUid = (): number => ++optionIdCounter;

/**
 * A single picker entry rendered inside a {@link Select}.
 *
 * Two rendering styles are supported and share the same SelectContext:
 *   1. JSX children — `<Select><Option value="a">Apple</Option></Select>`
 *   2. Array form   — `<Select options={[{value, label, disabled?}]} />`
 */
export const Option: React.FC<OptionProps> = ({
  value,
  label,
  disabled = false,
  children,
}) => {
  const ctx = useSelectContext();

  // Stable per-instance uid so DOM ids don't churn across re-renders.
  const uidRef = React.useRef<number | null>(null);
  if (uidRef.current === null) uidRef.current = nextOptionUid();
  const id = `${ctx.idBase}-opt-${uidRef.current}`;

  const resolvedLabel =
    label ?? (typeof children === 'string' ? children : value);

  // Register with the parent so navigation / typeahead can see this option.
  React.useEffect(() => {
    return ctx.register({ value, label: resolvedLabel, disabled, id });
  }, [ctx, value, resolvedLabel, disabled, id]);

  const selected = ctx.selectedValue === value;
  const active = ctx.isHighlighted(value);

  return (
    <li
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-su-value={value}
      className={cx(
        'su-select__option',
        selected && 'su-select__option--selected',
        active && 'su-select__option--active',
        disabled && 'su-select__option--disabled'
      )}
      // Use mousedown (not click) so the click doesn't first move focus
      // off the trigger — the parent's blur handler would close the
      // listbox before the click fires on the option.
      onMouseDown={(event) => {
        event.preventDefault();
        if (disabled) return;
        ctx.onPick(value);
      }}
      onMouseEnter={() => {
        if (disabled) return;
        ctx.setHighlightedValue(value);
      }}
    >
      {children}
    </li>
  );
};

Option.displayName = 'Option';
