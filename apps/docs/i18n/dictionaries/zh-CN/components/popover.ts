import type { ComponentDoc } from '../index';

export const popoverZh: ComponentDoc = {
  title: 'Popover',
  lede:
    '锚定在触发器上的可交互浮层。它是 `Tooltip` 的姊妹，但为富内容而生：表单、动作行、链接——任何用户需要点击或键入的东西。会被 portal 到 `document.body`、自动翻转避免溢出，并在外部点击 / 按下 `Esc` 时关闭。',
  sections: {
    basic: '基础',
    titleFooter: '标题与底部',
    triggers: '触发方式',
    placement: '位置、箭头与禁用触发器',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '默认触发为 `\'click\'`。点击按钮打开浮层；点击外部或按 `Esc` 关闭。',
    titleFooter:
      '传入 `title` 与 `footer` 即可渲染一个微型对话框的三段经典结构。标题会自动通过 `aria-labelledby` 与浮层关联，便于屏幕阅读器朗读。',
    confirms: '已确认次数：',
    triggers:
      '默认 `\'click\'` —— 比 Tooltip 的 hover 默认更"重"，因为浮层内容是可交互的。`\'hover\'` 模式包含一段宽限期（`closeDelay`，默认 `150ms`），让用户在触发器与浮层之间漂移时不会立刻被关掉。`\'manual\'` 配合 `open` + `onOpenChange` 实现完全受控。',
    controlledState: '受控状态：',
    placement:
      '4 种位置：`top`、`bottom`（默认）、`left`、`right`。空间不足时自动翻转。`showArrow={false}` 可去掉箭头，呈现更纯净的卡片观感。对带原生 `disabled` 的触发器，设置 `wrapDisabledTrigger` 让事件能在外层 `span` 上触发。',
    apiFooter:
      '浮层根节点带 `role="dialog"` 与 `aria-modal={false}` —— 它 *不是* 焦点陷阱。Tab 在内容中自然流转；当焦点离开非触发器元素时，浮层会关闭。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      content: {
        description:
          '必填。浮层的可交互正文。falsy 值（`null` / `undefined` / `false`）会让浮层失效但保留触发器挂载。',
      },
      title: {
        description: '可选标题。存在时浮层根节点会通过 `aria-labelledby` 与之关联。',
      },
      footer: { description: '可选底部槽位，通常放一行动作按钮。' },
      children: {
        description:
          '必填。单个 React 元素，会被注入 ref、事件处理器，以及 `aria-haspopup` / `aria-expanded` / `aria-controls`。',
      },
      trigger: {
        description: '哪些交互可以打开浮层。`\'manual\'` 关闭所有自动交互——配合 `open` 实现完全受控。',
      },
      placement: { description: '首选方位。空间不足时自动翻转到对面。' },
      offset: { description: '触发器边缘与浮层表面之间的像素间距。' },
      open: { description: '受控的打开状态。需配合 `onOpenChange`。' },
      defaultOpen: { description: '非受控模式下的初始状态。' },
      onOpenChange: { description: '每次打开 / 关闭尝试都会触发（无论受控与否）。' },
      closeOnEsc: { description: '按 Escape 时关闭。' },
      closeOnClickOutside: {
        description:
          '点击触发器与浮层外部时关闭。监听 `mousedown`，因此内部 click 处理器始终先执行。',
      },
      showArrow: { description: '是否渲染指向触发器的手绘箭头。' },
      openDelay: {
        description: 'hover 模式打开前的延时（毫秒）。click 触发忽略此项以保证响应灵敏。',
      },
      closeDelay: {
        description: 'hover 模式关闭前的延时——也就是让用户漂移到浮层表面的"宽限期"。',
      },
      wrapDisabledTrigger: {
        description: '把触发器包在 `span` 里，即便内层元素 `disabled` 事件也能触发。',
      },
      className: { description: '附加到浮层根节点的额外 class。' },
    },
  },
};
