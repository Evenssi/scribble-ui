'use client';

import { useState } from 'react';
import { DatePicker } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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

export function DatePickerDocClient({ t }: { t: ComponentDoc }) {
  // Controlled demo state.
  const [picked, setPicked] = useState<Date | null>(null);
  const [holiday, setHoliday] = useState<Date | null>(daysFromToday(2));

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <DatePicker placeholder="选择日期" aria-label="Pick a date" />
          </div>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
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
        <h2 className="doc-h2">{t.sections.states}</h2>
        <p className="doc-note">{t.notes.states}</p>
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
        <h2 className="doc-h2">{t.sections.bounds}</h2>
        <p className="doc-note">{t.notes.bounds}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 16 }}>
            <DatePicker
              minDate={daysFromToday(-3)}
              maxDate={daysFromToday(10)}
              placeholder="±3 to +10"
              aria-label="Bounded date"
            />
            <DatePicker
              disabledDate={isWeekend}
              placeholder="No weekend"
              aria-label="No weekends"
            />
          </div>
        </div>
      </section>

      {/* === Format ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.format}</h2>
        <p className="doc-note">{t.notes.format}</p>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
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
        <h2 className="doc-h2">{t.sections.inForm}</h2>
        <p className="doc-note">{t.notes.inForm}</p>
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
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>Date | null</code></td>
              <td>—</td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>Date | null</code></td>
              <td>—</td>
              <td>{t.api.rows.defaultValue?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>{'(date: Date | null) => void'}</code></td>
              <td>—</td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>minDate</code></td>
              <td><code>Date</code></td>
              <td>—</td>
              <td>{t.api.rows.minDate?.description}</td>
            </tr>
            <tr>
              <td><code>maxDate</code></td>
              <td><code>Date</code></td>
              <td>—</td>
              <td>{t.api.rows.maxDate?.description}</td>
            </tr>
            <tr>
              <td><code>disabledDate</code></td>
              <td><code>{'(date: Date) => boolean'}</code></td>
              <td>—</td>
              <td>{t.api.rows.disabledDate?.description}</td>
            </tr>
            <tr>
              <td><code>format</code></td>
              <td><code>string</code></td>
              <td><code>'YYYY-MM-DD'</code></td>
              <td>{t.api.rows.format?.description}</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td><code>'选择日期'</code></td>
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
              <td><code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.readOnly?.description}</td>
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
              <td><code>clearable</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.clearable?.description}</td>
            </tr>
            <tr>
              <td><code>weekStartsOn</code></td>
              <td><code>0 | 1</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.weekStartsOn?.description}</td>
            </tr>
            <tr>
              <td><code>locale</code></td>
              <td><code>CalendarLocale</code></td>
              <td>zh-CN</td>
              <td>{t.api.rows.locale?.description}</td>
            </tr>
            <tr>
              <td><code>showToday</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>{t.api.rows.showToday?.description}</td>
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
