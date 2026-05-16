'use client';

import { useRef, useState } from 'react';
import { Input } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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

export function InputDocClient({ t }: { t: ComponentDoc }) {
  // === Controlled demo ====================================================
  const [name, setName] = useState('');

  // === Uncontrolled demo ==================================================
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <div className="doc-demo doc-demo--column">
          <Input size="sm" placeholder="Small — 32px" />
          <Input size="md" placeholder="Medium — 40px (default)" />
          <Input size="lg" placeholder="Large — 52px" />
        </div>
      </section>

      {/* === States =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.states}</h2>
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
        <h2 className="doc-h2">{t.sections.slots}</h2>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <div className="doc-demo doc-demo--column">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Controlled — your name"
              clearable
            />
            <p className="doc-note">
              {t.notes.controlledLive} <code>{name || '(empty)'}</code>
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
              {t.notes.controlledSubmitted} <code>{submitted ?? '(none yet)'}</code>
            </p>
          </form>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>prefix</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.api.rows.prefix?.description}</td>
            </tr>
            <tr>
              <td><code>suffix</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>{t.api.rows.suffix?.description}</td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.clearable?.description}</td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.api.rows.valueAndDefaultValue?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(e) =&gt; void</code></td>
              <td>—</td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code> / <code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabledAndReadOnly?.description}</td>
            </tr>
            <tr>
              <td><code>wrapperClassName</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>{t.api.rows.wrapperClassName?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
