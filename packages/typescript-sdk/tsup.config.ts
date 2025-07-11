import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'patterns/index': 'src/patterns/index.ts',
    'services/index': 'src/services/index.ts',
    'models/index': 'src/models/index.ts',
    'state/index': 'src/state/index.ts',
    'validation/index': 'src/validation/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', '@tanstack/react-query', 'zustand'],
});