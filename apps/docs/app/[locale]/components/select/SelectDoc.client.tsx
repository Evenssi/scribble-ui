'use client';

import { useState } from 'react';
import { Select, Option } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian (smelly)', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const COUNTRIES = Array.from({ length: 30 }, (_, i) => ({
  value: `country-${i + 1}`,
  label: `Country №${i + 1}`,
}));

export function SelectDocClient({ t }: { t: ComponentDoc }) {
  const [controlled, setControlled] = useState<string | undefined>('banana');
  const [country, setCountry] = useState<string | undefined>(undefined);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic — array form ============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Select
              options={FRUITS}
              placeholder="Pick a fruit"
              aria-label="Pick a fruit"
            />
          </div>
        </div>
      </section>

      {/* === JSX children form =============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.jsxChildren}</h2>
        <p className="doc-note">{t.notes.jsxChildren}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Select defaultValue="cat" aria-label="Pick a pet">
              <Option value="cat">🐱 Cat</Option>
              <Option value="dog">🐶 Dog</Option>
              <Option value="rabbit">🐰 Rabbit</Option>
              <Option value="dragon" disabled>
                🐉 Dragon (extinct)
              </Option>
              <Option value="parrot">🦜 Parrot</Option>
            </Select>
          </div>
        </div>
      </section>

      {/* === Controlled ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <Select
              options={FRUITS}
              value={controlled}
              onChange={setControlled}
              aria-label="Controlled fruit (1)"
            />
            <Select
              options={FRUITS}
              value={controlled}
              onChange={setControlled}
              aria-label="Controlled fruit (2)"
            />
          </div>
          <p className="doc-output">
            current value: <code>{controlled ?? '(none)'}</code>
          </p>
        </div>
      </section>

      {/* === Sizes ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <Select
              options={FRUITS}
              size="sm"
              placeholder="Small"
              aria-label="Small select"
            />
            <Select
              options={FRUITS}
              size="md"
              placeholder="Medium"
              aria-label="Medium select"
            />
            <Select
              options={FRUITS}
              size="lg"
              placeholder="Large"
              aria-label="Large select"
            />
          </div>
        </div>
      </section>

      {/* === Disabled options & disabled select ============= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.disabled}</h2>
        <p className="doc-note">{t.notes.disabled}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <Select
              options={FRUITS}
              defaultValue="apple"
              disabled
              aria-label="Disabled select"
            />
          </div>
        </div>
      </section>

      {/* === Long list — auto flip + scroll ================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.longList}</h2>
        <p className="doc-note">{t.notes.longList}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Select
              options={COUNTRIES}
              value={country}
              onChange={setCountry}
              placeholder="Pick a country"
              aria-label="Country"
            />
          </div>
        </div>
      </section>

      {/* === Error + helper ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.error}</h2>
        <p className="doc-note">{t.notes.error}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Select
              options={FRUITS}
              placeholder="Required field"
              error
              helperText="Please pick a fruit before submitting."
              aria-label="Required fruit"
            />
          </div>
        </div>
      </section>

      {/* === Native form submit ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.insideForm}</h2>
        <p className="doc-note">{t.notes.insideForm}</p>
        <div className="doc-demo">
          <form
            className="doc-demo-row"
            style={{ gap: 16, alignItems: 'flex-start' }}
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              alert(`flavor=${data.get('flavor') ?? '(none)'}`);
            }}
          >
            <Select
              name="flavor"
              options={[
                { value: 'vanilla', label: 'Vanilla' },
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'matcha', label: 'Matcha' },
              ]}
              defaultValue="matcha"
              aria-label="Flavor"
            />
            <button
              type="submit"
              style={{
                fontFamily: 'inherit',
                padding: '8px 14px',
                border: '1.5px solid #1e1e1e',
                background: '#fff',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { useState } from 'react';
import { Select, Option } from 'scribble-ui';

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

// 1. Array form (uncontrolled)
<Select
  options={FRUITS}
  placeholder="Pick a fruit"
  aria-label="Pick a fruit"
/>

// 2. JSX children — for icons / custom rendering
<Select defaultValue="cat" aria-label="Pick a pet">
  <Option value="cat">🐱 Cat</Option>
  <Option value="dog">🐶 Dog</Option>
  <Option value="dragon" disabled>🐉 Dragon</Option>
</Select>

// 3. Controlled
function Controlled() {
  const [value, setValue] = useState<string | undefined>('banana');
  return (
    <Select
      options={FRUITS}
      value={value}
      onChange={setValue}
      aria-label="Fruit"
    />
  );
}

// 4. Inside a <form> — pass \`name\` to render a hidden input
<form onSubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log(data.get('flavor'));
}}>
  <Select
    name="flavor"
    options={[
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'matcha',  label: 'Matcha'  },
    ]}
    defaultValue="matcha"
  />
  <button type="submit">Submit</button>
</form>

// 5. Validation
<Select
  options={FRUITS}
  placeholder="Required"
  error
  helperText="Please pick a fruit before submitting."
/>`}</code>
        </pre>
      </section>

      {/* === API table ====================================== */}
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
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.api.rows.defaultValue?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>{'(value: string) => void'}</code></td>
              <td>—</td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td><code>{'{ value, label, disabled? }[]'}</code></td>
              <td>—</td>
              <td>{t.api.rows.options?.description}</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td><code>'Select…'</code></td>
              <td>{t.api.rows.placeholder?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.error?.description}</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.api.rows.helperText?.description}</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.api.rows.name?.description}</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>{'(open: boolean) => void'}</code></td>
              <td>—</td>
              <td>{t.api.rows.onOpenChange?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
