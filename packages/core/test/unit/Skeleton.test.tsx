import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Skeleton } from '../../src/components/Skeleton/Skeleton';

describe('<Skeleton />', () => {
  it('renders a single text skeleton with status role and aria-busy', () => {
    const { container } = render(<Skeleton />);
    const node = screen.getByRole('status');
    expect(node).toHaveAttribute('aria-busy', 'true');
    expect(node).toHaveAttribute('aria-live', 'polite');
    expect(node.className).toMatch(/su-skeleton--text/);
    expect(node.className).toMatch(/su-skeleton--anim-pulse/);
    // height defaults to 1em.
    expect((node as HTMLElement).style.height).toBe('1em');
    // Single skeleton is the same node, NOT a group.
    expect(container.querySelector('.su-skeleton-group')).toBeNull();
  });

  it('rect variant defaults to 100% width and 80px height', () => {
    render(<Skeleton variant="rect" />);
    const node = screen.getByRole('status');
    expect(node.className).toMatch(/su-skeleton--rect/);
    expect((node as HTMLElement).style.width).toBe('100%');
    expect((node as HTMLElement).style.height).toBe('80px');
  });

  it('circle variant forces 50% radius and square 40px box by default', () => {
    render(<Skeleton variant="circle" />);
    const node = screen.getByRole('status');
    expect(node.className).toMatch(/su-skeleton--circle/);
    expect((node as HTMLElement).style.width).toBe('40px');
    expect((node as HTMLElement).style.height).toBe('40px');
    expect((node as HTMLElement).style.borderRadius).toBe('50%');
  });

  it('numeric width/height are converted to pixel strings', () => {
    render(<Skeleton variant="rect" width={120} height={32} radius={4} />);
    const node = screen.getByRole('status');
    expect((node as HTMLElement).style.width).toBe('120px');
    expect((node as HTMLElement).style.height).toBe('32px');
    expect((node as HTMLElement).style.borderRadius).toBe('4px');
  });

  it('string lengths pass through unchanged', () => {
    render(<Skeleton variant="rect" width="60%" height="2rem" />);
    const node = screen.getByRole('status');
    expect((node as HTMLElement).style.width).toBe('60%');
    expect((node as HTMLElement).style.height).toBe('2rem');
  });

  it('multi-line text mode renders N lines with last one narrower', () => {
    const { container } = render(<Skeleton lines={3} />);
    const group = screen.getByRole('status');
    expect(group.className).toMatch(/su-skeleton-group/);

    const lines = container.querySelectorAll('.su-skeleton--line');
    expect(lines.length).toBe(3);
    // Last line shrinks to 60% when no explicit width.
    expect((lines[2] as HTMLElement).style.width).toBe('60%');
    expect((lines[0] as HTMLElement).style.width).toBe('100%');
  });

  it('multi-line: explicit width is applied to every line', () => {
    const { container } = render(<Skeleton lines={3} width="50%" />);
    const lines = container.querySelectorAll('.su-skeleton--line');
    lines.forEach((l) =>
      expect((l as HTMLElement).style.width).toBe('50%')
    );
  });

  it('animation prop drives the animation modifier class', () => {
    render(<Skeleton animation="wave" />);
    expect(screen.getByRole('status').className).toMatch(/su-skeleton--anim-wave/);
  });
});
