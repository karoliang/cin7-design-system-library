/**
 * Vitest configuration for AG Charts adapter tests
 * Optimized for comprehensive testing with performance and accessibility validation
 */

import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Test environment configuration
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],

    // Test file patterns
    include: [
      'src/tests/**/*.{test,spec}.{js,ts,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      '.next',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/tests/**',
        'src/**/*.stories.tsx',
        'src/**/*.test.tsx',
        '**/*.d.ts',
        '**/*.config.*',
        'node_modules',
        'dist',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },

    // Performance testing configuration
    testTimeout: 10000, // 10 seconds for performance tests

    // Mock configuration
    clearMocks: true,
    restoreMocks: true,

    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results.json',
      html: './test-results/index.html',
    },

    // Global test configuration
    globals: true,
    watch: false,

    // Concurrency for performance testing
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 1,
      },
    },
  },

  // TypeScript configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@react': resolve(__dirname, 'src/react'),
      '@extjs': resolve(__dirname, 'src/extjs'),
      '@typescript': resolve(__dirname, 'src/typescript'),
      '@utilities': resolve(__dirname, 'src/utilities'),
      '@tests': resolve(__dirname, 'src/tests'),
    },
  },

  // Build configuration for tests
  esbuild: {
    target: 'es2020',
    sourcemap: true,
  },
});