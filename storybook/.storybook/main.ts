import type { StorybookConfig } from '@storybook/react-vite';
import type { Preview } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Core story structure
    "./stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      // Enhanced builder options for enterprise scale
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  docs: {
    autodocs: true,
    // Enhanced docs configuration for Cin7 DSL
    toc: true,
  },
  features: {
    // Enable modern Storybook features for enterprise
    storyStoreV7: true,
    babelModeV7: true,
    // Enhanced mode switching for multiple themes
    previewMdx2: true,
  },
  // Environment configuration for multi-package support
  env: (config) => ({
    ...config,
    NODE_ENV: process.env.NODE_ENV || 'development',
    // Enable design token environment variables
    CIN7_THEME: process.env.CIN7_THEME || 'light',
  }),
  // Vite configuration for handling complex workspace dependencies
  viteFinal: async (config) => {
    // Fix hostname detection issues for Storybook
    config.server = {
      ...config.server,
      host: 'localhost',
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0']
    };

    // Configure Vite optimizeDeps to handle workspace packages
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        '@cin7/core',
        '@cin7/design-tokens',
        '@cin7/vanilla-js',
        '@cin7/typescript-sdk',
        '@cin7/extjs-adapters',
        '@cin7/polaris-adapter',
        '@cin7/highcharts-adapter'
      ]
    };

    // Add support for workspace packages with proper aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@cin7/core': new URL('../../packages/core/src', import.meta.url).pathname,
      '@cin7/design-tokens': new URL('../../packages/design-tokens/src', import.meta.url).pathname,
      '@cin7/vanilla-js': new URL('../../packages/vanilla-js/src', import.meta.url).pathname,
      '@cin7/typescript-sdk': new URL('../../packages/typescript-sdk/src', import.meta.url).pathname,
      '@cin7/extjs-adapters': new URL('../../packages/extjs-adapters/src', import.meta.url).pathname,
      '@cin7/polaris-adapter': new URL('../../packages/polaris-adapter/src', import.meta.url).pathname,
      '@cin7/highcharts-adapter': new URL('../../packages/highcharts-adapter/src', import.meta.url).pathname,
    };
    return config;
  },
};

export default config;