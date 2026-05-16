'use client';

import { useState } from 'react';
import { Button, Drawer } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function DrawerDocClient({ t }: { t: ComponentDoc }) {
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
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Placements ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.placements}</h2>
        <p className="doc-note">{t.notes.placements}</p>
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
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
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
        <h2 className="doc-h2">{t.sections.headerFooter}</h2>
        <p className="doc-note">{t.notes.headerFooter}</p>
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
        <h2 className="doc-h2">{t.sections.sticky}</h2>
        <p className="doc-note">{t.notes.sticky}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>placement</code></td>
              <td><code>'left' | 'right' | 'top' | 'bottom'</code></td>
              <td><code>'right'</code></td>
              <td>{t.api.rows.placement?.description}</td>
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
