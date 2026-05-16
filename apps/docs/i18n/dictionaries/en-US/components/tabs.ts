import type { TabsDoc } from '../../zh-CN/components/tabs';

export const tabsEn: TabsDoc = {
  title: 'Tabs',
  lede:
    'Hand-drawn tabbed navigation. Three flavours — underline, card and pill — each layered on the same WAI-ARIA Tabs pattern: roving tabindex, arrow-key focus, optional manual activation, stable id wiring between every trigger and its panel.',
  sections: {
    basic: 'Basic',
    variants: 'Variants',
    sizes: 'Sizes',
    vertical: 'Vertical',
    disabledManual: 'Disabled & manual activation',
    controlled: 'Controlled',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Default `underline` variant. Use the keyboard: ArrowLeft / ArrowRight to move, Home / End to jump to the ends, Tab to step into the panel body.',
    variants:
      'The same content, three visual personalities. Pick the one that best matches the surrounding surface — pill on toolbars, card on dashboards, underline almost everywhere else.',
    vertical:
      'Set `orientation="vertical"`. Arrow keys rotate to ArrowUp / ArrowDown automatically.',
    disabledManual:
      "Disabled tabs render but are skipped by arrow keys. `activationMode=\"manual\"` means moving focus does *not* activate the panel — you have to press Enter or Space. Useful when switching has real cost (e.g. fetching).",
    controlled:
      'Pass `value` + `onChange` to drive the widget from outside. The buttons below mutate the same state the Tabs read from.',
    apiFooter:
      'Every component also forwards a ref to its underlying DOM element and accepts the matching native attributes (`aria-*`, `data-*`, `id`, …).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Controlled active tab value.' },
      defaultValue: {
        description: 'Initial active value when uncontrolled. If omitted, the first non-disabled tab wins.',
      },
      onChange: { description: 'Fires whenever the active tab changes.' },
      variant: { description: 'Visual variant.' },
      size: { description: 'Size preset.' },
      orientation: { description: 'Layout direction. Also rotates the arrow-key bindings.' },
      activationMode: {
        description: "`'automatic'` activates on focus, `'manual'` requires Enter / Space.",
      },
      keepMounted: {
        description: 'Keep every panel mounted in the DOM (hidden via the `hidden` attribute when inactive).',
      },
      className: { description: 'Extra class on the outer container.' },
    },
  },
  apiHeadings: {
    tabs: 'Tabs',
    tabList: 'TabList',
    tab: 'Tab',
    tabPanels: 'TabPanels',
    tabPanel: 'TabPanel',
  },
  apiTabList: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      'aria-label': { description: 'Required for screen readers if no labelled-by is provided.' },
      'aria-labelledby': { description: 'Reference an external heading instead of inlining a label.' },
      className: { description: 'Extra class on the tablist element.' },
    },
  },
  apiTab: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Required. Pairs with the matching `<TabPanel>`.' },
      disabled: {
        description: 'Renders but is skipped by arrow keys and cannot be activated.',
      },
      icon: { description: 'Decorative icon rendered before the label.' },
      className: { description: 'Extra class appended after the built-in classes.' },
    },
  },
  apiTabPanels: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      className: {
        description:
          'Layout slot for the per-tab panels. Carries no ARIA on its own — each `TabPanel` already does.',
      },
    },
  },
  apiTabPanel: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Required. Pairs with the matching `<Tab>`.' },
      forceMount: {
        description: 'Force this individual panel to stay mounted (hidden via `hidden` when inactive).',
      },
      className: { description: 'Extra class on the panel element.' },
    },
  },
};
