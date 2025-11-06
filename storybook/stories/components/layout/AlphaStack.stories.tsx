import type { Meta, StoryObj } from '@storybook/react';
import { BlockStack, InlineStack, Card, Button, Text, Badge } from '@shopify/polaris';
import React from 'react';

// Custom AlphaStack component for Polaris v13.9.5 compatibility
const CustomAlphaStack: React.FC<{
  children: React.ReactNode;
  wrap?: boolean;
  distribution?: 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly' | 'equalSpacing';
  spacing?: 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
  alignment?: 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
  direction?: 'vertical' | 'horizontal';
  as?: string;
}> = ({ children, wrap, distribution = 'leading', spacing = 'base', alignment = 'leading', direction = 'vertical', as }) => {
  const spacingMap = {
    extraTight: '100',
    tight: '200',
    base: '400',
    loose: '500',
    extraLoose: '600'
  };

  const alignMap = {
    leading: direction === 'vertical' ? 'start' : 'start',
    trailing: direction === 'vertical' ? 'end' : 'end',
    center: 'center',
    fill: 'stretch',
    baseline: 'baseline'
  };

  const distributionMap = {
    leading: 'start',
    trailing: 'end',
    center: 'center',
    fill: 'fill',
    fillEvenly: 'fill',
    equalSpacing: 'spaceBetween'
  };

  const StackComponent = direction === 'vertical' ? BlockStack : InlineStack;

  const props: any = {
    gap: spacingMap[spacing],
    as,
  };

  if (direction === 'vertical') {
    props.align = alignMap[alignment];
  } else {
    props.align = alignMap[alignment];
    props.blockAlign = alignment === 'fill' ? 'stretch' : 'center';

    if (distribution === 'spaceBetween') {
      props.distribute = 'spaceBetween';
    } else if (distribution === 'center') {
      props.distribute = 'center';
    } else if (distribution === 'end') {
      props.distribute = 'end';
    }
  }

  if (wrap) {
    props.wrap = wrap;
  }

  return <StackComponent {...props}>{children}</StackComponent>;
};

const meta = {
  title: 'Components/Layout/AlphaStack',
  component: CustomAlphaStack,
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
} satisfies Meta<typeof CustomAlphaStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CustomAlphaStack spacing="loose">
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">This is the default vertical AlphaStack with loose spacing.</Text>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </CustomAlphaStack>
  ),
};

export const VerticalStack: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Vertical AlphaStack</Text>

      <CustomAlphaStack spacing="base" direction="vertical">
        <Text as="h4" variant="headingSm">Section 1</Text>
        <Text as="p" variant="bodySm">Content for the first section with base spacing.</Text>

        <Text as="h4" variant="headingSm">Section 2</Text>
        <Text as="p" variant="bodySm">Content for the second section with the same spacing.</Text>

        <Text as="h4" variant="headingSm">Section 3</Text>
        <Text as="p" variant="bodySm">Content for the third section maintaining consistent spacing.</Text>
      </CustomAlphaStack>
    </Card>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Horizontal AlphaStack</Text>

      <CustomAlphaStack spacing="loose" direction="horizontal">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="plain">Preview</Button>
        <Button variant="plain">Cancel</Button>
      </CustomAlphaStack>
    </Card>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Tight Spacing</Text>
        <CustomAlphaStack spacing="extraTight" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Tight Spacing</Text>
        <CustomAlphaStack spacing="tight" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Base Spacing</Text>
        <CustomAlphaStack spacing="base" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Loose Spacing</Text>
        <CustomAlphaStack spacing="loose" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Extra Loose Spacing</Text>
        <CustomAlphaStack spacing="extraLoose" direction="horizontal">
          <Badge status="success">Active</Badge>
          <Badge status="info">Pending</Badge>
          <Badge status="attention">Warning</Badge>
        </CustomAlphaStack>
      </Card>
    </div>
  ),
};

