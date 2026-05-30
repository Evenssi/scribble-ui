'use client';

import { useRef, useState } from 'react';
import { BackTop, Card } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

/**
 * A long filler column — repeated three times inside the page so the
 * window becomes tall enough to actually scroll past the default 400px
 * threshold. The body copy is intentionally English & technical
 * (it doubles as scroll testimony) and is kept hard-coded.
 */
function FillerSection({ label }: { label: string }) {
  return (
    <Card className="doc-demo" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>{label}</h3>
      <p>
        Scroll further down the page to cross the visibility threshold.
        Once you do, the floating BackTop button appears in the lower
        right corner of the viewport. Click it (or press it with the
        keyboard — focus will travel there via Tab) to ride an
        easeOutCubic animation back to the top.
      </p>
      <p>
        BackTop is intentionally minimal: one button, one portal, one
        scroll listener — rAF-throttled so long pages stay cheap. The
        filter-based wobble keeps it visually consistent with the rest
        of scribble-ui even though it lives outside the normal document
        flow.
      </p>
      <p>
        The usual accessibility affordances apply: the button is
        removed from the tab order while hidden, uses{' '}
        <code>aria-label</code> for screen readers, and respects{' '}
        <code>prefers-reduced-motion</code> by jumping instantly when
        motion is reduced.
      </p>
    </Card>
  );
}

export function BackTopDocClient({ t }: { t: ComponentDoc }) {
  // Track click count so visitors can feel the onClick hook firing.
  const [clicks, setClicks] = useState(0);

  // Scoped-container demo: a short scrollable pane with its own
  // BackTop bound to it. The ref points at the pane so `target` and
  // `container` can resolve to the same element.
  const scopedRef = useRef<HTMLDivElement | null>(null);
  const [scopedNode, setScopedNode] = useState<HTMLDivElement | null>(null);

  const scopedContent = Array.from({ length: 18 }).map((_, i) => (
    <p key={i} style={{ margin: '0 0 12px' }}>
      Scoped paragraph #{i + 1}. Keep scrolling inside this pane to see
      the scoped BackTop appear in its bottom-right corner.
    </p>
  ));

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      <p className="doc-note" style={{ marginTop: 0 }}>{t.notes.intro}</p>

      {/* === Default =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.default}</h2>
        <p className="doc-note">{t.notes.default}</p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>{t.notes.defaultDemo}</p>
          <div className="doc-demo-row">
            <span>Clicks so far: <strong>{clicks}</strong></span>
          </div>
        </div>
        <BackTop onClick={() => setClicks((n) => n + 1)} />
      </section>

      {/* === Custom threshold ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customThreshold}</h2>
        <p className="doc-note">{t.notes.customThreshold}</p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>{t.notes.customThresholdDemo}</p>
        </div>
        <BackTop
          visibilityHeight={200}
          right={96}
          bottom={24}
          aria-label="Back to top (low threshold)"
          style={{ background: 'var(--su-note-orange)' }}
        />
      </section>

      {/* === Custom content =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customContent}</h2>
        <p className="doc-note">{t.notes.customContent}</p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>{t.notes.customContentDemo}</p>
        </div>
        <BackTop
          visibilityHeight={200}
          right={168}
          bottom={24}
          aria-label="Jump to top"
          style={{
            background: 'var(--su-note-yellow)',
            fontSize: 'var(--su-font-size-small)',
            letterSpacing: 1,
          }}
        >
          TOP
        </BackTop>
      </section>

      <FillerSection label={`${t.sections.fillerScroll} · 1`} />
      <FillerSection label={`${t.sections.fillerScroll} · 2`} />
      <FillerSection label={`${t.sections.fillerScroll} · 3`} />

      {/* === Scoped container ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.scopedContainer}</h2>
        <p className="doc-note">{t.notes.scopedContainer}</p>
        <div className="doc-demo">
          <div
            ref={(node) => {
              scopedRef.current = node;
              if (node !== scopedNode) setScopedNode(node);
            }}
            style={{
              position: 'relative',
              height: 260,
              overflow: 'auto',
              padding: 16,
              background: 'var(--su-bg-paper)',
              border: 'var(--su-stroke-default) solid var(--su-ink-primary)',
              borderRadius: 'var(--su-radius-card)',
            }}
          >
            {scopedContent}
            {scopedNode && (
              <BackTop
                target={() => scopedNode}
                container={scopedNode}
                visibilityHeight={120}
                right={16}
                bottom={16}
                aria-label="Back to top of pane"
              />
            )}
          </div>
        </div>
      </section>

      <FillerSection label={`${t.sections.fillerBottom} · 1`} />
      <FillerSection label={`${t.sections.fillerBottom} · 2`} />

      {/* === Code ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { BackTop } from 'scribble-ui';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Window-level BackTop: appears after 400px of scroll. */}
      <BackTop />

      {/* Custom look: lower threshold, orange sticky-note tint. */}
      <BackTop
        visibilityHeight={200}
        style={{ background: 'var(--su-note-orange)' }}
        aria-label="Back to top"
      />
    </>
  );
}`}</code>
        </pre>
      </section>

      {/* === API ============================================== */}
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
              <td><code>visibilityHeight</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>{t.api.rows.visibilityHeight?.description}</td>
            </tr>
            <tr>
              <td><code>target</code></td>
              <td><code>() =&gt; HTMLElement | Window</code></td>
              <td><code>() =&gt; window</code></td>
              <td>{t.api.rows.target?.description}</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClick?.description}</td>
            </tr>
            <tr>
              <td><code>duration</code></td>
              <td><code>number</code></td>
              <td><code>480</code></td>
              <td>{t.api.rows.duration?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>right</code></td>
              <td><code>number | string</code></td>
              <td><code>24</code></td>
              <td>{t.api.rows.right?.description}</td>
            </tr>
            <tr>
              <td><code>bottom</code></td>
              <td><code>number | string</code></td>
              <td><code>24</code></td>
              <td>{t.api.rows.bottom?.description}</td>
            </tr>
            <tr>
              <td><code>container</code></td>
              <td><code>HTMLElement | null</code></td>
              <td><code>document.body</code></td>
              <td>{t.api.rows.container?.description}</td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>'Back to top'</code></td>
              <td>{t.api.rows['aria-label']?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.style?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <p className="doc-note" style={{ marginTop: 32 }}>{t.notes.apiFooter}</p>
    </article>
  );
}
