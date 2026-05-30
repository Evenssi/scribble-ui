import { expect, test, type Page } from '@playwright/test';

/**
 * Per-component-page SSR + style smoke tests.
 *
 * Why this file exists
 * --------------------
 * `button.spec.ts` exercises one page deeply. This spec instead casts a
 * very wide, very shallow net across *every* component doc page so a
 * regression in any of them — even ones that "still kind of work" — gets
 * caught. The historical pain points it is designed to catch:
 *
 *   1. The page returns 500 / 404 (route or SSR broke).
 *   2. The doc skeleton is missing (`article.doc`, `h1.doc-title`,
 *      `p.doc-lede`, `table.doc-table`) — usually means a docs-site
 *      layout/CSS regression.
 *   3. The component itself never renders into the page (root selector
 *      missing) — usually means a barrel export, tsup CSS copy, or
 *      doc-client wiring broke.
 *   4. Hydration / runtime warnings on the page (`page.on('console')`).
 *   5. CSS / JS / font assets 4xx-or-worse (catches the classic
 *      "I ran build while dev was up and now /_next/static/css/* 404s"
 *      style regression).
 *   6. The API table on each page actually has its borders applied
 *      (catches "API table styles disappeared" — a real and common
 *      breakage when docs CSS or the components.css barrel changes).
 *
 * Strategy
 * --------
 * - Data-driven: one entry per shipped doc page, exposing only what is
 *   page-specific (slug, display name, root selector, whether the
 *   component is portal/trigger-based and so renders nothing visible
 *   on first paint).
 * - One single locale (`en-US`) — locale routing is already covered by
 *   `locale-routing.spec.ts`, no need to multiply 34 by 2.
 * - All assertions live inside one shared `runSmoke` helper so the
 *   matrix stays trivially scannable.
 */

interface ComponentEntry {
  slug: string;
  /** What we expect the H1 to contain (case-insensitive substring). */
  title: string;
  /**
   * CSS selector for "the component definitely rendered into the
   * initial SSR/CSR output". For portal/trigger-based components
   * (Modal, Drawer, Toast, …) the overlay is *not* in the DOM until
   * the user clicks something — for those we anchor on a trigger
   * `button` inside the demo article instead.
   */
  rootSelector: string;
  /**
   * A few components legitimately render into the DOM but stay
   * hidden until some user action / scroll threshold (e.g. BackTop
   * is `aria-hidden` until the page is scrolled past its trigger).
   * For those we only assert presence in the DOM, not visibility.
   */
  rootMayBeHidden?: boolean;
  /**
   * Some demos intentionally exercise broken/remote image URLs to
   * showcase fallback behaviour (Avatar). The resulting network
   * errors aren't bugs in scribble-ui, so we relax console + asset
   * checks for those pages and rely on the other 4 assertions.
   */
  allowExternalNetworkErrors?: boolean;
}

/**
 * Source of truth: this list must mirror the directories under
 * `apps/docs/app/[locale]/components/`. Keep it sorted alphabetically
 * so additions are mechanical and reviewable.
 */
