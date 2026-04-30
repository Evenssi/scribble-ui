[English](./README.md) | [简体中文](./README.zh-CN.md)

# scribble-ui

> A hand-drawn React component library — sticky notes meet whiteboard sketches.

## Installation

```bash
npm install scribble-ui
# or
pnpm add scribble-ui
# or
yarn add scribble-ui
```

## Usage

Import the base styles **once** at your app entry:

```tsx
import 'scribble-ui/styles/tokens.css';
```

Mount `<HandDrawnFilters />` once at the root so any component can reference the SVG filter ids:

```tsx
import { HandDrawnFilters } from 'scribble-ui';

export default function App() {
  return (
    <>
      <HandDrawnFilters />
      {/* your app */}
    </>
  );
}
```

## What's inside (Day 1)

| Export             | Purpose                                                                           |
| ------------------ | --------------------------------------------------------------------------------- |
| `HandDrawnFilters` | Invisible `<svg>` defining three SVG filters (`#su-hand-c/b/a`) for stroke wobble |
| `tokens.css`       | CSS variables for colors, radii, shadows, typography, spacing                     |
| `reset.css`        | Minimal reset (auto-imported by `tokens.css`)                                     |

> Components like `Button`, `Card`, `Input`, `Modal` will land in subsequent releases. Check the root [README](../../README.md) for the roadmap.

## Peer dependencies

- `react >= 18`
- `react-dom >= 18`

## License

MIT
