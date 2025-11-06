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
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Semantic Colors */
  --color-success-50: #f0fdf4;
  --color-success-400: #34d399;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-warning-50: #fff3e0;
  --color-warning-400: #fbbf24;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  --color-critical-50: #fef2f2;
  --color-critical-400: #f87171;
  --color-critical-500: #ef4444;
  --color-critical-600: #dc2626;
  --color-critical-700: #b91c1c;

  /* Spacing */
  --spacing-half: 2px;
  --spacing-1: 4px;
  --spacing-1-5: 6px;
  --spacing-2: 8px;
  --spacing-2-5: 10px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-25: 100px;

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
  --border-radius-xs: 3px;
  --border-radius-base: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
  --border-radius-3xl: 10px;
  --border-radius-xl: 12px;
  --border-radius-2xl: 16px;
  --border-radius-full: 9999px;

  /* Brand Colors */
  --color-brand-primary: #007ace;
  --color-brand-secondary: #5c6ac4;
  --color-brand-tertiary: #47c1bf;
  --color-brand-accent: #955ba5;

  /* Info Colors */
  --color-info-50: #eff6ff;
  --color-info-100: #dbeafe;
  --color-info-500: #3b82f6;

  /* Social Media Colors */
  --color-social-facebook: #1877f2;
  --color-social-twitter: #1da1f2;
  --color-social-linkedin: #0077b5;

  /* File Type Colors */
  --color-file-pdf: #d72c0d;
  --color-file-excel: #2a6f3a;
  --color-file-powerpoint: #e4930d;
  --color-file-image: #6f42c1;

  /* Neutral Colors */
  --color-white: #ffffff;
  --color-black: #000000;

  /* Opacity Tokens */
  --opacity-full: 1;
  --opacity-high: 0.9;
  --opacity-medium: 0.8;
  --opacity-low: 0.6;
  --opacity-very-low: 0.3;
  --opacity-disabled: 0.5;

  /* Box Shadow Tokens */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-base: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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
  text-transform: none !important;
  letter-spacing: normal !important;
}

.sbdocs h1 { font-size: var(--font-size-4xl); }
.sbdocs h2 { font-size: var(--font-size-3xl); }
.sbdocs h3 { font-size: var(--font-size-2xl); }
.sbdocs h4 { font-size: var(--font-size-xl); }
.sbdocs h5 { font-size: var(--font-size-lg); }
.sbdocs h6 { font-size: var(--font-size-base); }

/* Override Storybook's default uppercase section labels and anchors */
.sb-anchor,
.sbdocs .sb-anchor,
.docs-story h2,
h2[class*="sb-"],
.sbdocs-h2,
.sbdocs *[class*="heading"],
.sbdocs *[class*="title"] {
  text-transform: none !important;
  letter-spacing: normal !important;
}

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