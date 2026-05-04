'use client';

import { useRef, useState } from 'react';
import { BackTop, Button, Card } from 'scribble-ui';
// Reuse the Button page's doc-* class set so every page shares one stylesheet.
import '../button/page.css';

/**
 * A long filler column — repeated three times inside the page so the
 * window becomes tall enough to actually scroll past the default 400px
 * threshold. Using <Card> and plain prose keeps the demo purely
 * documentary; no custom styling needed.
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

export default function BackTopDocPage() {
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
      <h1 className="doc-title">BackTop</h1>
      <p className="doc-lede">
        A floating button that scrolls its target back to the top.
        Portals into the host (or a scoped container), fades in once
        the scroll distance crosses a configurable threshold, and runs
        an easeOutCubic ride back to 0 — with{' '}
        <code>prefers-reduced-motion</code> respected.
      </p>

      <p className="doc-note" style={{ marginTop: 0 }}>
        Scroll down at least <strong>400 pixels</strong> to see the
        default BackTop appear in the bottom-right corner of the page.
      </p>

      {/* === Default =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Default</h2>
        <p className="doc-note">
          Drop <code>&lt;BackTop /&gt;</code> anywhere in your tree.
          It portals to <code>document.body</code> and listens on{' '}
          <code>window</code>.
        </p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>
            Default threshold is 400px. Click handler fires before the
            scroll animation starts, so consumers can instrument or
            cancel the behavior via <code>event.preventDefault()</code>.
          </p>
          <div className="doc-demo-row">
            <span>Clicks so far: <strong>{clicks}</strong></span>
          </div>
        </div>
        <BackTop onClick={() => setClicks((n) => n + 1)} />
      </section>

      {/* === Custom threshold ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Custom threshold</h2>
        <p className="doc-note">
          Lower <code>visibilityHeight</code> to reveal the button
          sooner — handy on short pages where 400px would never fire.
          This second instance is offset to the left so it doesn&apos;t
          overlap the default one.
        </p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>
            The orange-note button below appears after just 200px of
            scrolling.
          </p>
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
        <h2 className="doc-h2">Custom content</h2>
        <p className="doc-note">
          Pass children to replace the default hand-drawn arrow. Text,
          emoji, and full SVGs all work — the button owns the size and
          filter so custom content stays on-brand.
        </p>
        <div className="doc-demo">
          <p style={{ margin: 0 }}>
            Look for a button labelled <code>TOP</code> further
            up-left from the defaults.
          </p>
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

      <FillerSection label="Scroll filler · 1" />
      <FillerSection label="Scroll filler · 2" />
      <FillerSection label="Scroll filler · 3" />

      {/* === Scoped container ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Scoped container</h2>
        <p className="doc-note">
          Bind BackTop to a custom scroll container by passing both{' '}
          <code>target</code> (the element to watch + scroll) and{' '}
          <code>container</code> (the portal host — must have{' '}
          <code>position: relative</code>). The button then lives
          inside the pane and uses <code>position: absolute</code>.
        </p>
        <div className="doc-demo">
          <div
            ref={(node) => {
              scopedRef.current = node;
              // Force a re-render once the DOM node is available so
              // the BackTop below can bind to it.
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

      <FillerSection label="Bottom filler · 1" />
      <FillerSection label="Bottom filler · 2" />

      {/* === Code ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
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
              <td><code>visibilityHeight</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>
                Scroll distance (px) at which the button fades in.
                Below the threshold the button is visually hidden and
                removed from the tab order.
              </td>
            </tr>
            <tr>
              <td><code>target</code></td>
              <td><code>() =&gt; HTMLElement | Window</code></td>
              <td><code>() =&gt; window</code></td>
              <td>
                Returns the element to watch and scroll. Stable for the
                lifetime of the mount; swapping it at runtime requires
                a remount.
              </td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>
                Fires <em>before</em> the scroll animation begins. Call{' '}
                <code>e.preventDefault()</code> to skip the built-in
                scroll and run your own.
              </td>
            </tr>
            <tr>
              <td><code>duration</code></td>
              <td><code>number</code></td>
              <td><code>480</code></td>
              <td>
                Scroll animation duration in milliseconds. Users with{' '}
                <code>prefers-reduced-motion: reduce</code> always get
                an instant jump.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Replace the default hand-drawn up arrow.</td>
            </tr>
            <tr>
              <td><code>right</code></td>
              <td><code>number | string</code></td>
              <td><code>24</code></td>
              <td>Horizontal offset from the container&apos;s right edge.</td>
            </tr>
            <tr>
              <td><code>bottom</code></td>
              <td><code>number | string</code></td>
              <td><code>24</code></td>
              <td>Vertical offset from the container&apos;s bottom edge.</td>
            </tr>
            <tr>
              <td><code>container</code></td>
              <td><code>HTMLElement | null</code></td>
              <td><code>document.body</code></td>
              <td>
                Portal host. When not the body, the button switches to{' '}
                <code>position: absolute</code> so offsets resolve
                against the custom container — which therefore needs{' '}
                <code>position: relative</code>.
              </td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>'Back to top'</code></td>
              <td>Accessible name for the icon-only button.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the button.</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>—</code></td>
              <td>
                Inline style applied to the button. <code>right</code>{' '}
                and <code>bottom</code> props override matching keys.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <p className="doc-note" style={{ marginTop: 32 }}>
        Scroll back up to watch the BackTop buttons fade out once you
        cross back under their thresholds.
      </p>
    </article>
  );
}
