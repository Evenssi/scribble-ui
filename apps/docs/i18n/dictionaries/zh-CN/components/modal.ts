import type { ComponentDoc } from '../index';

export const modalZh: ComponentDoc = {
  title: 'Modal',
  lede:
    '一个居中、自带焦点陷阱的对话框，会 portal 到 `document.body`。默认按 ESC 与点击蒙层即可关闭，二者都可在确认流程中禁用。打开时第一个可聚焦元素自动获得焦点，关闭时焦点会被还原。',
  sections: {
    basic: '基础',
    sizes: '尺寸',
    confirm: '确认对话（sticky）',
    customHeader: '自定义 header（ReactNode）',
    formInside: '内嵌表单（焦点陷阱）',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '一个最简的 Modal：传入字符串型 `header`（自动作为对话框的 accessible name）、一些正文，再接通 `open` + `onClose`。',
    sizes:
      '三档宽度预设：`sm`（360px）、`md`（520px，默认）、`lg`（720px）。内边距与阴影厚度也随尺寸递进。',
    confirm:
      '对于破坏性或重要动作，禁用蒙层点击与 ESC，强制用户通过底部按钮做出明确选择。',
    customHeader:
      '字符串型 `header` 会自动接通 `aria-labelledby`。当你改用 `ReactNode` 时，自行提供 id，让屏幕阅读器仍能朗读名称。',
    formInside:
      '打开时第一个可聚焦元素自动获得焦点——本例中是 `Input`。Tab 在按钮间循环；Shift+Tab 反向循环。关闭时焦点回到触发器。',
    formInsideDraft: '当前草稿：',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      open: { description: '必填。对话框是否渲染。' },
      onClose: { description: '必填。在 ESC、蒙层点击或内置关闭按钮时触发。' },
      size: { description: '宽度预设。同时影响内边距与阴影厚度。' },
      header: {
        description: '正文上方的槽位。`string` 会被渲染为带自动 `aria-labelledby` 的 `<h2>`。',
      },
      footer: { description: '正文下方的槽位——通常放右对齐的动作按钮。' },
      showCloseButton: { description: '渲染右上角的内置 `✕` 按钮。' },
      closeOnOverlayClick: { description: '点击蒙层时关闭。' },
      closeOnEscape: { description: '按 ESC 时关闭。' },
      ariaLabelledby: { description: '覆盖由字符串型 `header` 自动生成的 id。' },
      ariaDescribedby: { description: '可选 id，指向作为描述的正文元素。' },
      className: { description: '附加到面板上的额外 class。' },
    },
  },
};
