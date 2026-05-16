import type { ComponentDoc } from '../../zh-CN';

export const breadcrumbEn: ComponentDoc = {
  title: 'Breadcrumb',
  lede:
    'Hand-drawn trail that tells users where they are. Each crumb is a tiny sticky-note that lifts on hover; the last crumb drops the card treatment and reads as emphasized text — signage, not a button. Works with either a data-driven `items` prop or composition children.',
  sections: {
    basic: 'Basic',
    composition: 'Composition children',
    withIcons: 'With icons',
    customSeparators: 'Custom separators',
    onClickHandler: 'onClick handler',
    collapsed: 'Collapsed',
    disabled: 'Disabled middle crumb',
    customRender: 'Custom render (router adapter)',
    code: 'Code',
    api: 'API',
    apiBreadcrumb: 'Breadcrumb',
    apiItem: 'BreadcrumbItemData / Breadcrumb.Item',
  },
  notes: {
    basic:
      'A three-level trail driven by the `items` prop. The last entry is automatically rendered as non-interactive text and tagged `aria-current="page"`.',
    composition:
      'Prefer JSX composition? Use `<Breadcrumb.Item>` (or `<BreadcrumbItem>`) — both funnel through the same renderer as `items`.',
    withIcons:
      "Drop any inline node into the `icon` slot. Icons render crisply — they don't inherit the crumb's wobble filter.",
    customSeparators:
      'The default separator is a single `›` glyph. Pass any ReactNode to `separator` to override it.',
    onClickHandler:
      'Pass `onClick` to take over navigation. When no `href` is provided the default `#` navigation is suppressed via `preventDefault`.',
    collapsed:
      'Set `maxItems` to fold the middle crumbs into a `…`. Use `itemsBeforeCollapse` / `itemsAfterCollapse` to tune how many crumbs each end keeps (defaults to 1 / 1).',
    disabled:
      'A `disabled` item renders as plain text and ignores clicks — useful when a middle level is gated (permissions, feature flag) but still part of the trail.',
    customRender:
      "Pass `render` to hand the inner content off to your router's link primitive. Breadcrumb keeps the sticky-note chrome + hover filter; your adapter owns navigation. The demo below mocks the pattern with a `<span>` wrapper — swap it for Next.js `<Link>` or react-router `<NavLink>` in real code.",
    apiFooter:
      'The `<Breadcrumb>` also forwards a ref to the underlying `HTMLElement` (the `<nav>`) and accepts the matching native attributes (`id`, `aria-*`, `data-*`, …).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      // === Breadcrumb table ===
      b__items: {
        description:
          'Data-driven entries. Mutually exclusive with `children`; when both are provided `items` wins.',
      },
      b__children: {
        description:
          'Composition-style children. Must be `<Breadcrumb.Item>` elements; any other node is skipped with a dev warning.',
      },
      b__separator: {
        description:
          "Node rendered between each pair of crumbs. Always marked `aria-hidden` so screen readers don't read it aloud.",
      },
      b__maxItems: {
        description: 'Collapse when the total crumb count exceeds this value. `0` disables collapsing.',
      },
      b__itemsBeforeCollapse: { description: 'Head crumbs kept visible when collapsing.' },
      b__itemsAfterCollapse: { description: 'Tail crumbs kept visible when collapsing.' },
      b__ariaLabel: { description: 'Accessible label on the wrapping `<nav>`.' },
      b__className: { description: 'Extra class on the outer `<nav>`.' },

      // === BreadcrumbItemData / Breadcrumb.Item table ===
      item__title: {
        description: 'Crumb label. For `<Breadcrumb.Item>`, use `children` instead.',
      },
      item__href: {
        description:
          "Navigation target. Omit for plain-text crumbs. The last crumb's `href` is always ignored.",
      },
      item__onClick: {
        description:
          'Click handler. When provided alongside `href`, the handler wins and default navigation is suppressed.',
      },
      item__render: {
        description:
          'Router-adapter escape hatch (Next.js `<Link>`, etc.). Receives the default inner node and must return a ReactNode.',
      },
      item__icon: { description: 'Decorative icon rendered before the label.' },
      item__disabled: {
        description: 'Forces non-interactive rendering. Sets `aria-disabled="true"`.',
      },
      item__key: {
        description:
          'Optional React key override for the `items` API (the index is used otherwise).',
      },
    },
  },
};
