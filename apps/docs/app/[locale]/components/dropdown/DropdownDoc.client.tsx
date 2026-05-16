'use client';

import { useRef, useState } from 'react';
import { Button, Dropdown, type DropdownMenuEntry } from 'scribble-ui';

import type { DropdownDoc } from '../../../../i18n/dictionaries/zh-CN/components/dropdown';

/**
 * The shape of `dict.components.dropdown` is widened to `ComponentDoc` by
 * the `Dictionary` type, so the page-level server component passes the
 * raw object through and we re-narrow to the richer `DropdownDoc` here.
 */
export function DropdownDocClient({ t: tBase }: { t: unknown }) {
  const t = tBase as DropdownDoc;

  const [controlledOpen, setControlledOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>('—');
  // External toggle button that drives the controlled Dropdown.
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
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-lede">{t.lede}</p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.basic}</h2>
        <p className="doc-note">{t.notes.basic}</p>
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
            {t.notes.lastAction} <code>{lastAction}</code>
          </p>
        </div>
      </section>

      {/* === With icons ===================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.withIcons}</h2>
        <p className="doc-note">{t.notes.withIcons}</p>
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
        <h2 className="doc-h2">{t.sections.hoverTrigger}</h2>
        <p className="doc-note">{t.notes.hoverTrigger}</p>
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
        <h2 className="doc-h2">{t.sections.contextMenu}</h2>
        <p className="doc-note">{t.notes.contextMenu}</p>
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
        <h2 className="doc-h2">{t.sections.placement}</h2>
        <p className="doc-note">{t.notes.placement}</p>
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
        <h2 className="doc-h2">{t.sections.dividers}</h2>
        <p className="doc-note">{t.notes.dividers}</p>
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
        <h2 className="doc-h2">{t.sections.disabled}</h2>
        <p className="doc-note">{t.notes.disabled}</p>
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
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
        <p className="doc-note">{t.notes.controlledRef}</p>
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
            {t.notes.controlledOpen} <code>{controlledOpen ? 'true' : 'false'}</code>
          </p>
        </div>
      </section>

      {/* === Code =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
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
        <h2 className="doc-h2">{t.sections.api}</h2>

        <h3 style={{ margin: '8px 0 4px' }}>
          <code>{t.apiHeadings.props}</code>
        </h3>
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
              <td><code>menu</code></td>
              <td><code>DropdownMenuEntry[]</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.menu?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactElement</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td><code>'click' | 'hover' | 'contextMenu'</code></td>
              <td><code>'click'</code></td>
              <td>{t.api.rows.trigger?.description}</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td>
                <code>
                  'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' |
                  'top' | 'top-end' | 'right-start' | 'left-start'
                </code>
              </td>
              <td><code>'bottom-start'</code></td>
              <td>{t.api.rows.placement?.description}</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>8</code></td>
              <td>{t.api.rows.offset?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.open?.description}</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.defaultOpen?.description}</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>(open: boolean) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onOpenChange?.description}</td>
            </tr>
            <tr>
              <td><code>container</code></td>
              <td><code>HTMLElement | null</code></td>
              <td><code>document.body</code></td>
              <td>{t.api.rows.container?.description}</td>
            </tr>
            <tr>
              <td><code>menuClassName</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.menuClassName?.description}</td>
            </tr>
            <tr>
              <td><code>menuStyle</code></td>
              <td><code>CSSProperties</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.menuStyle?.description}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ margin: '16px 0 4px' }}>
          <code>{t.apiHeadings.menuItem}</code>
        </h3>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiMenuItem.headers.name}</th>
              <th>{t.apiMenuItem.headers.type}</th>
              <th>{t.apiMenuItem.headers.default}</th>
              <th>{t.apiMenuItem.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>key</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuItem.rows.key?.description}</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuItem.rows.label?.description}</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuItem.rows.icon?.description}</td>
            </tr>
            <tr>
              <td><code>extra</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuItem.rows.extra?.description}</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.apiMenuItem.rows.disabled?.description}</td>
            </tr>
            <tr>
              <td><code>danger</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.apiMenuItem.rows.danger?.description}</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuItem.rows.onClick?.description}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ margin: '16px 0 4px' }}>
          <code>{t.apiHeadings.menuDivider}</code>
        </h3>
        <table className="doc-table">
          <thead>
            <tr>
              <th>{t.apiMenuDivider.headers.name}</th>
              <th>{t.apiMenuDivider.headers.type}</th>
              <th>{t.apiMenuDivider.headers.default}</th>
              <th>{t.apiMenuDivider.headers.description}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code></td>
              <td><code>'divider'</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuDivider.rows.type?.description}</td>
            </tr>
            <tr>
              <td><code>key</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.apiMenuDivider.rows.key?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* === Accessibility ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.accessibility}</h2>
        <p className="doc-note">{t.notes.accessibilityRoles}</p>
        <p className="doc-note">{t.notes.accessibilityKeys}</p>
      </section>
    </article>
  );
}
