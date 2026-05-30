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

  it('renders the search preset SVG when preset="search"', () => {
    const { container } = render(<Empty preset="search" />);
    // Search preset uses a magnifier circle inside the illustration.
    expect(container.querySelector('.su-empty__image svg')).not.toBeNull();
    expect(container.querySelector('.su-empty__image svg circle')).not.toBeNull();
  });

  it('renders the data preset SVG when preset="data"', () => {
    const { container } = render(<Empty preset="data" />);
    // Data preset renders the open-folder paths.
    const svg = container.querySelector('.su-empty__image svg');
    expect(svg).not.toBeNull();
    // The data preset has multiple <path> nodes; default has them too,
    // so we just sanity-check the SVG mounted.
    expect(svg!.querySelectorAll('path').length).toBeGreaterThan(0);
  });

  it('renders extra (children) below the action when both are present', () => {
    render(
      <Empty
        title="t"
        action={<button>Retry</button>}
      >
        <span data-testid="extra">extra</span>
      </Empty>
    );
    const root = screen.getByRole('status');
    const action = root.querySelector('.su-empty__action');
    const extra = root.querySelector('.su-empty__extra');
    expect(action).not.toBeNull();
    expect(extra).not.toBeNull();
    // DOM order: action precedes extra.
    expect(
      action!.compareDocumentPosition(extra!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('treats empty-string title as missing and falls back to "No data"', () => {
    render(<Empty title="" />);
    expect(
      screen.getByRole('status').querySelector('.su-empty__title')?.textContent
    ).toBe('No data');
  });

  it('does not render the description block when description is empty string', () => {
    render(<Empty title="x" description="" />);
    expect(
      screen.getByRole('status').querySelector('.su-empty__description')
    ).toBeNull();
  });
});
