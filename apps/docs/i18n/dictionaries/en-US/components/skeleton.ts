import type { ComponentDoc } from '../../zh-CN';

export const skeletonEn: ComponentDoc = {
  title: 'Skeleton',
  lede:
    'A calm placeholder block while real content loads. Skeletons **do not** wobble — a list of them must read as patient, not jittery. Pick `pulse`, `wave`, or `none` based on how busy the surrounding screen is.',
  sections: {
    textSingle: 'Text · single line',
    textMulti: 'Text · multi-line',
    rect: 'Rect',
    circle: 'Circle',
    animation: 'Animation',
    composite: 'Composite · card',
    code: 'Code',
    api: 'API',
  },
  notes: {
    textMulti:
      'When `lines` is greater than 1 the last line shrinks to 60% so it reads as a real paragraph end — unless you pin an explicit `width`.',
    animation:
      'Three animation modes. `pulse` is the default and works well for short loads; `wave` reads better on larger blocks; `none` is the safe fallback for very dense layouts (and is forced on automatically when the user prefers reduced motion).',
    composite:
      'Skeletons compose. Here a circle avatar, two text lines and a rect body together stand in for a content card.',
    pulse: '`pulse`',
    wave: '`wave`',
    none: '`none`',
    apiFooter:
      'The root element is a `<span>` with `role="status"`, `aria-busy="true"` and `aria-live="polite"`, so screen readers announce loading regions without spamming. Refs are forwarded to the underlying element.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      variant: {
        description:
          'Shape preset. `circle` always renders with `border-radius: 50%`; pass equal `width` & `height` for a true circle.',
      },
      width: {
        description: "Numbers are treated as pixels; strings pass through (e.g. `'60%'`, `'12rem'`).",
      },
      height: { description: 'Same units as `width`.' },
      lines: {
        description:
          'Text-only. When greater than 1 renders multiple stacked lines; the last one auto-narrows to 60% unless you pass an explicit `width`.',
      },
      radius: {
        description:
          'Border radius override. Numbers are pixels. `circle` ignores this and stays at 50%.',
      },
      animation: {
        description: "Loading animation. Forced to `'none'` when the user prefers reduced motion.",
      },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
};
