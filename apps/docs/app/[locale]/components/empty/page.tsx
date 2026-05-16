'use client';

import { useState } from 'react';
import { Button, Empty } from 'scribble-ui';
import './page.css';

export default function EmptyDocPage() {
  // A tiny demo that toggles between "has data" and "empty" so visitors
  // can feel the announcement + layout behaviour without wiring data.
  const [items, setItems] = useState<string[]>([]);

  return (
    <article className="doc">
      <h1 className="doc-title">Empty</h1>
      <p className="doc-lede">
        A hand-drawn placeholder for blank lists, empty search results and
        first-run states. Ships three built-in illustrations, scales with
        typography and can optionally sit on a sticky-note enclosure.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Out of the box Empty renders its default illustration and the
          fallback headline <code>&quot;No data&quot;</code>, so it stays
          announceable by screen readers even without props.
        </p>
        <div className="doc-demo">
          <div className="doc-empty-stage">
            <Empty />
          </div>
        </div>
      </section>

      {/* === Presets ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Presets</h2>
        <p className="doc-note">
          Three built-in illustrations cover the common empty cases — an
          empty note, a search miss and an empty data folder. Pass a
          custom <code>image</code> node to override.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row doc-empty-row">
            <Empty
              preset="default"
              title="No notes yet"
              description="Your sticky notes will show up here."
            />
            <Empty
              preset="search"
              title="No matches"
              description="Try a different keyword or clear the filters."
            />
            <Empty
              preset="data"
              title="Nothing archived"
              description="Archived items live in this folder."
            />
          </div>
          <div className="doc-demo-row doc-empty-row">
            <Empty
              image={<span role="img" aria-label="">🗒️</span>}
              title="Custom image"
              description="Any ReactNode works — emoji, <img>, your own SVG."
            />
          </div>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three size presets scale the illustration and type together.
          Pick <code>sm</code> inside a popover or table cell,{' '}
          <code>md</code> for standard panels and <code>lg</code> for
          full-page states.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row doc-empty-row">
            <Empty size="sm" title="Small" description="Inline-friendly." />
            <Empty size="md" title="Medium" description="The default." />
            <Empty size="lg" title="Large" description="Full-page hero." />
          </div>
        </div>
      </section>

      {/* === With action + bordered ========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With action &amp; bordered</h2>
        <p className="doc-note">
          Use the <code>action</code> slot for 0–2 recovery actions, and
          switch on <code>bordered</code> to wrap the whole thing in a
          sticky-note enclosure.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row doc-empty-row">
            <Empty
              preset="default"
              title="Your inbox is clear"
              description="Create your first note to get going."
              action={
                <>
                  <Button variant="primary">New note</Button>
                  <Button variant="default">Import…</Button>
                </>
              }
            />
            <Empty
              bordered
              preset="search"
              title="No results"
              description="Nothing matched your query. Try another spelling?"
              action={<Button variant="default">Reset filters</Button>}
            />
          </div>

          <div className="doc-demo-row doc-empty-row">
            {items.length === 0 ? (
              <Empty
                bordered
                preset="data"
                size="lg"
                title="No items yet"
                description="Click below to add a sample item and flip the state."
                action={
                  <Button
                    variant="primary"
                    onClick={() => setItems(['Hand-drawn sketch'])}
                  >
                    Add sample
                  </Button>
                }
              />
            ) : (
              <div className="doc-empty-list">
                <p>You have {items.length} item:</p>
                <ul>
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <Button variant="default" onClick={() => setItems([])}>
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Empty, Button } from 'scribble-ui';

export function InboxView({ notes }) {
  if (notes.length === 0) {
    return (
      <Empty
        bordered
        preset="default"
        title="Your inbox is clear"
        description="Create your first note to get going."
        action={<Button variant="primary">New note</Button>}
      />
    );
  }
  return <NoteList notes={notes} />;
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
              <td><code>preset</code></td>
              <td><code>'default' | 'search' | 'data'</code></td>
              <td><code>'default'</code></td>
              <td>
                Built-in illustration. Ignored when <code>image</code> is
                provided.
              </td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Custom illustration. Any ReactNode works — SVG, <code>&lt;img&gt;</code>,
                emoji. Overrides <code>preset</code>.
              </td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>'No data'</code></td>
              <td>
                Primary headline. Falls back to <code>'No data'</code> only
                when both <code>title</code> and <code>description</code>{' '}
                are omitted, so the component stays announceable.
              </td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Supporting copy rendered below the title.</td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Action slot for recovery affordances (typically 0–2 buttons
                or links).
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>
                Overall visual scale — affects illustration height and
                typography.
              </td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Wraps the content in a sticky-note enclosure with paper
                background, hand-drawn border, hard offset shadow and a
                slight tilt.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The root element is a <code>&lt;div role=&quot;status&quot; aria-live=&quot;polite&quot;&gt;</code>,
          so assistive technologies announce the empty state when it
          replaces a previously populated region. The illustration is
          marked <code>aria-hidden</code>.
        </p>
      </section>
    </article>
  );
}
