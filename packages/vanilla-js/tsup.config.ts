import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    browser: 'src/browser.ts',
    'dom/index': 'src/dom/index.ts',
    'events/index': 'src/events/index.ts',
    'animations/index': 'src/animations/index.ts',
  },
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  globalName: 'Cin7VanillaJS',
});