import type { Meta, StoryObj } from '@storybook/react';
import { Layout, Card, Button, Text, Badge } from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

import React from 'react';

const meta = {
  title: 'Components/Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Layout is the classic Polaris layout component that provides a structured layout with sections and annotated areas. It\'s designed for creating consistent page layouts with proper spacing and organization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sectioned: {
      control: 'boolean',
      description: 'Add sectioning to layout content',
    },
    secondary: {
      control: 'boolean',
      description: 'Display as secondary layout',
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Main Content Area</Text>
          <Text as="p" variant="bodyMd">
            This is the primary content section where the main information and functionality resides.
          </Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Secondary Content</Text>
          <Text as="p" variant="bodySm">
            This sidebar section contains supplementary information and actions.
          </Text>
        </Card>
      </Layout.Section>
    </Layout>
  ),
};

export const TwoColumnLayout: Story = {
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Dashboard Overview</Text>
          <Text as="p" variant="bodyMd" style={{ marginBottom: 'var(--spacing-5)' }}>
            Welcome to your dashboard. Here\'s what\'s happening with your store today.
          </Text>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)',
              textAlign: 'center'
            }}>
              <Text as="p" variant="headingLg">$12,345</Text>
              <Text as="p" variant="bodySm" tone="subdued">Total Revenue</Text>
            </div>

            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)',
              textAlign: 'center'
            }}>
              <Text as="p" variant="headingLg">245</Text>
              <Text as="p" variant="bodySm" tone="subdued">Orders</Text>
            </div>

            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)',
              textAlign: 'center'
            }}>
              <Text as="p" variant="headingLg">892</Text>
              <Text as="p" variant="bodySm" tone="subdued">Customers</Text>
            </div>
          </div>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Quick Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-3)' }}>
            <Button fullWidth>Add Product</Button>
            <Button fullWidth variant="secondary">View Orders</Button>
            <Button fullWidth variant="plain">Generate Report</Button>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Recent Activity</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <Text as="p" variant="bodySm">New order #1001</Text>
              <Text as="p" variant="bodySm" tone="subdued">2 minutes ago</Text>
            </div>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <Text as="p" variant="bodySm">Product updated</Text>
              <Text as="p" variant="bodySm" tone="subdued">1 hour ago</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm">Payment received</Text>
              <Text as="p" variant="bodySm" tone="subdued">3 hours ago</Text>
            </div>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  ),,
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },

};

export const ProductPage: Story = {
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Classic T-Shirt</Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center', marginBottom: 'var(--spacing-5)' }}>
            <Badge status="success">In Stock</Badge>
            <Text as="p" variant="bodySm" tone="subdued">SKU: TS-001</Text>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-6)'
          }}>
            <div>
              <Text as="h3" variant="headingSm">Product Details</Text>
              <div style={{ marginTop: 'var(--spacing-3)' }}>
                <div style={{
                  padding: 'var(--spacing-10)',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: 'var(--border-radius-base)',
                  textAlign: 'center'
                }}>
                  <Text as="p" variant="bodySm">Product Image</Text>
                </div>
              </div>
            </div>

            <div>
              <Text as="h3" variant="headingSm">Pricing & Inventory</Text>
              <div style={{ marginTop: 'var(--spacing-3)' }}>
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <Text as="p" variant="bodySm" tone="subdued">Price</Text>
                  <Text as="p" variant="headingLg">$29.99</Text>
                </div>

                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <Text as="p" variant="bodySm" tone="subdued">Compare at Price</Text>
                  <Text as="p" variant="headingMd" tone="subdued">$39.99</Text>
                </div>

                <div>
                  <Text as="p" variant="bodySm" tone="subdued">Stock</Text>
                  <Text as="p" variant="headingMd">150 units</Text>
                </div>
              </div>
            </div>
          </div>

          <Text as="h3" variant="headingSm">Description</Text>
          <Text as="p" variant="bodyMd" style={{ marginTop: 'var(--spacing-2)' }}>
            Classic cotton t-shirt with a comfortable fit. Made from 100% premium cotton,
            this versatile piece is perfect for everyday wear. Available in multiple colors
            and sizes to suit your style.
          </Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Product Status</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text as="p" variant="bodySm">Active</Text>
              <Badge status="success">Enabled</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text as="p" variant="bodySm">Visible</Text>
              <Badge status="success">Online</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text as="p" variant="bodySm">Track Inventory</Text>
              <Badge status="info">Enabled</Badge>
            </div>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Collections</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
              <Badge>Summer Collection</Badge>
              <Badge>Bestsellers</Badge>
              <Badge>Casual Wear</Badge>
            </div>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-3)' }}>
            <Button fullWidth variant="primary">Save Product</Button>
            <Button fullWidth variant="secondary">Duplicate</Button>
            <Button fullWidth variant="plain">Preview</Button>
            <Button fullWidth variant="critical">Delete</Button>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  ),,
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },

};

