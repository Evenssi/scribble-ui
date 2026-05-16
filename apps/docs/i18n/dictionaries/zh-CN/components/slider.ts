import type { ComponentDoc } from '../index';

export const sliderZh: ComponentDoc = {
  title: 'Slider',
  lede:
    '一枚手绘风滑块，支持单值与范围两种模式。底层用的是 `role="slider"` 元素（不是原生 `<input type="range">`），这样我们才能用共享的 SVG 滤镜把轨道、填充和滑块都绘成手绘摇晃风，同时保留 WAI-ARIA Slider 的键盘交互。',
  sections: {
    sizes: '尺寸',
    states: '状态',
    range: '范围',
    marks: '刻度',
    vertical: '纵向',
    controlled: '受控 + onChangeCommitted',
    code: '代码',
    api: 'API',
  },
  notes: {
    sizes: '三档尺寸同步缩放滑块和轨道粗细，让滑块永远看起来正好在线上。',
    states:
      'Disabled 完全去掉摇晃（与 Button 一致）并将两个滑块从 tab 顺序中移除。当数值是屏幕上唯一反馈时，使用 `showTooltip="always"`。',
    range:
      '传入 `range` 渲染两个不会交叉的滑块。按 `Tab` 聚焦活动滑块，再用方向键微调；再次 `Tab` 离开——非活动滑块仍可用指针或就近点击触达。',
    rangePrice: '当前价格筛选：',
    marks:
      '刻度仅作装饰——它们标示常用值在轨道上的位置，但不约束取值（只有 `step` 会）。给那些用户需要记住的位置加 label。',
    vertical:
      '`vertical` 会重新编排布局（而不是旋转），这样命中检测和键盘语义都依然合理：`↑` 永远增大数值、`↓` 永远减小。',
    controlled:
      '`onChange` 在交互过程中持续触发，所以可以安全地绑到本地 state。`onChangeCommitted` 仅在用户释放指针或停止按方向键时触发一次——非常适合把数值发往服务器。',
    apiFooter:
      '键盘：`←`/`↓` 减、`→`/`↑` 加 `step`；`Shift` + 方向键乘 10；`PageUp`/`PageDown` 移动整段范围的 10%；`Home`/`End` 跳到 `min` / `max`。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      range: {
        description: '切到双滑块模式。为 true 时 `value` / `defaultValue` / `onChange` 全部使用 `[number, number]` 元组。',
      },
      value: {
        description: '受控值。需与 `onChange` 配对。类型取决于 `range`。',
      },
      defaultValue: { description: '非受控初始值。' },
      onChange: {
        description: '指针拖动与键盘输入过程中持续触发。类型跟随 `range`。',
      },
      onChangeCommitted: {
        description: '用户释放指针或停止按方向键后触发一次。用于触发昂贵的副作用（网络请求等）。',
      },
      min: { description: '闭区间下界。' },
      max: { description: '闭区间上界。' },
      step: {
        description: '吸附增量。指针拖动与方向键的最终值都会四舍五入到 `step` 的整数倍。',
      },
      marks: {
        description: '渲染在轨道上的装饰性刻度。它们不约束取值——只有 `step` 才会。',
      },
      disabled: {
        description: '禁用所有交互。完全去掉摇晃并把两个滑块从 tab 顺序中移除。',
      },
      vertical: {
        description: '纵向渲染滑块。键盘语义不变——`↑` 永远增大、`↓` 永远减小。',
      },
      size: { description: '尺寸预设。影响轨道粗细、滑块与标签字体。' },
      showTooltip: {
        description: '何时在活动滑块旁渲染数值气泡。`"drag"` 只在指针拖动或键盘输入时显示。',
      },
      formatTooltip: { description: '格式化气泡数值（货币、百分比……）。' },
      'aria-label': {
        description: '转发到滑块的可访问标签。范围模式下会自动追加 " — minimum" / " — maximum"。',
      },
      className: { description: '附加在外层容器上的额外 class。' },
    },
  },
};
