import type { ComponentDoc } from '../index';

export const paginationZh: ComponentDoc = {
  title: 'Pagination',
  lede:
    '经典的「上一页 / 页码 / 下一页」结构，每个按钮都被画成一张小便利贴。数据驱动——可传 `total` + `pageSize`，也可直接传 `totalPages`。支持受控与非受控两种用法，每个开关都有合理默认值。',
  sections: {
    basic: '基础',
    controlled: '受控',
    largeLists: '大数据量与省略号',
    customWindow: '自定义窗口宽度',
    firstLast: '首页 / 末页跳转按钮',
    simple: '极简模式',
    smallSize: '小尺寸',
    disabled: '禁用',
    localised: '本地化标签',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '非受控。每页 10 条、共 100 条，正好 10 页——整段序列无需省略号。',
    controlled:
      '通过 `current` + `onChange` 从外部驱动当前页。下方按钮无论分页器在哪一页，都把它重置为第 1 页。',
    largeLists:
      '`total=987, pageSize=20` —— 即 50 页。序列被折叠为「首部边界 · 当前窗口 · 尾部边界」，间隔大于 1 时填入「…」。',
    customWindow:
      '`boundaryCount=2` 把两端各两页钉住；`siblingCount=2` 加宽当前页周围的滑动窗口。当你宁愿占横向空间也不想让用户读省略号时很有用。',
    firstLast: '开启 `showFirstLast` 即可加上 « 与 » 一键跳到两端。默认关闭——多数列表不需要在页码之上再叠 4 个导航按钮。',
    simple: '`simple` 把整个组件折叠为「上一页 / 下一页 + 当前 / 总数」读数。适合移动端，或塞在密集表格工具栏里的分页器。',
    smallSize: '`size="small"` —— 28×28 方块代替 36×36。适合表格与紧凑列表的页脚。',
    disabled: '传入 `disabled` 让整组失活——每个按钮上报 `aria-disabled`，摇晃也被去掉，让"冷静"状态毫无歧义。',
    localised:
      '所有屏幕阅读器字符串都可通过 `labels` 覆盖。页码按钮上的数字保持数字；只有 *aria-label*（以及 prev / next / first / last 标签）会被替换。',
    apiFooter1:
      '组件会把 ref 透传到底层 `HTMLElement`（即 `<nav>`），并接收所有原生 HTML 属性（`id`、`aria-*`、`data-*` …）。',
    apiFooter2:
      '同时还导出了纯函数 `getPageItems(current, totalPages, boundaryCount, siblingCount)`，方便复用折叠逻辑（例如自行渲染一组页码 chip）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      current: { description: '受控的活动页（从 1 起）。' },
      defaultCurrent: { description: '非受控时的初始页。' },
      total: { description: '条目总数。与 `pageSize` 配合推导总页数。' },
      pageSize: { description: '每页条数。' },
      totalPages: { description: '显式的总页数。设置后覆盖 `total` / `pageSize`。' },
      onChange: { description: '当前页变化时触发。' },
      boundaryCount: { description: '两端各保留多少页常驻。' },
      siblingCount: { description: '当前页两侧各渲染多少页。' },
      showFirstLast: { description: '是否渲染 « 与 » 用于跳到首页 / 末页。' },
      showPrevNext: { description: '是否渲染上一页 / 下一页按钮。' },
      simple: { description: '折叠为「上一页 / 下一页 + 当前 / 总数」读数。' },
      size: { description: '尺寸预设——28px 或 36px 方块。' },
      disabled: { description: '让整组失活。' },
      ariaLabel: { description: '外层 `<nav>` 的 `aria-label` 值。' },
      labels: {
        description:
          '覆盖所有屏幕阅读器字符串（`previous`、`next`、`first`、`last`，以及 `page(n)` 生成器）。',
      },
      className: { description: '附加在外层 `<nav>` 上的额外 class。' },
    },
  },
};
