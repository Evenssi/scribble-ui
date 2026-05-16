'use client';

import { useState } from 'react';
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from 'scribble-ui';

/** Tiny inline icon used by the demos to keep the docs site dep-free. */
function PaperIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M6 3h9l4 4v14H6z M15 3v4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M4 20l4-1 11-11-3-3L5 16l-1 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <path
        d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function TabsDocPage() {
  // Drives the "Controlled" example so visitors can flip the active tab
  // from outside the widget.
  const [active, setActive] = useState('sketch');

  return (
    <article className="doc">
      <h1 className="doc-title">Tabs</h1>
      <p className="doc-lede">
        Hand-drawn tabbed navigation. Three flavours — underline, card and
        pill — each layered on the same WAI-ARIA Tabs pattern: roving
        tabindex, arrow-key focus, optional manual activation, stable id
        wiring between every trigger and its panel.
      </p>

      {/* === Basic =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Basic</h2>
        <p className="doc-note">
          Default <code>underline</code> variant. Use the keyboard:
          ArrowLeft / ArrowRight to move, Home / End to jump to the ends,
          Tab to step into the panel body.
        </p>
        <div className="doc-demo">
          <Tabs defaultValue="paper">
            <TabList aria-label="Notebook sections">
              <Tab value="paper">Paper</Tab>
              <Tab value="sketch">Sketch</Tab>
              <Tab value="ink">Ink</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="paper">
                A blank canvas — start with a soft warm off-white surface.
              </TabPanel>
              <TabPanel value="sketch">
                Loose pencil lines, no commitment, all exploration.
              </TabPanel>
              <TabPanel value="ink">
                Lock in the gesture with a confident hand-drawn stroke.
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Variants ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Variants</h2>
        <p className="doc-note">
          The same content, three visual personalities. Pick the one that
          best matches the surrounding surface — pill on toolbars, card on
          dashboards, underline almost everywhere else.
        </p>
        <div className="doc-demo doc-demo--column">
          <Tabs defaultValue="a" variant="underline">
            <TabList aria-label="Underline demo">
              <Tab value="a" icon={<PaperIcon />}>Overview</Tab>
              <Tab value="b" icon={<PenIcon />}>Drafts</Tab>
              <Tab value="c" icon={<StarIcon />}>Pinned</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">Underline · Overview panel.</TabPanel>
              <TabPanel value="b">Underline · Drafts panel.</TabPanel>
              <TabPanel value="c">Underline · Pinned panel.</TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="a" variant="card">
            <TabList aria-label="Card demo">
              <Tab value="a">Today</Tab>
              <Tab value="b">This week</Tab>
              <Tab value="c">All time</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">Card · Today's notes live here.</TabPanel>
              <TabPanel value="b">Card · This week's notes live here.</TabPanel>
              <TabPanel value="c">Card · Everything you've ever scribbled.</TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="a" variant="pill">
            <TabList aria-label="Pill demo">
              <Tab value="a">Day</Tab>
              <Tab value="b">Week</Tab>
              <Tab value="c">Month</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">Pill · Day view.</TabPanel>
              <TabPanel value="b">Pill · Week view.</TabPanel>
              <TabPanel value="c">Pill · Month view.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Sizes =========================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Sizes</h2>
        <div className="doc-demo doc-demo--column">
          <Tabs defaultValue="a" size="sm" variant="card">
            <TabList aria-label="Small size">
              <Tab value="a">Small</Tab>
              <Tab value="b">Tighter</Tab>
              <Tab value="c">Compact</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">sm — for sidebars and dense toolbars.</TabPanel>
              <TabPanel value="b">sm — second panel.</TabPanel>
              <TabPanel value="c">sm — third panel.</TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="a" size="md" variant="card">
            <TabList aria-label="Medium size">
              <Tab value="a">Medium</Tab>
              <Tab value="b">Default</Tab>
              <Tab value="c">Balanced</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">md — the default for most layouts.</TabPanel>
              <TabPanel value="b">md — second panel.</TabPanel>
              <TabPanel value="c">md — third panel.</TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="a" size="lg" variant="card">
            <TabList aria-label="Large size">
              <Tab value="a">Large</Tab>
              <Tab value="b">Spacious</Tab>
              <Tab value="c">Hero</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="a">lg — for landing pages and hero areas.</TabPanel>
              <TabPanel value="b">lg — second panel.</TabPanel>
              <TabPanel value="c">lg — third panel.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Vertical ======================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Vertical</h2>
        <p className="doc-note">
          Set <code>orientation=&quot;vertical&quot;</code>. Arrow keys
          rotate to ArrowUp / ArrowDown automatically.
        </p>
        <div className="doc-demo">
          <Tabs
            defaultValue="general"
            orientation="vertical"
            variant="underline"
            style={{ minHeight: 180 }}
          >
            <TabList aria-label="Settings">
              <Tab value="general">General</Tab>
              <Tab value="appearance">Appearance</Tab>
              <Tab value="shortcuts">Shortcuts</Tab>
              <Tab value="about">About</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="general">Workspace name, language, region.</TabPanel>
              <TabPanel value="appearance">Theme, font scale, density.</TabPanel>
              <TabPanel value="shortcuts">Keyboard shortcuts cheat sheet.</TabPanel>
              <TabPanel value="about">Build info, licenses, credits.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Disabled & Manual activation ==================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Disabled &amp; manual activation</h2>
        <p className="doc-note">
          Disabled tabs render but are skipped by arrow keys.
          <code> activationMode=&quot;manual&quot;</code> means moving
          focus does <em>not</em> activate the panel — you have to press
          Enter or Space. Useful when switching has real cost
          (e.g. fetching).
        </p>
        <div className="doc-demo">
          <Tabs
            defaultValue="overview"
            variant="card"
            activationMode="manual"
          >
            <TabList aria-label="Project">
              <Tab value="overview">Overview</Tab>
              <Tab value="reports" disabled>
                Reports (soon)
              </Tab>
              <Tab value="settings">Settings</Tab>
              <Tab value="danger">Danger zone</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="overview">A friendly summary of the project.</TabPanel>
              <TabPanel value="reports">This panel is unreachable while the trigger is disabled.</TabPanel>
              <TabPanel value="settings">Change the things, save them, repeat.</TabPanel>
              <TabPanel value="danger">Irreversible operations live here.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Controlled ====================================== */}
      <section className="doc-section">
        <h2 className="doc-h2">Controlled</h2>
        <p className="doc-note">
          Pass <code>value</code> + <code>onChange</code> to drive the
          widget from outside. The buttons below mutate the same state
          the Tabs read from.
        </p>
        <div className="doc-demo doc-demo--column">
          <div className="doc-demo-row">
            <Button
              size="sm"
              variant={active === 'paper' ? 'primary' : 'default'}
              onClick={() => setActive('paper')}
            >
              Jump to Paper
            </Button>
            <Button
              size="sm"
              variant={active === 'sketch' ? 'primary' : 'default'}
              onClick={() => setActive('sketch')}
            >
              Jump to Sketch
            </Button>
            <Button
              size="sm"
              variant={active === 'ink' ? 'primary' : 'default'}
              onClick={() => setActive('ink')}
            >
              Jump to Ink
            </Button>
            <span className="doc-note" style={{ marginLeft: 'auto' }}>
              Active: <code>{active}</code>
            </span>
          </div>
          <Tabs value={active} onChange={setActive} variant="pill">
            <TabList aria-label="Controlled demo">
              <Tab value="paper">Paper</Tab>
              <Tab value="sketch">Sketch</Tab>
              <Tab value="ink">Ink</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="paper">Controlled · Paper panel.</TabPanel>
              <TabPanel value="sketch">Controlled · Sketch panel.</TabPanel>
              <TabPanel value="ink">Controlled · Ink panel.</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* === Code ============================================ */}
      <section className="doc-section">
        <h2 className="doc-h2">Code</h2>
        <pre className="doc-code">
          <code>{`import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from 'scribble-ui';

export function Example() {
  const [value, setValue] = useState('paper');

  return (
    <Tabs value={value} onChange={setValue} variant="card">
      <TabList aria-label="Notebook sections">
        <Tab value="paper">Paper</Tab>
        <Tab value="sketch">Sketch</Tab>
        <Tab value="ink" disabled>Ink (soon)</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="paper">A blank canvas.</TabPanel>
        <TabPanel value="sketch">Loose pencil lines.</TabPanel>
        <TabPanel value="ink">Confident hand-drawn strokes.</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`}</code>
        </pre>
      </section>

      {/* === API ============================================= */}
      <section className="doc-section">
        <h2 className="doc-h2">API</h2>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          Tabs
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
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Controlled active tab value.</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Initial active value when uncontrolled. If omitted, the
                first non-disabled tab wins.
              </td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(value: string) =&gt; void</code></td>
              <td><code>—</code></td>
              <td>Fires whenever the active tab changes.</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>'underline' | 'card' | 'pill'</code></td>
              <td><code>'underline'</code></td>
              <td>Visual variant.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size preset.</td>
            </tr>
            <tr>
              <td><code>orientation</code></td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
              <td>Layout direction. Also rotates the arrow-key bindings.</td>
            </tr>
            <tr>
              <td><code>activationMode</code></td>
              <td><code>'automatic' | 'manual'</code></td>
              <td><code>'automatic'</code></td>
              <td>
                <code>'automatic'</code> activates on focus,
                <code> 'manual'</code> requires Enter / Space.
              </td>
            </tr>
            <tr>
              <td><code>keepMounted</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Keep every panel mounted in the DOM (hidden via the
                <code> hidden</code> attribute when inactive).
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class on the outer container.</td>
            </tr>
          </tbody>
        </table>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          TabList
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
              <td><code>aria-label</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required for screen readers if no labelled-by is provided.</td>
            </tr>
            <tr>
              <td><code>aria-labelledby</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Reference an external heading instead of inlining a label.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class on the tablist element.</td>
            </tr>
          </tbody>
        </table>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          Tab
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
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required. Pairs with the matching <code>&lt;TabPanel&gt;</code>.</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Renders but is skipped by arrow keys and cannot be activated.
              </td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td><code>ReactNode</code></td>
              <td><code>—</code></td>
              <td>Decorative icon rendered before the label.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class appended after the built-in classes.</td>
            </tr>
          </tbody>
        </table>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          TabPanels
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
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>
                Layout slot for the per-tab panels. Carries no ARIA on its
                own — each <code>TabPanel</code> already does.
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="doc-h2" style={{ fontSize: 'var(--su-font-size-h3)' }}>
          TabPanel
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
              <td><code>value</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Required. Pairs with the matching <code>&lt;Tab&gt;</code>.</td>
            </tr>
            <tr>
              <td><code>forceMount</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Force this individual panel to stay mounted (hidden via
                <code> hidden</code> when inactive).
              </td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td><code>—</code></td>
              <td>Extra class on the panel element.</td>
            </tr>
          </tbody>
        </table>

        <p className="doc-note">
          Every component also forwards a ref to its underlying DOM
          element and accepts the matching native attributes
          (<code>aria-*</code>, <code>data-*</code>, <code>id</code>, …).
        </p>
      </section>
    </article>
  );
}
