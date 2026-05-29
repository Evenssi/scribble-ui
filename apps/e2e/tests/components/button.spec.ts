import { expect, test } from '@playwright/test';

/**
 * Button component page smoke tests.
 *
 * The doc page renders ButtonDocClient with English-fixed sample
 * labels (e.g. "Default · md", "Primary", "Disabled", "Loading",
 * "Save changes") that don't go through i18n, so these selectors are
 * stable across locale switches.
 */

test.describe('Button doc page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-CN/components/button');
  });

  test('renders the doc article with a title and lede', async ({ page }) => {
    await expect(page.locator('article.doc h1.doc-title')).toBeVisible();
    await expect(page.locator('article.doc p.doc-lede')).toBeVisible();
  });

  test('renders all 6 size/variant sample buttons in the first demo row', async ({
    page,
  }) => {
    for (const name of [
      'Default · sm',
      'Default · md',
      'Default · lg',
      'Primary · sm',
      'Primary · md',
      'Primary · lg',
    ]) {
      await expect(page.getByRole('button', { name })).toBeVisible();
    }
  });

  test('disabled sample button is actually disabled at the DOM level', async ({
    page,
  }) => {
    const disabled = page.getByRole('button', { name: 'Disabled' });
    await expect(disabled).toBeVisible();
    await expect(disabled).toBeDisabled();
  });

  test('loading sample button is non-interactive (aria-disabled or disabled)', async ({
    page,
  }) => {
    // The loading button keeps the "Loading" label; its exact a11y
    // signal (disabled vs aria-disabled) is an implementation detail —
    // we just want the runtime to refuse clicks.
    const loading = page.getByRole('button', { name: 'Loading' });
    await expect(loading).toBeVisible();
    const isDisabledAttr = await loading.evaluate(
      (el) =>
        (el as HTMLButtonElement).disabled ||
        el.getAttribute('aria-disabled') === 'true',
    );
    expect(isDisabledAttr).toBe(true);
  });

  test('"Save changes" interactive demo flips into a loading state on click', async ({
    page,
  }) => {
    // The ButtonDocClient renders a *static* `<Button loading>Saving…</Button>`
    // sample in the "States" section, plus our interactive block button at
    // the bottom. We anchor on `.su-btn--block` so we only target the
    // interactive one (the static sample doesn't carry the block modifier).
    const save = page.locator('button.su-btn--block');
    await expect(save).toHaveText('Save changes');
    await expect(save).toBeEnabled();
    await save.click();
    // While pending, the same block button swaps its label to "Saving…"
    // and exposes aria-busy/aria-disabled.
    await expect(save).toHaveText('Saving…');
    await expect(save).toHaveAttribute('aria-busy', 'true');
    // And restores after ~1500ms (we wait up to 5s to be safe on CI).
    await expect(save).toHaveText('Save changes', { timeout: 5_000 });
  });

  test('renders the API table with at least the documented prop rows', async ({
    page,
  }) => {
    const apiCodes = page.locator('table.doc-table tbody td code');
    // 9 documented props × 1 name cell each = >= 9 <code> tags in the
    // first column; cross-cell <code> may add more, so use >=.
    expect(await apiCodes.count()).toBeGreaterThanOrEqual(9);
    await expect(
      page.locator('table.doc-table tbody td code', { hasText: 'variant' }),
    ).toBeVisible();
  });
});
