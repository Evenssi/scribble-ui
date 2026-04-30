import * as React from 'react';
import { toastStore, type ToastItem, type ToastVariant } from './toastStore';

// Note: this is the per-item visual component. It is *not* exported from
// the package barrel — consumers interact only with `<Toaster />` and the
// imperative `toast()` API. Keeping it internal lets us iterate on the
// markup without breaking semver.

export interface ToastProps {
  item: ToastItem;
  /** Resolved duration after `<Toaster defaultDuration>` is applied. */
  duration: number;
  /** Resolved closable flag after defaults apply. */
  closable: boolean;
}

const VARIANT_ICONS: Record<ToastVariant, string> = {
  default: '✎',
  success: '✓',
  warning: '⚠',
  danger: '✕',
  info: 'ℹ',
};

// success/info/default are passive announcements; warning/danger are
// interruptive enough to warrant `assertive`.
const VARIANT_LIVE: Record<ToastVariant, 'polite' | 'assertive'> = {
  default: 'polite',
  success: 'polite',
  info: 'polite',
  warning: 'assertive',
  danger: 'assertive',
};

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Single toast notification.
 *
 * v1 simplification: when a toast leaves the queue we unmount it
 * immediately (no exit animation). The enter animation still plays.
 * A `data-leaving` based exit pass can be layered on later without an
 * API change.
 */
export function Toast({ item, duration, closable }: ToastProps): JSX.Element {
  const variant: ToastVariant = item.variant ?? 'default';
  const role = variant === 'warning' || variant === 'danger' ? 'alert' : 'status';
  const ariaLive = VARIANT_LIVE[variant];

  // --- Auto dismiss with hover-pause ---------------------------------------
  // We track "elapsed" rather than reset the timer on every hover toggle
  // so that mousing in and out does not let users keep a toast forever
  // accidentally — it just freezes the countdown while pointer is over it.
  const remainingRef = React.useRef<number>(duration);
  const startedAtRef = React.useRef<number>(Date.now());
  const timerRef = React.useRef<number | null>(null);

  const isPersistent = !Number.isFinite(duration) || duration <= 0;

  const dismiss = React.useCallback(() => {
    // `remove` triggers a store notification which unmounts this node;
    // the onClose callback fires here so it runs exactly once even if
    // the same id is later reused.
    toastStore.remove(item.id);
    item.onClose?.();
  }, [item]);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleDismiss = React.useCallback(
    (ms: number) => {
      clearTimer();
      if (ms <= 0) {
        // Defer to a microtask so we don't dismiss synchronously inside
        // a render — keeps React happy and matches the timeout contract.
        timerRef.current = window.setTimeout(dismiss, 0);
        return;
      }
      startedAtRef.current = Date.now();
      timerRef.current = window.setTimeout(dismiss, ms);
    },
    [clearTimer, dismiss]
  );

  React.useEffect(() => {
    if (isPersistent) return;
    remainingRef.current = duration;
    scheduleDismiss(duration);
    return clearTimer;
    // We deliberately re-key on item.id so a same-id replacement resets
    // the countdown (consistent with the "update existing toast" UX).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, duration, isPersistent]);

  const handleMouseEnter = (): void => {
    if (isPersistent) return;
    if (timerRef.current === null) return;
    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    clearTimer();
  };

  const handleMouseLeave = (): void => {
    if (isPersistent) return;
    if (remainingRef.current <= 0) {
      dismiss();
      return;
    }
    scheduleDismiss(remainingRef.current);
  };

  // --- Action button -------------------------------------------------------
  const handleAction = (): void => {
    item.action?.onClick();
    dismiss();
  };

  // --- Icon resolution -----------------------------------------------------
  let iconNode: React.ReactNode = null;
  if (item.icon === false) {
    iconNode = null;
  } else if (item.icon !== undefined && item.icon !== null) {
    iconNode = item.icon;
  } else {
    iconNode = VARIANT_ICONS[variant];
  }

  return (
    <div
      className={cx('su-toast', `su-toast--${variant}`)}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-su-toast=""
    >
      {iconNode !== null && (
        <span className="su-toast__icon" aria-hidden="true">
          {iconNode}
        </span>
      )}

      <div className="su-toast__body">
        <div className="su-toast__message">{item.message}</div>
        {item.action && (
          <div className="su-toast__actions">
            <button
              type="button"
              className="su-toast__action"
              onClick={handleAction}
            >
              {item.action.label}
            </button>
          </div>
        )}
      </div>

      {closable && (
        <button
          type="button"
          className="su-toast__close"
          aria-label="Dismiss notification"
          onClick={dismiss}
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
}

Toast.displayName = 'Toast';
