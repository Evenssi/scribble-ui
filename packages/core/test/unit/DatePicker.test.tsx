import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePicker } from '../../src/components/DatePicker/DatePicker';

describe('<DatePicker />', () => {
  it('renders a closed trigger with placeholder when no value is set', () => {
    render(
      <DatePicker placeholder="Pick a date" aria-label="due" />
    );

    const trigger = screen.getByRole('button', { name: 'due' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.textContent).toContain('Pick a date');
  });

  it('formats a controlled date through the format prop', () => {
    render(
      <DatePicker
        value={new Date(2025, 0, 9)}
        format="YYYY-MM-DD"
        aria-label="d"
      />
    );

    const trigger = screen.getByRole('button', { name: 'd' });
    expect(trigger.textContent).toContain('2025-01-09');
  });

  it('opens the popup on click and closes on day select, firing onChange with a Date', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue={new Date(2025, 0, 15)}
        onChange={onChange}
        aria-label="d"
      />
    );

    const trigger = screen.getByRole('button', { name: 'd' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Popup is portalled to body — query by role=dialog from there.
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Pick the 20th of the visible month (defaultValue is Jan 2025).
    const cells = dialog.querySelectorAll('.su-calendar__day');
    const target = Array.from(cells).find(
      (el) =>
        el.textContent === '20' &&
        !el.classList.contains('su-calendar__day--outside')
    ) as HTMLButtonElement;

    await user.click(target);

    expect(onChange).toHaveBeenCalledTimes(1);
    const arg = onChange.mock.calls[0][0] as Date;
    expect(arg).toBeInstanceOf(Date);
    expect(arg.getFullYear()).toBe(2025);
    expect(arg.getMonth()).toBe(0);
    expect(arg.getDate()).toBe(20);
    // Popup auto-closes on selection.
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('clear button resets the value and fires onChange with null', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [v, setV] = useState<Date | null>(new Date(2025, 5, 1));
      return (
        <DatePicker
          value={v}
          onChange={(next) => {
            onChange(next);
            setV(next);
          }}
          clearable
          aria-label="cd"
        />
      );
    }

    render(<Controlled />);
    const clearBtn = screen.getByRole('button', { name: /clear date/i });
    await user.click(clearBtn);
    expect(onChange).toHaveBeenLastCalledWith(null);

    // Trigger now shows the placeholder rather than a formatted date.
    const trigger = screen.getByRole('button', { name: 'cd' });
    expect(trigger.className).toMatch(/su-datepicker__trigger--placeholder/);
  });

  it('disabled: trigger blocks open and is marked disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled aria-label="d" />);
    const trigger = screen.getByRole('button', { name: 'd' });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
