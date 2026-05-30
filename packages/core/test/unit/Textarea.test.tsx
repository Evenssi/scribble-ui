import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from '../../src/components/Textarea/Textarea';

describe('<Textarea />', () => {
  it('uncontrolled: types update the underlying textarea value', async () => {
    const user = userEvent.setup();
    render(<Textarea defaultValue="" placeholder="leave a note" />);

    const ta = screen.getByPlaceholderText('leave a note') as HTMLTextAreaElement;
    expect(ta.value).toBe('');

    await user.type(ta, 'hi there');
    expect(ta.value).toBe('hi there');
  });

  it('controlled: every keystroke flows through onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [v, setV] = useState('');
      return (
        <Textarea
          value={v}
          onChange={(e) => {
            onChange(e.target.value);
            setV(e.target.value);
          }}
          placeholder="ctl"
        />
      );
    }

    render(<Controlled />);
    const ta = screen.getByPlaceholderText('ctl') as HTMLTextAreaElement;
    await user.type(ta, 'abc');

    expect(ta.value).toBe('abc');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });

  it('paints the error state and exposes aria-invalid', () => {
    render(
      <Textarea
        defaultValue="oops"
        error
        helperText="Required"
        placeholder="err"
      />
    );

    const ta = screen.getByPlaceholderText('err') as HTMLTextAreaElement;
    expect(ta).toHaveAttribute('aria-invalid', 'true');

    const helper = screen.getByText('Required');
    expect(helper.className).toMatch(/su-textarea__helper--error/);
  });

  it('renders a character counter that flips warning / danger as length grows', async () => {
    const user = userEvent.setup();
    render(
      <Textarea showCount maxLength={10} placeholder="counted" />
    );

    const ta = screen.getByPlaceholderText('counted') as HTMLTextAreaElement;

    // 0 / 10 — neutral.
    let counter = ta.parentElement?.querySelector('.su-textarea__count') as HTMLElement;
    expect(counter.textContent).toBe('0 / 10');
    expect(counter.className).not.toMatch(/--warning/);
    expect(counter.className).not.toMatch(/--danger/);

    // Fill to 80% — warning.
    await user.type(ta, '12345678');
    counter = ta.parentElement?.querySelector('.su-textarea__count') as HTMLElement;
    expect(counter.textContent).toBe('8 / 10');
    expect(counter.className).toMatch(/--warning/);
  });
});
