import type { ComponentDoc } from '../../zh-CN';

export const badgeEn: ComponentDoc = {
  title: 'Badge',
  lede:
    'A tiny hand-drawn count, dot or label. Use it standalone, or wrap any element to attach the badge to its corner — perfect for unread counts on avatars, buttons or icons.',
  sections: {
    standalone: 'Standalone',
    wrappingAvatar: 'Wrapping an avatar',
    wrappingButton: 'Wrapping a button',
    colors: 'Colors',
    placement: 'Placement',
    zeroAndControlled: 'Zero handling & controlled count',
    code: 'Code',
    api: 'API',
  },
  notes: {
    standalone:
      'Priority order when multiple content props are passed: `dot > count > content`. Counts above `max` render as `{max}+`.',
    placement:
      "The badge floats on the chosen corner via `translate(±50%, ±50%)` so it overlaps the anchor's outline by half its own size.",
    zeroSplit:
      'Left: `count=0` hides the badge. Right: `showZero` keeps it visible.',
    zeroControlled:
      'Click the buttons — when count drops to `0` the badge disappears (children stay).',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      count: {
        description: 'Numeric badge. Hidden when `0` unless `showZero` is true.',
      },
      max: {
        description:
          'Cap for the displayed count. Values above the cap render as `{max}+`.',
      },
      showZero: { description: 'Render the badge even when `count === 0`.' },
      dot: {
        description:
          'Render a small filled dot with no text. Wins over `count` and `content`.',
      },
      content: {
        description:
          'Custom content (e.g. `"NEW"`) shown when `dot` and `count` are both absent.',
      },
      color: {
        description:
          'Background tint. Defaults to red — the canonical notification look.',
      },
      placement: {
        description:
          'Corner of the wrapped element the badge attaches to. Ignored without children.',
      },
      children: {
        description:
          'When provided, the badge floats on the chosen corner of `children`; otherwise it renders inline on its own.',
      },
      className: { description: 'Extra class names appended to the outer element.' },
    },
  },
};
