import * as React from 'react';
import { useTabsContext } from './tabsContext';

export interface TabProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'role'
  > {
  /** Unique identifier; pairs this tab with its `<TabPanel value={...}>`. */
  value: string;
  /**
   * When true the tab is non-activatable and skipped by arrow-key
   * navigation. The tab still renders (so users see what's unavailable)
   * but is removed from the focus cycle.
   */
  disabled?: boolean;
  /** Optional decorative icon rendered before the label. */
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Tab — single `role="tab"` trigger inside a `<TabList>`.
 *
 * Implements the WAI-ARIA Tabs pattern's per-trigger contract: stable
 * `id` / `aria-controls` linkage with its panel, roving `tabindex` so
 * only the active tab is in the tab sequence, and `aria-selected` to
 * announce the current selection. In `manual` activation mode, pressing
 * Enter or Space activates the focused tab; in `automatic` mode the
 * TabList already activated it on focus.
 */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled = false, icon, className, children, onClick, onKeyDown, ...rest },
  ref
) {
  const ctx = useTabsContext('Tab');
  const {
    activeValue,
    setActiveValue,
    activationMode,
    idBase,
    registerTab,
    unregisterTab,
  } = ctx;

  const isActive = activeValue === value;
  const tabId = `${idBase}-tab-${value}`;
  const panelId = `${idBase}-panel-${value}`;

  // --- ref forwarding so we can both register with context and forward ----
  const innerRef = React.useRef<HTMLButtonElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  // Register / unregister with the parent on mount, and re-register when
  // `disabled` flips so the keyboard handler sees fresh state.
  React.useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    registerTab(value, node, disabled);
    return () => unregisterTab(value);
  }, [value, disabled, registerTab, unregisterTab]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
      if (event.defaultPrevented) return;
      setActiveValue(value);
    },
    [disabled, onClick, setActiveValue, value]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      // In manual mode, Enter / Space activate the currently focused tab.
      // In automatic mode the panel is already active on focus, but we
      // still swallow Space to avoid the page scrolling.
      if (event.key === 'Enter' || event.key === ' ') {
        if (disabled) return;
        event.preventDefault();
        if (activationMode === 'manual' && !isActive) {
          setActiveValue(value);
        }
      }
    },
    [activationMode, disabled, isActive, onKeyDown, setActiveValue, value]
  );

  const classes = [
    'su-tabs__tab',
    isActive && 'su-tabs__tab--active',
    disabled && 'su-tabs__tab--disabled',
    icon != null && 'su-tabs__tab--with-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...rest}
      ref={setRefs}
      type="button"
      role="tab"
      id={tabId}
      data-tab-value={value}
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      // Roving tabindex: the active tab is the only one in the tab sequence.
      // Disabled tabs stay reachable by arrow keys (we choose to skip them
      // in TabList instead) but never enter the tab sequence.
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon != null && (
        <span className="su-tabs__tab-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="su-tabs__tab-label">{children}</span>
    </button>
  );
});

Tab.displayName = 'Tab';
