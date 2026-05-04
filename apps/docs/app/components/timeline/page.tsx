'use client';

import { Timeline } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function TimelineDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Timeline</h1>
      <p className="doc-lede">
        A hand-drawn vertical timeline for change logs, activity feeds and
        step-by-step flows. Compose with <code>Timeline.Item</code>{' '}
        children, colour each node by status, mark in-progress edges with
        a dashed connector, or flip everything to{' '}
        <code>alternate</code> for a two-column story.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Default left-aligned layout. Each item gets a coloured node and
          an optional <code>time</code> line. Strings and numbers passed
          to <code>time</code> are wrapped in <code>&lt;time&gt;</code> so
          assistive tech reads them as timestamps.
        </p>
        <div className="doc-demo">
          <Timeline>
            <Timeline.Item status="success" time="09:12">
              Draft created — saved to <code>~/sketches/2025</code>.
            </Timeline.Item>
            <Timeline.Item status="info" time="09:40">
              Invited 2 reviewers via email.
            </Timeline.Item>
            <Timeline.Item status="warning" time="11:05">
              Reviewer requested changes: tighten the typography scale.
            </Timeline.Item>
            <Timeline.Item status="error" time="14:20">
              CI failed on <code>lint</code> — missing ESLint config.
            </Timeline.Item>
            <Timeline.Item time="15:47">
              Re-ran the pipeline manually.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Right aligned =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Right aligned</h2>
        <p className="doc-note">
          Flip the rail to the opposite edge with <code>mode=&quot;right&quot;</code>.
          Handy when the timeline lives next to a narrow left sidebar, or
          in RTL-friendly layouts.
        </p>
        <div className="doc-demo">
          <Timeline mode="right">
            <Timeline.Item status="success" time="Mon">
              Landed the design tokens pass.
            </Timeline.Item>
            <Timeline.Item status="info" time="Tue">
              Hooked up the hand-drawn SVG filter across all primitives.
            </Timeline.Item>
            <Timeline.Item status="warning" time="Wed">
              Caught a regression in the focus ring.
            </Timeline.Item>
            <Timeline.Item time="Thu">
              Shipped Timeline behind a feature flag.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Alternate ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Alternate</h2>
        <p className="doc-note">
          <code>mode=&quot;alternate&quot;</code> parks the rail in the
          middle and pushes each item to alternating sides — nice for
          product storytelling or launch recaps where every event
          deserves its own beat.
        </p>
        <div className="doc-demo">
          <Timeline mode="alternate">
            <Timeline.Item status="success" time="v0.1.0">
              First commit — sticky-note colour palette and base tokens.
            </Timeline.Item>
            <Timeline.Item status="info" time="v0.2.0">
              Shipped Button, Input and the hand-drawn SVG filter.
            </Timeline.Item>
            <Timeline.Item status="info" time="v0.3.0">
              Empty, Result and Divider joined the roster.
            </Timeline.Item>
            <Timeline.Item status="warning" time="v0.4.0">
              Tabs + Toast needed a second design review.
            </Timeline.Item>
            <Timeline.Item status="success" time="v0.5.0">
              Timeline lands. That&apos;s this page.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Custom dot ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Custom dot</h2>
        <p className="doc-note">
          Pass any ReactNode to <code>dot</code> — an emoji, a letter, a
          tiny SVG — and it replaces the default coloured disc. The node
          slot keeps its footprint so sibling items stay aligned.
        </p>
        <div className="doc-demo">
          <Timeline>
            <Timeline.Item
              status="success"
              time="Morning"
              dot={<span aria-hidden="true">☕</span>}
            >
              Coffee. Sketched three layout options.
            </Timeline.Item>
            <Timeline.Item
              status="info"
              time="Noon"
              dot={<span aria-hidden="true">✏️</span>}
            >
              Paired with design on the spacing rhythm.
            </Timeline.Item>
            <Timeline.Item
              status="warning"
              time="Afternoon"
              dot={
                <svg
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M8 1 L10 6 L15 6 L11 9 L13 14 L8 11 L3 14 L5 9 L1 6 L6 6 Z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              Demo went well. Team signed off on the wobble level.
            </Timeline.Item>
            <Timeline.Item time="Evening" dot={<span aria-hidden="true">🌙</span>}>
              Wrapped the docs site and called it a day.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Dashed connector ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Dashed connector</h2>
        <p className="doc-note">
          Mark the edge going down from an item as dashed to signal{' '}
          <em>in progress</em> or <em>upcoming</em>. Only the connector
          below the flagged item switches; solid lines stay above.
        </p>
        <div className="doc-demo">
          <Timeline>
            <Timeline.Item status="success" time="Step 1">
              Collected requirements from the product team.
            </Timeline.Item>
            <Timeline.Item status="info" time="Step 2" dashed>
              Building the prototype — this is where we are now.
            </Timeline.Item>
            <Timeline.Item time="Step 3">
              Usability testing with five sticky-note enthusiasts.
            </Timeline.Item>
            <Timeline.Item time="Step 4">
              Ship it.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Reverse order =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Reverse order</h2>
        <p className="doc-note">
          Set <code>reverse</code> to show newest-first visually. The DOM
          order isn&apos;t touched, so screen readers still announce the
          original authoring order — you just get a reversed view for
          free.
        </p>
        <div className="doc-demo">
          <Timeline reverse>
            <Timeline.Item status="success" time="2024-11-02">
              v1 released.
            </Timeline.Item>
            <Timeline.Item status="info" time="2024-11-18">
              First round of community feedback.
            </Timeline.Item>
            <Timeline.Item status="warning" time="2024-12-05">
              Rolled back a flaky dependency.
            </Timeline.Item>
            <Timeline.Item status="success" time="2025-01-10">
              v1.1 with Timeline + Tabs.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Timeline } from 'scribble-ui';

