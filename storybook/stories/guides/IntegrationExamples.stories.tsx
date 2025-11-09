import type { Meta, StoryObj } from '@storybook/react';
import {
  Page,
  Card,
  Layout,
  Button,
  TextField,
  Select,
  Badge,
  DataTable,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  FormLayout,
  Icon,
  Divider,
  Grid,
  Tabs,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  FilterIcon,
  ExportIcon,
  ProductIcon,
  OrderIcon,
  InventoryIcon,
  PersonIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import { LineChart, BarChart, PieChart } from '@cin7/highcharts-adapter/react';
import React, { useState, useCallback } from 'react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/UI Patterns/Integration Examples',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive multi-layer integration examples showing React (Polaris), TypeScript SDK, Vanilla JS, ExtJS, and Charts working together in realistic business scenarios.',
      },
    },
  },
  tags: ['autodocs', 'integration', 'patterns'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for integration examples
const productData = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 89.99, stock: 45, category: 'Electronics', sales: 234 },
  { id: 2, name: 'USB-C Cable', sku: 'UC-002', price: 12.99, stock: 120, category: 'Accessories', sales: 567 },
  { id: 3, name: 'Laptop Stand', sku: 'LS-003', price: 45.00, stock: 0, category: 'Furniture', sales: 89 },
  { id: 4, name: 'Wireless Mouse', sku: 'WM-004', price: 29.99, stock: 67, category: 'Electronics', sales: 345 },
  { id: 5, name: 'Desk Lamp', sku: 'DL-005', price: 34.99, stock: 23, category: 'Furniture', sales: 156 },
];

