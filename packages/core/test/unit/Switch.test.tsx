import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from '../../src/components/Switch/Switch';

describe('<Switch />', () => {
  it('renders a native input with role="switch" and the label as its accessible name', () => {
    render(<Switch label="Notifications" />);

    const sw = screen.getByRole('switch', { name: 'Notifications' });
    expect(sw).toBeInTheDocument();
    expect(sw).not.toBeChecked();
  });

  it('toggles uncontrolled state on click and fires onChange with (next, event)', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch onChange={onChange} label="Enable" />);

    const sw = screen.getByRole('switch', { name: 'Enable' });
    await user.click(sw);

    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());

    await user.click(sw);
    expect(sw).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it('controlled mode does not flip internal state but still fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Switch checked={false} onChange={onChange} label="Enable" />
    );

    const sw = screen.getByRole('switch', { name: 'Enable' });
    await user.click(sw);
    expect(sw).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());

    rerender(<Switch checked={true} onChange={onChange} label="Enable" />);
    expect(sw).toBeChecked();
  });

  it('disabled switch ignores clicks and reports disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch disabled onChange={onChange} label="Off" />);

    const sw = screen.getByRole('switch', { name: 'Off' });
    expect(sw).toBeDisabled();
    await user.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('error prop sets aria-invalid and decorates the helper text', () => {
    render(<Switch error helperText="Bad" label="x" />);

    expect(screen.getByRole('switch', { name: 'x' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    const helper = screen.getByText('Bad');
    expect(helper.className).toMatch(/su-switch__helper--error/);
  });

  it('labelPosition="left" applies the corresponding modifier class', () => {
    const { container } = render(<Switch label="lbl" labelPosition="left" />);
    const wrapper = container.querySelector('.su-switch') as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toMatch(/su-switch--label-left/);
  });
});
