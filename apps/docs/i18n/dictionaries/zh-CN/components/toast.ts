import type { ComponentDoc } from '../index';

export type ToastDoc = ComponentDoc & {
  apiHeadings: { methods: string; options: string; toaster: string };
  apiMethodHeaders: { method: string; signature: string; description: string };
  apiMethods: Record<string, { description: string }>;
  apiToaster: ComponentDoc['api'];
};

export const toastZh: ToastDoc = {
  title: 'Toast',
  lede:
    '轻量级的手绘风通知，由全局命令式 API 驱动。在应用根挂载一次 `<Toaster />`，然后在任何地方 ——甚至 React 树之外—— 调用 `toast(…)`。生产环境只需在 app root 挂一次 `<Toaster />` 即可。',
  sections: {
    basic: '基础',
    placements: '位置',
    duration: '持续时间',
    action: '动作按钮',
    dismiss: '程序化关闭',
    code: '代码',
  },
  notes: {
    basic: '每种 variant 与 Button、Tag 共享同一套状态色，让一条破坏性提醒看起来就是破坏性的，无需额外样式。',
    placements:
      '一个 `<Toaster />` 同时渲染六个区域；每次调用通过 `placement` 选择落点。底部区域以"最新在底"的方式靠近视口边缘堆叠。',
    duration:
      '通过 `duration` 传入毫秒数。`0`（或 `Infinity`）表示永久打开直到用户关闭。鼠标悬停时倒计时自动暂停。',
    action: '为破坏性提醒搭配内联 `action`（如 *Undo*）。动作触发后 toast 自动关闭。',
    dismiss:
      '每次 `toast()` 调用都会返回它的 id；把它传给 `toast.dismiss(id)` 可以关闭单条 toast，不带参数调用 `toast.dismiss()` 则一次性清空整个队列。',
    apiFooter:
      '单一 `<Toaster />` 实例 portal 到 `document.body`，因此能逃出任何裁剪祖先，在窄布局中挂载也安全。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      duration: {
        description: '自动关闭超时（毫秒）。传 `0` 或 `Infinity` 让 toast 持久。',
      },
      variant: {
        description: '视觉 + 语义 variant。warning 与 danger 使用 `role="alert"` 和 `aria-live="assertive"`。',
      },
      placement: {
        description: '落到哪个区域。未指定时回退到 Toaster 默认值。',
      },
      closable: { description: '渲染内置的 `✕` 关闭按钮。' },
      icon: {
        description: '自定义图标节点；传 `false` 可抑制按 variant 选定的默认 emoji 图标。',
      },
      action: {
        description: '内联动作按钮（如 "Undo"）。动作触发后 toast 自动关闭。',
      },
      onClose: { description: 'toast 被移除时恰好触发一次。' },
      id: {
        description: '稳定 id。带相同 id 的 toast 会原地替换之前那条——适合 "Saving… → Saved!" 这类流程。',
      },
    },
  },
  apiHeadings: {
    methods: 'API · toast()',
    options: 'API · ToastOptions',
    toaster: 'API · <Toaster />',
  },
  apiMethodHeaders: { method: '方法', signature: '签名', description: '说明' },
  apiMethods: {
    base: {
      description: '把一条 toast 推入队列。返回 toast id，可在之后传给 `toast.dismiss(id)`。',
    },
    success: { description: '相当于 `toast(msg, { variant: "success" })` 的快捷方式。' },
    warning: { description: 'warning variant 的快捷方式。' },
    danger: { description: 'danger variant 的快捷方式。使用 `role="alert"`。' },
    info: { description: 'info variant 的快捷方式。' },
    dismissMethod: {
      description: '按 id 关闭 toast。不带参数则清空所有区域中的所有 toast。',
    },
  },
  apiToaster: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      defaultPlacement: {
        description: '未指定 `placement` 的 toast 默认落到的区域。',
      },
      limit: {
        description: '每个区域可见 toast 上限。超出的旧 toast 从视图中移除但仍保留在队列中，直到被关闭或自动关闭。',
      },
      defaultDuration: {
        description: '默认自动关闭超时（毫秒）。可通过 `options.duration` 在单条 toast 中覆盖。',
      },
      zIndex: { description: '应用到每个区域的层叠上下文。' },
    },
  },
};
