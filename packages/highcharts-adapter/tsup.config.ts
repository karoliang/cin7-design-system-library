import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'react/index': 'src/react/index.ts',
    'extjs/index': 'src/extjs/index.ts',
    'vanilla/index': 'src/vanilla/index.ts',
    'typescript/index': 'src/typescript/index.ts',
    'utilities/index': 'src/utilities/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'ext', 'highcharts'],
});
