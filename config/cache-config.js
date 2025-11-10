/**
 * ==================================================
 * COMPREHENSIVE BUILD TOOL CACHE CONFIGURATION
 * ==================================================
 *
 * This module provides shared cache configuration for all build tools
 * to ensure caches are generated in excluded directories only.
 */

import { resolve, join } from 'path';

// Base cache directory - all caches go here to be excluded by .gitignore
const CACHE_BASE_DIR = resolve(process.cwd(), '.cache');

// Comprehensive cache configuration for different build tools
export const CACHE_CONFIG = {
  // Vite cache configuration
  vite: {
    cacheDir: join(CACHE_BASE_DIR, 'vite'),
    // Additional Vite-specific cache settings
    optimizeDeps: {
      // Force rebuild to avoid stale dependencies
      force: process.env.NODE_ENV === 'development',
      // Optimize in development for faster builds
      enabled: true,
    },
    server: {
      // Disable filesystem cache for development server
      fs: {
        strict: false,
      },
    },
  },

  // Rollup cache configuration
  rollup: {
    cache: false, // Disable Rollup cache to prevent persistence
    // Alternative: specify cache directory if needed
    // cacheDir: join(CACHE_BASE_DIR, 'rollup'),
  },

  // TypeScript cache configuration
  typescript: {
    compilerOptions: {
      // Disable incremental compilation to prevent .tsbuildinfo files
      incremental: false,
      // Disable composite project features
      composite: false,
      // Specify custom build info directory if incremental is needed
      // tsBuildInfoFile: join(CACHE_BASE_DIR, 'typescript', '.tsbuildinfo'),
    },
  },

  // ESLint cache configuration
  eslint: {
    cache: false, // Disable ESLint cache
    // Alternative: specify cache location
    // cacheLocation: join(CACHE_BASE_DIR, 'eslint', '.eslintcache'),
  },

  // Prettier cache configuration (via plugin)
  prettier: {
    // Most Prettier caching is handled by editors/plugins
    // Configure tools to use cache directory if needed
    cacheDir: join(CACHE_BASE_DIR, 'prettier'),
  },

  // Stylelint cache configuration
  stylelint: {
    cache: false, // Disable Stylelint cache
    // Alternative: specify cache location
    // cacheLocation: join(CACHE_BASE_DIR, 'stylelint', '.stylelintcache'),
  },

  // Jest/Testing cache configuration
  jest: {
    cache: false, // Disable Jest cache
    cacheDirectory: join(CACHE_BASE_DIR, 'jest'),
  },

  // Next.js cache configuration (if used)
  nextjs: {
    distDir: 'dist', // Already excluded by .gitignore
    // Next.js-specific cache directories are automatically excluded
  },

  // Storybook cache configuration
  storybook: {
    cacheDir: join(CACHE_BASE_DIR, 'storybook'),
    // Storybook 7+ specific cache settings
    features: {
      buildCacheJson: false, // Disable build cache JSON
      storyStoreV7: false, // Use classic store to reduce caching
    },
  },

  // General development server cache configuration
  devServer: {
    // Disable HMR cache to prevent persistent files
    hmrCache: false,
    // Clear cache on server start
    clearCacheOnStart: true,
  },
};

// Utility function to apply cache configuration to Vite
export function configureViteCache(config = {}) {
  return {
    ...config,
    cacheDir: CACHE_CONFIG.vite.cacheDir,
    optimizeDeps: {
      ...config.optimizeDeps,
      ...CACHE_CONFIG.vite.optimizeDeps,
    },
    server: {
      ...config.server,
      ...CACHE_CONFIG.vite.server,
    },
    // Add cache breaking for development
    define: {
      ...config.define,
      // Force cache invalidation with timestamp
      'process.env.CACHE_BREAKER': JSON.stringify(Date.now()),
    },
  };
}

// Utility function to configure Rollup cache
export function configureRollupCache(config = {}) {
  return {
    ...config,
    cache: CACHE_CONFIG.rollup.cache,
    // Add plugins that respect cache settings
    plugins: (config.plugins || []).map(plugin => {
      // Configure plugins to use cache directory
      if (plugin.name === 'babel') {
        return {
          ...plugin,
          options: {
            ...plugin.options,
            cacheDirectory: false, // Disable Babel cache
          },
        };
      }
      return plugin;
    }),
  };
}

// Utility function to configure TypeScript cache
export function configureTypeScriptCache(config = {}) {
  return {
    ...config,
    compilerOptions: {
      ...config.compilerOptions,
      ...CACHE_CONFIG.typescript.compilerOptions,
    },
  };
}

// Utility function to create cache directory if needed
export function ensureCacheDirectory() {
  const fs = require('fs');
  if (!fs.existsSync(CACHE_BASE_DIR)) {
    fs.mkdirSync(CACHE_BASE_DIR, { recursive: true });
  }
  return CACHE_BASE_DIR;
}

// Export cache base directory for reference
export { CACHE_BASE_DIR };

// Default export with all configurations
export default CACHE_CONFIG;