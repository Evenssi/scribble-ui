import { defineConfig } from 'tsup';

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
  // Copy CSS files (tokens, resets, component styles) to dist as-is.
  // Consumers import them explicitly, e.g.
  //   import 'scribble-ui/styles/tokens.css';
  loader: {
    '.css': 'copy',
  },
  treeshake: true,
});
