import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, InlineStack } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badges are small status indicators that provide context and information about elements. They\'re perfect for showing counts, status, and categorization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge content',
    },
    tone: {
      control: 'select',
      options: ['success', 'info', 'attention', 'warning', 'critical', 'new'],
      description: 'Badge color/tone',
    },
    progress: {
      control: 'select',
      options: ['incomplete', 'partiallyComplete', 'complete'],
      description: 'Progress indicator for tasks',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New',
  },
};

export const Tones: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge tone="success">Success</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="attention">Attention</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="critical">Critical</Badge>
      <Badge tone="new">New</Badge>
    </InlineStack>
  ),
};

export const Progress: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge progress="incomplete">Task 1</Badge>
      <Badge progress="partiallyComplete">Task 2</Badge>
      <Badge progress="complete">Task 3</Badge>
    </InlineStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <InlineStack gap="400" align="center">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </InlineStack>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge>1</Badge>
      <Badge tone="attention">12</Badge>
      <Badge tone="warning">99+</Badge>
      <Badge tone="success">1000</Badge>
    </InlineStack>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Order Status:</p>
        <InlineStack gap="200">
          <Badge tone="success">Shipped</Badge>
          <Badge tone="attention">Processing</Badge>
          <Badge tone="warning">Backordered</Badge>
          <Badge tone="critical">Cancelled</Badge>
        </InlineStack>
      </div>

      <div>
        <p style={{ marginBottom: '8px' }}>Inventory Status:</p>
        <InlineStack gap="200">
          <Badge tone="success">In Stock</Badge>
          <Badge tone="warning">Low Stock</Badge>
          <Badge tone="critical">Out of Stock</Badge>
          <Badge tone="info">Discontinued</Badge>
        </InlineStack>
      </div>
    </div>
  ),
};

export const InteractiveBadges: Story = {
  render: () => {
    const [activeBadge, setActiveBadge] = React.useState('all');
    const [unreadCount, setUnreadCount] = React.useState(5);
    const [tasks, setTasks] = React.useState([
      { id: 1, status: 'complete', label: 'Setup account' },
      { id: 2, status: 'complete', label: 'Add payment method' },
      { id: 3, status: 'incomplete', label: 'Verify email' },
    ]);

    const handleTaskClick = (taskId: number) => {
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' }
          : task
      ));
    };

    const handleMarkAllRead = () => {
      setUnreadCount(0);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
        <div>
          <h3 style={{ margin: '0 0 12px 0' }}>Filter Messages</h3>
          <InlineStack gap="200">
            <Button
              size="small"
              variant={activeBadge === 'all' ? 'primary' : 'plain'}
              onClick={() => setActiveBadge('all')}
            >
              All
            </Button>
            <Button
              size="small"
              variant={activeBadge === 'unread' ? 'primary' : 'plain'}
              onClick={() => setActiveBadge('unread')}
            >
              Unread {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
            </Button>
          </InlineStack>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0' }}>Onboarding Tasks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Badge
                  progress={task.status === 'complete' ? 'complete' : 'incomplete'}
                  tone={task.status === 'complete' ? 'success' : 'attention'}
                >
                  {task.status === 'complete' ? '✓' : '○'}
                </Badge>
                <span style={{
                  textDecoration: task.status === 'complete' ? 'line-through' : 'none',
                  opacity: task.status === 'complete' ? 0.6 : 1
                }}>
                  {task.label}
                </span>
                <Button
                  size="micro"
                  variant="plain"
                  onClick={() => handleTaskClick(task.id)}
                >
                  {task.status === 'complete' ? 'Undo' : 'Complete'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button onClick={handleMarkAllRead}>
            Mark all as read {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </Button>
        </div>
      </div>
    );
  },
};

export const MarketingBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Promotional Badges</h3>
        <InlineStack gap="300" wrap>
          <Badge tone="success">Free Shipping</Badge>
          <Badge tone="attention">Limited Time</Badge>
          <Badge tone="warning">Low Stock</Badge>
          <Badge tone="new">New Arrival</Badge>
          <Badge tone="info">Best Seller</Badge>
        </InlineStack>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Pricing & Discount Badges</h3>
        <InlineStack gap="300" wrap>
          <Badge tone="success">Save 20%</Badge>
          <Badge tone="attention">50% OFF</Badge>
          <Badge tone="warning">Last Chance</Badge>
          <Badge tone="critical">Sale Ends Soon</Badge>
        </InlineStack>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Product Status Badges</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InlineStack gap="300">
            <Badge tone="success">In Stock</Badge>
            <Badge tone="info">Pre-order</Badge>
            <Badge tone="warning">Only 3 Left</Badge>
            <Badge tone="critical">Sold Out</Badge>
          </InlineStack>
          <InlineStack gap="300">
            <Badge tone="new">New</Badge>
            <Badge tone="success">Top Rated</Badge>
            <Badge tone="attention">Popular</Badge>
            <Badge tone="info">Eco-Friendly</Badge>
          </InlineStack>
        </div>
      </div>
    </div>
  ),
};

