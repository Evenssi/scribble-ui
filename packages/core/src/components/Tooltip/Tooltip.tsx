import * as React from 'react';
import { createPortal } from 'react-dom';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface TooltipProps {
  /**
   * The text or node displayed inside the tooltip bubble.
   * If `null` / `undefined` / `false`, the tooltip is treated as
   * disabled and never shows (handy for conditionally hiding it
   * without unmounting the wrapped child).
   */
  content: React.ReactNode;

  /**
   * The element that owns the tooltip. Must be a single React element
   * that can receive a ref and DOM event handlers (e.g. a `<button>`,
   * an `<a>`, or any forwardRef component). Tooltip injects the
   * trigger handlers + `aria-describedby` onto it via `cloneElement`.
   *
   * If your trigger is `disabled` (which suppresses pointer events on
   * the element itself), set `wrapDisabledTrigger` so the events are
   * captured on a wrapper span instead.
   */
  children: React.ReactElement;

  /**
   * Preferred placement. The tooltip auto-flips to the opposite side
   * when there is not enough room in the viewport.
   * Defaults to `'top'`.
   */
  placement?: TooltipPlacement;

  /**
   * One or more triggers — string or array. `'manual'` disables the
   * built-in triggers entirely; combine it with the `open` prop for
   * fully controlled behavior.
   * Defaults to `['hover', 'focus']`.
   */
  trigger?: TooltipTrigger | TooltipTrigger[];

  /**
   * Delay before the tooltip opens, in milliseconds. Defaults to 100.
   */
  openDelay?: number;

  /**
   * Delay before the tooltip closes, in milliseconds. Defaults to 0.
   */
  closeDelay?: number;

  /**
   * Controlled open state. Pair with `onOpenChange`. When omitted
   * the tooltip manages its own state.
   */
  open?: boolean;

  /**
   * Notified whenever the tooltip wants to open or close. Always
   * fires for both controlled and uncontrolled usage.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Default open state in uncontrolled mode. Defaults to `false`.
   */
  defaultOpen?: boolean;

  /**
   * Wrap the trigger in a `<span>` so events still fire when the
   * underlying element is `disabled`. Disabled native buttons do
   * not emit pointer events on themselves; the wrapper picks them
   * up from the surrounding box instead.
   * Defaults to `false`.
   */
  wrapDisabledTrigger?: boolean;

  /**
   * Optional extra className appended to the tooltip bubble.
   */
  className?: string;

  /**
   * Distance in pixels between the trigger edge and the bubble.
   * Defaults to 10.
   */
  offset?: number;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let tooltipIdCounter = 0;
const nextTooltipId = (): string => `su-tooltip-${++tooltipIdCounter}`;

const FLIP: Record<TooltipPlacement, TooltipPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const VIEWPORT_PADDING = 8; // keep the bubble this many px away from the edge

interface Position {
  top: number;
  left: number;
  placement: TooltipPlacement; // resolved placement after flip
}

/**
 * Compute an absolute (page-coordinate) position for the tooltip
 * given the trigger rect, the bubble rect, and a preferred placement.
 * Auto-flips to the opposite side when the bubble would overflow.
 */
function computePosition(
  triggerRect: DOMRect,
  bubbleRect: { width: number; height: number },
  preferred: TooltipPlacement,
  offset: number
): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Try preferred first, then the flipped axis if it doesn't fit.
  const order: TooltipPlacement[] = [preferred, FLIP[preferred]];

  for (const placement of order) {
    let top = 0;
    let left = 0;
    let fits = true;

    if (placement === 'top') {
      top = triggerRect.top - bubbleRect.height - offset;
      left =
        triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
      if (top < VIEWPORT_PADDING) fits = false;
    } else if (placement === 'bottom') {
      top = triggerRect.bottom + offset;
      left =
        triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
      if (top + bubbleRect.height > vh - VIEWPORT_PADDING) fits = false;
    } else if (placement === 'left') {
      top =
        triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
      left = triggerRect.left - bubbleRect.width - offset;
      if (left < VIEWPORT_PADDING) fits = false;
    } else {
      // right
      top =
        triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
      left = triggerRect.right + offset;
      if (left + bubbleRect.width > vw - VIEWPORT_PADDING) fits = false;
    }

    if (fits || placement === order[order.length - 1]) {
      // Clamp on the perpendicular axis so the bubble never escapes
      // horizontally/vertically when the trigger is near the edge.
      if (placement === 'top' || placement === 'bottom') {
        const minLeft = VIEWPORT_PADDING;
        const maxLeft = vw - bubbleRect.width - VIEWPORT_PADDING;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
      } else {
        const minTop = VIEWPORT_PADDING;
        const maxTop = vh - bubbleRect.height - VIEWPORT_PADDING;
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

  // Should never reach here because the loop always returns on its
  // last iteration — keep the compiler happy.
  return { top: 0, left: 0, placement: preferred };
}

/**
 * Tooltip — a small floating bubble that describes its trigger.
 *
 * - Portals into `document.body` so it escapes any clipping ancestor
 *   (overflow:hidden, transform, contain, etc).
 * - Auto-flips to the opposite side when the preferred placement
 *   would overflow the viewport; clamps on the perpendicular axis.
 * - Default triggers are `hover` + `focus`, which mirrors how native
 *   `title` attributes behave for keyboard users — but without the
 *   ugly browser chrome.
 * - Wires `aria-describedby` from the trigger to the bubble.
 * - ESC closes any visible tooltip immediately, regardless of trigger.
 *
 * The `children` must be a single React element (e.g. a `<button>`).
 * For disabled triggers, set `wrapDisabledTrigger` so the events
 * fire on a `<span>` wrapper instead.
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  trigger = ['hover', 'focus'],
  openDelay = 100,
  closeDelay = 0,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  wrapDisabledTrigger = false,
  className,
  offset = 10,
}: TooltipProps) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? !!openProp : uncontrolledOpen;

  const triggers = React.useMemo<TooltipTrigger[]>(
    () => (Array.isArray(trigger) ? trigger : [trigger]),
    [trigger]
  );
  const hasHover = triggers.includes('hover');
  const hasFocus = triggers.includes('focus');
  const hasClick = triggers.includes('click');
  const isManual = triggers.includes('manual');

  // Tooltip is disabled when there's no content to show.
  const disabled =
    content === null || content === undefined || content === false;

  const tooltipId = React.useMemo(() => nextTooltipId(), []);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);

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

  // ESC closes the tooltip immediately.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearTimers();
        setOpenState(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, clearTimers, setOpenState]);

  // Recompute position whenever the bubble becomes visible and on
  // scroll/resize while it's open. We use useLayoutEffect to measure
  // before the browser paints, avoiding a one-frame flash at (0,0).
  React.useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble) return;

    const measure = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const bubbleRect = bubble.getBoundingClientRect();
      setPosition(
        computePosition(
          triggerRect,
          { width: bubbleRect.width, height: bubbleRect.height },
          placement,
          offset
        )
      );
    };

    measure();

    // Track viewport changes. `passive` keeps scrolling smooth.
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);

    // Keep up with content reflows in the bubble itself (e.g. the
    // consumer changes `content` from a short to a long string).
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(bubble);
      ro.observe(trigger);
    }

    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, [open, placement, offset, content]);

  // Toggle handler for click trigger.
  const onTriggerClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (!hasClick || disabled || isManual) return;
      // Don't fire scheduleOpen/scheduleClose — click is instantaneous,
      // delays would feel laggy.
      clearTimers();
      setOpenState(!open);
      // Suppress text selection from a quick double-click on the trigger.
      void event;
    },
    [hasClick, disabled, isManual, clearTimers, open, setOpenState]
  );

  // Inject a ref on the original child without clobbering any existing
  // ref it may already have.
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

  // Build the props that we layer on top of the trigger element.
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

  // Wire `aria-describedby` for screen readers. Preserve any existing
  // value the consumer already set on the child.
  const existingDescribedBy = childProps['aria-describedby'] as
    | string
    | undefined;
  const ariaDescribedBy = open
    ? [existingDescribedBy, tooltipId].filter(Boolean).join(' ')
    : existingDescribedBy;

  // Bubble itself — kept in scope for both the wrapper and the
  // direct-child branches below.
  const bubble = mounted && open && !disabled ? (
    createPortal(
      <div
        ref={bubbleRef}
        id={tooltipId}
        role="tooltip"
        className={cx(
          'su-tooltip',
          `su-tooltip--${position.placement}`,
          className
        )}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
        }}
        // The bubble itself stays out of the tab order and ignores
        // pointer events so it never accidentally re-triggers hover.
      >
        <div className="su-tooltip__inner">{content}</div>
        <span
          className="su-tooltip__arrow"
          aria-hidden="true"
          data-su-tooltip-arrow=""
        />
      </div>,
      document.body
    )
  ) : null;

  // Disabled-trigger branch: native disabled buttons do not fire
  // pointer events on themselves. We wrap them in a span that does.
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
      wrapperHandlers.onClick = (event: React.MouseEvent) => {
        if (disabled) return;
        clearTimers();
        setOpenState(!open);
        void event;
      };
    }
    return (
      <>
        <span
          ref={setTriggerRef as unknown as React.Ref<HTMLSpanElement>}
          className="su-tooltip__wrapper"
          // The wrapper is keyboard-focusable so focus-trigger still
          // works when the inner element refuses focus.
          tabIndex={hasFocus ? 0 : undefined}
          aria-describedby={ariaDescribedBy}
          {...wrapperHandlers}
        >
          {children}
        </span>
        {bubble}
      </>
    );
  }

  // Normal branch: clone the child and inject ref/handlers/aria.
  const cloned = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      setTriggerRef(node);
      // Forward to the child's existing ref if any (string refs not
      // supported — they're long deprecated).
      const childRef = (
        children as unknown as { ref?: React.Ref<HTMLElement> }
      ).ref;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    },
    'aria-describedby': ariaDescribedBy,
    ...triggerHandlers,
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

  return (
    <>
      {cloned}
      {bubble}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
