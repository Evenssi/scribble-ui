'use client';

import { useState } from 'react';
import { Button, Input, Modal } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function ModalDocClient({ t }: { t: ComponentDoc }) {
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
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
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
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
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
        <h2 className="doc-h2">{t.sections.confirm}</h2>
        <p className="doc-note">{t.notes.confirm}</p>
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
        <h2 className="doc-h2">{t.sections.customHeader}</h2>
        <p className="doc-note">{t.notes.customHeader}</p>
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
        <h2 className="doc-h2">{t.sections.formInside}</h2>
        <p className="doc-note">{t.notes.formInside}</p>
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
            {t.notes.formInsideDraft} <code>{formName.trim() || '(empty)'}</code>
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.open?.description}</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClose?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>header</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.header?.description}</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.footer?.description}</td>
            </tr>
            <tr>
              <td><code>showCloseButton</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showCloseButton?.description}</td>
            </tr>
            <tr>
              <td><code>closeOnOverlayClick</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.closeOnOverlayClick?.description}</td>
            </tr>
            <tr>
              <td><code>closeOnEscape</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.closeOnEscape?.description}</td>
            </tr>
            <tr>
              <td><code>aria-labelledby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.ariaLabelledby?.description}</td>
            </tr>
            <tr>
              <td><code>aria-describedby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.ariaDescribedby?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
