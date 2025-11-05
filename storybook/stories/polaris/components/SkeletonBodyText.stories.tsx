import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonBodyText, Card, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Feedback/SkeletonBodyText',
  component: SkeletonBodyText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton body text provides placeholder content while data is loading. It maintains layout structure and improves perceived performance during content loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: 'number',
      min: 1,
      max: 10,
      description: 'Number of skeleton lines to display',
    },
  },
} satisfies Meta<typeof SkeletonBodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lines: 3,
  },
};

export const SingleLine: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SkeletonBodyText lines={1} />
    </div>
  ),
};

export const MultipleLines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">2 lines</Text>
        <SkeletonBodyText lines={2} />
      </div>

      <div>
        <Text as="p" variant="bodySm">3 lines</Text>
        <SkeletonBodyText lines={3} />
      </div>

      <div>
        <Text as="p" variant="bodySm">5 lines</Text>
        <SkeletonBodyText lines={5} />
      </div>
    </div>
  ),
};

export const InCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', maxWidth: '900px' }}>
      <Card sectioned>
        <SkeletonBodyText lines={3} />
      </Card>

      <Card sectioned>
        <SkeletonBodyText lines={4} />
      </Card>

      <Card sectioned>
        <SkeletonBodyText lines={2} />
      </Card>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    const toggleLoading = () => {
      setIsLoading(!isLoading);
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={toggleLoading}>
            {isLoading ? 'Show Content' : 'Show Loading'}
          </Button>
        </div>

        <Card sectioned>
          {isLoading ? (
            <>
              <SkeletonBodyText lines={1} />
              <div style={{ marginTop: '8px' }} />
              <SkeletonBodyText lines={3} />
            </>
          ) : (
            <>
              <Text as="h3" variant="headingMd">Product Information</Text>
              <Text as="p" variant="bodyMd">
                This premium widget is designed with high-quality materials and features advanced technology that enhances user experience.
              </Text>
              <Text as="p" variant="bodyMd">
                Available in multiple colors and sizes to match your specific needs. Backed by our 30-day satisfaction guarantee.
              </Text>
            </>
          )}
        </Card>
      </div>
    );
  },
};

export const DashboardLoading: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      overview: true,
      sales: true,
      customers: true,
      products: false,
    });

    const simulateLoad = (section: keyof typeof loadingStates) => {
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [section]: false }));
      }, 2000);
    };

    React.useEffect(() => {
      Object.keys(loadingStates).forEach(key => {
        if (loadingStates[key as keyof typeof loadingStates]) {
          simulateLoad(key as keyof typeof loadingStates);
        }
      });
    }, []);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', maxWidth: '1000px' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Store Overview</Text>
          {loadingStates.overview ? (
            <SkeletonBodyText lines={4} />
          ) : (
            <div>
              <Text as="p" variant="bodyMd">
                Total revenue: $45,678<br />
                Orders this month: 234<br />
                Conversion rate: 3.2%<br />
                Active customers: 1,567
              </Text>
            </div>
          )}
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Sales Performance</Text>
          {loadingStates.sales ? (
            <SkeletonBodyText lines={3} />
          ) : (
            <div>
              <Text as="p" variant="bodyMd">
                Sales are up 23% from last month.<br />
                Top product: Premium Widget<br />
                Average order value: $87.50
              </Text>
            </div>
          )}
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Customer Insights</Text>
          {loadingStates.customers ? (
            <SkeletonBodyText lines={3} />
          ) : (
            <div>
              <Text as="p" variant="bodyMd">
                New customers: 89 this week<br />
                Repeat customers: 156<br />
                Customer satisfaction: 4.8/5
              </Text>
            </div>
          )}
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Product Status</Text>
          {loadingStates.products ? (
            <SkeletonBodyText lines={2} />
          ) : (
            <div>
              <Text as="p" variant="bodyMd">
                Total products: 245<br />
                Low stock alerts: 3
              </Text>
            </div>
          )}
        </Card>
      </div>
    );
  },
};

