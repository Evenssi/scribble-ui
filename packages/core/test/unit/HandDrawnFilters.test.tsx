import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { HandDrawnFilters } from '../../src/components/HandDrawnFilters/HandDrawnFilters';

describe('<HandDrawnFilters />', () => {
  it('renders an aria-hidden, off-screen <svg> wrapper', () => {
    const { container } = render(<HandDrawnFilters />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg?.getAttribute('width')).toBe('0');
    expect(svg?.getAttribute('height')).toBe('0');
    // Off-flow positioning so it never participates in layout.
    expect((svg as SVGElement).style.position).toBe('absolute');
    expect((svg as SVGElement).style.pointerEvents).toBe('none');
  });

  it('exposes the three reusable filter ids su-hand-c / -b / -a', () => {
    const { container } = render(<HandDrawnFilters />);
    expect(container.querySelector('filter#su-hand-c')).not.toBeNull();
    expect(container.querySelector('filter#su-hand-b')).not.toBeNull();
    expect(container.querySelector('filter#su-hand-a')).not.toBeNull();
  });

  it('each filter contains a turbulence + displacement-map pair', () => {
    const { container } = render(<HandDrawnFilters />);
    ['su-hand-c', 'su-hand-b', 'su-hand-a'].forEach((id) => {
      const filter = container.querySelector(`filter#${id}`);
      expect(filter?.querySelector('feTurbulence')).not.toBeNull();
      expect(filter?.querySelector('feDisplacementMap')).not.toBeNull();
    });
  });

  it('jitter levels increase: scale ascends c -> b -> a', () => {
    const { container } = render(<HandDrawnFilters />);
    const scaleOf = (id: string): number => {
      const el = container.querySelector(`filter#${id} feDisplacementMap`);
      return Number(el?.getAttribute('scale'));
    };
    const c = scaleOf('su-hand-c');
    const b = scaleOf('su-hand-b');
    const a = scaleOf('su-hand-a');
    expect(c).toBeLessThan(b);
    expect(b).toBeLessThan(a);
  });
});
