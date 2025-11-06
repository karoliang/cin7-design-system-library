import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Card, Button, Text, Badge } from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

import React from 'react';

const meta = {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Grid provides a flexible, responsive layout system based on CSS Grid. It allows you to create complex multi-column layouts with precise control over spacing, alignment, and responsive behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Grid columns configuration (object with breakpoint keys)',
    },
    gap: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Gap between grid items',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('grid', 'default'),
  },
  render: () => (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="400">
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 1</Text>
        <Text as="p" variant="bodySm">First grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 2</Text>
        <Text as="p" variant="bodySm">Second grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 3</Text>
        <Text as="p" variant="bodySm">Third grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 4</Text>
        <Text as="p" variant="bodySm">Fourth grid item</Text>
      </Card>
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px' }}>
      <Text as="h2" variant="headingMd" style={{ marginBottom: 'var(--spacing-4)' }}>Responsive Product Grid</Text>
      <Text as="p" variant="bodySm" tone="subdued" style={{ marginBottom: 'var(--spacing-6)' }}>
        This grid adapts from 1 column on mobile to 4 columns on desktop
      </Text>

      <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="400">
        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>👕</div>
          <Text as="h3" variant="headingSm">Classic T-Shirt</Text>
          <Text as="p" variant="bodyMd">$29.99</Text>
          <Badge status="success">In Stock</Badge>
        </Card>

        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>👖</div>
          <Text as="h3" variant="headingSm">Denim Jeans</Text>
          <Text as="p" variant="bodyMd">$89.99</Text>
          <Badge status="attention">Low Stock</Badge>
        </Card>

        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>👟</div>
          <Text as="h3" variant="headingSm">Running Shoes</Text>
          <Text as="p" variant="bodyMd">$129.99</Text>
          <Badge status="success">In Stock</Badge>
        </Card>

        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>🧥</div>
          <Text as="h3" variant="headingSm">Winter Jacket</Text>
          <Text as="p" variant="bodyMd">$199.99</Text>
          <Badge status="critical">Out of Stock</Badge>
        </Card>

        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>🎒</div>
          <Text as="h3" variant="headingSm">Backpack</Text>
          <Text as="p" variant="bodyMd">$59.99</Text>
          <Badge status="success">In Stock</Badge>
        </Card>

        <Card sectioned>
          <div style={{
            height: '120px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            marginBottom: 'var(--spacing-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>⌚</div>
          <Text as="h3" variant="headingSm">Smart Watch</Text>
          <Text as="p" variant="bodyMd">$299.99</Text>
          <Badge status="attention">Pre-order</Badge>
        </Card>
      </Grid>
    </div>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: '800px' }}>
      <div>
        <Text as="h3" variant="headingMd">No spacing</Text>
        <Grid columns={{ xs: 2, md: 3 }} gap="none" style={{ marginTop: 'var(--spacing-3)' }}>
          <Card sectioned>
            <Badge>Item 1</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 2</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 3</Badge>
          </Card>
        </Grid>
      </div>

      <div>
        <Text as="h3" variant="headingMd">Tight spacing</Text>
        <Grid columns={{ xs: 2, md: 3 }} gap="200" style={{ marginTop: 'var(--spacing-3)' }}>
          <Card sectioned>
            <Badge>Item 1</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 2</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 3</Badge>
          </Card>
        </Grid>
      </div>

      <div>
        <Text as="h3" variant="headingMd">Base spacing</Text>
        <Grid columns={{ xs: 2, md: 3 }} gap="400" style={{ marginTop: 'var(--spacing-3)' }}>
          <Card sectioned>
            <Badge>Item 1</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 2</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 3</Badge>
          </Card>
        </Grid>
      </div>

      <div>
        <Text as="h3" variant="headingMd">Loose spacing</Text>
        <Grid columns={{ xs: 2, md: 3 }} gap="500" style={{ marginTop: 'var(--spacing-3)' }}>
          <Card sectioned>
            <Badge>Item 1</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 2</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 3</Badge>
          </Card>
        </Grid>
      </div>

      <div>
        <Text as="h3" variant="headingMd">Extra Loose spacing</Text>
        <Grid columns={{ xs: 2, md: 3 }} gap="800" style={{ marginTop: 'var(--spacing-3)' }}>
          <Card sectioned>
            <Badge>Item 1</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 2</Badge>
          </Card>
          <Card sectioned>
            <Badge>Item 3</Badge>
          </Card>
        </Grid>
      </div>
    </div>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', width: '100%' }}>
      <Text as="h2" variant="headingLg" style={{ marginBottom: 'var(--spacing-6)' }}>Dashboard Overview</Text>

      <Grid
        columns={{
          xs: 1,
          sm: 2,
          lg: 3
        }}
        gap="400"
        areas={{
          lg: [
            'stats stats stats',
            'chart chart recent',
            'chart chart recent',
          ]
        }}
      >
        <Card sectioned>
          <Text as="h3" variant="headingMd">📊 Revenue</Text>
          <Text as="p" variant="headingLg">$12,345</Text>
          <Badge status="success">+15% from last month</Badge>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">👥 Customers</Text>
          <Text as="p" variant="headingLg">1,892</Text>
          <Badge status="success">+8% from last month</Badge>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">📦 Orders</Text>
          <Text as="p" variant="headingLg">245</Text>
          <Badge status="attention">+2% from last month</Badge>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">📈 Sales Chart</Text>
          <div style={{
            height: '200px',
            backgroundColor: 'var(--color-gray-100)',
            borderRadius: 'var(--border-radius-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'var(--spacing-3)'
          }}>
            <Text as="p" variant="bodySm" tone="subdued">Chart visualization area</Text>
          </div>
          <Button fullWidth style={{ marginTop: 'var(--spacing-3)' }}>View Detailed Analytics</Button>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">🔔 Recent Activity</Text>
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <Text as="p" variant="bodySm">New order #1001</Text>
              <Text as="p" variant="bodySm" tone="subdued">2 minutes ago</Text>
            </div>
            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <Text as="p" variant="bodySm">Payment received</Text>
              <Text as="p" variant="bodySm" tone="subdued">15 minutes ago</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm">Product updated</Text>
              <Text as="p" variant="bodySm" tone="subdued">1 hour ago</Text>
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  ),
};

