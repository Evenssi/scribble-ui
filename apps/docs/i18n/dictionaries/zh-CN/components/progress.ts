import type { ComponentDoc } from '../index';

export const progressZh: ComponentDoc = {
  title: 'Progress',
  lede:
    '与 `Spinner` 互补的进度指示器：可视化任务**完成了多少**。两种形状—— `line` 与 `circle` ——共享同一套状态色板、尺寸阶梯与不确定模式行为。',
  sections: {
    lineValues: '线性 · 数值',
    lineSizes: '线性 · 尺寸',
    lineStatus: '线性 · 状态',
    lineLabel: '线性 · 带标签',
    lineIndeterminate: '线性 · 不确定',
    circleValues: '环形 · 数值',
    circleSizes: '环形 · 尺寸',
    circleStatus: '环形 · 状态',
    circleLabel: '环形 · 带标签',
    circleIndeterminate: '环形 · 不确定',
    code: '代码',
    api: 'API',
  },
  notes: {
    lineValues: '`value` 会被钳制到 `[0, 100]`。非数值回退到 `0`。',
    lineSizes: '三档预设高度：`sm` 6px、`md` 10px、`lg` 14px。',
    lineStatus:
      '`status` 选取既有的语义色：`normal`（墨色）、`success`、`warning`、`danger`。',
    lineLabel:
      '传入 `showLabel` 在条形右侧渲染百分比。需要完全自定义时使用 `formatLabel`。',
    lineIndeterminate:
      '当 `indeterminate` 为 `true` 时，`value` 被忽略、标签隐藏，填充会沿轨道持续滑动。',
    circleValues:
      '环形以 `pathLength={100}` 归一化，因此 stroke-dashoffset 计算就是 `100 - value`。',
    circleSizes: '三档预设直径：`sm` 56px、`md` 80px、`lg` 112px。stroke 宽度随尺寸缩放。',
    circleLabel:
      '标签居中渲染在环内。可用 `formatLabel` 显示分数、剩余时间或任意文本。',
    circleIndeterminate:
      '一段短弧绕环旋转。标签隐藏、`aria-valuenow` 被省略（按 WAI-ARIA 约定，此时值未知）。',
    apiFooter:
      '组件渲染一个带 `role="progressbar"` 的 `<div>`，并把 ref 透传到该元素。所有原生 div 属性都会被接收。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      value: {
        description:
          '进度百分比，0–100。自动钳制；`NaN` / `undefined` 回退到 `0`。`indeterminate` 为真时被忽略。',
      },
      indeterminate: {
        description:
          '渲染不确定动画（滑动条 / 旋转弧）。隐藏标签并省略 `aria-valuenow`。',
      },
      variant: { description: '视觉形状。' },
      size: { description: '线性高度：6 / 10 / 14 px；环形直径：56 / 80 / 112 px。' },
      status: { description: '语义色，映射到既有的 `--su-color-*` token。' },
      showLabel: {
        description:
          '是否把百分比渲染为可见文本。位置随 variant：line 右对齐、circle 居中。`indeterminate` 时强制关闭。',
      },
      formatLabel: {
        description:
          '自定义标签渲染器。接收钳制后的值（0–100）。优先于默认的 `n%` 渲染。',
      },
      'aria-label': {
        description: 'progressbar 的可访问名。强烈建议指定，缺省时回退到 `\'Loading\'`。',
      },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
};
