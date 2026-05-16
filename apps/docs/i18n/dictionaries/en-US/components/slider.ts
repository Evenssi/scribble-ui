import type { ComponentDoc } from '../../zh-CN';

export const sliderEn: ComponentDoc = {
  title: 'Slider',
  lede:
    'A hand-drawn slider with single-value and range modes. Built on `role="slider"` elements (not native `<input type="range">`) so we can paint the rail, fill and thumbs with the shared SVG-filter wobble while keeping the WAI-ARIA Slider keyboard pattern intact.',
  sections: {
    sizes: 'Sizes',
    states: 'States',
    range: 'Range',
    marks: 'Marks',
    vertical: 'Vertical',
    controlled: 'Controlled with onChangeCommitted',
    code: 'Code',
    api: 'API',
  },
  notes: {
    sizes:
      'Three sizes scale the thumb and rail thickness in lockstep so the thumb always looks centred on a line.',
    states:
      'Disabled drops the wobble entirely (matching Button) and removes both thumbs from the tab order. Use `showTooltip="always"` when the value is the only on-screen feedback.',
    range:
      "Pass `range` to render two thumbs that can't cross. Press `Tab` to focus the active thumb, then arrow keys to nudge it; `Tab` again moves on — the inactive thumb is reachable via the pointer or by clicking near it.",
    rangePrice: 'Current price filter:',
    marks:
      "Marks are decorative — they show where common values sit on the rail but they don't constrain the value (only `step` does). Pass labels for the ones the user should remember.",
    vertical:
      '`vertical` re-orients the layout (rather than rotating it) so hit-testing and keyboard semantics stay sensible: `↑` always increases the value, `↓` always decreases it.',
    controlled:
      "`onChange` fires continuously during interaction, so it's safe to bind to local state. `onChangeCommitted` fires once after the user releases the pointer or stops pressing arrow keys — perfect for sending the value to a server.",
    apiFooter:
      'Keyboard: `←`/`↓` decrement, `→`/`↑` increment by `step`; `Shift` + arrow multiplies by 10; `PageUp`/`PageDown` moves by 10% of the range; `Home`/`End` snap to `min` / `max`.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      range: {
        description:
          'Switches the slider into dual-thumb mode. When true, `value` / `defaultValue` / `onChange` all use a `[number, number]` tuple.',
      },
      value: {
        description: 'Controlled value. Pair with `onChange`. Type depends on `range`.',
      },
      defaultValue: { description: 'Uncontrolled initial value.' },
      onChange: {
        description: 'Fires continuously during pointer drag and keyboard input. Type follows `range`.',
      },
      onChangeCommitted: {
        description:
          'Fires once after the user releases the pointer or stops pressing arrow keys. Use this to fire expensive side effects (network calls, etc.).',
      },
      min: { description: 'Inclusive lower bound.' },
      max: { description: 'Inclusive upper bound.' },
      step: {
        description:
          'Snap increment. Both pointer drag and keyboard arrow keys round the resulting value to a multiple of `step`.',
      },
      marks: {
        description:
          "Decorative tick marks rendered on the rail. They don't constrain the value — only `step` does.",
      },
      disabled: {
        description: 'Disables all interaction. Drops the wobble entirely and removes both thumbs from the tab order.',
      },
      vertical: {
        description: 'Render the slider vertically. Keyboard semantics are unchanged — `↑` always increases, `↓` always decreases.',
      },
      size: { description: 'Size preset for the rail thickness, thumb and label font.' },
      showTooltip: {
        description:
          "When the value tooltip is rendered next to the active thumb. `'drag'` shows it during pointer drag or keyboard input only.",
      },
      formatTooltip: { description: "Format the tooltip's value (currency, percentages, …)." },
      'aria-label': {
        description: "Accessible label forwarded to the thumb. In range mode it's auto-suffixed with ' — minimum' / ' — maximum'.",
      },
      className: { description: 'Extra class names appended to the outer wrapper.' },
    },
  },
};
