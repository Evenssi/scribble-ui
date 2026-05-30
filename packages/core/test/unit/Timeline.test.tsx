import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Timeline } from '../../src/components/Timeline/Timeline';

describe('<Timeline />', () => {
  it('renders an <ol> with default Timeline aria-label and left mode', () => {
    render(
      <Timeline>
        <Timeline.Item time="10:00">First</Timeline.Item>
        <Timeline.Item time="11:00">Second</Timeline.Item>
      </Timeline>
    );
    const list = screen.getByRole('list', { name: 'Timeline' });
    expect(list.tagName).toBe('OL');
    expect(list.className).toMatch(/su-timeline--left/);
    expect(list.querySelectorAll('li.su-timeline__item').length).toBe(2);
  });

  it('renders as <ul> when as="ul" is passed', () => {
    render(
      <Timeline as="ul" aria-label="Events">
        <Timeline.Item>x</Timeline.Item>
      </Timeline>
    );
    const list = screen.getByRole('list', { name: 'Events' });
    expect(list.tagName).toBe('UL');
  });

  it('applies mode and reverse modifier classes', () => {
    render(
      <Timeline mode="alternate" reverse>
        <Timeline.Item>x</Timeline.Item>
      </Timeline>
    );
    const list = screen.getByRole('list');
    expect(list.className).toMatch(/su-timeline--alternate/);
    expect(list.className).toMatch(/su-timeline--reverse/);
  });

  it('wraps a primitive `time` prop in a <time> element', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item time="2024-01-01">First</Timeline.Item>
      </Timeline>
    );
    const t = container.querySelector('time.su-timeline__time-text');
    expect(t?.textContent).toBe('2024-01-01');
  });

  it('does NOT wrap ReactNode time prop in a <time> element', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item time={<span data-testid="custom-time">Now</span>}>
          x
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByTestId('custom-time')).toBeInTheDocument();
    expect(container.querySelector('time.su-timeline__time-text')).toBeNull();
  });

  it('applies status and dashed modifier classes per item', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item status="success">a</Timeline.Item>
        <Timeline.Item status="error" dashed>
          b
        </Timeline.Item>
      </Timeline>
    );
    const items = container.querySelectorAll('li.su-timeline__item');
    expect(items[0]?.className).toMatch(/su-timeline__item--status-success/);
    expect(items[1]?.className).toMatch(/su-timeline__item--status-error/);
    expect(items[1]?.className).toMatch(/su-timeline__item--dashed/);
  });

  it('renders a custom dot glyph and adds custom-dot modifier', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item dot={<span data-testid="dot">★</span>}>x</Timeline.Item>
      </Timeline>
    );
    expect(screen.getByTestId('dot')).toBeInTheDocument();
    expect(
      container.querySelector('.su-timeline__item--custom-dot')
    ).not.toBeNull();
  });
});
