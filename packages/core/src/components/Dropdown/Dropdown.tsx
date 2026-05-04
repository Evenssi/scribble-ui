import * as React from 'react';
import { createPortal } from 'react-dom';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the bundled stylesheet at the app root:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top'
  | 'right-start'
  | 'left-start';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

export interface DropdownMenuItem {
  key: string;
  label: React.ReactNode;
  /** Left-side icon slot. */
  icon?: React.ReactNode;
  /** Right-side auxiliary info (shortcut hints, badges, etc). */
  extra?: React.ReactNode;
  disabled?: boolean;
  /** Red-tinted destructive variant. */
  danger?: boolean;
  /**
   * Activation handler. After the callback runs the menu auto-closes,
   * unless the consumer called `event.preventDefault()`.
   */
  onClick?: (
    event:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
  ) => void;
}

export interface DropdownMenuDivider {
  type: 'divider';
  key: string;
}

export type DropdownMenuEntry = DropdownMenuItem | DropdownMenuDivider;

export interface DropdownProps {
  /** Menu definition (items + optional dividers). */
  menu: DropdownMenuEntry[];
  /**
   * The trigger node. Must be a single React element that can accept a
   * ref plus click / keydown handlers (e.g. a `<Button>` or an `<a>`).
   */
  children: React.ReactElement;
  /** Interaction that opens the menu. Defaults to `'click'`. */
  trigger?: DropdownTrigger;
  /** Preferred placement. Auto-flips on overflow. Defaults to `'bottom-start'`. */
  placement?: DropdownPlacement;
  /** Pixel gap between the trigger and the menu. Defaults to `8`. */
  offset?: number;
  /**
   * Disable the whole dropdown. The trigger still renders and remains
   * focusable, but no interaction opens the menu.
   */
  disabled?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Fires for every attempted open/close (controlled or not). */
  onOpenChange?: (open: boolean) => void;
  /** Portal container. Defaults to `document.body`. */
  container?: HTMLElement | null;
  /** Class name passed through to the menu root. */
  menuClassName?: string;
  /** Inline style passed through to the menu root. */
  menuStyle?: React.CSSProperties;
  /**
   * Refs to elements that should NOT be treated as "outside" clicks —
   * pointer-down events landing on (or inside) these elements will not
   * auto-close the menu.
   *
   * Typical use: an external toggle button that drives `open` in
   * controlled mode. Without this, the button's `mousedown` would be
   * caught by the menu's document-level click-outside listener (which
   * runs in the capture phase, before React's `onClick`), causing the
   * menu to close right before the toggle re-opens — producing a
   * "can't close / out-of-sync" feel.
   */
  clickOutsideIgnore?: ReadonlyArray<React.RefObject<HTMLElement | null>>;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let dropdownIdCounter = 0;
const nextDropdownId = (): string => `su-dropdown-${++dropdownIdCounter}`;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const VIEWPORT_PADDING = 8;
const HOVER_OPEN_DELAY = 100;
const HOVER_CLOSE_DELAY = 200;

/**
 * Flip table for the primary axis. For `-start` / `-end` variants we
 * only flip the main axis (top <-> bottom, left <-> right) and keep
 * the alignment side, which matches user expectations best.
 */
const FLIP: Record<DropdownPlacement, DropdownPlacement> = {
  'bottom-start': 'top-start',
  'bottom-end': 'top-end',
  bottom: 'top',
  'top-start': 'bottom-start',
  'top-end': 'bottom-end',
  top: 'bottom',
  'right-start': 'left-start',
  'left-start': 'right-start',
};

interface MenuPosition {
  top: number;
  left: number;
  placement: DropdownPlacement;
}

/** Anchor rect the menu is positioned against. */
interface AnchorRect {
  top: number;
  left: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
}

function rectFromDOMRect(r: DOMRect): AnchorRect {
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
    right: r.right,
    bottom: r.bottom,
  };
}

