import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['@cin7/core', '@cin7/polaris-adapter', '@cin7/vanilla-js', '@cin7/extjs-adapters', '@cin7/typescript-sdk'],
  onSuccess: 'echo "Build completed successfully"',
});