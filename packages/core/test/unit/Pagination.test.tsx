import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Pagination,
  getPageItems,
} from '../../src/components/Pagination/Pagination';

describe('getPageItems()', () => {
  it('returns the full range when totalPages <= 7', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns [] for non-positive totalPages and [1] for the single-page case', () => {
    expect(getPageItems(1, 0)).toEqual([]);
    expect(getPageItems(1, 1)).toEqual([1]);
  });

  it('inserts ellipses around the current window for long lists', () => {
    // Long list, current near the start: leading run + window, then one
    // ellipsis before the trailing boundary, then the final page.
    const start = getPageItems(1, 20);
    expect(start[0]).toBe(1);
    expect(start[start.length - 1]).toBe(20);
    expect(start).toContain('end-ellipsis');
    expect(start).not.toContain('start-ellipsis');

    // Long list, current in the middle: ellipses on both sides.
    const mid = getPageItems(10, 20);
    expect(mid[0]).toBe(1);
    expect(mid[mid.length - 1]).toBe(20);
    expect(mid).toContain('start-ellipsis');
    expect(mid).toContain('end-ellipsis');
    expect(mid).toContain(10);

    // Long list, current at the end: only a leading ellipsis.
    const end = getPageItems(20, 20);
    expect(end[0]).toBe(1);
    expect(end[end.length - 1]).toBe(20);
    expect(end).toContain('start-ellipsis');
    expect(end).not.toContain('end-ellipsis');
  });
});

describe('<Pagination />', () => {
  it('derives totalPages from total + pageSize and renders the active page', () => {
    render(<Pagination total={100} pageSize={10} defaultCurrent={3} />);

    const active = screen.getByRole('button', { name: /go to page 3/i });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active.className).toMatch(/su-pagination__page--active/);
  });

  it('uncontrolled: clicking a page button moves current and notifies onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Pagination
        totalPages={10}
        defaultCurrent={1}
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole('button', { name: /go to page 2/i }));
    expect(onChange).toHaveBeenLastCalledWith(2);

    const active = screen.getByRole('button', { name: /go to page 2/i });
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('disables prev at page 1 and next at the last page', () => {
    render(<Pagination totalPages={5} current={1} />);
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();

    render(<Pagination totalPages={5} current={5} />);
    const lastPrev = screen.getAllByRole('button', { name: /previous page/i })[1];
    const lastNext = screen.getAllByRole('button', { name: /next page/i })[1];
    expect(lastPrev).not.toBeDisabled();
    expect(lastNext).toBeDisabled();
  });

  it('controlled: only the consumer-driven `current` prop wins', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [page, setPage] = useState(1);
      return (
        <Pagination
          totalPages={5}
          current={page}
          onChange={(next) => {
            onChange(next);
            // Intentionally NOT applying the change to assert the
            // controlled lock — visible page should stay at 1.
            void setPage;
          }}
        />
      );
    }

    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: /go to page 3/i }));
    expect(onChange).toHaveBeenLastCalledWith(3);

    // Active is still page 1 since we did not commit the change.
    const active = screen.getByRole('button', { name: /go to page 1/i });
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('simple mode: renders only prev/next plus a "current / total" readout', () => {
    render(<Pagination totalPages={9} defaultCurrent={4} simple />);
    // No numeric page buttons at all.
    expect(screen.queryByRole('button', { name: /go to page 4/i })).toBeNull();
    // The readout shows both numbers.
    const readout = screen.getByText('/').parentElement;
    expect(readout?.textContent).toContain('4');
    expect(readout?.textContent).toContain('9');
  });
});
