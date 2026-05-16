'use client';

import { useState } from 'react';
import { Slider } from 'scribble-ui';

export default function SliderDocPage() {
  // Single-value controlled demo (used in the "Controlled" section).
  const [volume, setVolume] = useState<number>(40);
  const [committedVolume, setCommittedVolume] = useState<number>(40);

  // Range demo with a price filter.
  const [price, setPrice] = useState<[number, number]>([20, 80]);

  return (
    <article className="doc">
      <h1 className="doc-title">Slider</h1>
      <p className="doc-lede">
        A hand-drawn slider with single-value and range modes. Built on{' '}
        <code>role="slider"</code> elements (not native{' '}
        <code>&lt;input type="range"&gt;</code>) so we can paint the rail,
        fill and thumbs with the shared SVG-filter wobble while keeping
        the WAI-ARIA Slider keyboard pattern intact.
      </p>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <p className="doc-note">
          Three sizes scale the thumb and rail thickness in lockstep so
          the thumb always looks centred on a line.
        </p>
        <div className="doc-demo doc-demo--column">
          <Slider size="sm" defaultValue={25} aria-label="Small slider" />
          <Slider size="md" defaultValue={50} aria-label="Medium slider" />
          <Slider size="lg" defaultValue={75} aria-label="Large slider" />
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <p className="doc-note">
          Disabled drops the wobble entirely (matching Button) and removes
          both thumbs from the tab order. Use{' '}
          <code>showTooltip="always"</code> when the value is the only
          on-screen feedback.
        </p>
        <div className="doc-demo doc-demo--column">
          <Slider defaultValue={30} aria-label="Default slider" />
          <Slider
            defaultValue={60}
            disabled
            aria-label="Disabled slider"
          />
          <Slider
            defaultValue={42}
            showTooltip="always"
            aria-label="Slider with permanent tooltip"
          />
        </div>
      </section>

      {/* === Range ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Range</h2>
        <p className="doc-note">
          Pass <code>range</code> to render two thumbs that can't cross.
          Press <kbd>Tab</kbd> to focus the active thumb, then arrow keys
          to nudge it; <kbd>Tab</kbd> again moves on — the inactive thumb
          is reachable via the pointer or by clicking near it.
        </p>
        <div className="doc-demo doc-demo--column">
          <Slider
            range
            defaultValue={[20, 80]}
            aria-label="Range slider"
          />
          <Slider
            range
            value={price}
            onChange={(next) => setPrice(next)}
            min={0}
            max={100}
            step={5}
            showTooltip="always"
            formatTooltip={(v) => `$${v}`}
            aria-label="Price filter"
          />
          <p className="doc-note">
            Current price filter: <code>${price[0]}</code> –{' '}
            <code>${price[1]}</code>
          </p>
        </div>
      </section>

      {/* === Marks ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Marks</h2>
        <p className="doc-note">
          Marks are decorative — they show where common values sit on the
          rail but they don't constrain the value (only <code>step</code>{' '}
          does). Pass labels for the ones the user should remember.
        </p>
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
        <h2 className="doc-h2">Vertical</h2>
        <p className="doc-note">
          <code>vertical</code> re-orients the layout (rather than rotating
          it) so hit-testing and keyboard semantics stay sensible:{' '}
          <kbd>↑</kbd> always increases the value, <kbd>↓</kbd> always
          decreases it.
        </p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{ alignItems: 'flex-end', gap: 48, height: 240 }}
          >
            <Slider
              vertical
              defaultValue={30}
              aria-label="Vertical slider"
            />
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
        <h2 className="doc-h2">Controlled with <code>onChangeCommitted</code></h2>
        <p className="doc-note">
          <code>onChange</code> fires continuously during interaction, so
          it's safe to bind to local state. <code>onChangeCommitted</code>{' '}
          fires once after the user releases the pointer or stops pressing
          arrow keys — perfect for sending the value to a server.
        </p>
        <div className="doc-demo doc-demo--column">
          <Slider
            value={volume}
            onChange={(next) => setVolume(next)}
            onChangeCommitted={(next) =>
              setCommittedVolume(next as number)
            }
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>range</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Switches the slider into dual-thumb mode. When true,{' '}
                <code>value</code> / <code>defaultValue</code> /{' '}
                <code>onChange</code> all use a{' '}
                <code>[number, number]</code> tuple.
              </td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>number | [number, number]</code></td>
              <td><code>—</code></td>
              <td>
                Controlled value. Pair with <code>onChange</code>. Type
                depends on <code>range</code>.
              </td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>number | [number, number]</code></td>
              <td><code>min</code> (or <code>[min, max]</code>)</td>
              <td>Uncontrolled initial value.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td>
                <code>(v: number | [number, number]) =&gt; void</code>
              </td>
              <td><code>—</code></td>
              <td>
                Fires continuously during pointer drag and keyboard
                input. Type follows <code>range</code>.
              </td>
            </tr>
            <tr>
              <td><code>onChangeCommitted</code></td>
              <td>
                <code>(v: number | [number, number]) =&gt; void</code>
              </td>
              <td><code>—</code></td>
              <td>
                Fires once after the user releases the pointer or stops
                pressing arrow keys. Use this to fire expensive side
                effects (network calls, etc.).
              </td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Inclusive lower bound.</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Inclusive upper bound.</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>
                Snap increment. Both pointer drag and keyboard arrow keys
                round the resulting value to a multiple of <code>step</code>.
              </td>
            </tr>
            <tr>
              <td><code>marks</code></td>
              <td>
                <code>{`Array<{ value: number; label?: ReactNode }>`}</code>
              </td>
              <td><code>—</code></td>
              <td>
                Decorative tick marks rendered on the rail. They don't
                constrain the value — only <code>step</code> does.
              </td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Disables all interaction. Drops the wobble entirely and
                removes both thumbs from the tab order.
              </td>
            </tr>
            <tr>
              <td><code>vertical</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render the slider vertically. Keyboard semantics are
                unchanged — <kbd>↑</kbd> always increases, <kbd>↓</kbd>{' '}
                always decreases.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset for the rail thickness, thumb and label font.</td>
            </tr>
            <tr>
              <td><code>showTooltip</code></td>
              <td><code>'always' | 'hover' | 'drag' | 'never'</code></td>
              <td><code>'drag'</code></td>
              <td>
                When the value tooltip is rendered next to the active
                thumb. <code>'drag'</code> shows it during pointer drag
                or keyboard input only.
              </td>
            </tr>
            <tr>
              <td><code>formatTooltip</code></td>
              <td><code>(value: number) =&gt; ReactNode</code></td>
              <td><code>String(value)</code></td>
              <td>Format the tooltip's value (currency, percentages, …).</td>
            </tr>
            <tr>
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Accessible label forwarded to the thumb. In range mode
                it's auto-suffixed with " — minimum" / " — maximum".
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the outer wrapper.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          Keyboard: <kbd>←</kbd>/<kbd>↓</kbd> decrement, <kbd>→</kbd>/
          <kbd>↑</kbd> increment by <code>step</code>;{' '}
          <kbd>Shift</kbd> + arrow multiplies by 10;{' '}
          <kbd>PageUp</kbd>/<kbd>PageDown</kbd> moves by 10% of the range;{' '}
          <kbd>Home</kbd>/<kbd>End</kbd> snap to <code>min</code> /{' '}
          <code>max</code>.
        </p>
      </section>
    </article>
  );
}
