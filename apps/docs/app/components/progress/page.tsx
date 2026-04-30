'use client';

import { Progress } from 'scribble-ui';
import '../button/page.css';

export default function ProgressDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Progress</h1>
      <p className="doc-lede">
        A progress indicator that complements <code>Spinner</code>: it
        visualises <em>how much</em> of a task is done. Two shapes —{' '}
        <code>line</code> and <code>circle</code> — share the same status
        palette, sizing scale and indeterminate behaviour.
      </p>

      {/* === Line · basic values ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Line · values</h2>
        <p className="doc-note">
          The <code>value</code> prop is clamped to <code>[0, 100]</code>.
          Non-numeric values fall back to <code>0</code>.
        </p>
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
        <h2 className="doc-h2">Line · sizes</h2>
        <p className="doc-note">
          Three preset heights: <code>sm</code> 6px, <code>md</code> 10px,{' '}
          <code>lg</code> 14px.
        </p>
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
        <h2 className="doc-h2">Line · status</h2>
        <p className="doc-note">
          <code>status</code> picks one of the existing semantic colors:{' '}
          <code>normal</code> (ink), <code>success</code>,{' '}
          <code>warning</code>, <code>danger</code>.
        </p>
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
        <h2 className="doc-h2">Line · with label</h2>
        <p className="doc-note">
          Pass <code>showLabel</code> to render the percentage to the
          right of the bar. Provide <code>formatLabel</code> for full
          control.
        </p>
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
        <h2 className="doc-h2">Line · indeterminate</h2>
        <p className="doc-note">
          When <code>indeterminate</code> is <code>true</code>,{' '}
          <code>value</code> is ignored, the label is hidden, and the
          fill slides continuously across the track.
        </p>
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
        <h2 className="doc-h2">Circle · values</h2>
        <p className="doc-note">
          The ring is normalised with <code>pathLength=&#123;100&#125;</code>,
          so the stroke-dashoffset math is just <code>100 - value</code>.
        </p>
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
        <h2 className="doc-h2">Circle · sizes</h2>
        <p className="doc-note">
          Three preset diameters: <code>sm</code> 56px, <code>md</code>{' '}
          80px, <code>lg</code> 112px. Stroke width scales with the size.
        </p>
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
        <h2 className="doc-h2">Circle · status</h2>
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
        <h2 className="doc-h2">Circle · with label</h2>
        <p className="doc-note">
          The label is centered inside the ring. Use{' '}
          <code>formatLabel</code> to show fractions, time remaining, or
          any other text.
        </p>
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
        <h2 className="doc-h2">Circle · indeterminate</h2>
        <p className="doc-note">
          A short arc rotates around the ring. The label is hidden and{' '}
          <code>aria-valuenow</code> is omitted (per WAI-ARIA, the value
          is unknown).
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>
                Progress percentage, 0–100. Clamped automatically;
                <code> NaN</code> / <code>undefined</code> fall back to{' '}
                <code>0</code>. Ignored when <code>indeterminate</code>{' '}
                is true.
              </td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render the indeterminate animation (sliding bar /
                spinning arc). Hides the label and omits{' '}
                <code>aria-valuenow</code>.
              </td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'line' | 'circle'</code></td>
              <td><code>'line'</code></td>
              <td>Visual shape.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>
                Line height: 6 / 10 / 14 px. Circle diameter: 56 / 80 /
                112 px.
              </td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td><code>'normal' | 'success' | 'warning' | 'danger'</code></td>
              <td><code>'normal'</code></td>
              <td>
                Semantic color, mapped to existing{' '}
                <code>--su-color-*</code> tokens.
              </td>
            </tr>
            <tr>
              <td><code>showLabel</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render the percentage as visible text. Position depends on
                variant: right-aligned for <code>line</code>, centered
                for <code>circle</code>. Forced off when{' '}
                <code>indeterminate</code>.
              </td>
            </tr>
            <tr>
              <td><code>formatLabel</code></td>
              <td><code>(value: number) =&gt; ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Custom label renderer. Receives the clamped value
                (0–100). Takes precedence over the default{' '}
                <code>n%</code> rendering.
              </td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>'Loading'</code></td>
              <td>
                Accessible name for the progressbar. Strongly
                recommended; falls back to <code>'Loading'</code>.
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
          The component renders a <code>&lt;div&gt;</code> with{' '}
          <code>role="progressbar"</code> and forwards a ref to it. All
          native div attributes are accepted.
        </p>
      </section>
    </article>
  );
}
