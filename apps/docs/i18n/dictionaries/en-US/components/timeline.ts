import type { TimelineDoc } from '../../zh-CN/components/timeline';

export const timelineEn: TimelineDoc = {
  title: 'Timeline',
  lede:
    'A hand-drawn vertical timeline for change logs, activity feeds and step-by-step flows. Compose with `Timeline.Item` children, colour each node by status, mark in-progress edges with a dashed connector, or flip everything to `alternate` for a two-column story.',
  sections: {
    basic: 'Basic',
    rightAligned: 'Right aligned',
    alternate: 'Alternate',
    customDot: 'Custom dot',
    dashed: 'Dashed connector',
    reverse: 'Reverse order',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Default left-aligned layout. Each item gets a coloured node and an optional `time` line. Strings and numbers passed to `time` are wrapped in `<time>` so assistive tech reads them as timestamps.',
    rightAligned:
      'Flip the rail to the opposite edge with `mode="right"`. Handy when the timeline lives next to a narrow left sidebar, or in RTL-friendly layouts.',
    alternate:
      '`mode="alternate"` parks the rail in the middle and pushes each item to alternating sides — nice for product storytelling or launch recaps where every event deserves its own beat.',
    customDot:
      'Pass any ReactNode to `dot` — an emoji, a letter, a tiny SVG — and it replaces the default coloured disc. The node slot keeps its footprint so sibling items stay aligned.',
    dashed:
      'Mark the edge going down from an item as dashed to signal *in progress* or *upcoming*. Only the connector below the flagged item switches; solid lines stay above.',
    reverse:
      "Set `reverse` to show newest-first visually. The DOM order isn't touched, so screen readers still announce the original authoring order — you just get a reversed view for free.",
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      mode: {
        description:
          "Where the rail (node + connector) sits relative to the body. `'alternate'` centers the rail and alternates items between the left and right sides.",
      },
      reverse: {
        description:
          'Visually flips the order with `flex-direction: column-reverse`. The DOM order is preserved, so screen readers announce the authoring order.',
      },
      as: {
        description:
          'Which list element to render. Default `<ol>` suits chronological lists; switch to `<ul>` for unordered step sets.',
      },
      children: { description: 'Expected to be a list of `<Timeline.Item>` children.' },
      className: { description: 'Extra class names appended after the built-in classes.' },
    },
  },
  apiHeadings: {
    timeline: 'API · Timeline',
    item: 'API · Timeline.Item',
  },
  apiItem: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      time: {
        description:
          'Short time / headline line. Strings and numbers are wrapped in `<time>`; ReactNodes are rendered as-is so callers can control their own markup.',
      },
      children: { description: 'Main body content of the entry.' },
      status: {
        description:
          'Drives the node fill and the colour of the connector line going down from this item. Maps to the matching `--su-color-*` tokens.',
      },
      dot: {
        description:
          'Replaces the default hand-drawn dot with a custom glyph (emoji, letter, small SVG). The node slot keeps its footprint so sibling items stay aligned.',
      },
      dashed: {
        description:
          'Renders the connector *below this item* as dashed instead of solid. Good for marking "in progress" or "upcoming" milestones. No effect on the last item.',
      },
      className: { description: 'Extra class names appended to the item element.' },
      style: { description: 'Inline styles forwarded to the `<li>`.' },
    },
  },
  footerNote:
    'The root element is a semantic list (`<ol>` by default) labelled `aria-label="Timeline"`, so assistive tech announces it as a timeline list. Decorative rails and nodes are marked `aria-hidden`.',
};
