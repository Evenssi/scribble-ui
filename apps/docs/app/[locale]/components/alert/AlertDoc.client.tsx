'use client';

import { useState } from 'react';
import { Alert, Button } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function AlertDocClient({ t }: { t: ComponentDoc }) {
  // Controlled-visibility demo: an external button re-opens the alert
  // after the user dismisses it.
  const [open, setOpen] = useState(true);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Variants ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.variants}</h2>
        <p className="doc-note">{t.notes.variants}</p>
        <div className="doc-demo doc-demo--column">
          <Alert variant="info" title="Heads up">
            A new collaborator just joined this workspace.
          </Alert>
          <Alert variant="success" title="Saved">
            Your changes are safely on the server.
          </Alert>
          <Alert variant="warning" title="Running low">
            You've used 92% of your monthly quota.
          </Alert>
          <Alert variant="error" title="Couldn't connect">
            Check your network and try again.
          </Alert>
        </div>
      </section>

      {/* === Title only ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.titleOnly}</h2>
        <p className="doc-note">{t.notes.titleOnly}</p>
        <div className="doc-demo doc-demo--column">
          <Alert variant="success" title="All systems operational." />
          <Alert variant="warning" title="2 fields need your attention." />
        </div>
      </section>

      {/* === Description only ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.descriptionOnly}</h2>
        <p className="doc-note">{t.notes.descriptionOnly}</p>
        <div className="doc-demo doc-demo--column">
          <Alert variant="info">
            Passwords must contain at least 8 characters, one number
            and one symbol.
          </Alert>
          <Alert variant="error">
            Upload failed — the file is larger than 20 MB.
          </Alert>
        </div>
      </section>

      {/* === Icon customisation =============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customNoIcon}</h2>
        <p className="doc-note">{t.notes.customNoIcon}</p>
        <div className="doc-demo doc-demo--column">
          <Alert
            variant="info"
            icon={<SparkleIcon />}
            title="What's new"
          >
            Drag-and-drop ordering landed in the sidebar today.
          </Alert>
          <Alert variant="warning" icon={false} title="Maintenance tonight">
            We'll be offline between 02:00 and 02:30 UTC for a deploy.
          </Alert>
        </div>
      </section>

      {/* === Closable (uncontrolled) ========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.closableUncontrolled}</h2>
        <p className="doc-note">{t.notes.closableUncontrolled}</p>
        <div className="doc-demo doc-demo--column">
          <Alert
            variant="info"
            closable
            title="Tip"
            onClose={() => {
              // Consumers can run side effects here (analytics, etc.)
            }}
          >
            You can customise the close button's label via{' '}
            <code>closeAriaLabel</code>.
          </Alert>
        </div>
      </section>

      {/* === Closable (controlled) ============================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.closableControlled}</h2>
        <p className="doc-note">{t.notes.closableControlled}</p>
        <div className="doc-demo doc-demo--column">
          <Alert
            variant="warning"
            closable
            visible={open}
            onClose={() => setOpen(false)}
            title="Unsaved changes"
          >
            You have edits that haven't been saved yet.
          </Alert>
          <div className="doc-demo-row">
            <Button variant="primary" onClick={() => setOpen(true)}>
              Show the alert again
            </Button>
            <Button onClick={() => setOpen(false)} disabled={!open}>
              Dismiss
            </Button>
          </div>
        </div>
      </section>

      {/* === Banner =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.banner}</h2>
        <p className="doc-note">{t.notes.banner}</p>
        <div className="doc-demo doc-demo--column">
          <Alert
            variant="info"
            banner
            closable
            title="We just refreshed the docs"
          >
            New sections for Alert, Result and Timeline. Happy
            browsing!
          </Alert>
          <Alert variant="error" banner title="Service disruption">
            The search index is rebuilding; results may be stale for a
            few minutes.
          </Alert>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Alert } from 'scribble-ui';

// Title + description.
<Alert variant="success" title="Saved">
  Your changes are safely on the server.
</Alert>

// Closable, uncontrolled — the alert unmounts itself on ✕.
<Alert variant="info" closable title="Tip">
  You can customise the close button label via \`closeAriaLabel\`.
</Alert>

// Closable, controlled — parent owns the visibility.
const [open, setOpen] = useState(true);

<Alert
  variant="warning"
  closable
  visible={open}
  onClose={() => setOpen(false)}
  title="Unsaved changes"
>
  You have edits that haven't been saved yet.
</Alert>

// Banner — flush, full-bleed strip for page-level notices.
<Alert variant="error" banner title="Service disruption">
  The search index is rebuilding; results may be stale.
</Alert>`}</code>
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
              <td><code>'info' | 'success' | 'warning' | 'error'</code></td>
              <td><code>'info'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.title?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode | false</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.closable?.description}</td>
            </tr>
            <tr>
              <td><code>visible</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.visible?.description}</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClose?.description}</td>
            </tr>
            <tr>
              <td><code>closeAriaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Close alert'</code></td>
              <td>{t.api.rows.closeAriaLabel?.description}</td>
            </tr>
            <tr>
              <td><code>banner</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.banner?.description}</td>
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
