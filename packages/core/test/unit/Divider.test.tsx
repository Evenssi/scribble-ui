import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Divider } from '../../src/components/Divider/Divider';

describe('<Divider />', () => {
  it('renders a horizontal solid separator by default', () => {
    render(<Divider data-testid="d" />);
    const sep = screen.getByTestId('d');
    expect(sep).toHaveAttribute('role', 'separator');
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal');
    expect(sep.className).toMatch(/su-divider--horizontal/);
    expect(sep.className).toMatch(/su-divider--solid/);
    expect(sep.className).toMatch(/su-divider--default/);
  });

  it('applies vertical orientation, dashed variant, bold thickness', () => {
    render(
      <Divider
        data-testid="d"
        orientation="vertical"
        variant="dashed"
        thickness="bold"
      />
    );
    const sep = screen.getByTestId('d');
    expect(sep).toHaveAttribute('aria-orientation', 'vertical');
    expect(sep.className).toMatch(/su-divider--vertical/);
    expect(sep.className).toMatch(/su-divider--dashed/);
    expect(sep.className).toMatch(/su-divider--bold/);
  });

  it('renders a label with start alignment when children + horizontal', () => {
    render(
      <Divider data-testid="d" labelAlign="start">
        OR
      </Divider>
    );
    const sep = screen.getByTestId('d');
    expect(sep.className).toMatch(/su-divider--with-label/);
    expect(sep.className).toMatch(/su-divider--label-start/);
    expect(sep.querySelector('.su-divider__label')?.textContent).toBe('OR');
    // Two flanking lines around the label.
    expect(sep.querySelectorAll('.su-divider__line').length).toBe(2);
  });

  it('warns and ignores children when orientation is vertical', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Divider data-testid="d" orientation="vertical">
        Should not render
      </Divider>
    );
    const sep = screen.getByTestId('d');
    expect(sep.querySelector('.su-divider__label')).toBeNull();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('honors a custom role override', () => {
    render(<Divider data-testid="d" role="presentation" />);
    expect(screen.getByTestId('d')).toHaveAttribute('role', 'presentation');
  });
});