export const OrderManagement: Story = {
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Order #1001</Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center', marginBottom: 'var(--spacing-5)' }}>
            <Badge status="success">Fulfilled</Badge>
            <Text as="p" variant="bodySm" tone="subdued">Placed on Nov 3, 2025</Text>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
            <div>
              <Text as="h3" variant="headingSm">Customer Information</Text>
              <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <Text as="p" variant="bodyMd">John Doe</Text>
                <Text as="p" variant="bodySm" tone="subdued">john.doe@example.com</Text>
                <Text as="p" variant="bodySm" tone="subdued">(555) 123-4567</Text>
                <Text as="p" variant="bodySm" tone="subdued">123 Main St, City, State 12345</Text>
              </div>
            </div>

            <div>
              <Text as="h3" variant="headingSm">Payment Information</Text>
              <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <Text as="p" variant="bodyMd">Credit Card</Text>
                <Text as="p" variant="bodySm" tone="subdued">•••• 4242</Text>
                <Text as="p" variant="bodySm" tone="subdued">Paid on Nov 3, 2025</Text>
                <Badge status="success">Payment Complete</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingSm">Order Items</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--spacing-4)', padding: 'var(--spacing-3) 0', borderBottom: '1px solid var(--color-gray-200)' }}>
              <Text as="p" variant="bodySm" tone="subdued">Product</Text>
              <Text as="p" variant="bodySm" tone="subdued">Quantity</Text>
              <Text as="p" variant="bodySm" tone="subdued">Price</Text>
              <Text as="p" variant="bodySm" tone="subdued">Total</Text>
            </div>

            {[
              { name: 'Classic T-Shirt', qty: 2, price: 29.99, total: 59.98 },
              { name: 'Denim Jeans', qty: 1, price: 89.99, total: 89.99 },
              { name: 'Running Shoes', qty: 1, price: 129.99, total: 129.99 }
            ].map((item, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--spacing-4)', padding: 'var(--spacing-3) 0', borderBottom: index < 2 ? '1px solid var(--color-gray-200)' : 'none' }}>
                <Text as="p" variant="bodySm">{item.name}</Text>
                <Text as="p" variant="bodySm">{item.qty}</Text>
                <Text as="p" variant="bodySm">${item.price}</Text>
                <Text as="p" variant="bodySm">${item.total}</Text>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-4)' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-2)' }}>
                  <Text as="p" variant="bodySm" tone="subdued">Subtotal:</Text>
                  <Text as="p" variant="bodySm">$279.96</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-2)' }}>
                  <Text as="p" variant="bodySm" tone="subdued">Shipping:</Text>
                  <Text as="p" variant="bodySm">$10.00</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-2)' }}>
                  <Text as="p" variant="bodySm" tone="subdued">Tax:</Text>
                  <Text as="p" variant="bodySm">$23.00</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                  <Text as="p" variant="bodyMd" fontWeight="bold">Total:</Text>
                  <Text as="p" variant="headingMd">$312.96</Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Fulfillment Status</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <Badge status="success" style={{ marginBottom: 'var(--spacing-3)', display: 'block' }}>Fulfilled</Badge>
            <Text as="p" variant="bodySm" tone="subdued">Shipped on Nov 4, 2025</Text>
            <Text as="p" variant="bodySm" tone="subdued">Tracking: 1Z999AA10123456784</Text>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Order Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <Button fullWidth variant="secondary">Add Tracking</Button>
            <Button fullWidth variant="secondary">Create Return</Button>
            <Button fullWidth variant="plain">View Receipt</Button>
            <Button fullWidth variant="plain">Print Label</Button>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Timeline</Text>
          <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Nov 4, 2:30 PM</Text>
              <Text as="p" variant="bodySm">Order shipped</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Nov 3, 10:15 AM</Text>
              <Text as="p" variant="bodySm">Payment processed</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Nov 3, 9:45 AM</Text>
              <Text as="p" variant="bodySm">Order placed</Text>
            </div>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  ),,
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },

};

