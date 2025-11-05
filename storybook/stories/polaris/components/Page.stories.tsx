import type { Meta, StoryObj } from '@storybook/react';
import { Page, Layout, Card, Button, Text, Badge, DisplayText } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page provides a complete page layout with title, breadcrumbs, primary and secondary actions. It\'s designed for creating full-page layouts with consistent header structure and navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    subtitle: {
      control: 'text',
      description: 'Page subtitle',
    },
    primaryAction: {
      control: 'object',
      description: 'Primary action button configuration',
    },
    secondaryActions: {
      control: 'array',
      description: 'Secondary action buttons',
    },
    actionGroups: {
      control: 'array',
      description: 'Action groups for dropdown menus',
    },
    breadcrumbs: {
      control: 'array',
      description: 'Breadcrumb navigation',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make page full width',
    },
    backAction: {
      control: 'object',
      description: 'Back action configuration',
    },
    pagination: {
      control: 'object',
      description: 'Pagination configuration',
    },
    compactTitle: {
      control: 'boolean',
      description: 'Use compact title styling',
    },
    titleMetadata: {
      control: 'node',
      description: 'Additional metadata to display with title',
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page
      title="Products"
      primaryAction={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <Page
      title="Orders"
      subtitle="Manage and track customer orders"
      primaryAction={{
        content: 'Create order',
        onAction: () => console.log('Create order clicked'),
      }}
      secondaryActions={[
        {
          content: 'Export',
          onAction: () => console.log('Export clicked'),
        },
        {
          content: 'Import',
          onAction: () => console.log('Import clicked'),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              View and manage all customer orders from this dashboard. Track fulfillment status, process refunds, and handle customer inquiries.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <Page
      title="Product Details"
      breadcrumbs={[
        {
          content: 'Products',
          url: '#',
        },
        {
          content: 'Classic T-Shirt',
          url: '#',
        },
      ]}
      primaryAction={{
        content: 'Save',
        onAction: () => console.log('Save clicked'),
      }}
      secondaryActions={[
        {
          content: 'Duplicate',
          onAction: () => console.log('Duplicate clicked'),
        },
        {
          content: 'Delete',
          destructive: true,
          onAction: () => console.log('Delete clicked'),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Product Information</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              Classic cotton t-shirt with comfortable fit and premium quality materials.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const WithActionGroups: Story = {
  render: () => (
    <Page
      title="Analytics"
      primaryAction={{
        content: 'Generate report',
        onAction: () => console.log('Generate report clicked'),
      }}
      secondaryActions={[
        {
          content: 'Export data',
          onAction: () => console.log('Export clicked'),
        },
      ]}
      actionGroups={[
        {
          title: 'Reports',
          actions: [
            {
              content: 'Sales report',
              onAction: () => console.log('Sales report clicked'),
            },
            {
              content: 'Customer report',
              onAction: () => console.log('Customer report clicked'),
            },
            {
              content: 'Inventory report',
              onAction: () => console.log('Inventory report clicked'),
            },
          ],
        },
        {
          title: 'Settings',
          actions: [
            {
              content: 'Date range',
              onAction: () => console.log('Date range clicked'),
            },
            {
              content: 'Filters',
              onAction: () => console.log('Filters clicked'),
            },
          ],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Dashboard Overview</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              View comprehensive analytics and insights about your store performance.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const CustomerPage: Story = {
  render: () => (
    <Page
      title="John Doe"
      subtitle="VIP Customer"
      breadcrumbs={[
        {
          content: 'Customers',
          url: '#',
        },
      ]}
      titleMetadata={<Badge status="success">Active</Badge>}
      primaryAction={{
        content: 'Send email',
        onAction: () => console.log('Send email clicked'),
      }}
      secondaryActions={[
        {
          content: 'Edit customer',
          onAction: () => console.log('Edit customer clicked'),
        },
        {
          content: 'Create order',
          onAction: () => console.log('Create order clicked'),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#f4f6f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>👤</div>
              <div>
                <Text as="h3" variant="headingLg">Customer Overview</Text>
                <Text as="p" variant="bodyMd" tone="subdued">Member since October 2024</Text>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{
                padding: '16px',
                backgroundColor: '#f4f6f8',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">24</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Orders</Text>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f4f6f8',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">$1,847</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Spent</Text>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f4f6f8',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">$76.95</Text>
                <Text as="p" variant="bodySm" tone="subdued">Average Order</Text>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Contact Information</Text>
            <div style={{ marginTop: '12px' }}>
              <div style={{ marginBottom: '12px' }}>
                <Text as="p" variant="bodySm" tone="subdued">Email</Text>
                <Text as="p" variant="bodyMd">john.doe@example.com</Text>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <Text as="p" variant="bodySm" tone="subdued">Phone</Text>
                <Text as="p" variant="bodyMd">(555) 123-4567</Text>
              </div>
              <div>
                <Text as="p" variant="bodySm" tone="subdued">Address</Text>
                <Text as="p" variant="bodyMd">123 Main St, City, State 12345</Text>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const ProductCatalog: Story = {
  render: () => (
    <Page
      title="Product Catalog"
      subtitle="Manage your store's product inventory"
      primaryAction={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
      secondaryActions={[
        {
          content: 'Import',
          onAction: () => console.log('Import clicked'),
        },
        {
          content: 'Export',
          onAction: () => console.log('Export clicked'),
        },
      ]}
      actionGroups={[
        {
          title: 'Bulk actions',
          actions: [
            {
              content: 'Edit products',
              onAction: () => console.log('Bulk edit clicked'),
            },
            {
              content: 'Add tags',
              onAction: () => console.log('Add tags clicked'),
            },
            {
              content: 'Update prices',
              onAction: () => console.log('Update prices clicked'),
            },
          ],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Text as="h3" variant="headingLg">Products (156)</Text>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Badge status="success">142 Active</Badge>
                <Badge status="attention">8 Draft</Badge>
                <Badge status="critical">6 Archived</Badge>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Classic T-Shirt', price: '$29.99', status: 'success', stock: '150' },
                { name: 'Denim Jeans', price: '$89.99', status: 'success', stock: '45' },
                { name: 'Running Shoes', price: '$129.99', status: 'attention', stock: '3' },
                { name: 'Winter Jacket', price: '$199.99', status: 'critical', stock: '0' },
                { name: 'Backpack', price: '$59.99', status: 'success', stock: '78' },
                { name: 'Smart Watch', price: '$299.99', status: 'info', stock: 'Pre-order' }
              ].map((product, index) => (
                <div key={index} style={{
                  padding: '16px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{
                    height: '120px',
                    backgroundColor: '#f4f6f8',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px'
                  }}>👕</div>

                  <Text as="h4" variant="headingSm">{product.name}</Text>
                  <Text as="p" variant="bodyMd">{product.price}</Text>

                  <div style={{ marginTop: '8px' }}>
                    <Badge status={product.status}>
                      {product.status === 'success' ? `In Stock (${product.stock})` :
                       product.status === 'attention' ? `Low Stock (${product.stock})` :
                       product.status === 'critical' ? 'Out of Stock' : product.stock}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const OrderManagement: Story = {
  render: () => (
    <Page
      title="Order Management"
      subtitle="Process and fulfill customer orders"
      primaryAction={{
        content: 'Create order',
        onAction: () => console.log('Create order clicked'),
      }}
      secondaryActions={[
        {
          content: 'Print labels',
          onAction: () => console.log('Print labels clicked'),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
        onPrevious: () => console.log('Previous clicked'),
        onNext: () => console.log('Next clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Text as="h3" variant="headingLg">Recent Orders</Text>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="plain">Filter</Button>
                <Button variant="plain">Sort</Button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '16px', padding: '12px 0', borderBottom: '1px solid #e1e3e5' }}>
              <Text as="p" variant="bodySm" tone="subdued">Order</Text>
              <Text as="p" variant="bodySm" tone="subdued">Customer</Text>
              <Text as="p" variant="bodySm" tone="subdued">Date</Text>
              <Text as="p" variant="bodySm" tone="subdued">Status</Text>
              <Text as="p" variant="bodySm" tone="subdued">Total</Text>
            </div>

            {[
              { id: '#1001', customer: 'John Doe', date: 'Nov 3, 2025', status: 'Fulfilled', total: '$312.96' },
              { id: '#1002', customer: 'Jane Smith', date: 'Nov 3, 2025', status: 'Processing', total: '$156.50' },
              { id: '#1003', customer: 'Bob Johnson', date: 'Nov 2, 2025', status: 'Unfulfilled', total: '$89.99' },
              { id: '#1004', customer: 'Alice Brown', date: 'Nov 2, 2025', status: 'Fulfilled', total: '$445.00' },
              { id: '#1005', customer: 'Charlie Wilson', date: 'Nov 1, 2025', status: 'Processing', total: '$234.75' }
            ].map((order, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '16px', padding: '16px 0', borderBottom: index < 4 ? '1px solid #e1e3e5' : 'none', alignItems: 'center' }}>
                <div>
                  <Text as="p" variant="bodySm" fontWeight="medium">{order.id}</Text>
                  <Text as="p" variant="bodySm" tone="subdued">3 items</Text>
                </div>
                <Text as="p" variant="bodySm">{order.customer}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{order.date}</Text>
                <Badge status={
                  order.status === 'Fulfilled' ? 'success' :
                  order.status === 'Processing' ? 'attention' : 'info'
                }>
                  {order.status}
                </Badge>
                <Text as="p" variant="bodySm" fontWeight="medium">{order.total}</Text>
              </div>
            ))}
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Quick Stats</Text>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text as="p" variant="bodySm">Today's Orders</Text>
                <Badge>8</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text as="p" variant="bodySm">Pending Fulfillment</Text>
                <Badge status="attention">12</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text as="p" variant="bodySm">Unfulfilled</Text>
                <Badge status="info">5</Badge>
              </div>
            </div>
          </Card>

          <Card sectioned>
            <Text as="h3" variant="headingMd">Actions</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <Button fullWidth variant="primary">Fulfill Selected</Button>
              <Button fullWidth variant="secondary">Create Return</Button>
              <Button fullWidth variant="plain">Export Orders</Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const SettingsPage: Story = {
  render: () => (
    <Page
      title="Settings"
      subtitle="Configure your store preferences"
      backAction={{
        content: 'Store settings',
        onAction: () => console.log('Back clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingLg">Store Details</Text>
            <Text as="p" variant="bodyMd" style={{ marginBottom: '24px' }}>
              Configure your store's basic information and appearance.
            </Text>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Text as="h4" variant="headingSm">Store Information</Text>
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">Store Name Input</Text>
                  </div>

                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">Store Email Input</Text>
                  </div>

                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">Store Phone Input</Text>
                  </div>
                </div>
              </div>

              <div>
                <Text as="h4" variant="headingSm">Address</Text>
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">Address Line 1</Text>
                  </div>

                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">City</Text>
                  </div>

                  <div style={{
                    padding: '12px',
                    border: '1px dashed #d2d2d7',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa'
                  }}>
                    <Text as="p" variant="bodySm">Country/Region</Text>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
              <Button variant="primary">Save Settings</Button>
              <Button variant="plain">Cancel</Button>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Store Status</Text>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text as="p" variant="bodySm">Online Store</Text>
                <Badge status="success">Active</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text as="p" variant="bodySm">Checkout</Text>
                <Badge status="success">Enabled</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text as="p" variant="bodySm">Payments</Text>
                <Badge status="success">Connected</Badge>
              </div>
            </div>
          </Card>

          <Card sectioned>
            <Text as="h3" variant="headingMd">Store Performance</Text>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <Text as="p" variant="bodySm" tone="subdued">Store Speed</Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e1e3e5',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '85%',
                      height: '100%',
                      backgroundColor: '#4caf50'
                    }} />
                  </div>
                  <Text as="p" variant="bodySm">85%</Text>
                </div>
              </div>

              <div>
                <Text as="p" variant="bodySm" tone="subdued">Mobile Friendly</Text>
                <Badge status="success">Optimized</Badge>
              </div>

              <div>
                <Text as="p" variant="bodySm" tone="subdued">SEO Score</Text>
                <Badge status="attention">Good</Badge>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const FullWidthPage: Story = {
  render: () => (
    <Page
      title="Full Width Dashboard"
      fullWidth
      primaryAction={{
        content: 'Refresh Data',
        onAction: () => console.log('Refresh clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">$45,234</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Revenue</Text>
                <Badge status="success">+12.5%</Badge>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">1,892</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Orders</Text>
                <Badge status="success">+8.2%</Badge>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">456</Text>
                <Text as="p" variant="bodySm" tone="subdued">New Customers</Text>
                <Badge status="attention">+2.1%</Badge>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text as="p" variant="headingLg">3.4%</Text>
                <Text as="p" variant="bodySm" tone="subdued">Conversion Rate</Text>
                <Badge status="critical">-0.8%</Badge>
              </div>
            </div>

            <div style={{
              height: '300px',
              backgroundColor: '#f4f6f8',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text as="p" variant="bodyMd" tone="subdued">Sales Chart Visualization</Text>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};