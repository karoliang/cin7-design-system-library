import type { Preview } from '@storybook/react';
import React from 'react';
import { AppProvider } from '@shopify/polaris';

// Enhanced design token styles with consistent typography
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
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Typography System - Storybook Global */
  --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  /* Font Sizes - Using CSS modular scale */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;
  --font-size-6xl: 56px;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Border Radius */
  --border-radius-sm: 2px;
  --border-radius-base: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
  --border-radius-xl: 12px;
  --border-radius-2xl: 16px;
  --border-radius-full: 9999px;
}

/* Global typography base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-900);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Consistent heading styles */
.sbdocs h1,
.sbdocs h2,
.sbdocs h3,
.sbdocs h4,
.sbdocs h5,
.sbdocs h6 {
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-gray-900);
  margin: 0;
}

.sbdocs h1 { font-size: var(--font-size-4xl); }
.sbdocs h2 { font-size: var(--font-size-3xl); }
.sbdocs h3 { font-size: var(--font-size-2xl); }
.sbdocs h4 { font-size: var(--font-size-xl); }
.sbdocs h5 { font-size: var(--font-size-lg); }
.sbdocs h6 { font-size: var(--font-size-base); }

/* Story content area typography */
.sbdocs-content {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-900);
}

.sbdocs-content p {
  margin-bottom: var(--spacing-4);
}

.sbdocs-content strong {
  font-weight: var(--font-weight-semibold);
}

.sbdocs-content code {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  background-color: var(--color-gray-100);
  padding: 2px 4px;
  border-radius: var(--border-radius-sm);
  font-size: 0.875em;
}

/* Fix hardcoded font sizes in stories */
.story-wrapper {
  font-family: var(--font-family-sans) !important;
}

/* Allow stories to set their own font sizes - removed aggressive override */
.story-wrapper [style*="font-size"] {
  /* Removed font-size: inherit !important; to allow story-specific sizing */
}

/* Icon size utilities */
.icon-xs { font-size: var(--font-size-sm) !important; }
.icon-sm { font-size: var(--font-size-base) !important; }
.icon-md { font-size: var(--font-size-lg) !important; }
.icon-lg { font-size: var(--font-size-2xl) !important; }
.icon-xl { font-size: var(--font-size-3xl) !important; }
.icon-2xl { font-size: var(--font-size-4xl) !important; }
.icon-3xl { font-size: var(--font-size-5xl) !important; }
`;

// Inject design token styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = designTokenStyles;
  document.head.appendChild(style);
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppProvider i18n={{}}>
        <div className="story-wrapper" style={{ fontFamily: "var(--font-family-sans)", fontSize: "16px", lineHeight: "1.5" }}>
          <Story />
        </div>
      </AppProvider>
    ),
  ],
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