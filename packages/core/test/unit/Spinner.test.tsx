import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Spinner } from '../../src/components/Spinner/Spinner';

describe('<Spinner />', () => {
  it('renders ring variant by default with role=status and "Loading" sr-only label', () => {
    const { container } = render(<Spinner />);
    const node = screen.getByRole('status', { name: 'Loading' });
    expect(node.className).toMatch(/su-spinner--ring/);
    expect(node.className).toMatch(/su-spinner--md/);
    expect(node).toHaveAttribute('aria-live', 'polite');
    // Sr-only label exists; visible label does not.
    expect(container.querySelector('.su-spinner__sr-only')?.textContent).toBe('Loading');
    expect(container.querySelector('.su-spinner__label')).toBeNull();
    // Default ring SVG mounts.
    expect(container.querySelector('svg.su-spinner__ring')).not.toBeNull();
  });

  it('renders dots variant svg', () => {
    const { container } = render(<Spinner variant="dots" />);
    expect(container.querySelector('svg.su-spinner__dots')).not.toBeNull();
    expect(container.querySelectorAll('.su-spinner__dot').length).toBe(3);
  });

  it('renders pencil variant svg', () => {
    const { container } = render(<Spinner variant="pencil" />);
    expect(container.querySelector('svg.su-spinner__pencil')).not.toBeNull();
    expect(container.querySelector('.su-spinner__pencil-path')).not.toBeNull();
  });

  it('size prop drives modifier class and svg width', () => {
    const { container } = render(<Spinner size="lg" />);
    const node = screen.getByRole('status');
    expect(node.className).toMatch(/su-spinner--lg/);
    const svg = container.querySelector('svg.su-spinner__ring');
    expect(svg?.getAttribute('width')).toBe('36');
  });

  it('showLabel renders the visible label and adds with-label modifier', () => {
    const { container } = render(<Spinner showLabel label="Saving…" />);
    const node = screen.getByRole('status', { name: 'Saving…' });
    expect(node.className).toMatch(/su-spinner--with-label/);
    expect(container.querySelector('.su-spinner__label')?.textContent).toBe('Saving…');
    // sr-only path is not rendered when label is visible.
    expect(container.querySelector('.su-spinner__sr-only')).toBeNull();
  });

  it('color prop is applied via inline style.color', () => {
    render(<Spinner color="rebeccapurple" />);
    const node = screen.getByRole('status');
    expect((node as HTMLElement).style.color).toBe('rebeccapurple');
  });
});
