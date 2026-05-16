import { Divider } from 'scribble-ui';
// Reuse the Button page's doc-* class set so every docs page shares one stylesheet.

export default function DividerDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Divider</h1>
      <p className="doc-lede">
        A hand-drawn separator. Pick a stroke variant (solid, dashed, wavy),
        nudge the thickness, and optionally drop a label in the middle to
        break sections without resorting to extra typography.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          A bare horizontal divider — defaults to solid + default thickness.
        </p>
        <div className="doc-demo">
          <p>Above the line.</p>
          <Divider />
          <p>Below the line.</p>
        </div>
      </section>

      {/* === Variants ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Variants</h2>
        <p className="doc-note">
          Solid and dashed lean on CSS borders + the shared SVG-filter wobble.
          Wavy is painted with a repeating SVG so the curve stays crisp.
        </p>
        <div className="doc-demo doc-demo--column">
          <p>solid</p>
          <Divider variant="solid" />
          <p>dashed</p>
          <Divider variant="dashed" />
          <p>wavy</p>
          <Divider variant="wavy" />
        </div>
      </section>

      {/* === Thickness ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Thickness</h2>
        <p className="doc-note">
          Three presets mapped to the stroke tokens (<code>thin</code> /{' '}
          <code>default</code> / <code>bold</code>). For the wavy variant
          the SVG path's stroke-width is bumped instead of the border.
        </p>
        <div className="doc-demo doc-demo--column">
          <p>thin</p>
          <Divider thickness="thin" />
          <p>default</p>
          <Divider thickness="default" />
          <p>bold</p>
          <Divider thickness="bold" />
          <p>bold + dashed</p>
          <Divider thickness="bold" variant="dashed" />
          <p>bold + wavy</p>
          <Divider thickness="bold" variant="wavy" />
        </div>
      </section>

      {/* === With label ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With label</h2>
        <p className="doc-note">
          Pass <code>children</code> to drop a label in the middle. Use{' '}
          <code>labelAlign</code> to push it to the start or end.
        </p>
        <div className="doc-demo doc-demo--column">
          <Divider>OR</Divider>
          <Divider labelAlign="start">Today</Divider>
          <Divider labelAlign="end">Older</Divider>
          <Divider variant="dashed">section</Divider>
          <Divider variant="wavy">end of feed</Divider>
        </div>
      </section>

      {/* === Vertical ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Vertical</h2>
        <p className="doc-note">
          Drop a vertical divider into a flex row. The divider stretches to
          the row's cross-axis size via <code>align-self: stretch</code>.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ alignItems: 'stretch' }}>
            <span>Left</span>
            <Divider orientation="vertical" />
            <span>Middle</span>
            <Divider orientation="vertical" variant="dashed" />
            <span>Right</span>
            <Divider orientation="vertical" variant="wavy" />
            <span>End</span>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Divider } from 'scribble-ui';

export function Example() {
  return (
    <>
      {/* Bare horizontal */}
      <Divider />

      {/* Dashed + bold */}
      <Divider variant="dashed" thickness="bold" />

      {/* With a centered label */}
      <Divider>OR</Divider>

      {/* Label pushed to the start */}
      <Divider labelAlign="start">Today</Divider>

      {/* Vertical inside a flex row */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </>
  );
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
              <td><code>orientation</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
              <td>
                Layout orientation. Vertical dividers stretch to fill the
                cross-axis of a flex row; horizontal ones span the full width.
              </td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'solid' | 'dashed' | 'wavy'</code></td>
              <td><code>'solid'</code></td>
              <td>
                Stroke style. Solid and dashed use CSS borders + the
                hand-drawn wobble; wavy is painted with a repeating SVG.
              </td>
            </tr>
            <tr>
              <td><code>thickness</code></td>
              <td><code>'thin' | 'default' | 'bold'</code></td>
              <td><code>'default'</code></td>
              <td>
                Stroke thickness preset, mapped to the{' '}
                <code>--su-stroke-*</code> tokens.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Optional inline label. Splits a horizontal divider into two
                segments around the text. Ignored when{' '}
                <code>orientation</code> is <code>'vertical'</code>.
              </td>
            </tr>
            <tr>
              <td><code>labelAlign</code></td>
              <td><code>'start' | 'center' | 'end'</code></td>
              <td><code>'center'</code></td>
              <td>Where the label sits along the divider.</td>
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
          The component renders a <code>&lt;div role="separator"&gt;</code>{' '}
          with <code>aria-orientation</code> set, forwards a ref to the
          underlying <code>HTMLDivElement</code> and accepts every native
          div attribute (<code>aria-*</code>, <code>data-*</code>, etc.).
        </p>
      </section>
    </article>
  );
}
