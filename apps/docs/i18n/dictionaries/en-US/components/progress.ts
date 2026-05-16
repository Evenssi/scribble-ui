import type { ComponentDoc } from '../../zh-CN';

export const progressEn: ComponentDoc = {
  title: 'Progress',
  lede:
    'A progress indicator that complements `Spinner`: it visualises *how much* of a task is done. Two shapes — `line` and `circle` — share the same status palette, sizing scale and indeterminate behaviour.',
  sections: {
    lineValues: 'Line · values',
    lineSizes: 'Line · sizes',
    lineStatus: 'Line · status',
    lineLabel: 'Line · with label',
    lineIndeterminate: 'Line · indeterminate',
    circleValues: 'Circle · values',
    circleSizes: 'Circle · sizes',
    circleStatus: 'Circle · status',
    circleLabel: 'Circle · with label',
    circleIndeterminate: 'Circle · indeterminate',
    code: 'Code',
    api: 'API',
  },
  notes: {
    lineValues: 'The `value` prop is clamped to `[0, 100]`. Non-numeric values fall back to `0`.',
    lineSizes: 'Three preset heights: `sm` 6px, `md` 10px, `lg` 14px.',
    lineStatus:
      '`status` picks one of the existing semantic colors: `normal` (ink), `success`, `warning`, `danger`.',
    lineLabel:
      'Pass `showLabel` to render the percentage to the right of the bar. Provide `formatLabel` for full control.',
    lineIndeterminate:
      'When `indeterminate` is `true`, `value` is ignored, the label is hidden, and the fill slides continuously across the track.',
    circleValues:
      'The ring is normalised with `pathLength={100}`, so the stroke-dashoffset math is just `100 - value`.',
    circleSizes:
      'Three preset diameters: `sm` 56px, `md` 80px, `lg` 112px. Stroke width scales with the size.',
    circleLabel:
      'The label is centered inside the ring. Use `formatLabel` to show fractions, time remaining, or any other text.',
    circleIndeterminate:
      'A short arc rotates around the ring. The label is hidden and `aria-valuenow` is omitted (per WAI-ARIA, the value is unknown).',
    apiFooter:
      'The component renders a `<div>` with `role="progressbar"` and forwards a ref to it. All native div attributes are accepted.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: {
        description:
          'Progress percentage, 0–100. Clamped automatically; `NaN` / `undefined` fall back to `0`. Ignored when `indeterminate` is true.',
      },
      indeterminate: {
        description:
          'Render the indeterminate animation (sliding bar / spinning arc). Hides the label and omits `aria-valuenow`.',
      },
      variant: { description: 'Visual shape.' },
      size: { description: 'Line height: 6 / 10 / 14 px. Circle diameter: 56 / 80 / 112 px.' },
      status: { description: 'Semantic color, mapped to existing `--su-color-*` tokens.' },
      showLabel: {
        description:
          'Render the percentage as visible text. Position depends on variant: right-aligned for `line`, centered for `circle`. Forced off when `indeterminate`.',
      },
      formatLabel: {
        description:
          'Custom label renderer. Receives the clamped value (0–100). Takes precedence over the default `n%` rendering.',
      },
      'aria-label': {
        description:
          "Accessible name for the progressbar. Strongly recommended; falls back to `'Loading'`.",
      },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
