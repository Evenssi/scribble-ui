'use client';

import { useState } from 'react';
import { Button, Tooltip } from 'scribble-ui';
// Reuse the Button page's doc-* class set so all pages share one stylesheet.
import '../button/page.css';

export default function TooltipDocPage() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <article className="doc">
      <h1 className="doc-title">Tooltip</h1>
      <p className="doc-lede">
        A small floating bubble that describes its trigger. Portals into{' '}
        <code>document.body</code>, auto-flips when there is not enough
        room, and ships with hover + focus triggers by default so it
        works for both pointer and keyboard users out of the box.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Wrap any focusable element. Hover or focus the trigger to see
          the bubble; press <kbd>Esc</kbd> to dismiss it.
        </p>
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
        <h2 className="doc-h2">Placement</h2>
        <p className="doc-note">
          Four placements: <code>top</code> (default), <code>bottom</code>,{' '}
          <code>left</code> and <code>right</code>. The bubble auto-flips
          to the opposite side when it would overflow the viewport.
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
        <h2 className="doc-h2">Triggers</h2>
        <p className="doc-note">
          Default is <code>['hover', 'focus']</code>. Use <code>'click'</code>{' '}
          for a toggle (click the trigger to open, click again to close,
          press <kbd>Esc</kbd> to dismiss). <code>'manual'</code> turns
          off all built-in triggers — combine with <code>open</code> and{' '}
          <code>onOpenChange</code> for fully controlled behavior.
        </p>
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
        <h2 className="doc-h2">Delay</h2>
        <p className="doc-note">
          <code>openDelay</code> defaults to 100ms — short enough that
          intentional hovers feel instant, long enough that drive-by
          mouse movements don&apos;t flicker the page. <code>closeDelay</code>{' '}
          defaults to 0; bump it if you want users to be able to drift
          off the trigger and back without the bubble disappearing.
        </p>
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
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Pass <code>open</code> + <code>onOpenChange</code> to drive the
          tooltip from your own state. Useful for tutorials, onboarding,
          or whenever you want to programmatically force a tip open.
        </p>
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
            State: <code>{controlledOpen ? 'open' : 'closed'}</code>
          </p>
        </div>
      </section>

      {/* === Disabled trigger ================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">Disabled trigger</h2>
        <p className="doc-note">
          Native disabled buttons swallow pointer events, so a tooltip
          attached directly to one would never open. Set{' '}
          <code>wrapDisabledTrigger</code> to wrap the trigger in a{' '}
          <code>span</code> that captures events on its behalf.
        </p>
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
        <h2 className="doc-h2">Long content</h2>
        <p className="doc-note">
          Bubbles soft-cap at <code>max-width: 280px</code> and wrap.
          Keep tooltip text short — for paragraphs, reach for a Modal or
          a Card instead.
        </p>
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
        <h2 className="doc-h2">Code</h2>
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
              <td><code>content</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>
                Required. The bubble&apos;s body. A falsy value
                (<code>null</code> / <code>undefined</code> / <code>false</code>)
                disables the tooltip without unmounting the trigger.
              </td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactElement</code></td>
              <td><code>—</code></td>
              <td>
                Required. A single React element that will receive the
                injected ref, event handlers and{' '}
                <code>aria-describedby</code>.
              </td>
            </tr>
            <tr>
              <td><code>placement</code></td>
              <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
              <td><code>'top'</code></td>
              <td>Preferred side. Auto-flips to the opposite side when needed.</td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td><code>'hover' | 'focus' | 'click' | 'manual' | array</code></td>
              <td><code>['hover', 'focus']</code></td>
              <td>
                Which interactions open the tooltip. <code>'manual'</code> turns
                them all off — pair with <code>open</code> for full control.
              </td>
            </tr>
            <tr>
              <td><code>openDelay</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Milliseconds to wait before opening (set 0 for instant).</td>
            </tr>
            <tr>
              <td><code>closeDelay</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Milliseconds to wait before closing (set &gt;0 for sticky).</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>boolean</code></td>
              <td><code>—</code></td>
              <td>Controlled open state. Pair with <code>onOpenChange</code>.</td>
            </tr>
            <tr>
              <td><code>onOpenChange</code></td>
              <td><code>(open: boolean) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fires for every open/close attempt (controlled or not).</td>
            </tr>
            <tr>
              <td><code>defaultOpen</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Initial state in uncontrolled mode.</td>
            </tr>
            <tr>
              <td><code>wrapDisabledTrigger</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Wrap the trigger in a <code>span</code> so events fire even
                when the inner element is <code>disabled</code>.
              </td>
            </tr>
            <tr>
              <td><code>offset</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>Pixels between the trigger edge and the bubble.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class names appended to the bubble.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
