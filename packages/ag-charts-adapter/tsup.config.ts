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
  dts: false, // Temporarily disable - fixed critical type errors, remaining need AG Charts type refactoring
  splitting: true, // ✅ Enable code splitting for better tree shaking
  sourcemap: true,
  clean: true,
  minify: true, // ✅ Enable minification for production builds
  external: ['react', 'react-dom', 'ext'], // ✅ Remove highcharts reference
  treeshake: true, // ✅ Enable tree shaking
});
