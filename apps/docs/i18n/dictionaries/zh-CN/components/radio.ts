import type { ComponentDoc } from '../index';

/** Radio 有两张 API 表：Radio 与 RadioGroup。 */
export type RadioDoc = ComponentDoc & {
  apiHeadings: {
    radio: string;
    radioGroup: string;
  };
  apiRadioGroup: ComponentDoc['api'];
};

export const radioZh: RadioDoc = {
  title: 'Radio',
  lede:
    '一个底层带真正原生 `<input type="radio">` 的手绘风单选按钮。把若干个放进 `RadioGroup` 即可共享 `name`、布局与选中状态——开箱即用键盘方向键导航。',
  sections: {
    sizes: '尺寸',
    states: '状态',
    groupVertical: '分组 · 纵向（受控）',
    groupHorizontal: '分组 · 横向 + 整组禁用',
    code: '代码',
    api: 'API',
  },
  notes: {
    selected: '已选：',
    groupHorizontal:
      '第二组在分组级别被禁用——每个子项通过 context 读取 `disabled`。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      size: { description: '同时控制盒子与标签的尺寸预设。' },
      value: { description: '必填。在分组 / 原生 input 中标识该选项。' },
      name: {
        description:
          '独立使用时必填。在 `RadioGroup` 内会以分组的 `name` 为准。',
      },
      checkedDefaultChecked: {
        description: '独立模式下的受控 / 非受控值。在分组内会被忽略。',
      },
      disabled: { description: '原生 disabled。完全停用摇晃。' },
      onChange: { description: '收到下一个布尔状态以及原始事件。' },
      children: { description: '渲染在选点旁边的标签。' },
    },
  },
  apiHeadings: {
    radio: 'Radio',
    radioGroup: 'RadioGroup',
  },
  apiRadioGroup: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      name: {
        description:
          '必填。会被透传到每个嵌套 input——同时也免费提供键盘方向键导航。',
      },
      valueDefaultValue: { description: '已选值。两者择一。' },
      onChange: { description: '当某个子项被选中时以新值触发。' },
      disabled: { description: '一次性禁用所有嵌套 radio。' },
      direction: { description: '布局方向。' },
    },
  },
};
