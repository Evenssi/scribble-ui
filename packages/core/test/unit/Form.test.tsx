import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form, FormItem } from '../../src/components/Form/Form';
import { Input } from '../../src/components/Input/Input';

describe('<Form /> + <Form.Item />', () => {
  it('renders a noValidate <form> with layout/size modifier classes', () => {
    const { container } = render(
      <Form layout="horizontal" size="lg">
        <Form.Item label="Name">
          <Input placeholder="name" />
        </Form.Item>
      </Form>
    );

    const form = container.querySelector('form') as HTMLFormElement;
    expect(form.noValidate).toBe(true);
    expect(form.className).toMatch(/su-form--horizontal/);
    expect(form.className).toMatch(/su-form--lg/);
  });

  it('renders the label as a real <label> with htmlFor when explicit htmlFor is given', () => {
    render(
      <Form>
        <Form.Item label="Email" htmlFor="my-email">
          <Input id="my-email" placeholder="email" />
        </Form.Item>
      </Form>
    );

    const input = screen.getByPlaceholderText('email');
    expect(input).toHaveAttribute('id', 'my-email');

    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'my-email');
  });

  it('renders a required asterisk and the error slot with role=alert', () => {
    render(
      <Form>
        <Form.Item label="Username" required error="Required field">
          <Input placeholder="user" />
        </Form.Item>
      </Form>
    );

    // Required asterisk is decorative — it's a span, not the label itself.
    const asterisk = screen.getByText('*');
    expect(asterisk.className).toMatch(/su-form-item__required/);

    const errorNode = screen.getByRole('alert');
    expect(errorNode.textContent).toBe('Required field');
    expect(errorNode.getAttribute('aria-live')).toBe('polite');
  });

  it('hides helperText whenever an error is present', () => {
    const { rerender } = render(
      <Form>
        <Form.Item label="X" helperText="Use lowercase">
          <Input placeholder="x" />
        </Form.Item>
      </Form>
    );

    // Without error, helper is rendered.
    expect(screen.getByText('Use lowercase')).toBeInTheDocument();

    rerender(
      <Form>
        <Form.Item label="X" helperText="Use lowercase" error="Bad input">
          <Input placeholder="x" />
        </Form.Item>
      </Form>
    );

    // With error, helper is unmounted; only the alert remains.
    expect(screen.queryByText('Use lowercase')).toBeNull();
    expect(screen.getByRole('alert').textContent).toBe('Bad input');
  });

  it('forwards onSubmit to the native form (handleSubmit-style integration)', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <Form.Item label="N">
          <Input placeholder="n" />
        </Form.Item>
        <button type="submit">Save</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