export function ReleaseLog() {
  return (
    <Timeline mode="alternate">
      <Timeline.Item status="success" time="v0.1.0">
        First commit — sticky-note colour palette and base tokens.
      </Timeline.Item>
      <Timeline.Item status="info" time="v0.2.0" dashed>
        Shipping Button + Input this week…
      </Timeline.Item>
      <Timeline.Item time="v0.3.0">
        Empty and Result (planned).
      </Timeline.Item>
    </Timeline>
  );
}`}</code>
        </pre>
      </section>

      {/* === API: Timeline =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">API · Timeline</h2>
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
              <td><code>mode</code></td>
              <td><code>'left' | 'right' | 'alternate'</code></td>
              <td><code>'left'</code></td>
              <td>
                Where the rail (node + connector) sits relative to the
                body. <code>'alternate'</code> centers the rail and
                alternates items between the left and right sides.
              </td>
            </tr>
            <tr>
              <td><code>reverse</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Visually flips the order with{' '}
                <code>flex-direction: column-reverse</code>. The DOM
                order is preserved, so screen readers announce the
                authoring order.
              </td>
            </tr>
            <tr>
              <td><code>as</code></td>
              <td><code>'ol' | 'ul'</code></td>
              <td><code>'ol'</code></td>
              <td>
                Which list element to render. Default{' '}
                <code>&lt;ol&gt;</code> suits chronological lists; switch
                to <code>&lt;ul&gt;</code> for unordered step sets.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Expected to be a list of <code>&lt;Timeline.Item&gt;</code>{' '}
                children.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API: Timeline.Item ============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">API · Timeline.Item</h2>
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
              <td><code>time</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Short time / headline line. Strings and numbers are wrapped
                in <code>&lt;time&gt;</code>; ReactNodes are rendered
                as-is so callers can control their own markup.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Main body content of the entry.</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td>
                <code>
                  'default' | 'success' | 'warning' | 'error' | 'info'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>
                Drives the node fill and the colour of the connector line
                going down from this item. Maps to the matching{' '}
                <code>--su-color-*</code> tokens.
              </td>
            </tr>
            <tr>
              <td><code>dot</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Replaces the default hand-drawn dot with a custom glyph
                (emoji, letter, small SVG). The node slot keeps its
                footprint so sibling items stay aligned.
              </td>
            </tr>
            <tr>
              <td><code>dashed</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Renders the connector <em>below this item</em> as dashed
                instead of solid. Good for marking &quot;in progress&quot;
                or &quot;upcoming&quot; milestones. No effect on the last
                item.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the item element.</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>—</code></td>
              <td>Inline styles forwarded to the <code>&lt;li&gt;</code>.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The root element is a semantic list (<code>&lt;ol&gt;</code> by
          default) labelled <code>aria-label=&quot;Timeline&quot;</code>,
          so assistive tech announces it as a timeline list. Decorative
          rails and nodes are marked <code>aria-hidden</code>.
        </p>
      </section>
    </article>
  );
}
