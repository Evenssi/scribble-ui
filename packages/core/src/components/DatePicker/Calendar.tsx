import * as React from 'react';
import {
  addDays,
  addMonths,
  addYears,
  endOfWeek,
  getCalendarGrid,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from './dateUtils';

export interface CalendarLocale {
  /** 7 weekday short labels, indexed by JS getDay() (0 = Sunday). */
  weekdays: string[];
  /** 12 month names, indexed 0..11. */
  months: string[];
  /** Label for the "Today" footer button. */
  today?: string;
  /** Label for the "Clear" footer button. */
  clear?: string;
  /** Label for the previous-month nav button (visually hidden / aria). */
  prevMonth?: string;
  /** Label for the next-month nav button. */
  nextMonth?: string;
}

export interface CalendarProps {
  /** Currently selected date, if any. */
  value: Date | null;
  /** Today, snapshot at popup open. */
  today: Date;
  /** First day of week — 0 (Sun) or 1 (Mon). */
  weekStartsOn: 0 | 1;
  /** Hard lower bound (inclusive). */
  minDate?: Date;
  /** Hard upper bound (inclusive). */
  maxDate?: Date;
  /** Custom predicate; OR-ed with min/max. */
  disabledDate?: (date: Date) => boolean;
  /** Locale strings; required (parent picks a default). */
  locale: Required<Pick<CalendarLocale, 'weekdays' | 'months'>> &
    CalendarLocale;
  /** "Today" footer button visibility. */
  showToday?: boolean;
  /** Show clear shortcut in the footer. */
  showClear?: boolean;
  /** Called when the user picks a day (click or Enter / Space). */
  onPick: (date: Date) => void;
  /** Called when the user clicks "Clear". */
  onClear?: () => void;
  /** Called when the user closes via Esc. */
  onClose: () => void;
  /** Optional className appended to the calendar root. */
  className?: string;
}

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Resolve whether a given day is disabled. Centralised here so click +
 * keyboard land on the same predicate.
 */
function isDayDisabled(
  day: Date,
  minDate: Date | undefined,
  maxDate: Date | undefined,
  disabledDate: ((d: Date) => boolean) | undefined
): boolean {
  if (minDate && isBeforeDay(day, minDate)) return true;
  if (maxDate && isAfterDay(day, maxDate)) return true;
  if (disabledDate && disabledDate(day)) return true;
  return false;
}

/**
 * Calendar — the visual + keyboard core inside the DatePicker popup.
 *
 * Responsibilities:
 * - Render the 6×7 day grid for `viewMonth`.
 * - Track an internal "focused day" used by arrow-key navigation; this
 *   is independent from the selected value (you can navigate without
 *   selecting).
 * - Forward `onPick` whenever the user commits a day, and `onClose`
 *   for Esc.
 *
 * The parent `DatePicker` owns the popup open state and the `viewMonth`
 * cursor — Calendar is intentionally "dumb" enough to be reusable.
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      value,
      today,
      weekStartsOn,
      minDate,
      maxDate,
      disabledDate,
      locale,
      showToday = true,
      showClear = false,
      onPick,
      onClear,
      onClose,
      className,
    },
    ref
  ) {
    // ----- viewMonth: which month is on screen -----------------------------
    // Starts on the selected value's month, else today's month.
    const [viewMonth, setViewMonth] = React.useState<Date>(() =>
      startOfMonth(value ?? today)
    );

    // If `value` shifts to a different month externally, follow it.
    React.useEffect(() => {
      if (value && !isSameMonth(value, viewMonth)) {
        setViewMonth(startOfMonth(value));
      }
      // Intentionally omit `viewMonth` from deps — we only sync on value change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // ----- focusedDay: keyboard navigation cursor --------------------------
    // We initialise it to the selected value, else today, else first of view.
    const [focusedDay, setFocusedDay] = React.useState<Date>(() => {
      if (value) return startOfDay(value);
      return startOfDay(today);
    });

    // Keep focusedDay inside the visible month — when the user pages months
    // we snap focus into the new month (preserving day-of-month if possible).
    React.useEffect(() => {
      if (!isSameMonth(focusedDay, viewMonth)) {
        // Try to keep the day number; clamp to month length.
        const clampDay = Math.min(
          focusedDay.getDate(),
          new Date(
            viewMonth.getFullYear(),
            viewMonth.getMonth() + 1,
            0
          ).getDate()
        );
        setFocusedDay(
          new Date(viewMonth.getFullYear(), viewMonth.getMonth(), clampDay)
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMonth.getFullYear(), viewMonth.getMonth()]);

    // ----- DOM focus management --------------------------------------------
    // Move browser focus to the focused day-cell so screen readers announce
    // it and so the grid acts like a single roving-tabindex widget.
    const gridRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      const node = gridRef.current?.querySelector<HTMLButtonElement>(
        '[data-focused="true"]'
      );
      node?.focus();
    }, [focusedDay]);

    // ----- grid & weekday labels -------------------------------------------
    const grid = React.useMemo(
      () => getCalendarGrid(viewMonth, weekStartsOn),
      [viewMonth, weekStartsOn]
    );

    const weekdayLabels = React.useMemo(() => {
      // locale.weekdays is indexed by getDay() (Sunday = 0). Rotate so the
      // first label matches `weekStartsOn`.
      const out: string[] = [];
      for (let i = 0; i < 7; i++) {
        const idx = (i + weekStartsOn) % 7;
        const label = locale.weekdays[idx];
        if (label !== undefined) out.push(label);
      }
      return out;
    }, [locale.weekdays, weekStartsOn]);

    // ----- handlers --------------------------------------------------------
    const tryPick = React.useCallback(
      (day: Date) => {
        if (isDayDisabled(day, minDate, maxDate, disabledDate)) return;
        onPick(startOfDay(day));
      },
      [minDate, maxDate, disabledDate, onPick]
    );

    const moveFocus = React.useCallback(
      (next: Date) => {
        // Page the view if the new focus is in another month.
        if (!isSameMonth(next, viewMonth)) {
          setViewMonth(startOfMonth(next));
        }
        setFocusedDay(startOfDay(next));
      },
      [viewMonth]
    );

    const onGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          moveFocus(addDays(focusedDay, -1));
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveFocus(addDays(focusedDay, 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          moveFocus(addDays(focusedDay, -7));
          break;
        case 'ArrowDown':
          event.preventDefault();
          moveFocus(addDays(focusedDay, 7));
          break;
        case 'PageUp':
          event.preventDefault();
          moveFocus(
            event.shiftKey
              ? addYears(focusedDay, -1)
              : addMonths(focusedDay, -1)
          );
          break;
        case 'PageDown':
          event.preventDefault();
          moveFocus(
            event.shiftKey
              ? addYears(focusedDay, 1)
              : addMonths(focusedDay, 1)
          );
          break;
        case 'Home':
          event.preventDefault();
          moveFocus(startOfWeek(focusedDay, weekStartsOn));
          break;
        case 'End':
          event.preventDefault();
          moveFocus(endOfWeek(focusedDay, weekStartsOn));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          tryPick(focusedDay);
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        // Tab falls through — focus naturally leaves the grid.
        default:
          break;
      }
    };

    const monthLabel = `${viewMonth.getFullYear()} · ${
      locale.months[viewMonth.getMonth()] ?? ''
    }`;

    return (
      <div
        ref={ref}
        className={cx('su-calendar', className)}
        role="dialog"
        aria-label={monthLabel}
      >
        {/* === Header: nav + month label =========================== */}
        <div className="su-calendar__header">
          <button
            type="button"
            className="su-calendar__nav"
            aria-label={locale.prevMonth ?? 'Previous month'}
            onClick={() => setViewMonth((m) => addMonths(m, -1))}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9 2.5 L4 7 L9 11.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="su-calendar__title" aria-live="polite">
            {monthLabel}
          </div>

          <button
            type="button"
            className="su-calendar__nav"
            aria-label={locale.nextMonth ?? 'Next month'}
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 2.5 L10 7 L5 11.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* === Weekday labels ====================================== */}
        <div className="su-calendar__weekdays" aria-hidden="true">
          {weekdayLabels.map((label, i) => (
            <span key={`${label}-${i}`} className="su-calendar__weekday">
              {label}
            </span>
          ))}
        </div>

        {/* === Day grid =========================================== */}
        <div
          ref={gridRef}
          className="su-calendar__grid"
          role="grid"
          aria-label={monthLabel}
          onKeyDown={onGridKeyDown}
        >
          {grid.map((day, idx) => {
            const inMonth = isSameMonth(day, viewMonth);
            const selected = value !== null && isSameDay(day, value);
            const isToday = isSameDay(day, today);
            const focused = isSameDay(day, focusedDay);
            const disabled = isDayDisabled(
              day,
              minDate,
              maxDate,
              disabledDate
            );
            return (
              <button
                key={idx}
                type="button"
                role="gridcell"
                aria-selected={selected || undefined}
                aria-current={isToday ? 'date' : undefined}
                aria-disabled={disabled || undefined}
                tabIndex={focused ? 0 : -1}
                data-focused={focused ? 'true' : undefined}
                disabled={disabled}
                className={cx(
                  'su-calendar__day',
                  !inMonth && 'su-calendar__day--outside',
                  isToday && 'su-calendar__day--today',
                  selected && 'su-calendar__day--selected',
                  disabled && 'su-calendar__day--disabled'
                )}
                onClick={() => tryPick(day)}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>

        {/* === Footer (today / clear) ============================== */}
        {(showToday || showClear) && (
          <div className="su-calendar__footer">
            {showToday && (
              <button
                type="button"
                className="su-calendar__shortcut"
                onClick={() => {
                  setViewMonth(startOfMonth(today));
                  setFocusedDay(startOfDay(today));
                  tryPick(today);
                }}
                disabled={isDayDisabled(
                  today,
                  minDate,
                  maxDate,
                  disabledDate
                )}
              >
                {locale.today ?? 'Today'}
              </button>
            )}
            {showClear && onClear && (
              <button
                type="button"
                className="su-calendar__shortcut"
                onClick={onClear}
              >
                {locale.clear ?? 'Clear'}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);