export const ProductFeatures: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', width: '100%' }}>
      <Text as="h2" variant="headingLg" style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>Product Features</Text>

      <Grid columns={{ xs: 1, sm: 2, lg: 3 }} gap="500">
        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>🚀</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Fast Performance</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Optimized for speed and efficiency, ensuring smooth user experience.
          </Text>
        </Card>

        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>🔒</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Secure</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Enterprise-grade security features to protect your data and privacy.
          </Text>
        </Card>

        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>📱</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Responsive</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Works seamlessly across all devices and screen sizes.
          </Text>
        </Card>

        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>🎨</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Customizable</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Flexible design system that adapts to your brand and needs.
          </Text>
        </Card>

        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>⚡</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Real-time</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Live updates and instant synchronization across all users.
          </Text>
        </Card>

        <Card sectioned>
          <div style={{
            fontSize: '48px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)'
          }}>🌍</div>
          <Text as="h3" variant="headingMd" style={{ textAlign: 'center' }}>Global</Text>
          <Text as="p" variant="bodySm" style={{ textAlign: 'center' }}>
            Multi-language support and localized features for worldwide use.
          </Text>
        </Card>
      </Grid>
    </div>
  ),
};

export const FormSections: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', width: '100%' }}>
      <Card sectioned>
        <Text as="h2" variant="headingLg" style={{ marginBottom: 'var(--spacing-6)' }}>Product Configuration</Text>

        <Grid columns={{ xs: 1, lg: 2 }} gap="600">
          <div>
            <Text as="h3" variant="headingMd" style={{ marginBottom: 'var(--spacing-4)' }}>Basic Information</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">Product Name Input</Text>
              </div>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">Description Textarea</Text>
              </div>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">Category Select</Text>
              </div>
            </div>
          </div>

          <div>
            <Text as="h3" variant="headingMd" style={{ marginBottom: 'var(--spacing-4)' }}>Pricing & Inventory</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">Price Input</Text>
              </div>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">Stock Quantity</Text>
              </div>
              <div style={{
                padding: 'var(--spacing-3)',
                border: '1px dashed var(--color-gray-300)',
                borderRadius: 'var(--border-radius-base)',
                backgroundColor: 'var(--color-gray-50)'
              }}>
                <Text as="p" variant="bodySm">SKU Input</Text>
              </div>
            </div>
          </div>

          <div>
            <Text as="h3" variant="headingMd" style={{ marginBottom: 'var(--spacing-4)' }}>Media</Text>
            <div style={{
              padding: 'var(--spacing-10)',
              border: '2px dashed var(--color-gray-300)',
              borderRadius: 'var(--border-radius-base)',
              backgroundColor: 'var(--color-gray-50)',
              textAlign: 'center'
            }}>
              <Text as="p" variant="bodySm">Product Images Upload Area</Text>
            </div>
          </div>

          <div>
            <Text as="h3" variant="headingMd" style={{ marginBottom: 'var(--spacing-4)' }}>Shipping Options</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <input type="checkbox" />
                <Text as="p" variant="bodySm">Free shipping</Text>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <input type="checkbox" />
                <Text as="p" variant="bodySm">Express delivery</Text>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <input type="checkbox" />
                <Text as="p" variant="bodySm">International shipping</Text>
              </label>
            </div>
          </div>
        </Grid>

        <div style={{ marginTop: 'var(--spacing-8)', display: 'flex', gap: 'var(--spacing-3)' }}>
          <Button variant="primary">Save Product</Button>
          <Button variant="secondary">Save Draft</Button>
          <Button variant="plain">Cancel</Button>
        </div>
      </Card>
    </div>
  ),
};

