import type { ComponentDoc } from '../../zh-CN';

export const modalEn: ComponentDoc = {
  title: 'Modal',
  lede:
    'A centered, focus-trapped dialog that portals into `document.body`. ESC and overlay click close it by default; both can be opted out for confirmation flows. The first focusable element inside the panel is auto-focused on open, and focus is restored on close.',
  sections: {
    basic: 'Basic',
    sizes: 'Sizes',
    confirm: 'Confirmation (sticky)',
    customHeader: 'Custom header (ReactNode)',
    formInside: 'With a form (focus trap)',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      "The minimum viable Modal: pass a string `header` (which becomes the dialog's accessible name automatically), some body content, and wire `open` + `onClose`.",
    sizes:
      'Three width presets: `sm` (360px), `md` (520px, default) and `lg` (720px). Padding and shadow weight scale with the size.',
    confirm:
      'For destructive or otherwise consequential actions, opt out of overlay click and ESC so the user is forced to make an explicit choice via a footer button.',
    customHeader:
      'A string `header` auto-wires `aria-labelledby`. When you pass a `ReactNode` instead, supply the id yourself so screen readers still announce a name.',
    formInside:
      'The first focusable element inside the panel is auto-focused on open — here, the `Input`. Tab moves to the buttons and loops back; Shift+Tab loops the other way. Focus is restored to the trigger when the dialog closes.',
    formInsideDraft: 'Current draft:',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      open: { description: 'Required. Whether the dialog is rendered.' },
      onClose: { description: 'Required. Fired on ESC, overlay click, or the built-in close button.' },
      size: { description: 'Width preset. Also bumps padding and shadow weight.' },
      header: {
        description: 'Slot above the body. A `string` becomes an `<h2>` with auto-wired `aria-labelledby`.',
      },
      footer: { description: 'Slot below the body — typically right-aligned action buttons.' },
      showCloseButton: { description: 'Render the built-in `✕` button in the top-right corner.' },
      closeOnOverlayClick: { description: 'Close when the dimmed backdrop is clicked.' },
      closeOnEscape: { description: 'Close when the user presses Esc.' },
      ariaLabelledby: { description: 'Override the auto-wired id derived from a string `header`.' },
      ariaDescribedby: { description: 'Optional id for a body element used as the description.' },
      className: { description: 'Extra class names appended to the panel.' },
    },
  },
};
