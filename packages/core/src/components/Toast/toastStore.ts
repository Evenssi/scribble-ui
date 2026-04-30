import type * as React from 'react';

// Note: this module is a *headless* store + command-bus for toasts.
// It deliberately has zero React imports at runtime so it can be invoked
// from anywhere (event handlers, async callbacks, even non-React code)
// without touching the React tree until <Toaster /> subscribes.
//
// Consumers must mount <Toaster /> once at the app root for messages
// to appear.
//
// File-name note: this lives in `toastStore.ts` (not `toast.ts`) because
// macOS' default file system is case-insensitive and `toast.ts` would
// collide with `Toast.tsx`, breaking esbuild + tsc resolution.

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  /** Label shown inside the action button (e.g. "Undo"). */
  label: React.ReactNode;
  /** Click handler. The toast will auto-dismiss after the action fires. */
  onClick: () => void;
}

export interface ToastOptions {
  /**
   * Auto-dismiss timeout in ms. `0` or non-finite values keep the toast
   * open until the user dismisses it (or `toast.dismiss(id)` is called).
   * Defaults to `4000` (resolved by `<Toaster defaultDuration>`).
   */
  duration?: number;
  /** Visual + semantic variant. Defaults to `'default'`. */
  variant?: ToastVariant;
  /** Where on the screen the toast appears. Falls back to `<Toaster defaultPlacement>`. */
  placement?: ToastPlacement;
  /** Render the built-in `✕` dismiss button. Defaults to `true`. */
  closable?: boolean;
  /**
   * Custom icon node. Pass `false` to suppress the default emoji icon.
   * When omitted, an emoji is picked based on `variant`.
   */
  icon?: React.ReactNode | false;
  /** Optional action button rendered in the bottom-right corner. */
  action?: ToastAction;
  /** Fired exactly once when the toast is removed (timeout, dismiss, or action). */
  onClose?: () => void;
  /**
   * Stable id. If a toast with the same id already exists it is replaced
   * in place — useful for "Saving…" → "Saved!" updates. Defaults to a
   * random string.
   */
  id?: string;
}

/**
 * Internal shape stored in the queue. `message` is broken out from
 * `ToastOptions` because it's required at runtime even though callers
 * pass it as the first positional arg.
 */
export interface ToastItem extends ToastOptions {
  id: string;
  message: React.ReactNode;
  createdAt: number;
}

type Listener = (items: ToastItem[]) => void;

class ToastStore {
  private items: ToastItem[] = [];
  private listeners = new Set<Listener>();

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /**
   * Returns the current snapshot. Reference identity changes on every
   * mutation so `useSyncExternalStore` will rerender; do not mutate.
   */
  getSnapshot = (): ToastItem[] => this.items;

  /** SSR snapshot — there's never any toast on the server. */
  getServerSnapshot = (): ToastItem[] => EMPTY;

  add = (item: ToastItem): string => {
    // Same-id replace keeps "update an existing toast" cheap and avoids
    // duplicate flashes when callers fire on every keystroke.
    this.items = [...this.items.filter((i) => i.id !== item.id), item];
    this.notify();
    return item.id;
  };

  remove = (id?: string): void => {
    if (id === undefined) {
      if (this.items.length === 0) return;
      this.items = [];
    } else {
      const next = this.items.filter((i) => i.id !== id);
      if (next.length === this.items.length) return;
      this.items = next;
    }
    this.notify();
  };

  private notify(): void {
    this.listeners.forEach((l) => l(this.items));
  }
}

// Stable empty array for the SSR snapshot — `useSyncExternalStore`
// requires referential stability across calls on the server.
const EMPTY: ToastItem[] = [];

/** Singleton store shared by every `toast()` call and `<Toaster />` instance. */
export const toastStore = new ToastStore();

const generateId = (): string => {
  const cryptoRef =
    typeof globalThis !== 'undefined'
      ? (globalThis as unknown as { crypto?: Crypto }).crypto
      : undefined;
  if (cryptoRef && typeof cryptoRef.randomUUID === 'function') {
    return cryptoRef.randomUUID();
  }
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
};

export interface ToastApi {
  (message: React.ReactNode, options?: ToastOptions): string;
  success: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) => string;
  warning: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) => string;
  danger: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) => string;
  info: (message: React.ReactNode, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Dismiss a specific toast by id, or all toasts when `id` is omitted. */
  dismiss: (id?: string) => void;
}

const createToast = (
  message: React.ReactNode,
  options: ToastOptions = {}
): string => {
  const id = options.id ?? generateId();
  toastStore.add({
    ...options,
    id,
    message,
    createdAt: Date.now(),
  });
  return id;
};

const withVariant = (variant: ToastVariant) =>
  (message: React.ReactNode, options: Omit<ToastOptions, 'variant'> = {}): string =>
    createToast(message, { ...options, variant });

/**
 * Imperative toast API.
 *
 * ```ts
 * toast('Saved');
 * toast.success('Profile updated');
 * toast.danger('Could not connect', { duration: 0 });
 * toast.dismiss();
 * ```
 *
 * `<Toaster />` must be mounted somewhere in the React tree (typically
 * at the app root) for these calls to render anything.
 */
export const toast: ToastApi = Object.assign(createToast, {
  success: withVariant('success'),
  warning: withVariant('warning'),
  danger: withVariant('danger'),
  info: withVariant('info'),
  dismiss: (id?: string) => toastStore.remove(id),
});
