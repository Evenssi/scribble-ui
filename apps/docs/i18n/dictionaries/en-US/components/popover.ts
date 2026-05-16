import type { ComponentDoc } from '../../zh-CN';

export const popoverEn: ComponentDoc = {
  title: 'Popover',
  lede:
    "A floating, interactive panel anchored to a trigger. Sibling to `Tooltip`, but built for rich content: forms, action rows, links — anything the user needs to actually click or type into. Portals into `document.body`, auto-flips on overflow, and dismisses on click-outside / `Esc`.",
  sections: {
    basic: 'Basic',
    titleFooter: 'Title & footer',
    triggers: 'Trigger modes',
    placement: 'Placement, arrow & disabled trigger',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      "Default trigger is `'click'`. Click the button to open the popover; click outside or press `Esc` to dismiss.",
    titleFooter:
      'Pass `title` and `footer` to render the three classic regions of a small dialog. The title is wired to the popover via `aria-labelledby` for screen readers automatically.',
    confirms: 'Confirms so far:',
    triggers:
      "Default is `'click'` — heavier than Tooltip's hover default because popover content is interactive. `'hover'` mode includes a grace period (`closeDelay`, default `150ms`) so users can drift between the trigger and the surface without it slamming shut. Use `'manual'` with `open` + `onOpenChange` for fully controlled behavior.",
    controlledState: 'Controlled state:',
    placement:
      'Four placements: `top`, `bottom` (default), `left`, `right`. The popover auto-flips when there is not enough room. Set `showArrow={false}` to drop the arrow for a cleaner card look. For triggers with the native `disabled` attribute, set `wrapDisabledTrigger` so events fire on a wrapper `span`.',
    apiFooter:
      'The popover root has `role="dialog"` and `aria-modal={false}` — it is intentionally *not* a focus trap. Tab through content naturally; if focus leaves to a non-trigger element, the popover closes.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      content: {
        description:
          'Required. The interactive body of the popover. A falsy value (`null` / `undefined` / `false`) disables the popover without unmounting the trigger.',
      },
      title: {
        description:
          'Optional header. When present, the popover root is labelled by it via `aria-labelledby`.',
      },
      footer: { description: 'Optional footer slot, typically a row of action buttons.' },
      children: {
        description:
          'Required. A single React element that will receive the injected ref, event handlers, and `aria-haspopup` / `aria-expanded` / `aria-controls`.',
      },
      trigger: {
        description:
          "Which interactions open the popover. `'manual'` turns them all off — pair with `open` for full control.",
      },
      placement: {
        description: 'Preferred side. Auto-flips to the opposite side when needed.',
      },
      offset: { description: 'Pixels between the trigger edge and the popover surface.' },
      open: { description: 'Controlled open state. Pair with `onOpenChange`.' },
      defaultOpen: { description: 'Initial state in uncontrolled mode.' },
      onOpenChange: { description: 'Fires for every open/close attempt (controlled or not).' },
      closeOnEsc: { description: 'Close when the user presses Escape.' },
      closeOnClickOutside: {
        description:
          'Close when the user clicks outside both trigger and popover. Listens on `mousedown` so internal click handlers always run first.',
      },
      showArrow: { description: 'Whether to render the hand-drawn arrow pointing at the trigger.' },
      openDelay: {
        description:
          'Hover-mode delay before opening, in milliseconds. Click trigger ignores this for snappy feedback.',
      },
      closeDelay: {
        description:
          'Hover-mode delay before closing — the "grace period" that lets users drift onto the popover surface.',
      },
      wrapDisabledTrigger: {
        description:
          'Wrap the trigger in a `span` so events fire even when the inner element is `disabled`.',
      },
      className: { description: 'Extra class names appended to the popover root.' },
    },
  },
};
