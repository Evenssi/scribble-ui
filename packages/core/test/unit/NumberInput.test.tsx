import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from '../../src/components/NumberInput/NumberInput';

describe('<NumberInput />', () => {
  it('uncontrolled: ↑/↓ arrows step by `step`, respecting min/max clamp', async () => {
    const user = userEvent.setup();
    render(
      <NumberInput
        defaultValue={5}
        step={2}
        min={0}
        max={10}
        placeholder="qty"
      />
    );

    const input = screen.getByPlaceholderText('qty') as HTMLInputElement;
    expect(input.value).toBe('5');
    expect(input).toHaveAttribute('aria-valuemin', '0');
    expect(input).toHaveAttribute('aria-valuemax', '10');
    expect(input).toHaveAttribute('aria-valuenow', '5');

    input.focus();
    await user.keyboard('{ArrowUp}');
    expect(input.value).toBe('7');

    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    // 7 → 5 → 3 → 1 → -1(clamped to 0) → 0
    expect(input.value).toBe('0');
    // aria-valuenow follows.
    expect(input).toHaveAttribute('aria-valuenow', '0');
  });

  it('controlled: onChange fires with the parsed numeric value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [v, setV] = useState<number | undefined>(0);
      return (
        <NumberInput
          value={v}
          onChange={(next) => {
            onChange(next);
            setV(next);
          }}
          placeholder="ctl"
          // No min/max on this one — exercises the unbounded path.
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByPlaceholderText('ctl') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '42');

    expect(input.value).toBe('42');
    // Last value seen by the consumer is the parsed integer 42.
    expect(onChange).toHaveBeenLastCalledWith(42);
  });

  it('renders ± step buttons and disables them at the bounds', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NumberInput defaultValue={5} step={1} min={0} max={5} placeholder="x" />
    );

    // The ± buttons live inside an aria-hidden controls span (because
    // the spinbutton role on the input is the canonical a11y entry).
    // Query them by class so RTL's a11y-tree filtering doesn't hide them.
    const inc = container.querySelector(
      '.su-number-input__step--up'
    ) as HTMLButtonElement;
    const dec = container.querySelector(
      '.su-number-input__step--down'
    ) as HTMLButtonElement;
    const input = screen.getByPlaceholderText('x') as HTMLInputElement;

    // Already at max → + is disabled but − is fine.
    expect(inc).toBeDisabled();
    expect(dec).not.toBeDisabled();

    await user.click(dec);
    expect(input.value).toBe('4');
    expect(inc).not.toBeDisabled();
  });

  it('emits a hidden mirror input for native form submissions when name is set', () => {
    const { container } = render(
      <NumberInput defaultValue={7} name="qty" placeholder="m" />
    );
    const hidden = container.querySelector(
      'input[type="hidden"][name="qty"]'
    ) as HTMLInputElement;
    expect(hidden).not.toBeNull();
    expect(hidden.value).toBe('7');
  });
});