/** Degenerate rect for a point (contextMenu anchor). */
function rectFromPoint(x: number, y: number): AnchorRect {
  return { top: y, left: x, width: 0, height: 0, right: x, bottom: y };
}

/**
 * Compute an absolute (page-coordinate) position for the menu given
 * an anchor rect and a preferred placement. Auto-flips on the main
 * axis when the preferred side would overflow; clamps on the
 * perpendicular axis so the menu never escapes the viewport.
 */
function computePosition(
  anchor: AnchorRect,
  menuSize: { width: number; height: number },
  preferred: DropdownPlacement,
  offset: number
): MenuPosition {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const candidates: DropdownPlacement[] = [preferred, FLIP[preferred]];

  for (const placement of candidates) {
    let top = 0;
    let left = 0;
    let fits = true;

    if (
      placement === 'bottom' ||
      placement === 'bottom-start' ||
      placement === 'bottom-end'
    ) {
      top = anchor.bottom + offset;
      if (placement === 'bottom-start') {
        left = anchor.left;
      } else if (placement === 'bottom-end') {
        left = anchor.right - menuSize.width;
      } else {
        left = anchor.left + anchor.width / 2 - menuSize.width / 2;
      }
      if (top + menuSize.height > vh - VIEWPORT_PADDING) fits = false;
    } else if (
      placement === 'top' ||
      placement === 'top-start' ||
      placement === 'top-end'
    ) {
      top = anchor.top - menuSize.height - offset;
      if (placement === 'top-start') {
        left = anchor.left;
      } else if (placement === 'top-end') {
        left = anchor.right - menuSize.width;
      } else {
        left = anchor.left + anchor.width / 2 - menuSize.width / 2;
      }
      if (top < VIEWPORT_PADDING) fits = false;
    } else if (placement === 'right-start') {
      top = anchor.top;
      left = anchor.right + offset;
      if (left + menuSize.width > vw - VIEWPORT_PADDING) fits = false;
    } else {
      // left-start
      top = anchor.top;
      left = anchor.left - menuSize.width - offset;
      if (left < VIEWPORT_PADDING) fits = false;
    }

    if (fits || placement === candidates[candidates.length - 1]) {
      // Clamp on the perpendicular axis so the menu stays on screen
      // even when the trigger is close to an edge.
      const isVerticalAxis =
        placement.startsWith('top') || placement.startsWith('bottom');
      if (isVerticalAxis) {
        const minLeft = VIEWPORT_PADDING;
        const maxLeft = vw - menuSize.width - VIEWPORT_PADDING;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
      } else {
        const minTop = VIEWPORT_PADDING;
        const maxTop = vh - menuSize.height - VIEWPORT_PADDING;
        if (top < minTop) top = minTop;
        if (top > maxTop) top = maxTop;
      }
      return {
        top: top + scrollY,
        left: left + scrollX,
        placement,
      };
    }
  }

  return { top: 0, left: 0, placement: preferred };
}

/**
 * Type guard that distinguishes real menu items from dividers. Keeping
 * this in one place means the keyboard navigation code below doesn't
 * have to pepper `'type' in entry` checks everywhere.
 */
