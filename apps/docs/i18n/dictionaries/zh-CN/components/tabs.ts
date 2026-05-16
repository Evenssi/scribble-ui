import type { ComponentDoc } from '../index';

export type TabsDoc = ComponentDoc & {
  apiHeadings: {
    tabs: string;
    tabList: string;
    tab: string;
    tabPanels: string;
    tabPanel: string;
  };
  apiTabList: ComponentDoc['api'];
  apiTab: ComponentDoc['api'];
  apiTabPanels: ComponentDoc['api'];
  apiTabPanel: ComponentDoc['api'];
};

export const tabsZh: TabsDoc = {
  title: 'Tabs',
  lede:
    '手绘风页签导航。三种风味——下划线、卡片、胶囊——共享同一套 WAI-ARIA Tabs 模式：roving tabindex、方向键聚焦、可选手动激活，以及每个触发器与面板之间稳定的 id 配线。',
  sections: {
    basic: '基础',
    variants: '变体',
    sizes: '尺寸',
    vertical: '纵向',
    disabledManual: '禁用与手动激活',
    controlled: '受控',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '默认 `underline` 变体。键盘：ArrowLeft / ArrowRight 切换、Home / End 跳到两端、Tab 进入面板正文。',
    variants: '同样的内容，三种视觉个性。挑一个跟周围表面最匹配的——工具栏选 pill、看板选 card，其它情形几乎都用 underline。',
    vertical: '设置 `orientation="vertical"`。方向键自动改为 ArrowUp / ArrowDown。',
    disabledManual:
      '禁用页签依然渲染，但会被方向键跳过。`activationMode="manual"` 让聚焦 *不* 激活面板——必须按 Enter 或 Space。在切换有真实成本（如发请求）时很有用。',
    controlled:
      '传入 `value` + `onChange` 从外部驱动控件。下方按钮修改的就是 Tabs 读取的同一份 state。',
    apiFooter:
      '每个组件都向其底层 DOM 元素转发 ref，并接受对应的原生属性（`aria-*`、`data-*`、`id` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '受控的活动 tab 值。' },
      defaultValue: { description: '非受控时的初始活动值。省略则取第一个未禁用的页签。' },
      onChange: { description: '活动 tab 变化时触发。' },
      variant: { description: '视觉变体。' },
      size: { description: '尺寸预设。' },
      orientation: { description: '布局方向。同时旋转方向键绑定。' },
      activationMode: {
        description: '`"automatic"` 在聚焦时激活；`"manual"` 需要按 Enter / Space。',
      },
      keepMounted: {
        description: '保持每个面板都挂载在 DOM 中（未激活时通过 `hidden` 属性隐藏）。',
      },
      className: { description: '外层容器上的额外 class。' },
    },
  },
  apiHeadings: {
    tabs: 'Tabs',
    tabList: 'TabList',
    tab: 'Tab',
    tabPanels: 'TabPanels',
    tabPanel: 'TabPanel',
  },
  apiTabList: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      'aria-label': { description: '若没有 labelled-by，则需要为屏幕阅读器提供。' },
      'aria-labelledby': { description: '引用外部标题，而不是内联 label。' },
      className: { description: 'tablist 元素上的额外 class。' },
    },
  },
  apiTab: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '必填。与匹配的 `<TabPanel>` 配对。' },
      disabled: { description: '依然渲染，但会被方向键跳过且无法激活。' },
      icon: { description: '渲染在文字之前的装饰性图标。' },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
  apiTabPanels: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      className: {
        description: '各页签面板的布局槽。它本身不带 ARIA——每个 `TabPanel` 已经处理好了。',
      },
    },
  },
  apiTabPanel: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '必填。与匹配的 `<Tab>` 配对。' },
      forceMount: {
        description: '强制让该单个面板保持挂载（未激活时通过 `hidden` 隐藏）。',
      },
      className: { description: '面板元素上的额外 class。' },
    },
  },
};
