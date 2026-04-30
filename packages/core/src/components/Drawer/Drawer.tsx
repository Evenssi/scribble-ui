import * as React from 'react';
import { createPortal } from 'react-dom';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  /**
   * Controls whether the drawer is rendered. When `false`, nothing is
   * portalled and no scroll lock is applied.
   */
  open: boolean;

  /**
   * Called when the user attempts to close the drawer: ESC key,
   * overlay click (when `closeOnOverlayClick`), or the built-in close
   * button (when `showCloseButton`). Always wire this to flip your
   * `open` state.
   */
  onClose: () => void;

  /**
   * Which side the drawer slides in from. Defaults to `'right'`.
   * - `'left' | 'right'` panels span full viewport height; the `size`
   *   token controls width.
   * - `'top' | 'bottom'` panels span full viewport width; the `size`
   *   token controls height.
   */
  placement?: DrawerPlacement;

  /**
   * Size preset.
   * - For `'left' | 'right'`: width = sm 300px / md 420px / lg 560px.
   * - For `'top' | 'bottom'`: height = sm 200px / md 320px / lg 460px.
   *
   * Defaults to `'md'`.
   */
  size?: DrawerSize;

  /**
   * Slot rendered above the body, separated by a dashed divider.
   * If a string is provided it is wrapped in an `<h2 id="…">` and
   * automatically wired to the dialog's `aria-labelledby`. If you
   * pass a `ReactNode`, supply `aria-labelledby` yourself for the
   * tightest a11y story.
   */
  header?: React.ReactNode;

  /**
   * Slot rendered below the body, separated by a dashed divider.
   * Typical usage: action buttons aligned to the right.
   */
  footer?: React.ReactNode;

  /**
   * Render a built-in `✕` button in the top-right corner.
   * Defaults to `true`.
   */
  showCloseButton?: boolean;

  /**
   * Close the drawer when the overlay (the dimmed backdrop area
   * outside the panel) is clicked. Defaults to `true`.
   */
  closeOnOverlayClick?: boolean;

  /**
   * Close the drawer when the user presses the Escape key.
   * Defaults to `true`.
   */
  closeOnEscape?: boolean;

  /**
   * Optional explicit `aria-labelledby` id. Overrides the auto-wired
   * id derived from a string `header`.
   */
  'aria-labelledby'?: string;

  /**
   * Optional `aria-describedby` id pointing at body text.
   */
  'aria-describedby'?: string;

  /**
   * Optional extra className appended to the panel.
   */
  className?: string;

  /**
   * Drawer body. Rendered inside `.su-drawer__body`.
   */
  children?: React.ReactNode;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let drawerIdCounter = 0;
const nextDrawerId = (): string => `su-drawer-${++drawerIdCounter}`;

// Selector covering everything that can normally take focus.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isVisible = (el: HTMLElement): boolean => {
  // Skip hidden subtrees — display:none / visibility:hidden / detached.
  if (!el.offsetParent && el.tagName !== 'BODY') {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
  }
  return true;
};

const getFocusable = (root: HTMLElement): HTMLElement[] => {
  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );
  return nodes.filter(isVisible);
};

/**
 * Drawer — a side-anchored, focus-trapped dialog rendered into
 * `document.body`.
 *
 * - Portals into `document.body` so it escapes any clipping ancestor.
 * - Locks `<body>` scroll while open (and restores the previous value
 *   exactly, including any inline `overflow` set by the host app).
 * - Traps focus inside the panel: Tab / Shift+Tab cycle within the
 *   focusable elements; first focusable element is auto-focused on open.
 * - Restores focus to whatever was focused before the drawer opened.
 * - Closes on ESC and on overlay click by default; both can be opted out.
 * - Slides in from `placement` (`'left' | 'right' | 'top' | 'bottom'`)
 *   with a CSS keyframe animation that respects `prefers-reduced-motion`.
 *
 * Required props: `open`, `onClose`. Everything else is optional.
 */
export function Drawer({
  open,
  onClose,
  placement = 'right',
  size = 'md',
  header,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  'aria-labelledby': ariaLabelledByProp,
  'aria-describedby': ariaDescribedBy,
  className,
  children,
}: DrawerProps) {
  // Stable id for auto-wiring `<h2 id>` ↔ `aria-labelledby` when the
  // caller passes a string `header`.
  const autoLabelId = React.useMemo(() => `${nextDrawerId()}-title`, []);
  const headerIsString = typeof header === 'string';
  const ariaLabelledBy =
    ariaLabelledByProp ?? (headerIsString ? autoLabelId : undefined);

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  // Element that had focus right before the drawer opened — we restore
  // focus to it on close so keyboard users return to where they were.
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // SSR guard: only allow the portal after mount, otherwise
  // `document.body` doesn't exist.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock: snapshot the previous inline value and restore it
  // exactly, so we don't clobber a host app that already manages it.
  React.useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  // Remember who had focus before opening, restore on close/unmount.
  React.useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current =
      (document.activeElement as HTMLElement | null) ?? null;
    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function') {
        prev.focus();
      }
    };
  }, [open]);

  // Auto-focus the first focusable element inside the panel on open;
  // fall back to the panel itself (which has tabIndex={-1}) so keyboard
  // users always start inside the drawer.
  React.useEffect(() => {
    if (!open) return;
    // Defer to the next frame so the portal subtree is mounted and
    // the inert `display:none` ancestors (if any) have flushed.
    const id = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = getFocusable(panel);
      const target = focusables[0] ?? panel;
      target.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // ESC + Tab focus trap.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = getFocusable(panel);
        if (focusables.length === 0) {
          // Nothing to land on — keep focus pinned to the panel.
          event.preventDefault();
          panel.focus();
          return;
        }
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement as HTMLElement | null;
        // Wrap focus at the boundaries; otherwise let the browser
        // handle the move natively so accessibility trees stay sane.
        if (event.shiftKey) {
          if (active === first || !panel.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !panel.contains(active)) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (!mounted || !open) return null;

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only fire when the press *starts* on the overlay itself, not on a
    // child that bubbles up. Prevents drag-released-outside flicker.
    if (event.target !== event.currentTarget) return;
    if (!closeOnOverlayClick) return;
    onClose();
  };

  const panel = (
    <div
      className={cx('su-drawer__overlay', `su-drawer__overlay--${placement}`)}
      onMouseDown={handleOverlayMouseDown}
      data-su-drawer-overlay=""
    >
      <div
        ref={panelRef}
        className={cx(
          'su-drawer',
          `su-drawer--${placement}`,
          `su-drawer--${size}`,
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            type="button"
            className="su-drawer__close"
            aria-label="Close drawer"
            onClick={onClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        )}

        {header !== undefined && header !== null && (
          <div className="su-drawer__header">
            {headerIsString ? (
              <h2 id={autoLabelId} className="su-drawer__title">
                {header}
              </h2>
            ) : (
              header
            )}
          </div>
        )}

        <div className="su-drawer__body">{children}</div>

        {footer !== undefined && footer !== null && (
          <div className="su-drawer__footer">{footer}</div>
        )}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

Drawer.displayName = 'Drawer';
