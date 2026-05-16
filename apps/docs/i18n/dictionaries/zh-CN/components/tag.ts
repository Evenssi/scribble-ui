import type { ComponentDoc } from '../index';

export const tagZh: ComponentDoc = {
  title: 'Tag',
  lede:
    '小巧的手绘风标签，用于表示状态、分类或筛选 chip。默认 Tag 保持平静——只用一档摇晃，所以一排标签不会跟着乱舞。加上 `closable` 即可在内联渲染一个触发 `onClose` 的 ✕ 按钮。',
  sections: {
    colors: '颜色',
    sizes: '尺寸',
    iconsClosable: '图标与可关闭',
    controlled: '受控移除',
    code: '代码',
    api: 'API',
  },
  notes: {
    controlled: '点击任意标签上的 ✕ —— 它会从本地 state 中移除该项。',
    controlledEmpty: '所有标签都被移除——刷新页面可重置。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      color: {
        description: '背景色调。状态色取自系统配色；命名色取自便利贴配色。',
      },
      size: { description: '尺寸预设。' },
      icon: { description: '渲染在标签文字之前的内联图标。' },
      closable: { description: '在标签文字后渲染一个 ✕ 按钮。' },
      onClose: { description: '点击关闭按钮时触发。' },
      disabled: { description: '让标签变平静，并禁用所有点击处理。' },
      onClick: { description: '点击标签主体时触发（不包括关闭按钮）。' },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
