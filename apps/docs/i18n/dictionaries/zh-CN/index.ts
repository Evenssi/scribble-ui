/**
 * 中文字典（默认 / 类型源）
 *
 * 这份对象同时承担两个角色：
 *   1. 运行时被 getDictionary('zh-CN') 取用，渲染中文 UI；
 *   2. 通过 `as const` 推导 `Dictionary` 类型，要求 en-US 实现同一形状。
 *
 * 因此向这里追加新字段时，TS 会自动要求 en-US 同步补齐 — 缺译即编译报错。
 *
 * 文案口径（与 plan 共识）：
 *   - 组件名 / API prop 名 / TS 类型字面量 / demo 内可见 label / 代码示例 全部保留英文
 *   - 仅展示性文案中文化（侧边栏分组、首页 lede / 说明、组件页 lede / 区块标题 / 解说 / API description）
 *
 * 第 1 轮：meta / nav / home 100% 双语满译；components 字段为空对象，第 2 轮逐页扩。
 */

import { alertZh } from './components/alert';
import { avatarZh } from './components/avatar';
import { backtopZh } from './components/backtop';
import { badgeZh } from './components/badge';
import { breadcrumbZh } from './components/breadcrumb';
import { buttonZh } from './components/button';
import { cardZh } from './components/card';
import { carouselZh } from './components/carousel';
import { checkboxZh } from './components/checkbox';

/** 与路由 slug 一一对应的组件键（小写）。 */
export const componentSlugs = [
  'alert',
  'avatar',
  'backtop',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'carousel',
  'checkbox',
  'datepicker',
  'divider',
  'drawer',
  'dropdown',
  'empty',
  'form',
  'input',
  'modal',
  'numberinput',
  'pagination',
  'popover',
  'progress',
  'radio',
  'result',
  'select',
  'skeleton',
  'slider',
  'spinner',
  'switch',
  'tabs',
  'tag',
  'textarea',
  'timeline',
  'toast',
  'tooltip',
] as const;

export type ComponentSlug = (typeof componentSlugs)[number];

/**
 * 单个组件页文档字典的形状。
 * 第 2 轮迁移时每页填充；第 1 轮 components 整体为空对象。
 */
export type ComponentDoc = {
  title: string;
  lede: string;
  sections: Record<string, string>;
  notes: Record<string, string>;
  api: {
    headers: { name: string; type: string; default: string; description: string };
    rows: Record<string, { description: string }>;
  };
  footerNote?: string;
};

/**
 * Dictionary 形状（手写一份显式 type，比 `typeof zhCN as const` 更宽松、
 * 也比 satisfies 推导的窄字面量类型更友好 —— 字段值仍是 string，
 * 但所有键 / 嵌套结构都被强约束，缺译即报错）。
 */
export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    brand: string;
    gettingStarted: string;
    introduction: string;
    groups: {
      general: string;
      layout: string;
      navigation: string;
      dataEntry: string;
      dataDisplay: string;
      feedback: string;
      other: string;
    };
  };
  topbar: {
    localeSwitcher: {
      label: string;
      zh: string;
      en: string;
    };
  };
  home: {
    slogan: string;
    ledeBefore: string;
    ledeCode: string;
    ledeAfter: string;
    components: string;
    statusLine: string;
    items: Record<ComponentSlug, { name: string; desc: string }>;
  };
  components: Partial<Record<ComponentSlug, ComponentDoc>>;
};

