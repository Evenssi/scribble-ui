'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from 'scribble-ui';
import '../button/page.css';

export default function RadioDocPage() {
  const [tier, setTier] = useState<string>('free');

  return (
    <article className="doc">
      <h1 className="doc-title">Radio</h1>
      <p className="doc-lede">
        A hand-drawn radio button with a real native{' '}
        <code>&lt;input type="radio"&gt;</code> underneath. Drop a few of
        them into a <code>RadioGroup</code> for shared <code>name</code>,
        layout and selection state — keyboard arrow navigation works out
        of the box.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
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
        <h2 className="doc-h2">States</h2>
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
        <h2 className="doc-h2">Group · vertical (controlled)</h2>
        <div className="doc-demo doc-demo--column">
          <RadioGroup name="tier" value={tier} onChange={setTier}>
            <Radio value="free">Free — sketch-grade tier</Radio>
            <Radio value="pro">Pro — ink-grade tier</Radio>
            <Radio value="studio">Studio — watercolor tier</Radio>
          </RadioGroup>
          <p className="doc-note">
            Selected: <code>{tier}</code>
          </p>
        </div>
      </section>

      {/* === Group · horizontal + group-disabled ============== */}
      <section className="doc-section">
        <h2 className="doc-h2">Group · horizontal + group-disabled</h2>
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
        <h2 className="doc-h2">API</h2>
        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          Radio
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
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required. Identifies this option for the group / native input.</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required when standalone. Inside a <code>RadioGroup</code> the group's <code>name</code> wins.</td>
            </tr>
            <tr>
              <td><code>checked</code> / <code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Standalone controlled / uncontrolled. Ignored inside a group.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Standard disabled. Drops the wobble entirely.</td>
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
              <td>Label rendered next to the dot.</td>
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
          RadioGroup
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
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required. Forwarded onto every nested input — also gives keyboard arrow nav for free.</td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Selected value. Use one or the other.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(value: string) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fired with the new value whenever a child becomes selected.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disable every nested radio at once.</td>
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
