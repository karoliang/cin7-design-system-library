import type { Meta, StoryObj } from '@storybook/react';
import { BlockStack, Card, Button, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Layout/BlockStack',
  component: BlockStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BlockStack arranges child elements vertically with consistent spacing. It\'s the modern replacement for the legacy Stack component and provides a simple way to create vertical layouts with proper spacing between elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Spacing between stack items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      description: 'Horizontal alignment of items',
    },
    inlineAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Inline alignment for text content',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof BlockStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BlockStack gap="400">
      <Text as="h2" variant="headingMd">Order Information</Text>
      <Text as="p">Customer: John Doe</Text>
      <Text as="p">Order #1001</Text>
      <Text as="p">Status: Processing</Text>
    </BlockStack>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">None</Text>
        <BlockStack gap="none">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Tight</Text>
        <BlockStack gap="100">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Tight</Text>
        <BlockStack gap="200">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Base</Text>
        <BlockStack gap="400">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Loose</Text>
        <BlockStack gap="500">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Loose</Text>
        <BlockStack gap="800">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Start (Default)</Text>
        <BlockStack gap="400" align="start">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="plain">Tertiary Action</Button>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Center</Text>
        <BlockStack gap="400" align="center">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="plain">Tertiary Action</Button>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">End</Text>
        <BlockStack gap="400" align="end">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="plain">Tertiary Action</Button>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Space Between</Text>
        <BlockStack gap="400" align="space-between">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="primary">Save</Button>
            <Button variant="critical">Delete</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="plain">Cancel</Button>
            <Button variant="secondary">Edit</Button>
          </div>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Card sectioned>
      <BlockStack gap="500">
        <Text as="h2" variant="headingMd">Customer Information</Text>

        <BlockStack gap="400">
          <Text as="h3" variant="headingSm">Personal Details</Text>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">First Name Input Field</Text>
          </div>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Last Name Input Field</Text>
          </div>
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h3" variant="headingSm">Contact Information</Text>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Email Input Field</Text>
          </div>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Phone Input Field</Text>
          </div>
        </BlockStack>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <Button variant="primary">Save Customer</Button>
          <Button variant="plain">Cancel</Button>
        </div>
      </BlockStack>
    </Card>
  ),
};

export const CardList: Story = {
  render: () => (
    <BlockStack gap="400" style={{ maxWidth: '600px' }}>
      <Card sectioned>
        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">📦 Order #1001</Text>
          <Text as="p" variant="bodyMd">Status: Shipped</Text>
          <Text as="p" variant="bodySm">Total: $125.99</Text>
          <Button size="small">Track Order</Button>
        </BlockStack>
      </Card>

      <Card sectioned>
        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">📦 Order #1002</Text>
          <Text as="p" variant="bodyMd">Status: Processing</Text>
          <Text as="p" variant="bodySm">Total: $89.50</Text>
          <Button size="small">View Details</Button>
        </BlockStack>
      </Card>

      <Card sectioned>
        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">📦 Order #1003</Text>
          <Text as="p" variant="bodyMd">Status: Delivered</Text>
          <Text as="p" variant="bodySm">Total: $234.75</Text>
          <Button size="small" variant="plain">Leave Review</Button>
        </BlockStack>
      </Card>
    </BlockStack>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <BlockStack gap="300" style={{ maxWidth: '400px' }}>
      <Card background="surface" sectioned>
        <BlockStack gap="200">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4caf50'
            }} />
            <Text as="h3" variant="headingSm">System Operational</Text>
          </div>
          <Text as="p" variant="bodySm">All systems are functioning normally.</Text>
        </BlockStack>
      </Card>

      <Card background="surface subdued" sectioned>
        <BlockStack gap="200">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ff9800'
            }} />
            <Text as="h3" variant="headingSm">Maintenance Mode</Text>
          </div>
          <Text as="p" variant="bodySm">Scheduled maintenance in progress.</Text>
        </BlockStack>
      </Card>

      <Card sectioned>
        <BlockStack gap="200">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#f44336'
            }} />
            <Text as="h3" variant="headingSm">Service Disruption</Text>
          </div>
          <Text as="p" variant="bodySm">We're investigating an issue with payment processing.</Text>
        </BlockStack>
      </Card>
    </BlockStack>
  ),
};

export const WithDifferentContent: Story = {
  render: () => (
    <BlockStack gap="500" style={{ maxWidth: '500px' }}>
      <Text as="h2" variant="headingLg">Dashboard Overview</Text>

      <BlockStack gap="400">
        <div style={{
          padding: '16px',
          backgroundColor: '#f4f6f8',
          borderRadius: '8px',
          border: '2px solid #e1e3e5'
        }}>
          <Text as="h3" variant="headingMd">Quick Stats</Text>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Revenue</Text>
              <Text as="p" variant="headingLg">$12,345</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Orders</Text>
              <Text as="p" variant="headingLg">156</Text>
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e1e3e5'
        }}>
          <Text as="h3" variant="headingMd">Recent Activity</Text>
          <BlockStack gap="200">
            <Badge>New order received</Badge>
            <Badge>Payment processed</Badge>
            <Badge>Product updated</Badge>
          </BlockStack>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button fullWidth>View Full Report</Button>
          <Button variant="plain">Export Data</Button>
        </div>
      </BlockStack>
    </BlockStack>
  ),
};