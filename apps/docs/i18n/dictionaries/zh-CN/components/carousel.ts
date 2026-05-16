import type { ComponentDoc } from '../index';

export const carouselZh: ComponentDoc = {
  title: 'Carousel',
  lede:
    '一只手绘风的内容轮播。可拖动、可方向键、可自动播放——所有过渡、指示器与箭头都跑在你已经拥有的便利贴 token 上，无需逐实例样式。',
  sections: {
    basic: '基础用法',
    autoplay: '自动播放与悬停暂停',
    fade: '淡入过渡',
    indicators: '指示器形状',
    bounded: '边界（loop = false）',
    arrowPlacement: '箭头位置',
    dragKeyboard: '拖拽与键盘',
    controlled: '受控',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '默认 `slide` 过渡，配点状指示器与内置箭头。四张便利贴幻灯片，16∶9 视口。',
    autoplay:
      '每 2.5 秒自动前进。鼠标悬停视口（或 Tab 聚焦）时计时器暂停，直到指针 / 焦点离开。拖拽中、页面 tab 隐藏时也会暂停。',
    fade: '交叉淡入而非滑动。适合每张幻灯片视觉差异显著的英雄区。',
    indicators:
      '三种形状：`dot`（默认）、`dash` 和 `number`。number 渲染为便利贴风格的分数徽标。',
    bounded:
      '关闭 `loop` 时，prev / next 在边界处可见禁用，自动播放到达最后一帧时停止。',
    arrowPlacement:
      '`inside` 把箭头叠在视口上；`outside` 贴左 / 右栏边，让图像不被遮挡。',
    dragKeyboard:
      '按住并拖动视口左右——超过约 40px 或一次轻快甩动即提交切换，否则轨道弹回。Tab 到 carousel 后用 ←/→ 步进，Home/End 跳到首末。',
    controlled:
      '从外部驱动当前幻灯片。可结合关闭自动播放实现完全受控，或保留自动播放，把外部更新视为覆盖。',
    apiFooter:
      '该组件把 ref 透传到底层根 `HTMLDivElement`，并接受原生 `aria-*` / `data-*` 属性。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      items: {
        description:
          '必填。每一项含 `key`、`content` 和可选的 `alt`，`alt` 用作幻灯片的可访问标签。',
      },
      activeIndex: { description: '受控当前幻灯片索引。' },
      defaultIndex: { description: '非受控初始索引。' },
      onChange: { description: '当前幻灯片变化时触发。' },
      autoplay: { description: '按计时器自动前进。' },
      interval: { description: '自动播放间隔（毫秒）。最小 400ms。' },
      pauseOnHover: { description: '指针悬停 carousel 时暂停自动播放。' },
      loop: {
        description:
          '为 `false` 时，prev / next 在边界处禁用，到达最后一帧时自动播放停止。',
      },
      showArrows: { description: '渲染 prev / next 箭头按钮。' },
      showIndicators: { description: '渲染视口下方的指示器条。' },
      indicatorShape: { description: '每个指示器的形状。' },
      arrowPlacement: { description: '箭头是叠在视口上还是贴外栏。' },
      transition: { description: '幻灯片切换方式。' },
      aspectRatio: { description: '应用在视口上的 CSS aspect-ratio。' },
      height: { description: '固定高度。优先于 `aspectRatio`。' },
      draggable: { description: '鼠标 / 触摸拖拽切换幻灯片。' },
      keyboard: {
        description: '聚焦时启用 ←/→/Home/End 键。',
      },
      ariaLabel: {
        description: '包裹整个组件的 `role="region"` 上的 a11y 标签。',
      },
      className: { description: '附加在根元素上的额外 class。' },
    },
  },
};
