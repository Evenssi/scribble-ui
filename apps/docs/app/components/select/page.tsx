'use client';

import { useState } from 'react';
import { Select, Option } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

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

export default function SelectDocPage() {
  const [controlled, setControlled] = useState<string | undefined>('banana');
  const [country, setCountry] = useState<string | undefined>(undefined);

  return (
    <article className="doc">
      <h1 className="doc-title">Select</h1>
      <p className="doc-lede">
        A hand-drawn dropdown picker. The trigger inherits the Input
        wrapper look so it sits naturally in forms. The listbox is
        portalled into <code>document.body</code> to escape ancestor
        overflow, auto-flips above the trigger when there&apos;s no room
        below, and supports full keyboard navigation including typeahead.
      </p>

      {/* === Basic — array form ============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Minimal form — pass an <code>options</code> array of{' '}
          <code>{'{ value, label, disabled? }'}</code>. The component
          tracks state on its own when no <code>value</code> prop is
          given (uncontrolled).
        </p>
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
        <h2 className="doc-h2">JSX children</h2>
        <p className="doc-note">
          When you need icons, custom rendering, or want children to
          live next to other JSX, declare options as <code>{'<Option>'}</code>{' '}
          children instead.
        </p>
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
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Drive the selected value from React state. The two pickers
          below share the same state — moving one moves the other.
        </p>
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
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three sizes that match Input — <code>sm</code> /{' '}
          <code>md</code> (default) / <code>lg</code>.
        </p>
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
        <h2 className="doc-h2">Disabled</h2>
        <p className="doc-note">
          The <em>Durian</em> entry above is disabled — keyboard
          navigation skips it and clicks are ignored. The whole select
          can also be disabled.
        </p>
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
        <h2 className="doc-h2">Long list (auto-flip + scroll)</h2>
        <p className="doc-note">
          The listbox caps at <code>280px</code> tall and scrolls when
          longer. If there&apos;s no room below the trigger it flips
          above. Open the picker near the bottom of the viewport to see
          it flip.
        </p>
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
        <h2 className="doc-h2">Error + helper text</h2>
        <p className="doc-note">
          Use <code>error</code> with <code>helperText</code> to surface
          validation messages.
        </p>
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
        <h2 className="doc-h2">Inside a form</h2>
        <p className="doc-note">
          Pass <code>name</code> and Select renders a hidden input so it
          participates in standard <code>{'<form>'}</code> submission.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
        <h2 className="doc-h2">API</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Controlled selected value.</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Initial value in uncontrolled mode.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>{'(value: string) => void'}</code></td>
              <td>—</td>
              <td>Fires when the user picks an option.</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td><code>{'{ value, label, disabled? }[]'}</code></td>
              <td>—</td>
              <td>Array form. Mutually exclusive with JSX children (children win).</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td><code>'Select…'</code></td>
              <td>Shown when no value is selected.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Visual size — matches Input.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables the entire select.</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Render with the danger color.</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Helper line below the trigger.</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Renders a hidden input so the value submits with a form.</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>{'(open: boolean) => void'}</code></td>
              <td>—</td>
              <td>Notified when the listbox opens or closes.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
