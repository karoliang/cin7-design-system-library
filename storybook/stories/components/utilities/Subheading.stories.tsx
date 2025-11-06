import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@shopify/polaris';
import React from 'react';

// Custom Subheading component for Polaris v13.9.5 compatibility
const CustomSubheading: React.FC<{
  children: React.ReactNode;
  id?: string;
}> = ({ children, id }) => (
  <Text id={id} variant="headingMd" as="h3">
    {children}
  </Text>
);

const meta = {
  title: 'Polaris/Structure/Subheading',
  component: CustomSubheading,
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
} satisfies Meta<typeof CustomSubheading>;

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
        <h2 style={{ fontSize: "20px", fontWeight: '600', margin: '0 0 16px 0' }}>
          Order Management
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <CustomSubheading>Processing Orders</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
              Manage orders that are currently being processed. Update tracking information,
              modify shipping details, and handle customer requests.
            </p>
          </div>

          <div>
            <CustomSubheading>Shipping & Fulfillment</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
              Coordinate shipping logistics, track deliveries, and manage fulfillment partners.
              Set up shipping rules and automate fulfillment processes.
            </p>
          </div>

          <div>
            <CustomSubheading>Returns & Exchanges</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
        <h2 style={{ fontSize: "24px", fontWeight: '600', margin: '0 0 20px 0' }}>
          Electronics Collection
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <CustomSubheading>Audio Equipment</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
              Headphones, speakers, microphones, and professional audio gear from leading brands.
            </p>
            <div style={{ marginTop: '12px', fontSize: "12px", color: '#059669', fontWeight: '500' }}>
              245 products
            </div>
          </div>

          <div>
            <CustomSubheading>Computers & Accessories</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
              Laptops, desktops, keyboards, mice, and computer peripherals for work and gaming.
            </p>
            <div style={{ marginTop: '12px', fontSize: "12px", color: '#059669', fontWeight: '500' }}>
              189 products
            </div>
          </div>

          <div>
            <CustomSubheading>Mobile Devices</CustomSubheading>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
              Smartphones, tablets, wearables, and mobile accessories from top manufacturers.
            </p>
            <div style={{ marginTop: '12px', fontSize: "12px", color: '#059669', fontWeight: '500' }}>
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
        <h2 style={{ fontSize: "20px", fontWeight: '600', margin: '0 0 16px 0' }}>
          Store Settings
        </h2>
        <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <CustomSubheading>General Information</CustomSubheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
                Store name, address, contact information, and business details.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <CustomSubheading>Payment Methods</CustomSubheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
                Configure payment gateways, currency settings, and checkout options.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <CustomSubheading>Shipping Configuration</CustomSubheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
                Set up shipping zones, rates, and delivery methods for your store.
              </p>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

            <div>
              <CustomSubheading>Tax Settings</CustomSubheading>
              <p style={{ marginTop: '8px', color: '#637381', fontSize: "14px" }}>
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
            <CustomSubheading>1. Account Setup</CustomSubheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "14px", lineHeight: '1.6' }}>
              Create your account, verify your email, and complete your business profile.
              This includes adding your business information, tax details, and configuring your account preferences.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 5 minutes</span>
            </div>
          </div>

          <div>
            <CustomSubheading>2. Store Configuration</CustomSubheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "14px", lineHeight: '1.6' }}>
              Customize your store appearance, set up your domain, configure payment methods,
              and establish shipping zones. Personalize the look and feel to match your brand.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 15 minutes</span>
            </div>
          </div>

          <div>
            <CustomSubheading>3. Product Management</CustomSubheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "14px", lineHeight: '1.6' }}>
              Add your first products, organize them into categories, set pricing,
              manage inventory levels, and create compelling product descriptions with high-quality images.
            </p>
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#0369a1' }}>⏱️ Estimated time: 30 minutes</span>
            </div>
          </div>

          <div>
            <CustomSubheading>4. Launch Your Store</CustomSubheading>
            <p style={{ marginTop: '12px', color: '#637381', fontSize: "14px", lineHeight: '1.6' }}>
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
        <h2 style={{ fontSize: "20px", fontWeight: '600', margin: '0 0 16px 0' }}>
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
            <CustomSubheading>Sales Performance</CustomSubheading>
            <div style={{ marginTop: '12px', fontSize: "30px", fontWeight: '700', color: '#059669' }}>
              $89,432
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              Total revenue this month
            </p>
            <div style={{ marginTop: '8px', fontSize: "12px", color: '#059669' }}>
              ↑ 12.5% from last month
            </div>
          </div>

          <div style={{
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <CustomSubheading>Customer Acquisition</CustomSubheading>
            <div style={{ marginTop: '12px', fontSize: "30px", fontWeight: '700', color: '#3b82f6' }}>
              1,247
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              New customers this month
            </p>
            <div style={{ marginTop: '8px', fontSize: "12px", color: '#3b82f6' }}>
              ↑ 8.3% from last month
            </div>
          </div>

          <div style={{
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <CustomSubheading>Order Volume</CustomSubheading>
            <div style={{ marginTop: '12px', fontSize: "30px", fontWeight: '700', color: '#8b5cf6' }}>
              3,892
            </div>
            <p style={{ marginTop: '8px', color: '#637381', fontSize: '13px' }}>
              Total orders processed
            </p>
            <div style={{ marginTop: '8px', fontSize: "12px", color: '#8b5cf6' }}>
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
        <h2 style={{ fontSize: "20px", fontWeight: '600', margin: '0 0 16px 0' }}>
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
              fontSize: "12px",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <CustomSubheading>Inventory Management</CustomSubheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
              fontSize: "12px",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <CustomSubheading>Multi-channel Selling</CustomSubheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
              fontSize: "12px",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <CustomSubheading>Advanced Analytics</CustomSubheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
              fontSize: "12px",
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <CustomSubheading>Customer Support Tools</CustomSubheading>
              <p style={{ marginTop: '6px', color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
          <CustomSubheading>System Status</CustomSubheading>
          <span style={{
            padding: '4px 8px',
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: "12px",
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Operational
          </span>
        </div>
        <p style={{ color: '#637381', fontSize: "14px", lineHeight: '1.5' }}>
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
          <CustomSubheading>Payment Processing</CustomSubheading>
          <span style={{
            padding: '4px 8px',
            backgroundColor: '#f59e0b',
            color: 'white',
            fontSize: "12px",
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Degraded
          </span>
        </div>
        <p style={{ color: '#92400e', fontSize: "14px", lineHeight: '1.5' }}>
          Experiencing minor delays in payment processing. Our team is investigating.
        </p>
      </div>
    </div>
  ),
};