'use client';

import { Spinner } from 'scribble-ui';

export default function SpinnerDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Spinner</h1>
      <p className="doc-lede">
        A small loading indicator in three hand-drawn flavors —{' '}
        <code>ring</code>, <code>dots</code> and <code>pencil</code>. The
        spinner inherits its color via <code>currentColor</code>, so it
        blends into Buttons, Tags, or any colored container without extra
        wiring.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three fixed pixel sizes: <code>sm</code> 16px,{' '}
          <code>md</code> 24px, <code>lg</code> 36px.
        </p>
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
        <h2 className="doc-h2">Variants</h2>
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
        <h2 className="doc-h2">Color</h2>
        <p className="doc-note">
          The spinner uses <code>currentColor</code>, so the easiest way
          to theme it is to set <code>color</code> on a wrapping element.
          You can also pass <code>color</code> directly as a prop.
        </p>
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
        <h2 className="doc-h2">With visible label</h2>
        <p className="doc-note">
          A screen-reader-only label is always rendered (defaulting to{' '}
          <code>"Loading"</code>). Pass <code>showLabel</code> to also
          show it visibly next to the indicator.
        </p>
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
        <h2 className="doc-h2">Inside a button</h2>
        <p className="doc-note">
          Because the spinner inherits color, dropping it into a native
          button (or any component) just works.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>'ring' | 'dots' | 'pencil'</code></td>
              <td><code>'ring'</code></td>
              <td>
                Visual style. <code>'ring'</code> rotates a 1/3 arc,{' '}
                <code>'dots'</code> pulses three circles, <code>'pencil'</code>{' '}
                redraws a short scribble.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Fixed pixel size: 16 / 24 / 36.</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td><code>currentColor</code></td>
              <td>
                Optional CSS color override. When omitted, the spinner
                inherits its color from the surrounding text.
              </td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td><code>'Loading'</code></td>
              <td>
                Screen-reader-visible loading text. Always rendered (in an
                SR-only span unless <code>showLabel</code> is true).
              </td>
            </tr>
            <tr>
              <td><code>showLabel</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Render <code>label</code> as visible text next to the spinner.</td>
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
          The component renders a <code>&lt;span&gt;</code> with{' '}
          <code>role="status"</code> and forwards a ref to it. All native
          span attributes are accepted.
        </p>
      </section>
    </article>
  );
}
