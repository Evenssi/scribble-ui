'use client';

import { useState } from 'react';
import { Switch } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function SwitchDocClient({ t }: { t: ComponentDoc }) {
  const [controlled, setControlled] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [airplane, setAirplane] = useState(false);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
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
        <h2 className="doc-h2">{t.sections.sizes}</h2>
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
        <h2 className="doc-h2">{t.sections.states}</h2>
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
        <h2 className="doc-h2">{t.sections.labelPosition}</h2>
        <p className="doc-note">{t.notes.labelPosition}</p>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>checked</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.checked?.description}</td>
            </tr>
            <tr>
              <td><code>defaultChecked</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.defaultChecked?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(checked, e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.label?.description}</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.helperText?.description}</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.error?.description}</td>
            </tr>
            <tr>
              <td><code>labelPosition</code></td>
              <td><code>'left' | 'right'</code></td>
              <td><code>'right'</code></td>
              <td>{t.api.rows.labelPosition?.description}</td>
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
