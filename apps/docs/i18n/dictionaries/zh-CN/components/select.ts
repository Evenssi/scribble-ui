import type { ComponentDoc } from '../index';

export const selectZh: ComponentDoc = {
  title: 'Select',
  lede:
    '一个手绘风下拉选择器。触发器沿用 Input 外壳，能自然嵌入表单。listbox 会被 portal 到 `document.body` 以摆脱祖先的 overflow 截断、空间不足时自动翻转到触发器上方，并支持包括首字母搜索在内的完整键盘导航。',
  sections: {
    basic: '基础',
    jsxChildren: 'JSX 子元素',
    controlled: '受控',
    sizes: '尺寸',
    disabled: '禁用',
    longList: '长列表（自动翻转 + 滚动）',
    error: '错误态与帮助文案',
    insideForm: '在 form 内',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '最简形式——传入 `options` 数组，元素形如 `{ value, label, disabled? }`。未传 `value` 时组件自管状态（非受控）。',
    jsxChildren:
      '需要图标、自定义渲染，或想让选项与其它 JSX 并列时，改用 `<Option>` 子元素。',
    controlled:
      '从 React state 驱动选中值。下面两个选择器共享同一份 state——移动其一另一个也会同步。',
    sizes: '与 Input 一致的三档尺寸—— `sm` / `md`（默认） / `lg`。',
    disabled:
      '上方的 *Durian* 项被禁用——键盘导航会跳过、点击会被忽略。整个 select 也可以禁用。',
    longList:
      'listbox 高度上限 `280px`，超出时滚动。触发器下方空间不足时翻到上方。把页面滚到底部附近开启它即可看到翻转。',
    error: '配合 `error` 与 `helperText` 显示校验消息。',
    insideForm:
      '传入 `name`，Select 会渲染一个隐藏 input，让值正常参与原生 `<form>` 提交。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '受控的当前选中值。' },
      defaultValue: { description: '非受控模式的初始值。' },
      onChange: { description: '用户选中某项时触发。' },
      options: {
        description: '数组形式。与 JSX 子元素互斥（同时存在时子元素优先）。',
      },
      placeholder: { description: '未选中时显示。' },
      size: { description: '视觉尺寸——与 Input 一致。' },
      disabled: { description: '禁用整个 select。' },
      error: { description: '应用 danger 颜色。' },
      helperText: { description: '触发器下方的辅助文案。' },
      name: { description: '渲染一个隐藏 input，让值参与表单提交。' },
      onOpenChange: { description: 'listbox 打开 / 关闭时收到通知。' },
    },
  },
};
