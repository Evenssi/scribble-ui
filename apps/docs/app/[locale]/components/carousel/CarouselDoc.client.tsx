'use client';

import { useState, type CSSProperties } from 'react';
import { Button, Carousel, type CarouselItem } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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

export function CarouselDocClient({ t }: { t: ComponentDoc }) {
  const [controlled, setControlled] = useState(0);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <Carousel items={BASIC_ITEMS} ariaLabel="Workflow in four steps" />
        </div>
      </section>

      {/* === Autoplay ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.autoplay}</h2>
        <p className="doc-note">{t.notes.autoplay}</p>
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
        <h2 className="doc-h2">{t.sections.fade}</h2>
        <p className="doc-note">{t.notes.fade}</p>
        <div className="doc-demo">
          <Carousel items={BASIC_ITEMS} transition="fade" ariaLabel="Fade demo" />
        </div>
      </section>

      {/* === Indicator shapes ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.indicators}</h2>
        <p className="doc-note">{t.notes.indicators}</p>
        <div className="doc-demo doc-demo--column">
          <Carousel items={BASIC_ITEMS} indicatorShape="dot" ariaLabel="Dots" />
          <Carousel items={BASIC_ITEMS} indicatorShape="dash" ariaLabel="Dashes" />
          <Carousel items={BASIC_ITEMS} indicatorShape="number" ariaLabel="Fraction" />
        </div>
      </section>

      {/* === Loop = false ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.bounded}</h2>
        <p className="doc-note">{t.notes.bounded}</p>
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
        <h2 className="doc-h2">{t.sections.arrowPlacement}</h2>
        <p className="doc-note">{t.notes.arrowPlacement}</p>
        <div className="doc-demo doc-demo--column">
          <Carousel items={BASIC_ITEMS} arrowPlacement="inside" ariaLabel="Arrows inside" />
          <Carousel items={BASIC_ITEMS} arrowPlacement="outside" ariaLabel="Arrows outside" />
        </div>
      </section>

      {/* === Drag & keyboard ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.dragKeyboard}</h2>
        <p className="doc-note">{t.notes.dragKeyboard}</p>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
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
                  (i - 1 + BASIC_ITEMS.length) % BASIC_ITEMS.length,
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
        <h2 className="doc-h2">{t.sections.api}</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.api.headers.name}</th>
              <th>{t.api.headers.type}</th>
              <th>{t.api.headers.default}</th>
              <th>{t.api.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td><code>CarouselItem[]</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.items?.description}</td>
            </tr>
            <tr>
              <td><code>activeIndex</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.activeIndex?.description}</td>
            </tr>
            <tr>
              <td><code>defaultIndex</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>{t.api.rows.defaultIndex?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(index, prevIndex) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>autoplay</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.autoplay?.description}</td>
            </tr>
            <tr>
              <td><code>interval</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>{t.api.rows.interval?.description}</td>
            </tr>
            <tr>
              <td><code>pauseOnHover</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.pauseOnHover?.description}</td>
            </tr>
            <tr>
              <td><code>loop</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.loop?.description}</td>
            </tr>
            <tr>
              <td><code>showArrows</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showArrows?.description}</td>
            </tr>
            <tr>
              <td><code>showIndicators</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showIndicators?.description}</td>
            </tr>
            <tr>
              <td><code>indicatorShape</code></td>
              <td><code>'dot' | 'dash' | 'number'</code></td>
              <td><code>'dot'</code></td>
              <td>{t.api.rows.indicatorShape?.description}</td>
            </tr>
            <tr>
              <td><code>arrowPlacement</code></td>
              <td><code>'inside' | 'outside'</code></td>
              <td><code>'inside'</code></td>
              <td>{t.api.rows.arrowPlacement?.description}</td>
            </tr>
            <tr>
              <td><code>transition</code></td>
              <td><code>'slide' | 'fade'</code></td>
              <td><code>'slide'</code></td>
              <td>{t.api.rows.transition?.description}</td>
            </tr>
            <tr>
              <td><code>aspectRatio</code></td>
              <td><code>string</code></td>
              <td><code>'16 / 9'</code></td>
              <td>{t.api.rows.aspectRatio?.description}</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.height?.description}</td>
            </tr>
            <tr>
              <td><code>draggable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.draggable?.description}</td>
            </tr>
            <tr>
              <td><code>keyboard</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.keyboard?.description}</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Carousel'</code></td>
              <td>{t.api.rows.ariaLabel?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">{t.notes.apiFooter}</p>
      </section>
    </article>
  );
}
