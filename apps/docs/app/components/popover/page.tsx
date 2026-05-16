'use client';

import { useState } from 'react';
import { Button, Popover } from 'scribble-ui';

export default function PopoverDocPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [confirmCount, setConfirmCount] = useState(0);

  return (
    <article className="doc">
      <h1 className="doc-title">Popover</h1>
      <p className="doc-lede">
        A floating, interactive panel anchored to a trigger. Sibling to{' '}
        <code>Tooltip</code>, but built for rich content: forms, action
        rows, links — anything the user needs to actually click or type
        into. Portals into <code>document.body</code>, auto-flips on
        overflow, and dismisses on click-outside / <kbd>Esc</kbd>.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Default trigger is <code>'click'</code>. Click the button to
          open the popover; click outside or press <kbd>Esc</kbd> to
          dismiss.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Popover
              content={
                <p style={{ margin: 0 }}>
                  This is a plain popover. You can click the link
                  inside:{' '}
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
        <h2 className="doc-h2">Title &amp; footer</h2>
        <p className="doc-note">
          Pass <code>title</code> and <code>footer</code> to render the
          three classic regions of a small dialog. The title is wired
          to the popover via <code>aria-labelledby</code> for screen
          readers automatically.
        </p>
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
            Confirms so far: <code>{confirmCount}</code>
          </p>
        </div>
      </section>

      {/* === Trigger modes =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Trigger modes</h2>
        <p className="doc-note">
          Default is <code>'click'</code> — heavier than Tooltip's hover
          default because popover content is interactive.
          <code>'hover'</code> mode includes a grace period
          (<code>closeDelay</code>, default <code>150ms</code>) so users
          can drift between the trigger and the surface without it
          slamming shut. Use <code>'manual'</code> with{' '}
          <code>open</code> + <code>onOpenChange</code> for fully
          controlled behavior.
        </p>
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
            Controlled state: <code>{controlledOpen ? 'open' : 'closed'}</code>
          </p>
        </div>
      </section>

      {/* === Placement / no arrow / disabled trigger ========= */}
      <section className="doc-section">
        <h2 className="doc-h2">Placement, arrow &amp; disabled trigger</h2>
        <p className="doc-note">
          Four placements: <code>top</code>, <code>bottom</code>{' '}
          (default), <code>left</code>, <code>right</code>. The popover
          auto-flips when there is not enough room. Set{' '}
          <code>showArrow={'{false}'}</code> to drop the arrow for a
          cleaner card look. For triggers with the native{' '}
          <code>disabled</code> attribute, set{' '}
          <code>wrapDisabledTrigger</code> so events fire on a wrapper{' '}
          <code>span</code>.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Required. The interactive body of the popover. A falsy
                value (<code>null</code> / <code>undefined</code> /{' '}
                <code>false</code>) disables the popover without
                unmounting the trigger.
              </td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Optional header. When present, the popover root is
                labelled by it via <code>aria-labelledby</code>.
              </td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Optional footer slot, typically a row of action buttons.</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactElement</code></td>
              <td><code>—</code></td>
              <td>
                Required. A single React element that will receive the
                injected ref, event handlers, and{' '}
                <code>aria-haspopup</code> / <code>aria-expanded</code> /{' '}
                <code>aria-controls</code>.
              </td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td><code>'click' | 'hover' | 'focus' | 'manual' | array</code></td>
              <td><code>'click'</code></td>
              <td>
                Which interactions open the popover.{' '}
                <code>'manual'</code> turns them all off — pair with{' '}
                <code>open</code> for full control.
              </td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
              <td><code>'bottom'</code></td>
              <td>Preferred side. Auto-flips to the opposite side when needed.</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>12</code></td>
              <td>Pixels between the trigger edge and the popover surface.</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Controlled open state. Pair with <code>onOpenChange</code>.</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Initial state in uncontrolled mode.</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>(open: boolean) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fires for every open/close attempt (controlled or not).</td>
            </tr>
            <tr>
              <td><code>closeOnEsc</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Close when the user presses Escape.</td>
            </tr>
            <tr>
              <td><code>closeOnClickOutside</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                Close when the user clicks outside both trigger and
                popover. Listens on <code>mousedown</code> so internal
                click handlers always run first.
              </td>
            </tr>
            <tr>
              <td><code>showArrow</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Whether to render the hand-drawn arrow pointing at the trigger.</td>
            </tr>
            <tr>
              <td><code>openDelay</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>
                Hover-mode delay before opening, in milliseconds. Click
                trigger ignores this for snappy feedback.
              </td>
            </tr>
            <tr>
              <td><code>closeDelay</code></td>
              <td><code>number</code></td>
              <td><code>150</code></td>
              <td>
                Hover-mode delay before closing — the "grace period"
                that lets users drift onto the popover surface.
              </td>
            </tr>
            <tr>
              <td><code>wrapDisabledTrigger</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Wrap the trigger in a <code>span</code> so events fire
                even when the inner element is <code>disabled</code>.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the popover root.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The popover root has <code>role="dialog"</code> and{' '}
          <code>aria-modal={'{false}'}</code> — it is intentionally{' '}
          <em>not</em> a focus trap. Tab through content naturally; if
          focus leaves to a non-trigger element, the popover closes.
        </p>
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