function isItem(entry: DropdownMenuEntry): entry is DropdownMenuItem {
  return !('type' in entry) || entry.type !== 'divider';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Dropdown — a click/hover/context menu anchored to an arbitrary trigger.
 *
 * Positioning is hand-rolled rather than delegated to `<Popover>` for
 * three reasons: (1) we need 8 placements incl. `-start` / `-end`,
 * (2) contextMenu mode anchors to pointer coordinates instead of a
 * DOM rect, and (3) the ARIA contract here is `role="menu"` +
 * `aria-haspopup="menu"` rather than Popover's dialog semantics.
 *
 * Keyboard model:
 *   - ArrowDown / ArrowUp: move highlight (skip disabled, wraps).
 *   - Home / End: jump to first / last enabled.
 *   - Enter / Space: activate highlighted item and close.
 *   - Escape: close and return focus to the trigger.
 *   - Tab: close and let focus move naturally (no focus trap — a menu
 *     is not a modal).
 *
 * Inside the portal we use roving tabindex (active item `tabindex=0`,
 * others `-1`), mirroring the Tabs implementation.
 */
export function Dropdown({
  menu,
  children,
  trigger = 'click',
  placement = 'bottom-start',
  offset = 8,
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  container,
  menuClassName,
  menuStyle,
  clickOutsideIgnore,
}: DropdownProps) {
  // --- open state ----------------------------------------------------------
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? !!openProp : uncontrolledOpen;

  const setOpenState = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // --- ids -----------------------------------------------------------------
  const idBaseRef = React.useRef<string | null>(null);
  if (idBaseRef.current === null) idBaseRef.current = nextDropdownId();
  const idBase = idBaseRef.current;
  const menuId = `${idBase}-menu`;
  const triggerId = `${idBase}-trigger`;

  // --- refs ----------------------------------------------------------------
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Map<string, HTMLButtonElement | null>>(
    new Map()
  );

  // --- mount gate for portal (SSR-safe) -----------------------------------
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // --- anchor rect (trigger rect OR pointer coords for contextMenu) -------
  const [anchor, setAnchor] = React.useState<AnchorRect | null>(null);

  // --- position ------------------------------------------------------------
  const [position, setPosition] = React.useState<MenuPosition>({
    top: 0,
    left: 0,
    placement,
  });

  // --- highlight (active item) --------------------------------------------
  // The key of the currently highlighted item; `null` means "nothing
  // highlighted yet". Used for roving tabindex + keyboard activation.
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  // List of enabled item keys in DOM order. Recomputed from `menu` on
  // every render — cheap, and it keeps keyboard nav in sync when the
  // consumer updates the menu.
  const enabledKeys = React.useMemo(
    () =>
      menu
        .filter((e): e is DropdownMenuItem => isItem(e) && !e.disabled)
        .map((e) => e.key),
    [menu]
  );

  // When the menu opens, start with the first enabled item highlighted.
  React.useEffect(() => {
    if (!open) {
      setActiveKey(null);
      return;
    }
    setActiveKey(enabledKeys[0] ?? null);
  }, [open, enabledKeys]);

  // Focus the active item after it renders, so ArrowDown/ArrowUp work
  // from the very first keypress even though we just portalled in.
  // We gate on `anchor` being ready too, because the surface only
  // mounts once we have a real position.
  //
  // `preventScroll: true` is critical: on the very first open of a
  // controlled Dropdown, there's a brief intermediate frame where the
  // surface has been portalled but `position` still holds the initial
  // (0,0) from useState — a vanilla `focus()` would scroll the page
  // to the top of the document trying to bring that (0,0) node into
  // view. The menu is portalled and positioned absolutely, so we
  // never want focusing an item to move the viewport anyway.
  React.useEffect(() => {
    if (!open || !activeKey || !anchor) return;
    const node = itemRefs.current.get(activeKey);
    node?.focus({ preventScroll: true });
  }, [open, activeKey, anchor]);

  // --- hover delay timers --------------------------------------------------
  const openTimerRef = React.useRef<number | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  const clearTimers = React.useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  React.useEffect(() => clearTimers, [clearTimers]);

  // --- opener helpers ------------------------------------------------------
  const openFromTriggerRect = React.useCallback(() => {
    const node = triggerRef.current;
    if (!node) return;
    setAnchor(rectFromDOMRect(node.getBoundingClientRect()));
    setOpenState(true);
  }, [setOpenState]);

  const openFromPoint = React.useCallback(
    (x: number, y: number) => {
      setAnchor(rectFromPoint(x, y));
      setOpenState(true);
    },
    [setOpenState]
  );

  const close = React.useCallback(
    (returnFocusToTrigger = false) => {
      clearTimers();
      setOpenState(false);
      if (returnFocusToTrigger) {
        // Defer so we don't steal focus from an element that's about
        // to be unmounted on the same tick.
        window.setTimeout(() => {
          const node = triggerRef.current;
          if (node && typeof (node as HTMLElement).focus === 'function') {
            (node as HTMLElement).focus();
          }
        }, 0);
      }
    },
    [clearTimers, setOpenState]
  );

  // --- hover schedule ------------------------------------------------------
  const scheduleOpen = React.useCallback(() => {
    if (disabled) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (open) return;
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      openFromTriggerRect();
    }, HOVER_OPEN_DELAY);
  }, [disabled, open, openFromTriggerRect]);

  const scheduleClose = React.useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (!open) return;
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setOpenState(false);
    }, HOVER_CLOSE_DELAY);
  }, [open, setOpenState]);

  // --- ESC key -------------------------------------------------------------
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  // --- click outside -------------------------------------------------------
  // We mirror `clickOutsideIgnore` into a ref so the document listener
  // always sees the latest list without having to re-attach on every
  // render (consumers typically pass a fresh array literal each time).
  const ignoreRefsRef = React.useRef(clickOutsideIgnore);
  React.useEffect(() => {
    ignoreRefsRef.current = clickOutsideIgnore;
  }, [clickOutsideIgnore]);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inTrigger = triggerRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (inTrigger || inMenu) return;
      // Consumer-declared "not really outside" elements (e.g. an
      // external toggle button that owns the gesture). Checked after
      // trigger/menu because those are the common case.
      const ignoreList = ignoreRefsRef.current;
      if (ignoreList) {
        for (const ref of ignoreList) {
          const node = ref.current;
          if (node && node.contains(target)) return;
        }
      }
      close(false);
    };
    document.addEventListener('mousedown', onPointerDown, true);
    return () =>
      document.removeEventListener('mousedown', onPointerDown, true);
  }, [open, close]);

  // --- compute position on open + on scroll/resize/content change ----------
  // On scroll/resize we re-read the trigger's live bounding rect so the
  // menu follows it. The `anchor` state is still the gate for rendering
  // the surface (and the cached source of truth for contextMenu's point
  // anchor, where there's no trigger rect to re-measure).
  const updatePosition = React.useCallback(() => {
    if (!anchor) return;
    const menuEl = menuRef.current;
    if (!menuEl) return;
    const menuRect = menuEl.getBoundingClientRect();
    // Rect anchors (click/hover/keyboard) come from the trigger DOM node
    // and need to be re-measured on scroll. Point anchors (contextMenu)
    // have width=height=0 and must be used verbatim — re-measuring the
    // trigger would move the menu away from the click location.
    const liveAnchor =
      anchor.width > 0 && triggerRef.current
        ? rectFromDOMRect(triggerRef.current.getBoundingClientRect())
        : anchor;
    setPosition(
      computePosition(
        liveAnchor,
        { width: menuRect.width, height: menuRect.height },
        placement,
        offset
      )
    );
  }, [anchor, placement, offset]);

  // When `open` is driven externally (e.g. by a consumer flipping the
  // `open` prop) we never went through openFromTriggerRect/openFromPoint,
  // so `anchor` is still null. Derive the anchor from the trigger rect
  // synchronously in a layout effect. We intentionally do NOT render
  // the menu surface when open && anchor==null (see the surface render
  // below) so users never see a stray (0,0) frame or get their page
  // scroll-jumped when we focus the first menu item.
  useIsomorphicLayoutEffect(() => {
    if (!open || anchor) return;
    const node = triggerRef.current;
    if (!node) return;
    setAnchor(rectFromDOMRect(node.getBoundingClientRect()));
  }, [open, anchor]);

  // Clear the stale anchor on close so the next external-open pass
  // re-measures instead of reusing last session's pointer coords (which
  // would be wrong for contextMenu triggers especially).
  React.useEffect(() => {
    if (!open) setAnchor(null);
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition, menu]);

  React.useEffect(() => {
    if (!open) return;
    const measure = () => updatePosition();
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      if (menuRef.current) ro.observe(menuRef.current);
      // Only observe the trigger when we're anchored to it (not for
      // contextMenu's point anchor, where the trigger rect is moot).
      if (triggerRef.current && anchor && anchor.width > 0) {
        ro.observe(triggerRef.current);
      }
    }
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [open, anchor, updatePosition]);

  // --- keyboard navigation (on the menu root) -----------------------------
  const moveHighlight = React.useCallback(
    (direction: 1 | -1) => {
      if (enabledKeys.length === 0) return;
      const currentIdx = activeKey ? enabledKeys.indexOf(activeKey) : -1;
      const nextIdx =
        currentIdx === -1
          ? direction === 1
            ? 0
            : enabledKeys.length - 1
          : (currentIdx + direction + enabledKeys.length) % enabledKeys.length;
      const next = enabledKeys[nextIdx];
      if (next) setActiveKey(next);
    },
    [activeKey, enabledKeys]
  );

  const handleMenuKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          moveHighlight(1);
          return;
        case 'ArrowUp':
          event.preventDefault();
          moveHighlight(-1);
          return;
        case 'Home':
          event.preventDefault();
          if (enabledKeys[0]) setActiveKey(enabledKeys[0]);
          return;
        case 'End': {
          event.preventDefault();
          const last = enabledKeys[enabledKeys.length - 1];
          if (last) setActiveKey(last);
          return;
        }
        case 'Escape':
          event.preventDefault();
          close(true);
          return;
        case 'Tab':
          // Let focus move naturally; menu is not a focus trap.
          close(false);
          return;
        default:
          return;
      }
    },
    [moveHighlight, enabledKeys, close]
  );

  // --- item activation -----------------------------------------------------
  const activateItem = React.useCallback(
    (
      item: DropdownMenuItem,
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      item.onClick?.(event);
      if (event.defaultPrevented) return;
      close(false);
    },
    [close]
  );

  // --- trigger handler composition ----------------------------------------
  type AnyHandler = ((e: unknown) => void) | undefined;
  const composeHandler = <E extends React.SyntheticEvent>(
    original: AnyHandler,
    ours: (event: E) => void
  ) => {
    return (event: E) => {
      if (original) (original as (e: E) => void)(event);
      if (event.defaultPrevented) return;
      ours(event);
    };
  };

  const childProps = children.props as Record<string, unknown>;

  const onTriggerClick = React.useCallback(() => {
    if (disabled || trigger !== 'click') return;
    clearTimers();
    if (open) {
      close(false);
    } else {
      openFromTriggerRect();
    }
  }, [disabled, trigger, open, close, openFromTriggerRect, clearTimers]);

  const onTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled || trigger === 'contextMenu') return;
      // Open on Enter / Space / ArrowDown / ArrowUp for keyboard users,
      // regardless of whether the trigger is a click or hover target
      // (keyboards can't hover). This mirrors Select's opener contract.
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        if (!open) {
          event.preventDefault();
          openFromTriggerRect();
        }
      }
    },
    [disabled, trigger, open, openFromTriggerRect]
  );

  const onTriggerContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled || trigger !== 'contextMenu') return;
      // Suppress the native right-click menu so our menu can own the
      // gesture. Anchor the menu at the pointer location instead of
      // the trigger's bounding rect.
      event.preventDefault();
      clearTimers();
      openFromPoint(event.clientX, event.clientY);
    },
    [disabled, trigger, openFromPoint, clearTimers]
  );

  const triggerHandlers: Record<string, unknown> = {};
  if (trigger === 'click') {
    triggerHandlers.onClick = composeHandler(
      childProps.onClick as AnyHandler,
      onTriggerClick
    );
    triggerHandlers.onKeyDown = composeHandler(
      childProps.onKeyDown as AnyHandler,
      onTriggerKeyDown
    );
  } else if (trigger === 'hover') {
    triggerHandlers.onMouseEnter = composeHandler(
      childProps.onMouseEnter as AnyHandler,
      scheduleOpen
    );
    triggerHandlers.onMouseLeave = composeHandler(
      childProps.onMouseLeave as AnyHandler,
      scheduleClose
    );
    // Keyboard escape hatch: space / enter still opens when the user
    // focuses a hover-only trigger via Tab.
    triggerHandlers.onKeyDown = composeHandler(
      childProps.onKeyDown as AnyHandler,
      onTriggerKeyDown
    );
  } else {
    // contextMenu
    triggerHandlers.onContextMenu = composeHandler(
      childProps.onContextMenu as AnyHandler,
      onTriggerContextMenu
    );
  }

  // a11y on the trigger
  const triggerAria: Record<string, unknown> = {
    id: (childProps.id as string | undefined) ?? triggerId,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
  };
  if (open) triggerAria['aria-controls'] = menuId;

  // Merge our ref onto the child so we can measure + return focus
  // without clobbering a ref the consumer may have already set.
  const mergedRef = React.useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node;
      const childRef = (
        children as unknown as { ref?: React.Ref<HTMLElement> }
      ).ref;
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    },
    [children]
  );

  const clonedTrigger = React.cloneElement(children, {
    ref: mergedRef,
    ...triggerAria,
    ...triggerHandlers,
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

  // --- menu surface (portalled) -------------------------------------------

  // Hover grace period: keep the menu alive while the cursor is inside
  // it; re-arm the close timer when the cursor leaves.
  const surfaceHoverHandlers: Record<string, unknown> = {};
  if (trigger === 'hover') {
    surfaceHoverHandlers.onMouseEnter = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
    surfaceHoverHandlers.onMouseLeave = scheduleClose;
  }

  const portalTarget =
    container === undefined ? (mounted ? document.body : null) : container;

  const surface =
    mounted && open && anchor && portalTarget
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            tabIndex={-1}
            aria-labelledby={triggerId}
            onKeyDown={handleMenuKeyDown}
            className={cx(
              'su-dropdown',
              `su-dropdown--${position.placement}`,
              menuClassName
            )}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              ...menuStyle,
            }}
            {...surfaceHoverHandlers}
          >
            <ul className="su-dropdown__list" role="none">
              {menu.map((entry) => {
                if (!isItem(entry)) {
                  return (
                    <li
                      key={entry.key}
                      role="separator"
                      className="su-dropdown__divider"
                    />
                  );
                }
                const isActive = entry.key === activeKey;
                return (
                  <li key={entry.key} role="none">
                    <button
                      ref={(node) => {
                        if (node) {
                          itemRefs.current.set(entry.key, node);
                        } else {
                          itemRefs.current.delete(entry.key);
                        }
                      }}
                      type="button"
                      role="menuitem"
                      tabIndex={isActive ? 0 : -1}
                      aria-disabled={entry.disabled || undefined}
                      data-active={isActive || undefined}
                      className={cx(
                        'su-dropdown__item',
                        entry.danger && 'su-dropdown__item--danger',
                        entry.disabled && 'su-dropdown__item--disabled',
                        isActive && 'su-dropdown__item--active'
                      )}
                      onClick={(event) => activateItem(entry, event)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          activateItem(entry, event);
                        }
                      }}
                      onMouseEnter={() => {
                        if (!entry.disabled) setActiveKey(entry.key);
                      }}
                    >
                      {entry.icon != null && (
                        <span
                          className="su-dropdown__item-icon"
                          aria-hidden="true"
                        >
                          {entry.icon}
                        </span>
                      )}
                      <span className="su-dropdown__item-label">
                        {entry.label}
                      </span>
                      {entry.extra != null && (
                        <span className="su-dropdown__item-extra">
                          {entry.extra}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>,
          portalTarget
        )
      : null;

  return (
    <>
      {clonedTrigger}
      {surface}
    </>
  );
}

Dropdown.displayName = 'Dropdown';
