import type { StorybookConfig } from '@storybook/react-vite';
import type { Preview } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Core story structure
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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
    return config;
  },
};

export default config;