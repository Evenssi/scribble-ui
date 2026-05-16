import type { ComponentDoc } from '../../zh-CN';

export const paginationEn: ComponentDoc = {
  title: 'Pagination',
  lede:
    'Classic prev / page numbers / next, every button styled as its own little sticky-note. Data-driven — pass either `total` + `pageSize` or an explicit `totalPages`. Supports controlled and uncontrolled usage, with sensible defaults for every knob.',
  sections: {
    basic: 'Basic',
    controlled: 'Controlled',
    largeLists: 'Large lists & ellipses',
    customWindow: 'Custom window width',
    firstLast: 'First & last jump buttons',
    simple: 'Simple mode',
    smallSize: 'Small size',
    disabled: 'Disabled',
    localised: 'Localised labels',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Uncontrolled. Ten items per page, one hundred total, so exactly ten pages — the whole sequence fits without ellipses.',
    controlled:
      'Drive the active page from outside with `current` + `onChange`. The button below resets the pager to page 1 no matter where it is.',
    largeLists:
      '`total=987, pageSize=20` — that\'s 50 pages. The sequence collapses to first-boundary · current window · last-boundary, with an "…" note whenever the gap is wider than a single number.',
    customWindow:
      '`boundaryCount=2` keeps the first two and last two pages pinned; `siblingCount=2` widens the running window around the active page. Useful when you\'d rather take horizontal space than make users read the ellipsis.',
    firstLast:
      'Enable `showFirstLast` to add « and » for one-click jumps to the ends of the range. Off by default — most lists don\'t need four nav buttons on top of page numbers.',
    simple:
      '`simple` collapses the whole widget to prev / next plus a "current / total" readout. Great for mobile, or for pagers that live in a dense table toolbar.',
    smallSize:
      '`size="small"` — 28×28 squares instead of 36. For tables and compact list footers.',
    disabled:
      'Pass `disabled` to inert the entire group — every button reports `aria-disabled` and the wobble is dropped so the calm state is unmistakable.',
    localised:
      'Every screen-reader string is overridable via `labels`. The numbers on the page buttons stay numeric; only the *aria-label* (and prev/next/first/last labels) change.',
    apiFooter1:
      'The component also forwards a ref to the underlying `HTMLElement` (the `<nav>`) and accepts every native HTML attribute (`id`, `aria-*`, `data-*`, …).',
    apiFooter2:
      'The pure helper `getPageItems(current, totalPages, boundaryCount, siblingCount)` is also exported so you can reuse the collapse logic (for example, to render your own custom page chips).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      current: { description: 'Controlled active page (1-based).' },
      defaultCurrent: { description: 'Initial page when uncontrolled.' },
      total: { description: 'Total item count. Combined with `pageSize` to derive the total page count.' },
      pageSize: { description: 'Items per page.' },
      totalPages: {
        description: 'Explicit total page count. When set, overrides `total` / `pageSize`.',
      },
      onChange: { description: 'Fires whenever the active page changes.' },
      boundaryCount: {
        description: 'How many pages to always keep pinned at each end of the sequence.',
      },
      siblingCount: { description: 'How many pages to render on each side of the current page.' },
      showFirstLast: { description: 'Render « and » buttons for first / last page jumps.' },
      showPrevNext: { description: 'Render the prev / next buttons.' },
      simple: { description: 'Collapse to prev / next plus a "current / total" readout.' },
      size: { description: 'Size preset — 28px or 36px squares.' },
      disabled: { description: 'Inert the whole group.' },
      ariaLabel: { description: 'Value for the wrapping `<nav>`\'s `aria-label`.' },
      labels: {
        description:
          'Overrides for every screen-reader string (`previous`, `next`, `first`, `last`, plus a `page(n)` generator).',
      },
      className: { description: 'Extra class on the outer `<nav>`.' },
    },
  },
};
