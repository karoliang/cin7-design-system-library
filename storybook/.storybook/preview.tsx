import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Cin7 DSL',
          [
            'Introduction',
            'Foundations',
            'UI Patterns',
            'Business Logic',
            'UI Interactions',
            'Enterprise Components',
            'Real-World Applications',
            'Data Visualization',
          ],
          'Components',
          'Charts',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <AppProvider i18n={enTranslations}>
        <Story />
      </AppProvider>
    ),
  ],
};

export default preview;