import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'patterns/index': 'src/patterns/index.ts',
    'services/index': 'src/services/index.ts',
    'state/index': 'src/state/index.ts',
    'validation/index': 'src/validation/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disable DTS generation due to type issues
  splitting: true, // ✅ Enable code splitting
  sourcemap: true,
  clean: true,
  minify: true, // ✅ Enable minification
  external: ['react', '@tanstack/react-query', 'zustand'],
  treeshake: true, // ✅ Enable tree shaking
});