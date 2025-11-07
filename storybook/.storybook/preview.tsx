import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <AppProvider i18n={{}}>
        <Story />
      </AppProvider>
    ),
  ],
};

export default preview;