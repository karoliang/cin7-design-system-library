import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-prop-types',
      enforce: 'pre',
      resolveId(id) {
        if (id === 'prop-types') {
          return 'virtual:prop-types';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:prop-types') {
          return `
            // ES Module wrapper for CommonJS prop-types
            export default {
              array: function() { return {}; },
              bool: function() { return {}; },
              func: function() { return {}; },
              number: function() { return {}; },
              object: function() { return {}; },
              string: function() { return {}; },
              symbol: function() { return {}; },
              node: function() { return {}; },
              element: function() { return {}; },
              elementType: function() { return {}; },
              instanceOf: function() { return {}; },
              oneOf: function() { return {}; },
              oneOfType: function() { return {}; },
              arrayOf: function() { return {}; },
              objectOf: function() { return {}; },
              shape: function() { return {}; },
              exact: function() { return {}; },
              checkPropTypes: function() {},
              resetWarningCache: function() {}
            };

            export const array = function() { return {}; };
            export const bool = function() { return {}; };
            export const func = function() { return {}; };
            export const number = function() { return {}; };
            export const object = function() { return {}; };
            export const string = function() { return {}; };
            export const symbol = function() { return {}; };
            export const node = function() { return {}; };
            export const element = function() { return {}; };
            export const elementType = function() { return {}; };
            export const instanceOf = function() { return {}; };
            export const oneOf = function() { return {}; };
            export const oneOfType = function() { return {}; };
            export const arrayOf = function() { return {}; };
            export const objectOf = function() { return {}; };
            export const shape = function() { return {}; };
            export const exact = function() { return {}; };
            export const checkPropTypes = function() {};
            export const resetWarningCache = function() {};
          `;
        }
        return null;
      }
    }
  ],
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
    // CRITICAL FIX: Include core dependencies for optimization
    include: [
      'react',
      'react-dom',
      '@shopify/polaris',
      '@shopify/polaris-icons',
      '@shopify/polaris-tokens',
    ],
    // CRITICAL FIX: Exclude problematic dependencies from optimization
    exclude: [
      'prop-types',
      'react-transition-group',
    ],
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