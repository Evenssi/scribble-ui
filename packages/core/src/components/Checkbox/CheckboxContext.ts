import { createContext } from 'react';

/**
 * Shared contract between {@link CheckboxGroup} and its child
 * {@link Checkbox} elements. Children opt into Group mode automatically
 * by reading this context — they do nothing special when rendered
 * outside a Group.
 */
export interface CheckboxContextValue {
  /** Currently selected values, by `Checkbox.value`. */
  value: ReadonlyArray<string>;
  /** Optional shared `name` to forward onto every native input. */
  name?: string;
  /** Optional shared `disabled` flag — overrides per-item enabled state. */
  disabled?: boolean;
  /** Toggle a value on or off; the Group decides how to update its state. */
  toggle: (value: string, next: boolean) => void;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);
