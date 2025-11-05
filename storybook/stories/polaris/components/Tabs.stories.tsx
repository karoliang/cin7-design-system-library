import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabs help users navigate between different views or content sections within the same page. They organize related content and make it easy to switch between different contexts without losing the current page state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'number',
      description: 'Index of the selected tab',
    },
    tabs: {
      control: 'object',
      description: 'Array of tab objects with id, content, and optionally badge',
    },
    fitted: {
      control: 'boolean',
      description: 'Make tabs fill the available width',
    },
    disclosureText: {
      control: 'text',
      description: 'Text for the overflow menu button',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: 0,
    tabs: [
      { id: 'all', content: 'All' },
      { id: 'active', content: 'Active' },
      { id: 'archived', content: 'Archived' },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    selected: 0,
    tabs: [
      { id: 'all', content: 'All', badge: '24' },
      { id: 'unread', content: 'Unread', badge: '5' },
      { id: 'flagged', content: 'Flagged', badge: '12' },
      { id: 'drafts', content: 'Drafts' },
    ],
  },
};

export const Fitted: Story = {
  args: {
    selected: 1,
    fitted: true,
    tabs: [
      { id: 'overview', content: 'Overview' },
      { id: 'products', content: 'Products' },
      { id: 'customers', content: 'Customers' },
      { id: 'analytics', content: 'Analytics' },
    ],
  },
};

