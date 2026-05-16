'use client';

import { useState, type CSSProperties } from 'react';
import { Button, Carousel, type CarouselItem } from 'scribble-ui';

/** Sticky-note tinted slide — inline so the docs site stays dep-free. */
function StickySlide({
  tint,
  rotate = 0,
  title,
  body,
}: {
  tint: string;
  rotate?: number;
  title: string;
  body: string;
}) {
  const style: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '24px 32px',
    background: tint,
    textAlign: 'center',
    fontFamily: 'var(--su-font-family-hand)',
    color: 'var(--su-ink-primary)',
    transform: `rotate(${rotate}deg)`,
  };
  return (
    <div style={style}>
      <h3 style={{ margin: 0, fontSize: 'var(--su-font-size-h2)' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 'var(--su-font-size-body)', maxWidth: 420 }}>
        {body}
      </p>
    </div>
  );
}

const BASIC_ITEMS: CarouselItem[] = [
  {
    key: 'sketch',
    alt: 'Sketch first',
    content: (
      <StickySlide
        tint="var(--su-note-yellow)"
        title="Sketch first"
        body="Rough it out before you polish. Imperfect lines are the whole point."
      />
    ),
  },
  {
    key: 'ink',
    alt: 'Ink later',
    content: (
      <StickySlide
        tint="var(--su-note-pink)"
        rotate={-1}
        title="Ink later"
        body="Once the structure feels right, commit with bold strokes."
      />
    ),
  },
  {
    key: 'ship',
    alt: 'Ship it',
    content: (
      <StickySlide
        tint="var(--su-note-mint)"
        rotate={0.8}
        title="Ship it"
        body="The shipped sketch is worth a hundred perfect mockups."
      />
    ),
  },
  {
    key: 'iterate',
    alt: 'Iterate',
    content: (
      <StickySlide
        tint="var(--su-note-blue)"
        rotate={-0.6}
        title="Iterate"
        body="Listen, redraw, listen again. Sketchbooks love revision."
      />
    ),
  },
];

const BOUNDED_ITEMS: CarouselItem[] = [
  {
    key: 'b1',
    content: (
      <StickySlide
        tint="var(--su-note-orange)"
        title="Page 1"
        body="No loop: prev is disabled here."
      />
    ),
  },
  {
    key: 'b2',
    content: (
      <StickySlide
        tint="var(--su-note-purple)"
        title="Page 2"
        body="Middle of the story."
      />
    ),
  },
  {
    key: 'b3',
    content: (
      <StickySlide
        tint="var(--su-note-green)"
        title="Page 3"
        body="No loop: next is disabled here."
      />
    ),
  },
];

