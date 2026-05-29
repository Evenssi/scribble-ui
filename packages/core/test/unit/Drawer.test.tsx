import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Drawer } from '../../src/components/Drawer/Drawer';

describe('<Drawer />', () => {
  it('renders nothing when open={false}', () => {
    render(
      <Drawer open={false} onClose={() => {}}>
        body
      </Drawer>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders a dialog and portals into document.body', () => {
    const { container } = render(
      <Drawer open onClose={() => {}}>
        body
      </Drawer>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(container.contains(dialog)).toBe(false);
    expect(document.body.contains(dialog)).toBe(true);
  });

  it('applies the default right-placement class and falls back to size md', () => {
    render(
      <Drawer open onClose={() => {}}>
        body
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/su-drawer--right/);
    expect(dialog.className).toMatch(/su-drawer--md/);
  });

  it.each(['left', 'right', 'top', 'bottom'] as const)(
    'applies the %s placement modifier',
    (placement) => {
      render(
        <Drawer open onClose={() => {}} placement={placement}>
          body
        </Drawer>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog.className).toMatch(new RegExp(`su-drawer--${placement}`));
    }
  );

  it('auto-wires aria-labelledby when header is a string', () => {
    render(
      <Drawer open header="Settings" onClose={() => {}}>
        body
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const heading = screen.getByRole('heading', { level: 2, name: 'Settings' });
    expect(heading).toHaveAttribute('id', labelId!);
  });

  it('closes via ESC, overlay click, and the built-in close button', async () => {
    const user = userEvent.setup();

    function Host() {
      const [open, setOpen] = useState(true);
      return (
        <Drawer open={open} onClose={() => setOpen(false)}>
          body
        </Drawer>
      );
    }

    const { rerender } = render(<Host />);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(<Host key="overlay" />);
    const overlay = document.querySelector('[data-su-drawer-overlay]') as HTMLElement;
    await user.click(overlay);
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(<Host key="close-btn" />);
    await user.click(screen.getByRole('button', { name: /close drawer/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('respects closeOnEscape={false} and closeOnOverlayClick={false}', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Drawer
        open
        onClose={onClose}
        closeOnEscape={false}
        closeOnOverlayClick={false}
      >
        body
      </Drawer>
    );

    await user.keyboard('{Escape}');
    const overlay = document.querySelector('[data-su-drawer-overlay]') as HTMLElement;
    await user.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
