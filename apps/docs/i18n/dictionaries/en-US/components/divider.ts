import type { ComponentDoc } from '../../zh-CN';

export const dividerEn: ComponentDoc = {
  title: 'Divider',
  lede:
    'A hand-drawn separator. Pick a stroke variant (solid, dashed, wavy), nudge the thickness, and optionally drop a label in the middle to break sections without resorting to extra typography.',
  sections: {
    basic: 'Basic',
    variants: 'Variants',
    thickness: 'Thickness',
    withLabel: 'With label',
    vertical: 'Vertical',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic: 'A bare horizontal divider — defaults to solid + default thickness.',
    variants:
      'Solid and dashed lean on CSS borders + the shared SVG-filter wobble. Wavy is painted with a repeating SVG so the curve stays crisp.',
    thickness:
      "Three presets mapped to the stroke tokens (`thin` / `default` / `bold`). For the wavy variant the SVG path's stroke-width is bumped instead of the border.",
    withLabel: 'Pass `children` to drop a label in the middle. Use `labelAlign` to push it to the start or end.',
    vertical: "Drop a vertical divider into a flex row. The divider stretches to the row's cross-axis size via `align-self: stretch`.",
    apiFooter:
      'The component renders a `<div role="separator">` with `aria-orientation` set, forwards a ref to the underlying `HTMLDivElement` and accepts every native div attribute (`aria-*`, `data-*`, etc.).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      orientation: {
        description:
          'Layout orientation. Vertical dividers stretch to fill the cross-axis of a flex row; horizontal ones span the full width.',
      },
      variant: {
        description:
          'Stroke style. Solid and dashed use CSS borders + the hand-drawn wobble; wavy is painted with a repeating SVG.',
      },
      thickness: {
        description: 'Stroke thickness preset, mapped to the `--su-stroke-*` tokens.',
      },
      children: {
        description:
          'Optional inline label. Splits a horizontal divider into two segments around the text. Ignored when `orientation` is `"vertical"`.',
      },
      labelAlign: { description: 'Where the label sits along the divider.' },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
