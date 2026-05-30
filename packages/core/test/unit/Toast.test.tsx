import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toaster } from '../../src/components/Toast/ToastContainer';
import { toast } from '../../src/components/Toast/toastStore';

describe('<Toaster /> + toast()', () => {
  afterEach(() => {
    // Reset the singleton store between tests so leftover toasts from
    // one case don't leak into the next assertion.
    toast.dismiss();
  });

  it('mounts as a portal under document.body and renders nothing initially', () => {
    const { container } = render(<Toaster />);
    // Toaster returns null when no toasts; nothing in its mount node.
    expect(container.textContent).toBe('');
    // Region exists (pre-seeded for stable JSX) under body.
    expect(
      document.body.querySelector('.su-toast-region--top-right')
    ).toBeInTheDocument();
  });

  it('imperative toast() pushes a notification with role=status for default variant', () => {
    render(<Toaster />);

    act(() => {
      toast('Hello world');
    });

    const item = screen.getByText('Hello world').closest('[data-su-toast]') as HTMLElement;
    expect(item).not.toBeNull();
    expect(item).toHaveAttribute('role', 'status');
    expect(item).toHaveAttribute('aria-live', 'polite');
  });

  it('toast.danger uses role=alert + aria-live=assertive', () => {
    render(<Toaster />);
    act(() => {
      toast.danger('Network down');
    });

    const item = screen.getByText('Network down').closest('[data-su-toast]') as HTMLElement;
    expect(item).toHaveAttribute('role', 'alert');
    expect(item).toHaveAttribute('aria-live', 'assertive');
  });

  it('clicking the close button removes the toast and fires onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toaster />);

    act(() => {
      toast('Bye', { onClose, duration: 0 });
    });

    expect(screen.getByText('Bye')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /dismiss notification/i }));
    expect(screen.queryByText('Bye')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('toast.dismiss() with no arg clears every toast', () => {
    render(<Toaster />);
    act(() => {
      toast('one', { duration: 0 });
      toast('two', { duration: 0 });
      toast('three', { duration: 0 });
    });

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();

    act(() => {
      toast.dismiss();
    });

    expect(screen.queryByText('one')).toBeNull();
    expect(screen.queryByText('two')).toBeNull();
    expect(screen.queryByText('three')).toBeNull();
  });

  it('same-id replace updates the message in place instead of stacking', () => {
    render(<Toaster />);

    act(() => {
      toast('Saving…', { id: 'job-1', duration: 0 });
    });
    expect(screen.getByText('Saving…')).toBeInTheDocument();

    act(() => {
      toast('Saved!', { id: 'job-1', duration: 0 });
    });

    expect(screen.queryByText('Saving…')).toBeNull();
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });
});
