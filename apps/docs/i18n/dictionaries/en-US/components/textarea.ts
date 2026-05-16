import type { ComponentDoc } from '../../zh-CN';

export const textareaEn: ComponentDoc = {
  title: 'Textarea',
  lede:
    "A multi-line text input that shares Input's hand-drawn frame. Supports controlled/uncontrolled use, three sizes, error states, a built-in character counter and content-aware auto-resize.",
  sections: {
    basic: 'Basic',
    sizes: 'Sizes',
    states: 'States',
    autoResize: 'Auto resize',
    count: 'Character count',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Both controlled and uncontrolled patterns work. The wrapper draws the wobble; the native handle in the bottom-right corner still lets users drag the textarea taller.',
    autoResize:
      'Pass `autoResize` to grow with the content. Provide `{ minRows, maxRows }` to clamp the range — past `maxRows` the textarea scrolls instead of growing. The native drag handle is hidden in this mode.',
    count:
      "With `showCount` + `maxLength`, the counter turns warning at 80% and danger at 100%. Type past the limit to see the danger color (the native `maxLength` already truncates input, but the counter still tracks the underlying state).",
    apiFooter:
      'The component forwards a ref to the underlying `HTMLTextAreaElement` and accepts every native textarea attribute (`rows`, `name`, `aria-*`, `data-*`, etc.).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      size: { description: 'Visual size. Does not map to any native attribute.' },
      error: {
        description:
          'Renders the wrapper with the danger color and tints `helperText` red. Also sets `aria-invalid` on the underlying textarea.',
      },
      helperText: { description: 'Sub-line shown beneath the textarea.' },
      autoResize: {
        description:
          'Grow with content. Object form clamps the range; past `maxRows` the textarea scrolls. Disables the native resize handle when set.',
      },
      showCount: {
        description:
          "Render a counter in the bottom-right corner. With `maxLength`, the counter renders as `current / max` and turns warning at 80%, danger past 100%.",
      },
      value: {
        description: 'Standard controlled / uncontrolled bridge. Pair `value` with `onChange`.',
      },
      maxLength: {
        description: "Native max length. Truncates input and feeds the counter's color thresholds.",
      },
      disabled: {
        description:
          'Standard inert / read-only states. Disabled drops the wobble and locks the resize handle.',
      },
      wrapperClassName: {
        description: 'Extra class on the outer wrapper (the element that draws the border).',
      },
      className: { description: 'Extra class on the underlying `<textarea>`.' },
    },
  },
};
