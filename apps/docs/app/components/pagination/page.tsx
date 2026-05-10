'use client';

import { useState } from 'react';
import { Button, Pagination } from 'scribble-ui';
import '../button/page.css';

export default function PaginationDocPage() {
  // Basic controlled demo — drives the "reset to first" button below.
  const [page, setPage] = useState(1);

  // Separate state for the big-list demo so it doesn't share with others.
  const [bigPage, setBigPage] = useState(12);

  // Large window demo state.
  const [windowPage, setWindowPage] = useState(25);

  // Simple-mode demo state.
  const [simplePage, setSimplePage] = useState(3);

  return (
    <article className="doc">
      <h1 className="doc-title">Pagination</h1>
      <p className="doc-lede">
        Classic prev / page numbers / next, every button styled as its
        own little sticky-note. Data-driven — pass either{' '}
        <code>total</code> + <code>pageSize</code> or an explicit{' '}
        <code>totalPages</code>. Supports controlled and uncontrolled
        usage, with sensible defaults for every knob.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Uncontrolled. Ten items per page, one hundred total, so exactly
          ten pages — the whole sequence fits without ellipses.
        </p>
        <div className="doc-demo">
          <Pagination total={100} pageSize={10} defaultCurrent={1} />
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Drive the active page from outside with <code>current</code> +{' '}
          <code>onChange</code>. The button below resets the pager to
          page 1 no matter where it is.
        </p>
        <div className="doc-demo doc-demo--column">
          <div className="doc-demo-row">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              Reset to first page
            </Button>
            <span className="doc-note" style={{ marginLeft: 'auto' }}>
              Active: <code>{page}</code>
            </span>
          </div>
          <Pagination
            total={80}
            pageSize={10}
            current={page}
            onChange={setPage}
          />
        </div>
      </section>

      {/* === Large list with ellipses ======================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Large lists &amp; ellipses</h2>
        <p className="doc-note">
          <code>total=987, pageSize=20</code> — that's 50 pages. The
          sequence collapses to first-boundary · current window ·
          last-boundary, with an "…" note whenever the gap is wider than
          a single number.
        </p>
        <div className="doc-demo">
          <Pagination
            total={987}
            pageSize={20}
            current={bigPage}
            onChange={setBigPage}
          />
        </div>
      </section>

      {/* === Custom boundary / sibling count ================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Custom window width</h2>
        <p className="doc-note">
          <code>boundaryCount=2</code> keeps the first two and last two
          pages pinned; <code>siblingCount=2</code> widens the running
          window around the active page. Useful when you'd rather take
          horizontal space than make users read the ellipsis.
        </p>
        <div className="doc-demo">
          <Pagination
            totalPages={50}
            current={windowPage}
            onChange={setWindowPage}
            boundaryCount={2}
            siblingCount={2}
          />
        </div>
      </section>

      {/* === First / Last ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">First &amp; last jump buttons</h2>
        <p className="doc-note">
          Enable <code>showFirstLast</code> to add « and » for one-click
          jumps to the ends of the range. Off by default — most lists
          don't need four nav buttons on top of page numbers.
        </p>
        <div className="doc-demo">
          <Pagination totalPages={24} defaultCurrent={6} showFirstLast />
        </div>
      </section>

      {/* === Simple mode ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Simple mode</h2>
        <p className="doc-note">
          <code>simple</code> collapses the whole widget to prev / next
          plus a "current / total" readout. Great for mobile, or for
          pagers that live in a dense table toolbar.
        </p>
        <div className="doc-demo">
          <Pagination
            total={120}
            pageSize={10}
            simple
            current={simplePage}
            onChange={setSimplePage}
          />
        </div>
      </section>

      {/* === Size ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Small size</h2>
        <p className="doc-note">
          <code>size=&quot;small&quot;</code> — 28×28 squares instead of
          36. For tables and compact list footers.
        </p>
        <div className="doc-demo">
          <Pagination
            size="small"
            total={200}
            pageSize={10}
            defaultCurrent={4}
            showFirstLast
          />
        </div>
      </section>

      {/* === Disabled ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Disabled</h2>
        <p className="doc-note">
          Pass <code>disabled</code> to inert the entire group — every
          button reports <code>aria-disabled</code> and the wobble is
          dropped so the calm state is unmistakable.
        </p>
        <div className="doc-demo">
          <Pagination totalPages={10} defaultCurrent={5} disabled />
        </div>
      </section>

      {/* === Localised labels ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Localised labels</h2>
        <p className="doc-note">
          Every screen-reader string is overridable via{' '}
          <code>labels</code>. The numbers on the page buttons stay
          numeric; only the <em>aria-label</em> (and prev/next/first/last
          labels) change.
        </p>
        <div className="doc-demo">
          <Pagination
            total={60}
            pageSize={10}
            defaultCurrent={2}
            showFirstLast
            labels={{
              previous: '上一页',
              next: '下一页',
              first: '第一页',
              last: '最后一页',
              page: (n) => `第 ${n} 页`,
            }}
            ariaLabel="分页导航"
          />
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Pagination } from 'scribble-ui';

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={987}
      pageSize={20}
      current={page}
      onChange={setPage}
      boundaryCount={1}
      siblingCount={1}
      showFirstLast
    />
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
              <td><code>current</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>Controlled active page (1-based).</td>
            </tr>
            <tr>
              <td><code>defaultCurrent</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Initial page when uncontrolled.</td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>
                Total item count. Combined with <code>pageSize</code> to
                derive the total page count.
              </td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>Items per page.</td>
            </tr>
            <tr>
              <td><code>totalPages</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>
                Explicit total page count. When set, overrides{' '}
                <code>total</code> / <code>pageSize</code>.
              </td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(page: number) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fires whenever the active page changes.</td>
            </tr>
            <tr>
              <td><code>boundaryCount</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>
                How many pages to always keep pinned at each end of the
                sequence.
              </td>
            </tr>
            <tr>
              <td><code>siblingCount</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>
                How many pages to render on each side of the current
                page.
              </td>
            </tr>
            <tr>
              <td><code>showFirstLast</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render « and » buttons for first / last page jumps.
              </td>
            </tr>
            <tr>
              <td><code>showPrevNext</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render the prev / next buttons.</td>
            </tr>
            <tr>
              <td><code>simple</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Collapse to prev / next plus a "current / total" readout.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'small' | 'medium'</code></td>
              <td><code>'medium'</code></td>
              <td>Size preset — 28px or 36px squares.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Inert the whole group.</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Pagination'</code></td>
              <td>
                Value for the wrapping <code>&lt;nav&gt;</code>'s
                <code> aria-label</code>.
              </td>
            </tr>
            <tr>
              <td><code>labels</code></td>
              <td><code>PaginationLabels</code></td>
              <td><code>—</code></td>
              <td>
                Overrides for every screen-reader string
                (<code>previous</code>, <code>next</code>,{' '}
                <code>first</code>, <code>last</code>, plus a{' '}
                <code>page(n)</code> generator).
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class on the outer <code>&lt;nav&gt;</code>.</td>
            </tr>
          </tbody>
        </table>

        <p className="doc-note">
          The component also forwards a ref to the underlying{' '}
          <code>HTMLElement</code> (the <code>&lt;nav&gt;</code>) and
          accepts every native HTML attribute (<code>id</code>,{' '}
          <code>aria-*</code>, <code>data-*</code>, …).
        </p>
        <p className="doc-note">
          The pure helper <code>getPageItems(current, totalPages,
          boundaryCount, siblingCount)</code> is also exported so you can
          reuse the collapse logic (for example, to render your own
          custom page chips).
        </p>
      </section>
    </article>
  );
}
