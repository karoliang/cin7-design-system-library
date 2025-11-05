import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Badge,
  Button,
  Text,
  Icon,
  InlineStack,
  BlockStack,
  Grid,
  Divider,
  Select,
  DatePicker,
  ButtonGroup,
  Banner,
  Progress,
  ProgressBar,
  Scrollable,
  Tabs,
  Link,
  Avatar,
  DataTable,
  Pagination,
  SkeletonBodyText,
  Tooltip,
  useIndexResourceState,
  IndexTable,
  useSetIndexFiltersMode,
  IndexFilters,
  ChoiceList,
} from '@shopify/polaris';
import {
  TrendingUpMinor,
  TrendingDownMinor,
  OrdersMajor,
  CustomersMajor,
  DollarMajor,
  PackageMajor,
  AnalyticsMajor,
  ClockMajor,
  CalendarMajor,
  RefreshMajor,
  FilterMajor,
  ExportMinor,
  BellMinor,
  SettingsMinor,
  QuestionMarkMinor,
  PlusMinor,
  ViewMinor,
  EditMinor,
  ChevronRightMinor,
  CheckmarkMinor,
  XMarkMinor,
  AlertMinor,
  InfoMinor,
  MobileMajor,
  DesktopMajor,
  StoreMajor,
  StarMinor,
} from '@shopify/polaris-icons';
import React, { useState, useEffect, useCallback } from 'react';

const meta = {
  title: 'Business Components/Dashboard Components',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive dashboard components for business analytics. Features KPI cards with trend indicators, real-time data updates, interactive charts, customizable layouts, and user preference management for enterprise dashboards.',
      },
    },
  },
  tags: ['autodocs', 'business', 'dashboard', 'analytics'],
  argTypes: {
    showRealTimeUpdates: {
      control: 'boolean',
      description: 'Enable real-time data updates with live indicators',
    },
    enableCustomization: {
      control: 'boolean',
      description: 'Allow dashboard layout customization and widget management',
    },
    showTrends: {
      control: 'boolean',
      description: 'Display trend indicators and comparative data',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// Sample dashboard data
const kpiData = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: '+12.5%',
    trend: 'up',
    icon: DollarMajor,
    color: 'success',
    period: 'Last 30 days',
    target: '$150,000',
    progress: 83,
  },
  {
    title: 'Total Orders',
    value: '1,842',
    change: '+8.2%',
    trend: 'up',
    icon: OrdersMajor,
    color: 'info',
    period: 'Last 30 days',
    target: '2,000',
    progress: 92,
  },
  {
    title: 'Active Customers',
    value: '8,291',
    change: '-2.4%',
    trend: 'down',
    icon: CustomersMajor,
    color: 'warning',
    period: 'Last 30 days',
    target: '9,000',
    progress: 92,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+0.8%',
    trend: 'up',
    icon: AnalyticsMajor,
    color: 'success',
    period: 'Last 30 days',
    target: '4.0%',
    progress: 80,
  },
];

const salesData = [
  { date: '2024-07-01', sales: 4200, orders: 145, customers: 89 },
  { date: '2024-07-02', sales: 5100, orders: 167, customers: 102 },
  { date: '2024-07-03', sales: 3800, orders: 132, customers: 78 },
  { date: '2024-07-04', sales: 6200, orders: 198, customers: 125 },
  { date: '2024-07-05', sales: 7100, orders: 223, customers: 143 },
  { date: '2024-07-06', sales: 5900, orders: 189, customers: 118 },
  { date: '2024-07-07', sales: 6800, orders: 215, customers: 134 },
];

const topProducts = [
  { name: 'Premium Wireless Headphones', sales: 342, revenue: '$102,658', trend: '+15%', stock: 45 },
  { name: 'Smart Fitness Watch', sales: 289, revenue: '$57,711', trend: '+8%', stock: 23 },
  { name: 'Organic Cotton T-Shirt', sales: 267, revenue: '$8,043', trend: '-5%', stock: 8 },
  { name: 'Leather Wallet', sales: 198, revenue: '$14,850', trend: '+12%', stock: 120 },
  { name: 'Bluetooth Speaker', sales: 156, revenue: '$23,400', trend: '+22%', stock: 67 },
];

