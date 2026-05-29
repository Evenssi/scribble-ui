// Extends Vitest's `expect` with DOM-aware matchers
// (toBeInTheDocument, toHaveAttribute, toBeDisabled, ...).
import '@testing-library/jest-dom/vitest';

// jsdom does not implement Element.prototype.scrollIntoView, but several
// of our components call it (e.g. Select keeps the highlighted option in
// view). Stub it as a no-op so tests don't crash with TypeError.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {
    /* no-op for tests */
  };
}
