'use client';

import { useState } from 'react';
import { Breadcrumb, type BreadcrumbItemData } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

/* Tiny inline icons — keeps the docs site dependency-free. */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M3 11l9-8 9 8M5 10v10h14V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M3 7h6l2 2h10v10H3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M6 3h9l4 4v14H6z M15 3v4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BreadcrumbDocClient({ t }: { t: ComponentDoc }) {
  // Drives the "onClick" example so visitors can actually see the
  // handler fire without leaving the page.
  const [lastClick, setLastClick] = useState<string>('(none yet)');

  const folderPath: BreadcrumbItemData[] = [
    { title: 'Workspace', href: '#' },
    { title: 'Sketches', href: '#' },
    { title: 'April 2025' },
  ];

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <Breadcrumb items={folderPath} />
        </div>
      </section>

      {/* === Composition ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.composition}</h2>
        <p className="doc-note">{t.notes.composition}</p>
        <div className="doc-demo">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Docs</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Components</Breadcrumb.Item>
            <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </section>

      {/* === With icons ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.withIcons}</h2>
        <p className="doc-note">{t.notes.withIcons}</p>
        <div className="doc-demo">
          <Breadcrumb
            items={[
              { title: 'Home', href: '#', icon: <HomeIcon /> },
              { title: 'Projects', href: '#', icon: <FolderIcon /> },
              { title: 'Untitled sketch', icon: <NoteIcon /> },
            ]}
          />
        </div>
      </section>

      {/* === Custom separators ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customSeparators}</h2>
        <p className="doc-note">{t.notes.customSeparators}</p>
        <div className="doc-demo doc-demo--column">
          <Breadcrumb separator={<span aria-hidden="true">/</span>} items={folderPath} />

          <Breadcrumb
            separator={<span aria-hidden="true">·</span>}
            items={[
              { title: 'Library', href: '#' },
              { title: 'Notebooks', href: '#' },
              { title: 'Today' },
            ]}
          />

          <Breadcrumb
            separator={<span aria-hidden="true">→</span>}
            items={[
              { title: '🏠', href: '#' },
              { title: '✏️', href: '#' },
              { title: '📄' },
            ]}
          />
        </div>
      </section>

      {/* === onClick handler ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.onClickHandler}</h2>
        <p className="doc-note">{t.notes.onClickHandler}</p>
        <div className="doc-demo doc-demo--column">
          <Breadcrumb
            items={[
              { title: 'Dashboard', onClick: () => setLastClick('Dashboard') },
              { title: 'Reports', onClick: () => setLastClick('Reports') },
              { title: 'Q2 2025' },
            ]}
          />
          <p className="doc-note">
            Last clicked: <code>{lastClick}</code>
          </p>
        </div>
      </section>

      {/* === Collapsed ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.collapsed}</h2>
        <p className="doc-note">{t.notes.collapsed}</p>
        <div className="doc-demo doc-demo--column">
          <Breadcrumb
            maxItems={4}
            items={[
              { title: 'Root', href: '#' },
              { title: 'Year', href: '#' },
              { title: 'Quarter', href: '#' },
              { title: 'Month', href: '#' },
              { title: 'Week', href: '#' },
              { title: 'Day', href: '#' },
              { title: 'Hour', href: '#' },
              { title: 'Now' },
            ]}
          />
          <Breadcrumb
            maxItems={4}
            itemsBeforeCollapse={2}
            itemsAfterCollapse={2}
            items={[
              { title: 'Root', href: '#' },
              { title: 'Year', href: '#' },
              { title: 'Quarter', href: '#' },
              { title: 'Month', href: '#' },
              { title: 'Week', href: '#' },
              { title: 'Day', href: '#' },
              { title: 'Hour', href: '#' },
              { title: 'Now' },
            ]}
          />
        </div>
      </section>

      {/* === Disabled ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.disabled}</h2>
        <p className="doc-note">{t.notes.disabled}</p>
        <div className="doc-demo">
          <Breadcrumb
            items={[
              { title: 'Workspace', href: '#' },
              { title: 'Restricted area', disabled: true },
              { title: 'Archive', href: '#' },
              { title: 'Snapshot 42' },
            ]}
          />
        </div>
      </section>

      {/* === Custom render (router escape hatch) ============ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customRender}</h2>
        <p className="doc-note">{t.notes.customRender}</p>
        <div className="doc-demo">
          <Breadcrumb
            items={[
              {
                title: 'Home',
                render: (node) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    href="#"
                    data-demo-router="next-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {node}
                  </a>
                ),
              },
              {
                title: 'Settings',
                render: (node) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    href="#"
                    data-demo-router="next-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {node}
                  </a>
                ),
              },
              { title: 'Profile' },
            ]}
          />
        </div>
      </section>

      {/* === Code =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Breadcrumb } from 'scribble-ui';

// 1. Data-driven
<Breadcrumb
  items={[
    { title: 'Home', href: '/' },
    { title: 'Docs', href: '/docs' },
    { title: 'Breadcrumb' },            // last = current page
  ]}
/>

// 2. Composition
<Breadcrumb separator={<span>/</span>}>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
  <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
</Breadcrumb>

// 3. Router adapter (Next.js)
import Link from 'next/link';

<Breadcrumb
  items={[
    { title: 'Home', render: (node) => <Link href="/">{node}</Link> },
    { title: 'Docs', render: (node) => <Link href="/docs">{node}</Link> },
    { title: 'Breadcrumb' },
  ]}
/>

// 4. Collapsed
<Breadcrumb maxItems={4} items={deepPath} />`}</code>
        </pre>
      </section>

      {/* === API ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.api}</h2>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          {t.sections.apiBreadcrumb}
        </h3>
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
              <td><code>items</code></td>
              <td><code>BreadcrumbItemData[]</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.b__items?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.b__children?.description}</td>
            </tr>
            <tr>
              <td><code>separator</code></td>
              <td><code>ReactNode</code></td>
              <td><code>&lt;span&gt;›&lt;/span&gt;</code></td>
              <td>{t.api.rows.b__separator?.description}</td>
            </tr>
            <tr>
              <td><code>maxItems</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>{t.api.rows.b__maxItems?.description}</td>
            </tr>
            <tr>
              <td><code>itemsBeforeCollapse</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.b__itemsBeforeCollapse?.description}</td>
            </tr>
            <tr>
              <td><code>itemsAfterCollapse</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.b__itemsAfterCollapse?.description}</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Breadcrumb'</code></td>
              <td>{t.api.rows.b__ariaLabel?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.b__className?.description}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          {t.sections.apiItem}
        </h3>
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
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__title?.description}</td>
            </tr>
            <tr>
              <td><code>href</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__href?.description}</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__onClick?.description}</td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>(node: ReactNode) =&gt; ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__render?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__icon?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.item__disabled?.description}</td>
            </tr>
            <tr>
              <td><code>key</code></td>
              <td><code>string | number</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.item__key?.description}</td>
            </tr>
          </tbody>
        </table>

        <p className="doc-note">{t.notes.apiFooter}</p>
      </section>
    </article>
  );
}
