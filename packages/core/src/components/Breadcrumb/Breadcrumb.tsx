'use client';

import * as React from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import type { BreadcrumbItemProps } from './BreadcrumbItem';

// Note: this component does NOT import its CSS file directly. The
// aggregate stylesheet `scribble-ui/styles/components.css` bundles it,
// which keeps this file bundler-agnostic (Next.js RSC, Vite, etc.).

/* ================================================================== *
 *  Types
 * ================================================================== */

/**
 * Data-driven descriptor for a single breadcrumb entry.
 *
 * Consumers can populate a `<Breadcrumb items={…} />` instead of
 * assembling `<BreadcrumbItem>` children by hand, which makes it easy
 * to feed Breadcrumb from a router / config object.
 */
export interface BreadcrumbItemData {
  /** Visible text (or any inline node). */
  title: React.ReactNode;
  /** Navigation target. When omitted and `onClick` is also omitted, the
   *  item renders as plain text. */
  href?: string;
  /**
   * Escape hatch for custom anchor renderers (Next.js `<Link>`,
   * react-router `<NavLink>`, etc.). Receives the default rendered
   * inner node and must return a ReactNode that carries the caller's
   * navigation primitive.
   */
  render?: (node: React.ReactNode) => React.ReactNode;
  /** Decorative icon rendered before the text. */
  icon?: React.ReactNode;
  /** Click handler. When present together with `href`, the handler
   *  wins — the default anchor navigation is suppressed via
   *  `event.preventDefault()`. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Force non-interactive rendering regardless of `href` / `onClick`. */
  disabled?: boolean;
  /** React key override — otherwise the index is used. */
  key?: string | number;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Data-driven entries. Mutually exclusive with `children`. */
  items?: BreadcrumbItemData[];
  /** Composition-style children (`<BreadcrumbItem>`s). */
  children?: React.ReactNode;
  /** Node rendered between each pair of entries. Defaults to `›`. */
  separator?: React.ReactNode;
  /** Collapse threshold. `0` disables collapsing. */
  maxItems?: number;
  /** How many head items to keep when collapsing. Defaults to `1`. */
  itemsBeforeCollapse?: number;
  /** How many tail items to keep when collapsing. Defaults to `1`. */
  itemsAfterCollapse?: number;
  /** Accessible label on the `<nav>`. Defaults to `'Breadcrumb'`. */
  ariaLabel?: string;
}

/* ================================================================== *
 *  Internal: normalized list (both APIs funnel through this shape)
 * ================================================================== */

/** The single shape every renderer consumes. Derived from either
 *  `items` or `children`. */
interface NormalizedItem extends BreadcrumbItemData {
  /** Stable React key for list rendering. */
  reactKey: string | number;
}

/**
 * Convert `children` (arbitrary React nodes) to the same normalized
 * list we use for `items`. Anything that isn't a <BreadcrumbItem> is
 * ignored (with a dev-time warning) so consumers can't accidentally
 * sneak raw `<div>`s into the crumb chain.
 */
function normalizeChildren(children: React.ReactNode): NormalizedItem[] {
  const out: NormalizedItem[] = [];
  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement<BreadcrumbItemProps>(child)) return;

    // We duck-type rather than reference-check, because consumers may
    // wrap BreadcrumbItem with `memo()` or similar and lose the
    // original type identity.
    const isItem =
      child.type === BreadcrumbItem ||
      (child.type as { displayName?: string } | undefined)?.displayName ===
        'BreadcrumbItem';

    if (!isItem) {
      if (process.env.NODE_ENV !== 'production') {
         
        console.warn(
          '[scribble-ui] <Breadcrumb> only accepts <Breadcrumb.Item> ' +
            'children; other node types will be skipped.'
        );
      }
      return;
    }

    const { children: innerTitle, ...rest } = child.props;
    out.push({
      ...rest,
      title: innerTitle,
      // `child.key` is React's own keying slot (extracted from JSX
      // `key=` before it reaches `props`), which is exactly what we
      // want to round-trip into our list-rendering loop below.
      reactKey: (child.key ?? index) as string | number,
    });
  });
  return out;
}

/** Normalize the data-driven `items` prop to the shared internal shape. */
function normalizeItems(items: BreadcrumbItemData[]): NormalizedItem[] {
  return items.map((item, index) => ({
    ...item,
    reactKey: item.key ?? index,
  }));
}

/* ================================================================== *
 *  Internal: collapse algorithm
 * ================================================================== */

/** Sentinel entry used to represent the "…" placeholder in a collapsed
 *  breadcrumb chain. Rendered as non-interactive text. */
const ELLIPSIS = Symbol('breadcrumb-ellipsis');

type RenderEntry = NormalizedItem | typeof ELLIPSIS;

/**
 * Collapse a normalized list when it exceeds `maxItems`.
 *
 * Algorithm: keep `before` head items + `after` tail items + a single
 * ELLIPSIS sentinel in between. The tail count is always respected so
 * the last (current) page never disappears.
 */
function collapseItems(
  items: NormalizedItem[],
  maxItems: number,
  before: number,
  after: number
): RenderEntry[] {
  if (maxItems <= 0 || items.length <= maxItems) return items;
  const head = items.slice(0, Math.max(0, before));
  const tail = after > 0 ? items.slice(items.length - after) : [];
  return [...head, ELLIPSIS, ...tail];
}

