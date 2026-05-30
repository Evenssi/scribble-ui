'use client';

import { useState } from 'react';
import { Button, Popover } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function PopoverDocClient({ t }: { t: ComponentDoc }) {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [confirmCount, setConfirmCount] = useState(0);

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
            <Popover
              content={
                <p style={{ margin: 0 }}>
                  This is a plain popover. You can click the link
                  inside:{' '}
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: 'var(--su-color-brand-deep)' }}
                  >
                    Learn more
                  </a>
                  .
                </p>
              }
            >
              <Button>Open popover</Button>
            </Popover>

            <Popover
              content={
                <p style={{ margin: 0 }}>
                  Popovers can host any rich content — markdown blurbs,
                  short forms, link lists, you name it.
                </p>
              }
            >
              <Button variant="primary">Rich content</Button>
            </Popover>
          </div>
        </div>
      </section>

      {/* === Title + footer ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.titleFooter}</h2>
        <p className="doc-note">{t.notes.titleFooter}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Popover
              title="Note details"
              content={
                <p style={{ margin: 0 }}>
                  Header-only popover — useful for short labelled
                  messages where there is nothing for the user to do.
                </p>
              }
            >
              <Button>Title only</Button>
            </Popover>

            <Popover
              title="Confirm action"
              content={
                <p style={{ margin: 0 }}>
                  Are you sure you want to publish this draft to the
                  shared workspace?
                </p>
              }
              footer={
                <ConfirmFooter
                  onConfirm={() => setConfirmCount((n) => n + 1)}
                />
              }
            >
              <Button variant="primary">Publish…</Button>
            </Popover>
          </div>
          <p className="doc-note">
            {t.notes.confirms} <code>{confirmCount}</code>
          </p>
        </div>
      </section>

      {/* === Trigger modes =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.triggers}</h2>
        <p className="doc-note">{t.notes.triggers}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Popover
              trigger="click"
              content={<span>Click to toggle. Esc dismisses.</span>}
            >
              <Button>Click trigger</Button>
            </Popover>

            <Popover
              trigger="hover"
              content={
                <span>
                  Hover the trigger; the surface stays open while your
                  cursor is on it.
                </span>
              }
            >
              <Button>Hover trigger</Button>
            </Popover>

            <Popover
              trigger="manual"
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              title="Controlled"
              content={
                <p style={{ margin: 0 }}>
                  I am driven entirely from outside state. The toggle
                  button on the right decides when I appear.
                </p>
              }
            >
              <Button>Controlled target</Button>
            </Popover>

            <Button
              variant="primary"
              onClick={() => setControlledOpen((v) => !v)}
            >
              {controlledOpen ? 'Hide' : 'Show'}
            </Button>
          </div>
          <p className="doc-note">
            {t.notes.controlledState} <code>{controlledOpen ? 'open' : 'closed'}</code>
          </p>
        </div>
      </section>

      {/* === Placement / no arrow / disabled trigger ========= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.placement}</h2>
        <p className="doc-note">{t.notes.placement}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              gap: 'var(--su-space-3)',
              flexWrap: 'wrap',
              padding: 'var(--su-space-5) 0',
            }}
          >
            <Popover placement="top" content={<span>Above the trigger.</span>}>
              <Button>Top</Button>
            </Popover>
            <Popover
              placement="bottom"
              content={<span>Below the trigger (default).</span>}
            >
              <Button>Bottom</Button>
            </Popover>
            <Popover placement="left" content={<span>Left of the trigger.</span>}>
              <Button>Left</Button>
            </Popover>
            <Popover placement="right" content={<span>Right of the trigger.</span>}>
              <Button>Right</Button>
            </Popover>
          </div>

          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Popover
              showArrow={false}
              title="No arrow"
              content={
                <p style={{ margin: 0 }}>
                  This popover renders without the little hand-drawn tip,
                  so it reads more like a free-floating card.
                </p>
              }
            >
              <Button>showArrow=false</Button>
            </Popover>

            <Popover
              wrapDisabledTrigger
              content={
                <p style={{ margin: 0 }}>
                  You need editor access to publish. Ask your workspace
                  owner for a role upgrade.
                </p>
              }
            >
              <Button disabled>Publish (disabled)</Button>
            </Popover>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Button, Popover } from 'scribble-ui';

// Basic — click to open, click-outside or Esc to close.
<Popover content={<p>Hi! I'm interactive.</p>}>
  <Button>Open</Button>
</Popover>

// Title + footer (a tiny non-modal dialog).
<Popover
  title="Delete this note?"
  content={<p>This action cannot be undone.</p>}
  footer={
    <>
      <Button size="sm">Cancel</Button>
      <Button size="sm" variant="danger">Delete</Button>
    </>
  }
>
  <Button variant="danger">Delete…</Button>
</Popover>

// Hover trigger with grace period (default 150ms).
<Popover trigger="hover" content={<span>Drift onto me!</span>}>
  <Button>Hover me</Button>
</Popover>

// Fully controlled.
const [open, setOpen] = useState(false);
<Popover trigger="manual" open={open} onOpenChange={setOpen} content={<p>...</p>}>
  <Button>Target</Button>
</Popover>

// Disabled trigger needs the wrapper span.
<Popover wrapDisabledTrigger content={<p>Need editor access.</p>}>
  <Button disabled>Publish</Button>
</Popover>`}</code>
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
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.content?.description}</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.title?.description}</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.footer?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactElement</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td><code>'click' | 'hover' | 'focus' | 'manual' | array</code></td>
              <td><code>'click'</code></td>
              <td>{t.api.rows.trigger?.description}</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
              <td><code>'bottom'</code></td>
              <td>{t.api.rows.placement?.description}</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>12</code></td>
              <td>{t.api.rows.offset?.description}</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.open?.description}</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.defaultOpen?.description}</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>(open: boolean) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onOpenChange?.description}</td>
            </tr>
            <tr>
              <td><code>closeOnEsc</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.closeOnEsc?.description}</td>
            </tr>
            <tr>
              <td><code>closeOnClickOutside</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.closeOnClickOutside?.description}</td>
            </tr>
            <tr>
              <td><code>showArrow</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showArrow?.description}</td>
            </tr>
            <tr>
              <td><code>openDelay</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>{t.api.rows.openDelay?.description}</td>
            </tr>
            <tr>
              <td><code>closeDelay</code></td>
              <td><code>number</code></td>
              <td><code>150</code></td>
              <td>{t.api.rows.closeDelay?.description}</td>
            </tr>
            <tr>
              <td><code>wrapDisabledTrigger</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.wrapDisabledTrigger?.description}</td>
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

/**
 * Local footer used by the "Title & footer" demo. Lives in the same
 * file so the docs page stays self-contained.
 */
function ConfirmFooter({ onConfirm }: { onConfirm: () => void }) {
  return (
    <>
      <Button size="sm">Cancel</Button>
      <Button size="sm" variant="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  );
}
