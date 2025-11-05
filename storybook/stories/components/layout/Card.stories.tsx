import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button, Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/Card',
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
};