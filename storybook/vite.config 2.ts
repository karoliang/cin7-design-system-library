import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cin7/core': resolve(__dirname, '../packages/core/src'),
      '@cin7/design-tokens': resolve(__dirname, '../packages/design-tokens/src'),
      '@cin7/vanilla-js': resolve(__dirname, '../packages/vanilla-js/src'),
      '@cin7/typescript-sdk': resolve(__dirname, '../packages/typescript-sdk/src'),
      '@cin7/polaris-adapter': resolve(__dirname, '../packages/polaris-adapter/src'),
      '@cin7/extjs-adapters': resolve(__dirname, '../packages/extjs-adapters/src'),
      '@cin7/highcharts-adapter': resolve(__dirname, '../packages/highcharts-adapter/src'),
      '@cin7/cli': resolve(__dirname, '../packages/cli/src'),
    },
  },
  optimizeDeps: {
    // CRITICAL FIX: Explicit module pre-bundling for complex components
    include: [
      'react',
      'react-dom',
      '@shopify/polaris',
      '@shopify/polaris-icons',
      '@shopify/polaris-tokens',
      // CRITICAL: Add explicit includes for Frame and Breadcrumbs dependencies
      '@shopify/polaris/build/esm/styles.css',
      '@shopify/polaris/build/esm/components/Frame/Frame.css',
      '@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.css',
      '@shopify/polaris/build/esm/utilities/i18n',
      '@shopify/polaris/build/esm/utilities/media-query',
      '@shopify/polaris/build/esm/utilities/frame',
      '@shopify/polaris/build/esm/components/Frame',
      '@shopify/polaris/build/esm/components/Breadcrumbs',
      'react-transition-group',
    ],
    // CRITICAL FIX: Force inclusion of problematic modules
    force: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});