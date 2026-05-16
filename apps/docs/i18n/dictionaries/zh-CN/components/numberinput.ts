import type { ComponentDoc } from '../index';

export const numberinputZh: ComponentDoc = {
  title: 'NumberInput',
  lede:
    '`Input` 的数字感知姊妹组件。沿用同一手绘风外壳与 prefix / suffix 槽位，再叠加类型化步进控制、键盘快捷键（↑/↓、Shift、Alt、Home、End）与值域钳制。底层使用 `type="text"` + `inputMode="decimal"`，规避原生 spinner UI 的不一致体验。',
  sections: {
    sizes: '尺寸',
    states: '状态',
    slots: '前 / 后缀',
    controlled: '受控与非受控',
    code: '代码',
    api: 'API',
  },
  notes: {
    apiFooter:
      '组件会把 ref 透传到底层 `HTMLInputElement`，并接收除上表外的所有原生 input 属性（如 `aria-label`、`id`、`autoFocus`）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: { description: '受控值。需配合 `onChange`。' },
      defaultValue: { description: '非受控用法的初始值。' },
      onChange: {
        description:
          '值落定时触发（输入合法数字、点击 ±、按方向键、失焦）。`undefined` 表示字段被清空。',
      },
      minMax: {
        description:
          '闭区间边界。用于钳制、± 按钮启用判断以及 `Home` / `End` 快捷键。',
      },
      step: {
        description:
          '± 按钮与方向键的步进值。可叠加 `Shift`（×10）或 `Alt`（×0.1）修饰键。',
      },
      precision: {
        description:
          '小数位数。失焦时按 `toFixed` 强制；输入过程中保留原样，让 `"1."` 之类的中间值正常工作。',
      },
      controls: { description: '是否渲染 ± 步进按钮。' },
      wheelStep: {
        description: '可选的鼠标滚轮步进。仅在输入框聚焦时生效，其它情况保留原生页面滚动。',
      },
      size: { description: '视觉尺寸——与 `Input` 对齐。' },
      error: { description: '应用 danger 颜色并设置 `aria-invalid`。' },
      helperText: {
        description: '渲染在输入框下方的文本。当 `error` 为真时使用 danger 颜色。',
      },
      prefix: { description: '渲染在输入框之前、外壳边框内侧的槽位。' },
      suffix: {
        description: '渲染在 ± 控制之后的槽位。常用于单位标签（`元`、`%` 等）。',
      },
      disabledReadOnly: {
        description:
          '原生语义。`disabled` 完全停用摇晃；`readOnly` 保留显示但禁用 ± 与键盘快捷键。',
      },
      name: {
        description:
          '设置后会渲染一个隐藏的 `<input type="hidden">` 镜像，让值参与原生 `<form>` 提交。',
      },
      placeholder: { description: '空值时显示的原生 placeholder。' },
      wrapperClassName: { description: '附加到外层 wrapper 的 class，用于布局覆盖。' },
      className: { description: '附加到原生 `<input>` 元素的 class。' },
    },
  },
};
