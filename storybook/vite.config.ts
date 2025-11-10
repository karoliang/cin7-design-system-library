import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// PRODUCTION BUILD FIX: Enhanced PropTypes resolution for Netlify build pipeline
// The issue: Local dev uses direct Vite dev server, Netlify uses complex multi-step build
// This ensures PropTypes compatibility across both build environments

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-prop-types',
      enforce: 'pre',
      // ENHANCED: Handle both development and production build contexts
      resolveId(id, importer) {
        // Handle multiple prop-types import patterns including @shopify/polaris util prop-types
        if (id === 'prop-types' ||
            id.includes('prop-types') ||
            id.includes('@shopify/polaris/dist/esm/utilities/prop-types') ||
            id.includes('polaris/utilities/prop-types')) {
          console.log('🔧 PRODUCTION-BUILD-FIX: Prop-types import intercepted:', id, 'from:', importer);
          return 'virtual:prop-types';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:prop-types') {
          console.log('📦 PRODUCTION-BUILD-FIX: Loading enhanced virtual prop-types module');
          return `
            // ES Module wrapper for CommonJS prop-types - PRODUCTION BUILD FIX v2.0
            // Enhanced for Netlify build pipeline compatibility
            // Handles both development and production build contexts

            // Production-safe environment detection
            const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
            const isNetlifyBuild = typeof window !== 'undefined' && window.location?.hostname?.includes('netlify');

            console.log('🏗️ PropTypes Loading Context:', { isProduction, isNetlifyBuild });

            // Create enhanced mock PropTypes functions that work in all environments
            const createMockValidator = (name) => {
              const mock = (...args) => {
                if (!isProduction) {
                  console.log(\`🔍 PropTypes.\${name} called with:\`, args);
                }
                return null; // Return null for validation success
              };
              mock.isRequired = (...args) => {
                if (!isProduction) {
                  console.log(\`⚠️ PropTypes.\${name}.isRequired called with:\`, args);
                }
                return null; // Return null for validation success
              };
              return mock;
            };

            const PropTypes = {
              array: createMockValidator('array'),
              bool: createMockValidator('bool'),
              func: createMockValidator('func'),
              number: createMockValidator('number'),
              object: createMockValidator('object'),
              string: createMockValidator('string'),
              symbol: createMockValidator('symbol'),
              node: createMockValidator('node'),
              element: createMockValidator('element'),
              elementType: createMockValidator('elementType'),
              instanceOf: createMockValidator('instanceOf'),
              oneOf: createMockValidator('oneOf'),
              oneOfType: createMockValidator('oneOfType'),
              arrayOf: createMockValidator('arrayOf'),
              objectOf: createMockValidator('objectOf'),
              shape: createMockValidator('shape'),
              exact: createMockValidator('exact'),
              checkPropTypes: () => {
                console.log('✅ PropTypes.checkPropTypes called (no-op in production)');
              },
              resetWarningCache: () => {
                console.log('🔄 PropTypes.resetWarningCache called (no-op in production)');
              },
            };

            // Support both default and named exports for maximum compatibility
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

            // Global compatibility for legacy code and @shopify/polaris
            if (typeof window !== 'undefined') {
              window.PropTypes = PropTypes;
              // Also support @shopify/polaris global access patterns
              if (window.Shopify) {
                window.Shopify.PropTypes = PropTypes;
              }
            }

            // CommonJS compatibility for mixed module systems
            if (typeof module !== 'undefined' && module.exports) {
              module.exports = PropTypes;
              module.exports.default = PropTypes;
            }

            console.log('✅ Enhanced virtual prop-types module loaded successfully for production build');
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
    // PRODUCTION BUILD FIX: Enhanced dependency optimization for Netlify
    include: [
      'react',
      'react-dom',
      '@shopify/polaris',
      '@shopify/polaris-icons',
      '@shopify/polaris-tokens',
      'react-transition-group',
    ],
    // PRODUCTION BUILD FIX: Comprehensive exclusion of all prop-types patterns
    exclude: [
      'prop-types',
      '@shopify/polaris/dist/esm/utilities/prop-types',
      'polaris/utilities/prop-types',
      '@shopify/polaris/utilities/prop-types',
    ],
    // Force optimization to bypass any cached prop-types modules in production
    force: true,
    // Add production-specific optimization settings
    preserveSymlinks: false, // Ensure proper module resolution in production
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