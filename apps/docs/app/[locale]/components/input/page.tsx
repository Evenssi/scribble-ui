'use client';

import { useRef, useState } from 'react';
import { Input } from 'scribble-ui';
// Reuse the Button page's doc-* class set so both pages share one stylesheet.

/** Inline magnifier — keeps the docs site icon-dependency-free. */
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function InputDocPage() {
  // === Controlled demo ====================================================
  const [name, setName] = useState('');

  // === Uncontrolled demo ==================================================
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <article className="doc">
      <h1 className="doc-title">Input</h1>
      <p className="doc-lede">
        A hand-drawn text input. The visible border lives on the wrapper so
        prefix / suffix slots sit inside the same wobbly outline as the text.
        Focus a field to see the wobble level rise.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo doc-demo--column">
          <Input size="sm" placeholder="Small — 32px" />
          <Input size="md" placeholder="Medium — 40px (default)" />
          <Input size="lg" placeholder="Large — 52px" />
        </div>
      </section>

      {/* === States =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo doc-demo--column">
          <Input placeholder="Default" />
          <Input
            error
            defaultValue="not-a-real-email"
            helperText="Please enter a valid email address."
            placeholder="Error"
          />
          <Input disabled defaultValue="Disabled value" placeholder="Disabled" />
          <Input
            readOnly
            defaultValue="Read-only value"
            placeholder="Read-only"
          />
          <Input clearable defaultValue="" placeholder="Clearable — type, then click ✕" />
        </div>
      </section>

      {/* === Slots: prefix & suffix =========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With prefix & suffix</h2>
        <div className="doc-demo doc-demo--column">
          <Input prefix={<SearchIcon />} placeholder="Search anything" />
          <Input
            prefix="¥"
            suffix="元"
            placeholder="0.00"
            inputMode="decimal"
          />
          <Input
            prefix="https://"
            suffix=".com"
            placeholder="your-domain"
          />
        </div>
      </section>

      {/* === Controlled vs Uncontrolled ======================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled & Uncontrolled</h2>
        <div className="doc-demo doc-demo--column">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Controlled — your name"
              clearable
            />
            <p className="doc-note">
              Live value: <code>{name || '(empty)'}</code>
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(emailRef.current?.value ?? '');
            }}
          >
            <Input
              ref={emailRef}
              defaultValue=""
              placeholder="Uncontrolled — email, then submit"
              type="email"
              suffix={
                <button
                  type="submit"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--su-color-brand-deep)',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  Submit
                </button>
              }
            />
            <p className="doc-note">
              Last submitted: <code>{submitted ?? '(none yet)'}</code>
            </p>
          </form>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Input } from 'scribble-ui';

// Uncontrolled — pass defaultValue, read via ref.
<Input defaultValue="hi" placeholder="Type here" clearable />

// Controlled — drive value with state.
const [v, setV] = useState('');
<Input value={v} onChange={(e) => setV(e.target.value)} />

// Slots — prefix and suffix sit inside the same wobbly outline.
<Input prefix="¥" suffix="元" placeholder="0.00" inputMode="decimal" />

// Error + helper.
<Input error helperText="Required field" placeholder="Email" />`}</code>
        </pre>
      </section>

      {/* === Props =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Props</h2>
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
              <td>Visual size — does not map to the native <code>size</code> attribute.</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Paint the danger color and set <code>aria-invalid</code>.</td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Text rendered below the input. Picks the danger color when <code>error</code>.</td>
            </tr>
            <tr>
              <td><code>prefix</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Slot rendered before the input, inside the wrapper border.</td>
            </tr>
            <tr>
              <td><code>suffix</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Slot rendered after the input. Wins over <code>clearable</code> if both are passed.</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Show a ✕ affordance whenever the input has a value. Hidden when <code>suffix</code> is set.</td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Use one or the other — controlled vs uncontrolled.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(e) =&gt; void</code></td>
              <td>—</td>
              <td>Native input change handler. Fires for clear-button clicks too.</td>
            </tr>
            <tr>
              <td><code>disabled</code> / <code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Standard native semantics. Disabled drops the wobble entirely.</td>
            </tr>
            <tr>
              <td><code>wrapperClassName</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Append a class to the outer wrapper for extra layout overrides.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