/* ================================================================== *
 *  Component
 * ================================================================== */

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Render the inner label (icon + title) once so both anchor and span
 * render branches can share it. Returns a fragment — callers wrap it
 * in whatever element they want.
 */
function BreadcrumbInner({
  icon,
  title,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
}): JSX.Element {
  return (
    <>
      {icon !== undefined && icon !== null ? (
        <span className="su-breadcrumb__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="su-breadcrumb__label">{title}</span>
    </>
  );
}

/**
 * Hand-drawn breadcrumb trail.
 *
 * Accepts either a data-driven `items` array or composition children
 * (`<Breadcrumb.Item>`), and folds both through the same renderer so
 * visuals and a11y stay consistent. The last crumb is always rendered
 * as non-interactive text and marked `aria-current="page"`.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      items,
      children,
      separator = <span aria-hidden="true">›</span>,
      maxItems = 0,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      ariaLabel = 'Breadcrumb',
      className,
      ...rest
    },
    ref
  ) {
    // --- Normalize the two APIs into a single shape -------------------
    const normalized: NormalizedItem[] = React.useMemo(() => {
      if (items && items.length > 0) return normalizeItems(items);
      return normalizeChildren(children);
    }, [items, children]);

    // --- Collapse when necessary --------------------------------------
    const rendered: RenderEntry[] = React.useMemo(
      () =>
        collapseItems(
          normalized,
          maxItems,
          itemsBeforeCollapse,
          itemsAfterCollapse
        ),
      [normalized, maxItems, itemsBeforeCollapse, itemsAfterCollapse]
    );

    // We need to know which *original* index is the last interactive
    // crumb so we can mark it `aria-current`. The ellipsis doesn't
    // count, and neither does any item rendered after it — the tail of
    // `normalized` is what matters.
    const lastOriginalIndex = normalized.length - 1;

    return (
      <nav
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        className={cx('su-breadcrumb-nav', className)}
      >
        <ol className="su-breadcrumb">
          {rendered.map((entry, renderIndex) => {
            // ---- Ellipsis placeholder --------------------------------
            if (entry === ELLIPSIS) {
              return (
                <React.Fragment key={`ellipsis-${renderIndex}`}>
                  <li className="su-breadcrumb__item su-breadcrumb__item--ellipsis">
                    <span
                      className="su-breadcrumb__crumb su-breadcrumb__crumb--ellipsis"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  </li>
                  {renderIndex < rendered.length - 1 ? (
                    <li
                      className="su-breadcrumb__separator"
                      aria-hidden="true"
                    >
                      {separator}
                    </li>
                  ) : null}
                </React.Fragment>
              );
            }

            // ---- Real crumb ------------------------------------------
            // Find this entry's position in the *original* list so we
            // can tell if it's the last one (current page).
            const originalIndex = normalized.indexOf(entry);
            const isLast = originalIndex === lastOriginalIndex;
            const isDisabled = entry.disabled === true;
            const hasClick = typeof entry.onClick === 'function';
            const hasHref = typeof entry.href === 'string';
            const isInteractive = !isLast && !isDisabled && (hasHref || hasClick);

            const inner = (
              <BreadcrumbInner icon={entry.icon} title={entry.title} />
            );

            let crumbNode: React.ReactNode;
            if (isInteractive) {
              const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
                className: 'su-breadcrumb__crumb su-breadcrumb__crumb--link',
                href: entry.href ?? '#',
                onClick: (event) => {
                  if (!hasHref) event.preventDefault();
                  entry.onClick?.(event);
                },
              };
              const defaultAnchor = <a {...anchorProps}>{inner}</a>;
              crumbNode = entry.render
                ? // Callers return their own element (e.g. a Next.js
                  // Link); we still wrap the passthrough visually via
                  // the .su-breadcrumb__crumb--custom class so the
                  // shared filter/hover treatment is applied.
                  <span className="su-breadcrumb__crumb su-breadcrumb__crumb--custom">
                    {entry.render(inner)}
                  </span>
                : defaultAnchor;
            } else {
              // Last / disabled / plain-text crumbs all become <span>s.
              crumbNode = (
                <span
                  className={cx(
                    'su-breadcrumb__crumb',
                    isLast && 'su-breadcrumb__crumb--current',
                    isDisabled && 'su-breadcrumb__crumb--disabled'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                  aria-disabled={isDisabled ? 'true' : undefined}
                >
                  {inner}
                </span>
              );
            }

            return (
              <React.Fragment key={entry.reactKey}>
                <li className="su-breadcrumb__item">{crumbNode}</li>
                {renderIndex < rendered.length - 1 ? (
                  <li
                    className="su-breadcrumb__separator"
                    aria-hidden="true"
                  >
                    {separator}
                  </li>
                ) : null}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
) as React.ForwardRefExoticComponent<
  BreadcrumbProps & React.RefAttributes<HTMLElement>
> & {
  /** Alias of `BreadcrumbItem` for namespace-style composition:
   *  `<Breadcrumb.Item href="/">Home</Breadcrumb.Item>`. */
  Item: typeof BreadcrumbItem;
};

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.Item = BreadcrumbItem;