export const ProductTags: Story = {
  render: () => {
    const products = [
      {
        name: 'Classic T-Shirt',
        tags: ['Best Seller', 'Free Shipping', 'Eco-Friendly'],
        price: '$29.99'
      },
      {
        name: 'Premium Headphones',
        tags: ['New', 'Limited Time', 'Save 20%'],
        price: '$129.99'
      },
      {
        name: 'Smart Watch',
        tags: ['Pre-order', 'High Tech', 'Top Rated'],
        price: '$299.99'
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        <h3 style={{ margin: '0' }}>Product Tags & Labels</h3>

        {products.map((product, index) => (
          <div key={index} style={{
            padding: '16px',
            border: '1px solid #e1e3e5',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '12px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{product.name}</h4>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{product.price}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.tags.map((tag, tagIndex) => {
                let tone: any = 'info';
                if (tag === 'Best Seller' || tag === 'Top Rated') tone = 'success';
                if (tag === 'New' || tag === 'Pre-order') tone = 'new';
                if (tag === 'Limited Time' || tag === 'Save 20%') tone = 'attention';
                if (tag === 'Free Shipping' || tag === 'Eco-Friendly') tone = 'info';
                if (tag === 'High Tech') tone = 'info';

                return (
                  <Badge key={tagIndex} tone={tone}>
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const CampaignBadges: Story = {
  render: () => {
    const [selectedCampaign, setSelectedCampaign] = React.useState('black-friday');

    const campaigns = [
      { id: 'black-friday', name: 'Black Friday', status: 'active', discount: '50% OFF' },
      { id: 'cyber-monday', name: 'Cyber Monday', status: 'upcoming', discount: '40% OFF' },
      { id: 'holiday', name: 'Holiday Sale', status: 'scheduled', discount: '30% OFF' },
      { id: 'clearance', name: 'Clearance', status: 'ending', discount: '70% OFF' },
    ];

    const getStatusTone = (status: string) => {
      switch (status) {
        case 'active': return 'success';
        case 'upcoming': return 'new';
        case 'scheduled': return 'info';
        case 'ending': return 'attention';
        default: return 'info';
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0' }}>Marketing Campaigns</h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign.id)}
                style={{
                  padding: '16px',
                  border: `2px solid ${selectedCampaign === campaign.id ? '#007ace' : '#e1e3e5'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedCampaign === campaign.id ? '#f3f9ff' : '#fff',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h4 style={{ margin: 0 }}>{campaign.name}</h4>
                    <Badge tone={getStatusTone(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <Badge tone="attention">{campaign.discount}</Badge>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge tone="success">Active</Badge>
                  <Badge>24 products</Badge>
                  <Badge tone="info">5 days left</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCampaign && (
          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <p style={{ margin: 0, fontWeight: 'medium' }}>
              Selected: {campaigns.find(c => c.id === selectedCampaign)?.name}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const LoyaltyBadges: Story = {
  render: () => {
    const customerTiers = [
      {
        tier: 'Bronze',
        badges: ['Member', '1 Year', '50 Points'],
        color: '#CD7F32'
      },
      {
        tier: 'Silver',
        badges: ['VIP', '2 Years', '250 Points', 'Free Shipping'],
        color: '#C0C0C0'
      },
      {
        tier: 'Gold',
        badges: ['Premium', '5+ Years', '1000+ Points', 'Early Access', 'Exclusive Deals'],
        color: '#FFD700'
      },
      {
        tier: 'Platinum',
        badges: ['Elite', '10+ Years', '5000+ Points', 'Personal Shopper', 'Exclusive Events', 'Lifetime Guarantee'],
        color: '#E5E4E2'
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        <h3 style={{ margin: 0 }}>Customer Loyalty Program Badges</h3>

        <div style={{ display: 'grid', gap: '16px' }}>
          {customerTiers.map((tier, index) => (
            <div key={index} style={{
              padding: '20px',
              border: `2px solid ${tier.color}`,
              borderRadius: '8px',
              backgroundColor: index === 3 ? '#fff8f0' : '#fff'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: tier.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {tier.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0' }}>{tier} Tier</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    {tier.badges.length} benefits unlocked
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tier.badges.map((badge, badgeIndex) => (
                  <Badge
                    key={badgeIndex}
                    tone={index >= 2 ? 'success' : index === 1 ? 'attention' : 'info'}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};