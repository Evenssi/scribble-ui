'use client';

import { Button, Result } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function ResultDocClient({ t }: { t: ComponentDoc }) {
  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic (success) ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <Result
            status="success"
            title="Submission received"
            subTitle="Your draft was saved and sent for review. We'll email you as soon as there's an update."
            extra={
              <>
                <Button variant="primary">Back to dashboard</Button>
                <Button>View submission</Button>
              </>
            }
          />
        </div>
      </section>

      {/* === Status variants ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.statusVariants}</h2>
        <p className="doc-note">{t.notes.statusVariants}</p>
        <div className="doc-demo doc-demo--column">
          <Result
            status="error"
            title="Payment failed"
            subTitle="We couldn't charge the card on file. Try another card, or contact support if this keeps happening."
            extra={
              <>
                <Button variant="danger">Try again</Button>
                <Button>Contact support</Button>
              </>
            }
          />
          <Result
            status="warning"
            title="Unsaved changes"
            subTitle="You have edits that haven't been saved. Leaving now will discard them."
            extra={
              <>
                <Button variant="warning">Save &amp; leave</Button>
                <Button>Stay</Button>
              </>
            }
          />
          <Result
            status="info"
            title="Nothing to do here yet"
            subTitle="This workspace will come to life once a teammate invites you to a project."
            extra={<Button variant="primary">Explore templates</Button>}
          />
        </div>
      </section>

      {/* === HTTP error pages ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.httpErrors}</h2>
        <p className="doc-note">{t.notes.httpErrors}</p>
        <div className="doc-demo doc-demo--column">
          <Result
            status="404"
            title="This page wandered off"
            subTitle="The link might be broken, or the page may have been moved."
            extra={
              <>
                <Button variant="primary">Go home</Button>
                <Button>Report a broken link</Button>
              </>
            }
          />
          <Result
            status="403"
            title="You don't have access"
            subTitle="Ask the workspace owner to add you, or switch to an account that has the right permissions."
            extra={<Button variant="primary">Switch account</Button>}
          />
          <Result
            status="500"
            title="Something broke on our side"
            subTitle="We've logged the error. Give it another try in a minute — if it keeps happening, let us know."
            extra={
              <>
                <Button variant="warning">Retry</Button>
                <Button>Status page</Button>
              </>
            }
          />
        </div>
      </section>

      {/* === With extra + content ============================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.extraContent}</h2>
        <p className="doc-note">{t.notes.extraContent}</p>
        <div className="doc-demo">
          <Result
            status="error"
            title="Deploy failed"
            subTitle="Build exited with a non-zero status. The full log is below."
            extra={
              <>
                <Button variant="primary">Retry deploy</Button>
                <Button>Open logs</Button>
              </>
            }
          >
            <strong>Next steps</strong>
            <ol style={{ margin: '8px 0 0 20px', padding: 0 }}>
              <li>
                Re-run <code>pnpm install</code> locally and confirm the
                lockfile is up to date.
              </li>
              <li>Check environment variables in the deploy settings.</li>
              <li>
                If the error mentions <code>ENOSPC</code>, scale the build
                runner disk size and try again.
              </li>
            </ol>
          </Result>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Result, Button } from 'scribble-ui';

// A simple success screen.
<Result
  status="success"
  title="Submission received"
  subTitle="We'll email you as soon as there's an update."
  extra={
    <>
      <Button variant="primary">Back to dashboard</Button>
      <Button>View submission</Button>
    </>
  }
/>

// A 404 route with a sticky-note "what to try" block.
<Result
  status="404"
  title="This page wandered off"
  subTitle="The link might be broken, or the page may have been moved."
  extra={<Button variant="primary">Go home</Button>}
>
  <strong>Things to try</strong>
  <ul>
    <li>Double-check the URL in the address bar.</li>
    <li>Search from the homepage.</li>
  </ul>
</Result>`}</code>
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
              <td><code>status</code></td>
              <td>
                <code>
                  'success' | 'error' | 'warning' | 'info' | '404' | '403' |
                  '500'
                </code>
              </td>
              <td><code>'info'</code></td>
              <td>{t.api.rows.status?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.title?.description}</td>
            </tr>
            <tr>
              <td><code>subTitle</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.subTitle?.description}</td>
            </tr>
            <tr>
              <td><code>extra</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.extra?.description}</td>
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
        <p className="doc-note">{t.notes.apiFooter}</p>
      </section>
    </article>
  );
}
