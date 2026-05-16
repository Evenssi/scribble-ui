'use client';

import { useState } from 'react';
import { Button, Drawer } from 'scribble-ui';

export default function DrawerDocPage() {
  // Each demo gets its own open state so they don't interfere with one another.
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);

  const [framedOpen, setFramedOpen] = useState(false);
  const [stickyOpen, setStickyOpen] = useState(false);

  return (
    <article className="doc">
      <h1 className="doc-title">Drawer</h1>
      <p className="doc-lede">
        A side-anchored, focus-trapped panel that slides in from any of
        the four viewport edges. Shares the Modal&apos;s scroll lock,
        focus trap, ESC handling and overlay click rules — only the
        anchoring + slide-in animation differ. Closes on ESC and overlay
        click by default; both can be opted out for confirmation flows.
      </p>

      {/* === Placements ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Placements</h2>
        <p className="doc-note">
          The <code>placement</code> prop picks which viewport edge the
          drawer hugs. <code>'left'</code> and <code>'right'</code>{' '}
          drawers fill the viewport vertically and the <code>size</code>{' '}
          token controls width; <code>'top'</code> and{' '}
          <code>'bottom'</code> drawers fill the viewport horizontally
          and the <code>size</code> token controls height.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => setLeftOpen(true)}>Open left</Button>
            <Button onClick={() => setRightOpen(true)}>Open right</Button>
            <Button onClick={() => setTopOpen(true)}>Open top</Button>
            <Button onClick={() => setBottomOpen(true)}>Open bottom</Button>
          </div>

          <Drawer
            open={leftOpen}
            onClose={() => setLeftOpen(false)}
            placement="left"
            header="Left drawer"
          >
            <p style={{ margin: 0 }}>
              Slides in from the left edge. Common pattern for a primary
              navigation panel on narrow viewports.
            </p>
          </Drawer>

          <Drawer
            open={rightOpen}
            onClose={() => setRightOpen(false)}
            placement="right"
            header="Right drawer"
          >
            <p style={{ margin: 0 }}>
              Slides in from the right edge — a natural home for detail
              inspectors, filter panels and contextual editors.
            </p>
          </Drawer>

          <Drawer
            open={topOpen}
            onClose={() => setTopOpen(false)}
            placement="top"
            header="Top drawer"
          >
            <p style={{ margin: 0 }}>
              Slides down from the top. Useful for global notifications
              or a temporary command palette banner.
            </p>
          </Drawer>

          <Drawer
            open={bottomOpen}
            onClose={() => setBottomOpen(false)}
            placement="bottom"
            header="Bottom drawer"
          >
            <p style={{ margin: 0 }}>
              Slides up from the bottom. Mirrors the iOS / Android
              bottom-sheet pattern and works great for action menus.
            </p>
          </Drawer>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three presets per axis. For left/right drawers:{' '}
          <code>sm</code> = 300px, <code>md</code> = 420px (default),{' '}
          <code>lg</code> = 560px width. For top/bottom drawers the
          numbers map to height instead (200 / 320 / 460px).
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button size="sm" onClick={() => setSmallOpen(true)}>
              Open sm
            </Button>
            <Button onClick={() => setMediumOpen(true)}>Open md</Button>
            <Button size="lg" onClick={() => setLargeOpen(true)}>
              Open lg
            </Button>
          </div>

          <Drawer
            open={smallOpen}
            onClose={() => setSmallOpen(false)}
            placement="right"
            size="sm"
            header="Compact"
          >
            <p style={{ margin: 0 }}>
              Snug 300px column — great for a quick filter strip or a
              tag picker.
            </p>
          </Drawer>

          <Drawer
            open={mediumOpen}
            onClose={() => setMediumOpen(false)}
            placement="right"
            size="md"
            header="Default"
          >
            <p style={{ margin: 0 }}>
              The default 420px width works for most inspectors and side
              forms — wide enough for two-column labels without crowding
              the canvas behind.
            </p>
          </Drawer>

          <Drawer
            open={largeOpen}
            onClose={() => setLargeOpen(false)}
            placement="right"
            size="lg"
            header="Roomy"
          >
            <p style={{ margin: 0 }}>
              The 560px size fits richer editors — settings screens,
              entity detail views, anything that would otherwise feel
              cramped at <code>md</code>.
            </p>
          </Drawer>
        </div>
      </section>

      {/* === With header & footer ============================ */}
      <section className="doc-section">
        <h2 className="doc-h2">With header &amp; footer</h2>
        <p className="doc-note">
          A string <code>header</code> auto-wires{' '}
          <code>aria-labelledby</code>, and the <code>footer</code> slot
          lays out action buttons aligned to the right via the same
          dashed divider used by Modal.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => setFramedOpen(true)}>
              Open with header &amp; footer
            </Button>
          </div>
          <Drawer
            open={framedOpen}
            onClose={() => setFramedOpen(false)}
            placement="right"
            header="Edit sticky note"
            footer={
              <>
                <Button size="sm" onClick={() => setFramedOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setFramedOpen(false)}
                >
                  Confirm
                </Button>
              </>
            }
          >
            <p style={{ marginTop: 0 }}>
              The body slot scrolls independently when content overflows,
              so the header and footer stay pinned and the action
              buttons remain reachable without scrolling the page.
            </p>
            <p style={{ marginBottom: 0, color: 'var(--su-ink-muted)' }}>
              First focusable element inside the panel is auto-focused
              on open, and focus is restored to whichever element opened
              the drawer when it closes.
            </p>
          </Drawer>
        </div>
      </section>

      {/* === Sticky (no overlay click / no ESC) ============== */}
      <section className="doc-section">
        <h2 className="doc-h2">Disable overlay click &amp; ESC</h2>
        <p className="doc-note">
          For destructive or otherwise consequential actions, opt out of
          overlay click and ESC so the user is forced to make an
          explicit choice. The built-in <code>✕</code> and the footer
          buttons are then the only way to dismiss the drawer.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button variant="danger" onClick={() => setStickyOpen(true)}>
              Open sticky drawer
            </Button>
          </div>
          <Drawer
            open={stickyOpen}
            onClose={() => setStickyOpen(false)}
            placement="right"
            size="sm"
            header="Discard draft?"
            closeOnOverlayClick={false}
            closeOnEscape={false}
            footer={
              <>
                <Button size="sm" onClick={() => setStickyOpen(false)}>
                  Keep editing
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setStickyOpen(false)}
                >
                  Discard
                </Button>
              </>
            }
          >
            <p style={{ margin: 0 }}>
              Pressing <kbd>Esc</kbd> or clicking the dimmed backdrop
              does nothing here — the drawer stays open until you pick
              one of the footer actions or use the <code>✕</code>{' '}
              button.
            </p>
          </Drawer>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { useState } from 'react';
