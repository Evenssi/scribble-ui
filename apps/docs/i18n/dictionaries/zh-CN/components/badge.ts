import type { ComponentDoc } from '../index';

export const badgeZh: ComponentDoc = {
  title: 'Badge',
  lede:
    '一颗手绘风的小型计数、点状或文字徽标。可独立使用，也可包裹任意元素以附着在其角落——非常适合头像、按钮或图标上的未读数。',
  sections: {
    standalone: '独立使用',
    wrappingAvatar: '包裹头像',
    wrappingButton: '包裹按钮',
    colors: '颜色',
    placement: '位置',
    zeroAndControlled: '零值处理与受控计数',
    code: '代码',
    api: 'API',
  },
  notes: {
    standalone:
      '同时传多种内容时的优先级：`dot > count > content`。超过 `max` 的计数渲染为 `{max}+`。',
    placement:
      '徽标通过 `translate(±50%, ±50%)` 浮在所选角落，与锚点边线重叠半个自身大小。',
    zeroSplit:
      '左：`count=0` 隐藏徽标。右：`showZero` 保持其可见。',
    zeroControlled:
      '点击按钮——当 count 降到 `0` 时徽标消失（children 仍保留）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      count: {
        description: '数字徽标。`0` 时隐藏，除非设置 `showZero`。',
      },
      max: {
        description: '展示计数的上限。超过上限渲染为 `{max}+`。',
      },
      showZero: {
        description: '即使 `count === 0` 也渲染徽标。',
      },
      dot: {
        description:
          '渲染一个无文字的小实心点。优先级高于 `count` 和 `content`。',
      },
      content: {
        description:
          '自定义内容（如 `"NEW"`），仅当 `dot` 与 `count` 都缺席时显示。',
      },
      color: {
        description: '背景色。默认红色——经典通知样式。',
      },
      placement: {
        description: '徽标附着在所包裹元素的哪个角落。无 children 时忽略。',
      },
      children: {
        description:
          '传入时徽标浮在 `children` 的所选角落；否则独立内联渲染。',
      },
      className: { description: '附加在外层元素上的额外 class。' },
    },
  },
};
