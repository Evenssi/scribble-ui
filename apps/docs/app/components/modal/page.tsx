'use client';

import { useState } from 'react';
import { Button, Input, Modal } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function ModalDocPage() {
  // Each demo gets its own open state so they don't interfere with one another.
  const [basicOpen, setBasicOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [stickyOpen, setStickyOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formName, setFormName] = useState('');

  return (
    <article className="doc">
      <h1 className="doc-title">Modal</h1>
      <p className="doc-lede">
        A centered, focus-trapped dialog that portals into{' '}
        <code>document.body</code>. ESC and overlay click close it by
        default; both can be opted out for confirmation flows. The first
        focusable element inside the panel is auto-focused on open, and
        focus is restored on close.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          The minimum viable Modal: pass a string <code>header</code> (which
          becomes the dialog's accessible name automatically), some body
          content, and wire <code>open</code> + <code>onClose</code>.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => setBasicOpen(true)}>Open dialog</Button>
          </div>
          <Modal
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            header="Welcome to scribble-ui"
          >
            <p style={{ margin: 0 }}>
              This is a Modal. Press <kbd>Esc</kbd>, click the overlay, or
              hit the <code>✕</code> button to close. Tab and Shift+Tab
              cycle within the panel — you can&apos;t leave it with the
              keyboard until it&apos;s closed.
            </p>
          </Modal>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three width presets: <code>sm</code> (360px), <code>md</code>{' '}
          (520px, default) and <code>lg</code> (720px). Padding and shadow
          weight scale with the size.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 'var(--su-space-2)', flexWrap: 'wrap' }}>
            <Button size="sm" onClick={() => setSmallOpen(true)}>
              Open sm
            </Button>
            <Button onClick={() => setMediumOpen(true)}>Open md</Button>
            <Button size="lg" onClick={() => setLargeOpen(true)}>
              Open lg
            </Button>
          </div>

          <Modal
            open={smallOpen}
            onClose={() => setSmallOpen(false)}
            size="sm"
            header="Compact"
            footer={<Button size="sm" onClick={() => setSmallOpen(false)}>OK</Button>}
          >
            <p style={{ margin: 0 }}>
              Snug padding, body-small text. Good for short confirmations.
            </p>
          </Modal>

          <Modal
            open={mediumOpen}
            onClose={() => setMediumOpen(false)}
            size="md"
            header="Default"
            footer={<Button size="sm" onClick={() => setMediumOpen(false)}>OK</Button>}
          >
            <p style={{ margin: 0 }}>
              The default size matches most form dialogs and product
              announcements. Pair the footer slot with one or two
              <code> Button size="sm"</code> actions.
            </p>
          </Modal>

          <Modal
            open={largeOpen}
            onClose={() => setLargeOpen(false)}
            size="lg"
            header="Roomy"
            footer={
              <>
                <Button size="sm" onClick={() => setLargeOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" onClick={() => setLargeOpen(false)}>
                  Save
                </Button>
              </>
            }
          >
            <p style={{ marginTop: 0 }}>
              Use <code>lg</code> for content-heavy dialogs — multi-step
              wizards, rich previews, or anything that would otherwise
              feel cramped at <code>md</code>.
            </p>
            <p style={{ marginBottom: 0, color: 'var(--su-ink-muted)' }}>
              The body slot scrolls independently when the content
              overflows, so the header and footer stay pinned and the
              action buttons remain reachable without scrolling.
            </p>
          </Modal>
        </div>
      </section>

      {/* === Confirm (sticky) ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Confirmation (sticky)</h2>
        <p className="doc-note">
          For destructive or otherwise consequential actions, opt out of
          overlay click and ESC so the user is forced to make an explicit
          choice via a footer button.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Delete project…
            </Button>
          </div>
          <Modal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            size="sm"
            header="Delete this project?"
            closeOnOverlayClick={false}
            closeOnEscape={false}
            showCloseButton={false}
            footer={
              <>
                <Button size="sm" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setConfirmOpen(false)}
                >
                  Delete
                </Button>
              </>
            }
          >
            <p style={{ margin: 0 }}>
              This will permanently remove the project and all of its
              sticky notes. You can&apos;t undo this.
            </p>
          </Modal>
        </div>
      </section>

      {/* === Custom header ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Custom header (ReactNode)</h2>
        <p className="doc-note">
          A string <code>header</code> auto-wires <code>aria-labelledby</code>.
          When you pass a <code>ReactNode</code> instead, supply the id
          yourself so screen readers still announce a name.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => setStickyOpen(true)}>Open with custom header</Button>
          </div>
          <Modal
            open={stickyOpen}
            onClose={() => setStickyOpen(false)}
            aria-labelledby="sticky-header-title"
            header={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--su-space-2)',
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 'var(--su-font-size-h2)' }}>
                  📒
                </span>
                <h2
                  id="sticky-header-title"
                  className="su-modal__title"
                  style={{ margin: 0 }}
                >
                  New sticky note
                </h2>
              </div>
            }
            footer={
              <Button size="sm" variant="primary" onClick={() => setStickyOpen(false)}>
                Add note
              </Button>
            }
          >
            <p style={{ margin: 0 }}>
              Use the <code>header</code> slot as a full layout area when
              you need an icon, a tag, or any other adornment alongside
              the title.
            </p>
          </Modal>
        </div>
      </section>

      {/* === Form inside ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With a form (focus trap)</h2>
        <p className="doc-note">
          The first focusable element inside the panel is auto-focused on
          open — here, the <code>Input</code>. Tab moves to the buttons and
          loops back; Shift+Tab loops the other way. Focus is restored to
          the trigger when the dialog closes.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => setFormOpen(true)}>Rename project…</Button>
          </div>
          <Modal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            header="Rename project"
            footer={
              <>
                <Button size="sm" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setFormOpen(false)}
                  disabled={formName.trim().length === 0}
                >
                  Save
                </Button>
              </>
            }
          >
            <Input
              placeholder="e.g. Sketchbook 2026"
              helperText="Pick something short — it shows up in the tab bar."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              clearable
            />
          </Modal>
          <p className="doc-note">
            Current draft: <code>{formName.trim() || '(empty)'}</code>
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { useState } from 'react';
import { Button, Modal } from 'scribble-ui';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header="Welcome to scribble-ui"
        footer={
          <Button size="sm" variant="primary" onClick={() => setOpen(false)}>
            Got it
          </Button>
        }
      >
        Press Esc, click the overlay, or hit the close button to close.
      </Modal>
    </>
  );
}

// Sticky confirmation: force an explicit click on a footer button.
<Modal
  open={open}
  onClose={() => setOpen(false)}
  size="sm"
  header="Delete this project?"
  closeOnOverlayClick={false}
  closeOnEscape={false}
  showCloseButton={false}
  footer={<Button variant="danger" onClick={confirm}>Delete</Button>}
>
  This action cannot be undone.
</Modal>`}</code>
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
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Required. Whether the dialog is rendered.</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Required. Fired on ESC, overlay click, or the built-in close button.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Width preset. Also bumps padding and shadow weight.</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Slot above the body. A <code>string</code> becomes an{' '}
                <code>&lt;h2&gt;</code> with auto-wired{' '}
                <code>aria-labelledby</code>.
              </td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Slot below the body — typically right-aligned action buttons.</td>
            </tr>
            <tr>
              <td><code>showCloseButton</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render the built-in <code>✕</code> button in the top-right corner.</td>
            </tr>
            <tr>
              <td><code>closeOnOverlayClick</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Close when the dimmed backdrop is clicked.</td>
            </tr>
            <tr>
              <td><code>closeOnEscape</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Close when the user presses <kbd>Esc</kbd>.</td>
            </tr>
            <tr>
              <td><code>aria-labelledby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Override the auto-wired id derived from a string <code>header</code>.</td>
            </tr>
            <tr>
              <td><code>aria-describedby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Optional id for a body element used as the description.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the panel.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
