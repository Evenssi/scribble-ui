import type { ComponentDoc } from '../../zh-CN';

export const alertEn: ComponentDoc = {
  title: 'Alert',
  lede:
    'A static, inline feedback strip that sits where you drop it on the page. Reach for Alert when a message should persist — "your plan expires in 3 days", "this form has 2 errors". For transient, system-driven pop-ups with auto-dismiss, use `Toast` instead.',
  sections: {
    variants: 'Variants',
    titleOnly: 'Title only',
    descriptionOnly: 'Description only',
    customNoIcon: 'Custom & no icon',
    closableUncontrolled: 'Closable (uncontrolled)',
    closableControlled: 'Closable (controlled)',
    banner: 'Banner',
    code: 'Code',
    api: 'API',
  },
  notes: {
    variants:
      'Four semantic variants, four hand-drawn glyphs. Each variant injects its accent (left stripe + icon) and note-style surface through component-scoped custom properties.',
    titleOnly: 'Skip the description for a single-line, glanceable alert.',
    descriptionOnly:
      'Without a `title`, the body reads as a calm note — handy for inline contextual hints near a form field.',
    customNoIcon:
      'Swap the built-in glyph with your own, or pass `icon={false}` to remove the icon slot entirely when the alert sits next to something visually loud already.',
    closableUncontrolled:
      'Add `closable` for a ✕ button in the top-right corner. By default the alert manages its own visibility — click ✕ and it unmounts itself.',
    closableControlled:
      "Pass `visible` to take full control of the alert's lifecycle — useful when the same message needs to come back after a retry or a route change.",
    banner:
      '`banner` strips the rounded corners, the hard offset shadow and the wobble filter — the alert becomes a flush full-bleed strip you can pin to the top of a page or layout region.',
    apiFooter:
      'The component forwards a ref to the underlying `HTMLDivElement` and accepts every native div attribute (`id`, `aria-*`, `data-*`, etc.).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      variant: {
        description:
          'Visual variant. Drives the accent color (left stripe + icon) and the note-style background. Also picks the ARIA role: `warning | error` render as `role="alert"`, the other two as `role="status"`.',
      },
      title: { description: 'Bold heading rendered on the first line.' },
      children: {
        description:
          'Description body. When a `title` is also provided the two stack vertically.',
      },
      icon: {
        description:
          "Custom leading icon. Pass `false` to suppress the icon slot entirely. When unset, the variant's built-in glyph is rendered.",
      },
      closable: { description: 'Show a ✕ close button in the top-right corner.' },
      visible: {
        description:
          'Controlled visibility. When provided the component stops managing its own dismissal; pass `false` to hide the alert.',
      },
      onClose: { description: 'Fired when the close button is activated.' },
      closeAriaLabel: { description: 'Accessible label for the close button.' },
      banner: {
        description:
          'Full-bleed strip mode — drops rounded corners, shadow and the wobble filter.',
      },
      className: {
        description: 'Extra class names appended after the built-in classes.',
      },
    },
  },
};
