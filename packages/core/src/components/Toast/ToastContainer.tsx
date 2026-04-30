import * as React from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { toastStore, type ToastItem, type ToastPlacement } from './toastStore';

// Note: this component does NOT import its CSS file directly. Consumers
// must import the styles explicitly via:
//
//   import 'scribble-ui/styles/tokens.css';
//   import 'scribble-ui/styles/components.css';

export interface ToasterProps {
  /**
   * Default placement for any toast that does not explicitly opt into
   * its own. Defaults to `'top-right'`.
   */
  defaultPlacement?: ToastPlacement;
  /**
   * Maximum number of toasts visible per region at once. Older toasts
   * past the limit stay in the queue and slot in as visible ones close.
   * Defaults to `5`.
   */
  limit?: number;
  /**
   * Default auto-dismiss duration in ms. Pass `0` to make every toast
   * persistent unless individually overridden. Defaults to `4000`.
   */
  defaultDuration?: number;
  /**
   * Stacking context for the portalled regions. Defaults to `10000`.
   */
  zIndex?: number;
}

const ALL_PLACEMENTS: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const groupByPlacement = (
  items: ToastItem[],
  fallback: ToastPlacement
): Record<ToastPlacement, ToastItem[]> => {
  // Pre-seed every region so the JSX iteration is stable; otherwise
  // React would mount/unmount entire regions as toasts come and go.
  const out: Record<ToastPlacement, ToastItem[]> = {
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': [],
  };
  for (const item of items) {
    const place = item.placement ?? fallback;
    out[place].push(item);
  }
  return out;
};

/**
 * `<Toaster />` — renders the queue maintained by the global `toast()` API.
 *
 * Mount once near your application root:
 *
 * ```tsx
 * import { Toaster, toast } from 'scribble-ui';
 *
 * export default function Root({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <Toaster placement defaultPlacement="bottom-right" />
 *     </>
 *   );
 * }
 * ```
 *
 * Subsequent `toast.success('Saved')` calls anywhere in the tree (or
 * outside it!) will surface here.
 *
 * SSR notes: this component returns `null` during SSR / before the
 * portal target exists, so it is safe to render on the server.
 */
export function Toaster({
  defaultPlacement = 'top-right',
  limit = 5,
  defaultDuration = 4000,
  zIndex = 10000,
}: ToasterProps = {}): JSX.Element | null {
  // SSR guard #1: useSyncExternalStore requires a stable server snapshot.
  const items = React.useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot
  );

  // SSR guard #2: defer the portal until after the first client commit
  // so we never reach for `document.body` during render. Mirrors Modal.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // SSR guard #3: belt-and-braces in case this gets rendered in an
  // environment where `document` is undefined (RSC, edge runtime probes).
  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  const grouped = groupByPlacement(items, defaultPlacement);

  const tree = (
    <>
      {ALL_PLACEMENTS.map((placement) => {
        const list = grouped[placement];
        // Slice from the *end* for top-* regions so the newest toast
        // sits closest to the viewport edge; bottom-* regions reverse
        // visually via CSS so the same slice rule keeps newest-near-edge.
        const visible = list.slice(-limit);
        return (
          <div
            key={placement}
            className={`su-toast-region su-toast-region--${placement}`}
            role="region"
            aria-label="Notifications"
            style={{ zIndex }}
          >
            {visible.map((item) => (
              <Toast
                key={item.id}
                item={item}
                duration={item.duration ?? defaultDuration}
                closable={item.closable ?? true}
              />
            ))}
          </div>
        );
      })}
    </>
  );

  return createPortal(tree, document.body);
}

Toaster.displayName = 'Toaster';
