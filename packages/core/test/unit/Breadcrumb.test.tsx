import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Breadcrumb } from '../../src/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '../../src/components/Breadcrumb/BreadcrumbItem';

describe('<Breadcrumb />', () => {
  it('renders items via the data-driven API and marks the last as current', () => {
    render(
      <Breadcrumb
        items={[
          { title: 'Home', href: '/' },
          { title: 'Docs', href: '/docs' },
          { title: 'Breadcrumb' },
        ]}
      />
    );

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toBeInTheDocument();

    // First two are interactive anchors.
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'href',
      '/docs'
    );

    // Last crumb is plain text + aria-current=page.
    const current = nav.querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('Breadcrumb');
  });

  it('renders default `›` separators between crumbs (not after last)', () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { title: 'A', href: '/a' },
          { title: 'B', href: '/b' },
          { title: 'C' },
        ]}
      />
    );
    const seps = container.querySelectorAll('.su-breadcrumb__separator');
    expect(seps.length).toBe(2);
    seps.forEach((s) => expect(s.textContent).toContain('›'));
  });

  it('uses a custom separator node when provided', () => {
    const { container } = render(
      <Breadcrumb
        separator={<span data-testid="sep">/</span>}
        items={[
          { title: 'A', href: '/a' },
          { title: 'B' },
        ]}
      />
    );
    expect(container.querySelectorAll('[data-testid="sep"]').length).toBe(1);
  });

  it('collapses items via maxItems with an ellipsis crumb', () => {
    const { container } = render(
      <Breadcrumb
        maxItems={3}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={1}
        items={[
          { title: 'A', href: '/a' },
          { title: 'B', href: '/b' },
          { title: 'C', href: '/c' },
          { title: 'D' },
        ]}
      />
    );
    expect(container.querySelector('.su-breadcrumb__crumb--ellipsis')).not.toBeNull();
    // Only first + last remain (1 before, 1 after).
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'B' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'C' })).toBeNull();
    const current = container.querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('D');
  });

  it('fires onClick (and prevents default) for href-less interactive items', async () => {
    const onClick = vi.fn((event: React.MouseEvent) => {
      // The component prevents default itself when href is absent.
      expect(event.defaultPrevented).toBe(true);
    });
    const user = userEvent.setup();

    render(
      <Breadcrumb
        items={[
          { title: 'A', onClick },
          { title: 'B' },
        ]}
      />
    );

    await user.click(screen.getByRole('link', { name: 'A' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a disabled crumb as plain text with aria-disabled', () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { title: 'A', href: '/a' },
          { title: 'Locked', href: '/x', disabled: true },
          { title: 'C' },
        ]}
      />
    );
    expect(screen.queryByRole('link', { name: 'Locked' })).toBeNull();
    const disabledCrumb = container.querySelector('[aria-disabled="true"]');
    expect(disabledCrumb?.textContent).toContain('Locked');
  });

  it('accepts composition children via Breadcrumb.Item / BreadcrumbItem', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <Breadcrumb.Item href="/list">List</Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'List' })).toBeInTheDocument();
    expect(
      screen
        .getByRole('navigation', { name: 'Breadcrumb' })
        .querySelector('[aria-current="page"]')?.textContent
    ).toContain('Detail');
  });

  it('uses custom render() escape hatch for interactive crumbs', () => {
    render(
      <Breadcrumb
        items={[
          {
            title: 'Custom',
            href: '/x',
            render: (node) => <a data-testid="custom-link">{node}</a>,
          },
          { title: 'Last' },
        ]}
      />
    );
    expect(screen.getByTestId('custom-link')).toBeInTheDocument();
  });
});
