import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // More targeted story patterns for better performance
    "../stories/foundation/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/polaris/components/!(AdminComponents|FormComponents|DataManagement)*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/charts/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/guides/!(RealWorldExamples|DSLAitecture)*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  docs: {
    autodocs: false, // Disable for performance
    toc: false,
  },
  features: {
    storyStoreV7: true,
    babelModeV7: true,
    previewMdx2: false, // Disable for performance
  },
  env: (config) => ({
    ...config,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CIN7_THEME: process.env.CIN7_THEME || 'light',
  }),
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: 'localhost',
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0']
    };

    // Critical performance optimizations
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        'react',
        'react-dom',
        '@shopify/polaris',
        '@shopify/polaris-icons'
      ],
      exclude: ['@cin7/core', '@cin7/design-tokens', '@cin7/highcharts-adapter']
    };

    config.build = {
      ...config.build,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn: (warning, warn) => {
          // Suppress warnings that cause infinite reloads
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          if (warning.message.includes('dynamic import')) return;
          if (warning.message.includes('Circular dependency')) return;
          warn(warning);
        },
        maxParallelFileOps: 5, // Limit parallel operations
        treeshake: 'smallest' // Aggressive tree shaking
      }
    };

    // Prevent infinite reloads
    config.server = {
      ...config.server,
      watch: {
        ...config.server?.watch,
        usePolling: false,
        interval: 2000, // Slower watching
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/.git/**',
          '**/stories/**/backup/**',
          '**/*.backup'
        ]
      }
    };

    // Memory optimization
    config.server.hmr = {
      ...config.server?.hmr,
      overlay: false // Disable HMR overlay for performance
    };

    return config;
  },
};

export default config;