'use client';

import { Button } from 'scribble-ui';
import './page.css';

export default function ButtonDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Button</h1>
      <p className="doc-lede">
        A hand-drawn looking button. Day 1 placeholder — token-based styling
        only; the SVG-filter wobble lands on Day 2.
      </p>

      {/* === Demo ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Demo</h2>

        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="default" size="sm">
              Default · sm
            </Button>
            <Button variant="default" size="md">
              Default · md
            </Button>
            <Button variant="default" size="lg">
              Default · lg
            </Button>
          </div>

          <div className="doc-demo-row">
            <Button variant="primary" size="sm">
              Primary · sm
            </Button>
            <Button variant="primary" size="md">
              Primary · md
            </Button>
            <Button variant="primary" size="lg">
              Primary · lg
            </Button>
          </div>

          <div className="doc-demo-row">
            <Button disabled>Disabled</Button>
            <Button onClick={() => alert('clicked')}>onClick alert</Button>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Button } from 'scribble-ui';

export function Example() {
  return (
    <>
      <Button variant="primary" size="md" onClick={() => alert('hi')}>
        Click me
      </Button>
      <Button disabled>Disabled</Button>
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
              <td>
                <code>variant</code>
              </td>
              <td>
                <code>'default' | 'primary'</code>
              </td>
              <td>
                <code>'default'</code>
              </td>
              <td>Visual variant. Primary uses the brand low-saturation green.</td>
            </tr>
            <tr>
              <td>
                <code>size</code>
              </td>
              <td>
                <code>'sm' | 'md' | 'lg'</code>
              </td>
              <td>
                <code>'md'</code>
              </td>
              <td>Size preset. md is recommended for most call-to-actions.</td>
            </tr>
            <tr>
              <td>
                <code>disabled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Standard HTML disabled attribute.</td>
            </tr>
            <tr>
              <td>
                <code>onClick</code>
              </td>
              <td>
                <code>(e: MouseEvent) =&gt; void</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Click handler. Native button semantics apply.</td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The component also forwards a ref to the underlying{' '}
          <code>HTMLButtonElement</code> and accepts every native button
          attribute (<code>type</code>, <code>aria-*</code>, <code>data-*</code>,
          etc.).
        </p>
      </section>
    </article>
  );
}
