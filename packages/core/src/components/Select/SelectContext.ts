import * as React from 'react';

/**
 * Internal context shared between {@link Select} and its {@link Option}
 * children (when used in the JSX-children form). When callers use the
 * `options` array prop instead, this context is populated identically
 * by Select rendering its own internal Option nodes.
 */
export interface SelectContextValue {
  /** The currently selected value, or `undefined` if nothing is picked. */
  selectedValue: string | undefined;
  /**
   * The DOM id of the currently highlighted option (for ARIA
   * `aria-activedescendant`). Empty string when nothing is highlighted.
   */
  activeId: string;
  /** id prefix used to build per-option ids. */
  idBase: string;
  /** Notified when the user picks (clicks or keyboard-activates) a value. */
  onPick: (value: string) => void;
  /**
   * Each rendered Option registers itself on mount so the parent can
   * reason about navigation order, typeahead and disabled skipping.
   * Returns a cleanup function used by `useEffect`.
   */
  register: (option: RegisteredOption) => () => void;
  /** Called by an option on mouseenter so the parent can update the highlight. */
  setHighlightedValue: (value: string) => void;
  /**
   * Whether the option whose value === `value` is currently highlighted
   * (used by Option to add the `--active` modifier class).
   */
  isHighlighted: (value: string) => boolean;
}

export interface RegisteredOption {
  value: string;
  label: string;
  disabled: boolean;
  /** DOM id of the rendered <li>, used for aria-activedescendant. */
  id: string;
}

export const SelectContext = React.createContext<SelectContextValue | null>(
  null
);

export const useSelectContext = (): SelectContextValue => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error(
      '[scribble-ui] <Option> must be rendered inside a <Select>.'
    );
  }
  return ctx;
};
