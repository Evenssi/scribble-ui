import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs } from '../../src/components/Tabs/Tabs';
import { TabList } from '../../src/components/Tabs/TabList';
import { Tab } from '../../src/components/Tabs/Tab';
import { TabPanels } from '../../src/components/Tabs/TabPanels';
import { TabPanel } from '../../src/components/Tabs/TabPanel';

function basicTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return (
    <Tabs {...props}>
      <TabList aria-label="Sections">
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
        <Tab value="three" disabled>
          Three
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="one">First panel</TabPanel>
        <TabPanel value="two">Second panel</TabPanel>
        <TabPanel value="three">Third panel</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

describe('<Tabs />', () => {
  it('renders a tablist with role/aria and disabled metadata', () => {
    render(basicTabs());
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('falls back to the first non-disabled tab when no value/defaultValue is provided', async () => {
    render(basicTabs());
    // The first non-disabled tab activates and its panel is shown.
    expect(await screen.findByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
    // Inactive panels are not in the DOM by default (no keepMounted).
    expect(screen.queryByText('Second panel')).toBeNull();
  });

  it('switches the active tab on click and fires onChange (uncontrolled)', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(basicTabs({ onChange }));

    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(onChange).toHaveBeenLastCalledWith('two');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
  });

  it('controlled mode: clicking does not change tabs unless parent updates `value`', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(basicTabs({ value: 'one', onChange }));
    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(onChange).toHaveBeenLastCalledWith('two');
    // Parent didn't flip the value — tab "one" is still selected.
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    rerender(basicTabs({ value: 'two', onChange }));
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('disabled tab cannot be activated via click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(basicTabs({ onChange }));

    await user.click(screen.getByRole('tab', { name: 'Three' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('wires aria-controls / aria-labelledby between tab and panel', async () => {
    render(basicTabs());
    const oneTab = await screen.findByRole('tab', { name: 'One' });
    const panel = screen.getByRole('tabpanel');
    expect(oneTab.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(oneTab.id);
  });

  it('keepMounted={true} renders every panel and hides inactive ones via the hidden attribute', () => {
    render(
      <Tabs defaultValue="one" keepMounted>
        <TabList aria-label="x">
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="one">P1</TabPanel>
          <TabPanel value="two">P2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    // Both panel DOMs are present, but the inactive one is hidden.
    const allPanels = document.querySelectorAll('[role="tabpanel"]');
    expect(allPanels).toHaveLength(2);
    const inactive = Array.from(allPanels).find(
      (n) => n.textContent === 'P2'
    ) as HTMLElement;
    expect(inactive).toHaveAttribute('hidden');
  });

  it('automatic mode: ArrowRight focuses the next tab and activates it', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(basicTabs({ onChange }));

    const oneTab = await screen.findByRole('tab', { name: 'One' });
    oneTab.focus();
    await user.keyboard('{ArrowRight}');

    // Two should now be active (skip-disabled handled by TabList: One→Two).
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(onChange).toHaveBeenLastCalledWith('two');
  });

  it('manual mode: ArrowRight only moves focus, Enter activates', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(basicTabs({ onChange, activationMode: 'manual' }));

    const oneTab = await screen.findByRole('tab', { name: 'One' });
    oneTab.focus();
    await user.keyboard('{ArrowRight}');

    // Focus moved to Two, but One is still the active tab.
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(onChange).not.toHaveBeenCalled();

    // Enter activates the focused tab.
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith('two');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});
