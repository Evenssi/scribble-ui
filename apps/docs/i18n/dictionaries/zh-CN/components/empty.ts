import type { ComponentDoc } from '../index';

export const emptyZh: ComponentDoc = {
  title: 'Empty',
  lede:
    '一个手绘风的占位组件，适用于空列表、搜索无果与首次使用场景。内置三种插画，随排版尺寸自适应缩放，可选地放进便利贴外壳。',
  sections: {
    basic: '基础',
    presets: '预设',
    sizes: '尺寸',
    actionAndBordered: '带动作与外壳',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '开箱即用。Empty 渲染默认插画与备用标题 `"No data"`，确保即使不传 props 也能被屏幕阅读器朗读。',
    presets:
      '三种内置插画覆盖常见空状态——空便签、搜索无果、空数据夹。传入自定义 `image` 节点可覆盖。',
    sizes:
      '三档尺寸预设同时缩放插画与排版。`sm` 适合放进 popover 或表格单元格内，`md` 适合标准面板，`lg` 适合整页占位。',
    actionAndBordered:
      '`action` 槽位放置 0–2 个恢复动作，`bordered` 开关把整个 Empty 包裹进便利贴外壳。',
    apiFooter:
      '根元素是一个 `<div role="status" aria-live="polite">`，所以辅助技术会在其替换原本有数据的区域时朗读空态。插画标记为 `aria-hidden`。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      preset: { description: '内置插画。当 `image` 已提供时被忽略。' },
      image: {
        description: '自定义插画。任意 ReactNode 都可——SVG、`<img>`、emoji。覆盖 `preset`。',
      },
      title: {
        description:
          '主标题。仅当 `title` 与 `description` 都缺省时回退为 `"No data"`，确保组件保持可朗读。',
      },
      description: { description: '渲染在标题下方的补充文案。' },
      action: { description: '恢复动作槽位（通常 0–2 个按钮或链接）。' },
      size: { description: '整体视觉尺寸——影响插画高度与排版。' },
      bordered: {
        description:
          '将内容包裹进便利贴外壳：纸张背景、手绘描边、硬偏移阴影与轻微倾斜。',
      },
      className: { description: '在内置 class 之后追加的额外 class。' },
    },
  },
};
