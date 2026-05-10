import * as React from 'react';
import { createPortal } from 'react-dom';
import { Calendar, type CalendarLocale } from './Calendar';
import { formatDate, toISODate } from './dateUtils';

// Note: this component does NOT import its CSS file directly. Consumers
// must import `scribble-ui/styles/components.css` once at the app root.

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  /** Controlled selected date. `null` = empty. */
  value?: Date | null;
  /** Uncontrolled initial date. */
  defaultValue?: Date | null;
  /** Fires whenever the user picks a date or clears the field. */
  onChange?: (date: Date | null) => void;

  /** Hard lower bound (inclusive). */
  minDate?: Date;
  /** Hard upper bound (inclusive). */
  maxDate?: Date;
  /** Custom predicate; OR-ed with min/max. */
  disabledDate?: (date: Date) => boolean;

  /** Display format. Tokens: YYYY / MM / DD. Default `'YYYY-MM-DD'`. */
  format?: string;
  /** Trigger placeholder when no value is selected. */
  placeholder?: string;
  /** Visual size — matches Input. */
  size?: DatePickerSize;
  /** Disable the entire picker. */
  disabled?: boolean;
  /** Mark trigger read-only — popup still opens for reading. */
  readOnly?: boolean;
  /** Render in error color. */
  error?: boolean;
  /** Helper line under the trigger; danger-colored when `error`. */
  helperText?: React.ReactNode;
  /** Show a ✕ button to clear the value. Default `true`. */
  clearable?: boolean;

  /** First day of week — `0` (Sunday) or `1` (Monday). Default `1`. */
  weekStartsOn?: 0 | 1;
  /** Override locale strings. */
  locale?: CalendarLocale;
  /** Show a "Today" shortcut at the bottom of the popup. Default `true`. */
  showToday?: boolean;

  /** Renders a hidden native input that submits ISO `YYYY-MM-DD`. */
  name?: string;
  /** Forwarded to the trigger button. */
  id?: string;
  /** Optional className appended to the trigger. */
  className?: string;
  /** Optional className on the outer wrapper. */
  wrapperClassName?: string;
  /** Optional className on the popup. */
  popupClassName?: string;
  /** Accessible label when there is no visible label. */
  'aria-label'?: string;
  /** Accessible label reference. */
  'aria-labelledby'?: string;
  /** Notified when popup opens / closes. */
  onOpenChange?: (open: boolean) => void;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

let datePickerIdCounter = 0;
const nextDatePickerId = (): string =>
  `su-datepicker-${++datePickerIdCounter}`;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/** Default Chinese locale, matches the brand voice. */
const DEFAULT_LOCALE: CalendarLocale = {
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  months: [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月',
  ],
  today: '今天',
  clear: '清除',
  prevMonth: '上个月',
  nextMonth: '下个月',
};

const VIEWPORT_PADDING = 8;

interface PopupPosition {
  top: number;
  left: number;
  /** True if we flipped to render above the trigger. */
  above: boolean;
}

function computePopupPosition(
  triggerRect: DOMRect,
  popupHeight: number
): PopupPosition {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const viewportH = window.innerHeight;

  const spaceBelow = viewportH - triggerRect.bottom - VIEWPORT_PADDING;
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING;

  // Prefer below; flip up only if it doesn't fit AND above has more room.
  const above = spaceBelow < popupHeight && spaceAbove > spaceBelow;

  return {
    top: above
      ? scrollY + triggerRect.top - popupHeight - 4
      : scrollY + triggerRect.bottom + 4,
    left: scrollX + triggerRect.left,
    above,
  };
}

