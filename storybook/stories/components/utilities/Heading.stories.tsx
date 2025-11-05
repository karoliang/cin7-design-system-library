import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Heading',
  component: Heading,
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
    element: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'],
      description: 'HTML element to render',
    },
  },
} satisfies Meta<typeof Heading>;

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
      <Heading element="h1">Level 1 Heading - Main Page Title</Heading>
      <Heading element="h2">Level 2 Heading - Major Section</Heading>
      <Heading element="h3">Level 3 Heading - Subsection</Heading>
      <Heading element="h4">Level 4 Heading - Minor Section</Heading>
      <Heading element="h5">Level 5 Heading - Detailed Topic</Heading>
      <Heading element="h6">Level 6 Heading - Sub-topic</Heading>
    </div>
  ),
};

export const PageHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <Heading element="h1">Product Catalog</Heading>
        <p style={{ marginTop: '8px', color: '#637381' }}>Browse our complete collection of products</p>
      </div>

      <div>
        <Heading element="h2">Featured Products</Heading>
        <p style={{ marginTop: '8px', color: '#637381' }}>Hand-picked items for this month</p>
      </div>

      <div>
        <Heading element="h3">Electronics</Heading>
        <p style={{ marginTop: '8px', color: '#637381' }}>Latest gadgets and accessories</p>
      </div>

      <div>
        <Heading element="h4">Smartphones</Heading>
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
        <Heading element="h3">Sales Overview</Heading>
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
        <Heading element="h3">Customer Orders</Heading>
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
        <Heading element="h3">Inventory Status</Heading>
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
        <Heading element="h2">Account Information</Heading>
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
        <Heading element="h2">Notification Preferences</Heading>
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
      <Heading element="h2">Confirm Deletion</Heading>
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
        <Heading element="h1">Analytics Dashboard</Heading>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Comprehensive overview of your business performance
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Heading element="h3">Revenue</Heading>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#059669' }}>
            $124,563
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +12.5% from last month
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Heading element="h3">Customers</Heading>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>
            8,432
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +3.2% from last month
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Heading element="h3">Orders</Heading>
          <div style={{ marginTop: '8px', fontSize: '28px', fontWeight: '700', color: '#8b5cf6' }}>
            2,156
          </div>
          <div style={{ fontSize: "12px", color: '#637381', marginTop: '4px' }}>
            +8.7% from last month
          </div>
        </div>
      </div>

      <div>
        <Heading element="h2">Recent Activity</Heading>
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
        <Heading id="billing-section" element="h2">Billing Information</Heading>
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
        <Heading id="shipping-section" element="h2">Shipping Address</Heading>
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
        <Heading element="h3">Additional Notes</Heading>
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
        <Heading element="p" style={{ fontSize: "18px", fontWeight: '600', margin: 0 }}>
          Styled as a paragraph but with heading appearance
        </Heading>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Sometimes you need heading styling without semantic heading meaning
        </p>
      </div>

      <div>
        <Heading element="div" style={{ fontSize: "20px", fontWeight: '500', margin: 0 }}>
          Div element with heading styles
        </Heading>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Useful for custom components that need heading appearance
        </p>
      </div>

      <div>
        <Heading element="h2">Semantic H2 with default styles</Heading>
        <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
          Standard semantic heading with Polaris styling
        </p>
      </div>
    </div>
  ),
};