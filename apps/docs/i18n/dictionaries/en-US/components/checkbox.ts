import type { ComponentDoc } from '../../zh-CN';

export const checkboxEn: ComponentDoc = {
  title: 'Checkbox',
  lede:
    'A hand-drawn checkbox with a real native `<input>` underneath, so screen readers and form submission keep working. Drop several into a `CheckboxGroup` for shared state and layout.',
  sections: {
    sizes: 'Sizes',
    states: 'States',
    groupVertical: 'Group · vertical',
    groupHorizontal: 'Group · horizontal + group-disabled',
    code: 'Code',
    api: 'API',
    apiCheckbox: 'Checkbox',
    apiGroup: 'CheckboxGroup',
  },
  notes: {
    groupVertical: 'Selected: `{picks}`',
    groupHorizontal:
      'The second group is disabled at the group level — every child reads `disabled` from context.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      // === Checkbox table ===
      cb__size: { description: 'Size preset for both the box and the label.' },
      cb__checked: { description: 'Use one or the other — controlled vs uncontrolled.' },
      cb__indeterminate: {
        description:
          "Visual \"mixed\" state. Written to the DOM via ref since it isn't part of React's controlled props.",
      },
      cb__disabled: { description: 'Standard disabled. Drops the wobble entirely.' },
      cb__value: {
        description: 'Required when the checkbox lives inside a `CheckboxGroup`.',
      },
      cb__onChange: { description: 'Receives the next boolean state plus the raw event.' },
      cb__children: { description: 'Label rendered next to the box.' },

      // === CheckboxGroup table ===
      grp__value: { description: 'Selected values, by child `value`.' },
      grp__onChange: {
        description: 'Fired with the next selection whenever any child toggles.',
      },
      grp__name: {
        description:
          "Forwarded onto every nested input. Children's own `name` is ignored inside a group.",
      },
      grp__disabled: { description: 'Disable every nested checkbox at once.' },
      grp__direction: { description: 'Layout direction.' },
    },
  },
};
