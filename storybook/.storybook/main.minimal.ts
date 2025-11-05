import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../stories/test-*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/foundation/components/DesignTokens.stories.tsx",
    "../stories/polaris/components/Button.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: 'localhost',
      allowedHosts: ['localhost', '127.0.0.1']
    };
    return config;
  },
};

export default config;