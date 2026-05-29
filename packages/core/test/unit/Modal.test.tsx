import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '../../src/components/Modal/Modal';

describe('<Modal />', () => {
  it('renders nothing when open={false}', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        body
      </Modal>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('body')).toBeNull();
  });

  it('renders a dialog with role/aria-modal and portals into document.body', () => {
    const { container } = render(
      <Modal open onClose={() => {}}>
        hello
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    // Portal target is document.body, so the dialog must NOT live inside
    // the RTL-injected container.
    expect(container.contains(dialog)).toBe(false);
    expect(document.body.contains(dialog)).toBe(true);
  });

  it('auto-wires aria-labelledby when header is a string', () => {
    render(
      <Modal open header="Delete file?" onClose={() => {}}>
        confirm body
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();

    // The wired id resolves to an <h2> with the string we passed.
    const heading = screen.getByRole('heading', { level: 2, name: 'Delete file?' });
    expect(heading).toHaveAttribute('id', labelId!);
  });

  it('closes via ESC, overlay click, and the built-in close button', async () => {
    const user = userEvent.setup();

    function Host() {
      const [open, setOpen] = useState(true);
      return (
        <Modal open={open} onClose={() => setOpen(false)} header="Title">
          body
        </Modal>
      );
    }

    const { rerender } = render(<Host />);

    // 1) ESC closes.
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();

    // Re-mount a fresh Host for the next path.
    rerender(<Host key="ck-overlay" />);
    // 2) Click on the overlay closes.
    const overlay = document.querySelector('[data-su-modal-overlay]') as HTMLElement;
    expect(overlay).not.toBeNull();
    await user.click(overlay);
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(<Host key="ck-button" />);
    // 3) Built-in close button closes.
    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('respects closeOnEscape={false} and closeOnOverlayClick={false}', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal
        open
        onClose={onClose}
        closeOnEscape={false}
        closeOnOverlayClick={false}
      >
        body
      </Modal>
    );

    await user.keyboard('{Escape}');
    const overlay = document.querySelector('[data-su-modal-overlay]') as HTMLElement;
    await user.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('omits the built-in close button when showCloseButton={false}', () => {
    render(
      <Modal open onClose={() => {}} showCloseButton={false}>
        body
      </Modal>
    );
    expect(screen.queryByRole('button', { name: /close dialog/i })).toBeNull();
  });

  it('applies the size modifier class', () => {
    render(
      <Modal open onClose={() => {}} size="lg">
        body
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/su-modal--lg/);
  });
});
