import type { Meta, StoryObj } from '@storybook/react';
import { AlphaStack, Card, Button, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/AlphaStack',
  component: AlphaStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AlphaStack is the legacy layout component for arranging elements. While BlockStack and InlineStack are recommended for new development, AlphaStack is maintained for backward compatibility and can still be useful in certain scenarios.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap to next line',
    },
    distribution: {
      control: 'select',
      options: ['leading', 'trailing', 'center', 'fill', 'fillEvenly', 'equalSpacing'],
      description: 'Distribution of items along the main axis',
    },
    spacing: {
      control: 'select',
      options: ['extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Spacing between stack items',
    },
    alignment: {
      control: 'select',
      options: ['leading', 'trailing', 'center', 'fill', 'baseline'],
      description: 'Alignment of items on the cross axis',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the stack',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof AlphaStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlphaStack spacing="loose">
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">This is the default vertical AlphaStack with loose spacing.</Text>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </AlphaStack>
  ),
};

export const VerticalStack: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Vertical AlphaStack</Text>

      <AlphaStack spacing="base" direction="vertical">
        <Text as="h4" variant="headingSm">Section 1</Text>
        <Text as="p" variant="bodySm">Content for the first section with base spacing.</Text>

        <Text as="h4" variant="headingSm">Section 2</Text>
        <Text as="p" variant="bodySm">Content for the second section with the same spacing.</Text>

        <Text as="h4" variant="headingSm">Section 3</Text>
        <Text as="p" variant="bodySm">Content for the third section maintaining consistent spacing.</Text>
      </AlphaStack>
    </Card>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Horizontal AlphaStack</Text>

      <AlphaStack spacing="loose" direction="horizontal">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="plain">Preview</Button>
        <Button variant="plain">Cancel</Button>
      </AlphaStack>
    </Card>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Tight Spacing</Text>
        <AlphaStack spacing="extraTight" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Tight Spacing</Text>
        <AlphaStack spacing="tight" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Base Spacing</Text>
        <AlphaStack spacing="base" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Loose Spacing</Text>
        <AlphaStack spacing="loose" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Loose Spacing</Text>
        <AlphaStack spacing="extraLoose" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </AlphaStack>
      </Card>
    </div>
  ),
};

export const DistributionOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Leading Distribution</Text>
        <AlphaStack distribution="leading" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Trailing Distribution</Text>
        <AlphaStack distribution="trailing" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Center Distribution</Text>
        <AlphaStack distribution="center" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Fill Distribution</Text>
        <AlphaStack distribution="fill" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Equal Spacing Distribution</Text>
        <AlphaStack distribution="equalSpacing" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Fill Evenly Distribution</Text>
        <AlphaStack distribution="fillEvenly" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </AlphaStack>
      </Card>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Leading Alignment</Text>
        <div style={{
          height: '80px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          padding: '8px',
          display: 'flex',
          alignItems: 'flex-start'
        }}>
          <AlphaStack alignment="leading" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </AlphaStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Trailing Alignment</Text>
        <div style={{
          height: '80px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          padding: '8px',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <AlphaStack alignment="trailing" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </AlphaStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Center Alignment</Text>
        <div style={{
          height: '80px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <AlphaStack alignment="center" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </AlphaStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Fill Alignment</Text>
        <div style={{
          height: '80px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          padding: '8px',
          display: 'flex',
          alignItems: 'stretch'
        }}>
          <AlphaStack alignment="fill" direction="horizontal">
            <Button size="small" style={{ height: '100%' }}>Small</Button>
            <Button style={{ height: '100%' }}>Medium</Button>
            <Button size="large" style={{ height: '100%' }}>Large</Button>
          </AlphaStack>
        </div>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Baseline Alignment</Text>
        <div style={{
          height: '80px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          padding: '8px',
          display: 'flex',
          alignItems: 'baseline'
        }}>
          <AlphaStack alignment="baseline" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </AlphaStack>
        </div>
      </Card>
    </div>
  ),
};

export const WrappingStack: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Wrapping AlphaStack</Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Items will wrap to the next line when there isn't enough horizontal space.
      </Text>

      <AlphaStack spacing="loose" wrap direction="horizontal">
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
      </AlphaStack>
    </Card>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Customer Information</Text>

      <AlphaStack spacing="loose" direction="vertical">
        <div>
          <Text as="h4" variant="headingSm">Personal Details</Text>
          <AlphaStack spacing="base" direction="vertical">
            <div style={{
              padding: '12px',
              border: '1px dashed #d2d2d7',
              borderRadius: '4px',
              backgroundColor: '#fafafa'
            }}>
              <Text as="p" variant="bodySm">First Name Input</Text>
            </div>
            <div style={{
              padding: '12px',
              border: '1px dashed #d2d2d7',
              borderRadius: '4px',
              backgroundColor: '#fafafa'
            }}>
              <Text as="p" variant="bodySm">Last Name Input</Text>
            </div>
          </AlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Contact Information</Text>
          <AlphaStack spacing="base" direction="vertical">
            <div style={{
              padding: '12px',
              border: '1px dashed #d2d2d7',
              borderRadius: '4px',
              backgroundColor: '#fafafa'
            }}>
              <Text as="p" variant="bodySm">Email Input</Text>
            </div>
            <div style={{
              padding: '12px',
              border: '1px dashed #d2d2d7',
              borderRadius: '4px',
              backgroundColor: '#fafafa'
            }}>
              <Text as="p" variant="bodySm">Phone Input</Text>
            </div>
          </AlphaStack>
        </div>

        <AlphaStack distribution="trailing" direction="horizontal">
          <Button variant="primary">Save Customer</Button>
          <Button variant="plain">Cancel</Button>
        </AlphaStack>
      </AlphaStack>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Product Categories</Text>

      <AlphaStack spacing="loose" wrap direction="horizontal">
        <Card sectioned style={{ minWidth: '200px', flex: '1' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px'
            }}>👕</div>
            <Text as="h4" variant="headingSm">Clothing</Text>
            <Text as="p" variant="bodySm" tone="subdued">245 items</Text>
          </div>
        </Card>

        <Card sectioned style={{ minWidth: '200px', flex: '1' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px'
            }}>👟</div>
            <Text as="h4" variant="headingSm">Footwear</Text>
            <Text as="p" variant="bodySm" tone="subdued">89 items</Text>
          </div>
        </Card>

        <Card sectioned style={{ minWidth: '200px', flex: '1' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px'
            }}>⌚</div>
            <Text as="h4" variant="headingSm">Accessories</Text>
            <Text as="p" variant="bodySm" tone="subdued">156 items</Text>
          </div>
        </Card>

        <Card sectioned style={{ minWidth: '200px', flex: '1' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px'
            }}>🎒</div>
            <Text as="h4" variant="headingSm">Bags</Text>
            <Text as="p" variant="bodySm" tone="subdued">67 items</Text>
          </div>
        </Card>
      </AlphaStack>
    </div>
  ),
};

