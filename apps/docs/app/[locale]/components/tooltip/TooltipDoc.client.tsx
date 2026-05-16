'use client';

import { useState } from 'react';
import { Button, Tooltip } from 'scribble-ui';

import type { ComponentDoc } from '../../../../i18n/dictionaries/zh-CN';

export function TooltipDocClient({ t }: { t: ComponentDoc }) {
  const [controlledOpen, setControlledOpen] = useState(false);

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
            <Tooltip content="Saves your sketch to the cloud.">
              <Button>Save</Button>
            </Tooltip>
            <Tooltip content="Reverts to the previous version.">
              <Button>Undo</Button>
            </Tooltip>
            <Tooltip content="This action cannot be undone.">
              <Button variant="danger">Delete</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Placement ======================================= */}
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
            <Tooltip content="Above the trigger." placement="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Below the trigger." placement="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Left of the trigger." placement="left">
              <Button>Left</Button>
            </Tooltip>
            <Tooltip content="Right of the trigger." placement="right">
              <Button>Right</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Triggers ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.triggers}</h2>
        <p className="doc-note">{t.notes.triggers}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Tooltip content="Opens on hover OR focus." trigger={['hover', 'focus']}>
              <Button>Hover + focus</Button>
            </Tooltip>
            <Tooltip content="Opens on hover only." trigger="hover">
              <Button>Hover only</Button>
            </Tooltip>
            <Tooltip content="Opens on focus only — try Tab." trigger="focus">
              <Button>Focus only</Button>
            </Tooltip>
            <Tooltip content="Click to toggle. Esc dismisses." trigger="click">
              <Button>Click toggle</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Delay =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.delay}</h2>
        <p className="doc-note">{t.notes.delay}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Tooltip content="Opens immediately." openDelay={0}>
              <Button>0ms open</Button>
            </Tooltip>
            <Tooltip content="Default 100ms open." >
              <Button>100ms open</Button>
            </Tooltip>
            <Tooltip content="Lazy 600ms open." openDelay={600}>
              <Button>600ms open</Button>
            </Tooltip>
            <Tooltip content="Sticky for 400ms after leave." closeDelay={400}>
              <Button>Sticky close</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.controlled}</h2>
        <p className="doc-note">{t.notes.controlled}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Tooltip
              content="I'm controlled — the toggle button below decides when I appear."
              open={controlledOpen}
              onOpenChange={setControlledOpen}
            >
              <Button>Target</Button>
            </Tooltip>
            <Button
              variant="primary"
              onClick={() => setControlledOpen((v) => !v)}
            >
              {controlledOpen ? 'Hide tooltip' : 'Show tooltip'}
            </Button>
          </div>
          <p className="doc-note">
            {t.notes.controlledState}{' '}
            <code>{controlledOpen ? 'open' : 'closed'}</code>
          </p>
        </div>
      </section>

      {/* === Disabled trigger ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.disabledTrigger}</h2>
        <p className="doc-note">{t.notes.disabledTrigger}</p>
        <div className="doc-demo">
          <div className="doc-demo-row" style={{ flexWrap: 'wrap' }}>
            <Tooltip
              content="You need editor access to publish."
              wrapDisabledTrigger
            >
              <Button disabled>Publish</Button>
            </Tooltip>
            <Tooltip
              content="Enabled tooltips work without the wrapper."
            >
              <Button>Compare</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Long content ==================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.longContent}</h2>
        <p className="doc-note">{t.notes.longContent}</p>
        <div className="doc-demo">
          <div className="doc-demo-row">
            <Tooltip
              content="Pressing this regenerates every sticky note in the workspace using the latest model. The operation runs in the background; you can keep editing while it completes."
            >
              <Button>Regenerate all…</Button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">{t.sections.code}</h2>
        <pre className="doc-code">
          <code>{`import { Button, Tooltip } from 'scribble-ui';

// Basic — hover + focus, top placement, 100ms open delay.
<Tooltip content="Saves your sketch to the cloud.">
  <Button>Save</Button>
</Tooltip>

// Placement + click trigger.
<Tooltip content="Click to toggle. Esc dismisses." placement="bottom" trigger="click">
  <Button>Help</Button>
</Tooltip>

// Disabled trigger needs a wrapper span to capture events.
<Tooltip content="You need editor access." wrapDisabledTrigger>
  <Button disabled>Publish</Button>
</Tooltip>

// Fully controlled.
const [open, setOpen] = useState(false);
<Tooltip open={open} onOpenChange={setOpen} content="I'm driven from outside.">
  <Button>Target</Button>
</Tooltip>`}</code>
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
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.content?.description}</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactElement</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.children?.description}</td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
              <td><code>'top'</code></td>
              <td>{t.api.rows.placement?.description}</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td><code>'hover' | 'focus' | 'click' | 'manual' | array</code></td>
              <td><code>['hover', 'focus']</code></td>
              <td>{t.api.rows.trigger?.description}</td>
            </tr>
            <tr>
              <td><code>openDelay</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>{t.api.rows.openDelay?.description}</td>
            </tr>
            <tr>
              <td><code>closeDelay</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>{t.api.rows.closeDelay?.description}</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.open?.description}</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>(open: boolean) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.onOpenChange?.description}</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.defaultOpen?.description}</td>
            </tr>
            <tr>
              <td><code>wrapDisabledTrigger</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>{t.api.rows.wrapDisabledTrigger?.description}</td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>{t.api.rows.offset?.description}</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>{t.api.rows.className?.description}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
