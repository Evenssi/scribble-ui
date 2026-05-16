import type { ComponentDoc } from '../index';

export const backtopZh: ComponentDoc = {
  title: 'BackTop',
  lede:
    '一颗悬浮按钮，让目标滚动回顶部。Portal 到宿主（或一个作用域容器）；当滚动距离越过可配置阈值时淡入；返回 0 时执行 easeOutCubic 动画——并尊重 `prefers-reduced-motion`。',
  sections: {
    intro: '提示',
    default: '默认',
    customThreshold: '自定义阈值',
    customContent: '自定义内容',
    scopedContainer: '作用域容器',
    code: '代码',
    api: 'API',
    fillerScroll: '滚动填充',
    fillerBottom: '底部填充',
  },
  notes: {
    intro:
      '至少向下滚动 **400 像素**，即可在页面右下角看到默认 BackTop 出现。',
    default:
      '把 `<BackTop />` 放在你组件树的任意位置。它会 portal 到 `document.body` 并监听 `window`。',
    defaultDemo:
      '默认阈值为 400px。点击回调会在滚动动画开始之前触发，使用方可以借此埋点或通过 `event.preventDefault()` 取消默认行为。',
    customThreshold:
      '降低 `visibilityHeight` 可让按钮更早出现——在 400px 永远不会触发的短页面上很有用。下面这第二个实例向左偏移，避免与默认那颗重叠。',
    customThresholdDemo: '下方橙色便利贴按钮在仅滚动 200px 后即出现。',
    customContent:
      '传入 children 替换默认的手绘箭头。文字、emoji、整段 SVG 都可以——按钮控制尺寸与滤镜，自定义内容也保持调性一致。',
    customContentDemo: '在默认按钮的左上方寻找一颗写着 `TOP` 的按钮。',
    scopedContainer:
      '同时传入 `target`（被监听并滚动的元素）和 `container`（portal 宿主——必须 `position: relative`），即可把 BackTop 绑定到自定义滚动容器。按钮将定位在容器内部，使用 `position: absolute`。',
    apiFooter:
      '滚回顶部时再向上滚动，即可看到 BackTop 在跨回阈值后再次淡出。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      visibilityHeight: {
        description:
          '按钮淡入所需的滚动距离（像素）。低于此值时按钮被视觉隐藏并移出 tab 顺序。',
      },
      target: {
        description:
          '返回被监听并滚动的元素。在挂载生命周期内保持稳定；运行时切换需要重新挂载。',
      },
      onClick: {
        description:
          '在滚动动画开始 *之前* 触发。调用 `e.preventDefault()` 即可跳过内置滚动并自行接管。',
      },
      duration: {
        description:
          '滚动动画时长（毫秒）。`prefers-reduced-motion: reduce` 用户始终为瞬时跳转。',
      },
      children: { description: '替换默认的手绘上箭头。' },
      right: { description: '相对容器右边缘的水平偏移。' },
      bottom: { description: '相对容器底边缘的垂直偏移。' },
      container: {
        description:
          'Portal 宿主。当不是 body 时按钮切换到 `position: absolute`，因此自定义容器需要 `position: relative`。',
      },
      'aria-label': { description: '图标按钮的可访问名称。' },
      className: { description: '附加在按钮上的额外 class。' },
      style: {
        description:
          '应用在按钮上的内联样式。`right` / `bottom` 属性会覆盖同名键。',
      },
    },
  },
};
