'use client';

import { Skeleton } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function SkeletonDocClient({ t }: { t: ComponentDoc }) {
  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Single-line text ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.textSingle}</h2>
        <div className="doc-demo doc-demo--column">
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton width={240} />
        </div>
      </section>

      {/* === Multi-line text ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.textMulti}</h2>
        <p className="doc-note">{t.notes.textMulti}</p>
        <div className="doc-demo doc-demo--column">
          <Skeleton lines={3} />
          <Skeleton lines={5} />
        </div>
      </section>

      {/* === Rect ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.rect}</h2>
        <div className="doc-demo doc-demo--column">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" height={120} />
          <Skeleton variant="rect" width={320} height={200} />
        </div>
      </section>

      {/* === Circle ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circle}</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Skeleton variant="circle" width={32} />
            <Skeleton variant="circle" />
            <Skeleton variant="circle" width={64} />
          </div>
        </div>
      </section>

      {/* === Animation ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.animation}</h2>
        <p className="doc-note">{t.notes.animation}</p>
        <div className="doc-demo doc-demo--column">
          <div>
            <p className="doc-note">{t.notes.pulse}</p>
            <Skeleton variant="rect" height={48} animation="pulse" />
          </div>
          <div>
            <p className="doc-note">{t.notes.wave}</p>
            <Skeleton variant="rect" height={48} animation="wave" />
          </div>
          <div>
            <p className="doc-note">{t.notes.none}</p>
            <Skeleton variant="rect" height={48} animation="none" />
          </div>
        </div>
      </section>

      {/* === Composite card skeleton ========================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.composite}</h2>
        <p className="doc-note">{t.notes.composite}</p>
        <div className="doc-demo">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              width: 360,
              padding: 14,
              border: '2px solid var(--su-ink-primary)',
              borderRadius: 'var(--su-radius-card)',
              background: 'var(--su-bg-paper)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Skeleton variant="circle" width={48} animation="wave" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton width="60%" animation="wave" />
                <Skeleton width="40%" animation="wave" />
              </div>
            </div>
            <Skeleton variant="rect" height={140} animation="wave" />
            <Skeleton lines={2} animation="wave" />
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Skeleton } from 'scribble-ui';

// Single line of text.
<Skeleton width="60%" />

// Paragraph — last line auto-narrows to 60%.
<Skeleton lines={3} />

// Avatar.
<Skeleton variant="circle" width={48} />

// Block (image / hero).
<Skeleton variant="rect" height={200} animation="wave" />

// Card composite.
<div className="card">
  <Skeleton variant="circle" width={48} />
  <Skeleton width="60%" />
  <Skeleton variant="rect" height={140} />
  <Skeleton lines={2} />
</div>`}</code>
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
              <td><code>'text' | 'rect' | 'circle'</code></td>
              <td><code>'text'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number | string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.width?.description}</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td>
                <code>1em</code> · text<br />
                <code>80px</code> · rect<br />
                <code>40px</code> · circle
              </td>
              <td>{t.api.rows.height?.description}</td>
            </tr>
            <tr>
              <td><code>lines</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.lines?.description}</td>
            </tr>
            <tr>
              <td><code>radius</code></td>
              <td><code>number | string</code></td>
              <td><code>var(--su-radius-tag)</code></td>
              <td>{t.api.rows.radius?.description}</td>
            </tr>
            <tr>
              <td><code>animation</code></td>
              <td><code>'pulse' | 'wave' | 'none'</code></td>
              <td><code>'pulse'</code></td>
              <td>{t.api.rows.animation?.description}</td>
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
