'use client';

import { useRef, useState } from 'react';
import { Button, Dropdown, type DropdownMenuEntry } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function DropdownDocPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>('—');
  // External toggle button that drives the controlled Dropdown. We
  // pass its ref into `clickOutsideIgnore` so the menu's document-
  // level click-outside handler doesn't close + reopen on the same
  // gesture.
  const outsideToggleRef = useRef<HTMLButtonElement>(null);

  const basicMenu: DropdownMenuEntry[] = [
    { key: 'edit', label: 'Edit', onClick: () => setLastAction('Edit') },
    {
      key: 'duplicate',
      label: 'Duplicate',
      onClick: () => setLastAction('Duplicate'),
    },
    {
      key: 'archive',
      label: 'Archive',
      onClick: () => setLastAction('Archive'),
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => setLastAction('Delete'),
    },
  ];

  const iconMenu: DropdownMenuEntry[] = [
    {
      key: 'new',
      label: 'New note',
      icon: <span>📝</span>,
      extra: <span>⌘N</span>,
      onClick: () => setLastAction('New note'),
    },
    {
      key: 'open',
      label: 'Open…',
      icon: <span>📂</span>,
      extra: <span>⌘O</span>,
      onClick: () => setLastAction('Open'),
    },
    {
      key: 'share',
      label: 'Share link',
      icon: <span>🔗</span>,
      extra: <span>⌘⇧L</span>,
      onClick: () => setLastAction('Share'),
    },
    { type: 'divider', key: 'd1' },
    {
      key: 'delete',
      label: 'Move to trash',
      icon: <span>🗑</span>,
      danger: true,
      onClick: () => setLastAction('Move to trash'),
    },
  ];

  const dividerMenu: DropdownMenuEntry[] = [
    { key: 'cut', label: 'Cut', extra: <span>⌘X</span> },
    { key: 'copy', label: 'Copy', extra: <span>⌘C</span> },
    { key: 'paste', label: 'Paste', extra: <span>⌘V</span> },
    { type: 'divider', key: 'd1' },
    { key: 'selectAll', label: 'Select all', extra: <span>⌘A</span> },
    { type: 'divider', key: 'd2' },
    { key: 'find', label: 'Find…', extra: <span>⌘F</span> },
    { key: 'replace', label: 'Replace…', disabled: true },
  ];

  const disabledMenu: DropdownMenuEntry[] = [
    { key: 'publish', label: 'Publish draft' },
    {
      key: 'unpublish',
      label: 'Unpublish',
      disabled: true,
    },
    {
      key: 'schedule',
      label: 'Schedule…',
      disabled: true,
    },
    { type: 'divider', key: 'd1' },
    { key: 'preview', label: 'Preview in new tab' },
  ];

  const controlledMenu: DropdownMenuEntry[] = [
    {
      key: 'profile',
      label: 'Your profile',
      onClick: () => setLastAction('Profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => setLastAction('Settings'),
    },
    { type: 'divider', key: 'd1' },
    {
      key: 'signout',
      label: 'Sign out',
      danger: true,
      onClick: () => setLastAction('Sign out'),
    },
  ];

  return (
    <article className="doc">
      <h1 className="doc-title">Dropdown</h1>
      <p className="doc-lede">
        A trigger-driven menu that reuses <code>Popover</code>'s
        floating-surface vocabulary (portal, auto-flip, click-outside)
        but swaps the semantics to <code>role="menu"</code> +{' '}
        <code>role="menuitem"</code>, with roving <code>tabindex</code>{' '}
        keyboard navigation. Think "lightweight context menu", not
        "combobox": the trigger is any React element, the children are
        menu entries, and selection does not persist.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Click the trigger to open the menu. Click outside, press{' '}
          <kbd>Esc</kbd>, or pick an entry to close.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown menu={basicMenu}>
              <Button>Actions ▾</Button>
            </Dropdown>
            <Dropdown menu={basicMenu}>
              <Button variant="primary">Primary trigger ▾</Button>
            </Dropdown>
          </div>
          <p className="doc-note">
            Last action: <code>{lastAction}</code>
          </p>
        </div>
      </section>

      {/* === With icons ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">With icons &amp; shortcuts</h2>
        <p className="doc-note">
          Items accept <code>icon</code> (left slot) and{' '}
          <code>extra</code> (right slot). <code>extra</code> is
          typically a keyboard shortcut hint rendered in a monospaced
          muted style.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown menu={iconMenu}>
              <Button>File ▾</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* === Hover trigger =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Hover trigger</h2>
        <p className="doc-note">
          With <code>trigger="hover"</code> the menu opens on hover (with
          a small 100ms delay) and closes shortly after the cursor
          leaves. The surface gets a grace period so the user can drift
          from the trigger onto the menu without it slamming shut —
          mirrors the Popover convention.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown menu={basicMenu} trigger="hover">
              <Button>Hover me ▾</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* === Context menu =================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Context menu</h2>
        <p className="doc-note">
          With <code>trigger="contextMenu"</code>, right-click (or
          Ctrl-click on macOS) on the target to open the menu. The menu
          anchors at the pointer location instead of the trigger's
          bounding rect, matching native OS behavior.
        </p>
        <div className="doc-demo">
          <Dropdown menu={dividerMenu} trigger="contextMenu">
            <div
              style={{
                padding: 'var(--su-space-5)',
                background: 'var(--su-note-yellow)',
                border: '2px dashed var(--su-ink-primary)',
                borderRadius: 'var(--su-radius-card)',
                textAlign: 'center',
                userSelect: 'none',
                cursor: 'context-menu',
              }}
            >
              Right-click anywhere inside this sticky note.
            </div>
          </Dropdown>
        </div>
      </section>

      {/* === Placement ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Placement</h2>
        <p className="doc-note">
          Eight placements are supported. <code>-start</code> and{' '}
          <code>-end</code> variants align the menu's corner with the
          trigger's corner; the plain axis value centers it. Auto-flips
          when the preferred side would overflow.
        </p>
        <div className="doc-demo">
          <div
            className="doc-demo-row"
            style={{
              gap: 'var(--su-space-3)',
              flexWrap: 'wrap',
              padding: 'var(--su-space-5) 0',
            }}
          >
            <Dropdown menu={basicMenu} placement="bottom-start">
              <Button>bottom-start</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="bottom">
              <Button>bottom</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="bottom-end">
              <Button>bottom-end</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="top-start">
              <Button>top-start</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="top">
              <Button>top</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="top-end">
              <Button>top-end</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="right-start">
              <Button>right-start</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="left-start">
              <Button>left-start</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* === Dividers ======================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Dividers</h2>
        <p className="doc-note">
          Insert <code>{'{ type: "divider", key: "..." }'}</code> entries
          anywhere in the <code>menu</code> array to break groups apart.
          Dividers are rendered as <code>role="separator"</code> and
          skipped by keyboard navigation.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown menu={dividerMenu}>
              <Button>Edit ▾</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* === Disabled items ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Disabled items</h2>
        <p className="doc-note">
          Items marked <code>disabled</code> stay visible (so users know
          what's unavailable) but are skipped by keyboard navigation and
          ignore clicks. Accessibility state is carried by{' '}
          <code>aria-disabled</code>.
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown menu={disabledMenu}>
              <Button>Publish ▾</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* === Controlled ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Drive the open state from outside via <code>open</code> +{' '}
          <code>onOpenChange</code>. Useful for opening a menu from a
          keyboard shortcut or closing it programmatically after a
          confirm flow.
        </p>
        <p className="doc-note">
          Note: The outer toggle button sits outside the trigger and
          menu, so a naive <code>onClick</code> would race with the
          menu's click-outside handler (which fires on{' '}
          <code>mousedown</code> capture and would close first, then
          the click would re-open). Pass the toggle's ref via{' '}
          <code>clickOutsideIgnore</code> and Dropdown will skip it
          when deciding whether a pointer-down is "outside".
        </p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Dropdown
              menu={controlledMenu}
              open={controlledOpen}
              onOpenChange={setControlledOpen}
              clickOutsideIgnore={[outsideToggleRef]}
            >
              <Button>Account ▾</Button>
            </Dropdown>
            <Button
              ref={outsideToggleRef}
              variant="primary"
              onClick={() => setControlledOpen((v) => !v)}
            >
              {controlledOpen ? 'Close' : 'Open'} from outside
            </Button>
          </div>
          <p className="doc-note">
            Open: <code>{controlledOpen ? 'true' : 'false'}</code>
          </p>
        </div>
      </section>

      {/* === Code =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import { Button, Dropdown, type DropdownMenuEntry } from 'scribble-ui';

const menu: DropdownMenuEntry[] = [
  { key: 'edit', label: 'Edit', onClick: () => edit() },
  { key: 'duplicate', label: 'Duplicate', icon: <Copy />, extra: '⌘D' },
  { type: 'divider', key: 'd1' },
  { key: 'delete', label: 'Delete', danger: true, onClick: () => remove() },
];

// Default: click to open, Esc / click-outside to close.
<Dropdown menu={menu}>
  <Button>Actions ▾</Button>
</Dropdown>

// Hover trigger with grace period.
<Dropdown menu={menu} trigger="hover" placement="bottom-end">
  <Button>Quick</Button>
</Dropdown>

// Native-style right-click menu anchored to the pointer.
<Dropdown menu={menu} trigger="contextMenu">
  <div className="canvas">Right-click here</div>
</Dropdown>

// Controlled.
const [open, setOpen] = useState(false);
<Dropdown menu={menu} open={open} onOpenChange={setOpen}>
  <Button>Account</Button>
</Dropdown>`}</code>
        </pre>
      </section>

      {/* === API ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">API</h2>

        <h3 style={{ margin: '8px 0 4px' }}>
          <code>DropdownProps</code>
        </h3>
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
              <td>
                <code>menu</code>
              </td>
              <td>
                <code>DropdownMenuEntry[]</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Required. Array of menu items and dividers, rendered in
                order.
              </td>
            </tr>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>
                <code>ReactElement</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Required. A single React element that will receive the
                injected <code>ref</code>, event handlers and ARIA
                attributes via <code>cloneElement</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>trigger</code>
              </td>
              <td>
                <code>'click' | 'hover' | 'contextMenu'</code>
              </td>
              <td>
                <code>'click'</code>
              </td>
              <td>
                Interaction that opens the menu. <code>contextMenu</code>{' '}
                suppresses the native right-click menu and anchors the
                surface at the pointer.
              </td>
            </tr>
            <tr>
              <td>
                <code>placement</code>
              </td>
              <td>
                <code>
                  'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' |
                  'top' | 'top-end' | 'right-start' | 'left-start'
                </code>
              </td>
              <td>
                <code>'bottom-start'</code>
              </td>
              <td>
                Preferred placement. Auto-flips to the opposite axis on
                overflow.
              </td>
            </tr>
            <tr>
              <td>
                <code>offset</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>8</code>
              </td>
              <td>Pixel gap between the trigger and the menu surface.</td>
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
              <td>
                When true, the trigger still renders but no interaction
                opens the menu.
              </td>
            </tr>
            <tr>
              <td>
                <code>open</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Controlled open state. Pair with <code>onOpenChange</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>defaultOpen</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Initial open state in uncontrolled mode.</td>
            </tr>
            <tr>
              <td>
                <code>onOpenChange</code>
              </td>
              <td>
                <code>(open: boolean) =&gt; void</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Fires for every attempted open/close.</td>
            </tr>
            <tr>
              <td>
                <code>container</code>
              </td>
              <td>
                <code>HTMLElement | null</code>
              </td>
              <td>
                <code>document.body</code>
              </td>
              <td>Portal container for the menu surface.</td>
            </tr>
            <tr>
              <td>
                <code>menuClassName</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Extra class names on the menu root.</td>
            </tr>
            <tr>
              <td>
                <code>menuStyle</code>
              </td>
              <td>
                <code>CSSProperties</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Inline style merged onto the menu root (positioning keys
                — <code>top</code> / <code>left</code> /{' '}
                <code>position</code> — are always overridden by the
                computed layout).
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ margin: '16px 0 4px' }}>
          <code>DropdownMenuItem</code>
        </h3>
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
              <td>
                <code>key</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Required. Stable identity for React + focus tracking.</td>
            </tr>
            <tr>
              <td>
                <code>label</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Required. Primary text / node rendered in the center slot.</td>
            </tr>
            <tr>
              <td>
                <code>icon</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Optional left-side icon slot.</td>
            </tr>
            <tr>
              <td>
                <code>extra</code>
              </td>
              <td>
                <code>ReactNode</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Optional right-side slot, typically a shortcut hint or
                badge.
              </td>
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
              <td>
                Non-activatable; skipped by keyboard navigation. Still
                visible so users know the action exists.
              </td>
            </tr>
            <tr>
              <td>
                <code>danger</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>
                Tint the item red to mark a destructive action (delete,
                sign out, etc).
              </td>
            </tr>
            <tr>
              <td>
                <code>onClick</code>
              </td>
              <td>
                <code>(e) =&gt; void</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>
                Activation handler. The menu closes automatically after
                the callback unless you call{' '}
                <code>event.preventDefault()</code>.
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ margin: '16px 0 4px' }}>
          <code>DropdownMenuDivider</code>
        </h3>
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
              <td>
                <code>type</code>
              </td>
              <td>
                <code>'divider'</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Required discriminator — marks the entry as a divider.</td>
            </tr>
            <tr>
              <td>
                <code>key</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>—</code>
              </td>
              <td>Required. Stable identity for React.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === Accessibility ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Accessibility</h2>
        <p className="doc-note">
          The surface is rendered with <code>role="menu"</code>, each
          item with <code>role="menuitem"</code>, and dividers with{' '}
          <code>role="separator"</code>. The trigger receives{' '}
          <code>aria-haspopup="menu"</code>, <code>aria-expanded</code>{' '}
          and (when open) <code>aria-controls</code>. Disabled items
          carry <code>aria-disabled</code> rather than the native{' '}
          <code>disabled</code> attribute so they stay keyboard-
          discoverable, matching the WAI-ARIA Menu pattern.
        </p>
        <p className="doc-note">
          Keyboard navigation uses roving <code>tabindex</code>: only the
          highlighted item has <code>tabindex=0</code>, the rest are{' '}
          <code>-1</code>. <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd>{' '}
          move with wrap and skip disabled entries;{' '}
          <kbd>Home</kbd> / <kbd>End</kbd> jump to the ends;{' '}
          <kbd>Enter</kbd> / <kbd>Space</kbd> activate;{' '}
          <kbd>Escape</kbd> closes and returns focus to the trigger;{' '}
          <kbd>Tab</kbd> closes and lets focus flow naturally — a menu
          is <em>not</em> a focus trap.
        </p>
      </section>
    </article>
  );
}