// KPI Card Component
const KPICard = ({ data, showTrends = true, compact = false }: {
  data: typeof kpiData[0];
  showTrends?: boolean;
  compact?: boolean;
}) => {
  const TrendIcon = data.trend === 'up' ? TrendingUpMinor : TrendingDownMinor;
  const trendColor = data.trend === 'up' ? 'success' : 'critical';

  return (
    <Card padding={compact ? '400' : '500'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <Text variant={compact ? 'bodySm' : 'bodyMd'} tone="subdued" as="p">
            {data.title}
          </Text>
          <Text variant={compact ? 'headingLg' : 'heading2xl'} as="h2" fontWeight="bold">
            {data.value}
          </Text>

          {showTrends && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <Icon source={TrendIcon} tone={trendColor} />
              <Text variant="bodySm" tone={trendColor}>
                {data.change}
              </Text>
              <Text variant="bodySm" tone="subdued">
                {data.period}
              </Text>
            </div>
          )}

          {!compact && data.target && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <Text variant="bodySm" tone="subdued">Target: {data.target}</Text>
                <Text variant="bodySm" tone="subdued">{data.progress}%</Text>
              </div>
              <ProgressBar progress={data.progress} size="small" tone={data.color as any} />
            </div>
          )}
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: data.color === 'success' ? '#e8f8e8' :
                           data.color === 'warning' ? '#fff8e8' :
                           data.color === 'critical' ? '#ffe8e8' : '#e8f0ff',
          borderRadius: '8px',
          marginLeft: '16px'
        }}>
          <Icon source={data.icon} size={compact ? 'small' : 'medium'} />
        </div>
      </div>
    </Card>
  );
};

// Real-time Updates Component
const RealTimeUpdates = ({ enabled = false }: { enabled: boolean }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setLastUpdate(new Date());
        setIsUpdating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: enabled ? '#10b981' : '#6d7175',
          animation: enabled && !isUpdating ? 'pulse 2s infinite' : 'none'
        }}
      />
      <Text variant="bodySm" tone="subdued">
        {enabled ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'Real-time updates disabled'}
      </Text>
      {isUpdating && (
        <Text variant="bodySm" tone="info">Updating...</Text>
      )}
    </div>
  );
};

