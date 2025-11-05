import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList, Card, BlockStack, InlineStack, Badge, Button, Icon, Avatar, Text } from '@shopify/polaris';
import { CustomerMajor, PackageMajor, CurrencyDollarMajor, ClockMajor, LocationMinor, EmailMinor, PhoneMinor } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/DescriptionList',
  component: DescriptionList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description lists are used to display key-value pairs in a structured format. They\'re ideal for showing metadata, specifications, customer information, product details, and any tabular data that benefits from a label-value presentation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of description items with term and description',
    },
    spacing: {
      control: 'select',
      options: ['loose', 'tight'],
      description: 'Spacing between items',
    },
    columns: {
      control: 'number',
      description: 'Number of columns for desktop layout',
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        term: 'Order number',
        description: '#1001',
      },
      {
        term: 'Date',
        description: 'July 21, 2023',
      },
      {
        term: 'Status',
        description: 'Fulfilled',
      },
      {
        term: 'Payment status',
        description: 'Paid',
      },
    ],
  },
};

export const ProductDetails: Story = {
  args: {
    items: [
      {
        term: 'SKU',
        description: 'TSHIRT-BLUE-M',
      },
      {
        term: 'Product Type',
        description: 'Apparel',
      },
      {
        term: 'Vendor',
        description: 'Fashion Brand Co.',
      },
      {
        term: 'Collection',
        description: 'Summer Collection 2023',
      },
      {
        term: 'Weight',
        description: '0.25 kg',
      },
      {
        term: 'Dimensions',
        description: '30cm × 20cm × 2cm',
      },
    ],
  },
};

