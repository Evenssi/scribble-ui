import type { ComponentDoc } from '../index';

/**
 * Checkbox 页有两张 API 表（Checkbox 与 CheckboxGroup）。
 * rows 用前缀区分：`cb__*` 主表；`grp__*` 分组表。
 */
export const checkboxZh: ComponentDoc = {
  title: 'Checkbox',
  lede:
    '一颗手绘风复选框，底层是真实的原生 `<input>`，所以屏幕阅读器和表单提交都正常工作。把多个复选框丢进 `CheckboxGroup` 即可共享状态与布局。',
  sections: {
    sizes: '尺寸',
    states: '状态',
    groupVertical: '分组 · 垂直',
    groupHorizontal: '分组 · 水平 + 整组禁用',
    code: '代码',
    api: 'API',
    apiCheckbox: 'Checkbox',
    apiGroup: 'CheckboxGroup',
  },
  notes: {
    groupVertical: '已选：`{picks}`',
    groupHorizontal: '第二组在分组级别禁用——每个子项从 context 读取 `disabled`。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      // === Checkbox 主表 ===
      cb__size: { description: '盒子与标签的尺寸预设。' },
      cb__checked: { description: '二选一——受控 vs 非受控。' },
      cb__indeterminate: {
        description: '视觉"半选"状态。通过 ref 写入 DOM，因为它不属于 React 受控属性。',
      },
      cb__disabled: { description: '标准 disabled。完全去掉摇晃。' },
      cb__value: { description: '当复选框位于 `CheckboxGroup` 内时必填。' },
      cb__onChange: { description: '回调接收下一个 boolean 状态以及原始事件。' },
      cb__children: { description: '渲染在盒子旁的标签。' },

      // === CheckboxGroup 表 ===
      grp__value: { description: '已选值，按子项 `value` 标识。' },
      grp__onChange: { description: '任一子项切换时携带新选择触发。' },
      grp__name: {
        description: '透传到每个嵌套 input。组内子项自身的 `name` 被忽略。',
      },
      grp__disabled: { description: '一次性禁用所有嵌套复选框。' },
      grp__direction: { description: '布局方向。' },
    },
  },
};
