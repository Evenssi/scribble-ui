import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover } from '../../src/components/Popover/Popover';

describe('<Popover />', () => {
  it('does not render the surface by default and exposes ARIA on the trigger', () => {
    render(
      <Popover content={<div>panel body</div>}>
        <button type="button">Open</button>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    // Surface is not in the document yet.
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('panel body')).toBeNull();
  });

  it('opens on click and closes on a second click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>panel body</div>}>
        <button type="button">Open</button>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('panel body')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('wires aria-labelledby when a title is provided', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>} title="Popover heading">
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));

    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)?.textContent).toBe('Popover heading');
  });

  it('fires onOpenChange in controlled mode without flipping internal state', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Popover content={<div>body</div>} open={false} onOpenChange={onOpenChange}>
        <button type="button">Open</button>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);

    // Controlled: parent didn't flip the prop, so the popover stays closed.
    expect(screen.queryByRole('dialog')).toBeNull();
    // But the change request fired with `true`.
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('closes on ESC by default and stays open when closeOnEsc={false}', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Popover content={<div>body</div>}>
        <button type="button">Open</button>
      </Popover>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(
      <Popover content={<div>body</div>} closeOnEsc={false}>
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on outside click by default', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover content={<div>panel</div>}>
          <button type="button">Open</button>
        </Popover>
        <button type="button">outside</button>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('does not open when content is falsy (disabled)', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={null}>
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('manual trigger ignores click and only responds to controlled open', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Popover content={<div>body</div>} trigger="manual" open={false}>
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(
      <Popover content={<div>body</div>} trigger="manual" open={true}>
        <button type="button">Open</button>
      </Popover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
