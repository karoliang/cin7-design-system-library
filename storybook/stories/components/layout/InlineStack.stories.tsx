import type { Meta, StoryObj } from '@storybook/react';
import { InlineStack, Card, Button, Badge, Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/InlineStack',
  component: InlineStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'InlineStack arranges child elements horizontally with consistent spacing. It\'s perfect for creating horizontal layouts like button groups, tags, or any content that needs to be displayed side by side.',
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
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      description: 'Vertical alignment of items',
    },
    blockAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Block alignment for items',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap to next line',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof InlineStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InlineStack gap="400">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="plain">Preview</Button>
    </InlineStack>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">No spacing</Text>
        <InlineStack gap="none">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Tight spacing</Text>
        <InlineStack gap="100">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Tight spacing</Text>
        <InlineStack gap="200">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Base spacing</Text>
        <InlineStack gap="400">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Loose spacing</Text>
        <InlineStack gap="500">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Loose spacing</Text>
        <InlineStack gap="800">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </InlineStack>
      </Card>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Start alignment</Text>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'start',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px'
        }}>
          <InlineStack gap="400" align="start">
            <Button size="small">Small Button</Button>
            <Button>Medium Button</Button>
            <Button size="large">Large Button</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Center alignment</Text>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px'
        }}>
          <InlineStack gap="400" align="center">
            <Button size="small">Small Button</Button>
            <Button>Medium Button</Button>
            <Button size="large">Large Button</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">End alignment</Text>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'end',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px'
        }}>
          <InlineStack gap="400" align="end">
            <Button size="small">Small Button</Button>
            <Button>Medium Button</Button>
            <Button size="large">Large Button</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Baseline alignment</Text>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'baseline',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px'
        }}>
          <InlineStack gap="400" align="baseline">
            <Button size="small">Small Button</Button>
            <Button>Medium Button</Button>
            <Button size="large">Large Button</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Stretch alignment</Text>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'stretch',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px'
        }}>
          <InlineStack gap="400" align="stretch">
            <Button size="small" style={{ height: '100%' }}>Small</Button>
            <Button style={{ height: '100%' }}>Medium</Button>
            <Button size="large" style={{ height: '100%' }}>Large</Button>
          </InlineStack>
        </div>
      </Card>
    </div>
  ),
};

export const ButtonGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingMd">Primary Actions</Text>
        <Text as="p" variant="bodySm" tone="subdued">Main actions for the current context</Text>
        <div style={{ marginTop: '12px' }}>
          <InlineStack gap="200">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button variant="plain">Preview</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingMd">Navigation Actions</Text>
        <Text as="p" variant="bodySm" tone="subdued">Navigation and browsing options</Text>
        <div style={{ marginTop: '12px' }}>
          <InlineStack gap="200">
            <Button>Previous</Button>
            <Button variant="primary">Next</Button>
            <Button variant="plain">Skip</Button>
          </InlineStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingMd">Destructive Actions</Text>
        <Text as="p" variant="bodySm" tone="subdued">Actions that require caution</Text>
        <div style={{ marginTop: '12px' }}>
          <InlineStack gap="200">
            <Button variant="critical">Delete</Button>
            <Button variant="plain">Cancel</Button>
          </InlineStack>
        </div>
      </Card>
    </div>
  ),
};

export const TagCloud: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Product Tags</Text>
      <div style={{ marginTop: '12px' }}>
        <InlineStack gap="200" wrap>
          <Badge>Electronics</Badge>
          <Badge>Mobile</Badge>
          <Badge>Accessories</Badge>
          <Badge>Bestseller</Badge>
          <Badge>New Arrival</Badge>
          <Badge>Limited Edition</Badge>
          <Badge>Premium</Badge>
          <Badge>Sale</Badge>
          <Badge>Featured</Badge>
          <Badge>Popular</Badge>
          <Badge>Trending</Badge>
          <Badge>Clearance</Badge>
        </InlineStack>
      </div>
    </Card>
  ),
};

