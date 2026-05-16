'use client';

import { useState } from 'react';
import { Button, Empty } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

import './page.css';

export function EmptyDocClient({ t }: { t: ComponentDoc }) {
  // A tiny demo that toggles between "has data" and "empty" so visitors
  // can feel the announcement + layout behaviour without wiring data.
  const [items, setItems] = useState<string[]>([]);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <div className="doc-empty-stage">
            <Empty />
          </div>
        </div>
      </section>

      {/* === Presets ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.presets}</h2>
        <p className="doc-note">{t.notes.presets}</p>
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
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
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
        <h2 className="doc-h2">{t.sections.actionAndBordered}</h2>
        <p className="doc-note">{t.notes.actionAndBordered}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>preset</code></td>
              <td><code>'default' | 'search' | 'data'</code></td>
              <td><code>'default'</code></td>
              <td>{t.api.rows.preset?.description}</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.image?.description}</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>'No data'</code></td>
              <td>{t.api.rows.title?.description}</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.description?.description}</td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.action?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.bordered?.description}</td>
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
