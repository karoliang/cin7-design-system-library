import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonPage, Card, BlockStack, InlineStack, Text, Button, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Feedback/SkeletonPage',
  component: SkeletonPage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SkeletonPage provides loading placeholders for entire pages. Use it to maintain layout structure while content is loading, creating a smooth user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text for the skeleton page',
    },
    breadcrumbs: {
      control: { type: 'object' },
      description: 'Breadcrumb configuration',
    },
    primaryAction: {
      control: { type: 'object' },
      description: 'Primary action button configuration',
    },
    secondaryActions: {
      control: { type: 'array' },
      description: 'Secondary action buttons configuration',
    },
    backAction: {
      control: { type: 'object' },
      description: 'Back action configuration',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the skeleton page should take full width',
    },
    childContent: {
      control: { type: 'object' },
      description: 'Content skeleton configuration',
    },
  },
} satisfies Meta<typeof SkeletonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page title',
    primaryAction: {
      content: 'Primary action',
    },
    breadcrumbs: [
      { content: 'Home' },
      { content: 'Products' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: 'Loading page',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Product Details',
    breadcrumbs: [
      { content: 'Home' },
      { content: 'Products' },
      { content: 'Electronics' },
      { content: 'Laptops' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Customer Management',
    primaryAction: {
      content: 'Add customer',
    },
    secondaryActions: [
      { content: 'Export' },
      { content: 'Import' },
    ],
  },
};

export const WithBackAction: Story = {
  args: {
    title: 'Order Details',
    backAction: {
      content: 'Back to orders',
    },
  },
};

export const ProductPageSkeleton: Story = {
  args: {
    title: 'Product Details',
    primaryAction: {
      content: 'Edit product',
    },
    secondaryActions: [
      { content: 'Duplicate' },
      { content: 'Delete' },
    ],
    breadcrumbs: [
      { content: 'Home' },
      { content: 'Products' },
    ],
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '400',
        children: [
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '400',
                children: [
                  {
                    type: 'InlineStack',
                    gap: '400',
                    children: [
                      { type: 'SkeletonDisplayText', size: 'small' },
                      { type: 'SkeletonDisplayText', size: 'small' },
                    ]
                  },
                  { type: 'SkeletonBodyText', lines: 3 },
                ]
              }
            ]
          },
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '400',
                children: [
                  { type: 'SkeletonDisplayText', size: 'medium' },
                  { type: 'SkeletonBodyText', lines: 4 },
                  { type: 'SkeletonBodyText', lines: 2 },
                ]
              }
            ]
          }
        ]
      }
    },
  },
};

export const DashboardSkeleton: Story = {
  args: {
    title: 'Dashboard',
    primaryAction: {
      content: 'Add widget',
    },
    breadcrumbs: [
      { content: 'Home' },
    ],
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '400',
        children: [
          {
            type: 'BlockStack',
            gap: '300',
            children: [
              { type: 'SkeletonDisplayText', size: 'small' },
              {
                type: 'InlineStack',
                gap: '400',
                children: [
                  {
                    type: 'Card',
                    children: [
                      {
                        type: 'BlockStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonDisplayText', size: 'small' },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      }
                    ]
                  },
                  {
                    type: 'Card',
                    children: [
                      {
                        type: 'BlockStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonDisplayText', size: 'small' },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      }
                    ]
                  },
                  {
                    type: 'Card',
                    children: [
                      {
                        type: 'BlockStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonDisplayText', size: 'small' },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      }
                    ]
                  },
                ]
              }
            ]
          },
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '300',
                children: [
                  { type: 'SkeletonDisplayText', size: 'small' },
                  { type: 'SkeletonBodyText', lines: 5 },
                ]
              }
            ]
          }
        ]
      }
    },
  },
};

