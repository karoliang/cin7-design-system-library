import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button, Text } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cards are flexible containers that group related content and actions together. They provide structure and hierarchy to your interface.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
    sectioned: {
      control: 'boolean',
      description: 'Add sectioning to card content',
    },
    background: {
      control: 'select',
      options: ['none', 'surface', 'surface subdued'],
      description: 'Card background style',
    },
    padding: {
      control: 'select',
      options: ['none', 'x', 'y', 'block'],
      description: 'Card padding',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Order #1001
      </Text>
      <Text as="p" variant="bodyMd">
        This order has been successfully processed and is ready for shipping.
      </Text>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'default'),
  },
};

export const WithActions: Story = {
  render: () => (
    <Card
      title="Customer Information"
      sectioned
      actions={[
        { content: 'Edit customer' },
        { content: 'View orders' },
      ]}
    >
      <Text as="p" variant="bodyMd">
        John Doe<br />
        john.doe@example.com<br />
        (555) 123-4567
      </Text>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-header-actions'),
  },
};

export const WithoutSection: Story = {
  render: () => (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text as="h3" variant="headingMd">
          Quick Stats
        </Text>
        <Text as="p" variant="bodyMd">
          Total revenue: $12,345<br />
          Orders this month: 45
        </Text>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-separate-header'),
  },
};

export const WithBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card background="surface" sectioned>
        <Text as="h3" variant="headingMd">
          Surface Background
        </Text>
        <Text as="p" variant="bodyMd">
          Subtle background styling
        </Text>
      </Card>

      <Card background="surface subdued" sectioned>
        <Text as="h3" variant="headingMd">
          Surface Subdued
        </Text>
        <Text as="p" variant="bodyMd">
          Even more subtle background
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-subdued-background'),
  },
};

export const InteractiveCard: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <Card
        title="Order Details"
        sectioned
        actions={[
          {
            content: isExpanded ? 'Show less' : 'Show more',
            onAction: () => setIsExpanded(!isExpanded)
          }
        ]}
      >
        <Text as="p" variant="bodyMd">
          Order #1001 placed on November 5, 2025
        </Text>

        {isExpanded && (
          <div style={{ marginTop: '16px' }}>
            <Text as="h4" variant="headingSm">
              Items in this order
            </Text>
            <Text as="p" variant="bodySm">
              • Premium Widget (x2) - $49.99<br />
              • Standard Widget (x1) - $29.99<br />
              • Widget Accessories (x3) - $14.99
            </Text>

            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <Button size="small">Track order</Button>
              <Button size="small" variant="plain">Print receipt</Button>
            </div>
          </div>
        )}
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('card', 'with-all-elements'),
  },
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', maxWidth: '900px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingMd">
          📊 Sales Dashboard
        </Text>
        <Text as="p" variant="bodyMd">
          View your sales performance and analytics.
        </Text>
        <div style={{ marginTop: '12px' }}>
          <Button size="small">View Dashboard</Button>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingMd">
          👥 Customer Management
        </Text>
        <Text as="p" variant="bodyMd">
          Manage customer profiles and preferences.
        </Text>
        <div style={{ marginTop: '12px' }}>
          <Button size="small">Manage Customers</Button>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingMd">
          📦 Inventory Tracking
        </Text>
        <Text as="p" variant="bodyMd">
          Monitor stock levels and product availability.
        </Text>
        <div style={{ marginTop: '12px' }}>
          <Button size="small">Check Inventory</Button>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-multiple-titled-sections'),
  },
};

export const StatusCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <Card background="surface" sectioned>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text as="h3" variant="headingMd">
            ✅ Order Completed
          </Text>
          <Button size="small" variant="plain">
            View Details
          </Button>
        </div>
        <Text as="p" variant="bodySm">
          Order #1001 has been successfully processed and shipped.
        </Text>
      </Card>

      <Card background="surface subdued" sectioned>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text as="h3" variant="headingMd">
            ⏳ Processing Order
          </Text>
          <Button size="small" variant="plain">
            Track Status
          </Button>
        </div>
        <Text as="p" variant="bodySm">
          Order #1002 is currently being processed.
        </Text>
      </Card>

      <Card sectioned>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text as="h3" variant="headingMd">
            ⚠️ Payment Required
          </Text>
          <Button size="small">
            Complete Payment
          </Button>
        </div>
        <Text as="p" variant="bodySm">
          Order #1003 requires payment confirmation.
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-sections-and-actions'),
  },
};

