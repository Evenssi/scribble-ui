import type { ComponentDoc } from '../index';

export const tooltipZh: ComponentDoc = {
  title: 'Tooltip',
  lede:
    '一枚悬浮的小气泡，用来描述触发元素。Portal 到 `document.body`，空间不够时自动翻转，默认带 hover + focus 触发——指针用户与键盘用户开箱即用。',
  sections: {
    basic: '基础',
    placement: '位置',
    triggers: '触发方式',
    delay: '延迟',
    controlled: '受控',
    disabledTrigger: '禁用态触发',
    longContent: '长内容',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic: '包裹任意可聚焦元素。悬停或聚焦触发器即可看见气泡；按 `Esc` 关闭。',
    placement: '四种位置：`top`（默认）、`bottom`、`left`、`right`。当超出视口时气泡会自动翻转到对侧。',
    triggers:
      '默认 `["hover", "focus"]`。`"click"` 是开关式触发（点击打开、再点关闭、Esc 关闭）；`"manual"` 关闭所有内置触发——配合 `open` 与 `onOpenChange` 实现完全受控。',
    delay:
      '`openDelay` 默认 100ms——足够短让有意悬停感觉即时，又足够长避免鼠标路过时闪烁。`closeDelay` 默认 0；如果希望用户能短暂飘离触发器再回来不丢气泡，可以调高它。',
    controlled:
      '传入 `open` + `onOpenChange` 用自己的 state 驱动 tooltip。适合教程、引导或任何需要程序化强制提示的场景。',
    controlledState: '当前状态：',
    disabledTrigger:
      '原生 disabled 按钮会吞掉指针事件，所以 tooltip 直接挂到它上面无法打开。设置 `wrapDisabledTrigger` 让 tooltip 用一个 `span` 包裹触发器，由它代为捕获事件。',
    longContent: '气泡软上限 `max-width: 280px` 并允许换行。Tooltip 文案要短——段落级内容请用 Modal 或 Card。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      content: {
        description: '必填。气泡正文。falsy 值（`null` / `undefined` / `false`）会禁用 tooltip 但不卸载触发器。',
      },
      children: {
        description: '必填。一个 React 元素，会接收注入的 ref、事件处理器与 `aria-describedby`。',
      },
      placement: { description: '首选侧。空间不足时自动翻转到对侧。' },
      trigger: {
        description: '哪些交互打开 tooltip。`"manual"` 关闭全部内置触发——配合 `open` 实现完全受控。',
      },
      openDelay: { description: '打开前等待的毫秒数（设为 0 即时打开）。' },
      closeDelay: { description: '关闭前等待的毫秒数（设为 >0 让气泡更"黏"）。' },
      open: { description: '受控的打开状态。需与 `onOpenChange` 配对。' },
      onOpenChange: { description: '每次打开 / 关闭尝试都会触发（无论受控与否）。' },
      defaultOpen: { description: '非受控模式下的初始状态。' },
      wrapDisabledTrigger: {
        description: '用一个 `span` 包裹触发器，让事件即使在内层元素 `disabled` 时也能触发。',
      },
      offset: { description: '触发器边缘与气泡之间的像素距离。' },
      className: { description: '附加在气泡上的额外 class。' },
    },
  },
};
