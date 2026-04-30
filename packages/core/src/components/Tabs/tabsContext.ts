import { createContext, useContext } from 'react';
import type {
  TabsActivationMode,
  TabsOrientation,
  TabsSize,
  TabsVariant,
} from './Tabs';

/**
 * Snapshot entry returned from {@link TabsContextValue.getOrderedValues}.
 *
 * The TabList keyboard handler uses this to decide which value to focus /
 * activate next, skipping disabled entries.
 */
export interface TabsOrderedEntry {
  value: string;
  disabled: boolean;
}

/**
 * Internal context wired by `<Tabs>` and consumed by `<TabList>`,
 * `<Tab>`, and `<TabPanel>`. Not part of the public package API.
 */
export interface TabsContextValue {
  /** Currently active tab value, or `undefined` if none has been registered yet. */
  activeValue: string | undefined;
  /**
   * Update the active value. In controlled usage this only fires the
   * consumer's `onChange`; in uncontrolled usage it also flips the
   * internal state.
   */
  setActiveValue: (value: string) => void;

  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
  /** When true, all panels stay mounted (and hide via `hidden` attribute). */
  keepMounted: boolean;

  /**
   * Stable id prefix derived from `React.useId()`. All tab and panel ids
   * are built off this string so SSR markup matches the client and so we
   * don't collide when multiple `<Tabs>` instances live on the same page.
   */
  idBase: string;

  /**
   * Tabs register themselves on mount so the TabList keyboard handler can
   * walk them in document order. The ref is also used by
   * {@link focusTabByValue} to move focus without forcing a re-render.
   */
  registerTab: (
    value: string,
    ref: HTMLButtonElement,
    disabled: boolean
  ) => void;
  unregisterTab: (value: string) => void;

  /**
   * Returns a snapshot of all currently registered tabs in registration
   * (= document) order. Always read at call-time so the keyboard handler
   * sees freshly-mounted tabs.
   */
  getOrderedValues: () => TabsOrderedEntry[];

  /** Programmatically focus the tab with the given value, if it's registered. */
  focusTabByValue: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Throwing helper so subcomponents fail loudly instead of silently
 * rendering a broken UI when used outside of `<Tabs>`.
 */
export function useTabsContext(componentName: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`<${componentName}> must be rendered inside <Tabs>`);
  }
  return ctx;
}
