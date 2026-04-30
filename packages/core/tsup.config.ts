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
