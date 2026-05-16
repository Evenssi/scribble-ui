import type { DropdownDoc } from '../../zh-CN/components/dropdown';

export const dropdownEn: DropdownDoc = {
  title: 'Dropdown',
  lede:
    "A trigger-driven menu that reuses `Popover`'s floating-surface vocabulary (portal, auto-flip, click-outside) but swaps the semantics to `role=\"menu\"` + `role=\"menuitem\"`, with roving `tabindex` keyboard navigation. Think \"lightweight context menu\", not \"combobox\": the trigger is any React element, the children are menu entries, and selection does not persist.",
  sections: {
    basic: 'Basic',
    withIcons: 'With icons & shortcuts',
    hoverTrigger: 'Hover trigger',
    contextMenu: 'Context menu',
    placement: 'Placement',
    dividers: 'Dividers',
    disabled: 'Disabled items',
    controlled: 'Controlled',
    code: 'Code',
    api: 'API',
    accessibility: 'Accessibility',
  },
  notes: {
    basic: 'Click the trigger to open the menu. Click outside, press Esc, or pick an entry to close.',
    lastAction: 'Last action:',
    withIcons:
      'Items accept `icon` (left slot) and `extra` (right slot). `extra` is typically a keyboard shortcut hint rendered in a monospaced muted style.',
    hoverTrigger:
      'With `trigger="hover"` the menu opens on hover (with a small 100ms delay) and closes shortly after the cursor leaves. The surface gets a grace period so the user can drift from the trigger onto the menu without it slamming shut — mirrors the Popover convention.',
    contextMenu:
      'With `trigger="contextMenu"`, right-click (or Ctrl-click on macOS) on the target to open the menu. The menu anchors at the pointer location instead of the trigger\'s bounding rect, matching native OS behavior.',
    placement:
      "Eight placements are supported. `-start` and `-end` variants align the menu's corner with the trigger's corner; the plain axis value centers it. Auto-flips when the preferred side would overflow.",
    dividers:
      'Insert `{ type: "divider", key: "..." }` entries anywhere in the `menu` array to break groups apart. Dividers are rendered as `role="separator"` and skipped by keyboard navigation.',
    disabled:
      "Items marked `disabled` stay visible (so users know what's unavailable) but are skipped by keyboard navigation and ignore clicks. Accessibility state is carried by `aria-disabled`.",
    controlled:
      'Drive the open state from outside via `open` + `onOpenChange`. Useful for opening a menu from a keyboard shortcut or closing it programmatically after a confirm flow.',
    controlledRef:
      "Note: The outer toggle button sits outside the trigger and menu, so a naive `onClick` would race with the menu's click-outside handler (which fires on `mousedown` capture and would close first, then the click would re-open). Pass the toggle's ref via `clickOutsideIgnore` and Dropdown will skip it when deciding whether a pointer-down is \"outside\".",
    controlledOpen: 'Open:',
    accessibilityRoles:
      'The surface is rendered with `role="menu"`, each item with `role="menuitem"`, and dividers with `role="separator"`. The trigger receives `aria-haspopup="menu"`, `aria-expanded` and (when open) `aria-controls`. Disabled items carry `aria-disabled` rather than the native `disabled` attribute so they stay keyboard-discoverable, matching the WAI-ARIA Menu pattern.',
    accessibilityKeys:
      'Keyboard navigation uses roving `tabindex`: only the highlighted item has `tabindex=0`, the rest are `-1`. ArrowDown / ArrowUp move with wrap and skip disabled entries; Home / End jump to the ends; Enter / Space activate; Escape closes and returns focus to the trigger; Tab closes and lets focus flow naturally — a menu is not a focus trap.',
  },
  api: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      menu: { description: 'Required. Array of menu items and dividers, rendered in order.' },
      children: {
        description:
          'Required. A single React element that will receive the injected `ref`, event handlers and ARIA attributes via `cloneElement`.',
      },
      trigger: {
        description:
          'Interaction that opens the menu. `contextMenu` suppresses the native right-click menu and anchors the surface at the pointer.',
      },
      placement: { description: 'Preferred placement. Auto-flips to the opposite axis on overflow.' },
      offset: { description: 'Pixel gap between the trigger and the menu surface.' },
      disabled: { description: 'When true, the trigger still renders but no interaction opens the menu.' },
      open: { description: 'Controlled open state. Pair with `onOpenChange`.' },
      defaultOpen: { description: 'Initial open state in uncontrolled mode.' },
      onOpenChange: { description: 'Fires for every attempted open/close.' },
      container: { description: 'Portal container for the menu surface.' },
      menuClassName: { description: 'Extra class names on the menu root.' },
      menuStyle: {
        description:
          'Inline style merged onto the menu root (positioning keys — `top` / `left` / `position` — are always overridden by the computed layout).',
      },
    },
  },
  apiHeadings: {
    props: 'DropdownProps',
    menuItem: 'DropdownMenuItem',
    menuDivider: 'DropdownMenuDivider',
  },
  apiMenuItem: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      key: { description: 'Required. Stable identity for React + focus tracking.' },
      label: { description: 'Required. Primary text / node rendered in the center slot.' },
      icon: { description: 'Optional left-side icon slot.' },
      extra: { description: 'Optional right-side slot, typically a shortcut hint or badge.' },
      disabled: {
        description: 'Non-activatable; skipped by keyboard navigation. Still visible so users know the action exists.',
      },
      danger: { description: 'Tint the item red to mark a destructive action (delete, sign out, etc).' },
      onClick: {
        description: 'Activation handler. The menu closes automatically after the callback unless you call `event.preventDefault()`.',
      },
    },
  },
  apiMenuDivider: {
    headers: { name: 'Name', type: 'Type', default: 'Default', description: 'Description' },
    rows: {
      type: { description: 'Required discriminator — marks the entry as a divider.' },
      key: { description: 'Required. Stable identity for React.' },
    },
  },
};