export const WithFooterActions: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Shipment #1234
      </Text>
      <Text as="p" variant="bodyMd">
        2 items ready to ship
      </Text>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button>Fulfill items</Button>
        <Button variant="primary">Create shipping label</Button>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-footer-actions'),
  },
};

export const WithCriticalAction: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Subscription Warning
      </Text>
      <Text as="p" variant="bodyMd">
        Your subscription will expire in 3 days. Renew now to avoid service interruption.
      </Text>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button tone="critical">Cancel subscription</Button>
        <Button variant="primary">Renew now</Button>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-critical-footer-actions'),
  },
};

export const WithCustomFooter: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Enable Two-Factor Authentication
      </Text>
      <Text as="p" variant="bodyMd">
        Protect your account with an additional layer of security.
      </Text>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button>Enable 2FA</Button>
        <Button variant="plain">Learn more</Button>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-custom-footer-actions'),
  },
};

export const WithHeaderIcon: Story = {
  render: () => (
    <Card
      sectioned
      title="Product Variants"
      actions={[
        { content: 'Add variant', icon: 'plus' as any }
      ]}
    >
      <Text as="p" variant="bodyMd">
        Add variants if this product comes in multiple versions, like different sizes or colors.
      </Text>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-header-icon-actions'),
  },
};

export const WithMultipleFooterActions: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Review Changes
      </Text>
      <Text as="p" variant="bodyMd">
        Please review all changes before publishing.
      </Text>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        <Button variant="plain">Cancel</Button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button>Save as draft</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-multiple-footer-actions'),
  },
};

export const WithFlushedSection: Story = {
  render: () => (
    <Card>
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <Text as="h2" variant="headingMd">
          Order Summary
        </Text>
      </div>
      <div style={{ padding: '16px' }}>
        <Text as="p" variant="bodyMd">
          Subtotal: $299.99
        </Text>
        <Text as="p" variant="bodyMd">
          Shipping: $10.00
        </Text>
        <Text as="p" variant="bodyMd" fontWeight="bold">
          Total: $309.99
        </Text>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-flushed-section'),
  },
};

export const WithSubsection: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Product Details
      </Text>
      <div style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid #e0e0e0' }}>
        <Text as="h3" variant="headingSm">
          Specifications
        </Text>
        <Text as="p" variant="bodySm">
          Material: Cotton<br />
          Color: Blue<br />
          Size: Large
        </Text>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-subsection'),
  },
};

export const WithSectionsAndCriticalAction: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h2" variant="headingMd">
        Delete Product
      </Text>
      <Text as="p" variant="bodyMd">
        This action cannot be undone. All product data will be permanently removed.
      </Text>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button>Cancel</Button>
        <Button variant="primary" tone="critical">Delete product</Button>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-sections-and-critical-action'),
  },
};

export const WithCustomTitle: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>🎉</span>
        <Text as="h2" variant="headingMd">
          Welcome to Your Dashboard
        </Text>
      </div>
      <Text as="p" variant="bodyMd">
        Get started by exploring the features available to you.
      </Text>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-custom-react-node-title'),
  },
};

export const WithMultipleSections: Story = {
  render: () => (
    <Card>
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <Text as="h3" variant="headingMd">
          Section 1: Overview
        </Text>
        <Text as="p" variant="bodyMd">
          Basic information about your store.
        </Text>
      </div>
      <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
        <Text as="h3" variant="headingMd">
          Section 2: Performance
        </Text>
        <Text as="p" variant="bodyMd">
          Key metrics and analytics.
        </Text>
      </div>
      <div style={{ padding: '16px' }}>
        <Text as="h3" variant="headingMd">
          Section 3: Actions
        </Text>
        <Button size="small">View full report</Button>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-multiple-sections'),
  },
};

export const WithSubduedSection: Story = {
  render: () => (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text as="h2" variant="headingMd">
          Active Staff Accounts
        </Text>
        <Text as="p" variant="bodyMd">
          John Doe, Jane Smith, Bob Wilson
        </Text>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
        <Text as="h3" variant="headingSm">
          Deactivated Accounts
        </Text>
        <Text as="p" variant="bodySm">
          Felix Crafford, Ezequiel Manno
        </Text>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-subdued-section'),
  },
};

export const WithResponsiveBorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingMd">
          Default Radius
        </Text>
        <Text as="p" variant="bodyMd">
          Standard card with default border radius.
        </Text>
      </Card>
      <Card sectioned background="surface">
        <Text as="h3" variant="headingMd">
          Surface Card
        </Text>
        <Text as="p" variant="bodyMd">
          Subtle background with rounded corners.
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('card', 'with-responsive-border-radius'),
  },
};