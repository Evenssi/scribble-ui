import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Result } from '../../src/components/Result/Result';

describe('<Result />', () => {
  it('renders title and default info status', () => {
    render(<Result title="All good" />);
    const root = screen.getByRole('status');
    expect(root.className).toMatch(/su-result--status-info/);
    expect(root.querySelector('.su-result__title')?.textContent).toBe('All good');
    // Default icon SVG mounts under .su-result__icon.
    expect(root.querySelector('.su-result__icon svg')).not.toBeNull();
  });

  it('applies status modifier and renders subTitle/extra/children', () => {
    render(
      <Result
        status="success"
        title="Done"
        subTitle="Saved successfully"
        extra={<button>Back</button>}
      >
        <pre data-testid="details">trace</pre>
      </Result>
    );
    const root = screen.getByRole('status');
    expect(root.className).toMatch(/su-result--status-success/);
    expect(root.querySelector('.su-result__subtitle')?.textContent).toBe(
      'Saved successfully'
    );
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  it('renders the http-code glyph for 404 / 403 / 500 statuses', () => {
    const { rerender, container } = render(<Result status="404" title="Not found" />);
    expect(container.querySelector('.su-result__http')?.textContent).toBe('404');

    rerender(<Result status="403" title="Forbidden" />);
    expect(container.querySelector('.su-result__http')?.textContent).toBe('403');

    rerender(<Result status="500" title="Server error" />);
    expect(container.querySelector('.su-result__http')?.textContent).toBe('500');
  });

  it('replaces the built-in icon with a custom one', () => {
    render(
      <Result
        status="error"
        icon={<span data-testid="custom-icon">!</span>}
        title="Oops"
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    // Default svg should not appear when custom icon overrides.
    expect(
      screen.getByRole('status').querySelector('.su-result__glyph')
    ).toBeNull();
  });

  it('renders the built-in glyph SVG for error / warning statuses', () => {
    const { rerender, container } = render(
      <Result status="error" title="Boom" />
    );
    expect(container.querySelector('.su-result--status-error')).not.toBeNull();
    expect(container.querySelector('.su-result__glyph')).not.toBeNull();

    rerender(<Result status="warning" title="Heads up" />);
    expect(container.querySelector('.su-result--status-warning')).not.toBeNull();
    expect(container.querySelector('.su-result__glyph')).not.toBeNull();
  });

  it('forwards ref to the root element and exposes displayName', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Result ref={ref} title="t" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(Result.displayName).toBe('Result');
  });

  it('omits subtitle / extra / content blocks when their props are absent', () => {
    const { container } = render(<Result title="Only title" />);
    expect(container.querySelector('.su-result__subtitle')).toBeNull();
    expect(container.querySelector('.su-result__extra')).toBeNull();
    expect(container.querySelector('.su-result__content')).toBeNull();
  });

  it('appends extra className without dropping the built-ins', () => {
    render(<Result status="success" className="my-result" title="t" />);
    const root = screen.getByRole('status');
    expect(root.className).toMatch(/su-result\b/);
    expect(root.className).toMatch(/su-result--status-success/);
    expect(root.className).toMatch(/my-result/);
  });
});
