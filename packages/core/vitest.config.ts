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
 * - include: all unit tests live under `test/unit/` so that `src/` stays
 *   pure source (production build never needs to filter test files out).
 * - coverage: v8 provider; reports `text` (CLI summary), `html` (browse
 *   `coverage/index.html` locally), and `lcov` (CI-friendly).
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    css: false,
    include: ['test/unit/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
      ],
    },
  },
});
