'use client';

import { useState } from 'react';
import { Tag } from 'scribble-ui';
import '../button/page.css';

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.3l6-.8z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export default function TagDocPage() {
  const [tags, setTags] = useState<string[]>([
    'design',
    'illustration',
    'sketch',
    'wobble',
  ]);

  return (
    <article className="doc">
      <h1 className="doc-title">Tag</h1>
      <p className="doc-lede">
        A small hand-drawn label for status, taxonomy or filter chips. By
        default tags stay calm — they keep a single wobble level so a
        list of them doesn't dance. Add <code>closable</code> for an
        inline ✕ button that fires <code>onClose</code>.
      </p>

      {/* === Colors =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Colors</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Tag color="default">default</Tag>
            <Tag color="brand">brand</Tag>
            <Tag color="success">success</Tag>
            <Tag color="warning">warning</Tag>
            <Tag color="danger">danger</Tag>
            <Tag color="info">info</Tag>
          </div>
          <div className="doc-demo-row">
            <Tag color="yellow">yellow</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="pink">pink</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="mint">mint</Tag>
            <Tag color="purple">purple</Tag>
            <Tag color="green">green</Tag>
          </div>
        </div>
      </section>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Tag size="sm" color="brand">small</Tag>
            <Tag size="md" color="brand">medium</Tag>
            <Tag size="lg" color="brand">large</Tag>
          </div>
        </div>
      </section>

      {/* === Icons + closable ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Icons & closable</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Tag icon={<StarIcon />} color="yellow">
              Featured
            </Tag>
            <Tag closable color="info">
              v0.0.0
            </Tag>
            <Tag closable color="danger" disabled>
              Disabled
            </Tag>
            <Tag icon={<StarIcon />} closable color="mint">
              Hand-drawn
            </Tag>
          </div>
        </div>
      </section>

      {/* === Controlled list ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled removal</h2>
        <div className="doc-demo doc-demo--column">
          <div className="doc-demo-row">
            {tags.length === 0 ? (
              <p className="doc-note">All tags removed — refresh to reset.</p>
            ) : (
              tags.map((t) => (
                <Tag
                  key={t}
                  color="pink"
                  closable
                  onClose={() =>
                    setTags((prev) => prev.filter((tag) => tag !== t))
                  }
                >
                  {t}
                </Tag>
              ))
            )}
          </div>
          <p className="doc-note">
            Click ✕ on any tag — it removes the entry from local state.
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Tag } from 'scribble-ui';

// Static.
<Tag color="brand">design</Tag>

// With icon.
<Tag color="yellow" icon={<StarIcon />}>Featured</Tag>

// Closable + controlled removal.
const [tags, setTags] = useState(['a', 'b']);
{tags.map((t) => (
  <Tag key={t} closable onClose={() =>
    setTags((prev) => prev.filter((x) => x !== t))
  }>
    {t}
  </Tag>
))}`}</code>
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
              <td><code>color</code></td>
              <td>
                <code>
                  'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' |
                  'yellow' | 'orange' | 'pink' | 'blue' | 'mint' | 'purple' | 'green'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>Background tint. Status colors use the system palette; named colors use the sticky-note palette.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset.</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Inline icon rendered before the label.</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Render a ✕ button after the label.</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired when the close button is activated.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Calms the tag and disables both click handlers.</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired on the tag body (not on the close button).</td>
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
