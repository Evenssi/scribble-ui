'use client';

import { useState } from 'react';
import { Alert, Button } from 'scribble-ui';

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

export default function AlertDocPage() {
  // Controlled-visibility demo: an external button re-opens the alert
  // after the user dismisses it.
  const [open, setOpen] = useState(true);

  return (
    <article className="doc">
      <h1 className="doc-title">Alert</h1>
      <p className="doc-lede">
        A static, inline feedback strip that sits where you drop it on
        the page. Reach for Alert when a message should persist —
        "your plan expires in 3 days", "this form has 2 errors". For
        transient, system-driven pop-ups with auto-dismiss, use{' '}
        <code>Toast</code> instead.
      </p>

      {/* === Variants ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Variants</h2>
        <p className="doc-note">
          Four semantic variants, four hand-drawn glyphs. Each variant
          injects its accent (left stripe + icon) and note-style
          surface through component-scoped custom properties.
        </p>
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
        <h2 className="doc-h2">Title only</h2>
        <p className="doc-note">
          Skip the description for a single-line, glanceable alert.
        </p>
        <div className="doc-demo doc-demo--column">
          <Alert variant="success" title="All systems operational." />
          <Alert variant="warning" title="2 fields need your attention." />
        </div>
      </section>

      {/* === Description only ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Description only</h2>
        <p className="doc-note">
          Without a <code>title</code>, the body reads as a calm note —
          handy for inline contextual hints near a form field.
        </p>
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
        <h2 className="doc-h2">Custom &amp; no icon</h2>
        <p className="doc-note">
          Swap the built-in glyph with your own, or pass{' '}
          <code>icon={'{'}false{'}'}</code> to remove the icon slot
          entirely when the alert sits next to something visually
          loud already.
        </p>
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
        <h2 className="doc-h2">Closable (uncontrolled)</h2>
        <p className="doc-note">
          Add <code>closable</code> for a ✕ button in the top-right
          corner. By default the alert manages its own visibility —
          click ✕ and it unmounts itself.
        </p>
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
        <h2 className="doc-h2">Closable (controlled)</h2>
        <p className="doc-note">
          Pass <code>visible</code> to take full control of the
          alert's lifecycle — useful when the same message needs to
          come back after a retry or a route change.
        </p>
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
        <h2 className="doc-h2">Banner</h2>
        <p className="doc-note">
          <code>banner</code> strips the rounded corners, the hard
          offset shadow and the wobble filter — the alert becomes a
          flush full-bleed strip you can pin to the top of a page or
          layout region.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>'info' | 'success' | 'warning' | 'error'</code></td>
              <td><code>'info'</code></td>
              <td>
                Visual variant. Drives the accent color (left stripe
                + icon) and the note-style background. Also picks
                the ARIA role: <code>'warning' | 'error'</code> render
                as <code>role="alert"</code>, the other two as{' '}
                <code>role="status"</code>.
              </td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Bold heading rendered on the first line.</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Description body. When a <code>title</code> is also
                provided the two stack vertically.
              </td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode | false</code></td>
              <td><code>—</code></td>
              <td>
                Custom leading icon. Pass <code>false</code> to
                suppress the icon slot entirely. When unset, the
                variant's built-in glyph is rendered.
              </td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Show a ✕ close button in the top-right corner.</td>
            </tr>
            <tr>
              <td><code>visible</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>
                Controlled visibility. When provided the component
                stops managing its own dismissal; pass{' '}
                <code>false</code> to hide the alert.
              </td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired when the close button is activated.</td>
            </tr>
            <tr>
              <td><code>closeAriaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Close alert'</code></td>
              <td>Accessible label for the close button.</td>
            </tr>
            <tr>
              <td><code>banner</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Full-bleed strip mode — drops rounded corners, shadow
                and the wobble filter.
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
          The component forwards a ref to the underlying{' '}
          <code>HTMLDivElement</code> and accepts every native div
          attribute (<code>id</code>, <code>aria-*</code>,{' '}
          <code>data-*</code>, etc.).
        </p>
      </section>
    </article>
  );
}
