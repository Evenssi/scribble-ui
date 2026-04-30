import * as React from 'react';
import { useTabsContext } from './tabsContext';

export interface TabPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Pairs this panel with the `<Tab value={...}>` of the same value. */
  value: string;
  /**
   * Force this individual panel to stay mounted even when the parent
   * `<Tabs keepMounted>` is not set. Useful when *one* panel owns
   * stateful children you don't want to re-create on switch.
   */
  forceMount?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * TabPanel — the `role="tabpanel"` content region paired to a `<Tab>`.
 *
 * Rendering strategy:
 * - If `keepMounted` (from parent) or `forceMount` is set, the panel
 *   always renders and uses the native `hidden` attribute when inactive
 *   (so consumer state is preserved across switches).
 * - Otherwise the panel returns `null` while inactive, which is the
 *   cheaper default that matches users' expectations for most UIs.
 *
 * The panel itself is `tabIndex={0}` so keyboard users can move focus
 * into the content body after the tab is selected, per WAI-ARIA APG.
 */
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel(
    { value, forceMount = false, className, children, ...rest },
    ref
  ) {
    const { activeValue, keepMounted, idBase } = useTabsContext('TabPanel');
    const isActive = activeValue === value;
    const shouldRender = isActive || keepMounted || forceMount;

    if (!shouldRender) return null;

    const tabId = `${idBase}-tab-${value}`;
    const panelId = `${idBase}-panel-${value}`;

    const classes = [
      'su-tabs__panel',
      !isActive && 'su-tabs__panel--hidden',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        // Native `hidden` keeps the DOM but removes it from the
        // accessibility tree and stops it from being focusable.
        hidden={!isActive}
        tabIndex={0}
        className={classes}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
