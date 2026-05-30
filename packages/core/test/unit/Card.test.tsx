import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Card } from '../../src/components/Card/Card';

describe('<Card />', () => {
  it('renders default variant + md size with body and optional header/footer', () => {
    const { container } = render(
      <Card header={<span>H</span>} footer={<span>F</span>}>
        Body
      </Card>
    );
    const card = container.querySelector('.su-card') as HTMLElement;
    expect(card).not.toBeNull();
    expect(card.className).toMatch(/su-card--default/);
    expect(card.className).toMatch(/su-card--md/);
    expect(card.querySelector('.su-card__header')?.textContent).toBe('H');
    expect(card.querySelector('.su-card__body')?.textContent).toBe('Body');
    expect(card.querySelector('.su-card__footer')?.textContent).toBe('F');
  });

  it('applies note variant + noteColor modifier', () => {
    const { container } = render(
      <Card variant="note" noteColor="pink">
        Pink note
      </Card>
    );
    const card = container.querySelector('.su-card')!;
    expect(card.className).toMatch(/su-card--note/);
    expect(card.className).toMatch(/su-card--note-pink/);
  });

  it('does NOT add note color modifier for default variant', () => {
    const { container } = render(<Card noteColor="green">x</Card>);
    expect(container.querySelector('.su-card')?.className).not.toMatch(
      /su-card--note-/
    );
  });

  it('interactive mode adds role=button and Enter/Space click parity', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Card interactive onClick={onClick}>
        Clickable
      </Card>
    );
    const card = screen.getByRole('button', { name: 'Clickable' });
    expect(card).toHaveAttribute('tabindex', '0');

    await user.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);

    card.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);

    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('interactive + disabled blocks click and sets aria-disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Card interactive disabled onClick={onClick}>
        Inert
      </Card>
    );
    const card = screen.getByRole('button', { name: 'Inert' });
    expect(card).toHaveAttribute('aria-disabled', 'true');
    expect(card).toHaveAttribute('tabindex', '-1');

    await user.click(card);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('non-interactive card is a plain <div> without button role', () => {
    const { container } = render(<Card>Static</Card>);
    expect(container.querySelector('[role="button"]')).toBeNull();
  });
});