export default function CarouselDocPage() {
  const [controlled, setControlled] = useState(0);

  return (
    <article className="doc">
      <h1 className="doc-title">Carousel</h1>
      <p className="doc-lede">
        A hand-drawn content rotator. Drag it, arrow-key it, let it autoplay —
        every transition, every indicator and every arrow runs on the same
        sticky-note tokens you already have, no per-instance styling needed.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Default <code>slide</code> transition with dot indicators and inside
          arrows. Four sticky-note slides, 16∶9 viewport.
        </p>
        <div className="doc-demo">
          <Carousel items={BASIC_ITEMS} ariaLabel="Workflow in four steps" />
        </div>
      </section>

      {/* === Autoplay ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Autoplay &amp; pause-on-hover</h2>
        <p className="doc-note">
          Auto-advances every 2.5&thinsp;s. Hover the viewport (or focus it with
          Tab) and the timer pauses until your pointer / focus leaves. Autoplay
          also pauses while dragging and when the page tab is hidden.
        </p>
        <div className="doc-demo">
          <Carousel
            items={BASIC_ITEMS}
            autoplay
            interval={2500}
            pauseOnHover
            ariaLabel="Autoplay demo"
          />
        </div>
      </section>

      {/* === Fade transition ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Fade transition</h2>
        <p className="doc-note">
          Cross-fade instead of sliding. Useful for hero imagery where each
          slide is visually distinct.
        </p>
        <div className="doc-demo">
          <Carousel
            items={BASIC_ITEMS}
            transition="fade"
            ariaLabel="Fade demo"
          />
        </div>
      </section>

      {/* === Indicator shapes ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Indicator shapes</h2>
        <p className="doc-note">
          Three shapes: <code>dot</code> (default), <code>dash</code> and{' '}
          <code>number</code>. Numbers render as a sticky-note fraction badge.
        </p>
        <div className="doc-demo doc-demo--column">
          <Carousel
            items={BASIC_ITEMS}
            indicatorShape="dot"
            ariaLabel="Dots"
          />
          <Carousel
            items={BASIC_ITEMS}
            indicatorShape="dash"
            ariaLabel="Dashes"
          />
          <Carousel
            items={BASIC_ITEMS}
            indicatorShape="number"
            ariaLabel="Fraction"
          />
        </div>
      </section>

      {/* === Loop = false ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Bounded (loop = false)</h2>
        <p className="doc-note">
          With <code>loop</code> turned off, prev / next buttons visibly disable
          at the edges and autoplay stops when the last slide is reached.
        </p>
        <div className="doc-demo">
          <Carousel
            items={BOUNDED_ITEMS}
            loop={false}
            indicatorShape="dash"
            ariaLabel="Bounded carousel"
          />
        </div>
      </section>

      {/* === Arrow placement ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Arrow placement</h2>
        <p className="doc-note">
          <code>inside</code> overlays arrows on the viewport;{' '}
          <code>outside</code> hugs the left / right gutter so the image stays
          unobstructed.
        </p>
        <div className="doc-demo doc-demo--column">
          <Carousel
            items={BASIC_ITEMS}
            arrowPlacement="inside"
            ariaLabel="Arrows inside"
          />
          <Carousel
            items={BASIC_ITEMS}
            arrowPlacement="outside"
            ariaLabel="Arrows outside"
          />
        </div>
      </section>

      {/* === Drag & keyboard ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Drag &amp; keyboard</h2>
        <p className="doc-note">
          Press-and-drag the viewport left or right — passing ~40&thinsp;px or
          a brisk flick commits the change, otherwise the track rubber-bands
          back. Tab onto the carousel and use <kbd>←</kbd> / <kbd>→</kbd> to
          step, <kbd>Home</kbd> / <kbd>End</kbd> to jump.
        </p>
        <div className="doc-demo">
          <Carousel
            items={BASIC_ITEMS}
            indicatorShape="number"
            ariaLabel="Draggable carousel"
          />
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Drive the active slide from outside. Combine with autoplay disabled
          for full control, or leave autoplay on and treat external updates as
          overrides.
        </p>
        <div className="doc-demo doc-demo--column">
          <Carousel
            items={BASIC_ITEMS}
            activeIndex={controlled}
            onChange={(next) => setControlled(next)}
            ariaLabel="Controlled carousel"
          />
          <div className="doc-demo-row">
            <Button
              size="sm"
              onClick={() =>
                setControlled((i) =>
                  (i - 1 + BASIC_ITEMS.length) % BASIC_ITEMS.length
                )
              }
            >
              External ← prev
            </Button>
            <Button size="sm" variant="primary" onClick={() => setControlled(0)}>
              Jump to first
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setControlled((i) => (i + 1) % BASIC_ITEMS.length)
              }
            >
              External → next
            </Button>
            <span className="doc-note" style={{ margin: 0 }}>
              Active index: <code>{controlled}</code>
            </span>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Carousel, type CarouselItem } from 'scribble-ui';

const items: CarouselItem[] = [
  { key: 'a', content: <img src="/a.jpg" alt="A" /> },
  { key: 'b', content: <img src="/b.jpg" alt="B" /> },
  { key: 'c', content: <img src="/c.jpg" alt="C" /> },
];

export function Hero() {
  return (
    <Carousel
      items={items}
      autoplay
      interval={4000}
      indicatorShape="dash"
      ariaLabel="Product showcase"
    />
  );
}`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">API</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td><code>CarouselItem[]</code></td>
              <td><code>—</code></td>
              <td>
                Required. Each item has <code>key</code>,{' '}
                <code>content</code> and an optional <code>alt</code> used as
                the slide's accessible label.
              </td>
            </tr>
            <tr>
              <td><code>activeIndex</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>Controlled current slide index.</td>
            </tr>
            <tr>
              <td><code>defaultIndex</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Uncontrolled initial index.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(index, prevIndex) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fires whenever the active slide changes.</td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Auto-advance on a timer.</td>
            </tr>
            <tr>
              <td><code>interval</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>Autoplay interval in milliseconds. Minimum 400&thinsp;ms.</td>
            </tr>
            <tr>
              <td><code>pauseOnHover</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Pause autoplay while pointer hovers the carousel.</td>
            </tr>
            <tr>
              <td><code>loop</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                When <code>false</code>, prev / next disable at the edges and
                autoplay stops on the last slide.
              </td>
            </tr>
            <tr>
              <td><code>showArrows</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render prev / next arrow buttons.</td>
            </tr>
            <tr>
              <td><code>showIndicators</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render the indicator strip below the viewport.</td>
            </tr>
            <tr>
              <td><code>indicatorShape</code></td>
              <td><code>'dot' | 'dash' | 'number'</code></td>
              <td><code>'dot'</code></td>
              <td>Shape of each indicator.</td>
            </tr>
            <tr>
              <td><code>arrowPlacement</code></td>
              <td><code>'inside' | 'outside'</code></td>
              <td><code>'inside'</code></td>
              <td>
                Whether arrows overlay the viewport or hug the outer gutter.
              </td>
            </tr>
            <tr>
              <td><code>transition</code></td>
              <td><code>'slide' | 'fade'</code></td>
              <td><code>'slide'</code></td>
              <td>How slides swap.</td>
            </tr>
            <tr>
              <td><code>aspectRatio</code></td>
              <td><code>string</code></td>
              <td><code>'16 / 9'</code></td>
              <td>CSS aspect-ratio applied to the viewport.</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>—</code></td>
              <td>Fixed height. Takes precedence over <code>aspectRatio</code>.</td>
            </tr>
            <tr>
              <td><code>draggable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Mouse / touch drag to switch slides.</td>
            </tr>
            <tr>
              <td><code>keyboard</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                Enable <kbd>←</kbd> <kbd>→</kbd> <kbd>Home</kbd> <kbd>End</kbd>{' '}
                when focused.
              </td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Carousel'</code></td>
              <td>
                a11y label for the <code>role="region"</code> wrapping the
                whole widget.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the root element.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The component forwards a ref to the underlying{' '}
          <code>HTMLDivElement</code> root and accepts native{' '}
          <code>aria-*</code> / <code>data-*</code> attributes.
        </p>
      </section>
    </article>
  );
}