export const ManyTabs: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(0);

    const tabs = [
      { id: 'dashboard', content: 'Dashboard' },
      { id: 'products', content: 'Products', badge: '128' },
      { id: 'orders', content: 'Orders', badge: '45' },
      { id: 'customers', content: 'Customers', badge: '1.2k' },
      { id: 'inventory', content: 'Inventory' },
      { id: 'analytics', content: 'Analytics' },
      { id: 'marketing', content: 'Marketing' },
      { id: 'discounts', content: 'Discounts' },
      { id: 'settings', content: 'Settings' },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          disclosureText="More tabs"
        />
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <p>Selected tab: <strong>{tabs[selected].content}</strong></p>
          <p>Tab ID: <strong>{tabs[selected].id}</strong></p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(0);
    const [viewCounts, setViewCounts] = React.useState<Record<string, number>>({
      overview: 1,
      products: 3,
      customers: 0,
      analytics: 2,
    });

    const tabs = [
      { id: 'overview', content: 'Overview' },
      { id: 'products', content: 'Products' },
      { id: 'customers', content: 'Customers' },
      { id: 'analytics', content: 'Analytics' },
    ];

    const handleTabSelect = (index: number) => {
      setSelected(index);
      const tabId = tabs[index].id;
      setViewCounts(prev => ({
        ...prev,
        [tabId]: prev[tabId] + 1,
      }));
    };

    return (
      <div style={{ width: '600px' }}>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabSelect}
        />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>{tabs[selected].content} View</h3>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
            This is the content area for the <strong>{tabs[selected].content}</strong> tab.
            In a real application, this would contain relevant content and functionality.
          </p>

          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)" }}>Tab Interaction Stats:</h4>
            {tabs.map((tab, index) => (
              <div key={tab.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontSize: '13px' }}>{tab.content}:</span>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>
                  {viewCounts[tab.id]} view{viewCounts[tab.id] !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const ProductManagement: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(0);
    const [productData, setProductData] = React.useState({
      details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
      inventory: { stock: 150, reserved: 12, available: 138 },
      variants: { total: 5, active: 3 },
      analytics: { views: 1234, orders: 89, conversion: '7.2%' },
    });

    const tabs = [
      { id: 'details', content: 'Details' },
      { id: 'inventory', content: 'Inventory', badge: productData.inventory.available.toString() },
      { id: 'variants', content: 'Variants', badge: productData.variants.total.toString() },
      { id: 'analytics', content: 'Analytics' },
      { id: 'seo', content: 'SEO' },
    ];

    const renderTabContent = () => {
      switch (tabs[selected].id) {
        case 'details':
          return (
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><strong>Product:</strong> {productData.details.name}</div>
              <div><strong>Price:</strong> {productData.details.price}</div>
              <div><strong>SKU:</strong> {productData.details.sku}</div>
            </div>
          );
        case 'inventory':
          return (
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><strong>Total Stock:</strong> {productData.inventory.stock}</div>
              <div><strong>Reserved:</strong> {productData.inventory.reserved}</div>
              <div><strong>Available:</strong> {productData.inventory.available}</div>
            </div>
          );
        case 'variants':
          return (
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><strong>Total Variants:</strong> {productData.variants.total}</div>
              <div><strong>Active:</strong> {productData.variants.active}</div>
              <div><strong>Inactive:</strong> {productData.variants.total - productData.variants.active}</div>
            </div>
          );
        case 'analytics':
          return (
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><strong>Page Views:</strong> {productData.analytics.views.toLocaleString()}</div>
              <div><strong>Orders:</strong> {productData.analytics.orders}</div>
              <div><strong>Conversion Rate:</strong> {productData.analytics.conversion}</div>
            </div>
          );
        case 'seo':
          return (
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>
              <div><strong>Description:</strong> High-quality wireless headphones with noise cancellation</div>
              <div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div style={{ width: '700px' }}>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
        />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>{tabs[selected].content}</h3>
          {renderTabContent()}
        </div>
      </div>
    );
  },
};

export const OrderStatus: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(0);

    const statusCounts = {
      all: 156,
      pending: 12,
      processing: 23,
      shipped: 45,
      delivered: 68,
      cancelled: 8,
    };

    const tabs = [
      { id: 'all', content: 'All Orders', badge: statusCounts.all.toString() },
      { id: 'pending', content: 'Pending', badge: statusCounts.pending.toString() },
      { id: 'processing', content: 'Processing', badge: statusCounts.processing.toString() },
      { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped.toString() },
      { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered.toString() },
      { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled.toString() },
    ];

    const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
        pending: '#f59e0b',
        processing: '#3b82f6',
        shipped: '#8b5cf6',
        delivered: '#10b981',
        cancelled: '#ef4444',
      };
      return colors[status] || '#6b7280';
    };

    return (
      <div style={{ width: '800px' }}>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
        />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>{tabs[selected].content}</h3>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: getStatusColor(tabs[selected].id),
                color: 'white',
                borderRadius: '12px',
                fontSize: "var(--font-size-sm)",
                fontWeight: '600'
              }}
            >
              {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders
            </span>
          </div>

          <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
            Managing {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders with status: <strong>{tabs[selected].content}</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
              <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>$12,456</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Average Order</div>
              <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>$89.95</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Processing Time</div>
              <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>2.3 days</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CampaignTabs: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(0);
    const [campaignData] = React.useState({
      overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
      ads: { active: 8, total: 15, ctr: '2.4%' },
      audience: { reached: 12500, engaged: 890, new: 456 },
      analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 },
    });

    const tabs = [
      { id: 'overview', content: 'Overview' },
      { id: 'ads', content: 'Ads', badge: campaignData.ads.active.toString() },
      { id: 'audience', content: 'Audience' },
      { id: 'analytics', content: 'Analytics' },
      { id: 'settings', content: 'Settings' },
    ];

    return (
      <div style={{ width: '750px' }}>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          fitted
        />

        <div style={{
          marginTop: '20px',
          padding: '24px',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: "var(--font-size-xl)" }}>📊 {tabs[selected].content}</h3>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            {tabs[selected].id === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8, marginBottom: '4px' }}>Total Budget</div>
                  <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{campaignData.overview.budget}</div>
                </div>
                <div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8, marginBottom: '4px' }}>Spent</div>
                  <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{campaignData.overview.spent}</div>
                </div>
                <div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8, marginBottom: '4px' }}>ROI</div>
                  <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{campaignData.overview.roi}</div>
                </div>
              </div>
            )}

            {tabs[selected].id === 'ads' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
                  {campaignData.ads.active} / {campaignData.ads.total}
                </div>
                <div style={{ fontSize: "var(--font-size-sm)", opacity: 0.8 }}>
                  Active ads with {campaignData.ads.ctr} click-through rate
                </div>
              </div>
            )}

            {tabs[selected].id === 'audience' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.audience.reached.toLocaleString()}</div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>People Reached</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.audience.engaged.toLocaleString()}</div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Engaged</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.audience.new.toLocaleString()}</div>
                  <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>New Customers</div>
                </div>
              </div>
            )}

            {tabs[selected].id === 'analytics' && (
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 12px 0' }}>Performance Metrics</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.analytics.impressions}</div>
                    <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Impressions</div>
                  </div>
                  <div style={{ fontSize: "var(--font-size-2xl)", opacity: 0.6 }}>→</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.analytics.clicks}</div>
                    <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Clicks</div>
                  </div>
                  <div style={{ fontSize: "var(--font-size-2xl)", opacity: 0.6 }}>→</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: "var(--font-size-xl)", fontWeight: '700' }}>{campaignData.analytics.conversions}</div>
                    <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Conversions</div>
                  </div>
                </div>
              </div>
            )}

            {tabs[selected].id === 'settings' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "var(--font-size-lg)", marginBottom: '12px' }}>⚙️ Campaign Configuration</div>
                <p style={{ margin: 0, opacity: 0.8 }}>
                  Manage campaign settings, targeting, budget allocation, and scheduling options.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};