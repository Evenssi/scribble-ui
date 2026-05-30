import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Slider } from '../../src/components/Slider/Slider';

describe('<Slider /> (single value)', () => {
  it('exposes role=slider with min/max/value snapped to step', () => {
    render(<Slider min={0} max={100} step={10} defaultValue={37} aria-label="vol" />);
    const thumb = screen.getByRole('slider', { name: 'vol' });

    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
    // 37 snaps to nearest 10 → 40.
    expect(thumb).toHaveAttribute('aria-valuenow', '40');
    expect(thumb).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('arrow keys step the value and call onChange / onChangeCommitted', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onCommit = vi.fn();

    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      render(
        <Slider
          min={0}
          max={100}
          step={5}
          defaultValue={50}
          onChange={onChange}
          onChangeCommitted={onCommit}
          aria-label="x"
        />
      );

      const thumb = screen.getByRole('slider', { name: 'x' });
      thumb.focus();

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenLastCalledWith(55);
      expect(thumb).toHaveAttribute('aria-valuenow', '55');

      await user.keyboard('{ArrowLeft}{ArrowLeft}');
      expect(thumb).toHaveAttribute('aria-valuenow', '45');

      // Commit is debounced 120ms after the last arrow press.
      await vi.advanceTimersByTimeAsync(150);
      expect(onCommit).toHaveBeenCalledWith(45);
    } finally {
      vi.useRealTimers();
    }
  });

  it('Home / End jump to min / max', async () => {
    const user = userEvent.setup();
    render(<Slider min={10} max={90} defaultValue={50} aria-label="hm" />);
    const thumb = screen.getByRole('slider', { name: 'hm' });
    thumb.focus();

    await user.keyboard('{Home}');
    expect(thumb).toHaveAttribute('aria-valuenow', '10');

    await user.keyboard('{End}');
    expect(thumb).toHaveAttribute('aria-valuenow', '90');
  });

  it('disabled: removes thumbs from tab order and stops keyboard input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Slider
        disabled
        min={0}
        max={100}
        defaultValue={20}
        onChange={onChange}
        aria-label="d"
      />
    );

    const thumb = screen.getByRole('slider', { name: 'd' });
    expect(thumb).toHaveAttribute('aria-disabled', 'true');
    expect(thumb).toHaveAttribute('tabIndex', '-1');

    thumb.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('<Slider range />', () => {
  it('exposes two sliders with auto-labelled "Minimum" / "Maximum"', () => {
    render(<Slider range defaultValue={[20, 80]} min={0} max={100} />);

    const lo = screen.getByRole('slider', { name: 'Minimum' });
    const hi = screen.getByRole('slider', { name: 'Maximum' });
    expect(lo).toHaveAttribute('aria-valuenow', '20');
    expect(hi).toHaveAttribute('aria-valuenow', '80');
  });

  it('thumbs cannot cross — the lower thumb is clamped by the upper one', async () => {
    const user = userEvent.setup();
    render(
      <Slider range defaultValue={[40, 50]} min={0} max={100} step={10} />
    );

    const lo = screen.getByRole('slider', { name: 'Minimum' });
    lo.focus();

    // Trying to push the lower thumb past the upper at 50 — should clamp at 50.
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
    expect(lo).toHaveAttribute('aria-valuenow', '50');
  });
});
