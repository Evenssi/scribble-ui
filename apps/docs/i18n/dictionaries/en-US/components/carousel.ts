import type { ComponentDoc } from '../../zh-CN';

export const carouselEn: ComponentDoc = {
  title: 'Carousel',
  lede:
    'A hand-drawn content rotator. Drag it, arrow-key it, let it autoplay — every transition, every indicator and every arrow runs on the same sticky-note tokens you already have, no per-instance styling needed.',
  sections: {
    basic: 'Basic',
    autoplay: 'Autoplay & pause-on-hover',
    fade: 'Fade transition',
    indicators: 'Indicator shapes',
    bounded: 'Bounded (loop = false)',
    arrowPlacement: 'Arrow placement',
    dragKeyboard: 'Drag & keyboard',
    controlled: 'Controlled',
    code: 'Code',
    api: 'API',
  },
  notes: {
    basic:
      'Default `slide` transition with dot indicators and inside arrows. Four sticky-note slides, 16∶9 viewport.',
    autoplay:
      'Auto-advances every 2.5 s. Hover the viewport (or focus it with Tab) and the timer pauses until your pointer / focus leaves. Autoplay also pauses while dragging and when the page tab is hidden.',
    fade:
      'Cross-fade instead of sliding. Useful for hero imagery where each slide is visually distinct.',
    indicators:
      'Three shapes: `dot` (default), `dash` and `number`. Numbers render as a sticky-note fraction badge.',
    bounded:
      'With `loop` turned off, prev / next buttons visibly disable at the edges and autoplay stops when the last slide is reached.',
    arrowPlacement:
      '`inside` overlays arrows on the viewport; `outside` hugs the left / right gutter so the image stays unobstructed.',
    dragKeyboard:
      'Press-and-drag the viewport left or right — passing ~40 px or a brisk flick commits the change, otherwise the track rubber-bands back. Tab onto the carousel and use ← / → to step, Home / End to jump.',
    controlled:
      'Drive the active slide from outside. Combine with autoplay disabled for full control, or leave autoplay on and treat external updates as overrides.',
    apiFooter:
      'The component forwards a ref to the underlying `HTMLDivElement` root and accepts native `aria-*` / `data-*` attributes.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      items: {
        description:
          "Required. Each item has `key`, `content` and an optional `alt` used as the slide's accessible label.",
      },
      activeIndex: { description: 'Controlled current slide index.' },
      defaultIndex: { description: 'Uncontrolled initial index.' },
      onChange: { description: 'Fires whenever the active slide changes.' },
      autoplay: { description: 'Auto-advance on a timer.' },
      interval: { description: 'Autoplay interval in milliseconds. Minimum 400 ms.' },
      pauseOnHover: { description: 'Pause autoplay while pointer hovers the carousel.' },
      loop: {
        description:
          'When `false`, prev / next disable at the edges and autoplay stops on the last slide.',
      },
      showArrows: { description: 'Render prev / next arrow buttons.' },
      showIndicators: { description: 'Render the indicator strip below the viewport.' },
      indicatorShape: { description: 'Shape of each indicator.' },
      arrowPlacement: {
        description: 'Whether arrows overlay the viewport or hug the outer gutter.',
      },
      transition: { description: 'How slides swap.' },
      aspectRatio: { description: 'CSS aspect-ratio applied to the viewport.' },
      height: { description: 'Fixed height. Takes precedence over `aspectRatio`.' },
      draggable: { description: 'Mouse / touch drag to switch slides.' },
      keyboard: { description: 'Enable ← / → / Home / End when focused.' },
      ariaLabel: {
        description: 'a11y label for the `role="region"` wrapping the whole widget.',
      },
      className: { description: 'Extra class names appended to the root element.' },
    },
  },
};
