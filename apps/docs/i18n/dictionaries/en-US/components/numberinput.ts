import type { ComponentDoc } from '../../zh-CN';

export const numberinputEn: ComponentDoc = {
  title: 'NumberInput',
  lede:
    'A number-aware sibling of `Input`. Same hand-drawn wrapper, same prefix/suffix slots, plus typed step controls, keyboard shortcuts (↑/↓, Shift, Alt, Home, End) and value clamping. Uses `type="text"` + `inputMode="decimal"` so we skip the inconsistent native spinner UI.',
  sections: {
    sizes: 'Sizes',
    states: 'States',
    slots: 'With prefix & suffix',
    controlled: 'Controlled & Uncontrolled',
    code: 'Code',
    api: 'Props',
  },
  notes: {
    apiFooter:
      'The component forwards a ref to the underlying `HTMLInputElement` and accepts every native input attribute beyond the ones listed above (e.g. `aria-label`, `id`, `autoFocus`).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Controlled value. Pair with `onChange`.' },
      defaultValue: { description: 'Initial value for uncontrolled usage.' },
      onChange: {
        description:
          'Fires when the value commits (typing a clean number, ±, arrows, blur). `undefined` means the field was emptied.',
      },
      minMax: {
        description:
          'Inclusive bounds. Used for clamping, ± button enablement and the `Home` / `End` shortcuts.',
      },
      step: {
        description:
          'Increment for the ± buttons and arrow keys. Combined with `Shift` (×10) or `Alt` (×0.1) modifiers.',
      },
      precision: {
        description:
          'Decimal places. Enforced on blur via `toFixed`; in-flight typing is left untouched so partials like `"1."` work.',
      },
      controls: { description: 'Render the ± stepper buttons.' },
      wheelStep: {
        description:
          'Opt-in mouse-wheel stepping. Only fires while the input is focused; native page scroll is preserved otherwise.',
      },
      size: { description: 'Visual size — matches `Input`.' },
      error: { description: 'Paint the danger color and set `aria-invalid`.' },
      helperText: {
        description: 'Text rendered below the input. Picks the danger color when `error`.',
      },
      prefix: { description: 'Slot rendered before the input, inside the wrapper border.' },
      suffix: {
        description: 'Slot rendered after the ± controls. Useful for unit labels (`元`, `%`, …).',
      },
      disabledReadOnly: {
        description:
          'Standard native semantics. `disabled` drops the wobble entirely; `readOnly` keeps the value visible but disables ± and key shortcuts.',
      },
      name: {
        description:
          'When set, renders a hidden `<input type="hidden">` mirror so the value participates in native `<form>` submissions.',
      },
      placeholder: { description: 'Native placeholder shown when the input is empty.' },
      wrapperClassName: {
        description: 'Append a class to the outer wrapper for layout overrides.',
      },
      className: { description: 'Append a class to the native `<input>` element.' },
    },
  },
};