export const CustomerInformation: Story = {
  args: {
    items: [
      {
        term: 'Customer ID',
        description: 'CUST-2023-001',
      },
      {
        term: 'Email',
        description: 'john.smith@example.com',
      },
      {
        term: 'Phone',
        description: '+1 (555) 123-4567',
      },
      {
        term: 'Location',
        description: 'New York, NY, USA',
      },
      {
        term: 'Total Orders',
        description: '12',
      },
      {
        term: 'Lifetime Value',
        description: '$2,847.50',
      },
      {
        term: 'Customer Since',
        description: 'January 15, 2022',
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      {
        term: 'Status',
        description: <Badge status="success">Active</Badge>,
      },
      {
        term: 'Priority',
        description: <Badge status="attention">High</Badge>,
      },
      {
        term: 'Verification',
        description: <Badge status="info">Pending</Badge>,
      },
      {
        term: 'Risk Level',
        description: <Badge status="critical">Low</Badge>,
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        term: (
          <InlineStack gap="200">
            <Icon source={EmailMinor} />
            Email
          </InlineStack>
        ),
        description: 'contact@company.com',
      },
      {
        term: (
          <InlineStack gap="200">
            <Icon source={PhoneMinor} />
            Phone
          </InlineStack>
        ),
        description: '+1 (555) 987-6543',
      },
      {
        term: (
          <InlineStack gap="200">
            <Icon source={LocationMinor} />
            Address
          </InlineStack>
        ),
        description: '123 Business St, Suite 100',
      },
      {
        term: (
          <InlineStack gap="200">
            <Icon source={ClockMinor} />
            Business Hours
          </InlineStack>
        ),
        description: 'Mon-Fri: 9AM-6PM EST',
      },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    items: [
      {
        term: 'Product Name',
        description: 'Premium Cotton T-Shirt',
      },
      {
        term: 'SKU',
        description: 'TSHIRT-PREMIUM-001',
      },
      {
        term: 'Price',
        description: '$29.99',
      },
      {
        term: 'Compare at Price',
        description: '$39.99',
      },
      {
        term: 'Cost per Item',
        description: '$12.50',
      },
      {
        term: 'Profit',
        description: '$17.49',
      },
      {
        term: 'Margin',
        description: '58.3%',
      },
      {
        term: 'Weight',
        description: '0.2 kg',
      },
    ],
    columns: 2,
  },
};

export const TightSpacing: Story = {
  args: {
    items: [
      {
        term: 'Width',
        description: '50cm',
      },
      {
        term: 'Height',
        description: '70cm',
      },
      {
        term: 'Depth',
        description: '30cm',
      },
      {
        term: 'Weight',
        description: '1.5kg',
      },
      {
        term: 'Material',
        description: '100% Cotton',
      },
      {
        term: 'Care Instructions',
        description: 'Machine wash cold',
      },
    ],
    spacing: 'tight',
  },
};

export const ComplexProductSpecs: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Product Specifications</h3>

          <BlockStack gap="800">
            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Basic Information
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Product ID',
                    description: 'PRD-2023-789',
                  },
                  {
                    term: 'Name',
                    description: 'Wireless Bluetooth Headphones Pro',
                  },
                  {
                    term: 'Brand',
                    description: 'AudioTech Premium',
                  },
                  {
                    term: 'Model',
                    description: 'ATH-BTX-Pro-2023',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Physical Characteristics
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Weight',
                    description: '250g',
                  },
                  {
                    term: 'Dimensions',
                    description: '18cm × 16cm × 8cm',
                  },
                  {
                    term: 'Color Options',
                    description: 'Midnight Black, Arctic White, Rose Gold',
                  },
                  {
                    term: 'Materials',
                    description: 'Aluminum alloy, Memory foam, Synthetic leather',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Technical Specifications
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Bluetooth Version',
                    description: '5.2',
                  },
                  {
                    term: 'Battery Life',
                    description: '30 hours (ANC off), 24 hours (ANC on)',
                  },
                  {
                    term: 'Charging Time',
                    description: '2 hours (fast charge: 10 min = 3 hours)',
                  },
                  {
                    term: 'Driver Size',
                    description: '40mm dynamic drivers',
                  },
                  {
                    term: 'Frequency Response',
                    description: '20Hz - 20kHz',
                  },
                  {
                    term: 'Impedance',
                    description: '32Ω',
                  },
                  {
                    term: 'Codec Support',
                    description: 'SBC, AAC, aptX, LDAC',
                  },
                  {
                    term: 'Noise Cancellation',
                    description: 'Active Noise Cancellation (ANC)',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Warranty & Support
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Warranty Period',
                    description: '2 years limited warranty',
                  },
                  {
                    term: 'Customer Support',
                    description: '24/7 phone and email support',
                  },
                  {
                    term: 'Return Policy',
                    description: '30-day money-back guarantee',
                  },
                ]}
              />
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const OrderDetails: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Order Details</h3>

          <BlockStack gap="600">
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                ORDER INFORMATION
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Order Number',
                    description: '#1001-2023',
                  },
                  {
                    term: 'Order Date',
                    description: 'July 21, 2023 at 2:34 PM',
                  },
                  {
                    term: 'Fulfillment Status',
                    description: <Badge status="success">Fulfilled</Badge>,
                  },
                  {
                    term: 'Financial Status',
                    description: <Badge status="success">Paid</Badge>,
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                CUSTOMER INFORMATION
              </h4>
              <DescriptionList
                items={[
                  {
                    term: (
                      <InlineStack gap="200">
                        <Avatar customer size="sm" name="John Smith" />
                        Customer
                      </InlineStack>
                    ),
                    description: 'John Smith',
                  },
                  {
                    term: 'Email',
                    description: 'john.smith@example.com',
                  },
                  {
                    term: 'Phone',
                    description: '+1 (555) 123-4567',
                  },
                  {
                    term: 'Total Orders',
                    description: '12 orders',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                SHIPPING INFORMATION
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Shipping Method',
                    description: 'Express Shipping (2-3 business days)',
                  },
                  {
                    term: 'Shipping Address',
                    description: '123 Main St, Apt 4B, New York, NY 10001',
                  },
                  {
                    term: 'Tracking Number',
                    description: '1Z9999W99999999999',
                  },
                  {
                    term: 'Estimated Delivery',
                    description: 'July 24, 2023',
                  },
                ]}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                PAYMENT INFORMATION
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Payment Method',
                    description: 'Visa ending in 4242',
                  },
                  {
                    term: 'Subtotal',
                    description: '$156.00',
                  },
                  {
                    term: 'Shipping',
                    description: '$12.00',
                  },
                  {
                    term: 'Tax',
                    description: '$13.68',
                  },
                  {
                    term: 'Total',
                    description: <strong>$181.68</strong>,
                  },
                ]}
              />
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const UserProfile: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Avatar size="large" name="Sarah Johnson" />
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Sarah Johnson</h3>
              <p style={{ margin: 0, color: '#6b7280' }}>Premium Customer</p>
            </div>
          </div>

          <BlockStack gap="600">
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                CONTACT INFORMATION
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Email',
                    description: 'sarah.johnson@example.com',
                  },
                  {
                    term: 'Phone',
                    description: '+1 (555) 987-6543',
                  },
                  {
                    term: 'Location',
                    description: 'San Francisco, CA',
                  },
                  {
                    term: 'Time Zone',
                    description: 'Pacific Time (PT)',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                ACCOUNT DETAILS
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Customer ID',
                    description: 'CUST-2022-0156',
                  },
                  {
                    term: 'Member Since',
                    description: 'March 15, 2022',
                  },
                  {
                    term: 'Account Type',
                    description: <Badge status="info">Premium</Badge>,
                  },
                  {
                    term: 'Verification Status',
                    description: <Badge status="success">Verified</Badge>,
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                SHOPPING ACTIVITY
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Total Orders',
                    description: '28',
                  },
                  {
                    term: 'Total Spent',
                    description: '$4,567.89',
                  },
                  {
                    term: 'Average Order Value',
                    description: '$163.14',
                  },
                  {
                    term: 'Last Order',
                    description: 'July 18, 2023',
                  },
                  {
                    term: 'Favorite Category',
                    description: 'Electronics',
                  },
                  {
                    term: 'Loyalty Points',
                    description: '2,847 points',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                PREFERENCES
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Communication',
                    description: 'Email & SMS notifications',
                  },
                  {
                    term: 'Newsletter',
                    description: 'Subscribed',
                  },
                  {
                    term: 'Preferred Payment',
                    description: 'Credit Card',
                  },
                  {
                    term: 'Shipping Preference',
                    description: 'Express Delivery',
                  },
                ]}
                columns={2}
              />
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const SystemMetrics: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>System Performance Metrics</h3>

          <BlockStack gap="600">
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                SERVER STATUS
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Server Status',
                    description: <Badge status="success">Online</Badge>,
                  },
                  {
                    term: 'Uptime',
                    description: '99.98%',
                  },
                  {
                    term: 'Response Time',
                    description: '124ms',
                  },
                  {
                    term: 'CPU Usage',
                    description: '32%',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                DATABASE PERFORMANCE
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Database Status',
                    description: <Badge status="success">Healthy</Badge>,
                  },
                  {
                    term: 'Connections',
                    description: '45 / 100',
                  },
                  {
                    term: 'Query Time',
                    description: '2.3ms avg',
                  },
                  {
                    term: 'Cache Hit Rate',
                    description: '94.2%',
                  },
                ]}
                columns={2}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                APPLICATION METRICS
              </h4>
              <DescriptionList
                items={[
                  {
                    term: 'Active Users',
                    description: '1,247',
                  },
                  {
                    term: 'Requests/min',
                    description: '8,934',
                  },
                  {
                    term: 'Error Rate',
                    description: '0.12%',
                  },
                  {
                    term: 'Memory Usage',
                    description: '2.1 GB / 4 GB',
                  },
                ]}
                columns={2}
              />
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const ProductComparison: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Product Comparison</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Card>
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Basic Plan
              </h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                $9.99<span style={{ fontSize: '14px', fontWeight: 'normal' }}>/month</span>
              </div>
              <DescriptionList
                spacing="tight"
                items={[
                  {
                    term: 'Users',
                    description: '1',
                  },
                  {
                    term: 'Storage',
                    description: '5 GB',
                  },
                  {
                    term: 'Bandwidth',
                    description: '100 GB',
                  },
                  {
                    term: 'Support',
                    description: 'Email',
                  },
                  {
                    term: 'Analytics',
                    description: 'Basic',
                  },
                ]}
              />
            </div>
          </Card>

          <Card>
            <div style={{ padding: '20px', border: '2px solid #007ace' }}>
              <div style={{
                display: 'inline-block',
                padding: '4px 8px',
                backgroundColor: '#007ace',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px',
                marginBottom: '12px'
              }}>
                POPULAR
              </div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Professional Plan
              </h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                $29.99<span style={{ fontSize: '14px', fontWeight: 'normal' }}>/month</span>
              </div>
              <DescriptionList
                spacing="tight"
                items={[
                  {
                    term: 'Users',
                    description: '5',
                  },
                  {
                    term: 'Storage',
                    description: '50 GB',
                  },
                  {
                    term: 'Bandwidth',
                    description: '500 GB',
                  },
                  {
                    term: 'Support',
                    description: 'Priority',
                  },
                  {
                    term: 'Analytics',
                    description: 'Advanced',
                  },
                ]}
              />
            </div>
          </Card>

          <Card>
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Enterprise Plan
              </h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                $99.99<span style={{ fontSize: '14px', fontWeight: 'normal' }}>/month</span>
              </div>
              <DescriptionList
                spacing="tight"
                items={[
                  {
                    term: 'Users',
                    description: 'Unlimited',
                  },
                  {
                    term: 'Storage',
                    description: '500 GB',
                  },
                  {
                    term: 'Bandwidth',
                    description: 'Unlimited',
                  },
                  {
                    term: 'Support',
                    description: '24/7 Phone',
                  },
                  {
                    term: 'Analytics',
                    description: 'Custom',
                  },
                ]}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Store Settings</h3>
            <Button size="slim">Edit</Button>
          </div>

          <DescriptionList
            items={[
              {
                term: 'Store Name',
                description: 'My Awesome Store',
              },
              {
                term: 'Store URL',
                description: 'my-awesome-store.myshopify.com',
              },
              {
                term: 'Currency',
                description: 'USD ($)',
              },
              {
                term: 'Time Zone',
                description: 'Eastern Time (ET)',
              },
              {
                term: 'Weight Unit',
                description: 'Pounds (lb)',
              },
              {
                term: 'Checkout Language',
                description: 'English',
              },
            ]}
            columns={2}
          />

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e1e3e5' }}>
            <InlineStack gap="200">
              <Button>Save Changes</Button>
              <Button variant="plain">Cancel</Button>
            </InlineStack>
          </div>
        </div>
      </Card>
    );
  },
};