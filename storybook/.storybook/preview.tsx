import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

// CRITICAL FIX: Error boundary for component debugging
class StorybookErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Storybook Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          border: '2px solid red',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          color: '#d32f2f',
          fontFamily: 'monospace'
        }}>
          <h3>🚨 Component Error</h3>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <p><strong>Stack:</strong></p>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

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
      <StorybookErrorBoundary>
        <AppProvider
          i18n={enTranslations}
          // CRITICAL FIX: Complete theme provider for complex components
          theme={{
            colors: {
              surface: '#ffffff',
              onSurface: '#202223',
              interactive: '#202223',
              decorative: '#d2d5d9',
              subText: '#6d7175',
              border: '#c4c7ca',
              background: '#ffffff',
              backgroundHovered: '#f9f9f9',
              backgroundPressed: '#f3f3f3',
              backgroundSelected: '#eef1ff',
              borderHovered: '#c4c7ca',
              borderDisabled: '#eeeff2',
              shadow: 'rgba(0, 0, 0, 0.1)',
              icon: '#5c6ac4',
              iconDisabled: '#919eab',
              iconOnSurface: '#5c6ac4',
              text: '#202223',
              textDisabled: '#919eab',
              textOnSurface: '#202223',
              critical: '#de3618',
              warning: '#bf8800',
              highlight: '#007ace',
              success: '#2b6a30',
              primary: '#5c6ac4',
              secondary: '#17212c',
            },
          }}
        >
          {/* STANDARD: Use minimal wrapper for standard Storybook behavior */}
          <div style={{ width: '100%' }}>
            <Story />
          </div>
        </AppProvider>
      </StorybookErrorBoundary>
    ),
  ],
};

export default preview;