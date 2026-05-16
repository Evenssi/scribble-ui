import type { ComponentDoc } from '../index';

/**
 * Breadcrumb 页有两张 API 表（Breadcrumb + BreadcrumbItemData / Breadcrumb.Item）。
 * 我们用 `api.headers` 共用表头；用 `sections.apiBreadcrumb` 与 `sections.apiItem`
 * 作为两张子表的标题；rows 用前缀区分（`b__*` 主表，`item__*` 项表）。
 */
export const breadcrumbZh: ComponentDoc = {
  title: 'Breadcrumb',
  lede:
    '一条手绘风的位置路径，告诉用户身在何处。每一段都是一颗悬停时上浮的小便利贴；最后一段去掉卡片化样式，作为强调文字呈现——它是路标，不是按钮。同时支持数据驱动的 `items` 与组合式 children。',
  sections: {
    basic: '基础用法',
    composition: '组合式 children',
    withIcons: '带图标',
    customSeparators: '自定义分隔符',
    onClickHandler: 'onClick 回调',
    collapsed: '折叠',
    disabled: '禁用中段',
    customRender: '自定义渲染（路由适配）',
    code: '代码',
    api: 'API',
    apiBreadcrumb: 'Breadcrumb',
    apiItem: 'BreadcrumbItemData / Breadcrumb.Item',
  },
  notes: {
    basic:
      '通过 `items` 驱动的三级路径。最后一项自动渲染为非交互文本并标记 `aria-current="page"`。',
    composition:
      '更喜欢 JSX 组合？使用 `<Breadcrumb.Item>`（或 `<BreadcrumbItem>`）——两者都走与 `items` 相同的渲染管线。',
    withIcons:
      '把任意内联节点放入 `icon` 槽。图标渲染清晰——它们不继承 crumb 的摇晃滤镜。',
    customSeparators:
      '默认分隔符是单个 `›` 字符。把任意 ReactNode 传给 `separator` 即可覆盖。',
    onClickHandler:
      '传 `onClick` 接管导航。未提供 `href` 时，默认 `#` 跳转通过 `preventDefault` 屏蔽。',
    collapsed:
      '设置 `maxItems` 把中段 crumb 折叠为 `…`。用 `itemsBeforeCollapse` / `itemsAfterCollapse` 调整两端各保留几个（默认 1 / 1）。',
    disabled:
      '`disabled` 项渲染为纯文本并忽略点击——当某中段被门控（权限、特性开关）但仍属路径一部分时很有用。',
    customRender:
      '通过 `render` 把内层内容交给你的路由原语。Breadcrumb 保留便利贴外观与悬停滤镜；适配器接管导航。下方示例用 `<span>` 模拟该模式——真实代码中替换为 Next.js 的 `<Link>` 或 react-router 的 `<NavLink>`。',
    apiFooter:
      '`<Breadcrumb>` 同时把 ref 透传到底层 `HTMLElement`（即 `<nav>`），并接受相应的原生属性（`id`、`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      // === Breadcrumb 表 ===
      b__items: {
        description:
          '数据驱动的条目。与 `children` 互斥；同时提供时 `items` 优先。',
      },
      b__children: {
        description:
          '组合式 children。必须是 `<Breadcrumb.Item>` 元素；其他节点会被跳过并触发开发警告。',
      },
      b__separator: {
        description:
          '在每对 crumb 之间渲染的节点。始终标记 `aria-hidden`，屏幕阅读器不会朗读。',
      },
      b__maxItems: {
        description: 'crumb 总数超过此值时折叠。`0` 表示不折叠。',
      },
      b__itemsBeforeCollapse: {
        description: '折叠时头部保留的 crumb 数。',
      },
      b__itemsAfterCollapse: {
        description: '折叠时尾部保留的 crumb 数。',
      },
      b__ariaLabel: {
        description: '包裹的 `<nav>` 上的可访问标签。',
      },
      b__className: { description: '外层 `<nav>` 上的额外 class。' },

      // === BreadcrumbItemData / Breadcrumb.Item 表 ===
      item__title: {
        description: 'crumb 标签。`<Breadcrumb.Item>` 中请改用 `children`。',
      },
      item__href: {
        description:
          '导航目标。纯文本 crumb 留空。最后一段的 `href` 始终被忽略。',
      },
      item__onClick: {
        description:
          '点击回调。同时存在 `href` 时回调优先，默认导航被屏蔽。',
      },
      item__render: {
        description:
          '路由适配器逃生口（Next.js `<Link>` 等）。接收默认内层节点，必须返回 ReactNode。',
      },
      item__icon: { description: '位于标签前方的装饰性图标。' },
      item__disabled: {
        description: '强制非交互渲染。设置 `aria-disabled="true"`。',
      },
      item__key: {
        description:
          '`items` API 的可选 React key 覆盖（否则使用索引）。',
      },
    },
  },
};
