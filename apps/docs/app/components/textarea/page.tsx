'use client';

import { useState } from 'react';
import { Textarea } from 'scribble-ui';

export default function TextareaDocPage() {
  // Controlled basic demo
  const [bio, setBio] = useState('Sketching on paper since forever.');

  // Counter demo
  const [tweet, setTweet] = useState(
    'Hand-drawn UIs feel friendlier than pixel-perfect ones.'
  );

  return (
    <article className="doc">
      <h1 className="doc-title">Textarea</h1>
      <p className="doc-lede">
        A multi-line text input that shares Input's hand-drawn frame.
        Supports controlled/uncontrolled use, three sizes, error states,
        a built-in character counter and content-aware auto-resize.
      </p>

      {/* === Basic ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Both controlled and uncontrolled patterns work. The wrapper draws
          the wobble; the native handle in the bottom-right corner still
          lets users drag the textarea taller.
        </p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            placeholder="Tell us something… (uncontrolled)"
            defaultValue=""
          />
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Controlled bio"
          />
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo doc-demo--column">
          <Textarea size="sm" placeholder="Small — 64px tall, body-small font" />
          <Textarea size="md" placeholder="Medium — default, body font" />
          <Textarea size="lg" placeholder="Large — 128px tall, h3 font" />
        </div>
      </section>

      {/* === States ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">States</h2>
        <div className="doc-demo doc-demo--column">
          <Textarea
            disabled
            defaultValue="Disabled — the wobble drops and pointer events stop."
          />
          <Textarea
            readOnly
            defaultValue="Read-only — selectable but not editable."
          />
          <Textarea
            error
            helperText="Description must be at least 20 characters."
            defaultValue="Too short."
          />
        </div>
      </section>

      {/* === Auto resize ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Auto resize</h2>
        <p className="doc-note">
          Pass <code>autoResize</code> to grow with the content. Provide{' '}
          <code>{'{ minRows, maxRows }'}</code> to clamp the range — past{' '}
          <code>maxRows</code> the textarea scrolls instead of growing.
          The native drag handle is hidden in this mode.
        </p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            autoResize
            placeholder="autoResize — try pasting a long paragraph here."
          />
          <Textarea
            autoResize={{ minRows: 2, maxRows: 6 }}
            placeholder="autoResize between 2 and 6 rows"
          />
        </div>
      </section>

      {/* === Character count ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Character count</h2>
        <p className="doc-note">
          With <code>showCount</code> + <code>maxLength</code>, the counter
          turns warning at 80% and danger at 100%. Type past the limit to
          see the danger color (the native <code>maxLength</code> already
          truncates input, but the counter still tracks the underlying
          state).
        </p>
        <div className="doc-demo doc-demo--column">
          <Textarea
            showCount
            placeholder="Free-form note (no max)"
          />
          <Textarea
            showCount
            maxLength={140}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's on your mind?"
          />
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Textarea } from 'scribble-ui';

export function Example() {
  const [value, setValue] = useState('');

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell us something…"
      />

      <Textarea
        autoResize={{ minRows: 2, maxRows: 6 }}
        placeholder="Grows with content"
      />

      <Textarea
        showCount
        maxLength={140}
        error={value.length > 140}
        helperText={value.length > 140 ? 'Too long.' : undefined}
      />
    </>
  );
}`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
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
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Visual size. Does not map to any native attribute.</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Renders the wrapper with the danger color and tints{' '}
                <code>helperText</code> red. Also sets{' '}
                <code>aria-invalid</code> on the underlying textarea.
              </td>
            </tr>
            <tr>
              <td><code>helperText</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Sub-line shown beneath the textarea.</td>
            </tr>
            <tr>
              <td><code>autoResize</code></td>
              <td>
                <code>boolean | {'{ minRows?: number; maxRows?: number }'}</code>
              </td>
              <td><code>—</code></td>
              <td>
                Grow with content. Object form clamps the range; past{' '}
                <code>maxRows</code> the textarea scrolls. Disables the
                native resize handle when set.
              </td>
            </tr>
            <tr>
              <td><code>showCount</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render a counter in the bottom-right corner. With{' '}
                <code>maxLength</code>, the counter renders as{' '}
                <code>current / max</code> and turns warning at 80%, danger
                past 100%.
              </td>
            </tr>
            <tr>
              <td><code>value</code> / <code>defaultValue</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Standard controlled / uncontrolled bridge. Pair{' '}
                <code>value</code> with <code>onChange</code>.
              </td>
            </tr>
            <tr>
              <td><code>maxLength</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>
                Native max length. Truncates input and feeds the counter's
                color thresholds.
              </td>
            </tr>
            <tr>
              <td><code>disabled</code> / <code>readOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Standard inert / read-only states. Disabled drops the
                wobble and locks the resize handle.
              </td>
            </tr>
            <tr>
              <td><code>wrapperClassName</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Extra class on the outer wrapper (the element that draws
                the border).
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class on the underlying <code>&lt;textarea&gt;</code>.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The component forwards a ref to the underlying{' '}
          <code>HTMLTextAreaElement</code> and accepts every native
          textarea attribute (<code>rows</code>, <code>name</code>,{' '}
          <code>aria-*</code>, <code>data-*</code>, etc.).
        </p>
      </section>
    </article>
  );
}
