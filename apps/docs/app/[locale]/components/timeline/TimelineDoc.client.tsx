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
              Order #A-1024 placed.
            </Timeline.Item>
            <Timeline.Item status="info" time="09:40">
              Payment authorised.
            </Timeline.Item>
            <Timeline.Item status="warning" time="11:05">
              Awaiting warehouse confirmation.
            </Timeline.Item>
            <Timeline.Item status="error" time="14:20">
              Address verification failed.
            </Timeline.Item>
            <Timeline.Item time="15:47">
              Customer updated the shipping address.
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
            <Timeline.Item status="success" time="07:00">
              Opened the cafe and brewed the first batch.
            </Timeline.Item>
            <Timeline.Item status="info" time="11:30">
              Lunch rush — 42 orders served.
            </Timeline.Item>
            <Timeline.Item status="warning" time="15:00">
              Espresso machine paused for cleaning.
            </Timeline.Item>
            <Timeline.Item time="20:00">
              Closed the till and tallied the day.
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
            <Timeline.Item status="success" time="Q1">
              Project kicked off — goals and scope locked in.
            </Timeline.Item>
            <Timeline.Item status="info" time="Q2">
              Research phase wrapped; first prototype reviewed.
            </Timeline.Item>
            <Timeline.Item status="info" time="Q3">
              Beta release rolled out to early adopters.
            </Timeline.Item>
            <Timeline.Item status="warning" time="Q4">
              Mid-project review flagged a scope adjustment.
            </Timeline.Item>
            <Timeline.Item status="success" time="Q5">
              Final delivery and post-mortem complete.
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
              Started the day with coffee and a quick plan.
            </Timeline.Item>
            <Timeline.Item
              status="info"
              time="Noon"
              dot={<span aria-hidden="true">✏️</span>}
            >
              Sketched outlines and reviewed the morning notes.
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
              Wrapped up the main task and made a small breakthrough.
            </Timeline.Item>
            <Timeline.Item time="Evening" dot={<span aria-hidden="true">🌙</span>}>
              Wound down with a walk and a chapter of a book.
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
              Collected requirements from stakeholders.
            </Timeline.Item>
            <Timeline.Item status="info" time="Step 2" dashed>
              Building the prototype — currently in progress.
            </Timeline.Item>
            <Timeline.Item time="Step 3">
              Run usability testing with target users.
            </Timeline.Item>
            <Timeline.Item time="Step 4">
              Iterate based on feedback and ship.
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
            <Timeline.Item status="success" time="2024-03-02">
              Published &ldquo;Getting Started with Hand-drawn UIs&rdquo;.
            </Timeline.Item>
            <Timeline.Item status="info" time="2024-04-18">
              Posted a follow-up Q&amp;A based on reader feedback.
            </Timeline.Item>
            <Timeline.Item status="warning" time="2024-06-05">
              Patched a broken code sample reported by readers.
            </Timeline.Item>
            <Timeline.Item status="success" time="2024-08-10">
              Released a deep-dive on accessibility patterns.
            </Timeline.Item>
          </Timeline>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Timeline } from 'scribble-ui';

export function ProjectMilestones() {
  return (
    <Timeline mode="alternate">
      <Timeline.Item status="success" time="Q1">
        Project kicked off — goals and scope locked in.
      </Timeline.Item>
      <Timeline.Item status="info" time="Q2" dashed>
        Research phase in progress…
      </Timeline.Item>
      <Timeline.Item time="Q3">
        Beta release (planned).
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
