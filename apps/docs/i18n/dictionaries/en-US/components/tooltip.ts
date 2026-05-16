import type { ComponentDoc } from '../../zh-CN';

export const tooltipEn: ComponentDoc = {
  title: 'Tooltip',
  lede:
    'A small floating bubble that describes its trigger. Portals into `document.body`, auto-flips when there is not enough room, and ships with hover + focus triggers by default so it works for both pointer and keyboard users out of the box.',
  sections: {
    basic: 'Basic',
    placement: 'Placement',
    triggers: 'Triggers',
    delay: 'Delay',
    controlled: 'Controlled',
    disabledTrigger: 'Disabled trigger',
    longContent: 'Long content',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Wrap any focusable element. Hover or focus the trigger to see the bubble; press `Esc` to dismiss it.',
    placement:
      'Four placements: `top` (default), `bottom`, `left` and `right`. The bubble auto-flips to the opposite side when it would overflow the viewport.',
    triggers:
      "Default is `['hover', 'focus']`. Use `'click'` for a toggle (click the trigger to open, click again to close, press `Esc` to dismiss). `'manual'` turns off all built-in triggers — combine with `open` and `onOpenChange` for fully controlled behavior.",
    delay:
      "`openDelay` defaults to 100ms — short enough that intentional hovers feel instant, long enough that drive-by mouse movements don't flicker the page. `closeDelay` defaults to 0; bump it if you want users to be able to drift off the trigger and back without the bubble disappearing.",
    controlled:
      'Pass `open` + `onOpenChange` to drive the tooltip from your own state. Useful for tutorials, onboarding, or whenever you want to programmatically force a tip open.',
    controlledState: 'State:',
    disabledTrigger:
      'Native disabled buttons swallow pointer events, so a tooltip attached directly to one would never open. Set `wrapDisabledTrigger` to wrap the trigger in a `span` that captures events on its behalf.',
    longContent:
      'Bubbles soft-cap at `max-width: 280px` and wrap. Keep tooltip text short — for paragraphs, reach for a Modal or a Card instead.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      content: {
        description:
          "Required. The bubble's body. A falsy value (`null` / `undefined` / `false`) disables the tooltip without unmounting the trigger.",
      },
      children: {
        description:
          'Required. A single React element that will receive the injected ref, event handlers and `aria-describedby`.',
      },
      placement: { description: 'Preferred side. Auto-flips to the opposite side when needed.' },
      trigger: {
        description:
          "Which interactions open the tooltip. `'manual'` turns them all off — pair with `open` for full control.",
      },
      openDelay: { description: 'Milliseconds to wait before opening (set 0 for instant).' },
      closeDelay: { description: 'Milliseconds to wait before closing (set >0 for sticky).' },
      open: { description: 'Controlled open state. Pair with `onOpenChange`.' },
      onOpenChange: { description: 'Fires for every open/close attempt (controlled or not).' },
      defaultOpen: { description: 'Initial state in uncontrolled mode.' },
      wrapDisabledTrigger: {
        description: 'Wrap the trigger in a `span` so events fire even when the inner element is `disabled`.',
      },
      offset: { description: 'Pixels between the trigger edge and the bubble.' },
      className: { description: 'Extra class names appended to the bubble.' },
    },
  },
};
