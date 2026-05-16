import type { ToastDoc } from '../../zh-CN/components/toast';

export const toastEn: ToastDoc = {
  title: 'Toast',
  lede:
    'Lightweight, hand-drawn notifications driven by a global imperative API. Mount `<Toaster />` once at your app root, then fire `toast(…)` from anywhere — even outside the React tree. For real apps, mount `<Toaster />` once at the app root.',
  sections: {
    basic: 'Basic',
    placements: 'Placements',
    duration: 'Duration',
    action: 'Action',
    dismiss: 'Programmatic dismiss',
    code: 'Code',
  },
  notes: {
    basic:
      'Each variant maps to the same status palette as Button and Tag, so a destructive notice reads as destructive without extra styling.',
    placements:
      'A single `<Toaster />` renders six regions; per-call `placement` chooses one. Bottom regions stack newest-first near the viewport edge.',
    duration:
      'Pass `duration` in milliseconds. `0` (or `Infinity`) keeps the toast open until the user dismisses it. Hovering pauses the countdown automatically.',
    action:
      'Pair a destructive notification with an inline `action` (such as *Undo*). The toast auto-dismisses after the action fires.',
    dismiss:
      'Each `toast()` call returns its id; pass it to `toast.dismiss(id)` to close one toast, or call `toast.dismiss()` with no argument to clear the entire queue at once.',
    apiFooter:
      'The single `<Toaster />` instance is portalled to `document.body`, so it escapes any clipping ancestor and is safe to mount inside narrow layouts.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      duration: {
        description: 'Auto-dismiss timeout in ms. Pass `0` or `Infinity` to make the toast persistent.',
      },
      variant: {
        description:
          'Visual + semantic variant. Warning and danger use `role="alert"` and `aria-live="assertive"`.',
      },
      placement: {
        description: 'Which region to land in. Falls back to the Toaster default.',
      },
      closable: { description: 'Render the built-in `✕` dismiss button.' },
      icon: {
        description:
          'Custom icon node, or `false` to suppress the default emoji glyph picked by variant.',
      },
      action: {
        description: 'Inline action button (e.g. "Undo"). The toast auto-dismisses after the action fires.',
      },
      onClose: { description: 'Fired exactly once when the toast is removed.' },
      id: {
        description:
          'Stable id. A toast with an existing id replaces the previous one in place — handy for "Saving… → Saved!" flows.',
      },
    },
  },
  apiHeadings: {
    methods: 'API · toast()',
    options: 'API · ToastOptions',
    toaster: 'API · <Toaster />',
  },
  apiMethodHeaders: { method: 'Method', signature: 'Signature', description: 'Description' },
  apiMethods: {
    base: {
      description:
        'Push a toast onto the queue. Returns the toast id, which can later be passed to `toast.dismiss(id)`.',
    },
    success: { description: "Shortcut for `toast(msg, { variant: 'success' })`." },
    warning: { description: 'Shortcut for the warning variant.' },
    danger: { description: 'Shortcut for the danger variant. Uses `role="alert"`.' },
    info: { description: 'Shortcut for the info variant.' },
    dismissMethod: {
      description: 'Dismiss a toast by id. With no argument, clears every toast in every region.',
    },
  },
  apiToaster: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      defaultPlacement: {
        description: 'Region used for any toast that does not specify its own `placement`.',
      },
      limit: {
        description:
          'Maximum visible toasts per region. Older toasts past the limit are dropped from view but remain in the queue until dismissed or auto-closed.',
      },
      defaultDuration: {
        description: 'Default auto-dismiss timeout in ms. Override per-toast via `options.duration`.',
      },
      zIndex: { description: 'Stacking context applied to every region.' },
    },
  },
};
