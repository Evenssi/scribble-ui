'use client';

import { Avatar } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

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
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="3.5" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
      <path d="M9.5 15.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarDocClient({ t }: { t: ComponentDoc }) {
  return (
    <article className="doc">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Sizes ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.sizes}</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar size="xs" name="Ada Lovelace" />
            <Avatar size="sm" name="Ada Lovelace" />
            <Avatar size="md" name="Ada Lovelace" />
            <Avatar size="lg" name="Ada Lovelace" />
            <Avatar size="xl" name="Ada Lovelace" />
          </div>
          <p className="doc-note">{t.notes.sizes}</p>
        </div>
      </section>

      {/* === Shapes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.shapes}</h2>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Avatar shape="circle" size="lg" name="Grace Hopper" />
            <Avatar shape="square" size="lg" name="Grace Hopper" />
            <Avatar shape="circle" size="lg" name="Linus Torvalds" color="blue" />
            <Avatar shape="square" size="lg" name="Linus Torvalds" color="blue" />
          </div>
          <p className="doc-note">{t.notes.shapes}</p>
        </div>
      </section>

      {/* === Sticky-note palette =============================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.colors}</h2>
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
          <p className="doc-note">{t.notes.colors}</p>
        </div>
      </section>

      {/* === Image + fallback to initials ====================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.imageWithFallback}</h2>
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
          <p className="doc-note">{t.notes.imageWithFallback}</p>
        </div>
      </section>

      {/* === Custom fallback node ============================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.customFallback}</h2>
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
          <p className="doc-note">{t.notes.customFallback}</p>
        </div>
      </section>

      {/* === Auto-derived initials + color ==================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.autoDerived}</h2>
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
          <p className="doc-note">{t.notes.autoDerived}</p>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
              <td><code>src</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.src?.description}</td>
            </tr>
            <tr>
              <td><code>alt</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.alt?.description}</td>
            </tr>
            <tr>
              <td><code>initials</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.initials?.description}</td>
            </tr>
            <tr>
              <td><code>name</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.name?.description}</td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.fallback?.description}</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
              <td><code>'md'</code></td>
              <td>{t.api.rows.size?.description}</td>
            </tr>
            <tr>
              <td><code>shape</code></td>
              <td><code>'circle' | 'square'</code></td>
              <td><code>'circle'</code></td>
              <td>{t.api.rows.shape?.description}</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>
                <code>'yellow' | 'orange' | 'pink' | 'blue' | 'mint' | 'purple' | 'green'</code>
              </td>
              <td><code>—</code></td>
              <td>{t.api.rows.color?.description}</td>
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