export const ProgressSteps: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Order Progress</Text>

      <AlphaStack spacing="extraLoose" distribution="equalSpacing" direction="horizontal">
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: "18px",
            fontWeight: 'bold',
            margin: '0 auto 8px'
          }}>✓</div>
          <Text as="p" variant="bodySm">Placed</Text>
          <Badge status="success">Complete</Badge>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: "18px",
            fontWeight: 'bold',
            margin: '0 auto 8px'
          }}>✓</div>
          <Text as="p" variant="bodySm">Processing</Text>
          <Badge status="success">Complete</Badge>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ff9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: "18px",
            fontWeight: 'bold',
            margin: '0 auto 8px'
          }}>3</div>
          <Text as="p" variant="bodySm">Shipped</Text>
          <Badge status="attention">In Progress</Badge>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #e1e3e5',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c7278',
            fontSize: "18px",
            fontWeight: 'bold',
            margin: '0 auto 8px'
          }}>4</div>
          <Text as="p" variant="bodySm" tone="subdued">Delivered</Text>
          <Badge status="info">Pending</Badge>
        </div>
      </AlphaStack>
    </Card>
  ),
};

export const StatusCards: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <AlphaStack spacing="loose" direction="vertical">
        <Card sectioned background="surface">
          <AlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#4caf50'
              }} />
              <Text as="h4" variant="headingSm">System Operational</Text>
            </div>
            <Badge status="success">All Systems Go</Badge>
          </AlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            All services are functioning normally with no reported issues.
          </Text>
        </Card>

        <Card sectioned background="surface subdued">
          <AlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff9800'
              }} />
              <Text as="h4" variant="headingSm">Maintenance Scheduled</Text>
            </div>
            <Badge status="attention">Tonight 11 PM</Badge>
          </AlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            Scheduled maintenance window for system updates and improvements.
          </Text>
        </Card>

        <Card sectioned>
          <AlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#f44336'
              }} />
              <Text as="h4" variant="headingSm">Payment Processing Delay</Text>
            </div>
            <Badge status="critical">Investigating</Badge>
          </AlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            Our team is investigating delays in payment processing. Estimated resolution: 2 hours.
          </Text>
        </Card>
      </AlphaStack>
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Order Details</Text>

      <AlphaStack spacing="loose" direction="vertical">
        <div>
          <AlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
            <div>
              <Text as="h4" variant="headingMd">Order #1001</Text>
              <Text as="p" variant="bodySm" tone="subdued">Placed on November 3, 2025</Text>
            </div>
            <Badge status="success">Fulfilled</Badge>
          </AlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Customer</Text>
          <AlphaStack spacing="base" direction="vertical">
            <Text as="p" variant="bodyMd">John Doe</Text>
            <Text as="p" variant="bodySm" tone="subdued">john.doe@example.com</Text>
            <Text as="p" variant="bodySm" tone="subdued">(555) 123-4567</Text>
          </AlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Items</Text>
          <AlphaStack spacing="base" direction="vertical">
            {[
              { name: 'Classic T-Shirt', qty: 2, price: '$59.98' },
              { name: 'Denim Jeans', qty: 1, price: '$89.99' },
              { name: 'Running Shoes', qty: 1, price: '$129.99' }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: '#f4f6f8',
                borderRadius: '4px'
              }}>
                <AlphaStack distribution="equalSpacing" direction="horizontal">
                  <Text as="p" variant="bodySm">{item.name}</Text>
                  <Text as="p" variant="bodySm">Qty: {item.qty}</Text>
                  <Text as="p" variant="bodySm">{item.price}</Text>
                </AlphaStack>
              </div>
            ))}
          </AlphaStack>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#f4f6f8',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{ textAlign: 'right' }}>
            <Text as="p" variant="bodyMd">Total: $279.96</Text>
          </div>
        </div>

        <AlphaStack distribution="trailing" direction="horizontal">
          <Button variant="primary">Track Order</Button>
          <Button variant="secondary">Create Return</Button>
          <Button variant="plain">Print Receipt</Button>
        </AlphaStack>
      </AlphaStack>
    </Card>
  ),
};