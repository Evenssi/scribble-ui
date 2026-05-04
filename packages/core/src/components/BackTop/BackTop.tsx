import * as React from 'react';
import { createPortal } from 'react-dom';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export interface BackTopProps {
  /**
   * Scroll distance (in px) past which the button fades in. Below this
   * threshold the button is visually hidden and removed from the tab
   * order. Defaults to `400`.
   */
  visibilityHeight?: number;

  /**
   * Getter that returns the scroll container to watch. When omitted
   * the component listens on `window` and scrolls `window` back to
   * the top. Use this to scope a BackTop to an `overflow: auto` pane.
   *
   * Must be a stable function for a given mount — BackTop only reads
   * it from inside effects, but swapping it at runtime will not
   * re-subscribe until the component remounts.
   */
  target?: () => HTMLElement | Window;

  /**
   * Click handler, fired *before* the scroll animation starts. If the
   * handler calls `event.preventDefault()` the scroll is skipped, so
   * consumers can implement their own scroll behavior (e.g. a custom
   * virtualized list's `scrollToIndex(0)`).
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Duration of the scroll-to-top animation in milliseconds. Defaults
   * to `480` — matches Carousel's release-snap for a consistent feel.
   * Users with `prefers-reduced-motion: reduce` always get an instant
   * jump regardless of this value.
   */
  duration?: number;

  /**
   * Replace the default hand-drawn up-arrow icon with custom content.
   * Passing a text node (`'↑'`) or a full `<svg>` both work — the
   * button itself still owns size, padding and the wobble filter.
   */
  children?: React.ReactNode;

  /**
   * Horizontal offset from the right edge of the portal container.
   * Numbers are treated as pixels; strings are passed through so you
   * can use `calc()` / `env()` / tokens. Defaults to `24`.
   */
  right?: number | string;

  /**
   * Vertical offset from the bottom edge of the portal container.
   * Defaults to `24`.
   */
  bottom?: number | string;

  /**
   * DOM node the button is portalled into. Defaults to
   * `document.body`. When you pass a scrollable container here, make
   * sure it has `position: relative` (or any non-static positioning)
   * so the button's fixed-style offsets resolve against it.
   */
  container?: HTMLElement | null;

  /**
   * Accessible label for the icon-only button. Defaults to
   * `'Back to top'`.
   */
  'aria-label'?: string;

  /**
   * Optional extra className appended to the built-in `su-backtop`.
   */
  className?: string;

  /**
   * Optional inline style applied to the button. Offsets set via
   * `right` / `bottom` take precedence but any other rule passes
   * through.
   */
  style?: React.CSSProperties;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** easeOutCubic — decelerating curve used for the scroll animation. */
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Read the current scrollTop of a window or element uniformly. */
function readScrollTop(node: HTMLElement | Window): number {
  if (node === window) {
    // `scrollY` is the modern name; fall back for older engines.
    return window.scrollY || document.documentElement.scrollTop || 0;
  }
  return (node as HTMLElement).scrollTop;
}

/** Write scrollTop to a window or element uniformly. */
function writeScrollTop(node: HTMLElement | Window, value: number): void {
  if (node === window) {
    window.scrollTo(0, value);
  } else {
    (node as HTMLElement).scrollTop = value;
  }
}

/** Default hand-drawn up arrow used when no children are provided. */
function DefaultArrow(): JSX.Element {
  return (
    <svg
      className="su-backtop__icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 19V6M6 12l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * BackTop — a floating button that scrolls its target back to the top.
 *
 * - Portals into `container` (default: `document.body`) so it escapes
 *   any clipping ancestor and sits above ordinary page content.
 * - Watches `target()` (default: `window`) for scroll and fades in
 *   once the distance crosses `visibilityHeight`. scroll listener is
 *   rAF-throttled so it stays cheap even on long pages.
 * - On click, runs a requestAnimationFrame-based easeOutCubic scroll
 *   back to the top, with `duration` configurable. Users with
 *   `prefers-reduced-motion: reduce` jump instantly instead.
 * - While hidden, the button is `visibility: hidden` + `pointer-events: none`
 *   so it cannot be tabbed to by keyboard users.
 *
 * Nothing is rendered during SSR / before the first `useEffect`.
 */
export const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  target,
  onClick,
  duration = 480,
  children,
  right = 24,
  bottom = 24,
  container,
  'aria-label': ariaLabel = 'Back to top',
  className,
  style,
}) => {
  // SSR / portal mount guard: we can only touch `document` after mount.
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  // Hold the in-flight rAF id so we can cancel on unmount / re-click.
  const scrollRafRef = React.useRef<number | null>(null);
  const scheduledRafRef = React.useRef<number | null>(null);

  // Stash `target` in a ref so the scroll effect doesn't re-subscribe
  // every render just because the consumer passed a fresh arrow fn.
  const targetRef = React.useRef(target);
  React.useEffect(() => {
    targetRef.current = target;
  }, [target]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Subscribe to scroll on the resolved target.
  React.useEffect(() => {
    if (!mounted) return;

    const resolved: HTMLElement | Window =
      (targetRef.current ? targetRef.current() : undefined) ?? window;

    // Seed visibility with the initial scroll position so the button
    // can appear immediately when mounted on an already-scrolled page.
    const updateVisibility = () => {
      scheduledRafRef.current = null;
      const top = readScrollTop(resolved);
      setVisible(top > visibilityHeight);
    };

    const onScroll = () => {
      // rAF throttle: coalesce bursts of scroll events into one paint.
      if (scheduledRafRef.current !== null) return;
      scheduledRafRef.current = window.requestAnimationFrame(updateVisibility);
    };

    // Initial read (covers hot reload / revisiting a scrolled page).
    updateVisibility();

    resolved.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      resolved.removeEventListener('scroll', onScroll);
      if (scheduledRafRef.current !== null) {
        window.cancelAnimationFrame(scheduledRafRef.current);
        scheduledRafRef.current = null;
      }
    };
  }, [mounted, visibilityHeight]);

  // Cancel any in-flight scroll animation on unmount.
  React.useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, []);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const resolved: HTMLElement | Window =
        (targetRef.current ? targetRef.current() : undefined) ?? window;

      // Respect user motion preferences — instant jump is the safer
      // option for vestibular triggers.
      const reduceMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const start = readScrollTop(resolved);
      if (start <= 0) return;

      if (reduceMotion || duration <= 0) {
        writeScrollTop(resolved, 0);
        return;
      }

      // Cancel any previous in-flight animation so double-clicks don't
      // fight each other for the same scroll position.
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }

      const t0 =
        typeof performance !== 'undefined' && performance.now
          ? performance.now()
          : Date.now();

      const step = () => {
        const now =
          typeof performance !== 'undefined' && performance.now
            ? performance.now()
            : Date.now();
        const elapsed = now - t0;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);
        const next = start - start * eased;
        writeScrollTop(resolved, Math.max(0, next));
        if (progress < 1) {
          scrollRafRef.current = window.requestAnimationFrame(step);
        } else {
          scrollRafRef.current = null;
        }
      };

      scrollRafRef.current = window.requestAnimationFrame(step);
    },
    [duration, onClick]
  );

  if (!mounted) return null;

  // Resolve portal host. We prefer the explicit `container`, fall back
  // to `document.body`. `null` means "not ready" so we bail out.
  const fallbackHost =
    typeof document !== 'undefined' ? document.body : null;
  const host = container ?? fallbackHost;
  if (!host) return null;

  // When portalled into anything other than <body> we switch to
  // `position: absolute` so the offsets resolve against that custom
  // container (which only needs `position: relative`). The default
  // `position: fixed` branch is used for window-level BackTop.
  const isScoped = host !== fallbackHost;

  const buttonStyle: React.CSSProperties = {
    right: typeof right === 'number' ? `${right}px` : right,
    bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
    ...style,
  };

  const node = (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? 0 : -1}
      className={cx(
        'su-backtop',
        isScoped && 'su-backtop--scoped',
        visible && 'su-backtop--visible',
        className
      )}
      style={buttonStyle}
      onClick={handleClick}
    >
      {children ?? <DefaultArrow />}
    </button>
  );

  return createPortal(node, host);
};

BackTop.displayName = 'BackTop';