import { Button, Drawer } from 'scribble-ui';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        header="Edit sticky note"
        footer={
          <>
            <Button size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setOpen(false)}
            >
              Confirm
            </Button>
          </>
        }
      >
        Body content goes here.
      </Drawer>
    </>
  );
}

// Sticky drawer: force an explicit click on a footer action.
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  placement="right"
  size="sm"
  header="Discard draft?"
  closeOnOverlayClick={false}
  closeOnEscape={false}
  footer={<Button variant="danger" onClick={discard}>Discard</Button>}
>
  This action cannot be undone.
</Drawer>`}</code>
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
              <td>Required. Whether the drawer is rendered.</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>—</code></td>
              <td>
                Required. Fired on ESC, overlay click, or the built-in
                close button.
              </td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>'left' | 'right' | 'top' | 'bottom'</code></td>
              <td><code>'right'</code></td>
              <td>Which viewport edge the drawer slides in from.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>
                Width preset for left/right drawers; height preset for
                top/bottom drawers.
              </td>
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
              <td>
                Slot below the body — typically right-aligned action
                buttons.
              </td>
            </tr>
            <tr>
              <td><code>showCloseButton</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>
                Render the built-in <code>✕</code> button in the
                top-right corner.
              </td>
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
              <td>
                Override the auto-wired id derived from a string{' '}
                <code>header</code>.
              </td>
            </tr>
            <tr>
              <td><code>aria-describedby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Optional id for a body element used as the description.
              </td>
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
