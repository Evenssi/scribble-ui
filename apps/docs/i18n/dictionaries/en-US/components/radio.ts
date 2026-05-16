import type { RadioDoc } from '../../zh-CN/components/radio';

export const radioEn: RadioDoc = {
  title: 'Radio',
  lede:
    'A hand-drawn radio button with a real native `<input type="radio">` underneath. Drop a few of them into a `RadioGroup` for shared `name`, layout and selection state — keyboard arrow navigation works out of the box.',
  sections: {
    sizes: 'Sizes',
    states: 'States',
    groupVertical: 'Group · vertical (controlled)',
    groupHorizontal: 'Group · horizontal + group-disabled',
    code: 'Code',
    api: 'API',
  },
  notes: {
    selected: 'Selected:',
    groupHorizontal:
      'The second group is disabled at the group level — every child reads `disabled` from context.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      size: { description: 'Size preset for both the box and the label.' },
      value: { description: 'Required. Identifies this option for the group / native input.' },
      name: {
        description:
          "Required when standalone. Inside a `RadioGroup` the group's `name` wins.",
      },
      checkedDefaultChecked: {
        description: 'Standalone controlled / uncontrolled. Ignored inside a group.',
      },
      disabled: { description: 'Standard disabled. Drops the wobble entirely.' },
      onChange: { description: 'Receives the next boolean state plus the raw event.' },
      children: { description: 'Label rendered next to the dot.' },
    },
  },
  apiHeadings: {
    radio: 'Radio',
    radioGroup: 'RadioGroup',
  },
  apiRadioGroup: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      name: {
        description:
          'Required. Forwarded onto every nested input — also gives keyboard arrow nav for free.',
      },
      valueDefaultValue: { description: 'Selected value. Use one or the other.' },
      onChange: {
        description: 'Fired with the new value whenever a child becomes selected.',
      },
      disabled: { description: 'Disable every nested radio at once.' },
      direction: { description: 'Layout direction.' },
    },
  },
};
