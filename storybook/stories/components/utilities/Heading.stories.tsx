import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Heading',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Headings are used to structure content hierarchically. They provide clear titles for sections and help users understand the organization of information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Heading text content',
    },
    id: {
      control: 'text',
      description: 'Element ID for accessibility and navigation',
    },
    variant: {
      control: 'select',
      options: ['headingXs', 'headingSm', 'headingMd', 'headingLg', 'headingXl', 'heading2xl', 'heading3xl'],
      description: 'Text variant for styling',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Heading',
  },
};

export const HeadingLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Text variant="heading3xl" as="h1">Level 1 Heading - Main Page Title</Text>
      <Text variant="heading2xl" as="h2">Level 2 Heading - Major Section</Text>
      <Text variant="headingXl" as="h3">Level 3 Heading - Subsection</Text>
      <Text variant="headingLg" as="h4">Level 4 Heading - Minor Section</Text>
      <Text variant="headingMd" as="h5">Level 5 Heading - Detailed Topic</Text>
      <Text variant="headingSm" as="h6">Level 6 Heading - Sub-topic</Text>
    </div>
  ),
};

export const PageHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <Text variant="heading3xl" as="h1">Product Catalog</Text>
        <p style={{ marginTop: '8px', color: '#637381' }}>Browse our complete collection of products</p>
      </div>

      <div>
        <Text variant="heading2xl" as="h2">Featured Products</Text>
        <p style={{ marginTop: '8px', color: '#637381' }}>Hand-picked items for this month</p>
      </div>

      <div>
        <Text variant="headingXl" as="h3">Electronics</Text>
        <p style={{ marginTop: '8px', color: '#637381' }}>Latest gadgets and accessories</p>
      </div>

      <div>
        <Text variant="headingLg" as="h4">Smartphones</Text>
        <p style={{ marginTop: '8px', color: '#637381' }}>Premium mobile devices</p>
      </div>
    </div>
  ),
};

export const CardHeadings: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '800px'
    }}>
      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <Text variant="headingXl" as="h3">Sales Overview</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Track your sales performance and revenue trends
        </p>
        <div style={{ marginTop: '16px', fontSize: "24px", fontWeight: '600' }}>
          $45,231
        </div>
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <Text variant="headingXl" as="h3">Customer Orders</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Monitor order status and fulfillment
        </p>
        <div style={{ marginTop: '16px', fontSize: "24px", fontWeight: '600' }}>
          1,234
        </div>
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <Text variant="headingXl" as="h3">Inventory Status</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Current stock levels and alerts
        </p>
        <div style={{ marginTop: '16px', fontSize: "24px", fontWeight: '600' }}>
          892
        </div>
      </div>
    </div>
  ),
};

export const FormSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <Text variant="heading2xl" as="h2">Account Information</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Update your personal details and contact information
        </p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: "14px", fontWeight: '500' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
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
        </div>
      </div>

      <div>
        <Text variant="heading2xl" as="h2">Notification Preferences</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Choose how you want to receive updates
        </p>
        <div style={{ marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span style={{ fontSize: "14px" }}>Email notifications</span>
          </label>
        </div>
      </div>
    </div>
  ),
};

export const ModalHeadings: Story = {
  render: () => (
    <div style={{
      padding: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      maxWidth: '500px',
      backgroundColor: '#ffffff'
    }}>
      <Text variant="heading2xl" as="h2">Confirm Deletion</Text>
      <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Delete
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
    </div>
  ),
};

export const DashboardHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px' }}>
      <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
        <Text variant="heading3xl" as="h1">Analytics Dashboard</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Comprehensive overview of your business performance
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Text variant="headingXl" as="h3">Revenue</Text>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#059669' }}>
            $124,563
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +12.5% from last month
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Text variant="headingXl" as="h3">Customers</Text>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>
            8,432
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +3.2% from last month
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Text variant="headingXl" as="h3">Orders</Text>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#8b5cf6' }}>
            2,156
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +8.7% from last month
          </div>
        </div>
      </div>

      <div>
        <Text variant="heading2xl" as="h2">Recent Activity</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Latest transactions and customer interactions
        </p>
      </div>
    </div>
  ),
};

export const WithAccessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <Text id="billing-section" variant="heading2xl" as="h2">Billing Information</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Manage your billing details and payment methods
        </p>
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>
          <span style={{ fontSize: "12px", color: '#92400e' }}>
            ♿ This heading is properly identified for screen readers
          </span>
        </div>
      </div>

      <div>
        <Text id="shipping-section" variant="heading2xl" as="h2">Shipping Address</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Where should we send your orders?
        </p>
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#dbeafe', borderRadius: '4px' }}>
          <span style={{ fontSize: "12px", color: '#1e40af' }}>
            ♿ Screen reader users can navigate to this section
          </span>
        </div>
      </div>

      <div>
        <Text variant="headingXl" as="h3">Additional Notes</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Using proper heading levels creates a logical document structure that helps all users navigate content efficiently.
        </p>
      </div>
    </div>
  ),
};

export const CustomElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <Text variant="headingMd" as="p" style={{ fontSize: "18px", fontWeight: '600', margin: 0 }}>
          Styled as a paragraph but with heading appearance
        </Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Sometimes you need heading styling without semantic heading meaning
        </p>
      </div>

      <div>
        <Text variant="headingMd" as="div" style={{ fontSize: "20px", fontWeight: '500', margin: 0 }}>
          Div element with heading styles
        </Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Useful for custom components that need heading appearance
        </p>
      </div>

      <div>
        <Text variant="heading2xl" as="h2">Semantic H2 with default styles</Text>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Standard semantic heading with Polaris styling
        </p>
      </div>
    </div>
  ),
};