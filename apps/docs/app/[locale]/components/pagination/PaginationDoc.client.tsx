'use client';

import { useState } from 'react';
import { Button, Pagination } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function PaginationDocClient({ t }: { t: ComponentDoc }) {
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
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <Pagination total={100} pageSize={10} defaultCurrent={1} />
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
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
        <h2 className="doc-h2">{t.sections.largeLists}</h2>
        <p className="doc-note">{t.notes.largeLists}</p>
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
        <h2 className="doc-h2">{t.sections.customWindow}</h2>
        <p className="doc-note">{t.notes.customWindow}</p>
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
        <h2 className="doc-h2">{t.sections.firstLast}</h2>
        <p className="doc-note">{t.notes.firstLast}</p>
        <div className="doc-demo">
          <Pagination totalPages={24} defaultCurrent={6} showFirstLast />
        </div>
      </section>

      {/* === Simple mode ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.simple}</h2>
        <p className="doc-note">{t.notes.simple}</p>
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
        <h2 className="doc-h2">{t.sections.smallSize}</h2>
        <p className="doc-note">{t.notes.smallSize}</p>
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
        <h2 className="doc-h2">{t.sections.disabled}</h2>
        <p className="doc-note">{t.notes.disabled}</p>
        <div className="doc-demo">
          <Pagination totalPages={10} defaultCurrent={5} disabled />
        </div>
      </section>

      {/* === Localised labels ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.localised}</h2>
        <p className="doc-note">{t.notes.localised}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>current</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.current?.description}</td>
            </tr>
            <tr>
              <td><code>defaultCurrent</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.defaultCurrent?.description}</td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.total?.description}</td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>{t.api.rows.pageSize?.description}</td>
            </tr>
            <tr>
              <td><code>totalPages</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.totalPages?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(page: number) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>boundaryCount</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.boundaryCount?.description}</td>
            </tr>
            <tr>
              <td><code>siblingCount</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.siblingCount?.description}</td>
            </tr>
            <tr>
              <td><code>showFirstLast</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.showFirstLast?.description}</td>
            </tr>
            <tr>
              <td><code>showPrevNext</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showPrevNext?.description}</td>
            </tr>
            <tr>
              <td><code>simple</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.simple?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'small' | 'medium'</code></td>
              <td><code>'medium'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Pagination'</code></td>
              <td>{t.api.rows.ariaLabel?.description}</td>
            </tr>
            <tr>
              <td><code>labels</code></td>
              <td><code>PaginationLabels</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.labels?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
          </tbody>
        </table>

        <p className="doc-note">{t.notes.apiFooter1}</p>
        <p className="doc-note">{t.notes.apiFooter2}</p>
      </section>
    </article>
  );
}