/** Inline calendar-icon glyph (kept dependency-free). */
function CalendarIcon(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1.5"
        y="2.5"
        width="11"
        height="10"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M1.5 5.5 L12.5 5.5 M4.5 1 L4.5 4 M9.5 1 L9.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Inline ✕ glyph used by the clear button. */
function ClearGlyph(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.2 2.2 L9.8 9.8 M9.8 2.2 L2.2 9.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn single-day picker.
 *
 * The trigger inherits the Input wrapper look (paper background, hand-drawn
 * border, wobble filter) so a DatePicker sits naturally next to inputs in
 * a form. The calendar popup is portalled into `document.body` to escape
 * any ancestor `overflow: hidden` and auto-flips above the trigger when
 * there's no room below.
 *
 * Keyboard model:
 *   Trigger focused, popup closed:
 *     Enter / Space / ArrowDown — open popup
 *   Popup open, focus inside grid:
 *     ←/→        ±1 day
 *     ↑/↓        ±1 week
 *     PageUp/Dn  ±1 month
 *     Shift+PgUp/Dn ±1 year
 *     Home / End first / last day of focused week
 *     Enter / Space pick the focused day
 *     Esc        close without changing
 *     Tab        close, focus naturally moves out
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabledDate,
  format = 'YYYY-MM-DD',
  placeholder = '选择日期',
  size = 'md',
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  clearable = true,
  weekStartsOn = 1,
  locale,
  showToday = true,
  name,
  id,
  className,
  wrapperClassName,
  popupClassName,
  onOpenChange,
  ...ariaRest
}) => {
  // ---- controlled / uncontrolled bridge -----------------------------------
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<Date | null>(
    defaultValue ?? null
  );
  const currentValue: Date | null = isControlled
    ? (value ?? null)
    : innerValue;

  // ---- ids ---------------------------------------------------------------
  const idBaseRef = React.useRef<string | null>(null);
  if (idBaseRef.current === null) idBaseRef.current = nextDatePickerId();
  const idBase = idBaseRef.current;
  const triggerId = id ?? `${idBase}-trigger`;
  const popupId = `${idBase}-popup`;

  // ---- open state --------------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const setOpenSafe = React.useCallback(
    (next: boolean) => {
      setOpen((prev) => {
        if (prev === next) return prev;
        onOpenChange?.(next);
        return next;
      });
    },
    [onOpenChange]
  );

  // ---- snapshot "today" once per open so the highlight is stable ---------
  // Recomputed each open so an app left running across midnight still
  // updates next time the picker opens.
  const today = React.useMemo(() => new Date(), [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- positioning -------------------------------------------------------
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<PopupPosition>({
    top: 0,
    left: 0,
    above: false,
  });
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    const popup = popupRef.current;
    if (!trigger) return;
    const popupH = popup?.offsetHeight ?? 0;
    setPosition(computePopupPosition(trigger.getBoundingClientRect(), popupH));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition]);

  React.useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updatePosition);
      if (triggerRef.current) ro.observe(triggerRef.current);
      if (popupRef.current) ro.observe(popupRef.current);
    }
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [open, updatePosition]);

  // ---- outside click -----------------------------------------------------
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      setOpenSafe(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, setOpenSafe]);

  // ---- pick / clear ------------------------------------------------------
  const commit = React.useCallback(
    (next: Date | null) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handlePick = React.useCallback(
    (date: Date) => {
      // Read-only opens the popup so the user can read the calendar,
      // but committing a new value is suppressed.
      if (readOnly) {
        setOpenSafe(false);
        triggerRef.current?.focus();
        return;
      }
      commit(date);
      setOpenSafe(false);
      // Return focus to the trigger so tab order is predictable.
      triggerRef.current?.focus();
    },
    [commit, readOnly, setOpenSafe]
  );

  const handleClear = React.useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      // The clear button lives inside the trigger button; stop the click
      // from also toggling the popup.
      event?.stopPropagation();
      commit(null);
      // Don't touch open state — let the user keep using the picker.
    },
    [commit]
  );

  const handleClose = React.useCallback(() => {
    setOpenSafe(false);
    triggerRef.current?.focus();
  }, [setOpenSafe]);

  // ---- trigger keyboard --------------------------------------------------
  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (open) {
      // Esc on the trigger (e.g. user re-focused it via Shift+Tab) still closes.
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenSafe(false);
      }
      return;
    }
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      setOpenSafe(true);
    }
  };

  // ---- locale -----------------------------------------------------------
  const resolvedLocale: CalendarLocale = React.useMemo(() => {
    if (!locale) return DEFAULT_LOCALE;
    return {
      ...DEFAULT_LOCALE,
      ...locale,
      weekdays: locale.weekdays ?? DEFAULT_LOCALE.weekdays,
      months: locale.months ?? DEFAULT_LOCALE.months,
    };
  }, [locale]);

  // ---- displayed text ---------------------------------------------------
  const displayText = currentValue ? formatDate(currentValue, format) : '';

  const showClearButton =
    clearable && !disabled && !readOnly && currentValue !== null;

  const popup =
    mounted && open ? (
      createPortal(
        <div
          ref={popupRef}
          id={popupId}
          className={cx(
            'su-datepicker__popup',
            position.above && 'su-datepicker__popup--above',
            popupClassName
          )}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
          }}
        >
          <Calendar
            value={currentValue}
            today={today}
            weekStartsOn={weekStartsOn}
            minDate={minDate}
            maxDate={maxDate}
            disabledDate={disabledDate}
            locale={{
              weekdays: resolvedLocale.weekdays,
              months: resolvedLocale.months,
              today: resolvedLocale.today,
              clear: resolvedLocale.clear,
              prevMonth: resolvedLocale.prevMonth,
              nextMonth: resolvedLocale.nextMonth,
            }}
            showToday={showToday}
            showClear={clearable}
            onPick={handlePick}
            onClear={() => {
              if (readOnly) {
                setOpenSafe(false);
                triggerRef.current?.focus();
                return;
              }
              commit(null);
              setOpenSafe(false);
              triggerRef.current?.focus();
            }}
            onClose={handleClose}
          />
        </div>,
        document.body
      )
    ) : null;

  // The trigger is a single <button>; the clear button — when shown — is a
  // sibling positioned absolutely on top of the trigger's right side so we
  // never nest interactive elements inside the trigger itself (which would
  // produce invalid HTML and conflicting ARIA roles).
  return (
    <span className={cx('su-datepicker', wrapperClassName)}>
      <span className="su-datepicker__shell">
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popupId}
          aria-invalid={error || undefined}
          aria-label={ariaRest['aria-label']}
          aria-labelledby={ariaRest['aria-labelledby']}
          disabled={disabled}
          className={cx(
            'su-datepicker__trigger',
            `su-datepicker__trigger--${size}`,
            error && 'su-datepicker__trigger--error',
            disabled && 'su-datepicker__trigger--disabled',
            readOnly && 'su-datepicker__trigger--readonly',
            open && 'su-datepicker__trigger--open',
            !displayText && 'su-datepicker__trigger--placeholder',
            showClearButton && 'su-datepicker__trigger--clearable',
            className
          )}
          onClick={() => {
            if (disabled) return;
            setOpenSafe(!open);
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="su-datepicker__value">
            {displayText || placeholder}
          </span>
          <span className="su-datepicker__icon" aria-hidden="true">
            <CalendarIcon />
          </span>
        </button>

        {showClearButton ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear date"
            className="su-datepicker__clear"
            onMouseDown={(e) => {
              // Prevent the trigger from receiving a focus/mousedown
              // that would otherwise toggle the popup before our click
              // handler runs.
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={handleClear}
          >
            <ClearGlyph />
          </button>
        ) : null}
      </span>

      {/* Hidden input for native form submission (ISO YYYY-MM-DD). */}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={currentValue ? toISODate(currentValue) : ''}
        />
      ) : null}

      {helperText ? (
        <span
          className={cx(
            'su-datepicker__helper',
            error && 'su-datepicker__helper--error'
          )}
        >
          {helperText}
        </span>
      ) : null}

      {popup}
    </span>
  );
};

DatePicker.displayName = 'DatePicker';
