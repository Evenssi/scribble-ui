'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from 'scribble-ui';

import type { RadioDoc } from '../../../../i18n/dictionaries/zh-CN/components/radio';

/**
 * Radio's dictionary entry has two API tables (Radio + RadioGroup), so
 * the page-level server component passes the raw dictionary object
 * through and we re-narrow to the richer `RadioDoc` here.
 */
export function RadioDocClient({ t: tBase }: { t: unknown }) {
  const t = tBase as RadioDoc;

  const [tier, setTier] = useState<string>('free');

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <div className="doc-demo doc-demo--column">
          <Radio size="sm" name="size-demo" value="sm" defaultChecked>
            Small
          </Radio>
          <Radio size="md" name="size-demo" value="md">
            Medium (default)
          </Radio>
          <Radio size="lg" name="size-demo" value="lg">
            Large
          </Radio>
        </div>
      </section>

      {/* === States =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.states}</h2>
        <div className="doc-demo doc-demo--column">
          <Radio name="state-demo" value="off">
            Unchecked
          </Radio>
          <Radio name="state-demo" value="on" defaultChecked>
            Checked
          </Radio>
          <Radio name="state-demo-d" value="d1" disabled>
            Disabled
          </Radio>
          <Radio name="state-demo-d" value="d2" disabled defaultChecked>
            Disabled + checked
          </Radio>
        </div>
      </section>

      {/* === Group · vertical ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.groupVertical}</h2>
        <div className="doc-demo doc-demo--column">
          <RadioGroup name="tier" value={tier} onChange={setTier}>
            <Radio value="free">Free — sketch-grade tier</Radio>
            <Radio value="pro">Pro — ink-grade tier</Radio>
            <Radio value="studio">Studio — watercolor tier</Radio>
          </RadioGroup>
          <p className="doc-note">
            {t.notes.selected} <code>{tier}</code>
          </p>
        </div>
      </section>

      {/* === Group · horizontal + group-disabled ============== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.groupHorizontal}</h2>
        <div className="doc-demo doc-demo--column">
          <RadioGroup
            name="alignment"
            defaultValue="left"
            direction="horizontal"
          >
            <Radio value="left">Left</Radio>
            <Radio value="center">Center</Radio>
            <Radio value="right">Right</Radio>
          </RadioGroup>
          <RadioGroup
            name="alignment-disabled"
            defaultValue="center"
            direction="horizontal"
            disabled
          >
            <Radio value="left">Left</Radio>
            <Radio value="center">Center</Radio>
            <Radio value="right">Right</Radio>
          </RadioGroup>
          <p className="doc-note">{t.notes.groupHorizontal}</p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Radio, RadioGroup } from 'scribble-ui';

// Standalone — pass name + value yourself.
<Radio name="tier" value="free" defaultChecked>Free</Radio>

// Group — name lives on the group, every child shares it.
const [tier, setTier] = useState('free');
<RadioGroup name="tier" value={tier} onChange={setTier}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="studio">Studio</Radio>
</RadioGroup>`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.api}</h2>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          {t.apiHeadings.radio}
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
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.name?.description}</td>
            </tr>
            <tr>
              <td><code>checked</code> / <code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.checkedDefaultChecked?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(checked, e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
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
          {t.apiHeadings.radioGroup}
        </h3>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiRadioGroup.headers.name}</th>
              <th>{t.apiRadioGroup.headers.type}</th>
              <th>{t.apiRadioGroup.headers.default}</th>
              <th>{t.apiRadioGroup.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.apiRadioGroup.rows.name?.description}</td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.apiRadioGroup.rows.valueDefaultValue?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(value: string) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.apiRadioGroup.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.apiRadioGroup.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'vertical'</code></td>
              <td>{t.apiRadioGroup.rows.direction?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
