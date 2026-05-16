import type { ComponentDoc } from '../../zh-CN';

export const resultEn: ComponentDoc = {
  title: 'Result',
  lede:
    'A full-page feedback surface for the moment after an action or a route resolves — success, failure, warning, or the classic HTTP error pages. Heavier than `Empty`: Result leads with a large hand-drawn status glyph so the outcome is impossible to miss.',
  sections: {
    basic: 'Basic',
    statusVariants: 'Status variants',
    httpErrors: 'HTTP error pages',
    extraContent: 'With extra & supplementary content',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'The default composition: a status glyph, a title, a sub-title, and an action row with one or two buttons.',
    statusVariants:
      'Four semantic outcomes, four hand-drawn glyphs. Each variant injects its accent through a component-scoped custom property so the glyph and the HTTP-code frames stay in sync with the status.',
    httpErrors:
      'Classic 404 / 403 / 500 screens render the code itself as a hand-written tear-out on a dashed frame — it reads as a page note rather than a glyph, which is exactly the vibe for an error route.',
    extraContent:
      'Drop additional content as `children` — a sticky-note surface slides in below the action row. Good for error details, a "what to do next" checklist, or a short code snippet the support team can copy.',
    apiFooter:
      'The component also forwards a ref to the underlying `HTMLDivElement` and accepts every native div attribute (`id`, `aria-*`, `data-*`, etc.). The root element carries `role="status"` and `aria-live="polite"` so screen readers announce the outcome without interrupting the user.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      status: {
        description:
          'Result status. Drives the built-in icon and the accent color applied to the glyph, dashed frame and any status-aware children.',
      },
      icon: {
        description: 'Custom icon. When provided it replaces the built-in SVG for the current `status`.',
      },
      title: {
        description: 'Required. The main outcome message. Rendered as a heading.',
      },
      subTitle: { description: 'Optional descriptive line shown below the title.' },
      extra: {
        description:
          'Action slot — typically one or two `<Button>`s (primary + secondary). Rendered as a centered row.',
      },
      children: {
        description:
          'Supplementary content rendered on a sticky-note surface below the action row. Only rendered when truthy.',
      },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