export const ProductPageLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    const simulatePageLoad = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    React.useEffect(() => {
      simulatePageLoad();
    }, []);

    return (
      <div style={{ maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <>
                <SkeletonBodyText lines={1} />
                <div style={{ marginTop: '16px' }} />
                <SkeletonBodyText lines={4} />
                <div style={{ marginTop: '24px' }} />
                <SkeletonBodyText lines={2} />
                <div style={{ marginTop: '24px' }} />
                <SkeletonBodyText lines={3} />
              </>
            ) : (
              <>
                <Text as="h1" variant="headingMd">Premium Wireless Headphones</Text>
                <div style={{ marginTop: '16px' }} />
                <Text as="p" variant="bodyLg">
                  Experience crystal-clear audio with our latest noise-canceling technology. These premium headphones are designed for audiophiles who demand the best sound quality.
                </Text>
                <div style={{ marginTop: '24px' }} />
                <Text as="h3" variant="headingMd">Key Features</Text>
                <Text as="p" variant="bodyMd">
                  40-hour battery life, active noise cancellation, premium comfort padding, Bluetooth 5.0 connectivity.
                </Text>
                <div style={{ marginTop: '24px' }} />
                <Text as="h3" variant="headingMd">Technical Specifications</Text>
                <Text as="p" variant="bodyMd">
                  Frequency response: 20Hz-20kHz, Driver size: 40mm, Weight: 250g, Charging time: 2 hours.
                </Text>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  },
};

export const TableLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <Card sectioned>
        <div style={{ marginBottom: '16px' }}>
          <Text as="h3" variant="headingMd">Recent Orders</Text>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: '1' }}>
                  <SkeletonBodyText lines={1} />
                </div>
                <div style={{ flex: '1' }}>
                  <SkeletonBodyText lines={1} />
                </div>
                <div style={{ flex: '1' }}>
                  <SkeletonBodyText lines={1} />
                </div>
                <div style={{ flex: '1' }}>
                  <SkeletonBodyText lines={1} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Text as="p" variant="bodyMd">
              Order #1001 - John Doe - $125.99 - Completed<br />
              Order #1002 - Jane Smith - $89.50 - Processing<br />
              Order #1003 - Bob Johnson - $234.75 - Shipped<br />
              Order #1004 - Alice Brown - $67.25 - Pending<br />
              Order #1005 - Charlie Wilson - $156.80 - Completed
            </Text>
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? 'Load Data' : 'Show Loading'}
          </Button>
        </div>
      </Card>
    );
  },
};

export const ArticleLoading: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          {/* Article header */}
          <div style={{ marginBottom: '24px' }}>
            <SkeletonBodyText lines={1} />
            <div style={{ marginTop: '8px' }} />
            <SkeletonBodyText lines={1} />
          </div>

          {/* Article content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SkeletonBodyText lines={4} />
            <SkeletonBodyText lines={3} />
            <SkeletonBodyText lines={5} />
            <SkeletonBodyText lines={2} />
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const ListLoading: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingMd">Loading your items...</Text>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#e1e3e5', borderRadius: '4px' }} />
              <div style={{ flex: '1' }}>
                <SkeletonBodyText lines={1} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
};

export const SequentialLoading: Story = {
  render: () => {
    const [loadingSteps, setLoadingSteps] = useState({
      header: true,
      content: true,
      sidebar: true,
      footer: true,
    });

    React.useEffect(() => {
      const timers = [
        setTimeout(() => setLoadingSteps(prev => ({ ...prev, header: false })), 1000),
        setTimeout(() => setLoadingSteps(prev => ({ ...prev, content: false })), 2000),
        setTimeout(() => setLoadingSteps(prev => ({ ...prev, sidebar: false })), 3000),
        setTimeout(() => setLoadingSteps(prev => ({ ...prev, footer: false })), 4000),
      ];

      return () => timers.forEach(clearTimeout);
    }, []);

    return (
      <div style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          {loadingSteps.header ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <Text as="h1" variant="headingMd">Dashboard Overview</Text>
          )}
        </div>

        {/* Main content and sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Main content */}
          <div>
            {loadingSteps.content ? (
              <SkeletonBodyText lines={6} />
            ) : (
              <Card sectioned>
                <Text as="p" variant="bodyMd">
                  Welcome to your dashboard! Here you can monitor your store performance, manage orders, track inventory, and analyze customer data.
                  All your key metrics are available at a glance, with detailed reports available for deeper analysis.
                </Text>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {loadingSteps.sidebar ? (
              <SkeletonBodyText lines={4} />
            ) : (
              <Card sectioned>
                <Text as="h4" variant="headingSm">Quick Actions</Text>
                <Text as="p" variant="bodyMd">
                  • Add new product<br />
                  • View orders<br />
                  • Manage customers<br />
                  • Run reports
                </Text>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px' }}>
          {loadingSteps.footer ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <Text as="p" variant="bodySm" alignment="center">
              Last updated: Just now
            </Text>
          )}
        </div>
      </div>
    );
  },
};