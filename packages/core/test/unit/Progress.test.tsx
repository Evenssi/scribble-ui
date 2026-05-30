import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Progress } from '../../src/components/Progress/Progress';

describe('<Progress />', () => {
  it('clamps value into [0, 100], round-trips it to aria-valuenow and CSS var', () => {
    const { container } = render(<Progress value={42} aria-label="upload" />);

    const bar = screen.getByRole('progressbar', { name: 'upload' });
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar.className).toMatch(/su-progress--line/);
    expect(bar.className).toMatch(/su-progress--md/);
    // Inline CSS var carries the % so CSS can drive the fill width.
    expect((bar as HTMLElement).style.getPropertyValue('--su-progress-value')).toBe('42%');

    // Out-of-range values clamp.
    const { rerender } = render(<Progress value={150} aria-label="x" />);
    rerender(<Progress value={-20} aria-label="x" />);
    const bar2 = screen.getByRole('progressbar', { name: 'x' });
    expect(bar2).toHaveAttribute('aria-valuenow', '0');

    // Containers exist (sanity).
    expect(container.querySelector('.su-progress__track')).toBeInTheDocument();
  });

  it('omits aria-valuenow + hides label in indeterminate mode', () => {
    render(
      <Progress
        indeterminate
        showLabel
        value={50}
        aria-label="loading"
      />
    );

    const bar = screen.getByRole('progressbar', { name: 'loading' });
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar.className).toMatch(/su-progress--indeterminate/);
    // showLabel is forced off when indeterminate, so the label node is gone.
    expect(bar.querySelector('.su-progress__label')).toBeNull();
  });

  it('renders custom label via formatLabel for the circle variant', () => {
    render(
      <Progress
        variant="circle"
        value={37}
        showLabel
        formatLabel={(n) => `${n} pts`}
        aria-label="score"
      />
    );

    const bar = screen.getByRole('progressbar', { name: 'score' });
    expect(bar.className).toMatch(/su-progress--circle/);
    expect(bar.querySelector('.su-progress__label')?.textContent).toBe('37 pts');
    // SVG track + fill exist for the circle shape.
    expect(bar.querySelector('.su-progress__circle-track')).toBeInTheDocument();
    expect(bar.querySelector('.su-progress__circle-fill')).toBeInTheDocument();
  });

  it('paints the danger status modifier and falls back to "Loading" aria-label', () => {
    render(<Progress value={10} status="danger" />);
    const bar = screen.getByRole('progressbar', { name: /loading/i });
    expect(bar.className).toMatch(/su-progress--status-danger/);
  });
});
