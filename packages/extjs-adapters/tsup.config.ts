import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'grid/index': 'src/grid/index.ts',
    'form/index': 'src/form/index.ts',
    'charts/index': 'src/charts/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['ext'],
});