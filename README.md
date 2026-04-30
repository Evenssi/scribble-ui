[English](./README.md) | [简体中文](./README.zh-CN.md)

# scribble-ui

> A hand-drawn React component library — sticky notes meet whiteboard sketches.

`scribble-ui` is a React component library with a warm, hand-drawn aesthetic. It ships designed-from-scratch primitives (Button, Card, Input, Modal, etc.) styled with off-white canvas, asymmetric corners, hard offset shadows, and SVG-filter wobble — perfect for whiteboard tools, note-taking apps, learning products, or anywhere you want to dial down the corporate polish.

## Features

- 🎨 **Hand-drawn by default** — wobbly strokes powered by SVG `feTurbulence` + `feDisplacementMap` filters, with three jitter levels (subtle / normal / strong).
- 🪧 **Sticky-note palette** — low-saturation off-white, ink-black (`#1e1e1e`), and a curated set of sticky-note tints. Never pure black, never pure white.
- 🧱 **Asymmetric geometry** — every corner radius is different, every shadow is a hard offset. No Material elevation, no blurred shadows.
- 🧩 **Tree-shakable, zero runtime CSS-in-JS** — CSS Modules + CSS Variables only. Bring your own bundler.
- 🔡 **TypeScript-first** — strict types, full `.d.ts` output via tsup.
- 🪶 **Lightweight peer deps** — only `react` and `react-dom`. No styled-components, no Tailwind required.

## Installation

```bash
# npm
npm install scribble-ui

# pnpm
pnpm add scribble-ui

# yarn
yarn add scribble-ui
```

Then import the base styles once at your app entry:

```tsx
import 'scribble-ui/styles/tokens.css';
```

## Quick start

```tsx
import { Button, HandDrawnFilters } from 'scribble-ui';

export default function App() {
  return (
    <>
      {/* Mount once at the root so all components can reference filter ids */}
      <HandDrawnFilters />

      <Button variant="primary" size="md" onClick={() => alert('hi')}>
        Click me
      </Button>
    </>
  );
}
```

## Monorepo layout

This repository is a pnpm workspace:

```
scribble-ui/
├── packages/
│   └── core/          # the published `scribble-ui` package
└── apps/
    └── docs/          # Next.js 14 documentation site (English)
```

## Local development

```bash
# Requires Node 18.19.0 (see .nvmrc) and pnpm 9.x
nvm use
pnpm install

# Start the docs site (live-references the source of packages/core)
pnpm dev
```

The docs site runs at `http://localhost:3000`.

## Status

Day 1 scaffolding — the public API is **not** stable yet. Expect breaking changes until `0.1.0`.

## License

MIT (to be added).
