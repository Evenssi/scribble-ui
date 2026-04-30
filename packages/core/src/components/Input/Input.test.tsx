import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('<Input />', () => {
  it('renders an uncontrolled input with defaultValue and updates locally on typing', async () => {
    const user = userEvent.setup();
    render(<Input defaultValue="hello" placeholder="type here" />);

    const input = screen.getByPlaceholderText('type here') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('hello');

    await user.type(input, ' world');
    expect(input.value).toBe('hello world');
  });

  it('forwards every change event to onChange when used controlled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    function Controlled() {
      const [v, setV] = useState('');
      return (
        <Input
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
    const input = screen.getByPlaceholderText('ctl') as HTMLInputElement;

    await user.type(input, 'abc');
    expect(input.value).toBe('abc');
    // 3 keystrokes → 3 onChange calls, last argument matches the final value.
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });

  it('shows the clear affordance only when there is value, and clears on click', async () => {
    const user = userEvent.setup();
    render(<Input clearable defaultValue="" placeholder="search" />);

    // No value → no clear button yet.
    expect(screen.queryByRole('button', { name: /clear input/i })).toBeNull();

    const input = screen.getByPlaceholderText('search') as HTMLInputElement;
    await user.type(input, 'qq');
    expect(input.value).toBe('qq');

    const clearBtn = screen.getByRole('button', { name: /clear input/i });
    await user.click(clearBtn);

    expect(input.value).toBe('');
    // Focus returns to the input so the user can keep typing.
    expect(document.activeElement).toBe(input);
  });

  it('paints the error state and exposes aria-invalid', () => {
    render(
      <Input
        defaultValue="oops"
        error
        helperText="Required field"
        placeholder="err"
      />
    );

    const input = screen.getByPlaceholderText('err') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-invalid', 'true');

    // The helper renders next to the input with the error modifier class.
    const helper = screen.getByText('Required field');
    expect(helper.className).toMatch(/su-input__helper--error/);
  });
});
