import * as React from 'react';
import { TabsContext, type TabsContextValue, type TabsOrderedEntry } from './tabsContext';

// Note: this component does NOT import its CSS file directly, because
// some bundlers (e.g. Next.js) restrict where third-party CSS can be
// imported. Consumers must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type TabsVariant = 'underline' | 'card' | 'pill';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  /** Controlled active tab value. */
  value?: string;
  /**
   * Initial active tab value when uncontrolled. If omitted, the first
   * non-disabled `<Tab>` to register wins.
   */
  defaultValue?: string;
  /** Fired whenever the active tab changes (controlled or not). */
  onChange?: (value: string) => void;

  /** Visual variant. Defaults to `'underline'`. */
  variant?: TabsVariant;
  /** Size preset. Defaults to `'md'`. */
  size?: TabsSize;
  /** Layout orientation. Defaults to `'horizontal'`. */
  orientation?: TabsOrientation;
  /**
   * - `'automatic'` (default, recommended by WAI-ARIA APG when switching
   *   has no side effects): arrow keys move focus *and* activate the
   *   newly focused tab.
   * - `'manual'`: arrow keys only move focus; the user must press
   *   Enter / Space to actually activate.
   */
  activationMode?: TabsActivationMode;
  /**
   * When true, every `<TabPanel>` stays mounted in the DOM and inactive
   * panels are hidden via the `hidden` attribute. Useful when panels own
   * expensive state you don't want to lose on switch. Defaults to false.
   */
  keepMounted?: boolean;

  className?: string;
  children: React.ReactNode;
}

/**
 * Tabs — accessible, hand-drawn tabbed navigation.
 *
 * Wraps `<TabList>`, `<Tab>`, `<TabPanels>`, and `<TabPanel>` and
 * coordinates them via context. Implements the WAI-ARIA Tabs pattern:
 * roving tabindex, arrow-key navigation, optional manual activation,
 * stable `aria-controls` / `aria-labelledby` wiring.
 *
 * Make sure to mount `<HandDrawnFilters />` once at your app root for the
 * SVG filter wobble; see the package README for setup.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value,
    defaultValue,
    onChange,
    variant = 'underline',
    size = 'md',
    orientation = 'horizontal',
    activationMode = 'automatic',
    keepMounted = false,
    className,
    children,
    ...rest
  },
  ref
) {
  // --- Controlled / uncontrolled bridge -----------------------------------
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<string | undefined>(
    defaultValue
  );
  const activeValue = isControlled ? value : innerValue;

  // Keep the latest onChange in a ref so our memoised setter stays stable.
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setActiveValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInnerValue(next);
      }
      onChangeRef.current?.(next);
    },
    [isControlled]
  );

  // --- Tab registry (kept in a ref so registers don't trigger re-renders) -
  type Entry = { ref: HTMLButtonElement; disabled: boolean; order: number };
  const registryRef = React.useRef<Map<string, Entry>>(new Map());
  // Monotonic counter to recover registration order even after unmounts.
  const orderCounterRef = React.useRef(0);
  // Force a re-render exactly once when the very first tab registers, so
  // the uncontrolled "fall back to first non-disabled tab" path can light
  // up without waiting for a user interaction.
  const [, forceTick] = React.useReducer((x: number) => x + 1, 0);

  const registerTab = React.useCallback(
    (val: string, node: HTMLButtonElement, disabled: boolean) => {
      const existing = registryRef.current.get(val);
      const order = existing ? existing.order : orderCounterRef.current++;
      registryRef.current.set(val, { ref: node, disabled, order });
      // First-ever registration → kick a render so initial active value
      // selection (see effect below) gets to run.
      if (registryRef.current.size === 1 && !existing) {
        forceTick();
      }
    },
    []
  );

  const unregisterTab = React.useCallback((val: string) => {
    registryRef.current.delete(val);
  }, []);

  const getOrderedValues = React.useCallback((): TabsOrderedEntry[] => {
    const list: Array<TabsOrderedEntry & { order: number }> = [];
    registryRef.current.forEach((entry, val) => {
      list.push({ value: val, disabled: entry.disabled, order: entry.order });
    });
    list.sort((a, b) => a.order - b.order);
    return list.map(({ value: v, disabled }) => ({ value: v, disabled }));
  }, []);

  const focusTabByValue = React.useCallback((val: string) => {
    const entry = registryRef.current.get(val);
    entry?.ref.focus();
  }, []);

  // If neither value nor defaultValue was given, pick the first non-disabled
  // tab as soon as one has registered. We only run this when activeValue is
  // currently undefined to avoid stomping the user's choice.
  React.useEffect(() => {
    if (activeValue !== undefined) return;
    const ordered = getOrderedValues();
    const first = ordered.find((e) => !e.disabled) ?? ordered[0];
    if (first) {
      if (!isControlled) {
        setInnerValue(first.value);
      }
      // Don't fire onChange for this synthetic initial pick — consumers
      // didn't trigger it, and a controlled caller without a `value` is
      // already a misuse we don't want to amplify.
    }
    // Re-evaluate when the registry has changed (forceTick bumps state).
  });

  // --- Stable id prefix for tab/panel pairing -----------------------------
  const reactId = React.useId();
  const idBase = `su-tabs-${reactId}`;

  const ctx = React.useMemo<TabsContextValue>(
    () => ({
      activeValue,
      setActiveValue,
      variant,
      size,
      orientation,
      activationMode,
      keepMounted,
      idBase,
      registerTab,
      unregisterTab,
      getOrderedValues,
      focusTabByValue,
    }),
    [
      activeValue,
      setActiveValue,
      variant,
      size,
      orientation,
      activationMode,
      keepMounted,
      idBase,
      registerTab,
      unregisterTab,
      getOrderedValues,
      focusTabByValue,
    ]
  );

  const classes = [
    'su-tabs',
    `su-tabs--${variant}`,
    `su-tabs--size-${size}`,
    `su-tabs--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TabsContext.Provider value={ctx}>
      <div
        ref={ref}
        className={classes}
        data-orientation={orientation}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';
