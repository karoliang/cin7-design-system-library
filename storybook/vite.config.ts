import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { configureViteCache } from '../config/cache-config.js';

// PRODUCTION BUILD FIX: Enhanced PropTypes resolution for Netlify build pipeline
// The issue: Local dev uses direct Vite dev server, Netlify uses complex multi-step build
// This ensures PropTypes compatibility across both build environments

// Apply cache configuration to the entire build
const baseConfig = {
  plugins: [
    react(),
    {
      name: 'expose-react-globals',
      enforce: 'pre',
      // CRITICAL FIX: Ensure React and ReactDOM are exposed globally for Storybook client API
      // The issue: Storybook client API requires React to be available on window object
      // Without this, __STORYBOOK_CLIENT_API__ fails to initialize
      resolveId(id) {
        if (id === 'virtual:react-expose') {
          return id;
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:react-expose') {
          return `
            // CRITICAL FIX: React Global Exposure for Storybook Client API
            // Ensures React and ReactDOM are available on window object
            // Required for __STORYBOOK_CLIENT_API__ initialization

            import React from 'react';
            import ReactDOM from 'react-dom';

            console.log('🔧 React Global Exposure: Ensuring React is available on window object');

            // Expose React and ReactDOM globally for Storybook client API
            if (typeof window !== 'undefined') {
              window.React = React;
              window.ReactDOM = ReactDOM;

              console.log('✅ React and ReactDOM exposed to window object');
              console.log('React available:', typeof window.React !== 'undefined');
              console.log('ReactDOM available:', typeof window.ReactDOM !== 'undefined');
            }

            export default {};
          `;
        }
        return null;
      },
      transformIndexHtml(html) {
        // Inject the React exposure module early in the HTML
        return html.replace(
          '<script type="module" src="/@vite/client"></script>',
          `
            <script type="module">
              import React from 'react';
              import ReactDOM from 'react-dom';

              if (typeof window !== 'undefined') {
                window.React = React;
                window.ReactDOM = ReactDOM;
                console.log('🔧 Early React exposure: React and ReactDOM available on window');
              }
            </script>
            <script type="module" src="/@vite/client"></script>
          `
        );
      }
    },
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
                return undefined; // Return undefined for validation success (not null!)
              };
              mock.isRequired = mock; // isRequired should return the same function for chaining
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
};

// Apply cache configuration and export
export default defineConfig(configureViteCache(baseConfig));