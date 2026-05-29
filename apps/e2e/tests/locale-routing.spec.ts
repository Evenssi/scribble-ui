import { expect, test } from '@playwright/test';

/**
 * Locale routing smoke tests.
 *
 * The middleware in `apps/docs/middleware.ts` does the following:
 *   1. `/` (no locale prefix) → 302 redirect to `/<detected>` based on
 *      cookie > Accept-Language > defaultLocale ('zh-CN').
 *   2. Already-prefixed paths like `/zh-CN/...` pass through.
 *   3. The chosen locale is mirrored into a `NEXT_LOCALE` cookie so
 *      the next visit is sticky.
 *
 * These are *the* tests jsdom can't run — only a real browser sees the
 * 302 round-trip and the resulting cookie.
 */

test.describe('Locale routing', () => {
  test('redirects "/" to a locale-prefixed home', async ({ page }) => {
    const response = await page.goto('/');
    // After following the redirect we should land on /<locale>.
    expect(page.url()).toMatch(/\/(zh-CN|en-US)$/);
    expect(response?.ok()).toBe(true);
  });

  test('zh-CN: explicit prefix is served directly (no extra redirect)', async ({
    page,
  }) => {
    const response = await page.goto('/zh-CN');
    expect(page.url()).toMatch(/\/zh-CN$/);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  });

  test('en-US: explicit prefix is served directly (no extra redirect)', async ({
    page,
  }) => {
    const response = await page.goto('/en-US');
    expect(page.url()).toMatch(/\/en-US$/);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  });

  test('writes a sticky NEXT_LOCALE cookie after first visit', async ({
    page,
    context,
  }) => {
    await page.goto('/');
    const cookies = await context.cookies();
    const localeCookie = cookies.find((c) => c.name === 'NEXT_LOCALE');
    expect(localeCookie).toBeDefined();
    expect(localeCookie?.value).toMatch(/^(zh-CN|en-US)$/);
  });
});
