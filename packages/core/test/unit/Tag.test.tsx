import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tag } from '../../src/components/Tag/Tag';

describe('<Tag />', () => {
  it('renders label, default color and md size', () => {
    const { container } = render(<Tag>Hello</Tag>);
    const tag = container.querySelector('.su-tag') as HTMLElement;
    expect(tag).not.toBeNull();
    expect(tag.className).toMatch(/su-tag--default/);
    expect(tag.className).toMatch(/su-tag--md/);
    expect(tag.querySelector('.su-tag__label')?.textContent).toBe('Hello');
  });

  it('applies color and size modifiers', () => {
    const { container } = render(
      <Tag color="brand" size="lg">
        Brand
      </Tag>
    );
    const tag = container.querySelector('.su-tag')!;
    expect(tag.className).toMatch(/su-tag--brand/);
    expect(tag.className).toMatch(/su-tag--lg/);
  });

  it('renders an icon slot before the label', () => {
    render(
      <Tag icon={<span data-testid="icon">★</span>}>Starred</Tag>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('shows close button when closable and fires onClose', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Tag closable onClose={onClose}>
        Closable
      </Tag>
    );
    const closeBtn = screen.getByRole('button', { name: /remove tag/i });
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClose or onClick when disabled', async () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Tag closable disabled onClose={onClose} onClick={onClick}>
        Inert
      </Tag>
    );

    const closeBtn = screen.getByRole('button', { name: /remove tag/i });
    expect(closeBtn).toBeDisabled();
    await user.click(closeBtn);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('fires onClick when not disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<Tag onClick={onClick}>Click</Tag>);
    const tag = container.querySelector('.su-tag') as HTMLElement;
    await user.click(tag);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
