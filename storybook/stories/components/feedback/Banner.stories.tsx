import type { Meta, StoryObj } from '@storybook/react';
import { Banner, Button, Text } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Banners display prominent messages and related actions. They\'re used for notifications, alerts, and important information that users need to be aware of.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Banner title heading',
    },
    children: {
      control: 'text',
      description: 'Banner content message',
    },
    status: {
      control: 'select',
      options: ['success', 'info', 'warning', 'critical'],
      description: 'Banner status tone and icon',
    },
    action: {
      control: 'object',
      description: 'Primary action button configuration',
    },
    secondaryAction: {
      control: 'object',
      description: 'Secondary action button configuration',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button to close banner',
    },
    stopAnnouncements: {
      control: 'boolean',
      description: 'Stop screen reader announcements',
    },
    onDismiss: {
      action: 'onDismiss',
      description: 'Callback when banner is dismissed',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Order completed',
    children: 'Your order #1001 has been successfully processed and will be shipped within 2 business days.',
  },
  parameters: {
    codeVariants: getCodeVariants('banner', 'default'),
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Banner
        title="Success"
        status="success"
        dismissible
      >
        Payment was processed successfully. Order confirmation has been sent to your email.
      </Banner>

      <Banner
        title="Information"
        status="info"
        dismissible
      >
        New features have been added to your dashboard. Check out the latest updates.
      </Banner>

      <Banner
        title="Warning"
        status="warning"
        dismissible
      >
        Your subscription will expire in 3 days. Renew now to avoid interruption.
      </Banner>

      <Banner
        title="Critical Error"
        status="critical"
        dismissible
      >
        Payment method declined. Please update your billing information to continue service.
      </Banner>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('banner', 'status-variants'),
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Banner
        title="Update available"
        status="info"
        action={{
          content: 'Update now',
          onAction: () => console.log('Update clicked'),
        }}
        secondaryAction={{
          content: 'Learn more',
          onAction: () => console.log('Learn more clicked'),
        }}
      >
        A new version of the application is available with improved features and bug fixes.
      </Banner>

      <Banner
        title="Payment required"
        status="critical"
        action={{
          content: 'Update payment',
          onAction: () => console.log('Payment clicked'),
        }}
      >
        Your payment method has expired. Please update your billing information to continue using our services.
      </Banner>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('banner', 'with-actions'),
  },
};

export const DismissibleBanners: Story = {
  render: () => {
    const [banners, setBanners] = React.useState([
      {
        id: 1,
        title: 'Welcome to the dashboard',
        status: 'info' as const,
        content: 'This is your first time here. Take a quick tour to get started.',
        visible: true,
      },
      {
        id: 2,
        title: 'Security notice',
        status: 'warning' as const,
        content: 'We detected a login from a new device. If this wasn\'t you, please secure your account.',
        visible: true,
      },
      {
        id: 3,
        title: 'Feature available',
        status: 'success' as const,
        content: 'Advanced analytics are now available for your account.',
        visible: true,
      },
    ]);

    const handleDismiss = (id: number) => {
      setBanners(prev => prev.map(banner =>
        banner.id === id ? { ...banner, visible: false } : banner
      ));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        {banners.filter(banner => banner.visible).map(banner => (
          <Banner
            key={banner.id}
            title={banner.title}
            status={banner.status}
            dismissible
            onDismiss={() => handleDismiss(banner.id)}
          >
            {banner.content}
          </Banner>
        ))}

        {banners.every(banner => !banner.visible) && (
          <div style={{ padding: '16px', textAlign: 'center', color: '#637381' }}>
            All banners have been dismissed. Refresh to see them again.
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('banner', 'dismissible'),
  },
};

export const RealWorldScenarios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Banner
        title="Order processing"
        status="info"
        action={{
          content: 'Track order',
          onAction: () => console.log('Track order'),
        }}
      >
        Your order #1001 is being processed. You will receive a notification when it ships.
      </Banner>

      <Banner
        title="Inventory alert"
        status="warning"
        action={{
          content: 'View inventory',
          onAction: () => console.log('View inventory'),
        }}
        secondaryAction={{
          content: 'Set restock alert',
          onAction: () => console.log('Set alert'),
        }}
      >
        5 items are running low on stock. Consider restocking soon to avoid fulfillment delays.
      </Banner>

      <Banner
        title="Integration successful"
        status="success"
        dismissible
      >
        Your Shopify store has been successfully connected. Product sync will begin automatically.
      </Banner>

      <Banner
        title="API rate limit exceeded"
        status="critical"
        action={{
          content: 'Upgrade plan',
          onAction: () => console.log('Upgrade plan'),
        }}
        secondaryAction={{
          content: 'View usage',
          onAction: () => console.log('View usage'),
        }}
      >
        You\'ve exceeded your API quota. Upgrade your plan or wait for the limit to reset.
      </Banner>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('banner', 'real-world'),
  },
};

export const MinimalBanners: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Banner status="success">
        Changes saved successfully
      </Banner>

      <Banner status="info">
        New features available in settings
      </Banner>

      <Banner status="warning">
        Connection lost. Retrying...
      </Banner>

      <Banner status="critical">
        Failed to save changes. Please try again.
      </Banner>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('banner', 'minimal'),
  },
};

export const InteractiveBanner: Story = {
  render: () => {
    const [showBanner, setShowBanner] = React.useState(true);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleAction = async () => {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowBanner(false);
      setTimeout(() => {
        setShowBanner(true);
        setIsProcessing(false);
      }, 1000);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        {showBanner && (
          <Banner
            title="Action required"
            status="warning"
            action={{
              content: isProcessing ? 'Processing...' : 'Complete action',
              onAction: handleAction,
              loading: isProcessing,
              disabled: isProcessing,
            }}
            dismissible={!isProcessing}
            onDismiss={() => setShowBanner(false)}
          >
            Please complete the required action to continue using this feature.
          </Banner>
        )}

        {!showBanner && (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Button onClick={() => setShowBanner(true)}>Show banner again</Button>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('banner', 'interactive'),
  },
};

export const BannersWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Banner
        title="🚀 Performance improved"
        status="success"
        dismissible
      >
        Your store is now loading 40% faster after recent optimizations.
      </Banner>

      <Banner
        title="🔒 Security update"
        status="info"
        action={{
          content: 'Review changes',
          onAction: () => console.log('Review security'),
        }}
      >
        New security features have been added to protect your account.
      </Banner>

      <Banner
        title="⚠️ Storage almost full"
        status="warning"
        action={{
          content: 'Manage storage',
          onAction: () => console.log('Manage storage'),
        }}
      >
        You're using 90% of your storage capacity. Consider upgrading or removing unused files.
      </Banner>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('banner', 'with-icons'),
  },
};