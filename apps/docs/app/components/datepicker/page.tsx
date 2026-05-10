'use client';

import { useState } from 'react';
import { DatePicker } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

/** Helpers used by a couple of demos. */
function daysFromToday(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

function isWeekend(d: Date): boolean {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

export default function DatePickerDocPage() {
  // Controlled demo state.
  const [picked, setPicked] = useState<Date | null>(null);
  const [holiday, setHoliday] = useState<Date | null>(daysFromToday(2));

  return (
    <article className="doc">
      <h1 className="doc-title">DatePicker</h1>
      <p className="doc-lede">
        A hand-drawn single-day picker. The trigger inherits the Input
        wrapper look so it sits naturally in forms; the calendar popup
        is portalled into <code>document.body</code>, auto-flips when
        there&apos;s no room below, and supports full keyboard
        navigation. Zero external dependencies — built on the native{' '}
        <code>Date</code> object.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Minimal usage — uncontrolled. The component tracks its own
          state when no <code>value</code> prop is given.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <DatePicker placeholder="选择日期" aria-label="Pick a date" />
          </div>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three sizes that match Input — <code>sm</code> /{' '}
          <code>md</code> (default) / <code>lg</code>.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              size="sm"
              placeholder="Small"
              aria-label="Small date"
            />
            <DatePicker
              size="md"
              placeholder="Medium"
              aria-label="Medium date"
            />
            <DatePicker
              size="lg"
              placeholder="Large"
              aria-label="Large date"
            />
          </div>
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <p className="doc-note">
          Default, disabled, read-only, error + helper text, and the
          built-in <code>clearable</code> ✕ button (visible whenever a
          value is selected).
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              defaultValue={daysFromToday(0)}
              aria-label="Default with value"
            />
            <DatePicker
              defaultValue={daysFromToday(0)}
              disabled
              aria-label="Disabled"
            />
            <DatePicker
              defaultValue={daysFromToday(0)}
              readOnly
              aria-label="Read-only"
            />
          </div>
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              error
              helperText="Please pick a valid date."
              placeholder="Required"
              aria-label="Error date"
            />
            <DatePicker
              defaultValue={daysFromToday(3)}
              clearable
              aria-label="Clearable date"
            />
          </div>
        </div>
      </section>

      {/* === Bounds ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Bounds &amp; disabled days</h2>
        <p className="doc-note">
          Use <code>minDate</code> / <code>maxDate</code> for hard
          bounds, or <code>disabledDate</code> for arbitrary rules. The
          two are OR-ed — a day is disabled if any of them says so. The
          second picker below disables weekends.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              minDate={daysFromToday(-3)}
              maxDate={daysFromToday(10)}
              placeholder="±3..+10 days from today"
              aria-label="Bounded date"
            />
            <DatePicker
              disabledDate={isWeekend}
              placeholder="Weekdays only"
              aria-label="No weekends"
            />
          </div>
        </div>
      </section>

      {/* === Format ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Format</h2>
        <p className="doc-note">
          The MVP token set is intentionally tiny: <code>YYYY</code>,{' '}
          <code>MM</code>, <code>DD</code>. Other characters pass
          through, so any combination of these three works.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              defaultValue={daysFromToday(0)}
              format="YYYY-MM-DD"
              aria-label="ISO format"
            />
            <DatePicker
              defaultValue={daysFromToday(0)}
              format="YYYY/MM/DD"
              aria-label="Slash format"
            />
            <DatePicker
              defaultValue={daysFromToday(0)}
              format="DD-MM-YYYY"
              aria-label="EU format"
            />
          </div>
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Drive the value from React state. Use the buttons to set or
          clear the date externally; the picker stays in sync.
        </p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{ gap: 16, alignItems: 'flex-start' }}
          >
            <DatePicker
              value={picked}
              onChange={setPicked}
              placeholder="选个日子"
              aria-label="Controlled date"
            />
            <button
              type="button"
              onClick={() => setPicked(daysFromToday(0))}
              style={{
                fontFamily: 'inherit',
                padding: '8px 14px',
                border: '1.5px solid #1e1e1e',
                background: '#fff',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Set today
            </button>
            <button
              type="button"
              onClick={() => setPicked(null)}
              style={{
                fontFamily: 'inherit',
                padding: '8px 14px',
                border: '1.5px solid #1e1e1e',
                background: '#fff',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
          <p
            className="doc-note"
            style={{ fontFamily: 'monospace', fontSize: 13 }}
          >
            current value:{' '}
            <code>{picked ? picked.toISOString().slice(0, 10) : '(none)'}</code>
          </p>
        </div>
      </section>

      {/* === Inside a form =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Inside a form</h2>
        <p className="doc-note">
          Pass <code>name</code> and DatePicker renders a hidden input
          with an ISO <code>YYYY-MM-DD</code> string so it participates
          in standard <code>{'<form>'}</code> submission.
        </p>
        <div className="doc-demo">
          <form
            className="doc-demo-row"
            style={{ gap: 16, alignItems: 'flex-start' }}
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              alert(`due=${data.get('due') ?? '(none)'}`);
            }}
          >
            <DatePicker
              name="due"
              value={holiday}
              onChange={setHoliday}
              aria-label="Due date"
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
import { DatePicker } from 'scribble-ui';

// 1. Uncontrolled
<DatePicker placeholder="Pick a date" />

// 2. Controlled
function Controlled() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      format="YYYY/MM/DD"
    />
  );
}

// 3. Bounded — only the next two weeks
<DatePicker
  minDate={new Date()}
  maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
/>

// 4. Disable weekends
<DatePicker
  disabledDate={(d) => {
    const dow = d.getDay();
    return dow === 0 || dow === 6;
  }}
/>

// 5. Inside a <form> — pass \`name\` for native submit
<form onSubmit={(e) => {
  e.preventDefault();
  console.log(new FormData(e.currentTarget).get('due')); // "2026-01-12"
}}>
  <DatePicker name="due" defaultValue={new Date()} />
  <button type="submit">Submit</button>
</form>`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
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
              <td>
                <code>value</code>
              </td>
              <td>
                <code>Date | null</code>
              </td>
              <td>—</td>
              <td>Controlled selected date.</td>
            </tr>
            <tr>
              <td>
                <code>defaultValue</code>
              </td>
              <td>
                <code>Date | null</code>
              </td>
              <td>—</td>
              <td>Initial value in uncontrolled mode.</td>
            </tr>
            <tr>
              <td>
                <code>onChange</code>
              </td>
              <td>
                <code>{'(date: Date | null) => void'}</code>
              </td>
              <td>—</td>
              <td>
                Fires when the user picks a date or clears the field.
              </td>
            </tr>
            <tr>
              <td>
                <code>minDate</code>
              </td>
              <td>
                <code>Date</code>
              </td>
              <td>—</td>
              <td>Hard lower bound (inclusive).</td>
            </tr>
            <tr>
              <td>
                <code>maxDate</code>
              </td>
              <td>
                <code>Date</code>
              </td>
              <td>—</td>
              <td>Hard upper bound (inclusive).</td>
            </tr>
            <tr>
              <td>
                <code>disabledDate</code>
              </td>
              <td>
                <code>{'(date: Date) => boolean'}</code>
              </td>
              <td>—</td>
              <td>
                Custom predicate. OR-ed with <code>minDate</code> /{' '}
                <code>maxDate</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>format</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'YYYY-MM-DD'</code>
              </td>
              <td>
                Display format. Tokens: <code>YYYY</code>,{' '}
                <code>MM</code>, <code>DD</code>. Other characters pass
                through.
              </td>
            </tr>
            <tr>
              <td>
                <code>placeholder</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>'选择日期'</code>
              </td>
              <td>Trigger placeholder when no value is selected.</td>
            </tr>
            <tr>
              <td>
                <code>size</code>
              </td>
              <td>
                <code>'sm' | 'md' | 'lg'</code>
              </td>
              <td>
                <code>'md'</code>
              </td>
              <td>Visual size — matches Input.</td>
            </tr>
            <tr>
              <td>
                <code>disabled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Disable the entire picker.</td>
            </tr>
            <tr>
              <td>
                <code>readOnly</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>
                Mark the trigger read-only — the popup still opens but
                clicking a day does not change the value.
              </td>
            </tr>
            <tr>
              <td>
                <code>error</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Render in danger color.</td>
            </tr>
            <tr>
              <td>
                <code>helperText</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>—</td>
              <td>Helper line under the trigger.</td>
            </tr>
            <tr>
              <td>
                <code>clearable</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Show a ✕ button to clear the value.</td>
            </tr>
            <tr>
              <td>
                <code>weekStartsOn</code>
              </td>
              <td>
                <code>0 | 1</code>
              </td>
              <td>
                <code>1</code>
              </td>
              <td>First day of week (0 = Sunday, 1 = Monday).</td>
            </tr>
            <tr>
              <td>
                <code>locale</code>
              </td>
              <td>
                <code>CalendarLocale</code>
              </td>
              <td>zh-CN</td>
              <td>
                Override weekday / month / button labels. Defaults to a
                bundled Chinese label set.
              </td>
            </tr>
            <tr>
              <td>
                <code>showToday</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Show a "Today" shortcut at the bottom of the popup.</td>
            </tr>
            <tr>
              <td>
                <code>name</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>—</td>
              <td>
                Renders a hidden input that submits ISO{' '}
                <code>YYYY-MM-DD</code> with native form posts.
              </td>
            </tr>
            <tr>
              <td>
                <code>onOpenChange</code>
              </td>
              <td>
                <code>{'(open: boolean) => void'}</code>
              </td>
              <td>—</td>
              <td>Notified when the popup opens or closes.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