export const StatisticsGrid: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', width: '100%' }}>
      <Text as="h2" variant="headingLg" style={{ marginBottom: 'var(--spacing-6)' }}>Analytics Dashboard</Text>

      <Grid columns={{ xs: 2, sm: 3, lg: 4, xl: 6 }} gap="400">
        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">Revenue</Text>
          <Text as="p" variant="headingLg">$45.2K</Text>
          <Badge status="success">↑ 12%</Badge>
        </Card>

        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">Orders</Text>
          <Text as="p" variant="headingLg">1,234</Text>
          <Badge status="success">↑ 8%</Badge>
        </Card>

        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">Customers</Text>
          <Text as="p" variant="headingLg">892</Text>
          <Badge status="attention">↑ 2%</Badge>
        </Card>

        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">Conversion</Text>
          <Text as="p" variant="headingLg">3.4%</Text>
          <Badge status="critical">↓ 1%</Badge>
        </Card>

        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">AOV</Text>
          <Text as="p" variant="headingLg">$125</Text>
          <Badge status="success">↑ 5%</Badge>
        </Card>

        <Card sectioned>
          <Text as="p" variant="bodySm" tone="subdued">Refund</Text>
          <Text as="p" variant="headingLg">2.1%</Text>
          <Badge status="success">↓ 0.5%</Badge>
        </Card>
      </Grid>

      <Grid columns={{ xs: 1, lg: 2 }} gap="400" style={{ marginTop: 'var(--spacing-6)' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Top Products</Text>
          <div style={{ marginTop: 'var(--spacing-4)' }}>
            {['Classic T-Shirt', 'Denim Jeans', 'Running Shoes'].map((product, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-2) 0',
                borderBottom: index < 2 ? '1px solid var(--color-gray-200)' : 'none'
              }}>
                <Text as="p" variant="bodySm">{product}</Text>
                <Badge>{245 - index * 45} sold</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Recent Orders</Text>
          <div style={{ marginTop: 'var(--spacing-4)' }}>
            {['#1001', '#1002', '#1003'].map((order, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-2) 0',
                borderBottom: index < 2 ? '1px solid var(--color-gray-200)' : 'none'
              }}>
                <Text as="p" variant="bodySm">{order}</Text>
                <Badge status={index === 0 ? 'success' : index === 1 ? 'attention' : 'info'}>
                  {index === 0 ? 'Delivered' : index === 1 ? 'Processing' : 'Placed'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  ),
};