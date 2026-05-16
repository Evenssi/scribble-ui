'use client';

import { useState } from 'react';
import { Slider } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function SliderDocClient({ t }: { t: ComponentDoc }) {
  const [volume, setVolume] = useState<number>(40);
  const [committedVolume, setCommittedVolume] = useState<number>(40);
  const [price, setPrice] = useState<[number, number]>([20, 80]);

  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <p className="doc-note">{t.notes.sizes}</p>
        <div className="doc-demo doc-demo--column">
          <Slider size="sm" defaultValue={25} aria-label="Small slider" />
          <Slider size="md" defaultValue={50} aria-label="Medium slider" />
          <Slider size="lg" defaultValue={75} aria-label="Large slider" />
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.states}</h2>
        <p className="doc-note">{t.notes.states}</p>
        <div className="doc-demo doc-demo--column">
          <Slider defaultValue={30} aria-label="Default slider" />
          <Slider defaultValue={60} disabled aria-label="Disabled slider" />
          <Slider
            defaultValue={42}
            showTooltip="always"
            aria-label="Slider with permanent tooltip"
          />
        </div>
      </section>

      {/* === Range ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.range}</h2>
        <p className="doc-note">{t.notes.range}</p>
        <div className="doc-demo doc-demo--column">
          <Slider range defaultValue={[20, 80]} aria-label="Range slider" />
          <Slider
            range
            value={price}
            onChange={(next) => setPrice(next as [number, number])}
            min={0}
            max={100}
            step={5}
            showTooltip="always"
            formatTooltip={(v) => `$${v}`}
            aria-label="Price filter"
          />
          <p className="doc-note">
            {t.notes.rangePrice} <code>${price[0]}</code> –{' '}
            <code>${price[1]}</code>
          </p>
        </div>
      </section>

      {/* === Marks ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.marks}</h2>
        <p className="doc-note">{t.notes.marks}</p>
        <div className="doc-demo doc-demo--column">
          <Slider
            defaultValue={50}
            min={0}
            max={100}
            step={25}
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
            aria-label="Slider with marks"
          />
          <Slider
            range
            defaultValue={[2, 4]}
            min={1}
            max={5}
            step={1}
            marks={[
              { value: 1, label: 'XS' },
              { value: 2, label: 'S' },
              { value: 3, label: 'M' },
              { value: 4, label: 'L' },
              { value: 5, label: 'XL' },
            ]}
            aria-label="Size range"
          />
        </div>
      </section>

      {/* === Vertical ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.vertical}</h2>
        <p className="doc-note">{t.notes.vertical}</p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{ alignItems: 'flex-end', gap: 48, height: 240 }}
          >
            <Slider vertical defaultValue={30} aria-label="Vertical slider" />
            <Slider
              vertical
              defaultValue={70}
              showTooltip="always"
              aria-label="Vertical slider with tooltip"
            />
            <Slider
              vertical
              range
              defaultValue={[25, 75]}
              aria-label="Vertical range slider"
            />
          </div>
        </div>
      </section>

      {/* === Controlled ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
        <div className="doc-demo doc-demo--column">
          <Slider
            value={volume}
            onChange={(next) => setVolume(next as number)}
            onChangeCommitted={(next) => setCommittedVolume(next as number)}
            min={0}
            max={100}
            step={1}
            aria-label="Volume"
          />
          <p className="doc-note">
            Live: <code>{volume}</code> — committed:{' '}
            <code>{committedVolume}</code>
          </p>
          <div className="doc-demo-row">
            <button
              type="button"
              className="su-btn su-btn--default su-btn--sm"
              onClick={() => {
                const next = Math.max(0, volume - 10);
                setVolume(next);
                setCommittedVolume(next);
              }}
            >
              −10
            </button>
            <button
              type="button"
              className="su-btn su-btn--default su-btn--sm"
              onClick={() => {
                const next = Math.min(100, volume + 10);
                setVolume(next);
                setCommittedVolume(next);
              }}
            >
              +10
            </button>
          </div>
        </div>
      </section>

      {/* === Code =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Slider } from 'scribble-ui';

// Single-value, uncontrolled.
<Slider defaultValue={50} aria-label="Volume" />

// Controlled with a deferred commit handler.
const [volume, setVolume] = useState(40);
<Slider
  value={volume}
  onChange={setVolume}
  onChangeCommitted={(v) => save({ volume: v as number })}
  aria-label="Volume"
/>

// Range mode — value is a [number, number] tuple.
const [price, setPrice] = useState<[number, number]>([20, 80]);
<Slider
  range
  value={price}
  onChange={setPrice}
  min={0}
  max={100}
  step={5}
  showTooltip="always"
  formatTooltip={(v) => \`$\${v}\`}
/>

// Marks + custom step.
<Slider
  defaultValue={50}
  step={25}
  marks={[
    { value: 0,   label: '0%' },
    { value: 50,  label: '50%' },
    { value: 100, label: '100%' },
  ]}
/>

// Vertical layout — keyboard semantics stay the same (↑ increases).
<Slider vertical defaultValue={30} aria-label="Brightness" />`}</code>
        </pre>
      </section>

      {/* === API ============================================ */}
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
              <td><code>range</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.range?.description}</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>number | [number, number]</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.value?.description}</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>number | [number, number]</code></td>
              <td><code>min</code> (or <code>[min, max]</code>)</td>
              <td>{t.api.rows.defaultValue?.description}</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(v: number | [number, number]) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChange?.description}</td>
            </tr>
            <tr>
              <td><code>onChangeCommitted</code></td>
              <td><code>(v: number | [number, number]) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onChangeCommitted?.description}</td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>{t.api.rows.min?.description}</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>{t.api.rows.max?.description}</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>{t.api.rows.step?.description}</td>
            </tr>
            <tr>
              <td><code>marks</code></td>
              <td>
                <code>{`Array<{ value: number; label?: ReactNode }>`}</code>
              </td>
              <td><code>—</code></td>
              <td>{t.api.rows.marks?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>vertical</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.vertical?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>showTooltip</code></td>
              <td><code>'always' | 'hover' | 'drag' | 'never'</code></td>
              <td><code>'drag'</code></td>
              <td>{t.api.rows.showTooltip?.description}</td>
            </tr>
            <tr>
              <td><code>formatTooltip</code></td>
              <td><code>(value: number) =&gt; ReactNode</code></td>
              <td><code>String(value)</code></td>
              <td>{t.api.rows.formatTooltip?.description}</td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows['aria-label']?.description}</td>
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
