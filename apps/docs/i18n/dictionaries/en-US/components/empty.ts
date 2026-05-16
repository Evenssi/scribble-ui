import type { ComponentDoc } from '../../zh-CN';

export const emptyEn: ComponentDoc = {
  title: 'Empty',
  lede:
    'A hand-drawn placeholder for blank lists, empty search results and first-run states. Ships three built-in illustrations, scales with typography and can optionally sit on a sticky-note enclosure.',
  sections: {
    basic: 'Basic',
    presets: 'Presets',
    sizes: 'Sizes',
    actionAndBordered: 'With action & bordered',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Out of the box Empty renders its default illustration and the fallback headline `"No data"`, so it stays announceable by screen readers even without props.',
    presets:
      'Three built-in illustrations cover the common empty cases — an empty note, a search miss and an empty data folder. Pass a custom `image` node to override.',
    sizes:
      'Three size presets scale the illustration and type together. Pick `sm` inside a popover or table cell, `md` for standard panels and `lg` for full-page states.',
    actionAndBordered:
      'Use the `action` slot for 0–2 recovery actions, and switch on `bordered` to wrap the whole thing in a sticky-note enclosure.',
    apiFooter:
      'The root element is a `<div role="status" aria-live="polite">`, so assistive technologies announce the empty state when it replaces a previously populated region. The illustration is marked `aria-hidden`.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      preset: { description: 'Built-in illustration. Ignored when `image` is provided.' },
      image: {
        description: 'Custom illustration. Any ReactNode works — SVG, `<img>`, emoji. Overrides `preset`.',
      },
      title: {
        description:
          "Primary headline. Falls back to `'No data'` only when both `title` and `description` are omitted, so the component stays announceable.",
      },
      description: { description: 'Supporting copy rendered below the title.' },
      action: { description: 'Action slot for recovery affordances (typically 0–2 buttons or links).' },
      size: { description: 'Overall visual scale — affects illustration height and typography.' },
      bordered: {
        description:
          'Wraps the content in a sticky-note enclosure with paper background, hand-drawn border, hard offset shadow and a slight tilt.',
      },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
