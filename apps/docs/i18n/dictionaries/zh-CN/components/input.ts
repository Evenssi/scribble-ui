import type { ComponentDoc } from '../index';

export const inputZh: ComponentDoc = {
  title: 'Input',
  lede:
    '一个手绘风的文本输入框。可见的边框落在外层 wrapper 上，使前 / 后缀槽位与文本同处一条抖动轮廓内。聚焦字段时抖动幅度上扬。',
  sections: {
    sizes: '尺寸',
    states: '状态',
    slots: '前 / 后缀',
    controlled: '受控与非受控',
    code: '代码',
    api: 'Props',
  },
  notes: {
    controlledLive: '当前值：',
    controlledSubmitted: '上次提交：',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      size: { description: '视觉尺寸——不映射到原生 `size` 属性。' },
      error: { description: '渲染为危险色并设置 `aria-invalid`。' },
      helperText: {
        description:
          '渲染在 input 下方的文本。`error` 时改用危险色。',
      },
      prefix: { description: '渲染在 input 之前的槽位，处于 wrapper 边框之内。' },
      suffix: {
        description:
          '渲染在 input 之后的槽位。同时传 `clearable` 时优先使用 `suffix`。',
      },
      clearable: {
        description:
          '当 input 有值时显示 ✕ 清除按钮。设置了 `suffix` 时被隐藏。',
      },
      valueAndDefaultValue: { description: '二选一——受控 vs 非受控。' },
      onChange: {
        description: '原生 input 的 change 处理器。点击清除按钮也会触发。',
      },
      disabledAndReadOnly: {
        description: '与原生语义一致。`disabled` 时整体抖动会被关掉。',
      },
      wrapperClassName: { description: '在外层 wrapper 上追加 class 用于布局覆盖。' },
    },
  },
};