// Sales Chart Component (Simulated with CSS)
const SalesChart = ({ data }: { data: typeof salesData }) => {
  const maxSales = Math.max(...data.map(d => d.sales));

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Text variant="headingLg" as="h2">Sales Overview</Text>
          <Select
            label="Time Period"
            labelHidden
            options={[
              { label: 'Last 7 days', value: '7d' },
              { label: 'Last 30 days', value: '30d' },
              { label: 'Last 90 days', value: '90d' },
            ]}
            defaultValue="7d"
          />
        </div>

        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '16px 0' }}>
          {data.map((day, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: `${(day.sales / maxSales) * 160}px`,
                  backgroundColor: '#202223',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#202223',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: "12px",
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  ${day.sales.toLocaleString()}
                </div>
              </div>
              <Text variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
                {new Date(day.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </Text>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <div>
            <Text variant="bodySm" tone="subdued">Total Sales</Text>
            <Text variant="headingLg" as="div">
              ${data.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
            </Text>
          </div>
          <div>
            <Text variant="bodySm" tone="subdued">Total Orders</Text>
            <Text variant="headingLg" as="div">
              {data.reduce((sum, day) => sum + day.orders, 0).toLocaleString()}
            </Text>
          </div>
          <div>
            <Text variant="bodySm" tone="subdued">Avg Order Value</Text>
            <Text variant="headingLg" as="div">
              ${Math.round(data.reduce((sum, day) => sum + day.sales, 0) / data.reduce((sum, day) => sum + day.orders, 0))}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Dashboard Layout Component
const DashboardLayout = ({ showRealTimeUpdates = false, enableCustomization = false }: {
  showRealTimeUpdates?: boolean;
  enableCustomization?: boolean;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    { id: 'overview', content: 'Overview', panelID: 'overview-panel' },
    { id: 'sales', content: 'Sales', panelID: 'sales-panel' },
    { id: 'customers', content: 'Customers', panelID: 'customers-panel' },
    { id: 'products', content: 'Products', panelID: 'products-panel' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div style={{ maxWidth: '1400px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Text variant="headingXl" as="h1">Business Dashboard</Text>
          <RealTimeUpdates enabled={showRealTimeUpdates} />
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <DatePicker
            month={dateRange.start.getMonth()}
            year={dateRange.start.getFullYear()}
            onChange={(value) => setDateRange({ start: value.start, end: value.end })}
            onMonthChange={(month, year) => {
              const newStart = new Date(dateRange.start.setMonth(month));
              const newEnd = new Date(dateRange.end.setMonth(month));
              setDateRange({ start: newStart, end: newEnd });
            }}
            selected={{ start: dateRange.start, end: dateRange.end }}
            allowRange
          />

          <Button icon={RefreshMajor} onClick={handleRefresh} loading={refreshing}>
            Refresh
          </Button>

          <Button icon={ExportMinor}>Export</Button>

          {enableCustomization && (
            <Button icon={SettingsMajor}>Customize</Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
        <div style={{ marginTop: '24px' }}>
          {selectedTab === 0 && (
            <div>
              {/* KPI Cards */}
              <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400" style={{ marginBottom: '24px' }}>
                {kpiData.map((kpi, index) => (
                  <KPICard key={index} data={kpi} showTrends />
                ))}
              </Grid>

              {/* Charts and Tables */}
              <Grid columns={{ xs: 1, lg: 2 }} gap="400">
                <div>
                  <SalesChart data={salesData} />
                </div>

                <Card>
                  <div style={{ padding: '16px' }}>
                    <Text variant="headingLg" as="h2">Top Products</Text>
                    <div style={{ marginTop: '16px' }}>
                      {topProducts.map((product, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: index < topProducts.length - 1 ? '1px solid #e1e1e1' : 'none'
                        }}>
                          <div style={{ flex: 1 }}>
                            <Text variant="bodyMd" fontWeight="semibold">{product.name}</Text>
                            <Text variant="bodySm" tone="subdued">{product.sales} sold</Text>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <Text variant="bodyMd" fontWeight="semibold">{product.revenue}</Text>
                            <Text variant="bodySm" tone={product.trend.startsWith('+') ? 'success' : 'critical'}>
                              {product.trend}
                            </Text>
                          </div>
                          <div style={{ marginLeft: '16px' }}>
                            <Badge status={product.stock < 20 ? 'warning' : 'success'}>
                              {product.stock} in stock
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <Button variant="plain">View All Products</Button>
                    </div>
                  </div>
                </Card>
              </Grid>
            </div>
          )}

          {selectedTab === 1 && (
            <div>
              <Text variant="headingLg" as="h2">Sales Analytics</Text>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Text variant="bodyMd">Detailed sales analytics and insights coming soon...</Text>
                </div>
              </Card>
            </div>
          )}

          {selectedTab === 2 && (
            <div>
              <Text variant="headingLg" as="h2">Customer Analytics</Text>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Text variant="bodyMd">Customer analytics and segmentation coming soon...</Text>
                </div>
              </Card>
            </div>
          )}

          {selectedTab === 3 && (
            <div>
              <Text variant="headingLg" as="h2">Product Analytics</Text>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Text variant="bodyMd">Product performance analytics coming soon...</Text>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed = () => {
  const activities = [
    { time: '2 minutes ago', user: 'John Doe', action: 'placed order #1020', amount: '$452.00', icon: OrdersMajor },
    { time: '15 minutes ago', user: 'Jane Smith', action: 'registered as new customer', icon: CustomersMajor },
    { time: '1 hour ago', user: 'System', action: 'low stock alert: SKU002', icon: PackageMajor, type: 'warning' },
    { time: '2 hours ago', user: 'Bob Johnson', action: 'left review 5 stars', icon: StarMinor, type: 'success' },
    { time: '3 hours ago', user: 'System', action: 'daily sales report generated', icon: AnalyticsMajor },
  ];

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Recent Activity</Text>

        <div style={{ marginTop: '16px' }}>
          {activities.map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 0',
              borderBottom: index < activities.length - 1 ? '1px solid #e1e1e1' : 'none'
            }}>
              <div style={{
                padding: '8px',
                backgroundColor: activity.type === 'warning' ? '#fff8e8' :
                               activity.type === 'success' ? '#e8f8e8' : '#f8f8f8',
                borderRadius: '6px',
                height: 'fit-content'
              }}>
                <Icon source={activity.icon} size="small" />
              </div>

              <div style={{ flex: 1 }}>
                <Text variant="bodySm">
                  <strong>{activity.user}</strong> {activity.action}
                  {activity.amount && (
                    <Text variant="bodySm" fontWeight="semibold"> {activity.amount}</Text>
                  )}
                </Text>
                <Text variant="bodySm" tone="subdued">{activity.time}</Text>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button variant="plain">View All Activity</Button>
        </div>
      </div>
    </Card>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { title: 'New Order', description: 'Create a new customer order', icon: PlusMajor, color: '#202223' },
    { title: 'Add Product', description: 'Add a new product to inventory', icon: PackageMajor, color: '#10b981' },
    { title: 'View Reports', description: 'Generate business reports', icon: AnalyticsMajor, color: '#3b82f6' },
    { title: 'Manage Customers', description: 'Customer relationship management', icon: CustomersMajor, color: '#f59e0b' },
  ];

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Quick Actions</Text>

        <Grid columns={{ xs: 1, sm: 2 }} gap="400" style={{ marginTop: '16px' }}>
          {actions.map((action, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                border: '1px solid #e1e1e1',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e1e1e1';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: action.color + '20',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Icon source={action.icon} size="medium" tone={action.color} />
              </div>
              <Text variant="bodyMd" fontWeight="semibold">{action.title}</Text>
              <Text variant="bodySm" tone="subdued">{action.description}</Text>
            </div>
          ))}
        </Grid>
      </div>
    </Card>
  );
};

// Stories
export const BusinessDashboard: Story = {
  render: () => <DashboardLayout showRealTimeUpdates enableCustomization />,
};

export const SalesDashboard: Story = {
  render: () => (
    <div style={{ maxWidth: '1400px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingXl" as="h1">Sales Dashboard</Text>
        <RealTimeUpdates enabled />
      </div>

      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400" style={{ marginBottom: '24px' }}>
        {kpiData.slice(0, 4).map((kpi, index) => (
          <KPICard key={index} data={kpi} showTrends />
        ))}
      </Grid>

      <Grid columns={{ xs: 1, lg: 3 }} gap="400">
        <div style={{ gridColumn: '1 / -1' }}>
          <SalesChart data={salesData} />
        </div>

        <div style={{ gridColumn: '1 / -1', lg: '1 / 3' }}>
          <Card>
            <div style={{ padding: '16px' }}>
              <Text variant="headingLg" as="h2">Recent Orders</Text>
              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['Order', 'Customer', 'Total', 'Status']}
                rows={[
                  ['#1020', 'John Doe', '$452.00', 'Fulfilled'],
                  ['#1019', 'Jane Smith', '$125.00', 'Processing'],
                  ['#1018', 'Bob Johnson', '$789.00', 'Unfulfilled'],
                  ['#1017', 'Alice Wilson', '$234.00', 'Fulfilled'],
                ]}
              />
            </div>
          </Card>
        </div>

        <ActivityFeed />
      </Grid>
    </div>
  ),
};

export const CompactDashboard: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingXl" as="h1">Compact Dashboard</Text>
        <Text variant="bodyMd" tone="subdued">Essential metrics at a glance</Text>
      </div>

      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="300" style={{ marginBottom: '24px' }}>
        {kpiData.map((kpi, index) => (
          <KPICard key={index} data={kpi} showTrends compact />
        ))}
      </Grid>

      <Grid columns={{ xs: 1, lg: 2 }} gap="400">
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingLg" as="h2">Quick Stats</Text>
            <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="bodySm">Today's Revenue</Text>
                <Text variant="bodySm" fontWeight="semibold">$2,845</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="bodySm">Today's Orders</Text>
                <Text variant="bodySm" fontWeight="semibold">47</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="bodySm">Conversion Rate</Text>
                <Text variant="bodySm" fontWeight="semibold">3.2%</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text variant="bodySm">Avg Order Value</Text>
                <Text variant="bodySm" fontWeight="semibold">$60.53</Text>
              </div>
            </div>
          </div>
        </Card>

        <QuickActions />
      </Grid>
    </div>
  ),
};

export const KPICardsShowcase: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingXl" as="h1">KPI Cards</Text>
        <Text variant="bodyMd" tone="subdued">Various KPI card styles and configurations</Text>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <Text variant="headingLg" as="h2">Standard KPI Cards</Text>
        <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400" style={{ marginTop: '16px' }}>
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} showTrends />
          ))}
        </Grid>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <Text variant="headingLg" as="h2">Compact KPI Cards</Text>
        <Grid columns={{ xs: 2, sm: 3, lg: 6 }} gap="300" style={{ marginTop: '16px' }}>
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} showTrends compact />
          ))}
        </Grid>
      </div>

      <div>
        <Text variant="headingLg" as="h2">Custom KPI Examples</Text>
        <Grid columns={{ xs: 1, sm: 2, lg: 3 }} gap="400" style={{ marginTop: '16px' }}>
          <KPICard
            data={{
              title: 'Website Visits',
              value: '45,291',
              change: '+23.1%',
              trend: 'up',
              icon: DesktopMajor,
              color: 'info',
              period: 'Last 30 days',
              target: '50,000',
              progress: 91,
            }}
            showTrends
          />
          <KPICard
            data={{
              title: 'Mobile App Downloads',
              value: '8,456',
              change: '+45.2%',
              trend: 'up',
              icon: MobileMajor,
              color: 'success',
              period: 'Last 30 days',
              target: '10,000',
              progress: 85,
            }}
            showTrends
          />
          <KPICard
            data={{
              title: 'Store Locations',
              value: '127',
              change: '+3',
              trend: 'up',
              icon: StoreMajor,
              color: 'warning',
              period: 'This quarter',
              target: '150',
              progress: 85,
            }}
            showTrends
          />
        </Grid>
      </div>
    </div>
  ),
};

export const RealTimeDashboard: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingXl" as="h1">Real-Time Dashboard</Text>
        <RealTimeUpdates enabled />
      </div>

      <Banner status="info" style={{ marginBottom: '24px' }}>
        <Text variant="bodySm">
          <strong>Live Data:</strong> This dashboard updates automatically every 5 seconds with real-time data from your business systems.
        </Text>
      </Banner>

      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400" style={{ marginBottom: '24px' }}>
        {kpiData.map((kpi, index) => (
          <KPICard key={index} data={kpi} showTrends />
        ))}
      </Grid>

      <Grid columns={{ xs: 1, lg: 2 }} gap="400">
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingLg" as="h2">Live Orders</Text>
            <div style={{ marginTop: '16px' }}>
              {[
                { order: '#1021', customer: 'New Customer', amount: '$89.00', time: 'Just now' },
                { order: '#1020', customer: 'John Doe', amount: '$452.00', time: '2 min ago' },
                { order: '#1019', customer: 'Jane Smith', amount: '$125.00', time: '5 min ago' },
              ].map((order, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: index < 2 ? '1px solid #e1e1e1' : 'none'
                }}>
                  <div>
                    <Text variant="bodySm" fontWeight="semibold">{order.order}</Text>
                    <Text variant="bodySm" tone="subdued">{order.customer}</Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text variant="bodySm" fontWeight="semibold">{order.amount}</Text>
                    <Text variant="bodySm" tone="subdued">{order.time}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <ActivityFeed />
      </Grid>
    </div>
  ),
};

export const CustomizableDashboard: Story = {
  render: () => {
    const [layout, setLayout] = useState('grid');
    const [widgets, setWidgets] = useState([
      'kpi', 'chart', 'activity', 'actions'
    ]);

    const toggleWidget = (widget: string) => {
      setWidgets(prev =>
        prev.includes(widget)
          ? prev.filter(w => w !== widget)
          : [...prev, widget]
      );
    };

    return (
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Text variant="headingXl" as="h1">Customizable Dashboard</Text>
          <div style={{ display: 'flex', gap: '12px' }}>
            <ButtonGroup segmented>
              <Button
                variant={layout === 'grid' ? 'primary' : 'plain'}
                onClick={() => setLayout('grid')}
              >
                Grid
              </Button>
              <Button
                variant={layout === 'list' ? 'primary' : 'plain'}
                onClick={() => setLayout('list')}
              >
                List
              </Button>
            </ButtonGroup>
            <Button icon={SettingsMajor}>Layout Settings</Button>
          </div>
        </div>

        <Card style={{ marginBottom: '24px' }}>
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h3">Widget Visibility</Text>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
              {[
                { id: 'kpi', label: 'KPI Cards' },
                { id: 'chart', label: 'Sales Chart' },
                { id: 'activity', label: 'Activity Feed' },
                { id: 'actions', label: 'Quick Actions' },
              ].map((widget) => (
                <Button
                  key={widget.id}
                  variant={widgets.includes(widget.id) ? 'primary' : 'plain'}
                  onClick={() => toggleWidget(widget.id)}
                >
                  {widget.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {widgets.includes('kpi') && (
          <div style={{ marginBottom: '24px' }}>
            <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} data={kpi} showTrends />
              ))}
            </Grid>
          </div>
        )}

        {widgets.includes('chart') && (
          <div style={{ marginBottom: '24px' }}>
            <SalesChart data={salesData} />
          </div>
        )}

        <Grid columns={{ xs: 1, lg: 2 }} gap="400">
          {widgets.includes('activity') && <ActivityFeed />}
          {widgets.includes('actions') && <QuickActions />}
        </Grid>
      </div>
    );
  },
};