export const zhCN: Dictionary = {
  meta: {
    title: 'scribble-ui — 手绘风 React 组件库',
    description: '一套手绘风 React 组件库 —— 便利贴遇见白板速写。',
  },

  nav: {
    brand: 'scribble-ui',
    gettingStarted: '开始使用',
    introduction: '简介',
    groups: {
      general: '基础',
      layout: '布局',
      navigation: '导航',
      dataEntry: '数据录入',
      dataDisplay: '数据展示',
      feedback: '反馈',
      other: '其他',
    },
  },

  topbar: {
    localeSwitcher: {
      label: '语言',
      zh: '中文',
      en: 'English',
    },
  },

  home: {
    slogan: '一套手绘风 React 组件库 —— 便利贴遇见白板速写。',
    ledeBefore: '欢迎。这里是 ',
    ledeCode: 'scribble-ui',
    ledeAfter:
      ' 的文档站。这是一套小巧的 React 组件库，偏爱温暖的米白胜过商务蓝、不规则边角胜过完美矩形、硬朗投影胜过 Material 高度。',
    components: '组件',
    statusLine:
      'Day 19 · 已交付 34 个组件 · 现已按 7 个分类（基础 · 布局 · 导航 · 数据录入 · 数据展示 · 反馈 · 其他）组织，与 Ant Design / Arco 的分类约定保持一致。',
    items: {
      alert: { name: 'Alert', desc: '— 内联反馈条，4 种变体，可关闭，可切换 banner 模式。' },
      avatar: { name: 'Avatar', desc: '— 圆形 / 方形便利贴风格头像，支持图片回退与首字母自动派生。' },
      backtop: { name: 'BackTop', desc: '— 悬浮回到顶部按钮，支持滚动阈值显示、平滑滚动与作用域容器。' },
      badge: { name: 'Badge', desc: '— 独立或包裹型徽标，支持计数、点状、超量折叠与 4 个方位。' },
      breadcrumb: { name: 'Breadcrumb', desc: '— 层级路径，items 与组合两种 API、自定义分隔符与中段省略。' },
      button: { name: 'Button', desc: '— 摇晃感、便利贴风格的行动召唤按钮。' },
      card: { name: 'Card', desc: '— 纸张或便利贴表面，可切换为可交互模式。' },
      carousel: { name: 'Carousel', desc: '— 手绘风内容轮播，支持滑动 / 淡入切换、自动播放、拖拽与键盘导航。' },
      checkbox: { name: 'Checkbox', desc: '— 受控 / 非受控、半选状态，配套 CheckboxGroup 辅助组件。' },
      datepicker: { name: 'DatePicker', desc: '— 日历下拉选择器，支持 portal 弹层、键盘月年导航、最值禁用与本地化标签。' },
      divider: { name: 'Divider', desc: '— 横向 / 纵向分隔线，支持实线、虚线与手绘波浪线。' },
      drawer: { name: 'Drawer', desc: '— 任意边缘锚定的侧滑面板，支持焦点陷阱、滚动锁定与滑入动效。' },
      dropdown: { name: 'Dropdown', desc: '— 菜单浮层，8 种位置、点击 / 悬停 / 右键三种触发与 roving-tabindex 键盘导航。' },
      empty: { name: 'Empty', desc: '— 手绘风空状态占位，适用于空列表、搜索无果与首次使用场景。' },
      form: { name: 'Form', desc: '— 标签 / 必填标记 / 错误 / 帮助文案的视觉外壳。状态自带（推荐 react-hook-form + zod）。' },
      input: { name: 'Input', desc: '— 文本输入框，支持前 / 后缀槽位、可清除与错误态。' },
      modal: { name: 'Modal', desc: '— portal 化对话框，自带焦点陷阱、ESC + 蒙层关闭与滚动锁定。' },
      numberinput: { name: 'NumberInput', desc: '— 数字输入框，支持 ± 步进器、键盘 ↑/↓ + Shift/Alt 修饰、最值钳制与精度。' },
      pagination: { name: 'Pagination', desc: '— 数据驱动分页器，支持智能省略折叠、simple / small 变体与完整可访问性。' },
      popover: { name: 'Popover', desc: '— 可交互浮层，支持标题 / 页脚、外部点击关闭与自动翻转。' },
      progress: { name: 'Progress', desc: '— 线性或环形进度，支持状态色、文字标签与不确定模式。' },
      radio: { name: 'Radio', desc: '— 与 RadioGroup 配合，统一 name、布局与互斥选择。' },
      result: { name: 'Result', desc: '— 整页反馈页面，覆盖成功、失败与 HTTP 错误路由。' },
      select: { name: 'Select', desc: '— portal 化 listbox 下拉，支持键盘导航、首字母搜索与自动翻转。' },
      skeleton: { name: 'Skeleton', desc: '— 文本 / 矩形 / 圆形加载占位符，支持脉冲或波浪动画。' },
      slider: { name: 'Slider', desc: '— 单值或范围选择器，支持刻度、便利贴 tooltip、纵向模式与完整键盘导航。' },
      spinner: { name: 'Spinner', desc: '— 圆环、点状或手绘铅笔三种加载器，自动继承 currentColor。' },
      switch: { name: 'Switch', desc: '— 可访问的开 / 关切换器，含弹跳手柄与三档尺寸。' },
      tabs: { name: 'Tabs', desc: '— 可访问的页签导航，支持下划线 / 卡片 / 胶囊三种变体与 roving-tabindex 键盘导航。' },
      tag: { name: 'Tag', desc: '— 小型标签，含状态色与便利贴色，可选 ✕ 关闭。' },
      textarea: { name: 'Textarea', desc: '— 多行输入框，支持自动高度、字符计数与帮助文案。' },
      timeline: { name: 'Timeline', desc: '— 纵向事件带，支持左 / 右 / 交替模式与 5 种状态点。' },
      toast: { name: 'Toast', desc: '— 命令式通知，6 个出现位置、悬停暂停与多种变体。' },
      tooltip: { name: 'Tooltip', desc: '— portal 化气泡，支持悬停 + 聚焦触发、自动翻转与点击切换。' },
    },
  },

  /**
   * 第 2 轮逐页填入。
   * Partial 让第 1 轮不需要给所有 34 个 slug 写空对象，避免噪音。
   */
  components: {
    alert: alertZh,
    avatar: avatarZh,
    backtop: backtopZh,
    badge: badgeZh,
    breadcrumb: breadcrumbZh,
    button: buttonZh,
    card: cardZh,
    carousel: carouselZh,
    checkbox: checkboxZh,
  },
};
