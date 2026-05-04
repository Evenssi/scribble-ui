import * as React from 'react';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export type CarouselTransition = 'slide' | 'fade';
export type CarouselIndicatorShape = 'dot' | 'dash' | 'number';
export type CarouselArrowPlacement = 'inside' | 'outside';

export interface CarouselItem {
  /** Stable key — used as React key and for aria labelling. */
  key: string;
  /** Slide content. Usually an image, illustration or sticky-note card. */
  content: React.ReactNode;
  /** Optional a11y label for the slide region; falls back to "{i} of {n}". */
  alt?: string;
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'className'> {
  /** Slides to render. Required. */
  items: CarouselItem[];

  /** Controlled active slide index. */
  activeIndex?: number;
  /** Uncontrolled initial index. Defaults to `0`. */
  defaultIndex?: number;
  /** Fires whenever the active slide changes (controlled or not). */
  onChange?: (index: number, prevIndex: number) => void;

  /** Auto-advance slides on a timer. Defaults to `false`. */
  autoplay?: boolean;
  /** Autoplay interval in ms. Defaults to `4000`. */
  interval?: number;
  /** Pause autoplay while the pointer hovers the carousel. Defaults to `true`. */
  pauseOnHover?: boolean;

  /** Wrap from last → first (and first → prev → last). Defaults to `true`. */
  loop?: boolean;

  /** Render prev / next arrow buttons. Defaults to `true`. */
  showArrows?: boolean;
  /** Render the indicator strip below the viewport. Defaults to `true`. */
  showIndicators?: boolean;
  /**
   * Shape of each indicator.
   * - `'dot'` (default) · round bullet
   * - `'dash'` · short hand-drawn stroke
   * - `'number'` · "1 / 5" fraction label
   */
  indicatorShape?: CarouselIndicatorShape;
  /**
   * Whether arrows sit inside the slide viewport (overlayed) or
   * outside (hugging the left/right gutter). Defaults to `'inside'`.
   */
  arrowPlacement?: CarouselArrowPlacement;

  /** Transition style. Defaults to `'slide'`. */
  transition?: CarouselTransition;

  /** CSS aspect-ratio for the viewport (e.g. `'16 / 9'`). */
  aspectRatio?: string;
  /** Fixed height. Takes precedence over `aspectRatio` when set. */
  height?: number | string;

  /** Enable mouse / touch drag to switch slides. Defaults to `true`. */
  draggable?: boolean;
  /** Enable keyboard navigation (ArrowLeft/Right, Home, End). Defaults to `true`. */
  keyboard?: boolean;

  /** Extra class appended to the root. */
  className?: string;
  /** a11y label for the carousel region. */
  ariaLabel?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/** Distance in px the pointer must travel to commit a slide change. */
const DRAG_DISTANCE_THRESHOLD = 40;
/** Minimum velocity (px/ms) that always commits even on small distance. */
const DRAG_VELOCITY_THRESHOLD = 0.45;

/**
 * Carousel — a hand-drawn looking content rotator.
 *
 * Supports slide + fade transitions, autoplay with smart pause (hover /
 * focus-within / drag / page hidden), looping, keyboard and pointer-drag
 * navigation, three indicator shapes and two arrow placements. Controlled
 * and uncontrolled usage are both first-class via `activeIndex` /
 * `defaultIndex`.
 *
 * Make sure to mount `<HandDrawnFilters />` once at your app root for the
 * SVG filter wobble; see the package README for setup.
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      items,
      activeIndex,
      defaultIndex = 0,
      onChange,
      autoplay = false,
      interval = 4000,
      pauseOnHover = true,
      loop = true,
      showArrows = true,
      showIndicators = true,
      indicatorShape = 'dot',
      arrowPlacement = 'inside',
      transition = 'slide',
      aspectRatio = '16 / 9',
      height,
      draggable = true,
      keyboard = true,
      className,
      ariaLabel,
      style,
      ...rest
    },
    ref
  ) {
    const total = items.length;

    // --- controlled / uncontrolled bridge -------------------------------
    const isControlled = activeIndex !== undefined;
    const [innerIndex, setInnerIndex] = React.useState<number>(() => {
      const clamped = Math.max(0, Math.min(defaultIndex, Math.max(0, total - 1)));
      return clamped;
    });
    const rawCurrent = isControlled ? (activeIndex as number) : innerIndex;
    // Defensive clamp against out-of-range values so a misuse won't crash.
    const current =
      total === 0 ? 0 : Math.max(0, Math.min(rawCurrent, total - 1));

    // Keep onChange stable for memoised helpers.
    const onChangeRef = React.useRef(onChange);
    React.useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    const goTo = React.useCallback(
      (next: number) => {
        if (total === 0) return;
        let target = next;
        if (loop) {
          // Positive-modulo so negative deltas land correctly.
          target = ((next % total) + total) % total;
        } else {
          target = Math.max(0, Math.min(next, total - 1));
        }
        const prev = current;
        if (target === prev) return;
        if (!isControlled) {
          setInnerIndex(target);
        }
        onChangeRef.current?.(target, prev);
      },
      [current, isControlled, loop, total]
    );

    const goNext = React.useCallback(() => goTo(current + 1), [current, goTo]);
    const goPrev = React.useCallback(() => goTo(current - 1), [current, goTo]);

    // --- autoplay with smart pause --------------------------------------
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    // Expose the root through the forwarded ref while keeping our own handle.
    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocusWithin, setIsFocusWithin] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isPageVisible, setIsPageVisible] = React.useState(true);

    React.useEffect(() => {
      if (typeof document === 'undefined') return;
      const handle = () => {
        setIsPageVisible(document.visibilityState === 'visible');
      };
      handle();
      document.addEventListener('visibilitychange', handle);
      return () => document.removeEventListener('visibilitychange', handle);
    }, []);

    const autoplayPaused =
      (pauseOnHover && isHovered) ||
      isFocusWithin ||
      isDragging ||
      !isPageVisible;

    // Use a ref-chained latest goNext so the interval doesn't re-bind
    // on every index change, which would reset the timer and cause drift.
    const goNextRef = React.useRef(goNext);
    React.useEffect(() => {
      goNextRef.current = goNext;
    }, [goNext]);

    React.useEffect(() => {
      if (!autoplay) return;
      if (autoplayPaused) return;
      if (total <= 1) return;
      // If loop is off and we're already on the last slide, stop ticking.
      if (!loop && current >= total - 1) return;
      const safeInterval = Math.max(400, interval);
      const id = window.setInterval(() => {
        goNextRef.current();
      }, safeInterval);
      return () => window.clearInterval(id);
    }, [autoplay, autoplayPaused, current, interval, loop, total]);

    // --- keyboard navigation --------------------------------------------
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!keyboard) return;
        // Don't hijack keys fired inside inputs/textareas inside a slide.
        const target = event.target as HTMLElement | null;
        if (target) {
          const tag = target.tagName;
          if (
            tag === 'INPUT' ||
            tag === 'TEXTAREA' ||
            tag === 'SELECT' ||
            target.isContentEditable
          ) {
            return;
          }
        }
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goPrev();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goNext();
            break;
          case 'Home':
            event.preventDefault();
            goTo(0);
            break;
          case 'End':
            event.preventDefault();
            goTo(total - 1);
            break;
          default:
            break;
        }
      },
      [keyboard, goPrev, goNext, goTo, total]
    );

    // --- drag handling ---------------------------------------------------
    const [dragOffsetPct, setDragOffsetPct] = React.useState(0);
    const dragStateRef = React.useRef<{
      startX: number;
      startTime: number;
      pointerId: number;
      width: number;
    } | null>(null);

    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (!draggable || total <= 1) return;
        // Only react to primary button / touch / pen. Ignore middle & right.
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        // Skip drags initiated on the arrow / indicator controls themselves —
        // those have their own click handlers.
        const target = event.target as HTMLElement | null;
        if (target && target.closest('[data-su-carousel-control]')) return;

        const viewport = event.currentTarget;
        dragStateRef.current = {
          startX: event.clientX,
          startTime: performance.now(),
          pointerId: event.pointerId,
          width: viewport.getBoundingClientRect().width || 1,
        };
        try {
          viewport.setPointerCapture(event.pointerId);
        } catch {
          // Safari occasionally throws here for synthetic pointers; non-fatal.
        }
        setIsDragging(true);
      },
      [draggable, total]
    );

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        const state = dragStateRef.current;
        if (!state) return;
        if (event.pointerId !== state.pointerId) return;
        const dx = event.clientX - state.startX;
        const pct = (dx / state.width) * 100;
        // Rubber-band at non-loop edges for tactile feedback.
        if (!loop) {
          if ((current === 0 && pct > 0) || (current === total - 1 && pct < 0)) {
            setDragOffsetPct(pct * 0.35);
            return;
          }
        }
        setDragOffsetPct(pct);
      },
      [current, loop, total]
    );

    const endDrag = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
        const state = dragStateRef.current;
        if (!state) return;
        if (event.pointerId !== state.pointerId) return;
        dragStateRef.current = null;
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
          // ignore — capture may already be released by the browser.
        }
        setIsDragging(false);

        if (cancelled) {
          setDragOffsetPct(0);
          return;
        }

        const dx = event.clientX - state.startX;
        const dt = Math.max(1, performance.now() - state.startTime);
        const velocity = Math.abs(dx) / dt;
        const distancePct = Math.abs(dragOffsetPct);
        const commit =
          distancePct > (DRAG_DISTANCE_THRESHOLD / state.width) * 100 ||
          velocity > DRAG_VELOCITY_THRESHOLD;

        if (commit) {
          if (dx < 0) {
            goNext();
          } else if (dx > 0) {
            goPrev();
          }
        }
        // Always snap back — the index update will animate to the new slide.
        setDragOffsetPct(0);
      },
      [dragOffsetPct, goNext, goPrev]
    );

    const handlePointerUp = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => endDrag(event, false),
      [endDrag]
    );

    const handlePointerCancel = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => endDrag(event, true),
      [endDrag]
    );

    // --- hover / focus handlers -----------------------------------------
    const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);
    const handleFocus = React.useCallback(() => setIsFocusWithin(true), []);
    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLDivElement>) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !event.currentTarget.contains(next)) {
          setIsFocusWithin(false);
        }
      },
      []
    );

    // --- bounds for non-loop disabled state ------------------------------
    const atStart = !loop && current === 0;
    const atEnd = !loop && current === total - 1;

    // --- stable ids for aria wiring --------------------------------------
    const reactId = React.useId();
    const idBase = `su-carousel-${reactId}`;

    // --- style composition ----------------------------------------------
    const viewportStyle: React.CSSProperties = {};
    if (height !== undefined) {
      viewportStyle.height =
        typeof height === 'number' ? `${height}px` : height;
    } else if (aspectRatio) {
      viewportStyle.aspectRatio = aspectRatio;
    }

    const rootClasses = cx(
      'su-carousel',
      `su-carousel--${transition}`,
      `su-carousel--arrows-${arrowPlacement}`,
      isDragging && 'su-carousel--dragging',
      className
    );

    // Slide-transition track transform. The drag-time transition-none is
    // handled via the `.su-carousel--dragging` class in CSS, so we only
    // need to write the transform here — keeping a single source of truth
    // for motion in the stylesheet.
    const slideOffsetPct = -current * 100 + dragOffsetPct;
    const trackStyle: React.CSSProperties =
      transition === 'slide'
        ? { transform: `translateX(${slideOffsetPct}%)` }
        : {};

    return (
      <div
        ref={rootRef}
        className={rootClasses}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel ?? 'Carousel'}
        data-active-index={current}
        data-transition={transition}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={keyboard ? 0 : -1}
        {...rest}
      >
        <div
          className="su-carousel__viewport"
          style={viewportStyle}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-live={autoplay ? 'off' : 'polite'}
          aria-atomic="false"
        >
          {transition === 'slide' ? (
            <div className="su-carousel__track" style={trackStyle}>
              {items.map((item, i) => (
                <div
                  key={item.key}
                  id={`${idBase}-slide-${i}`}
                  className={cx(
                    'su-carousel__slide',
                    i === current && 'su-carousel__slide--active'
                  )}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={item.alt ?? `${i + 1} of ${total}`}
                  aria-hidden={i !== current || undefined}
                >
                  {item.content}
                </div>
              ))}
            </div>
          ) : (
            // Fade: absolute stack, only active has opacity 1.
            <div className="su-carousel__stack">
              {items.map((item, i) => (
                <div
                  key={item.key}
                  id={`${idBase}-slide-${i}`}
                  className={cx(
                    'su-carousel__slide',
                    'su-carousel__slide--fade',
                    i === current && 'su-carousel__slide--active'
                  )}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={item.alt ?? `${i + 1} of ${total}`}
                  aria-hidden={i !== current || undefined}
                >
                  {item.content}
                </div>
              ))}
            </div>
          )}

          {showArrows && total > 1 && (
            <>
              <button
                type="button"
                className={cx(
                  'su-carousel__arrow',
                  'su-carousel__arrow--prev'
                )}
                aria-label="Previous slide"
                aria-disabled={atStart || undefined}
                disabled={atStart}
                data-su-carousel-control=""
                onClick={goPrev}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={cx(
                  'su-carousel__arrow',
                  'su-carousel__arrow--next'
                )}
                aria-label="Next slide"
                aria-disabled={atEnd || undefined}
                disabled={atEnd}
                data-su-carousel-control=""
                onClick={goNext}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {showIndicators && total > 0 && (
          <div
            className={cx(
              'su-carousel__indicators',
              `su-carousel__indicators--${indicatorShape}`
            )}
            aria-label="Select slide"
          >
            {indicatorShape === 'number' ? (
              <span className="su-carousel__fraction" aria-live="polite">
                <span className="su-carousel__fraction-current">
                  {current + 1}
                </span>
                <span className="su-carousel__fraction-sep"> / </span>
                <span className="su-carousel__fraction-total">{total}</span>
              </span>
            ) : (
              items.map((item, i) => {
                const isActive = i === current;
                return (
                  <button
                    key={item.key}
                    type="button"
                    className={cx(
                      'su-carousel__indicator',
                      `su-carousel__indicator--${indicatorShape}`,
                      isActive && 'su-carousel__indicator--active'
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={isActive || undefined}
                    aria-controls={`${idBase}-slide-${i}`}
                    data-su-carousel-control=""
                    onClick={() => goTo(i)}
                  >
                    <span className="su-carousel__indicator-mark" aria-hidden="true" />
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
