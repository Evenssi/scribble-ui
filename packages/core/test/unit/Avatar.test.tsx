import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Avatar } from '../../src/components/Avatar/Avatar';

describe('<Avatar />', () => {
  it('renders an <img> when src is provided and uses alt as accessible label', () => {
    render(<Avatar src="https://example.com/me.png" alt="Jane Doe" />);

    const wrapper = screen.getByRole('img', { name: 'Jane Doe' });
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toMatch(/su-avatar--has-image/);

    const img = wrapper.querySelector('img.su-avatar__img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('https://example.com/me.png');
    // The inner <img> should carry empty alt so AT does not announce twice.
    expect(img.getAttribute('alt')).toBe('');
  });

  it('falls back to derived initials from name when no src is given', () => {
    render(<Avatar name="John Smith" />);

    const wrapper = screen.getByRole('img', { name: 'John Smith' });
    expect(wrapper.querySelector('.su-avatar__initials')?.textContent).toBe('JS');
  });

  it('prefers explicit initials over derived ones, capped at 2 chars uppercased', () => {
    render(<Avatar name="John Smith" initials="abcd" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('falls back to a placeholder glyph when nothing else is available', () => {
    const { container } = render(<Avatar />);
    const svg = container.querySelector('.su-avatar__fallback svg');
    expect(svg).not.toBeNull();
  });

  it('swaps to fallback render when the underlying image fails to load', () => {
    render(<Avatar src="broken://nope" name="Alice" />);

    const wrapper = screen.getByRole('img', { name: 'Alice' });
    const img = wrapper.querySelector('img') as HTMLImageElement;
    expect(img).not.toBeNull();

    fireEvent.error(img);

    expect(wrapper.querySelector('img')).toBeNull();
    expect(wrapper.querySelector('.su-avatar__initials')?.textContent).toBe('A');
  });

  it('applies size, shape and explicit color modifiers', () => {
    render(<Avatar size="lg" shape="square" color="purple" name="X" />);
    const wrapper = screen.getByRole('img', { name: 'X' });
    expect(wrapper.className).toMatch(/su-avatar--lg/);
    expect(wrapper.className).toMatch(/su-avatar--square/);
    expect(wrapper.className).toMatch(/su-avatar--purple/);
  });

  it('renders a custom fallback node ahead of initials', () => {
    render(
      <Avatar fallback={<span data-testid="custom-fb">★</span>} name="John" />
    );
    expect(screen.getByTestId('custom-fb')).toBeInTheDocument();
    // Initials should NOT render when a custom fallback wins.
    expect(screen.queryByText('J')).toBeNull();
  });
});
