'use client';

import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the aggregated styles once from:
//   import 'scribble-ui/styles/components.css';

export type PaginationSize = 'small' | 'medium';

/**
 * One entry in the generated page sequence. Either a real 1-based page
 * number, or an ellipsis marker. `start-ellipsis` means the gap between
 * the leading boundary and the current window; `end-ellipsis` is the gap
 * between the window and the trailing boundary.
 */
export type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

export interface PaginationLabels {
  previous?: string;
  next?: string;
  first?: string;
  last?: string;
  /** Per-page-button aria-label generator. */
  page?: (n: number) => string;
}

export interface PaginationProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'onChange' | 'className' | 'children'
  > {
  /** Controlled current page (1-based). */
  current?: number;
  /** Uncontrolled initial page. Defaults to 1. */
  defaultCurrent?: number;
  /** Total item count. Combined with `pageSize` to derive total pages. */
  total?: number;
  /** Items per page. Defaults to 10. */
  pageSize?: number;
  /** Explicit total page count. If provided, overrides `total` / `pageSize`. */
  totalPages?: number;
  /** Fires whenever the active page changes. */
  onChange?: (page: number) => void;
  /**
   * How many pages to always keep at the very start / very end of the
   * sequence. Mirrors MUI's `usePagination` naming. Defaults to 1.
   */
  boundaryCount?: number;
  /**
   * How many pages to keep around the current page on each side. Defaults to 1.
   */
  siblingCount?: number;
  /** Show «  » first/last jump buttons. Defaults to false. */
  showFirstLast?: boolean;
  /** Show prev/next buttons. Defaults to true. */
  showPrevNext?: boolean;
  /** Disable the entire control. */
  disabled?: boolean;
  /** Size preset. */
  size?: PaginationSize;
  /**
   * Compact layout: only renders prev/next plus a "current / totalPages"
   * readout — no page number buttons.
   */
  simple?: boolean;
  /** Nav-level aria-label. Defaults to 'Pagination'. */
  ariaLabel?: string;
  /** Localisation hooks for every visible string. */
  labels?: PaginationLabels;
  /** Extra class on the outer `<nav>`. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Page sequence generator (pure, no React deps — exported for unit tests)
// ---------------------------------------------------------------------------

/**
 * Build the visible page sequence for a pager, matching MUI
 * `usePagination` semantics:
 *
 * [1 … boundary][start-ellipsis?][window around current][end-ellipsis?][… totalPages]
 *
 * The two "only one number missing" edge cases are smoothed out by
 * expanding single-gap ellipses back into the real page number — a
 * lone "…" covering a single number looks broken.
 *
 * For small page counts (<= 7, or whenever the naive full range is not
 * longer than the condensed output) we just emit every page, which also
 * handles the totalPages = 0 / 1 degenerate cases.
 */
export function getPageItems(
  current: number,
  totalPages: number,
  boundaryCount = 1,
  siblingCount = 1
): PageItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const clampedBoundary = Math.max(0, Math.floor(boundaryCount));
  const clampedSibling = Math.max(0, Math.floor(siblingCount));
  const clampedCurrent = Math.min(Math.max(1, current), totalPages);

  const range = (start: number, end: number): number[] => {
    const out: number[] = [];
    for (let i = start; i <= end; i += 1) out.push(i);
    return out;
  };

  const startPages = range(1, Math.min(clampedBoundary, totalPages));
  const endPages = range(
    Math.max(totalPages - clampedBoundary + 1, clampedBoundary + 1),
    totalPages
  );

  // Window around the current page, clipped so it never overlaps the
  // boundary runs we already decided to always render.
  const siblingsStart = Math.max(
    Math.min(
      clampedCurrent - clampedSibling,
      // Push the window left if we're near the end so it still has
      // `2 * siblingCount + 1` entries.
      totalPages - clampedBoundary - clampedSibling * 2 - 1
    ),
    clampedBoundary + 2
  );
  const siblingsEnd = Math.min(
    Math.max(
      clampedCurrent + clampedSibling,
      clampedBoundary + clampedSibling * 2 + 2
    ),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const items: PageItem[] = [];

  items.push(...startPages);

  // Gap between the leading boundary and the window.
  if (siblingsStart > clampedBoundary + 2) {
    items.push('start-ellipsis');
  } else if (clampedBoundary + 1 < totalPages - clampedBoundary) {
    // Only one number missing — just show it instead of an ellipsis.
    items.push(clampedBoundary + 1);
  }

  items.push(...range(siblingsStart, siblingsEnd));

  // Gap between the window and the trailing boundary.
  if (siblingsEnd < totalPages - clampedBoundary - 1) {
    items.push('end-ellipsis');
  } else if (totalPages - clampedBoundary > clampedBoundary) {
    items.push(totalPages - clampedBoundary);
  }

  items.push(...endPages);

  // Deduplicate while preserving order. The boundary / window math above
  // can legitimately produce repeats on tiny page counts; unique-pass is
  // cheaper than trying to special-case every geometry.
  const seen = new Set<PageItem>();
  return items.filter((item) => {
    if (seen.has(item)) return false;
    seen.add(item);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Icons — inline so the package stays dep-free.
// ---------------------------------------------------------------------------

function PrevIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5 L8 12 L15 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 5 L16 12 L9 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FirstIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17 5 L10 12 L17 19 M6 5 L6 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LastIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 5 L14 12 L7 19 M18 5 L18 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

const DEFAULT_LABELS: Required<Omit<PaginationLabels, 'page'>> & {
  page: (n: number) => string;
} = {
  previous: 'Previous page',
  next: 'Next page',
  first: 'First page',
  last: 'Last page',
  page: (n: number) => `Go to page ${n}`,
};

/**
 * Hand-drawn pagination control.
 *
 * Data-driven: pass either (`total` + `pageSize`) or `totalPages`. The
 * component supports both controlled (`current` + `onChange`) and
 * uncontrolled (`defaultCurrent`) modes, and renders a condensed page
 * sequence with ellipses for long lists.
 *
 * Accessibility: the root is a `<nav role="navigation">` with a
 * meaningful `aria-label`; the active page carries
 * `aria-current="page"`; prev / next / first / last are naturally
 * disabled at the boundaries and advertise that state via both the
 * native `disabled` attribute and `aria-disabled`.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      current,
      defaultCurrent = 1,
      total,
      pageSize = 10,
      totalPages: totalPagesProp,
      onChange,
      boundaryCount = 1,
      siblingCount = 1,
      showFirstLast = false,
      showPrevNext = true,
      disabled = false,
      size = 'medium',
      simple = false,
      ariaLabel = 'Pagination',
      labels,
      className,
      ...rest
    },
    ref
  ) {
    // --- Derive total pages --------------------------------------------------
    // `totalPages` prop wins outright; otherwise derive from total + pageSize.
    const derivedTotalPages = React.useMemo(() => {
      if (typeof totalPagesProp === 'number') {
        return Math.max(0, Math.floor(totalPagesProp));
      }
      if (typeof total === 'number' && pageSize > 0) {
        return Math.max(0, Math.ceil(total / pageSize));
      }
      return 0;
    }, [totalPagesProp, total, pageSize]);

    // --- Controlled / uncontrolled bridge -----------------------------------
    const isControlled = current !== undefined;
    const [innerCurrent, setInnerCurrent] = React.useState<number>(() => {
      // Uncontrolled initial value, clamped defensively.
      const initial = defaultCurrent ?? 1;
      if (derivedTotalPages === 0) return 1;
      return Math.min(Math.max(1, initial), Math.max(1, derivedTotalPages));
    });

    const rawCurrent = isControlled ? (current as number) : innerCurrent;
    const activePage =
      derivedTotalPages === 0
        ? 1
        : Math.min(Math.max(1, rawCurrent), derivedTotalPages);

    const resolvedLabels = { ...DEFAULT_LABELS, ...(labels ?? {}) };

    // --- Page change handler -------------------------------------------------
    const goTo = React.useCallback(
      (next: number) => {
        if (disabled) return;
        if (derivedTotalPages === 0) return;
        const clamped = Math.min(Math.max(1, next), derivedTotalPages);
        if (clamped === activePage) return;
        if (!isControlled) setInnerCurrent(clamped);
        onChange?.(clamped);
      },
      [disabled, derivedTotalPages, activePage, isControlled, onChange]
    );

    const items: PageItem[] = React.useMemo(
      () => getPageItems(activePage, derivedTotalPages, boundaryCount, siblingCount),
      [activePage, derivedTotalPages, boundaryCount, siblingCount]
    );

    const classes = cx(
      'su-pagination',
      `su-pagination--${size}`,
      simple && 'su-pagination--simple',
      disabled && 'su-pagination--disabled',
      className
    );

    const atStart = derivedTotalPages === 0 || activePage <= 1;
    const atEnd = derivedTotalPages === 0 || activePage >= derivedTotalPages;

    // --- Degenerate: zero pages — render an empty nav so layout is stable.
    if (derivedTotalPages === 0) {
      return (
        <nav
          ref={ref}
          role="navigation"
          aria-label={ariaLabel}
          className={classes}
          {...rest}
        >
          <ul className="su-pagination__list">
            <li className="su-pagination__item">
              <button
                type="button"
                className="su-pagination__page su-pagination__page--empty"
                disabled
                aria-disabled="true"
                aria-current="page"
              >
                1
              </button>
            </li>
          </ul>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label={ariaLabel}
        className={classes}
        {...rest}
      >
        <ul className="su-pagination__list">
          {showFirstLast && (
            <li className="su-pagination__item">
              <button
                type="button"
                className="su-pagination__nav su-pagination__nav--first"
                disabled={disabled || atStart}
                aria-disabled={disabled || atStart || undefined}
                aria-label={resolvedLabels.first}
                onClick={() => goTo(1)}
              >
                <FirstIcon />
              </button>
            </li>
          )}

          {showPrevNext && (
            <li className="su-pagination__item">
              <button
                type="button"
                className="su-pagination__nav su-pagination__nav--prev"
                disabled={disabled || atStart}
                aria-disabled={disabled || atStart || undefined}
                aria-label={resolvedLabels.previous}
                onClick={() => goTo(activePage - 1)}
              >
                <PrevIcon />
              </button>
            </li>
          )}

          {simple ? (
            <li className="su-pagination__item su-pagination__item--readout">
              <span
                className="su-pagination__readout"
                aria-live="polite"
                aria-atomic="true"
              >
                <strong>{activePage}</strong>
                <span className="su-pagination__readout-sep">/</span>
                <span>{derivedTotalPages}</span>
              </span>
            </li>
          ) : (
            items.map((item, index) => {
              if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                return (
                  <li
                    key={`${item}-${index}`}
                    className="su-pagination__item su-pagination__item--ellipsis"
                    aria-hidden="true"
                  >
                    <span className="su-pagination__ellipsis">…</span>
                  </li>
                );
              }
              const isActive = item === activePage;
              return (
                <li key={item} className="su-pagination__item">
                  <button
                    type="button"
                    className={cx(
                      'su-pagination__page',
                      isActive && 'su-pagination__page--active'
                    )}
                    disabled={disabled}
                    aria-disabled={disabled || undefined}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={resolvedLabels.page(item)}
                    onClick={() => goTo(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })
          )}

          {showPrevNext && (
            <li className="su-pagination__item">
              <button
                type="button"
                className="su-pagination__nav su-pagination__nav--next"
                disabled={disabled || atEnd}
                aria-disabled={disabled || atEnd || undefined}
                aria-label={resolvedLabels.next}
                onClick={() => goTo(activePage + 1)}
              >
                <NextIcon />
              </button>
            </li>
          )}

          {showFirstLast && (
            <li className="su-pagination__item">
              <button
                type="button"
                className="su-pagination__nav su-pagination__nav--last"
                disabled={disabled || atEnd}
                aria-disabled={disabled || atEnd || undefined}
                aria-label={resolvedLabels.last}
                onClick={() => goTo(derivedTotalPages)}
              >
                <LastIcon />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
