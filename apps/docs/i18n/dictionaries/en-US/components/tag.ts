import type { ComponentDoc } from '../../zh-CN';

export const tagEn: ComponentDoc = {
  title: 'Tag',
  lede:
    "A small hand-drawn label for status, taxonomy or filter chips. By default tags stay calm — they keep a single wobble level so a list of them doesn't dance. Add `closable` for an inline ✕ button that fires `onClose`.",
  sections: {
    colors: 'Colors',
    sizes: 'Sizes',
    iconsClosable: 'Icons & closable',
    controlled: 'Controlled removal',
    code: 'Code',
    api: 'API',
  },
  notes: {
    controlled: 'Click ✕ on any tag — it removes the entry from local state.',
    controlledEmpty: 'All tags removed — refresh to reset.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      color: {
        description:
          'Background tint. Status colors use the system palette; named colors use the sticky-note palette.',
      },
      size: { description: 'Size preset.' },
      icon: { description: 'Inline icon rendered before the label.' },
      closable: { description: 'Render a ✕ button after the label.' },
      onClose: { description: 'Fired when the close button is activated.' },
      disabled: { description: 'Calms the tag and disables both click handlers.' },
      onClick: { description: 'Fired on the tag body (not on the close button).' },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
