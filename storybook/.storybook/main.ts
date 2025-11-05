import type { StorybookConfig } from '@storybook/react-vite';
import type { Preview } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Core story structure
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Include stories from all packages
    "../../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Foundation patterns
    "../../packages/core/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../packages/design-tokens/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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
    // Add support for workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@cin7/core': '/../../packages/core/src',
      '@cin7/design-tokens': '/../../packages/design-tokens/src',
      '@cin7/vanilla-js': '/../../packages/vanilla-js/src',
      '@cin7/typescript-sdk': '/../../packages/typescript-sdk/src',
      '@cin7/extjs-adapters': '/../../packages/extjs-adapters/src',
      '@cin7/polaris-adapter': '/../../packages/polaris-adapter/src',
      '@cin7/highcharts-adapter': '/../../packages/highcharts-adapter/src',
    };
    return config;
  },
};

export default config;