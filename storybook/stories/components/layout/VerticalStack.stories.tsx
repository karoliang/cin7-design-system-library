import type { Meta, StoryObj } from '@storybook/react';
import { BlockStack } from '@shopify/polaris';
import React from 'react';

// Custom VerticalStack component for Polaris v13.9.5 compatibility
const CustomVerticalStack: React.FC<{
  children: React.ReactNode;
  gap?: 'none' | 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
  align?: 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
  inlineAlign?: 'start' | 'center' | 'end';
}> = ({ children, gap = 'base', align = 'start', inlineAlign }) => {
  const gapMap = {
    none: '0',
    extraTight: '100',
    tight: '200',
    base: '400',
    loose: '500',
    extraLoose: '600'
  };

  const alignMap = {
    start: 'start',
    center: 'center',
    end: 'end',
    'space-around': 'spaceAround',
    'space-between': 'spaceBetween',
    'space-evenly': 'spaceEvenly'
  };

  const inlineAlignMap = {
    start: 'start',
    center: 'center',
    end: 'end'
  };

  return (
    <BlockStack
      gap={gapMap[gap]}
      align={alignMap[align]}
      inlineAlign={inlineAlignMap[inlineAlign]}
    >
      {children}
    </BlockStack>
  );
};

const meta = {
  title: 'Components/Structure/VerticalStack',
  component: CustomVerticalStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'VerticalStack arranges child elements vertically with consistent spacing. It provides a simple way to create vertical layouts with proper spacing between elements. Note: This is a legacy component - consider using BlockStack for new implementations.',
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
      options: ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      description: 'Horizontal alignment of items',
    },
    inlineAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Inline alignment for text content',
    },
  },
} satisfies Meta<typeof CustomVerticalStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CustomVerticalStack gap="400">
      <div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        First Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        Second Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        Third Item
      </div>
    </CustomVerticalStack>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>None</h4>
        <CustomVerticalStack gap="none">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Extra Tight</h4>
        <CustomVerticalStack gap="extraTight">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Tight</h4>
        <CustomVerticalStack gap="tight">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Base</h4>
        <CustomVerticalStack gap="base">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Loose</h4>
        <CustomVerticalStack gap="loose">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Extra Loose</h4>
        <CustomVerticalStack gap="extraLoose">
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>Item 3</div>
        </CustomVerticalStack>
      </div>
    </div>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Start</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px' }}>
          <CustomVerticalStack gap="400" align="start">
            <div style={{ padding: '8px 16px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>Left aligned</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>Item 2</div>
          </CustomVerticalStack>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Center</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px' }}>
          <CustomVerticalStack gap="400" align="center">
            <div style={{ padding: '8px 16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Center aligned</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>Item 2</div>
          </CustomVerticalStack>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>End</h4>
        <div style={{ border: '1px dashed #d1d5db', padding: '12px', borderRadius: '4px' }}>
          <CustomVerticalStack gap="400" align="end">
            <div style={{ padding: '8px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>Right aligned</div>
            <div style={{ padding: '8px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>Item 2</div>
          </CustomVerticalStack>
        </div>
      </div>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <CustomVerticalStack gap="400">
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Contact Information</h3>
          <CustomVerticalStack gap="300">
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: "14px", fontWeight: '500' }}>
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "14px",
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: "14px", fontWeight: '500' }}>
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "14px",
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: "14px", fontWeight: '500' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "14px",
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </CustomVerticalStack>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Save
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d2d2d2',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
        </div>
      </CustomVerticalStack>
    </div>
  ),
};

export const CardComponents: Story = {
  render: () => (
    <CustomVerticalStack gap="400">
      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Order Summary
        </h4>
        <CustomVerticalStack gap="200">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span>$89.99</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping</span>
            <span>$5.99</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax</span>
            <span>$7.68</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
            <span>Total</span>
            <span>$103.66</span>
          </div>
        </CustomVerticalStack>
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Shipping Address
        </h4>
        <CustomVerticalStack gap="100">
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            John Doe<br />
            123 Main Street<br />
            New York, NY 10001<br />
            United States
          </p>
        </CustomVerticalStack>
      </div>
    </CustomVerticalStack>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <CustomVerticalStack gap="400" style={{ maxWidth: '500px' }}>
      <div style={{
        padding: '16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600', color: '#1e40af' }}>
          📢 Important Update
        </h4>
        <p style={{ margin: 0, fontSize: "14px", color: '#1e40af', lineHeight: '1.5' }}>
          System maintenance scheduled for tonight at 11:00 PM EST. Services may be temporarily unavailable.
        </p>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: "18px", fontWeight: '600' }}>
          Recent Activity
        </h3>
        <CustomVerticalStack gap="300">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }} />
            <div>
              <div style={{ fontWeight: '500' }}>New order received</div>
              <div style={{ fontSize: "12px", color: '#6b7280' }}>2 minutes ago</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6'
            }} />
            <div>
              <div style={{ fontWeight: '500' }}>Payment processed</div>
              <div style={{ fontSize: "12px", color: '#6b7280' }}>15 minutes ago</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b'
            }} />
            <div>
              <div style={{ fontWeight: '500' }}>Low stock alert</div>
              <div style={{ fontSize: "12px", color: '#6b7280' }}>1 hour ago</div>
            </div>
          </div>
        </CustomVerticalStack>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600', color: '#991b1b' }}>
          ⚠️ Action Required
        </h4>
        <p style={{ margin: 0, fontSize: "14px", color: '#991b1b', lineHeight: '1.5' }}>
          3 orders require manual review due to unusual payment patterns.
        </p>
      </div>
    </CustomVerticalStack>
  ),
};

export const NestedStacks: Story = {
  render: () => (
    <CustomVerticalStack gap="400" style={{ maxWidth: '600px' }}>
      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#f9fafb'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Dashboard Overview
        </h4>
        <CustomVerticalStack gap="300">
          <div>
            <h5 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>
              Quick Stats
            </h5>
            <CustomVerticalStack gap="200">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Sales</span>
                <span style={{ fontWeight: '600' }}>$12,432</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>New Customers</span>
                <span style={{ fontWeight: '600' }}>48</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Orders Today</span>
                <span style={{ fontWeight: '600' }}>127</span>
              </div>
            </CustomVerticalStack>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

          <div>
            <h5 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>
              Recent Orders
            </h5>
            <CustomVerticalStack gap="200">
              <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                <div style={{ fontWeight: '500' }}>Order #1001</div>
                <div style={{ fontSize: "12px", color: '#6b7280' }}>2 items • $89.99</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                <div style={{ fontWeight: '500' }}>Order #1002</div>
                <div style={{ fontSize: "12px", color: '#6b7280' }}>5 items • $234.50</div>
              </div>
            </CustomVerticalStack>
          </div>
        </CustomVerticalStack>
      </div>
    </CustomVerticalStack>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <CustomVerticalStack gap="400">
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: "20px", fontWeight: '600' }}>
            Responsive Product Grid
          </h3>
          <CustomVerticalStack gap="300">
            {[
              { name: 'Premium Headphones', price: '$299.99', status: 'In Stock' },
              { name: 'Wireless Keyboard', price: '$79.99', status: 'Low Stock' },
              { name: 'USB-C Hub', price: '$49.99', status: 'In Stock' },
              { name: 'Laptop Stand', price: '$39.99', status: 'Out of Stock' },
            ].map((product, index) => (
              <div key={index} style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ fontSize: "14px", color: '#6b7280' }}>{product.status}</div>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: '600', color: '#059669' }}>
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </CustomVerticalStack>
        </div>
      </CustomVerticalStack>
    </div>
  ),
};