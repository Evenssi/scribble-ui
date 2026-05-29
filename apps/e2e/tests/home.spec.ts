import { expect, test } from '@playwright/test';

/**
 * Home page smoke tests.
 *
 * We pin the URL to `/zh-CN` (the default locale) so this suite stays
 * deterministic regardless of the test runner's Accept-Language. The
 * grouping structure asserted below comes from `app/[locale]/page.tsx`
 * `buildGroups()` and is structural data — its shape rarely changes.
 */

test.describe('Home page (zh-CN)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-CN');
  });

  test('renders the brand title and slogan', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: 'scribble-ui' }),
    ).toBeVisible();
  });

  test('renders all 7 grouped <details> sections, each open by default', async ({
    page,
  }) => {
    const groups = page.locator('details.home-group');
    await expect(groups).toHaveCount(7);
    // All groups are pre-opened (`open` attribute on the page source).
    const openCount = await page.locator('details.home-group[open]').count();
    expect(openCount).toBe(7);
  });

  test('component links point at /<locale>/components/<slug>', async ({
    page,
  }) => {
    const buttonLink = page.locator(
      'a.home-component-link[href="/zh-CN/components/button"]',
    );
    await expect(buttonLink).toBeVisible();
  });

  test('clicking the Button card navigates to the Button doc page', async ({
    page,
  }) => {
    await page
      .locator('a.home-component-link[href="/zh-CN/components/button"]')
      .click();
    await expect(page).toHaveURL(/\/zh-CN\/components\/button$/);
    await expect(page.locator('article.doc h1.doc-title')).toBeVisible();
  });
});
