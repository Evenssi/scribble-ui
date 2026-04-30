import * as React from 'react';

export interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * TabPanels — visual container that groups the per-tab panels together.
 *
 * It carries no ARIA semantics on its own (each `<TabPanel>` already has
 * `role="tabpanel"`); it's purely a layout slot so the variant CSS can
 * target it for spacing and to give vertical Tabs a sensible grid cell.
 */
export const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(
  function TabPanels({ className, children, ...rest }, ref) {
    const classes = ['su-tabs__panels', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';
