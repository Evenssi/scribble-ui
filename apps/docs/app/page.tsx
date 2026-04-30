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
      </ul>

      <p className="home-status">
        Day 4 · 6 components shipped · Modal next.
      </p>
    </article>
  );
}
