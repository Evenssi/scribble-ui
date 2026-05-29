import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../src/components/Button/Button';

describe('<Button />', () => {
  it('renders children inside a native button with the default type', () => {
    render(<Button>Save changes</Button>);

    const btn = screen.getByRole('button', { name: 'Save changes' });
    expect(btn).toBeInTheDocument();
    // Default type is `'button'` so accidental submits never happen.
    expect(btn).toHaveAttribute('type', 'button');
    // Variant + size class names should be applied.
    expect(btn.className).toMatch(/su-btn--default/);
    expect(btn.className).toMatch(/su-btn--md/);
  });

  it('forwards click events when neither disabled nor loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: 'Click' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('blocks clicks and exposes aria-busy while loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>
    );

    const btn = screen.getByRole('button', { name: /saving/i });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn.className).toMatch(/su-btn--loading/);

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
