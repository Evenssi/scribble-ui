'use client';

import { Timeline } from 'scribble-ui';

import type { TimelineDoc } from '../../../../i18n/dictionaries/zh-CN/components/timeline';

export function TimelineDocClient({ t: tBase }: { t: unknown }) {
  const t = tBase as TimelineDoc;

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
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
        <h2 className="doc-h2">{t.sections.rightAligned}</h2>
        <p className="doc-note">{t.notes.rightAligned}</p>
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
        <h2 className="doc-h2">{t.sections.alternate}</h2>
        <p className="doc-note">{t.notes.alternate}</p>
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
        <h2 className="doc-h2">{t.sections.customDot}</h2>
        <p className="doc-note">{t.notes.customDot}</p>
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
        <h2 className="doc-h2">{t.sections.dashed}</h2>
        <p className="doc-note">{t.notes.dashed}</p>
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
        <h2 className="doc-h2">{t.sections.reverse}</h2>
        <p className="doc-note">{t.notes.reverse}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
        <h2 className="doc-h2">{t.apiHeadings.timeline}</h2>
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
              <td><code>mode</code></td>
              <td><code>'left' | 'right' | 'alternate'</code></td>
              <td><code>'left'</code></td>
              <td>{t.api.rows.mode?.description}</td>
            </tr>
            <tr>
              <td><code>reverse</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.reverse?.description}</td>
            </tr>
            <tr>
              <td><code>as</code></td>
              <td><code>'ol' | 'ul'</code></td>
              <td><code>'ol'</code></td>
              <td>{t.api.rows.as?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
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

      {/* === API: Timeline.Item ============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.apiHeadings.item}</h2>
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
              <td><code>time</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiItem.rows.time?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiItem.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td>
                <code>
                  'default' | 'success' | 'warning' | 'error' | 'info'
                </code>
              </td>
              <td><code>'default'</code></td>
              <td>{t.apiItem.rows.status?.description}</td>
            </tr>
            <tr>
              <td><code>dot</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiItem.rows.dot?.description}</td>
            </tr>
            <tr>
              <td><code>dashed</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.apiItem.rows.dashed?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.apiItem.rows.className?.description}</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>—</code></td>
              <td>{t.apiItem.rows.style?.description}</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">{t.footerNote}</p>
      </section>
    </article>
  );
}