export const DistributionOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Leading Distribution</Text>
        <CustomAlphaStack distribution="leading" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Trailing Distribution</Text>
        <CustomAlphaStack distribution="trailing" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Center Distribution</Text>
        <CustomAlphaStack distribution="center" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Fill Distribution</Text>
        <CustomAlphaStack distribution="fill" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Equal Spacing Distribution</Text>
        <CustomAlphaStack distribution="equalSpacing" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Fill Evenly Distribution</Text>
        <CustomAlphaStack distribution="fillEvenly" direction="horizontal">
          <Button size="small">Left</Button>
          <Button size="small">Center</Button>
          <Button size="small">Right</Button>
        </CustomAlphaStack>
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
          <CustomAlphaStack alignment="leading" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </CustomAlphaStack>
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
          <CustomAlphaStack alignment="trailing" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </CustomAlphaStack>
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
          <CustomAlphaStack alignment="center" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </CustomAlphaStack>
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
          <CustomAlphaStack alignment="fill" direction="horizontal">
            <Button size="small" style={{ height: '100%' }}>Small</Button>
            <Button style={{ height: '100%' }}>Medium</Button>
            <Button size="large" style={{ height: '100%' }}>Large</Button>
          </CustomAlphaStack>
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
          <CustomAlphaStack alignment="baseline" direction="horizontal">
            <Button size="small">Small</Button>
            <Button>Medium</Button>
            <Button size="large">Large</Button>
          </CustomAlphaStack>
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

      <CustomAlphaStack spacing="loose" wrap direction="horizontal">
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
      </CustomAlphaStack>
    </Card>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Customer Information</Text>

      <CustomAlphaStack spacing="loose" direction="vertical">
        <div>
          <Text as="h4" variant="headingSm">Personal Details</Text>
          <CustomAlphaStack spacing="base" direction="vertical">
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
          </CustomAlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Contact Information</Text>
          <CustomAlphaStack spacing="base" direction="vertical">
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
          </CustomAlphaStack>
        </div>

        <CustomAlphaStack distribution="trailing" direction="horizontal">
          <Button variant="primary">Save Customer</Button>
          <Button variant="plain">Cancel</Button>
        </CustomAlphaStack>
      </CustomAlphaStack>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Product Categories</Text>

      <CustomAlphaStack spacing="loose" wrap direction="horizontal">
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
      </CustomAlphaStack>
    </div>
  ),
};

export const ProgressSteps: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Order Progress</Text>

      <CustomAlphaStack spacing="extraLoose" distribution="equalSpacing" direction="horizontal">
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
      </CustomAlphaStack>
    </Card>
  ),
};

export const StatusCards: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <CustomAlphaStack spacing="loose" direction="vertical">
        <Card sectioned background="surface">
          <CustomAlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
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
          </CustomAlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            All services are functioning normally with no reported issues.
          </Text>
        </Card>

        <Card sectioned background="surface subdued">
          <CustomAlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
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
          </CustomAlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            Scheduled maintenance window for system updates and improvements.
          </Text>
        </Card>

        <Card sectioned>
          <CustomAlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
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
          </CustomAlphaStack>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
            Our team is investigating delays in payment processing. Estimated resolution: 2 hours.
          </Text>
        </Card>
      </CustomAlphaStack>
    </div>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Order Details</Text>

      <CustomAlphaStack spacing="loose" direction="vertical">
        <div>
          <CustomAlphaStack distribution="equalSpacing" alignment="center" direction="horizontal">
            <div>
              <Text as="h4" variant="headingMd">Order #1001</Text>
              <Text as="p" variant="bodySm" tone="subdued">Placed on November 3, 2025</Text>
            </div>
            <Badge status="success">Fulfilled</Badge>
          </CustomAlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Customer</Text>
          <CustomAlphaStack spacing="base" direction="vertical">
            <Text as="p" variant="bodyMd">John Doe</Text>
            <Text as="p" variant="bodySm" tone="subdued">john.doe@example.com</Text>
            <Text as="p" variant="bodySm" tone="subdued">(555) 123-4567</Text>
          </CustomAlphaStack>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Items</Text>
          <CustomAlphaStack spacing="base" direction="vertical">
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
                <CustomAlphaStack distribution="equalSpacing" direction="horizontal">
                  <Text as="p" variant="bodySm">{item.name}</Text>
                  <Text as="p" variant="bodySm">Qty: {item.qty}</Text>
                  <Text as="p" variant="bodySm">{item.price}</Text>
                </CustomAlphaStack>
              </div>
            ))}
          </CustomAlphaStack>
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

        <CustomAlphaStack distribution="trailing" direction="horizontal">
          <Button variant="primary">Track Order</Button>
          <Button variant="secondary">Create Return</Button>
          <Button variant="plain">Print Receipt</Button>
        </CustomAlphaStack>
      </CustomAlphaStack>
    </Card>
  ),
};