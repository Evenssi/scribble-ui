[English](./README.md) | [简体中文](./README.zh-CN.md)

# scribble-ui

> 一套手绘风的 React 组件库 —— 便签纸 × 白板涂鸦。

## 安装

```bash
npm install scribble-ui
# 或
pnpm add scribble-ui
# 或
yarn add scribble-ui
```

## 使用

在应用入口引入一次基础样式：

```tsx
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';
```

在根节点挂载一次 `<HandDrawnFilters />`，所有组件就能通过 SVG filter id 引用抖动效果：

```tsx
import { HandDrawnFilters } from 'scribble-ui';

export default function App() {
  return (
    <>
      <HandDrawnFilters />
      {/* 你的应用 */}
    </>
  );
}
```

## 当前包含（Day 1）

| 导出               | 用途                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| `HandDrawnFilters` | 不可见 `<svg>`，定义三档 SVG 抖动滤镜（`#su-hand-c/b/a`）                   |
| `tokens.css`       | CSS 变量：颜色、圆角、阴影、字体、间距                                      |
| `reset.css`        | 极简 reset（被 `tokens.css` 自动 `@import`）                                |

> `Button`、`Card`、`Input`、`Modal` 等组件会在后续版本陆续提供。详细路线图见根目录 [README](../../README.zh-CN.md)。

## Peer Dependencies

- `react >= 18`
- `react-dom >= 18`

## 许可证

MIT
