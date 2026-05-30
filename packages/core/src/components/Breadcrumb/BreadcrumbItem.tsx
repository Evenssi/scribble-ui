'use client';

import * as React from 'react';
import type { BreadcrumbItemData } from './Breadcrumb';

/**
 * Props for `<Breadcrumb.Item>` (a.k.a. `BreadcrumbItem`).
 *
 * The component itself is a **marker** — it never renders directly.
 * Instead, `<Breadcrumb>` reads its props off the React element tree
 * and funnels them through the same renderer used by the data-driven
 * `items` API. This mirrors how `<Tab>` / `<TabPanel>` work.
 *
 * Because the item's label is passed as `children` (the natural
 * composition shape), `title` from the shared data type is dropped.
 */
export interface BreadcrumbItemProps
  extends Omit<BreadcrumbItemData, 'title' | 'key'> {
  /** The crumb label. Any inline node is fine. */
  children?: React.ReactNode;
}

/**
 * Marker component for the composition-style `<Breadcrumb>` API.
 *
 * This component never mounts anything on its own — rendering it
 * outside a `<Breadcrumb>` yields `null` and warns in development.
 * Its only job is to carry props for the parent's renderer to pick up.
 */
export function BreadcrumbItem(_props: BreadcrumbItemProps): null {
  if (process.env.NODE_ENV !== 'production') {
     
    console.warn(
      '[scribble-ui] <BreadcrumbItem> was rendered outside of ' +
        '<Breadcrumb>. It has no effect on its own.'
    );
  }
  return null;
}

BreadcrumbItem.displayName = 'BreadcrumbItem';
