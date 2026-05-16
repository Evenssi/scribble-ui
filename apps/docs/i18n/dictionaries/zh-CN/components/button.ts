import type { ComponentDoc } from '../index';

/**
 * Button 组件页的中文展示文案。
 *
 * 翻译规则：
 *   - 不翻译 demo 内可见 label（如 "Default · md"、"New note"）
 *   - 不翻译 API Type 列的 TS 字面量（如 `'primary' | 'secondary'`）
 *   - 不翻译代码示例 <pre className="doc-code"> 内的源码
 */
export const buttonZh: ComponentDoc = {
  title: 'Button',
  lede:
    '一颗手绘风的按钮。悬停时摇晃感升级，按下时达到峰值——所有视觉都由 token 与共享 SVG 滤镜驱动，无需额外样式。',
  sections: {
    variantsAndSizes: '变体与尺寸',
    colors: '颜色',
    states: '状态',
    withIcons: '带图标',
    blockAndInteractive: '块级与交互式加载',
    code: '代码',
    api: 'API',
  },
  notes: {
    colors:
      '状态变体复用了与 Tag、状态表面相同的色板，所以一个危险动作不需要任何额外样式就能"危险得很明显"。',
    blockAndInteractive:
      '点击按钮——它会进入 1.5 秒的加载态，期间忽略额外点击。',
    apiFooter:
      '该组件同时把 ref 透传到底层 `HTMLButtonElement`，并接受所有原生 button 属性（`type`、`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: {
      name: '名称',
      type: '类型',
      default: '默认值',
      description: '说明',
    },
    rows: {
      variant: {
        description:
          '视觉变体。`primary` 使用品牌绿；四个状态变体复用统一状态色板，让按钮无需额外样式即可表达语义。',
      },
      size: {
        description: '尺寸预设。md 适合大多数行动召唤场景。',
      },
      loading: {
        description:
          '在图标位置展示一个 spinner 并屏蔽点击，同时设置 `aria-busy="true"`。',
      },
      icon: {
        description: '紧贴文字的内联图标。加载态会被 spinner 替换。',
      },
      iconPosition: {
        description: '图标相对于文字的位置。',
      },
      block: {
        description: '撑满父容器宽度。',
      },
      disabled: {
        description: '标准 HTML disabled 属性，同时设置 `aria-disabled`。',
      },
      onClick: {
        description: '点击回调。`loading` 为 true 时被屏蔽。',
      },
      className: {
        description: '附加在内置 class 之后的额外 class。',
      },
    },
  },
};
