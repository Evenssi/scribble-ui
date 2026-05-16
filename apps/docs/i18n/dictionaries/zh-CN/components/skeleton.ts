import type { ComponentDoc } from '../index';

export const skeletonZh: ComponentDoc = {
  title: 'Skeleton',
  lede:
    '一个在真实内容加载时显示的"冷静"占位块。Skeleton **不会**摇晃——一组占位必须读起来耐心，而非抖动。根据周围画面的繁忙程度，在 `pulse`、`wave`、`none` 之间挑一个。',
  sections: {
    textSingle: '文本 · 单行',
    textMulti: '文本 · 多行',
    rect: '矩形',
    circle: '圆形',
    animation: '动画',
    composite: '组合 · 卡片',
    code: '代码',
    api: 'API',
  },
  notes: {
    textMulti:
      '当 `lines` 大于 1 时，最后一行会缩到 60%，读起来像真实段落的末尾——除非显式传 `width`。',
    animation:
      '三种动画模式。`pulse` 是默认值，适合短时加载；`wave` 在大块上更自然；`none` 是非常稠密布局下的安全回退（用户偏好减少动效时也会自动强制为 none）。',
    composite:
      'Skeleton 可以组合。这里一个圆形头像、两行文本与一块矩形正文一起，模拟一张内容卡片。',
    pulse: '`pulse`',
    wave: '`wave`',
    none: '`none`',
    apiFooter:
      '根元素是带 `role="status"`、`aria-busy="true"` 与 `aria-live="polite"` 的 `<span>`，让屏幕阅读器朗读加载区域而不至于"刷屏"。ref 会透传到底层元素。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      variant: {
        description:
          '形状预设。`circle` 总是以 `border-radius: 50%` 渲染；想要正圆请把 `width` 与 `height` 设为相等。',
      },
      width: {
        description: '数字按像素处理；字符串原样透传（如 `\'60%\'`、`\'12rem\'`）。',
      },
      height: { description: '与 `width` 单位一致。' },
      lines: {
        description:
          '仅文本可用。大于 1 时渲染多行；最后一行会自动缩到 60%——除非显式传 `width`。',
      },
      radius: {
        description: '圆角覆盖。数字按像素处理。`circle` 忽略此项并保持 50%。',
      },
      animation: {
        description: '加载动画。用户偏好减少动效时强制为 `\'none\'`。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
