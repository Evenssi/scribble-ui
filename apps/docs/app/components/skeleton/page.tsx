'use client';

import { Skeleton } from 'scribble-ui';

export default function SkeletonDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Skeleton</h1>
      <p className="doc-lede">
        A calm placeholder block while real content loads. Skeletons{' '}
        <strong>do not</strong> wobble — a list of them must read as
        patient, not jittery. Pick <code>pulse</code>, <code>wave</code>,
        or <code>none</code> based on how busy the surrounding screen is.
      </p>

      {/* === Single-line text ================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Text · single line</h2>
        <div className="doc-demo doc-demo--column">
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton width={240} />
        </div>
      </section>

      {/* === Multi-line text ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Text · multi-line</h2>
        <p className="doc-note">
          When <code>lines</code> is greater than 1 the last line shrinks
          to 60% so it reads as a real paragraph end — unless you pin
          an explicit <code>width</code>.
        </p>
        <div className="doc-demo doc-demo--column">
          <Skeleton lines={3} />
          <Skeleton lines={5} />
        </div>
      </section>

      {/* === Rect ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Rect</h2>
        <div className="doc-demo doc-demo--column">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" height={120} />
          <Skeleton variant="rect" width={320} height={200} />
        </div>
      </section>

      {/* === Circle ========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Circle</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Skeleton variant="circle" width={32} />
            <Skeleton variant="circle" />
            <Skeleton variant="circle" width={64} />
          </div>
        </div>
      </section>

      {/* === Animation ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Animation</h2>
        <p className="doc-note">
          Three animation modes. <code>pulse</code> is the default and
          works well for short loads; <code>wave</code> reads better on
          larger blocks; <code>none</code> is the safe fallback for very
          dense layouts (and is forced on automatically when the user
          prefers reduced motion).
        </p>
        <div className="doc-demo doc-demo--column">
          <div>
            <p className="doc-note"><code>pulse</code></p>
            <Skeleton variant="rect" height={48} animation="pulse" />
          </div>
          <div>
            <p className="doc-note"><code>wave</code></p>
            <Skeleton variant="rect" height={48} animation="wave" />
          </div>
          <div>
            <p className="doc-note"><code>none</code></p>
            <Skeleton variant="rect" height={48} animation="none" />
          </div>
        </div>
      </section>

      {/* === Composite card skeleton ========================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Composite · card</h2>
        <p className="doc-note">
          Skeletons compose. Here a circle avatar, two text lines and a
          rect body together stand in for a content card.
        </p>
        <div className="doc-demo">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              width: 360,
              padding: 14,
              border: '2px solid var(--su-ink-primary)',
              borderRadius: 'var(--su-radius-card)',
              background: 'var(--su-bg-paper)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Skeleton variant="circle" width={48} animation="wave" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton width="60%" animation="wave" />
                <Skeleton width="40%" animation="wave" />
              </div>
            </div>
            <Skeleton variant="rect" height={140} animation="wave" />
            <Skeleton lines={2} animation="wave" />
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Skeleton } from 'scribble-ui';

// Single line of text.
<Skeleton width="60%" />

// Paragraph — last line auto-narrows to 60%.
<Skeleton lines={3} />

// Avatar.
<Skeleton variant="circle" width={48} />

// Block (image / hero).
<Skeleton variant="rect" height={200} animation="wave" />

// Card composite.
<div className="card">
  <Skeleton variant="circle" width={48} />
  <Skeleton width="60%" />
  <Skeleton variant="rect" height={140} />
  <Skeleton lines={2} />
</div>`}</code>
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
              <td><code>variant</code></td>
              <td><code>'text' | 'rect' | 'circle'</code></td>
              <td><code>'text'</code></td>
              <td>
                Shape preset. <code>circle</code> always renders with{' '}
                <code>border-radius: 50%</code>; pass equal{' '}
                <code>width</code> &amp; <code>height</code> for a true
                circle.
              </td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number | string</code></td>
              <td><code>—</code></td>
              <td>
                Numbers are treated as pixels; strings pass through
                (e.g. <code>'60%'</code>, <code>'12rem'</code>).
              </td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number | string</code></td>
              <td>
                <code>1em</code> · text<br />
                <code>80px</code> · rect<br />
                <code>40px</code> · circle
              </td>
              <td>Same units as <code>width</code>.</td>
            </tr>
            <tr>
              <td><code>lines</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>
                Text-only. When greater than 1 renders multiple stacked
                lines; the last one auto-narrows to 60% unless you pass
                an explicit <code>width</code>.
              </td>
            </tr>
            <tr>
              <td><code>radius</code></td>
              <td><code>number | string</code></td>
              <td><code>var(--su-radius-tag)</code></td>
              <td>
                Border radius override. Numbers are pixels.{' '}
                <code>circle</code> ignores this and stays at 50%.
              </td>
            </tr>
            <tr>
              <td><code>animation</code></td>
              <td><code>'pulse' | 'wave' | 'none'</code></td>
              <td><code>'pulse'</code></td>
              <td>
                Loading animation. Forced to <code>'none'</code> when
                the user prefers reduced motion.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>
        <p className="doc-note">
          The root element is a <code>&lt;span&gt;</code> with{' '}
          <code>role="status"</code>, <code>aria-busy="true"</code> and{' '}
          <code>aria-live="polite"</code>, so screen readers announce
          loading regions without spamming. Refs are forwarded to the
          underlying element.
        </p>
      </section>
    </article>
  );
}
