'use client';

import { Avatar } from 'scribble-ui';
import '../button/page.css';

/**
 * A tiny inline icon used in the custom-fallback demo. Keeps the docs
 * site dependency-free.
 */
function RobotIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="60%"
      height="60%"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="5"
        y="7"
        width="14"
        height="11"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 4v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="3.5" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <path
        d="M9.5 15.5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AvatarDocPage() {
  return (
    <article className="doc">
      <h1 className="doc-title">Avatar</h1>
      <p className="doc-lede">
        A small hand-drawn portrait tile. Renders an image when{' '}
        <code>src</code> succeeds, gracefully falls back to a custom node,
        derived initials, or a generic placeholder. Background colors come
        from the same sticky-note palette as Tag.
      </p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar size="xs" name="Ada Lovelace" />
            <Avatar size="sm" name="Ada Lovelace" />
            <Avatar size="md" name="Ada Lovelace" />
            <Avatar size="lg" name="Ada Lovelace" />
            <Avatar size="xl" name="Ada Lovelace" />
          </div>
          <p className="doc-note">
            xs · 24 · sm · 32 · md · 40 · lg · 56 · xl · 72 (px). The font
            size scales with the tile so two-letter initials always fit.
          </p>
        </div>
      </section>

      {/* === Shapes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Shapes</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar shape="circle" size="lg" name="Grace Hopper" />
            <Avatar shape="square" size="lg" name="Grace Hopper" />
            <Avatar
              shape="circle"
              size="lg"
              name="Linus Torvalds"
              color="blue"
            />
            <Avatar
              shape="square"
              size="lg"
              name="Linus Torvalds"
              color="blue"
            />
          </div>
          <p className="doc-note">
            Square avatars use the asymmetric <code>--su-radius-card</code>{' '}
            so they keep the hand-drawn off-axis feel.
          </p>
        </div>
      </section>

      {/* === Sticky-note palette =============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Colors</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar size="lg" color="yellow" initials="Y" />
            <Avatar size="lg" color="orange" initials="O" />
            <Avatar size="lg" color="pink" initials="P" />
            <Avatar size="lg" color="blue" initials="B" />
            <Avatar size="lg" color="mint" initials="M" />
            <Avatar size="lg" color="purple" initials="U" />
            <Avatar size="lg" color="green" initials="G" />
          </div>
          <p className="doc-note">
            Pass <code>color</code> to pin a hue, or omit it and let
            Avatar derive a stable color from <code>name</code>.
          </p>
        </div>
      </section>

      {/* === Image + fallback to initials ====================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Image with graceful fallback</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar
              size="lg"
              src="https://i.pravatar.cc/150?img=12"
              name="Ada Lovelace"
              alt="Ada Lovelace"
            />
            <Avatar
              size="lg"
              src="https://example.invalid/this-will-404.png"
              name="Ada Lovelace"
              alt="Ada Lovelace"
            />
            <Avatar
              size="lg"
              src="https://example.invalid/missing.png"
              name="Marie Curie"
              alt="Marie Curie"
              color="pink"
            />
          </div>
          <p className="doc-note">
            The first avatar loads a real image. The next two point at a
            domain that will never resolve — Avatar catches the{' '}
            <code>onError</code> and falls back to the initials of the
            provided <code>name</code>, keeping the layout stable.
          </p>
        </div>
      </section>

      {/* === Custom fallback node ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Custom fallback</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar size="lg" fallback={<RobotIcon />} color="mint" />
            <Avatar
              size="lg"
              src="https://example.invalid/also-404.png"
              fallback={<RobotIcon />}
              color="purple"
              alt="Bot user"
            />
            <Avatar size="lg" />
          </div>
          <p className="doc-note">
            Pass any <code>ReactNode</code> to <code>fallback</code> for
            iconographic avatars (bots, anonymous users, …). The third
            tile shows the built-in placeholder when no source at all is
            given.
          </p>
        </div>
      </section>

      {/* === Auto-derived initials + color ==================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Auto-derived initials &amp; color</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar size="lg" name="Ada Lovelace" />
            <Avatar size="lg" name="Grace Hopper" />
            <Avatar size="lg" name="Linus Torvalds" />
            <Avatar size="lg" name="Marie Curie" />
            <Avatar size="lg" name="Alan Turing" />
            <Avatar size="lg" name="Donald Knuth" />
            <Avatar size="lg" name="Barbara Liskov" />
          </div>
          <p className="doc-note">
            With only a <code>name</code>, Avatar takes the first letter of
            the first two words and picks a sticky-note color via a
            stable <code>charCodeAt</code> hash — the same name always
            renders the same hue.
          </p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Avatar } from 'scribble-ui';

// Image with automatic fallback to derived initials.
<Avatar
  src="https://example.com/me.jpg"
  name="Ada Lovelace"
  alt="Ada Lovelace"
/>

// Initials only — color derived from the name hash.
<Avatar name="Grace Hopper" />

// Pinned color + custom icon fallback.
<Avatar color="mint" fallback={<RobotIcon />} />

// Square shape, large size.
<Avatar shape="square" size="lg" name="Linus Torvalds" />`}</code>
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
              <td><code>src</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Image URL. On <code>onError</code> the avatar swaps to the
                fallback chain automatically.
              </td>
            </tr>
            <tr>
              <td><code>alt</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Accessible label and a fallback source for derived
                initials. The wrapper carries the label so screen readers
                announce it once.
              </td>
            </tr>
            <tr>
              <td><code>initials</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Explicit initial letters. Capped at 2 characters and
                uppercased.
              </td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Source for auto-derived initials and the stable color
                hash. Same name → same color, every render.
              </td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Custom fallback node (icon, etc.). Wins over initials when
                the image is absent or fails.
              </td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
              <td><code>'md'</code></td>
              <td>Tile size: 24 / 32 / 40 / 56 / 72 px.</td>
            </tr>
            <tr>
              <td><code>shape</code></td>
              <td><code>'circle' | 'square'</code></td>
              <td><code>'circle'</code></td>
              <td>
                <code>'square'</code> uses the asymmetric{' '}
                <code>--su-radius-card</code>.
              </td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>
                <code>
                  'yellow' | 'orange' | 'pink' | 'blue' | 'mint' | 'purple' | 'green'
                </code>
              </td>
              <td><code>—</code></td>
              <td>
                Sticky-note background tint. When omitted, derived from{' '}
                <code>name</code> via a stable hash.
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
          Forwards a ref to the underlying <code>HTMLSpanElement</code>{' '}
          and accepts every native span attribute (
          <code>aria-*</code>, <code>data-*</code>, <code>onClick</code>, …).
        </p>
      </section>
    </article>
  );
}
