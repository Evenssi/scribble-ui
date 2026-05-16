import type { ComponentDoc } from '../index';

/** dropdown 有 3 张 API 表（DropdownProps / MenuItem / MenuDivider）+ 末尾 Accessibility 段 */
export type DropdownDoc = ComponentDoc & {
  apiHeadings: {
    props: string;
    menuItem: string;
    menuDivider: string;
  };
  apiMenuItem: ComponentDoc['api'];
  apiMenuDivider: ComponentDoc['api'];
};

export const dropdownZh: DropdownDoc = {
  title: 'Dropdown',
  lede:
    '一个由触发器驱动的菜单，复用了 `Popover` 的浮层基建（portal、自动翻转、外部点击关闭），但语义切换为 `role="menu"` + `role="menuitem"`，以及基于 roving `tabindex` 的键盘导航。把它当成"轻量上下文菜单"，而非"组合框"：触发器是任意 React 元素，children 是菜单项，选中状态不持久化。',
  sections: {
    basic: '基础',
    withIcons: '图标与快捷键',
    hoverTrigger: '悬停触发',
    contextMenu: '右键菜单',
    placement: '位置',
    dividers: '分隔符',
    disabled: '禁用项',
    controlled: '受控',
    code: '代码',
    api: 'API',
    accessibility: '可访问性',
  },
  notes: {
    basic: '点击触发器即可打开菜单。点击外部、按 ESC 或选中某项都会关闭。',
    lastAction: '上次动作：',
    withIcons:
      '菜单项支持 `icon`（左槽位）与 `extra`（右槽位）。`extra` 通常是键盘快捷键提示，以等宽弱化样式渲染。',
    hoverTrigger:
      '当 `trigger="hover"` 时，菜单悬停后约 100ms 打开，光标离开后稍候关闭。浮层有"宽限期"，光标可从触发器移到菜单上而不立即关闭——与 Popover 的约定一致。',
    contextMenu:
      '当 `trigger="contextMenu"` 时，右键（macOS 上 Ctrl + 点击）目标即可打开菜单。菜单锚定在指针位置，而非触发器的 bounding rect，与原生 OS 行为一致。',
    placement:
      '支持 8 种位置。`-start` / `-end` 变体把菜单与触发器的对应角对齐；纯轴向值则居中。当首选方向无足够空间时自动翻转。',
    dividers:
      '在 `menu` 数组的任意位置插入 `{ type: "divider", key: "..." }` 可分组。分隔符以 `role="separator"` 渲染，键盘导航会跳过。',
    disabled:
      '标记为 `disabled` 的项仍然可见（让用户知道哪些动作不可用），但键盘导航跳过，点击被忽略。可访问性状态由 `aria-disabled` 承载。',
    controlled:
      '通过 `open` + `onOpenChange` 从外部驱动打开状态。可用于通过键盘快捷键打开菜单，或在确认流程后以编程方式关闭。',
    controlledRef:
      '注意：外部切换按钮位于触发器与菜单之外，朴素的 `onClick` 会与菜单的外部点击处理（在 `mousedown` 捕获阶段触发）相竞争——按钮先关闭菜单，随后点击又把它打开。把切换按钮的 ref 通过 `clickOutsideIgnore` 传入，Dropdown 在判断"是否点击在外部"时就会跳过它。',
    controlledOpen: '打开：',
    accessibilityRoles:
      '浮层以 `role="menu"` 渲染，每项以 `role="menuitem"`，分隔符以 `role="separator"` 渲染。触发器自动获得 `aria-haspopup="menu"`、`aria-expanded` 以及（打开时）`aria-controls`。禁用项使用 `aria-disabled` 而非原生 `disabled` 属性，从而保持可被键盘发现，符合 WAI-ARIA 菜单模式。',
    accessibilityKeys:
      '键盘导航采用 roving `tabindex`：仅高亮项的 `tabindex=0`，其余为 `-1`。`ArrowDown` / `ArrowUp` 在循环中移动并跳过禁用项；`Home` / `End` 跳到两端；`Enter` / `Space` 激活；`Escape` 关闭并把焦点返还触发器；`Tab` 关闭并让焦点自然流转——菜单 *不* 是焦点陷阱。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      menu: { description: '必填。按顺序渲染的菜单项与分隔符数组。' },
      children: {
        description:
          '必填。一个 React 元素，会通过 `cloneElement` 注入 `ref`、事件处理器与 ARIA 属性。',
      },
      trigger: {
        description:
          '打开菜单的交互方式。`contextMenu` 会抑制原生右键菜单，并在指针位置锚定浮层。',
      },
      placement: { description: '首选位置。空间不足时沿对立轴自动翻转。' },
      offset: { description: '触发器与菜单之间的像素间距。' },
      disabled: { description: '为 true 时触发器仍渲染，但任何交互都不会打开菜单。' },
      open: { description: '受控的打开状态。与 `onOpenChange` 配合。' },
      defaultOpen: { description: '非受控模式下的初始打开状态。' },
      onOpenChange: { description: '每次尝试打开 / 关闭都会触发。' },
      container: { description: '菜单浮层的 portal 容器。' },
      menuClassName: { description: '附加到菜单根节点的额外 class。' },
      menuStyle: {
        description:
          '合并到菜单根节点的内联样式（定位相关字段——`top` / `left` / `position`——始终被计算结果覆盖）。',
      },
    },
  },
  apiHeadings: {
    props: 'DropdownProps',
    menuItem: 'DropdownMenuItem',
    menuDivider: 'DropdownMenuDivider',
  },
  apiMenuItem: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      key: { description: '必填。React 与焦点追踪所需的稳定 id。' },
      label: { description: '必填。中央槽位渲染的主要文本 / 节点。' },
      icon: { description: '可选的左侧图标槽位。' },
      extra: { description: '可选的右侧槽位，通常是快捷键提示或徽标。' },
      disabled: {
        description: '不可激活，键盘导航跳过。仍可见以提示该动作存在。',
      },
      danger: { description: '将项渲染为红色，用于标记破坏性动作（删除、登出等）。' },
      onClick: {
        description: '激活回调。回调返回后菜单自动关闭，除非调用 `event.preventDefault()`。',
      },
    },
  },
  apiMenuDivider: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      type: { description: '必填的判别字段——标识该项为分隔符。' },
      key: { description: '必填。React 所需的稳定 id。' },
    },
  },
};
