'use client';

import { useState } from 'react';
import { Switch } from 'scribble-ui';
import '../button/page.css';

export default function SwitchDocPage() {
  const [controlled, setControlled] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [airplane, setAirplane] = useState(false);

  return (
    <article className="doc">
      <h1 className="doc-title">Switch</h1>
      <p className="doc-lede">
        A hand-drawn toggle switch. Wraps a native{' '}
        <code>&lt;input type="checkbox" role="switch"&gt;</code> so screen
        readers announce the on/off semantics and form submission keeps
        working — the wobble is purely cosmetic.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <div className="doc-demo doc-demo--column">
          <Switch label="Default (off)" />
          <Switch label="Uncontrolled, defaultChecked" defaultChecked />
          <Switch
            label={
              <>
                Controlled — current value:{' '}
                <code>{String(controlled)}</code>
              </>
            }
            checked={controlled}
            onChange={(next) => setControlled(next)}
          />
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Switch size="sm" defaultChecked label="Small" />
            <Switch size="md" defaultChecked label="Medium (default)" />
            <Switch size="lg" defaultChecked label="Large" />
          </div>
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo doc-demo--column">
          <Switch label="Disabled" disabled />
          <Switch label="Disabled + checked" disabled defaultChecked />
          <Switch
            label="Error"
            error
            helperText="Something went wrong with this preference."
          />
          <Switch
            label="Error + checked"
            error
            defaultChecked
            helperText="The remote toggle is rejecting our update."
          />
        </div>
      </section>

      {/* === Label position ================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Label position</h2>
        <p className="doc-note">
          By default the label sits to the right of the switch. Use{' '}
          <code>labelPosition="left"</code> to mirror it (handy in
          settings tables where every row has the toggle on the right).
        </p>
        <div className="doc-demo doc-demo--column">
          <Switch label="Label on the right (default)" defaultChecked />
          <Switch
            label="Label on the left"
            labelPosition="left"
            defaultChecked
          />
        </div>
      </section>

      {/* === Controlled with feedback ======================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled with feedback</h2>
        <div className="doc-demo doc-demo--column">
          <Switch
            label="Wi-Fi"
            checked={wifi}
            onChange={(next) => setWifi(next)}
            helperText={`Wi-Fi: ${wifi ? 'ON' : 'OFF'}`}
          />
          <Switch
            label="Airplane mode"
            checked={airplane}
            onChange={(next) => {
              setAirplane(next);
              // Cute interaction: enabling airplane mode kills wifi.
              if (next) setWifi(false);
            }}
            helperText={
              airplane
                ? 'Airplane mode is on — every radio is silenced.'
                : 'Toggling this also turns Wi-Fi off.'
            }
          />
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Switch } from 'scribble-ui';

// Uncontrolled.
<Switch label="Auto-save" defaultChecked />

// Controlled — onChange receives the next boolean directly.
const [wifi, setWifi] = useState(true);
<Switch
  label="Wi-Fi"
  checked={wifi}
  onChange={(next) => setWifi(next)}
  helperText={\`Wi-Fi: \${wifi ? 'ON' : 'OFF'}\`}
/>

// Sizes + label position.
<Switch size="lg" label="Large, label on the left" labelPosition="left" />

// Error state with a helper line.
<Switch
  label="Sync notes"
  error
  helperText="Sync failed — toggle to retry."
/>`}</code>
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset for the track, thumb and label font.</td>
            </tr>
            <tr>
              <td><code>checked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Controlled checked state. Pair with <code>onChange</code>.</td>
            </tr>
            <tr>
              <td><code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Uncontrolled initial state.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(checked, e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>
                Receives the next boolean checked state plus the raw
                native event.
              </td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Standard HTML disabled. Drops the wobble entirely and
                sets <code>aria-disabled</code>.
              </td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Label rendered next to the switch. Clicking the label
                also toggles the switch (native <code>&lt;label&gt;</code>{' '}
                behavior).
              </td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                One-line hint rendered under the switch. Picks the danger
                color when <code>error</code> is true.
              </td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render the track in the danger color and tints the
                helper line red. Sets <code>aria-invalid</code>.
              </td>
            </tr>
            <tr>
              <td><code>labelPosition</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'right'</code></td>
              <td>Visual position of the label relative to the switch.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the outer <code>&lt;label&gt;</code> wrapper.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          Forwards a ref to the underlying <code>HTMLInputElement</code>{' '}
          and accepts every native input attribute (<code>name</code>,{' '}
          <code>aria-*</code>, <code>data-*</code>, …).
        </p>
      </section>
    </article>
  );
}
