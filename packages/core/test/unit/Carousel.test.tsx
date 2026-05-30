import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Carousel } from '../../src/components/Carousel/Carousel';

const items = [
  { key: 'a', content: <div data-testid="slide-a">A</div> },
  { key: 'b', content: <div data-testid="slide-b">B</div> },
  { key: 'c', content: <div data-testid="slide-c">C</div> },
];

describe('<Carousel />', () => {
  it('renders an aria region with one indicator per slide and the first slide active', () => {
    render(<Carousel items={items} autoplay={false} ariaLabel="Hero" />);

    const region = screen.getByRole('region', { name: 'Hero' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');

    // One indicator per slide.
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    expect(indicators).toHaveLength(3);
    // First indicator is current.
    expect(indicators[0]).toHaveAttribute('aria-current', 'true');
    expect(indicators[1]).not.toHaveAttribute('aria-current');
  });

  it('next / prev arrows move the active slide and notify onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Carousel
        items={items}
        autoplay={false}
        loop={false}
        onChange={onChange}
      />
    );

    const next = screen.getByRole('button', { name: /next slide/i });
    const prev = screen.getByRole('button', { name: /previous slide/i });

    await user.click(next);
    expect(onChange).toHaveBeenLastCalledWith(1, 0);

    await user.click(next);
    expect(onChange).toHaveBeenLastCalledWith(2, 1);

    // At the last slide with loop=false, prev still works going back.
    await user.click(prev);
    expect(onChange).toHaveBeenLastCalledWith(1, 2);
  });

  it('loop=false: prev is aria-disabled at first slide, next at last', () => {
    render(
      <Carousel items={items} autoplay={false} loop={false} defaultIndex={0} />
    );
    const prev = screen.getByRole('button', { name: /previous slide/i });
    const next = screen.getByRole('button', { name: /next slide/i });
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(next).not.toHaveAttribute('aria-disabled');
  });

  it('controlled mode: only the consumer-driven activeIndex wins', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [i, setI] = useState(0);
      return (
        <Carousel
          items={items}
          autoplay={false}
          loop={false}
          activeIndex={i}
          onChange={(next, prev) => {
            onChange(next, prev);
            // Only commit moves to slide 1; everything else is rejected
            // to demonstrate the controlled lock.
            if (next === 1) setI(next);
          }}
        />
      );
    }

    render(<Controlled />);

    await user.click(screen.getByRole('button', { name: /next slide/i }));
    expect(onChange).toHaveBeenLastCalledWith(1, 0);
    // Active indicator now reflects slide 2 (index 1).
    const indicators = screen.getAllByRole('button', { name: /go to slide/i });
    expect(indicators[1]).toHaveAttribute('aria-current', 'true');
  });

  it('renders the number indicator shape as a "i / n" fraction', () => {
    render(
      <Carousel
        items={items}
        autoplay={false}
        defaultIndex={1}
        indicatorShape="number"
      />
    );

    // The fraction readout sits inside the indicator strip.
    const fraction = document.querySelector('.su-carousel__fraction');
    expect(fraction).not.toBeNull();
    expect(fraction?.textContent?.replace(/\s+/g, '')).toContain('2/3');
  });
});
