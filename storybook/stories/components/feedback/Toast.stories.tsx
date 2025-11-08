import type { Meta, StoryObj } from '@storybook/react';
import { Toast, Button, Frame } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toasts are brief notifications that appear at the bottom of the screen to provide feedback on an action. They automatically dismiss after a short time or can be manually dismissed.',
      },
    },
    codeVariants: getCodeVariants('toast', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Toast message content',
    },
    action: {
      control: 'object',
      description: 'Action button configuration',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds (0 to disable)',
    },
    onDismiss: {
      action: 'onDismiss',
      description: 'Callback when toast is dismissed',
    },
    error: {
      control: 'boolean',
      description: 'Show toast as error message',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    return (
      <div style={{ height: '200px' }}>
        <Frame>
          <Button onClick={toggleActive}>Show Toast</Button>
          {active && (
            <Toast content="Message sent" onDismiss={toggleActive} />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'default'),
  },

};

export const StatusVariants: Story = {
  render: () => {
    const [successActive, setSuccessActive] = useState(false);
    const [infoActive, setInfoActive] = useState(false);
    const [warningActive, setWarningActive] = useState(false);
    const [errorActive, setErrorActive] = useState(false);

    return (
      <div style={{ height: '300px' }}>
        <Frame>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button onClick={() => setSuccessActive(true)}>Success</Button>
            <Button onClick={() => setInfoActive(true)}>Info</Button>
            <Button onClick={() => setWarningActive(true)}>Warning</Button>
            <Button onClick={() => setErrorActive(true)}>Error</Button>
          </div>

          {successActive && (
            <Toast
              content="Changes saved successfully"
              onDismiss={() => setSuccessActive(false)}
            />
          )}

          {infoActive && (
            <Toast
              content="New features are available"
              onDismiss={() => setInfoActive(false)}
            />
          )}

          {warningActive && (
            <Toast
              content="Please review your settings"
              onDismiss={() => setWarningActive(false)}
            />
          )}

          {errorActive && (
            <Toast
              content="Failed to save changes"
              error
              onDismiss={() => setErrorActive(false)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'default'),
  },

};

export const WithActions: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <div style={{ height: '200px' }}>
        <Frame>
          <Button onClick={() => setActive(true)}>Show Toast with Action</Button>
          {active && (
            <Toast
              content="Image uploaded successfully"
              action={{
                content: 'View image',
                onAction: () => console.log('View image clicked'),
              }}
              onDismiss={() => setActive(false)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'withAction'),
  },

};

export const CustomDuration: Story = {
  render: () => {
    const [quickActive, setQuickActive] = useState(false);
    const [slowActive, setSlowActive] = useState(false);
    const [persistentActive, setPersistentActive] = useState(false);

    return (
      <div style={{ height: '300px' }}>
        <Frame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button onClick={() => setQuickActive(true)}>Quick toast (2s)</Button>
            <Button onClick={() => setSlowActive(true)}>Slow toast (8s)</Button>
            <Button onClick={() => setPersistentActive(true)}>Persistent toast</Button>
          </div>

          {quickActive && (
            <Toast
              content="Quick notification"
              duration={2000}
              onDismiss={() => setQuickActive(false)}
            />
          )}

          {slowActive && (
            <Toast
              content="This will stay for 8 seconds"
              duration={8000}
              onDismiss={() => setSlowActive(false)}
            />
          )}

          {persistentActive && (
            <Toast
              content="This won't auto-dismiss"
              duration={0}
              action={{
                content: 'Dismiss',
                onAction: () => setPersistentActive(false),
              }}
              onDismiss={() => setPersistentActive(false)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'customDuration'),
  },

};

export const SequentialToasts: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([]);

    const addToast = useCallback((message: string) => {
      setMessages(prev => [...prev, message]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setMessages(prev => prev.slice(1));
      }, 3000);
    }, []);

    return (
      <div style={{ height: '300px' }}>
        <Frame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button onClick={() => addToast('Order #1001 created')}>Create Order</Button>
            <Button onClick={() => addToast('Payment processed')}>Process Payment</Button>
            <Button onClick={() => addToast('Shipping label generated')}>Generate Label</Button>
            <Button onClick={() => addToast('Customer notified')}>Notify Customer</Button>
          </div>

          <div style={{ marginTop: '16px', fontSize: "14px", color: '#637381' }}>
            Active messages: {messages.length}
          </div>

          {messages.map((message, index) => (
            <Toast
              key={`${message}-${index}`}
              content={message}
              onDismiss={() => {
                setMessages(prev => prev.filter(m => m !== message));
              }}
            />
          ))}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'default'),
  },

};

export const ErrorHandling: Story = {
  render: () => {
    const [networkError, setNetworkError] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [permissionError, setPermissionError] = useState(false);

    return (
      <div style={{ height: '300px' }}>
        <Frame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button onClick={() => setNetworkError(true)}>Simulate Network Error</Button>
            <Button onClick={() => setValidationError(true)}>Simulate Validation Error</Button>
            <Button onClick={() => setPermissionError(true)}>Simulate Permission Error</Button>
          </div>

          {networkError && (
            <Toast
              content="Failed to connect to server. Please check your internet connection."
              error
              action={{
                content: 'Retry',
                onAction: () => {
                  setNetworkError(false);
                  console.log('Retrying...');
                },
              }}
              onDismiss={() => setNetworkError(false)}
            />
          )}

          {validationError && (
            <Toast
              content="Please fill in all required fields before submitting."
              error
              onDismiss={() => setValidationError(false)}
            />
          )}

          {permissionError && (
            <Toast
              content="You don't have permission to perform this action."
              error
              action={{
                content: 'Contact admin',
                onAction: () => console.log('Contact admin'),
              }}
              onDismiss={() => setPermissionError(false)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'error'),
  },

};

export const RealWorldScenarios: Story = {
  render: () => {
    const [activeToast, setActiveToast] = useState<string | null>(null);

    const scenarios = {
      save: 'All changes have been saved successfully',
      upload: 'File uploaded successfully (2.4 MB)',
      delete: 'Item moved to trash',
      copy: 'Link copied to clipboard',
      export: 'Report exported to CSV',
      sync: 'Data synchronized with cloud',
      invite: 'Invitation sent to team member',
      update: 'Profile updated successfully',
    };

    const showToast = (scenario: keyof typeof scenarios) => {
      setActiveToast(scenarios[scenario]);
      setTimeout(() => setActiveToast(null), 4000);
    };

    return (
      <div style={{ height: '400px' }}>
        <Frame>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
            <Button onClick={() => showToast('save')}>💾 Save Changes</Button>
            <Button onClick={() => showToast('upload')}>📁 Upload File</Button>
            <Button onClick={() => showToast('delete')}>🗑️ Delete Item</Button>
            <Button onClick={() => showToast('copy')}>📋 Copy Link</Button>
            <Button onClick={() => showToast('export')}>📊 Export Report</Button>
            <Button onClick={() => showToast('sync')}>🔄 Sync Data</Button>
            <Button onClick={() => showToast('invite')}>👥 Send Invite</Button>
            <Button onClick={() => showToast('update')}>✏️ Update Profile</Button>
          </div>

          {activeToast && (
            <Toast
              content={activeToast}
              onDismiss={() => setActiveToast(null)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'default'),
  },

};

export const InteractiveDemo: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const simulateUpload = async () => {
      setIsUploading(true);
      setUploadProgress(0);

      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      setIsUploading(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setUploadProgress(0);
      }, 3000);
    };

    return (
      <div style={{ height: '300px' }}>
        <Frame>
          <Button
            onClick={simulateUpload}
            disabled={isUploading}
          >
            {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload File'}
          </Button>

          {isUploading && (
            <Toast
              content={`Uploading file... ${uploadProgress}%`}
              duration={0}
            />
          )}

          {showSuccess && (
            <Toast
              content="File uploaded successfully!"
              action={{
                content: 'View file',
                onAction: () => console.log('View uploaded file'),
              }}
              onDismiss={() => setShowSuccess(false)}
            />
          )}
        </Frame>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('toast', 'default'),
  },

};