export const OrderListSkeleton: Story = {
  args: {
    title: 'Orders',
    primaryAction: {
      content: 'Create order',
    },
    breadcrumbs: [
      { content: 'Home' },
      { content: 'Orders' },
    ],
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '400',
        children: [
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '300',
                children: [
                  {
                    type: 'InlineStack',
                    gap: '400',
                    children: [
                      { type: 'SkeletonDisplayText', size: 'small' },
                      { type: 'SkeletonDisplayText', size: 'small' },
                      { type: 'SkeletonDisplayText', size: 'small' },
                    ]
                  },
                  {
                    type: 'BlockStack',
                    gap: '200',
                    children: [
                      {
                        type: 'InlineStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      },
                      {
                        type: 'InlineStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      },
                      {
                        type: 'InlineStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
  },
};

export const CustomerDetailSkeleton: Story = {
  args: {
    title: 'Customer Details',
    primaryAction: {
      content: 'Edit customer',
    },
    secondaryActions: [
      { content: 'Send email' },
      { content: 'View orders' },
    ],
    backAction: {
      content: 'Back to customers',
    },
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '400',
        children: [
          {
            type: 'InlineStack',
            gap: '400',
            children: [
              {
                type: 'Card',
                children: [
                  {
                    type: 'BlockStack',
                    gap: '300',
                    children: [
                      { type: 'SkeletonDisplayText', size: 'small' },
                      { type: 'SkeletonBodyText', lines: 2 },
                      { type: 'SkeletonBodyText', lines: 2 },
                      { type: 'SkeletonBodyText', lines: 1 },
                    ]
                  }
                ]
              },
              {
                type: 'Card',
                children: [
                  {
                    type: 'BlockStack',
                    gap: '300',
                    children: [
                      { type: 'SkeletonDisplayText', size: 'small' },
                      { type: 'SkeletonBodyText', lines: 1 },
                      { type: 'SkeletonBodyText', lines: 1 },
                      { type: 'SkeletonBodyText', lines: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '300',
                children: [
                  { type: 'SkeletonDisplayText', size: 'medium' },
                  { type: 'SkeletonBodyText', lines: 4 },
                ]
              }
            ]
          }
        ]
      }
    },
  },
};

export const LoadingStateDemo: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const simulateLoading = () => {
      setIsLoading(true);
      setDataLoaded(false);

      setTimeout(() => {
        setIsLoading(false);
        setDataLoaded(true);
      }, 3000);
    };

    React.useEffect(() => {
      simulateLoading();
    }, []);

    if (isLoading) {
      return (
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <SkeletonPage
            title="Analytics Dashboard"
            primaryAction={{ content: 'Export report' }}
            breadcrumbs={[
              { content: 'Home' },
              { content: 'Analytics' },
            ]}
          />
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Analytics Dashboard</h3>
                  <Text as="p" tone="subdued">Performance metrics and insights</Text>
                </div>
                <Button variant="primary">Export report</Button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="headingLg" as="p">$12,450</Text>
                  <Text as="p" tone="subdued">Total Revenue</Text>
                  <Badge tone="success">+15%</Badge>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="headingLg" as="p">1,234</Text>
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <Badge tone="success">+8%</Badge>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="headingLg" as="p">892</Text>
                  <Text as="p" tone="subdued">Customers</Text>
                  <Badge tone="attention">+3%</Badge>
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #90caf9'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">✅ Content loaded successfully!</Text>
                  <Text variant="bodySm" as="p">
                    This simulates how the skeleton screen would transition to actual content.
                  </Text>
                </BlockStack>
              </div>

              <InlineStack gap="200">
                <Button onClick={simulateLoading}>
                  Simulate Loading Again
                </Button>
                <Button variant="plain">View Details</Button>
              </InlineStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const MobileSkeleton: Story = {
  args: {
    title: 'Product Page',
    primaryAction: {
      content: 'Save',
    },
    fullWidth: true,
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '300',
        children: [
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '300',
                children: [
                  { type: 'SkeletonDisplayText', size: 'small' },
                  { type: 'SkeletonBodyText', lines: 2 },
                  { type: 'SkeletonBodyText', lines: 3 },
                ]
              }
            ]
          },
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '200',
                children: [
                  { type: 'SkeletonDisplayText', size: 'small' },
                  { type: 'SkeletonBodyText', lines: 1 },
                  { type: 'SkeletonBodyText', lines: 1 },
                ]
              }
            ]
          }
        ]
      }
    },
  },
};

export const ComplexLayoutSkeleton: Story = {
  args: {
    title: 'Inventory Management',
    primaryAction: {
      content: 'Add product',
    },
    secondaryActions: [
      { content: 'Import' },
      { content: 'Export' },
    ],
    breadcrumbs: [
      { content: 'Home' },
      { content: 'Products' },
      { content: 'Inventory' },
    ],
    childContent: {
      body: {
        type: 'BlockStack',
        gap: '400',
        children: [
          {
            type: 'BlockStack',
            gap: '300',
            children: [
              {
                type: 'InlineStack',
                gap: '400',
                children: [
                  { type: 'SkeletonDisplayText', size: 'small' },
                  { type: 'SkeletonDisplayText', size: 'small' },
                  { type: 'SkeletonDisplayText', size: 'small' },
                ]
              },
              {
                type: 'InlineStack',
                gap: '400',
                children: [
                  {
                    type: 'Card',
                    children: [
                      {
                        type: 'BlockStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonDisplayText', size: 'small' },
                          { type: 'SkeletonBodyText', lines: 2 },
                        ]
                      }
                    ]
                  },
                  {
                    type: 'Card',
                    children: [
                      {
                        type: 'BlockStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonDisplayText', size: 'small' },
                          { type: 'SkeletonBodyText', lines: 2 },
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: 'Card',
            children: [
              {
                type: 'BlockStack',
                gap: '300',
                children: [
                  { type: 'SkeletonDisplayText', size: 'medium' },
                  {
                    type: 'BlockStack',
                    gap: '200',
                    children: [
                      {
                        type: 'InlineStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      },
                      {
                        type: 'InlineStack',
                        gap: '200',
                        children: [
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                          { type: 'SkeletonBodyText', lines: 1 },
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
  },
};