import Link from 'next/link';
import './page.css';

type Item = { href: string; name: string; desc: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: 'General',
    items: [
      {
        href: '/components/button',
        name: 'Button',
        desc: '— wobbly, sticky-note styled call to action.',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        href: '/components/card',
        name: 'Card',
        desc: '— paper or sticky-note surface with optional interactive mode.',
      },
      {
        href: '/components/divider',
        name: 'Divider',
        desc: '— horizontal/vertical separator with solid, dashed or hand-drawn wavy lines.',
      },
    ],
  },
  {
    title: 'Navigation',
    items: [
      {
        href: '/components/tabs',
        name: 'Tabs',
        desc: '— accessible tabbed navigation with underline / card / pill variants and roving-tabindex keyboard nav.',
      },
      {
        href: '/components/breadcrumb',
        name: 'Breadcrumb',
        desc: '— hierarchical trail with items + composition APIs, custom separators and mid-path ellipsis.',
      },
      {
        href: '/components/pagination',
        name: 'Pagination',
        desc: '— data-driven page navigator with smart ellipsis folding, simple / small variants and full a11y.',
      },
      {
        href: '/components/dropdown',
        name: 'Dropdown',
        desc: '— menu overlay with 8 placements, click / hover / contextMenu triggers and roving-tabindex keyboard nav.',
      },
    ],
  },
  {
    title: 'Data Entry',
    items: [
      {
        href: '/components/form',
        name: 'Form',
        desc: '— visual shell for labels, required marks, errors and helpers. Bring your own state (react-hook-form + zod recommended).',
      },
      {
        href: '/components/input',
        name: 'Input',
        desc: '— text field with prefix/suffix slots, clearable, error states.',
      },
      {
        href: '/components/textarea',
        name: 'Textarea',
        desc: '— multi-line input with auto-resize, character count and helper text.',
      },
      {
        href: '/components/numberinput',
        name: 'NumberInput',
        desc: '— numeric field with ± steppers, keyboard ↑/↓ + Shift/Alt modifiers, min/max clamp and precision.',
      },
      {
        href: '/components/select',
        name: 'Select',
        desc: '— portalled listbox dropdown with keyboard nav, typeahead and auto-flip.',
      },
      {
        href: '/components/checkbox',
        name: 'Checkbox',
        desc: '— controlled/uncontrolled, indeterminate, plus a CheckboxGroup helper.',
      },
      {
        href: '/components/radio',
        name: 'Radio',
        desc: '— paired with RadioGroup for shared name, layout and exclusive selection.',
      },
      {
        href: '/components/switch',
        name: 'Switch',
        desc: '— accessible on/off toggle with bouncy thumb and three sizes.',
      },
      {
        href: '/components/slider',
        name: 'Slider',
        desc: '— single or range value picker with marks, sticky-note tooltip, vertical mode and full keyboard nav.',
      },
      {
        href: '/components/datepicker',
        name: 'DatePicker',
        desc: '— calendar dropdown with portalled popup, keyboard month/year nav, min/max disabling and locale labels.',
      },
    ],
  },
  {
    title: 'Data Display',
    items: [
      {
        href: '/components/tag',
        name: 'Tag',
        desc: '— small label with status & sticky-note colors, optional ✕ to remove.',
      },
      {
        href: '/components/avatar',
        name: 'Avatar',
        desc: '— circle/square sticky-note avatar with image fallback and auto initials.',
      },
      {
        href: '/components/badge',
        name: 'Badge',
        desc: '— standalone or wrapper badge with count, dot, max overflow and 4 placements.',
      },
      {
        href: '/components/carousel',
        name: 'Carousel',
        desc: '— hand-drawn content rotator with slide / fade transitions, autoplay, drag and keyboard nav.',
      },
      {
        href: '/components/timeline',
        name: 'Timeline',
        desc: '— vertical event ribbon with left / right / alternate modes and 5 status dots.',
      },
      {
        href: '/components/tooltip',
        name: 'Tooltip',
        desc: '— portalled bubble with hover + focus triggers, auto-flip and click toggle.',
      },
      {
        href: '/components/popover',
        name: 'Popover',
        desc: '— interactive floating panel with title/footer, click-outside dismiss and auto-flip.',
      },
      {
        href: '/components/empty',
        name: 'Empty',
        desc: '— hand-drawn placeholder for blank lists, search misses and first-run states.',
      },
    ],
  },
  {
    title: 'Feedback',
    items: [
      {
        href: '/components/alert',
        name: 'Alert',
        desc: '— static inline feedback strip with 4 variants, closable and banner modes.',
      },
      {
        href: '/components/toast',
        name: 'Toast',
        desc: '— imperative notifications with 6 placements, hover-pause and variants.',
      },
      {
        href: '/components/modal',
        name: 'Modal',
        desc: '— portalled dialog with focus trap, ESC + overlay close, and scroll lock.',
      },
      {
        href: '/components/drawer',
        name: 'Drawer',
        desc: '— side-anchored panel from any edge, with focus trap, scroll lock and slide-in.',
      },
      {
        href: '/components/progress',
        name: 'Progress',
        desc: '— line or circle progress with status colors, labels and indeterminate mode.',
      },
      {
        href: '/components/spinner',
        name: 'Spinner',
        desc: '— ring, dots or hand-drawn pencil loader inheriting currentColor.',
      },
      {
        href: '/components/skeleton',
        name: 'Skeleton',
        desc: '— text/rect/circle loading placeholder with pulse or wave animation.',
      },
      {
        href: '/components/result',
        name: 'Result',
        desc: '— full-page feedback surface for success, failure and HTTP error routes.',
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        href: '/components/backtop',
        name: 'BackTop',
        desc: '— floating back-to-top button with threshold visibility, smooth scroll and scoped containers.',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <article className="home">
      <h1 className="home-title">scribble-ui</h1>
      <p className="home-slogan">
        A hand-drawn React component library — sticky notes meet whiteboard
        sketches.
      </p>

      <p className="home-lede">
        Welcome. This is the documentation for{' '}
        <code className="home-code">scribble-ui</code>, a small React component
        library that prefers warm off-white over corporate blue, asymmetric
        corners over perfect rectangles, and hard offset shadows over Material
        elevation.
      </p>

      <h2 className="home-heading">Components</h2>

      {groups.map((group) => (
        <details key={group.title} className="home-group" open>
          <summary className="home-group-title">
            {group.title}{' '}
            <span className="home-group-count">({group.items.length})</span>
          </summary>
          <ul className="home-component-list">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link className="home-component-link" href={item.href}>
                  {item.name}
                </Link>
                <span className="home-component-desc">{item.desc}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}

      <p className="home-status">
        Day 19 · 34 components shipped · now grouped into 7 categories
        (General · Layout · Navigation · Data Entry · Data Display · Feedback ·
        Other) aligned with Ant Design / Arco conventions.
      </p>
    </article>
  );
}
