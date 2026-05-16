'use client';

import { useState } from 'react';
import { Button } from 'scribble-ui';

/**
 * Tiny inline icons used in the docs demo. Real consumers will plug in
 * their favorite icon set (lucide-react, react-icons, …); we keep the
 * docs site dependency-free.
 */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ButtonDocPage() {
  // A tiny stateful demo that flips loading on/off so visitors can
  // actually feel the behavior without reading the source first.
  const [pending, setPending] = useState(false);

  function fakeSave() {
    setPending(true);
    window.setTimeout(() => setPending(false), 1500);
  }

  return (
    <article className="doc">
      <h1 className="doc-title">Button</h1>
      <p className="doc-lede">
        A hand-drawn looking button. Hover to feel the wobble level rise,
        press it to peak — every visual is driven by tokens and the shared
        SVG filter, no per-component styling required.
      </p>

      {/* === Variants × sizes ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Variants &amp; sizes</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="default" size="sm">Default · sm</Button>
            <Button variant="default" size="md">Default · md</Button>
            <Button variant="default" size="lg">Default · lg</Button>
          </div>
          <div className="doc-demo-row">
            <Button variant="primary" size="sm">Primary · sm</Button>
            <Button variant="primary" size="md">Primary · md</Button>
            <Button variant="primary" size="lg">Primary · lg</Button>
          </div>
        </div>
      </section>

      {/* === Status colors =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Colors</h2>
        <p className="doc-note">
          Status variants reuse the same palette as Tag &amp; status surfaces,
          so a destructive action looks unmistakably destructive without any
          custom styling.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="info">Info</Button>
          </div>
          <div className="doc-demo-row">
            <Button variant="success" icon={<PlusIcon />}>Approve</Button>
            <Button variant="danger" icon={<PlusIcon />}>Delete</Button>
            <Button variant="info" icon={<ArrowIcon />} iconPosition="right">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button>Idle</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="primary" loading>
              Saving…
            </Button>
          </div>
        </div>
      </section>

      {/* === Icons =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With icons</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="primary" icon={<PlusIcon />}>
              New note
            </Button>
            <Button icon={<ArrowIcon />} iconPosition="right">
              Continue
            </Button>
            <Button variant="primary" icon={<PlusIcon />} aria-label="Add" />
          </div>
        </div>
      </section>

      {/* === Block + interactive demo ======================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Block &amp; interactive loading</h2>
        <div className="doc-demo doc-demo--column">
          <Button block variant="primary" loading={pending} onClick={fakeSave}>
            {pending ? 'Saving…' : 'Save changes'}
          </Button>
          <p className="doc-note">
            Click the button — it flips to a loading state for 1.5s and
            ignores extra clicks while busy.
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Button } from 'scribble-ui';

export function Example() {
  const [pending, setPending] = useState(false);

  return (
    <>
      <Button variant="primary" icon={<PlusIcon />}>
        New note
      </Button>

      <Button
        block
        variant="primary"
        loading={pending}
        onClick={async () => {
          setPending(true);
          await save();
          setPending(false);
        }}
      >
        Save changes
      </Button>
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
              <td><code>variant</code></td>
              <td>
                <code>
                  'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>
                Visual variant. <code>'primary'</code> uses the brand green;
                the four status variants reuse the shared status palette so
                the button reads semantically without extra styling.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset. md is recommended for most call-to-actions.</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Shows a spinner in place of the icon and blocks click handlers.
                Sets <code>aria-busy="true"</code>.
              </td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Inline icon rendered next to the label. Replaced by the spinner while loading.</td>
            </tr>
            <tr>
              <td><code>iconPosition</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'left'</code></td>
              <td>Position of the icon relative to the label.</td>
            </tr>
            <tr>
              <td><code>block</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Stretch to the full width of the parent container.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Standard HTML disabled attribute. Also sets <code>aria-disabled</code>.</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Click handler. Suppressed while <code>loading</code> is true.</td>
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
          The component also forwards a ref to the underlying{' '}
          <code>HTMLButtonElement</code> and accepts every native button
          attribute (<code>type</code>, <code>aria-*</code>, <code>data-*</code>, etc.).
        </p>
      </section>
    </article>
  );
}
