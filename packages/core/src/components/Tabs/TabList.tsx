import * as React from 'react';
import { useTabsContext } from './tabsContext';

export interface TabListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Required for screen readers if no labelled-by is provided. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * TabList — `role="tablist"` container.
 *
 * Owns the keyboard navigation contract for the Tabs widget: ArrowLeft /
 * ArrowRight (horizontal) or ArrowUp / ArrowDown (vertical) walk through
 * registered tabs, Home / End jump to the ends, disabled entries are
 * skipped, and the focus order wraps. In `automatic` activation mode
 * (the default) moving focus also activates the new panel; in `manual`
 * mode the user must press Enter or Space (handled inside `<Tab>`).
 */
export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  function TabList({ className, children, onKeyDown, ...rest }, ref) {
    const ctx = useTabsContext('TabList');

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Let the consumer see the event first; if they preventDefault we
        // bail out and respect that.
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        const { orientation, activationMode, getOrderedValues, focusTabByValue, setActiveValue } =
          ctx;

        const ordered = getOrderedValues();
        if (ordered.length === 0) return;

        // The currently focused tab. We trust `document.activeElement`
        // because roving tabindex guarantees only one tab is focusable
        // at a time anyway.
        const current = (event.target as HTMLElement | null)?.closest(
          '[role="tab"]'
        ) as HTMLButtonElement | null;
        const currentValue = current?.dataset.tabValue;
        const currentIndex = currentValue
          ? ordered.findIndex((e) => e.value === currentValue)
          : -1;

        const isHorizontal = orientation === 'horizontal';
        const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

        let targetIndex: number | null = null;

        if (event.key === nextKey) {
          targetIndex = stepIndex(ordered, currentIndex, +1);
        } else if (event.key === prevKey) {
          targetIndex = stepIndex(ordered, currentIndex, -1);
        } else if (event.key === 'Home') {
          targetIndex = firstEnabled(ordered);
        } else if (event.key === 'End') {
          targetIndex = lastEnabled(ordered);
        }

        if (targetIndex === null || targetIndex < 0) return;

        event.preventDefault();
        const target = ordered[targetIndex];
        if (!target) return;
        focusTabByValue(target.value);
        if (activationMode === 'automatic') {
          setActiveValue(target.value);
        }
      },
      [ctx, onKeyDown]
    );

    const classes = ['su-tabs__list', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={ctx.orientation}
        className={classes}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// ---------------------------------------------------------------------------
// Keyboard navigation helpers
// ---------------------------------------------------------------------------

/**
 * Walk forward (`direction = +1`) or backward (`-1`) through `ordered`,
 * skipping disabled entries and wrapping at the boundaries. Returns
 * `null` only if every entry is disabled (no valid focus target).
 */
function stepIndex(
  ordered: Array<{ value: string; disabled: boolean }>,
  fromIndex: number,
  direction: 1 | -1
): number | null {
  const n = ordered.length;
  if (n === 0) return null;
  // If nothing is focused yet, start from the first / last as appropriate.
  let i = fromIndex < 0 ? (direction === 1 ? -1 : 0) : fromIndex;
  for (let step = 0; step < n; step++) {
    i = (i + direction + n) % n;
    if (!ordered[i]?.disabled) return i;
  }
  return null;
}

function firstEnabled(
  ordered: Array<{ value: string; disabled: boolean }>
): number | null {
  const idx = ordered.findIndex((e) => !e.disabled);
  return idx === -1 ? null : idx;
}

function lastEnabled(
  ordered: Array<{ value: string; disabled: boolean }>
): number | null {
  for (let i = ordered.length - 1; i >= 0; i--) {
    if (!ordered[i]?.disabled) return i;
  }
  return null;
}