export const ProgressIndicators: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Order Progress</Text>
      <div style={{ marginTop: '12px' }}>
        <InlineStack gap="200">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "12px",
              fontWeight: 'bold'
            }}>✓</div>
            <Text as="p" variant="bodySm">Placed</Text>
          </div>

          <div style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#4caf50',
            alignSelf: 'center'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "12px",
              fontWeight: 'bold'
            }}>✓</div>
            <Text as="p" variant="bodySm">Processed</Text>
          </div>

          <div style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#4caf50',
            alignSelf: 'center'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#ff9800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "12px",
              fontWeight: 'bold'
            }}>3</div>
            <Text as="p" variant="bodySm">Shipped</Text>
          </div>

          <div style={{
            width: '32px',
            height: '2px',
            backgroundColor: '#e1e3e5',
            alignSelf: 'center'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '2px solid #e1e3e5',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c7278',
              fontSize: "12px",
              fontWeight: 'bold'
            }}>4</div>
            <Text as="p" variant="bodySm" tone="subdued">Delivered</Text>
          </div>
        </InlineStack>
      </div>
    </Card>
  ),
};

export const StatusRow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Card background="surface" sectioned>
        <InlineStack gap="400" align="center" blockAlign="center">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e8f5e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "20px"
          }}>✓</div>
          <div style={{ flex: 1 }}>
            <Text as="h3" variant="headingSm">Payment Successful</Text>
            <Text as="p" variant="bodySm" tone="subdued">Order #1001 processed successfully</Text>
          </div>
          <Badge status="success">Complete</Badge>
        </InlineStack>
      </Card>

      <Card background="surface subdued" sectioned>
        <InlineStack gap="400" align="center" blockAlign="center">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#fff3cd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "20px"
          }}>⏳</div>
          <div style={{ flex: 1 }}>
            <Text as="h3" variant="headingSm">Processing Order</Text>
            <Text as="p" variant="bodySm" tone="subdued">Order #1002 being prepared</Text>
          </div>
          <Badge status="attention">In Progress</Badge>
        </InlineStack>
      </Card>

      <Card sectioned>
        <InlineStack gap="400" align="center" blockAlign="center">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ffebee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "20px"
          }}>⚠</div>
          <div style={{ flex: 1 }}>
            <Text as="h3" variant="headingSm">Payment Required</Text>
            <Text as="p" variant="bodySm" tone="subdued">Order #1003 awaiting payment</Text>
          </div>
          <Badge status="critical">Action Needed</Badge>
        </InlineStack>
      </Card>
    </div>
  ),
};

export const WrappedContent: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Product Features</Text>
      <Text as="p" variant="bodySm" tone="subdued">Key selling points and benefits</Text>
      <div style={{ marginTop: '12px' }}>
        <InlineStack gap="200" wrap>
          <Badge status="success">✓ Free Shipping</Badge>
          <Badge status="success">✓ 30-Day Returns</Badge>
          <Badge status="success">✓ 1 Year Warranty</Badge>
          <Badge status="success">✓ Premium Quality</Badge>
          <Badge status="success">✓ Eco-Friendly</Badge>
          <Badge status="success">✓ Made in USA</Badge>
          <Badge status="success">✓ Fast Support</Badge>
          <Badge status="success">✓ Secure Payment</Badge>
        </InlineStack>
      </div>
    </Card>
  ),
};

export const MetricsRow: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Performance Metrics</Text>
      <div style={{ marginTop: '12px' }}>
        <InlineStack gap="800" align="center">
          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="bodySm" tone="subdued">Revenue</Text>
            <Text as="p" variant="headingLg">$12.5K</Text>
            <Badge status="success">+15%</Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="bodySm" tone="subdued">Orders</Text>
            <Text as="p" variant="headingLg">245</Text>
            <Badge status="success">+8%</Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="bodySm" tone="subdued">Customers</Text>
            <Text as="p" variant="headingLg">1,892</Text>
            <Badge status="attention">+2%</Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="bodySm" tone="subdued">Conversion</Text>
            <Text as="p" variant="headingLg">3.2%</Text>
            <Badge status="critical">-1%</Badge>
          </div>
        </InlineStack>
      </div>
    </Card>
  ),
};