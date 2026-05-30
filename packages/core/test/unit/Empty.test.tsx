import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Empty } from '../../src/components/Empty/Empty';

describe('<Empty />', () => {
  it('renders default preset and the fallback "No data" title', () => {
    const { container } = render(<Empty />);
    const root = screen.getByRole('status');
    expect(root.className).toMatch(/su-empty--size-md/);
    expect(root.querySelector('.su-empty__title')?.textContent).toBe('No data');
    // Built-in preset SVG is rendered.
    expect(container.querySelector('.su-empty__image svg')).not.toBeNull();
  });

  it('uses provided title and description, drops fallback title', () => {
    render(<Empty title="Nothing here" description="Try another search" />);
    const root = screen.getByRole('status');
    expect(root.querySelector('.su-empty__title')?.textContent).toBe(
      'Nothing here'
    );
    expect(root.querySelector('.su-empty__description')?.textContent).toBe(
      'Try another search'
    );
  });

  it('omits the fallback title when only description is provided', () => {
    render(<Empty description="Just text" />);
    const root = screen.getByRole('status');
    expect(root.querySelector('.su-empty__title')).toBeNull();
    expect(root.querySelector('.su-empty__description')?.textContent).toBe(
      'Just text'
    );
  });

  it('renders custom image over preset', () => {
    const { container } = render(
      <Empty image={<span data-testid="custom-img">x</span>} />
    );
    expect(screen.getByTestId('custom-img')).toBeInTheDocument();
    expect(container.querySelector('.su-empty__image svg')).toBeNull();
  });

  it('renders action and extra slots', () => {
    render(
      <Empty
        title="t"
        action={<button>Retry</button>}
      >
        <span data-testid="extra">extra</span>
      </Empty>
    );
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });

  it('applies bordered modifier when bordered=true', () => {
    render(<Empty bordered />);
    expect(screen.getByRole('status').className).toMatch(/su-empty--bordered/);
  });

  it('applies size modifier', () => {
    render(<Empty size="lg" />);
    expect(screen.getByRole('status').className).toMatch(/su-empty--size-lg/);
  });
});
