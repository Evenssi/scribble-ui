import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BackTop } from '../../src/components/BackTop/BackTop';

// jsdom doesn't expose requestAnimationFrame timing — when the
// component reaches for it during scroll throttling we shim it to a
// microtask so the visibility update is observable in tests without
// a full timer mock setup.
function ensureRaf() {
  if (typeof window.requestAnimationFrame !== 'function') {
    (window as unknown as { requestAnimationFrame: (cb: FrameRequestCallback) => number })
      .requestAnimationFrame = (cb) =>
      window.setTimeout(() => cb(performance.now()), 0) as unknown as number;
  }
  if (typeof window.cancelAnimationFrame !== 'function') {
    (window as unknown as { cancelAnimationFrame: (id: number) => void })
      .cancelAnimationFrame = (id) => window.clearTimeout(id);
  }
}

/** Force the BackTop's "current scroll position" reading to a fixed px value. */
function setScrollTop(value: number) {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollTop', {
    value,
    writable: true,
    configurable: true,
  });
}

describe('<BackTop />', () => {
  it('mounts portalled to document.body and stays hidden below the threshold', () => {
    ensureRaf();
    setScrollTop(0);
    render(<BackTop visibilityHeight={400} />);

    // aria-hidden=true wipes the accessible name so we cannot match by
    // role name; query by attribute instead and assert the rest.
    const btn = document.body.querySelector(
      'button[aria-label="Back to top"]'
    ) as HTMLButtonElement;
    expect(btn).not.toBeNull();
    // Portal target is body, not the test container created by RTL.
    expect(btn.parentElement).toBe(document.body);
    expect(btn).toHaveAttribute('aria-hidden', 'true');
    expect(btn).toHaveAttribute('tabIndex', '-1');
    expect(btn.className).not.toMatch(/su-backtop--visible/);
  });

  it('paints the visible modifier when initial scroll is past the threshold', () => {
    ensureRaf();
    // Component reads scrollTop on mount inside an effect, so seeding
    // before render lets the very first updateVisibility() observe the
    // already-scrolled state.
    setScrollTop(800);
    render(<BackTop visibilityHeight={100} />);

    const btn = screen.getByRole('button', { name: /back to top/i });
    expect(btn.className).toMatch(/su-backtop--visible/);
    expect(btn).not.toHaveAttribute('aria-hidden');
    expect(btn).toHaveAttribute('tabIndex', '0');
  });

  it('skips the scroll animation when consumer calls preventDefault on the click', async () => {
    ensureRaf();
    setScrollTop(800);
    const user = userEvent.setup();
    const onClick = vi.fn((event: { preventDefault: () => void }) => {
      event.preventDefault();
    });

    render(<BackTop visibilityHeight={100} onClick={onClick} />);

    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const btn = screen.getByRole('button', { name: /back to top/i });
    await user.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
    // preventDefault → animation skipped, scrollTo never invoked.
    expect(scrollSpy).not.toHaveBeenCalled();
    scrollSpy.mockRestore();
  });

  it('honors prefers-reduced-motion by jumping instantly via window.scrollTo', async () => {
    ensureRaf();
    setScrollTop(600);
    const user = userEvent.setup();

    // Force reduce-motion match. Restore at the end.
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (q: string) =>
      ({
        matches: q.includes('reduce'),
        media: q,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;

    try {
      render(<BackTop visibilityHeight={100} />);

      const scrollSpy = vi
        .spyOn(window, 'scrollTo')
        .mockImplementation(() => {});
      const btn = screen.getByRole('button', { name: /back to top/i });
      await user.click(btn);
      expect(scrollSpy).toHaveBeenCalledWith(0, 0);
      scrollSpy.mockRestore();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
