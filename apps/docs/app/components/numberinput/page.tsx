'use client';

import { useRef, useState, type FormEvent } from 'react';
import { NumberInput } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all docs pages share one stylesheet.
import '../button/page.css';

export default function NumberInputDocPage() {
  // === Controlled demo ====================================================
  const [qty, setQty] = useState<number | undefined>(1);

  // === Uncontrolled demo (read via hidden mirror at submit time) ==========
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(String(data.get('price') ?? ''));
  }

  return (
    <article className="doc">
      <h1 className="doc-title">NumberInput</h1>
      <p className="doc-lede">
        A number-aware sibling of <code>Input</code>. Same hand-drawn wrapper,
        same prefix/suffix slots, plus typed step controls, keyboard
        shortcuts (↑/↓, Shift, Alt, Home, End) and value clamping. Uses
        <code>type="text"</code> + <code>inputMode="decimal"</code> so we
        skip the inconsistent native spinner UI.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo doc-demo--column">
          <NumberInput size="sm" defaultValue={1} placeholder="Small — 32px" />
          <NumberInput
            size="md"
            defaultValue={1}
            placeholder="Medium — 40px (default)"
          />
          <NumberInput size="lg" defaultValue={1} placeholder="Large — 52px" />
        </div>
      </section>

      {/* === States =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo doc-demo--column">
          <NumberInput placeholder="Default · empty" />
          <NumberInput
            min={0}
            max={100}
            defaultValue={42}
            helperText="Clamped to 0 – 100. Try ↑/↓, Shift+↑, Alt+↑, Home, End."
          />
          <NumberInput
            step={0.5}
            precision={2}
            defaultValue={3.14}
            helperText="step=0.5, precision=2 — blur to round to 2 decimals."
          />
          <NumberInput
            disabled
            defaultValue={7}
            placeholder="Disabled"
            helperText="Disabled — wobble drops, controls inert."
          />
          <NumberInput
            readOnly
            defaultValue={7}
            placeholder="Read-only"
            helperText="Read-only — value visible, controls inert."
          />
          <NumberInput
            error
            defaultValue={-3}
            min={0}
            helperText="Value must be ≥ 0."
          />
          <NumberInput
            controls={false}
            defaultValue={1}
            placeholder="controls={false} — no ± buttons, keyboard still works"
          />
          <NumberInput
            wheelStep
            defaultValue={50}
            min={0}
            max={100}
            helperText="wheelStep — focus this input, then scroll the mouse wheel."
          />
        </div>
      </section>

      {/* === Slots: prefix & suffix =========================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With prefix &amp; suffix</h2>
        <div className="doc-demo doc-demo--column">
          <NumberInput
            prefix="¥"
            suffix="元"
            defaultValue={9.9}
            step={0.1}
            precision={2}
            placeholder="0.00"
          />
          <NumberInput
            prefix="$"
            defaultValue={199}
            min={0}
            placeholder="0"
          />
          <NumberInput
            suffix="%"
            defaultValue={75}
            min={0}
            max={100}
            placeholder="0"
          />
        </div>
      </section>

      {/* === Controlled vs Uncontrolled ======================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled &amp; Uncontrolled</h2>
        <div className="doc-demo doc-demo--column">
          <div>
            <NumberInput
              value={qty}
              onChange={setQty}
              min={0}
              max={10}
              prefix="Qty"
              helperText="Controlled. Use ± or arrow keys."
            />
            <p className="doc-note">
              Live value: <code>{qty === undefined ? '(empty)' : qty}</code>
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <NumberInput
              name="price"
              defaultValue={19.99}
              step={0.01}
              precision={2}
              prefix="$"
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
              Uncontrolled — submitted via a hidden{' '}
              <code>&lt;input type="hidden" name="price" /&gt;</code> mirror.
              Last submit: <code>{submitted ?? '(none yet)'}</code>
            </p>
          </form>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { NumberInput } from 'scribble-ui';

// Uncontrolled with bounds + step.
<NumberInput defaultValue={1} min={0} max={10} />

// Controlled.
const [qty, setQty] = useState<number | undefined>(1);
<NumberInput value={qty} onChange={setQty} min={0} max={10} />

// Decimal currency, blurs to 2 fixed decimals.
<NumberInput
  prefix="¥"
  suffix="元"
  defaultValue={9.9}
  step={0.1}
  precision={2}
/>

// Form submission via hidden mirror.
<form onSubmit={(e) => { e.preventDefault(); /* read FormData */ }}>
  <NumberInput name="price" defaultValue={19.99} step={0.01} precision={2} />
  <button type="submit">Submit</button>
</form>

// Keyboard:  ↑/↓ ±step  ·  Shift+↑/↓ ±step×10  ·  Alt+↑/↓ ±step×0.1
//            Home → min  ·  End → max
//
// Mouse wheel stepping is opt-in via wheelStep.
<NumberInput wheelStep defaultValue={50} min={0} max={100} />`}</code>
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
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>Controlled value. Pair with <code>onChange</code>.</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>Initial value for uncontrolled usage.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(value: number | undefined) =&gt; void</code></td>
              <td>—</td>
              <td>
                Fires when the value commits (typing a clean number, ±,
                arrows, blur). <code>undefined</code> means the field was
                emptied.
              </td>
            </tr>
            <tr>
              <td><code>min</code> / <code>max</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>
                Inclusive bounds. Used for clamping, ± button enablement and
                the <code>Home</code>/<code>End</code> shortcuts.
              </td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>
                Increment for the ± buttons and arrow keys. Combined with
                <code>Shift</code> (×10) or <code>Alt</code> (×0.1) modifiers.
              </td>
            </tr>
            <tr>
              <td><code>precision</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>
                Decimal places. Enforced on blur via <code>toFixed</code>;
                in-flight typing is left untouched so partials like
                <code>"1."</code> work.
              </td>
            </tr>
            <tr>
              <td><code>controls</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Render the ± stepper buttons.</td>
            </tr>
            <tr>
              <td><code>wheelStep</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Opt-in mouse-wheel stepping. Only fires while the input is
                focused; native page scroll is preserved otherwise.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Visual size — matches <code>Input</code>.</td>
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
              <td>
                Slot rendered after the ± controls. Useful for unit labels
                (<code>元</code>, <code>%</code>, …).
              </td>
            </tr>
            <tr>
              <td><code>disabled</code> / <code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Standard native semantics. <code>disabled</code> drops the
                wobble entirely; <code>readOnly</code> keeps the value
                visible but disables ± and key shortcuts.
              </td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>
                When set, renders a hidden <code>&lt;input type="hidden"&gt;</code>{' '}
                mirror so the value participates in native <code>&lt;form&gt;</code>{' '}
                submissions.
              </td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Native placeholder shown when the input is empty.</td>
            </tr>
            <tr>
              <td><code>wrapperClassName</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Append a class to the outer wrapper for layout overrides.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Append a class to the native <code>&lt;input&gt;</code> element.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The component forwards a ref to the underlying{' '}
          <code>HTMLInputElement</code> and accepts every native input attribute
          beyond the ones listed above (e.g. <code>aria-label</code>, <code>id</code>,{' '}
          <code>autoFocus</code>).
        </p>
      </section>
    </article>
  );
}
