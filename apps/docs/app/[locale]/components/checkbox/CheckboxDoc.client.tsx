'use client';

import { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function CheckboxDocClient({ t }: { t: ComponentDoc }) {
  const [single, setSingle] = useState(false);
  const [picks, setPicks] = useState<string[]>(['paper', 'sketch']);

  const groupVerticalLine = (t.notes.groupVertical ?? '').replace(
    '{picks}',
    picks.join(', ') || '(none)',
  );

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <div className="doc-demo doc-demo--column">
          <Checkbox size="sm" defaultChecked>
            Small
          </Checkbox>
          <Checkbox size="md" defaultChecked>
            Medium (default)
          </Checkbox>
          <Checkbox size="lg" defaultChecked>
            Large
          </Checkbox>
        </div>
      </section>

      {/* === States =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.states}</h2>
        <div className="doc-demo doc-demo--column">
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox disabled defaultChecked>
            Disabled + checked
          </Checkbox>
          <div>
            <Checkbox checked={single} onChange={(next) => setSingle(next)}>
              Controlled — current value: <code>{String(single)}</code>
            </Checkbox>
          </div>
        </div>
      </section>

      {/* === Group · vertical ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.groupVertical}</h2>
        <div className="doc-demo doc-demo--column">
          <CheckboxGroup
            value={picks}
            onChange={setPicks}
            name="materials"
            direction="vertical"
          >
            <Checkbox value="paper">Paper</Checkbox>
            <Checkbox value="sketch">Sketch</Checkbox>
            <Checkbox value="ink">Ink</Checkbox>
            <Checkbox value="watercolor" disabled>
              Watercolor (out of stock)
            </Checkbox>
          </CheckboxGroup>
          <p className="doc-note">{groupVerticalLine}</p>
        </div>
      </section>

      {/* === Group · horizontal + disabled =================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.groupHorizontal}</h2>
        <div className="doc-demo doc-demo--column">
          <CheckboxGroup
            defaultValue={['a', 'c']}
            direction="horizontal"
            name="letters"
          >
            <Checkbox value="a">a</Checkbox>
            <Checkbox value="b">b</Checkbox>
            <Checkbox value="c">c</Checkbox>
            <Checkbox value="d">d</Checkbox>
          </CheckboxGroup>
          <CheckboxGroup
            defaultValue={['a']}
            disabled
            direction="horizontal"
            name="letters-disabled"
          >
            <Checkbox value="a">a</Checkbox>
            <Checkbox value="b">b</Checkbox>
            <Checkbox value="c">c</Checkbox>
          </CheckboxGroup>
          <p className="doc-note">{t.notes.groupHorizontal}</p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Checkbox, CheckboxGroup } from 'scribble-ui';

// Standalone, controlled.
const [agree, setAgree] = useState(false);
<Checkbox checked={agree} onChange={setAgree}>
  I agree
</Checkbox>

// Indeterminate (DOM-only — written via ref by the component).
<Checkbox indeterminate>Some selected</Checkbox>

// Group, controlled.
const [picks, setPicks] = useState(['paper', 'sketch']);
<CheckboxGroup value={picks} onChange={setPicks} name="materials">
  <Checkbox value="paper">Paper</Checkbox>
  <Checkbox value="sketch">Sketch</Checkbox>
  <Checkbox value="ink">Ink</Checkbox>
</CheckboxGroup>`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.api}</h2>
        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          {t.sections.apiCheckbox}
        </h3>
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.cb__size?.description}</td>
            </tr>
            <tr>
              <td><code>checked</code> / <code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.cb__checked?.description}</td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.cb__indeterminate?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.cb__disabled?.description}</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.cb__value?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(checked, e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.cb__onChange?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.cb__children?.description}</td>
            </tr>
          </tbody>
        </table>

        <h3
          className="doc-h2"
          style={{
            fontSize: 'var(--su-font-size-h3)',
            marginTop: 'var(--su-space-4)',
          }}
        >
          {t.sections.apiGroup}
        </h3>
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
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string[]</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.grp__value?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(values: string[]) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.grp__onChange?.description}</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.grp__name?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.grp__disabled?.description}</td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'vertical'</code></td>
              <td>{t.api.rows.grp__direction?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
