'use client';

import { useState } from 'react';
import { Textarea } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function TextareaDocClient({ t }: { t: ComponentDoc }) {
  const [bio, setBio] = useState('Sketching on paper since forever.');
  const [tweet, setTweet] = useState(
    'Hand-drawn UIs feel friendlier than pixel-perfect ones.'
  );

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            placeholder="Tell us something… (uncontrolled)"
            defaultValue=""
          />
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Controlled bio"
          />
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <div className="doc-demo doc-demo--column">
          <Textarea size="sm" placeholder="Small — 64px tall, body-small font" />
          <Textarea size="md" placeholder="Medium — default, body font" />
          <Textarea size="lg" placeholder="Large — 128px tall, h3 font" />
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.states}</h2>
        <div className="doc-demo doc-demo--column">
          <Textarea
            disabled
            defaultValue="Disabled — the wobble drops and pointer events stop."
          />
          <Textarea
            readOnly
            defaultValue="Read-only — selectable but not editable."
          />
          <Textarea
            error
            helperText="Description must be at least 20 characters."
            defaultValue="Too short."
          />
        </div>
      </section>

      {/* === Auto resize ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.autoResize}</h2>
        <p className="doc-note">{t.notes.autoResize}</p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            autoResize
            placeholder="autoResize — try pasting a long paragraph here."
          />
          <Textarea
            autoResize={{ minRows: 2, maxRows: 6 }}
            placeholder="autoResize between 2 and 6 rows"
          />
        </div>
      </section>

      {/* === Character count ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.count}</h2>
        <p className="doc-note">{t.notes.count}</p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            showCount
            placeholder="Free-form note (no max)"
          />
          <Textarea
            showCount
            maxLength={140}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's on your mind?"
          />
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Textarea } from 'scribble-ui';

export function Example() {
  const [value, setValue] = useState('');

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell us something…"
      />

      <Textarea
        autoResize={{ minRows: 2, maxRows: 6 }}
        placeholder="Grows with content"
      />

      <Textarea
        showCount
        maxLength={140}
        error={value.length > 140}
        helperText={value.length > 140 ? 'Too long.' : undefined}
      />
    </>
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.error?.description}</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.helperText?.description}</td>
            </tr>
            <tr>
              <td><code>autoResize</code></td>
              <td>
                <code>boolean | {'{ minRows?: number; maxRows?: number }'}</code>
              </td>
              <td><code>—</code></td>
              <td>{t.api.rows.autoResize?.description}</td>
            </tr>
            <tr>
              <td><code>showCount</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.showCount?.description}</td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>maxLength</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.maxLength?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code> / <code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>wrapperClassName</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.wrapperClassName?.description}</td>
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
