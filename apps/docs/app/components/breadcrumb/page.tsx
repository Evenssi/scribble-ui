'use client';

import { useState } from 'react';
import { Breadcrumb, type BreadcrumbItemData } from 'scribble-ui';
import '../button/page.css';

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

export default function BreadcrumbDocPage() {
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
      <h1 className="doc-title">Breadcrumb</h1>
      <p className="doc-lede">
        Hand-drawn trail that tells users where they are. Each crumb is
        a tiny sticky-note that lifts on hover; the last crumb drops the
        card treatment and reads as emphasized text — signage, not a
        button. Works with either a data-driven <code>items</code> prop
        or composition children.
      </p>

      {/* === Basic ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          A three-level trail driven by the <code>items</code> prop. The
          last entry is automatically rendered as non-interactive text
          and tagged <code>aria-current=&quot;page&quot;</code>.
        </p>
        <div className="doc-demo">
          <Breadcrumb items={folderPath} />
        </div>
      </section>

      {/* === Composition ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Composition children</h2>
        <p className="doc-note">
          Prefer JSX composition? Use <code>&lt;Breadcrumb.Item&gt;</code>
          (or <code>&lt;BreadcrumbItem&gt;</code>) — both funnel through
          the same renderer as <code>items</code>.
        </p>
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
        <h2 className="doc-h2">With icons</h2>
        <p className="doc-note">
          Drop any inline node into the <code>icon</code> slot. Icons
          render crisply — they don&apos;t inherit the crumb&apos;s wobble
          filter.
        </p>
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
        <h2 className="doc-h2">Custom separators</h2>
        <p className="doc-note">
          The default separator is a single <code>›</code> glyph. Pass
          any ReactNode to <code>separator</code> to override it.
        </p>
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
        <h2 className="doc-h2">onClick handler</h2>
        <p className="doc-note">
          Pass <code>onClick</code> to take over navigation. When no
          <code> href</code> is provided the default <code>#</code>{' '}
          navigation is suppressed via <code>preventDefault</code>.
        </p>
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
        <h2 className="doc-h2">Collapsed</h2>
        <p className="doc-note">
          Set <code>maxItems</code> to fold the middle crumbs into a{' '}
          <code>…</code>. Use <code>itemsBeforeCollapse</code> /{' '}
          <code>itemsAfterCollapse</code> to tune how many crumbs each
          end keeps (defaults to 1 / 1).
        </p>
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
        <h2 className="doc-h2">Disabled middle crumb</h2>
        <p className="doc-note">
          A <code>disabled</code> item renders as plain text and ignores
          clicks — useful when a middle level is gated (permissions,
          feature flag) but still part of the trail.
        </p>
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
        <h2 className="doc-h2">Custom render (router adapter)</h2>
        <p className="doc-note">
          Pass <code>render</code> to hand the inner content off to your
          router&apos;s link primitive. Breadcrumb keeps the sticky-note
          chrome + hover filter; your adapter owns navigation. The demo
          below mocks the pattern with a <code>&lt;span&gt;</code> wrapper
          — swap it for Next.js <code>&lt;Link&gt;</code> or
          react-router <code>&lt;NavLink&gt;</code> in real code.
        </p>
        <div className="doc-demo">
          <Breadcrumb
            items={[
              {
                title: 'Home',
                render: (node) => (
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
        <h2 className="doc-h2">Code</h2>
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
        <h2 className="doc-h2">API</h2>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          Breadcrumb
        </h3>
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
              <td><code>items</code></td>
              <td><code>BreadcrumbItemData[]</code></td>
              <td><code>—</code></td>
              <td>
                Data-driven entries. Mutually exclusive with{' '}
                <code>children</code>; when both are provided{' '}
                <code>items</code> wins.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Composition-style children. Must be{' '}
                <code>&lt;Breadcrumb.Item&gt;</code> elements; any other
                node is skipped with a dev warning.
              </td>
            </tr>
            <tr>
              <td><code>separator</code></td>
              <td><code>ReactNode</code></td>
              <td><code>&lt;span&gt;›&lt;/span&gt;</code></td>
              <td>
                Node rendered between each pair of crumbs. Always marked{' '}
                <code>aria-hidden</code> so screen readers don&apos;t read
                it aloud.
              </td>
            </tr>
            <tr>
              <td><code>maxItems</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>
                Collapse when the total crumb count exceeds this value.{' '}
                <code>0</code> disables collapsing.
              </td>
            </tr>
            <tr>
              <td><code>itemsBeforeCollapse</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Head crumbs kept visible when collapsing.</td>
            </tr>
            <tr>
              <td><code>itemsAfterCollapse</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Tail crumbs kept visible when collapsing.</td>
            </tr>
            <tr>
              <td><code>ariaLabel</code></td>
              <td><code>string</code></td>
              <td><code>'Breadcrumb'</code></td>
              <td>
                Accessible label on the wrapping <code>&lt;nav&gt;</code>.
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

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          BreadcrumbItemData / Breadcrumb.Item
        </h3>
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
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Crumb label. For <code>&lt;Breadcrumb.Item&gt;</code>, use{' '}
                <code>children</code> instead.
              </td>
            </tr>
            <tr>
              <td><code>href</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Navigation target. Omit for plain-text crumbs. The last
                crumb&apos;s <code>href</code> is always ignored.
              </td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>
                Click handler. When provided alongside <code>href</code>,
                the handler wins and default navigation is suppressed.
              </td>
            </tr>
            <tr>
              <td><code>render</code></td>
              <td><code>(node: ReactNode) =&gt; ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Router-adapter escape hatch (Next.js{' '}
                <code>&lt;Link&gt;</code>, etc.). Receives the default
                inner node and must return a ReactNode.
              </td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Decorative icon rendered before the label.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Forces non-interactive rendering. Sets{' '}
                <code>aria-disabled=&quot;true&quot;</code>.
              </td>
            </tr>
            <tr>
              <td><code>key</code></td>
              <td><code>string | number</code></td>
              <td><code>—</code></td>
              <td>
                Optional React key override for the{' '}
                <code>items</code> API (the index is used otherwise).
              </td>
            </tr>
          </tbody>
        </table>

        <p className="doc-note">
          The <code>&lt;Breadcrumb&gt;</code> also forwards a ref to the
          underlying <code>HTMLElement</code> (the <code>&lt;nav&gt;</code>)
          and accepts the matching native attributes (<code>id</code>,{' '}
          <code>aria-*</code>, <code>data-*</code>, …).
        </p>
      </section>
    </article>
  );
}
