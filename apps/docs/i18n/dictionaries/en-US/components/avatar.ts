import type { ComponentDoc } from '../../zh-CN';

export const avatarEn: ComponentDoc = {
  title: 'Avatar',
  lede:
    'A small hand-drawn portrait tile. Renders an image when `src` succeeds, gracefully falls back to a custom node, derived initials, or a generic placeholder. Background colors come from the same sticky-note palette as Tag.',
  sections: {
    sizes: 'Sizes',
    shapes: 'Shapes',
    colors: 'Colors',
    imageWithFallback: 'Image with graceful fallback',
    customFallback: 'Custom fallback',
    autoDerived: 'Auto-derived initials & color',
    code: 'Code',
    api: 'API',
  },
  notes: {
    sizes:
      'xs · 24 · sm · 32 · md · 40 · lg · 56 · xl · 72 (px). The font size scales with the tile so two-letter initials always fit.',
    shapes:
      'Square avatars use the asymmetric `--su-radius-card` so they keep the hand-drawn off-axis feel.',
    colors:
      'Pass `color` to pin a hue, or omit it and let Avatar derive a stable color from `name`.',
    imageWithFallback:
      'The first avatar loads a real image. The next two point at a domain that will never resolve — Avatar catches the `onError` and falls back to the initials of the provided `name`, keeping the layout stable.',
    customFallback:
      'Pass any `ReactNode` to `fallback` for iconographic avatars (bots, anonymous users, …). The third tile shows the built-in placeholder when no source at all is given.',
    autoDerived:
      'With only a `name`, Avatar takes the first letter of the first two words and picks a sticky-note color via a stable `charCodeAt` hash — the same name always renders the same hue.',
    apiFooter:
      'Forwards a ref to the underlying `HTMLSpanElement` and accepts every native span attribute (`aria-*`, `data-*`, `onClick`, …).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      src: {
        description:
          'Image URL. On `onError` the avatar swaps to the fallback chain automatically.',
      },
      alt: {
        description:
          'Accessible label and a fallback source for derived initials. The wrapper carries the label so screen readers announce it once.',
      },
      initials: {
        description: 'Explicit initial letters. Capped at 2 characters and uppercased.',
      },
      name: {
        description:
          'Source for auto-derived initials and the stable color hash. Same name → same color, every render.',
      },
      fallback: {
        description:
          'Custom fallback node (icon, etc.). Wins over initials when the image is absent or fails.',
      },
      size: { description: 'Tile size: 24 / 32 / 40 / 56 / 72 px.' },
      shape: { description: '`square` uses the asymmetric `--su-radius-card`.' },
      color: {
        description:
          'Sticky-note background tint. When omitted, derived from `name` via a stable hash.',
      },
      className: {
        description: 'Extra class names appended after the built-in classes.',
      },
    },
  },
};