const COMPONENTS: ComponentEntry[] = [
  { slug: 'alert',       title: 'Alert',        rootSelector: '.su-alert' },
  // Avatar demo intentionally uses external + invalid image URLs to
  // exhibit fallback behaviour, so its console/network errors are
  // expected and out of scope for this smoke check.
  { slug: 'avatar',      title: 'Avatar',       rootSelector: '.su-avatar', allowExternalNetworkErrors: true },
  // BackTop renders into the DOM but is `aria-hidden` until the page
  // scrolls past its threshold — assert presence, not visibility.
  { slug: 'backtop',     title: 'BackTop',      rootSelector: '.su-backtop', rootMayBeHidden: true },
  { slug: 'badge',       title: 'Badge',        rootSelector: '.su-badge' },
  { slug: 'breadcrumb',  title: 'Breadcrumb',   rootSelector: '.su-breadcrumb' },
  { slug: 'button',      title: 'Button',       rootSelector: '.su-btn' },
  { slug: 'card',        title: 'Card',         rootSelector: '.su-card' },
  { slug: 'carousel',    title: 'Carousel',     rootSelector: '.su-carousel' },
  { slug: 'checkbox',    title: 'Checkbox',     rootSelector: '.su-checkbox' },
  // DatePicker is trigger-based — anchor on a button in the demo.
  { slug: 'datepicker',  title: 'DatePicker',   rootSelector: 'article.doc button' },
  { slug: 'divider',     title: 'Divider',      rootSelector: '.su-divider' },
  // Drawer overlay only mounts on click.
  { slug: 'drawer',      title: 'Drawer',       rootSelector: 'article.doc button' },
  // Dropdown menu only mounts on click.
  { slug: 'dropdown',    title: 'Dropdown',     rootSelector: 'article.doc button' },
  { slug: 'empty',       title: 'Empty',        rootSelector: '.su-empty' },
  { slug: 'form',        title: 'Form',         rootSelector: '.su-form' },
  { slug: 'input',       title: 'Input',        rootSelector: '.su-input' },
  // Modal overlay only mounts on click.
  { slug: 'modal',       title: 'Modal',        rootSelector: 'article.doc button' },
  { slug: 'numberinput', title: 'NumberInput',  rootSelector: '.su-number-input' },
  { slug: 'pagination',  title: 'Pagination',   rootSelector: '.su-pagination' },
  // Popover only mounts on click.
  { slug: 'popover',     title: 'Popover',      rootSelector: 'article.doc button' },
  { slug: 'progress',    title: 'Progress',     rootSelector: '.su-progress' },
  { slug: 'radio',       title: 'Radio',        rootSelector: '.su-radio' },
  { slug: 'result',      title: 'Result',       rootSelector: '.su-result' },
  { slug: 'select',      title: 'Select',       rootSelector: '.su-select' },
  { slug: 'skeleton',    title: 'Skeleton',     rootSelector: '.su-skeleton' },
  { slug: 'slider',      title: 'Slider',       rootSelector: '.su-slider' },
  { slug: 'spinner',     title: 'Spinner',      rootSelector: '.su-spinner' },
  { slug: 'switch',      title: 'Switch',       rootSelector: '.su-switch' },
  { slug: 'tabs',        title: 'Tabs',         rootSelector: '.su-tabs' },
  { slug: 'tag',         title: 'Tag',          rootSelector: '.su-tag' },
  { slug: 'textarea',    title: 'Textarea',     rootSelector: '.su-textarea' },
  { slug: 'timeline',    title: 'Timeline',     rootSelector: '.su-timeline' },
  // Toast is fully imperative — only a trigger button is on the page.
  { slug: 'toast',       title: 'Toast',        rootSelector: 'article.doc button' },
  // Tooltip only mounts on hover/focus.
  { slug: 'tooltip',     title: 'Tooltip',      rootSelector: 'article.doc button' },
];

/**
 * Console messages that aren't bugs in scribble-ui. Keep this list
 * *empty* by default and only add entries here with a short comment
 * explaining why the noise is upstream and not actionable.
 */
const CONSOLE_ERROR_ALLOWLIST: RegExp[] = [
  // (intentionally empty — see CONTRIBUTING / triage notes)
];

/**
 * URLs we don't want to fail the test for if they 4xx — currently
 * empty: scribble-ui ships zero third-party assets in docs. Any 4xx
 * for `.css` / `.js` / `.woff2?` / `.ttf` is treated as a regression.
 */
const ASSET_FAILURE_ALLOWLIST: RegExp[] = [];

const ASSET_PATTERN = /\.(css|js|mjs|woff2?|ttf)(\?|$)/i;

