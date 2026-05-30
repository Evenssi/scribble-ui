import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('omits the arrow node when showArrow={false}', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>} showArrow={false}>
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toMatch(/su-popover--no-arrow/);
    expect(dialog.querySelector('[data-su-popover-arrow]')).toBeNull();
  });

  it('renders the arrow and applies a placement modifier by default', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>} placement="top">
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog');
    // Placement may flip to bottom in jsdom (no real layout), so just
    // assert the modifier class scheme matches one of the four sides.
    expect(dialog.className).toMatch(/su-popover--(top|bottom|left|right)/);
    expect(dialog.querySelector('[data-su-popover-arrow]')).not.toBeNull();
  });

  it('appends extra className to the popover surface', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>} className="my-popover">
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog').className).toMatch(/my-popover/);
  });

  it('renders an optional footer slot below the body', async () => {
    const user = userEvent.setup();
    render(
      <Popover
        content={<div>body</div>}
        footer={<button type="button">Confirm</button>}
      >
        <button type="button">Open</button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(
      screen.getByRole('dialog').querySelector('.su-popover__footer')
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('opens on hover with zero delay (uncontrolled hover trigger)', () => {
    render(
      <Popover
        content={<div>panel body</div>}
        trigger="hover"
        openDelay={0}
        closeDelay={0}
      >
        <button type="button">Open</button>
      </Popover>
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Pointer leaves the trigger → schedules close (delay 0 → immediate).
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens on focus and closes on blur when trigger="focus"', async () => {
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>} trigger="focus" openDelay={0} closeDelay={0}>
        <button type="button">Open</button>
      </Popover>
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();
    // Focus trigger fires onFocus → scheduleOpen.
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    // Tab away to drop focus.
    await user.tab();
    // focusout listener should close us.
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('preserves the original trigger onClick before toggling open', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Popover content={<div>body</div>}>
        <button type="button" onClick={onClick}>
          Open
        </button>
      </Popover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('wraps a disabled trigger in a span and still toggles on click', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover content={<div>body</div>} wrapDisabledTrigger>
        <button type="button" disabled>
          Open
        </button>
      </Popover>
    );
    const wrapper = container.querySelector('.su-popover__wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveAttribute('aria-haspopup', 'dialog');
    expect(wrapper).toHaveAttribute('aria-expanded', 'false');

    await user.click(wrapper!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('aria-expanded', 'true');

    await user.click(wrapper!);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
