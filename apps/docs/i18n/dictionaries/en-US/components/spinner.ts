import type { ComponentDoc } from '../../zh-CN';

export const spinnerEn: ComponentDoc = {
  title: 'Spinner',
  lede:
    'A small loading indicator in three hand-drawn flavors — `ring`, `dots` and `pencil`. The spinner inherits its color via `currentColor`, so it blends into Buttons, Tags, or any colored container without extra wiring.',
  sections: {
    sizes: 'Sizes',
    variants: 'Variants',
    color: 'Color',
    label: 'With visible label',
    inButton: 'Inside a button',
    code: 'Code',
    api: 'API',
  },
  notes: {
    sizes: 'Three fixed pixel sizes: `sm` 16px, `md` 24px, `lg` 36px.',
    color:
      'The spinner uses `currentColor`, so the easiest way to theme it is to set `color` on a wrapping element. You can also pass `color` directly as a prop.',
    label:
      'A screen-reader-only label is always rendered (defaulting to `"Loading"`). Pass `showLabel` to also show it visibly next to the indicator.',
    inButton:
      'Because the spinner inherits color, dropping it into a native button (or any component) just works.',
    apiFooter:
      'The component renders a `<span>` with `role="status"` and forwards a ref to it. All native span attributes are accepted.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      variant: {
        description:
          'Visual style. `ring` rotates a 1/3 arc, `dots` pulses three circles, `pencil` redraws a short scribble.',
      },
      size: { description: 'Fixed pixel size: 16 / 24 / 36.' },
      color: {
        description:
          'Optional CSS color override. When omitted, the spinner inherits its color from the surrounding text.',
      },
      label: {
        description:
          'Screen-reader-visible loading text. Always rendered (in an SR-only span unless `showLabel` is true).',
      },
      showLabel: { description: 'Render `label` as visible text next to the spinner.' },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
