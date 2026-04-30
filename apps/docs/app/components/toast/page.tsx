'use client';

import { Button, Toaster, toast } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function ToastDocPage() {
  return (
    <article className="doc">
      {/* Mounted once per page so the demos below have somewhere to render.
       * For real apps, mount this once at the application root instead — a
       * single <Toaster /> is enough for the entire tree. */}
      <Toaster defaultPlacement="top-right" />

      <h1 className="doc-title">Toast</h1>
      <p className="doc-lede">
        Lightweight, hand-drawn notifications driven by a global imperative
        API. Mount <code>&lt;Toaster /&gt;</code> once at your app root, then
        fire <code>toast(&hellip;)</code> from anywhere — even outside the
        React tree. For real apps, mount <code>&lt;Toaster /&gt;</code> once
        at the app root.
      </p>

      {/* === Basic ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Each variant maps to the same status palette as Button and Tag, so
          a destructive notice reads as destructive without extra styling.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => toast('Note saved as a draft.')}>
              Default
            </Button>
            <Button
              variant="success"
              onClick={() => toast.success('Profile updated successfully!')}
            >
              Success
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                toast.warning('Your session expires in 2 minutes.')
              }
            >
              Warning
            </Button>
            <Button
              variant="danger"
              onClick={() => toast.danger('Could not connect to the server.')}
            >
              Danger
            </Button>
            <Button
              variant="info"
              onClick={() => toast.info('A new version is available.')}
            >
              Info
            </Button>
          </div>
        </div>
      </section>

      {/* === Placements ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Placements</h2>
        <p className="doc-note">
          A single <code>&lt;Toaster /&gt;</code> renders six regions; per-call{' '}
          <code>placement</code> chooses one. Bottom regions stack newest-first
          near the viewport edge.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button
              onClick={() =>
                toast('Top left', { placement: 'top-left' })
              }
            >
              top-left
            </Button>
            <Button
              onClick={() =>
                toast('Top center', { placement: 'top-center' })
              }
            >
              top-center
            </Button>
            <Button
              onClick={() =>
                toast('Top right', { placement: 'top-right' })
              }
            >
              top-right
            </Button>
          </div>
          <div className="doc-demo-row">
            <Button
              onClick={() =>
                toast('Bottom left', { placement: 'bottom-left' })
              }
            >
              bottom-left
            </Button>
            <Button
              onClick={() =>
                toast('Bottom center', { placement: 'bottom-center' })
              }
            >
              bottom-center
            </Button>
            <Button
              onClick={() =>
                toast('Bottom right', { placement: 'bottom-right' })
              }
            >
              bottom-right
            </Button>
          </div>
        </div>
      </section>

      {/* === Duration ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Duration</h2>
        <p className="doc-note">
          Pass <code>duration</code> in milliseconds. <code>0</code> (or{' '}
          <code>Infinity</code>) keeps the toast open until the user dismisses
          it. Hovering pauses the countdown automatically.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button
              onClick={() =>
                toast.info('Quick! gone in 1s', { duration: 1000 })
              }
            >
              1 second
            </Button>
            <Button
              onClick={() =>
                toast('Lingering for 8s — hover to pause.', {
                  duration: 8000,
                })
              }
            >
              8 seconds
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                toast.warning('Sticks around until you dismiss it.', {
                  duration: 0,
                })
              }
            >
              Persistent
            </Button>
          </div>
        </div>
      </section>

      {/* === Action =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Action</h2>
        <p className="doc-note">
          Pair a destructive notification with an inline <code>action</code>{' '}
          (such as <em>Undo</em>). The toast auto-dismisses after the action
          fires.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button
              variant="danger"
              onClick={() =>
                toast('Item moved to trash.', {
                  duration: 6000,
                  action: {
                    label: 'Undo',
                    onClick: () => toast.success('Item restored.'),
                  },
                })
              }
            >
              Delete with Undo
            </Button>
            <Button
              variant="info"
              onClick={() =>
                toast.info('New comment from Alex.', {
                  action: {
                    label: 'View',
                    onClick: () => toast('Opening thread…'),
                  },
                })
              }
            >
              Notification with action
            </Button>
          </div>
        </div>
      </section>

      {/* === Programmatic dismiss ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Programmatic dismiss</h2>
        <p className="doc-note">
          Each <code>toast()</code> call returns its id; pass it to{' '}
          <code>toast.dismiss(id)</code> to close one toast, or call{' '}
          <code>toast.dismiss()</code> with no argument to clear the entire
          queue at once.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button
              onClick={() => {
                toast.info('Round 1');
                toast.success('Round 2');
                toast.warning('Round 3');
              }}
            >
              Stack three
            </Button>
            <Button variant="danger" onClick={() => toast.dismiss()}>
              Dismiss all
            </Button>
          </div>
        </div>
      </section>

      {/* === Code ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Toaster, toast } from 'scribble-ui';

// 1. Mount once at your app root.
export default function Root({ children }) {
  return (
    <>
      {children}
      <Toaster defaultPlacement="top-right" />
    </>
  );
}

// 2. Fire toasts from anywhere — event handlers, async code,
//    even modules outside the React tree.
async function save() {
  const id = toast('Saving…', { duration: 0 });
  try {
    await api.save();
    toast.success('Saved!', { id }); // same id replaces in place
  } catch (err) {
    toast.danger('Could not save.', {
      id,
      action: { label: 'Retry', onClick: save },
    });
  }
}`}</code>
        </pre>
      </section>

      {/* === API: methods ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">API · <code>toast()</code></h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Signature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>toast(message, options?)</code></td>
              <td><code>(ReactNode, ToastOptions?) =&gt; string</code></td>
              <td>
                Push a toast onto the queue. Returns the toast id, which can
                later be passed to <code>toast.dismiss(id)</code>.
              </td>
            </tr>
            <tr>
              <td><code>toast.success(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>Shortcut for <code>toast(msg, &#123; variant: 'success' &#125;)</code>.</td>
            </tr>
            <tr>
              <td><code>toast.warning(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>Shortcut for the warning variant.</td>
            </tr>
            <tr>
              <td><code>toast.danger(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>Shortcut for the danger variant. Uses <code>role="alert"</code>.</td>
            </tr>
            <tr>
              <td><code>toast.info(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>Shortcut for the info variant.</td>
            </tr>
            <tr>
              <td><code>toast.dismiss(id?)</code></td>
              <td><code>(string?) =&gt; void</code></td>
              <td>
                Dismiss a toast by id. With no argument, clears every toast
                in every region.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API: ToastOptions ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">API · <code>ToastOptions</code></h2>
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
              <td><code>duration</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>
                Auto-dismiss timeout in ms. Pass <code>0</code> or{' '}
                <code>Infinity</code> to make the toast persistent.
              </td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'default' | 'success' | 'warning' | 'danger' | 'info'</code></td>
              <td><code>'default'</code></td>
              <td>
                Visual + semantic variant. Warning and danger use{' '}
                <code>role="alert"</code> and <code>aria-live="assertive"</code>.
              </td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>
                <code>
                  'top-left' | 'top-center' | 'top-right' | 'bottom-left'
                  | 'bottom-center' | 'bottom-right'
                </code>
              </td>
              <td>
                <code>&lt;Toaster defaultPlacement&gt;</code>
              </td>
              <td>Which region to land in. Falls back to the Toaster default.</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render the built-in <code>✕</code> dismiss button.</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode | false</code></td>
              <td><code>—</code></td>
              <td>
                Custom icon node, or <code>false</code> to suppress the
                default emoji glyph picked by variant.
              </td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td><code>{`{ label: ReactNode; onClick: () => void }`}</code></td>
              <td><code>—</code></td>
              <td>
                Inline action button (e.g. "Undo"). The toast auto-dismisses
                after the action fires.
              </td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired exactly once when the toast is removed.</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td>auto</td>
              <td>
                Stable id. A toast with an existing id replaces the previous
                one in place — handy for "Saving… → Saved!" flows.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API: ToasterProps ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">API · <code>&lt;Toaster /&gt;</code></h2>
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
              <td><code>defaultPlacement</code></td>
              <td><code>ToastPlacement</code></td>
              <td><code>'top-right'</code></td>
              <td>
                Region used for any toast that does not specify its own{' '}
                <code>placement</code>.
              </td>
            </tr>
            <tr>
              <td><code>limit</code></td>
              <td><code>number</code></td>
              <td><code>5</code></td>
              <td>
                Maximum visible toasts per region. Older toasts past the limit
                are dropped from view but remain in the queue until dismissed
                or auto-closed.
              </td>
            </tr>
            <tr>
              <td><code>defaultDuration</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>
                Default auto-dismiss timeout in ms. Override per-toast via{' '}
                <code>options.duration</code>.
              </td>
            </tr>
            <tr>
              <td><code>zIndex</code></td>
              <td><code>number</code></td>
              <td><code>10000</code></td>
              <td>Stacking context applied to every region.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The single <code>&lt;Toaster /&gt;</code> instance is portalled to{' '}
          <code>document.body</code>, so it escapes any clipping ancestor and
          is safe to mount inside narrow layouts.
        </p>
      </section>
    </article>
  );
}
