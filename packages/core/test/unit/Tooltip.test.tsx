import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from '../../src/components/Tooltip/Tooltip';

describe('<Tooltip />', () => {
  it('renders nothing by default and adds no aria-describedby until open', () => {
    render(
      <Tooltip content="Helpful hint">
        <button type="button">Help</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Help' });
    expect(trigger).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows the bubble on hover and hides it on unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful hint" openDelay={0} closeDelay={0}>
        <button type="button">Help</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Help' });
    await user.hover(trigger);

    const bubble = await screen.findByRole('tooltip');
    expect(bubble).toHaveTextContent('Helpful hint');
    // a11y: trigger now points at the bubble for screen readers.
    expect(trigger.getAttribute('aria-describedby')).toBe(bubble.id);

    await user.unhover(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('shows on keyboard focus and hides on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="hint" openDelay={0} closeDelay={0}>
        <button type="button">Help</button>
      </Tooltip>
    );

    await user.tab();
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('does not open when content is falsy (disabled)', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content={null} openDelay={0}>
        <button type="button">Help</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button', { name: 'Help' }));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('closes on ESC when open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="hint" openDelay={0} closeDelay={0}>
        <button type="button">Help</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button', { name: 'Help' }));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('toggles via click trigger only when configured', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="hint" trigger="click">
        <button type="button">Help</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Help' });
    // Hover does nothing for click-only mode.
    await user.hover(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();

    await user.click(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('controlled mode: only opens when parent flips `open`, and onOpenChange fires', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Tooltip
        content="hint"
        openDelay={0}
        open={false}
        onOpenChange={onOpenChange}
      >
        <button type="button">Help</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button', { name: 'Help' }));
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Tooltip content="hint" openDelay={0} open={true} onOpenChange={onOpenChange}>
        <button type="button">Help</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