export const SettingsPage: Story = {
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Store Settings</Text>
          <Text as="p" variant="bodyMd" style={{ marginBottom: 'var(--spacing-6)' }}>
            Manage your store configuration and preferences.
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
            <div>
              <Text as="h3" variant="headingMd">General Settings</Text>
              <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                <div style={{
                  padding: 'var(--spacing-3)',
                  border: '1px dashed var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-base)',
                  backgroundColor: 'var(--color-gray-50)'
                }}>
                  <Text as="p" variant="bodySm">Store Name Input</Text>
                </div>

                <div style={{
                  padding: 'var(--spacing-3)',
                  border: '1px dashed var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-base)',
                  backgroundColor: 'var(--color-gray-50)'
                }}>
                  <Text as="p" variant="bodySm">Store Email Input</Text>
                </div>

                <div style={{
                  padding: 'var(--spacing-10)',
                  border: '1px dashed var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-base)',
                  backgroundColor: 'var(--color-gray-50)'
                }}>
                  <Text as="p" variant="bodySm">Store Logo Upload</Text>
                </div>
              </div>
            </div>

            <div>
              <Text as="h3" variant="headingMd">Currency & Timezone</Text>
              <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                <div style={{
                  padding: 'var(--spacing-3)',
                  border: '1px dashed var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-base)',
                  backgroundColor: 'var(--color-gray-50)'
                }}>
                  <Text as="p" variant="bodySm">Currency Select</Text>
                </div>

                <div style={{
                  padding: 'var(--spacing-3)',
                  border: '1px dashed var(--color-gray-300)',
                  borderRadius: 'var(--border-radius-base)',
                  backgroundColor: 'var(--color-gray-50)'
                }}>
                  <Text as="p" variant="bodySm">Timezone Select</Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Quick Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-3)' }}>
            <Button fullWidth variant="primary">Save Settings</Button>
            <Button fullWidth variant="plain">Export Settings</Button>
            <Button fullWidth variant="plain">Reset to Default</Button>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Help Resources</Text>
          <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Button fullWidth variant="plain">📚 Documentation</Button>
            <Button fullWidth variant="plain">💬 Support Chat</Button>
            <Button fullWidth variant="plain">🎥 Video Tutorials</Button>
            <Button fullWidth variant="plain">📧 Email Support</Button>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Store Status</Text>
          <div style={{ marginTop: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
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
      </Layout.Section>
    </Layout>
  ),,
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },

};

export const CustomerProfile: Story = {
  render: () => (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gray-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "30px"
            }}>👤</div>
            <div>
              <Text as="h2" variant="headingLg">John Doe</Text>
              <Text as="p" variant="bodyMd" tone="subdued">Customer since October 2024</Text>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
                <Badge status="success">VIP Customer</Badge>
                <Badge status="info">Verified</Badge>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)'
            }}>
              <Text as="p" variant="bodySm" tone="subdued">Total Orders</Text>
              <Text as="p" variant="headingLg">24</Text>
            </div>

            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)'
            }}>
              <Text as="p" variant="bodySm" tone="subdued">Total Spent</Text>
              <Text as="p" variant="headingLg">$1,847</Text>
            </div>

            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-base)'
            }}>
              <Text as="p" variant="bodySm" tone="subdued">Average Order</Text>
              <Text as="p" variant="headingLg">$76.95</Text>
            </div>
          </div>

          <Text as="h3" variant="headingMd">Contact Information</Text>
          <div style={{ marginTop: 'var(--spacing-3)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
            <div>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <Text as="p" variant="bodySm" tone="subdued">Email</Text>
                <Text as="p" variant="bodyMd">john.doe@example.com</Text>
              </div>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <Text as="p" variant="bodySm" tone="subdued">Phone</Text>
                <Text as="p" variant="bodyMd">(555) 123-4567</Text>
              </div>
            </div>

            <div>
              <div>
                <Text as="p" variant="bodySm" tone="subdued">Address</Text>
                <Text as="p" variant="bodyMd">123 Main St</Text>
                <Text as="p" variant="bodyMd">City, State 12345</Text>
                <Text as="p" variant="bodyMd">United States</Text>
              </div>
            </div>
          </div>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Customer Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-3)' }}>
            <Button fullWidth variant="primary">Send Email</Button>
            <Button fullWidth variant="secondary">Create Order</Button>
            <Button fullWidth variant="plain">View All Orders</Button>
            <Button fullWidth variant="plain">Edit Customer</Button>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Recent Orders</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            {[
              { id: '#1001', date: 'Nov 3, 2025', status: 'Delivered', total: '$129.99' },
              { id: '#0987', date: 'Oct 28, 2025', status: 'Shipped', total: '$89.50' },
              { id: '#0956', date: 'Oct 15, 2025', status: 'Delivered', total: '$234.75' }
            ].map((order, index) => (
              <div key={index} style={{
                padding: 'var(--spacing-3) 0',
                borderBottom: index < 2 ? '1px solid var(--color-gray-200)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text as="p" variant="bodySm">{order.id}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">{order.date}</Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge status={order.status === 'Delivered' ? 'success' : 'attention'}>
                      {order.status}
                    </Badge>
                    <Text as="p" variant="bodySm">{order.total}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Tags</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
              <Badge>VIP</Badge>
              <Badge>Regular Shopper</Badge>
              <Badge>Premium Products</Badge>
              <Badge>Fashion</Badge>
              <Badge>Returns Customer</Badge>
            </div>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  ),,
  parameters: {
    codeVariants: getCodeVariants('layout', 'default'),
  },

};