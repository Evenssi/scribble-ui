import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const cssFiles: Array<{ from: string; to: string }> = [
  { from: 'src/styles/tokens.css', to: 'dist/styles/tokens.css' },
  { from: 'src/styles/reset.css', to: 'dist/styles/reset.css' },
  { from: 'src/styles/components.css', to: 'dist/styles/components.css' },
  {
    from: 'src/components/Button/Button.css',
    to: 'dist/components/Button/Button.css',
  },
  {
    from: 'src/components/Input/Input.css',
    to: 'dist/components/Input/Input.css',
  },
  {
    from: 'src/components/Card/Card.css',
    to: 'dist/components/Card/Card.css',
  },
  {
    from: 'src/components/Tag/Tag.css',
    to: 'dist/components/Tag/Tag.css',
  },
  {
    from: 'src/components/Checkbox/Checkbox.css',
    to: 'dist/components/Checkbox/Checkbox.css',
  },
  {
    from: 'src/components/Radio/Radio.css',
    to: 'dist/components/Radio/Radio.css',
  },
  {
    from: 'src/components/Modal/Modal.css',
    to: 'dist/components/Modal/Modal.css',
  },
  {
    from: 'src/components/Tooltip/Tooltip.css',
    to: 'dist/components/Tooltip/Tooltip.css',
  },
  {
    from: 'src/components/Select/Select.css',
    to: 'dist/components/Select/Select.css',
  },
  {
    from: 'src/components/Switch/Switch.css',
    to: 'dist/components/Switch/Switch.css',
  },
  {
    from: 'src/components/Textarea/Textarea.css',
    to: 'dist/components/Textarea/Textarea.css',
  },
  {
    from: 'src/components/Divider/Divider.css',
    to: 'dist/components/Divider/Divider.css',
  },
  {
    from: 'src/components/Toast/Toast.css',
    to: 'dist/components/Toast/Toast.css',
  },
  {
    from: 'src/components/Avatar/Avatar.css',
    to: 'dist/components/Avatar/Avatar.css',
  },
  {
    from: 'src/components/Badge/Badge.css',
    to: 'dist/components/Badge/Badge.css',
  },
  {
    from: 'src/components/Skeleton/Skeleton.css',
    to: 'dist/components/Skeleton/Skeleton.css',
  },
  {
    from: 'src/components/Spinner/Spinner.css',
    to: 'dist/components/Spinner/Spinner.css',
  },
  {
    from: 'src/components/Progress/Progress.css',
    to: 'dist/components/Progress/Progress.css',
  },
  {
    from: 'src/components/Popover/Popover.css',
    to: 'dist/components/Popover/Popover.css',
  },
  {
    from: 'src/components/Drawer/Drawer.css',
    to: 'dist/components/Drawer/Drawer.css',
  },
  {
    from: 'src/components/Tabs/Tabs.css',
    to: 'dist/components/Tabs/Tabs.css',
  },
  {
    from: 'src/components/Carousel/Carousel.css',
    to: 'dist/components/Carousel/Carousel.css',
  },
  {
    from: 'src/components/Empty/Empty.css',
    to: 'dist/components/Empty/Empty.css',
  },
  {
    from: 'src/components/Result/Result.css',
    to: 'dist/components/Result/Result.css',
  },
  {
    from: 'src/components/Timeline/Timeline.css',
    to: 'dist/components/Timeline/Timeline.css',
  },
];

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' };
  },
  // Mark the bundle as a client module so RSC consumers (Next.js App
  // Router) don't try to render any of our hook-using components on
  // the server. Same trick used by Radix UI / shadcn.
  // We write the directive in onSuccess instead of `banner`, because
  // tsup's banner gets reordered around `'use strict'` and ends up
  // mid-file, where it stops being a valid React directive.
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  // tsup's CSS copy loader only fires when CSS is imported from an
  // entry file. Our components don't import their CSS directly (so
  // host bundlers like Next.js stay in control), so we copy the CSS
  // files manually after the JS build completes.
  //
  // The relative @import inside components.css (`../components/Button/Button.css`)
  // resolves correctly against the same dist/ layout, no rewrite needed.
  async onSuccess() {
    for (const { from, to } of cssFiles) {
      mkdirSync(dirname(to), { recursive: true });
      copyFileSync(from, to);
    }
    console.log(`✅ copied ${cssFiles.length} CSS files to dist/`);

    // Prepend the `"use client"` directive to every JS bundle so the
    // package can be consumed from React Server Components.
    for (const file of ['dist/index.mjs', 'dist/index.cjs']) {
      const body = readFileSync(file, 'utf8');
      if (!body.startsWith('"use client"')) {
        writeFileSync(file, `"use client";\n${body}`);
      }
    }
    console.log('✅ prepended "use client" directive');
  },
});
