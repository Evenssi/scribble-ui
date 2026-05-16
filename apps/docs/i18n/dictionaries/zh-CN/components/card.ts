import type { ComponentDoc } from '../index';

export const cardZh: ComponentDoc = {
  title: 'Card',
  lede:
    '一块手绘风表面，用于聚合相关内容——它是小型布局原语，不是按钮。两种风味（普通纸张或便利贴色调）、三种尺寸，以及一个可选的 `interactive` 模式，沿用与 `Button` 一致的四段摇晃。',
  sections: {
    variants: '变体',
    sizes: '尺寸',
    interactive: '可交互',
    composition: '组合',
    code: '代码',
    api: 'API',
  },
  notes: {
    variants:
      '一张卡承载标题、正文以及附加动作或元信息——并非仅一个标签。下面示例展示完整表面，方便在真实尺寸下感受摇晃。',
    sizes:
      '内边距、最小宽度、字号 *和* 阴影厚度都随尺寸阶梯递进——更大的卡片质感更"厚"，像真实纸张。',
    interactive:
      '当 `interactive` 开启时，整张卡片表现得像一个按钮：可聚焦，回车 / 空格触发 `onClick`，并启用四段滤镜（calm → hover → active → disabled）。',
    interactiveActivity:
      '上次选择：`{picked}`。试试键盘：Tab 切到卡片，再按回车或空格。',
    composition:
      'Card 是容器——价值在于你把 Tag、元信息和几颗按钮叠进去时才显现出来。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      variant: {
        description: '视觉变体。`note` 使用便利贴色调。',
      },
      noteColor: {
        description: '便利贴色相。仅在 `variant === "note"` 时有意义。',
      },
      size: {
        description: '尺寸预设。影响内边距、最小宽度与阴影厚度。',
      },
      header: {
        description: '渲染在正文上方的槽位，由虚线分隔。',
      },
      footer: {
        description: '渲染在正文下方的槽位，由虚线分隔。',
      },
      interactive: {
        description: '让卡片可聚焦、可点击；启用四段滤镜与虚线焦点环。',
      },
      disabled: {
        description: '仅在 `interactive` 时有意义。让卡片"calm"并屏蔽激活。',
      },
      onClick: {
        description: '点击回调。`disabled` 时被屏蔽。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
