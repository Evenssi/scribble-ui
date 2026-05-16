import type { ComponentDoc } from '../index';

export const alertZh: ComponentDoc = {
  title: 'Alert',
  lede:
    '一条静态、内联的反馈提示条，安放在你放置它的位置。当一条消息需要持续展示时——例如"你的方案 3 天后到期"、"该表单有 2 个错误"——请使用 Alert。如果是系统驱动、自动消失的临时弹窗，请改用 `Toast`。',
  sections: {
    variants: '变体',
    titleOnly: '仅标题',
    descriptionOnly: '仅描述',
    customNoIcon: '自定义图标 / 无图标',
    closableUncontrolled: '可关闭（非受控）',
    closableControlled: '可关闭（受控）',
    banner: 'Banner',
    code: '代码',
    api: 'API',
  },
  notes: {
    variants:
      '四种语义变体，四个手绘字形。每个变体都通过组件局部自定义属性注入色彩（左侧色条 + 图标）和便利贴风格背景。',
    titleOnly: '省略描述，得到一条单行、一眼即明的 alert。',
    descriptionOnly:
      '不传 `title` 时，正文读起来像一条平静的备注——很适合放在表单字段附近作为内联上下文提示。',
    customNoIcon:
      '把内置字形换成你自己的，或传 `icon={false}` 完全去掉图标位——当 alert 旁边已有视觉强烈的内容时很有用。',
    closableUncontrolled:
      '加上 `closable` 即可在右上角显示 ✕ 按钮。默认 alert 自管可见性——点 ✕ 它会自动卸载。',
    closableControlled:
      '传 `visible` 接管 alert 的生命周期——当同一条消息需要在重试或路由切换后再次出现时尤其有用。',
    banner:
      '`banner` 会去掉圆角、硬投影和摇晃滤镜——alert 变成一条贴边的整宽提示条，可固定在页面或布局区域顶部。',
    apiFooter:
      '该组件把 ref 透传到底层 `HTMLDivElement`，并接受所有原生 div 属性（`id`、`aria-*`、`data-*` 等）。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      variant: {
        description:
          '视觉变体。决定强调色（左色条 + 图标）和便利贴风格背景。也决定 ARIA 角色：`warning | error` 渲染为 `role="alert"`，其余两个为 `role="status"`。',
      },
      title: { description: '加粗的标题，渲染在第一行。' },
      children: { description: '描述正文。同时存在 `title` 时两者纵向堆叠。' },
      icon: {
        description:
          '自定义前导图标。传 `false` 完全隐藏图标位。未设置时使用变体内置字形。',
      },
      closable: { description: '在右上角显示 ✕ 关闭按钮。' },
      visible: {
        description:
          '受控可见性。传入后组件不再自管关闭；传 `false` 隐藏 alert。',
      },
      onClose: { description: '关闭按钮被激活时触发。' },
      closeAriaLabel: { description: '关闭按钮的可访问标签。' },
      banner: {
        description: '整宽提示条模式——去掉圆角、阴影与摇晃滤镜。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
