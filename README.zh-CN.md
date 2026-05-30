[English](./README.md) | [简体中文](./README.zh-CN.md)

<p align="center">
  <img src="./docs-assets/hero-button-en.png" alt="scribble-ui Button 组件展厅 —— 便签色板、不对称圆角、实心偏移阴影" width="820" />
</p>

<h1 align="center">scribble-ui</h1>

<p align="center">
  一套手绘风的 React 组件库 —— 便签纸 × 白板涂鸦。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/components-34-fff9c4?style=flat-square&labelColor=1e1e1e" alt="34 个组件" />
  <img src="https://img.shields.io/badge/react-%3E%3D18-bbdefb?style=flat-square&labelColor=1e1e1e" alt="React 18+" />
  <img src="https://img.shields.io/badge/typescript-strict-e1bee7?style=flat-square&labelColor=1e1e1e" alt="TypeScript strict" />
  <img src="https://img.shields.io/badge/peer%20deps-react%20%2B%20react--dom-b2dfdb?style=flat-square&labelColor=1e1e1e" alt="极简 peer deps" />
  <img src="https://img.shields.io/badge/license-MIT-f8bbd0?style=flat-square&labelColor=1e1e1e" alt="MIT" />
</p>

`scribble-ui` 提供 **34 个手绘风格的 React 组件**：便签色板、不对称圆角、实心偏移阴影，搭配 SVG `feTurbulence` 抖动滤镜，整体温暖、不完美、不"企业蓝"。适合白板工具、笔记应用、学习产品，或任何想去掉 SaaS 精致感的场景。

## 为什么选 scribble-ui

- 🎨 **默认手绘**。每一笔都通过 SVG `feTurbulence` + `feDisplacementMap` 抖动，提供 `subtle` / `normal` / `strong` 三档强度。
- 🪧 **便签色板，永远不用纯黑纯白**。米白画布、墨黑文字 `#1e1e1e`，配一组精挑的便签彩色 token。
- 🧱 **不对称几何**。每个圆角四角都不一样，每个阴影都是实心偏移 —— 没有 Material elevation，也没有模糊投影。
- 🪶 **依赖极简**。Tree-shakable 的 ESM + CJS + `.d.ts`，零运行时 CSS-in-JS，peer deps 只有 `react` 和 `react-dom`。不需要 Tailwind，不需要 styled-components。

## 安装

```bash
npm install scribble-ui
# 或
pnpm add scribble-ui
# 或
yarn add scribble-ui
```

在应用入口**只引入一次**基础样式：

```ts
import 'scribble-ui/styles/tokens.css';
import 'scribble-ui/styles/components.css';
// 可选的 CSS reset
import 'scribble-ui/styles/reset.css';
```

然后在应用根节点**只挂载一次** `<HandDrawnFilters />` —— 所有组件都通过 URL 引用滤镜 `id`，SVG `<defs>` 必须存在于 DOM 中：

```tsx
import { HandDrawnFilters } from 'scribble-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HandDrawnFilters />
      {children}
    </>
  );
}
```

## Recipes

### 1. Button

```tsx
import { Button } from 'scribble-ui';

<Button variant="primary" size="md" onClick={() => alert('hi')}>
  点我试试
</Button>
```

### 2. 配 `react-hook-form` + `zod` 的表单

`<Form>` 和 `<Form.Item>` 刻意保持极简：仅做 layout / size context、label、required 星号、`role="alert"` 的错误提示、helper text、自动 `htmlFor`。它们**不会** clone 子组件去注入 `value` / `onChange` —— 字段请用 RHF 的 `Controller` 接入，这样就和 RHF 的 render-prop 契约 100% 兼容。

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button } from 'scribble-ui';

const schema = z.object({
  email: z.string().email('请输入合法的邮箱'),
});
type FormValues = z.infer<typeof schema>;

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  return (
    <Form layout="vertical" onSubmit={handleSubmit((v) => console.log(v))}>
      <Form.Item label="邮箱" required error={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="you@example.com" />}
        />
      </Form.Item>
      <Button type="submit" variant="primary">注册</Button>
    </Form>
  );
}
```

`react-hook-form` 和 `zod` 是**可选**的 —— 它们不是 peer dependency。所有受控组件（`<Input>` / `<Select>` / `<DatePicker>` / …）都能直接放进 `<Controller>`，因为它们都是标准的 `value` / `onChange` / `error` 形态。

### 3. Modal

```tsx
import { useState } from 'react';
import { Button, Modal } from 'scribble-ui';

export function ConfirmDelete() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>删除</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="确认删除这条便签？"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>取消</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>删除</Button>
          </>
        }
      >
        此操作无法撤销。
      </Modal>
    </>
  );
}
```

## 组件清单

34 个组件，按用途分类：

| 分类 | 组件 |
|---|---|
| **通用** | Button · Tag · Avatar · Badge · Divider |
| **表单** | Input · Textarea · NumberInput · Checkbox · Radio · Switch · Select · Slider · DatePicker · Form |
| **数据展示** | Card · Tabs · Timeline · Carousel · Pagination · Breadcrumb · Skeleton · Empty · Progress |
| **反馈** | Modal · Drawer · Toast · Tooltip · Popover · Alert · Result · Spinner |
| **导航** | Dropdown · BackTop |
| **基础设施** | HandDrawnFilters *（应用根节点只挂载一次）* |

每个组件的可交互 demo 都可以在文档站找到，详见下文。

## 文档站

文档站位于 `apps/docs`，是一个 Next.js 14 App Router 项目，已接入 **i18n**（`en-US` / `zh-CN`），所有 demo 都直接引用 `packages/core` 源码。

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 仓库结构

```
scribble-ui/
├── packages/
│   └── core/          # 发布到 npm 的 `scribble-ui` 包
└── apps/
    └── docs/          # Next.js 14 文档站（en-US / zh-CN）
```

## 本地开发

```bash
# 需要 Node >= 20（详见 .nvmrc）和 pnpm 10.x（详见 package.json#packageManager）
nvm use
pnpm install

# 启动文档站 —— 自动 live 引用 packages/core 源码
pnpm dev

# 整体构建（先打库，再打文档站）
pnpm build

# 整个 workspace 类型检查
pnpm typecheck
```

## 状态

34 个组件已交付，进入打磨期。对外 API **尚未稳定**，`0.1.0` 之前都可能有 breaking changes。

## 许可证

MIT
