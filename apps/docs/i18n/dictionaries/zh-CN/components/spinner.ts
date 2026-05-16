import type { ComponentDoc } from '../index';

export const spinnerZh: ComponentDoc = {
  title: 'Spinner',
  lede:
    '一枚小巧的加载指示器，三种手绘风味——`ring`、`dots` 与 `pencil`。Spinner 通过 `currentColor` 继承色彩，因此放进 Button、Tag 或任何带颜色的容器都能自然融合，无需额外配线。',
  sections: {
    sizes: '尺寸',
    variants: '变体',
    color: '颜色',
    label: '可见标签',
    inButton: '嵌入按钮',
    code: '代码',
    api: 'API',
  },
  notes: {
    sizes: '三档固定像素：`sm` 16px、`md` 24px、`lg` 36px。',
    color:
      'Spinner 使用 `currentColor`，最简单的主题方式就是给外层元素设置 `color`；也可以通过 `color` prop 直接指定。',
    label:
      '屏幕阅读器可见的标签始终会渲染（默认 `"Loading"`）。传入 `showLabel` 让它也在指示器旁可见。',
    inButton: '因为 Spinner 继承色彩，所以丢进原生 button（或任何组件）都能直接用。',
    apiFooter:
      '组件渲染一个带 `role="status"` 的 `<span>` 并向其转发 ref。所有原生 span 属性都被接受。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      variant: {
        description: '视觉风味。`ring` 旋转一段 1/3 弧、`dots` 让三颗圆点脉冲、`pencil` 反复绘制一段短涂鸦。',
      },
      size: { description: '固定像素尺寸：16 / 24 / 36。' },
      color: {
        description: '可选 CSS 颜色覆盖。省略时 Spinner 从环绕文本继承颜色。',
      },
      label: {
        description: '屏幕阅读器可见的加载文案。始终渲染（默认收纳在 SR-only 的 span 中，除非 `showLabel` 为 true）。',
      },
      showLabel: {
        description: '把 `label` 渲染为指示器旁可见的文字。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
