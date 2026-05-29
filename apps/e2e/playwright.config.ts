import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the scribble-ui docs site.
 *
 * Strategy:
 *   - We boot the docs app in *production* mode on port 3100 so results
 *     are independent from the developer's `pnpm dev` (which runs on
 *     port 3000 and shares `apps/docs/.next/`). Sharing that directory
 *     between dev and prod is known to break CSS — see the warning in
 *     `.codebuddy/rules/main-agent-workflow.md` §1.3.
 *   - `webServer` is reused locally if it's already up (faster reruns)
 *     but always freshly spawned in CI.
 *   - Single browser (chromium) by default to keep the smoke loop fast;
 *     additional projects can be enabled later without touching tests.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Build once + start, both pointed at an *isolated* distDir so we
    // never clobber the developer's running `pnpm dev` session that
    // shares `apps/docs/.next/` (see main-agent-workflow §1.3).
    //
    // -p forwards the port to `next start`. Chaining build && start
    // means a fresh checkout works without a manual prebuild.
    command: `E2E_DIST_DIR=.next-e2e pnpm --filter docs exec next build && E2E_DIST_DIR=.next-e2e pnpm --filter docs exec next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
