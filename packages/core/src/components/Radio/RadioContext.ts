import { createContext } from 'react';

/**
 * Shared contract between {@link RadioGroup} and its child {@link Radio}
 * elements. The Group is the single source of truth — children read
 * their checked state from `value` and dispatch updates via `select`.
 */
export interface RadioContextValue {
  /** Currently selected value, by `Radio.value`. */
  value: string | undefined;
  /** Required shared `name` forwarded onto every native input. */
  name: string;
  /** Optional shared `disabled` flag — overrides per-item enabled state. */
  disabled?: boolean;
  /** Select a value (only fires for items receiving the user click). */
  select: (value: string) => void;
}

export const RadioContext = createContext<RadioContextValue | null>(null);
