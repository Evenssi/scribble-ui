import type { ComponentDoc } from '../../zh-CN';

export const backtopEn: ComponentDoc = {
  title: 'BackTop',
  lede:
    'A floating button that scrolls its target back to the top. Portals into the host (or a scoped container), fades in once the scroll distance crosses a configurable threshold, and runs an easeOutCubic ride back to 0 — with `prefers-reduced-motion` respected.',
  sections: {
    intro: 'Heads up',
    default: 'Default',
    customThreshold: 'Custom threshold',
    customContent: 'Custom content',
    scopedContainer: 'Scoped container',
    code: 'Code',
    api: 'API',
    fillerScroll: 'Scroll filler',
    fillerBottom: 'Bottom filler',
  },
  notes: {
    intro:
      'Scroll down at least **400 pixels** to see the default BackTop appear in the bottom-right corner of the page.',
    default:
      'Drop `<BackTop />` anywhere in your tree. It portals to `document.body` and listens on `window`.',
    defaultDemo:
      'Default threshold is 400px. Click handler fires before the scroll animation starts, so consumers can instrument or cancel the behavior via `event.preventDefault()`.',
    customThreshold:
      "Lower `visibilityHeight` to reveal the button sooner — handy on short pages where 400px would never fire. This second instance is offset to the left so it doesn't overlap the default one.",
    customThresholdDemo:
      'The orange-note button below appears after just 200px of scrolling.',
    customContent:
      'Pass children to replace the default hand-drawn arrow. Text, emoji, and full SVGs all work — the button owns the size and filter so custom content stays on-brand.',
    customContentDemo:
      'Look for a button labelled `TOP` further up-left from the defaults.',
    scopedContainer:
      'Bind BackTop to a custom scroll container by passing both `target` (the element to watch + scroll) and `container` (the portal host — must have `position: relative`). The button then lives inside the pane and uses `position: absolute`.',
    apiFooter:
      'Scroll back up to watch the BackTop buttons fade out once you cross back under their thresholds.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      visibilityHeight: {
        description:
          'Scroll distance (px) at which the button fades in. Below the threshold the button is visually hidden and removed from the tab order.',
      },
      target: {
        description:
          'Returns the element to watch and scroll. Stable for the lifetime of the mount; swapping it at runtime requires a remount.',
      },
      onClick: {
        description:
          'Fires *before* the scroll animation begins. Call `e.preventDefault()` to skip the built-in scroll and run your own.',
      },
      duration: {
        description:
          'Scroll animation duration in milliseconds. Users with `prefers-reduced-motion: reduce` always get an instant jump.',
      },
      children: { description: 'Replace the default hand-drawn up arrow.' },
      right: { description: "Horizontal offset from the container's right edge." },
      bottom: { description: "Vertical offset from the container's bottom edge." },
      container: {
        description:
          'Portal host. When not the body, the button switches to `position: absolute` so offsets resolve against the custom container — which therefore needs `position: relative`.',
      },
      'aria-label': { description: 'Accessible name for the icon-only button.' },
      className: { description: 'Extra class names appended to the button.' },
      style: {
        description:
          'Inline style applied to the button. `right` and `bottom` props override matching keys.',
      },
    },
  },
};
