'use client';

import { useState } from 'react';
import { Button } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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

export function ButtonDocClient({ t }: { t: ComponentDoc }) {
  // A tiny stateful demo that flips loading on/off so visitors can
  // actually feel the behavior without reading the source first.
  const [pending, setPending] = useState(false);

  function fakeSave() {
    setPending(true);
    window.setTimeout(() => setPending(false), 1500);
  }

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Variants × sizes ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.variantsAndSizes}</h2>
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
        <h2 className="doc-h2">{t.sections.colors}</h2>
        <p className="doc-note">{t.notes.colors}</p>
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
        <h2 className="doc-h2">{t.sections.states}</h2>
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
        <h2 className="doc-h2">{t.sections.withIcons}</h2>
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
        <h2 className="doc-h2">{t.sections.blockAndInteractive}</h2>
        <div className="doc-demo doc-demo--column">
          <Button block variant="primary" loading={pending} onClick={fakeSave}>
            {pending ? 'Saving…' : 'Save changes'}
          </Button>
          <p className="doc-note">{t.notes.blockAndInteractive}</p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td>
                <code>
                  'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.loading?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>iconPosition</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'left'</code></td>
              <td>{t.api.rows.iconPosition?.description}</td>
            </tr>
            <tr>
              <td><code>block</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.block?.description}</td>
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
        <p className="doc-note">{t.notes.apiFooter}</p>
      </section>
    </article>
  );
}
