import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert } from '../../src/components/Alert/Alert';

describe('<Alert />', () => {
  it('renders with role=status + aria-live=polite for info / success variants', () => {
    render(<Alert variant="info">Heads up</Alert>);

    const alert = screen.getByRole('status');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert.className).toMatch(/su-alert--variant-info/);
    expect(alert.textContent).toContain('Heads up');
  });

  it('escalates to role=alert + aria-live=assertive for warning / error variants', () => {
    const { rerender } = render(<Alert variant="warning">Be careful</Alert>);
    let alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert.className).toMatch(/su-alert--variant-warning/);

    rerender(<Alert variant="error">Boom</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert.className).toMatch(/su-alert--variant-error/);
  });

  it('uncontrolled close: clicking ✕ unmounts and still fires onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Alert closable onClose={onClose}>
        Cookies?
      </Alert>
    );

    const closeBtn = screen.getByRole('button', { name: /close alert/i });
    await user.click(closeBtn);

    // Uncontrolled mode: alert fully unmounts.
    expect(screen.queryByRole('status')).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('controlled close: visible=false hides immediately and onClose fires once', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    function Controlled() {
      const [visible, setVisible] = useState(true);
      return (
        <Alert
          closable
          visible={visible}
          onClose={() => {
            onClose();
            setVisible(false);
          }}
        >
          Controlled body
        </Alert>
      );
    }

    render(<Controlled />);
    expect(screen.getByText('Controlled body')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close alert/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Controlled body')).toBeNull();
  });

  it('renders a custom title and a banner modifier class when banner=true', () => {
    render(
      <Alert variant="success" banner title="Saved">
        Profile updated
      </Alert>
    );

    const alert = screen.getByRole('status');
    expect(alert.className).toMatch(/su-alert--banner/);
    expect(alert.className).toMatch(/su-alert--has-title/);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Profile updated')).toBeInTheDocument();
  });
});
