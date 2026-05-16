'use client';

import { Spinner } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function SpinnerDocClient({ t }: { t: ComponentDoc }) {
  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </div>
      </section>

      {/* === Variants ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.variants}</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Spinner variant="ring" />
            <Spinner variant="dots" />
            <Spinner variant="pencil" />
          </div>
        </div>
      </section>

      {/* === Color inheritance ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.color}</h2>
        <p className="doc-note">{t.notes.color}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <div style={{ color: 'var(--su-color-brand-deep)' }}>
              <Spinner variant="ring" size="lg" />
            </div>
            <div style={{ color: 'var(--su-color-danger)' }}>
              <Spinner variant="dots" size="lg" />
            </div>
            <Spinner
              variant="pencil"
              size="lg"
              color="var(--su-color-info)"
            />
          </div>
        </div>
      </section>

      {/* === showLabel ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.label}</h2>
        <p className="doc-note">{t.notes.label}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Spinner showLabel label="Loading" />
            <Spinner variant="dots" showLabel label="Saving…" />
            <Spinner variant="pencil" showLabel label="Sketching" />
          </div>
        </div>
      </section>

      {/* === Embedded in a button ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.inButton}</h2>
        <p className="doc-note">{t.notes.inButton}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <button
              type="button"
              disabled
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--su-space-2)',
                padding: '8px 16px',
                fontFamily: 'var(--su-font-family-hand)',
                fontSize: 'var(--su-font-size-body)',
                color: 'var(--su-ink-primary)',
                background: 'var(--su-bg-paper)',
                border:
                  'var(--su-stroke-default) solid var(--su-ink-primary)',
                borderRadius: 'var(--su-radius-btn)',
                boxShadow: 'var(--su-shadow-sm)',
                cursor: 'progress',
              }}
            >
              <Spinner size="sm" label="Loading" />
              <span>Loading…</span>
            </button>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Spinner } from 'scribble-ui';

// Default: ring · md · currentColor.
<Spinner />

// Pick a variant + size.
<Spinner variant="dots" size="lg" />

// Color via wrapper or prop.
<div style={{ color: 'var(--su-color-brand-deep)' }}>
  <Spinner variant="pencil" />
</div>
<Spinner color="tomato" />

// Show the label visibly (screen readers always hear it).
<Spinner showLabel label="Saving…" />`}</code>
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
              <td><code>variant</code></td>
              <td><code>'ring' | 'dots' | 'pencil'</code></td>
              <td><code>'ring'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td><code>currentColor</code></td>
              <td>{t.api.rows.color?.description}</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td><code>'Loading'</code></td>
              <td>{t.api.rows.label?.description}</td>
            </tr>
            <tr>
              <td><code>showLabel</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.showLabel?.description}</td>
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
