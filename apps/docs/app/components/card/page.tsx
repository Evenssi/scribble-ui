'use client';

import { useState } from 'react';
import { Button, Card, Tag } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function CardDocPage() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <article className="doc">
      <h1 className="doc-title">Card</h1>
      <p className="doc-lede">
        A hand-drawn surface for grouping related content — a small layout
        primitive, not a button. Two flavors (plain paper or sticky-note
        tinted), three sizes, and an optional <code>interactive</code> mode
        that adopts the four-stage wobble from <code>Button</code>.
      </p>

      {/* === Variants & note colors ============================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Variants</h2>
        <p className="doc-note">
          A card hosts a title, body copy and supporting actions or
          metadata — not just a single label. The samples below show the
          full surface so you can judge the wobble at realistic sizes.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 'var(--su-space-4)', flexWrap: 'wrap' }}>
            <Card header="Paper white" footer="Default surface">
              The plain variant uses the same paper background as the rest
              of the canvas. Best for content that should feel grounded and
              non-decorative.
            </Card>

            <Card
              variant="note"
              noteColor="yellow"
              header="Sticky note · yellow"
              footer="Reminder · today"
            >
              Use note variants for short, ephemeral content — reminders,
              tips, encouragement. The tint is what makes them read as a
              note rather than a panel.
            </Card>

            <Card
              variant="note"
              noteColor="mint"
              header="Sticky note · mint"
              footer="Last edited 2 min ago"
            >
              Pair with <code>Tag</code> &amp; <code>Button</code> to build
              richer surfaces — the wobble + hard shadow stack still reads
              cohesively because every component shares the same tokens.
            </Card>
          </div>

          <div className="doc-demo-row" style={{ gap: 'var(--su-space-3)', flexWrap: 'wrap' }}>
            {(['orange', 'pink', 'blue', 'purple', 'green'] as const).map(
              (c) => (
                <Card key={c} variant="note" noteColor={c} size="sm">
                  Sticky note · {c}
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* === Sizes ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Padding, minimum width, font size <em>and</em> shadow weight all
          step up with the size — bigger cards feel heavier, like real
          paper stock.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 'var(--su-space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Card size="sm" header="Compact">
              Snug padding, body-small text. Good for dense lists.
            </Card>

            <Card size="md" header="Default" footer="Recommended">
              The default size matches most CMS entry rows and dashboard
              tiles. Pair with a <code>Button size="sm"</code> in the footer
              for a tidy quick-action layout.
            </Card>

            <Card size="lg" header="Roomy" footer="Hero / landing">
              Generous padding and h3 body copy. Use sparingly for hero
              callouts where the card itself <em>is</em> the page section.
              Combines well with multiple actions in the footer.
            </Card>
          </div>
        </div>
      </section>

      {/* === Interactive ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Interactive</h2>
        <p className="doc-note">
          When <code>interactive</code> is on, the entire card behaves like
          a button: focusable, Enter/Space activates <code>onClick</code>,
          and the four-stage filter kicks in (calm → hover → active →
          disabled).
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 'var(--su-space-3)', flexWrap: 'wrap' }}>
            <Card
              interactive
              variant="note"
              noteColor="mint"
              header="Mint board"
              footer="Click to pick"
              onClick={() => setPicked('mint')}
            >
              Choose a sticky-note color to associate with this project.
              The whole surface is the hit target.
            </Card>
            <Card
              interactive
              variant="note"
              noteColor="pink"
              header="Pink board"
              footer="Click to pick"
              onClick={() => setPicked('pink')}
            >
              Hover to feel the wobble level rise; press to feel it peak —
              identical to <code>Button</code>.
            </Card>
            <Card
              interactive
              disabled
              header="Locked board"
              footer="Disabled"
            >
              Disabled cards stop wobbling and ignore activation, just
              like a disabled button.
            </Card>
          </div>
          <p className="doc-note">
            Last picked: <code>{picked ?? '(none)'}</code>. Try keyboard:
            Tab to a card, then Enter or Space.
          </p>
        </div>
      </section>

      {/* === Composition ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Composition</h2>
        <p className="doc-note">
          Cards are containers — the value shows up when you stack a Tag,
          metadata and a couple of buttons inside one.
        </p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              gap: 'var(--su-space-4)',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Card
              variant="note"
              noteColor="yellow"
              header={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--su-space-2)',
                  }}
                >
                  <span>Pick up sketchbook</span>
                  <Tag color="warning" size="sm">
                    Today
                  </Tag>
                </div>
              }
              footer={
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--su-space-2)',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button size="sm">Snooze</Button>
                  <Button size="sm" variant="success">
                    Done
                  </Button>
                </div>
              }
            >
              On the way home, swing by the art store on 5th. Pick the
              hard-cover A5 — last one almost ran out of pages.
            </Card>

            <Card
              size="lg"
              header={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--su-space-2)',
                  }}
                >
                  <span>New project</span>
                  <Tag color="info" size="sm">
                    Draft
                  </Tag>
                </div>
              }
              footer={
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--su-space-2)',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button size="sm">Skip</Button>
                  <Button size="sm" variant="primary">
                    Start
                  </Button>
                </div>
              }
            >
              <p style={{ margin: 0 }}>
                Set a name and a goal — everything else is optional. You
                can always come back later and add tags, deadlines and
                collaborators.
              </p>
              <p
                style={{
                  margin: 'var(--su-space-2) 0 0 0',
                  color: 'var(--su-ink-muted)',
                  fontSize: 'var(--su-font-size-small)',
                }}
              >
                Tip: leaving the goal blank starts a "scratchpad" — a
                project with no due date that never appears in reports.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Card, Button, Tag } from 'scribble-ui';

// Composition: a sticky note with a tag in the header and two
// buttons in the footer — Card is the surface, not the action.
<Card
  variant="note"
  noteColor="yellow"
  header={
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Pick up sketchbook</span>
      <Tag color="warning" size="sm">Today</Tag>
    </div>
  }
  footer={
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
      <Button size="sm">Snooze</Button>
      <Button size="sm" variant="success">Done</Button>
    </div>
  }
>
  On the way home, swing by the art store on 5th.
</Card>

// Interactive surface — click + Enter/Space activate onClick.
<Card interactive onClick={() => pick('a')}>
  Click me
</Card>`}</code>
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
              <td><code>variant</code></td>
              <td><code>'default' | 'note'</code></td>
              <td><code>'default'</code></td>
              <td>Visual variant. <code>'note'</code> uses a sticky-note tint.</td>
            </tr>
            <tr>
              <td><code>noteColor</code></td>
              <td>
                <code>
                  'yellow' | 'orange' | 'pink' | 'blue' | 'mint' | 'purple' | 'green'
                </code>
              </td>
              <td><code>'yellow'</code></td>
              <td>Sticky-note tint. Only meaningful when <code>variant === 'note'</code>.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset. Affects padding, minimum width and shadow weight.</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Slot rendered above the body, separated by a dashed divider.</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Slot rendered below the body, separated by a dashed divider.</td>
            </tr>
            <tr>
              <td><code>interactive</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Make the card focusable & clickable; enables four-stage filter and dashed focus ring.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Only meaningful with <code>interactive</code>. Calms the card and blocks activation.</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Click handler. Suppressed when <code>disabled</code>.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
