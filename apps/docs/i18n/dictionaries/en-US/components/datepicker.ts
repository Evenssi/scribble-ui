import type { ComponentDoc } from '../../zh-CN';

export const datepickerEn: ComponentDoc = {
  title: 'DatePicker',
  lede:
    "A hand-drawn single-day picker. The trigger inherits the Input wrapper look so it sits naturally in forms; the calendar popup is portalled into `document.body`, auto-flips when there's no room below, and supports full keyboard navigation. Zero external dependencies — built on the native `Date` object.",
  sections: {
    basic: 'Basic',
    sizes: 'Sizes',
    states: 'States',
    bounds: 'Bounds & disabled days',
    format: 'Format',
    controlled: 'Controlled',
    inForm: 'Inside a form',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic: 'Minimal usage — uncontrolled. The component tracks its own state when no `value` prop is given.',
    sizes: 'Three sizes that match Input — `sm` / `md` (default) / `lg`.',
    states: 'Default, disabled, read-only, error + helper text, and the built-in `clearable` ✕ button (visible whenever a value is selected).',
    bounds:
      'Use `minDate` / `maxDate` for hard bounds, or `disabledDate` for arbitrary rules. The two are OR-ed — a day is disabled if any of them says so. The second picker below disables weekends.',
    format:
      'The MVP token set is intentionally tiny: `YYYY`, `MM`, `DD`. Other characters pass through, so any combination of these three works.',
    controlled: 'Drive the value from React state. Use the buttons to set or clear the date externally; the picker stays in sync.',
    inForm:
      'Pass `name` and DatePicker renders a hidden input with an ISO `YYYY-MM-DD` string so it participates in standard `<form>` submission.',
  },
  api: {
    headers: { name: 'Prop', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      value: { description: 'Controlled selected date.' },
      defaultValue: { description: 'Initial value in uncontrolled mode.' },
      onChange: { description: 'Fires when the user picks a date or clears the field.' },
      minDate: { description: 'Hard lower bound (inclusive).' },
      maxDate: { description: 'Hard upper bound (inclusive).' },
      disabledDate: { description: 'Custom predicate. OR-ed with `minDate` / `maxDate`.' },
      format: { description: 'Display format. Tokens: `YYYY`, `MM`, `DD`. Other characters pass through.' },
      placeholder: { description: 'Trigger placeholder when no value is selected.' },
      size: { description: 'Visual size — matches Input.' },
      disabled: { description: 'Disable the entire picker.' },
      readOnly: { description: 'Mark the trigger read-only — the popup still opens but clicking a day does not change the value.' },
      error: { description: 'Render in danger color.' },
      helperText: { description: 'Helper line under the trigger.' },
      clearable: { description: 'Show a ✕ button to clear the value.' },
      weekStartsOn: { description: 'First day of week (0 = Sunday, 1 = Monday).' },
      locale: { description: 'Override weekday / month / button labels. Defaults to a bundled Chinese label set.' },
      showToday: { description: 'Show a "Today" shortcut at the bottom of the popup.' },
      name: { description: 'Renders a hidden input that submits ISO `YYYY-MM-DD` with native form posts.' },
      onOpenChange: { description: 'Notified when the popup opens or closes.' },
    },
  },
};
