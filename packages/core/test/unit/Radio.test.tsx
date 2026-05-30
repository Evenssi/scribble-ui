import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from '../../src/components/Radio/Radio';
import { RadioGroup } from '../../src/components/Radio/RadioGroup';

describe('<Radio /> (standalone)', () => {
  it('uncontrolled: defaultChecked + click toggles checked state', async () => {
    const user = userEvent.setup();
    render(
      <Radio value="apple" defaultChecked>
        Apple
      </Radio>
    );

    const input = screen.getByRole('radio', { name: 'Apple' }) as HTMLInputElement;
    expect(input.checked).toBe(true);

    // Clicking a checked radio doesn't uncheck it (native semantics).
    await user.click(input);
    expect(input.checked).toBe(true);
  });

  it('controlled: onChange fires with the next boolean checked state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [c, setC] = useState(false);
      return (
        <Radio
          value="x"
          checked={c}
          onChange={(next) => {
            onChange(next);
            setC(next);
          }}
        >
          X
        </Radio>
      );
    }

    render(<Controlled />);
    const input = screen.getByRole('radio', { name: 'X' }) as HTMLInputElement;
    expect(input.checked).toBe(false);

    await user.click(input);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(input.checked).toBe(true);
  });

  it('disabled: drops aria-disabled signal and ignores clicks', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Radio value="x" disabled onChange={onChange}>
        Off
      </Radio>
    );

    const input = screen.getByRole('radio', { name: 'Off' });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-disabled', 'true');

    await user.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('<RadioGroup />', () => {
  it('uncontrolled: defaultValue is the source of truth, selection updates it', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup name="fruit" defaultValue="apple" onChange={onChange}>
        <Radio value="apple">Apple</Radio>
        <Radio value="pear">Pear</Radio>
        <Radio value="kiwi">Kiwi</Radio>
      </RadioGroup>
    );

    const apple = screen.getByRole('radio', { name: 'Apple' }) as HTMLInputElement;
    const pear = screen.getByRole('radio', { name: 'Pear' }) as HTMLInputElement;
    expect(apple.checked).toBe(true);
    expect(pear.checked).toBe(false);

    await user.click(pear);
    expect(onChange).toHaveBeenLastCalledWith('pear');
    expect(apple.checked).toBe(false);
    expect(pear.checked).toBe(true);
    // Native name is shared across all radios for keyboard arrow nav.
    expect(apple.name).toBe('fruit');
    expect(pear.name).toBe('fruit');
  });

  it('disabled prop on the group cascades to every nested radio', () => {
    render(
      <RadioGroup name="g" disabled>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );

    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled();
  });
});
