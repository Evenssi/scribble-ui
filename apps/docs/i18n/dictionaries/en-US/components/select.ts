import type { ComponentDoc } from '../../zh-CN';

export const selectEn: ComponentDoc = {
  title: 'Select',
  lede:
    "A hand-drawn dropdown picker. The trigger inherits the Input wrapper look so it sits naturally in forms. The listbox is portalled into `document.body` to escape ancestor overflow, auto-flips above the trigger when there's no room below, and supports full keyboard navigation including typeahead.",
  sections: {
    basic: 'Basic',
    jsxChildren: 'JSX children',
    controlled: 'Controlled',
    sizes: 'Sizes',
    disabled: 'Disabled',
    longList: 'Long list (auto-flip + scroll)',
    error: 'Error + helper text',
    insideForm: 'Inside a form',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Minimal form — pass an `options` array of `{ value, label, disabled? }`. The component tracks state on its own when no `value` prop is given (uncontrolled).',
    jsxChildren:
      'When you need icons, custom rendering, or want children to live next to other JSX, declare options as `<Option>` children instead.',
    controlled:
      'Drive the selected value from React state. The two pickers below share the same state — moving one moves the other.',
    sizes: 'Three sizes that match Input — `sm` / `md` (default) / `lg`.',
    disabled:
      'The *Durian* entry above is disabled — keyboard navigation skips it and clicks are ignored. The whole select can also be disabled.',
    longList:
      "The listbox caps at `280px` tall and scrolls when longer. If there's no room below the trigger it flips above. Open the picker near the bottom of the viewport to see it flip.",
    error: 'Use `error` with `helperText` to surface validation messages.',
    insideForm:
      'Pass `name` and Select renders a hidden input so it participates in standard `<form>` submission.',
  },
  api: {
    headers: { name: 'Prop', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Controlled selected value.' },
      defaultValue: { description: 'Initial value in uncontrolled mode.' },
      onChange: { description: 'Fires when the user picks an option.' },
      options: {
        description: 'Array form. Mutually exclusive with JSX children (children win).',
      },
      placeholder: { description: 'Shown when no value is selected.' },
      size: { description: 'Visual size — matches Input.' },
      disabled: { description: 'Disables the entire select.' },
      error: { description: 'Render with the danger color.' },
      helperText: { description: 'Helper line below the trigger.' },
      name: { description: 'Renders a hidden input so the value submits with a form.' },
      onOpenChange: { description: 'Notified when the listbox opens or closes.' },
    },
  },
};
