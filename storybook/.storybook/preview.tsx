import type { Preview } from '@storybook/react';
import React from 'react';
import { AppProvider } from '@shopify/polaris';

// Inline design token styles for now
const designTokenStyles = `
:root {
  /* Primary Colors */
  --color-primary-500: #006fbb;
  --color-primary-600: #005a9a;
  --color-primary-700: #004578;

  /* Gray Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;

  /* Semantic Colors */
  --color-success-500: #10b981;
  --color-warning-500: #f59e0b;
  --color-critical-500: #ef4444;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-1: 12px;
  --font-size-2: 14px;
  --font-size-3: 16px;
  --font-size-4: 18px;
  --font-size-5: 20px;
  --font-size-6: 24px;
  --font-size-7: 32px;
  --font-size-8: 40px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-1: 1.25;
  --line-height-2: 1.5;
  --line-height-3: 1.75;
  --line-height-4: 2;

  /* Border Radius */
  --border-radius-2: 2px;
  --border-radius-4: 4px;
  --border-radius-6: 6px;
  --border-radius-8: 8px;
}
`;

// Inject design token styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = designTokenStyles;
  document.head.appendChild(style);
}

const preview: Preview = {
  decorators: [],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Foundation',
          ['Design Tokens', 'Core Utilities', 'Patterns'],
          'Components',
          ['Vanilla JS', 'Polaris React', 'ExtJS Enterprise'],
          'Business Logic',
          ['TypeScript SDK', 'Repository Patterns', 'Use Cases'],
          'Data Visualization',
          ['Charts', 'Data Integration'],
          'Integration',
          ['Cross-Layer', 'Real World Examples'],
        ],
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        large: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Design theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'cin7-corporate', title: 'Cin7 Corporate' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;