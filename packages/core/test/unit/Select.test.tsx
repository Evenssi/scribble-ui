import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '../../src/components/Select/Select';
import { Option } from '../../src/components/Select/Option';

describe('<Select />', () => {
  it('renders a closed combobox showing the placeholder when no value', () => {
    render(
      <Select placeholder="Pick fruit">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveTextContent('Pick fruit');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('opens the listbox on click and renders all options with correct aria', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry" disabled>
          Cherry
        </Option>
      </Select>
    );

    await user.click(screen.getByRole('combobox'));

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    // Trigger advertises the listbox while open.
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('selects an option (uncontrolled), closes the listbox, and fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select onChange={onChange} placeholder="Pick">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
      </Select>
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onChange).toHaveBeenCalledWith('banana');
    expect(screen.queryByRole('listbox')).toBeNull();
    // Trigger now shows the matched label, not the raw value.
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');

    // Re-open and verify aria-selected reflects the pick on Banana only.
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('renders the matched label on first paint when defaultValue is set', () => {
    render(
      <Select defaultValue="a">
        <Option value="a">Alpha</Option>
        <Option value="b">Bravo</Option>
      </Select>
    );
    // Resolved synchronously on the first render — no Option mount needed.
    expect(screen.getByRole('combobox')).toHaveTextContent('Alpha');
  });

  it('honors the `options` array form when no JSX children are provided', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        onChange={onChange}
        options={[
          { value: 'r', label: 'Red' },
          { value: 'g', label: 'Green' },
        ]}
        placeholder="Color"
      />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(2);
    await user.click(screen.getByRole('option', { name: 'Green' }));
    expect(onChange).toHaveBeenCalledWith('g');
  });

  it('controlled mode does not flip internal state but still fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select value="apple" onChange={onChange}>
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
      </Select>
    );

    // Trigger reflects the controlled value's label even before opening.
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenCalledWith('banana');
    // Parent didn't flip the prop — trigger stays on Apple.
    expect(screen.getByRole('combobox')).toHaveTextContent('Apple');

    // Re-open: parent didn't flip the prop, so Apple is still the selection.
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('keyboard: ArrowDown opens the listbox, two more advance the highlight, Enter commits', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select onChange={onChange}>
        <Option value="a">Alpha</Option>
        <Option value="b">Bravo</Option>
        <Option value="c">Charlie</Option>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // After opening, the highlight starts at the first enabled option (Alpha).
    // Move down twice to land on Charlie, then commit with Enter.
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onChange).toHaveBeenCalledWith('c');
    expect(trigger).toHaveTextContent('Charlie');
  });

  it('Escape closes the listbox without changing the value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select defaultValue="a" onChange={onChange}>
        <Option value="a">Alpha</Option>
        <Option value="b">Bravo</Option>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled select does not open and the trigger is disabled', async () => {
    const user = userEvent.setup();
    render(
      <Select disabled>
        <Option value="a">Alpha</Option>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('error prop maps to aria-invalid and helperText shows the error class', () => {
    render(
      <Select error helperText="Required">
        <Option value="a">Alpha</Option>
      </Select>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    const helper = screen.getByText('Required');
    expect(helper.className).toMatch(/su-select__helper--error/);
  });

  it('renders a hidden input that mirrors the selected value when `name` is set', async () => {
    const user = userEvent.setup();
    render(
      <Select name="fruit" defaultValue="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
      </Select>
    );

    const hidden = document.querySelector(
      'input[type="hidden"][name="fruit"]'
    ) as HTMLInputElement | null;
    expect(hidden).not.toBeNull();
    expect(hidden!.value).toBe('apple');

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(hidden!.value).toBe('banana');
  });
});
