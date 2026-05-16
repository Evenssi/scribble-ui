import type { ComponentDoc } from '../index';

export const switchZh: ComponentDoc = {
  title: 'Switch',
  lede:
    '一枚手绘风的开关切换器。底层是原生 `<input type="checkbox" role="switch">`，因此屏幕阅读器能播报开 / 关语义、表单提交也照常工作——摇晃感纯粹是装饰。',
  sections: {
    basic: '基础',
    sizes: '尺寸',
    states: '状态',
    labelPosition: '标签位置',
    controlled: '受控 + 反馈',
    code: '代码',
    api: 'API',
  },
  notes: {
    labelPosition:
      '默认标签在开关右侧。使用 `labelPosition="left"` 镜像放置（方便那些每行开关都靠右的设置项表格）。',
    apiFooter:
      '向底层 `HTMLInputElement` 转发 ref，并接受所有原生 input 属性（`name`、`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      size: {
        description: '尺寸预设。影响轨道、滑块与标签字体。',
      },
      checked: {
        description: '受控选中状态。需与 `onChange` 配对。',
      },
      defaultChecked: {
        description: '非受控初始状态。',
      },
      onChange: {
        description: '接收下一个布尔选中状态以及原生事件。',
      },
      disabled: {
        description: '标准 HTML disabled。完全去掉摇晃，并设置 `aria-disabled`。',
      },
      label: {
        description: '渲染在开关旁的标签。点击标签也会切换开关（原生 `<label>` 行为）。',
      },
      helperText: {
        description: '渲染在开关下方的一行提示。当 `error` 为 true 时使用 danger 色。',
      },
      error: {
        description: '将轨道渲染为 danger 色，并把 helper 行染红。设置 `aria-invalid`。',
      },
      labelPosition: {
        description: '标签相对开关的视觉位置。',
      },
      className: {
        description: '附加在外层 `<label>` 容器上的额外 class。',
      },
    },
  },
};
