import type { ComponentDoc } from '../index';

export const resultZh: ComponentDoc = {
  title: 'Result',
  lede:
    '一个用于动作或路由完成那一刻的整页反馈表面——成功、失败、警告，或者经典的 HTTP 错误页。比 `Empty` 更"重"：Result 以一个大号手绘状态图形开场，让结果不容错过。',
  sections: {
    basic: '基础（成功）',
    statusVariants: '状态变体',
    httpErrors: 'HTTP 错误页',
    extraContent: '动作槽位与补充内容',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '默认结构：状态图形、标题、副标题，以及一行带 1~2 个按钮的动作行。',
    statusVariants:
      '4 种语义结果，4 种手绘图形。每种变体通过组件作用域的自定义属性注入强调色，让图形与 HTTP 错误码框始终与状态保持一致。',
    httpErrors:
      '经典 404 / 403 / 500 屏把错误码本身画成虚线框上的手写撕页——读起来像一张页面笔记而非图形，正是错误路由该有的味道。',
    extraContent:
      '把更多内容作为 `children` 放进来——会显示在动作行下方的便利贴表面里。适合错误详情、"接下来该做什么"清单，或一段供支持团队复制的代码片段。',
    apiFooter:
      '组件还会把 ref 透传到底层 `HTMLDivElement`，并接收所有原生 div 属性（`id`、`aria-*`、`data-*` 等）。根节点带 `role="status"` 与 `aria-live="polite"`，让屏幕阅读器在不打断用户的前提下朗读结果。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      status: {
        description: '结果状态。决定内置图标，以及应用于图形、虚线框与状态感知子元素的强调色。',
      },
      icon: { description: '自定义图标。提供时替换当前 `status` 的内置 SVG。' },
      title: { description: '必填。主要的结果信息，渲染为标题。' },
      subTitle: { description: '可选的描述性副标题。' },
      extra: {
        description: '动作槽位——通常放 1~2 个 `<Button>`（主 + 次）。渲染为居中的一行。',
      },
      children: {
        description: '渲染在动作行下方便利贴表面的补充内容。仅在真值时渲染。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
