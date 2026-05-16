'use client';

import { useState } from 'react';
import { Badge, Button } from 'scribble-ui';

/**
 * Tiny visual stand-in for an Avatar — the docs site stays
 * dependency-free and `<Avatar />` is not implemented yet, so we
 * inline a circular paper chip here just for the wrapper demos.
 */
function FakeAvatar({ label }: { label: string }) {
  return (
    <span
      aria-label={`Avatar ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--su-note-blue)',
        border: 'var(--su-stroke-default) solid var(--su-ink-primary)',
        boxShadow: 'var(--su-shadow-xs)',
        fontFamily: 'var(--su-font-family-hand)',
        fontWeight: 700,
        color: 'var(--su-ink-primary)',
        filter: 'url(#su-hand-c)',
      }}
    >
      {label}
    </span>
  );
}

export default function BadgeDocPage() {
  const [count, setCount] = useState(3);

  return (
    <article className="doc">
      <h1 className="doc-title">Badge</h1>
      <p className="doc-lede">
        A tiny hand-drawn count, dot or label. Use it standalone, or
        wrap any element to attach the badge to its corner — perfect
        for unread counts on avatars, buttons or icons.
      </p>

      {/* === Standalone: count / dot / content =============== */}
      <section className="doc-section">
        <h2 className="doc-h2">Standalone</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Badge count={5} />
            <Badge count={99} />
            <Badge count={100} />
            <Badge count={9999} max={999} />
            <Badge dot />
            <Badge content="NEW" color="brand" />
            <Badge content="BETA" color="info" />
          </div>
          <p className="doc-note">
            Priority order when multiple content props are passed:
            <code> dot &gt; count &gt; content</code>. Counts above
            <code> max</code> render as <code>{`${'{'}max${'}'}`}+</code>.
          </p>
        </div>
      </section>

      {/* === Wrapper around an Avatar ======================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Wrapping an avatar</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Badge count={3}>
              <FakeAvatar label="QZ" />
            </Badge>
            <Badge count={42}>
              <FakeAvatar label="AB" />
            </Badge>
            <Badge count={120}>
              <FakeAvatar label="JD" />
            </Badge>
            <Badge dot color="success">
              <FakeAvatar label="ON" />
            </Badge>
          </div>
        </div>
      </section>

      {/* === Wrapper around a Button ========================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Wrapping a button</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Badge dot color="danger">
              <Button>Inbox</Button>
            </Badge>
            <Badge count={7} color="danger">
              <Button variant="primary">Messages</Button>
            </Badge>
            <Badge content="NEW" color="brand">
              <Button>Updates</Button>
            </Badge>
          </div>
        </div>
      </section>

      {/* === Colors × dot ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Colors</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Badge dot color="default" />
            <Badge dot color="brand" />
            <Badge dot color="success" />
            <Badge dot color="warning" />
            <Badge dot color="danger" />
            <Badge dot color="info" />
          </div>
          <div className="doc-demo-row">
            <Badge count={1} color="default" />
            <Badge count={2} color="brand" />
            <Badge count={3} color="success" />
            <Badge count={4} color="warning" />
            <Badge count={5} color="danger" />
            <Badge count={6} color="info" />
          </div>
        </div>
      </section>

      {/* === Placement ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Placement</h2>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ gap: 32 }}>
            <Badge count={9} placement="top-right">
              <FakeAvatar label="TR" />
            </Badge>
            <Badge count={9} placement="top-left">
              <FakeAvatar label="TL" />
            </Badge>
            <Badge count={9} placement="bottom-right">
              <FakeAvatar label="BR" />
            </Badge>
            <Badge count={9} placement="bottom-left">
              <FakeAvatar label="BL" />
            </Badge>
          </div>
          <p className="doc-note">
            The badge floats on the chosen corner via{' '}
            <code>translate(±50%, ±50%)</code> so it overlaps the
            anchor's outline by half its own size.
          </p>
        </div>
      </section>

      {/* === Zero & showZero ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Zero handling &amp; controlled count</h2>
        <div className="doc-demo doc-demo--column">
          <div className="doc-demo-row">
            <Badge count={0}>
              <FakeAvatar label="∅" />
            </Badge>
            <Badge count={0} showZero>
              <FakeAvatar label="0" />
            </Badge>
            <span className="doc-note">
              Left: <code>count=0</code> hides the badge. Right:{' '}
              <code>showZero</code> keeps it visible.
            </span>
          </div>
          <div className="doc-demo-row">
            <Badge count={count} color="danger">
              <FakeAvatar label="QZ" />
            </Badge>
            <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
            <Button onClick={() => setCount((c) => Math.max(0, c - 1))}>
              −1
            </Button>
            <Button onClick={() => setCount(0)} variant="default">
              Reset
            </Button>
          </div>
          <p className="doc-note">
            Click the buttons — when count drops to <code>0</code> the
            badge disappears (children stay).
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Badge } from 'scribble-ui';

// Standalone
<Badge count={5} />
<Badge dot color="success" />
<Badge content="NEW" color="brand" />

// Wrapper — attaches to a corner of children
<Badge count={9}>
  <Avatar src="…" />
</Badge>

<Badge dot color="success" placement="bottom-right">
  <Button>Inbox</Button>
</Badge>

// Cap large counts and keep zero hidden by default
<Badge count={1234} max={99} />   // renders "99+"
<Badge count={0} />               // renders nothing
<Badge count={0} showZero />      // renders "0"`}</code>
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
              <td><code>count</code></td>
              <td><code>number</code></td>
              <td><code>—</code></td>
              <td>
                Numeric badge. Hidden when <code>0</code> unless{' '}
                <code>showZero</code> is true.
              </td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>99</code></td>
              <td>
                Cap for the displayed count. Values above the cap
                render as <code>{`${'{'}max${'}'}`}+</code>.
              </td>
            </tr>
            <tr>
              <td><code>showZero</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Render the badge even when <code>count === 0</code>.</td>
            </tr>
            <tr>
              <td><code>dot</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Render a small filled dot with no text. Wins over
                <code> count</code> and <code>content</code>.
              </td>
            </tr>
            <tr>
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Custom content (e.g. <code>"NEW"</code>) shown when
                <code> dot</code> and <code>count</code> are both
                absent.
              </td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>
                <code>
                  'default' | 'brand' | 'success' | 'warning' |
                  'danger' | 'info'
                </code>
              </td>
              <td><code>'danger'</code></td>
              <td>Background tint. Defaults to red — the canonical notification look.</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>
                <code>
                  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
                </code>
              </td>
              <td><code>'top-right'</code></td>
              <td>Corner of the wrapped element the badge attaches to. Ignored without children.</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                When provided, the badge floats on the chosen corner
                of <code>children</code>; otherwise it renders inline
                on its own.
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the outer element.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
