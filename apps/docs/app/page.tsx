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
        <li>
          <Link className="home-component-link" href="/components/carousel">
            Carousel
          </Link>
          <span className="home-component-desc">
            — hand-drawn content rotator with slide / fade transitions, autoplay,
            drag and keyboard nav.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/empty">
            Empty
          </Link>
          <span className="home-component-desc">
            — hand-drawn placeholder for blank lists, search misses and first-run states.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/result">
            Result
          </Link>
          <span className="home-component-desc">
            — full-page feedback surface for success, failure and HTTP error routes.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/timeline">
            Timeline
          </Link>
          <span className="home-component-desc">
            — vertical event ribbon with left / right / alternate modes and 5 status dots.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/backtop">
            BackTop
          </Link>
          <span className="home-component-desc">
            — floating back-to-top button with threshold visibility, smooth scroll and scoped containers.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/dropdown">
            Dropdown
          </Link>
          <span className="home-component-desc">
            — menu overlay with 8 placements, click / hover / contextMenu triggers and roving-tabindex keyboard nav.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/alert">
            Alert
          </Link>
          <span className="home-component-desc">
            — static inline feedback strip with 4 variants, closable and banner modes.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/pagination">
            Pagination
          </Link>
          <span className="home-component-desc">
            — data-driven page navigator with smart ellipsis folding, simple / small variants and full a11y.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/breadcrumb">
            Breadcrumb
          </Link>
          <span className="home-component-desc">
            — hierarchical trail with items + composition APIs, custom separators and mid-path ellipsis.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/numberinput">
            NumberInput
          </Link>
          <span className="home-component-desc">
            — numeric field with ± steppers, keyboard ↑/↓ + Shift/Alt modifiers, min/max clamp and precision.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/slider">
            Slider
          </Link>
          <span className="home-component-desc">
            — single or range value picker with marks, sticky-note tooltip, vertical mode and full keyboard nav.
          </span>
        </li>
        <li>
          <Link className="home-component-link" href="/components/datepicker">
            DatePicker
          </Link>
          <span className="home-component-desc">
            — calendar dropdown with portalled popup, keyboard month/year nav, min/max disabling and locale labels.
          </span>
        </li>
      </ul>

      <p className="home-status">
        Day 18 · 33 components shipped · Form (RHF + zod) is the final round.
      </p>
    </article>
  );
}
