import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Badge } from '../../src/components/Badge/Badge';

describe('<Badge />', () => {
  it('renders count standalone with default danger color', () => {
    render(<Badge count={5} />);
    const badge = screen.getByRole('status', { name: '5 notifications' });
    expect(badge.textContent).toBe('5');
    expect(badge.className).toMatch(/su-badge--danger/);
  });

  it('caps count via max as `${max}+`', () => {
    render(<Badge count={150} max={99} />);
    const badge = screen.getByRole('status', { name: '150 notifications' });
    expect(badge.textContent).toBe('99+');
  });

  it('omits the badge when count is 0 by default', () => {
    const { container } = render(<Badge count={0} />);
    expect(container.querySelector('.su-badge')).toBeNull();
  });

  it('still renders the badge when showZero is true', () => {
    render(<Badge count={0} showZero />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders a dot with no text and overrides count when both set', () => {
    render(<Badge dot count={9} color="success" />);
    const badge = screen.getByRole('status', { name: 'notification' });
    expect(badge.textContent).toBe('');
    expect(badge.className).toMatch(/su-badge--dot/);
    expect(badge.className).toMatch(/su-badge--success/);
  });

  it('renders custom content when neither dot nor count are provided', () => {
    render(<Badge content="NEW" color="brand" />);
    const badge = screen.getByRole('status', { name: 'NEW' });
    expect(badge.textContent).toBe('NEW');
    expect(badge.className).toMatch(/su-badge--brand/);
  });

  it('wraps children with floating placement modifier', () => {
    const { container } = render(
      <Badge count={3} placement="bottom-left">
        <button type="button">Inbox</button>
      </Badge>
    );
    const wrap = container.querySelector('.su-badge-wrap');
    expect(wrap).not.toBeNull();
    expect(wrap?.querySelector('.su-badge-wrap__anchor button')).not.toBeNull();
    const badge = container.querySelector('.su-badge');
    expect(badge?.className).toMatch(/su-badge--placement-bottom-left/);
    expect(badge?.className).toMatch(/su-badge--floating/);
  });

  it('wrapper still renders children when count is 0 without showZero', () => {
    const { container } = render(
      <Badge count={0}>
        <button type="button">Inbox</button>
      </Badge>
    );
    expect(container.querySelector('.su-badge-wrap__anchor')).not.toBeNull();
    expect(container.querySelector('.su-badge')).toBeNull();
  });
});
