import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for `scribble-ui` core package.
 *
 * - jsdom: emulates a browser DOM so React Testing Library works.
 * - globals: enable `describe`/`it`/`expect` without explicit imports
 *   (matches the ergonomics consumers expect from a unit-test setup).
 * - setupFiles: extend `expect` with @testing-library/jest-dom matchers.
 * - css: tests don't compute style — disable CSS handling entirely so
 *   the runner doesn't try to parse our class-name-based stylesheets.
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
