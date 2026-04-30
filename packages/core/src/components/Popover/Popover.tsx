import * as React from 'react';
import { createPortal } from 'react-dom';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface PopoverProps {
  /**
   * The interactive body of the popover (rich content allowed: links,
   * inputs, buttons, etc). When falsy (`null` / `undefined` / `false`)
   * the popover is treated as disabled and never opens.
   */
  content: React.ReactNode;

  /**
   * Optional header title. When provided, it is rendered in a dedicated
   * header region and wired up via `aria-labelledby` on the dialog root.
   */
  title?: React.ReactNode;

  /**
   * Optional footer slot — typically a row of action buttons such as
   * `Cancel` / `Confirm`. Rendered only when truthy.
   */
  footer?: React.ReactNode;

  /**
   * The element that owns the popover. Must be a single React element
   * that can receive a ref and DOM event handlers (e.g. a `<button>`).
   * Popover injects handlers + `aria-haspopup` / `aria-expanded` /
   * `aria-controls` via `cloneElement`.
   *
   * If your trigger is `disabled`, set `wrapDisabledTrigger` so the
   * events are captured on a `<span>` wrapper instead.
   */
  children: React.ReactElement;

  /**
   * One or more triggers — string or array. `'manual'` disables all
   * built-in triggers; combine with `open` for fully controlled use.
   * Defaults to `'click'` (popover is generally too heavy for hover).
   */
  trigger?: PopoverTrigger | PopoverTrigger[];

  /**
   * Preferred placement. Auto-flips to the opposite side when there is
   * not enough room in the viewport. Defaults to `'bottom'`.
   */
  placement?: PopoverPlacement;

  /**
   * Distance in pixels between the trigger edge and the popover.
   * Defaults to 12 (slightly larger than Tooltip's 10 — popovers are
   * heavier surfaces and benefit from a bit more breathing room).
   */
  offset?: number;

  /**
   * Controlled open state. Pair with `onOpenChange`. When omitted the
   * popover manages its own state.
   */
  open?: boolean;

  /**
   * Default open state in uncontrolled mode. Defaults to `false`.
   */
  defaultOpen?: boolean;

  /**
   * Notified whenever the popover wants to open or close. Always fires
   * for both controlled and uncontrolled usage.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Close the popover when the user presses Escape. Defaults to true.
   */
  closeOnEsc?: boolean;

  /**
   * Close the popover when the user clicks outside both the trigger and
   * the popover surface. Defaults to true.
   */
  closeOnClickOutside?: boolean;

  /**
   * Show the small hand-drawn arrow pointing at the trigger.
   * Defaults to true.
   */
  showArrow?: boolean;

  /**
   * Hover-mode delay before opening, in milliseconds. Defaults to 100.
   */
  openDelay?: number;

  /**
   * Hover-mode delay before closing, in milliseconds. Defaults to 150
   * — long enough to give users a "grace period" to drift between the
   * trigger and the popover surface without the popover snapping shut.
   */
  closeDelay?: number;

  /**
   * Wrap the trigger in a `<span>` so events still fire when the
   * underlying element is `disabled`. Disabled native buttons do not
   * emit pointer events on themselves; the wrapper picks them up.
   * Defaults to `false`.
   */
  wrapDisabledTrigger?: boolean;

  /**
   * Optional extra className appended to the popover root element.
   */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let popoverIdCounter = 0;
const nextPopoverId = (): string => `su-popover-${++popoverIdCounter}`;

const FLIP: Record<PopoverPlacement, PopoverPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const VIEWPORT_PADDING = 8;

interface Position {
  top: number;
  left: number;
  placement: PopoverPlacement;
}

/**
 * Compute an absolute (page-coordinate) position for the popover
 * given the trigger rect, the popover rect, and a preferred placement.
 * Auto-flips to the opposite side when the popover would overflow.
 */
function computePosition(
  triggerRect: DOMRect,
  popoverRect: { width: number; height: number },
  preferred: PopoverPlacement,
  offset: number
): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const order: PopoverPlacement[] = [preferred, FLIP[preferred]];

  for (const placement of order) {
    let top = 0;
    let left = 0;
    let fits = true;

    if (placement === 'top') {
      top = triggerRect.top - popoverRect.height - offset;
      left =
        triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      if (top < VIEWPORT_PADDING) fits = false;
    } else if (placement === 'bottom') {
      top = triggerRect.bottom + offset;
      left =
        triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
      if (top + popoverRect.height > vh - VIEWPORT_PADDING) fits = false;
    } else if (placement === 'left') {
      top =
        triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.left - popoverRect.width - offset;
      if (left < VIEWPORT_PADDING) fits = false;
    } else {
      // right
      top =
        triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.right + offset;
      if (left + popoverRect.width > vw - VIEWPORT_PADDING) fits = false;
    }

    if (fits || placement === order[order.length - 1]) {
      // Clamp the perpendicular axis so we never escape the viewport
      // when the trigger is near the edge.
      if (placement === 'top' || placement === 'bottom') {
        const minLeft = VIEWPORT_PADDING;
        const maxLeft = vw - popoverRect.width - VIEWPORT_PADDING;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
      } else {
        const minTop = VIEWPORT_PADDING;
        const maxTop = vh - popoverRect.height - VIEWPORT_PADDING;
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
 * Popover — a floating, interactive panel anchored to a trigger.
 *
 * Sibling to Tooltip, but built for *rich* content (forms, action
 * rows, links). Key differences vs Tooltip:
 *
 * - Pointer events are enabled inside the surface, so users can click,
 *   focus and type into the panel.
 * - Closes on click-outside (mousedown to beat internal click timing)
 *   and on Escape; both behaviors are configurable.
 * - Uses `role="dialog"` + `aria-modal={false}` and wires the trigger
 *   with `aria-haspopup="dialog"` / `aria-expanded` / `aria-controls`.
 * - Does NOT trap focus (popovers are not modals). Tab flows through
 *   the panel naturally; if focus leaves to a non-trigger element, the
 *   panel closes via `focusin`.
 * - Hover trigger gets a "grace period" (`closeDelay`) so users can
 *   drift between the trigger and the surface without it slamming shut.
 */
export function Popover({
  content,
  title,
  footer,
  children,
  trigger = 'click',
  placement = 'bottom',
  offset = 12,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  closeOnEsc = true,
  closeOnClickOutside = true,
  showArrow = true,
  openDelay = 100,
  closeDelay = 150,
  wrapDisabledTrigger = false,
  className,
}: PopoverProps) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? !!openProp : uncontrolledOpen;

  const triggers = React.useMemo<PopoverTrigger[]>(
    () => (Array.isArray(trigger) ? trigger : [trigger]),
    [trigger]
  );
  const hasHover = triggers.includes('hover');
  const hasFocus = triggers.includes('focus');
  const hasClick = triggers.includes('click');
  const isManual = triggers.includes('manual');

  // Popover is disabled when there's no content to show.
  const disabled =
    content === null || content === undefined || content === false;

  const popoverId = React.useMemo(() => nextPopoverId(), []);
  const titleId = `${popoverId}-title`;

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  const openTimerRef = React.useRef<number | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [position, setPosition] = React.useState<Position>({
    top: 0,
    left: 0,
    placement,
  });

  const setOpenState = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

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

  const scheduleOpen = React.useCallback(() => {
    if (disabled || isManual) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (open) return;
    if (openDelay <= 0) {
      setOpenState(true);
      return;
    }
    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      setOpenState(true);
    }, openDelay);
  }, [disabled, isManual, open, openDelay, setOpenState]);

  const scheduleClose = React.useCallback(() => {
    if (isManual) return;
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (!open) return;
    if (closeDelay <= 0) {
      setOpenState(false);
      return;
    }
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setOpenState(false);
    }, closeDelay);
  }, [isManual, open, closeDelay, setOpenState]);

  // Cleanup any pending timer on unmount.
  React.useEffect(() => clearTimers, [clearTimers]);

  // ESC closes the popover immediately.
  React.useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearTimers();
        setOpenState(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEsc, clearTimers, setOpenState]);

  // Click outside closes the popover. We listen on `mousedown` rather
  // than `click` so internal click handlers run first against a still-
  // open popover (otherwise an inside click could be racing this
  // listener and unmount before its own handler fires).
  React.useEffect(() => {
    if (!open || !closeOnClickOutside) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inTrigger = triggerRef.current?.contains(target);
      const inPopover = popoverRef.current?.contains(target);
      if (inTrigger || inPopover) return;
      clearTimers();
      setOpenState(false);
    };
    document.addEventListener('mousedown', onPointerDown, true);
    return () =>
      document.removeEventListener('mousedown', onPointerDown, true);
  }, [open, closeOnClickOutside, clearTimers, setOpenState]);

  // Focus-out: when focus leaves both trigger and popover, close.
  // This makes Tab through the last focusable inside the popover
  // dismiss it naturally — we are NOT a focus trap.
  React.useEffect(() => {
    if (!open) return;
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inTrigger = triggerRef.current?.contains(target);
      const inPopover = popoverRef.current?.contains(target);
      if (inTrigger || inPopover) return;
      // Focus moved out — close, but only if focus trigger isn't going
      // to immediately re-open us on the next tick.
      clearTimers();
      setOpenState(false);
    };
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [open, clearTimers, setOpenState]);

  // Recompute position whenever we become visible and on scroll/resize.
  React.useLayoutEffect(() => {
    if (!open) return;
    const triggerEl = triggerRef.current;
    const popoverEl = popoverRef.current;
    if (!triggerEl || !popoverEl) return;

    const measure = () => {
      const triggerRect = triggerEl.getBoundingClientRect();
      const popoverRect = popoverEl.getBoundingClientRect();
      setPosition(
        computePosition(
          triggerRect,
          { width: popoverRect.width, height: popoverRect.height },
          placement,
          offset
        )
      );
    };

    measure();

    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(popoverEl);
      ro.observe(triggerEl);
    }

    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, [open, placement, offset, content, title, footer]);

  // Toggle handler for click trigger.
  const onTriggerClick = React.useCallback(() => {
    if (!hasClick || disabled || isManual) return;
    clearTimers();
    setOpenState(!open);
  }, [hasClick, disabled, isManual, clearTimers, open, setOpenState]);

  const setTriggerRef = React.useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  // Compose handlers: original child handler runs first, then ours.
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

  const triggerHandlers: Record<string, unknown> = {};
  if (hasHover && !isManual) {
    triggerHandlers.onMouseEnter = composeHandler(
      childProps.onMouseEnter as AnyHandler,
      scheduleOpen
    );
    triggerHandlers.onMouseLeave = composeHandler(
      childProps.onMouseLeave as AnyHandler,
      scheduleClose
    );
  }
  if (hasFocus && !isManual) {
    triggerHandlers.onFocus = composeHandler(
      childProps.onFocus as AnyHandler,
      scheduleOpen
    );
    triggerHandlers.onBlur = composeHandler(
      childProps.onBlur as AnyHandler,
      scheduleClose
    );
  }
  if (hasClick && !isManual) {
    triggerHandlers.onClick = composeHandler(
      childProps.onClick as AnyHandler,
      onTriggerClick
    );
  }

  // a11y: announce the popup relationship on the trigger.
  const triggerAria: Record<string, unknown> = {
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
  };
  if (open) {
    triggerAria['aria-controls'] = popoverId;
  }

  // Hover handlers on the popover surface itself, so the user can move
  // off the trigger onto the popover without it closing.
  const popoverHoverHandlers: Record<string, unknown> = {};
  if (hasHover && !isManual) {
    popoverHoverHandlers.onMouseEnter = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
    popoverHoverHandlers.onMouseLeave = scheduleClose;
  }

  const hasTitle = title !== undefined && title !== null && title !== false;
  const hasFooter =
    footer !== undefined && footer !== null && footer !== false;

  const surface =
    mounted && open && !disabled
      ? createPortal(
          <div
            ref={popoverRef}
            id={popoverId}
            role="dialog"
            aria-modal={false}
            aria-labelledby={hasTitle ? titleId : undefined}
            tabIndex={-1}
            className={cx(
              'su-popover',
              `su-popover--${position.placement}`,
              !showArrow && 'su-popover--no-arrow',
              className
            )}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
            }}
            {...popoverHoverHandlers}
          >
            <div className="su-popover__inner">
              {hasTitle ? (
                <div className="su-popover__header">
                  <div id={titleId} className="su-popover__title">
                    {title}
                  </div>
                </div>
              ) : null}
              <div className="su-popover__body">{content}</div>
              {hasFooter ? (
                <div className="su-popover__footer">{footer}</div>
              ) : null}
            </div>
            {showArrow ? (
              <span
                className="su-popover__arrow"
                aria-hidden="true"
                data-su-popover-arrow=""
              />
            ) : null}
          </div>,
          document.body
        )
      : null;

  // Disabled-trigger branch: native disabled buttons don't fire pointer
  // events; we wrap them in a span that does.
  if (wrapDisabledTrigger) {
    const wrapperHandlers: Record<string, unknown> = {};
    if (hasHover && !isManual) {
      wrapperHandlers.onMouseEnter = scheduleOpen;
      wrapperHandlers.onMouseLeave = scheduleClose;
    }
    if (hasFocus && !isManual) {
      wrapperHandlers.onFocus = scheduleOpen;
      wrapperHandlers.onBlur = scheduleClose;
    }
    if (hasClick && !isManual) {
      wrapperHandlers.onClick = () => {
        if (disabled) return;
        clearTimers();
        setOpenState(!open);
      };
    }
    return (
      <>
        <span
          ref={setTriggerRef as unknown as React.Ref<HTMLSpanElement>}
          className="su-popover__wrapper"
          tabIndex={hasFocus ? 0 : undefined}
          {...triggerAria}
          {...wrapperHandlers}
        >
          {children}
        </span>
        {surface}
      </>
    );
  }

  // Normal branch: clone the child and inject ref/handlers/aria.
  const cloned = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      setTriggerRef(node);
      const childRef = (
        children as unknown as { ref?: React.Ref<HTMLElement> }
      ).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    },
    ...triggerAria,
    ...triggerHandlers,
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

  return (
    <>
      {cloned}
      {surface}
    </>
  );
}

Popover.displayName = 'Popover';
