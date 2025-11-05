import type { Meta, StoryObj } from '@storybook/react';
import { Column, Card, Button, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Layout/Column',
  component: Column,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Column is a flexible layout component that helps create column-based layouts within other components. It\'s useful for organizing content in vertical columns with consistent spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '800px' }}>
      <Column>
        <Card sectioned>
          <Text as="h3" variant="headingMd">First Column</Text>
          <Text as="p" variant="bodySm">Content in the first column</Text>
        </Card>
      </Column>

      <Column>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Second Column</Text>
          <Text as="p" variant="bodySm">Content in the second column</Text>
        </Card>
      </Column>

      <Column>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Third Column</Text>
          <Text as="p" variant="bodySm">Content in the third column</Text>
        </Card>
      </Column>
    </div>
  ),
};

export const TwoColumnLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '1000px' }}>
      <Column style={{ flex: '2' }}>
        <Card sectioned>
          <Text as="h3" variant="headingLg">Main Content</Text>
          <Text as="p" variant="bodyMd" style={{ marginBottom: '16px' }}>
            This is the primary content area that takes up more space. It contains the main information and functionality.
          </Text>

          <div style={{
            height: '200px',
            backgroundColor: '#f4f6f8',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Text as="p" variant="bodySm" tone="subdued">Main content visualization</Text>
          </div>

          <Text as="p" variant="bodySm">
            Additional details and information can be displayed here in the larger content area.
          </Text>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Sidebar</Text>
          <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
            This is a narrower sidebar column for secondary information.
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button fullWidth variant="primary">Primary Action</Button>
            <Button fullWidth variant="secondary">Secondary Action</Button>
            <Button fullWidth variant="plain">Tertiary Action</Button>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const ThreeColumnLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '1200px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Products</Text>
          <div style={{ marginTop: '12px' }}>
            {['T-Shirt', 'Jeans', 'Shoes'].map((item, index) => (
              <div key={index} style={{
                padding: '8px 0',
                borderBottom: index < 2 ? '1px solid #e1e3e5' : 'none'
              }}>
                <Text as="p" variant="bodySm">{item}</Text>
                <Text as="p" variant="bodySm" tone="subdued">${29.99 + index * 30}</Text>
              </div>
            ))}
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Customers</Text>
          <div style={{ marginTop: '12px' }}>
            {['John Doe', 'Jane Smith', 'Bob Johnson'].map((customer, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 0',
                borderBottom: index < 2 ? '1px solid #e1e3e5' : 'none'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#f4f6f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: "var(--font-size-xs)"
                }}>👤</div>
                <div style={{ flex: 1 }}>
                  <Text as="p" variant="bodySm">{customer}</Text>
                  <Text as="p" variant="bodySm" tone="subdued">Active</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Orders</Text>
          <div style={{ marginTop: '12px' }}>
            {['#1001', '#1002', '#1003'].map((order, index) => (
              <div key={index} style={{
                padding: '8px 0',
                borderBottom: index < 2 ? '1px solid #e1e3e5' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text as="p" variant="bodySm">{order}</Text>
                  <Badge status={index === 0 ? 'success' : index === 1 ? 'attention' : 'info'}>
                    {index === 0 ? 'Fulfilled' : index === 1 ? 'Processing' : 'Pending'}
                  </Badge>
                </div>
                <Text as="p" variant="bodySm" tone="subdued">${89.99 + index * 20}</Text>
              </div>
            ))}
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const StatsColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '800px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="headingLg">$12,345</Text>
            <Text as="p" variant="bodySm" tone="subdued">Total Revenue</Text>
            <Badge status="success" style={{ marginTop: '8px' }}>+15%</Badge>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="headingLg">456</Text>
            <Text as="p" variant="bodySm" tone="subdued">Orders</Text>
            <Badge status="success" style={{ marginTop: '8px' }}>+8%</Badge>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="headingLg">89</Text>
            <Text as="p" variant="bodySm" tone="subdued">Customers</Text>
            <Badge status="attention" style={{ marginTop: '8px' }}>+2%</Badge>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="p" variant="headingLg">3.2%</Text>
            <Text as="p" variant="bodySm" tone="subdued">Conversion</Text>
            <Badge status="critical" style={{ marginTop: '8px' }}>-1%</Badge>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const FeatureColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '1000px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>🚀</div>
            <Text as="h3" variant="headingMd">Fast Performance</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Optimized for speed and efficiency with minimal load times.
            </Text>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>🔒</div>
            <Text as="h3" variant="headingMd">Secure</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Enterprise-grade security to protect your data and privacy.
            </Text>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>📱</div>
            <Text as="h3" variant="headingMd">Responsive</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Works seamlessly across all devices and screen sizes.
            </Text>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const PricingColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', maxWidth: '900px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="h3" variant="headingMd">Basic</Text>
            <Text as="p" variant="headingLg" style={{ margin: '16px 0' }}>$9/mo</Text>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              {['Basic features', 'Email support', '5 products'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#6c7278',
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

            <Button fullWidth>Get Started</Button>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned style={{ border: '2px solid #ff9800', backgroundColor: '#fff3cd' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge status="attention" style={{ marginBottom: '12px' }}>POPULAR</Badge>
            <Text as="h3" variant="headingMd">Professional</Text>
            <Text as="p" variant="headingLg" style={{ margin: '16px 0' }}>$29/mo</Text>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              {['All Basic features', 'Priority support', 'Unlimited products', 'Custom branding'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#ff9800',
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

            <Button fullWidth variant="primary">Get Started</Button>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <Text as="h3" variant="headingMd">Enterprise</Text>
            <Text as="p" variant="headingLg" style={{ margin: '16px 0' }}>$99/mo</Text>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              {['All Pro features', 'Dedicated support', 'API access', 'Custom integrations'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#6c7278',
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

            <Button fullWidth>Contact Sales</Button>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const ContentColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '1200px' }}>
      <Column style={{ flex: '2' }}>
        <Card sectioned>
          <Text as="h3" variant="headingLg">Article Title</Text>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginBottom: '16px' }}>
            Published on November 5, 2025 • 5 min read
          </Text>

          <div style={{
            height: '200px',
            backgroundColor: '#f4f6f8',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text as="p" variant="bodySm" tone="subdued">Article Featured Image</Text>
          </div>

          <Text as="p" variant="bodyMd" style={{ marginBottom: '16px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>

          <Text as="p" variant="bodyMd">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Related Articles</Text>
          <div style={{ marginTop: '12px' }}>
            {[
              'Getting Started Guide',
              'Advanced Features',
              'Best Practices',
              'Common Issues'
            ].map((article, index) => (
              <div key={index} style={{
                padding: '12px 0',
                borderBottom: index < 3 ? '1px solid #e1e3e5' : 'none',
                cursor: 'pointer'
              }}>
                <Text as="p" variant="bodySm">{article}</Text>
                <Text as="p" variant="bodySm" tone="subdued">3 min read</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card sectioned style={{ marginTop: '16px' }}>
          <Text as="h3" variant="headingMd">Tags</Text>
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Badge>Tutorial</Badge>
              <Badge>Guide</Badge>
              <Badge>Beginner</Badge>
              <Badge>Advanced</Badge>
              <Badge>Tips</Badge>
              <Badge>Best Practices</Badge>
            </div>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const TeamColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '1000px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#f4f6f8',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-3xl)"
            }}>👨‍💼</div>

            <Text as="h3" variant="headingMd">John Smith</Text>
            <Text as="p" variant="bodySm" tone="subdued">CEO & Founder</Text>

            <div style={{ marginTop: '16px' }}>
              <Text as="p" variant="bodySm">
                Visionary leader with 15+ years of experience in e-commerce and retail innovation.
              </Text>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Badge>Leadership</Badge>
              <Badge>Strategy</Badge>
            </div>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#f4f6f8',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-3xl)"
            }}>👩‍💻</div>

            <Text as="h3" variant="headingMd">Sarah Johnson</Text>
            <Text as="p" variant="bodySm" tone="subdued">CTO</Text>

            <div style={{ marginTop: '16px' }}>
              <Text as="p" variant="bodySm">
                Tech expert passionate about building scalable solutions and cutting-edge technology.
              </Text>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Badge>Technology</Badge>
              <Badge>Innovation</Badge>
            </div>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#f4f6f8',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-3xl)"
            }}>👨‍🎨</div>

            <Text as="h3" variant="headingMd">Mike Chen</Text>
            <Text as="p" variant="bodySm" tone="subdued">Design Lead</Text>

            <div style={{ marginTop: '16px' }}>
              <Text as="p" variant="bodySm">
                Creative mind focused on user experience and beautiful, intuitive interfaces.
              </Text>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Badge>Design</Badge>
              <Badge>UX</Badge>
            </div>
          </div>
        </Card>
      </Column>
    </div>
  ),
};

export const ProcessColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', maxWidth: '1000px' }}>
      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#e8f5e8',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-2xl)",
              fontWeight: 'bold',
              color: '#4caf50'
            }}>1</div>

            <Text as="h3" variant="headingMd">Discover</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Understand your needs and requirements through comprehensive research and analysis.
            </Text>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#fff3cd',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-2xl)",
              fontWeight: 'bold',
              color: '#ff9800'
            }}>2</div>

            <Text as="h3" variant="headingMd">Design</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Create tailored solutions and wireframes based on your specific requirements.
            </Text>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-2xl)",
              fontWeight: 'bold',
              color: '#2196f3'
            }}>3</div>

            <Text as="h3" variant="headingMd">Develop</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Build and implement the solution with quality code and best practices.
            </Text>
          </div>
        </Card>
      </Column>

      <Column style={{ flex: '1' }}>
        <Card sectioned>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#f3e5f5',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-size-2xl)",
              fontWeight: 'bold',
              color: '#9c27b0'
            }}>4</div>

            <Text as="h3" variant="headingMd">Deliver</Text>
            <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
              Launch the solution and provide ongoing support and maintenance.
            </Text>
          </div>
        </Card>
      </Column>
    </div>
  ),
};