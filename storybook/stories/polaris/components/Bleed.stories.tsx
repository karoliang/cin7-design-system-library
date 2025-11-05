import type { Meta, StoryObj } from '@storybook/react';
import { Bleed, Card, Button, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/Bleed',
  component: Bleed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Bleed allows content to extend to the edges of its container, removing padding and margins. It\'s useful for creating full-width elements within padded containers or extending visual elements to touch the container edges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    marginInline: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Horizontal margin to bleed',
    },
    marginBlockStart: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Top margin to bleed',
    },
    marginBlockEnd: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Bottom margin to bleed',
    },
    margin: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Margin to bleed on all sides',
    },
    children: {
      control: 'text',
      description: 'Content to bleed',
    },
  },
} satisfies Meta<typeof Bleed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Card with Bleed</Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Below is a div that bleeds to remove the card's padding on all sides:
      </Text>
      <Bleed margin="400">
        <div style={{
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        }}>
          <Text as="p" variant="bodyMd">This content bleeds to the edges</Text>
        </div>
      </Bleed>
    </Card>
  ),
};

export const HorizontalBleed: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Horizontal Bleed Example</Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        This div bleeds horizontally (removes left and right padding) while maintaining vertical spacing:
      </Text>
      <Bleed marginInline="400">
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '12px 16px',
          borderLeft: '4px solid #4caf50',
          borderRight: '4px solid #4caf50'
        }}>
          <Text as="p" variant="bodyMd">🎉 Success! Your changes have been saved.</Text>
        </div>
      </Bleed>
    </Card>
  ),
};

export const VerticalBleed: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Vertical Bleed</Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Content that bleeds vertically to touch the top and bottom edges:
      </Text>

      <Bleed marginBlockStart="400">
        <div style={{
          backgroundColor: '#fff3cd',
          padding: '12px 16px',
          borderTop: '4px solid #ff9800',
          marginBottom: '16px'
        }}>
          <Text as="p" variant="bodySm">⚠️ Notice: This content bleeds to the top edge</Text>
        </div>
      </Bleed>

      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Regular content between bleeds
      </Text>

      <Bleed marginBlockEnd="400">
        <div style={{
          backgroundColor: '#ffebee',
          padding: '12px 16px',
          borderBottom: '4px solid #f44336'
        }}>
          <Text as="p" variant="bodySm">🚨 Alert: This content bleeds to the bottom edge</Text>
        </div>
      </Bleed>
    </Card>
  ),
};

export const FullWidthSection: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <Card sectioned>
        <Text as="h3" variant="headingLg">Product Details</Text>
        <Text as="p" variant="bodyMd" style={{ marginBottom: '24px' }}>
          Classic T-Shirt with premium cotton material
        </Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Bleed marginInline="400">
            <div style={{
              backgroundColor: '#f4f6f8',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <Text as="p" variant="bodySm" tone="subdued">Price</Text>
                <Text as="p" variant="headingLg">$29.99</Text>
              </div>
              <Badge status="success">In Stock</Badge>
            </div>
          </Bleed>

          <Bleed marginInline="400">
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '12px 16px',
              borderLeft: '4px solid #4caf50'
            }}>
              <Text as="p" variant="bodySm">
                <strong>Free shipping</strong> on orders over $50
              </Text>
            </div>
          </Bleed>

          <div style={{ padding: '0 16px' }}>
            <Text as="h4" variant="headingSm">Features</Text>
            <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
              <li>100% premium cotton</li>
              <li>Machine washable</li>
              <li>Available in multiple colors</li>
            </ul>
          </div>

          <Bleed marginInline="400">
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#fafafa'
            }}>
              <Button fullWidth variant="primary">Add to Cart</Button>
              <Button fullWidth variant="secondary">Save for Later</Button>
            </div>
          </Bleed>
        </div>
      </Card>
    </div>
  ),
};

export const CalloutBoxes: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '24px' }}>Dashboard Notifications</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Bleed margin="400">
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '16px',
            borderLeft: '4px solid #4caf50',
            borderRight: '4px solid #4caf50'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px'
              }}>✓</div>
              <div>
                <Text as="h4" variant="headingSm">Payment Processed</Text>
                <Text as="p" variant="bodySm">Order #1001 payment has been successfully processed.</Text>
              </div>
            </div>
          </div>
        </Bleed>

        <Bleed margin="400">
          <div style={{
            backgroundColor: '#fff3cd',
            padding: '16px',
            borderLeft: '4px solid #ff9800',
            borderRight: '4px solid #ff9800'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px'
              }}>!</div>
              <div>
                <Text as="h4" variant="headingSm">Low Inventory Alert</Text>
                <Text as="p" variant="bodySm">5 products are running low on stock.</Text>
              </div>
            </div>
          </div>
        </Bleed>

        <Bleed margin="400">
          <div style={{
            backgroundColor: '#ffebee',
            padding: '16px',
            borderLeft: '4px solid #f44336',
            borderRight: '4px solid #f44336'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f44336',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px'
              }}>⚠</div>
              <div>
                <Text as="h4" variant="headingSm">Action Required</Text>
                <Text as="p" variant="bodySm">Please verify your payment information.</Text>
              </div>
            </div>
          </div>
        </Bleed>
      </div>
    </Card>
  ),
};

