import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const cssFiles: Array<{ from: string; to: string }> = [
  { from: 'src/styles/tokens.css', to: 'dist/styles/tokens.css' },
  { from: 'src/styles/reset.css', to: 'dist/styles/reset.css' },
  { from: 'src/styles/components.css', to: 'dist/styles/components.css' },
  {
    from: 'src/components/Button/Button.css',
    to: 'dist/components/Button/Button.css',
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
  },
});
