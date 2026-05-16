'use client';

import { useState } from 'react';
import { Tag } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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

export function TagDocClient({ t }: { t: ComponentDoc }) {
  const [tags, setTags] = useState<string[]>([
    'design',
    'illustration',
    'sketch',
    'wobble',
  ]);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Colors =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.colors}</h2>
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
        <h2 className="doc-h2">{t.sections.sizes}</h2>
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
        <h2 className="doc-h2">{t.sections.iconsClosable}</h2>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <div className="doc-demo doc-demo--column">
          <div className="doc-demo-row">
            {tags.length === 0 ? (
              <p className="doc-note">{t.notes.controlledEmpty}</p>
            ) : (
              tags.map((tag) => (
                <Tag
                  key={tag}
                  color="pink"
                  closable
                  onClose={() =>
                    setTags((prev) => prev.filter((x) => x !== tag))
                  }
                >
                  {tag}
                </Tag>
              ))
            )}
          </div>
          <p className="doc-note">{t.notes.controlled}</p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>color</code></td>
              <td>
                <code>
                  'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' |
                  'yellow' | 'orange' | 'pink' | 'blue' | 'mint' | 'purple' | 'green'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>{t.api.rows.color?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.closable?.description}</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClose?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClick?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
