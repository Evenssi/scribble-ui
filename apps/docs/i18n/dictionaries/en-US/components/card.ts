import type { ComponentDoc } from '../../zh-CN';

export const cardEn: ComponentDoc = {
  title: 'Card',
  lede:
    'A hand-drawn surface for grouping related content — a small layout primitive, not a button. Two flavors (plain paper or sticky-note tinted), three sizes, and an optional `interactive` mode that adopts the four-stage wobble from `Button`.',
  sections: {
    variants: 'Variants',
    sizes: 'Sizes',
    interactive: 'Interactive',
    composition: 'Composition',
    code: 'Code',
    api: 'API',
  },
  notes: {
    variants:
      'A card hosts a title, body copy and supporting actions or metadata — not just a single label. The samples below show the full surface so you can judge the wobble at realistic sizes.',
    sizes:
      'Padding, minimum width, font size *and* shadow weight all step up with the size — bigger cards feel heavier, like real paper stock.',
    interactive:
      'When `interactive` is on, the entire card behaves like a button: focusable, Enter/Space activates `onClick`, and the four-stage filter kicks in (calm → hover → active → disabled).',
    interactiveActivity:
      'Last picked: `{picked}`. Try keyboard: Tab to a card, then Enter or Space.',
    composition:
      'Cards are containers — the value shows up when you stack a Tag, metadata and a couple of buttons inside one.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      variant: { description: 'Visual variant. `note` uses a sticky-note tint.' },
      noteColor: {
        description: 'Sticky-note tint. Only meaningful when `variant === "note"`.',
      },
      size: {
        description: 'Size preset. Affects padding, minimum width and shadow weight.',
      },
      header: {
        description: 'Slot rendered above the body, separated by a dashed divider.',
      },
      footer: {
        description: 'Slot rendered below the body, separated by a dashed divider.',
      },
      interactive: {
        description:
          'Make the card focusable & clickable; enables four-stage filter and dashed focus ring.',
      },
      disabled: {
        description:
          'Only meaningful with `interactive`. Calms the card and blocks activation.',
      },
      onClick: {
        description: 'Click handler. Suppressed when `disabled`.',
      },
      className: {
        description: 'Extra class names appended after the built-in classes.',
      },
    },
  },
};
