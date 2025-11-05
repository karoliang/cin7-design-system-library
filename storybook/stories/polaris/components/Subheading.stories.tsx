import type { Meta, StoryObj } from '@storybook/react';
import { Subheading } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Subheading',
  component: Subheading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Subheadings provide secondary titles that help organize content within sections. They create visual hierarchy and improve content scannability.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Subheading text content',
    },
    id: {
      control: 'text',
      description: 'Element ID for accessibility',
    },
  },
} satisfies Meta<typeof Subheading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Subheading text',
  },
};

export const ContentOrganization: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: '600', margin: '0 0 16px 0' }}>
          Order Management
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Subheading>Processing Orders</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Manage orders that are currently being processed. Update tracking information,
              modify shipping details, and handle customer requests.
            </p>
          </div>

          <div>
            <Subheading>Shipping & Fulfillment</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Coordinate shipping logistics, track deliveries, and manage fulfillment partners.
              Set up shipping rules and automate fulfillment processes.
            </p>
          </div>

          <div>
            <Subheading>Returns & Exchanges</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Handle customer returns, process refunds, and manage exchange requests.
              Monitor return rates and analyze reasons for returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ProductCategories: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: '600', margin: '0 0 20px 0' }}>
          Electronics Collection
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <Subheading>Audio Equipment</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Headphones, speakers, microphones, and professional audio gear from leading brands.
            </p>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-xs)", color: '#059669', fontWeight: '500' }}>
              245 products
            </div>
          </div>

          <div>
            <Subheading>Computers & Accessories</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Laptops, desktops, keyboards, mice, and computer peripherals for work and gaming.
            </p>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-xs)", color: '#059669', fontWeight: '500' }}>
              189 products
            </div>
          </div>

          <div>
            <Subheading>Mobile Devices</Subheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
              Smartphones, tablets, wearables, and mobile accessories from top manufacturers.
            </p>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-xs)", color: '#059669', fontWeight: '500' }}>
              156 products
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SettingsSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: '600', margin: '0 0 16px 0' }}>
          Store Settings
        </h2>
        <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <Subheading>General Information</Subheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)" }}>
                Store name, address, contact information, and business details.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <Subheading>Payment Methods</Subheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)" }}>
                Configure payment gateways, currency settings, and checkout options.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <Subheading>Shipping Configuration</Subheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)" }}>
                Set up shipping zones, rates, and delivery methods for your store.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <Subheading>Tax Settings</Subheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "var(--font-size-sm)" }}>
                Configure tax rates, nexus settings, and tax calculation rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const HelpDocumentation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '750px' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '600', margin: '0 0 20px 0' }}>
          Getting Started Guide
        </h1>
        <p style={{ fontSize: '16px', color: '#637381', marginBottom: '32px', lineHeight: '1.6' }}>
          Learn how to set up your store and start selling in minutes with our comprehensive guide.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <Subheading>1. Account Setup</Subheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.6' }}>
              Create your account, verify your email, and complete your business profile.
              This includes adding your business information, tax details, and configuring your account preferences.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 5 minutes</span>
            </div>
          </div>

          <div>
            <Subheading>2. Store Configuration</Subheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.6' }}>
              Customize your store appearance, set up your domain, configure payment methods,
              and establish shipping zones. Personalize the look and feel to match your brand.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 15 minutes</span>
            </div>
          </div>

          <div>
            <Subheading>3. Product Management</Subheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.6' }}>
              Add your first products, organize them into categories, set pricing,
              manage inventory levels, and create compelling product descriptions with high-quality images.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 30 minutes</span>
            </div>
          </div>

          <div>
            <Subheading>4. Launch Your Store</Subheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.6' }}>
              Review your store setup, test the checkout process, and go live.
              Learn about marketing tools and analytics to grow your business.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#166534' }}>🎉 You're ready to start selling!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DashboardMetrics: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: '600', margin: '0 0 16px 0' }}>
          Performance Metrics
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <Subheading>Sales Performance</Subheading>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-3xl)", fontWeight: '700', color: '#059669' }}>
              $89,432
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              Total revenue this month
            </p>
            <div style={{ marginTop: '8px', fontSize: "var(--font-size-xs)", color: '#059669' }}>
              ↑ 12.5% from last month
            </div>
          </div>

          <div style={{
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <Subheading>Customer Acquisition</Subheading>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-3xl)", fontWeight: '700', color: '#3b82f6' }}>
              1,247
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              New customers this month
            </p>
            <div style={{ marginTop: '8px', fontSize: "var(--font-size-xs)", color: '#3b82f6' }}>
              ↑ 8.3% from last month
            </div>
          </div>

          <div style={{
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <Subheading>Order Volume</Subheading>
            <div style={{ marginTop: '12px', fontSize: "var(--font-size-3xl)", fontWeight: '700', color: '#8b5cf6' }}>
              3,892
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              Total orders processed
            </p>
            <div style={{ marginTop: '8px', fontSize: "var(--font-size-xs)", color: '#8b5cf6' }}>
              ↑ 15.7% from last month
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FeatureList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '650px' }}>
      <div>
        <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: '600', margin: '0 0 16px 0' }}>
          Platform Features
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "var(--font-size-xs)",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <Subheading>Inventory Management</Subheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
                Real-time inventory tracking, low stock alerts, and automated reorder points.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "var(--font-size-xs)",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <Subheading>Multi-channel Selling</Subheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
                Sell across multiple platforms with centralized inventory and order management.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "var(--font-size-xs)",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <Subheading>Advanced Analytics</Subheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
                Comprehensive reporting, customer insights, and predictive analytics.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: "var(--font-size-xs)",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <Subheading>Customer Support Tools</Subheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
                Integrated helpdesk, live chat, and ticket management system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StatusSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <Subheading>System Status</Subheading>
          <span style={{
            padding: '4px 8px',
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: "var(--font-size-xs)",
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Operational
          </span>
        </div>
        <p style={{ color: '#637381', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
          All systems are functioning normally. Last updated 2 minutes ago.
        </p>
      </div>

      <div style={{
        padding: '16px',
        border: '1px solid #fbbf24',
        borderRadius: '8px',
        backgroundColor: '#fffbeb'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <Subheading>Payment Processing</Subheading>
          <span style={{
            padding: '4px 8px',
            backgroundColor: '#f59e0b',
            color: 'white',
            fontSize: "var(--font-size-xs)",
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Degraded
          </span>
        </div>
        <p style={{ color: '#92400e', fontSize: "var(--font-size-sm)", lineHeight: '1.5' }}>
          Experiencing minor delays in payment processing. Our team is investigating.
        </p>
      </div>
    </div>
  ),
};