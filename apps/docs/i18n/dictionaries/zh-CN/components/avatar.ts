import type { ComponentDoc } from '../index';

export const avatarZh: ComponentDoc = {
  title: 'Avatar',
  lede:
    '一颗小巧的手绘头像贴片。当 `src` 加载成功时显示图片，失败时优雅地回退到自定义节点、推导首字母或通用占位符。背景色取自与 Tag 同款的便利贴色板。',
  sections: {
    sizes: '尺寸',
    shapes: '形状',
    colors: '颜色',
    imageWithFallback: '图片加载失败优雅回退',
    customFallback: '自定义回退节点',
    autoDerived: '自动推导首字母与色彩',
    code: '代码',
    api: 'API',
  },
  notes: {
    sizes:
      'xs · 24 · sm · 32 · md · 40 · lg · 56 · xl · 72（像素）。字号随贴片尺寸缩放，确保两字母首字母始终能放下。',
    shapes:
      '方形头像使用非对称 `--su-radius-card`，保留手绘的偏轴感。',
    colors:
      '通过 `color` 固定色相，或不传，让 Avatar 从 `name` 推导一个稳定颜色。',
    imageWithFallback:
      '第一个头像加载真实图片。后两个指向永远无法解析的域名——Avatar 捕获 `onError` 后回退到 `name` 推导出的首字母，布局保持稳定。',
    customFallback:
      '把任意 `ReactNode` 传给 `fallback` 来定制图标式头像（机器人、匿名用户等）。第三个贴片演示了完全不传 src 时的内置占位符。',
    autoDerived:
      '只传 `name` 时，Avatar 取前两个单词的首字母，并通过稳定的 `charCodeAt` 哈希挑选便利贴色——同一个名字始终渲染同一个色相。',
    apiFooter:
      '把 ref 透传到底层 `HTMLSpanElement`，并接受所有原生 span 属性（`aria-*`、`data-*`、`onClick` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      src: {
        description: '图片 URL。`onError` 时自动切换到 fallback 链。',
      },
      alt: {
        description:
          '可访问标签，并作为推导首字母的备选源。包装节点持有该标签，确保屏幕阅读器只朗读一次。',
      },
      initials: {
        description: '显式指定的首字母。最多 2 个字符，自动转大写。',
      },
      name: {
        description: '推导首字母与稳定色相的源。同名永远同色。',
      },
      fallback: {
        description:
          '自定义回退节点（图标等）。在图片缺失或失败时优先于首字母。',
      },
      size: { description: '贴片尺寸：24 / 32 / 40 / 56 / 72 px。' },
      shape: { description: '`square` 使用非对称的 `--su-radius-card`。' },
      color: {
        description: '便利贴背景色相。不传时从 `name` 通过稳定哈希推导。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
