import type { ComponentDoc } from '../index';

export const datepickerZh: ComponentDoc = {
  title: 'DatePicker',
  lede:
    '一个手绘风的单日选择器。触发器复用了 Input 的外观容器，能自然地融入表单；日历弹层 portal 到 `document.body`，下方空间不足时自动翻转，并支持完整键盘导航。零外部依赖——基于原生 `Date` 对象构建。',
  sections: {
    basic: '基础',
    sizes: '尺寸',
    states: '状态',
    bounds: '边界与禁用日期',
    format: '格式化',
    controlled: '受控',
    inForm: '表单内使用',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '最简用法——非受控。当未传入 `value` 时，组件自行管理状态。',
    sizes: '三档尺寸与 Input 对齐——`sm` / `md`（默认） / `lg`。',
    states: '默认、禁用、只读、错误 + 帮助文案，以及内置的 `clearable` ✕ 按钮（一旦选中值即可见）。',
    bounds:
      '使用 `minDate` / `maxDate` 设置硬性边界，或使用 `disabledDate` 实现任意规则。两者是 OR 关系——任一判定成立即禁用该日。下方第二个选择器禁用了周末。',
    format:
      'MVP token 集刻意保持精简：`YYYY`、`MM`、`DD`。其他字符原样透传，所以这三个 token 的任意组合都可用。',
    controlled: '由 React state 驱动数值。用按钮可在外部设置或清空日期，选择器保持同步。',
    inForm:
      '传入 `name` 时，DatePicker 会渲染一个隐藏 input，输出 ISO `YYYY-MM-DD` 字符串，从而参与原生 `<form>` 的提交流程。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '受控的当前选中日期。' },
      defaultValue: { description: '非受控模式下的初始值。' },
      onChange: { description: '当用户选中日期或清空字段时触发。' },
      minDate: { description: '硬性下界（包含本日）。' },
      maxDate: { description: '硬性上界（包含本日）。' },
      disabledDate: { description: '自定义判定函数。与 `minDate` / `maxDate` 是 OR 关系。' },
      format: { description: '展示格式。token：`YYYY`、`MM`、`DD`。其他字符原样透传。' },
      placeholder: { description: '未选中值时触发器显示的占位文案。' },
      size: { description: '视觉尺寸——与 Input 对齐。' },
      disabled: { description: '禁用整个选择器。' },
      readOnly: { description: '触发器置只读——弹层仍可打开但点击日期不会改变值。' },
      error: { description: '以危险色渲染。' },
      helperText: { description: '触发器下方的帮助文案。' },
      clearable: { description: '显示用于清空值的 ✕ 按钮。' },
      weekStartsOn: { description: '一周的第一天（0 = 周日，1 = 周一）。' },
      locale: { description: '覆盖星期 / 月份 / 按钮标签。默认是内置的中文标签集。' },
      showToday: { description: '在弹层底部显示"今天"快捷按钮。' },
      name: { description: '渲染一个隐藏 input，原生表单提交时输出 ISO `YYYY-MM-DD`。' },
      onOpenChange: { description: '弹层打开或关闭时触发。' },
    },
  },
};
