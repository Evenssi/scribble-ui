import type { ComponentDoc } from '../index';

export const drawerZh: ComponentDoc = {
  title: 'Drawer',
  lede:
    '一个锚定在视口某条边、自带焦点陷阱的侧滑面板，可从四条边任意之一滑入。复用 Modal 的滚动锁定、焦点陷阱、ESC 处理与蒙层点击规则——只在锚定方式与滑入动效上有所不同。默认按 ESC 或点击蒙层关闭；在确认流程中可禁用这两个行为。',
  sections: {
    placements: '位置',
    sizes: '尺寸',
    headerFooter: '带头部与底部',
    sticky: '禁用蒙层点击与 ESC',
    code: '代码',
    api: 'API',
  },
  notes: {
    placements:
      '`placement` 决定抽屉贴向哪条边。`"left"` 与 `"right"` 抽屉纵向铺满视口，`size` 控制宽度；`"top"` 与 `"bottom"` 抽屉横向铺满视口，`size` 则控制高度。',
    sizes:
      '每个轴向有三档预设。左 / 右抽屉：`sm` = 300px、`md` = 420px（默认）、`lg` = 560px 宽。上 / 下抽屉这些数字对应高度（200 / 320 / 460px）。',
    headerFooter:
      '字符串型 `header` 自动接通 `aria-labelledby`；`footer` 槽位通过与 Modal 一致的虚线分隔，将动作按钮右对齐。',
    sticky:
      '对于破坏性或重要动作，禁用蒙层点击与 ESC，强制用户做出明确选择。此时只有内置的 `✕` 与底部按钮能关闭抽屉。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      open: { description: '必填。抽屉是否渲染。' },
      onClose: { description: '必填。在 ESC、蒙层点击或内置关闭按钮时触发。' },
      placement: { description: '抽屉从哪条视口边滑入。' },
      size: { description: '左 / 右抽屉的宽度预设；上 / 下抽屉的高度预设。' },
      header: {
        description: '正文上方的槽位。`string` 会被渲染为带自动 `aria-labelledby` 的 `<h2>`。',
      },
      footer: { description: '正文下方的槽位——通常放右对齐的动作按钮。' },
      showCloseButton: { description: '渲染右上角的内置 `✕` 按钮。' },
      closeOnOverlayClick: { description: '点击蒙层时关闭。' },
      closeOnEscape: { description: '按 ESC 时关闭。' },
      ariaLabelledby: {
        description: '覆盖由字符串型 `header` 自动生成的 id。',
      },
      ariaDescribedby: { description: '可选 id，指向作为描述的正文元素。' },
      className: { description: '附加到面板上的额外 class。' },
    },
  },
};
