import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalStack } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/HorizontalStack',
  component: HorizontalStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HorizontalStack arranges child elements horizontally with consistent spacing. It provides a simple way to create horizontal layouts with proper spacing between elements. Note: This is a legacy component - consider using InlineStack for new implementations.',
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
      options: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      description: 'Block alignment for items',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow items to wrap to multiple lines',
    },
  },
} satisfies Meta<typeof HorizontalStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HorizontalStack gap="400">
      <div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        First
      </div>
      <div style={{ padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        Second
      </div>
      <div style={{ padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        Third
      </div>
    </HorizontalStack>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>None</h4>
        <HorizontalStack gap="none">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Extra Tight</h4>
        <HorizontalStack gap="extraTight">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Tight</h4>
        <HorizontalStack gap="tight">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Base</h4>
        <HorizontalStack gap="base">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Loose</h4>
        <HorizontalStack gap="loose">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Extra Loose</h4>
        <HorizontalStack gap="extraLoose">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </HorizontalStack>
      </div>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Start</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px', height: '80px' }}>
          <HorizontalStack gap="400" align="start">
            <div style={{ padding: '8px 16px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>Short</div>
            <div style={{ padding: '16px 16px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>Taller content</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>Medium</div>
          </HorizontalStack>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Center</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px', height: '80px' }}>
          <HorizontalStack gap="400" align="center">
            <div style={{ padding: '8px 16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Short</div>
            <div style={{ padding: '16px 16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Taller content</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Medium</div>
          </HorizontalStack>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>End</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px', height: '80px' }}>
          <HorizontalStack gap="400" align="end">
            <div style={{ padding: '8px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>Short</div>
            <div style={{ padding: '16px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>Taller content</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>Medium</div>
          </HorizontalStack>
        </div>
      </div>
    </div>
  ),
};

export const ButtonGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Primary Actions</h4>
        <HorizontalStack gap="300">
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Save Changes
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Publish
          </button>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Secondary Actions</h4>
        <HorizontalStack gap="300">
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d2d2d2',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Preview
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d2d2d2',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Export
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d2d2d2',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Duplicate
          </button>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Destructive Actions</h4>
        <HorizontalStack gap="300">
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Archive
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Delete
          </button>
        </HorizontalStack>
      </div>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Order Status</h4>
        <HorizontalStack gap="400">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }} />
            <span>Processing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6'
            }} />
            <span>Shipped</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#6b7280'
            }} />
            <span>Delivered</span>
          </div>
        </HorizontalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Payment Methods</h4>
        <HorizontalStack gap="300">
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            💳 Credit Card
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            📱 PayPal
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            🏦 Bank Transfer
          </div>
        </HorizontalStack>
      </div>
    </div>
  ),
};

export const MetricCards: Story = {
  render: () => (
    <div style={{ maxWidth: '900px' }}>
      <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Performance Metrics
      </h4>
      <HorizontalStack gap="400" wrap>
        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          minWidth: '200px',
          flex: '1'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Revenue</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>
            $45,231
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
            ↑ 12.5% from last month
          </div>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          minWidth: '200px',
          flex: '1'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Orders</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
            1,234
          </div>
          <div style={{ fontSize: '12px', color: '#3b82f6', marginTop: '4px' }}>
            ↑ 8.7% from last month
          </div>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          minWidth: '200px',
          flex: '1'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Customers</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
            892
          </div>
          <div style={{ fontSize: '12px', color: '#8b5cf6', marginTop: '4px' }}>
            ↑ 15.2% from last month
          </div>
        </div>
      </HorizontalStack>
    </div>
  ),
};

export const NavigationTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'products', label: 'Products' },
      { id: 'orders', label: 'Orders' },
      { id: 'customers', label: 'Customers' },
      { id: 'analytics', label: 'Analytics' },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <HorizontalStack gap="200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7280',
                border: activeTab === tab.id ? 'none' : '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? '600' : '500',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </HorizontalStack>

        <div style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h4>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
            This is the {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} section content.
            In a real application, this would display relevant data and functionality for this tab.
          </p>
        </div>
      </div>
    );
  },
};

export const TagCloud: Story = {
  render: () => {
    const tags = [
      'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports',
      'Toys', 'Beauty', 'Automotive', 'Health', 'Food',
      'Pet Supplies', 'Office', 'Tools', 'Jewelry', 'Art'
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Popular Categories
        </h4>
        <HorizontalStack gap="200" wrap>
          {tags.map((tag, index) => {
            const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
            const padding = size === 'large' ? '12px 20px' : size === 'medium' ? '8px 16px' : '6px 12px';
            const fontSize = size === 'large' ? '16px' : size === 'medium' ? '14px' : '12px';

            return (
              <span
                key={index}
                style={{
                  padding,
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  fontSize,
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {tag}
              </span>
            );
          })}
        </HorizontalStack>
      </div>
    );
  },
};

export const BreadcrumbNavigation: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        Breadcrumb Example
      </h4>
      <HorizontalStack gap="200" align="center">
        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
          Home
        </a>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>›</span>
        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
          Products
        </a>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>›</span>
        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
          Electronics
        </a>
        <span style={{ color: '#9ca3af', fontSize: '14px' }}>›</span>
        <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
          Wireless Headphones
        </span>
      </HorizontalStack>

      <div style={{
        marginTop: '24px',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
          Product Details
        </h4>
        <p style={{ margin: 0, color: '#6b7280', lineHeight: '1.6' }}>
          Premium wireless headphones with active noise cancellation and 40-hour battery life.
        </p>
      </div>
    </div>
  ),
};

export const WrappedLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        Responsive Filter Chips (Wrapping)
      </h4>
      <HorizontalStack gap="200" wrap>
        {[
          'Under $25', '$25-$50', '$50-$100', '$100-$200', 'Over $200',
          '4+ Stars', 'Free Shipping', 'In Stock', 'Sale Items',
          'New Arrivals', 'Best Sellers', 'Recommended'
        ].map((filter, index) => (
          <button
            key={index}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#1e40af',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#dbeafe';
              e.target.style.borderColor = '#93c5fd';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f0f9ff';
              e.target.style.borderColor = '#bfdbfe';
            }}
          >
            {filter}
          </button>
        ))}
      </HorizontalStack>
    </div>
  ),
};