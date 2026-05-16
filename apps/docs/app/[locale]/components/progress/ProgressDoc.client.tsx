'use client';

import { Progress } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function ProgressDocClient({ t }: { t: ComponentDoc }) {
  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Line · basic values ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.lineValues}</h2>
        <p className="doc-note">{t.notes.lineValues}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              gap: 'var(--su-space-3)',
            }}
          >
            <Progress value={25} aria-label="25 percent" />
            <Progress value={50} aria-label="50 percent" />
            <Progress value={75} aria-label="75 percent" />
            <Progress value={100} aria-label="100 percent" />
          </div>
        </div>
      </section>

      {/* === Line · sizes ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.lineSizes}</h2>
        <p className="doc-note">{t.notes.lineSizes}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              gap: 'var(--su-space-3)',
            }}
          >
            <Progress size="sm" value={60} aria-label="Small progress" />
            <Progress size="md" value={60} aria-label="Medium progress" />
            <Progress size="lg" value={60} aria-label="Large progress" />
          </div>
        </div>
      </section>

      {/* === Line · status =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.lineStatus}</h2>
        <p className="doc-note">{t.notes.lineStatus}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              gap: 'var(--su-space-3)',
            }}
          >
            <Progress status="normal" value={70} aria-label="Normal" />
            <Progress status="success" value={70} aria-label="Success" />
            <Progress status="warning" value={70} aria-label="Warning" />
            <Progress status="danger" value={70} aria-label="Danger" />
          </div>
        </div>
      </section>

      {/* === Line · with label =============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.lineLabel}</h2>
        <p className="doc-note">{t.notes.lineLabel}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              gap: 'var(--su-space-3)',
            }}
          >
            <Progress value={42} showLabel aria-label="Default label" />
            <Progress
              value={88}
              status="success"
              showLabel
              formatLabel={(v) => `${Math.round(v)} of 100`}
              aria-label="Custom label"
            />
          </div>
        </div>
      </section>

      {/* === Line · indeterminate ============================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.lineIndeterminate}</h2>
        <p className="doc-note">{t.notes.lineIndeterminate}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              width: '100%',
              gap: 'var(--su-space-3)',
            }}
          >
            <Progress indeterminate aria-label="Loading" />
            <Progress
              indeterminate
              status="success"
              aria-label="Saving"
            />
          </div>
        </div>
      </section>

      {/* === Circle · basic values =========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circleValues}</h2>
        <p className="doc-note">{t.notes.circleValues}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Progress variant="circle" value={25} aria-label="25 percent" />
            <Progress variant="circle" value={50} aria-label="50 percent" />
            <Progress variant="circle" value={75} aria-label="75 percent" />
            <Progress variant="circle" value={100} aria-label="100 percent" />
          </div>
        </div>
      </section>

      {/* === Circle · sizes ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circleSizes}</h2>
        <p className="doc-note">{t.notes.circleSizes}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Progress variant="circle" size="sm" value={60} aria-label="Small" />
            <Progress variant="circle" size="md" value={60} aria-label="Medium" />
            <Progress variant="circle" size="lg" value={60} aria-label="Large" />
          </div>
        </div>
      </section>

      {/* === Circle · status ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circleStatus}</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Progress variant="circle" status="normal" value={70} aria-label="Normal" />
            <Progress variant="circle" status="success" value={70} aria-label="Success" />
            <Progress variant="circle" status="warning" value={70} aria-label="Warning" />
            <Progress variant="circle" status="danger" value={70} aria-label="Danger" />
          </div>
        </div>
      </section>

      {/* === Circle · with label ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circleLabel}</h2>
        <p className="doc-note">{t.notes.circleLabel}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Progress
              variant="circle"
              value={42}
              showLabel
              aria-label="Default label"
            />
            <Progress
              variant="circle"
              value={68}
              status="success"
              showLabel
              formatLabel={(v) => `${Math.round(v)}/100`}
              aria-label="Fraction label"
            />
            <Progress
              variant="circle"
              size="lg"
              value={90}
              status="warning"
              showLabel
              formatLabel={(v) => `${Math.round(v)}%`}
              aria-label="Large label"
            />
          </div>
        </div>
      </section>

      {/* === Circle · indeterminate ========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.circleIndeterminate}</h2>
        <p className="doc-note">{t.notes.circleIndeterminate}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Progress variant="circle" indeterminate aria-label="Loading" />
            <Progress
              variant="circle"
              size="lg"
              status="success"
              indeterminate
              aria-label="Saving"
            />
          </div>
        </div>
      </section>

      {/* === Code =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Progress } from 'scribble-ui';

// Default: line · md · normal · 0%.
<Progress value={42} aria-label="Uploading file" />

// Show the percentage next to the bar.
<Progress value={42} showLabel aria-label="Uploading file" />

// Status colors map to existing semantic tokens.
<Progress value={70} status="success" />
<Progress value={70} status="warning" />
<Progress value={70} status="danger" />

// Indeterminate: value is ignored, the bar slides.
<Progress indeterminate aria-label="Loading" />

// Circle variant + custom label.
<Progress
  variant="circle"
  value={68}
  showLabel
  formatLabel={(v) => \`\${Math.round(v)}/100\`}
  aria-label="Items processed"
/>

// Indeterminate circle.
<Progress variant="circle" indeterminate aria-label="Loading" />`}</code>
        </pre>
      </section>

      {/* === API ============================================ */}
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
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.indeterminate?.description}</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'line' | 'circle'</code></td>
              <td><code>'line'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td><code>'normal' | 'success' | 'warning' | 'danger'</code></td>
              <td><code>'normal'</code></td>
              <td>{t.api.rows.status?.description}</td>
            </tr>
            <tr>
              <td><code>showLabel</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.showLabel?.description}</td>
            </tr>
            <tr>
              <td><code>formatLabel</code></td>
              <td><code>(value: number) =&gt; ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.formatLabel?.description}</td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>'Loading'</code></td>
              <td>{t.api.rows['aria-label']?.description}</td>
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
