'use client';

import { Button, Result } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function ResultDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Result</h1>
      <p className="doc-lede">
        A full-page feedback surface for the moment after an action or a
        route resolves — success, failure, warning, or the classic HTTP
        error pages. Heavier than <code>Empty</code>: Result leads with a
        large hand-drawn status glyph so the outcome is impossible to
        miss.
      </p>

      {/* === Basic (success) ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          The default composition: a status glyph, a title, a sub-title,
          and an action row with one or two buttons.
        </p>
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
        <h2 className="doc-h2">Status variants</h2>
        <p className="doc-note">
          Four semantic outcomes, four hand-drawn glyphs. Each variant
          injects its accent through a component-scoped custom property
          so the glyph and the HTTP-code frames stay in sync with the
          status.
        </p>
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
        <h2 className="doc-h2">HTTP error pages</h2>
        <p className="doc-note">
          Classic 404 / 403 / 500 screens render the code itself as a
          hand-written tear-out on a dashed frame — it reads as a page
          note rather than a glyph, which is exactly the vibe for an
          error route.
        </p>
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
        <h2 className="doc-h2">With extra &amp; supplementary content</h2>
        <p className="doc-note">
          Drop additional content as <code>children</code> — a sticky-note
          surface slides in below the action row. Good for error details,
          a "what to do next" checklist, or a short code snippet the
          support team can copy.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td>
                <code>status</code>
              </td>
              <td>
                <code>
                  'success' | 'error' | 'warning' | 'info' | '404' | '403' |
                  '500'
                </code>
              </td>
              <td>
                <code>'info'</code>
              </td>
              <td>
                Result status. Drives the built-in icon and the accent
                color applied to the glyph, dashed frame and any
                status-aware children.
              </td>
            </tr>
            <tr>
              <td>
                <code>icon</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Custom icon. When provided it replaces the built-in SVG
                for the current <code>status</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>title</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Required. The main outcome message. Rendered as a heading.
              </td>
            </tr>
            <tr>
              <td>
                <code>subTitle</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Optional descriptive line shown below the title.</td>
            </tr>
            <tr>
              <td>
                <code>extra</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Action slot — typically one or two <code>&lt;Button&gt;</code>s
                (primary + secondary). Rendered as a centered row.
              </td>
            </tr>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Supplementary content rendered on a sticky-note surface
                below the action row. Only rendered when truthy.
              </td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The component also forwards a ref to the underlying{' '}
          <code>HTMLDivElement</code> and accepts every native div
          attribute (<code>id</code>, <code>aria-*</code>,{' '}
          <code>data-*</code>, etc.). The root element carries{' '}
          <code>role="status"</code> and <code>aria-live="polite"</code> so
          screen readers announce the outcome without interrupting the
          user.
        </p>
      </section>
    </article>
  );
}
