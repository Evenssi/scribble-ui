import type { ComponentDoc } from '../index';

export type TimelineDoc = ComponentDoc & {
  apiHeadings: { timeline: string; item: string };
  apiItem: ComponentDoc['api'];
  footerNote: string;
};

export const timelineZh: TimelineDoc = {
  title: 'Timeline',
  lede:
    '一条手绘风的纵向时间带，适合 changelog、动态流和分步流程。用 `Timeline.Item` 子组件组合，按状态给每个节点上色，把进行中的连接段标为虚线，或翻成 `alternate` 双栏模式来讲故事。',
  sections: {
    basic: '基础',
    rightAligned: '右对齐',
    alternate: '交替',
    customDot: '自定义节点',
    dashed: '虚线连接',
    reverse: '反序',
    code: '代码',
    api: 'API',
  },
  notes: {
    basic:
      '默认左对齐布局。每条记录有一个上色节点和可选的 `time` 行。传给 `time` 的字符串和数字会被包进 `<time>`，方便辅助技术读作时间戳。',
    rightAligned:
      '使用 `mode="right"` 把轨道翻到对侧。在 timeline 紧贴左侧窄栏、或 RTL 友好布局时很方便。',
    alternate:
      '`mode="alternate"` 把轨道放在中间，把每条记录推到两侧——产品讲故事或发布回顾时让每个事件都拥有自己的节奏。',
    customDot:
      '把任意 ReactNode 传给 `dot` ——表情符号、字母、小 SVG ——它会替换默认的彩色圆点。节点槽保留固定占位，让兄弟项依然对齐。',
    dashed:
      '把某项下方的连线标为虚线，表示 *进行中* 或 *即将到来*。只有该项下方的连接段会切换；上方的实线保持不变。',
    reverse:
      '设置 `reverse` 让最新的展示在最上方。DOM 顺序未被触碰，所以屏幕阅读器仍按原始书写顺序播报——你只是免费拿到了反向视图。',
  },
  api: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      mode: {
        description: '轨道（节点 + 连接线）相对正文的位置。`"alternate"` 把轨道居中并让记录左右交替。',
      },
      reverse: {
        description: '用 `flex-direction: column-reverse` 视觉翻转顺序。DOM 顺序保留，因此屏幕阅读器仍按书写顺序播报。',
      },
      as: {
        description: '渲染哪种列表元素。默认 `<ol>` 适合按时间排列；改 `<ul>` 适合无序步骤。',
      },
      children: { description: '应当是一组 `<Timeline.Item>` 子节点。' },
      className: { description: '附加在内置 class 之后的额外 class。' },
    },
  },
  apiHeadings: {
    timeline: 'API · Timeline',
    item: 'API · Timeline.Item',
  },
  apiItem: {
    headers: { name: '名称', type: '类型', default: '默认值', description: '说明' },
    rows: {
      time: {
        description: '简短的时间 / 标题行。字符串和数字会包进 `<time>`；ReactNode 原样渲染，便于调用方控制自己的标签。',
      },
      children: { description: '记录的主体内容。' },
      status: {
        description: '驱动节点填充色和该项下方连线的颜色。映射到对应的 `--su-color-*` token。',
      },
      dot: {
        description: '用自定义图形（emoji、字母、小 SVG）替换默认的手绘圆点。节点槽保留占位，让兄弟项依然对齐。',
      },
      dashed: {
        description: '把 *该项下方* 的连接段渲染为虚线而非实线。适合标记"进行中"或"即将到来"。最后一项无效。',
      },
      className: { description: '附加在该项元素上的额外 class。' },
      style: { description: '转发到 `<li>` 上的内联样式。' },
    },
  },
  footerNote:
    '根元素是语义化列表（默认 `<ol>`），带 `aria-label="Timeline"`，所以辅助技术会把它播报为时间带列表。装饰性的轨道与节点都标记为 `aria-hidden`。',
};
