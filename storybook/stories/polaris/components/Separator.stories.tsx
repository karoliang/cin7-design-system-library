import type { Meta, StoryObj } from '@storybook/react';
import { Separator, Card, BlockStack, InlineStack, Text, Button, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Separator creates a visual divider between content sections. Use it to organize information and create visual hierarchy in your layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '400px' }}>
      <BlockStack gap="400">
        <div>
          <h3 style={{ margin: 0 }}>Section 1</h3>
          <Text as="p">This is the first section of content.</Text>
        </div>
        <Separator />
        <div>
          <h3 style={{ margin: 0 }}>Section 2</h3>
          <Text as="p">This is the second section of content.</Text>
        </div>
        <Separator />
        <div>
          <h3 style={{ margin: 0 }}>Section 3</h3>
          <Text as="p">This is the third section of content.</Text>
        </div>
      </BlockStack>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="400" align="start">
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Product</h4>
          <Text as="p">Item details</Text>
        </div>
        <Separator direction="vertical" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Pricing</h4>
          <Text as="p">$29.99</Text>
        </div>
        <Separator direction="vertical" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Inventory</h4>
          <Text as="p">50 units</Text>
        </div>
        <Separator direction="vertical" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Status</h4>
          <Badge tone="success">Active</Badge>
        </div>
      </InlineStack>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 12px 0' }}>Order Summary</h3>
              <Text as="p" tone="subdued">Review your order details before checkout.</Text>
            </div>

            <Separator />

            <BlockStack gap="200">
              <InlineStack align="space-between">
                <Text>Subtotal</Text>
                <Text>$129.99</Text>
              </InlineStack>
              <InlineStack align="space-between">
                <Text>Shipping</Text>
                <Text>$9.99</Text>
              </InlineStack>
              <InlineStack align="space-between">
                <Text>Tax</Text>
                <Text>$11.20</Text>
              </InlineStack>
            </BlockStack>

            <Separator />

            <InlineStack align="space-between">
              <Text variant="headingMd" as="span">Total</Text>
              <Text variant="headingMd" as="span">$151.18</Text>
            </InlineStack>
          </BlockStack>
        </div>
      </Card>
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => {
    const [activeSection, setActiveSection] = React.useState('products');

    const menuItems = [
      { id: 'products', label: 'Products', icon: '📦' },
      { id: 'orders', label: 'Orders', icon: '🛒' },
      { id: 'customers', label: 'Customers', icon: '👥' },
      { id: 'analytics', label: 'Analytics', icon: '📊' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="200">
              <h3 style={{ margin: 0 }}>Navigation Menu</h3>
              <Separator />
              <InlineStack gap="0">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Button
                      variant={activeSection === item.id ? 'primary' : 'plain'}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.icon} {item.label}
                    </Button>
                    {index < menuItems.length - 1 && <Separator direction="vertical" />}
                  </React.Fragment>
                ))}
              </InlineStack>
              <Separator />
              <div style={{ padding: '16px 0' }}>
                <Text as="p">Current section: <strong>{activeSection}</strong></Text>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const TimelineView: Story = {
  render: () => {
    const events = [
      {
        time: '09:00 AM',
        title: 'Order Received',
        description: 'Customer placed order #12345',
        status: 'completed'
      },
      {
        time: '09:15 AM',
        title: 'Payment Processed',
        description: 'Payment of $89.99 confirmed',
        status: 'completed'
      },
      {
        time: '09:30 AM',
        title: 'Order Fulfilled',
        description: 'Items picked and packed',
        status: 'completed'
      },
      {
        time: '10:00 AM',
        title: 'Shipped',
        description: 'Package handed to carrier',
        status: 'in-progress'
      },
      {
        time: 'Estimated',
        title: 'Delivered',
        description: 'Expected delivery by tomorrow',
        status: 'pending'
      }
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return '#1a7f37';
        case 'in-progress': return '#bf6700';
        case 'pending': return '#637381';
        default: return '#637381';
      }
    };

    return (
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Order Timeline</h3>
                <Text as="p" tone="subdued">Track your order progress in real-time</Text>
              </div>

              {events.map((event, index) => (
                <React.Fragment key={index}>
                  <BlockStack gap="200">
                    <InlineStack gap="200" align="start">
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(event.status),
                        marginTop: '4px',
                        flexShrink: 0
                      }} />
                      <BlockStack gap="50">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Text variant="bodySm" as="span" tone="subdued">
                            {event.time}
                          </Text>
                          <Badge
                            size="small"
                            tone={event.status === 'completed' ? 'success' : event.status === 'in-progress' ? 'attention' : 'info'}
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <Text variant="headingMd" as="p">{event.title}</Text>
                        <Text variant="bodySm" as="p" tone="subdued">
                          {event.description}
                        </Text>
                      </BlockStack>
                    </InlineStack>
                  </BlockStack>
                  {index < events.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const ComparisonTable: Story = {
  render: () => {
    const plans = [
      {
        name: 'Basic',
        price: '$29',
        features: ['100 Products', '1GB Storage', 'Email Support', 'Basic Analytics']
      },
      {
        name: 'Professional',
        price: '$79',
        features: ['1000 Products', '10GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain']
      },
      {
        name: 'Enterprise',
        price: '$199',
        features: ['Unlimited Products', '100GB Storage', '24/7 Phone Support', 'Custom Analytics', 'White Label', 'API Access']
      }
    ];

    return (
      <div style={{ padding: '24px', maxWidth: '1000px' }}>
        <BlockStack gap="400">
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Choose Your Plan</h3>
            <Text as="p" tone="subdued">Select the perfect plan for your business needs</Text>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {plans.map((plan, index) => (
              <Card key={index}>
                <div style={{ padding: '24px' }}>
                  <BlockStack gap="400">
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ margin: '0 0 8px 0' }}>{plan.name}</h4>
                      <Text variant="headingLg" as="p">{plan.price}/mo</Text>
                    </div>
                    <Separator />
                    <BlockStack gap="300">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex}>
                          <Text as="p">✓ {feature}</Text>
                          {featureIndex < plan.features.length - 1 && <Separator />}
                        </div>
                      ))}
                    </BlockStack>
                    <Separator />
                    <Button variant="primary" fullWidth>
                      Choose {plan.name}
                    </Button>
                  </BlockStack>
                </div>
              </Card>
            ))}
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const FormSections: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    });

    const handleFieldChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Account Registration</h3>
                <Text as="p" tone="subdued">Create your account to get started</Text>
              </div>

              <BlockStack gap="400">
                <div>
                  <h4 style={{ margin: '0 0 16px 0' }}>Personal Information</h4>
                  <BlockStack gap="300">
                    <Text as="p">First Name: {formData.firstName || 'Not provided'}</Text>
                    <Text as="p">Last Name: {formData.lastName || 'Not provided'}</Text>
                    <Text as="p">Email: {formData.email || 'Not provided'}</Text>
                    <Text as="p">Phone: {formData.phone || 'Not provided'}</Text>
                  </BlockStack>
                </div>

                <Separator />

                <div>
                  <h4 style={{ margin: '0 0 16px 0' }}>Address Information</h4>
                  <BlockStack gap="300">
                    <Text as="p">Street Address: {formData.address || 'Not provided'}</Text>
                    <Text as="p">City: {formData.city || 'Not provided'}</Text>
                    <Text as="p">Postal Code: {formData.postalCode || 'Not provided'}</Text>
                    <Text as="p">Country: {formData.country || 'Not provided'}</Text>
                  </BlockStack>
                </div>

                <Separator />

                <div>
                  <h4 style={{ margin: '0 0 16px 0' }}>Preferences</h4>
                  <BlockStack gap="300">
                    <Text as="p">Newsletter: ✓ Subscribed</Text>
                    <Text as="p">Marketing: Declined</Text>
                    <Text as="p">Privacy Settings: Standard</Text>
                  </BlockStack>
                </div>
              </BlockStack>

              <Separator />

              <InlineStack gap="200">
                <Button variant="primary">Save Profile</Button>
                <Button variant="plain">Cancel</Button>
              </InlineStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const CommentThread: Story = {
  render: () => {
    const comments = [
      {
        author: 'Sarah Johnson',
        time: '2 hours ago',
        content: 'Great work on the new feature! The user interface is really intuitive.',
        avatar: '👩‍💼'
      },
      {
        author: 'Mike Chen',
        time: '1 hour ago',
        content: 'I agree! The performance improvements are also noticeable.',
        avatar: '👨‍💻'
      },
      {
        author: 'Emily Davis',
        time: '30 minutes ago',
        content: 'One suggestion: Could we add keyboard shortcuts for the main actions?',
        avatar: '👩‍🎨'
      },
      {
        author: 'David Wilson',
        time: '5 minutes ago',
        content: 'That\'s a great idea Emily. I\'ll add it to the backlog for the next sprint.',
        avatar: '👨‍🔧'
      }
    ];

    return (
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Team Discussion</h3>
                <Text as="p" tone="subdued">Recent comments on the project update</Text>
              </div>

              {comments.map((comment, index) => (
                <React.Fragment key={index}>
                  <BlockStack gap="200">
                    <InlineStack gap="200" align="start">
                      <div style={{ fontSize: '24px' }}>
                        {comment.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <InlineStack gap="200" align="center">
                          <Text variant="headingSm" as="span">{comment.author}</Text>
                          <Text variant="bodySm" as="span" tone="subdued">{comment.time}</Text>
                        </InlineStack>
                        <Text as="p">{comment.content}</Text>
                      </div>
                    </InlineStack>
                  </BlockStack>
                  {index < comments.length - 1 && <Separator />}
                </React.Fragment>
              ))}

              <Separator />

              <div>
                <Text as="p" tone="subdued" variant="bodySm">
                  Add a comment...
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};