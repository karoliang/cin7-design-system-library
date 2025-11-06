import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, Card, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Spinners are loading indicators that show that content is being processed or loaded. They provide visual feedback during asynchronous operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Spinner size',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    hasFocusableParent: {
      control: 'boolean',
      description: 'Whether spinner has a focusable parent element',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    accessibilityLabel: 'Loading content',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="small" accessibilityLabel="Small spinner" />
        <Text variant="bodySm" as="span">Small</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="medium" accessibilityLabel="Medium spinner" />
        <Text variant="bodySm" as="span">Medium</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="large" accessibilityLabel="Large spinner" />
        <Text variant="bodySm" as="span">Large</Text>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Spinner size="small" accessibilityLabel="Loading" />
        <Text as="span">Loading data...</Text>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Spinner size="medium" accessibilityLabel="Processing" />
        <Text as="span">Processing your request...</Text>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Spinner size="large" accessibilityLabel="Uploading" />
        <Text as="span">Uploading files to server...</Text>
      </div>
    </div>
  ),
};

export const InCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '800px' }}>
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Spinner size="small" accessibilityLabel="Loading widget" />
          <Text as="h3" variant="headingMd">Widget Loading</Text>
          <Text as="p" variant="bodySm" alignment="center">
            Please wait while we load your dashboard widgets...
          </Text>
        </div>
      </Card>

      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Spinner size="medium" accessibilityLabel="Processing data" />
          <Text as="h3" variant="headingMd">Processing Data</Text>
          <Text as="p" variant="bodySm" alignment="center">
            Analyzing your sales data and generating insights...
          </Text>
        </div>
      </Card>

      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Spinner size="large" accessibilityLabel="System initializing" />
          <Text as="h3" variant="headingMd">System Initializing</Text>
          <Text as="p" variant="bodySm" alignment="center">
            Setting up your workspace and loading configurations...
          </Text>
        </div>
      </Card>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success'>('idle');

    const simulateAction = async () => {
      setIsLoading(true);
      setLoadingState('loading');

      await new Promise(resolve => setTimeout(resolve, 3000));

      setLoadingState('success');
      setIsLoading(false);

      setTimeout(() => setLoadingState('idle'), 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        <Card sectioned>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {loadingState === 'loading' && (
              <>
                <Spinner size="medium" accessibilityLabel="Processing payment" />
                <Text as="p" variant="bodyMd">Processing payment...</Text>
              </>
            )}

            {loadingState === 'success' && (
              <Text as="p" variant="bodyMd">✅ Payment completed successfully!</Text>
            )}

            {loadingState === 'idle' && (
              <Text as="p" variant="bodyMd">Ready to process payment</Text>
            )}

            <Button
              onClick={simulateAction}
              disabled={isLoading}
              loading={isLoading}
            >
              {loadingState === 'loading' ? 'Processing...' : 'Process Payment'}
            </Button>
          </div>
        </Card>

        <Card sectioned>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {isLoading ? (
              <>
                <Spinner size="large" accessibilityLabel="Uploading files" />
                <Text as="p" variant="bodyMd">Uploading files to cloud storage...</Text>
              </>
            ) : (
              <>
                <Text as="p" variant="bodyMd">No files uploading</Text>
                <Button onClick={() => setIsLoading(true)}>Start Upload</Button>
              </>
            )}

            {isLoading && (
              <Button onClick={() => setIsLoading(false)} variant="plain">
                Cancel Upload
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  },
};

export const LoadingScenarios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      {/* Form Submission */}
      <Card>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Spinner size="small" accessibilityLabel="Saving form" />
          <div>
            <Text as="h4" variant="headingSm">Saving Changes</Text>
            <Text as="p" variant="bodySm">Your profile settings are being saved...</Text>
          </div>
        </div>
      </Card>

      {/* Data Loading */}
      <Card>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Spinner size="medium" accessibilityLabel="Loading analytics" />
          <div>
            <Text as="h4" variant="headingSm">Loading Analytics</Text>
            <Text as="p" variant="bodySm">Fetching your sales data and generating reports...</Text>
          </div>
        </div>
      </Card>

      {/* File Processing */}
      <Card>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Spinner size="large" accessibilityLabel="Processing import" />
          <div>
            <Text as="h4" variant="headingSm">Processing Import</Text>
            <Text as="p" variant="bodySm">Importing 250 products from CSV file...</Text>
          </div>
        </div>
      </Card>

      {/* System Maintenance */}
      <Card>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Spinner size="medium" accessibilityLabel="System maintenance" />
          <div>
            <Text as="h4" variant="headingSm">System Maintenance</Text>
            <Text as="p" variant="bodySm">Performing scheduled maintenance. This may take a few minutes...</Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const OverlaySpinners: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '600px' }}>
      {/* Small overlay */}
      <div style={{
        position: 'relative',
        height: '120px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text as="span">Small Content Area</Text>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          <Spinner size="small" accessibilityLabel="Loading content" />
        </div>
      </div>

      {/* Medium overlay */}
      <div style={{
        position: 'relative',
        height: '120px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text as="span">Medium Content Area</Text>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          <Spinner size="medium" accessibilityLabel="Loading content" />
        </div>
      </div>

      {/* Large overlay */}
      <div style={{
        position: 'relative',
        height: '200px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridColumn: 'span 2'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Text as="h3">Large Content Area</Text>
          <Text as="p">This section is currently loading...</Text>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          borderRadius: '8px'
        }}>
          <Spinner size="large" accessibilityLabel="Loading large content" />
          <Text as="p" variant="bodyMd">Loading large content...</Text>
        </div>
      </div>
    </div>
  ),
};

export const CenteredLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Full page loading */}
      <div style={{
        height: '200px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        <Spinner size="large" accessibilityLabel="Loading application" />
        <div style={{ textAlign: 'center' }}>
          <Text as="h3" variant="headingMd">Loading Application</Text>
          <Text as="p" variant="bodySm">Please wait while we set up your workspace...</Text>
        </div>
      </div>

      {/* Inline loading */}
      <div style={{
        height: '100px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        <Spinner size="medium" accessibilityLabel="Loading data" />
        <Text as="span">Loading customer data...</Text>
      </div>

      {/* Minimal loading */}
      <div style={{
        height: '60px',
        border: '1px solid #e1e3e5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spinner size="small" accessibilityLabel="Loading" />
      </div>
    </div>
  ),
};