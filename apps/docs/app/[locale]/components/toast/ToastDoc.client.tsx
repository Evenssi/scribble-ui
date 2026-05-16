'use client';

import { Button, Toaster, toast } from 'scribble-ui';

import type { ToastDoc } from '../../../../i18n/dictionaries/zh-CN/components/toast';

export function ToastDocClient({ t: tBase }: { t: unknown }) {
  const t = tBase as ToastDoc;

  return (
    <article className="doc">
      <Toaster defaultPlacement="top-right" />

      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
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
        <h2 className="doc-h2">{t.sections.placements}</h2>
        <p className="doc-note">{t.notes.placements}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button onClick={() => toast('Top left', { placement: 'top-left' })}>
              top-left
            </Button>
            <Button onClick={() => toast('Top center', { placement: 'top-center' })}>
              top-center
            </Button>
            <Button onClick={() => toast('Top right', { placement: 'top-right' })}>
              top-right
            </Button>
          </div>
          <div className="doc-demo-row">
            <Button onClick={() => toast('Bottom left', { placement: 'bottom-left' })}>
              bottom-left
            </Button>
            <Button onClick={() => toast('Bottom center', { placement: 'bottom-center' })}>
              bottom-center
            </Button>
            <Button onClick={() => toast('Bottom right', { placement: 'bottom-right' })}>
              bottom-right
            </Button>
          </div>
        </div>
      </section>

      {/* === Duration ========================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.duration}</h2>
        <p className="doc-note">{t.notes.duration}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Button
              onClick={() => toast.info('Quick! gone in 1s', { duration: 1000 })}
            >
              1 second
            </Button>
            <Button
              onClick={() =>
                toast('Lingering for 8s — hover to pause.', { duration: 8000 })
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
        <h2 className="doc-h2">{t.sections.action}</h2>
        <p className="doc-note">{t.notes.action}</p>
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
        <h2 className="doc-h2">{t.sections.dismiss}</h2>
        <p className="doc-note">{t.notes.dismiss}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
        <h2 className="doc-h2">{t.apiHeadings.methods}</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiMethodHeaders.method}</th>
              <th>{t.apiMethodHeaders.signature}</th>
              <th>{t.apiMethodHeaders.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>toast(message, options?)</code></td>
              <td><code>(ReactNode, ToastOptions?) =&gt; string</code></td>
              <td>{t.apiMethods.base?.description}</td>
            </tr>
            <tr>
              <td><code>toast.success(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>{t.apiMethods.success?.description}</td>
            </tr>
            <tr>
              <td><code>toast.warning(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>{t.apiMethods.warning?.description}</td>
            </tr>
            <tr>
              <td><code>toast.danger(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>{t.apiMethods.danger?.description}</td>
            </tr>
            <tr>
              <td><code>toast.info(message, options?)</code></td>
              <td><code>(ReactNode, Options?) =&gt; string</code></td>
              <td>{t.apiMethods.info?.description}</td>
            </tr>
            <tr>
              <td><code>toast.dismiss(id?)</code></td>
              <td><code>(string?) =&gt; void</code></td>
              <td>{t.apiMethods.dismissMethod?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API: ToastOptions ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.apiHeadings.options}</h2>
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
              <td><code>duration</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>{t.api.rows.duration?.description}</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'default' | 'success' | 'warning' | 'danger' | 'info'</code></td>
              <td><code>'default'</code></td>
              <td>{t.api.rows.variant?.description}</td>
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
              <td>{t.api.rows.placement?.description}</td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.closable?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode | false</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>action</code></td>
              <td><code>{`{ label: ReactNode; onClick: () => void }`}</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.action?.description}</td>
            </tr>
            <tr>
              <td><code>onClose</code></td>
              <td><code>() =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onClose?.description}</td>
            </tr>
            <tr>
              <td><code>id</code></td>
              <td><code>string</code></td>
              <td>auto</td>
              <td>{t.api.rows.id?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === API: ToasterProps ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.apiHeadings.toaster}</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiToaster.headers.name}</th>
              <th>{t.apiToaster.headers.type}</th>
              <th>{t.apiToaster.headers.default}</th>
              <th>{t.apiToaster.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>defaultPlacement</code></td>
              <td><code>ToastPlacement</code></td>
              <td><code>'top-right'</code></td>
              <td>{t.apiToaster.rows.defaultPlacement?.description}</td>
            </tr>
            <tr>
              <td><code>limit</code></td>
              <td><code>number</code></td>
              <td><code>5</code></td>
              <td>{t.apiToaster.rows.limit?.description}</td>
            </tr>
            <tr>
              <td><code>defaultDuration</code></td>
              <td><code>number</code></td>
              <td><code>4000</code></td>
              <td>{t.apiToaster.rows.defaultDuration?.description}</td>
            </tr>
            <tr>
              <td><code>zIndex</code></td>
              <td><code>number</code></td>
              <td><code>10000</code></td>
              <td>{t.apiToaster.rows.zIndex?.description}</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">{t.notes.apiFooter}</p>
      </section>
    </article>
  );
}
