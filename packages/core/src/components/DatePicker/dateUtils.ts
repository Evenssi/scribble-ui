/* scribble-ui · DatePicker / dateUtils
 *
 * Native-Date helpers — zero dependency. We deliberately do NOT pull in
 * dayjs / date-fns / luxon. The set is intentionally tiny: only what
 * the calendar grid + keyboard navigation + format/serialize paths need.
 *
 * Conventions:
 * - All inputs / outputs are local-time `Date` objects.
 * - "Day" granularity ignores time — comparisons clamp to start-of-day.
 * - `weekStartsOn` is `0` (Sunday) or `1` (Monday).
 */

/** Returns a new Date at 00:00:00.000 of the same calendar day. */
export function startOfDay(d: Date): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return out;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Add `n` whole days. Negative values subtract. */
export function addDays(d: Date, n: number): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  return out;
}

/**
 * Add `n` whole months. The day-of-month is clamped to the last valid
 * day if the target month is shorter (e.g. Jan 31 + 1 month -> Feb 28/29).
 */
export function addMonths(d: Date, n: number): Date {
  const year = d.getFullYear();
  const month = d.getMonth() + n;
  const day = d.getDate();
  // Pin to the 1st first to avoid the JS auto-overflow surprise.
  const targetMonth = new Date(year, month, 1);
  const lastDayOfTargetMonth = new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth() + 1,
    0
  ).getDate();
  return new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth(),
    Math.min(day, lastDayOfTargetMonth)
  );
}

/** Add `n` whole years. Day-of-month is clamped (Feb 29 → Feb 28 in non-leap). */
export function addYears(d: Date, n: number): Date {
  return addMonths(d, n * 12);
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  // Day 0 of next month == last day of current month.
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * Move `d` to the first day of its containing week, given `weekStartsOn`.
 * Time-of-day is preserved in spirit but clamped to start-of-day (the
 * calendar grid never cares about hours).
 */
export function startOfWeek(d: Date, weekStartsOn: 0 | 1): Date {
  const day = d.getDay(); // 0 = Sunday … 6 = Saturday
  // Distance from week-start, mod 7 — works for both 0 and 1.
  const diff = (day - weekStartsOn + 7) % 7;
  return addDays(startOfDay(d), -diff);
}

export function endOfWeek(d: Date, weekStartsOn: 0 | 1): Date {
  return addDays(startOfWeek(d, weekStartsOn), 6);
}

/**
 * Build a 6×7 grid (42 dates) covering the month that `month` falls in.
 * Always returns exactly 42 entries so the calendar layout stays stable
 * across months — adjacent-month days are filled with their real Date.
 */
export function getCalendarGrid(month: Date, weekStartsOn: 0 | 1): Date[] {
  const first = startOfMonth(month);
  const gridStart = startOfWeek(first, weekStartsOn);
  const out: Date[] = [];
  for (let i = 0; i < 42; i++) {
    out.push(addDays(gridStart, i));
  }
  return out;
}

/** True if `d` is strictly before `min` (day granularity). */
export function isBeforeDay(d: Date, min: Date): boolean {
  return startOfDay(d).getTime() < startOfDay(min).getTime();
}

/** True if `d` is strictly after `max` (day granularity). */
export function isAfterDay(d: Date, max: Date): boolean {
  return startOfDay(d).getTime() > startOfDay(max).getTime();
}

/**
 * Format a Date with the MVP token set: YYYY / MM / DD.
 *
 * - YYYY → 4-digit year
 * - MM   → 2-digit month
 * - DD   → 2-digit day
 *
 * Other characters pass through unchanged. We deliberately do not
 * implement D / YY / MMM / etc. — keep the surface tiny; if richer
 * formatting is needed callers should feed `Intl.DateTimeFormat` from
 * outside.
 */
export function formatDate(d: Date, format: string): string {
  const yyyy = String(d.getFullYear()).padStart(4, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  // Replace the longest tokens first to avoid "MM" eating "MMM" etc.
  return format
    .replace(/YYYY/g, yyyy)
    .replace(/MM/g, mm)
    .replace(/DD/g, dd);
}

/**
 * Serialize a Date as `YYYY-MM-DD` (no time, no timezone). This is the
 * value submitted via the hidden `<input>` so it round-trips reliably
 * regardless of the user's `format` prop.
 */
export function toISODate(d: Date): string {
  return formatDate(d, 'YYYY-MM-DD');
}

/** Pad a number to `len` digits — small private helper used by tests too. */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
