import type { Meta, StoryObj } from '@storybook/react';
import { OptionList, Card, BlockStack, InlineStack, Button, Badge, Icon, Checkbox, RadioButton } from '@shopify/polaris';
import { PersonIcon, ProductIcon, OrderIcon, SettingsIcon, DiscountIcon, ShippingLabelIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Components/Selection/OptionList',
  component: OptionList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'OptionList displays a list of selectable options. It\'s commonly used for settings panels, configuration choices, category selection, and any scenario where users need to choose from a list of options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of option objects to display',
    },
    selected: {
      control: 'array',
      description: 'Currently selected option values',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    title: {
      control: 'text',
      description: 'Optional title for the option list',
    },
    onChange: {
      control: 'function',
      description: 'Callback when selection changes',
    },
    sectionTitle: {
      control: 'text',
      description: 'Optional section title',
    },
  },
} satisfies Meta<typeof OptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div style={{ width: 'var(--size-300)' }}>
        <OptionList
          title="Select options"
          options={[
            { value: 'today', label: 'Today' },
            { value: 'yesterday', label: 'Yesterday' },
            { value: 'lastWeek', label: 'Last 7 days' },
            { value: 'lastMonth', label: 'Last 30 days' },
            { value: 'custom', label: 'Custom range' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['electronics', 'clothing']);

    return (
      <div style={{ width: 'var(--size-300)' }}>
        <OptionList
          title="Select categories"
          allowMultiple
          options={[
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing & Apparel' },
            { value: 'home', label: 'Home & Garden' },
            { value: 'sports', label: 'Sports & Outdoors' },
            { value: 'books', label: 'Books & Media' },
            { value: 'toys', label: 'Toys & Games' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div style={{ width: 'var(--size-320)' }}>
        <OptionList
          title="Navigation options"
          options={[
            {
              value: 'customers',
              label: 'Customers',
              media: <Icon source={PersonIcon} />,
            },
            {
              value: 'products',
              label: 'Products',
              media: <Icon source={ProductIcon} />,
            },
            {
              value: 'orders',
              label: 'Orders',
              media: <Icon source={OrderIcon} />,
            },
            {
              value: 'discounts',
              label: 'Discounts',
              media: <Icon source={DiscountIcon} />,
            },
            {
              value: 'shipping',
              label: 'Shipping',
              media: <Icon source={ShippingLabelIcon} />,
            },
            {
              value: 'settings',
              label: 'Settings',
              media: <Icon source={SettingsIcon} />,
            },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div style={{ width: 'var(--size-350)' }}>
        <OptionList
          title="Shipping methods"
          options={[
            {
              value: 'standard',
              label: 'Standard Shipping',
              description: '5-7 business days',
            },
            {
              value: 'express',
              label: 'Express Shipping',
              description: '2-3 business days',
            },
            {
              value: 'overnight',
              label: 'Overnight Shipping',
              description: 'Next business day',
            },
            {
              value: 'international',
              label: 'International Shipping',
              description: '10-15 business days',
            },
            {
              value: 'pickup',
              label: 'In-Store Pickup',
              description: 'Available within 2 hours',
            },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const WithStatusBadges: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div style={{ width: 'var(--size-350)' }}>
        <OptionList
          title="Payment methods"
          options={[
            {
              value: 'credit',
              label: 'Credit Card',
              description: 'Visa, Mastercard, Amex',
              media: <Badge status="success">Active</Badge>,
            },
            {
              value: 'paypal',
              label: 'PayPal',
              description: 'Fast and secure checkout',
              media: <Badge status="success">Active</Badge>,
            },
            {
              value: 'apple',
              label: 'Apple Pay',
              description: 'One-touch payment',
              media: <Badge status="success">Active</Badge>,
            },
            {
              value: 'google',
              label: 'Google Pay',
              description: 'Quick checkout',
              media: <Badge status="attention">Setup needed</Badge>,
            },
            {
              value: 'bank',
              label: 'Bank Transfer',
              description: 'Direct bank payment',
              media: <Badge status="info">Limited</Badge>,
            },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['standard']);

    return (
      <div style={{ width: 'var(--size-300)' }}>
        <OptionList
          title="Subscription plans"
          options={[
            {
              value: 'basic',
              label: 'Basic Plan',
              description: '$9.99/month',
              disabled: true,
            },
            {
              value: 'standard',
              label: 'Standard Plan',
              description: '$29.99/month',
            },
            {
              value: 'premium',
              label: 'Premium Plan',
              description: '$99.99/month',
            },
            {
              value: 'enterprise',
              label: 'Enterprise Plan',
              description: 'Custom pricing',
              disabled: true,
            },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const UserRoleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>User Role Management</h3>

          <BlockStack gap="400">
            <div>
              <h4 style={{ margin: '0 0 var(--spacing-3) 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Select user role:
              </h4>
              <OptionList
                options={[
                  {
                    value: 'viewer',
                    label: 'Viewer',
                    description: 'Can view content but cannot make changes',
                  },
                  {
                    value: 'editor',
                    label: 'Editor',
                    description: 'Can create and edit content',
                  },
                  {
                    value: 'admin',
                    label: 'Administrator',
                    description: 'Full access to all features',
                  },
                  {
                    value: 'owner',
                    label: 'Owner',
                    description: 'Complete control including billing',
                  },
                ]}
                selected={selected}
                onChange={setSelected}
              />
            </div>

            {selected.length > 0 && (
              <div style={{
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--color-success-50)',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--color-success-400)'
              }}>
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-success-700)' }}>
                  Selected role: <strong>{selected[0]}</strong>
                </p>
              </div>
            )}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const ProductCategories: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const categories = [
      {
        title: 'Electronics',
        options: [
          {
            value: 'phones',
            label: 'Smartphones',
            description: 'iPhone, Android devices',
          },
          {
            value: 'laptops',
            label: 'Laptops & Computers',
            description: 'MacBooks, Windows PCs',
          },
          {
            value: 'tablets',
            label: 'Tablets',
            description: 'iPad, Android tablets',
          },
          {
            value: 'accessories',
            label: 'Electronics Accessories',
            description: 'Cases, chargers, cables',
          },
        ],
      },
      {
        title: 'Clothing',
        options: [
          {
            value: 'mens',
            label: 'Men\'s Clothing',
            description: 'Shirts, pants, outerwear',
          },
          {
            value: 'womens',
            label: 'Women\'s Clothing',
            description: 'Dresses, tops, bottoms',
          },
          {
            value: 'kids',
            label: 'Kids\' Clothing',
            description: 'Boys and girls clothing',
          },
          {
            value: 'shoes',
            label: 'Footwear',
            description: 'Sneakers, boots, formal shoes',
          },
        ],
      },
    ];

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Product Categories</h3>

          <BlockStack gap="600">
            {categories.map((section, index) => (
              <div key={index}>
                <h4 style={{ margin: '0 0 var(--spacing-3) 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {section.title}
                </h4>
                <OptionList
                  allowMultiple
                  options={section.options}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            ))}

            <div style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-md)'
            }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                {selected.length} categorie{selected.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const NotificationSettings: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(([
      'order-created',
      'customer-signup',
      'low-inventory'
    ]));

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Email Notifications</h3>

          <p style={{ margin: '0 0 var(--spacing-5) 0', color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
            Select the events you want to be notified about via email.
          </p>

          <OptionList
            allowMultiple
            title="Order notifications"
            options={[
              {
                value: 'order-created',
                label: 'New orders',
                description: 'When a customer places a new order',
              },
              {
                value: 'order-updated',
                label: 'Order updates',
                description: 'When order status changes',
              },
              {
                value: 'order-cancelled',
                label: 'Cancelled orders',
                description: 'When an order is cancelled',
              },
              {
                value: 'refund-processed',
                label: 'Refunds',
                description: 'When a refund is processed',
              },
            ]}
            selected={selected}
            onChange={setSelected}
          />

          <div style={{ margin: 'var(--spacing-6) 0' }}>
            <OptionList
              allowMultiple
              title="Customer notifications"
              options={[
                {
                  value: 'customer-signup',
                  label: 'New customers',
                  description: 'When a new customer registers',
                },
                {
                  value: 'customer-feedback',
                  label: 'Customer feedback',
                  description: 'When customers leave reviews',
                },
              ]}
              selected={selected}
              onChange={setSelected}
            />
          </div>

          <OptionList
            allowMultiple
            title="Inventory notifications"
            options={[
              {
                value: 'low-inventory',
                label: 'Low inventory',
                description: 'When stock levels are low',
              },
              {
                value: 'out-of-stock',
                label: 'Out of stock',
                description: 'When items go out of stock',
              },
            ]}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </Card>
    );
  },
};

export const ThemeSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const themes = [
      {
        value: 'light',
        label: 'Light Theme',
        description: 'Clean and bright interface',
        media: <div style={{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-white) 50%, var(--color-gray-100) 50%)',
          border: '1px solid var(--color-gray-200)'
        }} />,
      },
      {
        value: 'dark',
        label: 'Dark Theme',
        description: 'Easy on the eyes in low light',
        media: <div style={{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-gray-700) 50%, var(--color-gray-800) 50%)',
          border: '1px solid var(--color-gray-600)'
        }} />,
      },
      {
        value: 'auto',
        label: 'Auto Theme',
        description: 'Follows system preferences',
        media: <div style={{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-white) 25%, var(--color-gray-700) 25%, var(--color-gray-700) 75%, var(--color-white) 75%)',
          border: '1px solid var(--color-gray-200)'
        }} />,
      },
    ];

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Appearance Settings</h3>

          <OptionList
            title="Choose your theme"
            options={themes}
            selected={selected}
            onChange={setSelected}
          />

          {selected.length > 0 && (
            <div style={{ marginTop: 'var(--spacing-5)' }}>
              <Button size="slim">Apply Theme</Button>
            </div>
          )}
        </div>
      </Card>
    );
  },
};

export const ShippingOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const shippingOptions = [
      {
        value: 'free',
        label: 'Free Shipping',
        description: '5-7 business days',
        media: <Badge status="success">FREE</Badge>,
      },
      {
        value: 'standard',
        label: 'Standard Shipping',
        description: '3-5 business days',
        media: <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>$9.99</span>,
      },
      {
        value: 'express',
        label: 'Express Shipping',
        description: '2-3 business days',
        media: <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>$19.99</span>,
      },
      {
        value: 'overnight',
        label: 'Overnight Shipping',
        description: 'Next business day',
        media: <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>$39.99</span>,
      },
    ];

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Select Shipping Method</h3>

          <OptionList
            options={shippingOptions}
            selected={selected}
            onChange={setSelected}
          />

          {selected.length > 0 && (
            <div style={{ marginTop: 'var(--spacing-5)', padding: 'var(--spacing-4)', backgroundColor: 'var(--color-success-50)', borderRadius: 'var(--border-radius-md)' }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-success-700)' }}>
                <strong>Shipping selected:</strong> Your order will be delivered according to the selected method.
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  },
};

export const PermissionSettings: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const permissions = [
      {
        title: 'Store Management',
        options: [
          {
            value: 'view-products',
            label: 'View products',
            description: 'Can browse product catalog',
          },
          {
            value: 'edit-products',
            label: 'Edit products',
            description: 'Can modify product information',
          },
          {
            value: 'delete-products',
            label: 'Delete products',
            description: 'Can remove products from store',
          },
          {
            value: 'manage-inventory',
            label: 'Manage inventory',
            description: 'Can update stock levels',
          },
        ],
      },
      {
        title: 'Order Management',
        options: [
          {
            value: 'view-orders',
            label: 'View orders',
            description: 'Can view order details',
          },
          {
            value: 'process-orders',
            label: 'Process orders',
            description: 'Can fulfill and ship orders',
          },
          {
            value: 'refund-orders',
            label: 'Process refunds',
            description: 'Can issue refunds and returns',
          },
        ],
      },
      {
        title: 'Analytics',
        options: [
          {
            value: 'view-analytics',
            label: 'View analytics',
            description: 'Can access sales reports',
          },
          {
            value: 'export-data',
            label: 'Export data',
            description: 'Can download reports and data',
          },
        ],
      },
    ];

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Role Permissions</h3>

          <p style={{ margin: '0 0 var(--spacing-5) 0', color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
            Configure what this role can access and modify in your store.
          </p>

          <BlockStack gap="600">
            {permissions.map((section, index) => (
              <div key={index}>
                <h4 style={{ margin: '0 0 var(--spacing-3) 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {section.title}
                </h4>
                <OptionList
                  allowMultiple
                  options={section.options}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            ))}

            <div style={{
              padding: 'var(--spacing-3)',
              backgroundColor: 'var(--color-gray-100)',
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                {selected.length} permission{selected.length !== 1 ? 's' : ''} granted
              </span>
              <Button size="slim">Save Changes</Button>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const LanguageSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['en']);

    const languages = [
      {
        value: 'en',
        label: 'English',
        description: 'English (United States)',
        media: <span style={{ fontSize: '16px' }}>🇺🇸</span>,
      },
      {
        value: 'es',
        label: 'Spanish',
        description: 'Español (México)',
        media: <span style={{ fontSize: '16px' }}>🇲🇽</span>,
      },
      {
        value: 'fr',
        label: 'French',
        description: 'Français (France)',
        media: <span style={{ fontSize: '16px' }}>🇫🇷</span>,
      },
      {
        value: 'de',
        label: 'German',
        description: 'Deutsch (Deutschland)',
        media: <span style={{ fontSize: '16px' }}>🇩🇪</span>,
      },
      {
        value: 'zh',
        label: 'Chinese',
        description: '中文 (简体)',
        media: <span style={{ fontSize: '16px' }}>🇨🇳</span>,
      },
      {
        value: 'ja',
        label: 'Japanese',
        description: '日本語',
        media: <span style={{ fontSize: '16px' }}>🇯🇵</span>,
      },
    ];

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-4) 0', fontSize: 'var(--font-size-lg)' }}>Language Preferences</h3>

          <OptionList
            title="Select your preferred language"
            options={languages}
            selected={selected}
            onChange={setSelected}
          />

          <div style={{ marginTop: 'var(--spacing-5)' }}>
            <Button>Save Language</Button>
            <Button variant="plain" style={{ marginLeft: 'var(--spacing-3)' }}>
              Reset to Default
            </Button>
          </div>
        </div>
      </Card>
    );
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [showSummary, setShowSummary] = useState(false);

    const options = [
      {
        value: 'newsletter',
        label: 'Newsletter',
        description: 'Weekly updates and news',
      },
      {
        value: 'promotions',
        label: 'Promotional Offers',
        description: 'Special deals and discounts',
      },
      {
        value: 'new-features',
        label: 'New Features',
        description: 'Product updates and announcements',
      },
      {
        value: 'events',
        label: 'Events & Webinars',
        description: 'Upcoming online and offline events',
      },
      {
        value: 'research',
        label: 'Research Surveys',
        description: 'Help us improve our products',
      },
    ];

    const handleSave = () => {
      setShowSummary(true);
      setTimeout(() => setShowSummary(false), 3000);
    };

    return (
      <Card>
        <div style={{ padding: 'var(--spacing-5)' }}>
          <h3 style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-lg)' }}>Communication Preferences</h3>
          <p style={{ margin: '0 0 var(--spacing-5) 0', color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
            Choose what types of emails you'd like to receive from us.
          </p>

          <OptionList
            allowMultiple
            options={options}
            selected={selected}
            onChange={setSelected}
          />

          <div style={{ marginTop: 'var(--spacing-5)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Button onClick={handleSave} disabled={selected.length === 0}>
              Save Preferences
            </Button>
            <Button variant="plain">
              Select All
            </Button>
            <Button variant="plain">
              Clear All
            </Button>
          </div>

          {showSummary && (
            <div style={{
              marginTop: 'var(--spacing-4)',
              padding: 'var(--spacing-3)',
              backgroundColor: 'var(--color-success-50)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--color-success-400)'
            }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-success-700)' }}>
                ✓ Preferences saved! You're now subscribed to {selected.length} communication type{selected.length !== 1 ? 's' : ''}.
              </p>
            </div>
          )}

          <div style={{ marginTop: 'var(--spacing-5)', padding: 'var(--spacing-3)', backgroundColor: 'var(--color-gray-100)', borderRadius: 'var(--border-radius-md)' }}>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
              <strong>Current selections:</strong> {selected.length > 0 ? selected.join(', ') : 'None selected'}
            </p>
          </div>
        </div>
      </Card>
    );
  },
};