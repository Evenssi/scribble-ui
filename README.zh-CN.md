[English](./README.md) | [简体中文](./README.zh-CN.md)

# scribble-ui

> 一套手绘风的 React 组件库 —— 便签纸 × 白板涂鸦。

`scribble-ui` 是一套面向社区的 React 组件库，以温暖、不完美的手绘美学为核心。从零设计的基础组件（Button、Card、Input、Modal 等）采用米白画布、不对称圆角、实心偏移阴影与 SVG filter 抖动效果，适合白板工具、笔记应用、学习产品，或任何想去掉「企业级 SaaS 蓝」感的场景。

## 特性

- 🎨 **默认手绘** —— 通过 SVG `feTurbulence` + `feDisplacementMap` 实现描边抖动，提供轻 / 中 / 强三档强度
- 🪧 **便签色板** —— 低饱和米白底、墨黑文字（`#1e1e1e`），加上一组精挑的便签色。永远不用纯黑、不用纯白
- 🧱 **不对称几何** —— 每个圆角四角不同、每个阴影都是实心偏移。拒绝 Material 的 elevation 与模糊投影
- 🧩 **Tree-shakable、零运行时 CSS-in-JS** —— 只用 CSS Modules + CSS Variables，自带任何打包工具均可
- 🔡 **TypeScript 优先** —— strict 模式，tsup 输出完整 `.d.ts`
- 🪶 **依赖极简** —— 只有 `react` 与 `react-dom` 两个 peerDependency，不需要 styled-components 或 Tailwind

## 安装

```bash
# npm
npm install scribble-ui

# pnpm
pnpm add scribble-ui

# yarn
yarn add scribble-ui
```

在应用入口引入一次基础样式：

```tsx
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';
```

## 快速上手

```tsx
import { Button, HandDrawnFilters } from 'scribble-ui';

export default function App() {
  return (
    <>
      {/* 全局只挂载一次，供所有组件通过 filter id 引用 */}
      <HandDrawnFilters />

      <Button variant="primary" size="md" onClick={() => alert('hi')}>
        点我试试
      </Button>
    </>
  );
}
```

## Monorepo 结构

仓库使用 pnpm workspace：

```
scribble-ui/
├── packages/
│   └── core/          # 发布到 npm 的 `scribble-ui` 包
└── apps/
    └── docs/          # Next.js 14 文档站（英文）
```

## 本地开发

```bash
# 需要 Node 18.19.0（详见 .nvmrc）和 pnpm 9.x
nvm use
pnpm install

# 启动文档站（自动 live 引用 packages/core 的源码）
pnpm dev
```

文档站默认运行在 `http://localhost:3000`。

## 状态

Day 1 骨架阶段 —— 对外 API **尚未稳定**，`0.1.0` 之前都可能有 breaking changes。

## 许可证

MIT（待补充）。
