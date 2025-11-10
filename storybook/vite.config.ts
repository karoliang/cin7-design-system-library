import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-prop-types',
      enforce: 'pre',
      resolveId(id, importer) {
        // Handle multiple prop-types import patterns
        if (id === 'prop-types' || id.includes('prop-types')) {
          console.log('🔧 Prop-types import intercepted:', id, 'from:', importer);
          return 'virtual:prop-types';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:prop-types') {
          console.log('📦 Loading virtual prop-types module');
          return `
            // ES Module wrapper for CommonJS prop-types - Enhanced Fix
            // This replaces the CommonJS prop-types module that uses require()

            // Create mock PropTypes functions that work in browser environment
            const createMockValidator = () => {
              const mock = () => ({});
              mock.isRequired = mock;
              return mock;
            };

            const PropTypes = {
              array: createMockValidator(),
              bool: createMockValidator(),
              func: createMockValidator(),
              number: createMockValidator(),
              object: createMockValidator(),
              string: createMockValidator(),
              symbol: createMockValidator(),
              node: createMockValidator(),
              element: createMockValidator(),
              elementType: createMockValidator(),
              instanceOf: createMockValidator(),
              oneOf: createMockValidator(),
              oneOfType: createMockValidator(),
              arrayOf: createMockValidator(),
              objectOf: createMockValidator(),
              shape: createMockValidator(),
              exact: createMockValidator(),
              checkPropTypes: () => {},
              resetWarningCache: () => {},
              // Support for CommonJS compatibility
              default: {}
            };

            // Support both default and named exports
            export default PropTypes;

            // Named exports for ES module compatibility
            export const array = PropTypes.array;
            export const bool = PropTypes.bool;
            export const func = PropTypes.func;
            export const number = PropTypes.number;
            export const object = PropTypes.object;
            export const string = PropTypes.string;
            export const symbol = PropTypes.symbol;
            export const node = PropTypes.node;
            export const element = PropTypes.element;
            export const elementType = PropTypes.elementType;
            export const instanceOf = PropTypes.instanceOf;
            export const oneOf = PropTypes.oneOf;
            export const oneOfType = PropTypes.oneOfType;
            export const arrayOf = PropTypes.arrayOf;
            export const objectOf = PropTypes.objectOf;
            export const shape = PropTypes.shape;
            export const exact = PropTypes.exact;
            export const checkPropTypes = PropTypes.checkPropTypes;
            export const resetWarningCache = PropTypes.resetWarningCache;

            // Global compatibility for legacy code
            if (typeof window !== 'undefined') {
              window.PropTypes = PropTypes;
            }

            console.log('✅ Virtual prop-types module loaded successfully');
          `;
        }
        return null;
      },
      // Add transform hook to catch any remaining prop-types requires
      transform(code, id) {
        if (id.includes('prop-types') || code.includes('require(\'prop-types\')') || code.includes('require("prop-types")')) {
          console.log('🔄 Transforming prop-types require in:', id);
          return code.replace(/require\(['"](prop-types)['"]\)/g, 'import PropTypes from "prop-types"; PropTypes');
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
      '@shopify/polaris/dist/esm/utilities/prop-types',
    ],
    // Force optimization to bypass any cached prop-types modules
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