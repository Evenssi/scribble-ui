import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../../src/components/Checkbox/Checkbox';
import { CheckboxGroup } from '../../src/components/Checkbox/CheckboxGroup';

describe('<Checkbox />', () => {
  it('renders an unchecked native checkbox with the label as accessible name', () => {
    render(<Checkbox>Accept terms</Checkbox>);

    const input = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it('toggles uncontrolled state on click and fires onChange with the next value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Checkbox onChange={onChange} defaultChecked={false}>
        Subscribe
      </Checkbox>
    );

    const cb = screen.getByRole('checkbox', { name: 'Subscribe' });
    await user.click(cb);

    expect(cb).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());

    await user.click(cb);
    expect(cb).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it('controlled mode does not flip internal state but still fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Checkbox checked={false} onChange={onChange}>
        Controlled
      </Checkbox>
    );

    const cb = screen.getByRole('checkbox', { name: 'Controlled' });
    await user.click(cb);
    // Parent didn't flip the prop, so the input is still unchecked.
    expect(cb).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('disabled checkbox blocks interaction and reports the disabled state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Checkbox disabled onChange={onChange}>
        Off
      </Checkbox>
    );

    const cb = screen.getByRole('checkbox', { name: 'Off' });
    expect(cb).toBeDisabled();
    await user.click(cb);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards the indeterminate flag onto the native input via ref', () => {
    function Host() {
      const ref = useRef<HTMLInputElement>(null);
      return (
        <Checkbox ref={ref} indeterminate>
          Mixed
        </Checkbox>
      );
    }
    render(<Host />);
    const cb = screen.getByRole('checkbox', { name: 'Mixed' }) as HTMLInputElement;
    expect(cb.indeterminate).toBe(true);
  });
});

describe('<CheckboxGroup />', () => {
  it('renders a role=group and reflects defaultValue on its children', () => {
    render(
      <CheckboxGroup defaultValue={['a']} aria-label="letters">
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
        <Checkbox value="c">C</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByRole('group', { name: 'letters' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'A' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked();
  });

  it('toggles values through the group and fires onChange with the next array', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup defaultValue={['a']} onChange={onChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByRole('checkbox', { name: 'B' }));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked();

    // Untoggle "a".
    await user.click(screen.getByRole('checkbox', { name: 'A' }));
    expect(onChange).toHaveBeenLastCalledWith(['b']);
  });

  it('disabled at the group level disables every member', () => {
    render(
      <CheckboxGroup disabled defaultValue={[]}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByRole('checkbox', { name: 'A' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'B' })).toBeDisabled();
  });

  it('controlled group: clicking does not change selection unless parent updates value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <CheckboxGroup value={['a']} onChange={onChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByRole('checkbox', { name: 'B' }));
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    // Parent didn't flip — B still unchecked.
    expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked();

    rerender(
      <CheckboxGroup value={['a', 'b']} onChange={onChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByRole('checkbox', { name: 'B' })).toBeChecked();
  });

  it('forwards a shared `name` onto every nested checkbox', () => {
    render(
      <CheckboxGroup name="topics" defaultValue={[]}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );

    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    expect(inputs.length).toBe(2);
    inputs.forEach((i) => expect(i.name).toBe('topics'));
  });
});
