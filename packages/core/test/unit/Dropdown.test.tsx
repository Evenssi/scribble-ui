import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from '../../src/components/Dropdown/Dropdown';
import { Button } from '../../src/components/Button/Button';

const baseMenu = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'divider', type: 'divider' as const },
  { key: 'delete', label: 'Delete', danger: true },
];

describe('<Dropdown />', () => {
  it('opens on trigger click and renders menu items via portal', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown menu={baseMenu}>
        <Button>Actions</Button>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // Portal target is document.body, so the menu sits outside the
    // RTL-managed test container.
    const menu = await screen.findByRole('menu');
    expect(menu.parentElement).toBe(document.body);
    // All non-divider items rendered as menuitem buttons.
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('clicking an item fires its onClick and auto-closes the menu', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const menu = [
      { key: 'edit', label: 'Edit', onClick: onEdit },
      { key: 'delete', label: 'Delete' },
    ];

    render(
      <Dropdown menu={menu}>
        <Button>Open</Button>
      </Dropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await screen.findByRole('menu');

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    // Menu should auto-close after activation.
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('disabled items: aria-disabled, no onClick fire, menu stays open', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const menu = [
      {
        key: 'frozen',
        label: 'Frozen',
        disabled: true,
        onClick,
      },
      { key: 'ok', label: 'OK' },
    ];

    render(
      <Dropdown menu={menu}>
        <Button>Open</Button>
      </Dropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    const frozen = await screen.findByRole('menuitem', { name: 'Frozen' });
    expect(frozen).toHaveAttribute('aria-disabled', 'true');

    await user.click(frozen);
    expect(onClick).not.toHaveBeenCalled();
    // Menu stays open since the click was a no-op.
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('Escape key closes the menu and restores focus to the trigger', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown menu={baseMenu}>
        <Button>Open</Button>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);
    await screen.findByRole('menu');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
    // Focus restored after a microtask.
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(document.activeElement).toBe(trigger);
  });

  it('disabled prop on the dropdown blocks open entirely', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown menu={baseMenu} disabled>
        <Button>Open</Button>
      </Dropdown>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