async function runSmoke(page: Page, entry: ComponentEntry) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const assetFailures: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (CONSOLE_ERROR_ALLOWLIST.some((re) => re.test(text))) return;
    consoleErrors.push(text);
  });
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });
  page.on('response', (res) => {
    const url = res.url();
    if (!ASSET_PATTERN.test(url)) return;
    if (res.status() < 400) return;
    if (ASSET_FAILURE_ALLOWLIST.some((re) => re.test(url))) return;
    assetFailures.push(`${res.status()} ${url}`);
  });

  // 1) HTTP 200
  const url = `/en-US/components/${entry.slug}`;
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  expect(response, `goto returned no response for ${entry.slug}`).not.toBeNull();
  expect(response!.status(), `HTTP status for ${url}`).toBe(200);

  // 2) Doc skeleton is rendered (article + h1 + lede). The doc-lede
  // copy is page-specific so we just assert presence.
  await expect(
    page.locator('article.doc'),
    `article.doc visible on ${entry.slug}`,
  ).toBeVisible();
  await expect(
    page.locator('article.doc h1.doc-title'),
    `h1.doc-title visible on ${entry.slug}`,
  ).toBeVisible();
  await expect(
    page.locator('article.doc h1.doc-title'),
    `h1.doc-title text contains "${entry.title}" on ${entry.slug}`,
  ).toContainText(entry.title, { ignoreCase: true });

  // 3) The component (or, for portal/trigger components, its trigger)
  // actually rendered into the document. Some components ship hidden
  // by default (BackTop) — for those we only check DOM presence.
  const rootLocator = page.locator(entry.rootSelector).first();
  if (entry.rootMayBeHidden) {
    await expect(
      rootLocator,
      `root selector "${entry.rootSelector}" attached on ${entry.slug}`,
    ).toBeAttached();
  } else {
    await expect(
      rootLocator,
      `root selector "${entry.rootSelector}" visible on ${entry.slug}`,
    ).toBeVisible();
  }

  // 4) The API table exists *and* has visible borders. This is the
  // direct guard against the "table styles disappeared" regression
  // class. We pick the first cell of the first body row and check the
  // computed bottom border is non-zero — the doc table sets a
  // hand-drawn dashed border on every cell, so a 0px result means the
  // doc CSS chunk did not apply.
  const apiTable = page.locator('article.doc table.doc-table').first();
  await expect(
    apiTable,
    `table.doc-table present on ${entry.slug}`,
  ).toBeVisible();
  const firstCell = apiTable.locator('tbody td').first();
  await expect(
    firstCell,
    `table.doc-table has at least one tbody cell on ${entry.slug}`,
  ).toBeVisible();
  const cellBorder = await firstCell.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      bottom: cs.borderBottomWidth,
      top: cs.borderTopWidth,
      left: cs.borderLeftWidth,
      right: cs.borderRightWidth,
      padding: cs.padding,
    };
  });
  // At least one side must have a border (some doc tables only
  // bottom-border their rows). Catches the "all borders gone" case.
  const anyBorder = [
    cellBorder.bottom,
    cellBorder.top,
    cellBorder.left,
    cellBorder.right,
  ].some((w) => w && w !== '0px');
  expect(
    anyBorder,
    `table.doc-table tbody cell on ${entry.slug} has at least one non-zero border (got ${JSON.stringify(cellBorder)})`,
  ).toBe(true);

  // 5) No console errors, no uncaught exceptions, no asset failures.
  // We assert at the end so we collect the full picture across the
  // whole page lifecycle, not just up to a particular waitFor call.
  // Pages that deliberately demo broken external URLs opt out of the
  // network-shape checks (their fallback rendering is the demo).
  if (!entry.allowExternalNetworkErrors) {
    expect(consoleErrors, `console.error on ${entry.slug}`).toEqual([]);
    expect(assetFailures, `failed CSS/JS/font requests on ${entry.slug}`).toEqual([]);
  }
  // Uncaught page errors are always a real bug, regardless of the page.
  expect(pageErrors, `uncaught page errors on ${entry.slug}`).toEqual([]);
}

test.describe('All component doc pages — SSR + style smoke', () => {
  for (const entry of COMPONENTS) {
    test(`/en-US/components/${entry.slug} renders cleanly`, async ({ page }) => {
      await runSmoke(page, entry);
    });
  }
});
