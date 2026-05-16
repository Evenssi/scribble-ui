import type { ComponentDoc } from '../../zh-CN';

export const switchEn: ComponentDoc = {
  title: 'Switch',
  lede:
    'A hand-drawn toggle switch. Wraps a native `<input type="checkbox" role="switch">` so screen readers announce the on/off semantics and form submission keeps working — the wobble is purely cosmetic.',
  sections: {
    basic: 'Basic',
    sizes: 'Sizes',
    states: 'States',
    labelPosition: 'Label position',
    controlled: 'Controlled with feedback',
    code: 'Code',
    api: 'API',
  },
  notes: {
    labelPosition:
      'By default the label sits to the right of the switch. Use `labelPosition="left"` to mirror it (handy in settings tables where every row has the toggle on the right).',
    apiFooter:
      'Forwards a ref to the underlying `HTMLInputElement` and accepts every native input attribute (`name`, `aria-*`, `data-*`, …).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      size: { description: 'Size preset for the track, thumb and label font.' },
      checked: { description: 'Controlled checked state. Pair with `onChange`.' },
      defaultChecked: { description: 'Uncontrolled initial state.' },
      onChange: {
        description: 'Receives the next boolean checked state plus the raw native event.',
      },
      disabled: {
        description: 'Standard HTML disabled. Drops the wobble entirely and sets `aria-disabled`.',
      },
      label: {
        description:
          'Label rendered next to the switch. Clicking the label also toggles the switch (native `<label>` behavior).',
      },
      helperText: {
        description:
          'One-line hint rendered under the switch. Picks the danger color when `error` is true.',
      },
      error: {
        description:
          'Render the track in the danger color and tints the helper line red. Sets `aria-invalid`.',
      },
      labelPosition: { description: 'Visual position of the label relative to the switch.' },
      className: { description: 'Extra class names appended to the outer `<label>` wrapper.' },
    },
  },
};
