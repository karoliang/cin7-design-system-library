import type { Meta, StoryObj } from '@storybook/react';
import {
  Frame,
  TopBar,
  Navigation,
  Layout,
  Page,
  Card,
  Text,
  Button,
  Icon,
  Avatar,
  Badge,
  InlineStack,
  BlockStack,
} from '@shopify/polaris';
import {
  HomeIcon,
  OrderIcon,
  ProductIcon,
  PersonIcon,
  ChartHistogramFullIcon,
  SettingsIcon,
  ExitIcon,
  QuestionCircleIcon,
  NotificationIcon,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Polaris/Layout/Frame',
  component: Frame,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Frame provides the main application layout structure with navigation, top bar, and content areas. It\'s the foundation for building complete Shopify-style applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    topBar: {
      control: 'object',
      description: 'TopBar component configuration',
    },
    navigation: {
      control: 'object',
      description: 'Navigation component configuration',
    },
    showMobileNavigation: {
      control: 'boolean',
      description: 'Whether mobile navigation is visible',
    },
    onNavigationDismiss: {
      action: 'onNavigationDismiss',
      description: 'Callback when navigation is dismissed',
    },
    logo: {
      control: 'object',
      description: 'Logo configuration for the navigation',
    },
    globalActions: {
      control: 'object',
      description: 'Global actions configuration',
    },
  },
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof Frame>;

const navigationItems = [
  {
    label: 'Home',
    icon: HomeIcon,
    url: '#',
    badge: { status: 'new', content: '3' },
  },
  {
    label: 'Orders',
    icon: OrderIcon,
    url: '#',
    subNavigationItems: [
      {
        label: 'All orders',
        url: '#',
      },
      {
        label: 'Fulfilled',
        url: '#',
      },
      {
        label: 'Unfulfilled',
        url: '#',
        badge: { status: 'attention', content: '12' },
      },
    ],
  },
  {
    label: 'Products',
    icon: ProductIcon,
    url: '#',
    subNavigationItems: [
      {
        label: 'All products',
        url: '#',
      },
      {
        label: 'Collections',
        url: '#',
      },
      {
        label: 'Inventory',
        url: '#',
      },
    ],
  },
  {
    label: 'Customers',
    icon: PersonIcon,
    url: '#',
  },
  {
    label: 'Analytics',
    icon: ChartHistogramFullIcon,
    url: '#',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    url: '#',
  },
];

const userMenu = [
  {
    items: [
      { content: 'Account settings', icon: SettingsIcon },
      { content: 'Support', icon: QuestionCircleIcon },
      { content: 'Logout', icon: ExitIcon },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
      setSearchValue(value);
    }, []);

    const handleSearchDismiss = useCallback(() => {
      setIsSearchActive(false);
      setSearchValue('');
    }, []);

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigation}
        searchField={{
          placeholder: 'Search',
          value: searchValue,
          onChange: handleSearchChange,
          onDismiss: handleSearchDismiss,
          focused: isSearchActive,
        }}
        userMenu={{
          name: 'John Doe',
          detail: 'Store owner',
          initials: 'JD',
          avatar: <Avatar customer size="small" name="John Doe" />,
          actions: userMenu,
        }}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={navigationItems}
          separator
        />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page title="Dashboard">
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <Text variant="headingMd" as="h2">Welcome to your dashboard</Text>
                    <div style={{ marginTop: '16px' }}>
                      <Text>
                        This is a complete Frame example with navigation and top bar.
                        Try resizing the window to see responsive behavior.
                      </Text>
                    </div>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};

export const WithLogo: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigation}
        searchResultsVisible={false}
        searchField={{
          placeholder: 'Search products, orders, customers...',
        }}
        userMenu={{
          name: 'Sarah Chen',
          detail: 'Store owner',
          initials: 'SC',
          actions: userMenu,
        }}
      />
    );

    const logo = {
      topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
      contextualSaveBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
      url: '#',
      width: 124,
    };

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          title="Back End"
          items={[
            { label: 'Dashboard', icon: HomeIcon, url: '#' },
            { label: 'Orders', icon: OrderIcon, url: '#' },
            { label: 'Products', icon: ProductIcon, url: '#' },
          ]}
        />
        <Navigation.Section
          title="Sales Channel"
          items={[
            { label: 'Online Store', icon: HomeIcon, url: '#' },
            { label: 'Point of Sale', icon: ProductIcon, url: '#' },
            { label: 'Buy Button', icon: OrderIcon, url: '#' },
          ]}
        />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        logo={logo}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page title="Store Management">
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd">Store Dashboard</Text>
                      <Text>
                        Frame with custom logo and organized navigation sections.
                        The logo appears in both the top bar and contextual save bar.
                      </Text>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};