export const PricingTable: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '24px', textAlign: 'center' }}>Choose Your Plan</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          {
            name: 'Basic',
            price: '$9/mo',
            features: ['Basic analytics', 'Email support', '5 products'],
            color: '#e1e3e5'
          },
          {
            name: 'Professional',
            price: '$29/mo',
            features: ['Advanced analytics', 'Priority support', 'Unlimited products', 'Custom branding'],
            color: '#ff9800',
            popular: true
          },
          {
            name: 'Enterprise',
            price: '$99/mo',
            features: ['All features', 'Dedicated support', 'API access', 'Custom integrations'],
            color: '#e1e3e5'
          }
        ].map((plan, index) => (
          <Bleed key={index} marginInline="400">
            <div style={{
              backgroundColor: plan.popular ? '#fff3cd' : '#f4f6f8',
              border: plan.popular ? `2px solid ${plan.color}` : '1px solid #e1e3e5',
              borderRadius: '8px',
              padding: '20px',
              position: 'relative'
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: plan.color,
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Text as="h4" variant="headingLg">{plan.name}</Text>
                <Text as="p" variant="headingXl" style={{ color: plan.color, margin: '8px 0' }}>
                  {plan.price}
                </Text>
              </div>

              <div style={{ marginBottom: '20px' }}>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: plan.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>✓</div>
                    <Text as="p" variant="bodySm">{feature}</Text>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "primary" : "secondary"}
                fullWidth
              >
                Get Started
              </Button>
            </div>
          </Bleed>
        ))}
      </div>
    </Card>
  ),
};

export const StatusTimeline: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '24px' }}>Order Timeline</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <Bleed marginInline="400" marginBlockStart="400">
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '16px',
            borderLeft: '4px solid #4caf50',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#4caf50'
            }} />
            <Text as="p" variant="bodySm" tone="subdued">Today, 2:30 PM</Text>
            <Text as="h4" variant="headingSm">Order Delivered</Text>
            <Text as="p" variant="bodySm">Package was successfully delivered to customer.</Text>
          </div>
        </Bleed>

        <div style={{
          width: '2px',
          height: '20px',
          backgroundColor: '#4caf50',
          margin: '0 auto'
        }} />

        <Bleed marginInline="400">
          <div style={{
            backgroundColor: '#f4f6f8',
            padding: '16px',
            borderLeft: '4px solid #e1e3e5',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#6c7278'
            }} />
            <Text as="p" variant="bodySm" tone="subdued">Yesterday, 10:15 AM</Text>
            <Text as="h4" variant="headingSm">Out for Delivery</Text>
            <Text as="p" variant="bodySm">Package is with the delivery courier.</Text>
          </div>
        </Bleed>

        <div style={{
          width: '2px',
          height: '20px',
          backgroundColor: '#e1e3e5',
          margin: '0 auto'
        }} />

        <Bleed marginInline="400">
          <div style={{
            backgroundColor: '#f4f6f8',
            padding: '16px',
            borderLeft: '4px solid #e1e3e5',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#6c7278'
            }} />
            <Text as="p" variant="bodySm" tone="subdued">2 days ago, 3:45 PM</Text>
            <Text as="h4" variant="headingSm">Shipped</Text>
            <Text as="p" variant="bodySm">Order has been shipped from warehouse.</Text>
          </div>
        </Bleed>

        <Bleed marginInline="400" marginBlockEnd="400">
          <div style={{
            backgroundColor: '#f4f6f8',
            padding: '16px',
            borderLeft: '4px solid #e1e3e5',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#6c7278'
            }} />
            <Text as="p" variant="bodySm" tone="subdued">3 days ago, 11:20 AM</Text>
            <Text as="h4" variant="headingSm">Order Placed</Text>
            <Text as="p" variant="bodySm">Customer order has been received.</Text>
          </div>
        </Bleed>
      </div>
    </Card>
  ),
};

export const VisualSeparators: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '24px' }}>Report Sections</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <Bleed marginBlockStart="400">
          <div style={{
            backgroundColor: '#f4f6f8',
            padding: '20px',
            borderBottom: '2px solid #e1e3e5'
          }}>
            <Text as="h4" variant="headingMd">📊 Executive Summary</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Key metrics and performance highlights for Q4 2024.
            </Text>
          </div>
        </Bleed>

        <Bleed>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderBottom: '2px solid #e1e3e5'
          }}>
            <Text as="h4" variant="headingMd">💰 Financial Overview</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Revenue analysis and cost breakdown.
            </Text>
          </div>
        </Bleed>

        <Bleed>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderBottom: '2px solid #e1e3e5'
          }}>
            <Text as="h4" variant="headingMd">👥 Customer Analytics</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Customer acquisition and retention metrics.
            </Text>
          </div>
        </Bleed>

        <Bleed marginBlockEnd="400">
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '20px'
          }}>
            <Text as="h4" variant="headingMd">🎯 Recommendations</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Strategic recommendations for Q1 2025.
            </Text>
          </div>
        </Bleed>
      </div>
    </Card>
  ),
};