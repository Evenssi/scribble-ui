import Link from 'next/link';
import './page.css';

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
      <ul className="home-component-list">
        <li>
          <Link className="home-component-link" href="/components/button">
            Button
          </Link>
          <span className="home-component-desc">
            — wobbly, sticky-note styled call to action.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/input">
            Input
          </Link>
          <span className="home-component-desc">
            — text field with prefix/suffix slots, clearable, error states.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/card">
            Card
          </Link>
          <span className="home-component-desc">
            — paper or sticky-note surface with optional interactive mode.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/tag">
            Tag
          </Link>
          <span className="home-component-desc">
            — small label with status & sticky-note colors, optional ✕ to remove.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/checkbox">
            Checkbox
          </Link>
          <span className="home-component-desc">
            — controlled/uncontrolled, indeterminate, plus a CheckboxGroup helper.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/radio">
            Radio
          </Link>
          <span className="home-component-desc">
            — paired with RadioGroup for shared name, layout and exclusive selection.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/modal">
            Modal
          </Link>
          <span className="home-component-desc">
            — portalled dialog with focus trap, ESC + overlay close, and scroll lock.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/tooltip">
            Tooltip
          </Link>
          <span className="home-component-desc">
            — portalled bubble with hover + focus triggers, auto-flip and click toggle.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/select">
            Select
          </Link>
          <span className="home-component-desc">
            — portalled listbox dropdown with keyboard nav, typeahead and auto-flip.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/switch">
            Switch
          </Link>
          <span className="home-component-desc">
            — accessible on/off toggle with bouncy thumb and three sizes.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/textarea">
            Textarea
          </Link>
          <span className="home-component-desc">
            — multi-line input with auto-resize, character count and helper text.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/divider">
            Divider
          </Link>
          <span className="home-component-desc">
            — horizontal/vertical separator with solid, dashed or hand-drawn wavy lines.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/toast">
            Toast
          </Link>
          <span className="home-component-desc">
            — imperative notifications with 6 placements, hover-pause and variants.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/avatar">
            Avatar
          </Link>
          <span className="home-component-desc">
            — circle/square sticky-note avatar with image fallback and auto initials.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/badge">
            Badge
          </Link>
          <span className="home-component-desc">
            — standalone or wrapper badge with count, dot, max overflow and 4 placements.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/skeleton">
            Skeleton
          </Link>
          <span className="home-component-desc">
            — text/rect/circle loading placeholder with pulse or wave animation.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/spinner">
            Spinner
          </Link>
          <span className="home-component-desc">
            — ring, dots or hand-drawn pencil loader inheriting currentColor.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/progress">
            Progress
          </Link>
          <span className="home-component-desc">
            — line or circle progress with status colors, labels and indeterminate mode.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/popover">
            Popover
          </Link>
          <span className="home-component-desc">
            — interactive floating panel with title/footer, click-outside dismiss and auto-flip.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/drawer">
            Drawer
          </Link>
          <span className="home-component-desc">
            — side-anchored panel from any edge, with focus trap, scroll lock and slide-in.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/tabs">
            Tabs
          </Link>
          <span className="home-component-desc">
            — accessible tabbed navigation with underline / card / pill variants
            and roving-tabindex keyboard nav.
          </span>
        </li>
      </ul>

      <p className="home-status">
        Day 13 · 21 components shipped · Form next.
      </p>
    </article>
  );
}
