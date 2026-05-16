import type { ComponentDoc } from '../index';

export const textareaZh: ComponentDoc = {
  title: 'Textarea',
  lede:
    '多行文本输入框，与 Input 共享同一手绘风边框。支持受控 / 非受控模式、三档尺寸、错误态、内置字符计数器以及随内容自适应的高度。',
  sections: {
    basic: '基础',
    sizes: '尺寸',
    states: '状态',
    autoResize: '自适应高度',
    count: '字符计数',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '受控与非受控模式都可用。外层容器画出摇晃边框；右下角的原生句柄仍能让用户向下拖拽。',
    autoResize:
      '传入 `autoResize` 让它跟随内容生长。提供 `{ minRows, maxRows }` 来限制范围——超出 `maxRows` 后 textarea 会改为滚动而非生长。此模式下原生缩放句柄被隐藏。',
    count:
      '搭配 `showCount` + `maxLength`，计数器会在 80% 时变 warning、100% 时变 danger。试着输入超出限制——原生 `maxLength` 会截断输入，但计数器仍会跟踪真实状态。',
    apiFooter:
      '组件向底层 `HTMLTextAreaElement` 转发 ref 并接受所有原生 textarea 属性（`rows`、`name`、`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      size: { description: '视觉尺寸。不映射到任何原生属性。' },
      error: {
        description: '将外框渲染为 danger 色并把 `helperText` 染红，同时为底层 textarea 设置 `aria-invalid`。',
      },
      helperText: { description: '渲染在 textarea 下方的副行。' },
      autoResize: {
        description: '随内容生长。对象形式可限制范围；超过 `maxRows` 后 textarea 改为滚动。设置后会禁用原生 resize 句柄。',
      },
      showCount: {
        description: '在右下角渲染计数器。配合 `maxLength` 时会以 `current / max` 形式显示，并在 80% 转 warning、超 100% 转 danger。',
      },
      value: {
        description: '标准受控 / 非受控桥接。`value` 需与 `onChange` 配对。',
      },
      maxLength: {
        description: '原生最大长度。截断输入并喂给计数器的颜色阈值。',
      },
      disabled: {
        description: '标准 inert / 只读状态。disabled 会去掉摇晃并锁住缩放句柄。',
      },
      wrapperClassName: {
        description: '外层容器（绘制边框的元素）上的额外 class。',
      },
      className: { description: '底层 `<textarea>` 上的额外 class。' },
    },
  },
};
