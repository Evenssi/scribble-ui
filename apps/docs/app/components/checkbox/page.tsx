'use client';

import { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'scribble-ui';
import '../button/page.css';

export default function CheckboxDocPage() {
  const [single, setSingle] = useState(false);
  const [picks, setPicks] = useState<string[]>(['paper', 'sketch']);

  return (
    <article className="doc">
      <h1 className="doc-title">Checkbox</h1>
      <p className="doc-lede">
        A hand-drawn checkbox with a real native <code>&lt;input&gt;</code>
        underneath, so screen readers and form submission keep working.
        Drop several into a <code>CheckboxGroup</code> for shared state
        and layout.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
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
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo doc-demo--column">
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
          <Checkbox disabled defaultChecked>
            Disabled + checked
          </Checkbox>
          <div>
            <Checkbox
              checked={single}
              onChange={(next) => setSingle(next)}
            >
              Controlled — current value: <code>{String(single)}</code>
            </Checkbox>
          </div>
        </div>
      </section>

      {/* === Group · vertical ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Group · vertical</h2>
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
          <p className="doc-note">
            Selected: <code>{picks.join(', ') || '(none)'}</code>
          </p>
        </div>
      </section>

      {/* === Group · horizontal + disabled =================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Group · horizontal + group-disabled</h2>
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
          <p className="doc-note">
            The second group is disabled at the group level — every
            child reads <code>disabled</code> from context.
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
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
        <h2 className="doc-h2">API</h2>
        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          Checkbox
        </h3>
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset for both the box and the label.</td>
            </tr>
            <tr>
              <td><code>checked</code> / <code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Use one or the other — controlled vs uncontrolled.</td>
            </tr>
            <tr>
              <td><code>indeterminate</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Visual "mixed" state. Written to the DOM via ref since it isn't part of React's controlled props.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Standard disabled. Drops the wobble entirely.</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required when the checkbox lives inside a <code>CheckboxGroup</code>.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(checked, e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Receives the next boolean state plus the raw event.</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Label rendered next to the box.</td>
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
          CheckboxGroup
        </h3>
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
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string[]</code></td>
              <td><code>—</code></td>
              <td>Selected values, by child <code>value</code>.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(values: string[]) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired with the next selection whenever any child toggles.</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Forwarded onto every nested input. Children's own <code>name</code> is ignored inside a group.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disable every nested checkbox at once.</td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'vertical'</code></td>
              <td>Layout direction.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
