import type { ComponentDoc } from '../../zh-CN';

export const inputEn: ComponentDoc = {
  title: 'Input',
  lede:
    'A hand-drawn text input. The visible border lives on the wrapper so prefix / suffix slots sit inside the same wobbly outline as the text. Focus a field to see the wobble level rise.',
  sections: {
    sizes: 'Sizes',
    states: 'States',
    slots: 'With prefix & suffix',
    controlled: 'Controlled & Uncontrolled',
    code: 'Code',
    api: 'Props',
  },
  notes: {
    controlledLive: 'Live value:',
    controlledSubmitted: 'Last submitted:',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      size: { description: 'Visual size — does not map to the native `size` attribute.' },
      error: { description: 'Paint the danger color and set `aria-invalid`.' },
      helperText: {
        description:
          'Text rendered below the input. Picks the danger color when `error`.',
      },
      prefix: { description: 'Slot rendered before the input, inside the wrapper border.' },
      suffix: {
        description:
          'Slot rendered after the input. Wins over `clearable` if both are passed.',
      },
      clearable: {
        description:
          'Show a ✕ affordance whenever the input has a value. Hidden when `suffix` is set.',
      },
      valueAndDefaultValue: { description: 'Use one or the other — controlled vs uncontrolled.' },
      onChange: {
        description: 'Native input change handler. Fires for clear-button clicks too.',
      },
      disabledAndReadOnly: {
        description: 'Standard native semantics. Disabled drops the wobble entirely.',
      },
      wrapperClassName: { description: 'Append a class to the outer wrapper for extra layout overrides.' },
    },
  },
};