export const WithNotifications: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [notificationCount, setNotificationCount] = useState(5);

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigation}
        searchField={{
          placeholder: 'Search...',
          focused: isSearchActive,
        }}
        userMenu={{
          name: 'Admin User',
          detail: 'Super Admin',
          initials: 'AU',
          actions: userMenu,
        }}
      />
    );

    const globalActions = [
      {
        icon: NotificationIcon,
        badge: { content: notificationCount, status: 'critical' },
        onClick: () => {
          setNotificationCount(0);
          console.log('Notifications clicked');
        },
      },
      {
        icon: QuestionCircleIcon,
        onClick: () => console.log('Help clicked'),
      },
    ];

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={navigationItems}
        />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        globalActions={globalActions}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page title="Notifications Center">
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd">Global Notifications</Text>
                      <Text>
                        This Frame includes global action buttons in the top bar.
                        Click the notification icon to clear the badge.
                      </Text>
                      <InlineStack gap="8px">
                        <Button onClick={() => setNotificationCount(notificationCount + 1)}>
                          Add notification
                        </Button>
                        <Button onClick={() => setNotificationCount(0)}>
                          Clear notifications
                        </Button>
                      </InlineStack>
                      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <Text variant="bodySm">
                          Current notification count: {notificationCount}
                        </Text>
                      </div>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};

export const EcommerceLayout: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const ecommerceItems = [
      {
        label: 'Dashboard',
        icon: HomeIcon,
        url: '#',
        badge: { status: 'success', content: '✓' },
      },
      {
        label: 'Orders',
        icon: OrderIcon,
        url: '#',
        badge: { status: 'attention', content: '8' },
        subNavigationItems: [
          { label: 'All orders', url: '#' },
          { label: 'Pending', url: '#', badge: { status: 'attention', content: '8' } },
          { label: 'Fulfilled', url: '#' },
          { label: 'Returns', url: '#' },
        ],
      },
      {
        label: 'Products',
        icon: ProductIcon,
        url: '#',
        subNavigationItems: [
          { label: 'All products', url: '#' },
          { label: 'Add product', url: '#', badge: { status: 'new', content: '+' } },
          { label: 'Collections', url: '#' },
          { label: 'Categories', url: '#' },
        ],
      },
      {
        label: 'Customers',
        icon: PersonIcon,
        url: '#',
        badge: { status: 'new', content: '23' },
      },
      {
        label: 'Analytics',
        icon: ChartHistogramFullIcon,
        url: '#',
      },
      {
        label: 'Marketing',
        icon: HomeIcon,
        url: '#',
      },
      {
        label: 'Discounts',
        icon: SettingsIcon,
        url: '#',
      },
    ];

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigation}
        searchField={{
          placeholder: 'Search products, orders, customers...',
          value: searchValue,
          onChange: setSearchValue,
        }}
        userMenu={{
          name: 'Store Manager',
          detail: 'Premium Plan',
          initials: 'SM',
          actions: userMenu,
        }}
      />
    );

    const navigationMarkup = (
      <Navigation location="/orders">
        <Navigation.Section
          items={ecommerceItems}
          title="Store Management"
        />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page
            title="Order Management"
            subtitle="Manage and track your orders"
            breadcrumbs={[{ content: 'Home', url: '#' }]}
            primaryAction={{
              content: 'Create order',
              onAction: () => console.log('Create order'),
            }}
          >
            <Layout>
              <Layout.Section oneThird>
                <Card title="Quick Stats">
                  <div style={{ padding: '16px' }}>
                    <BlockStack gap="12px">
                      <InlineStack align="space-between">
                        <Text>Pending Orders</Text>
                        <Badge status="attention">8</Badge>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text>New Customers</Text>
                        <Badge status="success">23</Badge>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text>Total Revenue</Text>
                        <Badge>$12,450</Badge>
                      </InlineStack>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>

              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <Text variant="headingMd" as="h2">Recent Orders</Text>
                    <div style={{ marginTop: '16px' }}>
                      <Text>
                        This is a complete e-commerce layout with comprehensive navigation.
                        The navigation shows badges for pending items and new content.
                      </Text>
                    </div>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};

export const MinimalLayout: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const minimalItems = [
      { label: 'Home', icon: HomeIcon, url: '#' },
      { label: 'Settings', icon: SettingsIcon, url: '#' },
    ];

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        onNavigationToggle={toggleMobileNavigation}
        userMenu={{
          name: 'User',
          initials: 'U',
          actions: userMenu,
        }}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section items={minimalItems} />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page title="Minimal Layout">
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd">Minimal Frame</Text>
                      <Text>
                        A simplified Frame with minimal navigation and top bar.
                        Perfect for focused applications or simple interfaces.
                      </Text>
                      <Button>Get Started</Button>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};

export const ResponsiveBehavior: Story = {
  render: () => {
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    React.useEffect(() => {
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileNavigation = useCallback(() => {
      setMobileNavigationActive((active) => !active);
    }, []);

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={viewportWidth < 768}
        onNavigationToggle={toggleMobileNavigation}
        searchField={{
          placeholder: 'Search...',
        }}
        userMenu={{
          name: 'Responsive User',
          initials: 'RU',
          actions: userMenu,
        }}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section items={navigationItems} />
      </Navigation>
    );

    return (
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigation}
      >
        <div style={{ height: '100vh' }}>
          <Page title="Responsive Frame">
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd">Responsive Design</Text>
                      <Text>
                        Current viewport width: {viewportWidth}px
                      </Text>
                      <Text>
                        Resize your browser window to see the responsive behavior:
                      </Text>
                      <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                        <li>Desktop (&gt;1024px): Full navigation sidebar</li>
                        <li>Tablet (768-1024px): Collapsible navigation</li>
                        <li>Mobile (&lt;768px): Hamburger menu with overlay navigation</li>
                      </ul>
                      <Button onClick={toggleMobileNavigation}>
                        Toggle Mobile Navigation
                      </Button>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>
      </Frame>
    );
  },
};