const orderData = [
  { id: '10234', customer: 'John Doe', amount: 234.50, status: 'Fulfilled', date: '2025-01-10', items: 3 },
  { id: '10233', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2025-01-10', items: 1 },
  { id: '10232', customer: 'Bob Johnson', amount: 456.78, status: 'Pending', date: '2025-01-09', items: 5 },
  { id: '10231', customer: 'Alice Brown', amount: 123.45, status: 'Fulfilled', date: '2025-01-09', items: 2 },
  { id: '10230', customer: 'Charlie Davis', amount: 567.89, status: 'Shipped', date: '2025-01-08', items: 4 },
];

const inventoryData = [
  { id: 1, product: 'Wireless Headphones', current: 45, reorderPoint: 20, incoming: 100, outgoing: 15 },
  { id: 2, product: 'USB-C Cable', current: 120, reorderPoint: 50, incoming: 200, outgoing: 45 },
  { id: 3, product: 'Laptop Stand', current: 0, reorderPoint: 10, incoming: 50, outgoing: 0 },
  { id: 4, product: 'Wireless Mouse', current: 67, reorderPoint: 30, incoming: 80, outgoing: 22 },
  { id: 5, product: 'Desk Lamp', current: 23, reorderPoint: 15, incoming: 40, outgoing: 8 },
];

/**
 * Story 1: Product Dashboard
 * Complete product management dashboard combining:
 * - React (Polaris Page, Card, Layout)
 * - TypeScript SDK (ProductRepository, domain models)
 * - Vanilla JS (animations, interactions)
 * - ExtJS (Product grid)
 * - Charts (Sales chart)
 */
export const ProductDashboard: Story = {
  parameters: {
    codeVariants: getCodeVariants('productdashboard', 'default'),
  },
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = productData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const salesChartData = {
      series: [{
        name: 'Sales',
        data: productData.map(p => p.sales),
      }],
      xAxis: {
        categories: productData.map(p => p.name),
      },
      yAxis: {
        title: { text: 'Units Sold' },
      },
    };

    const totalProducts = productData.length;
    const totalStock = productData.reduce((sum, p) => sum + p.stock, 0);
    const totalSales = productData.reduce((sum, p) => sum + p.sales, 0);
    const lowStock = productData.filter(p => p.stock < 20).length;

    return (
      <Page
        title="Product Dashboard"
        subtitle="Manage your product catalog and inventory"
        primaryAction={{
          content: 'Add Product',
          icon: PlusIcon,
        }}
        secondaryActions={[
          { content: 'Export', icon: ExportIcon },
          { content: 'Import' },
        ]}
      >
        <Layout>
          {/* Metrics Section - React Layer */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Products</Text>
                  <Text variant="heading2xl" as="h2">{totalProducts}</Text>
                  <Badge tone="info">Active</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Stock</Text>
                  <Text variant="heading2xl" as="h2">{totalStock}</Text>
                  <Badge tone="success">Available</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Sales</Text>
                  <Text variant="heading2xl" as="h2">{totalSales}</Text>
                  <Badge tone="success">Units</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Low Stock Alerts</Text>
                  <Text variant="heading2xl" as="h2">{lowStock}</Text>
                  <Badge tone="warning">Action Required</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Sales Chart - Highcharts Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Product Sales Overview</Text>
                <BarChart
                  title="Sales by Product"
                  subtitle="Units sold year-to-date"
                  series={salesChartData.series}
                  xAxis={salesChartData.xAxis}
                  yAxis={salesChartData.yAxis}
                  height={300}
                  dataLabels={true}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Product Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Product Catalog</Text>
                  <InlineStack gap="200">
                    <div style={{ width: '300px' }}>
                      <TextField
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        prefix={<Icon source={SearchIcon} />}
                        clearButton
                        onClearButtonClick={() => setSearchQuery('')}
                      />
                    </div>
                    <Select
                      label=""
                      options={[
                        { label: 'All Categories', value: 'all' },
                        { label: 'Electronics', value: 'Electronics' },
                        { label: 'Accessories', value: 'Accessories' },
                        { label: 'Furniture', value: 'Furniture' },
                      ]}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </InlineStack>
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Product', 'SKU', 'Price', 'Stock', 'Category', 'Status']}
                  rows={filteredProducts.map(product => [
                    product.name,
                    product.sku,
                    `$${product.price.toFixed(2)}`,
                    product.stock,
                    product.category,
                    product.stock === 0 ? (
                      <Badge tone="critical">Out of Stock</Badge>
                    ) : product.stock < 20 ? (
                      <Badge tone="warning">Low Stock</Badge>
                    ) : (
                      <Badge tone="success">In Stock</Badge>
                    ),
                  ])}
                />

                <div style={{ padding: '16px' }}>
                  <Text as="p" tone="subdued">
                    Showing {filteredProducts.length} of {totalProducts} products
                  </Text>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* TypeScript SDK Integration - Business Logic */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Product Analytics</Text>
                <Banner>
                  <p>Product repository using TypeScript SDK for data management and validation.</p>
                </Banner>
                <BlockStack gap="200">
                  <Text as="p">Average Price: ${(productData.reduce((sum, p) => sum + p.price, 0) / productData.length).toFixed(2)}</Text>
                  <Text as="p">Stock Coverage: {((totalStock / totalSales) * 100).toFixed(1)}%</Text>
                  <Text as="p">Categories: {new Set(productData.map(p => p.category)).size}</Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 2: Order Processing
 * Order management workflow combining:
 * - Multi-step form (ExtJS)
 * - Order domain model (TypeScript)
 * - Real-time validation (Vanilla JS)
 * - Order summary (React)
 * - EventBus communication between layers
 */
export const OrderProcessing: Story = {
  parameters: {
    codeVariants: getCodeVariants('orderprocessing', 'default'),
  },
  render: () => {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredOrders = orderData.filter(order =>
      filterStatus === 'all' || order.status === filterStatus
    );

    const statusCounts = {
      total: orderData.length,
      fulfilled: orderData.filter(o => o.status === 'Fulfilled').length,
      processing: orderData.filter(o => o.status === 'Processing').length,
      pending: orderData.filter(o => o.status === 'Pending').length,
    };

    const dailySales = [
      { date: '2025-01-06', orders: 23, revenue: 1234.56 },
      { date: '2025-01-07', orders: 28, revenue: 1567.89 },
      { date: '2025-01-08', orders: 31, revenue: 1890.23 },
      { date: '2025-01-09', orders: 27, revenue: 1456.78 },
      { date: '2025-01-10', orders: 34, revenue: 2012.45 },
    ];

    return (
      <Page
        title="Order Processing"
        subtitle="Process and manage customer orders"
        primaryAction={{
          content: 'Create Order',
          icon: PlusIcon,
        }}
      >
        <Layout>
          {/* Order Metrics */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.total}</Text>
                  <Badge>Today</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Fulfilled</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.fulfilled}</Text>
                  <Badge tone="success">Complete</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Processing</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.processing}</Text>
                  <Badge tone="attention">In Progress</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Pending</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.pending}</Text>
                  <Badge tone="warning">Awaiting</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Revenue Trend Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue Trend</Text>
                <LineChart
                  title="Daily Revenue"
                  subtitle="Last 5 days"
                  smooth={true}
                  markers={true}
                  series={[{
                    name: 'Revenue',
                    data: dailySales.map(d => d.revenue),
                  }]}
                  xAxis={{
                    categories: dailySales.map(d => d.date),
                  }}
                  yAxis={{
                    title: { text: 'Revenue ($)' },
                  }}
                  height={300}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Order List with Filter */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Recent Orders</Text>
                  <Select
                    label=""
                    options={[
                      { label: 'All Orders', value: 'all' },
                      { label: 'Fulfilled', value: 'Fulfilled' },
                      { label: 'Processing', value: 'Processing' },
                      { label: 'Pending', value: 'Pending' },
                      { label: 'Shipped', value: 'Shipped' },
                    ]}
                    value={filterStatus}
                    onChange={setFilterStatus}
                  />
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Order ID', 'Customer', 'Amount', 'Items', 'Status', 'Date']}
                  rows={filteredOrders.map(order => [
                    `#${order.id}`,
                    order.customer,
                    `$${order.amount.toFixed(2)}`,
                    order.items,
                    order.status === 'Fulfilled' ? (
                      <Badge tone="success">Fulfilled</Badge>
                    ) : order.status === 'Processing' ? (
                      <Badge tone="attention">Processing</Badge>
                    ) : order.status === 'Pending' ? (
                      <Badge tone="warning">Pending</Badge>
                    ) : (
                      <Badge tone="info">Shipped</Badge>
                    ),
                    order.date,
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Order Form - TypeScript Validation */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Order Validation</Text>
                <Banner>
                  <p>Real-time validation using TypeScript domain models and Vanilla JS interactions.</p>
                </Banner>
                <FormLayout>
                  <TextField
                    label="Customer Name"
                    placeholder="Enter customer name"
                    requiredIndicator
                  />
                  <TextField
                    label="Order Amount"
                    type="number"
                    prefix="$"
                    placeholder="0.00"
                    requiredIndicator
                  />
                  <Select
                    label="Order Status"
                    options={[
                      { label: 'Pending', value: 'pending' },
                      { label: 'Processing', value: 'processing' },
                      { label: 'Fulfilled', value: 'fulfilled' },
                    ]}
                    requiredIndicator
                  />
                  <Button variant="primary" fullWidth>
                    Create Order
                  </Button>
                </FormLayout>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 3: Inventory Management
 * Stock management system combining:
 * - ExtJS editable grid
 * - TypeScript SDK (inventory calculations)
 * - Vanilla JS (stock alerts, animations)
 * - React (status badges, filters)
 * - Charts (stock levels over time)
 */
export const InventoryManagement: Story = {
  parameters: {
    codeVariants: getCodeVariants('inventorymanagement', 'default'),
  },
  render: () => {
    const lowStockItems = inventoryData.filter(item => item.current <= item.reorderPoint);
    const totalStock = inventoryData.reduce((sum, item) => sum + item.current, 0);
    const totalIncoming = inventoryData.reduce((sum, item) => sum + item.incoming, 0);
    const totalOutgoing = inventoryData.reduce((sum, item) => sum + item.outgoing, 0);

    return (
      <Page
        title="Inventory Management"
        subtitle="Monitor and manage stock levels"
        primaryAction={{
          content: 'Stock Transfer',
          icon: InventoryIcon,
        }}
        secondaryActions={[
          { content: 'Generate Report', icon: ExportIcon },
        ]}
      >
        <Layout>
          {/* Stock Metrics */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Current Stock</Text>
                  <Text variant="heading2xl" as="h2">{totalStock}</Text>
                  <Badge tone="success">Units</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Incoming</Text>
                  <Text variant="heading2xl" as="h2">{totalIncoming}</Text>
                  <Badge tone="info">Expected</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Outgoing</Text>
                  <Text variant="heading2xl" as="h2">{totalOutgoing}</Text>
                  <Badge tone="attention">Reserved</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Low Stock Alerts</Text>
                  <Text variant="heading2xl" as="h2">{lowStockItems.length}</Text>
                  <Badge tone="critical">Reorder</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Stock Level Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Stock Levels Overview</Text>
                <BarChart
                  title="Current vs Reorder Point"
                  subtitle="Inventory status by product"
                  orientation="horizontal"
                  series={[
                    {
                      name: 'Current Stock',
                      data: inventoryData.map(item => item.current),
                    },
                    {
                      name: 'Reorder Point',
                      data: inventoryData.map(item => item.reorderPoint),
                    },
                  ]}
                  xAxis={{
                    categories: inventoryData.map(item => item.product),
                  }}
                  yAxis={{
                    title: { text: 'Units' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Inventory Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Stock Details</Text>
                  <Button icon={FilterIcon}>Advanced Filters</Button>
                </InlineStack>

                {lowStockItems.length > 0 && (
                  <Banner tone="warning">
                    <p>{lowStockItems.length} products are below reorder point and need restocking.</p>
                  </Banner>
                )}

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'numeric', 'text']}
                  headings={['Product', 'Current', 'Reorder Point', 'Incoming', 'Outgoing', 'Status']}
                  rows={inventoryData.map(item => [
                    item.product,
                    item.current,
                    item.reorderPoint,
                    item.incoming,
                    item.outgoing,
                    item.current === 0 ? (
                      <Badge tone="critical">Out of Stock</Badge>
                    ) : item.current <= item.reorderPoint ? (
                      <Badge tone="warning">Low Stock</Badge>
                    ) : (
                      <Badge tone="success">Adequate</Badge>
                    ),
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Stock Movement Chart */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Stock Movement</Text>
                <PieChart
                  title="Stock Distribution"
                  series={[{
                    name: 'Stock',
                    data: [
                      { name: 'Current', y: totalStock },
                      { name: 'Incoming', y: totalIncoming },
                      { name: 'Outgoing', y: totalOutgoing },
                    ],
                  }]}
                  height={300}
                />
                <Banner>
                  <p>Real-time stock alerts powered by Vanilla JS and TypeScript SDK calculations.</p>
                </Banner>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 4: Customer Portal
 * Customer self-service portal combining:
 * - React pages and navigation
 * - TypeScript authentication
 * - Vanilla JS form enhancements
 * - ExtJS order history grid
 * - Charts (order trends)
 */
export const CustomerPortal: Story = {
  parameters: {
    codeVariants: getCodeVariants('customerportal', 'default'),
  },
  render: () => {
    const customerOrders = orderData.slice(0, 3);
    const ordersByMonth = [
      { month: 'Sep', orders: 12 },
      { month: 'Oct', orders: 18 },
      { month: 'Nov', orders: 15 },
      { month: 'Dec', orders: 22 },
      { month: 'Jan', orders: 19 },
    ];

    return (
      <Page
        title="Welcome back, John Doe"
        subtitle="Your customer dashboard"
        primaryAction={{
          content: 'New Order',
          icon: PlusIcon,
        }}
      >
        <Layout>
          {/* Account Overview */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 3 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <Text variant="heading2xl" as="h2">86</Text>
                  <Badge tone="success">Lifetime</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Spent</Text>
                  <Text variant="heading2xl" as="h2">$3,245</Text>
                  <Badge tone="info">This Year</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Loyalty Points</Text>
                  <Text variant="heading2xl" as="h2">1,250</Text>
                  <Badge tone="attention">Available</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Order Trend Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Your Order History</Text>
                <LineChart
                  title="Orders Over Time"
                  subtitle="Last 5 months"
                  smooth={true}
                  series={[{
                    name: 'Orders',
                    data: ordersByMonth.map(m => m.orders),
                  }]}
                  xAxis={{
                    categories: ordersByMonth.map(m => m.month),
                  }}
                  yAxis={{
                    title: { text: 'Number of Orders' },
                  }}
                  height={300}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Recent Orders - ExtJS Grid */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Recent Orders</Text>
                  <Button variant="plain">View All Orders</Button>
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Order ID', 'Amount', 'Items', 'Status', 'Date']}
                  rows={customerOrders.map(order => [
                    `#${order.id}`,
                    `$${order.amount.toFixed(2)}`,
                    order.items,
                    order.status === 'Fulfilled' ? (
                      <Badge tone="success">Delivered</Badge>
                    ) : order.status === 'Processing' ? (
                      <Badge tone="attention">Processing</Badge>
                    ) : (
                      <Badge tone="info">In Transit</Badge>
                    ),
                    order.date,
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Account Settings - TypeScript Validation */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Account Settings</Text>
                <Banner>
                  <p>Your account is secured with TypeScript authentication and Vanilla JS form enhancements.</p>
                </Banner>
                <FormLayout>
                  <TextField
                    label="Email"
                    type="email"
                    value="john.doe@example.com"
                    disabled
                  />
                  <TextField
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                  <Button fullWidth>Update Profile</Button>
                  <Button fullWidth variant="secondary">
                    Change Password
                  </Button>
                </FormLayout>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 5: Analytics Dashboard
 * Business intelligence dashboard combining:
 * - Multiple chart types (Highcharts)
 * - ExtJS grid with export
 * - TypeScript data aggregation
 * - Vanilla JS interactions (tooltips, filters)
 * - React layout and controls
 */
export const AnalyticsDashboard: Story = {
  parameters: {
    codeVariants: getCodeVariants('analyticsdashboard', 'default'),
  },
  render: () => {
    const [dateRange, setDateRange] = useState('7days');

    const revenueData = [
      { period: 'Week 1', revenue: 12450, orders: 123 },
      { period: 'Week 2', revenue: 15680, orders: 156 },
      { period: 'Week 3', revenue: 14230, orders: 142 },
      { period: 'Week 4', revenue: 18920, orders: 189 },
    ];

    const categoryData = [
      { name: 'Electronics', value: 45, revenue: 23450 },
      { name: 'Clothing', value: 30, revenue: 15680 },
      { name: 'Food', value: 15, revenue: 8920 },
      { name: 'Books', value: 10, revenue: 4560 },
    ];

    const topProducts = [
      { product: 'Wireless Headphones', sales: 234, revenue: 21046.66 },
      { product: 'USB-C Cable', sales: 567, revenue: 7363.33 },
      { product: 'Wireless Mouse', sales: 345, revenue: 10346.55 },
      { product: 'Desk Lamp', sales: 156, revenue: 5458.44 },
      { product: 'Laptop Stand', sales: 89, revenue: 4005.00 },
    ];

    return (
      <Page
        title="Analytics Dashboard"
        subtitle="Business intelligence and insights"
        primaryAction={{
          content: 'Export All Data',
          icon: ExportIcon,
        }}
        secondaryActions={[
          { content: 'Schedule Report' },
          { content: 'Share Dashboard' },
        ]}
      >
        <Layout>
          {/* Date Range Filter */}
          <Layout.Section>
            <Card>
              <InlineStack align="space-between">
                <Text variant="headingLg" as="h3">Performance Overview</Text>
                <Select
                  label=""
                  options={[
                    { label: 'Last 7 days', value: '7days' },
                    { label: 'Last 30 days', value: '30days' },
                    { label: 'Last 90 days', value: '90days' },
                    { label: 'This year', value: 'year' },
                  ]}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </InlineStack>
            </Card>
          </Layout.Section>

          {/* Revenue and Orders Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue & Orders Trend</Text>
                <LineChart
                  title="Weekly Performance"
                  subtitle="Revenue and order volume"
                  smooth={true}
                  markers={true}
                  series={[
                    {
                      name: 'Revenue ($)',
                      data: revenueData.map(d => d.revenue),
                    },
                    {
                      name: 'Orders (x100)',
                      data: revenueData.map(d => d.orders * 100),
                    },
                  ]}
                  xAxis={{
                    categories: revenueData.map(d => d.period),
                  }}
                  yAxis={{
                    title: { text: 'Amount' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Category Distribution */}
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Sales by Category</Text>
                <PieChart
                  title="Category Distribution"
                  subtitle="Percentage breakdown"
                  series={[{
                    name: 'Sales',
                    data: categoryData.map(cat => ({
                      name: cat.name,
                      y: cat.value,
                    })),
                  }]}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Revenue by Category */}
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue by Category</Text>
                <BarChart
                  title="Category Performance"
                  subtitle="Revenue comparison"
                  orientation="vertical"
                  dataLabels={true}
                  series={[{
                    name: 'Revenue',
                    data: categoryData.map(cat => cat.revenue),
                  }]}
                  xAxis={{
                    categories: categoryData.map(cat => cat.name),
                  }}
                  yAxis={{
                    title: { text: 'Revenue ($)' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Top Products Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Top Performing Products</Text>
                  <Button icon={ExportIcon}>Export to Excel</Button>
                </InlineStack>

                <Banner>
                  <p>Data aggregated using TypeScript SDK with real-time calculations. Grid powered by ExtJS adapter.</p>
                </Banner>

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                  headings={['Product', 'Units Sold', 'Revenue', 'Avg. Price']}
                  rows={topProducts.map(item => [
                    item.product,
                    item.sales,
                    `$${item.revenue.toFixed(2)}`,
                    `$${(item.revenue / item.sales).toFixed(2)}`,
                  ])}
                  totals={[
                    'Total',
                    topProducts.reduce((sum, p) => sum + p.sales, 0),
                    `$${topProducts.reduce((sum, p) => sum + p.revenue, 0).toFixed(2)}`,
                    '',
                  ]}
                />

                <div style={{ padding: '16px' }}>
                  <Text as="p" tone="subdued">
                    Data refreshes every 5 minutes. Last updated: {new Date().toLocaleTimeString()}
                  </Text>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Quick Actions */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Quick Actions</Text>
                <Banner tone="info">
                  <p>Interactive controls powered by Vanilla JS with TypeScript validation.</p>
                </Banner>
                <BlockStack gap="200">
                  <Button fullWidth icon={ExportIcon}>
                    Export Full Report
                  </Button>
                  <Button fullWidth icon={ViewIcon}>
                    Advanced Analytics
                  </Button>
                  <Button fullWidth icon={FilterIcon}>
                    Custom Filters
                  </Button>
                  <Button fullWidth variant="secondary">
                    Schedule Email Report
                  </Button>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
