import type { ComponentDoc } from '../../zh-CN';

export const buttonEn: ComponentDoc = {
  title: 'Button',
  lede:
    'A hand-drawn looking button. Hover to feel the wobble level rise, press it to peak — every visual is driven by tokens and the shared SVG filter, no per-component styling required.',
  sections: {
    variantsAndSizes: 'Variants & sizes',
    colors: 'Colors',
    states: 'States',
    withIcons: 'With icons',
    blockAndInteractive: 'Block & interactive loading',
    code: 'Code',
    api: 'API',
  },
  notes: {
    colors:
      'Status variants reuse the same palette as Tag & status surfaces, so a destructive action looks unmistakably destructive without any custom styling.',
    blockAndInteractive:
      'Click the button — it flips to a loading state for 1.5s and ignores extra clicks while busy.',
    apiFooter:
      'The component also forwards a ref to the underlying `HTMLButtonElement` and accepts every native button attribute (`type`, `aria-*`, `data-*`, etc.).',
  },
  api: {
    headers: {
      name: 'Name',
      type: 'Type',
      default: 'Default',
      description: 'Description',
    },
    rows: {
      variant: {
        description:
          "Visual variant. `'primary'` uses the brand green; the four status variants reuse the shared status palette so the button reads semantically without extra styling.",
      },
      size: {
        description: 'Size preset. md is recommended for most call-to-actions.',
      },
      loading: {
        description:
          'Shows a spinner in place of the icon and blocks click handlers. Sets `aria-busy="true"`.',
      },
      icon: {
        description:
          'Inline icon rendered next to the label. Replaced by the spinner while loading.',
      },
      iconPosition: {
        description: 'Position of the icon relative to the label.',
      },
      block: {
        description: 'Stretch to the full width of the parent container.',
      },
      disabled: {
        description:
          'Standard HTML disabled attribute. Also sets `aria-disabled`.',
      },
      onClick: {
        description: 'Click handler. Suppressed while `loading` is true.',
      },
      className: {
        description: 'Extra class names appended after the built-in classes.',
      },
    },
  },
};
