import type { ComponentDoc } from '../index';

export const dividerZh: ComponentDoc = {
  title: 'Divider',
  lede:
    '一根手绘风分隔线。挑一种笔触（实线、虚线、波浪），微调粗细，视情况在中间放一个标签来分割段落——不必动用额外的标题字号。',
  sections: {
    basic: '基础',
    variants: '变体',
    thickness: '粗细',
    withLabel: '带标签',
    vertical: '纵向',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '一根裸露的横向分隔线——默认实线 + 默认粗细。',
    variants:
      '实线和虚线基于 CSS 边框 + 共享 SVG 滤镜的抖动；波浪线由可重复的 SVG 绘制，曲线始终保持锐利。',
    thickness:
      '三档预设映射到笔触 token（`thin` / `default` / `bold`）。波浪线变体改为调整 SVG path 的 stroke-width 而非边框。',
    withLabel: '通过 `children` 在中间放一个标签。用 `labelAlign` 把它推到左端或右端。',
    vertical: '将纵向分隔线放进 flex 行内。借助 `align-self: stretch` 拉伸到容器交叉轴尺寸。',
    apiFooter:
      '该组件渲染一个 `<div role="separator">` 并设置 `aria-orientation`，将 ref 透传到底层 `HTMLDivElement`，并接受所有原生 div 属性（`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      orientation: {
        description:
          '布局方向。纵向分隔线在 flex 行内拉伸交叉轴；横向分隔线占满整宽。',
      },
      variant: {
        description:
          '笔触样式。solid / dashed 使用 CSS 边框 + 手绘抖动；wavy 由可重复的 SVG 绘制。',
      },
      thickness: {
        description: '笔触粗细预设，映射到 `--su-stroke-*` token。',
      },
      children: {
        description:
          '可选内联标签。把横向分隔线分割为标签两侧两段。当 `orientation` 为 `"vertical"` 时被忽略。',
      },
      labelAlign: { description: '标签在分隔线上的位置。' },
      className: { description: '在内置 class 之后追加的额外 class。' },
    },
  },
};
