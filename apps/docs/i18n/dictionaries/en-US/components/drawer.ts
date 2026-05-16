import type { ComponentDoc } from '../../zh-CN';

export const drawerEn: ComponentDoc = {
  title: 'Drawer',
  lede:
    "A side-anchored, focus-trapped panel that slides in from any of the four viewport edges. Shares the Modal's scroll lock, focus trap, ESC handling and overlay click rules — only the anchoring + slide-in animation differ. Closes on ESC and overlay click by default; both can be opted out for confirmation flows.",
  sections: {
    placements: 'Placements',
    sizes: 'Sizes',
    headerFooter: 'With header & footer',
    sticky: 'Disable overlay click & ESC',
    code: 'Code',
    api: 'API',
  },
  notes: {
    placements:
      'The `placement` prop picks which viewport edge the drawer hugs. `"left"` and `"right"` drawers fill the viewport vertically and the `size` token controls width; `"top"` and `"bottom"` drawers fill the viewport horizontally and the `size` token controls height.',
    sizes:
      'Three presets per axis. For left/right drawers: `sm` = 300px, `md` = 420px (default), `lg` = 560px width. For top/bottom drawers the numbers map to height instead (200 / 320 / 460px).',
    headerFooter:
      'A string `header` auto-wires `aria-labelledby`, and the `footer` slot lays out action buttons aligned to the right via the same dashed divider used by Modal.',
    sticky:
      'For destructive or otherwise consequential actions, opt out of overlay click and ESC so the user is forced to make an explicit choice. The built-in `✕` and the footer buttons are then the only way to dismiss the drawer.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      open: { description: 'Required. Whether the drawer is rendered.' },
      onClose: { description: 'Required. Fired on ESC, overlay click, or the built-in close button.' },
      placement: { description: 'Which viewport edge the drawer slides in from.' },
      size: { description: 'Width preset for left/right drawers; height preset for top/bottom drawers.' },
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
