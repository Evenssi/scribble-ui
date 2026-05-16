import { notFound } from 'next/navigation';
import { Divider } from 'scribble-ui';

import { isLocale } from '../../../../i18n/config';
import { getDictionary } from '../../../../i18n/getDictionary';

export default async function DividerDocPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const t = dict.components.divider;
  if (!t) notFound();

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <p>Above the line.</p>
          <Divider />
          <p>Below the line.</p>
        </div>
      </section>

      {/* === Variants ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.variants}</h2>
        <p className="doc-note">{t.notes.variants}</p>
        <div className="doc-demo doc-demo--column">
          <p>solid</p>
          <Divider variant="solid" />
          <p>dashed</p>
          <Divider variant="dashed" />
          <p>wavy</p>
          <Divider variant="wavy" />
        </div>
      </section>

      {/* === Thickness ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.thickness}</h2>
        <p className="doc-note">{t.notes.thickness}</p>
        <div className="doc-demo doc-demo--column">
          <p>thin</p>
          <Divider thickness="thin" />
          <p>default</p>
          <Divider thickness="default" />
          <p>bold</p>
          <Divider thickness="bold" />
          <p>bold + dashed</p>
          <Divider thickness="bold" variant="dashed" />
          <p>bold + wavy</p>
          <Divider thickness="bold" variant="wavy" />
        </div>
      </section>

      {/* === With label ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.withLabel}</h2>
        <p className="doc-note">{t.notes.withLabel}</p>
        <div className="doc-demo doc-demo--column">
          <Divider>OR</Divider>
          <Divider labelAlign="start">Today</Divider>
          <Divider labelAlign="end">Older</Divider>
          <Divider variant="dashed">section</Divider>
          <Divider variant="wavy">end of feed</Divider>
        </div>
      </section>

      {/* === Vertical ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.vertical}</h2>
        <p className="doc-note">{t.notes.vertical}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ alignItems: 'stretch' }}>
            <span>Left</span>
            <Divider orientation="vertical" />
            <span>Middle</span>
            <Divider orientation="vertical" variant="dashed" />
            <span>Right</span>
            <Divider orientation="vertical" variant="wavy" />
            <span>End</span>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Divider } from 'scribble-ui';

export function Example() {
  return (
    <>
      {/* Bare horizontal */}
      <Divider />

      {/* Dashed + bold */}
      <Divider variant="dashed" thickness="bold" />

      {/* With a centered label */}
      <Divider>OR</Divider>

      {/* Label pushed to the start */}
      <Divider labelAlign="start">Today</Divider>

      {/* Vertical inside a flex row */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </>
  );
}`}</code>
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
              <td><code>orientation</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
              <td>{t.api.rows.orientation?.description}</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'solid' | 'dashed' | 'wavy'</code></td>
              <td><code>'solid'</code></td>
              <td>{t.api.rows.variant?.description}</td>
            </tr>
            <tr>
              <td><code>thickness</code></td>
              <td><code>'thin' | 'default' | 'bold'</code></td>
              <td><code>'default'</code></td>
              <td>{t.api.rows.thickness?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>labelAlign</code></td>
              <td><code>'start' | 'center' | 'end'</code></td>
              <td><code>'center'</code></td>
              <td>{t.api.rows.labelAlign?.description}</td>
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
